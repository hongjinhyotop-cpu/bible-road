// 바벨탑 (창 11:1–9). 방주처럼 배경 그림과 따로 무대 위에 선 층이라, 층이 하나씩 쌓여 올라간다.
// 상태(engine/moods.ts의 tower):
//  - base   : 아래 두 층과 비계, 벽돌을 나르는 개미만 한 사람들. 가까이서 본다
//  - rising : 넷째 층까지. 카메라가 조금 물러난다
//  - high   : 일곱째 층. 꼭대기가 구름에 닿는다 (창 11:4 "대 꼭대기를 하늘에 닿게")
//  - far    : 하늘에서 내려다본 것처럼, 탑이 점만 하게 작아진다 (창 11:5 "보시려고 강림하셨더라")
//  - left   : 쌓다 만 탑. 사람도 없고, 빈 비계만 남았다 (창 11:8 "성 쌓기를 그쳤더라")
// 메소포타미아의 계단식 신전탑(지구라트)을 따라 그렸다: 구운 벽돌, 층마다 좁아지는 단, 앞쪽 큰 계단.
import type { TowerState } from '../engine/moods';
import { worker } from './ark';

const W = 400;
const H = 320;
const GROUND = 316;
const TIERS = [
  { w: 300, h: 40 },
  { w: 252, h: 36 },
  { w: 208, h: 33 },
  { w: 168, h: 30 },
  { w: 132, h: 27 },
  { w: 100, h: 24 },
  { w: 72, h: 21 },
];
/** 상태별로 다 쌓인 층 수 */
const BUILT: Record<TowerState, number> = { base: 2, rising: 4, high: 7, far: 7, left: 7 };

/** 층마다 바닥 높이 */
const floors = TIERS.reduce<number[]>((a, _, i) => [...a, (a[i - 1] ?? GROUND) - (i ? TIERS[i - 1].h : 0)], []);

function tier(i: number): string {
  const { w, h } = TIERS[i];
  const y = floors[i];
  const x0 = 200 - w / 2;
  const x1 = 200 + w / 2;
  const bat = 3; // 위로 갈수록 살짝 들어간 벽
  const courses: string[] = [];
  for (let yy = y - 6; yy > y - h + 2; yy -= 6) courses.push(`M${x0 + 2} ${yy} L${x1 - 2} ${yy}`);
  const niches: string[] = [];
  for (let xx = x0 + 12; xx < x1 - 8; xx += 16) niches.push(`<rect x="${xx}" y="${y - h + 6}" width="3.2" height="${h - 10}"/>`);
  return `<g class="tw-tier" data-i="${i}">
    <path class="tw-ink" d="M${x0} ${y} L${x0 + bat} ${y - h} L${x1 - bat} ${y - h} L${x1} ${y} Z"/>
    <g class="tw-niche">${niches.join('')}</g>
    <path class="tw-course" d="${courses.join(' ')}"/>
    <path class="tw-edge" d="M${x0 + bat} ${y - h} L${x1 - bat} ${y - h}"/>
  </g>`;
}

/** 앞쪽 큰 계단: 땅에서 셋째 층 위까지 (우르의 지구라트처럼) */
function stair(): string {
  const top = floors[2] - TIERS[2].h;
  const steps: string[] = [];
  for (let y = GROUND - 5; y > top + 2; y -= 5) steps.push(`M${200 - 13} ${y} L${200 + 13} ${y}`);
  return `<g class="tw-tier tw-stair" data-i="2">
    <path class="tw-ink2" d="M184 ${GROUND} L189 ${top} L211 ${top} L216 ${GROUND} Z"/>
    <path class="tw-course" d="${steps.join(' ')}"/>
  </g>`;
}

/** 짓는 중인 층(n번째 위): 반쯤 쌓은 벽돌, 비계, 사다리, 일꾼 */
function work(n: number): string {
  const below = floors[n - 1] - TIERS[n - 1].h; // 지금 다 쌓인 맨 위
  const next = TIERS[n] ?? { w: 48, h: 18 };
  const x0 = 200 - next.w / 2;
  const x1 = 200 + next.w / 2;
  const half = next.h * 0.45;
  const poles = [x0 - 6, x0 + next.w * 0.33, x0 + next.w * 0.66, x1 + 6]
    .map((x) => `M${x.toFixed(1)} ${below} L${x.toFixed(1)} ${below - next.h - 10}`)
    .join(' ');
  const rails = `M${x0 - 10} ${below - next.h * 0.55} L${x1 + 10} ${below - next.h * 0.55} M${x0 - 10} ${below - next.h - 6} L${x1 + 10} ${below - next.h - 6}`;
  const ladder = (x: number) => {
    let d = `M${x} ${below} L${x + 4} ${below - next.h - 6} M${x + 6} ${below} L${x + 10} ${below - next.h - 6}`;
    for (let i = 1; i < 5; i++) d += ` M${x + i} ${below - (next.h + 6) * (i / 5)} L${x + 6 + i} ${below - (next.h + 6) * (i / 5)}`;
    return d;
  };
  const people = [
    worker(x0 + 10, below, 'carry'),
    worker(200 + 8, below, 'reach', true),
    worker(x1 - 6, below - next.h * 0.55, 'stand', true),
  ].join('');
  // 아래층에서 벽돌을 날라 올리는 줄 (맨 아래 작업장일 때만 땅에서)
  const carriers =
    n <= 2
      ? [worker(70, GROUND, 'carry'), worker(96, GROUND, 'carry'), worker(318, GROUND, 'carry', true), worker(150, floors[1], 'stand')].join('')
      : [worker(200 - TIERS[n - 1].w / 2 + 6, floors[n - 1], 'carry'), worker(200 + TIERS[n - 1].w / 2 - 8, floors[n - 1], 'carry', true)].join('');
  return `<g class="tw-work" data-at="${n}">
    <path class="tw-ink" d="M${x0} ${below} L${x0 + 1} ${below - half} L${200 - 6} ${below - half} L${200 - 6} ${below - half - 6} L${x1 - next.w * 0.25} ${below - half - 6} L${x1 - next.w * 0.25} ${below - half + 2} L${x1} ${below - half + 2} L${x1} ${below} Z"/>
    <path class="tw-scaffold" d="${poles} ${rails} ${ladder(x1 - 4)}"/>
    <g class="tw-people tw-ink">${people}${carriers}</g>
  </g>`;
}

/** 꼭대기를 감는 구름 띠 (high/far/left) */
function clouds(): string {
  const puffs = [
    [70, 104, 46, 9], [140, 96, 40, 8], [250, 100, 52, 10], [330, 94, 38, 8],
    [20, 118, 30, 6], [200, 112, 60, 9], [380, 114, 34, 6],
  ];
  return `<g class="tw-clouds">${puffs
    .map(([x, y, rx, ry], i) => `<ellipse class="tw-cloud" style="--d:${(i * -3.1).toFixed(1)}s" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>`)
    .join('')}</g>`;
}

/** 탑 발치의 벽돌 더미와 가마 연기 */
function yard(): string {
  const stack = (x: number) =>
    [0, 1, 2]
      .map((r) => Array.from({ length: 4 - r }, (_, i) => `<rect x="${x + r * 4 + i * 8}" y="${GROUND - 5 - r * 5}" width="7" height="4.4" rx="0.6"/>`).join(''))
      .join('');
  return `<g class="tw-yard tw-ink2">${stack(26)}${stack(340)}</g>`;
}

const SVG = `<svg class="tower-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax meet" aria-hidden="true" overflow="visible">
  ${clouds()}
  ${yard()}
  ${TIERS.map((_, i) => tier(i)).join('')}
  ${stair()}
  ${[2, 4, 7].map(work).join('')}
  <g class="tw-scatter tw-ink"></g>
</svg>`;

export function createTower(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'scene__tower';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<div class="tower-body">${SVG}</div>`;
  return el;
}

/**
 * 상태를 바꾼다. 새로 쌓이는 층은 아래에서부터 한 층씩 차례로 솟는다.
 * instant면 연출 없이 바로 (장면 첫 화면)
 */
export function setTowerState(el: HTMLElement, state: TowerState | undefined, instant = false): void {
  const prev = el.dataset.state as TowerState | undefined;
  if (prev === state) return;
  if (state) el.dataset.state = state;
  else delete el.dataset.state;
  const was = prev ? BUILT[prev] : 0;
  const now = state ? BUILT[state] : 0;
  el.querySelectorAll<SVGGElement>('.tw-tier').forEach((g) => {
    const i = +g.dataset.i!;
    const on = i < now;
    g.style.transitionDelay = !instant && on && i >= was ? `${((i - was) * 0.9 + 0.3).toFixed(2)}s` : '0s';
    g.classList.toggle('is-built', on);
  });
  // 일꾼과 비계: 지금 쌓고 있는 층에만. 다 그친 탑(left)에는 사람이 없다
  const at = state === 'left' || state === 'far' ? -1 : now;
  el.querySelectorAll<SVGGElement>('.tw-work').forEach((g) => {
    const on = +g.dataset.at! === at || (state === 'left' && +g.dataset.at! === 7);
    g.style.transitionDelay = !instant && on ? `${Math.max(0, now - was) * 0.9 + 0.4}s` : '0s';
    g.classList.toggle('is-on', on);
  });
}

/** 흩어짐 (창 11:8): 탑 발치에서 작은 사람들이 사방으로 걸어 나가 사라진다 */
export function scatter(el: HTMLElement): void {
  const box = el.querySelector<SVGGElement>('.tw-scatter');
  if (!box) return;
  const n = 16;
  box.innerHTML = Array.from({ length: n }, (_, i) => {
    const dir = i % 2 ? 1 : -1;
    const x = 200 + dir * (20 + ((i * 37) % 90));
    const far = (120 + ((i * 53) % 160)) * dir;
    const pose = i % 3 === 0 ? 'carry' : 'stand';
    return `<g class="tw-walker" style="--dx:${far}px; --t:${(5 + (i % 4) * 0.8).toFixed(1)}s; --delay:${((i % 6) * 0.35).toFixed(2)}s">${worker(x, GROUND, pose, dir < 0)}</g>`;
  }).join('');
  setTimeout(() => box.replaceChildren(), 9000);
}
