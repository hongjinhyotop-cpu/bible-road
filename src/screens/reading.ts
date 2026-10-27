// 읽기 구간 화면 (#/read/gen-5).
// 위에서 아래로 한 줄기: 제목 → 줄거리(친구 말투) → 본문 전체(개역한글) → 해설 → 퀴즈 → 완료.
// 본문은 스크롤해서 화면에 들어오는 절부터 잉크처럼 번진다. 머리줄의 얇은 막대 = 읽은 만큼.
// PC(1100px 이상)는 왼쪽에 목차 레일(줄거리 / 장 / 해설 / 퀴즈)이 붙는다.
import gsap from 'gsap';
import type { Params, Screen } from '../engine/router';
import { go } from '../engine/router';
import { ACTS } from '../engine/acts';
import { fullChapters, getPassage, type Passage } from '../engine/bible';
import { completeReading, progress } from '../engine/progress';
import { nextItem } from '../engine/content';
import { bindNext, nextButton } from '../ui/next-button';
import { loadReading, type Reading } from '../engine/reading';
import { reducedMotion } from '../engine/settings';
import { inkReveal } from '../fx/ink';
import { setFieldIntensity, setFieldMode } from '../fx/particles';
import { icons } from '../ui/icons';
import { openSettings } from '../ui/settings-sheet';
import { isSheetOpen } from '../ui/sheet';

/** 한국어 묵독 속도 (글자/분). 대략적인 "약 N분" 표시용 */
const CHARS_PER_MIN = 500;

const SCORE_LINES = [
  '0개… 괜찮음. 본문 한 번 더 훑고 오면 바로 다 맞힘.',
  '하나 맞힘. 시작이 반이라던데 ㅋㅋ',
  '거의 다 맞힘. 이 정도면 꽤 집중해서 읽은 거임.',
  '전부 정답. ㄹㅇ 꼼꼼하게 읽었네.',
];

/** 빈 줄("\n\n")로 나눈 글을 문단으로. 해설이 길어도 한 덩어리로 뭉치지 않게 */
function paragraphs(box: HTMLElement, text: string) {
  box.replaceChildren(...text.split(/\n\s*\n/).map((t) => {
    const p = document.createElement('p');
    p.textContent = t.trim();
    return p;
  }));
}

export function readingScreen({ id }: Params): Screen {
  const el = document.createElement('section');
  el.className = 'screen reading';
  el.dataset.act = '1';
  el.innerHTML = `
    <div class="play__sky reading__sky" aria-hidden="true"></div>
    <header class="play__head reading__head">
      <button class="icon-btn" data-back aria-label="지도로 가기">${icons.back}</button>
      <p class="play__title"><span class="latin play__numeral"></span><span class="play__name"></span></p>
      <button class="icon-btn" data-settings aria-label="설정">${icons.settings}</button>
      <div class="play__bar" aria-hidden="true"><span></span></div>
    </header>
    <div class="reading__scroll">
      <div class="reading__layout">
        <nav class="reading__rail ui" aria-label="이 구간 목차"></nav>
        <article class="reading__page"></article>
      </div>
    </div>`;

  const $ = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
  const scroller = $('.reading__scroll');
  const page = $('.reading__page');
  const rail = $('.reading__rail');
  const bar = $('.play__bar span');

  let reading: Reading | null = null;
  let alive = true;
  let io: IntersectionObserver | null = null;
  let railIo: IntersectionObserver | null = null;
  const tweens: gsap.core.Animation[] = [];

  // ── 퀴즈 상태 ──
  let qIndex = 0;
  let correct = 0;
  /** 지금 문제에 답했는지 */
  let answered = false;

  // ── 그리기 ────────────────────────────────────
  function render(r: Reading, passage: Passage) {
    const act = ACTS[r.act - 1];
    const title = r.title ?? passage.book.name;
    const range = r.ref.replace(/^\S+\s+/, '').replace('-', '–');
    const chars = passage.verses.reduce((n, v) => n + v.text.length, 0);
    const minutes = Math.max(1, Math.round(chars / CHARS_PER_MIN));

    page.innerHTML = `
      <header class="reading__hero">
        <p class="reading__act latin">${act ? `${act.numeral} · ${act.title}` : ''}</p>
        <h1 class="reading__title"></h1>
        <p class="reading__meta ui">${passage.book.name} ${range}${/:/.test(range) ? '' : '장'} · ${passage.verses.length}절 · 읽는 데 약 ${minutes}분</p>
        <span class="reading__rule" aria-hidden="true"></span>
      </header>

      <section class="reading__summary voice-talk" id="r-summary" data-rail="줄거리">
        <p class="reading__tag">먼저 줄거리부터</p>
        <div class="reading__summary-text"></div>
      </section>

      <section class="reading__text" id="r-text" aria-label="본문">
        <div class="reading__body"></div>
        <p class="reading__source ui">${passage.book.name} ${range} · 개역한글</p>
      </section>

      <section class="insight reading__insight voice-talk" id="r-insight" data-rail="해설">
        <p class="insight__tag">근데 이게 왜 중요하냐면</p>
        <div class="insight__text"></div>
        ${r.tldr ? '<div class="insight__tldr"><span>한 줄 요약</span><p></p></div>' : ''}
      </section>

      <section class="quiz" id="r-quiz" data-rail="퀴즈" aria-live="polite"></section>`;

    // 제목과 사용자 글은 textContent로 넣는다 (콘텐츠 파일의 글자를 HTML로 해석하지 않게)
    page.querySelector<HTMLElement>('.reading__title')!.textContent = title;
    paragraphs(page.querySelector<HTMLElement>('.reading__summary-text')!, r.summary);
    paragraphs(page.querySelector<HTMLElement>('.reading__insight .insight__text')!, r.insight);
    const tldr = page.querySelector('.reading__insight .insight__tldr p');
    if (tldr) tldr.textContent = r.tldr!;

    // 본문: 장마다 큰 장 번호, 절마다 번호 + 글
    const body = page.querySelector<HTMLElement>('.reading__body')!;
    const multiChapter = passage.verses[0].chapter !== passage.verses[passage.verses.length - 1].chapter;
    let chapter = -1;
    let block: HTMLElement | null = null;
    for (const v of passage.verses) {
      if (v.chapter !== chapter) {
        chapter = v.chapter;
        block = document.createElement('div');
        block.className = 'reading__chapter';
        block.id = `r-ch-${chapter}`;
        block.dataset.rail = `${chapter}장`;
        block.innerHTML = `<h2 class="reading__ch"><span class="latin">${chapter}</span><span class="ui">장</span></h2>`;
        if (!multiChapter && passage.verses[0].verse !== 1) block.querySelector('h2')!.remove();
        body.append(block);
      }
      const p = document.createElement('p');
      p.className = 'verse';
      p.innerHTML = `<span class="verse__no latin">${v.verse}</span><span class="verse__text"></span>`;
      p.querySelector('.verse__text')!.textContent = v.text;
      block!.append(p);
    }

    buildRail();
    renderQuestion(false);
  }

  /** PC 왼쪽 목차. 지금 보고 있는 칸이 밝아진다 */
  function buildRail() {
    const targets = [...page.querySelectorAll<HTMLElement>('[data-rail]')];
    rail.innerHTML = `<ol>${targets
      .map((t) => `<li><a href="#" data-to="${t.id}" class="${t.classList.contains('reading__chapter') ? 'is-ch' : ''}">${t.dataset.rail}</a></li>`)
      .join('')}</ol>`;
    rail.querySelectorAll<HTMLAnchorElement>('[data-to]').forEach((a) =>
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const t = page.querySelector<HTMLElement>(`#${a.dataset.to}`)!;
        const top = t.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
        scroller.scrollTo({ top: top - 24, behavior: reducedMotion() ? 'auto' : 'smooth' });
      }),
    );
    railIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          rail.querySelectorAll('a').forEach((a) => a.classList.toggle('is-here', a.dataset.to === e.target.id));
        }
      },
      { root: scroller, rootMargin: '-40% 0px -55% 0px' },
    );
    targets.forEach((t) => railIo!.observe(t));
  }

  // ── 등장 연출 ─────────────────────────────────
  function intro() {
    const rm = reducedMotion();
    const hero = page.querySelector<HTMLElement>('.reading__hero')!;
    const title = inkReveal(page.querySelector<HTMLElement>('.reading__title')!, page.querySelector('.reading__title')!.textContent ?? '', rm ? {} : { stagger: 0.12, duration: 1.2, glow: true });
    title.timeline.pause();
    const tl = gsap.timeline();
    tl.fromTo(hero.querySelector('.reading__act'), { opacity: 0, letterSpacing: rm ? '0.2em' : '0.5em' }, { opacity: 1, letterSpacing: '0.2em', duration: rm ? 0.4 : 1.4, ease: 'expo.out' })
      .add(title.timeline.play(0), rm ? 0.1 : 0.3)
      .fromTo(hero.querySelector('.reading__meta'), { opacity: 0 }, { opacity: 1, duration: 0.8 }, '>-0.5')
      .fromTo(hero.querySelector('.reading__rule'), { scaleX: 0 }, { scaleX: 1, duration: rm ? 0.3 : 1.2, ease: 'power2.inOut' }, '<')
      .fromTo(page.querySelector('.reading__summary'), { opacity: 0, y: rm ? 0 : 16 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, '<0.2')
      .fromTo(rail, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '<');
    tweens.push(tl);
  }

  /** 화면에 들어온 절·칸이 잉크 번지듯 나타난다 (CSS 전환 + 클래스 하나) */
  function watchReveal() {
    const items = page.querySelectorAll<HTMLElement>('.verse, .reading__ch, .reading__insight, .quiz, .reading__source');
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io!.unobserve(e.target);
        }
      },
      { root: scroller, rootMargin: '0px 0px -8% 0px' },
    );
    items.forEach((it) => {
      it.classList.add('reveal');
      io!.observe(it);
    });
  }

  function onScroll() {
    const max = scroller.scrollHeight - scroller.clientHeight;
    gsap.set(bar, { scaleX: max > 0 ? Math.min(1, scroller.scrollTop / max) : 1 });
  }

  // ── 퀴즈 ──────────────────────────────────────
  function renderQuestion(animate: boolean) {
    if (!reading) return;
    const box = page.querySelector<HTMLElement>('.quiz')!;
    const total = reading.quiz.length;
    if (!total) return renderNoQuiz(box);
    const item = reading.quiz[qIndex];
    answered = false;
    box.innerHTML = `
      <header class="quiz__head">
        <p class="quiz__tag ui">확인 퀴즈</p>
        <ol class="quiz__dots" aria-label="${total}문제 중 ${qIndex + 1}번째">${reading.quiz
          .map((_, i) => `<li class="${i < qIndex ? 'done' : i === qIndex ? 'now' : ''}"></li>`)
          .join('')}</ol>
      </header>
      <div class="quiz__card">
        <p class="quiz__q voice-talk"><span class="quiz__no latin">Q${qIndex + 1}.</span> <span></span></p>
        <div class="quiz__options" role="group"></div>
        <div class="quiz__why voice-talk" hidden><p class="quiz__verdict"></p><p class="quiz__why-text"></p></div>
        <div class="quiz__next" hidden><button class="btn btn--primary" data-next>${qIndex + 1 < total ? '다음 문제' : '결과 보기'}</button></div>
      </div>`;
    box.querySelector('.quiz__q span:last-child')!.textContent = item.q;
    const list = box.querySelector('.quiz__options')!;
    item.options.forEach((o, i) => {
      const b = document.createElement('button');
      b.className = 'btn choice quiz__option';
      b.innerHTML = `<span class="choice__key latin">${i + 1}</span><span class="choice__label"></span>`;
      b.querySelector('.choice__label')!.textContent = o;
      b.addEventListener('click', () => answer(i));
      list.append(b);
    });
    box.querySelector('[data-next]')!.addEventListener('click', nextQuestion);
    if (animate) {
      const rm = reducedMotion();
      tweens.push(
        gsap.timeline()
          .fromTo(box.querySelector('.quiz__q'), { opacity: 0, y: rm ? 0 : 10 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' })
          .fromTo(list.children, { opacity: 0, y: rm ? 0 : 12 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.1 }, 0.15),
      );
    }
  }

  function renderNoQuiz(box: HTMLElement) {
    box.innerHTML = `<div class="quiz__card quiz__card--done"><button class="btn btn--primary" data-finish>다 읽었음</button></div>`;
    box.querySelector('[data-finish]')!.addEventListener('click', () => void finish());
  }

  function answer(n: number) {
    if (!reading || answered) return;
    answered = true;
    const item = reading.quiz[qIndex];
    const ok = n === item.answer;
    if (ok) correct++;
    const box = page.querySelector<HTMLElement>('.quiz')!;
    const buttons = [...box.querySelectorAll<HTMLButtonElement>('.quiz__option')];
    buttons.forEach((b, i) => {
      b.disabled = true;
      b.classList.toggle('is-right', i === item.answer);
      b.classList.toggle('is-wrong', i === n && !ok);
    });
    box.querySelector('.quiz__dots li.now')?.classList.add(ok ? 'right' : 'wrong');

    const why = box.querySelector<HTMLElement>('.quiz__why')!;
    why.dataset.ok = ok ? '1' : '0';
    why.querySelector('.quiz__verdict')!.textContent = ok ? '정답!' : `아쉽. 정답은 ${item.answer + 1}번`;
    why.querySelector('.quiz__why-text')!.textContent = item.why;
    why.hidden = false;
    const next = box.querySelector<HTMLElement>('.quiz__next')!;
    next.hidden = false;

    const rm = reducedMotion();
    const right = buttons[item.answer];
    const tl = gsap.timeline();
    // 정답 보기에 촛불이 확 켜지듯 빛이 번진다. 틀린 보기는 조용히 가라앉는다.
    if (!rm) tl.fromTo(right, { boxShadow: '0 0 0 0 rgba(244,214,150,0)' }, { boxShadow: '0 0 34px -2px rgba(244,214,150,0.55)', duration: 0.5, ease: 'power2.out' }).to(right, { boxShadow: '0 0 18px -6px rgba(244,214,150,0.35)', duration: 1.2, ease: 'power2.out' });
    tl.to(buttons.filter((_, i) => i !== item.answer && i !== n), { opacity: 0.4, duration: 0.5 }, 0)
      .fromTo(why, { opacity: 0, y: rm ? 0 : 10 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 0.2)
      .fromTo(next, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.5);
    tweens.push(tl);
    next.querySelector('button')!.focus({ preventScroll: true });
    keepInView(next);
  }

  /** 아래쪽이 화면 밖으로 밀려나면 살짝 따라 내려간다 */
  function keepInView(target: HTMLElement) {
    const r = target.getBoundingClientRect();
    const s = scroller.getBoundingClientRect();
    const over = r.bottom - (s.bottom - 24);
    if (over > 0) scroller.scrollBy({ top: over, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }

  async function nextQuestion() {
    if (!reading || !answered) return;
    const card = page.querySelector<HTMLElement>('.quiz__card')!;
    await gsap.to(card, { opacity: 0, y: reducedMotion() ? 0 : -8, duration: 0.3, ease: 'power2.in' });
    if (!alive) return;
    if (qIndex + 1 < reading.quiz.length) {
      qIndex++;
      renderQuestion(true);
    } else {
      await finish();
    }
  }

  // ── 끝: 점수 + 완료 기록 ───────────────────────
  async function finish() {
    if (!reading) return;
    const total = reading.quiz.length;
    const chapters = await fullChapters(reading.ref).catch(() => []);
    completeReading(reading.id, chapters, correct);
    const next = await nextItem('read', reading.id).catch(() => null);
    // "이어서 하기"는 다음 장면/읽기로 바로 간다
    progress.set({ last: next ? next.path.slice(1) : 'map' });
    if (!alive) return;

    const box = page.querySelector<HTMLElement>('.quiz')!;
    const ratio = total ? correct / total : 1;
    const line = total ? SCORE_LINES[ratio === 1 ? 3 : ratio === 0 ? 0 : ratio < 0.5 ? 1 : 2] : '';
    box.innerHTML = `
      <div class="quiz__card quiz__result">
        <svg class="quiz__seal" viewBox="0 0 120 120" aria-hidden="true">
          <circle class="quiz__seal-ring" cx="60" cy="60" r="52" pathLength="100"/>
          <circle class="quiz__seal-core" cx="60" cy="60" r="6"/>
        </svg>
        <p class="quiz__score">${total ? `<span class="latin">${correct}</span><span class="ui"> / ${total}</span>` : ''}</p>
        <p class="quiz__line voice-talk"></p>
        <p class="quiz__done ui">${chapters.length ? `${chapters.length}장 읽음 표시 완료` : '읽기 완료'} · 지도에 기록됐음</p>
        <div class="insight__actions">
          ${next ? nextButton(next) : ''}
          <button class="btn${next ? '' : ' btn--primary'}" data-map>지도로 돌아가기</button>
          ${total ? '<button class="btn" data-again>퀴즈 다시</button>' : ''}
        </div>
      </div>`;
    box.querySelector('.quiz__line')!.textContent = line;
    box.querySelector('[data-map]')!.addEventListener('click', (e) => go('/map', { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY }));
    bindNext(box);
    box.querySelector('[data-again]')?.addEventListener('click', () => {
      qIndex = 0;
      correct = 0;
      renderQuestion(true);
    });
    box.querySelector<HTMLButtonElement>('[data-go-next], [data-map]')!.focus({ preventScroll: true });

    // 다 읽은 표시: 금빛 고리가 한 바퀴 그어지고 가운데 별이 켜진다 (지도의 별과 같은 말)
    const rm = reducedMotion();
    const card = box.querySelector<HTMLElement>('.quiz__result')!;
    const tl = gsap.timeline();
    tl.fromTo(card, { opacity: 0, y: rm ? 0 : 16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' });
    if (!rm) {
      tl.fromTo(card.querySelector('.quiz__seal-ring'), { attr: { 'stroke-dasharray': '0 100' } }, { attr: { 'stroke-dasharray': '100 0' }, duration: 1.3, ease: 'power2.inOut' }, 0.15)
        .fromTo(card.querySelector('.quiz__seal-core'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.9, ease: 'expo.out' }, 1.1)
        .fromTo(card.querySelector('.quiz__score'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out' }, 0.5);
    }
    tl.fromTo(card.querySelectorAll('.quiz__line, .quiz__done, .insight__actions'), { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.15 }, rm ? 0.2 : 0.9);
    tweens.push(tl);
    keepInView(card);
  }

  // ── 입력: 숫자키 = 보기 고르기, 엔터 = 다음 문제 ──
  function quizInView(): boolean {
    const q = page.querySelector<HTMLElement>('.quiz');
    if (!q) return false;
    const r = q.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }

  function onKey(e: KeyboardEvent) {
    if (isSheetOpen() || !reading || !quizInView()) return;
    if (!answered && /^[1-9]$/.test(e.key)) {
      const n = +e.key - 1;
      if (n < (reading.quiz[qIndex]?.options.length ?? 0)) {
        e.preventDefault();
        answer(n);
      }
    }
  }

  async function enter() {
    setFieldMode('dust');
    // 읽는 화면이니까 배경 먼지는 평소보다 조용하게
    setFieldIntensity(0.55);
    document.addEventListener('keydown', onKey);
    scroller.addEventListener('scroll', onScroll, { passive: true });
    $('[data-back]').addEventListener('click', () => go('/map'));
    $('[data-settings]').addEventListener('click', () => openSettings());
    let passage: Passage;
    try {
      reading = await loadReading(id);
      passage = await getPassage(reading.ref);
    } catch (err) {
      console.warn(err);
      page.innerHTML = `<div class="insight voice-talk reading__missing"><p class="insight__text">어… 이 읽기 구간은 아직 없음. 주소가 틀렸거나 아직 안 만든 듯.</p><div class="insight__actions"><button class="btn btn--primary" data-map>지도로 돌아가기</button></div></div>`;
      page.querySelector('[data-map]')!.addEventListener('click', () => go('/map'));
      return;
    }
    if (!alive) return;
    el.dataset.act = String(reading.act);
    $('.play__numeral').textContent = ACTS[reading.act - 1]?.numeral ?? '';
    $('.play__name').textContent = reading.title ?? reading.ref.replace('-', '–');
    progress.set({ last: `read/${reading.id}`, startedAt: progress.get().startedAt ?? Date.now() });
    render(reading, passage);
    intro();
    watchReveal();
    onScroll();
  }

  return {
    el,
    enter: () => void enter(),
    leave() {
      alive = false;
      document.removeEventListener('keydown', onKey);
      io?.disconnect();
      railIo?.disconnect();
      tweens.forEach((t) => t.kill());
      setFieldIntensity(1);
    },
  };
}
