// 장면 배경 그림 (막·장면별 무대 뒤 풍경). 역광 실루엣과 같은 종이 오려낸 그림자극 말투.
// 멀수록 하늘색에 가깝고, 가까울수록 어둡다. 잎은 아주 천천히 흔들리고 열매·강물은 은은하게 반짝인다.
// 모양은 코드로 만들되 시드 고정 난수라 매번 같은 그림이 나온다.
import type { BackdropArt } from '../engine/moods';
import { PLACE_ART } from './places';
import { nileArt } from './nile';
import { goshenDarkArt } from './plagues';
import { bushArt } from './bush';
import { stewTentArt } from './stew';
import { ladderArt } from './ladder';
import { jabbokArt, seirArt } from './jabbok';
import { dothanArt } from './dothan';
import { egyptLampsArt, goshenArt } from './passover';
import { redSeaArt } from './sea';
import { josephHallArt } from './hall';
import { josephCoffinArt } from './coffin';
import { sinaiArt } from './sinai';
import { sinArt } from './manna';
import { covenantArt } from './covenant';
import { mamreArt } from './mamre';
import { calfArt } from './calf';
import { atoneArt } from './atonement';
import { ordinationArt } from './ordination';
import { strangeFireArt } from './strangefire';
import { balaamArt } from './balaam';
import { korahArt } from './korah';
import { spiesArt } from './spies';
import { meribahArt } from './meribah';
import { brazenArt } from './brazen';
import { deutArt } from './deuteronomy';
import { joshArt } from './joshua';
import { judgesArt } from './judges';
import { samuelArt } from './samuel';
import { gilboaArt } from './gilboa';
import { saulArt } from './saul';
import { davidArt } from './david';
import { kingshipArt } from './kingship';
import { solomonArt } from './solomon';
import { absalomArt } from './absalom';
import { templeArt } from './temple';
import { jonathanArt } from './jonathan';
import { sodomArt } from './sodom';
import { potipharArt, roundPrisonArt, dreamCowsArt, dreamEarsArt, courtArt, chariotArt, granaryArt } from './egypt-court';

export const W = 400;
export const H = 260;

export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** 나무 한 그루: 줄기 + 둥근 잎 덩어리 여러 개. sway면 잎이 흔들린다 */
export function tree(x: number, ground: number, h: number, cls: string, seed: number, opts: { lean?: number; fruit?: number; sway?: boolean } = {}): string {
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
export function treeline(y: number, amp: number, cls: string, seed: number): string {
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

export function hills(y: number, cls: string, seed: number): string {
  const r = rng(seed);
  const p = Array.from({ length: 21 }, (_, i) => [i * 100 - W * 2, y - r() * 18] as const);
  let d = `M${-W * 2} ${H} L${-W * 2} ${p[0][1]}`;
  for (let i = 1; i < p.length; i++) d += ` C${p[i - 1][0] + 50} ${p[i - 1][1] - 14} ${p[i][0] - 50} ${p[i][1] - 14} ${p[i][0]} ${p[i][1]}`;
  return `<path class="${cls}" d="${d} L${W * 3} ${H} Z"/>`;
}

/** 엉겅퀴·가시덤불 (창 3:18) */
export function thorns(x: number, ground: number, s: number, cls: string, seed: number): string {
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
export const WIDE_SIDES = [
  tree(-70, 262, 220, 'bd-near', 201, { lean: 0.2, sway: true }),
  tree(-200, 240, 110, 'bd-mid', 202, { sway: true }),
  tree(470, 262, 220, 'bd-near', 203, { lean: -0.2, sway: true }),
  tree(600, 240, 110, 'bd-mid', 204, { sway: true }),
].join('');

/** 먼 언덕의 양 떼 (아벨의 양, 창 4:2) */
export function sheep(x: number, y: number, seed: number): string {
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
export function grain(x: number, ground: number, h: number, seed: number): string {
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
export function altar(x: number, ground: number, lit: boolean, seed: number): string {
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
    ${altar(166, 236, false, 71)}
    ${altar(234, 236, lit, 72)}
    ${grain(-120, 262, 70, 103)}
    ${grain(520, 262, 74, 104)}`;
}

/** 놋 땅의 성 (창 4:16-17): 낮은 성벽, 망대 하나, 창마다 작은 불빛 */
export function city(x: number, ground: number, seed = 81, scale = 1.5, cls = 'bd-far'): string {
  const r = rng(seed);
  const lights = Array.from({ length: 6 }, () =>
    `<rect class="bd-window" style="--d:${(r() * 4).toFixed(2)}s" x="${(x - 26 + r() * 50).toFixed(1)}" y="${(ground - 9 - r() * 5).toFixed(1)}" width="1.6" height="2"/>`,
  ).join('');
  return `<g class="${cls} bd-city" transform="translate(${x} ${ground}) scale(${scale}) translate(${-x} ${-ground})">
    <path d="M${x - 34} ${ground} L${x - 34} ${ground - 14} L${x - 12} ${ground - 16} L${x - 10} ${ground - 30} L${x - 2} ${ground - 30} L${x} ${ground - 17} L${x + 30} ${ground - 15} L${x + 32} ${ground} Z"/>
    ${lights}
    <rect class="bd-window" style="--d:1.3s" x="${x - 7}" y="${ground - 26}" width="1.8" height="2.4"/>
  </g>`;
}


/** 피어오르는 연기 기둥 (제단의 연기와 같은 덩이들) */
export function smoke(x: number, top: number, seed: number, n = 6): string {
  const r = rng(seed);
  return `<g class="bd-smoke">${Array.from({ length: n }, (_, i) =>
    `<circle class="bd-smoke__puff" style="--d:${(i * 1.1 + r()).toFixed(1)}s; --dx:${((r() - 0.5) * 16).toFixed(1)}px" cx="${x}" cy="${top}" r="${(4 + r() * 2).toFixed(1)}"/>`,
  ).join('')}</g>`;
}

/** 잘려 나간 나무 그루터기 (방주 목재, 창 6:14 "잣나무") */
function stumps(xs: number[], ground: number, cls: string): string {
  return `<g class="${cls}">${xs.map((x, i) => {
    const w = 4 + (i % 3);
    const h = 5 + (i % 2) * 3;
    return `<path d="M${x - w} ${ground} L${x - w + 0.6} ${ground - h} L${x + w - 0.6} ${ground - h - 1.4} L${x + w} ${ground} Z"/>`;
  }).join('')}</g>`;
}

/** 쌓아 둔 통나무 */
function logs(x: number, ground: number, cls: string): string {
  const rows = [[4, 0], [3, 1], [2, 2]];
  return `<g class="${cls}">${rows.map(([n, row]) =>
    Array.from({ length: n }, (_, i) => `<circle cx="${x + (i - (n - 1) / 2) * 9}" cy="${ground - 4.5 - row * 7.6}" r="4.4"/>`).join(''),
  ).join('')}</g>`;
}

/** 산맥. 가운데 봉우리(x=200)는 꼭대기가 y=150에서 살짝 평평하다 — 방주가 머무는 자리 (창 8:4) */
function peaks(green: boolean): string {
  const far = `<path class="bd-far" d="M-800 260 L-800 190 L-640 150 L-520 176 L-380 128 L-250 170 L-120 140 L-20 172 L70 120 L150 160 L250 116 L330 158 L430 124 L540 170 L650 132 L780 168 L900 140 L1200 180 L1200 260 Z"/>`;
  const main = `<path class="bd-mid" d="M-800 260 L-800 230 L-600 206 L-440 222 L-300 196 L-160 220 L-40 200 L60 214 C110 196 150 170 182 152 C190 149 210 149 218 152 C250 170 290 196 340 212 L450 198 L560 222 L700 200 L860 224 L1200 210 L1200 260 Z"/>
    <path class="bd-ridge" d="M182 152 C190 149 210 149 218 152 M120 186 L150 172 M250 172 L282 190" />`;
  const grass = green
    ? `${grain(70, 262, 34, 111)}${grain(330, 262, 38, 112)}${grain(-60, 262, 40, 113)}${grain(470, 262, 36, 114)}
       <g class="bd-near">${Array.from({ length: 9 }, (_, i) => `<ellipse cx="${-40 + i * 60}" cy="${258 - (i % 2) * 3}" rx="22" ry="5"/>`).join('')}</g>`
    : '';
  return `${far}${main}${grass}`;
}

/** 포도나무 한 줄: 받침 막대, 덩굴, 잎 덩이, 포도송이 (창 9:20) */
function vines(y: number, from: number, to: number, size: number, cls: string, seed: number): string {
  const r = rng(seed);
  const parts: string[] = [];
  for (let x = from; x <= to; x += size * 2.4) {
    parts.push(`<path d="M${x} ${y} L${x} ${y - size * 1.6}" fill="none" stroke="currentColor" stroke-width="${(size * 0.12).toFixed(1)}"/>`);
    for (let k = 0; k < 4; k++) parts.push(`<circle cx="${(x + (r() - 0.5) * size * 1.6).toFixed(1)}" cy="${(y - size * (1.2 + r() * 0.6)).toFixed(1)}" r="${(size * (0.32 + r() * 0.22)).toFixed(1)}"/>`);
    if (r() < 0.7) parts.push(`<ellipse class="bd-grape" cx="${(x + size * 0.4).toFixed(1)}" cy="${(y - size * 0.9).toFixed(1)}" rx="${(size * 0.14).toFixed(1)}" ry="${(size * 0.24).toFixed(1)}"/>`);
  }
  parts.push(`<path d="M${from - size} ${y - size * 1.4} L${to + size} ${y - size * 1.4}" fill="none" stroke="currentColor" stroke-width="${(size * 0.06).toFixed(1)}"/>`);
  return `<g class="${cls}">${parts.join('')}</g>`;
}

/** 장막 (창 9:21 "장막 안에서"). 입구 틈으로 등잔 불빛이 새어 나온다 */
export function tent(x: number, ground: number, s: number): string {
  return `<g class="bd-near bd-tent" transform="translate(${x} ${ground}) scale(${s})">
    <path d="M-40 0 L-30 -24 L-4 -34 L0 -40 L4 -34 L30 -24 L40 0 Z"/>
    <path class="bd-tent__door" d="M-6 0 L0 -26 L6 0 Z"/>
    <path d="M-44 0 L-30 -24 M44 0 L30 -24" fill="none" stroke="currentColor" stroke-width="1"/>
  </g>`;
}

/** 대추야자 (메소포타미아 강가의 나무): 가늘고 긴 줄기, 꼭대기에서 늘어지는 잎 */
export function palm(x: number, ground: number, h: number, cls: string, seed: number): string {
  const r = rng(seed);
  const lean = (r() - 0.5) * h * 0.25;
  const tx = x + lean;
  const ty = ground - h;
  const trunk = `<path d="M${x - 2.2} ${ground} Q${x + lean * 0.3} ${ground - h * 0.5} ${tx - 1} ${ty} L${tx + 1} ${ty} Q${x + lean * 0.3 + 2} ${ground - h * 0.5} ${x + 2.2} ${ground} Z"/>`;
  const fronds = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 + r() * 0.3;
    const len = h * (0.32 + r() * 0.12);
    const ex = tx + Math.cos(a) * len;
    const ey = ty + Math.abs(Math.sin(a)) * len * 0.35 + len * 0.28;
    const cx = tx + Math.cos(a) * len * 0.55;
    const cy = ty - len * 0.22;
    return `<path d="M${tx} ${ty} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)} Q${(cx + 1).toFixed(1)} ${(cy + 4).toFixed(1)} ${tx} ${ty + 2} Z"/>`;
  }).join('');
  return `<g class="${cls}">${trunk}<g class="bd-sway" style="transform-origin:${tx.toFixed(1)}px ${ty.toFixed(1)}px; --d:${(r() * 3).toFixed(2)}s">${fronds}</g></g>`;
}

/** 강가 갈대 */
export function reeds(x: number, ground: number, s: number, cls: string, seed: number): string {
  const r = rng(seed);
  const d = Array.from({ length: 11 }, (_, i) => {
    const bx = x + (i - 5) * s * 0.16;
    const len = s * (0.6 + r() * 0.5);
    const bend = (r() - 0.5) * s * 0.3;
    return `M${bx.toFixed(1)} ${ground} Q${(bx + bend * 0.4).toFixed(1)} ${(ground - len * 0.6).toFixed(1)} ${(bx + bend).toFixed(1)} ${(ground - len).toFixed(1)}`;
  }).join(' ');
  return `<g class="${cls} bd-sway" style="transform-origin:${x}px ${ground}px; --d:${(r() * 3).toFixed(2)}s"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></g>`;
}

/** 시날 평지 (창 11:2): 산이 없는 납작한 지평선, 느린 강, 대추야자 */
function plainArt(): string {
  return `
    <path class="bd-far" d="M-800 260 L-800 212 C-500 208 -200 214 100 210 C300 207 500 213 800 209 L1200 211 L1200 260 Z"/>
    <path class="bd-river" d="M-600 222 C-420 218 -260 226 -100 222 C40 218 160 226 300 221 C440 216 600 224 900 220"/>
    <path class="bd-mid" d="M-800 260 L-800 230 C-560 226 -300 234 -40 230 C180 226 420 234 700 228 L1200 232 L1200 260 Z"/>
    ${palm(-150, 226, 46, 'bd-far', 151)}${palm(-120, 228, 38, 'bd-far', 152)}
    ${palm(310, 224, 40, 'bd-far', 153)}${palm(336, 226, 34, 'bd-far', 154)}
    ${palm(560, 226, 44, 'bd-far', 155)}
    ${palm(70, 262, 110, 'bd-near', 156)}
    ${palm(-60, 262, 130, 'bd-near', 162)}
    ${palm(352, 262, 124, 'bd-near', 157)}
    ${palm(480, 262, 130, 'bd-near', 163)}
    ${reeds(110, 262, 34, 'bd-near', 158)}${reeds(300, 262, 38, 'bd-near', 159)}
    ${reeds(-200, 262, 46, 'bd-near', 160)}${reeds(600, 262, 46, 'bd-near', 161)}`;
}

/** 벽돌 가마: 둥근 지붕, 붉게 달아오른 아궁이, 연기 */
export function kiln(x: number, ground: number, s: number, seed: number): string {
  return `<g class="bd-mid">
    <path d="M${x - 14 * s} ${ground} C${x - 14 * s} ${ground - 16 * s} ${x - 8 * s} ${ground - 22 * s} ${x} ${ground - 22 * s} C${x + 8 * s} ${ground - 22 * s} ${x + 14 * s} ${ground - 16 * s} ${x + 14 * s} ${ground} Z"/>
  </g>
  <path class="bd-kiln-fire" style="--d:${(seed % 5) * 0.7}s" d="M${x - 4 * s} ${ground} L${x - 4 * s} ${ground - 5 * s} Q${x} ${ground - 9 * s} ${x + 4 * s} ${ground - 5 * s} L${x + 4 * s} ${ground} Z"/>
  ${smoke(x, ground - 22 * s, seed, 5)}`;
}

/** 땅에 줄지어 말리는 벽돌 (창 11:3 "벽돌을 만들어 견고히 굽자") */
function brickRows(y: number, from: number, to: number, size: number, cls: string): string {
  const rows: string[] = [];
  for (let r = 0; r < 3; r++) {
    const yy = y + r * size * 1.4;
    const w = size * (1 + r * 0.25);
    for (let x = from; x < to; x += w * 1.6) rows.push(`<rect x="${x.toFixed(1)}" y="${yy.toFixed(1)}" width="${w.toFixed(1)}" height="${(w * 0.42).toFixed(1)}" rx="0.5"/>`);
  }
  return `<g class="${cls}">${rows.join('')}</g>`;
}

const ART: Record<Exclude<BackdropArt, keyof typeof PLACE_ART>, () => string> = {
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
  cities: () => `
    ${hills(204, 'bd-far', 37)}
    ${city(92, 208, 82, 1.2)}
    ${city(300, 206, 83, 1.4)}
    ${city(-120, 210, 84, 1.3)}
    ${city(520, 208, 85, 1.2)}
    ${smoke(92, 190, 121, 5)}
    ${smoke(300, 186, 122, 5)}
    ${smoke(-120, 192, 123, 5)}
    ${hills(226, 'bd-mid', 39)}
    ${thorns(40, 248, 22, 'bd-near', 124)}
    ${thorns(370, 250, 24, 'bd-near', 125)}`,
  yard: () => `
    ${treeline(200, 30, 'bd-far', 41)}
    ${treeline(214, 18, 'bd-mid', 43)}
    ${stumps([30, 52, 76, 330, 352, 374, -60, -30, 450, 480], 240, 'bd-mid')}
    ${logs(-10, 252, 'bd-near')}
    ${logs(420, 252, 'bd-near')}
    ${tree(-140, 262, 180, 'bd-near', 131, { lean: 0.2, sway: true })}
    ${tree(560, 262, 190, 'bd-near', 132, { lean: -0.2, sway: true })}`,
  peaks: () => peaks(false),
  'peaks-green': () => peaks(true),
  'altar-one': () => `
    ${peaks(false)}
    <g class="bd-far bd-ark-far"><path d="M186 152 L214 152 L213 148 L187 148 Z M188 148 L212 148 L210 146 L190 146 Z"/></g>
    ${altar(150, 240, true, 73)}
    ${grain(-40, 262, 40, 115)}
    ${grain(440, 262, 40, 116)}
    ${grain(330, 262, 34, 117)}`,
  vineyard: () => `
    ${hills(206, 'bd-far', 51)}
    ${vines(214, -300, 700, 8, 'bd-mid', 141)}
    ${vines(236, -360, 760, 12, 'bd-near', 142)}
    ${tent(268, 250, 1.3)}
    ${vines(262, -400, 160, 17, 'bd-near', 143)}
    ${vines(262, 420, 800, 17, 'bd-near', 144)}`,
  plain: plainArt,
  moreh: () => morehArt(false),
  'moreh-altar': () => morehArt(true),
  'bethel-ai': bethelAiArt,
  'moriah-far': moriahFarArt,
  moriah: () => moriahArt('bare'),
  'moriah-altar': () => moriahArt('altar'),
  'moriah-fire': () => moriahArt('fire'),
  // 나일강 갈대밭 (출 2, fx/nile.ts)
  nile: () => nileArt('reeds'),
  'nile-basket': () => nileArt('basket'),
  'nile-basket-side': () => nileArt('basket-side'),
  'nile-found': () => nileArt('found'),
  // 애굽의 재앙 (출 7–10, fx/nile.ts · fx/plagues.ts)
  'nile-blood': () => nileArt('blood'),
  'goshen-dark': () => goshenDarkArt(),
  // 호렙산의 떨기나무 (출 3–4, fx/bush.ts)
  horeb: () => bushArt('horeb'),
  bush: () => bushArt('bush'),
  'bush-snake': () => bushArt('snake'),
  // 이삭 집의 장막 안 (창 25·27, fx/stew.ts)
  'stew-tent': () => stewTentArt('stew'),
  'cook-tent': () => stewTentArt('cook'),
  'isaac-tent': () => stewTentArt('isaac'),
  // 벧엘의 사다리 (창 28:10-22, fx/ladder.ts)
  luz: () => ladderArt('luz'),
  'luz-ladder': () => ladderArt('ladder'),
  'luz-pillar': () => ladderArt('pillar'),
  // 얍복 나루와 세일 들 (창 32–33, fx/jabbok.ts)
  jabbok: () => jabbokArt('night'),
  'jabbok-cross': () => jabbokArt('cross'),
  'jabbok-grey': () => jabbokArt('grey'),
  'jabbok-sun': () => jabbokArt('sun'),
  'seir-road': () => seirArt(false),
  'seir-host': () => seirArt('far'),
  'seir-near': () => seirArt('near'),
  // 요셉의 꿈과 도단의 구덩이 (창 37, fx/dothan.ts)
  sheaves: () => dothanArt('sheaves'),
  'eleven-stars': () => dothanArt('eleven-stars'),
  dothan: () => dothanArt('dothan'),
  'dothan-caravan': () => dothanArt('dothan-caravan'),
  cistern: () => dothanArt('cistern'),
  // 유월절 밤 (출 11–12, fx/passover.ts)
  'goshen-house': () => goshenArt('house'),
  'goshen-blood': () => goshenArt('blood'),
  'passover-night': () => goshenArt('night'),
  'egypt-lamps': egyptLampsArt,
  // 바다가 갈라지다 (출 14, fx/sea.ts)
  'redsea-camp': () => redSeaArt('camp'),
  'redsea-chariots': () => redSeaArt('chariots'),
  'redsea-pillar': () => redSeaArt('pillar'),
  'redsea-wind': () => redSeaArt('wind'),
  'redsea-part': () => redSeaArt('part'),
  'redsea-crossing': () => redSeaArt('crossing'),
  'redsea-chase': () => redSeaArt('chase'),
  'redsea-return': () => redSeaArt('return'),
  'redsea-sunrise': () => redSeaArt('sunrise'),
  // 나는 요셉이라 (창 45, fx/hall.ts)
  'joseph-hall': () => josephHallArt('open'),
  'joseph-hall-shut': () => josephHallArt('shut'),
  // 선으로 바꾸사 (창 50:26, fx/coffin.ts)
  'joseph-coffin': josephCoffinArt,
  // 시내산 (출 19–20, fx/sinai.ts)
  'sinai-camp': () => sinaiArt('camp'),
  'sinai-bound': () => sinaiArt('bound'),
  'sinai-storm': () => sinaiArt('storm'),
  'sinai-fire': () => sinaiArt('fire'),
  'sinai-dark': () => sinaiArt('dark'),
  // 신 광야의 만나 (출 16, fx/manna.ts)
  'sin-camp': () => sinArt('camp'),
  'sin-glory': () => sinArt('glory'),
  'sin-quail': () => sinArt('quail'),
  'sin-dew': () => sinArt('dew'),
  'sin-manna': () => sinArt('manna'),
  'sin-melt': () => sinArt('melt'),
  // 금송아지 (출 32, fx/calf.ts)
  'calf-camp': () => calfArt('camp'),
  'calf-forge': () => calfArt('forge'),
  'calf-idol': () => calfArt('idol'),
  'calf-feast': () => calfArt('feast'),
  'calf-view': () => calfArt('view'),
  'calf-burn': () => calfArt('burn'),
  'calf-ash': () => calfArt('ash'),
  // 대속죄일 (레 16, fx/atonement.ts)
  'atone-lots': () => atoneArt('lots'),
  'atone-live': () => atoneArt('live'),
  'atone-gone': () => atoneArt('gone'),
  'atone-holy': () => atoneArt('holy'),
  'atone-edge': () => atoneArt('edge'),
  // 하늘에서 내린 불 (레 8–9, fx/ordination.ts)
  'ord-court': () => ordinationArt('court'),
  'ord-altar': () => ordinationArt('altar'),
  'ord-blaze': () => ordinationArt('blaze'),
  // 다른 불 (레 10, fx/strangefire.ts)
  'sf-court': () => strangeFireArt('court'),
  'sf-ash': () => strangeFireArt('ash'),
  'sf-outside': () => strangeFireArt('outside'),
  // 발람과 나귀 (민 22–24, fx/balaam.ts)
  'bal-moab': () => balaamArt('moab'),
  'bal-road': () => balaamArt('road'),
  'bal-walls': () => balaamArt('walls'),
  'bal-narrow': () => balaamArt('narrow'),
  'bal-baal': () => balaamArt('baal'),
  'bal-pisgah': () => balaamArt('pisgah'),
  'bal-peor': () => balaamArt('peor'),
  'bal-star': () => balaamArt('star'),
  // 땅이 입을 열어 (민 16, fx/korah.ts)
  'kr-door': () => korahArt('door'),
  'kr-ash': () => korahArt('ash'),
  'kr-tents': () => korahArt('tents'),
  'kr-gone': () => korahArt('gone'),
  // 우리는 메뚜기 같으니 (민 13–14, fx/spies.ts)
  'spy-hebron': () => spiesArt('hebron'),
  'spy-eshcol': () => spiesArt('eshcol'),
  'spy-cluster': () => spiesArt('cluster'),
  'spy-report': () => spiesArt('report'),
  'spy-lament': () => spiesArt('lament'),
  // 반석을 두 번 치다 (민 20, fx/meribah.ts)
  'mr-kadesh': () => meribahArt('kadesh'),
  'mr-rock': () => meribahArt('rock'),
  'mr-water': () => meribahArt('water'),
  'mr-edom': () => meribahArt('edom'),
  'mr-hor': () => meribahArt('hor'),
  'mr-hor-mourn': () => meribahArt('hor-mourn'),
  'mr-summit': () => meribahArt('summit'),
  // 놋뱀 (민 21, fx/brazen.ts)
  'bz-road': () => brazenArt('road'),
  'bz-camp': () => brazenArt('camp'),
  'bz-pole': () => brazenArt('pole'),
  'bz-pole-lit': () => brazenArt('pole-lit'),
  // 신명기 (fx/deuteronomy.ts)
  'dt-door': () => deutArt('dt-door'),
  'dt-door-lit': () => deutArt('dt-door-lit'),
  'dt-twin': () => deutArt('dt-twin'),
  'dt-twin-bless': () => deutArt('dt-twin-bless'),
  'dt-twin-curse': () => deutArt('dt-twin-curse'),
  'dt-song': () => deutArt('dt-song'),
  'dt-nebo-path': () => deutArt('dt-nebo-path'),
  'dt-nebo-view': () => deutArt('dt-nebo-view'),
  'dt-nebo-empty': () => deutArt('dt-nebo-empty'),
  // 사사기·룻기 (fx/judges.ts)
  'jg-palm': () => judgesArt('jg-palm'),
  'jg-tabor': () => judgesArt('jg-tabor'),
  'jg-kishon': () => judgesArt('jg-kishon'),
  'jg-tent': () => judgesArt('jg-tent'),
  'jg-tent-shut': () => judgesArt('jg-tent-shut'),
  'jg-lattice': () => judgesArt('jg-lattice'),
  'jg-winepress': () => judgesArt('jg-winepress'),
  'jg-baal': () => judgesArt('jg-baal'),
  'jg-baal-torn': () => judgesArt('jg-baal-torn'),
  'jg-fleece-wet': () => judgesArt('jg-fleece-wet'),
  'jg-fleece-dry': () => judgesArt('jg-fleece-dry'),
  'jg-harod': () => judgesArt('jg-harod'),
  'jg-midian': () => judgesArt('jg-midian'),
  'jg-mizpah': () => judgesArt('jg-mizpah'),
  'jg-mountains': () => judgesArt('jg-mountains'),
  'jg-zorah': () => judgesArt('jg-zorah'),
  'jg-timnah': () => judgesArt('jg-timnah'),
  'jg-timnah-lion': () => judgesArt('jg-timnah-lion'),
  'jg-honey': () => judgesArt('jg-honey'),
  'jg-fields': () => judgesArt('jg-fields'),
  'jg-fields-burnt': () => judgesArt('jg-fields-burnt'),
  'jg-lehi': () => judgesArt('jg-lehi'),
  'jg-lehi-spring': () => judgesArt('jg-lehi-spring'),
  'jg-gaza-gate': () => judgesArt('jg-gaza-gate'),
  'jg-gate-hill': () => judgesArt('jg-gate-hill'),
  'jg-sorek': () => judgesArt('jg-sorek'),
  'jg-mill': () => judgesArt('jg-mill'),
  'jg-dagon': () => judgesArt('jg-dagon'),
  'jg-dagon-fallen': () => judgesArt('jg-dagon-fallen'),
  'jg-gibeah': () => judgesArt('jg-gibeah'),
  'jg-gibeah-dawn': () => judgesArt('jg-gibeah-dawn'),
  'jg-gibeah-smoke': () => judgesArt('jg-gibeah-smoke'),
  'jg-rimmon': () => judgesArt('jg-rimmon'),
  'jg-shiloh': () => judgesArt('jg-shiloh'),
  'rt-moab-road': () => judgesArt('rt-moab-road'),
  'rt-bethlehem': () => judgesArt('rt-bethlehem'),
  'rt-field': () => judgesArt('rt-field'),
  'rt-threshing': () => judgesArt('rt-threshing'),
  'rt-gate': () => judgesArt('rt-gate'),
  // 7막 사울의 마지막 (fx/gilboa.ts)
  'gb-camp': () => gilboaArt('gb-camp'),
  'gb-endor': () => gilboaArt('gb-endor'),
  'gb-endor-rise': () => gilboaArt('gb-endor-rise'),
  'gb-slope': () => gilboaArt('gb-slope'),
  'gb-bethshan': () => gilboaArt('gb-bethshan'),
  'gb-jordan': () => gilboaArt('gb-jordan'),
  'gb-tamarisk': () => gilboaArt('gb-tamarisk'),
  // 7막 한나와 사무엘 (fx/samuel.ts)
  'sm-road': () => samuelArt('sm-road'),
  'sm-shiloh': () => samuelArt('sm-shiloh'),
  'sm-ramah': () => samuelArt('sm-ramah'),
  'sm-lamp': () => samuelArt('sm-lamp'),
  'sm-lamp-out': () => samuelArt('sm-lamp-out'),
  // 7막 요나단의 화살 · 엔게디 굴 (fx/jonathan.ts)
  'jn-hall': () => jonathanArt('jn-hall'),
  'jn-hall-spear': () => jonathanArt('jn-hall-spear'),
  'jn-window': () => jonathanArt('jn-window'),
  'jn-window-rope': () => jonathanArt('jn-window-rope'),
  'jn-bed': () => jonathanArt('jn-bed'),
  'jn-feast': () => jonathanArt('jn-feast'),
  'jn-field': () => jonathanArt('jn-field'),
  'jn-engedi': () => jonathanArt('jn-engedi'),
  'jn-cave': () => jonathanArt('jn-cave'),
  'jn-cliff': () => jonathanArt('jn-cliff'),
  // 7막 다윗 왕 (fx/kingship.ts)
  'kg-cart': () => kingshipArt('kg-cart'),
  'kg-threshing': () => kingshipArt('kg-threshing'),
  'kg-threshing-still': () => kingshipArt('kg-threshing-still'),
  'kg-obed': () => kingshipArt('kg-obed'),
  'kg-ascent': () => kingshipArt('kg-ascent'),
  'kg-window': () => kingshipArt('kg-window'),
  'kg-tent': () => kingshipArt('kg-tent'),
  'kg-roof': () => kingshipArt('kg-roof'),
  'kg-gate': () => kingshipArt('kg-gate'),
  'kg-rabbah': () => kingshipArt('kg-rabbah'),
  'kg-parable': () => kingshipArt('kg-parable'),
  'kg-parable-taken': () => kingshipArt('kg-parable-taken'),
  // 7막 솔로몬 (fx/solomon.ts)
  'so-gibeon': () => solomonArt('so-gibeon'),
  'so-dream': () => solomonArt('so-dream'),
  'so-dream-wake': () => solomonArt('so-dream-wake'),
  'so-court': () => solomonArt('so-court'),
  'so-house': () => solomonArt('so-house'),
  'so-house-dawn': () => solomonArt('so-house-dawn'),
  // 7막 성전 봉헌 · 솔로몬의 타락 (fx/temple.ts)
  'tp-court': () => templeArt('tp-court'),
  'tp-court-cloud': () => templeArt('tp-court-cloud'),
  'tp-holy': () => templeArt('tp-holy'),
  'tp-holy-ark': () => templeArt('tp-holy-ark'),
  'tp-heights': () => templeArt('tp-heights'),
  // 7막 압살롬의 반역 (fx/absalom.ts)
  'ab-gate': () => absalomArt('ab-gate'),
  'ab-kidron': () => absalomArt('ab-kidron'),
  'ab-olives': () => absalomArt('ab-olives'),
  'ab-bahurim': () => absalomArt('ab-bahurim'),
  'ab-well': () => absalomArt('ab-well'),
  'ab-mahanaim': () => absalomArt('ab-mahanaim'),
  'ab-watch': () => absalomArt('ab-watch'),
  'ab-forest': () => absalomArt('ab-forest'),
  'ab-oak': () => absalomArt('ab-oak'),
  'ab-oak-empty': () => absalomArt('ab-oak-empty'),
  'ab-cairn': () => absalomArt('ab-cairn'),
  'ab-pillar': () => absalomArt('ab-pillar'),
  'ab-chamber': () => absalomArt('ab-chamber'),
  // 7막 다윗 (fx/david.ts)
  'dv-bethlehem': () => davidArt('dv-bethlehem'),
  'dv-yard': () => davidArt('dv-yard'),
  'dv-field': () => davidArt('dv-field'),
  'dv-court': () => davidArt('dv-court'),
  'dv-court-calm': () => davidArt('dv-court-calm'),
  'dv-elah': () => davidArt('dv-elah'),
  'dv-brook': () => davidArt('dv-brook'),
  // 7막 사울 (fx/saul.ts)
  'sl-hills': () => saulArt('sl-hills'),
  'sl-ascent': () => saulArt('sl-ascent'),
  'sl-feast': () => saulArt('sl-feast'),
  'sl-roof': () => saulArt('sl-roof'),
  'sl-roof-dawn': () => saulArt('sl-roof-dawn'),
  'sl-prophets': () => saulArt('sl-prophets'),
  'sl-mizpah': () => saulArt('sl-mizpah'),
  'sl-baggage': () => saulArt('sl-baggage'),
  'sl-kenite': () => saulArt('sl-kenite'),
  'sl-carmel': () => saulArt('sl-carmel'),
  'sl-gilgal': () => saulArt('sl-gilgal'),
  'sl-parting': () => saulArt('sl-parting'),
  // 여호수아 (fx/joshua.ts)
  'js-jericho': () => joshArt('js-jericho'),
  'js-jericho-cord': () => joshArt('js-jericho-cord'),
  'js-jericho-fallen': () => joshArt('js-jericho-fallen'),
  'js-jericho-ruin': () => joshArt('js-jericho-ruin'),
  'js-roof': () => joshArt('js-roof'),
  'js-window-rope': () => joshArt('js-window-rope'),
  'js-window-cord': () => joshArt('js-window-cord'),
  'js-jordan-flood': () => joshArt('js-jordan-flood'),
  'js-jordan-dry': () => joshArt('js-jordan-dry'),
  'js-gilgal': () => joshArt('js-gilgal'),
  'js-ai': () => joshArt('js-ai'),
  'js-tent-dig': () => joshArt('js-tent-dig'),
  'js-achor': () => joshArt('js-achor'),
  'js-gibeon': () => joshArt('js-gibeon'),
  'js-gibeon-storm': () => joshArt('js-gibeon-storm'),
  'js-gibeon-sun': () => joshArt('js-gibeon-sun'),
  'js-shechem': () => joshArt('js-shechem'),
  'js-shechem-stone': () => joshArt('js-shechem-stone'),
  // 별을 세어 보라 (창 15, fx/covenant.ts)
  'cov-count': () => covenantArt('count'),
  'cov-pieces': () => covenantArt('pieces'),
  // 마므레의 세 손님 (창 18, fx/mamre.ts)
  mamre: () => mamreArt('grove'),
  'mamre-meal': () => mamreArt('meal'),
  'mamre-door': () => mamreArt('door'),
  'mamre-laugh': () => mamreArt('laugh'),
  'mamre-start': () => mamreArt('start'),
  'sodom-view': () => mamreArt('sodom'),
  // 뒤돌아보지 말라 (창 19:1-29, fx/sodom.ts)
  'sodom-gate': () => sodomArt('gate'),
  'sodom-gate-grey': () => sodomArt('gate-grey'),
  'lot-house': () => sodomArt('house'),
  'lot-door': () => sodomArt('door'),
  'sodom-mob': () => sodomArt('mob'),
  'sodom-plain': () => sodomArt('plain'),
  'sodom-fire': () => sodomArt('fire'),
  'salt-pillar': () => sodomArt('salt'),
  'sodom-smoke': () => sodomArt('smoke'),
  // 요셉의 애굽 (창 39·41, fx/egypt-court.ts)
  potiphar: () => potipharArt(false),
  'potiphar-cloak': () => potipharArt(true),
  'round-prison': roundPrisonArt,
  'dream-cows': () => dreamCowsArt(false),
  'dream-cows-lean': () => dreamCowsArt(true),
  'dream-ears': () => dreamEarsArt(false),
  'dream-ears-thin': () => dreamEarsArt(true),
  'pharaoh-court': courtArt,
  chariot: chariotArt,
  granary: () => granaryArt(false),
  'granary-famine': () => granaryArt(true),
  'moriah-thicket': moriahThicketArt,
  kilns: () => `
    <path class="bd-far" d="M-800 260 L-800 212 C-500 208 -200 214 100 210 C300 207 500 213 800 209 L1200 211 L1200 260 Z"/>
    ${palm(-150, 226, 46, 'bd-far', 151)}${palm(560, 226, 44, 'bd-far', 155)}
    <path class="bd-mid" d="M-800 260 L-800 230 C-560 226 -300 234 -40 230 C180 226 420 234 700 228 L1200 232 L1200 260 Z"/>
    ${kiln(122, 234, 1.1, 171)}${kiln(300, 236, 1.2, 172)}${kiln(-30, 232, 1, 173)}${kiln(450, 232, 1, 174)}
    ${brickRows(240, -300, 700, 6, 'bd-mid bd-bricks')}
    ${palm(70, 262, 110, 'bd-near', 156)}
    ${palm(352, 262, 124, 'bd-near', 157)}`,
};

// ── 2막: 아브람의 길 (창 12:1-9) ──
/** 세겜 모레 상수리나무 (창 12:6): 홀로 선 큰 나무, 먼 언덕의 가나안 성. altar = 그 아래 쌓은 단 (12:7) */
function morehArt(withAltar: boolean): string {
  return `
    ${hills(202, 'bd-far', 601)}
    ${city(132, 208, 602, 1)}${city(-150, 210, 607, 1.2)}
    ${smoke(132, 196, 608, 4)}
    ${hills(222, 'bd-mid', 603)}
    ${tree(292, 240, 168, 'bd-mid', 604, { lean: -0.12, sway: true })}
    ${stones2([244, 262, 318, 120], 244, 'bd-mid', 609)}
    ${withAltar ? altar(200, 242, true, 605) : ''}
    ${tree(-70, 262, 190, 'bd-near', 606, { lean: 0.2, sway: true })}${tree(540, 262, 160, 'bd-near', 610, { lean: -0.2, sway: true })}
    ${thorns(80, 254, 14, 'bd-near', 611)}`;
}

/** 벧엘 동편 산 (창 12:8): 서쪽(왼쪽)은 벧엘, 동쪽(오른쪽)은 아이. 가운데 언덕 위에 단과 장막 */
function bethelAiArt(): string {
  return `
    ${hills(198, 'bd-far', 621)}
    ${city(108, 204, 622, 1.15)}
    ${city(300, 206, 623, 0.85)}
    <path class="bd-mid" d="M-800 260 L-800 230 C-420 226 -120 234 40 228 C110 222 156 214 200 212 C244 214 290 222 360 228 C520 234 820 226 1200 230 L1200 260 Z"/>
    ${altar(184, 214, true, 624)}
    ${tent(236, 218, 0.62)}
    ${stones2([150, 262, -60, 470], 252, 'bd-near', 625)}
    ${thorns(96, 254, 16, 'bd-near', 626)}${thorns(318, 256, 18, 'bd-near', 627)}
    ${tree(-90, 262, 170, 'bd-near', 628, { lean: 0.2, sway: true })}${tree(520, 262, 176, 'bd-near', 629, { lean: -0.2, sway: true })}`;
}

// ── 2막: 모리아 (창 22:1-19) ──
/** 제 삼일에 멀리 바라본 그곳 (창 22:4): 광야 길이 홀로 선 산으로 이어지고, 꼭대기에 희미한 빛 */
function moriahFarArt(): string {
  return `
    ${hills(212, 'bd-far', 701)}
    <circle class="bd-halo bd-moriah-glow" cx="200" cy="118" r="54"/>
    <path class="bd-far" d="M-40 236 C40 226 110 192 160 146 C176 131 188 120 196 117 C202 115 208 117 214 122 C240 146 290 200 360 226 C400 236 460 240 520 240 L520 260 L-40 260 Z"/>
    <path class="bd-ridge" d="M196 117 C204 115 210 118 214 122 M150 160 L170 150 M236 150 L256 172" />
    ${hills(232, 'bd-mid', 703)}
    <path class="bd-road" d="M150 262 C176 254 214 250 222 244 C232 238 206 236 200 232 C194 228 204 226 208 224"/>
    ${stones2([96, 118, 286, 300, -40, 450], 250, 'bd-near', 704)}
    ${thorns(70, 254, 18, 'bd-near', 705)}${thorns(334, 256, 20, 'bd-near', 706)}
    ${thorns(-90, 252, 22, 'bd-near', 707)}${thorns(500, 252, 22, 'bd-near', 708)}`;
}

/** 산꼭대기의 마루: 발아래로 먼 산줄기가 낮게 깔리고, 바위가 양옆에 선다 */
function moriahSummit(seed: number): string {
  return `
    <path class="bd-far" d="M-800 260 L-800 226 L-600 214 L-420 224 L-300 210 L-160 222 L-60 214 L40 224 L120 216 L200 222 L290 212 L380 224 L470 214 L600 226 L760 212 L1200 224 L1200 260 Z"/>
    <path class="bd-far bd-mist" d="M-800 260 L-800 232 C-400 228 -100 236 200 232 C500 228 800 236 1200 232 L1200 260 Z"/>
    <path class="bd-mid" d="M-800 260 L-800 252 C-400 250 -60 246 80 240 C130 236 160 233 200 233 C240 233 270 236 320 240 C460 246 800 250 1200 252 L1200 260 Z"/>
    <g class="bd-near">
      <path d="M-20 262 C-18 236 -4 222 18 220 C34 218 48 226 54 240 C58 250 58 258 56 262 Z"/>
      <path d="M346 262 C348 244 360 232 378 232 C398 232 412 244 414 262 Z"/>
      <path d="M-160 262 C-150 230 -120 214 -96 218 C-76 222 -66 242 -64 262 Z"/>
      <path d="M470 262 C474 236 492 222 512 224 C532 228 542 246 542 262 Z"/>
    </g>
    ${stones2([128, 150, 246, 268, 300], 242, 'bd-mid', seed)}`;
}

/** 돌을 쌓은 단 + 그 위에 벌여 놓은 나무 (창 22:9). 불은 아직 없다 */
function woodAltar(x: number, ground: number, seed: number): string {
  const r = rng(seed);
  const stones: string[] = [];
  [[5, 9], [4, 8], [3, 7]].forEach(([n, h], row) => {
    const w = 9;
    const y = ground - (row + 1) * h + 1;
    for (let i = 0; i < n; i++) {
      const sx = x - (n * w) / 2 + i * w + (r() - 0.5) * 1.5;
      stones.push(`<rect x="${sx.toFixed(1)}" y="${y.toFixed(1)}" width="${(w - 0.8).toFixed(1)}" height="${(h - 0.6).toFixed(1)}" rx="2.4"/>`);
    }
  });
  const top = ground - 24;
  const sticks = Array.from({ length: 6 }, (_, i) => {
    const y = top - 1.6 - (i % 3) * 2.2;
    const x0 = x - 15 + (r() - 0.5) * 3 + (i > 2 ? 3 : 0);
    const len = 26 + r() * 6;
    const tilt = (r() - 0.5) * 3;
    return `<path d="M${x0.toFixed(1)} ${(y + tilt).toFixed(1)} L${(x0 + len).toFixed(1)} ${(y - tilt).toFixed(1)}" stroke-width="2.1" stroke-linecap="round"/>`;
  }).join('');
  return `<g class="bd-altar"><g class="bd-mid">${stones.join('')}</g><g class="bd-wood" fill="none">${sticks}</g></g>`;
}

function moriahArt(state: 'bare' | 'altar' | 'fire'): string {
  const x = 200;
  const ground = 240;
  const altarSvg = state === 'bare' ? stones2([186, 194, 206, 214], ground, 'bd-mid', 711) : state === 'altar' ? woodAltar(x, ground, 712) : altar(x, ground, true, 713);
  // 폰에서는 인물 둘이 양옆으로 벌어져 서므로, 가운데 단을 크게 그려 둘 사이에 보이게 한다
  return `${moriahSummit(714)}<g transform="translate(${x} ${ground}) scale(1.6) translate(${-x} ${-ground})">${altarSvg}</g>
    ${thorns(96, 250, 16, 'bd-near', 715)}${thorns(312, 252, 14, 'bd-near', 716)}`;
}

/**
 * 뒤의 수풀 (창 22:13 "한 수양이 뒤에 있는데 뿔이 수풀에 걸렸는지라"):
 * 엉킨 가시 수풀 한가운데 숫양 한 마리. 뿔에 가지가 걸려 고개를 이따금 당긴다. 위로 은은한 빛
 */
function moriahThicketArt(): string {
  const r = rng(721);
  const cx = 200;
  const ground = 242;
  const branch = (front: boolean) => Array.from({ length: front ? 7 : 16 }, () => {
    const bx = cx + (r() - 0.5) * (front ? 70 : 110);
    const a = -Math.PI / 2 + (r() - 0.5) * 2.2;
    const len = 18 + r() * (front ? 26 : 34);
    const ex = bx + Math.cos(a) * len;
    const ey = ground + Math.sin(a) * len;
    const mx = (bx + ex) / 2 + (r() - 0.5) * 14;
    const my = (ground + ey) / 2 + (r() - 0.5) * 8;
    const twig = `M${((mx + ex) / 2).toFixed(1)} ${((my + ey) / 2).toFixed(1)} l${((r() - 0.5) * 14).toFixed(1)} ${(-4 - r() * 7).toFixed(1)}`;
    return `<path d="M${bx.toFixed(1)} ${ground} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)} ${twig}" fill="none" stroke="currentColor" stroke-width="${(front ? 1.3 : 1.1) + r() * 0.6}" stroke-linecap="round"/>`
      + (front ? '' : `<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="${(2 + r() * 2.6).toFixed(1)}"/>`);
  }).join('');
  // 숫양: 오른쪽을 본다. 몸·털 덩이·다리, 고개는 뿔째 가지에 걸려 있다
  const ram = `<g class="bd-ram">
    <path d="M176 226 C175 218 181 212 189 212 C194 208 204 208 208 212 C214 212 218 217 217 223 C219 229 213 234 205 234 C199 237 189 237 184 234 C178 234 174 231 176 226 Z"/>
    <circle cx="183" cy="215" r="5.4"/><circle cx="192" cy="210.5" r="5.4"/><circle cx="202" cy="210" r="5.2"/><circle cx="179" cy="224" r="4.8"/><circle cx="184" cy="231" r="4.4"/><circle cx="197" cy="233.5" r="4.4"/>
    <path d="M183 232 L182 244 L185.4 244 L187 232 Z M191 234 L191 244 L194.4 244 L195 234 Z M204 234 L205 244 L208.4 244 L208 233 Z M211 231 L213 243 L216.4 243 L215 230 Z"/>
    <g class="bd-ram__head">
      <path d="M207 218 C207 211 211 205 217 203 C222 202 226 204 229 208 C231 211 233 214 235 217 C236 220 234 222 231 222 C228 222 225 221 222 222 C218 223 214 224 211 223 C208 222 207 220 207 218 Z"/>
      <path d="M218 205 C211 201 204 206 205 213 C206 220 214 221 216 215 C217 211 213 209 211 212" class="bd-ram__horn" fill="none" stroke-linecap="round"/>
      <path d="M222 207 L226 203 L227 207 Z"/>
      <ellipse class="bd-ram__eye" cx="226" cy="210" rx="1.1" ry="0.8"/>
    </g>
  </g>`;
  return `${moriahSummit(722)}
    ${woodAltar(70, 240, 723)}
    <circle class="bd-regard" cx="${cx}" cy="200" r="74"/>
    <g transform="translate(${cx} ${ground - 10}) scale(1.45) translate(${-cx} ${-ground})">
      <g class="bd-mid bd-thicket">${branch(false)}</g>
      ${ram}
      <g class="bd-mid bd-thicket">${branch(true)}
        <path d="M214 244 Q220 222 206 200 M226 244 Q222 220 214 198" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </g>
    </g>
    ${thorns(96, 252, 16, 'bd-near', 725)}${thorns(316, 254, 14, 'bd-near', 726)}`;
}

/** 흩어진 돌 (places.ts의 stones와 같은 모양, 서로 불러오는 순서 문제를 피하려고 여기 따로 둠) */
function stones2(xs: number[], ground: number, cls: string, seed: number): string {
  const r = rng(seed);
  return `<g class="${cls}">${xs.map((x) => `<ellipse cx="${x}" cy="${ground - 1}" rx="${(3 + r() * 5).toFixed(1)}" ry="${(1.6 + r() * 2).toFixed(1)}"/>`).join('')}</g>`;
}

const cache = new Map<BackdropArt, string>();



/** 배경 SVG 한 장 */
export function backdropSvg(art: BackdropArt): string {
  let body = cache.get(art);
  if (!body) {
    // 1막 전용 그림(ART) 또는 B급 배경 라이브러리(places.ts)
    body = (art in PLACE_ART ? PLACE_ART[art as keyof typeof PLACE_ART] : ART[art as keyof typeof ART])();
    cache.set(art, body);
  }
  const defs = `<defs>
    <radialGradient id="bd-halo-g"><stop offset="0" class="bd-halo__c"/><stop offset="1" class="bd-halo__e"/></radialGradient>
    <radialGradient id="bd-flame-g"><stop offset="0" stop-color="#ffd9a0" stop-opacity="0.75"/><stop offset="0.35" stop-color="#f08a3c" stop-opacity="0.32"/><stop offset="1" stop-color="#f08a3c" stop-opacity="0"/></radialGradient>
  </defs>`;
  return `<svg class="backdrop" data-art="${art}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${defs}${body}</svg>`;
}

/**
 * 구름 속의 무지개 (창 9:13). 배경 상자 맨 뒤에 한 번만 깔아 두고, mood의 bow가 켜지면
 * 일곱 띠가 왼쪽 끝에서부터 그어지며 나타난다 (styles/flood.css). 산은 무지개 앞에 선다.
 */
export function bowSvg(): string {
  const colors = ['#e2654f', '#ec9a4e', '#f1d27a', '#8fcf8a', '#6fb4d8', '#6f7fd0', '#9a78c8'];
  const bands = colors
    .map((c, i) => {
      const r = 176 - i * 3.4;
      return `<path class="bow__band" style="--i:${i}" pathLength="1" d="M${200 - r} 250 A${r} ${r} 0 0 1 ${200 + r} 250" stroke="${c}"/>`;
    })
    .join('');
  return `<svg class="bow" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <path class="bow__glow" pathLength="1" d="M34 250 A166 166 0 0 1 366 250"/>
    <g class="bow__bands">${bands}</g>
  </svg>`;
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
  box.querySelectorAll('svg.backdrop, svg.bow').forEach((svg) => svg.setAttribute('preserveAspectRatio', mode));
}
