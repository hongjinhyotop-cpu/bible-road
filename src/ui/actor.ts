// 무대 위 인물 하나 (CLAUDE.md 8-1).
// 역광 실루엣 + 종이 그림자극 느낌. 숨쉬기·옷자락은 늘 조금씩 움직이고,
// 말할 때는 앞으로 나오며 밝아지고, 감정에 따라 자세가 바뀐다.
import gsap from 'gsap';
import type { CharacterDef, Part } from '../characters';
import { reducedMotion } from '../engine/settings';

export type Pose = 'neutral' | 'slump' | 'lift' | 'tremble';

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

  constructor(readonly def: CharacterDef) {
    this.el = document.createElement('div');
    this.el.className = 'actor';
    this.el.dataset.id = def.id;
    this.el.setAttribute('role', 'img');
    this.el.setAttribute('aria-label', def.name);
    const art = def.art;

    if (art.kind === 'svg') {
      const id = `rim-${def.id}-${++uid}`;
      const [w, h] = art.viewBox;
      this.el.style.aspectRatio = `${w} / ${h}`;
      this.el.innerHTML = `
        <div class="actor__backlight" aria-hidden="true"></div>
        <svg class="actor__art" viewBox="0 0 ${w} ${h}" aria-hidden="true" overflow="visible">
          <defs>
            <filter id="${id}" x="-25%" y="-10%" width="150%" height="125%" color-interpolation-filters="sRGB">
              <feOffset in="SourceAlpha" dx="5" dy="4" result="off"/>
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
      this.el.innerHTML = `<div class="actor__backlight" aria-hidden="true"></div><img class="actor__art" src="${art.src}" alt="" />`;
      this.body = this.el.querySelector('.actor__art')!;
    }
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

  add(actor: Actor): Actor {
    this.actors.set(actor.def.id, actor);
    this.el.append(actor.el);
    this.el.dataset.count = String(this.actors.size);
    actor.start();
    return actor;
  }

  /** 무대에서 내보낸다 (천천히 흐려지며 사라짐) */
  async remove(id: string): Promise<void> {
    const a = this.actors.get(id);
    if (!a) return;
    this.actors.delete(id);
    this.el.dataset.count = String(this.actors.size);
    await gsap.to(a.el, { opacity: 0, y: 10, duration: reducedMotion() ? 0.2 : 0.9, ease: 'power2.in' });
    a.destroy();
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
