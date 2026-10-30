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
import { showAllot, type AllotMap } from '../fx/allot';
import { showCycle, ROUNDS, type CycleRing } from '../fx/cycle';
import { openPassage } from '../ui/passage';
import { person } from '../characters/_kit.ts';
import type { CharacterDef } from '../characters';
import { backdropSvg, bowSvg, fitBackdrops } from '../fx/backdrop';
import { createArk, flyBird, setArkState } from '../fx/ark';
import { Rain } from '../fx/rain';
import { playPlague } from '../fx/plagues';
import { playPassover } from '../fx/passover';
import { playEastWind } from '../fx/sea';
import { playWeep } from '../fx/hall';
import { playSignet } from '../fx/egypt-court';
import { playTrumpet } from '../fx/sinai';
import { playQuail, playStink } from '../fx/manna';
import { playKites, playTorchPass } from '../fx/covenant';
import { playTabletsBreak } from '../fx/calf';
import { playConfess, playIncense, playLots, playScapegoat } from '../fx/atonement';
import { playFireFall } from '../fx/ordination';
import { playStrangeFire } from '../fx/strangefire';
import { playClap, playEyesOpen, playStrike } from '../fx/balaam';
import { playEarthOpen, playPlagueStop } from '../fx/korah';
import { playGrasshopper } from '../fx/spies';
import { playMantle, playStrikeTwice } from '../fx/meribah';
import { playFierySerpents, playSerpentLift } from '../fx/brazen';
import { playAmen, playEagle, playLandShow, playPassOn, playShema } from '../fx/deuteronomy';
import { playLots as playJoshLots, playMarch, playShout, playSunStand } from '../fx/joshua';
import { playFlameUp, playFoxes, playGenealogy, playLament, playPillars, playSummons, playTorches } from '../fx/judges';
import { playBlind } from '../fx/sodom';
import { playLittleRobes } from '../fx/samuel';
import { playRise } from '../fx/gilboa';
import { playAnoint, playSaulLots } from '../fx/saul';
import { playLyre, playSling, playTopple } from '../fx/david';
import { playAccuse, playDance, playLetter } from '../fx/kingship';
import { playStones } from '../fx/absalom';
import { playArrows, playHem, playSpearThrow } from '../fx/jonathan';
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

/** 글 없이 효과만 있는 beat에서 기다리는 시간 (초) */
const FX_HOLD: Partial<Record<SceneFx, number>> = { pillars: 4.2, torches: 4.5, foxes: 4.5, 'flame-up': 4, summons: 3.6, lament: 5, genealogy: 8, 'little-robes': 8, anoint: 5.2, 'saul-lots': 10, lyre: 4.5, sling: 2.4, topple: 3, dance: 5, letter: 4, accuse: 4, 'spear-throw': 2.6, arrows: 4.4, hem: 3.6 };

/** 탭하면 빨리 감기는 긴 카메라 연출 (CSS 키프레임 이름) */
const CAMERA = new Set(['ark-pan', 'ark-pullback', 'tower-pullback', 'sea-rise', 'sea-drain', 'sea-fall', 'sea-cover', 'sea-burst', 'dt-reveal', 'sl-an-beam', 'sl-an-horn', 'sl-an-stream', 'sl-an-crown', 'sl-an-body']);

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
      <div class="scene__memory" aria-hidden="true"><span class="scene__memory-tag"></span></div>
      <div class="scene__decay" aria-hidden="true"></div>
      <div class="scene__black" aria-hidden="true"></div>
      <p class="scene__sound" aria-hidden="true"></p>
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
  /** 펼쳐 둔 땅 분배 지도 (beat 필드 allot) */
  let allotMap: AllotMap | null = null;
  /** 사사기의 순환 고리 (beat 필드 cycle) */
  let cycleRing: CycleRing | null = null;
  /** 동작만 있는 beat에서 기다리는 중이면, 탭으로 바로 넘긴다 */
  let skipHold: (() => void) | null = null;

  let scene: Scene | null = null;
  let cursor: SceneCursor | null = null;
  /** 지금 이름표 (장면의 names에서 시작, beat의 names로 그 beat부터 바뀜) */
  let names: Record<string, string> = {};
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
        const ring = beat.cycle ? (beat.cycle.broken ? 5.4 : beat.cycle.at ? 1.8 : 6) : 0;
        // 글 없는 beat의 긴 효과는 끝까지 보여 준다 (다음 beat의 암전·배경 전환에 가리지 않게)
        const longFx = Math.max(0, ...[beat.fx ?? []].flat().map((f) => FX_HOLD[f] ?? 0));
        await hold(Math.max(beat.item ? 2.4 : beat.allot ? 2.8 : 0.4, ring, beat.sound ? 3 : 0, longFx, ...steps(beat).map((st) => ACTIONS[st.act]?.hold ?? 0.8)));
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
        const name = beat.type === 'line' ? (names[beat.who] ?? stage.actors.get(beat.who)?.def.name ?? (await castDef(beat.who)).name) : '';
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
    if (fade) {
      await fadeScreen(true);
      // 까만 사이에 앞 장면의 효과를 걷는다 (이 beat의 새 효과는 아래에서 다시 깔림)
      clearFx();
    }
    const all = steps(beat);
    // 이름표: 이 beat부터 바꿔 부른다 (예: 총리 → 요셉)
    if (beat.names) Object.assign(names, beat.names);
    // 여정 지도: 이번 beat에 travel이 없으면 접는다
    const trip = all.find((st) => st.act === 'travel');
    if (!trip && travel) {
      void travel.hide();
      travel = null;
    }
    // 암전: 보여 주지 않을 장면은 무대를 까맣게 닫고 소리만 (다음 beat에 blackout이 없으면 열림)
    setBlack(fx.includes('blackout'));
    if (beat.sound) playSound(beat.sound);
    // 남은 소리 글자는 다음 beat에서 걷힘 (암전 없이 sound만 쓴 경우 끝까지 남던 것)
    else $('.scene__sound').classList.remove('is-on');
    // 순환 고리: 이번 beat에 cycle이 있으면 가운데로 크게 돌고, 없으면 왼쪽 위로 작게 물러나 남는다
    if (beat.cycle) {
      cycleRing = showCycle($('.scene'), beat.cycle, cycleRing);
      setDecay(Math.max(Number(cycleRing.el.dataset.round), Number(el.dataset.decay ?? 0)));
    } else cycleRing?.big(false);
    // 땅 분배 지도: 이번 beat에 allot이 있으면 칠하고, 없으면 접는다
    if (beat.allot) {
      travel?.el.remove();
      travel = null;
      allotMap = showAllot($('.scene'), [beat.allot].flat(), allotMap);
    } else if (allotMap) {
      void allotMap.hide();
      allotMap = null;
    }
    for (const who of beat.exit ?? []) void (isB() ? stage.walkOut(who) : stage.remove(who));
    await addInOrder(beat.enter ?? []);
    // 이번에 막 들어온 인물은 처음부터 그 옷을 입고 나온다
    for (const [who, name] of Object.entries(beat.outfit ?? {})) stage.actors.get(who)?.outfit(name, !beat.enter?.includes(who));
    // 장면 맨 위 "outfit"은 그 장면 내내 기본 옷: 중간에 들어오는(다시 들어오는) 인물도 그 옷으로 (창 42–50 요셉의 총리 옷)
    const base = scene?.outfit ?? {};
    for (const who of beat.enter ?? []) if (!beat.outfit?.[who] && base[who]) stage.actors.get(who)?.outfit(base[who], false);
    for (const [who, pose] of Object.entries(beat.pose ?? {})) stage.actors.get(who)?.pose(pose);
    for (const [who, dir] of Object.entries(beat.face ?? {})) stage.actors.get(who)?.face(dir);
    const mood = beat.bg ?? beat.mood;
    if (mood) applyMood(mood, !fade);
    // 성막 기구: 화면 전환(fade)이면 어둠 속에서 걷히고, 그 beat에 item이 있으면 화면이 열리며 새로 떠오른다
    if (fade) setItem(el, items, null, true);
    else if (beat.item !== undefined) setItem(el, items, beat.item);
    fx.filter((f) => f !== 'fade').forEach((f) => playFx(f, beat));
    const had = new Set(stage.actors.keys());
    for (const st of all) await perform(st, beat);
    // 이번 beat의 동작(walk-in)으로 막 들어온 인물도 그 옷을 입고 나온다
    for (const [who, name] of Object.entries(beat.outfit ?? {})) if (!had.has(who)) stage.actors.get(who)?.outfit(name, false);
    for (const [who, name] of Object.entries(base)) if (!had.has(who) && !beat.outfit?.[who]) stage.actors.get(who)?.outfit(name, false);
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

  let shownMood: string | undefined;
  /** 무너져 가는 무대 (사사기): 0 = 그대로, 13 = 가장 어두움 */
  function setDecay(level: number) {
    if (!level) {
      delete el.dataset.decay;
      el.style.removeProperty('--decay');
      return;
    }
    el.dataset.decay = String(level);
    el.style.setProperty('--decay', ((Math.min(level, ROUNDS + 1) / (ROUNDS + 1)) * 0.82).toFixed(3));
  }
  /** 암전 켜기/끄기 */
  function setBlack(on: boolean) {
    if (on) el.dataset.black = '1';
    else delete el.dataset.black;
  }
  /** 소리 글자: 무대 가운데 희미하게 떠올랐다 스러진다 */
  function playSound(text: string) {
    const p = $('.scene__sound');
    p.classList.remove('is-on');
    p.textContent = text;
    void p.offsetWidth;
    p.classList.add('is-on');
  }
  /** 화면 전환: 까맣게 닫힘(true) / 열림(false) */
  /** 잠깐 깔리는 효과 층(fx-*: 불·영광·재앙·불뱀 …)을 바로 걷는다.
   *  각 층은 제 타이머(5~12초)로 사라지는데, 그 사이 화면 전환(fade)이 오면 다음 장면까지 남았다 */
  function clearFx() {
    el.querySelectorAll('.scene > [class^="fx-"], .scene > [class*=" fx-"]').forEach((n) => n.remove());
  }
  /** 배경만 바뀔 때(fade 없이): 앞 배경의 재앙 효과(개구리·이·파리·재·우박·메뚜기)가 새 배경에 10초씩 남지 않게 짧게 흐려지며 걷는다.
   *  불·영광·별 같은 다른 효과는 배경이 바뀌어도 이어지는 연출이 있어서(사다리의 별, 메추라기 …) 그대로 둔다 */
  function clearPlagues() {
    el.querySelectorAll<HTMLElement>('.scene > .fx-plague').forEach((n) => {
      if (reducedMotion()) return n.remove();
      n.classList.add('is-out'); // plagues.css: 1.6초 동안 흐려짐
      setTimeout(() => n.remove(), 1600);
    });
  }

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

  /** 여럿을 한꺼번에 세울 때: 그림은 동시에 불러오되, 무대에는 적힌 순서대로 선다 (불러오는 속도에 따라 자리가 바뀌지 않게) */
  async function addInOrder(list: string[]) {
    await Promise.all(list.map((who) => castDef(who).catch(() => undefined)));
    for (const who of list) await addActor(who, true);
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

  /** 회상(recall) / 앞날(foresee) 필터: 신명기처럼 말하는 사람의 기억·예고를 보여 줄 때. present로 끝남 (fade로는 안 끝남) */
  function setMemory(kind: 'past' | 'future' | null) {
    const tag = el.querySelector<HTMLElement>('.scene__memory-tag');
    if (kind) {
      el.dataset.memory = kind;
      if (tag) tag.textContent = kind === 'past' ? '기억' : '그날이 오면';
    } else delete el.dataset.memory;
  }

  function playFx(fx: SceneFx, beat?: Beat) {
    const rm = reducedMotion();
    switch (fx) {
      case 'recall':
        return setMemory('past');
      case 'foresee':
        return setMemory('future');
      case 'present':
        return setMemory(null);
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
      case 'east-wind':
        // 홍해 (fx/sea.ts): 큰 동풍이 화면을 가로질러 몰아친다
        playEastWind($('.scene'), rm);
        return;
      case 'signet':
        // 요셉의 애굽 (fx/egypt-court.ts): 인장 반지와 금사슬이 반짝인다 (창 41:42)
        playSignet($('.scene'), rm);
        return;
      case 'weep':
        // 나는 요셉이라 (fx/hall.ts): 요셉의 울음이 고리처럼 퍼져 벽 너머로 (창 45:2)
        playWeep($('.scene'), rm);
        return;
      case 'trumpet':
        // 시내산 (fx/sinai.ts): 꼭대기에서 퍼지는 나팔 소리의 고리, 부를 때마다 커진다 (출 19:16-19)
        playTrumpet($('.scene'), rm);
        return;
      case 'quail':
        // 만나 (fx/manna.ts): 메추라기 떼가 낮게 몰려와 진에 내려앉는다 (출 16:13)
        playQuail($('.scene'), rm);
        return;
      case 'stink':
        // 만나 (fx/manna.ts): 아침까지 남겨 둔 것에서 냄새 (출 16:20) — 가볍게
        playStink($('.scene'), rm);
        return;
      case 'tablets-break':
        // 금송아지 (fx/calf.ts): 증거판 두 돌판에 금이 가고 조각나 떨어진다 (출 32:19)
        playTabletsBreak(el, items, rm);
        return;
      case 'cast-lots':
        // 대속죄일 (fx/atonement.ts): 두 염소 위로 제비 — 여호와께 / 아사셀에게 (레 16:8)
        playLots($('.scene'), rm);
        return;
      case 'incense-cloud':
        // 대속죄일 (fx/atonement.ts): 향연이 속죄소를 덮는다 (레 16:13)
        playIncense($('.scene'), rm);
        return;
      case 'confess':
        // 대속죄일 (fx/atonement.ts): 모든 죄가 산 염소의 머리 위로 모여든다 (레 16:21)
        playConfess($('.scene'), rm);
        return;
      case 'scapegoat':
        // 대속죄일 (fx/atonement.ts): 염소가 광야 길을 따라 지평선 너머로 사라진다 (레 16:22)
        playScapegoat($('.scene'), rm);
        return;
      case 'fire-fall':
        // 하늘에서 내린 불 (fx/ordination.ts): 성막 쪽에서 금빛 불줄기가 제단으로 내리꽂힌다 (레 9:24)
        playFireFall($('.scene'), rm);
        return;
      case 'bal-strike':
        // 발람과 나귀 (fx/balaam.ts): 나귀 위의 발람이 지팡이를 휘두른다 (민 22:23·25·27)
        playStrike($('.scene'), rm);
        return;
      case 'eyes-open':
        // 발람과 나귀 (fx/balaam.ts): 흐린 막이 걷히고 사자의 칼날이 번쩍 (민 22:31)
        playEyesOpen($('.scene'), rm);
        return;
      case 'clap':
        // 발람과 나귀 (fx/balaam.ts): 발락이 손뼉을 친다 (민 24:10)
        playClap($('.scene'), rm);
        return;
      case 'strange-fire':
        // 다른 불 (fx/strangefire.ts): 회막 문에서 흰 불이 앞으로 터져 나와 무대를 덮고 걷힌다 (레 10:2)
        playStrangeFire($('.scene'), rm);
        return;
      case 'earth-open':
        // 땅이 입을 열어 (fx/korah.ts): 장막 밑 땅이 갈라져 삼키고 다시 합한다 (민 16:31-33)
        playEarthOpen($('.scene'), rm);
        return;
      case 'plague-stop':
        // 땅이 입을 열어 (fx/korah.ts): 잿빛 그늘이 아론의 향 연기 기둥 앞에서 멈춘다 (민 16:47-48)
        playPlagueStop($('.scene'), rm);
        return;
      case 'grasshopper':
        // 우리는 메뚜기 같으니 (fx/spies.ts): 거인들이 커지고 무대 위 사람들이 작아진다 (민 13:33)
        playGrasshopper($('.scene'), rm);
        return;
      case 'strike-twice':
        // 반석을 두 번 치다 (fx/meribah.ts): 반석의 틈에 두 번 내리치는 빛과 금, 물보라 (민 20:11)
        playStrikeTwice($('.scene'), rm);
        return;
      case 'mantle':
        // 반석을 두 번 치다 (fx/meribah.ts): 금빛 티끌이 아론에게서 엘르아살에게로 (민 20:28)
        playMantle($('.scene'), rm);
        return;
      case 'fiery-serpents':
        // 놋뱀 (fx/brazen.ts): 모래 위를 불빛 같은 줄기들이 스쳐 간다 (민 21:6)
        playFierySerpents($('.scene'), rm);
        return;
      case 'serpent-lift':
        // 놋뱀 (fx/brazen.ts): 장대 위 놋뱀에서 금빛이 번지고 고리가 퍼진다 (민 21:9)
        playSerpentLift($('.scene'), rm);
        return;
      case 'shema':
        // 신명기 (fx/deuteronomy.ts): "들으라"가 떠오르고 소리의 고리가 퍼진다 (신 6:4)
        playShema($('.scene'), rm);
        return;
      case 'pass-on':
        // 신명기: 금빛 티끌이 한 사람에게서 다음 사람에게 (신 6:7)
        playPassOn($('.scene'), rm);
        return;
      case 'amen':
        // 신명기: 백성 쪽에서 "아멘"이 물결처럼 (신 27:15-26)
        playAmen($('.scene'), rm);
        return;
      case 'eagle':
        // 신명기: 독수리가 떨어지는 새끼를 날개로 받아 올린다 (신 32:11)
        playEagle($('.scene'), rm);
        return;
      case 'land-show':
        // 신명기: 느보산에서 땅이 차례로 밝아진다 (신 34:1-3)
        playLandShow($('.scene'));
        return;
      case 'march':
        // 여호수아 (fx/joshua.ts): 여리고 성벽 아래로 행렬이 지나간다 (수 6:8-14)
        playMarch($('.scene'));
        return;
      case 'shout':
        // 여호수아: 일곱 나팔과 큰 외침 (수 6:20)
        playShout($('.scene'), rm);
        return;
      case 'lots':
        // 여호수아: 제비가 지파에서 한 사람까지 좁혀진다 (수 7:16-18)
        playJoshLots($('.scene'), rm);
        return;
      case 'sun-stand':
        // 여호수아: 해와 달이 머문다 (수 10:12-13)
        playSunStand($('.scene'), rm);
        return;
      case 'torches':
        // 기드온: 항아리를 깨뜨리고 횃불 (삿 7:19-21) — fx/judges.ts
        playTorches($('.scene'), rm);
        return;
      case 'flame-up':
        // 삼손: 제단 불꽃 속으로 올라감 (삿 13:20) — fx/judges.ts
        playFlameUp($('.scene'), rm);
        return;
      case 'foxes':
        // 삼손: 여우와 홰 (삿 15:4-5) — fx/judges.ts
        playFoxes($('.scene'), rm);
        return;
      case 'pillars':
        // 삼손: 두 기둥 (삿 16:29-30) — fx/judges.ts
        playPillars($('.scene'), rm);
        return;
      case 'lament':
        // 입다의 딸: 해마다 나흘씩 (삿 11:40) — fx/judges.ts
        playLament($('.scene'), rm);
        return;
      case 'summons':
        // 레위인: 온 이스라엘에 두루 (삿 19:29) — fx/judges.ts
        playSummons($('.scene'), rm);
        return;
      case 'genealogy':
        // 룻기: 베레스에서 다윗까지 (룻 4:18-22) — fx/judges.ts
        playGenealogy($('.scene'), rm);
        return;
      case 'kites':
        // 별을 세어 보라 (fx/covenant.ts): 솔개가 쪼갠 고기 위로 내리꽂혔다 쫓겨 흩어진다 (창 15:11)
        playKites($('.scene'), rm);
        return;
      case 'torch-pass':
        // 별을 세어 보라 (fx/covenant.ts): 연기 나는 풀무와 타는 횃불이 쪼갠 고기 사이로 지나간다 (창 15:17)
        playTorchPass($('.scene'), rm);
        return;
      case 'anoint': {
        // 기름 부음 (fx/saul.ts, 7막 공통): 대상 = to → (대사 beat가 아니면) who → 무대 가운데 사람
        const who = beat?.to ?? (beat?.type === 'line' ? undefined : [beat?.who ?? []].flat()[0]);
        playAnoint($('.scene'), who, rm);
        return;
      }
      case 'saul-lots':
        // 미스바의 제비 (fx/saul.ts): 지파 → 가족 → 사울 → …없다 (삼상 10:20-21)
        playSaulLots($('.scene'), rm);
        return;
      case 'rise':
        // 엔돌: 땅에서 오르는 희뿌연 빛 (삼상 28:13) — fx/gilboa.ts
        playRise($('.scene'), rm);
        return;
      case 'little-robes':
        // 한나: 해마다 지어 온 작은 겉옷 (삼상 2:19) — fx/samuel.ts
        playLittleRobes($('.scene'), rm);
        return;
      case 'lyre':
        // 다윗의 수금 (삼상 16:23) — fx/david.ts
        playLyre($('.scene'), rm);
        return;
      case 'sling':
        // 물매와 돌 (삼상 17:49) — fx/david.ts
        playSling($('.scene'), rm);
        return;
      case 'topple':
        // 큰 몸이 쓰러짐 (삼상 17:49) — fx/david.ts. 대상 = who → goliath
        playTopple($('.scene'), [beat?.who ?? []].flat()[0], rm);
        return;
      case 'dance':
        // 법궤 앞에서 춤추다 (삼하 6:14) — fx/kingship.ts. 대상 = who → david
        playDance($('.scene'), [beat?.who ?? []].flat()[0], rm);
        return;
      case 'letter':
        // 우리아의 편지 (삼하 11:14) — fx/kingship.ts. 쓰는 사람 = who → david, 받는 사람 = to → uriah
        playLetter($('.scene'), [beat?.who ?? []].flat()[0], beat?.to, rm);
        return;
      case 'accuse':
        // 당신이 그 사람이라 (삼하 12:7) — fx/kingship.ts. 대상 = to → (대사 beat가 아니면) who → david
        playAccuse($('.scene'), beat?.to ?? (beat?.type === 'line' ? undefined : [beat?.who ?? []].flat()[0]), rm);
        return;
      case 'stones':
        // 시므이의 돌과 티끌 (삼하 16:6, 13) — fx/absalom.ts. 던지는 사람 = who → shimei, 상대 = to → david
        playStones($('.scene'), [beat?.who ?? []].flat()[0], beat?.to, rm);
        return;
      case 'spear-throw':
        // 사울의 창 (삼상 18:11, 19:10, 20:33) — fx/jonathan.ts. 던지는 사람 = who → saul, 상대 = to → david
        playSpearThrow($('.scene'), [beat?.who ?? []].flat()[0], beat?.to, rm);
        return;
      case 'arrows':
        // 요나단의 화살 (삼상 20:20, 36) — fx/jonathan.ts. 쏘는 사람 = who → jonathan
        playArrows($('.scene'), [beat?.who ?? []].flat()[0], rm);
        return;
      case 'hem':
        // 벤 옷자락 (삼상 24:4, 11) — fx/jonathan.ts. 대상 = who → david
        playHem($('.scene'), [beat?.who ?? []].flat()[0], rm);
        return;
      case 'blind':
        // 뒤돌아보지 말라 (fx/sodom.ts): 문 쪽에서 흰빛이 터져 무리의 눈을 어둡게 한다 (창 19:11)
        playBlind($('.scene'), rm);
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
    if (allotMap) {
      void allotMap.hide();
      allotMap = null;
    }
    stage.actors.forEach((a) => a.setDim(true));
    setBlack(false);
    cycleRing?.big(false);
    setItem(el, items, null);
    setMemory(null);
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
    // 배경이 다른 곳으로 바뀌면 앞 배경에 깔린 재앙 효과는 걷는다 (이 beat의 새 효과는 이 뒤에 깔림)
    if (animate && name !== shownMood) clearPlagues();
    shownMood = name;
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
    setMemory(null);
    setCrowd(crowd, null);
    setItem(el, items, null, true);
    travel?.el.remove();
    travel = null;
    allotMap?.el.remove();
    allotMap = null;
    cycleRing?.el.remove();
    cycleRing = null;
    setBlack(false);
    $('.scene__sound').classList.remove('is-on');
    setDecay(scene.decay ?? 0);
    if (scene.theme) el.dataset.theme = scene.theme;
    else delete el.dataset.theme;
    gsap.set($('.play__fade'), { opacity: 0 });
    setMode('loading');
    cursor = new SceneCursor(scene);
    names = { ...(scene.names ?? {}) };
    await addInOrder(scene.cast ?? []);
    for (const [who, name] of Object.entries(scene.outfit ?? {})) stage.actors.get(who)?.outfit(name, false);
    await intro(scene);
    if (alive) await step();
  }

  async function restart() {
    if (busy) return;
    busy = true;
    await gsap.to(el.querySelectorAll('.dock, .scene__stage'), { opacity: 0, duration: 0.5 });
    clearFx();
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
