// 7막 A급 — 다윗 왕 (삼하 6 「법궤 앞에서 춤추다」 · 11–12 「당신이 그 사람이라」)의 전용 배경과 효과. 같은 종이 오려낸 그림자극 말투.
// 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - kg-cart            : 산 위 아비나답의 집에서 내려오는 길. 두 소가 끄는 새 수레 위의 궤, 앞뒤로 악기를 든 무리 (삼하 6:3-5)
//  - kg-threshing       : 나곤의 타작마당. 둥근 돌바닥과 겨 더미, 소들이 뛰어 수레가 기울고 궤가 기울어짐, 흙먼지 (6:6)
//  - kg-threshing-still : 같은 마당, 모두 멈춤. 수레는 멎고 소는 풀려 있고, 바닥에 갈라진 금 한 줄 (6:8 "베레스웃사")
//  - kg-obed            : 오벧에돔의 집. 처마 아래 빛나는 궤, 문 위의 포도 시렁, 곡식 단·가득한 항아리·열매 맺은 무화과·어린양 (6:11)
//  - kg-ascent          : 다윗 성으로 오르는 길. 산꼭대기 성벽과 열린 성문, 굽은 길을 오르는 행렬, 장대에 멘 궤,
//                         길가에 띄엄띄엄 제사 연기 (6:12-15), 성벽 망대의 불 켜진 창 하나 (6:16)
//  - kg-window          : 성 안 돌벽의 높은 격자창. 등불 앞에 내다보는 여인의 작은 그림자, 아래 골목을 지나는 행렬의 빛 (6:16)
//  - kg-tent            : 다윗이 친 장막. 열린 휘장 안의 금빛(궤), 왼쪽 제단 연기, 오른쪽 떡·고기·건포도떡 광주리 (6:17-19)
//  - kg-roof            : 왕궁 지붕 위, 저녁. 앞의 낮은 난간, 아래로 겹겹이 펼쳐진 성읍의 지붕들과 불빛 (11:2). 사람은 그리지 않는다
//  - kg-gate            : 왕궁 문, 밤. 닫힌 큰 문, 양옆 횃불, 담 밑에 누운 신복들, 벽에 기대 세운 창과 방패 하나 (11:9, 13)
//  - kg-rabbah          : 암몬의 왕성 랍바. 언덕 위 성벽과 활 쏘는 자들, 아래 물줄기(물들의 성 12:27), 왼쪽 이스라엘 진 (11:1, 16-17)
//  - kg-parable         : 나단의 비유 (종이 오린 그림책): 왼쪽 부자의 큰 집과 양·소 떼, 오른쪽 가난한 자의 작은 집,
//                         등잔 아래 앉아 작은 암양 새끼를 품은 사람과 아이 (12:1-3)
//  - kg-parable-taken   : 같은 그림, 오른쪽 품이 비고 사람이 고개를 숙임, 왼쪽 부자의 집 앞에 고기 굽는 불과 연기 (12:4)
// 효과:
//  - dance  : 힘을 다하여 춤춤 — 대상(who, 없으면 david)이 뛰놀고, 발밑에서 금빛 고리가 퍼지고, 빛 티끌이 흩날려 오름 (약 7초, 6:14-16)
//  - letter : 편지 — 봉한 두루마리가 쓰는 사람(who, 없으면 david)의 손에서 받는 사람(to, 없으면 uriah)의 손으로 건너가
//             그 손에 붉은 봉인과 함께 오래 머묾 (약 7초, 11:14)
//  - accuse : "당신이 그 사람이라" — 무대가 어두워지고 한 사람(to → who → david)에게만 차고 좁은 빛이 떨어짐 (약 7초, 12:7)
// 하나님은 그리지 않는다 (voice · glory · 빛).
import { H, W, rng, smoke, tree } from './backdrop';
import { folk, ground, ridge } from './joshua';

export type KingshipArt =
  | 'kg-cart' | 'kg-threshing' | 'kg-threshing-still' | 'kg-obed' | 'kg-ascent' | 'kg-window' | 'kg-tent'
  | 'kg-roof' | 'kg-gate' | 'kg-rabbah' | 'kg-parable' | 'kg-parable-taken';

const f = (n: number) => n.toFixed(1);

// ── 작은 조각들 ─────────────────────────────────
/** 궤: 금 상자 + 속죄소 뚜껑 + 마주 본 두 그룹의 날개. (x, y) = 밑면 가운데 */
function ark(x: number, y: number, s: number, poles = false): string {
  return `<g class="kg-ark" transform="translate(${f(x)} ${f(y)}) scale(${s})">
    <rect x="-10" y="-9" width="20" height="9" rx="0.8"/>
    <rect x="-11" y="-10.6" width="22" height="2"/>
    <path d="M-9 -10.6 C-9 -16 -5 -19 -1 -15 L-2 -10.6 Z M9 -10.6 C9 -16 5 -19 1 -15 L2 -10.6 Z"/>
    <path class="kg-ark__line" d="M-10 -5 H10"/>
    ${poles ? '<path class="kg-pole" d="M-24 -3 H24"/>' : ''}
  </g>`;
}

/** 소 한 마리 (옆모습, 오른쪽을 봄). rear = 앞다리를 들고 뛰어오름 */
function ox(x: number, y: number, s: number, rear = false, cls = 'bd-mid'): string {
  const body = `<ellipse cx="0" cy="-12" rx="13" ry="7"/>
    <path d="M10 -16 C14 -20 18 -20 21 -16 L24 -12 C24 -9 20 -8 17 -10 C14 -9 12 -11 10 -12 Z"/>
    <path d="M18 -19 C17 -24 20 -26 23 -24 M16 -19 C14 -23 11 -24 9 -22" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <path d="M-12 -14 C-16 -12 -17 -6 -15 -3" fill="none" stroke="currentColor" stroke-width="1"/>
    <path d="M-9 -7 L-10 0 M-5 -6 L-5 0 M6 -6 L6 0" stroke="currentColor" stroke-width="2.2"/>
    ${rear ? '<path d="M9 -8 L15 -12 L18 -9" fill="none" stroke="currentColor" stroke-width="2.2"/>' : '<path d="M9 -7 L10 0" stroke="currentColor" stroke-width="2.2"/>'}`;
  const rot = rear ? 'rotate(-16 -8 0)' : '';
  return `<g class="${cls}" transform="translate(${f(x)} ${f(y)}) scale(${s}) ${rot}">${body}</g>`;
}

/** 새 수레: 바닥판 + 두 바퀴 + 멍에 채. (x, y) = 바퀴 밑 가운데 */
function cart(x: number, y: number, s: number, tilt = 0, withArk = true): string {
  const wheel = (cx: number) => `<circle cx="${cx}" cy="-7" r="7" class="kg-wheel"/><path class="kg-spoke" d="M${cx - 6} -7 H${cx + 6} M${cx} -13 V-1 M${cx - 4.2} -11.2 L${cx + 4.2} -2.8 M${cx + 4.2} -11.2 L${cx - 4.2} -2.8"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s}) rotate(${tilt} 0 -7)">
    <g class="bd-mid"><rect x="-22" y="-17" width="44" height="4"/><path d="M-22 -17 L-22 -23 M22 -17 L22 -23" stroke="currentColor" stroke-width="1.6"/><path d="M22 -15 L44 -18" stroke="currentColor" stroke-width="2"/></g>
    ${wheel(-13)}${wheel(13)}
    ${withArk ? ark(0, -17, 1.1) : ''}
  </g>`;
}

/** 납작 지붕 집 (창에 불빛) */
function house(x: number, y: number, w: number, h: number, cls: string, lit: boolean, d = 0): string {
  return `<g class="${cls}"><rect x="${f(x)}" y="${f(y - h)}" width="${f(w)}" height="${f(h)}"/><rect x="${f(x - 1)}" y="${f(y - h - 1.6)}" width="${f(w + 2)}" height="1.6"/></g>
    ${lit ? `<rect class="kg-lamp" style="--d:${f(d)}s" x="${f(x + w * 0.4)}" y="${f(y - h * 0.6)}" width="${f(Math.max(1.2, w * 0.12))}" height="${f(Math.max(1.6, h * 0.2))}"/>` : ''}`;
}

/** 작은 양 한 마리 */
function sheep(x: number, y: number, s: number, flip = false, cls = 'kg-sheep'): string {
  const k = flip ? -1 : 1;
  return `<g class="${cls}" transform="translate(${f(x)} ${f(y)}) scale(${f(s * k)} ${f(s)})">
    <path d="M-5 0 L-5 4.4 M-2 0.4 L-2 4.6 M2.6 0.4 L2.6 4.6 M5 0 L5 4.4" fill="none" stroke="currentColor" stroke-width="0.9"/>
    <ellipse cx="0" cy="-2.4" rx="7" ry="4"/><circle cx="-3.4" cy="-4.4" r="2.6"/><circle cx="1.4" cy="-5" r="2.8"/><circle cx="4.6" cy="-3.4" r="2.4"/>
    <ellipse cx="8.4" cy="-4.4" rx="2.6" ry="1.9"/>
  </g>`;
}

/** 길가의 작은 돌 제단과 연기 (6:13) */
function wayAltar(x: number, y: number, seed: number): string {
  return `<g class="bd-mid"><rect x="${f(x - 5)}" y="${f(y - 6)}" width="10" height="6"/><rect x="${f(x - 6)}" y="${f(y - 7.4)}" width="12" height="1.6"/></g>
    <ellipse class="kg-ember" cx="${f(x)}" cy="${f(y - 7.6)}" rx="4" ry="1"/>${smoke(x, y - 10, seed, 4)}`;
}

/** 악기를 든 사람들: folk 줄 위에 작은 소고(동그라미)와 수금(사다리꼴) */
function musicians(x0: number, y0: number, x1: number, y1: number, n: number, s: number, seed: number): string {
  const r = rng(seed);
  const tools = Array.from({ length: Math.ceil(n / 2) }, (_, i) => {
    const t = (i * 2 + 0.5) / n;
    const x = x0 + (x1 - x0) * t;
    const y = y0 + (y1 - y0) * t - s * 3.6;
    return r() < 0.5
      ? `<circle class="kg-timbrel" style="--d:${f(r() * 2)}s" cx="${f(x)}" cy="${f(y - s * 0.6)}" r="${f(s * 0.9)}"/>`
      : `<path class="kg-harp" d="M${f(x - s * 0.6)} ${f(y)} L${f(x - s * 0.4)} ${f(y - s * 2)} L${f(x + s * 0.7)} ${f(y - s * 2.2)} L${f(x + s * 0.6)} ${f(y)}"/>`;
  }).join('');
  return `${folk(x0, y0, x1, y1, n, s, seed + 1, 'js-folk kg-folk')}${tools}`;
}

// ── 아비나답의 집에서 내려오는 길 (6:3-5) ────────────
function cartArt(): string {
  return `<g class="kg kg--cart">
    ${ridge([[-W * 2, 140], [-120, 128], [20, 136], [130, 120], [260, 134], [390, 122], [W * 3, 132]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 170 C-120 160 0 140 60 128 C100 120 130 124 160 150 C190 176 230 196 300 204 C380 212 480 214 ${W * 3} 216 L${W * 3} ${H} Z"/>
    ${house(76, 128, 22, 15, 'bd-mid', true, 1)}${house(98, 132, 14, 10, 'bd-mid', false)}
    ${tree(56, 132, 30, 'bd-mid', 9811, { sway: true })}${tree(124, 134, 24, 'bd-mid', 9812, { sway: true })}
    <path class="kg-road" d="M104 136 C130 150 140 176 170 196 C200 214 240 226 300 232 C360 238 420 240 ${W * 2} 242"/>
    ${musicians(20, 206, 104, 218, 10, 1.7, 9813)}
    ${musicians(300, 232, 400, 236, 10, 1.7, 9815)}
    <circle class="bd-halo kg-arkhalo" cx="172" cy="186" r="70"/>
    ${cart(170, 240, 2.3)}
    ${ox(258, 240, 1.7)}${ox(288, 242, 1.7)}
    ${tree(-40, 254, 140, 'bd-near', 9817, { sway: true, lean: 0.2 })}${tree(450, 254, 140, 'bd-near', 9818, { sway: true, lean: -0.2 })}
    ${ground(248)}
  </g>`;
}

// ── 나곤의 타작마당 (6:6-8) ────────────────────────
function threshingArt(still: boolean): string {
  const r = rng(still ? 9831 : 9832);
  const chaff = [[86, 232, 16], [128, 228, 10], [300, 229, 12], [338, 233, 18]].map(([x, y, w]) =>
    `<path class="kg-chaff" d="M${x - w} ${y} C${x - w * 0.6} ${y - w * 0.7} ${x + w * 0.6} ${y - w * 0.7} ${x + w} ${y} Z"/>`).join('');
  const dust = still ? '' : `<g class="kg-dust">${Array.from({ length: 9 }, (_, i) =>
    `<ellipse style="--d:${f(i * 0.4)}s" cx="${f(130 + r() * 150)}" cy="${f(224 + r() * 12)}" rx="${f(10 + r() * 14)}" ry="${f(5 + r() * 5)}"/>`).join('')}</g>`;
  return `<g class="kg kg--threshing${still ? ' kg--still' : ''}">
    ${ridge([[-W * 2, 150], [-100, 140], [40, 146], [160, 132], [280, 146], [400, 134], [W * 3, 142]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 204 C-80 198 60 196 200 200 C330 196 470 200 ${W * 3} 204 L${W * 3} ${H} Z"/>
    <!-- 둥근 타작마당: 납작한 돌바닥과 둘레 돌 -->
    <ellipse class="kg-floor" cx="210" cy="236" rx="150" ry="16"/>
    <ellipse class="kg-floor-rim" cx="210" cy="236" rx="150" ry="16"/>
    ${chaff}
    <path class="bd-mid" d="M70 232 L60 196 M60 196 L56 192 M60 196 L60 191 M60 196 L64 192" stroke="currentColor" stroke-width="1.4" fill="none"/>
    ${still ? '<path class="kg-breach" d="M96 244 L118 238 L126 243 L150 236 L160 242 L186 235 L198 241 L226 236 L240 242 L262 238"/>' : ''}
    <circle class="bd-halo kg-arkhalo${still ? ' is-dim' : ''}" cx="172" cy="190" r="${still ? 50 : 70}"/>
    ${still ? cart(170, 242, 2.3, 0) : cart(170, 242, 2.3, -11)}
    ${still ? `${ox(270, 244, 1.5)}<g transform="translate(312 244) scale(-1 1) translate(-312 -244)">${ox(312, 244, 1.5)}</g>` : `${ox(256, 240, 1.7, true)}${ox(286, 243, 1.7, true)}`}
    ${dust}
    ${tree(-30, 254, 130, 'bd-near', 9833, { sway: true, lean: 0.2 })}${tree(452, 254, 130, 'bd-near', 9834, { sway: true, lean: -0.2 })}
    ${ground(250)}
  </g>`;
}

// ── 오벧에돔의 집 (6:10-12) ────────────────────────
function obedArt(): string {
  const grapes = Array.from({ length: 7 }, (_, i) => `<circle class="kg-grape" cx="${f(132 + i * 15)}" cy="${f(150 + (i % 2) * 4)}" r="3"/>`).join('');
  const sheaves = [[60, 238], [78, 240], [222, 240]].map(([x, y]) =>
    `<path class="kg-sheaf" d="M${x - 6} ${y} L${x - 2} ${y - 22} L${x + 2} ${y - 22} L${x + 6} ${y} Z M${x - 5} ${y - 22} C${x - 8} ${y - 30} ${x + 8} ${y - 30} ${x + 5} ${y - 22} Z"/>`).join('');
  const jars = [[86, 244], [234, 246]].map(([x, y]) =>
    `<path class="bd-mid" d="M${x - 6} ${y} C${x - 10} ${y - 8} ${x - 9} ${y - 16} ${x - 4} ${y - 19} L${x - 4} ${y - 22} L${x + 4} ${y - 22} L${x + 4} ${y - 19} C${x + 9} ${y - 16} ${x + 10} ${y - 8} ${x + 6} ${y} Z"/><ellipse class="kg-oil" cx="${x}" cy="${y - 22}" rx="3.6" ry="1"/>`).join('');
  return `<g class="kg kg--obed">
    ${ridge([[-W * 2, 140], [-80, 130], [60, 138], [180, 124], [300, 136], [420, 126], [W * 3, 134]], 'bd-far')}
    <!-- 집: 돌벽과 문, 지붕 난간 (오른쪽) -->
    <g transform="translate(96 0)">
    <g class="bd-mid"><rect x="110" y="152" width="130" height="94"/><rect x="106" y="146" width="138" height="7"/></g>
    <path class="kg-stones" d="M110 176 H240 M110 200 H240 M110 224 H240 M140 152 V176 M200 152 V176 M126 176 V200 M220 176 V200 M150 200 V224 M210 200 V224"/>
    <path class="kg-door" d="M160 246 L160 196 C160 186 186 186 186 196 L186 246 Z"/>
    <rect class="kg-lamp" style="--d:0.6s" x="214" y="172" width="6" height="8"/>
    <!-- 문 위 포도 시렁 -->
    <path class="bd-mid" d="M120 146 L120 140 L236 140 L236 146" fill="none" stroke="currentColor" stroke-width="2"/>
    <path class="kg-vine" d="M118 142 C140 136 150 150 170 142 C190 134 200 150 220 142 C230 138 236 144 240 142"/>
    ${grapes}
    </g>
    <!-- 처마 아래 궤 (6:11): 가운데 왼쪽 -->
    <g class="bd-mid"><path d="M100 170 L206 162 L206 167 L102 175 Z"/><rect x="104" y="173" width="3.4" height="73"/><rect x="198" y="166" width="3.4" height="80"/></g>
    <circle class="bd-halo kg-arkhalo" cx="152" cy="214" r="60"/>
    ${ark(152, 244, 2.4)}
    ${sheaves}${jars}
    ${tree(30, 240, 70, 'bd-mid', 9851, { sway: true, fruit: 7 })}${tree(380, 242, 64, 'bd-mid', 9852, { sway: true, fruit: 6 })}
    ${sheep(250, 248, 1.2)}${sheep(268, 249, 1, true)}${sheep(40, 248, 1.1, true)}
    ${ground(250)}
  </g>`;
}

// ── 다윗 성으로 오르는 길 (6:12-16) ─────────────────
function ascentArt(): string {
  const r = rng(9861);
  // 성벽: 산마루를 따라
  const crenels = Array.from({ length: 30 }, (_, i) => `<rect x="${f(190 + i * 7)}" y="${f(92 - (i > 13 && i < 18 ? 14 : 0))}" width="4" height="4"/>`).join('');
  return `<g class="kg kg--ascent">
    ${ridge([[-W * 2, 120], [-120, 110], [0, 118], [100, 104], [W * 3, 112]], 'bd-far')}
    <!-- 시온 산성: 산마루 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 236 C-60 232 40 226 90 214 C140 200 170 160 200 120 C220 104 240 100 270 100 C320 100 380 104 ${W * 3} 110 L${W * 3} ${H} Z"/>
    <g class="bd-mid">
      <rect x="188" y="96" width="210" height="34"/>${crenels}
      <rect x="284" y="78" width="26" height="52"/>
      <rect x="220" y="84" width="18" height="46"/>
    </g>
    <path class="kg-stones" d="M188 108 H398 M188 120 H398 M206 96 V108 M250 96 V108 M330 96 V108 M370 96 V108 M226 108 V120 M300 108 V120 M350 108 V120"/>
    <!-- 열린 성문 -->
    <path class="kg-gate-open" d="M252 130 L252 112 C252 104 270 104 270 112 L270 130 Z"/>
    <!-- 망대의 불 켜진 창 하나 (6:16 — 미갈) -->
    <rect class="kg-lamp kg-lamp--michal" x="294" y="88" width="6" height="8"/>
    <!-- 굽은 길 -->
    <path class="kg-road" d="M${-W} 252 C40 248 100 240 140 222 C170 208 150 196 176 176 C200 156 230 150 246 140 C254 136 258 134 260 130"/>
    <!-- 길가의 제사 (여섯 걸음마다 — 6:13) -->
    ${wayAltar(102, 238, 9862)}${wayAltar(156, 204, 9863)}${wayAltar(214, 160, 9864)}
    <!-- 행렬: 아래에서 위로. 가운데에 장대에 멘 궤 -->
    ${musicians(20, 250, 120, 232, 12, 1.8, 9865)}
    ${musicians(176, 184, 214, 162, 7, 1.4, 9867)}
    ${folk(222, 156, 248, 142, 5, 1.2, 9869, 'js-folk kg-folk')}
    <g transform="translate(150 214)"><circle class="bd-halo kg-arkhalo" r="34"/>${ark(0, -4, 1.4, true)}${folk(-22, 0, 22, 0, 4, 2.2, 9870, 'js-folk js-folk--priest')}</g>
    ${Array.from({ length: 5 }, (_, i) => `<path class="kg-horn" d="M${f(126 + i * 6 + r())} ${f(222 - i * 4)} q4 -1 6 -5"/>`).join('')}
    ${tree(-50, 256, 150, 'bd-near', 9871, { sway: true, lean: 0.2 })}${tree(460, 256, 150, 'bd-near', 9872, { sway: true, lean: -0.2 })}
    ${ground(252)}
  </g>`;
}

// ── 창 (6:16) ────────────────────────────────────
function windowArt(): string {
  const r = rng(9881);
  const blocks: string[] = [];
  for (let y = 14; y < 196; y += 18) {
    const off = (y / 18) % 2 ? 0 : 20;
    for (let x = -60 + off; x < 460; x += 40) blocks.push(`M${x} ${y} V${y + 18}`);
    blocks.push(`M-60 ${y} H460`);
  }
  const motes = Array.from({ length: 14 }, (_, i) =>
    `<circle class="kg-mote" style="--d:${f(i * 0.5 + r())}s" cx="${f(60 + r() * 280)}" cy="${f(214 + r() * 26)}" r="${f(0.8 + r())}"/>`).join('');
  return `<g class="kg kg--window">
    <rect class="kg-wall" x="${-W * 2}" y="0" width="${W * 5}" height="200"/>
    <path class="kg-stones" d="${blocks.join(' ')}"/>
    <!-- 높은 격자창: 등불 앞의 여인 그림자 (얼굴 없이 너울 윤곽만) -->
    <rect class="kg-win-glow" x="176" y="46" width="52" height="64" rx="3"/>
    <g class="kg-watcher"><path d="M196 110 C194 96 196 86 202 80 C200 74 202 66 208 64 C214 64 218 70 216 78 C222 84 226 96 224 110 Z"/></g>
    <path class="kg-lattice" d="M176 62 H228 M176 78 H228 M176 94 H228 M190 46 V110 M202 46 V110 M214 46 V110"/>
    <rect class="kg-win-frame" x="174" y="44" width="56" height="68" rx="3"/>
    <g class="bd-mid"><rect x="168" y="112" width="68" height="6"/></g>
    <!-- 아래 골목: 지나가는 행렬과 궤의 빛 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 200 L${W * 3} 200 L${W * 3} ${H} Z"/>
    <circle class="bd-halo kg-arkhalo kg-passing" cx="200" cy="226" r="44"/>
    ${musicians(-40, 244, 440, 244, 34, 2.4, 9882)}
    ${motes}
    ${ground(250)}
  </g>`;
}

// ── 다윗이 친 장막 (6:17-19) ───────────────────────
function tentArt(): string {
  const loaves = Array.from({ length: 5 }, (_, i) => `<ellipse class="kg-bread" cx="${f(296 + i * 9)}" cy="${f(206 - (i % 2) * 3)}" rx="4.6" ry="2.6"/>`).join('');
  const cakes = Array.from({ length: 4 }, (_, i) => `<circle class="kg-cake" cx="${f(300 + i * 10)}" cy="${f(222)}" r="3.2"/>`).join('');
  return `<g class="kg kg--tent">
    ${ridge([[-W * 2, 132], [-80, 122], [60, 130], [190, 118], [320, 128], [440, 120], [W * 3, 126]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 200 C-40 196 100 192 200 194 C300 192 460 196 ${W * 3} 200 L${W * 3} ${H} Z"/>
    <!-- 장막: 가운데, 앞이 열려 금빛 -->
    <path class="kg-tent" d="M120 236 L136 150 L200 128 L264 150 L280 236 Z"/>
    <path class="kg-tent-in" d="M176 236 L182 164 L200 156 L218 164 L224 236 Z"/>
    <circle class="bd-halo kg-arkhalo" cx="200" cy="196" r="54"/>
    ${ark(200, 214, 2.1)}
    <path class="kg-rope" d="M136 150 L96 236 M264 150 L304 236 M200 128 L200 112"/>
    <!-- 왼쪽 제단과 번제·화목제 연기 (6:17) -->
    <g class="bd-mid"><rect x="62" y="210" width="34" height="26"/><rect x="58" y="206" width="42" height="5"/></g>
    <ellipse class="kg-ember" cx="79" cy="205" rx="12" ry="2.2"/>${smoke(79, 198, 9891, 6)}
    <!-- 오른쪽: 떡 · 고기 · 건포도떡 (6:19) -->
    <g class="bd-mid"><rect x="288" y="208" width="52" height="4"/><path d="M292 212 L292 236 M336 212 L336 236" stroke="currentColor" stroke-width="2"/></g>
    ${loaves}
    <path class="kg-basket" d="M292 226 L344 226 L340 236 L296 236 Z"/>${cakes}
    ${folk(-40, 246, 110, 244, 14, 2, 9892, 'js-folk kg-folk')}${folk(300, 246, 440, 246, 14, 2, 9893, 'js-folk kg-folk')}
    ${ground(250)}
  </g>`;
}

// ── 왕궁 지붕 위 (11:2) ─────────────────────────────
function roofArt(): string {
  const r = rng(9901);
  const rows: string[] = [];
  // 아래로 내려다보이는 성읍의 지붕들: 먼 줄일수록 작고 위에
  [[150, 0.6, 30], [168, 0.8, 24], [188, 1.05, 18]].forEach(([y, s, n], k) => {
    for (let i = 0; i < n; i++) {
      const w = (12 + r() * 12) * s;
      const h = (8 + r() * 10) * s;
      const x = -60 + (i / n) * 520 + (r() - 0.5) * 8;
      rows.push(house(x, y + r() * 6 * s, w, h, k === 0 ? 'bd-far' : 'bd-mid', r() > 0.55, r() * 3));
    }
  });
  return `<g class="kg kg--roof">
    <circle class="kg-star" cx="300" cy="40" r="1.4"/><circle class="kg-star" style="--d:1.2s" cx="96" cy="56" r="1"/>
    ${ridge([[-W * 2, 140], [-60, 132], [80, 140], [200, 128], [320, 138], [440, 130], [W * 3, 136]], 'bd-far')}
    ${rows.join('')}
    <!-- 멀리 한 집 마당의 등불 하나 (사람은 그리지 않는다) -->
    <circle class="bd-halo kg-far-lamp" cx="252" cy="182" r="14"/><rect class="kg-lamp" x="251" y="180" width="2.4" height="3"/>
    <!-- 앞: 왕궁 지붕 바닥과 낮은 난간 -->
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 214 L${W * 3} 214 L${W * 3} ${H} Z"/>
    <g class="bd-near"><rect x="${-W * 2}" y="200" width="${W * 5}" height="6"/>
      ${Array.from({ length: 40 }, (_, i) => `<rect x="${-200 + i * 22}" y="206" width="5" height="9"/>`).join('')}</g>
    <path class="kg-roof-line" d="M${-W * 2} 236 H${W * 3}"/>
  </g>`;
}

// ── 왕궁 문, 밤 (11:9, 13) ──────────────────────────
function gateArt(): string {
  const studs = Array.from({ length: 24 }, (_, i) => `<circle class="kg-stud" cx="${f(168 + (i % 6) * 13)}" cy="${f(140 + Math.floor(i / 6) * 22)}" r="1.4"/>`).join('');
  const sleepers = [[40, 244], [76, 246], [318, 246], [352, 244], [-10, 246], [412, 246]].map(([x, y]) =>
    `<g class="bd-mid"><path d="M${x - 14} ${y} C${x - 14} ${y - 6} ${x + 8} ${y - 7} ${x + 12} ${y - 3} L${x + 12} ${y} Z"/><circle cx="${x + 14}" cy="${y - 4}" r="3.4"/></g>`).join('');
  const torch = (x: number) => `<path class="bd-mid" d="M${x} 150 L${x} 128 M${x - 3} 128 L${x + 3} 128" stroke="currentColor" stroke-width="2.2" fill="none"/>
    <g class="kg-fire"><path d="M${x - 4} 128 C${x - 5} 121 ${x - 1} 117 ${x} 110 C${x + 3} 117 ${x + 5} 121 ${x + 4} 128 Z"/></g>
    <circle class="bd-halo kg-torchhalo" cx="${x}" cy="120" r="34"/>`;
  return `<g class="kg kg--gate">
    <rect class="kg-wall" x="${-W * 2}" y="60" width="${W * 5}" height="190"/>
    <path class="kg-stones" d="M-60 90 H460 M-60 120 H460 M-60 150 H460 M-60 180 H460 M-60 210 H460 M20 90 V120 M90 120 V150 M60 150 V180 M30 180 V210 M330 90 V120 M370 120 V150 M340 150 V180 M380 180 V210"/>
    <g class="bd-mid"><rect x="${-W * 2}" y="52" width="${W * 5}" height="10"/>${Array.from({ length: 50 }, (_, i) => `<rect x="${-300 + i * 22}" y="44" width="8" height="8"/>`).join('')}</g>
    <!-- 큰 문 -->
    <g class="bd-mid"><path d="M146 246 L146 128 C146 92 254 92 254 128 L254 246 Z"/></g>
    <path class="kg-door" d="M156 246 L156 130 C156 104 244 104 244 130 L244 246 Z"/>
    <path class="kg-door-seam" d="M200 110 V246"/>
    ${studs}
    ${torch(126)}${torch(274)}
    <!-- 벽에 기대 세운 창과 방패 하나 -->
    <path class="bd-mid" d="M296 246 L306 120" stroke="currentColor" stroke-width="2" fill="none"/><path class="kg-spearhead" d="M306 120 L304 108 L310 110 Z"/>
    <ellipse class="bd-mid" cx="300" cy="232" rx="10" ry="13"/>
    ${sleepers}
    ${ground(250)}
  </g>`;
}

// ── 랍바 (11:1, 16-17 · 12:26-29) ────────────────────
function rabbahArt(): string {
  const r = rng(9921);
  const archers = Array.from({ length: 11 }, (_, i) => {
    const x = 214 + i * 13 + r() * 3;
    return `<rect x="${f(x)}" y="108" width="2.4" height="7" rx="1.2"/><path d="M${f(x + 3)} 106 C${f(x + 6)} 109 ${f(x + 6)} 114 ${f(x + 3)} 117" fill="none" stroke="currentColor" stroke-width="0.7"/>`;
  }).join('');
  const tents = Array.from({ length: 8 }, (_, i) => {
    const x = -60 + i * 26 + r() * 6;
    const y = 214 + r() * 8;
    return `<path class="bd-mid" d="M${f(x - 9)} ${f(y)} L${f(x)} ${f(y - 11)} L${f(x + 9)} ${f(y)} Z"/>`;
  }).join('');
  return `<g class="kg kg--rabbah">
    ${ridge([[-W * 2, 150], [-100, 140], [60, 148], [180, 132], [320, 142], [460, 130], [W * 3, 140]], 'bd-far')}
    <!-- 언덕 위의 왕성 -->
    <path class="bd-mid" d="M120 ${H} L120 230 C150 210 180 160 206 132 L370 128 C390 150 420 200 ${W * 3} 222 L${W * 3} ${H} Z"/>
    <g class="bd-mid"><rect x="204" y="116" width="168" height="20"/>${Array.from({ length: 24 }, (_, i) => `<rect x="${204 + i * 7}" y="112" width="4" height="4"/>`).join('')}
      <rect x="232" y="96" width="20" height="40"/><rect x="320" y="98" width="20" height="38"/></g>
    <g class="kg-archers">${archers}</g>
    <path class="kg-gate-open" d="M280 136 L280 124 C280 118 294 118 294 124 L294 136 Z"/>
    <!-- 물들의 성 (12:27): 언덕 아래 물줄기 -->
    <path class="kg-water" d="M100 ${H} C150 246 210 238 260 236 C320 234 380 240 ${W * 3} 236 L${W * 3} 244 C380 248 320 242 260 244 C210 246 160 252 120 ${H} Z"/>
    <!-- 왼쪽 이스라엘 진 -->
    ${tents}${folk(-50, 230, 120, 232, 16, 1.8, 9922, 'js-folk kg-folk')}
    ${smoke(300, 104, 9923, 5)}
    ${ground(252)}
  </g>`;
}

// ── 나단의 비유 (12:1-4) ───────────────────────────
function parableArt(taken: boolean): string {
  const r = rng(9941);
  const flock = Array.from({ length: 16 }, (_, i) => sheep(30 + (i % 8) * 16 + r() * 4, 212 + Math.floor(i / 8) * 14 + r() * 3, 0.9, r() < 0.4, 'kg-sheep kg-sheep--rich')).join('');
  const oxen = `${ox(150, 230, 0.9, false, 'kg-paper')}${ox(52, 244, 0.85, false, 'kg-paper')}`;
  // 가난한 자: 앉은 사람 (등잔 아래, 품에 작은 암양 새끼), 곁의 아이
  const poor = `<g class="kg-paper kg-poor${taken ? ' is-bowed' : ''}">
      <path d="M318 236 C316 222 318 210 324 202 C320 196 322 188 328 186 C334 186 338 192 336 198 C342 204 344 214 342 224 L350 226 C352 230 350 236 346 236 Z"/>
      <path d="M296 236 C296 228 298 222 302 218 C300 214 302 209 306 209 C310 209 312 214 310 218 C313 222 314 228 314 236 Z"/>
    </g>
    ${taken ? '' : `<g class="kg-lamb">${sheep(330, 222, 0.8)}</g>`}
    <rect class="kg-lamp" x="338" y="180" width="2.4" height="3"/><circle class="bd-halo kg-far-lamp" cx="339" cy="184" r="${taken ? 12 : 22}"/>
    <path class="kg-cup" d="M290 232 L298 232 L296 236 L292 236 Z"/>`;
  const feast = taken
    ? `<ellipse class="kg-ember" cx="168" cy="236" rx="12" ry="2.4"/><g class="kg-fire"><path d="M162 236 C160 228 166 224 168 216 C171 224 176 228 174 236 Z"/></g>${smoke(168, 210, 9942, 6)}
       <path class="kg-paper" d="M154 214 L182 214" stroke="currentColor" stroke-width="1.6"/>`
    : '';
  return `<g class="kg kg--parable${taken ? ' is-taken' : ''}">
    <rect class="kg-sheet" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    ${ridge([[-W * 2, 150], [-60, 140], [80, 146], [200, 136], [320, 146], [460, 138], [W * 3, 144]], 'kg-paper kg-paper--far')}
    <!-- 왼쪽: 부자의 큰 집과 양·소 떼 (12:2) -->
    <g class="kg-paper"><rect x="40" y="150" width="120" height="50"/><rect x="34" y="144" width="132" height="7"/><rect x="66" y="128" width="40" height="18"/></g>
    <rect class="kg-lamp" x="90" y="166" width="5" height="7"/><rect class="kg-lamp" x="130" y="166" width="5" height="7"/>
    <path class="kg-fence" d="M20 206 H180 M20 234 H180 M24 200 V240 M60 200 V240 M100 200 V240 M140 200 V240 M176 200 V240"/>
    ${flock}${oxen}${feast}
    <!-- 가운데 나누는 금 -->
    <path class="kg-divide" d="M210 120 V250"/>
    <!-- 오른쪽: 가난한 자의 작은 집 (12:3) -->
    <g class="kg-paper"><rect x="300" y="176" width="64" height="30" opacity="0.5"/><path d="M296 178 L332 158 L368 178 Z" opacity="0.5"/></g>
    ${poor}
    <path class="kg-paper" d="M${-W * 2} ${H} L${-W * 2} 240 L${W * 3} 240 L${W * 3} ${H} Z"/>
  </g>`;
}

export function kingshipArt(art: KingshipArt): string {
  switch (art) {
    case 'kg-cart': return cartArt();
    case 'kg-threshing': return threshingArt(false);
    case 'kg-threshing-still': return threshingArt(true);
    case 'kg-obed': return obedArt();
    case 'kg-ascent': return ascentArt();
    case 'kg-window': return windowArt();
    case 'kg-tent': return tentArt();
    case 'kg-roof': return roofArt();
    case 'kg-gate': return gateArt();
    case 'kg-rabbah': return rabbahArt();
    case 'kg-parable': return parableArt(false);
    case 'kg-parable-taken': return parableArt(true);
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

/** 무대 위 인물의 그림 상자 (scene 기준 좌표). id가 없거나 무대에 없으면 fallback 쪽 사람 */
function actorBox(scene: HTMLElement, id: string | undefined, fallback: 'center' | 'right' | 'left') {
  const b = scene.getBoundingClientRect();
  const actors = [...scene.querySelectorAll<HTMLElement>('.scene__stage .actor')];
  const art = (a: HTMLElement) => (a.querySelector<SVGElement>('.actor__art') ?? a).getBoundingClientRect();
  let el = id ? actors.find((a) => a.dataset.id === id) : undefined;
  if (!el && actors.length) {
    const xs = actors.map((a) => [a, art(a).left + art(a).width / 2 - b.left] as const);
    if (fallback === 'right') el = xs.reduce((m, c) => (c[1] > m[1] ? c : m))[0];
    else if (fallback === 'left') el = xs.reduce((m, c) => (c[1] < m[1] ? c : m))[0];
    else el = xs.reduce((m, c) => (Math.abs(c[1] - b.width / 2) < Math.abs(m[1] - b.width / 2) ? c : m))[0];
  }
  const a = el ? art(el) : null;
  if (!a || !a.width) return { el, x: b.width / 2, top: b.height * 0.4, h: b.height * 0.5, w: 80 };
  return { el, x: a.left - b.left + a.width / 2, top: a.top - b.top, h: a.height, w: a.width };
}

/** dance: 힘을 다하여 춤춤 (삼하 6:14) — 대상이 뛰놀고, 금빛 고리와 빛 티끌 */
export function playDance(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const d = actorBox(scene, who ?? 'david', 'center');
  const life = rm ? 2400 : 7600;
  if (d.el && !rm) {
    d.el.classList.remove('kg-dancing');
    void d.el.offsetWidth;
    d.el.classList.add('kg-dancing');
    setTimeout(() => d.el?.classList.remove('kg-dancing'), life - 600);
  }
  const rings = rm ? '' : Array.from({ length: 5 }, (_, i) => `<i class="fx-dance__ring" style="--i:${i}"></i>`).join('');
  const motes = rm ? '' : Array.from({ length: 22 }, (_, i) =>
    `<b class="fx-dance__mote" style="--i:${i}; --o:${f((((i * 53) % 21) - 10) * 9)}px; --h:${f(120 + ((i * 37) % 9) * 16)}px"></b>`).join('');
  layerOf(scene, `fx-dance${rm ? ' is-rm' : ''}`,
    `<div class="fx-dance__at" style="--x:${f(d.x)}px; --y:${f(d.top + d.h)}px; --hh:${f(d.h)}px">
      <span class="fx-dance__glow"></span>${rings}${motes}
    </div>`,
    life, 1600);
}

/** letter: 봉한 편지가 쓰는 사람의 손에서 받는 사람의 손으로 건너가 머문다 (삼하 11:14) */
export function playLetter(scene: HTMLElement, from: string | undefined, to: string | undefined, rm: boolean): void {
  const a = actorBox(scene, from ?? 'david', 'left');
  const b = actorBox(scene, to ?? 'uriah', 'right');
  const sx = a.x;
  const sy = a.top + a.h * 0.42;
  const tx = b.x;
  const ty = b.top + b.h * 0.42;
  layerOf(scene, `fx-letter${rm ? ' is-rm' : ''}`,
    `<div class="fx-letter__at" style="--x:${f(sx)}px; --y:${f(sy)}px; --dx:${f(tx - sx)}px; --dy:${f(ty - sy)}px">
      <span class="fx-letter__scroll"><i></i><b></b></span>
    </div>`,
    rm ? 3000 : 7400, 1400);
}

/** accuse: "당신이 그 사람이라" (삼하 12:7) — 무대가 어두워지고 한 사람에게만 차고 좁은 빛 */
export function playAccuse(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const t = actorBox(scene, who ?? 'david', 'center');
  layerOf(scene, `fx-accuse${rm ? ' is-rm' : ''}`,
    `<div class="fx-accuse__dark" style="--x:${f(t.x)}px; --y:${f(t.top + t.h * 0.45)}px; --r:${f(Math.max(60, t.w * 0.75))}px"></div>
     <div class="fx-accuse__beam" style="--x:${f(t.x)}px; --w:${f(Math.max(70, t.w * 1.1))}px; --b:${f(t.top + t.h)}px"></div>`,
    rm ? 3200 : 7600, 2200);
}
