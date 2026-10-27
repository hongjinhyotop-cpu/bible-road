// 노아의 방주 (창 6–8). 배경 그림과 따로 무대 위에 떠 있는 층이라, 물이 차오르면 같이 떠오른다.
// 상태(engine/moods.ts의 ark):
//  - frame    : 뼈대만 선 방주. 비계와 사다리, 개미만 한 일꾼들. 처음엔 가까이서 보다가 천천히 물러나며 크기를 드러낸다
//  - built    : 다 지은 방주. 화면에 다 안 들어올 만큼 길어서, 아주 느리게 옆으로 훑는다
//  - boarding : 짐승들이 둘씩 문으로 걸어 들어간다 (창 7:8-9)
//  - shut     : 문이 닫힌다 (창 7:16 "여호와께서 그를 닫아 넣으시니라")
//  - float    : 물 위에 떠서 천천히 흔들린다. 멀리서 본 작은 방주
//  - rest     : 아라랏 산 위에 멈춘 방주 (창 8:4)
// 새(까마귀·비둘기)는 방주 창에서 날아 나간다 → flyBird().
//
// 크기 (창 6:15): 길이 300 · 너비 50 · 높이 30 규빗. 그림의 옆모습 비율(길이:높이 ≈ 10:1)을 그대로 따른다.
import type { ArkState } from '../engine/moods';

const W = 700;
const H = 150;
/** 방주 바닥 */
const KEEL = 136;
/** 선체 윗면 (그 위로 창 한 줄, 지붕) */
const DECK = 64;
const DOOR = { x: 300, w: 34, top: 92 };

/** 개미만 한 사람 (일꾼). 키 ≈ 15 (방주 높이의 1/9쯤) */
function worker(x: number, y: number, pose: 'stand' | 'carry' | 'reach' = 'stand', flip = false): string {
  const arm =
    pose === 'carry'
      ? `<path d="M-1 -11 L-6 -14 L-6 -13 L-1 -10 Z"/><rect x="-11" y="-16.2" width="16" height="1.6" rx="0.6"/>`
      : pose === 'reach'
        ? `<path d="M0.6 -11 L3.6 -16.5 L4.6 -16 L1.8 -10.6 Z"/>`
        : `<path d="M0.4 -11 L2 -6 L1 -6 L-0.6 -10.4 Z"/>`;
  return `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">
    <circle cx="0" cy="-13.3" r="1.7"/>
    <path d="M-1.6 -11.6 C-2 -9 -2.4 -6 -2 -3.6 L-2.6 0 L-1.4 0 L0 -4 L1.4 0 L2.6 0 L1.8 -3.6 C2.2 -6 2 -9 1.6 -11.6 Z"/>
    ${arm}
  </g>`;
}

/** 선체 옆모습: 양 끝이 살짝 들린 긴 상자 */
const HULL = `M18 ${DECK} L682 ${DECK} L676 ${KEEL - 18} C672 ${KEEL - 6} 664 ${KEEL} 650 ${KEEL} L50 ${KEEL} C36 ${KEEL} 28 ${KEEL - 6} 24 ${KEEL - 18} Z`;

function planks(): string {
  const lines: string[] = [];
  for (let y = DECK + 9; y < KEEL - 2; y += 9) lines.push(`M${y > KEEL - 20 ? 34 : 22} ${y} L${y > KEEL - 20 ? 666 : 678} ${y}`);
  return `<path class="ark-plank" d="${lines.join(' ')}"/>`;
}

/** 다 지은 방주: 선체 + 창 한 줄(빛이 새어 나옴) + 낮은 지붕 + 3층 갑판선 + 옆문과 다리판 */
function hull(): string {
  return `<g class="ark-hull">
    <rect class="ark-window" x="40" y="${DECK - 9}" width="620" height="9"/>
    <path class="ark-ink" d="M10 ${DECK - 8} L690 ${DECK - 8} L654 ${DECK - 30} L46 ${DECK - 30} Z"/>
    <path class="ark-ink" d="${HULL}"/>
    ${planks()}
    <path class="ark-deck" d="M22 ${DECK + 24} L678 ${DECK + 24} M26 ${DECK + 48} L674 ${DECK + 48}"/>
    <rect class="ark-doorway" x="${DOOR.x}" y="${DOOR.top}" width="${DOOR.w}" height="${KEEL - DOOR.top - 2}"/>
    <g class="ark-door" style="transform-origin:${DOOR.x + DOOR.w / 2}px ${KEEL - 2}px">
      <rect class="ark-ink" x="${DOOR.x - 1}" y="${DOOR.top - 1}" width="${DOOR.w + 2}" height="${KEEL - DOOR.top - 1}"/>
      <path class="ark-plank" d="M${DOOR.x} ${DOOR.top + 10} L${DOOR.x + DOOR.w} ${DOOR.top + 10} M${DOOR.x} ${DOOR.top + 22} L${DOOR.x + DOOR.w} ${DOOR.top + 22} M${DOOR.x} ${DOOR.top + 34} L${DOOR.x + DOOR.w} ${DOOR.top + 34}"/>
    </g>
  </g>`;
}

/** 짓는 중: 용골과 갈빗대, 아래쪽 판자 몇 줄, 비계·사다리, 일꾼들 */
function frame(): string {
  const ribs: string[] = [];
  for (let x = 30; x <= 670; x += 20) ribs.push(`M${x} ${KEEL - 2} L${x} ${DECK}`);
  const lowPlanks: string[] = [];
  for (let y = KEEL - 6; y > KEEL - 34; y -= 8) lowPlanks.push(`M${y > KEEL - 12 ? 50 : 28} ${y} L${y > KEEL - 12 ? 650 : 672} ${y}`);
  const scaffold: string[] = [];
  for (const x of [120, 250, 420, 560]) scaffold.push(`M${x} ${KEEL} L${x} ${DECK - 20} M${x + 34} ${KEEL} L${x + 34} ${DECK - 20} M${x - 4} ${DECK - 2} L${x + 38} ${DECK - 2} M${x - 4} ${DECK + 34} L${x + 38} ${DECK + 34}`);
  const ladder = (x: number) => {
    let d = `M${x} ${KEEL} L${x + 10} ${DECK + 34} M${x + 8} ${KEEL} L${x + 18} ${DECK + 34}`;
    for (let i = 1; i < 6; i++) {
      const t = i / 6;
      d += ` M${x + 10 * t} ${KEEL - (KEEL - DECK - 34) * t} L${x + 8 + 10 * t} ${KEEL - (KEEL - DECK - 34) * t}`;
    }
    return d;
  };
  return `<g class="ark-frame">
    <path class="ark-rib" d="M24 ${KEEL} L676 ${KEEL} ${ribs.join(' ')}"/>
    <path class="ark-rib ark-rib--top" d="M24 ${DECK} L676 ${DECK}"/>
    <path class="ark-plankrow" d="${lowPlanks.join(' ')}"/>
    <path class="ark-scaffold" d="${scaffold.join(' ')} ${ladder(208)} ${ladder(500)}"/>
    <g class="ark-ink">
      ${worker(136, DECK - 2, 'reach')}
      ${worker(268, DECK - 2, 'carry', true)}
      ${worker(438, DECK + 34, 'stand')}
      ${worker(576, DECK - 2, 'reach', true)}
      ${worker(214, KEEL, 'carry')}
      ${worker(360, KEEL, 'stand', true)}
      ${worker(626, KEEL, 'carry', true)}
    </g>
    <g class="ark-ink">
      <rect x="380" y="${KEEL - 5}" width="60" height="5" rx="1"/>
      <rect x="386" y="${KEEL - 10}" width="50" height="5" rx="1"/>
      <rect x="392" y="${KEEL - 15}" width="38" height="5" rx="1"/>
    </g>
  </g>`;
}

// ── 짐승들 (창 7:8-9 "암수 둘씩 노아에게 나아와 방주로 들어갔으니"). 왼쪽(문 쪽)을 보고 걷는다 ──
const ANIMALS: Record<string, string> = {
  elephant: `<path d="M0 -14 C-2 -24 6 -30 16 -29 C24 -29 30 -24 30 -16 L30 0 L26 0 L25 -7 L21 -7 L20 0 L16 0 L15 -8 L9 -8 L8 0 L4 0 L4 -8 C1 -8 -1 -6 -2 -2 L-3 3 L-5 3 L-4 -4 C-3 -8 -2 -11 0 -14 Z"/>`,
  giraffe: `<path d="M0 -40 L5 -40 L6 -37 L8 -24 C12 -20 20 -19 25 -19 C28 -18 28 -14 27 -11 L27 0 L25 0 L24 -9 L21 -9 L21 0 L19 0 L18 -10 L12 -10 L11 0 L9 0 L9 -10 L7 0 L5 0 L5 -12 C3 -18 2 -28 1 -36 L-2 -36 Z"/>`,
  camel: `<path d="M0 -18 L4 -19 L6 -14 C8 -12 9 -16 12 -19 C14 -22 17 -20 18 -17 C20 -21 23 -21 25 -17 C27 -14 27 -11 26 -9 L26 0 L24 0 L23 -7 L21 0 L19 0 L19 -8 L12 -8 L11 0 L9 0 L9 -8 L8 0 L6 0 L6 -9 C4 -11 2 -14 1 -16 Z"/>`,
  ox: `<path d="M0 -12 L-2 -15 L1 -14 L3 -14 L5 -16 L5 -13 C9 -14 18 -15 24 -14 C27 -13 28 -10 27 -7 L27 0 L25 0 L24 -5 L22 0 L20 0 L20 -6 L10 -6 L9 0 L7 0 L7 -6 L6 0 L4 0 L4 -7 C2 -8 0 -9 0 -12 Z"/>`,
  sheep: `<path d="M0 -7 C0 -9 2 -10 4 -9 C5 -11 8 -11 9 -10 C11 -11 13 -10 14 -9 C16 -9 16 -6 15 -5 L15 0 L14 0 L13 -4 L12 0 L11 0 L11 -4 L6 -4 L5 0 L4 0 L4 -4 L3 0 L2 0 L2 -5 C0 -5 -1 -6 0 -7 Z"/>`,
  lion: `<path d="M0 -9 C-1 -13 2 -16 5 -15 C7 -15 9 -13 9 -10 C13 -11 20 -11 24 -10 C26 -9 27 -6 26 -4 C28 -6 30 -8 31 -7 C29 -5 27 -3 26 -2 L26 0 L24 0 L23 -4 L21 0 L19 0 L20 -5 L10 -5 L9 0 L7 0 L7 -5 L6 0 L4 0 L4 -6 C2 -6 0 -7 0 -9 Z"/>`,
  deer: `<path d="M0 -16 L-1 -22 L1 -18 L2 -24 L3 -18 L4 -21 L4 -16 L6 -13 C10 -13 17 -13 21 -12 C23 -11 23 -8 22 -6 L22 0 L21 0 L20 -5 L19 0 L18 0 L18 -6 L9 -6 L8 0 L7 0 L7 -6 L6 0 L5 0 L5 -8 C3 -10 1 -12 0 -13 Z"/>`,
};

function animals(): string {
  const order = ['elephant', 'giraffe', 'camel', 'ox', 'sheep', 'lion', 'deer'];
  const walk = 20; // 한 바퀴(초)
  return `<g class="ark-animals">${order
    .flatMap((a, i) =>
      [0, 1].map((k) => {
        const delay = -(i * 2.8 + k * 1.2);
        return `<g class="ark-animal" style="animation-delay:${delay}s; --walk:${walk}s"><g transform="translate(0 ${KEEL}) scale(${k ? 0.92 : 1})">${ANIMALS[a]}</g></g>`;
      }),
    )
    .join('')}
    <g class="ark-pair-birds" style="--walk:${walk}s">
      <path d="M0 0 q4 -4 8 0 q4 -4 8 0 l-8 2 Z"/><path d="M14 6 q4 -4 8 0 q4 -4 8 0 l-8 2 Z"/>
    </g>
  </g>`;
}

const SVG = `<svg class="ark-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax meet" aria-hidden="true" overflow="visible">
  ${frame()}
  ${hull()}
  ${animals()}
</svg>`;

/** 무대에 놓이는 방주 층 하나 */
export function createArk(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'scene__ark';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<div class="ark-body">${SVG}</div><div class="ark-birds"></div>`;
  return el;
}

export function setArkState(el: HTMLElement, state: ArkState | undefined): void {
  if (state) el.dataset.state = state;
  else delete el.dataset.state;
}

export type Bird = 'raven' | 'dove' | 'dove-leaf' | 'dove-away';

/** 새 한 마리가 방주 창에서 날아간다 (창 8:7-12). 날갯짓은 CSS, 길은 키프레임 */
export function flyBird(el: HTMLElement, kind: Bird): void {
  const box = el.querySelector<HTMLElement>('.ark-birds');
  if (!box) return;
  const raven = kind === 'raven';
  const bird = document.createElement('div');
  bird.className = `ark-bird ark-bird--${kind}`;
  bird.innerHTML = `<svg viewBox="-12 -8 24 14" overflow="visible">
    <g class="ark-bird__wing ark-bird__wing--back"><path d="M-1 -1 C-4 -6 -9 -7 -12 -6 C-9 -4 -6 -1 -3 1 Z"/></g>
    <path class="ark-bird__body" d="${raven ? 'M-9 1 L-5 -1 C-2 -2 4 -2 7 -1 L10 -2 L11 -1 L9 1 C6 3 1 3 -3 2 L-9 3 Z' : 'M-8 1 C-6 -1 -2 -2 3 -1.6 C5 -3 8 -3 9 -1.4 L11 -0.8 L9 0 C8 2 5 3 1 3 C-3 3 -6 2.5 -8 1 Z'}"/>
    ${kind === 'dove-leaf' ? '<path class="ark-bird__leaf" d="M10 -0.6 C13 -3 17 -2.4 18 -0.6 C16 1 13 1.2 10 -0.6 Z"/>' : ''}
    <g class="ark-bird__wing"><path d="M1 -1 C-2 -7 -8 -9 -12 -8 C-8 -5 -4 -1 -1 1 Z"/></g>
  </svg>`;
  box.append(bird);
  bird.addEventListener('animationend', (e) => e.target === bird && bird.remove());
  // 모션 줄이기면 키프레임 대신 짧은 페이드만 (CSS), 그래도 끝나면 지운다
  setTimeout(() => bird.remove(), 16000);
}
