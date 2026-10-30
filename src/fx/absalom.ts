// 7막 A급 — 압살롬의 반역 (삼하 15–18 「내 아들 압살롬아」)의 전용 배경과 효과. 같은 종이 오려낸 그림자극 말투.
// 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - ab-gate      : 예루살렘 성문 길, 이른 아침. 성벽과 성문 망대, 문 앞에 송사하러 온 사람들의 줄,
//                   오른쪽에 압살롬의 병거와 말, 그 앞에 늘어선 호위들 (15:1-6)
//  - ab-kidron    : 기드론 시내. 왼쪽 위 성벽, 골짜기 바닥의 가는 시내, 시내를 건너 맞은편 비탈로 이어지는 사람들의 줄 (15:23)
//  - ab-olives    : 감람산 오르막. 오른쪽 위로 오르는 비탈길과 늙은 감람나무들, 머리를 가린 채 고개 숙여 오르는
//                   사람들의 긴 줄, 왼쪽 아래 멀리 두고 온 성 (15:30)
//  - ab-bahurim   : 바후림. 왼쪽으로 낮게 흐르는 길, 오른쪽에 가파르게 솟은 산비탈과 바위, 비탈 위로 따라오는 작은 길 (16:5-13)
//  - ab-well      : 바후림 어떤 사람의 집 뜰, 밤. 가운데 우물 아구를 덮은 천과 그 위에 넌 찧은 곡식, 맷돌, 광주리, 집 벽의 등잔 (17:18-19)
//  - ab-mahanaim  : 마하나임 성문. 두 겹 문과 그 위의 문루(작은 방과 창 하나), 문루로 오르는 바깥 돌계단,
//                   문 앞에 쌓인 침상·대야·질그릇·곡식 자루·양 (17:27-29, 18:4, 24, 33)
//  - ab-watch     : 문루 지붕에서 내다본 길. 앞쪽 난간, 들을 가로질러 지평선까지 이어진 길, 멀리서 달려오는 작은 두 사람 (18:24-27)
//  - ab-forest    : 에브라임 수풀. 빽빽하고 뒤엉킨 줄기, 쓰러진 나무와 구덩이, 바위, 낮게 깔린 연기 (18:6-8). 사람의 몸은 없다
//  - ab-oak       : 큰 상수리나무. 넓게 뻗은 번성한 가지 아래 매달린 작은 그림자 하나(머리털이 가지에 걸림),
//                   그 아래로 빠져 달아나는 노새 (18:9). 그림자만, 몸에 무엇이 닿는 장면은 없다
//  - ab-oak-empty : 같은 나무, 가지 아래가 비었다 (18:14 뒤)
//  - ab-cairn     : 수풀 가운데 큰 구덩이와 그 위의 심히 큰 돌무더기 (18:17)
//  - ab-pillar    : 왕의 골짜기에 홀로 선 비석 하나, 해 질 녘 (18:18 "압살롬의 기념비")
//  - ab-chamber   : 문루의 작은 방. 낮은 돌벽, 바닥 한쪽으로 열린 계단 구멍과 난간, 작은 창 하나로 드는 저녁빛,
//                   꺼진 등잔 (18:33). 가장 조용한 방 — 움직이는 것은 창빛의 티끌뿐
// 효과:
//  - stones : 돌과 티끌 — 던지는 사람(who, 없으면 shimei)에게서 돌이 세 번에 걸쳐 상대(to, 없으면 david) 쪽으로 날아가
//             앞에 떨어져 튀고, 던지는 사람 발밑에서 티끌이 날림 (약 6초, 16:6, 13). 아무도 맞지 않는다
// 하나님은 그리지 않는다. 죽음은 그리지 않는다 (암전 + 소리).
import { H, W, rng, smoke, tree } from './backdrop';
import { folk, ground, ridge, stars } from './joshua';

export type AbsalomArt =
  | 'ab-gate' | 'ab-kidron' | 'ab-olives' | 'ab-bahurim' | 'ab-well' | 'ab-mahanaim' | 'ab-watch'
  | 'ab-forest' | 'ab-oak' | 'ab-oak-empty' | 'ab-cairn' | 'ab-pillar' | 'ab-chamber';

const f = (n: number) => n.toFixed(1);

/** 성벽 한 줄 (돌 줄눈 + 성가퀴) */
function wall(top: number, base: number, cls = 'ab-wall'): string {
  const courses = Array.from({ length: Math.floor((base - top) / 13) }, (_, i) => `M${-W * 2} ${top + 13 * (i + 1)} H${W * 3}`).join(' ');
  const joints = Array.from({ length: 60 }, (_, i) => {
    const row = i % 6;
    const x = -W * 2 + Math.floor(i / 6) * 120 + (row % 2) * 50;
    return `M${x} ${top + 13 * row} V${top + 13 * (row + 1)}`;
  }).join(' ');
  return `<rect class="${cls}" x="${-W * 2}" y="${top}" width="${W * 5}" height="${base - top}"/>
    <path class="${cls}" d="${Array.from({ length: 60 }, (_, i) => `M${-W * 2 + i * 34} ${top} v-6 h16 v6`).join(' ')}"/>
    <path class="ab-courses" d="${courses} ${joints}"/>`;
}

/** 말 한 마리 (오른쪽을 봄) */
const horse = (x: number, y: number, s: number) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 -16 C-14 -21 -9 -23 0 -23 C6 -23 9 -22 11 -24 L14 -32 C15 -35 18 -36 20 -34 L24 -30 C25 -28 24 -27 22 -27 L18 -28 L16 -22 C16 -18 14 -15 12 -14 L12 0 L10 0 L9 -12 L-8 -12 L-9 0 L-11 0 L-12 -12 C-16 -13 -18 -12 -19 -8 L-20 -12 C-19 -15 -16 -16 -14 -16 Z"/></g>`;

/** 병거 (오른쪽을 봄): 바퀴 + 낮은 상자 + 끌채 */
const chariot = (x: number, y: number, s: number) =>
  `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-12 -24 L8 -24 L10 -10 L-12 -10 Z"/>
    <path d="M6 -12 L34 -16 L34 -14 L6 -10 Z"/>
    <circle class="ab-wheel" cx="-2" cy="-8" r="8"/>
    <path class="ab-spokes" d="M-2 -16 V0 M-10 -8 H6 M-7.6 -13.6 L3.6 -2.4 M-7.6 -2.4 L3.6 -13.6"/>
  </g>`;

/** 늙은 감람나무: 굵고 비틀린 줄기, 잿빛 초록 잎 덩이들 */
function olive(x: number, g: number, h: number, seed: number): string {
  const r = rng(seed);
  const blobs = Array.from({ length: 9 }, () => {
    const a = r() * Math.PI;
    const d = 0.3 + r() * 0.7;
    return `<ellipse cx="${f(x + Math.cos(a) * h * 0.5 * d * (r() < 0.5 ? -1 : 1))}" cy="${f(g - h * 0.72 - Math.sin(a) * h * 0.28 * d)}" rx="${f(h * (0.16 + r() * 0.1))}" ry="${f(h * (0.1 + r() * 0.06))}"/>`;
  }).join('');
  const tw = h * 0.07;
  return `<g class="ab-olive">
    <path class="ab-olive__trunk" d="M${f(x - tw * 1.6)} ${g} C${f(x - tw)} ${f(g - h * 0.2)} ${f(x - tw * 2.2)} ${f(g - h * 0.36)} ${f(x - tw * 0.6)} ${f(g - h * 0.56)} L${f(x + tw * 0.8)} ${f(g - h * 0.58)} C${f(x + tw * 1.8)} ${f(g - h * 0.4)} ${f(x + tw * 0.6)} ${f(g - h * 0.2)} ${f(x + tw * 1.8)} ${g} Z"/>
    <path class="ab-olive__trunk" d="M${f(x)} ${f(g - h * 0.5)} Q${f(x - h * 0.2)} ${f(g - h * 0.62)} ${f(x - h * 0.34)} ${f(g - h * 0.7)} L${f(x - h * 0.33)} ${f(g - h * 0.67)} Q${f(x - h * 0.18)} ${f(g - h * 0.56)} ${f(x + 1)} ${f(g - h * 0.46)} Z"/>
    <g class="ab-olive__leaf">${blobs}</g>
  </g>`;
}

/** 머리를 가리고 고개 숙인 채 걷는 사람들 (15:30) — 오른쪽 위로 오른다 */
function mourners(x0: number, y0: number, x1: number, y1: number, n: number, s: number, seed: number): string {
  const r = rng(seed);
  return `<g class="ab-mourners">${Array.from({ length: n }, (_, i) => {
    const t = n === 1 ? 0 : i / (n - 1);
    const x = x0 + (x1 - x0) * t + (r() - 0.5) * 3;
    const y = y0 + (y1 - y0) * t + (r() - 0.5) * 1.4;
    const h = s * (3.2 + r() * 0.7);
    // 몸 + 앞으로 숙인 머리를 덮은 겉옷 (머리에서 등으로 흘러내림)
    return `<path style="--d:${f(r() * 4)}s" d="M${f(x - s * 0.55)} ${f(y)} L${f(x - s * 0.5)} ${f(y - h * 0.62)} C${f(x - s * 0.5)} ${f(y - h * 0.92)} ${f(x + s * 0.2)} ${f(y - h * 1.02)} ${f(x + s * 0.7)} ${f(y - h * 0.84)} C${f(x + s * 0.9)} ${f(y - h * 0.76)} ${f(x + s * 0.7)} ${f(y - h * 0.62)} ${f(x + s * 0.55)} ${f(y - h * 0.56)} L${f(x + s * 0.6)} ${f(y)} Z"/>`;
  }).join('')}</g>`;
}

// ── 예루살렘 성문 길 (15:1-6) ───────────────────
function gateArt(): string {
  return `<g class="ab ab--gate">
    ${ridge([[-W * 2, 132], [-60, 120], [80, 128], [200, 112], [330, 124], [W * 3, 118]], 'bd-far')}
    ${wall(126, 236)}
    <!-- 성문 망대 -->
    <g class="ab-tower"><rect x="160" y="84" width="80" height="152"/><path d="M156 84 ${Array.from({ length: 6 }, (_, i) => `v-8 h8 v8 h${i < 5 ? 6 : 0}`).join(' ')} Z"/></g>
    <path class="ab-gateway" d="M182 236 L182 184 Q200 162 218 184 L218 236 Z"/>
    <path class="ab-gatelight" d="M186 236 L186 188 Q200 170 214 188 L214 236 Z"/>
    <rect class="ab-slit" x="196" y="104" width="8" height="18" rx="2"/>
    <!-- 성문 길 -->
    <path class="ab-road" d="M200 238 C190 246 150 252 60 ${H}"/>
    <!-- 송사하러 온 사람들의 줄 (왼쪽) -->
    ${folk(36, 238, 150, 236, 10, 2.8, 8101)}
    <!-- 오른쪽: 압살롬의 병거와 말, 앞에 선 호위 오십 (15:1) -->
    <g class="ab-chariot">${chariot(280, 244, 1.25)}${horse(340, 244, 1.1)}${horse(352, 246, 1.05)}</g>
    ${folk(238, 238, 268, 240, 5, 2.4, 8102, 'js-folk ab-guards')}
    ${folk(372, 240, 420, 238, 6, 2.4, 8103, 'js-folk ab-guards')}
    ${ground(248)}
  </g>`;
}

// ── 기드론 시내 (15:23) ────────────────────────
function kidronArt(): string {
  return `<g class="ab ab--kidron">
    <!-- 왼쪽 위: 두고 가는 성 -->
    <path class="bd-far" d="M${-W * 2} 150 L-40 150 L-40 110 L20 108 L24 96 L40 96 L44 106 L120 108 L124 150 L140 150 L140 ${H} L${-W * 2} ${H} Z"/>
    <g class="ab-winlights">${[[-20, 122], [10, 118], [60, 120], [92, 124], [30, 102]].map(([x, y], i) => `<rect style="--d:${i * 0.7}s" x="${x}" y="${y}" width="2" height="2.6"/>`).join('')}</g>
    <!-- 맞은편: 감람산 비탈 -->
    ${ridge([[150, 200], [220, 160], [300, 124], [380, 104], [W * 3, 96]], 'bd-far')}
    <!-- 골짜기 양쪽 비탈 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 170 C-40 172 60 182 120 206 C150 218 170 228 196 232 L196 ${H} Z"/>
    <path class="bd-mid" d="M196 ${H} L196 232 C230 226 270 210 310 190 C350 172 400 160 ${W * 3} 152 L${W * 3} ${H} Z"/>
    <!-- 시내 -->
    <path class="ab-brook" d="M150 262 C170 248 186 240 196 236 C210 232 230 236 260 262 Z"/>
    <path class="ab-ripple" d="M180 246 q6 -2 12 0 M202 240 q6 -2 12 0 M220 250 q6 -2 12 0"/>
    <!-- 시내를 건너 비탈로 오르는 줄 -->
    ${folk(60, 186, 186, 230, 12, 2.4, 8201)}
    ${folk(210, 230, 340, 178, 12, 2.2, 8202)}
    ${ground(252)}
  </g>`;
}

// ── 감람산 오르막 (15:30) ──────────────────────
function olivesArt(): string {
  return `<g class="ab ab--olives">
    <!-- 왼쪽 아래 멀리: 두고 온 성 -->
    <path class="bd-far ab-farcity" d="M${-W * 2} 196 L-30 196 L-30 176 L10 174 L14 164 L26 164 L30 172 L90 174 L92 196 L110 196 L110 ${H} L${-W * 2} ${H} Z"/>
    <!-- 오른쪽 위로 오르는 산 -->
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 214 C-20 214 80 200 160 170 C220 146 290 112 360 92 C400 82 460 78 ${W * 3} 78 L${W * 3} ${H} Z"/>
    <!-- 마루턱 (15:32 하나님을 경배하는 곳) -->
    <circle class="bd-halo ab-crest" cx="372" cy="88" r="46"/>
    <!-- 비탈길 -->
    <path class="ab-road ab-road--slope" d="M20 ${H} C80 236 150 208 220 178 C270 156 320 128 380 104"/>
    ${olive(58, 222, 70, 8301)}${olive(330, 140, 48, 8302)}${olive(250, 172, 40, 8303)}${olive(410, 112, 44, 8304)}
    <!-- 머리를 가린 사람들의 긴 줄 -->
    <g class="ab-climb">${mourners(70, 234, 380, 106, 22, 2.6, 8305)}</g>
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 236 C-20 236 120 232 200 230 C280 228 420 224 ${W * 3} 222 L${W * 3} ${H} Z"/>
    ${olive(300, 246, 96, 8306)}
    ${ground(250)}
  </g>`;
}

// ── 바후림 산비탈 (16:5-13) ────────────────────
function bahurimArt(): string {
  const r = rng(8401);
  const rocks = Array.from({ length: 16 }, () => {
    const x = 250 + r() * 170;
    const y = 120 + (x - 250) * -0.1 + r() * 90;
    return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(3 + r() * 5)}" ry="${f(2 + r() * 3)}"/>`;
  }).join('');
  return `<g class="ab ab--bahurim">
    ${ridge([[-W * 2, 150], [-60, 140], [60, 148], [160, 136], [W * 3, 140]], 'bd-far')}
    <!-- 왼쪽: 낮게 흐르는 길 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 196 C-40 196 80 206 180 214 C220 216 240 214 250 210 L250 ${H} Z"/>
    <!-- 오른쪽: 가파른 산비탈 -->
    <path class="ab-slope" d="M226 ${H} L226 214 C240 196 250 170 262 140 C272 118 290 104 320 98 C360 92 420 92 ${W * 3} 94 L${W * 3} ${H} Z"/>
    <g class="ab-rocks">${rocks}</g>
    <path class="ab-path" d="M262 150 C290 122 340 108 ${W * 3} 104"/>
    <!-- 비탈의 마른 덤불 -->
    <path class="ab-scrub" d="M276 128 l-3 -8 M279 128 l0 -10 M282 128 l3 -8 M310 112 l-3 -7 M313 112 l0 -9 M316 112 l3 -7 M246 196 l-3 -7 M249 196 l0 -9 M252 196 l3 -7"/>
    <path class="ab-road" d="M-40 ${H} C40 244 140 238 240 236"/>
    <circle class="bd-halo ab-dusthaze" cx="280" cy="170" r="90"/>
    ${ground(250)}
  </g>`;
}

// ── 바후림 집 뜰의 우물, 밤 (17:18-19) ──────────
function wellArt(): string {
  const r = rng(8501);
  const grain = Array.from({ length: 70 }, () =>
    `<circle cx="${f(170 + r() * 60)}" cy="${f(220 + r() * 9 - Math.abs(r() - 0.5) * 6)}" r="${f(0.6 + r() * 0.7)}"/>`).join('');
  return `<g class="ab ab--well">
    ${stars(40, 100, 8502)}
    <!-- 뜰 담과 집 -->
    <rect class="ab-yardwall" x="${-W * 2}" y="150" width="${W * 5}" height="90"/>
    <path class="ab-courses" d="M${-W * 2} 172 H${W * 3} M${-W * 2} 196 H${W * 3} M${-W * 2} 218 H${W * 3}"/>
    <path class="bd-mid ab-house" d="M290 240 L290 112 L420 104 L${W * 3} 104 L${W * 3} 240 Z"/>
    <rect class="ab-door" x="312" y="168" width="26" height="72"/>
    <path class="ab-niche" d="M352 150 L352 132 Q360 124 368 132 L368 150 Z"/>
    <ellipse class="ab-flame" cx="360" cy="142" rx="1.6" ry="3.2"/>
    <circle class="bd-halo ab-lamphalo" cx="360" cy="142" r="44"/>
    <!-- 가운데: 덮은 우물 아구 + 찧은 곡식 -->
    <ellipse class="ab-wellrim" cx="200" cy="230" rx="44" ry="10"/>
    <path class="ab-cover" d="M160 228 C170 214 230 214 240 228 C236 234 166 234 160 228 Z"/>
    <g class="ab-grain">${grain}</g>
    <!-- 맷돌·광주리 -->
    <g class="bd-mid"><ellipse cx="96" cy="236" rx="16" ry="4"/><ellipse cx="96" cy="230" rx="11" ry="3.4"/><path d="M118 238 C118 226 124 222 134 222 C144 222 150 226 150 238 Z"/></g>
    <path class="ab-sheaf" d="M60 238 L54 206 M62 238 L62 204 M64 238 L70 206"/>
    ${ground(246)}
  </g>`;
}

// ── 마하나임 성문 (17:27-29, 18:4, 24, 33) ──────
function mahanaimArt(): string {
  return `<g class="ab ab--mahanaim">
    ${ridge([[-W * 2, 150], [-80, 138], [60, 146], [180, 134], [300, 144], [W * 3, 136]], 'bd-far')}
    ${wall(146, 240)}
    <!-- 문 건물: 두 겹 문, 위에 문루 -->
    <g class="ab-tower">
      <rect x="146" y="106" width="108" height="134"/>
      <rect x="166" y="66" width="68" height="42"/>
      <path d="M160 66 L200 50 L240 66 Z"/>
    </g>
    <rect class="ab-chamberwin" x="194" y="78" width="12" height="16" rx="2"/>
    <path class="ab-gateway" d="M160 240 L160 182 Q178 160 196 182 L196 240 Z"/>
    <path class="ab-gateway ab-gateway--inner" d="M206 240 L206 186 Q222 168 238 186 L238 240 Z"/>
    <path class="ab-gatelight" d="M164 240 L164 186 Q178 168 192 186 L192 240 Z"/>
    <!-- 문루로 오르는 바깥 돌계단 (오른쪽 벽을 따라) -->
    <path class="ab-stair" d="${Array.from({ length: 10 }, (_, i) => `M${254 + i * 6} ${240 - i * 13} h6 v13 h-6 Z`).join(' ')}"/>
    <path class="ab-stairwall" d="M254 240 L314 110 L320 110 L262 240 Z"/>
    <!-- 문 앞에 쌓인 것들: 침상·대야·질그릇·곡식 자루·양 (17:28-29) -->
    <g class="ab-gifts">
      <g class="bd-mid"><rect x="64" y="226" width="54" height="5" rx="1.5"/><rect x="66" y="231" width="4" height="9"/><rect x="112" y="231" width="4" height="9"/></g>
      <path class="ab-sack" d="M124 240 C120 226 124 216 132 214 L136 210 L140 214 C148 216 152 226 148 240 Z"/>
      <path class="ab-sack" d="M98 226 C95 216 98 210 104 208 L107 205 L110 208 C116 210 118 216 116 226 Z"/>
      <path class="ab-jar" d="M300 240 C292 232 294 220 302 216 L302 210 L310 210 L310 216 C318 220 320 232 312 240 Z"/>
      <path class="ab-jar" d="M322 240 C316 234 317 226 322 223 L322 219 L328 219 L328 223 C333 226 334 234 328 240 Z"/>
      <ellipse class="bd-mid" cx="344" cy="238" rx="12" ry="3"/>
    </g>
    ${ground(248)}
  </g>`;
}

// ── 문루 지붕에서 내다본 길 (18:24-27) ──────────
function watchArt(): string {
  return `<g class="ab ab--watch">
    ${ridge([[-W * 2, 132], [-40, 122], [100, 130], [200, 120], [320, 128], [W * 3, 122]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 140 C0 142 200 136 ${W * 3} 140 L${W * 3} ${H} Z"/>
    <!-- 들을 가로지르는 길 -->
    <path class="ab-plainroad" d="M150 141 C150 160 124 176 128 196 C132 214 112 230 104 ${H} L84 ${H} C96 230 116 214 112 196 C108 176 140 160 147 141 Z"/>
    <path class="ab-fieldpath" d="M150 141 C190 150 230 172 250 200 C262 220 270 236 280 250"/>
    <!-- 달려오는 두 사람 -->
    <g class="ab-runner ab-runner--1"><rect x="-1.4" y="-6" width="2.8" height="6" rx="1.4"/></g>
    <g class="ab-runner ab-runner--2"><rect x="-1.2" y="-5" width="2.4" height="5" rx="1.2"/></g>
    <!-- 앞쪽: 문루 지붕의 난간 -->
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 226 ${Array.from({ length: 40 }, (_, i) => `L${-W * 2 + i * 50} 226 L${-W * 2 + i * 50} 216 L${-W * 2 + i * 50 + 26} 216 L${-W * 2 + i * 50 + 26} 226`).join(' ')} L${W * 3} 226 L${W * 3} ${H} Z"/>
  </g>`;
}

// ── 에브라임 수풀 (18:6-8) ─────────────────────
function forestArt(): string {
  const r = rng(8701);
  const trunks = Array.from({ length: 18 }, () => {
    const x = -60 + r() * 520;
    const lean = (r() - 0.5) * 30;
    const w = 3 + r() * 5;
    return `<path d="M${f(x - w)} ${H} C${f(x - w)} 200 ${f(x + lean - w * 0.6)} 120 ${f(x + lean - w * 0.4)} 0 L${f(x + lean + w * 0.4)} 0 C${f(x + lean + w * 0.6)} 120 ${f(x + w)} 200 ${f(x + w)} ${H} Z"/>`;
  }).join('');
  const boughs = Array.from({ length: 14 }, () => {
    const x = -40 + r() * 480;
    const y = 30 + r() * 90;
    return `M${f(x)} ${f(y)} q${f(30 + r() * 30)} ${f(-10 + r() * 30)} ${f(60 + r() * 50)} ${f(r() * 30)}`;
  }).join(' ');
  return `<g class="ab ab--forest">
    ${tree(40, 150, 120, 'bd-far', 8702)}${tree(150, 140, 140, 'bd-far', 8703)}${tree(270, 146, 130, 'bd-far', 8704)}${tree(380, 150, 120, 'bd-far', 8705)}
    ${smoke(110, 170, 8706, 5)}${smoke(300, 176, 8707, 5)}
    <g class="ab-trunks">${trunks}</g>
    <path class="ab-boughs" d="${boughs}"/>
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 222 C-40 220 80 230 160 226 C240 222 320 232 ${W * 3} 226 L${W * 3} ${H} Z"/>
    <!-- 쓰러진 나무와 구덩이 (수풀이 삼킨 사람이 더 많았다) -->
    <path class="ab-fallen" d="M60 234 L170 222 L172 228 L64 240 Z"/>
    <ellipse class="ab-pit" cx="250" cy="240" rx="34" ry="5"/>
    <g class="bd-near"><path d="M300 244 C306 232 324 230 332 244 Z"/><path d="M110 248 C114 240 126 238 130 248 Z"/></g>
    <path class="ab-thicket" d="M10 246 q10 -24 20 0 q8 -20 16 0 M350 246 q10 -26 20 0 q8 -20 16 0"/>
    ${ground(250)}
  </g>`;
}

// ── 큰 상수리나무 (18:9) ───────────────────────
function oakArt(empty: boolean): string {
  const r = rng(8801);
  const leaves = Array.from({ length: 34 }, () => {
    const a = r() * Math.PI;
    const d = Math.sqrt(r());
    return `<circle cx="${f(200 + Math.cos(a) * 150 * d * (r() < 0.5 ? -1 : 1))}" cy="${f(70 - Math.sin(a) * 50 * d + r() * 20)}" r="${f(14 + r() * 16)}"/>`;
  }).join('');
  return `<g class="ab ab--oak${empty ? ' is-empty' : ''}">
    ${tree(-20, 170, 120, 'bd-far', 8802)}${tree(430, 170, 120, 'bd-far', 8803)}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 214 C-40 212 100 222 200 220 C300 218 420 222 ${W * 3} 218 L${W * 3} ${H} Z"/>
    <!-- 큰 상수리나무: 굵은 줄기와 낮고 넓게 뻗은 번성한 가지 -->
    <g class="ab-oak">
      <path d="M60 236 C70 200 62 170 80 140 C96 112 92 90 96 70 L108 70 C106 92 112 114 100 142 C88 172 92 204 84 236 Z"/>
      <path d="M96 104 C130 96 170 94 210 100 C240 104 270 102 300 92 L302 99 C272 110 240 112 210 108 C170 102 132 104 98 114 Z"/>
      <path d="M102 82 C120 60 150 48 180 46 L182 52 C152 56 126 68 108 88 Z"/>
      <path d="M230 102 C246 112 256 124 262 138 L257 140 C250 126 240 116 226 108 Z"/>
      <path d="M160 100 C164 112 166 122 164 134 L159 133 C160 122 158 112 154 102 Z"/>
      <g class="ab-oakleaf">${leaves}</g>
    </g>
    ${empty ? '' : `<!-- 가지에 걸려 매달린 작은 그림자 하나 — 몸에 닿는 것은 그리지 않는다 -->
    <g class="ab-hang">
      <path class="ab-hairmass" d="M204 103 C209 108 207 116 209 124 C210 128 211 131 212 133 L222 133 C224 129 224 124 225 118 C226 112 229 107 232 102 C224 106 213 106 204 103 Z"/>
      <path class="ab-hair" d="M208 106 C212 114 210 122 213 131 M218 106 C219 116 217 124 218 132 M228 104 C224 112 225 122 221 132"/>
      <circle cx="217" cy="137" r="5.6"/>
      <path d="M211 143 C208 151 207 163 208 177 L210 199 L213 199 L215 181 L218 181 L220 199 L223 199 L225 177 C226 163 225 151 222 143 C219 141 214 141 211 143 Z"/>
      <path d="M211.6 146 L203.4 129 L206.6 127.6 L214.4 143.4 Z M221.4 146 L229.6 129 L226.4 127.6 L218.6 143.4 Z"/>
    </g>
    <!-- 그 아래로 빠져 달아나는 노새 -->
    <g class="ab-mule">${horse(0, 0, 1.1)}</g>`}
    ${ground(246)}
  </g>`;
}

// ── 돌무더기 (18:17) ───────────────────────────
function cairnArt(): string {
  const r = rng(8901);
  const rocks: string[] = [];
  for (let row = 0; row < 6; row++) {
    const n = 7 - row;
    const half = 60 - row * 10;
    for (let k = 0; k < n; k++) {
      const x = 200 - half + (n === 1 ? half : (2 * half * k) / (n - 1)) + (r() - 0.5) * 4;
      rocks.push(`<ellipse cx="${f(x)}" cy="${f(236 - row * 9 + r() * 2)}" rx="${f(6 + r() * 4)}" ry="${f(3.6 + r() * 1.8)}"/>`);
    }
  }
  return `<g class="ab ab--cairn">
    ${tree(30, 170, 130, 'bd-far', 8902)}${tree(120, 160, 110, 'bd-far', 8903)}${tree(300, 164, 120, 'bd-far', 8904)}${tree(390, 168, 130, 'bd-far', 8905)}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 220 C-40 218 80 226 200 224 C320 222 420 228 ${W * 3} 222 L${W * 3} ${H} Z"/>
    <!-- 심히 큰 돌무더기 -->
    <path class="ab-heap" d="M130 242 C140 214 166 192 200 186 C234 192 260 214 270 242 Z"/>
    <g class="ab-heapstones">${rocks.join('')}</g>
    <g class="bd-near"><ellipse cx="110" cy="244" rx="8" ry="3"/><ellipse cx="292" cy="244" rx="9" ry="3"/></g>
    ${ground(248)}
  </g>`;
}

// ── 왕의 골짜기의 비석 (18:18) ──────────────────
function pillarArt(): string {
  return `<g class="ab ab--pillar">
    ${ridge([[-W * 2, 120], [-40, 108], [80, 128], [200, 150], [320, 126], [440, 110], [W * 3, 116]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 180 C-20 184 120 206 200 210 C280 206 420 186 ${W * 3} 180 L${W * 3} ${H} Z"/>
    <circle class="bd-halo ab-pillarhalo" cx="200" cy="170" r="70"/>
    <!-- 홀로 선 비석 -->
    <path class="ab-stele" d="M188 240 L190 140 Q200 130 210 140 L212 240 Z"/>
    <path class="ab-stele-edge" d="M190 140 Q200 130 210 140"/>
    <path class="ab-stele-base" d="M178 244 L180 236 L220 236 L222 244 Z"/>
    ${ground(248)}
  </g>`;
}

// ── 문루의 작은 방 (18:33) ─────────────────────
function chamberArt(): string {
  const r = rng(9001);
  const motes = Array.from({ length: 14 }, () =>
    `<circle style="--d:${f(r() * 8)}s" cx="${f(236 + r() * 60)}" cy="${f(100 + r() * 120)}" r="${f(0.5 + r() * 0.8)}"/>`).join('');
  return `<g class="ab ab--chamber">
    <rect class="ab-roomwall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <path class="ab-courses" d="${Array.from({ length: 18 }, (_, i) => `M${-W * 2} ${16 + i * 14} H${W * 3}`).join(' ')}"/>
    <!-- 낮은 천장 들보 -->
    <rect class="ab-beam" x="${-W * 2}" y="30" width="${W * 5}" height="10"/>
    <!-- 작은 창 하나와 저녁빛 -->
    <rect class="ab-window" x="258" y="86" width="22" height="34" rx="2"/>
    <path class="ab-windowsill" d="M254 120 H284 V124 H254 Z"/>
    <path class="ab-shaft" d="M258 88 L280 88 L330 248 L196 248 Z"/>
    <g class="ab-motes">${motes}</g>
    <!-- 벽감의 꺼진 등잔 -->
    <path class="ab-niche" d="M118 150 L118 130 Q128 120 138 130 L138 150 Z"/>
    <path class="bd-mid" d="M121 150 C121 146 126 144 130 144 C134 144 137 146 136 150 Z"/>
    <!-- 바닥 왼쪽: 열린 계단 구멍과 난간 -->
    <rect class="bd-mid ab-floor" x="${-W * 2}" y="236" width="${W * 5}" height="${H - 236}"/>
    <path class="ab-stairhole" d="M40 244 L120 244 L112 ${H} L32 ${H} Z"/>
    <path class="ab-steps" d="M44 248 H116 M42 254 H114"/>
    <path class="ab-rail" d="M40 244 L40 214 M120 244 L120 214 M36 214 H124"/>
  </g>`;
}

export function absalomArt(art: AbsalomArt): string {
  switch (art) {
    case 'ab-gate': return gateArt();
    case 'ab-kidron': return kidronArt();
    case 'ab-olives': return olivesArt();
    case 'ab-bahurim': return bahurimArt();
    case 'ab-well': return wellArt();
    case 'ab-mahanaim': return mahanaimArt();
    case 'ab-watch': return watchArt();
    case 'ab-forest': return forestArt();
    case 'ab-oak': return oakArt(false);
    case 'ab-oak-empty': return oakArt(true);
    case 'ab-cairn': return cairnArt();
    case 'ab-pillar': return pillarArt();
    case 'ab-chamber': return chamberArt();
  }
}

// ── 효과 ───────────────────────────────────────
/** 무대 위 인물의 그림 상자 (scene 기준 좌표). 없으면 fallback 쪽 */
function actorBox(scene: HTMLElement, id: string | undefined, fallback: 'right' | 'left') {
  const b = scene.getBoundingClientRect();
  const actors = [...scene.querySelectorAll<HTMLElement>('.scene__stage .actor')];
  const art = (a: HTMLElement) => (a.querySelector<SVGElement>('.actor__art') ?? a).getBoundingClientRect();
  let el = id ? actors.find((a) => a.dataset.id === id) : undefined;
  if (!el && actors.length) {
    const xs = actors.map((a) => [a, art(a).left + art(a).width / 2 - b.left] as const);
    el = (fallback === 'right' ? xs.reduce((m, c) => (c[1] > m[1] ? c : m)) : xs.reduce((m, c) => (c[1] < m[1] ? c : m)))[0];
  }
  const a = el ? art(el) : null;
  if (!a || !a.width) return { x: fallback === 'right' ? b.width * 0.8 : b.width * 0.25, top: b.height * 0.4, h: b.height * 0.5 };
  return { x: a.left - b.left + a.width / 2, top: a.top - b.top, h: a.height };
}

/** stones: 돌과 티끌 (삼하 16:6, 13) — 던지는 사람에게서 돌이 세 번 날아가 상대 앞에 떨어져 튄다. 아무도 맞지 않는다 */
export function playStones(scene: HTMLElement, from: string | undefined, to: string | undefined, rm: boolean): void {
  const a = actorBox(scene, from ?? 'shimei', 'right');
  const b = actorBox(scene, to ?? 'david', 'left');
  const sx = a.x;
  const sy = a.top + a.h * 0.22;
  const gy = b.top + b.h; // 상대의 발밑
  const dx = (b.x - sx) * 0.72; // 상대 앞에 떨어진다
  const stones = rm ? '' : Array.from({ length: 7 }, (_, i) => {
    const k = ((i * 37) % 11) / 11;
    return `<i class="fx-stones__stone" style="--i:${i}; --dx:${f(dx + (k - 0.5) * 50)}px; --dy:${f(gy - sy - 4 - k * 8)}px; --s:${f(4 + k * 4)}px"></i>`;
  }).join('');
  const puffs = rm ? '' : Array.from({ length: 6 }, (_, i) =>
    `<b class="fx-stones__puff" style="--i:${i}; --o:${f((((i * 29) % 13) - 6) * 6)}px"></b>`).join('');
  const layer = document.createElement('div');
  layer.className = `fx-stones${rm ? ' is-rm' : ''}`;
  layer.innerHTML = `<div class="fx-stones__at" style="--x:${f(sx)}px; --y:${f(sy)}px; --gy:${f(a.top + a.h - sy)}px">${stones}${puffs}</div>`;
  scene.append(layer);
  const life = rm ? 1600 : 6400;
  setTimeout(() => layer.classList.add('is-out'), life - 1200);
  setTimeout(() => layer.remove(), life);
}
