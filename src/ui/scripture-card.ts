// 본문 카드. 금빛 테두리가 한 바퀴 그어지면서 카드가 떠오르고, 본문이 잉크처럼 번진다.
import gsap from 'gsap';
import { getPassage } from '../engine/bible';
import { reducedMotion } from '../engine/settings';
import { inkReveal } from '../fx/ink';

const SOURCE = '개역한글';

export async function scriptureCard(ref: string, opts: { showVerseNumbers?: boolean } = {}): Promise<HTMLElement> {
  const passage = await getPassage(ref);
  const card = document.createElement('figure');
  card.className = 'scripture';
  card.style.margin = '0';
  card.innerHTML = `
    <svg class="scripture__frame" preserveAspectRatio="none" aria-hidden="true"><rect x="0.5" y="0.5" rx="14" ry="14" pathLength="100"/></svg>
    <blockquote class="scripture__text"></blockquote>
    <figcaption class="scripture__ref">${passage.book.name} ${formatRange(ref)} · ${SOURCE}</figcaption>`;
  const quote = card.querySelector<HTMLElement>('.scripture__text')!;
  const multi = passage.verses.length > 1 && opts.showVerseNumbers !== false;
  passage.verses.forEach((v) => {
    if (multi) {
      const sup = document.createElement('sup');
      sup.textContent = String(v.verse);
      quote.append(sup);
    }
    const span = document.createElement('span');
    span.textContent = v.text + ' ';
    quote.append(span);
  });
  return card;
}

function formatRange(ref: string): string {
  return ref.replace(/^\S+\s+/, '').replace('-', '–');
}

/** 카드를 화면에 띄우는 시그니처 모션. 카드는 이미 DOM 안에 있어야 한다. */
export function revealScripture(card: HTMLElement, delay = 0): gsap.core.Timeline {
  const rect = card.querySelector('rect')!;
  const svgEl = card.querySelector('svg')!;
  const fit = () => {
    const { width, height } = card.getBoundingClientRect();
    svgEl.setAttribute('viewBox', `0 0 ${width} ${height}`);
    rect.setAttribute('width', String(width - 1));
    rect.setAttribute('height', String(height - 1));
  };
  fit();
  const quote = card.querySelector<HTMLElement>('.scripture__text')!;
  const ref = card.querySelector('.scripture__ref')!;
  const tl = gsap.timeline({ delay });

  if (reducedMotion()) {
    tl.fromTo(card, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    return tl;
  }

  tl.fromTo(card, { opacity: 0, y: 26, scale: 0.985 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'expo.out' })
    .fromTo(rect, { attr: { 'stroke-dasharray': '0 100', 'stroke-dashoffset': 0 }, opacity: 1 }, { attr: { 'stroke-dasharray': '100 0' }, duration: 1.4, ease: 'power2.inOut' }, 0.1)
    .fromTo(rect, { filter: 'drop-shadow(0 0 0 rgba(244,214,150,0))' }, { filter: 'drop-shadow(0 0 6px rgba(244,214,150,0.55))', duration: 0.6, yoyo: true, repeat: 1 }, 1.1)
    .fromTo(ref, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.2);

  // 여러 절이면 절 번호를 유지한 채 각 절을 이어서 번지게 한다.
  const spans = [...quote.querySelectorAll<HTMLElement>(':scope > span')];
  const sups = [...quote.querySelectorAll<HTMLElement>(':scope > sup')];
  if (sups.length) gsap.set(sups, { opacity: 0 });
  let at = 0.35;
  spans.forEach((span, i) => {
    const text = span.textContent ?? '';
    const h = inkReveal(span, text);
    h.timeline.pause();
    if (sups[i]) tl.to(sups[i], { opacity: 1, duration: 0.4 }, at);
    tl.add(h.timeline.play(0), at);
    at += Math.max(0.3, h.timeline.duration() * 0.85);
  });
  return tl;
}
