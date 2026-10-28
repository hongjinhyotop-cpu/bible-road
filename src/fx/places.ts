// B급 에피소드용 배경 라이브러리 (장소 유형). 목록·설명은 engine/moods.ts의 PLACES.
// 1막 배경과 같은 종이 오려낸 그림자극 말투: 멀수록 하늘색(bd-far), 가까울수록 어두운 잉크(bd-near).
// 색은 전부 막 테마 변수에서 나오므로, 같은 그림이 막마다 다른 색으로 재사용된다.
// 폰(세로 화면)에서는 그림 가운데 x 110~290만 보인다 → 장소를 알아볼 것(장막·산·우물 …)은 이 안에 두고,
// 인물이 서는 가운데 아래는 낮게 비워 둔다. PC(가로 화면)에서는 양옆(-400~800)까지 보이니 거기도 채운다.
// 주의: backdrop.ts와 서로 불러오므로, 여기서는 맨 위에서 그림 함수를 바로 부르지 않는다 (함수 안에서만).
import type { PlaceArt } from '../engine/moods';
import { H, W, WIDE_SIDES, city, hills, palm, reeds, rng, sheep, smoke, tent, thorns, tree, treeline } from './backdrop';

/** 큰 장막 (아브라함의 장막): 기둥 셋, 처진 지붕, 열린 입구로 등잔 불빛 */
function bigTent(x: number, ground: number, s: number, cls = 'bd-near'): string {
  return `<g class="${cls} bd-tent" transform="translate(${x} ${ground}) scale(${s})">
    <path d="M-62 0 L-54 -26 L-30 -40 L-18 -34 L0 -46 L18 -34 L30 -40 L54 -26 L62 0 Z"/>
    <path class="bd-tent__door" d="M-10 0 L-8 -26 L0 -30 L8 -26 L10 0 Z"/>
    <path d="M-70 0 L-54 -26 M70 0 L54 -26 M-40 0 L-30 -40 M40 0 L30 -40" fill="none" stroke="currentColor" stroke-width="0.8"/>
  </g>`;
}

/** 흩어진 돌 몇 개 */
function stones(xs: number[], ground: number, cls: string, seed: number): string {
  const r = rng(seed);
  return `<g class="${cls}">${xs.map((x) => `<ellipse cx="${x}" cy="${ground - 1}" rx="${(3 + r() * 5).toFixed(1)}" ry="${(1.6 + r() * 2).toFixed(1)}"/>`).join('')}</g>`;
}

/** 쉬는 낙타 (무릎 꿇은 옆모습) */
function camel(x: number, ground: number, s: number, cls: string, flip = false): string {
  return `<g class="${cls}" transform="translate(${x} ${ground}) scale(${flip ? -s : s} ${s})">
    <path d="M-16 0 C-18 -6 -16 -10 -10 -12 C-8 -18 -2 -20 2 -16 C4 -12 8 -11 10 -13 C12 -18 13 -24 15 -27 C17 -29 20 -29 21 -27 L22 -25 L19 -24 C18 -20 17 -14 16 -8 C16 -4 14 0 10 0 Z"/>
  </g>`;
}

/** 꼭대기가 평평한 바위산 (광야) */
function mesa(x: number, ground: number, w: number, h: number, cls: string): string {
  return `<path class="${cls}" d="M${x - w} ${ground} L${x - w * 0.7} ${ground - h * 0.6} L${x - w * 0.55} ${ground - h} L${x + w * 0.5} ${ground - h} L${x + w * 0.62} ${ground - h * 0.55} L${x + w} ${ground} Z"/>`;
}

/** 모래 능선 */
function dunes(y: number, cls: string, seed: number): string {
  const r = rng(seed);
  let d = `M${-W * 2} ${H} L${-W * 2} ${y}`;
  for (let x = -W * 2; x < W * 3; x += 120) {
    const top = y - 8 - r() * 14;
    d += ` Q${x + 40} ${top} ${x + 70} ${y - r() * 4} Q${x + 95} ${y + 2} ${x + 120} ${y - r() * 3}`;
  }
  return `<path class="${cls}" d="${d} L${W * 3} ${H} Z"/>`;
}

/** 성벽 + 성문 + 망대 (성읍) */
function wall(x0: number, x1: number, ground: number, h: number, cls: string, gateX: number | null, seed: number): string {
  const r = rng(seed);
  const merlons: string[] = [];
  for (let x = x0; x < x1; x += 8) merlons.push(`<rect x="${x}" y="${ground - h - 4}" width="5" height="5"/>`);
  const towers = [x0 + 10, (x0 + x1) / 2 - 40, (x0 + x1) / 2 + 40, x1 - 10].map((tx) => `<rect x="${tx - 8}" y="${ground - h - 14}" width="16" height="${h + 14}"/>`).join('');
  const gate = gateX == null ? '' : `<path class="bd-gate" d="M${gateX - 9} ${ground} L${gateX - 9} ${ground - h * 0.62} Q${gateX} ${ground - h * 0.95} ${gateX + 9} ${ground - h * 0.62} L${gateX + 9} ${ground} Z"/>`;
  const lights = Array.from({ length: 7 }, () => `<rect class="bd-window" style="--d:${(r() * 4).toFixed(2)}s" x="${(x0 + 10 + r() * (x1 - x0 - 20)).toFixed(1)}" y="${(ground - h * (0.3 + r() * 0.5)).toFixed(1)}" width="1.8" height="2.4"/>`).join('');
  return `<g class="${cls}"><rect x="${x0}" y="${ground - h}" width="${x1 - x0}" height="${h}"/>${merlons.join('')}${towers}</g>${gate}${lights}`;
}

/** 성 안의 집들 (성벽 위로 보이는 네모난 지붕) */
function houses(x0: number, x1: number, base: number, cls: string, seed: number): string {
  const r = rng(seed);
  const out: string[] = [];
  for (let x = x0; x < x1; ) {
    const w = 10 + r() * 16;
    const h = 6 + r() * 14;
    out.push(`<rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${w.toFixed(1)}" height="${(h + 2).toFixed(1)}"/>`);
    x += w + 1 + r() * 4;
  }
  return `<g class="${cls}">${out.join('')}</g>`;
}

/** 기둥 하나 (궁전·성전): 받침 + 몸통 + 머리 */
function column(x: number, top: number, bottom: number, w: number, cls: string): string {
  return `<g class="${cls}">
    <rect x="${x - w * 0.75}" y="${bottom - 6}" width="${w * 1.5}" height="6"/>
    <rect x="${x - w / 2}" y="${top + 8}" width="${w}" height="${bottom - top - 14}"/>
    <path d="M${x - w} ${top + 8} L${x + w} ${top + 8} L${x + w * 0.7} ${top} L${x - w * 0.7} ${top} Z"/>
    <path class="detail" d="M${x - w * 0.2} ${top + 10} V${bottom - 8} M${x + w * 0.2} ${top + 10} V${bottom - 8}" fill="none" stroke-width="0.6"/>
  </g>`;
}

/** 화로: 받침 위의 불 (궁전 양옆) */
function brazier(x: number, ground: number, s: number): string {
  return `<g transform="translate(${x} ${ground}) scale(${s})">
    <g class="bd-near"><path d="M-6 0 L-3 -16 L3 -16 L6 0 Z"/><path d="M-10 -16 L10 -16 L7 -22 L-7 -22 Z"/></g>
    <path class="bd-flicker" d="M-6 -22 Q-5 -34 0 -40 Q2 -32 6 -30 Q7 -26 6 -22 Z"/>
    <circle class="bd-firelight" cx="0" cy="-30" r="26"/>
  </g>`;
}

/** 실내 바닥과 뒷벽 (실내 장소의 공통 틀) */
function room(wallCls: string, floorY: number): string {
  return `<rect class="${wallCls}" x="${-W * 2}" y="0" width="${W * 5}" height="${floorY}"/>
    <rect class="bd-floor" x="${-W * 2}" y="${floorY}" width="${W * 5}" height="${H - floorY}"/>
    <path class="bd-floor-line" d="M${-W * 2} ${floorY} H${W * 3}"/>`;
}

/** 창으로 들어오는 비스듬한 빛줄기 */
function shaft(x: number, y: number, w: number, h: number): string {
  return `<path class="bd-shaft" d="M${x} ${y} L${x + w} ${y} L${x + w + h * 0.5} ${y + h} L${x + h * 0.5 - w * 0.4} ${y + h} Z"/>`;
}

/** 별 (밤하늘). 일부는 반짝인다 */
function starfield(n: number, maxY: number, seed: number): string {
  const r = rng(seed);
  return `<g class="bd-stars">${Array.from({ length: n }, () => {
    const big = r() < 0.12;
    return `<circle class="bd-star${big ? ' is-big' : ''}" style="--d:${(r() * 6).toFixed(2)}s" cx="${(-W * 1.5 + r() * W * 4).toFixed(1)}" cy="${(r() * maxY).toFixed(1)}" r="${(big ? 1.1 + r() * 0.6 : 0.35 + r() * 0.5).toFixed(2)}"/>`;
  }).join('')}</g>`;
}

/** 물결 줄 (바다·강) */
function waves(y0: number, rows: number, gap: number, seed: number): string {
  const r = rng(seed);
  return Array.from({ length: rows }, (_, i) => {
    const y = y0 + i * gap * (1 + i * 0.25);
    return `<path class="bd-wave" style="--d:${(r() * 5).toFixed(2)}s; --w:${(0.5 + i * 0.25).toFixed(2)}" d="M${-W * 2} ${y.toFixed(1)} ${Array.from({ length: Math.ceil(2000 / (24 + i * 12)) }, () => `q${6 + i * 3} ${-(1.2 + i * 0.6)} ${12 + i * 6} 0 t${12 + i * 6} 0`).join(' ')}"/>`;
  }).join('');
}

/** 구름 기둥 (출 13:21; 40:36-38): 땅(성막)에서 하늘 끝까지 서는 흰 기둥. 밤(tone night)에는 불빛으로 바뀐다 (library.css) */
function cloudPillar(x: number, base: number, w: number, seed: number): string {
  const r = rng(seed);
  const puffs = Array.from({ length: 9 }, (_, i) => {
    const y = base - 14 - i * ((base + 20) / 9);
    const rw = w * (0.55 + i * 0.07) * (0.85 + r() * 0.3);
    return `<ellipse class="bd-pillar__puff" style="--d:${(r() * 6).toFixed(2)}s" cx="${(x + (r() - 0.5) * w * 0.4).toFixed(1)}" cy="${y.toFixed(1)}" rx="${rw.toFixed(1)}" ry="${(rw * 0.55).toFixed(1)}"/>`;
  }).join('');
  return `<g class="bd-pillar">
    <ellipse class="bd-pillar__glow" cx="${x}" cy="${base - 60}" rx="${w * 3}" ry="${base * 0.6}"/>
    <path class="bd-pillar__body" d="M${x - w * 0.4} ${base} C${x - w * 0.5} ${base * 0.6} ${x - w * 0.7} ${base * 0.3} ${x - w} -20 L${x + w} -20 C${x + w * 0.7} ${base * 0.3} ${x + w * 0.5} ${base * 0.6} ${x + w * 0.4} ${base} Z"/>
    ${puffs}
  </g>`;
}

/** 세마포 울타리 한 면 (출 27:9-18): 놋 받침 위 기둥들 + 흰 휘장 띠. (x0,y0)→(x1,y1) 바닥선, 높이 h0→h1 */
function linenFence(x0: number, y0: number, x1: number, y1: number, h0: number, h1: number, n: number, cls = 'bd-mid'): string {
  const pt = (t: number) => [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, h0 + (h1 - h0) * t];
  const band = `M${x0} ${y0} L${x1} ${y1} L${x1} ${y1 - h1} L${x0} ${y0 - h0} Z`;
  const posts = Array.from({ length: n + 1 }, (_, i) => {
    const [x, y, h] = pt(i / n);
    const pw = Math.max(1.2, h * 0.08);
    return `<rect x="${(x - pw / 2).toFixed(1)}" y="${(y - h - 2).toFixed(1)}" width="${pw.toFixed(1)}" height="${(h + 2).toFixed(1)}"/>`;
  }).join('');
  const caps = Array.from({ length: n + 1 }, (_, i) => {
    const [x, y, h] = pt(i / n);
    return `<circle cx="${x.toFixed(1)}" cy="${(y - h - 2).toFixed(1)}" r="${Math.max(0.8, h * 0.06).toFixed(1)}"/>`;
  }).join('');
  return `<path class="bd-linen" d="${band}"/><g class="${cls}">${posts}</g><g class="bd-silver">${caps}</g>`;
}

/** 놋 번제단 (작게, 배경용): 네 뿔 + 숯불 + 연기 */
function bronzeAltarBg(x: number, ground: number, s: number, seed: number): string {
  const horn = (dx: number, flip: boolean) => `<path transform="translate(${dx} -22) scale(${flip ? -1 : 1} 1)" d="M-3 0 C-4.5 -4 -3 -8 1 -9 C-0.5 -6 1 -3 3 0 Z"/>`;
  return `${smoke(x, ground - 24 * s, seed, 7)}
    <g class="bd-bronze" transform="translate(${x} ${ground}) scale(${s})">
      ${horn(-18, false)}${horn(18, true)}
      <rect x="-22" y="-22" width="44" height="22"/>
      <path class="detail" d="M-22 -10 H22 M-22 -6 H22" fill="none" stroke-width="0.6"/>
    </g>
    <ellipse class="bd-ember" cx="${x}" cy="${ground - 22 * s}" rx="${16 * s}" ry="${2.4 * s}"/>`;
}

/** 성막 정면 (동쪽 문 휘장 + 금 기둥 다섯, 위로 덮개) */
function tabernacleFront(x: number, ground: number, s: number, cls = 'bd-mid'): string {
  return `<g transform="translate(${x} ${ground}) scale(${s})">
    <g class="${cls}"><rect x="-30" y="-54" width="60" height="54"/><path d="M-36 -52 Q0 -62 36 -52 L36 -47 L-36 -47 Z"/></g>
    <g class="bd-screen">${Array.from({ length: 12 }, (_, i) => `<rect class="bd-thread--${'bpsl'[i % 4]}" x="${(-22 + i * (44 / 12)).toFixed(2)}" y="-46" width="${(44 / 12 + 0.2).toFixed(2)}" height="46"/>`).join('')}</g>
    <g class="bd-goldpost">${[-22, -11, 0, 11, 22].map((px) => `<rect x="${px - 1}" y="-47" width="2" height="47"/>`).join('')}</g>
  </g>`;
}

/** 광야 진의 작은 장막 (지붕 뾰족, 문 틈 불빛) — 줄지어 세울 때 */
function campTent(x: number, ground: number, s: number, cls: string): string {
  return `<g class="${cls} bd-tent" transform="translate(${x.toFixed(1)} ${ground}) scale(${s})">
    <path d="M-12 0 L-9 -7 L0 -11 L9 -7 L12 0 Z"/><path class="bd-tent__door" d="M-1.8 0 L0 -7 L1.8 0 Z"/></g>`;
}

/** 진의 한 줄: x 범위 안에 고르게(조금씩 흔들려) 세우고, skip 구간은 비운다 */
function campRow(ground: number, s: number, step: number, cls: string, seed: number, skip: [number, number]): string {
  const r = rng(seed);
  let out = '';
  for (let x = -W * 2 + r() * step; x < W * 3; x += step * (0.8 + r() * 0.4)) {
    if (x > skip[0] && x < skip[1]) continue;
    out += campTent(x, ground + (r() - 0.5) * 2, s * (0.85 + r() * 0.3), cls);
  }
  return out;
}

/** 지파 깃발 (민 2:2 "각각 그 기와 그 종족의 기호 곁에 진을 치되"): 장대 + 펄럭이는 천 */
function banner(x: number, ground: number, h: number, kind: number, cls = 'bd-near'): string {
  const fw = h * 0.36;
  const top = ground - h;
  return `<g><path class="${cls}" d="M${x - 0.8} ${ground} V${top} h1.6 V${ground} Z"/>
    <path class="bd-flag bd-flag--${kind}" style="--d:${(kind * 0.7).toFixed(1)}s" d="M${x + 0.8} ${top + 1} C${x + fw * 0.4} ${top - 1} ${x + fw * 0.7} ${top + 3} ${x + fw} ${top + 1.5} L${x + fw} ${top + fw * 0.62} C${x + fw * 0.7} ${top + fw * 0.66 + 1.5} ${x + fw * 0.4} ${top + fw * 0.6 - 1.5} ${x + 0.8} ${top + fw * 0.64} Z"/></g>`;
}

/** 상수리나무 숲 가장자리의 큰 나무들 (양옆) */
const SIDE_OAKS = () => `
  ${tree(-20, 262, 200, 'bd-near', 301, { lean: 0.25, sway: true })}
  ${tree(420, 262, 210, 'bd-near', 302, { lean: -0.25, sway: true })}`;

export const PLACE_ART: Record<PlaceArt, () => string> = {
  tent: () => `
    ${hills(204, 'bd-far', 401)}
    ${tree(258, 206, 40, 'bd-far', 402, { sway: true })}
    ${sheep(160, 205, 403)}${sheep(-160, 207, 404)}${sheep(520, 206, 408)}
    ${hills(222, 'bd-mid', 405)}
    ${bigTent(205, 224, 1.05, 'bd-mid')}
    ${bigTent(-120, 238, 1.1, 'bd-mid')}${tent(560, 232, 1.1)}
    ${tent(126, 246, 1.15)}
    ${bigTent(312, 254, 1.35)}
    ${stones([170, 236], 254, 'bd-near', 406)}
    ${tree(-40, 262, 190, 'bd-near', 407, { lean: 0.2, sway: true })}${tree(600, 262, 170, 'bd-near', 409, { lean: -0.2, sway: true })}`,
  well: () => `
    ${hills(206, 'bd-far', 411)}
    ${palm(300, 214, 44, 'bd-far', 412)}${palm(320, 216, 36, 'bd-far', 413)}
    ${city(70, 212, 414, 1.1)}
    ${hills(226, 'bd-mid', 415)}
    ${camel(-40, 242, 1.5, 'bd-mid')}${camel(10, 244, 1.3, 'bd-mid', true)}${camel(470, 242, 1.5, 'bd-mid', true)}
    <g class="bd-near bd-well">
      <path d="M176 238 L176 214 C176 208 224 208 224 214 L224 238 Z"/>
      <ellipse cx="200" cy="214" rx="24" ry="5"/>
      <path class="detail" d="M176 222 H224 M176 230 H224 M188 214 V222 M206 222 V230 M194 230 V238 M214 214 V222" fill="none" stroke-width="0.8"/>
    </g>
    <ellipse class="bd-water" cx="200" cy="214" rx="18" ry="2.6"/>
    <g class="bd-near"><path d="M232 240 L236 230 L270 230 L274 240 Z"/></g>
    ${palm(-80, 262, 120, 'bd-near', 416)}${palm(480, 262, 126, 'bd-near', 417)}`,
  wilderness: () => `
    ${mesa(150, 212, 46, 40, 'bd-far')}${mesa(268, 214, 52, 28, 'bd-far')}${mesa(-120, 210, 80, 40, 'bd-far')}${mesa(520, 212, 70, 30, 'bd-far')}
    ${dunes(226, 'bd-mid', 421)}
    ${thorns(122, 250, 18, 'bd-near', 422)}${thorns(284, 252, 20, 'bd-near', 423)}${thorns(-90, 246, 22, 'bd-near', 424)}${thorns(500, 248, 20, 'bd-near', 425)}
    ${stones([150, 250, 20, 420, -140], 256, 'bd-near', 426)}
    <path class="bd-near" d="M-800 260 L-800 250 C-600 244 -420 252 -300 248 L-240 236 L-200 248 C-60 254 40 250 112 256 L112 260 Z"/>
    <path class="bd-near" d="M288 260 L288 254 C330 250 360 252 380 240 L420 232 L460 246 C700 252 900 248 1200 250 L1200 260 Z"/>`
  + `<path class="bd-ridge" d="M126 182 L170 182 M243 186 L294 186"/>`,
  town: () => `
    ${hills(200, 'bd-far', 431)}
    ${houses(70, 330, 196, 'bd-far', 432)}
    ${wall(60, 340, 214, 22, 'bd-mid', 200, 433)}
    ${palm(30, 222, 40, 'bd-mid', 434)}${palm(372, 224, 44, 'bd-mid', 435)}
    ${hills(232, 'bd-mid', 436)}
    <path class="bd-road" d="M200 214 C196 226 180 240 150 262"/>
    ${palm(-90, 262, 120, 'bd-near', 437)}${palm(500, 262, 124, 'bd-near', 438)}
    ${stones([100, 300, 40, 360], 254, 'bd-near', 439)}`,
  palace: () => `
    ${room('bd-wall', 236)}
    <path class="bd-curtain" d="M${-W * 2} 0 H${W * 3} V18 ${Array.from({ length: 30 }, (_, i) => `Q${-W * 2 + i * 40 + 20} 40 ${-W * 2 + i * 40 + 40} 18`).join(' ')} Z"/>
    ${[-160, -80, 0, 80, 320, 400, 480, 560].map((x) => column(x, 30, 236, 18, 'bd-mid')).join('')}
    ${column(122, 30, 236, 14, 'bd-mid')}${column(278, 30, 236, 14, 'bd-mid')}
    <g class="bd-mid"><rect x="150" y="196" width="100" height="8"/><path d="M168 196 L168 160 C168 150 232 150 232 160 L232 196 Z"/></g>
    <g class="bd-near"><rect x="${-W * 2}" y="240" width="${W * 5}" height="6"/><rect x="${-W * 2}" y="250" width="${W * 5}" height="6"/></g>
    ${brazier(146, 240, 1)}${brazier(254, 240, 1)}${brazier(-40, 240, 1.2)}${brazier(440, 240, 1.2)}`,
  temple: () => `
    ${hills(212, 'bd-far', 441)}
    <g class="bd-far">
      <rect x="120" y="96" width="160" height="124"/>
      <path d="M110 96 L290 96 L290 88 L110 88 Z"/>
      <rect x="182" y="150" width="36" height="70"/>
    </g>
    <path class="bd-gate" d="M184 220 L184 152 L216 152 L216 220 Z"/>
    ${column(152, 110, 222, 12, 'bd-mid')}${column(248, 110, 222, 12, 'bd-mid')}
    <g class="bd-mid">
      ${Array.from({ length: 4 }, (_, i) => `<rect x="${100 - i * 14}" y="${222 + i * 6}" width="${200 + i * 28}" height="6"/>`).join('')}
    </g>
    <g class="bd-near"><rect x="-30" y="226" width="40" height="22"/><rect x="-36" y="222" width="52" height="6"/></g>
    ${smoke(-10, 220, 442, 6)}
    <ellipse class="bd-ember" cx="-10" cy="222" rx="16" ry="2.6"/>
    ${tree(-160, 262, 140, 'bd-near', 443, { sway: true })}${tree(540, 262, 150, 'bd-near', 444, { sway: true })}`,
  sea: () => `
    <rect class="bd-seafar" x="${-W * 2}" y="196" width="${W * 5}" height="${H}"/>
    <path class="bd-horizon" d="M${-W * 2} 196 H${W * 3}"/>
    <g class="bd-far bd-sail"><path d="M300 192 L300 172 L312 190 Z"/><path d="M294 192 L316 192 L312 196 L297 196 Z"/></g>
    ${waves(204, 6, 9, 451)}
    <path class="bd-near" d="M-800 260 L-800 226 C-500 222 -200 236 -60 232 C10 230 40 244 70 262 Z"/>
    <path class="bd-near" d="M330 262 C350 246 380 234 440 230 C600 226 900 232 1200 228 L1200 260 Z"/>
    ${stones([40, 360, 20, 380], 258, 'bd-near', 452)}`,
  starfield: () => `
    ${starfield(140, 190, 461)}
    <circle class="bd-moon" cx="262" cy="40" r="7"/>
    ${hills(214, 'bd-far', 462)}
    ${hills(234, 'bd-mid', 463)}
    ${tent(150, 238, 0.9)}`,
  mountain: () => `
    <path class="bd-far" d="M-800 260 L-800 200 L-500 180 L-300 196 L-120 176 L40 198 L360 196 L520 172 L700 192 L1200 186 L1200 260 Z"/>
    <path class="bd-mid" d="M-200 260 L60 214 C110 176 150 120 190 70 C196 63 204 63 210 70 C250 120 290 176 340 214 L600 260 Z"/>
    <path class="bd-ridge" d="M190 70 C196 63 204 63 210 70 M160 120 L176 104 M236 112 L252 128" />
    <g class="bd-cloud"><ellipse cx="200" cy="70" rx="46" ry="9"/><ellipse cx="170" cy="78" rx="30" ry="6"/><ellipse cx="236" cy="76" rx="34" ry="7"/></g>
    ${hills(238, 'bd-mid', 471)}
    ${stones([80, 320, -40, 440], 254, 'bd-near', 472)}
    ${thorns(30, 252, 16, 'bd-near', 473)}${thorns(380, 252, 18, 'bd-near', 474)}`,
  road: () => `
    ${hills(206, 'bd-far', 481)}
    ${tree(132, 208, 30, 'bd-far', 482, { sway: true })}${tree(286, 210, 36, 'bd-far', 483, { sway: true })}${tree(-60, 210, 34, 'bd-far', 488, { sway: true })}
    ${hills(226, 'bd-mid', 484)}
    <path class="bd-path" d="M150 262 C176 248 204 238 210 228 C216 218 236 212 252 206 L256 206 C242 212 226 220 222 230 C216 242 214 252 262 262 Z"/>
    <path class="bd-ridge" d="M176 250 C196 240 208 232 212 226 M246 256 C228 246 222 238 224 230"/>
    <g class="bd-near"><ellipse cx="282" cy="250" rx="10" ry="4.4"/><ellipse cx="282" cy="243" rx="7.6" ry="3.6"/><ellipse cx="282" cy="237" rx="5.2" ry="2.8"/><ellipse cx="282" cy="232" rx="3" ry="2"/></g>
    ${tree(-80, 262, 160, 'bd-near', 485, { lean: 0.2, sway: true })}${tree(500, 262, 170, 'bd-near', 486, { lean: -0.2, sway: true })}
    ${stones([120, 300, 10], 256, 'bd-near', 487)}`,
  river: () => `
    ${hills(200, 'bd-far', 491)}
    ${treeline(212, 14, 'bd-mid', 492)}
    <path class="bd-riverbed" d="M${-W * 2} 222 C-200 218 0 226 200 222 C400 218 600 226 ${W * 3} 222 L${W * 3} 240 C600 244 400 236 200 240 C0 244 -200 236 ${-W * 2} 240 Z"/>
    <path class="bd-river" d="M-600 228 C-420 224 -260 232 -100 228 C40 224 160 232 300 227 C440 222 600 230 900 226"/>
    <path class="bd-river" d="M-600 234 C-420 230 -260 238 -100 234 C40 230 160 238 300 233 C440 228 600 236 900 232" style="animation-duration: 9s"/>
    ${stones([180, 196, 214, 230], 236, 'bd-mid', 493)}
    ${reeds(124, 262, 46, 'bd-near', 494)}${reeds(282, 262, 50, 'bd-near', 495)}${reeds(-120, 262, 52, 'bd-near', 496)}${reeds(520, 262, 52, 'bd-near', 497)}`,
  house: () => `
    ${room('bd-wall', 232)}
    <rect class="bd-window-frame" x="250" y="70" width="34" height="40" rx="2"/>
    ${shaft(250, 70, 34, 170)}
    <g class="bd-mid">
      <rect x="40" y="120" width="70" height="4"/>
      <path d="M50 120 C46 112 48 104 54 102 L60 102 C66 104 68 112 64 120 Z M80 120 C76 110 78 100 86 98 L92 98 C100 100 102 110 96 120 Z"/>
      <path d="M-60 232 C-64 216 -60 200 -48 196 L-36 196 C-24 200 -20 216 -24 232 Z"/>
      <rect x="140" y="214" width="120" height="6"/><rect x="150" y="220" width="6" height="12"/><rect x="244" y="220" width="6" height="12"/>
    </g>
    <path class="bd-lampflame" d="M196 206 Q198 198 200 194 Q202 198 204 206 Z"/>
    <circle class="bd-firelight" cx="200" cy="202" r="40"/>
    <g class="bd-near"><path d="M188 214 C188 208 212 208 212 214 Z"/></g>`,
  prison: () => `
    ${room('bd-stone', 236)}
    <g class="bd-mid bd-blocks">${Array.from({ length: 9 }, (_, row) => Array.from({ length: 30 }, (_, i) => `<rect x="${-W * 2 + i * 40 + (row % 2) * 20}" y="${row * 26}" width="38" height="24" rx="2"/>`).join('')).join('')}</g>
    <rect class="bd-window-frame" x="270" y="40" width="40" height="26"/>
    <g class="bd-near">${[278, 286, 294, 302].map((x) => `<rect x="${x}" y="40" width="2.4" height="26"/>`).join('')}</g>
    ${shaft(270, 66, 40, 170)}
    <g class="bd-near"><rect x="${-W * 2}" y="236" width="${W * 5}" height="30"/></g>`,
  oaks: () => `
    ${treeline(200, 26, 'bd-far', 501)}
    ${tree(120, 214, 70, 'bd-mid', 502, { sway: true })}${tree(300, 216, 80, 'bd-mid', 503, { sway: true })}
    ${treeline(220, 14, 'bd-mid', 504)}
    ${tent(250, 232, 0.8)}
    ${SIDE_OAKS()}
    ${WIDE_SIDES}`,
  cave: () => `
    ${hills(198, 'bd-far', 511)}
    <path class="bd-mid" d="M-200 262 L-60 214 C20 170 120 140 200 138 C280 140 380 170 460 214 L600 262 Z"/>
    <path class="bd-cave" d="M164 236 C162 206 176 186 200 184 C224 186 238 206 236 236 Z"/>
    <path class="bd-ridge" d="M100 180 L130 166 M280 170 L312 186" />
    ${tree(30, 214, 50, 'bd-mid', 512, { sway: true })}${tree(372, 214, 56, 'bd-mid', 513, { sway: true })}
    ${stones([140, 260, 90, 320], 248, 'bd-near', 514)}
    ${tree(-100, 262, 160, 'bd-near', 515, { lean: 0.2, sway: true })}${tree(520, 262, 160, 'bd-near', 516, { lean: -0.2, sway: true })}`,
  ruins: () => `
    ${hills(206, 'bd-far', 521)}
    <g class="bd-mid">
      <path d="M118 220 L118 182 L130 176 L134 194 L148 190 L150 220 Z"/>
      <path d="M252 222 L252 172 L264 166 L268 186 L286 182 L290 198 L298 194 L298 222 Z"/>
      <path d="M-120 220 L-120 194 L-100 190 L-96 220 Z"/><path d="M480 222 L480 190 L500 196 L504 222 Z"/>
    </g>
    ${smoke(134, 178, 522, 6)}${smoke(272, 166, 523, 6)}${smoke(-110, 188, 524, 5)}
    <path class="bd-ash" d="M-800 260 L-800 226 C-500 222 -200 232 100 228 C300 224 500 232 800 226 L1200 230 L1200 260 Z"/>
    ${stones([120, 160, 240, 285, -40, 420], 250, 'bd-near', 525)}
    ${thorns(110, 254, 14, 'bd-near', 526)}${thorns(296, 254, 16, 'bd-near', 527)}`,
  pasture: () => `
    ${hills(196, 'bd-far', 531)}
    ${sheep(200, 199, 532)}${sheep(-60, 197, 533)}${sheep(460, 198, 541)}
    ${hills(214, 'bd-mid', 534)}
    ${sheep(150, 218, 535)}${sheep(-120, 216, 536)}${sheep(470, 218, 537)}
    <g class="bd-mid"><path d="M236 232 C236 220 296 220 296 232 Z"/><path class="detail" d="M242 228 H290 M246 224 H286" fill="none" stroke-width="0.8"/></g>
    ${tree(112, 262, 120, 'bd-near', 538, { lean: 0.15, sway: true })}${tree(300, 262, 130, 'bd-near', 539, { lean: -0.15, sway: true })}
    ${tree(-120, 262, 150, 'bd-near', 542, { lean: 0.2, sway: true })}${tree(540, 262, 150, 'bd-near', 543, { lean: -0.2, sway: true })}
    ${stones([170, 250], 256, 'bd-near', 540)}`,
  // 성막 뜰 (레위기·민수기): 뜰 안 동쪽 문 쪽에서 서쪽을 본다. 가운데 번제단과 연기, 뒤로 물두멍과 성막 정면(청·자·홍 문 휘장),
  // 그 위로 하늘 끝까지 구름 기둥. 세마포 울타리가 뒤와 양옆을 두르고, 넓은 화면에선 울타리 밖으로 진의 장막들이 이어진다
  tabernacle: () => `
    ${mesa(-200, 204, 110, 34, 'bd-far')}${mesa(620, 204, 100, 30, 'bd-far')}${mesa(40, 202, 50, 18, 'bd-far')}${mesa(372, 203, 44, 16, 'bd-far')}
    ${hills(206, 'bd-far', 601)}
    ${campRow(204, 0.55, 26, 'bd-mid', 602, [70, 330])}
    ${cloudPillar(200, 156, 22, 603)}
    <path class="bd-court" d="M${-W * 2} 262 L${-W * 2} 214 L90 214 L310 214 L${W * 3} 214 L${W * 3} 262 Z"/>
    ${linenFence(90, 214, 310, 214, 13, 13, 16)}
    ${tabernacleFront(200, 216, 1)}
    ${campRow(226, 0.9, 40, 'bd-mid', 604, [-60, 460])}
    ${linenFence(90, 214, -180, 262, 13, 26, 9)}${linenFence(310, 214, 580, 262, 13, 26, 9)}
    <g class="bd-bronze"><ellipse cx="246" cy="224" rx="9" ry="2.4"/><path d="M237 224 C238 230 254 230 255 224 Z"/><rect x="244.6" y="228" width="2.8" height="6"/><rect x="240" y="233" width="12" height="2" rx="1"/></g>
    <ellipse class="bd-water" cx="246" cy="223.6" rx="7" ry="1.4"/>
    ${bronzeAltarBg(200, 244, 1, 605)}
    ${stones([118, 286], 254, 'bd-near', 606)}
    ${banner(-150, 262, 120, 1)}${banner(560, 262, 110, 3)}
    ${tent(-300, 262, 1.6)}${tent(700, 262, 1.6)}`,
  // 광야의 진 (민 2): 성막을 가운데 두고 사방으로 늘어선 장막들, 지파 깃발, 하늘 끝까지 구름 기둥, 뒤로 바위산
  camp: () => `
    ${mesa(-260, 198, 120, 40, 'bd-far')}${mesa(96, 198, 60, 30, 'bd-far')}${mesa(312, 199, 70, 24, 'bd-far')}${mesa(640, 198, 110, 36, 'bd-far')}
    <path class="bd-far" d="M${-W * 2} 262 L${-W * 2} 200 C-300 198 0 202 200 200 C400 198 700 202 ${W * 3} 200 L${W * 3} 262 Z"/>
    ${cloudPillar(200, 192, 12, 611)}
    <g class="bd-far-court"><rect x="180" y="194" width="40" height="5"/></g>
    <g class="bd-mid"><rect x="193" y="185" width="16" height="10"/><path d="M190 186 Q201 182 212 186 L212 188 L190 188 Z"/></g>
    ${campRow(203, 0.42, 20, 'bd-mid', 612, [172, 228])}
    ${campRow(210, 0.62, 28, 'bd-mid', 613, [150, 250])}
    ${banner(150, 206, 22, 1, 'bd-mid')}${banner(252, 206, 22, 2, 'bd-mid')}${banner(-40, 206, 24, 3, 'bd-mid')}${banner(440, 206, 24, 4, 'bd-mid')}
    ${dunes(222, 'bd-mid', 614)}
    ${campRow(232, 1.05, 42, 'bd-near', 615, [118, 282])}
    ${banner(96, 236, 44, 2)}${banner(306, 236, 46, 4)}${banner(-160, 234, 50, 1)}${banner(560, 234, 50, 3)}
    ${tent(40, 256, 1.1)}${tent(372, 256, 1.15)}${tent(-240, 258, 1.4)}${tent(640, 258, 1.4)}
    ${stones([150, 254, 92, 330], 256, 'bd-near', 616)}
    ${thorns(126, 256, 14, 'bd-near', 617)}${thorns(280, 256, 16, 'bd-near', 618)}`,
  egypt: () => `
    <g class="bd-far"><path d="M128 212 L168 158 L208 212 Z"/><path d="M196 212 L222 178 L248 212 Z"/><path d="M-120 212 L-90 174 L-60 212 Z"/></g>
    <path class="bd-ridge" d="M168 158 L208 212 M222 178 L248 212"/>
    <path class="bd-far" d="M-800 260 L-800 212 C-500 208 -200 214 100 210 C300 207 500 213 800 209 L1200 211 L1200 260 Z"/>
    ${column(262, 166, 216, 8, 'bd-mid')}${column(286, 166, 216, 8, 'bd-mid')}${column(-40, 166, 216, 8, 'bd-mid')}
    <g class="bd-mid"><rect x="250" y="160" width="48" height="7"/></g>
    <path class="bd-river" d="M-600 224 C-420 220 -260 228 -100 224 C40 220 160 228 300 223 C440 218 600 226 900 222"/>
    <path class="bd-mid" d="M-800 260 L-800 232 C-560 228 -300 236 -40 232 C180 228 420 236 700 230 L1200 234 L1200 260 Z"/>
    ${palm(116, 262, 110, 'bd-near', 551)}${palm(-80, 262, 130, 'bd-near', 552)}${palm(298, 262, 118, 'bd-near', 553)}${palm(500, 262, 130, 'bd-near', 554)}
    ${reeds(150, 262, 30, 'bd-near', 555)}${reeds(260, 262, 34, 'bd-near', 556)}`,
};
