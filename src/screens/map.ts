// 성경 지도: 14막, 66권이 하나의 별자리 길로 이어진다.
// 스크롤하며 내려가면 길이 앞으로 그려지고, 막에 들어설 때마다 하늘의 색이 바뀐다.
import gsap from 'gsap';
import type { Screen } from '../engine/router';
import { go } from '../engine/router';
import { ACTS, type Act, type Stop } from '../engine/acts';
import { BOOKS, TOTAL_CHAPTERS, findBook } from '../engine/books';
import { countDone, totalDone, progress } from '../engine/progress';
import { reducedMotion } from '../engine/settings';
import { setFieldMode } from '../fx/particles';
import { icons } from '../ui/icons';
import { openSettings } from '../ui/settings-sheet';
import { openSheetPanel } from '../ui/sheet';
import { revealScripture, scriptureCard } from '../ui/scripture-card';

interface PlacedStop {
  stop: Stop;
  act: Act;
  index: number;
  x: number;
  y: number;
  el: HTMLButtonElement;
  state: 'locked' | 'next' | 'lit';
}

const fmt = new Intl.NumberFormat('ko-KR');

export function mapScreen(): Screen {
  const el = document.createElement('section');
  el.className = 'screen map';
  el.dataset.act = '1';
  el.innerHTML = `
    <header class="map__header">
      <button class="icon-btn" data-back aria-label="타이틀로">${icons.back}</button>
      <div class="map__heading">
        <h1>성경 지도</h1>
        <p class="ui map__count"></p>
      </div>
      <button class="icon-btn" data-settings aria-label="설정">${icons.settings}</button>
    </header>
    <nav class="map__acts ui" aria-label="막 바로가기"></nav>
    <div class="map__scroll">
      <div class="map__road">
        <svg class="map__svg" aria-hidden="true">
          <path class="map__path map__path--base"/>
          <path class="map__path map__path--ahead"/>
          <path class="map__path map__path--lit"/>
        </svg>
      </div>
      <p class="map__end ui">아멘. 주 예수여 오시옵소서 — 계 22:20</p>
    </div>`;

  const $ = <T extends Element = HTMLElement>(s: string) => el.querySelector(s) as T;
  const scroller = $<HTMLElement>('.map__scroll');
  const road = $<HTMLElement>('.map__road');
  const svg = $<SVGSVGElement>('.map__svg');
  const pathBase = $<SVGPathElement>('.map__path--base');
  const pathAhead = $<SVGPathElement>('.map__path--ahead');
  const pathLit = $<SVGPathElement>('.map__path--lit');
  const nav = $<HTMLElement>('.map__acts');

  let placed: PlacedStop[] = [];
  let headings: HTMLElement[] = [];
  let pathLen = 0;
  let samples: { len: number; y: number }[] = [];
  let io: IntersectionObserver | null = null;
  let currentAct = 1;
  const tweens: gsap.core.Animation[] = [];

  function updateCount() {
    const booksDone = BOOKS.filter((b) => countDone(b.code, 1, b.chapters) === b.chapters).length;
    $('.map__count').textContent = `${booksDone} / 66권 · ${fmt.format(totalDone())} / ${fmt.format(TOTAL_CHAPTERS)}장`;
  }

  // ── 배치 ────────────────────────────────────────
  function layout() {
    road.querySelectorAll('.star, .act-head').forEach((n) => n.remove());
    const W = road.clientWidth;
    const desktop = W >= 720;
    const cx = W / 2;
    const amp = Math.min(W * (desktop ? 0.24 : 0.24), 230);
    const step = desktop ? 92 : 84;
    const headH = desktop ? 230 : 210;
    let y = desktop ? 120 : 96;
    let k = 0;
    let foundNext = false;
    placed = [];
    headings = [];

    for (const act of ACTS) {
      const head = document.createElement('header');
      head.className = 'act-head';
      head.dataset.act = String(act.no);
      head.id = `act-${act.no}`;
      head.style.top = `${y}px`;
      head.innerHTML = `
        <span class="act-head__numeral" aria-hidden="true">${act.numeral}</span>
        <p class="act-head__eyebrow ui">제${act.no}막 · <span class="latin">${act.latin}</span></p>
        <h2 class="act-head__title">${act.title}</h2>
        <p class="act-head__meta ui">${act.range}<span>·</span>${act.mechanic}</p>`;
      road.append(head);
      headings.push(head);
      y += headH;

      for (const stop of act.stops) {
        const book = findBook(stop.book)!;
        const x = cx + amp * Math.sin(k * 0.95 + 0.4);
        const done = countDone(stop.book, stop.from, stop.to);
        const total = stop.to - stop.from + 1;
        let state: PlacedStop['state'] = done === total ? 'lit' : 'locked';
        if (state === 'locked' && !foundNext) {
          state = 'next';
          foundNext = true;
        }
        const whole = stop.from === 1 && stop.to === book.chapters;
        const range = whole ? `${book.chapters}장` : `${stop.from}–${stop.to}장`;
        const b = document.createElement('button');
        b.className = `star star--${state}`;
        b.dataset.act = String(act.no);
        b.dataset.side = x > cx + 4 ? 'left' : 'right';
        b.style.left = `${x}px`;
        b.style.top = `${y}px`;
        b.setAttribute('aria-label', `${book.name} ${range}${state === 'lit' ? ', 완료' : state === 'next' ? ', 다음 길' : ''}`);
        b.innerHTML = `
          <span class="star__glow" aria-hidden="true"></span>
          <span class="star__core" aria-hidden="true"></span>
          <span class="star__label" aria-hidden="true"><b>${book.name}</b><small>${range}${state === 'next' ? ' · 여기서 시작' : ''}</small></span>`;
        road.append(b);
        const p: PlacedStop = { stop, act, index: k, x, y, el: b, state };
        b.addEventListener('click', () => openStop(p));
        placed.push(p);
        y += step;
        k++;
      }
      y += desktop ? 40 : 30;
    }
    const H = y + 40;
    road.style.height = `${H}px`;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', String(W));
    svg.setAttribute('height', String(H));

    const d = smoothPath(placed.map((p) => [p.x, p.y]));
    [pathBase, pathAhead, pathLit].forEach((p) => p.setAttribute('d', d));
    pathLen = pathBase.getTotalLength();
    samples = [];
    for (let l = 0; l <= pathLen; l += 24) samples.push({ len: l, y: pathBase.getPointAtLength(l).y });
    samples.push({ len: pathLen, y: H });

    // 켜진 별까지 금빛 길
    const lastLit = placed.reduce((m, p) => (p.state === 'lit' ? p.index : m), -1);
    const litLen = lastLit < 0 ? 0 : lengthAtY(placed[lastLit].y);
    pathLit.style.strokeDasharray = `${litLen} ${pathLen}`;

    pathAhead.style.strokeDasharray = `${pathLen}`;
    pathAhead.style.strokeDashoffset = `${pathLen}`;
    revealAhead(true);
    observe();
  }

  function lengthAtY(y: number): number {
    let lo = 0, hi = samples.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (samples[mid].y < y) lo = mid + 1;
      else hi = mid;
    }
    return samples[lo]?.len ?? pathLen;
  }

  // 화면 아래 끝까지 길이 미리 그려진다 (걸어가면 길이 이어진다)
  const shown = { len: 0 };
  function revealAhead(instant = false) {
    const target = Math.min(pathLen, lengthAtY(scroller.scrollTop + scroller.clientHeight * 0.92));
    if (target <= shown.len) return;
    if (instant || reducedMotion()) {
      gsap.killTweensOf(shown);
      shown.len = target;
      pathAhead.style.strokeDashoffset = String(pathLen - target);
      return;
    }
    gsap.to(shown, {
      len: target,
      duration: 1.2,
      ease: 'power2.out',
      overwrite: true,
      onUpdate: () => (pathAhead.style.strokeDashoffset = String(pathLen - shown.len)),
    });
  }

  // ── 스크롤 관찰: 별이 떠오르고, 막의 하늘색이 바뀐다 ──
  function observe() {
    io?.disconnect();
    const rm = reducedMotion();
    io = new IntersectionObserver(
      (entries) => {
        const els = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
        if (!els.length) return;
        els.forEach((n) => io!.unobserve(n));
        if (rm) gsap.set(els, { opacity: 1 });
        else gsap.fromTo(els, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08 });
      },
      { root: scroller, rootMargin: '0px 0px -6% 0px' },
    );
    [...headings, ...placed.map((p) => p.el)].forEach((n) => {
      gsap.set(n, { opacity: 0 });
      io!.observe(n);
    });
  }

  // 화면 가운데를 지난 마지막 막 제목이 지금의 막이다
  function detectAct() {
    const line = scroller.scrollTop + scroller.clientHeight * 0.5;
    let no = 1;
    for (const h of headings) if (h.offsetTop <= line) no = +h.dataset.act!;
    setAct(no);
  }

  function setAct(no: number) {
    if (no === currentAct) return;
    currentAct = no;
    const probe = headings[no - 1];
    const cs = getComputedStyle(probe);
    const vars = {
      '--sky-a': cs.getPropertyValue('--act-a').trim(),
      '--sky-b': cs.getPropertyValue('--act-b').trim(),
      '--sky-accent': cs.getPropertyValue('--act-accent').trim(),
    };
    gsap.to(el, { ...vars, duration: reducedMotion() ? 0.3 : 1.6, ease: 'power2.inOut' });
    nav.querySelectorAll('a').forEach((a, i) => a.toggleAttribute('aria-current', i === no - 1));
  }

  function buildNav() {
    nav.innerHTML = ACTS.map(
      (a) => `<a href="#act-${a.no}" data-act="${a.no}"${a.no === 1 ? ' aria-current' : ''}><span class="latin">${a.numeral}</span>${a.title}</a>`,
    ).join('');
    nav.addEventListener('click', (e) => {
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;
      e.preventDefault();
      const h = headings[+a.dataset.act! - 1];
      scroller.scrollTo({ top: h.offsetTop - 70, behavior: reducedMotion() ? 'auto' : 'smooth' });
    });
  }

  // ── 시작점 점등 ───────────────────────────────
  function igniteNext() {
    const next = placed.find((p) => p.state === 'next');
    if (!next || reducedMotion()) return;
    const core = next.el.querySelector('.star__core')!;
    const glow = next.el.querySelector('.star__glow')!;
    const ring = document.createElement('span');
    ring.className = 'star__ring';
    next.el.append(ring);
    const tl = gsap.timeline({ delay: 1.0 });
    tl.fromTo(core, { scale: 0.4, opacity: 0.3 }, { scale: 1.6, opacity: 1, duration: 0.5, ease: 'power2.out' })
      .to(core, { scale: 1, duration: 0.9, ease: 'expo.out' })
      .fromTo(glow, { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: 'expo.out' }, 0.1)
      .fromTo(ring, { scale: 0.3, opacity: 0.9 }, { scale: 3.2, opacity: 0, duration: 1.8, ease: 'expo.out', onComplete: () => ring.remove() }, 0.15)
      .fromTo(next.el.querySelector('.star__label'), { opacity: 0, x: next.el.dataset.side === 'left' ? 10 : -10 }, { opacity: 1, x: 0, duration: 1, ease: 'expo.out' }, 0.5);
    tweens.push(tl);
  }

  // ── 별을 눌렀을 때: 그 권의 장면 목록 (지금은 빈 상태) ──
  async function openStop(p: PlacedStop) {
    const book = findBook(p.stop.book)!;
    const sheet = openSheetPanel(book.name, `${p.act.numeral} · ${p.act.title}`);
    sheet.el.dataset.act = String(p.act.no);
    const whole = p.stop.from === 1 && p.stop.to === book.chapters;
    const chapters = Array.from({ length: p.stop.to - p.stop.from + 1 }, (_, i) => p.stop.from + i);
    sheet.body.innerHTML = `
      <p class="stop__meta ui">${whole ? `전체 ${book.chapters}장` : `${p.stop.from}–${p.stop.to}장 (전체 ${book.chapters}장 중)`} · ${p.act.mood}</p>
      <div class="stop__card"></div>
      <p class="stop__empty">이 길은 아직 준비 중입니다.<br />곧 별이 하나씩 켜질 거예요.</p>
      <p class="setting__label">장</p>
      <ol class="stop__chapters">${chapters.map((c) => `<li class="${countDone(book.code, c, c) ? 'done' : ''}">${c}</li>`).join('')}</ol>`;
    try {
      const card = await scriptureCard(`${book.abbr} ${p.stop.from}:1`);
      if (!sheet.el.isConnected) return;
      sheet.body.querySelector('.stop__card')!.append(card);
      revealScripture(card, 0.25);
    } catch (err) {
      console.warn(err);
    }
  }

  function onResize() {
    const keep = scroller.scrollTop / Math.max(1, scroller.scrollHeight);
    layout();
    scroller.scrollTop = keep * scroller.scrollHeight;
    placed.forEach((p) => gsap.set(p.el, { opacity: 1 }));
    headings.forEach((h) => gsap.set(h, { opacity: 1 }));
  }
  let resizeTimer = 0;
  const debouncedResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(onResize, 180);
  };
  let lastW = 0;
  const ro = new ResizeObserver(() => {
    // 모바일 주소창 때문에 높이만 바뀌는 경우는 무시
    if (road.clientWidth === lastW) return;
    const first = lastW === 0;
    lastW = road.clientWidth;
    if (!first) debouncedResize();
  });

  function enter() {
    setFieldMode('stars');
    updateCount();
    buildNav();
    layout();
    lastW = road.clientWidth;
    ro.observe(road);
    scroller.addEventListener(
      'scroll',
      () => {
        revealAhead();
        detectAct();
      },
      { passive: true },
    );
    $('[data-back]').addEventListener('click', () => go('/'));
    $('[data-settings]').addEventListener('click', () =>
      openSettings(() => {
        updateCount();
        layout();
        placed.forEach((p) => gsap.set(p.el, { opacity: 1 }));
        headings.forEach((h) => gsap.set(h, { opacity: 1 }));
      }),
    );
    progress.set({ last: 'map' });

    // 처음 들어올 때: 길이 첫 화면만큼 그려지고 시작점이 켜진다
    if (!reducedMotion()) {
      shown.len = 0;
      pathAhead.style.strokeDashoffset = String(pathLen);
      tweens.push(gsap.delayedCall(0.6, () => revealAhead()));
      tweens.push(gsap.fromTo($('.map__header'), { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: 0.4 }));
      tweens.push(gsap.fromTo(nav, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 1, ease: 'expo.out', delay: 0.7 }));
    }
    igniteNext();
  }

  return {
    el,
    enter,
    leave() {
      io?.disconnect();
        ro.disconnect();
      clearTimeout(resizeTimer);
      tweens.forEach((t) => t.kill());
      gsap.killTweensOf(shown);
      gsap.killTweensOf(el);
    },
  };
}

/** 점들을 지나는 부드러운 곡선 (Catmull-Rom → 베지어) */
function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const t = 0.18;
    const c1 = [p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t];
    const c2 = [p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}
