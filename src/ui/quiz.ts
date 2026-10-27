// 에피소드 끝 확인 퀴즈 (1~2문제). 한 문제씩: 고르면 정답 보기에 촛불처럼 빛이 번지고,
// 틀린 건 가라앉고 "왜" 설명이 나온다. 다 풀면 맞힌 개수를 돌려준다. 숫자키로도 고를 수 있다.
import gsap from 'gsap';
import { reducedMotion } from '../engine/settings';

export interface QuizItem {
  q: string;
  options: string[];
  /** 정답 보기 번호 (0부터) */
  answer: number;
  /** 왜 그게 답인지 (친구 말투) */
  why: string;
}

export interface QuizRun {
  el: HTMLElement;
  /** 다 풀면 맞힌 개수 */
  done: Promise<number>;
  /** 숫자키 (1부터). 처리했으면 true */
  key(n: number): boolean;
  /** 엔터: 답을 고른 뒤면 다음 문제로 */
  enter(): boolean;
  destroy(): void;
}

export function runQuiz(items: QuizItem[]): QuizRun {
  const el = document.createElement('section');
  el.className = 'quiz quiz--dock';
  el.setAttribute('aria-live', 'polite');
  const tweens: gsap.core.Animation[] = [];
  let i = 0;
  let correct = 0;
  let answered = false;
  let resolve!: (n: number) => void;
  const done = new Promise<number>((r) => (resolve = r));

  function render(animate: boolean) {
    const item = items[i];
    answered = false;
    el.innerHTML = `
      <header class="quiz__head">
        <p class="quiz__tag ui">확인 퀴즈</p>
        <ol class="quiz__dots" aria-label="${items.length}문제 중 ${i + 1}번째">${items
          .map((_, k) => `<li class="${k < i ? 'done' : k === i ? 'now' : ''}"></li>`)
          .join('')}</ol>
      </header>
      <div class="quiz__card">
        <p class="quiz__q voice-talk"><span class="quiz__no latin">Q${i + 1}.</span> <span></span></p>
        <div class="quiz__options" role="group"></div>
        <div class="quiz__why voice-talk" hidden><p class="quiz__verdict"></p><p class="quiz__why-text"></p></div>
        <div class="quiz__next" hidden><button class="btn btn--primary" data-next>${i + 1 < items.length ? '다음 문제' : '다 풀었음'}</button></div>
      </div>`;
    el.querySelector('.quiz__q span:last-child')!.textContent = item.q;
    const list = el.querySelector('.quiz__options')!;
    item.options.forEach((o, n) => {
      const b = document.createElement('button');
      b.className = 'btn choice quiz__option';
      b.innerHTML = `<span class="choice__key latin">${n + 1}</span><span class="choice__label"></span>`;
      b.querySelector('.choice__label')!.textContent = o;
      b.addEventListener('click', () => answer(n));
      list.append(b);
    });
    el.querySelector('[data-next]')!.addEventListener('click', () => void next());
    if (animate) {
      const rm = reducedMotion();
      tweens.push(
        gsap.timeline()
          .fromTo(el.querySelector('.quiz__q'), { opacity: 0, y: rm ? 0 : 10 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' })
          .fromTo(list.children, { opacity: 0, y: rm ? 0 : 12 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.1 }, 0.15),
      );
    }
  }

  function answer(n: number) {
    if (answered) return;
    answered = true;
    const item = items[i];
    const ok = n === item.answer;
    if (ok) correct++;
    const buttons = [...el.querySelectorAll<HTMLButtonElement>('.quiz__option')];
    buttons.forEach((b, k) => {
      b.disabled = true;
      b.classList.toggle('is-right', k === item.answer);
      b.classList.toggle('is-wrong', k === n && !ok);
    });
    el.querySelector('.quiz__dots li.now')?.classList.add(ok ? 'right' : 'wrong');
    const why = el.querySelector<HTMLElement>('.quiz__why')!;
    why.dataset.ok = ok ? '1' : '0';
    why.querySelector('.quiz__verdict')!.textContent = ok ? '정답!' : `아쉽. 정답은 ${item.answer + 1}번`;
    why.querySelector('.quiz__why-text')!.textContent = item.why;
    why.hidden = false;
    const nextBox = el.querySelector<HTMLElement>('.quiz__next')!;
    nextBox.hidden = false;
    const rm = reducedMotion();
    const right = buttons[item.answer];
    const tl = gsap.timeline();
    if (!rm) tl.fromTo(right, { boxShadow: '0 0 0 0 rgba(244,214,150,0)' }, { boxShadow: '0 0 34px -2px rgba(244,214,150,0.55)', duration: 0.5, ease: 'power2.out' }).to(right, { boxShadow: '0 0 18px -6px rgba(244,214,150,0.35)', duration: 1.2, ease: 'power2.out' });
    tl.to(buttons.filter((_, k) => k !== item.answer && k !== n), { opacity: 0.4, duration: 0.5 }, 0)
      .fromTo(why, { opacity: 0, y: rm ? 0 : 10 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, 0.2)
      .fromTo(nextBox, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.5);
    tweens.push(tl);
    nextBox.querySelector('button')!.focus({ preventScroll: true });
    // 독 안에서 설명이 아래로 밀려나면 따라 내려간다
    const dock = el.closest<HTMLElement>('.dock');
    if (dock) requestAnimationFrame(() => dock.scrollTo({ top: dock.scrollHeight, behavior: rm ? 'auto' : 'smooth' }));
  }

  async function next() {
    if (!answered) return;
    const card = el.querySelector<HTMLElement>('.quiz__card')!;
    await gsap.to(card, { opacity: 0, y: reducedMotion() ? 0 : -8, duration: 0.3, ease: 'power2.in' });
    if (i + 1 < items.length) {
      i++;
      render(true);
      el.closest<HTMLElement>('.dock')?.scrollTo({ top: 0 });
    } else resolve(correct);
  }

  render(true);
  return {
    el,
    done,
    key(n) {
      if (answered || n < 1 || n > items[i].options.length) return false;
      answer(n - 1);
      return true;
    },
    enter() {
      if (!answered) return false;
      void next();
      return true;
    },
    destroy() {
      tweens.forEach((t) => t.kill());
    },
  };
}
