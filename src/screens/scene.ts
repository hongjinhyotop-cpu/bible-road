// 에피소드 재생기 화면 (#/scene/gen-1-light).
// 무대(인물 실루엣) + 아래 독(dock)에 한 번에 하나씩: 이야기 글 / 본문 카드 / 선택지 / 해설.
// 탭·스페이스·엔터 = 다음 (글이 번지는 중이면 먼저 전체 표시), 숫자키 = 선택지.
// B급 에피소드는 동작 라이브러리(engine/actions.ts)·배경 라이브러리(fx/places.ts)·키트 인물(characters/_kit.ts)로 움직인다.
import gsap from 'gsap';
import type { Params, Screen } from '../engine/router';
import { go } from '../engine/router';
import { ACTS } from '../engine/acts';
import { completeScene, progress } from '../engine/progress';
import { chaptersDoneWith, nextItem } from '../engine/content';
import { bindNext, finaleButton, nextButton } from '../ui/next-button';
import { finaleDue } from '../engine/codex';
import { loadScene, SceneCursor, type ActionStep, type Beat, type ChoiceBeat, type Scene, type SceneFx } from '../engine/scene';
import { reducedMotion } from '../engine/settings';
import { ACT_BG, moodOf } from '../engine/moods';
import { ACTIONS } from '../engine/actions';
import { createCrowd, setCrowd, type CrowdState } from '../fx/crowd';
import { showTravel, type TravelMap } from '../fx/travel';
import { openPassage } from '../ui/passage';
import { person } from '../characters/_kit.ts';
import type { CharacterDef } from '../characters';
import { backdropSvg, bowSvg, fitBackdrops } from '../fx/backdrop';
import { createArk, flyBird, setArkState } from '../fx/ark';
import { Rain } from '../fx/rain';
import { playPlague } from '../fx/plagues';
import { playPassover } from '../fx/passover';
import { createTower, scatter, setTowerState } from '../fx/tower';
import { babble } from '../fx/babble';
import { createItemLayer, setItem } from '../fx/tabernacle';
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

/** 탭하면 빨리 감기는 긴 카메라 연출 (CSS 키프레임 이름) */
const CAMERA = new Set(['ark-pan', 'ark-pullback', 'tower-pullback']);

export function sceneScreen({ id }: Params): Screen {
  const el = document.createElement('section');
  el.className = 'screen play';
  el.dataset.act = '1';
  el.innerHTML = `
    <div class="play__sky" aria-hidden="true"></div>
    <div class="play__halo" aria-hidden="true"></div>
    <div class="play__dusk" aria-hidden="true"></div>
    <div class="play__storm" aria-hidden="true"></div>
    <div class="play__clear" aria-hidden="true"></div>
    <div class="play__night" aria-hidden="true"></div>
    <header class="play__head">
      <button class="icon-btn" data-back aria-label="지도로 가기">${icons.back}</button>
      <p class="play__title"><span class="latin play__numeral"></span><span class="play__name"></span></p>
      <button class="icon-btn" data-text aria-label="본문 전체 보기">${icons.book}</button>
      <button class="icon-btn" data-settings aria-label="설정">${icons.settings}</button>
      <div class="play__bar" aria-hidden="true"><span></span></div>
    </header>
    <div class="scene">
      <div class="scene__backdrop" aria-hidden="true"></div>
      <svg class="scene__land" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
        <path class="far" d="M0 70 C60 40 110 62 170 48 C240 30 300 58 400 40 L400 120 L0 120 Z"/>
        <path class="near" d="M0 92 C80 78 150 96 220 86 C290 76 340 92 400 84 L400 120 L0 120 Z"/>
      </svg>
      <div class="scene__water scene__water--back" aria-hidden="true"></div>
      <div class="scene__water scene__water--front" aria-hidden="true"></div>
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
    <div class="play__flash" aria-hidden="true"></div>
    <div class="play__fade" aria-hidden="true"></div>`;

  const $ = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
  const dock = $('.dock');
  const voice = $('.play__voice');
  // 노아 (창 6–9): 방주는 물 앞뒤 사이에 끼워서, 물이 차오르면 방주 아랫부분이 물에 잠겨 보이게
  const ark = createArk();
  $('.scene__water--back').after(ark);
  const rain = new Rain();
  let movingTimer = 0;
  $('.scene__stage').after(rain.el);
  $('.scene__backdrop').innerHTML = bowSvg();
  // 바벨탑 (창 11): 배경 바로 앞, 언덕 뒤에 선다 (탑 발치가 가까운 언덕에 살짝 묻힌다)
  const tower = createTower();
  $('.scene__backdrop').after(tower);
  // 군중 (동작 crowd-*): 언덕 위, 인물들 뒤
  const crowd = createCrowd();
  $('.scene__stage').before(crowd);
  // 성막 기구 (beat "item"): 인물 앞, 글 상자 뒤
  const items = createItemLayer();
  $('.scene__stage').after(items);
  /** 펼쳐 둔 여정 지도 (동작 travel) */
  let travel: TravelMap | null = null;
  /** 동작만 있는 beat에서 기다리는 중이면, 탭으로 바로 넘긴다 */
  let skipHold: (() => void) | null = null;

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
    if (skipHold) {
      skipHold();
      return;
    }
    if (busy || isSheetOpen()) return;
    if (mode === 'intro') {
      anim?.progress(1);
      return;
    }
    if (mode !== 'tap') return;
    const camera = skipCamera();
    if (anim && anim.progress() < 1) {
      anim.progress(1);
      return;
    }
    if (camera) return;
    void step();
  }

  /**
   * 카메라처럼 길게 도는 CSS 연출(방주를 훑기·물러나기, 탑 올려다보기 등).
   * 탭하면 남은 부분을 0.8초 만에 빨리 감는다. 감았으면 true (그 탭은 다음으로 넘어가지 않는다)
   */
  function skipCamera(): boolean {
    let skipped = false;
    for (const a of $('.scene').getAnimations({ subtree: true })) {
      if (!(a instanceof CSSAnimation) || !CAMERA.has(a.animationName) || a.playState !== 'running') continue;
      const t = a.effect?.getComputedTiming();
      if (!t || t.iterations === Infinity) continue;
      const left = (Number(t.endTime) - Number(a.currentTime ?? 0)) / a.playbackRate;
      if (left > 900) {
        a.updatePlaybackRate((a.playbackRate * left) / 800);
        skipped = true;
      }
    }
    return skipped;
  }

  async function step() {
    if (!cursor || !scene) return;
    busy = true;
    try {
      for (;;) {
        const beat = cursor.next();
        gsap.to($('.play__bar span'), { scaleX: cursor.progress, duration: 0.6, ease: 'power2.out' });
        if (!beat) return await finish();
        await stageChanges(beat);
        if (!alive) return;
        if (beat.type && beat.type !== 'act') {
          await show(beat);
          return;
        }
        // 동작만 있는 beat: 움직임을 잠깐 보여 주고 저절로 다음으로 (탭하면 바로)
        await hold(Math.max(beat.item ? 2.4 : 0.4, ...steps(beat).map((st) => ACTIONS[st.act]?.hold ?? 0.8)));
        if (!alive) return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      busy = false;
    }
  }

  function hold(sec: number): Promise<void> {
    const ms = (reducedMotion() ? Math.min(sec, 0.6) : sec) * 1000;
    return new Promise((resolve) => {
      const done = () => {
        clearTimeout(t);
        skipHold = null;
        resolve();
      };
      const t = setTimeout(done, ms);
      skipHold = done;
    });
  }

  async function show(beat: Beat) {
    if (beat.type !== 'voice') hideVoice();
    switch (beat.type) {
      case 'narration':
      case 'line': {
        stage.setSpeaker(beat.type === 'line' ? beat.who : null);
        const name = beat.type === 'line' ? (scene?.names?.[beat.who] ?? stage.actors.get(beat.who)?.def.name ?? (await castDef(beat.who)).name) : '';
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

  // ── 무대: 등장·퇴장·자세·동작·효과 ──────────────
  const isB = () => scene?.grade === 'B';

  /** beat의 동작들 (act + acts) */
  function steps(beat: Beat): ActionStep[] {
    const out: ActionStep[] = [...(beat.acts ?? [])];
    if (beat.act) out.unshift({ act: beat.act, who: beat.who, to: beat.to, from: beat.from, via: beat.via });
    return out;
  }

  async function stageChanges(beat: Beat) {
    const fx = beat.fx == null ? [] : Array.isArray(beat.fx) ? beat.fx : [beat.fx];
    // 화면 전환(fade): 까맣게 닫고, 그 사이에 배경·인물을 바꾼 뒤 연다
    const fade = fx.includes('fade');
    if (fade) await fadeScreen(true);
    const all = steps(beat);
    // 여정 지도: 이번 beat에 travel이 없으면 접는다
    const trip = all.find((st) => st.act === 'travel');
    if (!trip && travel) {
      void travel.hide();
      travel = null;
    }
    for (const who of beat.exit ?? []) void (isB() ? stage.walkOut(who) : stage.remove(who));
    await Promise.all((beat.enter ?? []).map((who) => addActor(who, true)));
    // 이번에 막 들어온 인물은 처음부터 그 옷을 입고 나온다
    for (const [who, name] of Object.entries(beat.outfit ?? {})) stage.actors.get(who)?.outfit(name, !beat.enter?.includes(who));
    for (const [who, pose] of Object.entries(beat.pose ?? {})) stage.actors.get(who)?.pose(pose);
    for (const [who, dir] of Object.entries(beat.face ?? {})) stage.actors.get(who)?.face(dir);
    const mood = beat.bg ?? beat.mood;
    if (mood) applyMood(mood, !fade);
    // 성막 기구: 화면 전환(fade)이면 어둠 속에서 걷히고, 그 beat에 item이 있으면 화면이 열리며 새로 떠오른다
    if (fade) setItem(el, items, null, true);
    else if (beat.item !== undefined) setItem(el, items, beat.item);
    fx.filter((f) => f !== 'fade').forEach(playFx);
    const had = new Set(stage.actors.keys());
    for (const st of all) await perform(st, beat);
    // 이번 beat의 동작(walk-in)으로 막 들어온 인물도 그 옷을 입고 나온다
    for (const [who, name] of Object.entries(beat.outfit ?? {})) if (!had.has(who)) stage.actors.get(who)?.outfit(name, false);
    if (fade && beat.item) setItem(el, items, beat.item);
    if (fade) await fadeScreen(false);
  }

  /** 동작 하나를 무대에서 한다 (engine/actions.ts) */
  async function perform(st: ActionStep, beat: Beat) {
    const who = [st.who ?? (beat.type === 'line' ? beat.who : undefined)].flat().filter((w): w is string => !!w);
    const info = ACTIONS[st.act];
    if (!info) return console.warn(`[${scene?.id}] 동작 없음: ${st.act}`);
    if (st.act === 'travel') {
      if (!st.to) return;
      travel = showTravel($('.scene'), { from: st.from, to: st.to as never, via: st.via }, travel);
      return;
    }
    if (st.act.startsWith('crowd')) {
      const state = (st.act === 'crowd' ? 'in' : st.act.slice(6)) as CrowdState;
      setCrowd(crowd, state);
      return;
    }
    // walk-in: 무대에 없으면 세우면서 걸어 들어온다
    if (st.act === 'walk-in') {
      for (const w of who) if (!stage.actors.has(w)) await addActor(w, true, 'walk');
      return;
    }
    const actors = who.map((w) => stage.actors.get(w)).filter((a): a is Actor => !!a);
    const other = st.to ? stage.actors.get(st.to) : undefined;
    switch (st.act) {
      case 'walk-out':
        who.forEach((w) => void stage.walkOut(w));
        return;
      case 'leave':
        who.forEach((w) => void stage.leave(w));
        return;
      case 'face':
        if (actors.length >= 2) stage.faceEachOther(actors[0], actors[1]);
        else if (actors[0] && other) stage.faceToward(actors[0], other);
        return;
      case 'approach':
        if (actors[0] && (other ?? actors[1])) stage.approach(actors[0], (other ?? actors[1])!);
        return;
      case 'embrace':
      case 'argue':
      case 'wrestle': {
        const pair = other ? [actors[0], other] : actors.slice(0, 2);
        if (pair.length === 2 && pair[0] && pair[1]) stage[st.act](pair[0], pair[1]);
        return;
      }
      case 'bow-seven':
        actors.forEach((a) => stage.bowSeven(a, other));
        return;
      case 'part':
        actors.forEach((a) => stage.part(a));
        return;
    }
    actors.forEach((a) => a.perform(st.act));
  }

  /** 화면 전환: 까맣게 닫힘(true) / 열림(false) */
  function fadeScreen(close: boolean): Promise<unknown> {
    const rm = reducedMotion();
    const veil = $('.play__fade');
    return gsap.to(veil, close
      ? { opacity: 1, duration: rm ? 0.2 : 0.8, ease: 'power2.in' }
      : { opacity: 0, duration: rm ? 0.3 : 1.2, ease: 'power2.out', delay: rm ? 0 : 0.25 }) as unknown as Promise<unknown>;
  }

  /** 등장인물 그림: 장면의 extras(키트 조연) → 인물 파일 순서로 찾는다 */
  async function castDef(who: string): Promise<CharacterDef> {
    const extra = scene?.extras?.[who];
    if (extra) return person({ id: who, ...extra });
    return loadCharacter(who);
  }

  async function addActor(who: string, animate: boolean, how?: 'walk'): Promise<Actor | undefined> {
    if (stage.actors.has(who)) return stage.actors.get(who);
    const actor = stage.add(new Actor(await castDef(who)));
    // B급은 옆에서 걸어 들어오는 게 기본 등장
    if (animate && (how === 'walk' || (isB() && mode !== 'loading'))) {
      tweens.push(stage.walkIn(actor));
    } else if (animate) {
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
      case 'raven':
      case 'dove':
      case 'dove-leaf':
      case 'dove-away':
        flyBird(ark, fx);
        return;
      case 'descend': {
        // 하나님은 그리지 않는다: 하늘에서 탑 위로 내려오는 빛기둥만 (CLAUDE.md 8-1)
        const beam = document.createElement('div');
        beam.className = 'fx-descend';
        $('.scene').append(beam);
        beam.addEventListener('animationend', (e) => e.target === beam && beam.remove());
        setTimeout(() => beam.remove(), 9000);
        return;
      }
      case 'babble':
        babble($('.scene'));
        return;
      case 'scatter':
        scatter(tower);
        return;
      case 'thunder':
        playFx('flash');
        playFx('shake');
        return;
      case 'rain-start':
        rain.set(2);
        return;
      case 'rain-stop':
        rain.set(0);
        return;
      case 'frogs':
      case 'gnats':
      case 'flies':
      case 'ash':
      case 'hail':
      case 'locusts':
        // 애굽의 재앙 (fx/plagues.ts): 무대 위에 잠깐 깔렸다 사라지는 층
        playPlague($('.scene'), fx, rm);
        return;
      case 'passover':
        // 유월절 밤 (fx/passover.ts): 어두운 바람이 쓸고 지나가고, 피 바른 문만 불빛이 남는다
        playPassover($('.scene'), rm);
        return;
      case 'glory':
      case 'fire':
      case 'stars':
      case 'dust': {
        // 효과 라이브러리: 무대 위에 잠깐 깔렸다 사라지는 층 (모양은 styles/library.css)
        const layer = document.createElement('div');
        layer.className = `fx-${fx}`;
        if (fx === 'stars') {
          layer.innerHTML = Array.from({ length: 70 }, (_, i) => `<i style="--x:${(Math.random() * 100).toFixed(1)}%; --y:${(Math.random() * 62).toFixed(1)}%; --d:${(i * 0.06 + Math.random() * 0.8).toFixed(2)}s; --s:${(0.5 + Math.random() * 1.6).toFixed(2)}"></i>`).join('');
        }
        if (fx === 'fire') layer.innerHTML = '<i></i><i></i><i></i><b></b>';
        if (fx === 'dust') layer.innerHTML = Array.from({ length: 18 }, () => `<i style="--y:${(Math.random() * 90).toFixed(1)}%; --d:${(Math.random() * 1.6).toFixed(2)}s; --w:${(20 + Math.random() * 40).toFixed(0)}%"></i>`).join('');
        $('.scene').append(layer);
        const life = { glory: 7000, fire: 9000, stars: 12000, dust: 5000 }[fx];
        setTimeout(() => layer.classList.add('is-out'), rm ? 1200 : life - 1600);
        setTimeout(() => layer.remove(), rm ? 2000 : life);
        return;
      }
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
    if (travel) {
      void travel.hide();
      travel = null;
    }
    stage.actors.forEach((a) => a.setDim(true));
    setItem(el, items, null);
    const known = progress.get().characters;
    const fresh = (scene.unlocks?.characters ?? []).filter((c) => !known[c]);
    const chapters = await chaptersDoneWith('scene', scene.id).catch(() => []);
    completeScene(scene.id, chapters, scene.unlocks?.characters ?? []);
    const next = await nextItem('scene', scene.id).catch(() => null);
    // 막을 다 끝냈으면 "다음" 대신 막 피날레로
    const finale = finaleDue(scene.act) ? ACTS[scene.act - 1] : null;
    // "이어서 하기"는 다음 장면/읽기(또는 피날레)로 바로 간다
    progress.set({ last: finale ? `finale/${finale.no}` : next ? next.path.slice(1) : 'map' });
    const names = await Promise.all(fresh.map((c) => loadCharacter(c).then((d) => d.name).catch(() => c)));

    const card = document.createElement('article');
    card.className = 'insight voice-talk';
    card.innerHTML = `
      <p class="insight__tag">방금 그거 뭐였냐면</p>
      <div class="insight__text"></div>
      ${scene.tldr ? '<div class="insight__tldr"><span>한 줄 요약</span><p></p></div>' : ''}
      ${names.length ? `<p class="insight__unlock">인물 카드 획득 · <b>${names.join(', ')}</b></p>` : ''}
      <div class="insight__actions">
        ${finale ? finaleButton(finale) : next ? nextButton(next, scene.bridge) : ''}
        <button class="btn${next || finale ? '' : ' btn--primary'}" data-map>지도로 돌아가기</button>
        <button class="btn" data-again>다시 보기</button>
        <button class="btn" data-fulltext>본문 전체 보기</button>
      </div>`;
    paragraphs(card.querySelector<HTMLElement>('.insight__text')!, scene.insight);
    const tldr = card.querySelector('.insight__tldr p');
    if (tldr) tldr.textContent = scene.tldr!;
    card.querySelector('[data-map]')!.addEventListener('click', (e) => go('/map', { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY }));
    card.querySelector('[data-again]')!.addEventListener('click', () => void restart());
    card.querySelector('[data-fulltext]')!.addEventListener('click', openFullText);
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
    // 밤에는 배경 입자가 먼지 대신 별
    setFieldMode(m.tone === 'night' ? 'stars' : 'dust');
    // 방주·물·비·무지개 (창 6–9). 장면 처음엔 연출 없이 바로 그 상태로
    if (!animate) {
      el.classList.add('is-instant');
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('is-instant')));
    }
    // 방주·물이 실제로 바뀔 때만 천천히 움직인다 (독 크기가 바뀌어 무대 높이가 달라질 때는 바로 따라가게)
    const arkMoves =
      (ark.dataset.state ?? '') !== (m.ark ?? '') ||
      (tower.dataset.state ?? '') !== (m.tower ?? '') ||
      el.style.getPropertyValue('--water') !== String(m.water ?? 0);
    if (animate && arkMoves) {
      el.classList.add('is-moving');
      clearTimeout(movingTimer);
      movingTimer = setTimeout(() => el.classList.remove('is-moving'), 7600);
    }
    setArkState(ark, m.ark);
    setTowerState(tower, m.tower, !animate);
    if (m.tower) el.dataset.tower = m.tower;
    else delete el.dataset.tower;
    if (m.ark) el.dataset.ark = m.ark;
    else delete el.dataset.ark;
    el.style.setProperty('--water', String(m.water ?? 0));
    el.dataset.water = m.water ? '1' : '0';
    el.dataset.bow = m.bow ? '1' : '0';
    el.dataset.spread = m.spread ? '1' : '0';
    rain.set(m.rain ?? 0);

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
    applyMood(scene.bg ?? scene.mood ?? ACT_BG[scene.act], false);
    setCrowd(crowd, null);
    setItem(el, items, null, true);
    travel?.el.remove();
    travel = null;
    gsap.set($('.play__fade'), { opacity: 0 });
    setMode('loading');
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
    $('[data-text]').addEventListener('click', openFullText);
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

  /** 본문 전체 보기: 에피소드가 덮는 개역한글 전체 + 카드로 나온 구절 금빛 표시 */
  function openFullText() {
    if (!scene) return;
    const keys = [...scene.beats, ...Object.values(scene.branches ?? {}).flat()].flatMap((b) => (b.type === 'scripture' ? [b.ref] : []));
    void openPassage(scene.ref, scene.title, keys);
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
      rain.destroy();
      skipHold = null;
      setFieldMode('dust');
      clearTimeout(movingTimer);
      setFieldIntensity(1);
    },
  };
}
