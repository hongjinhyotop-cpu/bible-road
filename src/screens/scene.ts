// 장면 재생기 화면 (#/scene/gen-1-light).
// 무대(인물 실루엣) + 아래 독(dock)에 한 번에 하나씩: 이야기 글 / 본문 카드 / 선택지 / 해설.
// 탭·스페이스·엔터 = 다음 (글이 번지는 중이면 먼저 전체 표시), 숫자키 = 선택지.
import gsap from 'gsap';
import type { Params, Screen } from '../engine/router';
import { go } from '../engine/router';
import { ACTS } from '../engine/acts';
import { completeScene, progress } from '../engine/progress';
import { chaptersDoneWith, nextItem } from '../engine/content';
import { bindNext, nextButton } from '../ui/next-button';
import { loadScene, SceneCursor, type Beat, type ChoiceBeat, type Scene, type SceneFx } from '../engine/scene';
import { reducedMotion } from '../engine/settings';
import { moodOf } from '../engine/moods';
import { backdropSvg, fitBackdrops } from '../fx/backdrop';
import { loadCharacter } from '../characters';
import { inkReveal } from '../fx/ink';
import { getFieldIntensity, setFieldIntensity, setFieldMode } from '../fx/particles';
import { Actor, Stage } from '../ui/actor';
import { icons } from '../ui/icons';
import { paragraphs } from '../ui/paragraphs';
import { revealScripture, scriptureCard } from '../ui/scripture-card';
import { openSettings } from '../ui/settings-sheet';
import { isSheetOpen } from '../ui/sheet';

type Mode = 'loading' | 'intro' | 'tap' | 'choice' | 'end';

export function sceneScreen({ id }: Params): Screen {
  const el = document.createElement('section');
  el.className = 'screen play';
  el.dataset.act = '1';
  el.innerHTML = `
    <div class="play__sky" aria-hidden="true"></div>
    <div class="play__halo" aria-hidden="true"></div>
    <div class="play__dusk" aria-hidden="true"></div>
    <header class="play__head">
      <button class="icon-btn" data-back aria-label="지도로 가기">${icons.back}</button>
      <p class="play__title"><span class="latin play__numeral"></span><span class="play__name"></span></p>
      <button class="icon-btn" data-settings aria-label="설정">${icons.settings}</button>
      <div class="play__bar" aria-hidden="true"><span></span></div>
    </header>
    <div class="scene">
      <div class="scene__backdrop" aria-hidden="true"></div>
      <svg class="scene__land" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
        <path class="far" d="M0 70 C60 40 110 62 170 48 C240 30 300 58 400 40 L400 120 L0 120 Z"/>
        <path class="near" d="M0 92 C80 78 150 96 220 86 C290 76 340 92 400 84 L400 120 L0 120 Z"/>
      </svg>
      <div class="scene__stage"></div>
      <p class="play__voice" aria-live="polite"></p>
    </div>
    <div class="dock" aria-live="polite"></div>
    <p class="play__hint ui" aria-hidden="true">탭하면 다음</p>
    <div class="play__intro" aria-hidden="true">
      <p class="play__intro-act latin"></p>
      <h1 class="play__intro-title"></h1>
      <p class="play__intro-ref ui"></p>
    </div>
    <div class="play__flash" aria-hidden="true"></div>`;

  const $ = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
  const dock = $('.dock');
  const voice = $('.play__voice');

  let scene: Scene | null = null;
  let cursor: SceneCursor | null = null;
  let stage = new Stage();
  let mode: Mode = 'loading';
  /** 지금 진행 중인 연출. 탭하면 먼저 이걸 끝까지 보여준다 */
  let anim: gsap.core.Animation | null = null;
  let busy = false;
  let alive = true;
  const tweens: gsap.core.Animation[] = [];
  // PC 넓은 화면에서는 배경 높이를 다 보여 준다 (큰 나무 윗부분이 잘리지 않게)
  const fit = new ResizeObserver(() => fitBackdrops($('.scene__backdrop')));

  // ── 진행 ──────────────────────────────────────
  function setMode(m: Mode) {
    mode = m;
    el.dataset.mode = m;
  }

  function advance() {
    if (busy || isSheetOpen()) return;
    if (mode === 'intro') {
      anim?.progress(1);
      return;
    }
    if (mode !== 'tap') return;
    if (anim && anim.progress() < 1) {
      anim.progress(1);
      return;
    }
    void step();
  }

  async function step() {
    if (!cursor || !scene) return;
    busy = true;
    try {
      const beat = cursor.next();
      gsap.to($('.play__bar span'), { scaleX: cursor.progress, duration: 0.6, ease: 'power2.out' });
      if (!beat) return await finish();
      await stageChanges(beat);
      if (!alive) return;
      await show(beat);
    } catch (err) {
      console.error(err);
    } finally {
      busy = false;
    }
  }

  async function show(beat: Beat) {
    if (beat.type !== 'voice') hideVoice();
    switch (beat.type) {
      case 'narration':
      case 'line': {
        stage.setSpeaker(beat.type === 'line' ? beat.who : null);
        const name = beat.type === 'line' ? (stage.actors.get(beat.who)?.def.name ?? (await loadCharacter(beat.who)).name) : '';
        await showText(beat.text, name);
        break;
      }
      case 'voice':
        stage.setSpeaker(null);
        await swapDock(null);
        showVoice(beat.text);
        break;
      case 'scripture': {
        stage.setSpeaker(null);
        const block = await scriptureCard(beat.ref, { gloss: beat.gloss });
        await swapDock(block);
        anim = revealScripture(block);
        setMode('tap');
        break;
      }
      case 'choice':
        stage.setSpeaker(null);
        await showChoice(beat);
        break;
    }
  }

  // ── 무대: 등장·퇴장·자세·효과 ──────────────────
  async function stageChanges(beat: Beat) {
    for (const who of beat.exit ?? []) void stage.remove(who);
    await Promise.all((beat.enter ?? []).map((who) => addActor(who, true)));
    // 이번에 막 들어온 인물은 처음부터 그 옷을 입고 나온다
    for (const [who, name] of Object.entries(beat.outfit ?? {})) stage.actors.get(who)?.outfit(name, !beat.enter?.includes(who));
    for (const [who, pose] of Object.entries(beat.pose ?? {})) stage.actors.get(who)?.pose(pose);
    for (const [who, dir] of Object.entries(beat.face ?? {})) stage.actors.get(who)?.face(dir);
    if (beat.mood) applyMood(beat.mood, true);
    const fx = beat.fx == null ? [] : Array.isArray(beat.fx) ? beat.fx : [beat.fx];
    fx.forEach(playFx);
  }

  async function addActor(who: string, animate: boolean): Promise<Actor | undefined> {
    if (stage.actors.has(who)) return stage.actors.get(who);
    const actor = stage.add(new Actor(await loadCharacter(who)));
    if (animate) {
      const rm = reducedMotion();
      tweens.push(
        gsap.fromTo(actor.el, { opacity: 0, y: rm ? 0 : 24 }, { opacity: 1, y: 0, duration: rm ? 0.4 : 1.6, ease: 'expo.out' }),
      );
    }
    return actor;
  }

  function setLight(on: boolean) {
    el.dataset.light = on ? '1' : '0';
    const fi = { v: getFieldIntensity() };
    tweens.push(gsap.to(fi, { v: on ? 1 : 0.3, duration: reducedMotion() ? 0.3 : 3, ease: 'power1.inOut', onUpdate: () => setFieldIntensity(fi.v) }));
  }

  function playFx(fx: SceneFx) {
    const rm = reducedMotion();
    switch (fx) {
      case 'dawn':
        return setLight(true);
      case 'dark':
        return setLight(false);
      case 'land':
        el.dataset.land = '1';
        return;
      case 'flash':
        tweens.push(
          gsap.timeline()
            .fromTo($('.play__flash'), { opacity: 0 }, { opacity: rm ? 0.35 : 0.95, duration: rm ? 0.3 : 0.25, ease: 'power2.in' })
            .to($('.play__flash'), { opacity: 0, duration: rm ? 0.5 : 2.2, ease: 'power2.out' }),
        );
        return;
      case 'shake':
        if (!rm) tweens.push(gsap.fromTo($('.scene'), { x: -6 }, { x: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.2)' }));
        return;
    }
  }

  // ── 독(dock): 화면 아래 한 장씩 ─────────────────
  /** 독 안의 카드를 바꾼다: 옛것은 흐려지고 새것이 들어온다 */
  async function swapDock(next: HTMLElement | null) {
    const old = dock.firstElementChild as HTMLElement | null;
    if (old) {
      await gsap.to(old, { opacity: 0, y: reducedMotion() ? 0 : -8, duration: 0.28, ease: 'power2.in' });
      old.remove();
    }
    if (next) {
      dock.append(next);
      dock.scrollTop = 0;
    }
  }

  async function showText(text: string, speaker: string) {
    let box = dock.querySelector<HTMLElement>('.textbox');
    if (!box) {
      box = document.createElement('div');
      box.className = 'textbox';
      box.innerHTML = `<p class="textbox__name"></p><p class="textbox__text voice-story"></p>`;
      await swapDock(box);
      gsap.fromTo(box, { opacity: 0, y: reducedMotion() ? 0 : 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' });
    }
    const name = box.querySelector<HTMLElement>('.textbox__name')!;
    name.textContent = speaker;
    name.hidden = !speaker;
    anim = inkReveal(box.querySelector<HTMLElement>('.textbox__text')!, text).timeline;
    setMode('tap');
  }

  /** 하나님의 목소리: 인물 없이, 무대 한가운데 빛나는 글자로만 */
  function showVoice(text: string) {
    voice.hidden = false;
    gsap.set(voice, { opacity: 1 });
    anim = inkReveal(voice, text, reducedMotion() ? {} : { stagger: 0.22, duration: 1.6, glow: true }).timeline;
    setMode('tap');
  }

  function hideVoice() {
    if (voice.hidden) return;
    gsap.to(voice, { opacity: 0, duration: 0.6, onComplete: () => { voice.hidden = true; } });
  }

  async function showChoice(beat: ChoiceBeat) {
    const box = document.createElement('div');
    box.className = 'choices';
    box.innerHTML = `<p class="choices__prompt voice-story"></p><div class="choices__list" role="group"></div>`;
    box.querySelector('.choices__prompt')!.textContent = beat.prompt;
    const list = box.querySelector('.choices__list')!;
    beat.options.forEach((o, i) => {
      const b = document.createElement('button');
      b.className = 'btn choice';
      b.innerHTML = `<span class="choice__key latin">${i + 1}</span><span class="choice__label"></span>`;
      b.querySelector('.choice__label')!.textContent = o.label;
      b.addEventListener('click', () => void pick(i));
      list.append(b);
    });
    await swapDock(box);
    setMode('choice');
    const rm = reducedMotion();
    anim = gsap.timeline()
      .fromTo(box.querySelector('.choices__prompt'), { opacity: 0 }, { opacity: 1, duration: 0.6 })
      .fromTo(list.children, { opacity: 0, y: rm ? 0 : 14 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.12 }, 0.2);
  }

  async function pick(n: number) {
    if (mode !== 'choice' || busy || !cursor) return;
    busy = true;
    anim?.progress(1);
    const buttons = [...dock.querySelectorAll<HTMLButtonElement>('.choice')];
    buttons.forEach((b, i) => {
      b.disabled = true;
      b.classList.toggle('is-picked', i === n);
    });
    await gsap.to(buttons.filter((_, i) => i !== n), { opacity: 0, duration: 0.4 });
    await gsap.to({}, { duration: reducedMotion() ? 0.1 : 0.45 });
    cursor.choose(n);
    busy = false;
    setMode('tap');
    await step();
  }

  // ── 끝: 해설 + 한 줄 요약 ───────────────────────
  async function finish() {
    if (!scene) return;
    hideVoice();
    stage.actors.forEach((a) => a.setDim(true));
    const known = progress.get().characters;
    const fresh = (scene.unlocks?.characters ?? []).filter((c) => !known[c]);
    const chapters = await chaptersDoneWith('scene', scene.id).catch(() => []);
    completeScene(scene.id, chapters, scene.unlocks?.characters ?? []);
    const next = await nextItem('scene', scene.id).catch(() => null);
    // "이어서 하기"는 다음 장면/읽기로 바로 간다
    progress.set({ last: next ? next.path.slice(1) : 'map' });
    const names = await Promise.all(fresh.map((c) => loadCharacter(c).then((d) => d.name).catch(() => c)));

    const card = document.createElement('article');
    card.className = 'insight voice-talk';
    card.innerHTML = `
      <p class="insight__tag">방금 그거 뭐였냐면</p>
      <div class="insight__text"></div>
      ${scene.tldr ? '<div class="insight__tldr"><span>한 줄 요약</span><p></p></div>' : ''}
      ${names.length ? `<p class="insight__unlock">인물 카드 획득 · <b>${names.join(', ')}</b></p>` : ''}
      <div class="insight__actions">
        ${next ? nextButton(next, scene.bridge) : ''}
        <button class="btn${next ? '' : ' btn--primary'}" data-map>지도로 돌아가기</button>
        <button class="btn" data-again>다시 보기</button>
      </div>`;
    paragraphs(card.querySelector<HTMLElement>('.insight__text')!, scene.insight);
    const tldr = card.querySelector('.insight__tldr p');
    if (tldr) tldr.textContent = scene.tldr!;
    card.querySelector('[data-map]')!.addEventListener('click', (e) => go('/map', { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY }));
    card.querySelector('[data-again]')!.addEventListener('click', () => void restart());
    bindNext(card);
    await swapDock(card);
    setMode('end');
    const rm = reducedMotion();
    anim = gsap.timeline()
      .fromTo(card, { opacity: 0, y: rm ? 0 : 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' })
      .fromTo(card.querySelectorAll(':scope > *'), { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.18 }, 0.2);
    card.querySelector<HTMLButtonElement>('[data-go-next], [data-map]')!.focus({ preventScroll: true });
  }

  // ── 시작 ──────────────────────────────────────
  /** 분위기: 하늘 밝기·언덕·배경 그림·색조. 장면 중간에 바뀌면 배경이 천천히 겹쳐 바뀐다 */
  function applyMood(name: string | undefined, animate: boolean) {
    const m = moodOf(name);
    if (animate) {
      if ((el.dataset.light === '1') !== m.light) setLight(m.light);
    } else {
      el.dataset.light = m.light ? '1' : '0';
      setFieldIntensity(m.light ? 1 : 0.3);
    }
    el.dataset.land = m.land ? '1' : '0';
    if (m.tone) el.dataset.tone = m.tone;
    else delete el.dataset.tone;

    const box = $('.scene__backdrop');
    if (!animate) box.querySelectorAll('.backdrop').forEach((b, i, all) => i < all.length - 1 && b.remove());
    const old = box.querySelector<SVGElement>('.backdrop:last-child');
    if ((old?.dataset.art ?? '') === (m.art ?? '')) return;
    const rm = reducedMotion();
    if (old) {
      if (animate) tweens.push(gsap.to(old, { opacity: 0, duration: rm ? 0.3 : 2, ease: 'power1.inOut', onComplete: () => old.remove() }));
      else old.remove();
    }
    if (m.art) {
      box.insertAdjacentHTML('beforeend', backdropSvg(m.art));
      fitBackdrops(box);
      const svg = box.lastElementChild!;
      if (animate) tweens.push(gsap.fromTo(svg, { opacity: 0, y: rm ? 0 : 10 }, { opacity: 1, y: 0, duration: rm ? 0.4 : 2.4, ease: 'power2.out' }));
    }
  }

  async function begin() {
    if (!scene) return;
    anim?.kill();
    tweens.forEach((t) => t.kill());
    tweens.length = 0;
    stage.destroy();
    stage = new Stage();
    $('.scene__stage').append(stage.el);
    dock.replaceChildren();
    voice.hidden = true;
    gsap.set($('.play__bar span'), { scaleX: 0 });
    applyMood(scene.mood, false);
    cursor = new SceneCursor(scene);
    await Promise.all((scene.cast ?? []).map((c) => addActor(c, true)));
    for (const [who, name] of Object.entries(scene.outfit ?? {})) stage.actors.get(who)?.outfit(name, false);
    await intro(scene);
    if (alive) await step();
  }

  async function restart() {
    if (busy) return;
    busy = true;
    await gsap.to(el.querySelectorAll('.dock, .scene__stage'), { opacity: 0, duration: 0.5 });
    gsap.set(el.querySelectorAll('.dock, .scene__stage'), { opacity: 1 });
    busy = false;
    await begin();
  }

  /** 장면 첫머리: 막 이름과 장면 제목이 잠깐 떠올랐다 사라진다 */
  async function intro(s: Scene) {
    const box = $('.play__intro');
    const act = ACTS[s.act - 1];
    $('.play__intro-act').textContent = act ? `${act.numeral} · ${act.title}` : '';
    $('.play__intro-ref').textContent = s.ref.replace('-', '–');
    setMode('intro');
    const rm = reducedMotion();
    const title = inkReveal($('.play__intro-title'), s.title, rm ? {} : { stagger: 0.16, duration: 1.4, glow: true });
    title.timeline.pause();
    const tl = gsap.timeline();
    tl.set(box, { autoAlpha: 1 })
      .fromTo($('.play__intro-act'), { opacity: 0, letterSpacing: '0.5em' }, { opacity: 1, letterSpacing: '0.2em', duration: rm ? 0.4 : 1.6, ease: 'expo.out' })
      .add(title.timeline.play(0), rm ? 0.1 : 0.4)
      .fromTo($('.play__intro-ref'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, '>-0.6')
      .to(box, { autoAlpha: 0, duration: rm ? 0.4 : 0.9, ease: 'power2.inOut' }, rm ? '+=0.8' : '+=1.1');
    anim = tl;
    await tl;
  }

  // ── 입력 ──────────────────────────────────────
  function onKey(e: KeyboardEvent) {
    if (isSheetOpen()) return;
    const onButton = (e.target as HTMLElement).closest?.('button');
    if ((e.key === ' ' || e.key === 'Enter') && !onButton) {
      e.preventDefault();
      advance();
    } else if (mode === 'choice' && /^[1-9]$/.test(e.key)) {
      const n = +e.key - 1;
      if (dock.querySelectorAll('.choice')[n]) void pick(n);
    }
  }

  function onClick(e: MouseEvent) {
    if ((e.target as HTMLElement).closest('button, a, .play__head')) return;
    advance();
  }

  async function enter() {
    setFieldMode('dust');
    document.addEventListener('keydown', onKey);
    el.addEventListener('click', onClick);
    fit.observe($('.scene__backdrop'));
    $('[data-back]').addEventListener('click', () => go('/map'));
    $('[data-settings]').addEventListener('click', () => openSettings());
    try {
      scene = await loadScene(id);
    } catch (err) {
      console.warn(err);
      dock.innerHTML = `<div class="insight voice-talk"><p class="insight__text">어… 이 장면은 아직 없음. 주소가 틀렸거나 아직 안 만든 듯.</p><div class="insight__actions"><button class="btn btn--primary" data-map>지도로 돌아가기</button></div></div>`;
      dock.querySelector('[data-map]')!.addEventListener('click', () => go('/map'));
      setMode('end');
      return;
    }
    if (!alive) return;
    el.dataset.act = String(scene.act);
    $('.play__numeral').textContent = ACTS[scene.act - 1]?.numeral ?? '';
    $('.play__name').textContent = scene.title;
    progress.set({ last: `scene/${scene.id}`, startedAt: progress.get().startedAt ?? Date.now() });
    await begin();
  }

  return {
    el,
    enter: () => void enter(),
    leave() {
      alive = false;
      document.removeEventListener('keydown', onKey);
      fit.disconnect();
      anim?.kill();
      tweens.forEach((t) => t.kill());
      stage.destroy();
      setFieldIntensity(1);
    },
  };
}
