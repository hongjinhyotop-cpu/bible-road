// 성경 지도: 14막, 66권이 하나의 별자리 길로 이어진다.
// 스크롤하며 내려가면 길이 앞으로 그려지고, 막에 들어설 때마다 하늘의 색이 바뀐다.
import gsap from 'gsap';
import type { Screen } from '../engine/router';
import { go } from '../engine/router';
import { ACTS, type Act, type Stop } from '../engine/acts';
import { BOOKS, TOTAL_CHAPTERS, findBook } from '../engine/books';
import { countDone, markLit, totalDone, progress, readingDone, sceneDone } from '../engine/progress';
import { contentOfAct } from '../engine/content';
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
      <div class="map__tools map__tools--left">
        <button class="icon-btn" data-back aria-label="타이틀로 가기">${icons.back}</button>
      </div>
      <div class="map__heading">
        <h1>성경 지도</h1>
        <p class="ui map__count"></p>
      </div>
      <div class="map__tools">
        <button class="icon-btn" data-people aria-label="인물 도감">${icons.people}</button>
        <button class="icon-btn" data-settings aria-label="설정">${icons.settings}</button>
      </div>
    </header>
    <nav class="map__acts ui" aria-label="막 바로가기"></nav>
    <div class="map__scroll">
      <div class="map__road">
        <svg class="map__svg" aria-hidden="true">
          <path class="map__path map__path--base"/>
          <path class="map__path map__path--ahead"/>
          <path class="map__path map__path--lit"/>
          <path class="map__path map__path--trail"/>
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
  const pathTrail = $<SVGPathElement>('.map__path--trail');
  const nav = $<HTMLElement>('.map__acts');

  let placed: PlacedStop[] = [];
  let headings: HTMLElement[] = [];
  let pathLen = 0;
  let samples: { len: number; y: number }[] = [];
  let io: IntersectionObserver | null = null;
  let currentAct = 1;
  const tweens: gsap.core.Animation[] = [];
  /** 이번에 처음 켜지는 별 (막 피날레를 보고 왔을 때). 점등 연출이 끝날 때까지는 꺼진 것처럼 그린다 */
  const igniting = new Set<string>();
  const stopKey = (s: Stop) => `${s.book}:${s.from}-${s.to}`;

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
        b.className = `star star--${state}${igniting.has(stopKey(stop)) ? ' is-igniting' : ''}`;
        b.dataset.act = String(act.no);
        b.dataset.side = x > cx + 4 ? 'left' : 'right';
        b.style.left = `${x}px`;
        b.style.top = `${y}px`;
        b.setAttribute('aria-label', `${book.name} ${range}${state === 'lit' ? ', 완료' : state === 'next' ? ', 다음 길' : ''}`);
        b.innerHTML = `
          <span class="star__glow" aria-hidden="true"></span>
          <span class="star__core" aria-hidden="true"></span>
          <span class="star__label" aria-hidden="true"><b>${book.name}</b><small>${range}${state === 'next' ? ' · 여기서 시작!' : ''}</small></span>`;
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
    [pathBase, pathAhead, pathLit, pathTrail].forEach((p) => p.setAttribute('d', d));
    pathLen = pathBase.getTotalLength();
    samples = [];
    for (let l = 0; l <= pathLen; l += 24) samples.push({ len: l, y: pathBase.getPointAtLength(l).y });
    samples.push({ len: pathLen, y: H });

    // 켜진 별까지 금빛 길 (지금 점등 중인 별은 빼고), 그리고 마지막 켜진 별에서 다음 별까지 이어지는 가는 금빛 길
    const lastLit = placed.reduce((m, p) => (p.state === 'lit' && !igniting.has(stopKey(p.stop)) ? p.index : m), -1);
    const litLen = lastLit < 0 ? 0 : lengthAtY(placed[lastLit].y);
    pathLit.style.strokeDasharray = `${litLen} ${pathLen}`;
    setTrail(igniting.size ? -1 : lastLit);

    pathAhead.style.strokeDasharray = `${pathLen}`;
    pathAhead.style.strokeDashoffset = `${pathLen}`;
    revealAhead(true);
    observe();
  }

  /** 켜진 별(from번째)에서 다음 별까지 이어지는 가는 금빛 길. part만큼만 그린다 (점등 연출에서 0→1) */
  function setTrail(from: number, part = 1) {
    const next = placed.find((p) => p.state === 'next');
    if (from < 0 || !next) {
      pathTrail.style.strokeDasharray = `0 ${pathLen * 2}`;
      return;
    }
    const a = lengthAtY(placed[from].y);
    const b = lengthAtY(next.y);
    pathTrail.style.strokeDasharray = `0 ${a} ${Math.max(0, (b - a) * part)} ${pathLen * 2}`;
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

  // ── 막을 끝내고 왔을 때: 별이 점등되고, 다음 별까지 길이 이어진다 ──
  /** 막 피날레를 보고 처음 지도에 왔으면, 새로 켜질 별들을 골라 둔다 (layout 전에) */
  function findIgniting() {
    igniting.clear();
    const seen = progress.get().litStops;
    const fresh: string[] = [];
    for (const act of ACTS)
      for (const stop of act.stops)
        if (countDone(stop.book, stop.from, stop.to) === stop.to - stop.from + 1 && !seen[stopKey(stop)]) fresh.push(stopKey(stop));
    if (reducedMotion()) markLit(fresh);
    else fresh.forEach((k) => igniting.add(k));
  }

  function celebrate() {
    if (!igniting.size) return igniteNext(1.0);
    markLit([...igniting]);
    // 첫 화면 배치가 자리 잡은 뒤(스크롤바가 생기며 다시 배치될 수 있음)에 그때의 별들로 연출을 만든다
    tweens.push(gsap.delayedCall(1.2, playIgnite));
  }

  function playIgnite() {
    const list = placed.filter((p) => igniting.has(stopKey(p.stop)));
    if (!list.length) return;
    const last = list[list.length - 1];
    // 화면 밖이면 그 별로 데려간다
    if (last.y > scroller.scrollTop + scroller.clientHeight * 0.8) scroller.scrollTo({ top: last.y - scroller.clientHeight * 0.4, behavior: 'smooth' });
    const prevLit = placed.reduce((m, p) => (p.state === 'lit' && !igniting.has(stopKey(p.stop)) ? p.index : m), -1);
    const lit = { len: prevLit < 0 ? 0 : lengthAtY(placed[prevLit].y) };
    const litTo = lengthAtY(last.y);
    const tl = gsap.timeline();
    // 그전까지 켜진 길이 새 별까지 금빛으로 차오른다
    if (litTo > lit.len) tl.to(lit, { len: litTo, duration: 1.4, ease: 'power2.inOut', onUpdate: () => (pathLit.style.strokeDasharray = `${lit.len} ${pathLen}`) }, 0);
    list.forEach((p, i) => {
      const at = (litTo > lit.len ? 1.2 : 0) + i * 0.5;
      const core = p.el.querySelector('.star__core')!;
      const glow = p.el.querySelector('.star__glow')!;
      const rings = [0, 1].map(() => {
        const r = document.createElement('span');
        r.className = 'star__ring star__ring--gold';
        p.el.append(r);
        return r;
      });
      tl.call(() => {
        igniting.delete(stopKey(p.stop));
        p.el.classList.remove('is-igniting');
      }, [], at)
        .fromTo(core, { scale: 0.3 }, { scale: 2.4, duration: 0.45, ease: 'power2.out' }, at)
        .to(core, { scale: 1, duration: 1.2, ease: 'expo.out' }, at + 0.45)
        .fromTo(glow, { scale: 0.2, opacity: 0 }, { scale: 1.6, opacity: 1, duration: 1.6, ease: 'expo.out' }, at)
        .to(glow, { scale: 1, opacity: 0.8, duration: 1.4, ease: 'power2.out' }, at + 1.6)
        .fromTo(rings[0], { scale: 0.3, opacity: 1 }, { scale: 4, opacity: 0, duration: 1.8, ease: 'expo.out', onComplete: () => rings[0].remove() }, at + 0.05)
        .fromTo(rings[1], { scale: 0.3, opacity: 0.7 }, { scale: 7, opacity: 0, duration: 2.6, ease: 'expo.out', onComplete: () => rings[1].remove() }, at + 0.35)
        .fromTo(p.el.querySelector('.star__label'), { opacity: 0.3 }, { opacity: 1, duration: 1.2 }, at + 0.3);
    });
    // 막 하나가 끝났다는 한 줄
    const cap = document.createElement('p');
    cap.className = 'star__caption ui';
    cap.style.left = `${last.x}px`;
    cap.style.top = `${last.y}px`;
    cap.innerHTML = `<b>${last.act.numeral} · ${last.act.title}</b> 완료 · 별이 켜졌음`;
    road.append(cap);
    const lit0 = (litTo > lit.len ? 1.2 : 0) + (list.length - 1) * 0.5;
    tl.fromTo(cap, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, lit0 + 0.6)
      .to(cap, { opacity: 0, duration: 1.2, onComplete: () => cap.remove() }, lit0 + 5);
    // 그리고 다음 별까지 길이 이어진다
    const t = { part: 0 };
    tl.to(t, { part: 1, duration: 2, ease: 'power2.inOut', onUpdate: () => setTrail(last.index, t.part) }, lit0 + 1.4)
      .call(() => {
        igniting.clear();
        igniteNext(0);
      }, [], lit0 + 3.2);
    tweens.push(tl);
  }

  // ── 시작점 점등 ───────────────────────────────
  function igniteNext(delay: number) {
    const next = placed.find((p) => p.state === 'next');
    if (!next || reducedMotion()) return;
    const core = next.el.querySelector('.star__core')!;
    const glow = next.el.querySelector('.star__glow')!;
    const ring = document.createElement('span');
    ring.className = 'star__ring';
    next.el.append(ring);
    const tl = gsap.timeline({ delay });
    tl.fromTo(core, { scale: 0.4, opacity: 0.3 }, { scale: 1.6, opacity: 1, duration: 0.5, ease: 'power2.out' })
      .to(core, { scale: 1, duration: 0.9, ease: 'expo.out' })
      .fromTo(glow, { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: 'expo.out' }, 0.1)
      .fromTo(ring, { scale: 0.3, opacity: 0.9 }, { scale: 3.2, opacity: 0, duration: 1.8, ease: 'expo.out', onComplete: () => ring.remove() }, 0.15)
      .fromTo(next.el.querySelector('.star__label'), { opacity: 0, x: next.el.dataset.side === 'left' ? 10 : -10 }, { opacity: 1, x: 0, duration: 1, ease: 'expo.out' }, 0.5);
    tweens.push(tl);
  }

  // ── 별을 눌렀을 때: 그 구간의 장면 목록 ──
  async function openStop(p: PlacedStop) {
    const book = findBook(p.stop.book)!;
    const sheet = openSheetPanel(book.name, `${p.act.numeral} · ${p.act.title}`);
    sheet.el.dataset.act = String(p.act.no);
    const whole = p.stop.from === 1 && p.stop.to === book.chapters;
    const chapters = Array.from({ length: p.stop.to - p.stop.from + 1 }, (_, i) => p.stop.from + i);
    // 이 구간의 플레이 장면 + 읽기 구간 (content.ts가 본문 순서대로 세워 줌)
    const items = (await contentOfAct(p.act.no).catch(() => []))
      .filter(({ r }) => r.book.code === book.code && r.startChapter >= p.stop.from && r.startChapter <= p.stop.to)
      .map((it) => ({ ...it, done: it.kind === 'scene' ? sceneDone(it.id) : readingDone(it.id) }));
    // 장 번호 → 그 장을 덮는 장면/읽기 구간 주소
    const chapterGo = new Map<number, string>();
    for (const it of items) for (let c = it.r.startChapter; c <= it.r.endChapter; c++) if (!chapterGo.has(c)) chapterGo.set(c, it.path);
    const list = items.length
      ? `<p class="setting__label">이 구간에서 할 것</p>
         <ul class="stop__scenes">${items
           .map(
             (it) => `<li><button class="btn stop__scene${it.done ? ' is-done' : ''}" data-go="${it.path}">
               <span class="stop__scene-title">${it.title}</span>
               <span class="stop__scene-ref ui"><span class="stop__kind stop__kind--${it.kind}">${it.kind === 'scene' ? '플레이' : '읽기'}</span>${it.ref.replace(/^\S+\s+/, '').replace('-', '–')}${/:/.test(it.ref) ? '' : '장'}${it.done ? ' · 완료' : ''}</span>
             </button></li>`,
           )
           .join('')}</ul>`
      : '<p class="stop__empty voice-talk">여긴 아직 공사 중임.<br />곧 별 하나씩 켜질 거니까 조금만 기다려 줘.</p>';
    sheet.body.innerHTML = `
      <p class="stop__meta voice-talk">${whole ? `전체 ${book.chapters}장` : `${p.stop.from}–${p.stop.to}장 (전체 ${book.chapters}장 중에)`} · ${p.act.mood}</p>
      <div class="stop__card"></div>
      ${list}
      <p class="setting__label">장 목록</p>
      <ol class="stop__chapters">${chapters
        .map((c) => {
          const cls = countDone(book.code, c, c) ? ' class="done"' : '';
          const to = chapterGo.get(c);
          return to
            ? `<li${cls}><button data-go="${to}" aria-label="${book.name} ${c}장으로">${c}</button></li>`
            : `<li${cls} aria-label="${c}장, 아직 준비 중"><span>${c}</span></li>`;
        })
        .join('')}</ol>
      ${items.length && chapterGo.size < chapters.length ? '<p class="stop__hint ui">불 들어온 번호만 눌러짐. 나머지 장은 아직 만드는 중.</p>' : ''}`;
    sheet.body.querySelectorAll<HTMLButtonElement>('[data-go]').forEach((b) =>
      b.addEventListener('click', (e) => go(b.dataset.go!, { x: e.clientX, y: e.clientY })),
    );
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
    findIgniting();
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
    $('[data-people]').addEventListener('click', (e) => go('/people', { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY }));
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
    celebrate();
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
