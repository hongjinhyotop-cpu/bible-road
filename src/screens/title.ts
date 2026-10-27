// 타이틀: 어둠 속에서 "태초에"가 빛으로 나타나는 오프닝.
import gsap from 'gsap';
import type { Screen } from '../engine/router';
import { go } from '../engine/router';
import { getPassage } from '../engine/bible';
import { hasSave, progress } from '../engine/progress';
import { reducedMotion, settings } from '../engine/settings';
import { inkReveal } from '../fx/ink';
import { setFieldIntensity, setFieldMode } from '../fx/particles';
import { icons } from '../ui/icons';
import { openSettings } from '../ui/settings-sheet';
import { isSheetOpen } from '../ui/sheet';

const OPENING_WORD = '태초에';

export function titleScreen(): Screen {
  const el = document.createElement('section');
  el.className = 'screen title';
  el.dataset.act = '1';
  el.innerHTML = `
    <div class="title__halo" aria-hidden="true"></div>
    <div class="title__toolbar">
      <button class="icon-btn" data-sound aria-label="소리 켜기"></button>
      <button class="icon-btn" data-settings aria-label="설정">${icons.settings}</button>
    </div>
    <main class="title__center">
      <p class="title__latin latin">In principio</p>
      <h1 class="title__word"></h1>
      <p class="title__verse"></p>
      <p class="title__ref ui">창세기 1:1</p>
      <div class="title__rule" aria-hidden="true"></div>
      <p class="title__name">말씀의 길<span class="latin">The Long Road</span></p>
    </main>
    <nav class="title__actions">
      <button class="btn btn--primary" data-start>처음부터</button>
      <button class="btn" data-continue>이어하기</button>
    </nav>
    <p class="title__skip ui">화면을 누르면 건너뜁니다</p>
    <footer class="title__credit ui">본문 · 성경전서 개역한글판 (대한성서공회)</footer>`;

  const $ = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
  const word = $('.title__word');
  const verse = $('.title__verse');
  const soundBtn = $<HTMLButtonElement>('[data-sound]');
  const continueBtn = $<HTMLButtonElement>('[data-continue]');

  let tl: gsap.core.Timeline | null = null;
  let breathe: gsap.core.Tween | null = null;
  let field: gsap.core.Tween | null = null;
  let finished = false;

  const syncSound = () => {
    const on = settings.get().sound;
    soundBtn.innerHTML = on ? icons.soundOn : icons.soundOff;
    soundBtn.setAttribute('aria-label', on ? '소리 끄기' : '소리 켜기');
    soundBtn.setAttribute('aria-pressed', String(on));
  };
  const unsub = settings.subscribe(syncSound);
  syncSound();

  const syncContinue = () => {
    continueBtn.disabled = !hasSave();
    continueBtn.title = hasSave() ? '' : '아직 저장된 여정이 없습니다';
  };
  syncContinue();

  const skip = () => {
    if (!finished && tl) tl.progress(1);
  };

  function onKey(e: KeyboardEvent) {
    if (isSheetOpen() || finished) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      skip();
    }
  }

  function from(e: MouseEvent) {
    return { x: e.clientX, y: e.clientY };
  }

  async function enter() {
    setFieldMode('dust');
    document.addEventListener('keydown', onKey);
    el.addEventListener('pointerdown', (e) => {
      if (!(e.target as HTMLElement).closest('button')) skip();
    });

    soundBtn.addEventListener('click', () => settings.set({ sound: !settings.get().sound }));
    $('[data-settings]').addEventListener('click', () => openSettings(syncContinue));
    $('[data-start]').addEventListener('click', (e) => {
      progress.set({ startedAt: progress.get().startedAt ?? Date.now(), last: 'map' });
      go('/map', from(e));
    });
    continueBtn.addEventListener('click', (e) => go('/map', from(e)));

    // 본문은 데이터에서 가져온다: "태초에" 다음 부분이 이어서 번진다.
    let rest = '하나님이 천지를 창조하시니라';
    try {
      const p = await getPassage('창 1:1');
      rest = p.verses[0].text.replace(new RegExp(`^${OPENING_WORD}\\s*`), '');
    } catch {
      /* 데이터를 못 불러와도 오프닝은 계속 */
    }
    play(rest);
  }

  function play(rest: string) {
    const rm = reducedMotion();
    const halo = $('.title__halo');
    const after = ['.title__latin', '.title__ref', '.title__name', '.title__actions', '.title__credit', '.title__toolbar'].map((s) => $(s));
    gsap.set(after, { opacity: 0 });
    gsap.set($('.title__rule'), { scaleX: 0 });
    gsap.set($('.title__skip'), { opacity: 0 });

    setFieldIntensity(0);
    const fi = { v: 0 };
    field = gsap.to(fi, { v: 1, duration: rm ? 0.6 : 5, ease: 'power1.inOut', onUpdate: () => setFieldIntensity(fi.v) });

    const wordInk = inkReveal(word, OPENING_WORD, rm ? {} : { stagger: 0.42, duration: 1.8, glow: true });
    wordInk.timeline.pause();
    const verseInk = inkReveal(verse, rest, rm ? {} : { stagger: 0.07, duration: 1.1 });
    verseInk.timeline.pause();

    tl = gsap.timeline({
      onComplete: () => {
        finished = true;
        field?.progress(1);
        gsap.to($('.title__skip'), { opacity: 0, duration: 0.4 });
        $<HTMLButtonElement>('[data-start]').focus({ preventScroll: true });
        if (!rm) breathe = gsap.to(halo, { scale: 1.07, opacity: 0.85, duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      },
    });

    if (rm) {
      tl.fromTo(halo, { opacity: 0, scale: 1 }, { opacity: 0.7, duration: 0.8 })
        .add(wordInk.timeline.play(0), 0.2)
        .add(verseInk.timeline.play(0), 0.6)
        .to($('.title__rule'), { scaleX: 1, duration: 0.01 }, 1)
        .to(after, { opacity: 1, duration: 0.6 }, 1);
      return;
    }

    tl
      // 어둠 속 한 점의 빛
      .fromTo(halo, { opacity: 0, scale: 0.04 }, { opacity: 1, scale: 0.18, duration: 1.4, ease: 'power2.out' }, 0.4)
      // 빛이 퍼진다
      .to(halo, { scale: 1, opacity: 0.75, duration: 3.2, ease: 'expo.out' }, 1.6)
      .to($('.title__skip'), { opacity: 1, duration: 1 }, 1.2)
      .add(wordInk.timeline.play(0), 1.5)
      .fromTo($('.title__latin'), { opacity: 0, y: 8, letterSpacing: '0.5em' }, { opacity: 1, y: 0, letterSpacing: '0.18em', duration: 2, ease: 'expo.out' }, 3.1)
      .add(verseInk.timeline.play(0), 3.6)
      .to($('.title__ref'), { opacity: 1, duration: 1.2 }, '>-0.4')
      .to($('.title__rule'), { scaleX: 1, duration: 1.4, ease: 'expo.inOut' }, '>-0.3')
      .fromTo($('.title__name'), { opacity: 0, y: 14, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'expo.out', clearProps: 'filter' }, '<0.5')
      .fromTo($('.title__actions'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, '>-0.6')
      .to([$('.title__credit'), $('.title__toolbar')], { opacity: 1, duration: 1.2 }, '<0.3');
  }

  return {
    el,
    enter: () => void enter(),
    leave() {
      document.removeEventListener('keydown', onKey);
      unsub();
      tl?.kill();
      breathe?.kill();
      field?.kill();
      setFieldIntensity(1);
    },
  };
}
