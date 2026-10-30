// 7막 A급 — 요나단의 화살 (삼상 18–20) · 엔게디 굴 (삼상 24)의 전용 배경과 효과. 같은 종이 오려낸 그림자극 말투.
// 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - jn-hall        : 기브아 사울의 집 안. 돌벽, 벽 곁 높은 자리, 벽감의 등잔, 낮은 화로, 벽에 걸린 수금 걸이 (18:10, 19:9)
//  - jn-hall-spear  : 같은 곳, 비어 있는 자리 옆 벽에 창이 비스듬히 박혀 있고 돌에 금이 갔다 (19:10 "사울의 창은 벽에 박힌지라")
//  - jn-window      : 밤, 다윗의 집 바깥벽. 높은 창에 등불, 집 모퉁이에 횃불 든 사울의 사자들 (19:11)
//  - jn-window-rope : 같은 창에서 땅까지 늘어뜨린 줄 (19:12 "미갈이 다윗을 창에서 달아내리우매")
//  - jn-bed         : 다윗의 방. 침상 위에 옷을 덮은 사람 모양, 머리맡의 염소털, 꺼져 가는 등잔, 문틈의 새벽빛 (19:13-16)
//  - jn-feast       : 월삭(초하루)의 왕의 식탁. 벽 곁 왕의 자리, 긴 식탁과 떡·병, 높은 창의 초승달,
//                     등잔 빛이 고인 빈자리 하나 (20:25 "다윗의 자리는 비었으나")
//  - jn-field       : 기브아 바깥 들. 오른쪽 큰 바위(에셀 바위 — 다윗이 그 뒤에서 나온다), 멀리 언덕 위 기브아, 트인 들 (20:19, 35)
//  - jn-engedi      : 엔게디 황무지. 높은 석회암 벼랑과 바위 턱의 들염소들, 벼랑을 타고 내리는 가는 샘물,
//                     길가 양의 우리(돌담), 벼랑 밑의 검은 굴 입구 (24:2-3)
//  - jn-cave        : 굴 안. 오른쪽 입구로 들어오는 역광과 바닥에 떨어진 빛, 왼쪽 깊은 어둠 속의 희미한 사람들 (24:3)
//  - jn-cliff       : 굴 밖 벼랑 위. 등 뒤의 굴 입구, 깊은 골짜기, 맞은편 비탈을 내려가는 사울의 군대 (24:8, 22)
// 효과:
//  - spear-throw : 창 던짐 — 던지는 사람(who, 없으면 saul)의 손에서 창이 상대(to, 없으면 david) 쪽으로 날아가고,
//                  상대는 몸을 낮춰 피하고, 창은 그 너머에 박혀 떨린다 (약 4초, 18:11 · 19:10 · 20:33)
//  - arrows      : 화살 — 쏘는 사람(who, 없으면 jonathan)에게서 화살 셋이 높이 날아 들 저편으로 떨어진다 (약 5초, 20:20, 36)
//  - hem         : 옷자락 — 대상(who, 없으면 david)의 앞손 높이에 벤 겉옷 자락 한 조각이 떠오르며 금빛 테가 그어짐 (약 5초, 24:4, 11)
// 하나님은 그리지 않는다. 피·상처는 그리지 않는다 (창은 늘 빗나간다 — 본문대로).
import { H, W, rng, tree } from './backdrop';
import { folk, ground, ridge, stars } from './joshua';

export type JonathanArt =
  | 'jn-hall' | 'jn-hall-spear' | 'jn-window' | 'jn-window-rope' | 'jn-bed' | 'jn-feast' | 'jn-field'
  | 'jn-engedi' | 'jn-cave' | 'jn-cliff';

const f = (n: number) => n.toFixed(1);

/** 돌벽 줄눈 */
function masonry(x0: number, x1: number, y0: number, y1: number, row: number, seed: number): string {
  const r = rng(seed);
  let d = '';
  let k = 0;
  for (let y = y0; y < y1; y += row, k++) {
    d += `M${x0} ${y} H${x1} `;
    for (let x = x0 + (k % 2 ? 20 : 0) + r() * 20; x < x1; x += 44 + r() * 30) d += `M${f(x)} ${y} V${Math.min(y + row, y1)} `;
  }
  return `<path class="jn-stones" d="${d}"/>`;
}

/** 등잔 하나 (작은 불꽃 + 빛무리) */
function lamp(x: number, y: number, halo: number, d = 0): string {
  return `<path class="bd-mid" d="M${x - 7} ${y} C${x - 6} ${y + 5} ${x + 6} ${y + 5} ${x + 8} ${y} Z"/>
    <path class="jn-flame" style="--d:${f(d)}s" d="M${x + 5} ${y} C${x + 3} ${y - 4} ${x + 6} ${y - 7} ${x + 7} ${y - 10} C${x + 9} ${y - 6} ${x + 10} ${y - 3} ${x + 8} ${y} Z"/>
    <circle class="bd-halo jn-lamphalo" cx="${x + 6}" cy="${y - 5}" r="${halo}"/>`;
}

/** 들염소 (석회암 바위 턱 위, 뒤로 휜 긴 뿔) */
function ibex(x: number, y: number, s: number, flip: boolean, d: number): string {
  const k = flip ? -1 : 1;
  return `<g class="jn-ibex" style="--d:${f(d)}s" transform="translate(${f(x)} ${f(y)}) scale(${f(s * k)} ${f(s)})">
    <path d="M-7 -4 C-7 -8 6 -9 8 -6 L10 -10 C11 -12 13 -12 13.4 -10 L12 -5 L10 -4 L9 1 L8 1 L7.4 -3 L-4 -3 L-5 1 L-6 1 L-6.6 -3 C-7.4 -3 -8 -3.6 -7 -4 Z"/>
    <path d="M11.4 -11.4 C10 -16 6 -19 2 -18.4 C6 -17 9 -14 10.6 -10.6 Z"/>
  </g>`;
}

/** 굴 입구 (아래가 넓은 검은 아치) */
function caveMouth(cx: number, base: number, w: number, h: number, cls = 'jn-mouth'): string {
  return `<path class="${cls}" d="M${f(cx - w / 2)} ${base} C${f(cx - w / 2)} ${f(base - h * 0.7)} ${f(cx - w * 0.28)} ${f(base - h)} ${f(cx)} ${f(base - h)} C${f(cx + w * 0.3)} ${f(base - h)} ${f(cx + w / 2)} ${f(base - h * 0.6)} ${f(cx + w / 2)} ${base} Z"/>`;
}

// ── 사울의 집 안 ───────────────────────────────
function hallArt(spear: boolean): string {
  const stuck = spear
    ? `<g class="jn-stuck">
        <path class="jn-crack" d="M218 98 l-5 -7 l-2 -8 M218 98 l7 -4 l7 -7 M218 98 l1 9 l-4 7 M218 98 l8 6"/>
        <circle class="bd-halo" cx="200" cy="88" r="40"/>
        <path class="jn-shaft" d="M216 98.6 L150 64 L151.4 61.4 L217.4 96 Z"/>
        <path class="jn-shaft" d="M152 62 L144 58 L146 64 Z"/>
      </g>`
    : '';
  return `<g class="jn jn--hall">
    <rect class="jn-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    ${masonry(-80, 480, 30, 232, 26, 7101)}
    <!-- 높은 창 둘: 바깥의 빛 -->
    <rect class="jn-slit" x="120" y="34" width="9" height="40" rx="4.5"/><rect class="jn-slit" x="276" y="34" width="9" height="40" rx="4.5"/>
    <!-- 벽감과 등잔 -->
    <path class="jn-niche" d="M58 148 L58 120 C58 110 84 110 84 120 L84 148 Z"/>${lamp(64, 146, 22, 0.4)}
    <path class="jn-niche" d="M330 148 L330 120 C330 110 356 110 356 120 L356 148 Z"/>${lamp(336, 146, 22, 1.2)}
    <!-- 벽 곁 높은 자리 (왕의 자리) -->
    <g class="bd-mid"><path d="M268 248 L268 210 L262 210 L262 158 C262 148 274 144 288 144 C302 144 314 148 314 158 L314 210 L308 210 L308 248 Z"/><rect x="258" y="206" width="60" height="6"/></g>
    <path class="jn-rug" d="M60 246 L340 246 L360 256 L40 256 Z"/>
    <!-- 수금 걸이: 벽의 나무 못 -->
    <path class="bd-mid" d="M196 132 h10 v4 h-10 Z"/>
    ${stuck}
    <!-- 낮은 화로 -->
    <g class="bd-mid"><path d="M18 220 L42 220 L38 230 L22 230 Z"/><path d="M28 230 L22 248 M32 230 L38 248" stroke="currentColor" stroke-width="2.2"/></g>
    <ellipse class="jn-ember" cx="30" cy="219" rx="10" ry="2"/>
    ${ground(250)}
  </g>`;
}

// ── 밤, 다윗의 집 창 ─────────────────────────────
function windowArt(rope: boolean): string {
  const r = rng(7121);
  const watchers = [104, 118, 134].map((x, i) => `
    <g class="jn-watch"><rect x="${x - 2.4}" y="${222 - i * 1.5}" width="5" height="${18 + r() * 3}" rx="2.4"/><circle cx="${x}" cy="${219 - i * 1.5}" r="2.8"/></g>
    <path class="jn-torch" style="--d:${f(i * 0.6)}s" d="M${x + 4} ${214 - i * 1.5} C${x + 2} ${208 - i * 1.5} ${x + 5} ${204 - i * 1.5} ${x + 6} ${199 - i * 1.5} C${x + 8} ${204 - i * 1.5} ${x + 9} ${209 - i * 1.5} ${x + 7} ${214 - i * 1.5} Z"/>
    <circle class="bd-halo jn-torchhalo" cx="${x + 6}" cy="${206 - i * 1.5}" r="20"/>`).join('');
  const line = rope
    ? `<g class="jn-rope"><path d="M232 104 C230 140 236 176 233 214 C232 230 235 240 234 248" fill="none" stroke-width="2.2"/>
        <path d="M240 104 C242 140 237 176 240 214 C241 230 238 240 240 248" fill="none" stroke-width="1.4"/>
        <path d="M233 132 h7 M235 162 h5 M234 192 h6 M235 222 h5" fill="none" stroke-width="1"/></g>`
    : '';
  return `<g class="jn jn--window">
    ${stars(70, 120, 7122)}
    <circle class="jn-moon" cx="64" cy="40" r="9"/>
    ${ridge([[-W * 2, 168], [-80, 160], [60, 166], [180, 156], [320, 164], [480, 154], [W * 3, 162]], 'bd-far')}
    <!-- 옆집들 -->
    <g class="bd-mid"><rect x="-60" y="150" width="90" height="100"/><rect x="30" y="170" width="50" height="80"/><rect x="380" y="160" width="120" height="90"/></g>
    <!-- 다윗의 집: 높은 바깥벽 -->
    <g class="jn-house"><rect x="110" y="58" width="180" height="192"/><rect x="106" y="52" width="188" height="7"/>
      <rect x="106" y="44" width="5" height="9"/><rect x="160" y="44" width="5" height="9"/><rect x="235" y="44" width="5" height="9"/><rect x="289" y="44" width="5" height="9"/><rect x="106" y="42" width="188" height="3"/></g>
    ${masonry(110, 290, 80, 248, 24, 7123)}
    <!-- 창 -->
    <path class="jn-win" d="M222 112 L222 86 C222 78 250 78 250 86 L250 112 Z"/>
    <circle class="bd-halo jn-winhalo" cx="236" cy="96" r="34"/>
    <path class="jn-sill" d="M218 112 h36 v4 h-36 Z"/>
    ${line}
    <!-- 집 모퉁이 문, 지키는 사자들 -->
    <path class="jn-door" d="M140 250 L140 210 C140 202 160 202 160 210 L160 250 Z"/>
    ${watchers}
    ${ground(250)}
  </g>`;
}

// ── 다윗의 방, 침상 ──────────────────────────────
function bedArt(): string {
  const r = rng(7141);
  const hair = Array.from({ length: 26 }, () => {
    const a = r() * Math.PI;
    const x = 132 + Math.cos(a) * (6 + r() * 6);
    const y = 194 - Math.sin(a) * (5 + r() * 6);
    return `M${f(132 + Math.cos(a) * 4)} ${f(194 - Math.sin(a) * 3)} L${f(x)} ${f(y)}`;
  }).join(' ');
  return `<g class="jn jn--bed">
    <rect class="jn-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    ${masonry(-80, 480, 40, 220, 28, 7142)}
    <!-- 문틈의 새벽빛 -->
    <path class="jn-dawndoor" d="M330 248 L330 150 C330 136 360 136 360 150 L360 248 Z"/>
    <path class="jn-dawnspill" d="M330 248 L360 248 L300 260 L250 260 Z"/>
    <!-- 벽감의 꺼져 가는 등잔 -->
    <path class="jn-niche" d="M62 150 L62 122 C62 112 88 112 88 122 L88 150 Z"/>${lamp(68, 148, 16, 0.8)}
    <!-- 침상: 낮은 나무틀 -->
    <g class="bd-mid"><rect x="112" y="206" width="186" height="10"/><rect x="116" y="216" width="6" height="30"/><rect x="290" y="216" width="6" height="30"/></g>
    <!-- 옷을 덮은 사람 모양 (우상, 19:13) -->
    <path class="jn-cover" d="M130 206 C128 196 140 188 154 190 C170 184 196 186 214 190 C240 186 270 188 286 196 C292 200 294 204 292 206 Z"/>
    <path class="detail jn-fold" d="M160 192 Q170 200 168 206 M210 190 Q224 198 222 206 M252 190 Q260 198 262 206" fill="none"/>
    <!-- 머리맡의 염소털 -->
    <circle class="jn-goat" cx="132" cy="194" r="7"/>
    <path class="jn-goathair" d="${hair}"/>
    ${ground(250)}
  </g>`;
}

// ── 월삭의 식탁 ────────────────────────────────
function feastArt(): string {
  const r = rng(7161);
  const breads = Array.from({ length: 6 }, (_, i) => `<ellipse class="jn-bread" cx="${f(70 + i * 46 + r() * 8)}" cy="203" rx="7" ry="2.6"/>`).join('');
  const jugs = [96, 182, 330].map((x) => `<path class="bd-mid" d="M${x - 4} 204 C${x - 7} 198 ${x - 6} 190 ${x - 2} 188 L${x - 2} 184 L${x + 2} 184 L${x + 2} 188 C${x + 6} 190 ${x + 7} 198 ${x + 4} 204 Z"/>`).join('');
  const cushion = (x: number, empty: boolean) =>
    `<path class="${empty ? 'jn-empty' : 'bd-mid'}" d="M${x - 16} 236 C${x - 16} 228 ${x + 16} 228 ${x + 16} 236 L${x + 16} 242 L${x - 16} 242 Z"/>`;
  return `<g class="jn jn--feast">
    <rect class="jn-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    ${masonry(-80, 480, 30, 190, 26, 7162)}
    <!-- 높은 창의 초승달 (월삭) -->
    <rect class="jn-nightwin" x="186" y="30" width="28" height="42" rx="14"/>
    <path class="jn-crescent" d="M206 44 C200 46 198 56 204 62 C196 62 192 54 194 48 C196 42 202 40 206 44 Z"/>
    <!-- 벽 곁 왕의 자리 (20:25 "평시와 같이 벽 곁 자기 자리에") -->
    <g class="bd-mid"><path d="M88 196 L88 140 C88 130 100 126 114 126 C128 126 140 130 140 140 L140 196 Z"/></g>
    <path class="jn-hang" d="M60 30 L60 150 L74 160 L74 30 Z M326 30 L326 160 L340 150 L340 30 Z"/>
    ${lamp(30, 150, 24, 0.2)}${lamp(364, 150, 24, 1.1)}
    <!-- 빈자리에 고인 등잔 빛 -->
    <circle class="bd-halo jn-emptyhalo" cx="282" cy="214" r="46"/>
    ${lamp(276, 196, 18, 0.6)}
    <!-- 긴 식탁 -->
    <g class="bd-mid"><rect x="30" y="204" width="340" height="9"/><rect x="40" y="212" width="6" height="22"/><rect x="354" y="212" width="6" height="22"/></g>
    ${breads}${jugs}
    ${cushion(114, false)}${cushion(170, false)}${cushion(226, false)}${cushion(282, true)}
    ${ground(250)}
  </g>`;
}

// ── 들, 에셀 바위 ───────────────────────────────
function fieldArt(): string {
  const r = rng(7181);
  const grass = Array.from({ length: 70 }, () => {
    const x = -60 + r() * 520;
    const y = 214 + r() * 34;
    const h = 3 + r() * 5;
    return `M${f(x)} ${f(y)} q${f(1 + r())} ${f(-h * 0.6)} ${f(r() * 3 - 1)} ${f(-h)}`;
  }).join(' ');
  return `<g class="jn jn--field">
    ${ridge([[-W * 2, 150], [-120, 144], [0, 150], [100, 132], [180, 146], [300, 140], [440, 148], [W * 3, 142]], 'bd-far')}
    <!-- 멀리 언덕 위 기브아 -->
    <g class="bd-far jn-town">${Array.from({ length: 7 }, (_, i) => `<rect x="${78 + i * 7 + r() * 2}" y="${118 + Math.abs(i - 3) * 2.4 - r() * 4}" width="${6 + r() * 4}" height="${10 + r() * 6}"/>`).join('')}<rect x="96" y="108" width="7" height="12"/></g>
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 200 C-80 192 60 186 160 196 C240 204 320 190 400 192 C520 196 700 200 ${W * 3} 204 L${W * 3} ${H} Z"/>
    <!-- 오른쪽으로 트인 들: 고랑 -->
    <path class="jn-furrow" d="M220 206 C300 202 380 200 520 204 M230 214 C310 210 400 208 540 212 M236 224 C320 220 420 218 560 222"/>
    <!-- 에셀 바위 (20:19) -->
    <g transform="translate(160 0)">
      <path class="jn-rock" d="M74 248 C70 226 78 200 96 186 C110 176 124 170 140 172 C156 174 168 186 174 202 C180 218 182 234 180 248 Z"/>
      <path class="jn-rockline" d="M100 192 C110 200 112 214 108 230 M140 178 C150 190 152 210 150 236 M118 182 C126 186 130 194 128 202"/>
    </g>
    <path class="jn-grass" d="${grass}"/>
    ${tree(40, 204, 44, 'bd-mid', 7182, { sway: true, lean: 0.1 })}
    ${ground(250)}
  </g>`;
}

// ── 엔게디: 들염소 바위와 굴 ──────────────────────
function engediArt(): string {
  return `<g class="jn jn--engedi">
    ${ridge([[-W * 2, 120], [-100, 110], [30, 118], [150, 96], [260, 112], [380, 100], [W * 3, 112]], 'bd-far')}
    <!-- 높은 석회암 벼랑: 층층이 진 바위 턱 -->
    <path class="jn-cliff" d="M${-W * 2} ${H} L${-W * 2} 70 C-200 64 -40 60 40 66 C80 70 96 50 130 52 C170 54 186 70 220 64 C260 58 290 44 340 50 C420 58 600 62 ${W * 3} 66 L${W * 3} ${H} Z"/>
    <path class="jn-ledge" d="M-40 102 C30 98 90 106 150 100 M180 118 C240 112 300 120 380 112 M-20 150 C40 146 100 152 140 148 M250 156 C300 150 360 156 440 150 M60 184 C110 178 150 186 170 182"/>
    <!-- 바위 턱의 들염소들 (24:2) -->
    ${ibex(118, 99, 0.9, false, 0)}${ibex(146, 98, 0.75, true, 1.2)}${ibex(280, 116, 0.85, true, 0.6)}${ibex(320, 151, 0.95, false, 1.8)}${ibex(36, 148, 0.8, false, 2.4)}
    <!-- 벼랑을 타고 내리는 가는 샘물 (엔게디 = 염소의 샘) -->
    <path class="jn-spring" d="M352 52 C350 80 356 110 352 140 C350 170 356 200 354 236"/>
    <path class="jn-spring jn-spring--b" d="M355 52 C354 84 359 112 356 142 C354 170 359 202 357 236"/>
    <!-- 벼랑 밑의 굴 입구 -->
    ${caveMouth(214, 236, 64, 50)}
    <!-- 길가 양의 우리 (24:3): 낮은 돌담과 양 -->
    <path class="bd-mid" d="M66 240 C66 226 150 222 160 232 L160 240 Z"/>
    <path class="jn-pen" d="M70 232 h86 M74 226 h80"/>
    ${[80, 96, 112, 128, 142].map((x, i) => `<ellipse class="jn-sheep" cx="${x}" cy="${222 - (i % 2) * 2}" rx="5.4" ry="3.2"/>`).join('')}
    <path class="jn-path" d="M-40 252 C40 246 120 250 200 244 C280 240 360 248 460 244"/>
    ${ground(250)}
  </g>`;
}

// ── 굴 안 ────────────────────────────────────
function caveArt(): string {
  const r = rng(7201);
  const drips = Array.from({ length: 9 }, () => {
    const x = -20 + r() * 260;
    return `<path class="jn-stal" d="M${f(x - 4)} 0 L${f(x + 4)} 0 L${f(x)} ${f(12 + r() * 26)} Z"/>`;
  }).join('');
  return `<g class="jn jn--cave">
    <rect class="jn-dark" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <!-- 입구: 바깥 하늘과 먼 벼랑 -->
    <path class="jn-outside" d="M236 248 C232 190 244 120 288 96 C320 80 360 86 380 110 C396 132 402 190 400 248 Z"/>
    <path class="jn-outfar" d="M236 200 C270 190 300 196 330 188 C360 182 380 190 402 186 L402 248 L236 248 Z"/>
    <!-- 굴 벽: 입구 둘레의 거친 바위 -->
    <path class="jn-rockwall" d="M${-W * 2} 0 L${W * 3} 0 L${W * 3} ${H} L404 ${H} C410 190 400 120 380 98 C356 74 316 72 284 90 C246 112 228 170 232 ${H} L${-W * 2} ${H} Z" fill-rule="evenodd"/>
    ${drips}
    <!-- 깊은 곳: 희미한 사람들 (24:3 "굴 깊은 곳에") -->
    <path class="jn-floor" d="M${-W * 2} ${H} L${-W * 2} 246 C-60 242 120 250 220 246 C300 244 420 250 ${W * 3} 248 L${W * 3} ${H} Z"/>
    <!-- 들어오는 빛: 바닥으로 길게 -->
    <path class="jn-beam" d="M250 120 L388 112 L260 252 L40 256 Z"/>
    <ellipse class="jn-floorlight" cx="230" cy="250" rx="150" ry="9"/>
    <g class="jn-hidden">${folk(28, 236, 120, 240, 7, 6.4, 7202, 'jn-men')}</g>
  </g>`;
}

// ── 굴 밖 벼랑 ────────────────────────────────
function cliffArt(): string {
  return `<g class="jn jn--cliff">
    ${ridge([[-W * 2, 132], [-80, 120], [60, 128], [180, 112], [300, 124], [440, 110], [W * 3, 122]], 'bd-far')}
    <!-- 맞은편 비탈과 내려가는 사울의 군대 (24:22) -->
    <path class="bd-mid" d="M180 ${H} L180 170 C220 150 280 140 340 144 C420 148 560 150 ${W * 3} 156 L${W * 3} ${H} Z"/>
    ${folk(250, 156, 400, 150, 18, 1.5, 7221, 'js-folk jn-army')}
    ${ibex(300, 142, 0.6, true, 0.4)}
    <!-- 깊은 골짜기 -->
    <path class="jn-gorge" d="M120 ${H} C150 230 170 200 190 182 C200 196 210 220 230 ${H} Z"/>
    <!-- 이쪽 벼랑: 등 뒤의 굴 입구 -->
    <path class="jn-cliff" d="M${-W * 2} ${H} L${-W * 2} 90 C-200 80 -40 84 40 96 C90 104 110 140 130 180 C140 200 150 220 156 ${H} Z"/>
    ${caveMouth(52, 196, 54, 46)}
    <path class="jn-ledge" d="M-40 130 C0 126 40 132 80 128 M-30 166 C10 160 50 168 100 164"/>
    <path class="jn-near" d="M${-W * 2} ${H} L${-W * 2} 244 C-40 240 120 236 220 242 C300 246 420 240 ${W * 3} 244 L${W * 3} ${H} Z"/>
  </g>`;
}

export function jonathanArt(art: JonathanArt): string {
  switch (art) {
    case 'jn-hall': return hallArt(false);
    case 'jn-hall-spear': return hallArt(true);
    case 'jn-window': return windowArt(false);
    case 'jn-window-rope': return windowArt(true);
    case 'jn-bed': return bedArt();
    case 'jn-feast': return feastArt();
    case 'jn-field': return fieldArt();
    case 'jn-engedi': return engediArt();
    case 'jn-cave': return caveArt();
    case 'jn-cliff': return cliffArt();
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

/** 무대 위 인물의 그림 상자 (scene 기준 좌표) */
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
  if (!a || !a.width) return { el, x: b.width / 2, top: b.height * 0.4, h: b.height * 0.5, w: 80, W: b.width };
  return { el, x: a.left - b.left + a.width / 2, top: a.top - b.top, h: a.height, w: a.width, W: b.width };
}

/** spear-throw: 창 던짐 (삼상 18:11, 19:10, 20:33) — 창은 빗나가 그 너머에 박혀 떨린다. 상대는 몸을 낮춰 피한다 */
export function playSpearThrow(scene: HTMLElement, who: string | undefined, to: string | undefined, rm: boolean): void {
  const from = actorBox(scene, who ?? 'saul', 'right');
  let target = actorBox(scene, to ?? 'david', 'left');
  if (target.el && target.el === from.el) target = actorBox(scene, undefined, 'left');
  const dir = target.x >= from.x ? 1 : -1;
  const sx = from.x - dir * from.w * 0.05;
  const sy = from.top + from.h * 0.26;
  // 상대의 머리 옆을 지나 그 너머(벽)에 박힌다
  const ex = Math.max(18, Math.min(target.W - 18, target.x + dir * Math.max(target.w * 0.75, 46)));
  const ey = target.top + target.h * 0.2;
  const dx = ex - sx;
  const dy = ey - sy;
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  const len = Math.min(150, Math.max(90, from.h * 0.62));
  layerOf(scene, `fx-spear${rm ? ' is-rm' : ''}`,
    `<div class="fx-spear__at" style="--x:${f(sx)}px; --y:${f(sy)}px; --dx:${f(dx)}px; --dy:${f(dy)}px; --ang:${f(ang)}deg; --len:${f(len)}px; --dist:${f(Math.hypot(dx, dy))}px">
      <b class="fx-spear__streak"></b>
      <i class="fx-spear__shaft"><s></s></i>
    </div>
    <div class="fx-spear__hit" style="--x:${f(ex)}px; --y:${f(ey)}px"></div>`,
    rm ? 2400 : 4400, 900);
  // 피함: 상대가 몸을 낮추며 옆으로 비킨다 (두 번째 이름 없이도 — 본문은 "그 앞에서 두번 피하였더라")
  const art = target.el?.querySelector<SVGElement>('.actor__art');
  if (art && !rm && typeof art.animate === 'function') {
    art.animate(
      [{ translate: '0 0' }, { translate: '0 0', offset: 0.42 }, { translate: `${-dir * 12}px 16px`, offset: 0.55 }, { translate: `${-dir * 12}px 16px`, offset: 0.72 }, { translate: '0 0' }],
      { duration: 1900, easing: 'ease-out' },
    );
  }
  // 던지는 사람이 팔을 뻗는 몸짓
  const thrower = from.el?.querySelector<SVGElement>('.actor__art');
  if (thrower && !rm && typeof thrower.animate === 'function') {
    thrower.animate([{ translate: '0 0' }, { translate: `${-dir * 6}px 0`, offset: 0.3 }, { translate: `${dir * 10}px 0`, offset: 0.45 }, { translate: '0 0' }], { duration: 1500, easing: 'ease-out' });
  }
  if (!rm) {
    setTimeout(() => {
      scene.classList.remove('jn-thud');
      void scene.offsetWidth;
      scene.classList.add('jn-thud');
    }, 880);
    setTimeout(() => scene.classList.remove('jn-thud'), 1500);
  }
}

/** arrows: 화살 (삼상 20:20, 36) — 화살 셋이 높이 날아 들 저편(쏘는 쪽 반대편 끝)으로 떨어진다 */
export function playArrows(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const from = actorBox(scene, who ?? 'jonathan', 'left');
  const dir = from.x < from.W / 2 ? 1 : -1;
  const sx = from.x + dir * from.w * 0.2;
  const sy = from.top + from.h * 0.3;
  const far = dir > 0 ? from.W - sx : sx;
  const arrows = Array.from({ length: 3 }, (_, i) => {
    const dx = dir * (far * (0.82 + i * 0.07) + 30);
    const lift = 70 + i * 16;
    const drop = from.h * 0.62 - i * 6;
    return `<div class="fx-arrows__x" style="--i:${i}; --dx:${f(dx)}px">
      <div class="fx-arrows__y" style="--lift:${f(-lift)}px; --drop:${f(drop)}px">
        <i class="fx-arrows__a" style="--k:${dir}"></i>
      </div>
    </div>`;
  }).join('');
  layerOf(scene, `fx-arrows${rm ? ' is-rm' : ''}`,
    `<div class="fx-arrows__at" style="--x:${f(sx)}px; --y:${f(sy)}px">${rm ? '' : arrows}<b class="fx-arrows__twang"></b></div>`,
    rm ? 1600 : 5200, 1000);
}

/** hem: 벤 겉옷 자락 (삼상 24:4, 11) — 대상의 앞손 높이에 한 조각이 떠오르며 금빛 테가 그어진다 */
export function playHem(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const t = actorBox(scene, who ?? 'david', 'center');
  const art = t.el?.querySelector<SVGElement>('.actor__art');
  const flipped = !!art && /scaleX\(-1\)|matrix\(-1/.test(getComputedStyle(art).transform + art.style.transform);
  const x = t.x + (flipped ? -1 : 1) * t.w * 0.28;
  layerOf(scene, `fx-hem${rm ? ' is-rm' : ''}`,
    `<div class="fx-hem__at" style="--x:${f(x)}px; --y:${f(t.top + t.h * 0.34)}px">
      <span class="fx-hem__glow"></span>
      <svg class="fx-hem__cloth" viewBox="0 0 40 30" width="40" height="30">
        <path class="fx-hem__piece" d="M3 4 C12 2 26 3 37 6 L35 18 C33 20 31 18 29 21 C27 18 25 22 22 19 C20 23 17 19 14 22 C12 18 9 22 6 19 C5 15 4 9 3 4 Z"/>
        <path class="fx-hem__band" d="M5 14 C14 15 26 15 35 14" fill="none"/>
        <path class="fx-hem__edge" d="M3 4 C12 2 26 3 37 6 L35 18 C33 20 31 18 29 21 C27 18 25 22 22 19 C20 23 17 19 14 22 C12 18 9 22 6 19 C5 15 4 9 3 4 Z" fill="none" pathLength="1"/>
      </svg>
    </div>`,
    rm ? 2400 : 5200, 1400);
}
