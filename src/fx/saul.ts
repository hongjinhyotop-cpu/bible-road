// 7막 왕국 — 사울 A급 2개 (삼상 9–10 · 15)의 전용 배경 + 7막 공통 효과 anoint(기름 부음).
// 같은 종이 오려낸 그림자극 말투. 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  잃은 암나귀 (삼상 9–10)
//  - sl-hills     : 에브라임 산지·살리사·사알림을 두루 헤매는 길. 계단밭 언덕, 굽은 길, 올리브나무,
//                   길가 말뚝에 빈 고삐 한 줄만 늘어져 있다 (9:3-5)
//  - sl-ascent    : 숩 땅의 성. 언덕 위 성읍으로 오르는 비탈길, 그 아래 우물에서 물 길러 나오는 소녀들 (9:11)
//  - sl-feast     : 산당의 객실. 낮은 상, 청한 손님 서른 명가량, 가운데 수석 자리에 금빛으로 놓인 넓적다리 (9:22-24)
//  - sl-roof      : 밤, 사무엘의 집 지붕. 낮은 난간, 아래 성읍의 불빛, 별과 달 (9:25)
//  - sl-roof-dawn : 같은 지붕, 동틀 녘 (9:26 "동틀 때 즈음이라")
//  - sl-prophets  : 하나님의 산(기브아). 산당에서 비탈길로 내려오는 선지자의 무리(비파·소고·저·수금), 곁에 블레셋 영문의 망대 (10:5, 10)
//  - sl-mizpah    : 미스바 모임. 비탈에 지파대로 모인 백성, 가운데 돌 단, 양옆에 쌓인 짐 보따리 (10:17-24)
//  - sl-baggage   : 짐 보따리 사이 — 자루·항아리·안장 주머니 더미 위로 머리와 어깨가 비죽 나와 있다 (10:22 "행구 사이에 숨었느니라")
//  순종이 제사보다 (삼상 15)
//  - sl-kenite    : 겐 사람의 장막을 걷고 떠나는 줄 — 나귀와 사람들이 길을 따라 멀어진다 (15:6)
//  - sl-carmel    : 유다 갈멜. 언덕 위에 사울이 자기를 위하여 세운 기념비, 길갈로 내려가는 길 (15:12)
//  - sl-gilgal    : 길갈. 멀리 열두 돌, 돌 단과 연기, 앞쪽 우리마다 가득한 양과 소 (15:12-21)
//  - sl-parting   : 갈림길. 왼쪽 언덕 위 라마, 오른쪽 언덕 위 기브아, 두 길이 갈라진다 (15:34)
// 효과:
//  - anoint    : 기름 부음 — 위에서 기름 뿔이 기울고 금빛 기름 한 줄기가 인물의 머리 위로 흘러내려, 빛이 몸을 따라
//                아래로 번진다 (약 5초, 탭하면 빨리 감김). 대상: beat의 "to" → (대사 beat가 아니면) "who" → 무대 가운데 사람.
//                사울(삼상 10:1) · 다윗(16:13, 삼하 2:4, 5:3) · 솔로몬(왕상 1:39) — 7막 공통
//  - saul-lots : 미스바의 제비 — 모든 지파 → 베냐민 → 마드리의 가족 → 기스의 아들 사울 → "…없다" (약 11초, 10:20-21).
//                모양은 여호수아 lots(styles/joshua.css)와 같은 틀
// 하나님은 그리지 않는다. 진멸·처형은 그리지 않는다 (fx blackout + beat sound로 대신).
import { H, W, rng, smoke, tree } from './backdrop';
import { folk, ground, ridge, stars } from './joshua';

export type SaulArt =
  | 'sl-hills' | 'sl-ascent' | 'sl-feast' | 'sl-roof' | 'sl-roof-dawn' | 'sl-prophets' | 'sl-mizpah' | 'sl-baggage'
  | 'sl-kenite' | 'sl-carmel' | 'sl-gilgal' | 'sl-parting';

const f = (n: number) => n.toFixed(1);

/** 먼 산지 (베냐민·에브라임 산지) */
const farHills = (seed: number, y = 150) => {
  const r = rng(seed);
  return ridge([[-W * 2, y], [-160, y - 12 - r() * 8], [-30, y - 2], [80, y - 20 - r() * 8], [180, y - 6], [280, y - 22 - r() * 6], [390, y - 6], [520, y - 16], [W * 3, y]], 'bd-far');
};

/** 계단밭 줄 (언덕 비탈의 돌담) */
function terraces(x0: number, x1: number, y0: number, n: number, gap: number, seed: number): string {
  const r = rng(seed);
  return `<g class="sl-terrace">${Array.from({ length: n }, (_, i) => {
    const y = y0 + i * gap;
    const a = x0 + r() * 20;
    const b = x1 - r() * 20;
    return `<path d="M${f(a)} ${f(y)} Q${f((a + b) / 2)} ${f(y - 3 - r() * 3)} ${f(b)} ${f(y + 1)}"/>`;
  }).join('')}</g>`;
}

/** 낮은 집 한 채 (평평한 지붕, 창에 불빛) */
function house(x: number, y: number, w: number, h: number, cls = 'bd-mid', lit = false): string {
  return `<g class="${cls}"><rect x="${f(x)}" y="${f(y - h)}" width="${f(w)}" height="${f(h)}"/><rect x="${f(x - 1)}" y="${f(y - h - 2)}" width="${f(w + 2)}" height="2"/></g>
    ${lit ? `<rect class="sl-window" x="${f(x + w * 0.35)}" y="${f(y - h * 0.62)}" width="${f(Math.max(1.6, w * 0.14))}" height="${f(Math.max(2, h * 0.22))}"/>` : ''}`;
}

/** 언덕 위 성읍: 집들이 겹겹이 쌓이고 창마다 불빛 */
function hillTown(cx: number, top: number, s: number, seed: number, cls = 'bd-mid'): string {
  const r = rng(seed);
  const out: string[] = [];
  for (let i = 0; i < 9; i++) {
    const w = (10 + r() * 10) * s;
    const h = (8 + r() * 8) * s;
    const x = cx - 46 * s + i * 10.4 * s + (r() - 0.5) * 3 * s;
    const y = top + Math.abs(i - 4) * 2.6 * s + 10 * s;
    out.push(house(x, y, w, h, cls, r() > 0.45));
  }
  return out.join('');
}

/** 자루·항아리·보따리 더미 */
function baggage(x: number, y: number, s: number, seed: number, cls = 'bd-near'): string {
  const r = rng(seed);
  const items: string[] = [];
  for (let i = 0; i < 7; i++) {
    const bx = x + (i - 3) * 9 * s + (r() - 0.5) * 4 * s;
    const kind = Math.floor(r() * 3);
    const h = (10 + r() * 6) * s;
    if (kind === 0) items.push(`<path d="M${f(bx - 6 * s)} ${f(y)} C${f(bx - 8 * s)} ${f(y - h * 0.6)} ${f(bx - 4 * s)} ${f(y - h)} ${f(bx)} ${f(y - h - 2 * s)} C${f(bx + 4 * s)} ${f(y - h)} ${f(bx + 8 * s)} ${f(y - h * 0.6)} ${f(bx + 6 * s)} ${f(y)} Z"/>`);
    else if (kind === 1) items.push(`<path d="M${f(bx - 4 * s)} ${f(y)} C${f(bx - 7 * s)} ${f(y - h * 0.5)} ${f(bx - 5 * s)} ${f(y - h * 0.9)} ${f(bx - 2 * s)} ${f(y - h)} L${f(bx - 2 * s)} ${f(y - h - 3 * s)} L${f(bx + 2 * s)} ${f(y - h - 3 * s)} L${f(bx + 2 * s)} ${f(y - h)} C${f(bx + 5 * s)} ${f(y - h * 0.9)} ${f(bx + 7 * s)} ${f(y - h * 0.5)} ${f(bx + 4 * s)} ${f(y)} Z"/>`);
    else items.push(`<rect x="${f(bx - 7 * s)}" y="${f(y - h * 0.7)}" width="${f(14 * s)}" height="${f(h * 0.7)}" rx="${f(3 * s)}"/><path class="sl-rope" d="M${f(bx - 7 * s)} ${f(y - h * 0.4)} L${f(bx + 7 * s)} ${f(y - h * 0.4)}"/>`);
  }
  return `<g class="${cls}">${items.join('')}</g>`;
}

// ── 잃은 암나귀 (삼상 9–10) ─────────────────────────
function hillsArt(): string {
  return `<g class="sl sl--hills">
    ${farHills(8101, 150)}
    ${ridge([[-W * 2, 196], [-60, 184], [70, 192], [170, 176], [270, 190], [380, 178], [W * 3, 190]], 'bd-mid')}
    ${terraces(-20, 420, 196, 4, 9, 8102)}
    <path class="sl-road" d="M150 262 C176 240 236 232 226 214 C218 202 190 200 198 190 C204 184 214 182 214 178 L217 178 C219 183 210 187 205 192 C200 200 232 204 240 214 C252 234 214 248 250 262 Z"/>
    ${tree(88, 214, 34, 'bd-mid', 8103)}${tree(316, 206, 30, 'bd-mid', 8104)}${tree(132, 196, 18, 'bd-far', 8105)}
    <g class="bd-near sl-cairn"><ellipse cx="140" cy="244" rx="9" ry="3"/><ellipse cx="141" cy="239" rx="7" ry="2.6"/><ellipse cx="140" cy="235" rx="4.6" ry="2"/></g>
    <g class="bd-near"><rect x="262" y="214" width="3" height="34" rx="1"/></g>
    <path class="sl-halter" d="M264.5 220 C268 230 270 238 266 246 C264 250 268 252 271 250"/>
    ${ground(250)}
  </g>`;
}

function ascentArt(): string {
  const girls = [[150, 236], [168, 240], [252, 232]].map(([x, y], i) =>
    `<g class="sl-girl" style="--d:${f(i * 0.7)}s" transform="translate(${x} ${y}) scale(${1 + i * 0.06})">
      <path d="M-2.6 0 C-3 -5 -2.2 -9 -1.4 -12 C-2.4 -13.4 -2 -15.6 0 -16 C2 -15.6 2.4 -13.4 1.4 -12 C2.2 -9 3 -5 2.6 0 Z"/>
      <path d="M-2.4 -17.4 C-2.6 -20 -1.4 -21.6 0 -21.6 C1.4 -21.6 2.6 -20 2.4 -17.4 Z M-1.2 -21.6 L1.2 -21.6 L1 -22.8 L-1 -22.8 Z"/>
    </g>`).join('');
  return `<g class="sl sl--ascent">
    ${farHills(8202, 140)}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 214 C-40 210 60 196 120 160 C150 142 170 112 200 108 C232 110 252 140 282 160 C330 192 420 206 ${W * 3} 212 L${W * 3} ${H} Z"/>
    ${hillTown(200, 98, 0.9, 8203)}
    <path class="sl-path" d="M210 262 C230 246 270 236 252 222 C234 210 168 204 176 188 C184 172 238 170 228 156 C222 146 206 140 202 128"/>
    <g class="bd-near sl-well"><ellipse cx="200" cy="242" rx="18" ry="4.6"/><path d="M182 242 L182 232 Q200 226 218 232 L218 242 Z"/><path d="M186 232 L186 214 M214 232 L214 214 M184 214 L216 214" fill="none" stroke="currentColor" stroke-width="2"/></g>
    <g class="sl-girls">${girls}</g>
    ${tree(70, 240, 44, 'bd-near', 8204)}${tree(340, 238, 40, 'bd-near', 8205)}
    ${ground(250)}
  </g>`;
}

function feastArt(): string {
  const r = rng(8301);
  const guests = Array.from({ length: 30 }, (_, i) => {
    const x = -60 + i * 17.6 + (r() - 0.5) * 4;
    if (x > 182 && x < 218) return '';
    const h = 15 + r() * 4;
    return `<g class="sl-guest"><path d="M${f(x - 5)} 204 C${f(x - 6)} ${f(204 - h * 0.6)} ${f(x - 3)} ${f(204 - h)} ${f(x)} ${f(204 - h)} C${f(x + 3)} ${f(204 - h)} ${f(x + 6)} ${f(204 - h * 0.6)} ${f(x + 5)} 204 Z"/><circle cx="${f(x + 0.6)}" cy="${f(204 - h - 4)}" r="3.6"/></g>`;
  }).join('');
  const pillars = [-80, 40, 120, 280, 360, 480].map((x) => `<rect x="${x - 7}" y="40" width="14" height="210"/><rect x="${x - 11}" y="36" width="22" height="6"/>`).join('');
  const lamps = [80, 200, 320].map((x) => `<g class="sl-lamp"><path d="M${x - 6} 92 Q${x} 98 ${x + 6} 92 Z"/><ellipse class="sl-flame" cx="${x + 5}" cy="88" rx="1.6" ry="3"/><circle class="sl-lamphalo" cx="${x + 5}" cy="88" r="16"/></g>`).join('');
  return `<g class="sl sl--feast">
    <rect class="sl-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <g class="bd-mid">${pillars}</g>
    ${lamps}
    <g class="sl-guests">${guests}</g>
    <path class="bd-near sl-table" d="M${-W * 2} 208 L${W * 3} 208 L${W * 3} 214 L${-W * 2} 214 Z"/>
    <g class="bd-near">${[-40, 60, 140, 260, 340, 440].map((x) => `<rect x="${x}" y="214" width="6" height="14"/>`).join('')}</g>
    <circle class="sl-portion-halo" cx="200" cy="200" r="34"/>
    <ellipse class="sl-plate" cx="200" cy="207" rx="17" ry="3"/>
    <path class="sl-portion" d="M188 205 C186 198 192 192 200 193 C206 193 212 196 213 201 C214 203 212 205 209 205 Z M209 200 C214 199 218 200 220 202 C219 204 215 205 210 204 Z"/>
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 248 L${W * 3} 248 L${W * 3} ${H} Z"/>
  </g>`;
}

function roofArt(dawn: boolean): string {
  return `<g class="sl sl--roof${dawn ? ' is-dawn' : ''}">
    ${dawn ? '<circle class="sl-sunrim" cx="300" cy="168" r="22"/>' : `${stars(70, 120, 8401)}<circle class="sl-moon" cx="292" cy="46" r="9"/>`}
    ${farHills(8402, 166)}
    ${hillTown(80, 170, 1, 8403, 'bd-mid')}${hillTown(330, 174, 0.9, 8404, 'bd-mid')}
    <g class="bd-near">
      <path d="M${-W * 2} ${H} L${-W * 2} 214 L${W * 3} 214 L${W * 3} ${H} Z"/>
      <path d="M${-W * 2} 214 L${-W * 2} 200 L60 200 L60 214 Z M340 214 L340 200 L${W * 3} 200 L${W * 3} 214 Z"/>
      ${Array.from({ length: 14 }, (_, i) => `<rect x="${60 + i * 20}" y="206" width="12" height="8" rx="1"/>`).join('')}
      <path d="M20 214 L20 192 L28 186 L36 192 L36 214 Z"/>
    </g>
    <g class="sl-mat"><path d="M150 230 L250 230 L256 238 L144 238 Z"/></g>
  </g>`;
}

function prophetsArt(): string {
  const r = rng(8501);
  const band = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    const x = 238 - t * 110 + (r() - 0.5) * 4;
    const y = 148 + t * 72;
    const s = 0.7 + t * 0.6;
    const inst = ['<path d="M2 -12 C6 -14 8 -10 6 -6 L2 -6 Z M3 -12 L3 -6 M5 -11 L5 -6" fill="none" stroke="currentColor" stroke-width="0.8"/>',
      '<circle cx="4" cy="-11" r="2.4"/>',
      '<path d="M1 -10 L7 -14" stroke="currentColor" stroke-width="0.9"/>',
      '<path d="M1 -14 L1 -6 M1 -14 C5 -15 7 -12 5 -8" fill="none" stroke="currentColor" stroke-width="0.9"/>'][i % 4];
    return `<g class="sl-prophet" style="--d:${f(i * 0.18)}s" transform="translate(${f(x)} ${f(y)}) scale(${f(s)})">
      <path d="M-3 0 C-3.4 -5 -2.6 -10 -1.6 -13 C-2.6 -14.4 -2 -17 0 -17.4 C2 -17 2.6 -14.4 1.6 -13 C2.6 -10 3.4 -5 3 0 Z"/>${inst}
    </g>`;
  }).join('');
  const notes = Array.from({ length: 8 }, (_, i) => `<circle class="sl-note" style="--d:${f(i * 0.5)}s; --x:${f((r() - 0.5) * 30)}px" cx="${f(150 + r() * 90)}" cy="${f(170 + r() * 40)}" r="1.2"/>`).join('');
  return `<g class="sl sl--prophets">
    ${farHills(8502, 150)}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 226 C-40 220 80 210 150 180 C190 162 220 138 250 134 C280 136 300 160 330 184 C370 210 450 222 ${W * 3} 226 L${W * 3} ${H} Z"/>
    <g class="bd-mid sl-highplace"><rect x="236" y="120" width="26" height="14"/><path d="M232 120 L266 120 L262 114 L236 114 Z"/></g>
    ${smoke(249, 112, 8503, 5)}
    <g class="bd-far sl-garrison"><rect x="44" y="160" width="12" height="30"/><path d="M42 160 L58 160 L58 156 L54 156 L54 158 L50 158 L50 156 L46 156 L46 158 L42 158 Z"/><path class="sl-flag" d="M50 156 L50 142 L60 145 L50 148"/></g>
    <path class="sl-path" d="M248 136 C232 160 204 170 188 190 C176 206 156 214 120 226"/>
    <g class="sl-band">${band}</g>
    ${notes}
    ${tree(340, 246, 40, 'bd-near', 8504)}
    ${ground(250)}
  </g>`;
}

function mizpahArt(): string {
  const rows = [
    folk(-120, 186, 520, 186, 70, 2.2, 8601),
    folk(-140, 198, 540, 198, 60, 2.6, 8602),
    folk(-160, 212, 80, 212, 14, 3.1, 8603) + folk(320, 212, 560, 212, 14, 3.1, 8604),
  ].join('');
  return `<g class="sl sl--mizpah">
    ${farHills(8605, 140)}
    ${ridge([[-W * 2, 182], [-40, 172], [100, 178], [200, 166], [300, 176], [440, 170], [W * 3, 180]], 'bd-mid')}
    <g class="sl-tribes">${rows}</g>
    <g class="bd-mid sl-stone"><path d="M188 226 L190 196 L198 190 L208 194 L212 226 Z"/></g>
    ${baggage(70, 238, 1.3, 8606)}${baggage(336, 238, 1.2, 8607)}
    ${ground(246)}
  </g>`;
}

function baggageArt(): string {
  return `<g class="sl sl--baggage">
    ${farHills(8701, 150)}
    ${folk(-100, 176, 500, 176, 50, 2, 8702)}
    ${ridge([[-W * 2, 190], [0, 184], [200, 188], [420, 182], [W * 3, 190]], 'bd-mid')}
    <g class="sl-hider"><g class="bd-near" transform="translate(112 132) scale(0.5)">
      <path d="M70 92 C56 100 48 124 46 160 L156 160 C152 128 142 104 124 94 C114 88 96 86 86 88 Z"/>
      <path d="M100 9 C85 8 72 18 70 35 C68 52 70 70 66 88 C64 98 66 106 72 110 C76 100 81 92 87 86 C84 74 83 61 86 50 C89 40 97 32 110 30 C116 29 121 31 125 35 C122 20 113 9 100 9 Z"/>
      <path d="M100 18 C111 18 119 25 121 35 C122 39 123 42 124 46 L122 49 C125 52 128 56 128 58 C126 60 124 61 121 61 L122 64 L120 66 L121 69 C120 74 117 77 111 79 C103 81 95 79 89 74 C82 68 78 58 79 46 C80 30 88 19 100 18 Z"/>
      <path d="M96 55 C103 60 111 63 118 65 L121 67 C124 73 124 80 121 86 L116 85 L112 89 L107 85 L102 87 C97 82 94 76 93 70 C92 64 93 59 96 55 Z"/>
    </g></g>
    ${baggage(156, 238, 2.6, 8703)}
    ${baggage(40, 244, 1.8, 8704)}${baggage(300, 244, 1.9, 8705)}
    ${ground(248)}
  </g>`;
}

// ── 순종이 제사보다 (삼상 15) ─────────────────────────
function keniteArt(): string {
  const donkeys = [150, 196, 238, 282].map((x, i) => {
    const y = 214 - i * 6;
    const s = 1 - i * 0.16;
    return `<g class="sl-donkey" transform="translate(${x} ${f(y)}) scale(${f(s)})"><path d="M-9 -5 C-9 -9 -4 -10 2 -9 L6 -13 L8 -12 L7 -8 C8 -6 6 -4 4 -4 L4 0 L2.6 0 L2 -3.6 L-5 -3.6 L-6 0 L-7.4 0 Z"/><path d="M-6 -9 C-4 -15 2 -15 3 -9 Z"/></g>`;
  }).join('');
  return `<g class="sl sl--kenite">
    ${farHills(8802, 150)}
    ${ridge([[-W * 2, 190], [-20, 180], [120, 186], [260, 174], [400, 184], [W * 3, 178]], 'bd-mid')}
    <path class="sl-path" d="M120 262 C140 240 180 230 220 210 C250 196 290 186 330 176"/>
    ${folk(150, 222, 320, 182, 10, 2.8, 8803)}
    ${donkeys}
    <g class="bd-mid"><path d="M40 232 L50 210 L64 206 L78 210 L88 232 Z"/><path class="sl-pole" d="M56 232 L66 196" stroke="currentColor" stroke-width="1.6"/></g>
    <g class="bd-near sl-struck"><path d="M30 246 C40 240 70 238 90 244 L92 248 L28 248 Z"/></g>
    ${ground(250)}
  </g>`;
}

function carmelArt(): string {
  return `<g class="sl sl--carmel">
    <circle class="sl-sun" cx="120" cy="70" r="14"/>
    ${farHills(8901, 156)}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 222 C-20 216 100 206 160 184 C184 176 216 176 240 184 C300 206 420 216 ${W * 3} 222 L${W * 3} ${H} Z"/>
    <g class="sl-stele">
      <path class="bd-near" d="M188 184 L189 120 C189 108 211 108 211 120 L212 184 Z"/>
      <path class="sl-stele-mark" d="M194 124 L206 124 M194 132 L206 132 M194 140 L203 140 M195 148 L205 148"/>
      <path class="bd-near" d="M180 188 L220 188 L216 182 L184 182 Z"/>
    </g>
    <path class="sl-path" d="M214 262 C240 246 300 238 330 226 C352 218 380 214 420 212"/>
    ${tree(70, 238, 30, 'bd-near', 8902)}
    ${ground(250)}
  </g>`;
}

function gilgalArt(): string {
  const r = rng(9001);
  const stonesRing = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const x = 300 + Math.cos(a) * 26;
    const y = 176 + Math.sin(a) * 5;
    return `<rect x="${f(x - 2)}" y="${f(y - 7)}" width="4" height="7" rx="1.4"/>`;
  }).join('');
  const flock = Array.from({ length: 34 }, () => {
    const x = 40 + r() * 320;
    const y = 222 + r() * 16;
    return `<g class="sl-sheep" style="--d:${f(r() * 3)}s"><ellipse cx="${f(x)}" cy="${f(y)}" rx="4.4" ry="2.8"/><ellipse cx="${f(x + 4.6)}" cy="${f(y - 1.4)}" rx="1.8" ry="1.3"/></g>`;
  }).join('');
  const oxen = [[84, 214], [126, 212], [276, 214], [318, 211], [200, 210]].map(([x, y], i) =>
    `<g class="sl-ox" transform="translate(${x} ${y})${i % 2 ? ' scale(-1 1)' : ''}"><path d="M-11 0 L-11 -8 C-11 -12 -6 -13 2 -12 L7 -12 C10 -14 12 -13 13 -11 L14 -8 L11 -7 L9 -5 L9 0 L7 0 L6.4 -4 L-6 -4 L-7 0 Z"/><path d="M8 -13 L6 -16 M11 -13 L13 -16" stroke="currentColor" stroke-width="0.9"/></g>`).join('');
  return `<g class="sl sl--gilgal">
    ${farHills(9002, 150)}
    ${ridge([[-W * 2, 186], [-40, 178], [120, 184], [260, 176], [400, 184], [W * 3, 180]], 'bd-mid')}
    <g class="bd-mid sl-twelve">${stonesRing}</g>
    <g class="bd-mid"><rect x="92" y="170" width="22" height="14" rx="2"/></g>
    ${smoke(103, 166, 9003, 5)}
    <g class="sl-flock">${oxen}${flock}</g>
    <g class="bd-near sl-fence">${[30, 370].map((x) => `<path d="M${x - 40} 242 L${x + 40} 242 M${x - 40} 236 L${x + 40} 236" stroke="currentColor" stroke-width="1.6"/>${[-36, -18, 0, 18, 36].map((d) => `<rect x="${x + d - 1}" y="230" width="2.4" height="16"/>`).join('')}`).join('')}</g>
    ${ground(250)}
  </g>`;
}

function partingArt(): string {
  return `<g class="sl sl--parting">
    ${farHills(9101, 150)}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 200 C-60 190 10 150 60 146 C100 146 130 176 170 196 C190 204 210 204 230 196 C270 176 300 144 340 144 C390 148 460 190 ${W * 3} 200 L${W * 3} ${H} Z"/>
    ${hillTown(60, 128, 0.62, 9102)}${hillTown(340, 126, 0.62, 9103)}
    <text class="sl-town-name" x="60" y="112">라마</text><text class="sl-town-name" x="340" y="110">기브아</text>
    <path class="sl-path" d="M200 262 C200 246 196 232 190 222 C170 196 120 176 74 150"/>
    <path class="sl-path" d="M200 262 C200 246 204 232 210 222 C230 196 284 174 326 150"/>
    <g class="bd-near sl-cairn"><ellipse cx="200" cy="232" rx="7" ry="2.6"/><ellipse cx="200" cy="228" rx="5" ry="2.2"/><ellipse cx="200" cy="224.6" rx="3" ry="1.6"/></g>
    ${ground(252)}
  </g>`;
}

export function saulArt(art: SaulArt): string {
  switch (art) {
    case 'sl-hills': return hillsArt();
    case 'sl-ascent': return ascentArt();
    case 'sl-feast': return feastArt();
    case 'sl-roof': return roofArt(false);
    case 'sl-roof-dawn': return roofArt(true);
    case 'sl-prophets': return prophetsArt();
    case 'sl-mizpah': return mizpahArt();
    case 'sl-baggage': return baggageArt();
    case 'sl-kenite': return keniteArt();
    case 'sl-carmel': return carmelArt();
    case 'sl-gilgal': return gilgalArt();
    case 'sl-parting': return partingArt();
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

/** 기름 뿔: 굽은 양각 뿔, 넓은 입은 아래·오른쪽, 좁은 끝은 위 (그림 원점 = 뿔 입) */
const HORN = `<svg class="fx-anoint__horn" viewBox="-40 -60 80 80" aria-hidden="true">
  <path d="M-4 -2 C-10 -12 -14 -26 -10 -40 C-7 -50 2 -56 12 -56 C6 -50 2 -42 2 -32 C2 -20 8 -10 14 -4 C10 2 2 4 -4 -2 Z"/>
  <path class="fx-anoint__band" d="M-9 -24 C-4 -22 2 -22 5 -24 M-11 -34 C-6 -32 0 -32 3 -34" fill="none" stroke-width="1.6"/>
  <ellipse class="fx-anoint__mouth" cx="5" cy="-2" rx="9" ry="3.4" transform="rotate(38 5 -2)"/>
</svg>`;

/**
 * anoint: 기름 부음 (삼상 10:1, 16:13 …). 대상 인물의 머리 위에서 뿔이 기울고, 기름 한 줄기가 흘러내려,
 * 머리에서부터 빛이 몸을 따라 아래로 번진다. 대상이 무대에 없으면 무대 가운데.
 */
export function playAnoint(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const b = scene.getBoundingClientRect();
  const actors = [...scene.querySelectorAll<HTMLElement>('.scene__stage .actor')];
  const center = (el: HTMLElement) => {
    const a = el.getBoundingClientRect();
    return a.left + a.width / 2 - b.left;
  };
  let target = who ? actors.find((a) => a.dataset.id === who) : undefined;
  if (!target && actors.length) target = actors.reduce((best, a) => (Math.abs(center(a) - b.width / 2) < Math.abs(center(best) - b.width / 2) ? a : best));
  const art = target?.querySelector<SVGElement>('.actor__art') ?? target;
  const a = art?.getBoundingClientRect();
  // 무릎 꿇거나 엎드리면 그림 상자는 그대로라서, 실제 머리 부위(data-part="head")의 자리를 쓴다
  const head = target?.querySelector<SVGGraphicsElement>('[data-part="head"]')?.getBoundingClientRect();
  const ok = a && a.width && a.height;
  const hasHead = head && head.width && head.height;
  const x = hasHead ? head.left - b.left + head.width * 0.45 : ok ? a.left - b.left + a.width / 2 : b.width / 2;
  const top = hasHead ? head.top - b.top + head.height * 0.08 : ok ? a.top - b.top + a.height * 0.05 : b.height * 0.36;
  const bottom = ok ? a.bottom - b.top : b.height * 0.86;
  const body = Math.max(40, bottom - top);
  const width = ok ? Math.min(a.width, (a.height || body) * 0.4) : 90;
  const r = rng(Date.now() % 100000);
  const drops = rm ? '' : Array.from({ length: 7 }, (_, i) =>
    `<i class="fx-anoint__drop" style="--d:${f(2.3 + i * 0.32 + r() * 0.2)}s; --o:${f((r() - 0.5) * width * 0.7)}px"></i>`).join('');
  const motes = rm ? '' : Array.from({ length: 16 }, () =>
    `<i class="fx-anoint__mote" style="--d:${f(3 + r() * 1.6)}s; --o:${f((r() - 0.5) * width * 1.2)}px; --y:${f(r() * body * 0.9)}px; --s:${f(0.6 + r() * 1.2)}"></i>`).join('');
  layerOf(
    scene,
    `fx-anoint${rm ? ' is-rm' : ''}`,
    `<div class="fx-anoint__at" style="--x:${f(x)}px; --top:${f(top)}px; --body:${f(body)}px; --w:${f(width)}px">
      <b class="fx-anoint__beam"></b>
      ${HORN}
      <b class="fx-anoint__stream"></b>
      ${drops}
      <b class="fx-anoint__crown"></b>
      <b class="fx-anoint__body"></b>
      ${motes}
    </div>`,
    rm ? 2600 : 6800,
    1500,
  );
  // 인물 자신도 금빛으로 물들었다 돌아온다
  if (target && !rm) {
    target.classList.remove('is-anointed');
    void target.offsetWidth;
    target.classList.add('is-anointed');
    setTimeout(() => target?.classList.remove('is-anointed'), 6800);
  }
}

/** saul-lots: 미스바의 제비 (삼상 10:20-21) — 여호수아 lots와 같은 틀(fx-lots), 마지막에 "…없다" */
const LOTS = [
  { label: '이스라엘 모든 지파', n: 12, pick: '베냐민 지파', hit: 11 },
  { label: '베냐민 지파의 가족대로', n: 5, pick: '마드리의 가족', hit: 2 },
  { label: '마드리의 가족', n: 6, pick: '기스의 아들 사울', hit: 3 },
];
export function playSaulLots(scene: HTMLElement, rm: boolean): void {
  const stages = LOTS.map((s, k) => `<div class="fx-lots__stage" style="--k:${k}">
      <p class="fx-lots__label">${s.label}</p>
      <div class="fx-lots__row">${Array.from({ length: s.n }, (_, i) => `<span class="${i === s.hit ? 'is-hit' : ''}" style="--i:${i}"></span>`).join('')}</div>
      <p class="fx-lots__pick${k === LOTS.length - 1 ? ' is-last' : ''}">${s.pick}</p>
      ${k === LOTS.length - 1 ? '<p class="fx-lots__none">…그런데 없다</p>' : ''}
    </div>`).join('');
  layerOf(scene, `fx-lots fx-lots--saul${rm ? ' is-rm' : ''}`, stages, rm ? 4000 : 11500, 1400);
}
