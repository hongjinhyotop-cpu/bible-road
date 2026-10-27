// 장면 배경 그림 (막·장면별 무대 뒤 풍경). 역광 실루엣과 같은 종이 오려낸 그림자극 말투.
// 멀수록 하늘색에 가깝고, 가까울수록 어둡다. 잎은 아주 천천히 흔들리고 열매·강물은 은은하게 반짝인다.
// 모양은 코드로 만들되 시드 고정 난수라 매번 같은 그림이 나온다.
import type { BackdropArt } from '../engine/moods';

const W = 400;
const H = 260;

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** 나무 한 그루: 줄기 + 둥근 잎 덩어리 여러 개. sway면 잎이 흔들린다 */
function tree(x: number, ground: number, h: number, cls: string, seed: number, opts: { lean?: number; fruit?: number; sway?: boolean } = {}): string {
  const r = rng(seed);
  const lean = opts.lean ?? 0;
  const topX = x + lean * h * 0.3;
  const topY = ground - h * 0.62;
  const tw = Math.max(2.4, h * 0.05);
  const trunk = `M${x - tw} ${ground} C${x - tw * 0.6} ${ground - h * 0.3} ${topX - tw * 0.5} ${topY + h * 0.12} ${topX - tw * 0.4} ${topY}
    L${topX + tw * 0.4} ${topY} C${topX + tw * 0.5} ${topY + h * 0.12} ${x + tw * 0.6} ${ground - h * 0.3} ${x + tw} ${ground} Z`;
  // 가지 두 개
  const branches = [-1, 1]
    .map((d) => {
      const bx = topX + d * h * (0.22 + r() * 0.1);
      const by = topY - h * (0.05 + r() * 0.08);
      return `<path d="M${topX} ${topY + h * 0.08} Q${(topX + bx) / 2} ${by + h * 0.1} ${bx} ${by}" fill="none" stroke="currentColor" stroke-width="${(tw * 0.7).toFixed(1)}" stroke-linecap="round"/>`;
    })
    .join('');
  const blobs: string[] = [];
  const cr = h * 0.3;
  const n = 7 + Math.floor(r() * 3);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r() * 0.5;
    const d = cr * (0.35 + r() * 0.55);
    const bx = topX + Math.cos(a) * d * 1.25;
    const by = topY - h * 0.12 + Math.sin(a) * d * 0.75;
    blobs.push(`<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${(cr * (0.42 + r() * 0.3)).toFixed(1)}"/>`);
  }
  blobs.push(`<circle cx="${topX.toFixed(1)}" cy="${(topY - h * 0.14).toFixed(1)}" r="${(cr * 0.75).toFixed(1)}"/>`);
  const fruit: string[] = [];
  for (let i = 0; i < (opts.fruit ?? 0); i++) {
    const a = r() * Math.PI * 2;
    const d = cr * (0.2 + r() * 0.85);
    const fx = topX + Math.cos(a) * d * 1.2;
    const fy = topY - h * 0.1 + Math.sin(a) * d * 0.7;
    fruit.push(`<circle class="bd-fruit" style="--d:${(r() * 4).toFixed(2)}s" cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="${(1.4 + r() * 1.2).toFixed(1)}"/>`);
  }
  const crown = `<g class="${opts.sway ? 'bd-sway' : ''}" style="transform-origin:${topX.toFixed(1)}px ${topY.toFixed(1)}px; --d:${(r() * 3).toFixed(2)}s">${blobs.join('')}${fruit.join('')}</g>`;
  // 특별한 나무(동산 가운데)는 뒤에서 은은한 빛이 번진다
  const halo = cls.includes('bd-glow') ? `<circle class="bd-halo" cx="${topX.toFixed(1)}" cy="${(topY - h * 0.12).toFixed(1)}" r="${(cr * 2.3).toFixed(1)}"/>` : '';
  return `<g class="${cls}">${halo}<path d="${trunk}"/>${branches}${crown}</g>`;
}

/** 지평선을 따라 이어지는 먼 숲 */
function treeline(y: number, amp: number, cls: string, seed: number): string {
  const r = rng(seed);
  let d = `M${-W * 2} ${H} L${-W * 2} ${y}`;
  for (let x = -W * 2; x < W * 3; ) {
    const step = 14 + r() * 22;
    const top = y - amp * (0.4 + r() * 0.6);
    d += ` Q${x + step / 2} ${top - amp * 0.4} ${x + step} ${y - r() * amp * 0.3}`;
    x += step;
  }
  d += ` L${W * 3} ${H} Z`;
  return `<path class="${cls}" d="${d}"/>`;
}

function hills(y: number, cls: string, seed: number): string {
  const r = rng(seed);
  const p = Array.from({ length: 21 }, (_, i) => [i * 100 - W * 2, y - r() * 18] as const);
  let d = `M${-W * 2} ${H} L${-W * 2} ${p[0][1]}`;
  for (let i = 1; i < p.length; i++) d += ` C${p[i - 1][0] + 50} ${p[i - 1][1] - 14} ${p[i][0] - 50} ${p[i][1] - 14} ${p[i][0]} ${p[i][1]}`;
  return `<path class="${cls}" d="${d} L${W * 3} ${H} Z"/>`;
}

/** 엉겅퀴·가시덤불 (창 3:18) */
function thorns(x: number, ground: number, s: number, cls: string, seed: number): string {
  const r = rng(seed);
  const stems = Array.from({ length: 6 }, (_, i) => {
    const a = -Math.PI / 2 + (i - 2.5) * 0.32 + (r() - 0.5) * 0.2;
    const len = s * (0.6 + r() * 0.5);
    const ex = x + Math.cos(a) * len;
    const ey = ground + Math.sin(a) * len;
    return `<path d="M${x} ${ground} L${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="${(s * 0.07).toFixed(1)}"/>`;
  }).join('');
  return `<g class="${cls}">${stems}</g>`;
}

/** 넓은 화면(PC)에서만 보이는 양옆 나무들. 좁은 화면에서는 그림 밖이라 안 보인다 */
const WIDE_SIDES = [
  tree(-70, 262, 220, 'bd-near', 201, { lean: 0.2, sway: true }),
  tree(-200, 240, 110, 'bd-mid', 202, { sway: true }),
  tree(470, 262, 220, 'bd-near', 203, { lean: -0.2, sway: true }),
  tree(600, 240, 110, 'bd-mid', 204, { sway: true }),
].join('');

/** 먼 언덕의 양 떼 (아벨의 양, 창 4:2) */
function sheep(x: number, y: number, seed: number): string {
  const r = rng(seed);
  return `<g class="bd-sheep">${Array.from({ length: 7 }, () => {
    const sx = x + (r() - 0.5) * 70;
    const sy = y - r() * 6;
    return `<ellipse cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" rx="2.6" ry="1.6"/>`;
  }).join('')}</g>`;
}

/** 밭고랑: 지평선 쪽으로 모이는 선들 (가인의 밭, 창 4:2) */
function furrows(y: number): string {
  const lines = Array.from({ length: 33 }, (_, i) => {
    const bx = -800 + i * 62.5;
    const tx = 200 + (bx - 200) * 0.18;
    return `M${bx.toFixed(1)} ${H} L${tx.toFixed(1)} ${y + 4}`;
  }).join(' ');
  return `<path class="bd-furrow" d="${lines}"/>`;
}

/** 앞쪽 이삭 덤불: 줄기 끝에 낟알 이삭이 달려 천천히 흔들린다 */
function grain(x: number, ground: number, h: number, seed: number): string {
  const r = rng(seed);
  const stalks = Array.from({ length: 9 }, (_, i) => {
    const a = (i - 4) * 0.1 + (r() - 0.5) * 0.08;
    const len = h * (0.7 + r() * 0.35);
    const ex = x + Math.sin(a) * len;
    const ey = ground - Math.cos(a) * len;
    const bend = (r() - 0.3) * 8;
    return `<path d="M${x} ${ground} Q${(x + ex) / 2 + bend} ${(ground + ey) / 2} ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <ellipse cx="${(ex + bend * 0.3).toFixed(1)}" cy="${(ey - 5).toFixed(1)}" rx="2" ry="6" transform="rotate(${(a * 57 + bend).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)})"/>`;
  }).join('');
  return `<g class="bd-near bd-sway" style="transform-origin:${x}px ${ground}px; --d:${(r() * 3).toFixed(2)}s">${stalks}</g>`;
}

/** 돌을 쌓은 제단 + 피어오르는 연기. lit = 그 제물을 "열납"하셨다(창 4:4)는 표시로 은은한 빛 */
function altar(x: number, ground: number, lit: boolean, seed: number): string {
  const r = rng(seed);
  const stones: string[] = [];
  const rows = [[5, 9], [4, 8], [3, 7]];
  rows.forEach(([n, h], row) => {
    const w = 9;
    const y = ground - (row + 1) * h + 1;
    for (let i = 0; i < n; i++) {
      const sx = x - (n * w) / 2 + i * w + (r() - 0.5) * 1.5;
      stones.push(`<rect x="${sx.toFixed(1)}" y="${y.toFixed(1)}" width="${(w - 0.8).toFixed(1)}" height="${(h - 0.6).toFixed(1)}" rx="2.4"/>`);
    }
  });
  const top = ground - 24;
  const puffs = Array.from({ length: 6 }, (_, i) =>
    `<circle class="bd-smoke__puff" style="--d:${(i * 1.1).toFixed(1)}s; --dx:${((r() - 0.5) * 16).toFixed(1)}px" cx="${x}" cy="${top}" r="${(4 + r() * 2).toFixed(1)}"/>`,
  ).join('');
  const halo = lit ? `<circle class="bd-regard" cx="${x}" cy="${top - 30}" r="70"/>` : '';
  return `<g class="bd-altar${lit ? ' is-lit' : ''}">${halo}<g class="bd-smoke">${puffs}</g><g class="bd-mid">${stones.join('')}</g><ellipse class="bd-ember" cx="${x}" cy="${top + 1}" rx="10" ry="2.2"/></g>`;
}

function altarArt(lit: boolean): string {
  return `
    ${hills(198, 'bd-far', 19)}
    ${sheep(250, 199, 92)}
    ${hills(220, 'bd-mid', 23)}
    ${furrows(220)}
    ${altar(118, 238, false, 71)}
    ${altar(282, 238, lit, 72)}
    ${grain(-120, 262, 70, 103)}
    ${grain(520, 262, 74, 104)}`;
}

/** 놋 땅의 성 (창 4:16-17): 낮은 성벽, 망대 하나, 창마다 작은 불빛 */
function city(x: number, ground: number): string {
  const r = rng(81);
  const lights = Array.from({ length: 6 }, () =>
    `<rect class="bd-window" style="--d:${(r() * 4).toFixed(2)}s" x="${(x - 26 + r() * 50).toFixed(1)}" y="${(ground - 9 - r() * 5).toFixed(1)}" width="1.6" height="2"/>`,
  ).join('');
  return `<g class="bd-far bd-city" transform="translate(${x} ${ground}) scale(1.5) translate(${-x} ${-ground})">
    <path d="M${x - 34} ${ground} L${x - 34} ${ground - 14} L${x - 12} ${ground - 16} L${x - 10} ${ground - 30} L${x - 2} ${ground - 30} L${x} ${ground - 17} L${x + 30} ${ground - 15} L${x + 32} ${ground} Z"/>
    ${lights}
    <rect class="bd-window" style="--d:1.3s" x="${x - 7}" y="${ground - 26}" width="1.8" height="2.4"/>
  </g>`;
}

const ART: Record<BackdropArt, () => string> = {
  garden: () => `
    ${treeline(196, 26, 'bd-far', 3)}
    ${tree(200, 190, 64, 'bd-far bd-glow', 11, { fruit: 0, sway: true })}
    <path class="bd-river" d="M-410 210 C-330 204 -260 218 -190 212 C-110 204 -60 220 -10 214 C70 206 140 220 210 212 C280 204 340 216 410 208 C480 200 540 218 610 212 C690 204 740 216 810 210"/>
    ${treeline(218, 18, 'bd-mid', 7)}
    ${tree(28, 262, 210, 'bd-near', 21, { lean: 0.25, sway: true })}
    ${tree(378, 262, 230, 'bd-near', 33, { lean: -0.2, sway: true })}
    ${tree(92, 236, 96, 'bd-mid', 41, { sway: true })}
    ${tree(318, 238, 104, 'bd-mid', 52, { sway: true })}
    ${WIDE_SIDES}`,
  tree: () => `
    ${treeline(200, 22, 'bd-far', 5)}
    ${treeline(220, 16, 'bd-mid', 9)}
    ${tree(200, 236, 190, 'bd-mid bd-glow', 77, { fruit: 16, sway: true })}
    ${tree(22, 262, 200, 'bd-near', 23, { lean: 0.3, sway: true })}
    ${tree(384, 262, 210, 'bd-near', 35, { lean: -0.3, sway: true })}
    ${WIDE_SIDES}`,
  gate: () => `
    ${treeline(206, 30, 'bd-far', 13)}
    <g class="bd-flame" aria-hidden="true">
      <circle class="bd-flame__glow" cx="118" cy="190" r="46"/>
      <g class="bd-flame__sword"><path d="M118 160 C122 172 124 184 118 214 C112 184 114 172 118 160 Z"/><path d="M104 186 L132 186" stroke-width="2"/></g>
    </g>
    ${hills(222, 'bd-mid', 17)}
    ${thorns(262, 236, 26, 'bd-near', 61)}
    ${thorns(60, 244, 22, 'bd-near', 62)}
    ${thorns(340, 246, 30, 'bd-near', 63)}
    ${thorns(-60, 242, 26, 'bd-near', 64)}
    ${thorns(470, 240, 28, 'bd-near', 65)}`,
  field: () => `
    ${hills(198, 'bd-far', 19)}
    ${tree(318, 200, 34, 'bd-far', 91, { sway: true })}
    ${sheep(250, 199, 92)}
    ${hills(220, 'bd-mid', 23)}
    ${furrows(220)}
    ${grain(62, 262, 62, 101)}
    ${grain(352, 262, 68, 102)}
    ${grain(-120, 262, 70, 103)}
    ${grain(520, 262, 74, 104)}`,
  altar: () => altarArt(false),
  'altar-lit': () => altarArt(true),
  nod: () => `
    ${hills(206, 'bd-far', 29)}
    ${city(244, 216)}
    ${hills(226, 'bd-mid', 31)}
    <path class="bd-road" d="M-200 262 C20 252 110 240 180 234 C215 231 232 224 244 218"/>
    ${thorns(60, 246, 20, 'bd-near', 66)}
    ${thorns(352, 250, 24, 'bd-near', 67)}
    ${thorns(-80, 248, 22, 'bd-near', 68)}
    ${thorns(500, 246, 24, 'bd-near', 69)}`,
};

const cache = new Map<BackdropArt, string>();

/** 배경 SVG 한 장 */
export function backdropSvg(art: BackdropArt): string {
  let body = cache.get(art);
  if (!body) {
    body = ART[art]();
    cache.set(art, body);
  }
  const defs = `<defs>
    <radialGradient id="bd-halo-g"><stop offset="0" class="bd-halo__c"/><stop offset="1" class="bd-halo__e"/></radialGradient>
    <radialGradient id="bd-flame-g"><stop offset="0" stop-color="#ffd9a0" stop-opacity="0.75"/><stop offset="0.35" stop-color="#f08a3c" stop-opacity="0.32"/><stop offset="1" stop-color="#f08a3c" stop-opacity="0"/></radialGradient>
  </defs>`;
  return `<svg class="backdrop" data-art="${art}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${defs}${body}</svg>`;
}

/**
 * 배경을 상자에 맞춘다. 폰처럼 세로로 긴 화면은 높이에 맞춰 양옆을 자르고(slice),
 * PC처럼 가로로 넓은 화면은 높이를 다 보여 준다(meet) — 그래야 큰 나무 윗부분이 안 잘린다.
 * 넓은 화면에서 남는 양옆은 그림 바깥까지 이어 그려 둔 숲·언덕·나무가 채운다.
 */
export function fitBackdrops(box: HTMLElement): void {
  const { width, height } = box.getBoundingClientRect();
  if (!width || !height) return;
  const mode = width / height > W / H ? 'xMidYMax meet' : 'xMidYMax slice';
  box.querySelectorAll('svg.backdrop').forEach((svg) => svg.setAttribute('preserveAspectRatio', mode));
}
