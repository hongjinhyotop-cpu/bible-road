// 10막 A급 — 에스더 (에 2 「왕후가 된 고아」 · 4 「죽으면 죽으리이다」 · 6 「잠 못 이루는 밤」 · 7 「하만의 몰락」)의 전용 배경과 효과.
// 에스더 B급(에 1, 3, 5, 8, 9–10)에서도 그대로 재사용한다. 같은 종이 오려낸 그림자극 말투.
// 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
//
// ★ 에스더서에는 하나님의 이름이 한 번도 나오지 않는다. 그래서 이 파일의 효과는 하나도 '빛'이 아니다.
//   하늘에서 내려오는 금빛·구름·목소리 대신, 우연이 맞물리는 순간을 가는 은실·기록 한 줄·굴러가는 제비로만 보여 준다.
//
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - et-susa-hall     : 수산 궁 큰 홀. 푸른 유약 벽돌 벽과 창 든 근위병 띠, 황소 머리 기둥머리의 높은 기둥들,
//                       기둥 사이에 늘어진 백색·녹색·청색 휘장과 은 고리, 홍·백·황·흑 대리석 바닥 (에 1:5-6)
//  - et-kings-gate    : 왕의 대궐 문. 큰 문루(가운데 높은 통로와 기둥 넷), 양옆 돌 걸상, 문 앞 성중 광장의 포석,
//                       문 너머 언덕 위 왕궁 (2:19, 21 · 3:2 · 4:2, 6 · 5:9 · 6:10, 12)
//  - et-women-court   : 후궁 뜰. 회랑의 둥근 아치와 격자창, 가운데 네모 연못과 분수, 측백나무와 화분 (2:3, 8-9, 11)
//                       — 성적 뉘앙스 없는 궁정 공간
//  - et-throne        : 왕궁 안뜰에서 본 어전. 계단 위 단(壇)과 높은 등받이 왕좌·발등상, 술 달린 차양, 양옆 향로대 (4:11 · 5:1-2 · 8:4)
//  - et-banquet       : 잔치 자리. 쿠션을 얹은 침상식 걸상 둘, 가운데 낮은 상의 금 잔·뿔잔·술병, 등잔대, 위의 휘장 (1:7 · 5:4-8 · 7:1-8)
//  - et-garden        : 왕궁 후원. 가운데로 길게 뻗은 물길, 줄지은 측백나무, 끝의 정자, 꽃나무 (1:5 · 7:7-8)
//  - et-haman-house   : 하만의 집 뜰. 높은 담과 문, 화로와 깔개, 담 너머 멀리 높은 장대 하나의 실루엣 (5:10-14 · 6:12-14 · 7:9)
//                       — 장대에 매달린 사람은 그리지 않는다
//  - et-bedchamber    : 왕의 침전. 차양 친 침상, 등잔대 둘, 두루마리 상자들(역대 일기)과 낭독대, 초승달 뜬 창 (6:1)
//  - et-street        : 수산 성중 거리. 평평한 지붕의 집들과 지붕 위 사람들, 걸린 천, 언덕 위 성채 (3:15 · 6:9, 11 · 8:15)
// 효과:
//  - thread          : 보이지 않는 손. 희미한 은실 한 가닥이 who → to(없으면 무대 위 두 사람, 혼자면 무대 양끝)를 잇고,
//                      가운데에서 한 번 맞물리듯 반짝인 뒤 끊어지듯 흩어진다 (약 4.5초) — 빛이 아니라 가는 실
//  - chronicle       : 궁중 일기에 기록함 (2:23). 두루마리가 펼쳐지고 한 줄이 왼쪽부터 쓰여 희미하게 빛났다가, 두루마리가 말림.
//                      그 줄 옆의 '베푼 것' 칸은 비어 있다 (약 7초)
//  - chronicle-read  : 역대 일기를 읽힘 (6:1-3). 같은 두루마리의 줄들이 위로 흘러가다 느려지고, 2장의 '그 줄'이 가운데 멈춰 밝아짐.
//                      잠시 뒤 비어 있던 '베푼 것' 칸에 "없음"이 떠오름 (약 8초)
//  - pur             : 제비 부르 (3:7). 점토 주사위가 굴러가고 열두 달 이름이 첫째 달부터 차례로 켜지다 느려져 열두째 달 아달월에 멈춤 (약 7초)
//  - scepter         : 금홀 (5:2 · 8:4). 왕(who → ahasuerus)의 손에서 금홀이 기울어 to(→ esther) 쪽으로 내밀어지고 끝이 닿음 (약 4.5초)
//  - signet          : 왕의 반지 (3:10 · 8:2). 반지가 who(→ ahasuerus) 손에서 빼어져 to의 손으로 건너감 (약 3.5초)
//  - riders          : 역졸 (3:13-15 · 8:10-14). 무대 가운데에서 말 탄 역졸들이 조서 통을 메고 사방으로 달려 나가고 흙먼지 (약 6초)
import { H, W, rng } from './backdrop';
import { folk, ground, ridge, stars } from './joshua';

export type EstherArt =
  | 'et-susa-hall' | 'et-kings-gate' | 'et-women-court' | 'et-throne' | 'et-banquet'
  | 'et-garden' | 'et-haman-house' | 'et-bedchamber' | 'et-street';

const f = (n: number) => n.toFixed(1);

// ── 작은 조각들 ─────────────────────────────────
/** 푸른 유약 벽돌 벽 (y0~y1) + 벽돌 줄 */
function tileWall(y0: number, y1: number): string {
  const rows = Array.from({ length: Math.ceil((y1 - y0) / 9) }, (_, i) => `M${-W * 2} ${f(y0 + i * 9)} H${W * 3}`).join(' ');
  const joints = Array.from({ length: Math.ceil((y1 - y0) / 9) }, (_, i) =>
    Array.from({ length: 70 }, (_, k) => `M${-W * 2 + k * 18 + (i % 2) * 9} ${f(y0 + i * 9)} v9`).join(' ')).join(' ');
  return `<rect class="et-tile" x="${-W * 2}" y="${y0}" width="${W * 5}" height="${y1 - y0}"/>
    <path class="et-brick" d="${rows} ${joints}"/>`;
}

/** 창 든 근위병 띠 (수산 궁 벽의 유약 벽돌 부조처럼): y = 띠 위쪽 */
function guardFrieze(y: number, h = 30): string {
  const men = Array.from({ length: 16 }, (_, i) => {
    const x = -140 + i * 46;
    const s = h / 30;
    return `<g class="et-guard">
      <circle cx="${f(x + 6 * s)}" cy="${f(y + 6 * s)}" r="${f(2.6 * s)}"/>
      <path d="M${f(x + 3 * s)} ${f(y + 9 * s)} L${f(x + 9 * s)} ${f(y + 9 * s)} L${f(x + 11 * s)} ${f(y + 27 * s)} L${f(x + 1 * s)} ${f(y + 27 * s)} Z"/>
      <path class="et-guard__spear" d="M${f(x + 13 * s)} ${f(y + 1 * s)} L${f(x + 13 * s)} ${f(y + 28 * s)}"/>
      <path d="M${f(x - 1 * s)} ${f(y + 13 * s)} Q${f(x - 4 * s)} ${f(y + 18 * s)} ${f(x)} ${f(y + 22 * s)} L${f(x + 3 * s)} ${f(y + 13 * s)} Z"/>
    </g>`;
  }).join('');
  return `<rect class="et-band" x="${-W * 2}" y="${y - 3}" width="${W * 5}" height="${h + 6}"/>
    <path class="et-bandline" d="M${-W * 2} ${y - 3} H${W * 3} M${-W * 2} ${y + h + 3} H${W * 3}"/>
    <g class="et-guards">${men}</g>`;
}

/** 국화(로제트) 띠 */
function rosettes(y: number, x0 = -140, n = 18, gap = 34): string {
  return `<g class="et-rosettes">${Array.from({ length: n }, (_, i) => {
    const x = x0 + i * gap;
    return `<circle cx="${x}" cy="${y}" r="3.4"/><circle class="et-rosecore" cx="${x}" cy="${y}" r="1.3"/>`;
  }).join('')}</g>`;
}

/** 바사 기둥: 종 모양 주춧돌 + 홈 판 기둥 + 겹꽃 + 등을 맞댄 두 황소 머리 기둥머리 */
function column(x: number, base: number, h: number, s = 1, cls = 'et-col'): string {
  const top = base - h;
  const w = 6 * s;
  const flutes = [-0.5, 0, 0.5].map((t) => `M${f(x + t * w)} ${f(base - 10 * s)} L${f(x + t * w)} ${f(top + 26 * s)}`).join(' ');
  // 황소 한 마리 앞몸 (오른쪽을 봄). dir = 1 오른쪽, -1 왼쪽
  const bull = (dir: number) => {
    const X = (dx: number) => f(x + dir * dx * s);
    const Y = (dy: number) => f(top + dy * s);
    return `<path d="M${X(0)} ${Y(8)} L${X(14)} ${Y(8)} C${X(18)} ${Y(6)} ${X(22)} ${Y(6)} ${X(24)} ${Y(9)} L${X(27)} ${Y(8)} L${X(25)} ${Y(12)} C${X(26)} ${Y(15)} ${X(24)} ${Y(18)} ${X(20)} ${Y(17)} L${X(18)} ${Y(22)} L${X(15)} ${Y(22)} L${X(14)} ${Y(17)} L${X(8)} ${Y(18)} L${X(7)} ${Y(23)} L${X(4)} ${Y(23)} L${X(3)} ${Y(17)} L${X(0)} ${Y(17)} Z"/>
      <path class="et-horn" d="M${X(21)} ${Y(7)} Q${X(22)} ${Y(1)} ${X(26)} ${Y(2)}"/>`;
  };
  return `<g class="${cls}">
    <path d="M${f(x - w * 1.8)} ${base} C${f(x - w * 1.6)} ${f(base - 6 * s)} ${f(x - w)} ${f(base - 9 * s)} ${f(x - w * 0.6)} ${f(base - 11 * s)} L${f(x + w * 0.6)} ${f(base - 11 * s)} C${f(x + w)} ${f(base - 9 * s)} ${f(x + w * 1.6)} ${f(base - 6 * s)} ${f(x + w * 1.8)} ${base} Z"/>
    <rect x="${f(x - w * 0.6)}" y="${f(top + 24 * s)}" width="${f(w * 1.2)}" height="${f(h - 34 * s)}"/>
    <path d="M${f(x - w * 1.3)} ${f(top + 26 * s)} C${f(x - w * 1.4)} ${f(top + 20 * s)} ${f(x - w * 0.8)} ${f(top + 17 * s)} ${f(x)} ${f(top + 17 * s)} C${f(x + w * 0.8)} ${f(top + 17 * s)} ${f(x + w * 1.4)} ${f(top + 20 * s)} ${f(x + w * 1.3)} ${f(top + 26 * s)} Z"/>
    ${bull(1)}${bull(-1)}
    <rect class="et-beam" x="${f(x - 30 * s)}" y="${f(top + 2 * s)}" width="${f(60 * s)}" height="${f(5 * s)}"/>
    <path class="et-flute" d="${flutes}"/>
  </g>`;
}

/** 기둥 사이에 늘어진 휘장 (1:6 백색·녹색·청색, 은 고리). x0~x1, 매단 높이 y, 처짐 sag */
function swag(x0: number, x1: number, y: number, sag: number, i: number): string {
  const colors = ['et-cloth-white', 'et-cloth-green', 'et-cloth-blue'];
  const layers = [0, 1, 2].map((k) => {
    const c = colors[(i + k) % 3];
    const d = sag - k * 6;
    return `<path class="${c}" d="M${x0} ${y + k * 2} Q${f((x0 + x1) / 2)} ${f(y + d * 2)} ${x1} ${y + k * 2} L${x1} ${y + k * 2 + 4} Q${f((x0 + x1) / 2)} ${f(y + d * 2 + 6)} ${x0} ${y + k * 2 + 4} Z"/>`;
  }).join('');
  // 양 끝에 늘어진 자락
  const tails = [x0, x1].map((x) => `<path class="${colors[i % 3]}" d="M${x - 3} ${y} L${x + 3} ${y} L${x + 4} ${y + 34} L${x} ${y + 30} L${x - 4} ${y + 34} Z"/>`).join('');
  const rings = [x0, x1].map((x) => `<circle class="et-ring" cx="${x}" cy="${y - 1}" r="2.6"/><circle class="et-ringhole" cx="${x}" cy="${y - 1}" r="1.1"/>`).join('');
  return `<g class="et-swag" style="--d:${f((i * 0.7) % 3)}s">${layers}${tails}</g>${rings}`;
}

/** 홍·백·황·흑 대리석 바닥 (1:6): 원근이 들어간 마름모 무늬 */
function marble(y0: number): string {
  const cx = 200;
  const radial = Array.from({ length: 23 }, (_, i) => {
    const t = (i - 11) / 11;
    return `M${f(cx + t * 140)} ${y0} L${f(cx + t * 760)} ${H}`;
  }).join(' ');
  const rows = [0.08, 0.2, 0.36, 0.58, 0.86].map((t) => `M${-W * 2} ${f(y0 + (H - y0) * t)} H${W * 3}`).join(' ');
  const r = rng(6101);
  const cells = Array.from({ length: 26 }, () => {
    const i = Math.floor(r() * 20) - 10;
    const row = Math.floor(r() * 4);
    const ys = [0, 0.08, 0.2, 0.36, 0.58].map((t) => y0 + (H - y0) * t);
    const ya = ys[row];
    const yb = ys[row + 1];
    const at = (k: number, y: number) => cx + (k / 11) * (140 + ((y - y0) / (H - y0)) * 620);
    const cls = ['et-m-red', 'et-m-yellow', 'et-m-black', 'et-m-white'][Math.floor(r() * 4)];
    return `<path class="${cls}" d="M${f(at(i, ya))} ${f(ya)} L${f(at(i + 1, ya))} ${f(ya)} L${f(at(i + 1, yb))} ${f(yb)} L${f(at(i, yb))} ${f(yb)} Z"/>`;
  }).join('');
  return `<rect class="et-floor" x="${-W * 2}" y="${y0}" width="${W * 5}" height="${H - y0}"/>
    <g class="et-cells">${cells}</g>
    <path class="et-floorline" d="${radial} ${rows}"/>`;
}

/** 등잔대 (높은 받침 + 불꽃 + 둘레 빛) */
function lampstand(x: number, base: number, h: number, i: number): string {
  return `<g class="et-lamp">
    <path class="et-lampstand" d="M${x - 7} ${base} L${x - 2} ${base - 6} L${x - 1.4} ${base - h} L${x + 1.4} ${base - h} L${x + 2} ${base - 6} L${x + 7} ${base} Z"/>
    <path class="et-lampstand" d="M${x - 7} ${base - h} L${x + 7} ${base - h} L${x + 4} ${base - h - 4} L${x - 4} ${base - h - 4} Z"/>
    <circle class="bd-halo et-lamphalo" cx="${x}" cy="${base - h - 8}" r="30"/>
    <ellipse class="et-flame" style="--d:${f(i * 0.55)}s" cx="${x}" cy="${base - h - 8}" rx="2.4" ry="4.4"/>
  </g>`;
}

/** 측백나무 (가늘고 높은 불꽃 모양) */
function cypress(x: number, base: number, h: number, cls = 'et-cypress'): string {
  const w = h * 0.16;
  return `<path class="${cls}" d="M${f(x)} ${f(base - h)} C${f(x + w * 0.7)} ${f(base - h * 0.75)} ${f(x + w)} ${f(base - h * 0.35)} ${f(x + w * 0.6)} ${f(base - 2)} L${f(x - w * 0.6)} ${f(base - 2)} C${f(x - w)} ${f(base - h * 0.35)} ${f(x - w * 0.7)} ${f(base - h * 0.75)} ${f(x)} ${f(base - h)} Z"/>
    <rect class="${cls}" x="${f(x - 1)}" y="${f(base - 3)}" width="2" height="4"/>`;
}

/** 멀리 언덕 위 왕궁 (수산 성채): 높은 단 + 기둥 홀 실루엣 */
function citadel(cx: number, base: number, s: number, cls = 'bd-far'): string {
  const cols = Array.from({ length: 9 }, (_, i) => `<rect x="${f(cx - 52 * s + i * 13 * s)}" y="${f(base - 62 * s)}" width="${f(3.4 * s)}" height="${f(30 * s)}"/>`).join('');
  return `<g class="${cls}">
    <path d="M${f(cx - 110 * s)} ${base} L${f(cx - 90 * s)} ${f(base - 30 * s)} L${f(cx + 90 * s)} ${f(base - 30 * s)} L${f(cx + 110 * s)} ${base} Z"/>
    ${cols}
    <rect x="${f(cx - 58 * s)}" y="${f(base - 68 * s)}" width="${f(116 * s)}" height="${f(7 * s)}"/>
    <rect x="${f(cx - 60 * s)}" y="${f(base - 34 * s)}" width="${f(120 * s)}" height="${f(5 * s)}"/>
    <path d="M${f(cx - 54 * s)} ${f(base - 68 * s)} ${Array.from({ length: 12 }, (_, i) => `L${f(cx - 54 * s + i * 9.8 * s)} ${f(base - 74 * s)} L${f(cx - 50 * s + i * 9.8 * s)} ${f(base - 74 * s)} L${f(cx - 50 * s + i * 9.8 * s)} ${f(base - 68 * s)}`).join(' ')} Z"/>
  </g>`;
}

/** 술 달린 차양 */
function canopy(x0: number, x1: number, y: number): string {
  const fr = Array.from({ length: Math.floor((x1 - x0) / 6) + 1 }, (_, i) => `M${x0 + i * 6} ${y + 10} l0 5`).join(' ');
  return `<path class="et-canopy" d="M${x0 - 6} ${y} L${x1 + 6} ${y} L${x1 + 2} ${y + 10} Q${(x0 + x1) / 2} ${y + 16} ${x0 - 2} ${y + 10} Z"/>
    <path class="et-canopy-gold" d="M${x0 - 6} ${y} L${x1 + 6} ${y} L${x1 + 5} ${y + 3} L${x0 - 5} ${y + 3} Z"/>
    <path class="et-fringe" d="${fr}"/>`;
}

// ── 1. 수산 궁 큰 홀 (1:5-6) ───────────────────
function hallArt(): string {
  const xs = [-60, 40, 140, 260, 360, 460];
  return `<g class="et et--hall">
    ${tileWall(0, 176)}
    ${guardFrieze(92, 30)}
    ${rosettes(80)}
    ${rosettes(136, -123)}
    <circle class="bd-halo" cx="200" cy="120" r="150"/>
    ${xs.map((x) => column(x, 214, 200, 1.05)).join('')}
    ${xs.slice(0, -1).map((x, i) => swag(x, xs[i + 1], 30, 22, i)).join('')}
    ${marble(212)}
  </g>`;
}

// ── 2. 왕의 대궐 문 (2:19, 21 · 4:2, 6) ─────────
function gateArt(): string {
  return `<g class="et et--gate">
    ${ridge([[-W * 2, 140], [-20, 132], [160, 136], [320, 128], [W * 3, 136]], 'bd-far')}
    ${citadel(320, 128, 0.7)}
    <!-- 문루: 두꺼운 벽 두 덩이와 그 사이 높은 통로 -->
    <g class="et-gatehouse">
      <rect x="92" y="78" width="216" height="168"/>
      <rect class="et-gatecap" x="86" y="70" width="228" height="10"/>
      <path d="M90 70 ${Array.from({ length: 19 }, (_, i) => `L${92 + i * 12} 70 L${92 + i * 12} 62 L${98 + i * 12} 62 L${98 + i * 12} 70`).join(' ')} L310 70 Z"/>
      <rect class="et-tile" x="92" y="84" width="216" height="20"/>
    </g>
    ${rosettes(94, 104, 7, 32)}
    <rect class="et-passage" x="158" y="112" width="84" height="134"/>
    <rect class="et-passage-light" x="168" y="122" width="64" height="124"/>
    ${column(170, 246, 124, 0.8, 'et-col et-col--gate')}${column(230, 246, 124, 0.8, 'et-col et-col--gate')}
    ${column(112, 246, 150, 0.9)}${column(288, 246, 150, 0.9)}
    <!-- 문 곁 돌 걸상 -->
    <rect class="et-bench" x="56" y="228" width="44" height="10"/><rect class="et-bench" x="300" y="228" width="50" height="10"/>
    <!-- 광장 포석 -->
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 246 L${W * 3} 246 L${W * 3} ${H} Z"/>
    <path class="et-paving" d="${Array.from({ length: 13 }, (_, i) => `M${f(200 + (i - 6) * 26)} 246 L${f(200 + (i - 6) * 70)} ${H}`).join(' ')} M${-W * 2} 251 H${W * 3} M${-W * 2} 256 H${W * 3}"/>
  </g>`;
}

// ── 3. 후궁 뜰 (2:3, 8-9, 11) ──────────────────
function womenCourtArt(): string {
  const arches = Array.from({ length: 9 }, (_, i) => {
    const x = -40 + i * 60;
    return `<path class="et-arch" d="M${x} 196 L${x} 128 Q${x + 22} 98 ${x + 44} 128 L${x + 44} 196 Z"/>
      <path class="et-lattice" d="${[0, 1, 2, 3].map((k) => `M${x + 6 + k * 10} 122 L${x + 6 + k * 10} 196`).join(' ')} ${[0, 1, 2, 3, 4, 5].map((k) => `M${x} ${136 + k * 11} H${x + 44}`).join(' ')}"/>`;
  }).join('');
  return `<g class="et et--court">
    <rect class="et-plaster" x="${-W * 2}" y="0" width="${W * 5}" height="200"/>
    <rect class="et-band" x="${-W * 2}" y="80" width="${W * 5}" height="12"/>
    ${rosettes(86, -140, 30, 22)}
    <g class="et-arcade">${arches}</g>
    <rect class="et-beamdark" x="${-W * 2}" y="196" width="${W * 5}" height="6"/>
    <!-- 뜰 바닥 + 가운데 연못 -->
    <path class="et-courtfloor" d="M${-W * 2} ${H} L${-W * 2} 202 L${W * 3} 202 L${W * 3} ${H} Z"/>
    <path class="et-pool" d="M150 214 L250 214 L272 238 L128 238 Z"/>
    <path class="et-poolshine" d="M160 220 L240 220 M146 228 L254 228" />
    <g class="et-fountain"><rect x="197" y="200" width="6" height="16"/><ellipse cx="200" cy="199" rx="9" ry="2.6"/>
      <path class="et-jet" d="M200 198 Q196 186 190 196 M200 198 Q204 186 210 196 M200 198 L200 184"/></g>
    ${cypress(96, 206, 76)}${cypress(304, 206, 76)}${cypress(30, 206, 66)}${cypress(370, 206, 66)}
    ${[124, 276].map((x) => `<g class="et-pot"><path d="M${x - 7} 228 L${x + 7} 228 L${x + 5} 244 L${x - 5} 244 Z"/><circle cx="${x - 4}" cy="224" r="4"/><circle cx="${x + 3}" cy="222" r="5"/><circle class="et-bloom" cx="${x + 4}" cy="219" r="1.5"/><circle class="et-bloom" cx="${x - 5}" cy="222" r="1.3"/></g>`).join('')}
  </g>`;
}

// ── 4. 어전: 안뜰에서 본 왕좌 (4:11 · 5:1-2) ───
function throneArt(): string {
  return `<g class="et et--throne">
    ${tileWall(0, 200)}
    ${guardFrieze(40, 26)}
    <circle class="bd-halo et-thronehalo" cx="200" cy="130" r="120"/>
    ${column(60, 214, 210, 1.05)}${column(340, 214, 210, 1.05)}${column(-50, 214, 210, 1.05)}${column(450, 214, 210, 1.05)}
    ${canopy(150, 250, 88)}
    <path class="et-canopypost" d="M146 98 L146 186 M254 98 L254 186"/>
    <!-- 계단과 단 -->
    <path class="et-dais" d="M120 214 L280 214 L272 206 L128 206 Z M132 206 L268 206 L262 198 L138 198 Z M142 198 L258 198 L254 190 L146 190 Z"/>
    <!-- 왕좌: 높은 등받이, 사자발 다리, 발등상 -->
    <g class="et-throneseat">
      <path d="M176 190 L176 120 Q176 112 184 112 L190 112 Q196 112 196 120 L196 156 L222 156 L224 190 Z"/>
      <rect x="172" y="152" width="56" height="8"/>
      <path d="M176 160 L174 190 L180 190 L182 160 Z M218 160 L216 190 L222 190 L226 160 Z"/>
      <rect class="et-throne-gold" x="174" y="150" width="56" height="3"/>
      <rect class="et-throne-gold" x="178" y="112" width="16" height="3"/>
      <rect x="232" y="182" width="20" height="8"/>
    </g>
    <!-- 양옆 향로대 -->
    ${[118, 282].map((x, i) => `<g class="et-censer"><path d="M${x - 6} 214 L${x - 1.6} 196 L${x - 1.6} 170 L${x + 1.6} 170 L${x + 1.6} 196 L${x + 6} 214 Z"/><path d="M${x - 8} 170 L${x + 8} 170 L${x + 5} 160 L${x - 5} 160 Z"/><path d="M${x - 4} 160 L${x} 150 L${x + 4} 160 Z"/>
      <g class="et-incense" style="--d:${i * 1.6}s"><circle cx="${x}" cy="146" r="3"/><circle cx="${x + 2}" cy="138" r="3.6"/><circle cx="${x - 1}" cy="128" r="4"/></g></g>`).join('')}
    ${marble(214)}
  </g>`;
}

// ── 5. 잔치 자리 (5:4-8 · 7:1-8) ───────────────
function banquetArt(): string {
  /** 침상식 걸상: 비스듬히 놓인 긴 의자 + 쿠션 + 둥근 다리 */
  const couch = (x: number, dir: number) => {
    const X = (dx: number) => f(x + dir * dx);
    return `<g class="et-couch">
      <path d="M${X(0)} 222 L${X(0)} 196 Q${X(0)} 188 ${X(8)} 188 L${X(12)} 188 L${X(14)} 204 L${X(86)} 204 L${X(86)} 222 Z"/>
      <path class="et-cushion" d="M${X(14)} 204 Q${X(14)} 196 ${X(22)} 196 L${X(82)} 196 Q${X(88)} 196 ${X(88)} 204 Z"/>
      <ellipse class="et-cushion2" cx="${X(20)}" cy="194" rx="9" ry="6"/>
      <path class="et-couchgold" d="M${X(0)} 212 L${X(86)} 212 L${X(86)} 214 L${X(0)} 214 Z"/>
      <path d="M${X(4)} 222 L${X(6)} 238 L${X(10)} 238 L${X(10)} 222 Z M${X(76)} 222 L${X(78)} 238 L${X(82)} 238 L${X(82)} 222 Z"/>
    </g>`;
  };
  return `<g class="et et--banquet">
    ${tileWall(0, 150)}
    ${rosettes(30, -140, 18, 34)}
    <path class="et-plaster" d="M${-W * 2} 150 L${W * 3} 150 L${W * 3} 236 L${-W * 2} 236 Z"/>
    <rect class="et-band" x="${-W * 2}" y="146" width="${W * 5}" height="8"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => swag(-80 + i * 110, 30 + i * 110, 8, 18, i)).join('')}
    ${column(-10, 236, 230, 1)}${column(410, 236, 230, 1)}
    ${lampstand(104, 236, 70, 0)}${lampstand(296, 236, 70, 1)}
    ${couch(118, 1)}${couch(282, -1)}
    <!-- 가운데 낮은 상: 금 잔·뿔잔·술병·과일 -->
    <g class="et-table">
      <path d="M170 214 L230 214 L226 218 L174 218 Z"/>
      <path d="M176 218 L178 236 L181 236 L181 218 Z M219 218 L219 236 L222 236 L224 218 Z"/>
      <g class="et-vessel">
        <path d="M184 214 L183 204 Q183 200 186 200 L189 200 Q192 200 191 204 L190 214 Z"/>
        <path d="M200 200 Q206 198 208 206 L210 214 L204 214 L202 206 Z"/>
        <path d="M196 202 Q195 194 200 192 L205 191 Q201 194 200 200 Z"/>
        <ellipse cx="217" cy="212" rx="6" ry="2.4"/>
        <circle cx="215" cy="208" r="2"/><circle cx="219" cy="207.6" r="2"/>
      </g>
    </g>
    <rect class="et-floor" x="${-W * 2}" y="236" width="${W * 5}" height="${H - 236}"/>
    <path class="et-floorline" d="M${-W * 2} 242 H${W * 3} M${-W * 2} 250 H${W * 3}"/>
  </g>`;
}

// ── 6. 왕궁 후원 (7:7-8) ───────────────────────
function gardenArt(): string {
  const rows = [0, 1, 2, 3, 4, 5].map((i) => {
    const t = i / 5;
    const y = 238 - t * 70;
    const s = 1 - t * 0.78;
    const dx = 46 + (1 - t) * 90;
    return `${cypress(200 - dx, y, 70 * s)}${cypress(200 + dx, y, 70 * s)}`;
  }).reverse().join('');
  return `<g class="et et--garden">
    ${ridge([[-W * 2, 168], [-40, 160], [140, 166], [320, 156], [W * 3, 164]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 170 C0 168 200 166 ${W * 3} 170 L${W * 3} ${H} Z"/>
    <!-- 끝의 정자 -->
    <g class="et-pavilion"><rect x="182" y="150" width="36" height="20"/><path d="M178 150 L200 136 L222 150 Z"/>
      <rect x="185" y="150" width="2.4" height="20"/><rect x="198.8" y="150" width="2.4" height="20"/><rect x="212.6" y="150" width="2.4" height="20"/></g>
    <!-- 물길 -->
    <path class="et-channel" d="M194 170 L206 170 L238 ${H} L162 ${H} Z"/>
    <path class="et-channelshine" d="M198 182 L202 182 M195 200 L205 200 M190 222 L210 222 M184 246 L216 246"/>
    <path class="et-channelrim" d="M194 170 L162 ${H} M206 170 L238 ${H}"/>
    ${rows}
    <!-- 꽃나무 -->
    ${[[70, 236, 0], [330, 236, 1], [12, 242, 2], [392, 242, 3]].map(([x, y, i]) => `<g class="et-bloomtree"><rect class="et-trunk" x="${x - 1.6}" y="${y - 30}" width="3.2" height="30"/>
      ${[[-12, -36, 12], [8, -40, 13], [-2, -50, 12], [14, -30, 9], [-16, -28, 8]].map(([dx, dy, r]) => `<circle cx="${x + dx}" cy="${y + dy}" r="${r}"/>`).join('')}
      ${Array.from({ length: 7 }, (_, k) => `<circle class="et-petal" style="--d:${f((i * 1.3 + k * 0.9) % 6)}s" cx="${x - 14 + k * 5}" cy="${y - 44 + (k % 3) * 8}" r="1.3"/>`).join('')}</g>`).join('')}
    ${ground(250)}
  </g>`;
}

// ── 7. 하만의 집 (5:10-14 · 6:12-14 · 7:9) ────
function hamanHouseArt(): string {
  return `<g class="et et--haman">
    ${ridge([[-W * 2, 176], [-30, 170], [150, 174], [330, 166], [W * 3, 172]], 'bd-far')}
    <!-- 담 너머 멀리 높은 장대 (5:14 "높이가 오십 규빗") — 사람은 그리지 않는다 -->
    <g class="et-pole"><rect x="288" y="20" width="4" height="156"/><rect x="280" y="22" width="20" height="3"/></g>
    <!-- 높은 담 + 문 -->
    <rect class="et-housewall" x="${-W * 2}" y="120" width="${W * 5}" height="128"/>
    <path class="et-housewall" d="M${-W * 2} 120 ${Array.from({ length: 40 }, (_, i) => `L${-W * 2 + i * 50 + 20} 120 L${-W * 2 + i * 50 + 20} 114 L${-W * 2 + i * 50 + 40} 114 L${-W * 2 + i * 50 + 40} 120`).join(' ')} L${W * 3} 120 Z"/>
    <path class="et-wallline" d="M${-W * 2} 150 H${W * 3} M${-W * 2} 186 H${W * 3} M${-W * 2} 220 H${W * 3}"/>
    <path class="et-door" d="M70 248 L70 170 Q92 150 114 170 L114 248 Z"/>
    <rect class="et-window" x="220" y="150" width="22" height="26"/>
    <path class="et-lattice" d="M227 150 V176 M235 150 V176 M220 159 H242 M220 167 H242"/>
    <!-- 화로와 깔개 -->
    <path class="et-rug" d="M130 246 L270 246 L284 256 L116 256 Z"/>
    <path class="et-rugline" d="M136 249 L264 249 M124 253 L276 253"/>
    <g class="et-brazier"><path d="M186 236 L214 236 L208 246 L192 246 Z"/><path d="M190 246 L188 252 M210 246 L212 252"/>
      <circle class="bd-halo et-brazierhalo" cx="200" cy="230" r="40"/>
      <ellipse class="et-coal" cx="200" cy="235" rx="10" ry="2.4"/>
      <ellipse class="et-flame" style="--d:0.3s" cx="196" cy="231" rx="2.4" ry="4.2"/><ellipse class="et-flame" style="--d:0.9s" cx="204" cy="232" rx="2" ry="3.6"/></g>
    ${ground(254)}
  </g>`;
}

// ── 8. 잠 못 이루는 왕의 침전 (6:1) ────────────
function bedchamberArt(): string {
  const r = rng(6801);
  const boxes = Array.from({ length: 14 }, (_, i) => {
    const col = i % 7;
    const row = Math.floor(i / 7);
    const x = 238 + col * 15;
    const y = 120 + row * 26;
    return `<rect class="et-scrollbox" x="${x}" y="${y}" width="13" height="${f(18 + r() * 4)}"/><circle class="et-scrollend" cx="${x + 6.5}" cy="${y + 6}" r="3"/>`;
  }).join('');
  return `<g class="et et--bed">
    ${tileWall(0, 236)}
    ${rosettes(24, -140, 18, 34)}
    <!-- 창: 초승달과 별 -->
    <path class="et-window et-window--night" d="M150 120 L150 62 Q170 40 190 62 L190 120 Z"/>
    <path class="et-moon" d="M176 72 A9 9 0 1 0 178 88 A7 7 0 1 1 176 72 Z"/>
    ${[[158, 70], [164, 96], [182, 104], [156, 108]].map(([x, y]) => `<circle class="et-star" cx="${x}" cy="${y}" r="0.9"/>`).join('')}
    <path class="et-lattice" d="M150 90 H190 M170 52 V120"/>
    <!-- 차양 친 침상 (왼쪽) -->
    <g class="et-bed">
      <path class="et-bedcurtain" d="M28 76 L136 76 L132 86 Q82 96 32 86 Z"/>
      <path class="et-bedcurtain" d="M30 86 Q26 150 34 214 L44 214 Q38 150 42 88 Z M134 86 Q138 150 130 214 L120 214 Q126 150 124 88 Z"/>
      <path d="M30 196 L136 196 L136 214 L30 214 Z"/>
      <path class="et-cushion" d="M36 196 Q36 186 46 186 L126 186 Q134 186 134 196 Z"/>
      <ellipse class="et-cushion2" cx="48" cy="184" rx="11" ry="6"/>
      <path class="et-couchgold" d="M30 204 L136 204 L136 206 L30 206 Z"/>
      <path d="M34 214 L36 236 L41 236 L41 214 Z M126 214 L126 236 L131 236 L132 214 Z"/>
    </g>
    <!-- 역대 일기 두루마리 상자들 + 낭독대 -->
    <rect class="et-shelf" x="234" y="114" width="112" height="4"/><rect class="et-shelf" x="234" y="140" width="112" height="4"/><rect class="et-shelf" x="234" y="166" width="112" height="4"/>
    ${boxes}
    <g class="et-lectern"><path d="M206 236 L210 196 L214 196 L218 236 Z"/><path d="M196 196 L228 188 L230 194 L198 202 Z"/>
      <path class="et-openscroll" d="M199 194 L226 187 L227 190 L200 197 Z"/></g>
    ${lampstand(160, 236, 64, 0)}${lampstand(250, 236, 56, 1)}
    <rect class="et-floor" x="${-W * 2}" y="236" width="${W * 5}" height="${H - 236}"/>
    <path class="et-floorline" d="M${-W * 2} 242 H${W * 3} M${-W * 2} 250 H${W * 3}"/>
  </g>`;
}

// ── 9. 수산 성중 거리 (3:15 · 6:9-11 · 8:15) ───
function streetArt(): string {
  const r = rng(6901);
  const houses = (y: number, s: number, cls: string, n: number, seed: number) => {
    const rr = rng(seed);
    return `<g class="${cls}">${Array.from({ length: n }, (_, i) => {
      const w = (26 + rr() * 18) * s;
      const h = (28 + rr() * 22) * s;
      const x = -200 + i * (W * 2 / n) + rr() * 6;
      return `<rect x="${f(x)}" y="${f(y - h)}" width="${f(w)}" height="${f(h)}"/>
        <rect class="et-win" x="${f(x + w * 0.4)}" y="${f(y - h * 0.7)}" width="${f(3 * s)}" height="${f(5 * s)}"/>`;
    }).join('')}</g>`;
  };
  const cloths = Array.from({ length: 7 }, (_, i) => {
    const x = 40 + i * 52;
    return `<path class="${['et-cloth-white', 'et-cloth-blue', 'et-cloth-green'][i % 3]} et-banner" style="--d:${f(r() * 3)}s" d="M${x} ${182 - (i % 2) * 8} L${x + 10} ${182 - (i % 2) * 8} L${x + 9} ${206 - (i % 2) * 8} L${x + 5} ${202 - (i % 2) * 8} L${x + 1} ${206 - (i % 2) * 8} Z"/>`;
  }).join('');
  return `<g class="et et--street">
    ${ridge([[-W * 2, 120], [-30, 116], [120, 112], [300, 118], [W * 3, 114]], 'bd-far')}
    ${citadel(200, 112, 0.9)}
    ${houses(176, 0.8, 'bd-mid', 18, 6911)}
    ${folk(-100, 150, 500, 150, 34, 1.4, 6912, 'et-roofpeople')}
    ${houses(248, 1.15, 'bd-near et-house-near', 11, 6913)}
    ${cloths}
    <path class="et-street" d="M150 ${H} L180 200 L220 200 L250 ${H} Z"/>
    ${ground(254)}
  </g>`;
}

export function estherArt(art: EstherArt): string {
  switch (art) {
    case 'et-susa-hall': return hallArt();
    case 'et-kings-gate': return gateArt();
    case 'et-women-court': return womenCourtArt();
    case 'et-throne': return throneArt();
    case 'et-banquet': return banquetArt();
    case 'et-garden': return gardenArt();
    case 'et-haman-house': return hamanHouseArt();
    case 'et-bedchamber': return bedchamberArt();
    case 'et-street': return streetArt();
  }
}

// 밤 장면에서 별이 필요하면 쓰도록 (지금은 바깥 배경의 night 톤이 별을 깐다)
export const etStars = (n: number, seed: number) => stars(n, 110, seed);

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

/** 무대 위 인물의 그림 상자 (scene 기준). 없으면 null */
function actorBox(scene: HTMLElement, id: string | undefined) {
  if (!id) return null;
  const b = scene.getBoundingClientRect();
  const el = [...scene.querySelectorAll<HTMLElement>('.scene__stage .actor')].find((a) => a.dataset.id === id);
  if (!el) return null;
  const a = (el.querySelector<SVGElement>('.actor__art') ?? el).getBoundingClientRect();
  if (!a.width) return null;
  return { x: a.left - b.left + a.width / 2, top: a.top - b.top, h: a.height, w: a.width, left: a.left - b.left };
}

/** 무대 위 인물 id들 (왼쪽부터) */
function stageIds(scene: HTMLElement): string[] {
  return [...scene.querySelectorAll<HTMLElement>('.scene__stage .actor')]
    .filter((a) => !a.classList.contains('is-leaving'))
    .map((a) => ({ id: a.dataset.id ?? '', x: a.getBoundingClientRect().left }))
    .sort((p, q) => p.x - q.x)
    .map((p) => p.id);
}

/** 인물의 앞손 위치 대략 (towardX 쪽 손) */
function handOf(scene: HTMLElement, id: string | undefined, fallbackX: number, towardX?: number): { x: number; y: number } {
  const b = scene.getBoundingClientRect();
  const a = actorBox(scene, id);
  if (!a) return { x: b.width * fallbackX, y: b.height * 0.5 };
  const dir = towardX === undefined ? 1 : Math.sign(towardX - a.x) || 1;
  return { x: a.x + dir * a.w * 0.22, y: a.top + a.h * 0.38 };
}

/** 인물의 가운데 x (없으면 fallback 비율) */
function centerX(scene: HTMLElement, id: string | undefined, fallback: number): number {
  const a = actorBox(scene, id);
  return a ? a.x : scene.getBoundingClientRect().width * fallback;
}

/** thread: 보이지 않는 손 — 가는 은실 한 가닥이 두 사람(두 지점)을 잇고 맞물린 뒤 흩어짐 */
export function playThread(scene: HTMLElement, who: string | undefined, to: string | undefined, rm: boolean): void {
  const b = scene.getBoundingClientRect();
  const ids = stageIds(scene);
  const A = who ?? ids[0];
  let B = to ?? (ids.find((x) => x !== A));
  if (A === B) B = undefined;
  const pa = actorBox(scene, A);
  const pb = actorBox(scene, B);
  const p1 = pa ? { x: pa.x, y: pa.top + pa.h * 0.26 } : { x: b.width * 0.12, y: b.height * 0.36 };
  const p2 = pb ? { x: pb.x, y: pb.top + pb.h * 0.26 } : { x: b.width * 0.88, y: b.height * 0.32 };
  const mx = (p1.x + p2.x) / 2;
  const my = Math.min(p1.y, p2.y) - Math.max(18, Math.abs(p2.x - p1.x) * 0.12);
  const d = `M${f(p1.x)} ${f(p1.y)} Q${f(mx)} ${f(my)} ${f(p2.x)} ${f(p2.y)}`;
  const cx = (p1.x + 2 * mx + p2.x) / 4;
  const cy = (p1.y + 2 * my + p2.y) / 4;
  const r = rng(Date.now() % 7919);
  const fibers = rm ? '' : Array.from({ length: 14 }, () => `<i style="--x:${f(cx + (r() - 0.5) * 120)}px; --y:${f(cy + (r() - 0.5) * 40)}px; --dy:${f(20 + r() * 40)}px; --d:${f(r() * 0.6)}s"></i>`).join('');
  layerOf(scene, `fx-thread${rm ? ' is-rm' : ''}`,
    `<svg width="${f(b.width)}" height="${f(b.height)}" viewBox="0 0 ${f(b.width)} ${f(b.height)}" aria-hidden="true">
       <path class="fx-thread__glow" d="${d}" pathLength="100"/>
       <path class="fx-thread__line" d="${d}" pathLength="100"/>
       <circle class="fx-thread__end" cx="${f(p1.x)}" cy="${f(p1.y)}" r="1.6"/>
       <circle class="fx-thread__end" cx="${f(p2.x)}" cy="${f(p2.y)}" r="1.6"/>
     </svg>
     <b class="fx-thread__knot" style="--x:${f(cx)}px; --y:${f(cy)}px"></b>
     <div class="fx-thread__fibers">${fibers}</div>`,
    rm ? 2600 : 5200, 1400);
}

const CHR_KEY = '빅단과 데레스의 모살 음모 — 모르드개가 고발함';

/** 가짜 글줄 (쐐기·아람 글자처럼 보이는 짧은 획들) */
function scriptLine(seed: number): string {
  const r = rng(seed);
  return Array.from({ length: 9 + Math.floor(r() * 5) }, () => `<i style="--w:${f(4 + r() * 12)}px"></i>`).join('');
}

/** chronicle / chronicle-read: 궁중 일기 (2:23 기록 · 6:1-3 읽힘) */
export function playChronicle(scene: HTMLElement, mode: 'write' | 'read', rm: boolean): void {
  const before = mode === 'read' ? 9 : 3;
  const lines = (n: number, s: number) => Array.from({ length: n }, (_, i) => `<p class="fx-chr__line">${scriptLine(s + i)}</p>`).join('');
  const key = `<p class="fx-chr__line fx-chr__key"><span class="fx-chr__marks">${scriptLine(77)}</span><em>${CHR_KEY}</em></p>
    <p class="fx-chr__line fx-chr__reward"><span>베푼 것 :</span><b>${mode === 'read' ? '없음' : ''}</b></p>`;
  layerOf(scene, `fx-chr fx-chr--${mode}${rm ? ' is-rm' : ''}`,
    `<div class="fx-chr__body">
       <i class="fx-chr__rod fx-chr__rod--t"></i>
       <div class="fx-chr__sheet"><div class="fx-chr__flow">${lines(before, mode === 'read' ? 11 : 31)}${key}${lines(3, 51)}</div></div>
       <i class="fx-chr__rod fx-chr__rod--b"></i>
       <small class="fx-chr__cap">${mode === 'read' ? '역대 일기 · 에 6:2' : '궁중 일기 · 에 2:23'}</small>
     </div>`,
    rm ? 4200 : mode === 'read' ? 9800 : 8600, 1600);
}

const MONTHS = ['니산월', '이월', '삼월', '사월', '오월', '육월', '칠월', '팔월', '구월', '시월', '십일월', '아달월'];

/** pur: 제비가 굴러 열두째 달 아달월에 멈춤 (3:7) */
export function playPur(scene: HTMLElement, rm: boolean): void {
  // 첫째 달부터 차례로 켜지되 점점 느려진다 (마지막 칸이 아달월)
  let t = 0.5;
  const cells = MONTHS.map((m, i) => {
    const at = t;
    t += 0.18 + i * i * 0.012;
    return `<li style="--t:${f(rm ? 0 : at)}s"${i === 11 ? ' class="is-pick"' : ''}><b>${i + 1}</b><span>${m}</span></li>`;
  }).join('');
  layerOf(scene, `fx-pur${rm ? ' is-rm' : ''}`,
    `<div class="fx-pur__box">
       <ol class="fx-pur__months" style="--end:${f(t)}s">${cells}</ol>
       <div class="fx-pur__lane"><b class="fx-pur__die" style="--end:${f(t)}s"><i></i><i></i><i></i></b></div>
       <p class="fx-pur__cap" style="--end:${f(t)}s">열두째 달 · 아달월 — 거의 일 년 뒤</p>
     </div>`,
    rm ? 4200 : 9000, 1600);
}

/** scepter: 금홀이 기울어 내밀어짐 (5:2 · 8:4) */
export function playScepter(scene: HTMLElement, who: string | undefined, to: string | undefined, rm: boolean): void {
  const b = scene.getBoundingClientRect();
  const k = who ?? 'ahasuerus';
  const q = to ?? 'esther';
  const h = handOf(scene, k, 0.3, centerX(scene, q, 0.7));
  const ta = actorBox(scene, q);
  const tgt = ta ? { x: ta.x, y: ta.top + ta.h * 0.42 } : { x: b.width * 0.7, y: b.height * 0.5 };
  const len = Math.max(60, Math.min(Math.hypot(tgt.x - h.x, tgt.y - h.y) * 0.82, b.width * 0.42));
  const ang = (Math.atan2(tgt.y - h.y, tgt.x - h.x) * 180) / Math.PI;
  layerOf(scene, `fx-scepter${rm ? ' is-rm' : ''}`,
    `<div class="fx-scepter__rod" style="--x:${f(h.x)}px; --y:${f(h.y)}px; --len:${f(len)}px; --ang:${f(ang)}deg"><i></i><b></b></div>
     <b class="fx-scepter__touch" style="--x:${f(tgt.x)}px; --y:${f(tgt.y)}px"></b>
     <small class="fx-scepter__cap" style="--x:${f((h.x + tgt.x) / 2)}px; --y:${f(Math.min(h.y, tgt.y) - 30)}px">금홀</small>`,
    rm ? 3200 : 6000, 1400);
}

/** signet: 왕의 반지가 손에서 손으로 (3:10 · 8:2) */
export function playSignet(scene: HTMLElement, who: string | undefined, to: string | undefined, rm: boolean): void {
  const giver = who ?? 'ahasuerus';
  const ids = stageIds(scene);
  const taker = to ?? ids.find((x) => x !== giver);
  const p1 = handOf(scene, giver, 0.3, centerX(scene, taker, 0.7));
  const p2 = handOf(scene, taker, 0.7, centerX(scene, giver, 0.3));
  const lift = Math.max(40, Math.abs(p2.x - p1.x) * 0.3);
  layerOf(scene, `fx-signet${rm ? ' is-rm' : ''}`,
    `<div class="fx-signet__ring" style="--x1:${f(p1.x)}px; --y1:${f(p1.y)}px; --x2:${f(p2.x)}px; --y2:${f(p2.y)}px; --lift:${f(-lift)}px"><i></i><b></b></div>
     <small class="fx-signet__cap" style="--x:${f((p1.x + p2.x) / 2)}px; --y:${f(Math.min(p1.y, p2.y) - lift - 26)}px">왕의 반지</small>`,
    rm ? 3000 : 5000, 1200);
}

/** riders: 역졸들이 말을 타고 사방으로 (3:13-15 · 8:10-14) */
export function playRiders(scene: HTMLElement, rm: boolean): void {
  const horse = `<svg viewBox="0 0 60 40" aria-hidden="true"><path d="M8 22 C10 16 18 14 30 15 C36 15 40 13 44 9 L48 4 L50 8 C53 9 56 12 55 15 L51 15 C49 18 47 21 44 22 C44 26 43 30 42 33 L44 39 L41 39 L38 30 C32 31 24 31 18 30 L15 39 L12 39 L13 30 C10 28 8 26 8 22 Z M6 22 C3 24 2 29 3 33 C5 30 6 27 8 25 Z"/>
    <path d="M27 15 C26 10 27 6 31 4 C33 3 35 4 35 6 L34 9 C36 10 36 13 34 15 Z"/><circle cx="33" cy="2.4" r="2.4"/><rect class="fx-riders__tube" x="22" y="9" width="7" height="3" rx="1.4"/></svg>`;
  const r = rng(Date.now() % 6151);
  const n = rm ? 4 : 12;
  const riders = Array.from({ length: n }, (_, i) => {
    const dir = i % 2 ? 1 : -1;
    const lane = Math.floor(i / 2);
    return `<span class="fx-riders__r" style="--dir:${dir}; --y:${f(56 + lane * 5 + r() * 3)}%; --s:${f(0.55 + lane * 0.1 + r() * 0.1)}; --d:${f(lane * 0.42 + r() * 0.2)}s; --far:${f(70 + r() * 30)}vw">${horse}<b class="fx-riders__dust"></b></span>`;
  }).join('');
  layerOf(scene, `fx-riders${rm ? ' is-rm' : ''}`,
    `${riders}<small class="fx-riders__cap">각 도로 — 왕의 어명으로 급히</small>`,
    rm ? 3200 : 7600, 1400);
}
