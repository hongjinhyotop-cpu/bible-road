// 요셉의 꿈과 도단의 구덩이 (창 37, A급 gen-37-coat). 배경 그림 'sheaves' · 'eleven-stars' · 'dothan' · 'dothan-caravan' · 'cistern'.
// 같은 종이 오려낸 그림자극 말투.
//  - sheaves        : 꿈 1 (37:7). 추수하는 밭 한가운데 요셉의 단이 일어서고, 둘러선 단들이 하나씩 그 단을 향해 절한다
//  - eleven-stars   : 꿈 2 (37:9). 하늘에 해와 달과 열한 별. 다 같이 아래로 고개를 숙이듯 내려앉는다
//  - dothan         : 도단 들 (37:17). 먼 언덕 위 도단 성, 양 떼, 들을 가로지르는 대상로(길르앗 → 애굽), 가운데 물 없는 구덩이
//  - dothan-caravan : 같은 들 + 그 길로 향품을 실은 이스마엘 사람들의 낙타 떼가 오른쪽(길르앗)에서 왼쪽(애굽)으로 지나간다 (37:25)
//  - cistern        : 구덩이 안 (37:24 "그 구덩이는 빈 것이라 그 속에 물이 없었더라"). 둥근 돌벽, 머리 위로 동그란 하늘 한 조각
// 폰(세로 화면)에서는 x 100~300만 보인다 → 구덩이·꿈의 단·해와 달은 가운데(x 130~270).
import { W, rng, hills, city, sheep, thorns, tree, grain } from './backdrop';

const GROUND = 242;

/** 흩어진 돌 */
function rocks(xs: number[], ground: number, cls: string, seed: number, big = 1): string {
  const r = rng(seed);
  return `<g class="${cls}">${xs.map((x) => {
    const w = (4 + r() * 8) * big;
    const h = (2.5 + r() * 4) * big;
    return `<path d="M${(x - w).toFixed(1)} ${ground} C${(x - w).toFixed(1)} ${(ground - h * 0.8).toFixed(1)} ${(x - w * 0.3).toFixed(1)} ${(ground - h).toFixed(1)} ${x.toFixed(1)} ${(ground - h).toFixed(1)} C${(x + w * 0.6).toFixed(1)} ${(ground - h).toFixed(1)} ${(x + w).toFixed(1)} ${(ground - h * 0.5).toFixed(1)} ${(x + w).toFixed(1)} ${ground} Z"/>`;
  }).join('')}</g>`;
}

// ── 꿈 ─────────────────────────────────────────

/** 곡식 단 하나 (허리를 묶은 이삭 다발). 원점 = 밑동 가운데. 아래는 짚 끝이 살짝 퍼지고, 위는 이삭이 둥글게 벌어진다 */
function sheaf(h: number, seed: number): string {
  const r = rng(seed);
  const ears = Array.from({ length: 11 }, (_, i) => {
    const t = (i - 5) / 5;
    const a = t * 34 + (r() - 0.5) * 6;
    const x = t * h * 0.24;
    const y = -h * (0.86 + (1 - Math.abs(t)) * 0.1) + r() * 1.5;
    return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(h * 0.05).toFixed(1)}" ry="${(h * 0.15).toFixed(1)}" transform="rotate(${a.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }).join('');
  return `<path d="M${-h * 0.2} 0 L${-h * 0.09} ${-h * 0.44} C${-h * 0.14} ${-h * 0.56} ${-h * 0.22} ${-h * 0.7} ${-h * 0.26} ${-h * 0.82} L${h * 0.26} ${-h * 0.82} C${h * 0.22} ${-h * 0.7} ${h * 0.14} ${-h * 0.56} ${h * 0.09} ${-h * 0.44} L${h * 0.2} 0 Z"/>
    ${ears}
    <path class="dt-straw" d="M${-h * 0.14} -1 L${-h * 0.07} ${-h * 0.4} M0 -1 L0 ${-h * 0.4} M${h * 0.14} -1 L${h * 0.07} ${-h * 0.4}"/>
    <path class="dt-band" d="M${-h * 0.11} ${-h * 0.47} L${h * 0.11} ${-h * 0.47} L${h * 0.1} ${-h * 0.4} L${-h * 0.1} ${-h * 0.4} Z"/>`;
}

/** 꿈 1: 밭 한가운데 일어선 단 + 둘러서서 절하는 열한 단 */
function sheavesArt(): string {
  // 폰에서는 요셉이 오른쪽에 비켜 서므로(spread), 꿈은 가운데에서 조금 왼쪽에
  const cx = 168;
  const base = 222;
  // 열한 단: 둘레를 따라 (뒤쪽은 작게). bow = 가운데 단 쪽으로 기우는 각도
  const ring = Array.from({ length: 11 }, (_, i) => {
    const a = Math.PI * (0.06 + (i / 10) * 0.88);
    const back = Math.sin(a);
    const x = cx - Math.cos(a) * 72;
    const y = base + 10 - back * 16;
    const s = 0.72 + (1 - back) * 0.3;
    const dir = x < cx ? 1 : -1;
    return { x, y, s, dir, i, back };
  });
  // 뒤쪽부터 그린다
  const back = ring.filter((s) => s.back > 0.55);
  const front = ring.filter((s) => s.back <= 0.55);
  const draw = (list: typeof ring) => list.map((s) => `<g transform="translate(${s.x.toFixed(1)} ${s.y.toFixed(1)}) scale(${s.s.toFixed(2)})">
      <g class="dt-sheaf dt-sheaf--bow" style="--bow:${(s.dir * 24).toFixed(0)}deg; --d:${(1.2 + s.i * 0.32).toFixed(2)}s">${sheaf(30, 300 + s.i)}</g>
    </g>`).join('');
  return `
    <circle class="dt-dreamglow" cx="${cx}" cy="${base - 30}" r="120"/>
    ${hills(198, 'bd-far', 301)}
    <path class="bd-far dt-field" d="M-800 260 L-800 210 C-500 206 -200 214 40 210 C140 208 260 212 400 208 C700 204 900 210 1200 208 L1200 260 Z"/>
    <path class="dt-stubble" d="${Array.from({ length: 40 }, (_, i) => `M${-200 + i * 20} ${232 + (i % 3) * 6} l1 -4`).join(' ')}"/>
    <g class="bd-mid dt-sheaves">${draw(back)}</g>
    <g transform="translate(${cx} ${base + 2}) scale(1.5)">
      <g class="dt-sheaf dt-sheaf--rise">${sheaf(30, 299)}</g>
    </g>
    <g class="bd-mid dt-sheaves">${draw(front)}</g>
    ${grain(-40, 262, 44, 311)}${grain(30, 262, 40, 312)}${grain(370, 262, 42, 313)}${grain(450, 262, 46, 314)}`;
}

/** 다섯 갈래 별 */
function star(x: number, y: number, r: number): string {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.42 : r;
    return `${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`;
  }).join(' ');
  return `<polygon points="${pts}"/>`;
}

/** 꿈 2: 해와 달과 열한 별이 고개 숙이듯 내려앉는다 */
function elevenStarsArt(): string {
  const r = rng(321);
  const dust = Array.from({ length: 90 }, () => `<circle cx="${(-W + r() * W * 3).toFixed(1)}" cy="${(r() * 200).toFixed(1)}" r="${(0.25 + r() * 0.4).toFixed(2)}"/>`).join('');
  // 열한 별: 해와 달 사이 위쪽으로 둥근 활 모양
  const eleven = Array.from({ length: 11 }, (_, i) => {
    const a = Math.PI * (0.1 + (i / 10) * 0.8);
    const x = 166 - Math.cos(a) * 74;
    const y = 106 - Math.sin(a) * 58;
    return `<g class="dt-bowing" style="--d:${(1.4 + i * 0.22).toFixed(2)}s">
      <circle class="dt-star__glow" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7"/>
      <g class="dt-star">${star(x, y, 3.6)}</g>
    </g>`;
  }).join('');
  return `
    <g class="dt-dust">${dust}</g>
    <circle class="dt-dreamglow dt-dreamglow--night" cx="166" cy="214" r="110"/>
    <g class="dt-bowing" style="--d:0.6s">
      <circle class="dt-sun__glow" cx="104" cy="138" r="30"/>
      <circle class="dt-sun" cx="104" cy="138" r="13"/>
    </g>
    <g class="dt-bowing" style="--d:1s">
      <circle class="dt-moon__glow" cx="228" cy="136" r="22"/>
      <path class="dt-moon" d="M232 124 A12 12 0 1 0 232 148 A9.5 9.5 0 1 1 232 124 Z"/>
    </g>
    ${eleven}
    ${hills(214, 'bd-far', 331)}
    <path class="bd-mid" d="M-800 260 L-800 236 C-500 232 -200 240 60 236 C120 234 140 228 166 228 C192 228 222 234 330 236 C600 240 900 232 1200 236 L1200 260 Z"/>
    <circle class="dt-here" cx="166" cy="227" r="2.4"/>
    ${thorns(80, 250, 14, 'bd-near', 332)}${thorns(320, 252, 16, 'bd-near', 333)}`;
}

// ── 도단 들 ──────────────────────────────────────

/** 물 없는 구덩이 (빗물을 받아 두는 병 모양 저수 구덩이): 둥근 돌 테두리, 어두운 입 */
function pit(x: number, y: number): string {
  return `<g class="dt-pit">
    <ellipse class="dt-pit__mouth" cx="${x}" cy="${y}" rx="21" ry="5.2"/>
    <path class="dt-pit__lip" d="M${x - 24} ${y + 0.4} C${x - 24} ${y - 6.6} ${x + 24} ${y - 6.6} ${x + 24} ${y + 0.4} L${x + 22} ${y + 0.6} C${x + 20} ${y - 4.6} ${x - 20} ${y - 4.6} ${x - 22} ${y + 0.6} Z"/>
    <path class="dt-pit__lip" d="M${x - 24} ${y + 0.4} C${x - 24} ${y + 7.6} ${x + 24} ${y + 7.6} ${x + 24} ${y + 0.4} L${x + 21} ${y + 0.6} C${x + 19} ${y + 5.6} ${x - 19} ${y + 5.6} ${x - 21} ${y + 0.6} Z"/>
    ${rocks([x - 28, x - 18, x + 16, x + 27], y + 6, 'bd-mid', 341, 0.8)}
  </g>`;
}

/** 걸어가는 낙타 한 마리 + 옆구리에 늘어뜨린 짐 (오른쪽을 본 그림, 원점 = 발). 다리는 번갈아 앞뒤로 */
function camelWalking(load: boolean, seed: number): string {
  const r = rng(seed);
  const pack = load
    ? `<path class="dt-pack" d="M-9 -31 L4 -31 L5 -20 L-10 -20 Z"/><path class="dt-pack dt-pack--b" d="M-6 -35 L1 -35 L2 -31 L-7 -31 Z"/><path class="detail" d="M-9.5 -25 L4.5 -25" fill="none" stroke-width="0.5"/>`
    : '';
  const lift = (0.6 + r() * 0.4).toFixed(2);
  return `<path d="M-15 -21 C-14 -27 -9 -34 -3 -34 C2 -34 5 -29 8 -26 C11 -24 13 -23 15 -25 C17 -28 18 -32 20 -34 L24 -34.5 C26 -34 27 -32.5 26.5 -31.5 L22.5 -30.5 C21 -27 19 -22 16 -19.5 C13 -17.5 10 -17 8 -17 L-11 -17 C-14 -17 -15.5 -18.5 -15 -21 Z"/>
    <g class="dt-legs" style="--lift:${lift}">
      <path class="dt-leg dt-leg--a" d="M-12 -18 L-11.4 -9 L-12 0 L-10.2 0 L-9.8 -9 L-10 -18 Z"/>
      <path class="dt-leg dt-leg--b" d="M-8.6 -18 L-8 -9 L-8.6 0 L-6.8 0 L-6.4 -9 L-6.6 -18 Z"/>
      <path class="dt-leg dt-leg--b" d="M6 -18 L6.6 -9 L6 0 L7.8 0 L8.2 -9 L8 -18 Z"/>
      <path class="dt-leg dt-leg--a" d="M9.4 -18 L10 -9 L9.4 0 L11.2 0 L11.6 -9 L11.4 -18 Z"/>
    </g>
    <path d="M-14.6 -22 C-16.5 -19 -16.8 -15 -16 -12" fill="none" stroke="currentColor" stroke-width="0.8"/>
    ${pack}`;
}

/** 걸어가는 사람 (낙타를 끄는 상인) */
function walker(): string {
  return `<circle cx="0" cy="-20" r="2.4"/><path d="M-2.4 -17.6 L2.6 -17.6 L4 0 L-3.6 0 Z"/><path d="M2 -16 L9 -9" fill="none" stroke="currentColor" stroke-width="0.9"/><path d="M-1 -22 L0 -26 L1 -22" fill="none" stroke="currentColor" stroke-width="0.8"/>`;
}

/** 대상(隊商): 상인들과 짐 실은 낙타들이 한 줄로 길을 따라 왼쪽(애굽 쪽)으로 */
function caravan(): string {
  const order = ['man', 'camel', 'camel', 'camel', 'man', 'camel', 'camel', 'camel', 'camel', 'man', 'camel', 'camel'];
  let x = 0;
  const units = order.map((k, i) => {
    const g = `<g transform="translate(${x} 0) scale(-1 1)">${k === 'man' ? walker() : camelWalking(true, 360 + i)}</g>`;
    x += k === 'man' ? 18 : 40;
    return g;
  }).join('');
  // 하나하나 왼쪽을 보게 뒤집어 세우고(앞장선 사람이 맨 왼쪽), 줄 전체가 길을 따라 아주 천천히 지나간다
  return `<g class="dt-caravan">
    <ellipse class="dt-caravan__dust" cx="${(x / 2).toFixed(0)}" cy="-2" rx="${(x * 0.6).toFixed(0)}" ry="6"/>
    <g class="bd-far dt-caravan__line">${units}</g>
  </g>`;
}

function dothanField(withCaravan: boolean): string {
  const road = 214;
  return `
    <circle class="bd-halo" cx="300" cy="150" r="140"/>
    ${hills(196, 'bd-far', 351)}
    ${city(108, 200, 352, 0.9)}
    <path class="bd-far" d="M-800 260 L-800 208 C-500 204 -200 212 60 208 C180 205 280 210 400 207 C700 203 900 210 1200 207 L1200 260 Z"/>
    ${sheep(300, 210, 353)}${sheep(-80, 208, 354)}
    <path class="dt-road" d="M-800 ${road + 3} C-400 ${road + 1} -100 ${road + 4} 120 ${road + 1} C240 ${road - 1} 340 ${road + 2} 520 ${road - 2} C800 ${road - 5} 1000 ${road - 3} 1200 ${road - 6}"/>
    ${withCaravan ? `<g transform="translate(0 ${road + 2})">${caravan()}</g>` : ''}
    <path class="bd-mid" d="M-800 260 L-800 230 C-500 226 -200 234 40 230 C140 228 260 233 400 229 C700 225 900 232 1200 230 L1200 260 Z"/>
    ${sheep(80, 230, 355)}${sheep(470, 232, 356)}
    ${pit(200, GROUND)}
    ${rocks([96, 128, 290, 320, -40, 20, 420, 470], 250, 'bd-mid', 357)}
    ${tree(58, 262, 120, 'bd-near', 358, { lean: 0.15, sway: true })}${tree(-150, 262, 150, 'bd-near', 359, { lean: 0.2, sway: true })}
    ${tree(560, 262, 150, 'bd-near', 360, { lean: -0.2, sway: true })}
    ${thorns(330, 256, 16, 'bd-near', 361)}${thorns(122, 258, 12, 'bd-near', 362)}
    ${rocks([-60, 10, 400, 452], 266, 'bd-near', 363, 1.8)}`;
}

// ── 구덩이 안 ────────────────────────────────────

/** 구덩이 안: 둥근 돌벽에 둘러싸이고, 위로 동그란 하늘 한 조각. 그 빛이 바닥까지 비스듬히 내려온다 */
function cisternArt(): string {
  const r = rng(371);
  const hole = { cx: 200, cy: 34, rx: 74, ry: 24 };
  // 벽: 큰 사각형에서 하늘 구멍을 도려낸다 (evenodd)
  const wall = `M-800 -120 L1200 -120 L1200 380 L-800 380 Z M${hole.cx - hole.rx} ${hole.cy} A${hole.rx} ${hole.ry} 0 1 0 ${hole.cx + hole.rx} ${hole.cy} A${hole.rx} ${hole.ry} 0 1 0 ${hole.cx - hole.rx} ${hole.cy} Z`;
  // 돌 쌓은 줄: 아래로 갈수록 넓어지는 타원 호 (병 모양 구덩이)
  const courses = Array.from({ length: 11 }, (_, i) => {
    const t = (i + 1) / 11;
    const y = hole.cy + 10 + t * 196;
    const rx = hole.rx + 10 + t * 150;
    const ry = hole.ry * (0.9 - t * 0.3);
    return `<path d="M${hole.cx - rx} ${y.toFixed(1)} A${rx} ${ry.toFixed(1)} 0 0 0 ${hole.cx + rx} ${y.toFixed(1)}"/>`;
  }).join('');
  // 돌 이음매 (짧은 세로 금)
  const joints = Array.from({ length: 70 }, () => {
    const t = r();
    const y = hole.cy + 18 + t * 190;
    const x = hole.cx + (r() - 0.5) * (hole.rx + t * 150) * 2;
    return `M${x.toFixed(1)} ${y.toFixed(1)} l${((r() - 0.5) * 2).toFixed(1)} ${(6 + t * 10).toFixed(1)}`;
  }).join(' ');
  const motes = Array.from({ length: 18 }, () => `<circle class="dt-mote" style="--d:${(r() * 9).toFixed(2)}s; --x:${((r() - 0.5) * 16).toFixed(1)}px" cx="${(178 + r() * 52).toFixed(1)}" cy="${(70 + r() * 150).toFixed(1)}" r="${(0.4 + r() * 0.6).toFixed(2)}"/>`).join('');
  return `
    <defs>
      <linearGradient id="dt-shaft-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" class="dt-shaft__top"/><stop offset="1" class="dt-shaft__bot"/>
      </linearGradient>
      <radialGradient id="dt-floor-g"><stop offset="0" class="dt-floor__c"/><stop offset="1" class="dt-floor__e"/></radialGradient>
    </defs>
    <path class="dt-wall" fill-rule="evenodd" d="${wall}"/>
    <g class="dt-courses">${courses}</g>
    <path class="dt-joints" d="${joints}"/>
    <ellipse class="dt-rim" cx="${hole.cx}" cy="${hole.cy}" rx="${hole.rx}" ry="${hole.ry}"/>
    <path class="dt-shaft" d="M${hole.cx - hole.rx + 18} ${hole.cy + 6} L${hole.cx + hole.rx - 30} ${hole.cy + 8} L${hole.cx + 62} 262 L${hole.cx - 46} 262 Z"/>
    <ellipse class="dt-floor" cx="${hole.cx + 8}" cy="252" rx="110" ry="22"/>
    <g class="dt-motes">${motes}</g>
    ${rocks([110, 150, 262, 300], 258, 'dt-floorstone', 372, 1.2)}`;
}

export function dothanArt(kind: 'sheaves' | 'eleven-stars' | 'dothan' | 'dothan-caravan' | 'cistern'): string {
  if (kind === 'sheaves') return sheavesArt();
  if (kind === 'eleven-stars') return elevenStarsArt();
  if (kind === 'cistern') return cisternArt();
  return dothanField(kind === 'dothan-caravan');
}

