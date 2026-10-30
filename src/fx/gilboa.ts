// 7막 A급 — 사울의 마지막 (삼상 28 「엔돌의 밤」 · 31 「길보아」)의 전용 배경과 효과. 같은 종이 오려낸 그림자극 말투.
// 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - gb-camp       : 길보아 산 위 이스라엘 진에서 내려다본 이스르엘 골짜기. 골짜기 건너 모레 산 비탈(수넴)에
//                    블레셋 진의 불빛이 셀 수 없이 깔렸고, 이편 산마루엔 작은 장막 몇과 꺼져 가는 화톳불 (삼상 28:4-5)
//  - gb-endor      : 엔돌 여인의 집 안, 밤. 낮은 들보, 벽감의 작은 등잔, 오른쪽 둥근 흙 화덕(불씨), 왼쪽 낮은 침상(28:23),
//                    가운데 뒤로 열린 문과 밤하늘, 구석에 매인 송아지 그림자(28:24)
//  - gb-endor-rise : 같은 집. 가운데 바닥에서 희뿌연 빛의 기둥이 오르고, 그 안에 겉옷을 두른 듯한 흐린 그림자 하나 (28:13-14).
//                    얼굴도 몸도 그리지 않는다. 등잔 불꽃이 낮게 눌리고 화덕 불씨가 어두워진다
//  - gb-slope      : 길보아 산비탈. 꽂힌 채 부러진 창, 엎어진 방패, 비탈에 박힌 화살, 찢긴 깃발 하나. 사람의 몸은 그리지 않는다 (31:1-6)
//  - gb-bethshan   : 벧산 성벽. 요단 골짜기 위에 높이 선 성벽과 성문 망대, 망대 위 블레셋 깃발, 성벽 위를 도는 까마귀 (31:10).
//                    성벽에 무엇이 걸렸는지는 그리지 않는다
//  - gb-jordan     : 요단을 건너는 밤길. 달, 골짜기를 가르는 강과 나루, 횃불을 든 작은 사람들의 줄이 물을 건넌다 (31:12 "밤새도록 가서")
//  - gb-tamarisk   : 야베스의 에셀나무. 가는 잎이 늘어진 나무 아래 새로 쌓은 돌무덤, 왼쪽에 사그라진 불의 재와 연기 한 줄,
//                    먼 언덕 위 야베스 성읍 (31:12-13)
// 효과:
//  - rise : 땅에서 오르는 희뿌연 빛 — 바닥 가운데에서 잿빛 티끌이 솟고 빛의 기둥이 부풀었다가 가라앉는다 (약 6초, 28:13).
//           인물로 그리지 않는다. 다음 beat 배경 gb-endor-rise와 같이
// 하나님은 그리지 않는다. 강령술을 신비롭게 꾸미지 않는다 — 빛은 차고 흐리게, 금빛이 아니라 잿빛으로.
import { H, W, rng, smoke } from './backdrop';
import { folk, ground, ridge, stars } from './joshua';

export type GilboaArt = 'gb-camp' | 'gb-endor' | 'gb-endor-rise' | 'gb-slope' | 'gb-bethshan' | 'gb-jordan' | 'gb-tamarisk';

const f = (n: number) => n.toFixed(1);

/** 작은 장막 하나 */
const tentS = (x: number, y: number, s: number, cls = 'bd-mid') =>
  `<path class="${cls}" d="M${f(x - 10 * s)} ${f(y)} L${f(x - 2 * s)} ${f(y - 9 * s)} L${f(x + 10 * s)} ${f(y - 7 * s)} L${f(x + 13 * s)} ${f(y)} Z"/>`;

// ── 길보아에서 내려다본 블레셋 진 ─────────────────
function campArt(): string {
  const r = rng(7101);
  // 골짜기 건너 비탈에 깔린 불빛 (멀수록 작고 촘촘하다)
  const fires = Array.from({ length: 64 }, () => {
    const x = -60 + r() * 520;
    const t = r();
    const y = 128 + t * 30 + Math.sin(x / 50) * 3;
    const s = 0.5 + t * 0.9;
    return `<circle style="--d:${f(r() * 3)}s" cx="${f(x)}" cy="${f(y)}" r="${f(s)}"/>`;
  }).join('');
  const tents = Array.from({ length: 22 }, () => {
    const x = -40 + r() * 480;
    const y = 132 + r() * 24;
    return tentS(x, y, 0.35 + r() * 0.3, 'gb-ptent');
  }).join('');
  return `<g class="gb gb--camp">
    <!-- 모레 산 (수넴이 기댄 산) -->
    ${ridge([[-W * 2, 120], [-80, 112], [40, 104], [150, 92], [230, 100], [330, 112], [460, 118], [W * 3, 122]], 'bd-far')}
    <!-- 이스르엘 골짜기의 낮은 바닥 -->
    <path class="gb-valley" d="M${-W * 2} 160 C0 156 200 162 ${W * 3} 158 L${W * 3} 172 L${-W * 2} 172 Z"/>
    ${tents}
    <g class="gb-fires">${fires}</g>
    <circle class="bd-halo gb-campglow" cx="120" cy="140" r="90"/>
    <circle class="bd-halo gb-campglow" cx="300" cy="144" r="80"/>
    <!-- 이편: 길보아 산마루 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 196 C-60 192 40 184 110 190 C170 196 230 184 300 188 C360 192 420 200 ${W * 3} 198 L${W * 3} ${H} Z"/>
    ${tentS(40, 192, 1.6)}${tentS(352, 194, 1.8)}${tentS(392, 196, 1.2)}
    <ellipse class="gb-ember" cx="74" cy="200" rx="7" ry="1.6"/>
    ${smoke(74, 196, 7102, 3)}
    <!-- 바위 끝 -->
    <path class="bd-near" d="M150 ${H} L150 236 C170 226 210 222 250 228 C270 232 284 240 290 ${H} Z"/>
    ${ground(246)}
  </g>`;
}

// ── 엔돌 여인의 집 ──────────────────────────────
function endorArt(rise: boolean): string {
  const r = rng(7201);
  const motes = rise
    ? Array.from({ length: 16 }, () => `<circle style="--d:${f(r() * 6)}s; --o:${f((r() - 0.5) * 30)}px" cx="${f(196 + (r() - 0.5) * 40)}" cy="${f(232 - r() * 20)}" r="${f(0.6 + r() * 1.1)}"/>`).join('')
    : '';
  return `<g class="gb gb--endor${rise ? ' is-rise' : ''}">
    <rect class="gb-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <!-- 낮은 들보 -->
    <rect class="gb-beam" x="${-W * 2}" y="40" width="${W * 5}" height="9"/>
    ${[40, 120, 200, 280, 360].map((x) => `<rect class="gb-beam" x="${x - 4}" y="22" width="8" height="20"/>`).join('')}
    <!-- 뒤쪽 가운데: 열린 문과 밤하늘 -->
    ${rise ? `<rect class="gb-doorshut" x="180" y="96" width="34" height="140"/><path class="gb-doorplank" d="M188 96 V236 M197 96 V236 M206 96 V236"/>` : `<rect class="gb-doorsky" x="180" y="96" width="34" height="140"/>
    <g class="js-stars"><circle cx="188" cy="110" r="0.7"/><circle cx="204" cy="118" r="0.6"/><circle cx="196" cy="130" r="0.8"/><circle cx="208" cy="104" r="0.5"/></g>
    <path class="gb-doorhill" d="M180 200 Q196 192 214 198 L214 236 L180 236 Z"/>`}
    <rect class="gb-jamb" x="174" y="90" width="7" height="146"/><rect class="gb-jamb" x="213" y="90" width="7" height="146"/><rect class="gb-jamb" x="170" y="86" width="54" height="6"/>
    <!-- 왼쪽: 벽감의 등잔 -->
    <path class="gb-niche" d="M108 150 L108 126 Q120 114 132 126 L132 150 Z"/>
    <path class="bd-mid" d="M112 150 C112 146 118 144 124 144 C130 144 132 146 131 150 Z"/>
    <ellipse class="gb-flame" cx="129" cy="140" rx="1.8" ry="3.6"/>
    <circle class="bd-halo gb-lamphalo" cx="122" cy="140" r="58"/>
    <!-- 왼쪽 아래: 낮은 침상 (28:23 "침상에 앉으니라") -->
    <g class="bd-mid gb-bed"><rect x="60" y="214" width="92" height="7" rx="2"/><rect x="64" y="221" width="5" height="15"/><rect x="143" y="221" width="5" height="15"/><path d="M60 214 C58 205 66 201 76 204 L78 214 Z"/></g>
    <path class="gb-blanket" d="M84 214 C100 208 128 208 148 212 L148 216 L84 216 Z"/>
    <!-- 오른쪽: 둥근 흙 화덕과 불씨, 위에 걸린 마른 풀 -->
    <g class="bd-mid gb-oven"><path d="M262 236 C262 206 276 192 296 192 C316 192 330 206 330 236 Z"/><rect x="292" y="186" width="8" height="8" rx="2"/></g>
    <path class="gb-ovenmouth" d="M284 236 C284 224 290 218 296 218 C302 218 308 224 308 236 Z"/>
    <circle class="bd-halo gb-ovenhalo" cx="296" cy="230" r="40"/>
    <path class="gb-herbs" d="M250 50 L246 76 M256 50 L256 80 M262 50 L266 74 M330 50 L326 72 M336 50 L338 78"/>
    <!-- 반죽 그릇과 맷돌 -->
    <g class="bd-mid"><path d="M232 236 C232 228 238 224 246 224 C254 224 260 228 260 236 Z"/><ellipse cx="350" cy="234" rx="16" ry="3"/><ellipse cx="350" cy="229" rx="10" ry="3"/></g>
    <!-- 구석에 매인 송아지 그림자 (28:24) -->
    <g class="gb-calf"><path d="M18 236 L18 214 C18 206 26 202 40 202 C54 202 60 206 62 212 L68 206 C72 204 76 206 74 212 L70 220 L68 236 L62 236 L60 222 L28 224 L26 236 Z"/></g>
    ${rise ? `<!-- 땅에서 오르는 희뿌연 빛 (28:13) — 얼굴도 몸도 없는 겉옷의 그림자 하나 -->
    <ellipse class="gb-floorglow" cx="197" cy="238" rx="54" ry="6"/>
    <path class="gb-column" d="M168 240 C172 180 180 120 190 60 L204 60 C214 120 222 180 226 240 Z"/>
    <path class="gb-shade" d="M197 104 C188 104 184 112 184 122 C178 130 174 150 172 176 C170 200 168 222 170 236 L224 236 C226 222 224 200 222 176 C220 150 216 130 210 122 C210 112 206 104 197 104 Z"/>
    <g class="gb-motes">${motes}</g>` : ''}
    <rect class="bd-mid gb-floor" x="${-W * 2}" y="236" width="${W * 5}" height="${H - 236}"/>
  </g>`;
}

// ── 길보아 산비탈 ───────────────────────────────
/** 꽂힌 채 부러진 창 */
const brokenSpear = (x: number, y: number, len: number, ang: number) =>
  `<g transform="translate(${x} ${y}) rotate(${ang})"><rect x="-0.9" y="${-len}" width="1.8" height="${len}"/><path d="M-1 ${-len} L1.4 ${-len - 3} L0.6 ${-len + 1} Z"/></g>`;
/** 엎어진 둥근 방패 */
const shield = (x: number, y: number, s: number, tilt: number) =>
  `<g transform="translate(${x} ${y}) rotate(${tilt})"><ellipse rx="${f(9 * s)}" ry="${f(3.4 * s)}"/><ellipse class="gb-boss" rx="${f(2 * s)}" ry="${f(0.9 * s)}" cy="${f(-0.6 * s)}"/></g>`;

function slopeArt(): string {
  const r = rng(7301);
  const arrows = Array.from({ length: 14 }, () => {
    const x = 60 + r() * 300;
    const y = 200 + r() * 40;
    const a = -30 + r() * 60;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})"><path d="M0 0 L0 -12"/><path d="M-1.4 -12 L0 -15 L1.4 -12"/></g>`;
  }).join('');
  return `<g class="gb gb--slope">
    ${ridge([[-W * 2, 150], [-100, 140], [40, 146], [160, 136], [300, 146], [440, 140], [W * 3, 148]], 'bd-far')}
    <!-- 멀리 골짜기의 연기 -->
    ${smoke(70, 150, 7302, 6)}${smoke(150, 146, 7304, 5)}${smoke(330, 152, 7303, 6)}
    <!-- 비탈: 왼쪽 위에서 오른쪽 아래로 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 160 C-60 164 60 170 140 182 C220 194 300 210 400 220 C460 226 520 228 ${W * 3} 230 L${W * 3} ${H} Z"/>
    <g class="bd-mid gb-rocks"><path d="M30 178 C40 168 60 168 66 180 Z"/><path d="M330 214 C336 204 352 204 358 216 Z"/></g>
    <!-- 찢긴 깃발 하나 -->
    <g class="gb-pole"><rect x="248" y="150" width="1.6" height="58" transform="rotate(10 248 208)"/></g>
    <path class="gb-banner" d="M258 152 L278 156 L270 160 L280 166 L262 164 Z"/>
    <!-- 부러진 창들 -->
    <g class="gb-spears">${brokenSpear(118, 204, 26, -24)}${brokenSpear(186, 214, 14, 18)}${brokenSpear(226, 216, 34, -8)}${brokenSpear(304, 226, 20, 30)}${brokenSpear(80, 196, 18, 40)}</g>
    <path class="gb-shaft" d="M140 226 L176 220 M262 234 L290 240"/>
    <!-- 앞쪽: 크게 — 땅에 꽂혀 부러진 창 둘, 엎어진 방패, 떨어진 투구 -->
    <g class="gb-spears gb-spears--near">${brokenSpear(170, 252, 58, -16)}${brokenSpear(250, 254, 42, 22)}${brokenSpear(132, 250, 30, 34)}</g>
    <g class="gb-shields gb-shields--near">${shield(214, 250, 2.2, -5)}${shield(116, 252, 1.6, 8)}</g>
    <path class="gb-helmet" d="M282 252 C282 242 288 236 296 236 C304 236 310 242 310 252 Z"/>
    <circle class="bd-halo gb-slopeglow" cx="200" cy="150" r="120"/>
    <!-- 엎어진 방패들 -->
    <g class="gb-shields">${shield(150, 222, 1.2, -6)}${shield(210, 230, 1, 8)}${shield(276, 236, 1.3, -4)}${shield(96, 210, 0.9, 10)}</g>
    <g class="gb-arrows">${arrows}</g>
    ${ground(250)}
  </g>`;
}

// ── 벧산 성벽 ──────────────────────────────────
function bethshanArt(): string {
  const crows = Array.from({ length: 5 }, (_, i) =>
    `<g class="gb-crow" style="--i:${i}"><path transform="translate(${200 + 34 + i * 10} ${70 + (i % 2) * 8})" d="M-7 0 Q-3.5 -4 0 0 Q3.5 -4 7 0 Q3.5 -1.6 0 1 Q-3.5 -1.6 -7 0 Z"/></g>`).join('');
  const courses = Array.from({ length: 6 }, (_, i) => `M${-W * 2} ${150 + i * 14} H${W * 3}`).join(' ');
  const joints = Array.from({ length: 30 }, (_, i) => {
    const row = i % 6;
    const x = -60 + Math.floor(i / 6) * 110 + (row % 2) * 40;
    return `M${x} ${150 + row * 14} V${164 + row * 14}`;
  }).join(' ');
  return `<g class="gb gb--bethshan">
    ${ridge([[-W * 2, 140], [-60, 130], [80, 136], [220, 124], [360, 134], [W * 3, 128]], 'bd-far')}
    <!-- 성벽 -->
    <rect class="gb-citywall" x="${-W * 2}" y="138" width="${W * 5}" height="110"/>
    <path class="gb-crenel" d="${Array.from({ length: 40 }, (_, i) => `M${-W * 2 + i * 50} 138 v-8 h22 v8`).join(' ')}"/>
    <path class="gb-courses" d="${courses} ${joints}"/>
    <!-- 성문 망대 -->
    <g class="gb-tower"><rect x="168" y="96" width="64" height="152"/><path d="M164 96 v-8 h12 v8 h10 v-8 h12 v8 h10 v-8 h12 v8 h10 v-8 h12 v8 Z"/></g>
    <path class="gb-gate" d="M184 248 L184 196 Q200 180 216 196 L216 248 Z"/>
    <rect class="gb-slitwin" x="196" y="120" width="8" height="18" rx="2"/>
    <!-- 망대 위 블레셋 깃발 -->
    <rect class="gb-pole" x="226" y="58" width="1.6" height="32"/>
    <path class="gb-pflag" d="M227.6 60 L246 64 L236 68 L246 72 L227.6 74 Z"/>
    <!-- 까마귀 -->
    <g class="gb-crows">${crows}</g>
    <!-- 성 아래 길 -->
    <path class="dv-road" d="M120 ${H} C150 252 180 250 196 248"/>
    ${ground(252)}
  </g>`;
}

// ── 요단을 건너는 밤길 ─────────────────────────
function jordanArt(): string {
  const torches = [[96, 206], [128, 212], [160, 220], [196, 226], [232, 228], [268, 222], [300, 214]];
  return `<g class="gb gb--jordan">
    <circle class="gb-moon" cx="304" cy="52" r="9"/>
    <circle class="bd-halo gb-moonhalo" cx="304" cy="52" r="40"/>
    ${stars(40, 120, 7401)}
    <!-- 요단 서편 산지(벧산 쪽)와 동편 길르앗 산지 -->
    ${ridge([[-W * 2, 150], [-40, 136], [60, 146], [140, 132], [200, 150], [W * 3, 156]], 'bd-far')}
    ${ridge([[200, 160], [260, 140], [340, 126], [420, 134], [W * 3, 130]], 'bd-far')}
    <!-- 골짜기 바닥과 강 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 180 C0 182 200 190 ${W * 3} 186 L${W * 3} ${H} Z"/>
    <path class="gb-river" d="M${-W * 2} 236 C0 230 120 226 200 232 C280 238 360 230 ${W * 3} 226 L${W * 3} 242 C360 246 280 252 200 248 C120 244 0 248 ${-W * 2} 252 Z"/>
    <path class="gb-ripple" d="M60 238 q10 -2 20 0 M140 236 q10 -2 20 0 M230 242 q10 -2 20 0 M320 236 q10 -2 20 0"/>
    <!-- 나루의 돌 -->
    <g class="bd-near"><ellipse cx="170" cy="240" rx="5" ry="1.6"/><ellipse cx="206" cy="242" rx="6" ry="1.8"/><ellipse cx="240" cy="240" rx="5" ry="1.6"/></g>
    <!-- 횃불을 든 사람들의 줄 -->
    ${folk(90, 208, 306, 214, 9, 2.4, 7402)}
    <g class="gb-torches">${torches.map(([x, y], i) => `<ellipse style="--d:${f(i * 0.41)}s" cx="${x}" cy="${y - 10}" rx="1.6" ry="3"/>`).join('')}</g>
    ${torches.map(([x, y]) => `<circle class="bd-halo gb-torchhalo" cx="${x}" cy="${y - 10}" r="14"/>`).join('')}
    ${ground(254)}
  </g>`;
}

// ── 야베스의 에셀나무 ──────────────────────────
function tamariskArt(): string {
  const r = rng(7501);
  // 에셀나무: 굵고 비틀린 줄기, 가는 잎이 깃털처럼 늘어진 덩이
  // 가는 비늘잎이 늘어진 송이: 작은 타원 덩이 + 아래로 흘러내린 가는 줄
  const plumes = Array.from({ length: 30 }, () => {
    const a = r() * Math.PI;
    const d = Math.sqrt(r());
    const cx = 234 + Math.cos(a) * 66 * d * (r() < 0.5 ? -1 : 1);
    const cy = 128 - Math.sin(a) * 40 * d;
    return `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(9 + r() * 8)}" ry="${f(4 + r() * 4)}"/>`;
  }).join('');
  const fronds = Array.from({ length: 70 }, () => {
    const x = 172 + r() * 124;
    const y = 104 + r() * 40;
    return `M${f(x)} ${f(y)} q${f((r() - 0.5) * 3)} 8 ${f((r() - 0.5) * 3)} ${f(10 + r() * 16)}`;
  }).join(' ');
  return `<g class="gb gb--tamarisk">
    ${ridge([[-W * 2, 150], [-60, 142], [60, 132], [150, 142], [260, 136], [380, 146], [W * 3, 140]], 'bd-far')}
    <!-- 먼 언덕 위 야베스 -->
    <g class="bd-far gb-town"><rect x="40" y="122" width="12" height="10"/><rect x="54" y="118" width="10" height="14"/><rect x="66" y="124" width="14" height="8"/><rect x="82" y="120" width="8" height="12"/></g>
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 206 C-40 202 80 196 180 200 C280 204 360 198 ${W * 3} 202 L${W * 3} ${H} Z"/>
    <!-- 에셀나무 -->
    <g class="gb-tree">
      <path d="M226 236 C228 214 222 196 230 176 C236 160 226 146 232 130 L238 130 C234 146 244 160 238 178 C234 196 240 214 240 236 Z"/>
      <path d="M232 170 C222 160 208 156 198 140 L202 138 C212 150 224 154 234 164 Z"/>
      <path d="M236 156 C248 146 262 144 272 130 L276 132 C266 148 252 152 238 162 Z"/>
      <g class="gb-plumes">${plumes}</g>
    </g>
    <path class="gb-fronds" d="${fronds}"/>
    <!-- 나무 아래 새로 쌓은 돌무덤 -->
    <g class="gb-cairn"><path d="M196 240 C200 226 214 220 232 220 C250 220 262 228 266 240 Z"/>
      ${Array.from({ length: 9 }, (_, i) => `<ellipse cx="${f(204 + (i % 5) * 13 + (i > 4 ? 6 : 0))}" cy="${i > 4 ? 226 : 234}" rx="6" ry="3.4"/>`).join('')}</g>
    <!-- 왼쪽: 사그라진 불의 재와 연기 한 줄 (31:12 "거기서 불사르고") -->
    <ellipse class="gb-ash" cx="110" cy="240" rx="22" ry="3"/>
    <ellipse class="gb-ember" cx="110" cy="239" rx="9" ry="1.4"/>
    ${smoke(110, 232, 7502, 4)}
    ${ground(244)}
  </g>`;
}

export function gilboaArt(art: GilboaArt): string {
  switch (art) {
    case 'gb-camp': return campArt();
    case 'gb-endor': return endorArt(false);
    case 'gb-endor-rise': return endorArt(true);
    case 'gb-slope': return slopeArt();
    case 'gb-bethshan': return bethshanArt();
    case 'gb-jordan': return jordanArt();
    case 'gb-tamarisk': return tamariskArt();
  }
}

// ── 효과 ───────────────────────────────────────
/** rise: 땅에서 오르는 희뿌연 빛 (삼상 28:13) — 잿빛 티끌과 빛의 기둥. 인물로 그리지 않는다 */
export function playRise(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = `fx-rise${rm ? ' is-rm' : ''}`;
  const motes = rm ? '' : Array.from({ length: 26 }, (_, i) =>
    `<i style="--i:${i}; --o:${f((((i * 41) % 17) - 8) * 7)}px; --d:${f((i * 0.37) % 2.6)}s; --s:${f(2 + ((i * 7) % 5) * 0.8)}px"></i>`).join('');
  layer.innerHTML = `<span class="fx-rise__column"></span><span class="fx-rise__floor"></span>${motes}`;
  scene.append(layer);
  const life = rm ? 2200 : 6400;
  setTimeout(() => layer.classList.add('is-out'), life - 1800);
  setTimeout(() => layer.remove(), life);
}
