// 무대 위 인물 하나 (CLAUDE.md 8-1).
// 역광 실루엣 + 종이 그림자극 느낌. 숨쉬기·옷자락은 늘 조금씩 움직이고,
// 말할 때는 앞으로 나오며 밝아지고, 감정에 따라 자세가 바뀐다.
import gsap from 'gsap';
import type { CharacterDef, Part } from '../characters';
import type { ActionName } from '../engine/actions';
import { reducedMotion } from '../engine/settings';

export type Pose = 'neutral' | 'slump' | 'lift' | 'tremble';
export type Facing = 'left' | 'right';

let uid = 0;

const POSES: Record<Pose, Partial<Record<Part, gsap.TweenVars>>> = {
  neutral: { head: { rotation: 0 }, upper: { rotation: 0 }, armL: { rotation: 0, y: 0 }, armR: { rotation: 0, y: 0 } },
  // 어깨가 처지고 고개가 떨어진다
  slump: { head: { rotation: 15 }, upper: { rotation: 3 }, armL: { rotation: 2, y: 4 }, armR: { rotation: -2, y: 4 } },
  // 고개를 들고 가슴을 편다
  lift: { head: { rotation: -11 }, upper: { rotation: -2.5 }, armL: { rotation: 3, y: -1 }, armR: { rotation: -7, y: -1 } },
  // 떨림: 자세는 살짝 움츠리고, 몸 전체가 잘게 떨린다
  tremble: { head: { rotation: 7 }, upper: { rotation: 1.5 }, armL: { rotation: -3, y: 2 }, armR: { rotation: 4, y: 2 } },
};

export class Actor {
  readonly el: HTMLElement;
  private parts: Partial<Record<Part, SVGGElement>> = {};
  private body: Element;
  private loops: gsap.core.Animation[] = [];
  private shiver: gsap.core.Tween | null = null;
  private poseName: Pose = 'neutral';
  private facing: Facing;
  private art: Element;
  private outfitName = '';
  /** 동작 라이브러리에서 계속 도는 움직임 (울음의 들썩임 등) */
  private actLoop: gsap.core.Animation | null = null;
  /** 무릎을 꿇었나 (일어설 때 되돌린다) */
  private low = false;

  constructor(readonly def: CharacterDef) {
    this.el = document.createElement('div');
    this.el.className = 'actor';
    this.el.dataset.id = def.id;
    this.el.setAttribute('role', 'img');
    this.el.setAttribute('aria-label', def.name);
    const art = def.art;
    this.facing = def.faces ?? 'right';
    if (def.height && def.height !== 1) this.el.style.setProperty('--h', String(def.height));
    if (def.slots && def.slots !== 1) this.el.style.setProperty('--slots', String(def.slots));
    if (def.tint) this.el.style.setProperty('--tint', def.tint);

    if (art.kind === 'svg') {
      const id = `rim-${def.id}-${++uid}`;
      const [w, h] = art.viewBox;
      this.el.style.aspectRatio = `${w} / ${h}`;
      this.el.style.setProperty('--ar', String(h / w));
      this.el.innerHTML = `
        <div class="actor__backlight" aria-hidden="true"></div>
        <svg class="actor__art" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMax meet" aria-hidden="true" overflow="visible">
          <defs>
            <filter id="${id}" x="-25%" y="-10%" width="150%" height="125%" color-interpolation-filters="sRGB">
              <feOffset class="actor__paper" in="SourceAlpha" dx="5" dy="4" result="off"/>
              <feGaussianBlur in="off" stdDeviation="1.6" result="offb"/>
              <feFlood flood-color="#000" flood-opacity="0.5"/>
              <feComposite in2="offb" operator="in" result="paper"/>
              <feMorphology in="SourceAlpha" operator="dilate" radius="1.4" result="grow"/>
              <feGaussianBlur in="grow" stdDeviation="2.4" result="growb"/>
              <feFlood class="actor__rimcolor"/>
              <feComposite in2="growb" operator="in" result="rim"/>
              <feMerge><feMergeNode in="paper"/><feMergeNode in="rim"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <g class="actor__body" fill="currentColor" filter="url(#${id})">${art.markup}</g>
        </svg>`;
      this.body = this.el.querySelector('.actor__body')!;
      this.body.querySelectorAll<SVGGElement>('[data-part]').forEach((g) => {
        const name = g.dataset.part as Part;
        this.parts[name] = g;
        const pivot = art.pivots[name];
        if (pivot) gsap.set(g, { svgOrigin: `${pivot[0]} ${pivot[1]}` });
      });
    } else {
      // 일러스트로 바꿔 끼운 인물: 부위가 없으니 몸 전체에만 모션을 준다
      this.el.style.aspectRatio = `${art.width} / ${art.height}`;
      this.el.style.setProperty('--ar', String(art.height / art.width));
      this.el.innerHTML = `<div class="actor__backlight" aria-hidden="true"></div><img class="actor__art" src="${art.src}" alt="" />`;
      this.body = this.el.querySelector('.actor__art')!;
    }
    this.art = this.el.querySelector('.actor__art')!;
  }

  get faces(): Facing {
    return this.facing;
  }

  /** 부위 그룹 (Stage의 두 사람 동작용) */
  partsFor(): Partial<Record<Part, SVGGElement>> {
    return this.parts;
  }

  /**
   * 바라보는 쪽을 바꾼다. 그림을 좌우로 뒤집되, 가운데에서 몸이 얇아졌다 다시 펴지는
   * 짧은 "돌아서기"로 보여 준다. 종이 그림자는 늘 오른쪽 아래로 떨어지게 같이 뒤집는다.
   */
  face(dir: Facing, animate = true): void {
    if (dir === this.facing) return;
    this.facing = dir;
    const flip = dir !== (this.def.faces ?? 'right');
    const sx = flip ? -1 : 1;
    this.el.querySelector('.actor__paper')?.setAttribute('dx', String(5 * sx));
    gsap.killTweensOf(this.art, 'scaleX');
    if (!animate || reducedMotion()) {
      gsap.set(this.art, { scaleX: sx, transformOrigin: '50% 50%' });
      return;
    }
    gsap.timeline()
      .to(this.art, { scaleX: 0.06 * -sx, duration: 0.22, ease: 'power2.in', transformOrigin: '50% 50%' })
      .set(this.art, { scaleX: 0.06 * sx })
      .to(this.art, { scaleX: sx, duration: 0.34, ease: 'power2.out' });
  }

  /**
   * 옷을 갈아입는다 (예: 창 3:21 가죽옷). cloth 부위 그림을 바꾸고, 옷에 parts가 있으면 그 부위(머리 장식·소품)도 바꾼다.
   * 옛 옷이 스러지고, 역광이 한 번 부드럽게 밝아지며 새 옷이 내려앉는다.
   */
  outfit(name: string, animate = true): void {
    const art = this.def.art;
    const cloth = this.parts.cloth;
    if (art.kind !== 'svg' || !cloth || name === this.outfitName) return;
    const next = art.outfits?.[name];
    if (!next) {
      console.warn(`[${this.def.id}] 옷 없음: ${name}`);
      return;
    }
    this.outfitName = name;
    const pivot = next.pivot ?? art.pivots.cloth;
    const swap = () => {
      if (next.markup != null) cloth.innerHTML = next.markup;
      if (pivot) gsap.set(cloth, { svgOrigin: `${pivot[0]} ${pivot[1]}` });
      for (const [part, markup] of Object.entries(next.parts ?? {})) {
        const g = this.parts[part as Part];
        if (g && markup != null) g.innerHTML = markup;
      }
      if (next.height) this.el.style.setProperty('--h', String(next.height));
    };
    if (!animate || reducedMotion()) {
      gsap.killTweensOf(cloth, 'opacity,y');
      swap();
      if (animate) gsap.fromTo(cloth, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      return;
    }
    const glow = this.el.querySelector('.actor__backlight');
    const extra = Object.keys(next.parts ?? {}).map((k) => this.parts[k as Part]).filter((g): g is SVGGElement => !!g);
    const tl = gsap.timeline().to(cloth, { opacity: 0, duration: 0.7, ease: 'power2.in' });
    if (extra.length) tl.to(extra, { opacity: 0, duration: 0.7, ease: 'power2.in' }, 0);
    tl.to(glow, { opacity: 1, scale: 1.12, duration: 0.9, ease: 'power2.out' }, 0.2)
      .add(swap)
      .fromTo(cloth, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out' });
    if (extra.length) tl.to(extra, { opacity: 1, duration: 1.1, ease: 'power2.out' }, '<');
    tl.to(glow, { opacity: 0.75, scale: 1, duration: 1.4, ease: 'power2.inOut', clearProps: 'opacity,scale' }, '<0.3');
  }

  // ── 동작 라이브러리 (engine/actions.ts) ──────────
  // 한 사람이 하는 동작. 두 사람 동작(포옹·다툼·마주보기)과 등장·퇴장은 Stage가 맡는다.

  /** 한 사람 동작을 한다. 처리했으면 true */
  perform(name: ActionName): boolean {
    const rm = reducedMotion();
    const d = (s: number) => (rm ? 0.01 : s);
    const p = this.parts;
    const to = (g: Element | undefined, vars: gsap.TweenVars, dur = 0.9) => g && gsap.to(g, { ...vars, duration: d(dur), ease: 'power3.out', overwrite: 'auto' });
    const settle = () => {
      this.actLoop?.kill();
      this.actLoop = null;
    };
    switch (name) {
      case 'kneel':
        settle();
        this.kneel(true);
        to(p.head, { rotation: 6 });
        to(p.upper, { rotation: 4 });
        to(p.armL, { rotation: 0, y: 0 });
        return true;
      case 'pray':
        settle();
        this.kneel(true);
        to(p.head, { rotation: -12 }, 1.2);
        to(p.upper, { rotation: -2 }, 1.2);
        to(p.armL, { rotation: -72, y: 0 }, 1.4);
        return true;
      case 'prostrate':
        settle();
        this.kneel(true);
        // 긴 옷이 상체에 붙어 있어서 크게 숙이면 옷자락이 들린다 → 상체는 조금, 고개는 깊게
        to(p.upper, { rotation: 22 }, 1.4);
        to(p.head, { rotation: 34 }, 1.4);
        to(p.armL, { rotation: -40, y: 0 }, 1.4);
        return true;
      case 'sleep':
        settle();
        this.kneel(true);
        to(p.upper, { rotation: 18 }, 1.8);
        to(p.head, { rotation: 30 }, 1.8);
        to(p.armL, { rotation: -20, y: 0 }, 1.8);
        gsap.to(this.el, { filter: 'brightness(0.7)', duration: d(1.8) });
        return true;
      case 'fall':
        // 절제된 쓰러짐: 무릎이 꺾이고, 상체가 앞으로 기울고, 빛이 빠진다. 바닥에 나뒹굴지 않는다
        settle();
        this.kneel(true, 1.4);
        to(p.upper, { rotation: 20 }, 2);
        to(p.head, { rotation: 30 }, 2);
        to(p.armL, { rotation: 6, y: 4 }, 2);
        gsap.to(this.el, { filter: 'brightness(0.38)', duration: d(2.2), ease: 'power2.in' });
        return true;
      case 'bow-head':
        settle();
        to(p.head, { rotation: 22 });
        to(p.upper, { rotation: 5 });
        return true;
      case 'look-up':
        settle();
        to(p.head, { rotation: -16 });
        to(p.upper, { rotation: -3 });
        return true;
      case 'bless':
        settle();
        to(p.head, { rotation: -4 });
        to(p.armL, { rotation: -100, y: 0 }, 1.2);
        return true;
      case 'cry': {
        // 고개를 떨구고, 어깨가 불규칙하게 들썩인다 (stand까지 계속)
        settle();
        to(p.head, { rotation: 20 });
        to(p.upper, { rotation: 6 });
        to(p.armL, { rotation: -28, y: 2 });
        if (!rm && p.upper) {
          this.actLoop = gsap.to(p.upper, { y: '+=2.6', duration: 0.16, ease: 'sine.inOut', yoyo: true, repeat: -1, repeatDelay: 0.5, repeatRefresh: true, delay: 0.6 });
        }
        return true;
      }
      case 'step-back': {
        settle();
        const dir = this.faces === 'right' ? -1 : 1;
        gsap.timeline()
          .to(this.el, { x: `+=${dir * 16}`, duration: d(0.25), ease: 'power3.out' })
          .to(this.body, { x: 1.4, duration: 0.05, yoyo: true, repeat: rm ? 0 : 9, ease: 'none' }, 0)
          .set(this.body, { x: 0 });
        to(p.head, { rotation: -8 }, 0.3);
        to(p.upper, { rotation: -5 }, 0.3);
        return true;
      }
      case 'turn':
        this.face(this.faces === 'right' ? 'left' : 'right');
        return true;
      case 'stand':
        settle();
        this.kneel(false);
        this.pose('neutral');
        gsap.to(this.el, { filter: 'brightness(1)', duration: d(0.8) });
        return true;
    }
    return false;
  }

  /** 무릎 꿇기 / 일어서기: 다리를 아래에서부터 접고, 상체를 그만큼 내린다 */
  private kneel(down: boolean, dur = 1): void {
    if (this.def.art.kind !== 'svg') {
      gsap.to(this.body, { scaleY: down ? 0.78 : 1, transformOrigin: '50% 100%', duration: reducedMotion() ? 0.01 : dur, ease: 'power3.out' });
      this.low = down;
      return;
    }
    const legs = this.parts.legs;
    const upper = this.parts.upper;
    if (!legs || !upper) return;
    const [w, h] = this.def.art.viewBox;
    const foot = h * 0.974;
    const hip = this.def.art.pivots.upper?.[1] ?? h * 0.495;
    const k = 0.56;
    const dur2 = reducedMotion() ? 0.01 : dur;
    gsap.to(legs, { scaleY: down ? k : 1, svgOrigin: `${w / 2} ${foot}`, duration: dur2, ease: 'power3.out', overwrite: 'auto' });
    gsap.to(upper, { y: down ? (foot - hip) * (1 - k) : 0, duration: dur2, ease: 'power3.out' });
    this.low = down;
  }

  get kneeling(): boolean {
    return this.low;
  }

  /** 늘 흐르는 아주 작은 움직임: 숨쉬기, 옷자락, 머리카락 */
  start(): void {
    this.stopLoops();
    if (reducedMotion()) return;
    const loop = (target: Element | undefined, vars: gsap.TweenVars, duration: number) => {
      if (!target) return;
      this.loops.push(gsap.to(target, { ...vars, duration, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: Math.random() * 0.8 }));
    };
    const p = this.parts;
    if (p.upper) {
      // 숨쉬기: 허리를 기준으로 가슴이 아주 살짝 부풀었다 가라앉는다
      loop(p.upper, { scaleY: 1.014, scaleX: 1.004 }, 2.6);
      loop(p.cloth, { rotation: 1.6, skewX: 2.5 }, 3.3);
      loop(p.hair, { rotation: -2.2 }, 4.1);
      loop(p.sway, { rotation: 2.6, x: 1.5 }, 3.7);
    } else {
      gsap.set(this.body, { transformOrigin: '50% 100%' });
      loop(this.body, { scaleY: 1.01 }, 2.6);
    }
  }

  pose(name: Pose): void {
    this.poseName = name;
    const rm = reducedMotion();
    const def = POSES[name];
    for (const [part, vars] of Object.entries(def) as [Part, gsap.TweenVars][]) {
      const g = this.parts[part];
      if (g) gsap.to(g, { ...vars, duration: rm ? 0 : 0.9, ease: 'power3.out', overwrite: 'auto' });
    }
    this.shiver?.kill();
    this.shiver = null;
    gsap.set(this.body, { x: 0 });
    if (name === 'tremble' && !rm) {
      this.shiver = gsap.to(this.body, { x: 1.1, duration: 0.05, ease: 'none', yoyo: true, repeat: -1, repeatRefresh: true });
    }
  }

  get currentPose(): Pose {
    return this.poseName;
  }

  /** 말하는 사람: 앞으로 살짝 나오고, 역광이 밝아진다 */
  setSpeaking(on: boolean): void {
    this.el.classList.toggle('is-speaking', on);
    this.el.classList.remove('is-dim');
    const rm = reducedMotion();
    gsap.to(this.el, { scale: on ? 1.045 : 1, y: on ? -6 : 0, filter: on ? 'brightness(1.12)' : 'brightness(1)', duration: rm ? 0.2 : 0.7, ease: 'power3.out' });
  }

  /** 말하지 않는 사람: 뒤로 물러나 어두워진다 */
  setDim(on: boolean): void {
    this.el.classList.toggle('is-dim', on);
    this.el.classList.remove('is-speaking');
    gsap.to(this.el, { scale: on ? 0.97 : 1, y: 0, filter: on ? 'brightness(0.45)' : 'brightness(1)', duration: reducedMotion() ? 0.2 : 0.7, ease: 'power3.out' });
  }

  private stopLoops(): void {
    this.loops.forEach((t) => t.kill());
    this.loops = [];
  }

  destroy(): void {
    this.stopLoops();
    this.shiver?.kill();
    this.actLoop?.kill();
    gsap.killTweensOf(this.el);
    Object.values(this.parts).forEach((g) => gsap.killTweensOf(g));
    this.el.remove();
  }
}

/** 비주얼노벨식 무대: 말하는 사람은 강조되고 나머지는 어두워진다. */
export class Stage {
  readonly el: HTMLElement;
  readonly actors = new Map<string, Actor>();

  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'stage';
  }

  /** 새로 선 인물은 이미 서 있는 사람들 쪽(왼쪽)을 보게 한다. 장면의 "face"로 바꿀 수 있다 */
  add(actor: Actor): Actor {
    if (this.actors.size) actor.face('left', false);
    this.flip(() => {
      this.actors.set(actor.def.id, actor);
      this.el.append(actor.el);
      this.recount();
    }, actor);
    actor.start();
    return actor;
  }

  /** 무대에서 내보낸다 (천천히 흐려지며 사라짐) */
  async remove(id: string): Promise<void> {
    const a = this.actors.get(id);
    if (!a) return;
    this.actors.delete(id);
    this.recount();
    await gsap.to(a.el, { opacity: 0, y: 10, duration: reducedMotion() ? 0.2 : 0.9, ease: 'power2.in' });
    this.flip(() => a.destroy());
  }

  /**
   * 무대 자리가 바뀔 때(누가 들어오거나 나갈 때) 남은 사람들이 순간이동하지 않고
   * 새 자리로 미끄러지듯 옮겨 가게 한다 (FLIP).
   */
  private flip(change: () => void, skip?: Actor): void {
    const before = new Map([...this.actors.values()].filter((a) => a !== skip).map((a) => [a, a.el.getBoundingClientRect().left] as const));
    change();
    if (reducedMotion()) return;
    // x는 동작(걷기·포옹)이 쓰므로, 자리 옮김은 따로 xPercent로 (둘이 겹쳐도 서로 안 망가짐)
    for (const [a, left] of before) {
      if (!a.el.isConnected || !a.el.offsetWidth) continue;
      const dx = left - a.el.getBoundingClientRect().left;
      if (Math.abs(dx) > 1) gsap.fromTo(a.el, { xPercent: (dx / a.el.offsetWidth) * 100 }, { xPercent: 0, duration: 1.1, ease: 'power2.inOut', overwrite: false });
    }
  }

  // ── 등장·퇴장·두 사람 동작 (engine/actions.ts) ──

  /** 옆에서 걸어 들어온다. 보는 쪽의 반대편에서 (오른쪽을 보면 왼쪽 밖에서) 들어온다 */
  walkIn(a: Actor): gsap.core.Timeline {
    const rm = reducedMotion();
    const tl = gsap.timeline();
    if (rm) return tl.fromTo(a.el, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    const box = this.el.getBoundingClientRect();
    const r = a.el.getBoundingClientRect();
    const fromLeft = a.faces === 'right';
    const off = fromLeft ? -(r.right - box.left + 24) : box.right - r.left + 24;
    const dur = Math.min(2.6, 1.2 + Math.abs(off) / 600);
    tl.fromTo(a.el, { x: off, opacity: 1 }, { x: 0, duration: dur, ease: 'power1.out' })
      // 걸음: 몸이 걸음마다 아주 살짝 오르내린다
      .fromTo(a.el, { y: 0 }, { y: -4, duration: 0.26, ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.round(dur / 0.26) - 1) }, 0)
      .set(a.el, { y: 0 });
    return tl;
  }

  /** 보는 쪽으로 걸어 나간다 → 무대에서 빠진다 */
  async walkOut(id: string): Promise<void> {
    const a = this.actors.get(id);
    if (!a) return;
    this.actors.delete(id);
    a.setDim(false);
    const rm = reducedMotion();
    if (rm) await gsap.to(a.el, { opacity: 0, duration: 0.3 });
    else {
      const box = this.el.getBoundingClientRect();
      const r = a.el.getBoundingClientRect();
      const off = a.faces === 'right' ? box.right - r.left + 24 : -(r.right - box.left + 24);
      const dur = Math.min(2.6, 1.2 + Math.abs(off) / 600);
      await gsap.timeline()
        .to(a.el, { x: `+=${off}`, duration: dur, ease: 'power1.in' })
        .to(a.el, { y: -4, duration: 0.26, ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.round(dur / 0.26) - 1) }, 0);
    }
    this.recount();
    this.flip(() => a.destroy());
  }

  /** 떠나감: 지평선 쪽으로 작아지며 멀어진다 → 무대에서 빠진다 */
  async leave(id: string): Promise<void> {
    const a = this.actors.get(id);
    if (!a) return;
    this.actors.delete(id);
    const rm = reducedMotion();
    await gsap.to(a.el, rm
      ? { opacity: 0, duration: 0.4 }
      : { scale: 0.32, y: -a.el.offsetHeight * 0.16, opacity: 0, filter: 'brightness(0.6)', duration: 3.4, ease: 'power1.in' });
    this.recount();
    this.flip(() => a.destroy());
  }

  /** a가 b 쪽을 본다 */
  faceToward(a: Actor, b: Actor): void {
    const ax = a.el.getBoundingClientRect();
    const bx = b.el.getBoundingClientRect();
    a.face(bx.left + bx.width / 2 >= ax.left + ax.width / 2 ? 'right' : 'left');
  }

  /** 두 사람이 서로 본다 */
  faceEachOther(a: Actor, b: Actor): void {
    this.faceToward(a, b);
    this.faceToward(b, a);
  }

  /** 가운데 사이 거리 (px, b가 오른쪽이면 +) */
  private gap(a: Actor, b: Actor): number {
    const ar = a.el.getBoundingClientRect();
    const br = b.el.getBoundingClientRect();
    return br.left + br.width / 2 - (ar.left + ar.width / 2);
  }

  /** a가 b 쪽으로 몇 걸음 다가간다 */
  approach(a: Actor, b: Actor): void {
    this.faceToward(a, b);
    const g = this.gap(a, b);
    const step = g * 0.34;
    gsap.to(a.el, { x: `+=${step}`, duration: reducedMotion() ? 0.3 : 1.3, ease: 'power2.inOut' });
  }

  /** 포옹: 두 사람이 마주 보고 다가가 겹친다 */
  embrace(a: Actor, b: Actor): void {
    this.faceEachOther(a, b);
    const g = this.gap(a, b);
    const w = (a.el.offsetWidth + b.el.offsetWidth) / 2;
    const close = Math.sign(g) * w * 0.36;
    const each = (g - close) / 2;
    const rm = reducedMotion();
    gsap.to(a.el, { x: `+=${each}`, duration: rm ? 0.3 : 1.5, ease: 'power2.inOut' });
    gsap.to(b.el, { x: `-=${each}`, duration: rm ? 0.3 : 1.5, ease: 'power2.inOut' });
    for (const p of [a, b]) {
      const parts = p.partsFor();
      if (parts.upper) gsap.to(parts.upper, { rotation: 7, duration: rm ? 0.01 : 1.4, delay: rm ? 0 : 0.6, ease: 'power2.out' });
      if (parts.head) gsap.to(parts.head, { rotation: 10, duration: rm ? 0.01 : 1.4, delay: rm ? 0 : 0.6, ease: 'power2.out' });
      if (parts.armL) gsap.to(parts.armL, { rotation: -62, duration: rm ? 0.01 : 1.2, delay: rm ? 0 : 0.8, ease: 'power2.out' });
    }
  }

  /** 포옹·다가감을 풀고 제자리로 */
  part(a: Actor): void {
    gsap.to(a.el, { x: 0, duration: reducedMotion() ? 0.3 : 1.2, ease: 'power2.inOut' });
    a.perform('stand');
  }

  /** 다툼: 두 사람이 번갈아 몸을 들이밀며 맞선다 */
  argue(a: Actor, b: Actor): void {
    this.faceEachOther(a, b);
    if (reducedMotion()) return;
    const dir = Math.sign(this.gap(a, b)) || 1;
    const tl = gsap.timeline();
    const jab = (p: Actor, sign: number, at: number) => {
      const parts = p.partsFor();
      tl.to(p.el, { x: `+=${sign * 10}`, duration: 0.22, ease: 'power3.out' }, at)
        .to(p.el, { x: `-=${sign * 10}`, duration: 0.5, ease: 'power2.inOut' }, at + 0.28);
      if (parts.upper) tl.to(parts.upper, { rotation: 9, duration: 0.22, ease: 'power3.out' }, at).to(parts.upper, { rotation: 2, duration: 0.5 }, at + 0.28);
      if (parts.armL) tl.to(parts.armL, { rotation: -55, duration: 0.2 }, at).to(parts.armL, { rotation: 0, duration: 0.5 }, at + 0.3);
    };
    jab(a, dir, 0);
    jab(b, -dir, 0.7);
    jab(a, dir, 1.4);
    jab(b, -dir, 2.0);
  }

  /** 무대 폭을 몇 사람 몫으로 나눌지 (무리 그림은 2명 몫) */
  private recount(): void {
    let n = 0;
    this.actors.forEach((a) => (n += a.def.slots ?? 1));
    this.el.dataset.count = String(n);
  }

  /** id = 말하는 인물. null이면 내레이션(모두 보통 밝기). */
  setSpeaker(id: string | null): void {
    for (const [key, a] of this.actors) {
      if (id == null) {
        a.setDim(false);
        a.setSpeaking(false);
      } else if (key === id) a.setSpeaking(true);
      else a.setDim(true);
    }
  }

  destroy(): void {
    this.actors.forEach((a) => a.destroy());
    this.actors.clear();
    this.el.remove();
  }
}
