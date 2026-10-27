// B급 에피소드용 배경 라이브러리 (장소 유형). 목록·설명은 engine/moods.ts의 PLACES.
// 1막 배경과 같은 종이 오려낸 그림자극 말투: 멀수록 하늘색(bd-far), 가까울수록 어두운 잉크(bd-near).
// 색은 전부 막 테마 변수에서 나오므로, 같은 그림이 막마다 다른 색으로 재사용된다.
// 가운데(x 130~270)는 인물이 서는 자리라 낮게 비워 두고, 큰 것은 양옆이나 멀리 둔다.
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

/** 상수리나무 숲 가장자리의 큰 나무들 (양옆) */
const SIDE_OAKS = () => `
  ${tree(-20, 262, 200, 'bd-near', 301, { lean: 0.25, sway: true })}
  ${tree(420, 262, 210, 'bd-near', 302, { lean: -0.25, sway: true })}`;

export const PLACE_ART: Record<PlaceArt, () => string> = {
  tent: () => `
    ${hills(204, 'bd-far', 401)}
    ${tree(334, 206, 46, 'bd-far', 402, { sway: true })}
    ${sheep(90, 205, 403)}${sheep(-160, 207, 404)}
    ${hills(224, 'bd-mid', 405)}
    ${tent(300, 226, 0.9)}
    ${bigTent(46, 246, 1.25)}
    ${bigTent(-150, 238, 0.9, 'bd-mid')}
    ${tent(500, 240, 1.2)}
    ${stones([150, 200, 262, 330], 252, 'bd-near', 406)}
    ${tree(560, 262, 170, 'bd-near', 407, { lean: -0.2, sway: true })}`,
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
    ${mesa(60, 212, 70, 34, 'bd-far')}${mesa(330, 214, 90, 26, 'bd-far')}${mesa(-200, 210, 80, 40, 'bd-far')}${mesa(560, 212, 70, 30, 'bd-far')}
    ${dunes(226, 'bd-mid', 421)}
    ${thorns(40, 248, 18, 'bd-near', 422)}${thorns(360, 250, 20, 'bd-near', 423)}${thorns(-90, 246, 22, 'bd-near', 424)}${thorns(500, 248, 20, 'bd-near', 425)}
    ${stones([110, 290, 20, 420, -140], 254, 'bd-near', 426)}
    <path class="bd-near" d="M-800 260 L-800 250 C-600 244 -420 252 -300 248 L-240 236 L-200 248 C-60 254 60 250 120 256 L120 260 Z"/>
    <path class="bd-near" d="M300 260 L300 254 C380 250 440 252 470 238 L520 230 L560 246 C700 252 900 248 1200 250 L1200 260 Z"/>`,
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
    ${column(110, 30, 236, 14, 'bd-far')}${column(290, 30, 236, 14, 'bd-far')}
    <g class="bd-mid"><rect x="150" y="196" width="100" height="8"/><path d="M168 196 L168 160 C168 150 232 150 232 160 L232 196 Z"/></g>
    <g class="bd-near"><rect x="${-W * 2}" y="240" width="${W * 5}" height="6"/><rect x="${-W * 2}" y="250" width="${W * 5}" height="6"/></g>
    ${brazier(40, 240, 1.2)}${brazier(360, 240, 1.2)}`,
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
    <circle class="bd-moon" cx="320" cy="46" r="7"/>
    ${hills(214, 'bd-far', 462)}
    ${hills(234, 'bd-mid', 463)}
    ${tent(60, 236, 0.9)}`,
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
    ${tree(80, 210, 30, 'bd-far', 482, { sway: true })}${tree(340, 212, 36, 'bd-far', 483, { sway: true })}
    ${hills(226, 'bd-mid', 484)}
    <path class="bd-path" d="M120 262 C150 246 190 236 196 226 C202 216 230 212 250 206 L254 206 C236 212 210 218 206 228 C200 240 180 250 280 262 Z"/>
    <g class="bd-near"><ellipse cx="320" cy="248" rx="9" ry="4"/><ellipse cx="320" cy="242" rx="7" ry="3.4"/><ellipse cx="320" cy="237" rx="5" ry="2.8"/></g>
    ${tree(-80, 262, 160, 'bd-near', 485, { lean: 0.2, sway: true })}${tree(500, 262, 170, 'bd-near', 486, { lean: -0.2, sway: true })}
    ${stones([60, 380, 10], 256, 'bd-near', 487)}`,
  river: () => `
    ${hills(200, 'bd-far', 491)}
    ${treeline(212, 14, 'bd-mid', 492)}
    <path class="bd-riverbed" d="M${-W * 2} 222 C-200 218 0 226 200 222 C400 218 600 226 ${W * 3} 222 L${W * 3} 240 C600 244 400 236 200 240 C0 244 -200 236 ${-W * 2} 240 Z"/>
    <path class="bd-river" d="M-600 228 C-420 224 -260 232 -100 228 C40 224 160 232 300 227 C440 222 600 230 900 226"/>
    <path class="bd-river" d="M-600 234 C-420 230 -260 238 -100 234 C40 230 160 238 300 233 C440 228 600 236 900 232" style="animation-duration: 9s"/>
    ${stones([170, 190, 212, 232], 236, 'bd-mid', 493)}
    ${reeds(60, 262, 46, 'bd-near', 494)}${reeds(340, 262, 50, 'bd-near', 495)}${reeds(-120, 262, 52, 'bd-near', 496)}${reeds(520, 262, 52, 'bd-near', 497)}`,
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
      <path d="M40 220 L40 186 L52 180 L56 196 L70 192 L72 220 Z"/>
      <path d="M310 222 L310 176 L322 170 L326 188 L346 184 L350 200 L362 196 L362 222 Z"/>
      <path d="M-120 220 L-120 194 L-100 190 L-96 220 Z"/><path d="M480 222 L480 190 L500 196 L504 222 Z"/>
    </g>
    ${smoke(56, 180, 522, 6)}${smoke(330, 170, 523, 6)}${smoke(-110, 188, 524, 5)}
    <path class="bd-ash" d="M-800 260 L-800 226 C-500 222 -200 232 100 228 C300 224 500 232 800 226 L1200 230 L1200 260 Z"/>
    ${stones([90, 140, 260, 300, -40, 420], 250, 'bd-near', 525)}
    ${thorns(20, 254, 14, 'bd-near', 526)}${thorns(390, 254, 16, 'bd-near', 527)}`,
  pasture: () => `
    ${hills(196, 'bd-far', 531)}
    ${sheep(60, 199, 532)}${sheep(300, 197, 533)}
    ${hills(214, 'bd-mid', 534)}
    ${sheep(130, 218, 535)}${sheep(-120, 216, 536)}${sheep(470, 218, 537)}
    <g class="bd-mid"><path d="M290 232 C290 220 350 220 350 232 Z"/><path class="detail" d="M296 228 H344 M300 224 H340" fill="none" stroke-width="0.8"/></g>
    ${tree(-60, 262, 140, 'bd-near', 538, { lean: 0.2, sway: true })}${tree(480, 262, 150, 'bd-near', 539, { lean: -0.2, sway: true })}
    ${stones([70, 160, 250, 380], 254, 'bd-near', 540)}`,
  egypt: () => `
    <g class="bd-far"><path d="M40 212 L80 160 L120 212 Z"/><path d="M110 212 L136 178 L162 212 Z"/><path d="M-120 212 L-90 174 L-60 212 Z"/></g>
    <path class="bd-far" d="M-800 260 L-800 212 C-500 208 -200 214 100 210 C300 207 500 213 800 209 L1200 211 L1200 260 Z"/>
    ${column(300, 160, 214, 9, 'bd-mid')}${column(330, 160, 214, 9, 'bd-mid')}${column(360, 160, 214, 9, 'bd-mid')}
    <g class="bd-mid"><rect x="286" y="154" width="90" height="8"/></g>
    <path class="bd-river" d="M-600 224 C-420 220 -260 228 -100 224 C40 220 160 228 300 223 C440 218 600 226 900 222"/>
    <path class="bd-mid" d="M-800 260 L-800 232 C-560 228 -300 236 -40 232 C180 228 420 236 700 230 L1200 234 L1200 260 Z"/>
    ${palm(30, 262, 116, 'bd-near', 551)}${palm(-80, 262, 130, 'bd-near', 552)}${palm(380, 262, 124, 'bd-near', 553)}${palm(500, 262, 130, 'bd-near', 554)}
    ${reeds(110, 262, 34, 'bd-near', 555)}${reeds(300, 262, 38, 'bd-near', 556)}`,
};
