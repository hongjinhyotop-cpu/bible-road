// 시그니처 모션: 잉크가 번지듯 한 글자씩 나타나는 글.
// 탭하거나 finish()를 부르면 즉시 전체가 보인다.
import gsap from 'gsap';
import { CHAR_DELAY, reducedMotion, settings } from '../engine/settings';

export interface InkOptions {
  /** 글자 간격(초). 생략하면 설정의 글자 속도를 따른다. */
  stagger?: number;
  /** 글자 하나가 번지는 시간 */
  duration?: number;
  delay?: number;
  /** 빛나는 글자(타이틀용) */
  glow?: boolean;
}

export interface InkHandle {
  timeline: gsap.core.Timeline;
  done: Promise<void>;
  finish(): void;
}

/** el의 글자를 span으로 나눈다. 띄어쓰기 단위로 묶어 줄바꿈이 단어 중간에서 일어나지 않게 한다. */
export function splitChars(el: HTMLElement, text: string): HTMLElement[] {
  el.textContent = '';
  el.setAttribute('aria-label', text);
  const chars: HTMLElement[] = [];
  text.split(/(\s+)/).forEach((word) => {
    if (!word) return;
    if (/^\s+$/.test(word)) {
      el.append(document.createTextNode(word));
      return;
    }
    const wrap = document.createElement('span');
    wrap.style.whiteSpace = 'nowrap';
    wrap.setAttribute('aria-hidden', 'true');
    for (const ch of word) {
      const s = document.createElement('span');
      s.className = 'ink-char';
      s.textContent = ch;
      wrap.append(s);
      chars.push(s);
    }
    el.append(wrap);
  });
  return chars;
}

export function inkReveal(el: HTMLElement, text: string, opts: InkOptions = {}): InkHandle {
  const chars = splitChars(el, text);
  const speed = opts.stagger ?? CHAR_DELAY[settings.get().textSpeed];
  const tl = gsap.timeline({ delay: opts.delay ?? 0 });

  if (reducedMotion() || speed === 0) {
    tl.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: reducedMotion() ? 0.5 : 0.25, ease: 'power1.out' });
  } else {
    const dur = opts.duration ?? 0.9;
    tl.fromTo(
      chars,
      {
        opacity: 0,
        filter: opts.glow ? 'blur(14px)' : 'blur(5px)',
        y: opts.glow ? 0 : 3,
        scale: opts.glow ? 1.25 : 1.06,
        textShadow: opts.glow ? '0 0 40px rgba(255,236,190,1)' : '0 0 0 rgba(0,0,0,0)',
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        scale: 1,
        textShadow: opts.glow ? '0 0 18px rgba(244,214,150,0.45)' : '0 0 0 rgba(0,0,0,0)',
        duration: dur,
        ease: 'power2.out',
        stagger: speed,
        clearProps: opts.glow ? 'filter,transform' : 'filter,transform,textShadow',
      },
    );
  }

  const done = new Promise<void>((resolve) => tl.eventCallback('onComplete', () => resolve()));
  return { timeline: tl, done, finish: () => tl.progress(1) };
}
