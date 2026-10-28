// 막 피날레 (#/finale/1). 막을 다 끝내면 장면·읽기 끝 카드의 "다음" 버튼이 여기로 온다.
// 어둠 → 막 번호와 제목이 빛나며 떠오름 → 이야기 목소리 몇 줄(탭으로 한 줄씩, act.json "finale")
// → 그 막의 핵심 구절 카드(keyVerse) → 이번 막에서 만난 인물 카드가 한 장씩 뒤집히며 놓임
// → "지도에서 별 켜기" (지도 화면이 그 막의 별을 점등하고 다음 길을 잇는다)
import gsap from 'gsap';
import type { Params, Screen } from '../engine/router';
import { go } from '../engine/router';
import { ACTS } from '../engine/acts';
import { actContent } from '../engine/content';
import { CODEX, actComplete, hasMet } from '../engine/codex';
import { markFinale, progress } from '../engine/progress';
import { reducedMotion } from '../engine/settings';
import { inkReveal } from '../fx/ink';
import { setFieldIntensity, setFieldMode } from '../fx/particles';
import { icons } from '../ui/icons';
import { personCard } from '../ui/person-card';
import { revealScripture, scriptureCard } from '../ui/scripture-card';
import { isSheetOpen } from '../ui/sheet';

export function finaleScreen({ act: actParam }: Params): Screen {
  const no = +actParam;
  const act = ACTS[no - 1];
  const el = document.createElement('section');
  el.className = 'screen finale';
  el.dataset.act = String(act ? no : 1);
  el.innerHTML = `
    <div class="finale__glow" aria-hidden="true"></div>
    <header class="finale__head">
      <button class="icon-btn" data-back aria-label="지도로 가기">${icons.back}</button>
    </header>
    <div class="finale__scroll">
      <div class="finale__open">
        <span class="finale__numeral latin" aria-hidden="true"></span>
        <p class="finale__eyebrow ui"></p>
        <h1 class="finale__title"></h1>
        <div class="finale__rule" aria-hidden="true"></div>
      </div>
      <div class="finale__lines voice-story"></div>
      <div class="finale__verse"></div>
      <section class="finale__mile" hidden aria-live="polite"></section>
      <section class="finale__cast" hidden>
        <p class="finale__label ui">이번 막에서 만난 사람들</p>
        <div class="pcards"></div>
        <p class="finale__got voice-talk"></p>
      </section>
      <div class="finale__actions" hidden>
        <button class="btn btn--primary" data-map>지도에서 별 켜기</button>
        <button class="btn" data-people>인물 도감 보기</button>
      </div>
    </div>
    <p class="finale__hint ui" aria-hidden="true">탭하면 다음</p>`;

  const $ = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
  const scroller = $('.finale__scroll');
  let alive = true;
  let anim: gsap.core.Animation | null = null;
  let busy = false;
  /** 다음에 보여 줄 것: 이야기 줄 번호. 줄이 다 끝나면 구절 → 인물 → 끝 */
  let stepNo = 0;
  let lines: string[] = [];
  let done = false;
  /** 완주 연출(milestone): 0 = 아직, 1 = 두루마리 다 놓임(그다음 탭부터 이야기 줄), 2 = 끝 */
  let mile = 0;
  let mileLines: string[] = [];
  let mileNo = 0;

  function setTap(on: boolean) {
    el.dataset.tap = on ? '1' : '0';
  }

  function reveal(node: HTMLElement) {
    // 새로 나온 것이 화면 아래쪽에 있으면 부드럽게 끌어올린다
    const box = node.getBoundingClientRect();
    const view = scroller.getBoundingClientRect();
    if (box.bottom > view.bottom - 60) scroller.scrollTo({ top: scroller.scrollTop + box.bottom - view.bottom + 90, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }

  async function next() {
    if (busy || done || isSheetOpen()) return;
    if (anim && anim.progress() < 1) {
      anim.progress(1);
      return;
    }
    busy = true;
    try {
      if (stepNo < lines.length) {
        const p = document.createElement('p');
        $('.finale__lines').append(p);
        anim = inkReveal(p, lines[stepNo]).timeline;
        reveal(p);
        stepNo++;
      } else if (stepNo === lines.length) {
        stepNo++;
        await showVerse();
      } else if (actContent(no)?.milestone && mile < 2) {
        if (mile === 0) {
          mile = 1;
          await showMilestone();
        } else if (mileNo < mileLines.length) {
          const p = document.createElement('p');
          p.className = 'mile__line voice-story';
          $('.finale__mile').append(p);
          anim = inkReveal(p, mileLines[mileNo]).timeline;
          reveal(p);
          mileNo++;
          if (mileNo === mileLines.length) mile = 2;
        } else mile = 2;
      } else {
        stepNo++;
        await showCast();
      }
    } finally {
      busy = false;
    }
  }

  async function showVerse() {
    const ref = actContent(no)?.keyVerse;
    if (!ref) return showCast();
    const card = await scriptureCard(ref).catch(() => null);
    if (!card || !alive) return;
    $('.finale__verse').append(card);
    anim = revealScripture(card);
    reveal(card);
  }

  /** 완주 연출: 두루마리가 한 권씩 켜지고 → 한 두루마리로 말리고 → 장 수가 차오르고 → 전체 진행 막대 */
  async function showMilestone() {
    const m = actContent(no)!.milestone!;
    mileLines = m.lines ?? [];
    const box = $('.finale__mile');
    const pct = Math.round((m.done / m.total) * 100);
    box.innerHTML = `
      <p class="finale__label ui">${m.title}</p>
      <div class="mile__shelf">${m.books.map((b, i) => `<div class="mile__scroll" style="--i:${i}"><i class="mile__rod"></i><span class="mile__body"><b>${b.name}</b><small class="latin">${b.chapters}</small></span><i class="mile__rod"></i></div>`).join('')}</div>
      <div class="mile__torah" aria-hidden="true"><i class="mile__rod"></i><span class="mile__body"><b>${m.scroll}</b></span><i class="mile__rod"></i></div>
      <p class="mile__count"><span class="mile__num latin">0</span><span class="mile__unit">장</span></p>
      <div class="mile__bar" aria-hidden="true"><span style="--p:${(m.done / m.total).toFixed(4)}"></span></div>
      <p class="mile__of voice-talk">성경 ${m.total.toLocaleString('ko-KR')}장 중 ${m.done}장 · 약 ${pct}%</p>`;
    box.hidden = false;
    const rm = reducedMotion();
    const scrolls = box.querySelectorAll<HTMLElement>('.mile__scroll');
    const torah = $('.mile__torah');
    const num = $('.mile__num');
    const counter = { v: 0 };
    const tl = gsap.timeline();
    tl.fromTo(box.querySelector('.finale__label'), { opacity: 0 }, { opacity: 1, duration: 0.6 })
      // 한 권씩 불이 켜진다 (창 → 신)
      .fromTo(scrolls, { opacity: 0, y: rm ? 0 : 18, filter: 'brightness(0.4)' }, { opacity: 1, y: 0, filter: 'brightness(1)', duration: rm ? 0.3 : 0.8, ease: 'expo.out', stagger: rm ? 0.05 : 0.45 }, 0.3)
      .add(() => scrolls.forEach((s) => s.classList.add('is-lit')), rm ? 0.5 : 2.6)
      // 다섯 두루마리가 가운데로 모여 하나로 말린다
      .to(scrolls, rm ? { opacity: 0, duration: 0.3 } : {
        x: (i) => { const r = scrolls[i].getBoundingClientRect(); const c = box.getBoundingClientRect(); return c.left + c.width / 2 - (r.left + r.width / 2); },
        scaleX: 0.3, opacity: 0, duration: 1.1, ease: 'power3.in', stagger: { each: 0.06, from: 'edges' },
      }, rm ? 0.6 : 3.2)
      .fromTo(torah, { opacity: 0, scaleX: rm ? 1 : 0.2 }, { opacity: 1, scaleX: 1, duration: rm ? 0.4 : 1.4, ease: 'expo.out' }, rm ? 0.8 : 4.2)
      .fromTo($('.mile__count'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, rm ? 1 : 4.8)
      .to(counter, { v: m.done, duration: rm ? 0.3 : 2, ease: 'power2.out', onUpdate: () => { num.textContent = String(Math.round(counter.v)); } }, '<')
      .fromTo(box.querySelector('.mile__bar span'), { scaleX: 0 }, { scaleX: m.done / m.total, duration: rm ? 0.3 : 2, ease: 'power2.out' }, '<')
      .fromTo($('.mile__of'), { opacity: 0, y: rm ? 0 : 8 }, { opacity: 1, y: 0, duration: 0.8 }, '>-0.6');
    anim = tl;
    reveal(box);
    tl.eventCallback('onUpdate', () => reveal(box));
    if (!mileLines.length) mile = 2;
  }

  async function showCast() {
    setTap(false);
    done = true;
    markFinale(no);
    const people = CODEX.filter((e) => e.act === no);
    const cards = await Promise.all(people.map((e) => personCard(e, hasMet(e.id)).catch(() => null)));
    if (!alive) return;
    const grid = $('.pcards');
    cards.forEach((c) => c && grid.append(c));
    grid.querySelectorAll<HTMLButtonElement>('.pcard').forEach((c) => c.addEventListener('click', () => go(`/people/${c.dataset.id}`)));
    const met = people.filter((e) => hasMet(e.id)).length;
    $('.finale__got').textContent = `인물 카드 ${met}장 획득. 도감에 다 들어가 있음.`;
    const cast = $('.finale__cast');
    cast.hidden = false;
    $('.finale__actions').hidden = false;
    const rm = reducedMotion();
    const tl = gsap.timeline();
    tl.fromTo($('.finale__label'), { opacity: 0 }, { opacity: 1, duration: 0.6 })
      .fromTo(grid.children, rm ? { opacity: 0 } : { opacity: 0, rotationY: -90, y: 24 }, { opacity: 1, rotationY: 0, y: 0, duration: rm ? 0.4 : 0.9, ease: 'expo.out', stagger: rm ? 0.04 : 0.14 }, 0.2)
      .fromTo($('.finale__got'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, '>-0.3')
      .fromTo($('.finale__actions'), { opacity: 0, y: rm ? 0 : 12 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, '>-0.4');
    anim = tl;
    requestAnimationFrame(() => reveal(cast));
    $<HTMLButtonElement>('[data-map]').focus({ preventScroll: true });
  }

  async function open() {
    const rm = reducedMotion();
    $('.finale__numeral').textContent = act.numeral;
    $('.finale__eyebrow').innerHTML = `제${no}막 · <span class="latin">${act.latin}</span>`;
    const title = inkReveal($('.finale__title'), `${act.title}, 끝`, rm ? {} : { stagger: 0.18, duration: 1.4, glow: true });
    title.timeline.pause();
    const tl = gsap.timeline();
    tl.fromTo($('.finale__glow'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: rm ? 0.4 : 3, ease: 'power2.out' })
      .fromTo($('.finale__numeral'), { opacity: 0, scale: 1.3 }, { opacity: 0.16, scale: 1, duration: rm ? 0.4 : 2.4, ease: 'expo.out' }, 0.2)
      .fromTo($('.finale__eyebrow'), { opacity: 0, letterSpacing: '0.5em' }, { opacity: 1, letterSpacing: '0.18em', duration: rm ? 0.4 : 1.6, ease: 'expo.out' }, 0.5)
      .add(title.timeline.play(0), rm ? 0.2 : 0.9)
      .fromTo($('.finale__rule'), { scaleX: 0 }, { scaleX: 1, duration: rm ? 0.3 : 1.2, ease: 'power2.inOut' }, '>-0.4');
    anim = tl;
    tl.eventCallback('onComplete', () => alive && setTap(true));
    setTap(true);
  }

  function onKey(e: KeyboardEvent) {
    if (isSheetOpen()) return;
    if ((e.key === ' ' || e.key === 'Enter') && !(e.target as HTMLElement).closest?.('button')) {
      e.preventDefault();
      void next();
    }
  }
  function onClick(e: MouseEvent) {
    if ((e.target as HTMLElement).closest('button, a')) return;
    void next();
  }

  return {
    el,
    enter() {
      setFieldMode('stars');
      $('[data-back]').addEventListener('click', () => go('/map'));
      $('[data-map]').addEventListener('click', (e) => go('/map', { x: e.clientX, y: e.clientY }));
      $('[data-people]').addEventListener('click', (e) => go('/people', { x: e.clientX, y: e.clientY }));
      if (!act || !actComplete(no)) {
        // 막을 아직 다 안 끝냈는데 주소로 들어온 경우
        $('.finale__lines').innerHTML = `<p class="voice-talk finale__early">${act ? `${act.title} 막을 아직 다 안 끝냈음. 지도에서 남은 별부터 채우고 오자.` : '그런 막은 없음.'}</p>`;
        $('.finale__actions').hidden = false;
        $<HTMLButtonElement>('[data-map]').textContent = '지도로 돌아가기';
        $<HTMLButtonElement>('[data-people]').hidden = true;
        done = true;
        return;
      }
      lines = actContent(no)?.finale ?? [];
      progress.set({ last: `finale/${no}` });
      document.addEventListener('keydown', onKey);
      el.addEventListener('click', onClick);
      setFieldIntensity(0.6);
      void open();
    },
    leave() {
      alive = false;
      anim?.kill();
      document.removeEventListener('keydown', onKey);
      setFieldIntensity(1);
      // 피날레를 다 봤으면 "이어서 하기"는 지도로 (별 점등을 보러)
      if (progress.get().finales[no] && progress.get().last === `finale/${no}`) progress.set({ last: 'map' });
    },
  };
}
