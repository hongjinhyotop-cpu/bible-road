// 여호수아 A급 6개 (수 2 · 3–4 · 6 · 7 · 10 · 24). 같은 종이 오려낸 그림자극 말투.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - js-jericho        : 종려나무 평지에서 본 여리고. 둔덕 위 성벽과 망대·성문, 성벽에 붙은 라합의 집(창에 등잔 불빛), 뒤로 서쪽 산지 (수 2:15, 6:1)
//  - js-jericho-cord   : 같은 성, 라합의 창에서 붉은 줄이 성벽을 따라 늘어져 있다 (수 2:21, 6:22)
//  - js-jericho-fallen : 성벽이 무너져 내린 자리 — 돌무더기와 흙먼지, 붉은 줄이 걸린 라합의 집 한 칸만 서 있다 (수 6:20-22)
//  - js-jericho-ruin   : 불탄 뒤. 낮은 돌무더기와 연기 기둥 (수 6:24, 26)
//  - js-roof           : 밤, 라합의 집 지붕. 벌여 놓은 삼대 단, 낮은 난간, 아래 성읍의 불빛, 성벽 너머 요단 평지와 모압 산 (수 2:6-8)
//  - js-window-rope    : 밤, 성벽 바깥에서 올려다본 라합의 창. 창에서 늘어뜨린 줄을 타고 작은 두 사람이 내려간다 (수 2:15)
//  - js-window-cord    : 같은 창, 붉은 줄이 매여 바람에 흔들린다 (수 2:21)
//  - js-jordan-flood   : 보리 거둘 때 언덕에 넘친 요단. 넓게 부푼 흙탕물, 잠긴 갈대, 강가에 멈춘 궤와 제사장들 (수 3:15)
//  - js-jordan-dry     : 같은 강, 물이 빠져 마른 바닥. 오른쪽(위쪽) 멀리 아담 읍 쪽에 물이 쌓여 서 있고, 왼쪽(아래쪽)은 염해로 끊겨 흘러갔다.
//                        강 가운데 궤를 멘 제사장들, 바닥을 건너는 백성의 줄 (수 3:16-17)
//  - js-gilgal         : 여리고 동편 길갈의 진. 장막들, 종려나무, 가운데 열두 돌이 하나씩 세워진다 (수 4:19-20)
//  - js-ai             : 언덕 위 아이 성과 비탈길, 멀리 벧엘 (수 7:2-5, 8장)
//  - js-tent-dig       : 아간의 장막. 앞 땅이 파헤쳐져 외투·은·금덩이가 드러나 빛난다 (수 7:21-22)
//  - js-achor          : 아골 골짜기. 메마른 골짜기 가운데 큰 돌무더기, 저녁 (수 7:26)
//  - js-gibeon         : 기브온 언덕과 서쪽으로 내려가는 벧호론 비탈, 아얄론 골짜기. 기본은 새벽 (수 10:9-10)
//  - js-gibeon-storm   : 같은 곳, 벧호론 비탈 위 먹구름 (수 10:11). fx hail·thunder와 같이
//  - js-gibeon-sun     : 같은 곳, 기브온 위의 해와 아얄론 골짜기 위의 달 (수 10:12-13). fx sun-stand와 같이
//  - js-shechem        : 세겜. 큰 상수리나무, 그 아래 세운 큰 돌, 뒤로 그리심·에발, 비탈에 모인 백성 (수 24:1, 26)
//  - js-shechem-stone  : 같은 곳, 돌이 금빛으로 밝아져 "증거"가 된다 (수 24:27)
// 효과:
//  - march      : 여리고 둘레를 도는 행렬 — 무장한 자들, 나팔 부는 제사장 일곱, 궤, 후군이 성벽 아래를 지나간다 (약 9초, 수 6:8-14)
//  - shout      : 일곱 나팔의 소리 고리 + 백성이 큰 소리로 외침 "와—" (약 5초, 수 6:20). 배경 js-jericho-fallen과 같이
//  - lots       : 제비가 좁혀진다 — 지파 → 족속 → 가족 → 한 사람 (약 12초, 수 7:16-18)
//  - sun-stand  : 해가 기브온 위에 머문다. 해 둘레에 금빛 고리, 빛이 멈춘 채 오래 머묾 (약 10초, 수 10:12-13. 배경 js-gibeon-sun)
// 하나님은 그리지 않는다. 진멸·처형은 그리지 않는다 — 성벽이 무너지는 데서 멈추고, 돌무더기만 남긴다.
// 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
import { H, W, palm, reeds, rng, smoke, tree } from './backdrop';

export type JoshArt =
  | 'js-jericho' | 'js-jericho-cord' | 'js-jericho-fallen' | 'js-jericho-ruin'
  | 'js-roof' | 'js-window-rope' | 'js-window-cord'
  | 'js-jordan-flood' | 'js-jordan-dry' | 'js-gilgal'
  | 'js-ai' | 'js-tent-dig' | 'js-achor'
  | 'js-gibeon' | 'js-gibeon-storm' | 'js-gibeon-sun'
  | 'js-shechem' | 'js-shechem-stone';

const f = (n: number) => n.toFixed(1);

/** 부드러운 산줄기 */
function ridge(pts: [number, number][], cls: string, bottom = H): string {
  let d = `M${pts[0][0]} ${bottom} L${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    d += ` Q${f(px + (x - px) * 0.5)} ${f(Math.min(py, y) - 2)} ${x} ${y}`;
  }
  return `<path class="${cls}" d="${d} L${pts[pts.length - 1][0]} ${bottom} Z"/>`;
}

/** 작은 사람들의 줄 */
function folk(x0: number, y0: number, x1: number, y1: number, n: number, s: number, seed: number, cls = 'js-folk'): string {
  const r = rng(seed);
  return `<g class="${cls}">${Array.from({ length: n }, (_, i) => {
    const t = n === 1 ? 0 : i / (n - 1);
    const x = x0 + (x1 - x0) * t + (r() - 0.5) * 2;
    const y = y0 + (y1 - y0) * t + (r() - 0.5) * 1.4;
    const h = s * (2.6 + r() * 0.8);
    return `<rect style="--d:${f(r() * 3)}s" x="${f(x - s * 0.45)}" y="${f(y - h)}" width="${f(s * 0.9)}" height="${f(h)}" rx="${f(s * 0.45)}"/>`;
  }).join('')}</g>`;
}

function stars(n: number, maxY: number, seed: number): string {
  const r = rng(seed);
  return `<g class="js-stars">${Array.from({ length: n }, () =>
    `<circle style="--d:${f(r() * 5)}s" cx="${f(-W * 2 + r() * W * 5)}" cy="${f(r() * maxY)}" r="${f(0.35 + r() * 0.8)}"/>`).join('')}</g>`;
}

const ground = (y = 248) => `<path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} ${y} C-100 ${y - 4} 120 ${y + 3} 200 ${y} C300 ${y - 3} 560 ${y + 2} ${W * 3} ${y - 1} L${W * 3} ${H} Z"/>`;

// ── 여리고 (수 2, 6) ───────────────────────────────
/** 성벽 한 토막 (윗단에 성가퀴) */
function wallSeg(x0: number, x1: number, top: number, base: number): string {
  const teeth = [];
  for (let x = x0; x < x1 - 3; x += 7) teeth.push(`<rect x="${f(x)}" y="${f(top - 4)}" width="4" height="4"/>`);
  return `<rect x="${x0}" y="${top}" width="${x1 - x0}" height="${base - top}"/>${teeth.join('')}`;
}

function jerichoArt(state: 'plain' | 'cord' | 'fallen' | 'ruin'): string {
  const r = rng(6001);
  const standing = state === 'plain' || state === 'cord';
  // 성 안 지붕들 (성벽 위로 살짝 보임)
  const roofs = Array.from({ length: 14 }, (_, i) => {
    const x = 104 + i * 14 + r() * 4;
    const h = 6 + r() * 8;
    return `<rect x="${f(x)}" y="${f(170 - h)}" width="${f(10 + r() * 4)}" height="${f(h)}"/>`;
  }).join('');
  const lights = Array.from({ length: 7 }, () => `<rect class="js-window" style="--d:${f(r() * 4)}s" x="${f(110 + r() * 170)}" y="${f(158 + r() * 8)}" width="1.6" height="2"/>`).join('');
  const walls = `<g class="bd-mid js-wall">
      ${wallSeg(92, 196, 172, 206)}${wallSeg(204, 308, 172, 206)}
      <rect x="86" y="160" width="16" height="46"/><rect x="86" y="156" width="16" height="4"/>
      <rect x="298" y="160" width="16" height="46"/><rect x="298" y="156" width="16" height="4"/>
      <rect x="186" y="158" width="28" height="48"/><rect x="184" y="154" width="32" height="4"/>
    </g>
    <path class="js-gate" d="M194 206 L194 186 Q200 178 206 186 L206 206 Z"/>`;
  // 라합의 집: 성벽에 붙어 지은 집 (수 2:15 "그 집이 성벽 위에 있으므로")
  const house = (lit: boolean) => `<g class="bd-mid js-rahab">
      <rect x="226" y="162" width="26" height="12"/><path d="M224 162 L254 162 L252 158 L226 158 Z"/>
      <rect class="js-rahab__win${lit ? ' is-lit' : ''}" x="235" y="176" width="6" height="7" rx="1"/>
    </g>`;
  const cord = `<path class="js-cord" pathLength="1" d="M239 183 C240 190 237 196 239 204"/>`;
  const fallen = !standing ? `<g class="bd-mid js-rubble">${Array.from({ length: 26 }, (_, i) => {
      const x = 80 + i * 9 + r() * 4;
      if (state === 'fallen' && x > 218 && x < 260) return '';
      const rx = 5 + r() * 5;
      return `<ellipse style="--i:${i % 9}" cx="${f(x)}" cy="${f(206 - r() * 6)}" rx="${f(rx)}" ry="${f(3 + r() * 3)}"/>`;
    }).join('')}</g>` : '';
  const keep = state === 'fallen' ? `<g class="bd-mid js-wall">${wallSeg(220, 260, 172, 206)}</g>${house(true)}${cord}
    <g class="js-dust">${Array.from({ length: 9 }, (_, i) => `<circle style="--i:${i}" cx="${f(90 + i * 26)}" cy="${f(196 - r() * 10)}" r="${f(14 + r() * 10)}"/>`).join('')}</g>` : '';
  const ruin = state === 'ruin' ? `${smoke(130, 180, 6002, 6)}${smoke(210, 176, 6003, 7)}${smoke(270, 182, 6004, 5)}` : '';
  return `<g class="js js--jericho js--${state}">
    ${ridge([[-W * 2, 150], [-180, 136], [-40, 146], [60, 128], [150, 140], [260, 124], [380, 142], [520, 130], [W * 3, 146]], 'bd-far')}
    ${ridge([[-W * 2, 196], [-80, 190], [40, 194], [140, 186], [260, 192], [400, 186], [W * 3, 194]], 'bd-far js-plain')}
    <!-- 둔덕(텔)과 성: 폰에서도 보이게 크게 (둔덕 위 y 206 → 230, 1.7배) -->
    <g transform="translate(200 230) scale(1.7) translate(-200 -206)">
    <path class="bd-mid" d="M30 ${H} L30 230 C60 222 76 210 92 206 L308 206 C326 210 342 222 372 230 L372 ${H} Z"/>
    ${standing ? `<g class="bd-far js-roofs">${roofs}</g>${lights}${walls}${house(true)}` : ''}
    ${state === 'cord' ? cord : ''}
    ${fallen}${keep}${ruin}
    </g>
    ${palm(40, 236, 40, 'bd-mid', 6005)}${palm(64, 240, 32, 'bd-mid', 6006)}${palm(346, 238, 38, 'bd-mid', 6007)}${palm(372, 242, 30, 'bd-mid', 6008)}
    ${palm(-60, 246, 50, 'bd-near', 6009)}${palm(470, 248, 54, 'bd-near', 6010)}
    <!-- 성을 도는 행렬 (fx march가 움직임): 무장한 자 → 나팔 든 제사장 일곱 → 궤 → 후군 -->
    <g class="js-march">
      ${folk(0, 0, 40, 0, 9, 1.5, 6011, 'js-folk')}
      <g transform="translate(46 0)">${folk(0, 0, 24, 0, 7, 1.5, 6012, 'js-folk js-folk--priest')}${Array.from({ length: 7 }, (_, i) => `<path class="js-horn" d="M${f(i * 4)} -4.6 q1.6 -0.4 2.6 -1.8"/>`).join('')}</g>
      <g transform="translate(76 0)"><rect class="js-ark" x="0" y="-6" width="9" height="4.4" rx="0.6"/><path class="js-ark__pole" d="M-3 -3 h15"/>${folk(-2, 0, 11, 0, 4, 1.4, 6013, 'js-folk js-folk--priest')}</g>
      <g transform="translate(94 0)">${folk(0, 0, 36, 0, 8, 1.5, 6014, 'js-folk')}</g>
    </g>
    ${ground()}
  </g>`;
}

// ── 라합의 지붕 (수 2:6-8) ─────────────────────────
function roofArt(): string {
  const r = rng(6101);
  const flax = Array.from({ length: 7 }, (_, i) => {
    const x = 122 + i * 22;
    const h = 7 + r() * 4;
    const stalks = Array.from({ length: 9 }, (_, k) => `M${f(x - 8 + k * 2)} 222 L${f(x - 6 + k * 1.6 + (r() - 0.5) * 3)} ${f(222 - h)}`).join(' ');
    return `<path class="js-flax" d="${stalks}"/>`;
  }).join('');
  const town = Array.from({ length: 22 }, (_, i) => {
    const x = -60 + i * 24 + r() * 8;
    const y = 196 + r() * 8;
    return `<rect x="${f(x)}" y="${f(y)}" width="${f(14 + r() * 8)}" height="${f(14)}"/>`;
  }).join('');
  const lights = Array.from({ length: 10 }, () => `<rect class="js-window" style="--d:${f(r() * 4)}s" x="${f(-40 + r() * 480)}" y="${f(200 + r() * 6)}" width="1.6" height="2"/>`).join('');
  return `<g class="js js--roof">
    ${stars(110, 140, 6102)}
    <circle class="js-moon" cx="300" cy="46" r="7"/>
    ${ridge([[-W * 2, 168], [-120, 158], [40, 164], [180, 152], [320, 160], [460, 150], [W * 3, 162]], 'bd-far')}
    <path class="js-jordan-glint" d="M-200 180 C0 178 200 184 600 180"/>
    <path class="bd-mid" d="M${-W * 2} 196 L${W * 3} 196 L${W * 3} 212 L${-W * 2} 212 Z"/>
    <g class="bd-mid js-town">${town}</g>${lights}
    <!-- 지붕과 난간 -->
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 222 L${W * 3} 222 L${W * 3} ${H} Z"/>
    <path class="bd-near" d="M${-W * 2} 222 L${-W * 2} 214 L60 214 L60 222 Z M340 222 L340 214 L${W * 3} 214 L${W * 3} 222 Z"/>
    <g class="bd-near js-flaxes">${flax}</g>
  </g>`;
}

// ── 성벽 바깥에서 본 라합의 창 (수 2:15, 21) ─────────
function windowArt(cord: boolean): string {
  const r = rng(6201);
  const blocks: string[] = [];
  for (let row = 0; row < 12; row++) {
    const y = 96 + row * 13;
    let x = -60 + (row % 2) * 14;
    while (x < 460) {
      const w = 20 + r() * 16;
      if (!(x + w > 208 && x < 232 && y > 104 && y < 134)) blocks.push(`<rect x="${f(x)}" y="${f(y)}" width="${f(w - 1.4)}" height="11.6" rx="1"/>`);
      x += w;
    }
  }
  const rope = `<path class="js-rope" d="M220 132 C221 160 218 190 220 240"/>
    <g class="js-climbers"><rect class="js-climber" style="--d:0s" x="217.6" y="132" width="5" height="9" rx="2.4"/><rect class="js-climber" style="--d:2.2s" x="217.6" y="132" width="5" height="9" rx="2.4"/></g>`;
  const red = `<path class="js-cord js-cord--sway" pathLength="1" d="M220 132 C222 142 218 150 221 160"/>`;
  return `<g class="js js--window">
    ${stars(80, 90, 6202)}
    <g class="bd-mid js-stonewall">${blocks.join('')}</g>
    <path class="bd-mid" d="M150 96 L150 70 L290 70 L290 96 Z"/><path class="bd-mid" d="M144 70 L296 70 L292 64 L148 64 Z"/>
    <rect class="js-bigwin" x="210" y="106" width="20" height="26" rx="2"/>
    <circle class="bd-halo js-win-halo" cx="220" cy="119" r="34"/>
    ${cord ? red : rope}
    ${ground(246)}
    ${tree(70, 250, 50, 'bd-near', 6203, { sway: true })}${palm(360, 250, 60, 'bd-near', 6204)}
  </g>`;
}

// ── 요단 (수 3–4) ──────────────────────────────────
function jordanArt(state: 'flood' | 'dry'): string {
  const r = rng(6301);
  const banks = `${ridge([[-W * 2, 150], [-160, 140], [0, 148], [120, 136], [260, 146], [400, 132], [W * 3, 144]], 'bd-far')}
    ${ridge([[-W * 2, 186], [-100, 182], [60, 188], [200, 180], [340, 186], [W * 3, 182]], 'bd-far js-farbank')}`;
  const water = state === 'flood'
    ? `<path class="js-water" d="M${-W * 2} 192 C-100 188 120 196 200 192 C300 188 520 196 ${W * 3} 190 L${W * 3} 238 C520 242 300 234 200 238 C100 242 -100 236 ${-W * 2} 240 Z"/>
       ${Array.from({ length: 9 }, (_, i) => `<path class="js-current" style="--d:${f(i * 0.7)}s" d="M${-60 + i * 60} ${200 + (i % 3) * 11} q14 -2 28 0 t28 0"/>`).join('')}
       <g class="js-drowned">${reeds(60, 214, 18, 'bd-mid', 6302)}${reeds(330, 210, 20, 'bd-mid', 6303)}</g>`
    : `<path class="js-bed" d="M${-W * 2} 192 C-100 188 120 196 200 192 C300 188 520 196 ${W * 3} 190 L${W * 3} 238 C520 242 300 234 200 238 C100 242 -100 236 ${-W * 2} 240 Z"/>
       ${Array.from({ length: 30 }, () => `<ellipse class="js-pebble" cx="${f(-40 + r() * 480)}" cy="${f(198 + r() * 36)}" rx="${f(1.4 + r() * 2.4)}" ry="${f(0.8 + r())}"/>`).join('')}
       <path class="js-water js-water--drain" d="M${-W * 2} 192 C-100 188 120 196 200 192 C300 188 520 196 ${W * 3} 190 L${W * 3} 238 C520 242 300 234 200 238 C100 242 -100 236 ${-W * 2} 240 Z"/>
       <!-- 심히 멀리 아담 읍 쪽에 쌓여 선 물 (3:16) -->
       <g class="js-heap"><path d="M372 192 C376 160 386 146 400 142 C430 140 470 150 520 160 L520 194 Z"/><path class="js-heap__edge" d="M372 192 C376 160 386 146 400 142"/></g>
       ${folk(110, 236, 160, 196, 14, 1.5, 6304)}${folk(240, 196, 300, 236, 14, 1.5, 6305)}`;
  // 강 가운데(마른 땅) 또는 물가에 선 궤와 제사장들
  const ark = state === 'flood'
    ? `<g class="js-arkgroup" transform="translate(200 246)"><rect class="js-ark" x="-6" y="-14" width="12" height="6" rx="0.8"/><path class="js-ark__pole" d="M-12 -10 h24"/>${folk(-10, 0, 10, 0, 4, 2, 6306, 'js-folk js-folk--priest')}</g>`
    : `<g class="js-arkgroup" transform="translate(200 220)"><circle class="js-ark-halo" r="22"/><rect class="js-ark" x="-5" y="-11" width="10" height="5" rx="0.7"/><path class="js-ark__pole" d="M-10 -8 h20"/>${folk(-8, 0, 8, 0, 4, 1.7, 6307, 'js-folk js-folk--priest')}</g>`;
  return `<g class="js js--jordan js--${state}">
    ${banks}
    ${water}
    ${palm(20, 196, 26, 'bd-far', 6308)}${palm(372, 192, 22, 'bd-far', 6309)}
    ${ark}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 246 C-100 242 80 252 160 248 C240 252 320 244 ${W * 3} 248 L${W * 3} ${H} Z"/>
    ${state === 'flood' ? reeds(120, 250, 22, 'bd-near', 6310) + reeds(290, 250, 24, 'bd-near', 6311) : ''}
  </g>`;
}

/** 길갈: 열두 돌 (수 4:20) */
function gilgalArt(): string {
  const r = rng(6401);
  const stones = Array.from({ length: 12 }, (_, i) => {
    const a = Math.PI * (0.08 + (i / 11) * 0.84);
    const x = 200 - Math.cos(a) * 62;
    const y = 240 - Math.sin(a) * 12;
    const h = 16 + r() * 6;
    return `<path class="js-stone" style="--i:${i}" d="M${f(x - 5)} ${f(y)} L${f(x - 4)} ${f(y - h)} Q${f(x)} ${f(y - h - 3)} ${f(x + 4)} ${f(y - h)} L${f(x + 5)} ${f(y)} Z"/>`;
  }).join('');
  const tents = Array.from({ length: 12 }, (_, i) => `<path d="M${-80 + i * 46} ${206 + (i % 2) * 4} l7 -9 l7 9 Z"/>`).join('');
  return `<g class="js js--gilgal">
    ${ridge([[-W * 2, 150], [-120, 140], [60, 146], [200, 132], [340, 146], [480, 136], [W * 3, 146]], 'bd-far')}
    <path class="js-jordan-glint" d="M300 176 C340 180 380 174 600 178"/>
    ${ridge([[-W * 2, 202], [-60, 196], [100, 200], [260, 194], [420, 200], [W * 3, 196]], 'bd-mid')}
    <g class="bd-mid js-tents">${tents}</g>
    ${palm(60, 230, 40, 'bd-mid', 6402)}${palm(340, 232, 36, 'bd-mid', 6403)}
    <g class="bd-mid js-stones">${stones}</g>
    <circle class="bd-halo js-stones-halo" cx="200" cy="232" r="56"/>
    ${ground()}
  </g>`;
}

// ── 아이 · 아간 · 아골 (수 7) ──────────────────────
function aiArt(): string {
  return `<g class="js js--ai">
    ${ridge([[-W * 2, 160], [-100, 150], [40, 156], [160, 146], [300, 154], [460, 140], [W * 3, 152]], 'bd-far')}
    <g class="bd-far js-bethel"><rect x="60" y="148" width="10" height="6"/><rect x="72" y="146" width="8" height="8"/></g>
    <!-- 아이 언덕 -->
    ${ridge([[-W * 2, 236], [-40, 228], [120, 206], [230, 168], [280, 160], [330, 170], [420, 210], [W * 3, 230]], 'bd-mid js-aihill')}
    <g class="bd-mid js-aicity"><rect x="246" y="148" width="16" height="12"/><rect x="264" y="144" width="12" height="16"/><rect x="278" y="150" width="14" height="10"/><rect x="250" y="145" width="4" height="4"/><rect x="286" y="147" width="4" height="4"/></g>
    <path class="js-trail" d="M60 248 C100 236 150 220 190 200 C214 188 232 176 252 162"/>
    ${ground()}
  </g>`;
}

function tentDigArt(): string {
  return `<g class="js js--dig">
    ${ridge([[-W * 2, 170], [-60, 160], [100, 166], [240, 156], [400, 166], [W * 3, 158]], 'bd-far')}
    <g class="bd-mid js-tents">${Array.from({ length: 9 }, (_, i) => `<path d="M${-100 + i * 64} 208 l9 -12 l9 12 Z"/>`).join('')}</g>
    <!-- 아간의 장막 -->
    <g class="bd-mid"><path d="M140 236 L156 204 L196 190 L200 182 L204 190 L244 204 L260 236 Z"/><path class="js-tentdoor" d="M192 236 L200 204 L208 236 Z"/></g>
    <!-- 파헤친 흙과 드러난 것들 (7:21: 외투 한 벌, 은 이백 세겔, 금덩이) -->
    <path class="bd-near js-dug" d="M150 248 C164 238 236 238 250 248 Z"/>
    <path class="js-mantle" d="M170 244 C176 238 190 238 194 243 C190 246 176 247 170 244 Z"/>
    <g class="js-silver">${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${206 + i * 4}" cy="${244 - (i % 2)}" rx="2" ry="1"/>`).join('')}</g>
    <rect class="js-goldbar" x="226" y="240" width="9" height="3.4" rx="0.6"/>
    <circle class="bd-halo js-dig-halo" cx="210" cy="242" r="40"/>
    ${ground(250)}
  </g>`;
}

function achorArt(): string {
  const r = rng(6501);
  const heap = Array.from({ length: 34 }, (_, i) => {
    const row = Math.floor(Math.sqrt(i * 2));
    const x = 200 + (r() - 0.5) * (60 - row * 9);
    const y = 238 - row * 5 - r() * 2;
    return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(3.4 + r() * 2)}" ry="${f(2.2 + r())}"/>`;
  }).join('');
  return `<g class="js js--achor">
    ${ridge([[-W * 2, 140], [-160, 126], [-20, 136], [100, 118], [200, 140], [300, 116], [420, 132], [W * 3, 124]], 'bd-far')}
    ${ridge([[-W * 2, 200], [-60, 176], [80, 150], [150, 196], [200, 214], [250, 196], [320, 150], [460, 178], [W * 3, 196]], 'bd-mid js-valley')}
    <g class="bd-mid js-heapstones">${heap}</g>
    ${ground()}
  </g>`;
}

// ── 기브온 (수 10) ─────────────────────────────────
function gibeonArt(state: 'plain' | 'storm' | 'sun'): string {
  const sky = state === 'sun'
    ? `<g class="js-sky-sun"><circle class="js-sun-halo" cx="132" cy="64" r="48"/><circle class="js-sun" cx="132" cy="64" r="11"/>
         <g class="js-sun-rays">${Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return `<path d="M${f(132 + Math.cos(a) * 15)} ${f(64 + Math.sin(a) * 15)} L${f(132 + Math.cos(a) * 26)} ${f(64 + Math.sin(a) * 26)}"/>`; }).join('')}</g>
         <circle class="js-sun-ring" cx="132" cy="64" r="20"/>
         <path class="js-moon2" d="M300 70 a9 9 0 1 0 6 -15 a7 7 0 1 1 -6 15 Z"/><circle class="js-moon-ring" cx="299" cy="62" r="16"/></g>`
    : state === 'storm'
      ? `<g class="js-storm"><path d="M150 60 C170 30 230 26 252 46 C280 22 350 30 360 60 C400 58 420 86 400 100 L170 100 C130 100 126 72 150 60 Z"/><path d="M260 96 C280 76 330 74 350 90 C380 80 420 96 410 116 L270 116 C250 116 246 100 260 96 Z"/></g>`
      : '';
  return `<g class="js js--gibeon js--${state}">
    ${sky}
    ${ridge([[-W * 2, 150], [-120, 140], [20, 146], [140, 132], [260, 148], [400, 138], [W * 3, 150]], 'bd-far')}
    <!-- 기브온 언덕 (왼쪽) -->
    ${ridge([[-W * 2, 210], [-80, 196], [40, 176], [110, 156], [160, 160], [220, 196], [300, 220], [W * 3, 226]], 'bd-mid js-gibeonhill')}
    <g class="bd-mid js-gibeoncity"><rect x="104" y="146" width="14" height="10"/><rect x="120" y="142" width="12" height="14"/><rect x="134" y="148" width="14" height="8"/><rect x="118" y="138" width="4" height="4"/></g>
    <!-- 벧호론 비탈길: 기브온에서 서쪽(오른쪽) 아얄론 골짜기로 -->
    <path class="js-trail" d="M140 160 C180 176 220 196 260 206 C300 216 340 214 400 222"/>
    <text class="js-place" x="300" y="236" text-anchor="middle">아얄론 골짜기</text>
    ${ground()}
  </g>`;
}

// ── 세겜 (수 24) ───────────────────────────────────
function shechemArt(lit: boolean): string {
  return `<g class="js js--shechem${lit ? ' is-lit' : ''}">
    ${ridge([[-W * 2, 200], [-160, 150], [-40, 110], [40, 96], [100, 110], [170, 170], [196, 210]], 'bd-far js-gerizim')}
    ${ridge([[204, 210], [240, 160], [300, 100], [350, 92], [430, 120], [W * 3, 190]], 'bd-far js-ebal')}
    ${folk(0, 196, 150, 208, 22, 1.5, 6601)}${folk(250, 208, 400, 194, 22, 1.5, 6602)}${folk(-140, 210, -10, 200, 14, 1.6, 6603)}${folk(420, 198, 560, 210, 14, 1.6, 6604)}
    ${ridge([[-W * 2, 224], [-60, 218], [120, 222], [280, 218], [440, 224], [W * 3, 220]], 'bd-mid')}
    ${tree(150, 246, 128, 'bd-mid', 6605, { lean: 0.15, sway: true })}
    <!-- 상수리나무 아래 세운 큰 돌 (24:26) -->
    <path class="bd-mid js-bigstone" d="M206 246 L208 214 Q214 206 220 214 L222 246 Z"/>
    ${lit ? '<circle class="bd-halo js-stone-halo" cx="214" cy="228" r="48"/><path class="js-stone-edge" d="M208 214 Q214 206 220 214"/>' : ''}
    ${ground()}
  </g>`;
}

export function joshArt(art: JoshArt): string {
  switch (art) {
    case 'js-jericho': return jerichoArt('plain');
    case 'js-jericho-cord': return jerichoArt('cord');
    case 'js-jericho-fallen': return jerichoArt('fallen');
    case 'js-jericho-ruin': return jerichoArt('ruin');
    case 'js-roof': return roofArt();
    case 'js-window-rope': return windowArt(false);
    case 'js-window-cord': return windowArt(true);
    case 'js-jordan-flood': return jordanArt('flood');
    case 'js-jordan-dry': return jordanArt('dry');
    case 'js-gilgal': return gilgalArt();
    case 'js-ai': return aiArt();
    case 'js-tent-dig': return tentDigArt();
    case 'js-achor': return achorArt();
    case 'js-gibeon': return gibeonArt('plain');
    case 'js-gibeon-storm': return gibeonArt('storm');
    case 'js-gibeon-sun': return gibeonArt('sun');
    case 'js-shechem': return shechemArt(false);
    case 'js-shechem-stone': return shechemArt(true);
  }
}

// ── 효과 ───────────────────────────────────────
function layerOf(scene: HTMLElement, cls: string, html: string, life: number, out: number): HTMLElement {
  const layer = document.createElement('div');
  layer.className = cls;
  layer.innerHTML = html;
  scene.append(layer);
  setTimeout(() => layer.classList.add('is-out'), life - out);
  setTimeout(() => layer.remove(), life);
  return layer;
}

/** 배경 그림 안의 g에 클래스를 다시 붙여 CSS 애니메이션을 처음부터 (march · sun-stand) */
function restart(scene: HTMLElement, sel: string, cls: string): void {
  const g = scene.querySelector(`.scene__backdrop .backdrop:last-child ${sel}`);
  if (!g) return;
  g.classList.remove(cls);
  void (g as SVGElement).getBoundingClientRect();
  g.classList.add(cls);
}

/** march: 성벽 아래로 행렬이 한 바퀴 지나간다 (수 6:8-14) */
export function playMarch(scene: HTMLElement): void {
  restart(scene, '.js--jericho', 'is-marching');
}

/** shout: 일곱 나팔의 소리 고리 + 큰 외침 (수 6:20) */
export function playShout(scene: HTMLElement, rm: boolean): void {
  const rings = rm ? '' : Array.from({ length: 7 }, (_, i) => `<i style="--x:${f(12 + i * 12.6)}%; --d:${f(i * 0.12)}s"></i>`).join('');
  const r = rng(Date.now() % 100000);
  const cries = Array.from({ length: rm ? 1 : 16 }, (_, i) => `<b style="--x:${f(6 + r() * 88)}%; --y:${f(52 + r() * 34)}%; --d:${f(0.9 + (i % 8) * 0.08 + r() * 0.2)}s; --s:${f(0.8 + r() * 0.9)}">와</b>`).join('');
  layerOf(scene, 'fx-shout', `${rings}${cries}`, rm ? 2400 : 5200, 1400);
}

/** lots: 제비가 지파 → 족속 → 가족 → 한 사람으로 좁혀진다 (수 7:16-18) */
const LOTS: { label: string; n: number; pick: string }[] = [
  { label: '지파대로', n: 12, pick: '유다 지파' },
  { label: '유다의 족속대로', n: 5, pick: '세라 족속' },
  { label: '세라 족속의 남자대로', n: 6, pick: '삽디' },
  { label: '삽디의 집 남자대로', n: 7, pick: '아간' },
];
export function playLots(scene: HTMLElement, rm: boolean): void {
  const stages = LOTS.map((s, k) => {
    const hit = Math.floor(s.n / 2);
    return `<div class="fx-lots__stage" style="--k:${k}">
      <p class="fx-lots__label">${s.label}</p>
      <div class="fx-lots__row">${Array.from({ length: s.n }, (_, i) => `<span class="${i === hit ? 'is-hit' : ''}" style="--i:${i}"></span>`).join('')}</div>
      <p class="fx-lots__pick${k === LOTS.length - 1 ? ' is-last' : ''}">${s.pick}</p>
    </div>`;
  }).join('');
  layerOf(scene, `fx-lots${rm ? ' is-rm' : ''}`, stages, rm ? 4000 : 13000, 1400);
}

/** sun-stand: 해와 달이 머문다 (수 10:12-13) — 배경 js-gibeon-sun에 클래스 + 무대 위 금빛 */
export function playSunStand(scene: HTMLElement, rm: boolean): void {
  restart(scene, '.js--gibeon', 'is-held');
  layerOf(scene, 'fx-sunstand', '<i></i>', rm ? 2400 : 10000, 2400);
}
