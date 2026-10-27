// 군중 (동작 crowd / crowd-cheer / crowd-murmur / crowd-bow / crowd-away).
// 무대 뒤쪽 땅에 작은 사람 실루엣 여럿이 한 줄로 선다. 상태(data-state)만 바꾸면 CSS가 움직인다.
import { rng } from './backdrop';

export type CrowdState = 'in' | 'cheer' | 'murmur' | 'bow' | 'away';

/** 사람 하나: 머리 + 어깨가 좁은 긴 옷 + 팔 (팔은 따로 들 수 있게) */
function figure(x: number, h: number, i: number, woman: boolean): string {
  const w = h * 0.26;
  const head = h * 0.12;
  const top = -h + head * 2;
  const body = woman
    ? `<path d="M${-w * 0.45} ${top} Q0 ${top - head * 0.6} ${w * 0.45} ${top} L${w * 0.7} 0 L${-w * 0.7} 0 Z"/>`
    : `<path d="M${-w * 0.5} ${top} L${w * 0.5} ${top} L${w * 0.6} 0 L${-w * 0.6} 0 Z"/>`;
  return `<g class="crowd__p" style="--i:${i}; --x:${x.toFixed(1)}px" transform="translate(${x.toFixed(1)} 0)">
    <g class="crowd__body">
      <circle cx="0" cy="${(top - head * 0.9).toFixed(1)}" r="${head.toFixed(1)}"/>
      ${body}
      <path class="crowd__arm" d="M${w * 0.3} ${top + 2} L${w * 0.55} ${(top - h * 0.28).toFixed(1)}" stroke="currentColor" stroke-width="${(w * 0.22).toFixed(1)}" stroke-linecap="round"/>
      <path class="crowd__arm crowd__arm--b" d="M${-w * 0.3} ${top + 2} L${-w * 0.6} ${(top - h * 0.24).toFixed(1)}" stroke="currentColor" stroke-width="${(w * 0.22).toFixed(1)}" stroke-linecap="round"/>
    </g>
  </g>`;
}

export function createCrowd(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'crowd';
  el.setAttribute('aria-hidden', 'true');
  const r = rng(907);
  const back: string[] = [];
  const front: string[] = [];
  for (let i = 0; i < 26; i++) back.push(figure(-260 + i * 36 + r() * 14, 26 + r() * 8, i, r() < 0.45));
  for (let i = 0; i < 20; i++) front.push(figure(-240 + i * 46 + r() * 16, 36 + r() * 10, i + 30, r() < 0.45));
  el.innerHTML = `<svg viewBox="0 -60 400 64" preserveAspectRatio="xMidYMax slice">
    <g class="crowd__row crowd__row--back" transform="translate(0 -6)">${back.join('')}</g>
    <g class="crowd__row crowd__row--front">${front.join('')}</g>
  </svg>`;
  return el;
}

export function setCrowd(el: HTMLElement, state: CrowdState | null): void {
  if (state) el.dataset.state = state;
  else delete el.dataset.state;
}
