// 10막 A급 — 느헤미야 (느 1–2 「짧은 기도」 · 4 「한 손엔 일, 한 손엔 병기」 · 8 「수문 앞의 울음」)의 전용 배경과 효과.
// 느헤미야 B급(3, 5, 6, 7, 9, 10, 11–12, 13)에서도 그대로 재사용하도록 범용으로 그렸다.
// 같은 종이 오려낸 그림자극 말투. 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - nh-susa-banquet : 수산 궁, 왕의 식탁. 바사 기둥(두 머리 황소 기둥머리) 둘, 청색 유약 벽돌 띠와 국화 무늬, 위로 늘어진 휘장,
//                      가운데 사자 발 낮은 상 위의 금 뿔잔(리톤)·잔·과일, 오른쪽 받침 위 포도주 항아리, 등잔 둘 (느 2:1 "왕의 앞에 술이 있기로")
//  - nh-susa-night   : 겨울 궁의 밤 창. 아치 창 너머 달과 별, 먼 서쪽 언덕, 창턱의 등잔 하나, 아래 낮은 걸상, 양옆 휘장 (느 1:4 "앉아서 울고")
//  - nh-ruin         : 무너진 예루살렘 성벽. 언덕 위로 군데군데 끊긴 성벽, 불탄 성문(골짜기 문)의 검은 기둥과 쓰러진 들보,
//                      아래 골짜기 길, 길을 막은 돌무더기, 왕의 못 (느 1:3, 2:13-15). 밤(-night)이면 달이 뜸 → fx night-survey
//  - nh-wall-work    : 성벽 공사장. 왼쪽은 높이 오른 벽, 오른쪽으로 갈수록 낮아지는 벽에 두른 비계와 사다리, 다듬은 돌 더미,
//                      앞쪽 흙무더기와 광주리, 벽 위 작은 일꾼들, 새 들보를 단 성문 (느 3–4, 4:10 "흙 무더기가 아직도 많거늘")
//  - nh-wall-done    : 완성된 성벽. 망대 셋, 가운데 새 문짝을 단 성문(빗장), 성벽 위 작은 파수꾼 (느 6:15, 7:1-3)
//  - nh-water-gate   : 수문 앞 광장. 뒤로 동쪽 성벽과 수문(아치), 가운데 높은 나무 강단(계단·난간·두루마리를 편 낭독대, 좌우 열세 사람),
//                      앞쪽 가득한 무리의 머리 (느 8:1-8). -dawn이면 수문 너머로 해 뜨는 빛
//  - nh-booths       : 초막. 지붕 위·뜰·문 앞의 나뭇가지 초막들(종려·감람 가지), 초막 안 등불, 뒤로 성벽 (느 8:15-17). -night이면 등불이 밝음
// 효과:
//  - arrow-prayer : 짧은 묵도 (2:4). 무대의 색이 빠지고 숨쉬기·옷자락이 멈춘 가운데, 느헤미야(who)의 머리에서 가는 금빛 한 줄기가
//                   위로 올라 사라지고, 다시 색과 움직임이 흘러감 (약 2.8초, 아주 조용히)
//  - night-survey : 밤의 정찰 (2:12-15). 배경 nh-ruin의 골짜기 길을 따라 등불 하나와 나귀 탄 사람이 무너진 성벽 아래를 지나가며
//                   벽을 비추다가, 돌무더기 앞에서 멈칫하고(2:14) 돌아감 (약 10초)
//  - trowel-sword : 한 손엔 일, 한 손엔 병기 (4:17). 무대 위쪽에 성벽 줄이 서고 그 위 일꾼 실루엣들이 한 손엔 광주리·돌,
//                   한 손엔 창을 잡고 번갈아 돌을 놓음. 창끝이 반짝임 (약 10초)
//  - rally-horn   : 나팔 부는 자 (4:18-20). who(없으면 nehemiah) 곁에서 양각 나팔이 들리고 소리 고리가 퍼지며 "뚜—",
//                   양옆에서 작은 사람들이 그쪽으로 모여듦 (약 6초)
//  - torah-read   : 말씀을 읽고 뜻을 풀다 (8:3-8). 강단(배경 nh-water-gate가 있으면 그 낭독대, 없으면 who 또는 무대 위)에서 두루마리가 펴지고
//                   히브리어 글줄이 빛의 띠로 풀려 무리 위로 흘러가며 우리말 뜻으로 바뀌고, 아래 무리의 머리가 하나씩 켜짐 (약 9초)
// 하나님은 그리지 않는다.
import { H, W, rng, smoke } from './backdrop';
import { folk, ground, ridge, stars } from './joshua';

export type NehemiahArt = 'nh-susa-banquet' | 'nh-susa-night' | 'nh-ruin' | 'nh-wall-work' | 'nh-wall-done' | 'nh-water-gate' | 'nh-booths';

const f = (n: number) => n.toFixed(1);

// ── 작은 조각들 ─────────────────────────────────
/** 바사 기둥: 종 모양 받침 + 홈 판 기둥 + 소용돌이 + 두 머리 황소 기둥머리 */
function column(x: number, base: number, top: number, s = 1): string {
  const X = (d: number) => f(x + d * s);
  const flutes = [-3, 0, 3].map((d) => `M${X(d)} ${f(top + 34 * s)} L${X(d)} ${f(base - 14 * s)}`).join(' ');
  return `<g class="nh-column">
    <path d="M${X(-13)} ${f(base)} C${X(-12)} ${f(base - 8 * s)} ${X(-7)} ${f(base - 12 * s)} ${X(-5)} ${f(base - 14 * s)} L${X(5)} ${f(base - 14 * s)} C${X(7)} ${f(base - 12 * s)} ${X(12)} ${f(base - 8 * s)} ${X(13)} ${f(base)} Z"/>
    <rect x="${X(-5)}" y="${f(top + 30 * s)}" width="${f(10 * s)}" height="${f(base - top - 44 * s)}"/>
    <path class="nh-flute" d="${flutes}"/>
    <path d="M${X(-7)} ${f(top + 32 * s)} L${X(-8)} ${f(top + 22 * s)} C${X(-14)} ${f(top + 20 * s)} ${X(-14)} ${f(top + 13 * s)} ${X(-9)} ${f(top + 12 * s)} L${X(9)} ${f(top + 12 * s)} C${X(14)} ${f(top + 13 * s)} ${X(14)} ${f(top + 20 * s)} ${X(8)} ${f(top + 22 * s)} L${X(7)} ${f(top + 32 * s)} Z"/>
    <path d="M${X(-30)} ${f(top + 12 * s)} C${X(-34)} ${f(top + 8 * s)} ${X(-33)} ${f(top + 2 * s)} ${X(-28)} ${f(top)} L${X(-30)} ${f(top - 5 * s)} L${X(-25)} ${f(top - 1 * s)}
      C${X(-20)} ${f(top - 3 * s)} ${X(-16)} ${f(top - 1 * s)} ${X(-14)} ${f(top + 2 * s)} L${X(14)} ${f(top + 2 * s)} C${X(16)} ${f(top - 1 * s)} ${X(20)} ${f(top - 3 * s)} ${X(25)} ${f(top - 1 * s)}
      L${X(30)} ${f(top - 5 * s)} L${X(28)} ${f(top)} C${X(33)} ${f(top + 2 * s)} ${X(34)} ${f(top + 8 * s)} ${X(30)} ${f(top + 12 * s)}
      L${X(24)} ${f(top + 12 * s)} L${X(22)} ${f(top + 18 * s)} L${X(18)} ${f(top + 18 * s)} L${X(18)} ${f(top + 12 * s)} L${X(-18)} ${f(top + 12 * s)} L${X(-18)} ${f(top + 18 * s)} L${X(-22)} ${f(top + 18 * s)} L${X(-24)} ${f(top + 12 * s)} Z"/>
    <circle class="nh-eye" cx="${X(-27)}" cy="${f(top + 4 * s)}" r="${f(0.9 * s)}"/><circle class="nh-eye" cx="${X(27)}" cy="${f(top + 4 * s)}" r="${f(0.9 * s)}"/>
  </g>`;
}

/** 청색 유약 벽돌 띠 + 국화 무늬 */
function tileBand(y: number, h: number, seed: number): string {
  const r = rng(seed);
  const bricks = Array.from({ length: Math.ceil(h / 6) }, (_, row) =>
    `M${-W * 2} ${f(y + row * 6)} H${W * 3}`).join(' ');
  const joints = Array.from({ length: 120 }, (_, i) => {
    const x = -W * 2 + i * 16;
    return Array.from({ length: Math.ceil(h / 6) }, (_, row) => `M${f(x + (row % 2) * 8)} ${f(y + row * 6)} v6`).join(' ');
  }).join(' ');
  const rosettes = Array.from({ length: 30 }, (_, i) => {
    const x = -W * 2 + 20 + i * 44;
    return `<g class="nh-rosette" transform="translate(${x} ${f(y + h / 2)})">${Array.from({ length: 8 }, (_, k) => `<ellipse rx="1.3" ry="3.6" transform="rotate(${k * 22.5}) translate(0 -3)"/>`).join('')}<circle r="1.6" class="nh-rosette__c"/></g>`;
  }).join('');
  void r;
  return `<rect class="nh-tile" x="${-W * 2}" y="${y}" width="${W * 5}" height="${h}"/>
    <path class="nh-brick" d="${bricks} ${joints}"/>
    <rect class="nh-tile-edge" x="${-W * 2}" y="${y - 1.4}" width="${W * 5}" height="1.4"/><rect class="nh-tile-edge" x="${-W * 2}" y="${y + h}" width="${W * 5}" height="1.4"/>
    ${rosettes}`;
}

/** 늘어진 휘장 (위에서 둥글게 처짐) */
function drape(y: number, seed: number): string {
  const r = rng(seed);
  const sags = Array.from({ length: 20 }, () => 16 + r() * 6);
  const q = sags.map((sag, i) => `Q${-W * 2 + i * 100 + 50} ${f(y + sag * 2)} ${-W * 2 + (i + 1) * 100} ${y}`).join(' ');
  const folds = sags.map((sag, i) => `M${-W * 2 + i * 100 + 50} ${f(y + sag)} L${-W * 2 + i * 100 + 50} ${f(y - 10)}`).join(' ');
  return `<path class="nh-drape" d="M${-W * 2} 0 L${-W * 2} ${y} ${q} L${W * 3} 0 Z"/>
    <path class="nh-drape-fold" d="${folds}"/>`;
}

/** 등잔대: 가는 기둥 위 접시와 불꽃 */
function lampstand(x: number, base: number, h: number, i: number): string {
  return `<g class="nh-lampstand"><rect x="${x - 1.4}" y="${base - h}" width="2.8" height="${h}"/><path d="M${x - 7} ${base} L${x} ${base - 6} L${x + 7} ${base} Z"/><path d="M${x - 6} ${base - h} Q${x} ${base - h + 5} ${x + 6} ${base - h} Z"/></g>
    <ellipse class="nh-flame" style="--d:${f(i * 0.7)}s" cx="${x}" cy="${base - h - 4}" rx="2.2" ry="4"/>
    <circle class="bd-halo nh-lamphalo" cx="${x}" cy="${base - h - 4}" r="28"/>`;
}

/** 성벽 한 줄. broken이면 위가 들쭉날쭉하고 군데군데 끊김(gaps = [x0, x1][]) */
function cityWall(top: number, base: number, opts: { towers?: number[]; gaps?: [number, number][]; broken?: boolean; cls?: string; seed?: number } = {}): string {
  const r = rng(opts.seed ?? 7);
  const x0 = -W * 2, x1 = W * 3;
  const gaps = opts.gaps ?? [];
  const pieces: [number, number][] = [];
  let cur = x0;
  for (const [g0, g1] of gaps) { pieces.push([cur, g0]); cur = g1; }
  pieces.push([cur, x1]);
  const cls = opts.cls ?? 'bd-mid';
  const body = pieces.map(([a, b]) => {
    if (!opts.broken) {
      const teeth = Array.from({ length: Math.ceil((b - a) / 9) }, (_, i) => `<rect x="${a + i * 9}" y="${top - 4}" width="5" height="4.4"/>`).join('');
      return `<rect x="${a}" y="${top}" width="${b - a}" height="${base - top}"/>${teeth}`;
    }
    // 위가 무너진 벽: 들쭉날쭉한 윗선, 끝은 비스듬히 허물어짐
    let d = `M${a} ${base} L${a + 6} ${f(top + 14 + r() * 6)}`;
    for (let x = a + 12; x < b - 6; x += 8 + r() * 10) d += ` L${f(x)} ${f(top + r() * 12)}`;
    d += ` L${b - 6} ${f(top + 16 + r() * 6)} L${b} ${base} Z`;
    return `<path d="${d}"/>`;
  }).join('');
  const towers = (opts.towers ?? []).map((x) => `<rect x="${x - 12}" y="${top - 18}" width="24" height="${base - top + 18}"/>
    ${[0, 1, 2].map((i) => `<rect x="${x - 12 + i * 8.5}" y="${top - 22}" width="5.5" height="4.4"/>`).join('')}
    <rect class="nh-slit" x="${x - 1}" y="${top - 10}" width="2" height="7"/>`).join('');
  const rows = [0.3, 0.6].map((t) => `M${x0} ${f(top + (base - top) * t + 4)} H${x1}`).join(' ');
  return `<g class="${cls}">${body}${towers}</g><path class="nh-courses" d="${rows}"/>`;
}

/** 무너져 쌓인 돌 더미 */
function rubble(x: number, y: number, s: number, seed: number, cls = 'nh-rubble'): string {
  const r = rng(seed);
  const stones = Array.from({ length: 9 }, () => {
    const dx = (r() - 0.5) * 30 * s, dy = -r() * 9 * s;
    const w = (3 + r() * 5) * s, h = (2 + r() * 3) * s;
    return `<rect x="${f(x + dx - w / 2)}" y="${f(y + dy - h)}" width="${f(w)}" height="${f(h)}" rx="${f(0.8 * s)}" transform="rotate(${f((r() - 0.5) * 30)} ${f(x + dx)} ${f(y + dy)})"/>`;
  }).join('');
  return `<g class="${cls}"><path d="M${f(x - 20 * s)} ${f(y)} Q${f(x - 6 * s)} ${f(y - 12 * s)} ${f(x)} ${f(y - 11 * s)} Q${f(x + 8 * s)} ${f(y - 12 * s)} ${f(x + 20 * s)} ${f(y)} Z"/>${stones}</g>`;
}

/** 흙무더기 (4:10) */
function dirtHeap(x: number, y: number, w: number, h: number): string {
  return `<path class="nh-dirt" d="M${f(x - w)} ${f(y)} C${f(x - w * 0.6)} ${f(y - h * 0.7)} ${f(x - w * 0.2)} ${f(y - h)} ${f(x)} ${f(y - h)} C${f(x + w * 0.3)} ${f(y - h)} ${f(x + w * 0.7)} ${f(y - h * 0.6)} ${f(x + w)} ${f(y)} Z"/>
    <path class="nh-dirtline" d="M${f(x - w * 0.5)} ${f(y - h * 0.5)} q${f(w * 0.2)} -2 ${f(w * 0.4)} 0 M${f(x)} ${f(y - h * 0.75)} q${f(w * 0.2)} -1 ${f(w * 0.3)} 1"/>`;
}

/** 광주리 */
function basket(x: number, y: number, s = 1): string {
  return `<g class="nh-basket"><path d="M${f(x - 6 * s)} ${f(y - 7 * s)} L${f(x - 4.5 * s)} ${f(y)} L${f(x + 4.5 * s)} ${f(y)} L${f(x + 6 * s)} ${f(y - 7 * s)} Z"/><path class="nh-weave" d="M${f(x - 5.6 * s)} ${f(y - 4.5 * s)} H${f(x + 5.6 * s)} M${f(x - 5 * s)} ${f(y - 2 * s)} H${f(x + 5 * s)}"/></g>`;
}

/** 다듬은 돌 더미 */
function blocks(x: number, y: number, s = 1): string {
  const rows = [[3, 0], [2, 1], [1, 2]];
  return `<g class="nh-block">${rows.map(([n, row]) => Array.from({ length: n }, (_, i) =>
    `<rect x="${f(x + (i - n / 2) * 11 * s + row * 0.5)}" y="${f(y - (row + 1) * 6.4 * s)}" width="${f(10 * s)}" height="${f(6 * s)}" rx="0.6"/>`).join('')).join('')}</g>`;
}

/** 초막 하나: 네 기둥 + 가지 지붕(잎 덩이·종려 잎) + 안의 등불 */
function booth(x: number, base: number, w: number, h: number, seed: number, lamp = true): string {
  const r = rng(seed);
  const leaves = Array.from({ length: Math.round(w / 4) }, () =>
    `<ellipse cx="${f(x - w / 2 + r() * w)}" cy="${f(base - h - 2 + (r() - 0.5) * 5)}" rx="${f(3 + r() * 4)}" ry="${f(1.6 + r() * 2)}"/>`).join('');
  const fronds = Array.from({ length: 3 }, (_, i) => {
    const fx0 = x - w / 2 + (i + 0.5) * (w / 3) + (r() - 0.5) * 4;
    const dir = r() < 0.5 ? -1 : 1;
    return `<path class="nh-frond" d="M${f(fx0)} ${f(base - h - 3)} q${f(dir * 8)} -6 ${f(dir * 18)} 1"/>`;
  }).join('');
  return `<g class="nh-booth">
    ${lamp ? `<rect class="nh-boothlight" style="--d:${f(r() * 3)}s" x="${f(x - w / 2 + 2)}" y="${f(base - h + 2)}" width="${f(w - 4)}" height="${f(h - 2)}"/>` : ''}
    <path class="nh-boothframe" d="M${f(x - w / 2)} ${base} V${f(base - h)} M${f(x + w / 2)} ${base} V${f(base - h)} M${f(x - w / 2 - 2)} ${f(base - h)} H${f(x + w / 2 + 2)}"/>
    <g class="nh-leaves">${leaves}</g>${fronds}
  </g>`;
}

/** 평평한 지붕 집 한 채 (창 불빛) */
function house(x: number, base: number, w: number, h: number, i: number, cls = 'bd-mid'): string {
  return `<g class="${cls}"><rect x="${f(x - w / 2)}" y="${f(base - h)}" width="${f(w)}" height="${f(h)}"/><rect x="${f(x - w / 2 - 1.5)}" y="${f(base - h - 2)}" width="${f(w + 3)}" height="2.4"/></g>
    <rect class="bd-window" style="--d:${f(i * 0.9)}s" x="${f(x - 2)}" y="${f(base - h * 0.6)}" width="3" height="4"/>`;
}

// ── 1. 수산 궁, 왕의 식탁 (2:1) ─────────────────
function banquetArt(): string {
  const r = rng(201);
  const fruit = Array.from({ length: 6 }, (_, i) => `<circle cx="${f(236 + (i % 3) * 5 + r())}" cy="${f(200 - Math.floor(i / 3) * 4)}" r="2.6"/>`).join('');
  return `<g class="nh nh--banquet">
    <rect class="nh-wallpaper" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    ${tileBand(118, 22, 31)}
    ${tileBand(40, 12, 32)}
    <!-- 뒤쪽 아치 문: 밝은 안뜰 빛 -->
    <path class="nh-archdoor" d="M170 236 L170 150 Q200 120 230 150 L230 236 Z"/>
    <path class="nh-archlight" d="M178 236 L178 154 Q200 132 222 154 L222 236 Z"/>
    ${drape(26, 41)}
    ${column(108, 238, 58, 1.0)}${column(292, 238, 58, 1.0)}
    ${column(-60, 238, 50, 1.2)}${column(460, 238, 50, 1.2)}
    ${lampstand(150, 204, 34, 0)}${lampstand(250, 204, 34, 1)}
    <!-- 낮은 상: 사자 발, 늘어진 상보 -->
    <g class="nh-table">
      <rect x="140" y="204" width="120" height="5" rx="1"/>
      <path class="nh-cloth" d="M140 208 L260 208 L257 222 Q230 226 200 222 Q170 226 143 222 Z"/>
      <path d="M146 222 L148 236 L144 240 L154 240 L152 222 Z M248 222 L246 236 L242 240 L254 240 L252 222 Z"/>
    </g>
    <!-- 금 뿔잔(리톤): 끝이 짐승 앞몸 -->
    <g class="nh-gold">
      <path d="M178 204 C176 199 175 194 175 189 L182 189 C182 194 181 197 180 199 C182 200 184 202 186 202 L187 204 Z"/>
      <ellipse cx="178.5" cy="189" rx="3.6" ry="1"/>
      <!-- 잔 둘 -->
      <path d="M202 204 L200 196 L212 196 L210 204 Z"/><ellipse cx="206" cy="196" rx="6" ry="1.3"/>
      <path d="M218 204 L217 198 L225 198 L224 204 Z"/>
    </g>
    <circle class="bd-halo nh-cuphalo" cx="206" cy="196" r="22"/>
    <g class="nh-fruit">${fruit}</g>
    <!-- 포도주 항아리 받침 -->
    <g class="nh-jar"><path d="M300 236 L304 222 L316 222 L320 236 Z"/><path d="M304 222 C298 214 298 198 304 190 L306 184 L314 184 L316 190 C322 198 322 214 316 222 Z"/><rect x="305" y="181" width="10" height="3"/></g>
    <rect class="nh-floor" x="${-W * 2}" y="238" width="${W * 5}" height="${H - 238}"/>
    <path class="nh-floorline" d="M${-W * 2} 246 H${W * 3} M${-W * 2} 255 H${W * 3}"/>
  </g>`;
}

// ── 2. 겨울 궁의 밤 창 (1:4) ────────────────────
function nightWindowArt(): string {
  const r = rng(202);
  const wstars = Array.from({ length: 22 }, () => `<circle style="--d:${f(r() * 5)}s" cx="${f(150 + r() * 100)}" cy="${f(72 + r() * 70)}" r="${f(0.4 + r() * 0.7)}"/>`).join('');
  return `<g class="nh nh--window">
    <rect class="nh-wallpaper" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <!-- 창 안: 밤하늘, 달, 먼 언덕 -->
    <path class="nh-winsky" d="M146 196 L146 96 Q200 46 254 96 L254 196 Z"/>
    <g class="js-stars">${wstars}</g>
    <path class="nh-moon" d="M228 86 a11 11 0 1 0 6 18 a9 9 0 1 1 -6 -18 Z"/>
    <circle class="nh-moonhalo" cx="226" cy="96" r="24"/>
    <path class="nh-winhill" d="M146 196 L146 170 Q170 160 196 166 Q222 158 254 168 L254 196 Z"/>
    <path class="nh-winhill nh-winhill--far" d="M146 172 Q180 150 210 160 Q234 150 254 156 L254 170 Q222 160 196 166 Q170 160 146 170 Z"/>
    <path class="nh-mullion" d="M200 66 L200 196 M146 140 L254 140"/>
    <!-- 창틀 -->
    <path class="nh-frame" d="M140 200 L140 96 Q200 38 260 96 L260 200 L254 200 L254 96 Q200 46 146 96 L146 200 Z"/>
    ${tileBand(200, 14, 33)}
    <rect class="nh-sill" x="132" y="196" width="136" height="6"/>
    <!-- 창턱의 등잔 -->
    <g class="nh-oillamp"><path d="M232 196 C232 191 246 190 248 194 L252 192 L250 196 Z"/></g>
    <ellipse class="nh-flame" style="--d:0.4s" cx="251" cy="189" rx="1.8" ry="3.4"/>
    <circle class="bd-halo nh-lamphalo" cx="251" cy="189" r="30"/>
    <!-- 휘장 -->
    <path class="nh-curtain" d="M92 0 L136 0 C130 60 124 120 132 236 L96 236 C104 160 100 80 92 0 Z"/>
    <path class="nh-curtain" d="M308 0 L264 0 C270 60 276 120 268 236 L304 236 C296 160 300 80 308 0 Z"/>
    <path class="nh-curtainfold" d="M112 0 C110 80 112 160 114 236 M288 0 C290 80 288 160 286 236"/>
    ${column(30, 238, 46, 1.1)}${column(370, 238, 46, 1.1)}
    <!-- 낮은 걸상 -->
    <g class="nh-bench"><rect x="70" y="222" width="70" height="6" rx="2"/><rect x="74" y="228" width="4" height="10"/><rect x="132" y="228" width="4" height="10"/><path class="nh-cushion" d="M74 222 Q105 214 136 222 Z"/></g>
    <rect class="nh-floor" x="${-W * 2}" y="238" width="${W * 5}" height="${H - 238}"/>
    <path class="nh-moonlight" d="M146 200 L254 200 L300 ${H} L110 ${H} Z"/>
  </g>`;
}

// ── 3. 무너진 성벽 (1:3, 2:13-15) ───────────────
/** night-survey가 따라가는 골짜기 길 (배경 좌표). 골짜기 문(118) → 돌무더기(284) */
export const SURVEY_PATH: [number, number][] = [[112, 214], [140, 210], [168, 214], [196, 208], [222, 212], [248, 207], [272, 211], [284, 209]];

function ruinArt(): string {
  return `<g class="nh nh--ruin">
    <g class="nh-nightonly">${stars(46, 120, 2031)}<path class="nh-moon" d="M306 38 a13 13 0 1 0 8 22 a11 11 0 1 1 -8 -22 Z"/><circle class="nh-moonhalo" cx="304" cy="50" r="34"/></g>
    ${ridge([[-W * 2, 120], [-60, 112], [90, 118], [230, 108], [380, 116], [W * 3, 110]], 'bd-far')}
    <!-- 언덕 위 성 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 170 C-40 166 60 160 120 158 C200 156 280 160 360 158 C460 156 600 164 ${W * 3} 168 L${W * 3} ${H} Z"/>
    ${cityWall(132, 162, { broken: true, gaps: [[150, 176], [228, 252], [330, 348]], seed: 23, cls: 'bd-mid nh-ruinwall' })}
    ${rubble(163, 162, 1.1, 51)}${rubble(240, 163, 1.2, 52)}${rubble(339, 162, 0.9, 53)}
    <!-- 불탄 골짜기 문: 검은 기둥 둘, 쓰러진 들보 -->
    <g class="nh-charred"><rect x="104" y="128" width="7" height="36"/><rect x="126" y="134" width="6" height="30"/><rect x="96" y="152" width="44" height="5" transform="rotate(-18 118 154)"/></g>
    <path class="nh-charline" d="M106 132 L108 160 M128 138 L129 160"/>
    ${smoke(240, 140, 2032, 3)}
    <!-- 골짜기 길과 시내 -->
    <path class="bd-near nh-valley" d="M${-W * 2} ${H} L${-W * 2} 196 C-20 200 80 220 140 214 C200 208 260 214 320 208 C420 200 600 206 ${W * 3} 200 L${W * 3} ${H} Z"/>
    <path class="nh-road" d="M60 222 C100 214 140 212 168 216 C200 210 240 212 272 213 C300 210 330 214 380 210"/>
    <!-- 길을 막은 돌무더기 (2:14 "탄 짐승이 지나갈 곳이 없는지라") -->
    ${rubble(300, 220, 1.5, 54, 'nh-rubble nh-rubble--near')}
    <!-- 왕의 못 -->
    <ellipse class="nh-pool" cx="336" cy="228" rx="22" ry="4"/>
    <path class="nh-poolglint" d="M322 227 h10 M340 229 h8"/>
    ${ground(250)}
  </g>`;
}

// ── 4. 성벽 공사장 (3–4) ────────────────────────
function wallWorkArt(): string {
  // 왼쪽은 높고 오른쪽으로 계단처럼 낮아지는 벽
  const steps: [number, number, number][] = [[-W * 2, 150, 112], [150, 196, 124], [196, 244, 138], [244, 290, 150], [290, W * 3, 160]];
  const wall = steps.map(([a, b, top]) => {
    const teeth = top < 120 ? Array.from({ length: Math.ceil((b - a) / 9) }, (_, i) => `<rect x="${a + i * 9}" y="${top - 4}" width="5" height="4.4"/>`).join('') : '';
    return `<rect x="${a}" y="${top}" width="${b - a}" height="${200 - top}"/>${teeth}`;
  }).join('');
  const scaffold = `<g class="nh-scaffold">
    ${[158, 192, 228, 262, 296, 330].map((x) => `<path d="M${x} 200 L${x} 104"/>`).join('')}
    ${[178, 154, 130].map((y) => `<path d="M152 ${y} L336 ${y}"/>`).join('')}
    <path d="M158 178 L192 154 M192 178 L228 154 M262 178 L296 154 M296 154 L330 130"/>
    <path class="nh-rope" d="M312 104 L312 150"/><rect class="nh-hoist" x="307" y="150" width="10" height="7"/>
    <path d="M300 104 L326 104"/>
  </g>
  <g class="nh-ladder"><path d="M124 200 L140 112 M134 200 L150 112"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${f(126 + i * 2.2)} ${200 - i * 12.5} h10"/>`).join('')}</g>`;
  return `<g class="nh nh--work">
    ${ridge([[-W * 2, 132], [-60, 124], [100, 130], [260, 120], [420, 128], [W * 3, 124]], 'bd-far')}
    <g class="bd-mid nh-newwall">${wall}</g>
    <path class="nh-courses" d="M${-W * 2} 140 H150 M${-W * 2} 168 H290 M150 150 H196 M196 160 H244 M244 172 H${W * 3} M${-W * 2} 188 H${W * 3}"/>
    <!-- 새 들보를 단 성문 -->
    <g class="nh-gateframe"><rect x="40" y="132" width="44" height="68"/><rect class="nh-gatedark" x="48" y="146" width="28" height="54"/><rect class="nh-beam" x="34" y="128" width="56" height="6"/></g>
    ${scaffold}
    ${folk(30, 112, 110, 112, 5, 3.2, 2041, 'js-folk nh-workers')}
    ${folk(204, 138, 236, 138, 3, 3.2, 2042, 'js-folk nh-workers')}
    ${folk(300, 160, 360, 160, 4, 3.2, 2043, 'js-folk nh-workers')}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 204 C-40 200 120 206 200 202 C300 198 500 204 ${W * 3} 200 L${W * 3} ${H} Z"/>
    ${blocks(176, 222, 1.1)}${blocks(268, 218, 0.9)}
    ${dirtHeap(116, 236, 34, 22)}${dirtHeap(318, 238, 40, 26)}${dirtHeap(-10, 236, 40, 24)}${dirtHeap(430, 236, 40, 24)}
    ${basket(150, 238, 1.1)}${basket(246, 236, 1)}${basket(358, 240, 1.1)}
    ${rubble(210, 244, 1, 2044)}
    ${ground(250)}
  </g>`;
}

// ── 5. 완성된 성벽 (6:15) ───────────────────────
function wallDoneArt(): string {
  return `<g class="nh nh--done">
    ${ridge([[-W * 2, 128], [-60, 120], [100, 126], [260, 116], [420, 124], [W * 3, 120]], 'bd-far')}
    ${cityWall(116, 204, { towers: [60, 166, 234, 340, -120, 520], cls: 'bd-mid nh-newwall', seed: 61 })}
    <!-- 성문: 아치와 새 문짝, 빗장 -->
    <path class="nh-gatedark" d="M176 204 L176 150 Q200 128 224 150 L224 204 Z"/>
    <g class="nh-doors"><rect x="178" y="152" width="21" height="52"/><rect x="201" y="152" width="21" height="52"/>
      <path class="nh-doorband" d="M178 164 H222 M178 186 H222"/><rect class="nh-bar" x="174" y="174" width="52" height="3.4"/></g>
    <path class="nh-archstone" d="M172 150 Q200 122 228 150"/>
    ${folk(140, 116, 150, 116, 2, 3, 2051, 'js-folk nh-workers')}${folk(250, 116, 258, 116, 2, 3, 2052, 'js-folk nh-workers')}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 206 C-40 202 120 208 200 204 C300 200 500 206 ${W * 3} 202 L${W * 3} ${H} Z"/>
    <path class="nh-road" d="M200 206 C196 220 186 236 170 ${H}"/>
    ${ground(252)}
  </g>`;
}

// ── 6. 수문 앞 광장 (8:1-8) ─────────────────────
/** 강단 위 낭독대 자리 (배경 좌표) — torah-read의 출발점 */
export const PULPIT_XY: [number, number] = [200, 150];

function waterGateArt(): string {
  const r = rng(206);
  const heads = Array.from({ length: 70 }, (_, i) => {
    const row = i % 3;
    const x = -W * 0.6 + (i / 70) * W * 2.2 + (r() - 0.5) * 6;
    const y = 236 + row * 6 + r() * 2;
    const s = 1 + row * 0.25;
    return `<g style="--d:${f(r() * 4)}s"><circle cx="${f(x)}" cy="${f(y - 5 * s)}" r="${f(3 * s)}"/><path d="M${f(x - 5 * s)} ${f(y + 4 * s)} Q${f(x)} ${f(y - 4 * s)} ${f(x + 5 * s)} ${f(y + 4 * s)} Z"/></g>`;
  }).join('');
  const side = (x0: number, n: number, dir: number) => Array.from({ length: n }, (_, i) => {
    const x = x0 + dir * i * 6.4;
    return `<rect x="${f(x - 1.6)}" y="${f(150 - 12 - (i % 2))}" width="3.2" height="${f(12 + (i % 2))}" rx="1.6"/><circle cx="${f(x)}" cy="${f(150 - 14.2 - (i % 2))}" r="2"/>`;
  }).join('');
  return `<g class="nh nh--square">
    <g class="nh-sunrise"><circle class="nh-sun" cx="320" cy="92" r="16"/><circle class="nh-sunhalo" cx="320" cy="92" r="70"/></g>
    ${ridge([[-W * 2, 120], [-60, 114], [100, 120], [260, 108], [420, 116], [W * 3, 112]], 'bd-far')}
    <!-- 동쪽 성벽과 수문 -->
    ${cityWall(108, 190, { towers: [282, 358, -60], cls: 'bd-mid nh-newwall', seed: 62 })}
    <path class="nh-gatedark nh-watergate" d="M300 190 L300 142 Q320 124 340 142 L340 190 Z"/>
    <path class="nh-archstone" d="M296 142 Q320 118 344 142"/>
    <!-- 왼쪽 집들 -->
    ${house(20, 192, 34, 46, 0)}${house(62, 192, 30, 36, 1)}${house(102, 192, 28, 52, 2)}${house(-30, 192, 40, 40, 3)}
    <path class="bd-near nh-plaza" d="M${-W * 2} ${H} L${-W * 2} 192 L${W * 3} 192 L${W * 3} ${H} Z"/>
    <path class="nh-plazaline" d="M${-W * 2} 204 H${W * 3} M${-W * 2} 220 H${W * 3}"/>
    <!-- 높은 나무 강단 (8:4) -->
    <g class="nh-pulpit">
      <rect x="140" y="150" width="120" height="6"/>
      <path d="M146 156 L146 214 M254 156 L254 214 M176 156 L176 214 M224 156 L224 214"/>
      <path d="M146 176 L254 176 M146 196 L176 214 M254 196 L224 214"/>
      <path d="M128 214 L140 156 M120 214 L134 156"/>
      ${[0, 1, 2, 3, 4].map((i) => `<path d="M${f(122 + i * 2.6)} ${214 - i * 11.6} h10"/>`).join('')}
      <path class="nh-rail" d="M140 150 V138 H170 M230 138 H260 V150"/>
    </g>
    <g class="nh-pulpitfolk">${side(174, 6, -1)}${side(226, 7, 1)}</g>
    <!-- 낭독대와 펼친 두루마리 -->
    <g class="nh-lectern"><path d="M192 150 L194 136 L206 136 L208 150 Z"/><path class="nh-openscroll" d="M186 134 L214 134 L212 128 L188 128 Z"/><rect class="nh-roll" x="184" y="126" width="3.4" height="9" rx="1.6"/><rect class="nh-roll" x="212.6" y="126" width="3.4" height="9" rx="1.6"/></g>
    <circle class="bd-halo nh-scrollhalo" cx="200" cy="130" r="30"/>
    <g class="nh-heads">${heads}</g>
  </g>`;
}

// ── 7. 초막 (8:15-17) ───────────────────────────
function boothsArt(): string {
  return `<g class="nh nh--booths">
    ${stars(30, 90, 2071)}
    ${ridge([[-W * 2, 116], [-60, 110], [100, 116], [260, 104], [420, 112], [W * 3, 108]], 'bd-far')}
    ${cityWall(104, 150, { towers: [40, 230, 380], cls: 'bd-far', seed: 71 })}
    <!-- 지붕 높이가 다른 집들과 지붕 위 초막 -->
    ${house(30, 200, 56, 60, 0)}${booth(30, 140, 30, 16, 1)}
    ${house(96, 200, 50, 44, 1)}${booth(100, 156, 26, 14, 2)}
    ${house(158, 200, 48, 70, 2)}${booth(160, 130, 28, 15, 3)}
    ${house(238, 200, 56, 52, 3)}${booth(232, 148, 32, 16, 4)}
    ${house(300, 200, 44, 64, 4)}${booth(302, 136, 26, 14, 5)}
    ${house(362, 200, 54, 48, 5)}${booth(364, 152, 30, 15, 6)}
    ${house(-40, 200, 50, 50, 6)}${booth(-40, 150, 28, 14, 7)}${house(440, 200, 50, 56, 7)}${booth(440, 144, 28, 14, 8)}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 200 L${W * 3} 200 L${W * 3} ${H} Z"/>
    <!-- 뜰 안의 큰 초막 (양옆 가까이) -->
    ${booth(70, 244, 70, 38, 9)}${booth(338, 244, 74, 40, 10)}
    <!-- 종려 가지 다발, 감람 가지 -->
    <g class="nh-bundle"><path d="M196 248 q-10 -20 -30 -26 M200 248 q-2 -24 -12 -36 M204 248 q8 -20 28 -28 M200 248 q10 -26 6 -40"/></g>
    <g class="nh-olive">${[0, 1, 2, 3, 4, 5].map((i) => `<ellipse cx="${f(212 + i * 4)}" cy="${f(238 - i * 3)}" rx="3" ry="1.2" transform="rotate(-30 ${f(212 + i * 4)} ${f(238 - i * 3)})"/>`).join('')}</g>
    ${ground(252)}
  </g>`;
}

export function nehemiahArt(art: NehemiahArt): string {
  switch (art) {
    case 'nh-susa-banquet': return banquetArt();
    case 'nh-susa-night': return nightWindowArt();
    case 'nh-ruin': return ruinArt();
    case 'nh-wall-work': return wallWorkArt();
    case 'nh-wall-done': return wallDoneArt();
    case 'nh-water-gate': return waterGateArt();
    case 'nh-booths': return boothsArt();
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

/** 무대 위 인물의 그림 상자 (scene 기준). 없으면 가운데 */
function actorBox(scene: HTMLElement, id: string | undefined) {
  const b = scene.getBoundingClientRect();
  const actors = [...scene.querySelectorAll<HTMLElement>('.scene__stage .actor')];
  const el = (id ? actors.find((a) => a.dataset.id === id) : undefined) ?? (id ? undefined : actors[0]);
  const a = el ? (el.querySelector<SVGElement>('.actor__art') ?? el).getBoundingClientRect() : null;
  if (!a || !a.width) return { x: b.width * 0.5, top: b.height * 0.4, h: b.height * 0.5, w: b.width, H: b.height, found: false };
  return { x: a.left - b.left + a.width / 2, top: a.top - b.top, h: a.height, w: b.width, H: b.height, found: true };
}

/** 지금 배경(같은 art일 때)의 그림 좌표 → scene 안의 화면 좌표. 없으면 null */
function artPoint(scene: HTMLElement, art: string, pts: [number, number][]): [number, number][] | null {
  const svg = scene.querySelector<SVGSVGElement>(`.scene__backdrop .backdrop:last-child[data-art="${art}"]`);
  const m = svg?.getScreenCTM();
  if (!svg || !m) return null;
  const b = scene.getBoundingClientRect();
  return pts.map(([x, y]) => {
    const p = new DOMPoint(x, y).matrixTransform(m);
    return [p.x - b.left, p.y - b.top];
  });
}

/** arrow-prayer: 왕의 질문과 대답 사이, 짧은 묵도 (2:4) */
export function playArrowPrayer(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const a = actorBox(scene, who ?? 'nehemiah');
  const life = rm ? 1600 : 2900;
  scene.classList.add('nh-hush');
  setTimeout(() => scene.classList.remove('nh-hush'), life - 700);
  layerOf(scene, `fx-arrow${rm ? ' is-rm' : ''}`,
    `<b class="fx-arrow__ring" style="--x:${f(a.x)}px; --y:${f(a.top + a.h * 0.06)}px"></b>
     <b class="fx-arrow__line" style="--x:${f(a.x)}px; --y:${f(a.top + a.h * 0.06)}px"></b>
     <b class="fx-arrow__spark" style="--x:${f(a.x)}px; --y:${f(a.top + a.h * 0.06)}px"></b>`,
    life, 900);
}

/** night-survey: 밤에 등불 하나가 무너진 성벽 아래 골짜기 길을 따라감 (2:12-15) */
export function playNightSurvey(scene: HTMLElement, rm: boolean): void {
  const b = scene.getBoundingClientRect();
  const pts = artPoint(scene, 'nh-ruin', SURVEY_PATH)
    ?? SURVEY_PATH.map(([x, y]) => [b.width * ((x - 100) / 200), b.height * (y / 260)] as [number, number]);
  // 갔다가(0→끝) 멈칫, 돌아옴(끝→0). 키프레임을 인라인으로 만든다
  const there = pts.map((p, i) => ({ t: (i / (pts.length - 1)) * 0.5, p }));
  const back = [...pts].reverse().map((p, i) => ({ t: 0.62 + (i / (pts.length - 1)) * 0.38, p }));
  const frames = [...there, { t: 0.56, p: pts[pts.length - 1] }, ...back];
  const name = `nh-survey-${Date.now() % 100000}`;
  const css = `@keyframes ${name} {${frames.map(({ t, p }) => `${(t * 100).toFixed(1)}% { translate: ${f(p[0])}px ${f(p[1])}px; }`).join(' ')}}`;
  const rider = `<svg viewBox="-14 -26 28 28" aria-hidden="true"><path d="M-10 0 L-9 -7 C-9 -10 -6 -11 -2 -11 L6 -11 C8 -13 9 -16 11 -16 L12 -13 L9 -10 L9 -7 L10 0 L8 0 L7 -6 L-6 -6 L-7 0 Z"/><path d="M-1 -11 C-2 -14 -2 -18 0 -20 C-1 -22 1 -25 3 -24 C5 -23 5 -20 3 -19 C5 -16 4 -13 3 -11 Z"/><path class="fx-survey__staff" d="M4 -16 L9 -22"/></svg>`;
  const layer = layerOf(scene, `fx-survey${rm ? ' is-rm' : ''}`,
    `<style>${css}</style>
     <div class="fx-survey__go" style="animation-name:${name}">
       <b class="fx-survey__pool"></b>
       <i class="fx-survey__rider">${rider}</i>
       <b class="fx-survey__lamp"></b>
     </div>`,
    rm ? 3000 : 10500, 1600);
  // 돌무더기 앞에서 멈칫하는 순간에 등불이 흔들림
  if (!rm) setTimeout(() => layer.classList.add('is-halt'), 4900);
  if (!rm) setTimeout(() => layer.classList.remove('is-halt'), 6400);
}

/** trowel-sword: 한 손으로 일을 하며 한 손에는 병기를 잡았는데 (4:17) */
export function playTrowelSword(scene: HTMLElement, rm: boolean): void {
  const r = rng(417);
  const n = 7;
  const workers = Array.from({ length: n }, (_, i) => {
    const x = 18 + i * (164 / (n - 1)) + (r() - 0.5) * 6;
    const carry = i % 3 === 1 ? 'stone' : 'basket';
    // 오른쪽을 보는 일꾼: 뒤 손에 창(세움), 앞 손에 광주리/돌
    const load = carry === 'basket'
      ? `<path class="fx-tw__load" d="M7 -27 L8.5 -21 L15.5 -21 L17 -27 Z"/>`
      : `<rect class="fx-tw__load" x="8" y="-27" width="8" height="5" rx="0.8"/>`;
    return `<g class="fx-tw__man" style="--i:${i}; --d:${f(r() * 1.6)}s" transform="translate(${f(x)} 60)">
      <path class="fx-tw__spear" d="M-5 4 L-5 -44"/><path class="fx-tw__tip" d="M-6.6 -44 L-5 -50 L-3.4 -44 Z"/>
      <g class="fx-tw__body">
        <circle cx="0" cy="-30" r="3.6"/>
        <path d="M-4 -25 C-6 -18 -6 -8 -5 0 L-1 0 L0 -8 L1 0 L5 0 C6 -8 5 -18 4 -25 Z"/>
        <path d="M-3 -24 L-6 -14 L-5 -13 M3 -24 L9 -22 L10 -23"/>
        <g class="fx-tw__arm">${load}<path d="M3 -24 L10 -24" class="fx-tw__forearm"/></g>
      </g>
    </g>`;
  }).join('');
  const courses = Array.from({ length: 30 }, (_, i) => `<rect x="${i * 7}" y="${60 + (i % 2) * 0}" width="6.4" height="5" rx="0.4"/>`).join('');
  layerOf(scene, `fx-tw${rm ? ' is-rm' : ''}`,
    `<div class="fx-tw__stage"><svg viewBox="0 -54 200 90" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       <g class="fx-tw__wall"><rect x="-200" y="60" width="600" height="30"/><g class="fx-tw__stones">${courses}</g></g>
       ${workers}
     </svg></div>`,
    rm ? 3600 : 10500, 1800);
}

/** rally-horn: 나팔 소리를 듣거든 그리로 모여서 (4:18-20) */
export function playRallyHorn(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const a = actorBox(scene, who ?? 'nehemiah');
  const b = scene.getBoundingClientRect();
  // 사람 곁(앞쪽, 머리 높이)에 나팔
  const side = a.x < b.width / 2 ? 1 : -1;
  const hx = Math.min(b.width - 30, Math.max(30, a.x + side * Math.min(70, b.width * 0.16)));
  const hy = a.found ? a.top + a.h * 0.14 : b.height * 0.32;
  const r = rng(418);
  const gy = b.height * 0.66;
  const runners = rm ? '' : Array.from({ length: 12 }, (_, i) => {
    const from = i % 2 ? -1 : 1;
    const sx = from < 0 ? -20 - r() * 40 : b.width + 20 + r() * 40;
    const ex = hx + (r() - 0.5) * 70;
    return `<i style="--sx:${f(sx)}px; --ex:${f(ex)}px; --y:${f(gy + (r() - 0.5) * 16)}px; --d:${f(0.6 + r() * 1.4)}s; --s:${f(0.8 + r() * 0.4)}; --flip:${from < 0 ? 1 : -1}"></i>`;
  }).join('');
  const horn = `<svg viewBox="0 0 60 30" aria-hidden="true"><path d="M2 20 C10 22 22 20 34 14 C42 10 48 4 52 2 C56 6 58 12 56 18 C50 18 44 20 36 24 C24 30 12 30 2 26 Z"/><path class="fx-horn__ridge" d="M14 22 L17 27 M24 18 L27 24 M34 14 L37 20"/></svg>`;
  layerOf(scene, `fx-horn${rm ? ' is-rm' : ''}`,
    `<div class="fx-horn__at" style="--x:${f(hx)}px; --y:${f(hy)}px; --flip:${side}">
       <i class="fx-horn__shape">${horn}</i>
       ${[0, 1, 2, 3].map((i) => `<b class="fx-horn__ring" style="--i:${i}"></b>`).join('')}
       <em class="fx-horn__word">뚜우—</em>
     </div>
     <div class="fx-horn__runners">${runners}</div>`,
    rm ? 3000 : 6600, 1600);
}

const TORAH: [string, string][] = [
  ['בַּסֻּכֹּת תֵּשְׁבוּ', '초막에 거할찌니라'],
  ['שְׁמַע יִשְׂרָאֵל', '이스라엘아 들으라'],
  ['אָנֹכִי יְהוָה', '나는 여호와로라'],
  ['בְּרֵאשִׁית', '태초에'],
  ['וְאָהַבְתָּ', '사랑하라'],
  ['תּוֹרַת מֹשֶׁה', '모세의 율법'],
];

/** torah-read: 율법책을 낭독하고 그 뜻을 해석하여 (8:8) */
export function playTorahRead(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const b = scene.getBoundingClientRect();
  const at = artPoint(scene, 'nh-water-gate', [PULPIT_XY]);
  let ox: number, oy: number;
  if (at) [[ox, oy]] = at;
  else {
    const a = actorBox(scene, who ?? 'ezra');
    ox = a.found ? a.x : b.width / 2;
    oy = a.found ? a.top + a.h * 0.3 : b.height * 0.3;
  }
  const r = rng(808);
  const ribbons = TORAH.map(([he, ko], i) => {
    const tx = b.width * (0.12 + ((i * 0.37) % 1) * 0.76);
    const ty = b.height * (0.5 + (i % 3) * 0.06);
    return `<p class="fx-torah__line" style="--i:${i}; --tx:${f(tx - ox)}px; --ty:${f(ty - oy)}px"><span class="he">${he}</span><span class="ko">${ko}</span></p>`;
  }).join('');
  const heads = Array.from({ length: rm ? 8 : 26 }, (_, i) => `<i style="--x:${f(4 + r() * 92)}%; --y:${f(72 + r() * 20)}%; --d:${f(1.8 + (i / 26) * 4.6 + r() * 0.4)}s"></i>`).join('');
  layerOf(scene, `fx-torah${rm ? ' is-rm' : ''}`,
    `<div class="fx-torah__src" style="--x:${f(ox)}px; --y:${f(oy)}px">
       <b class="fx-torah__glow"></b>
       <div class="fx-torah__scroll"><i class="fx-torah__rod"></i><span class="fx-torah__sheet"></span><i class="fx-torah__rod"></i></div>
       ${ribbons}
     </div>
     <div class="fx-torah__heads">${heads}</div>`,
    rm ? 3600 : 10000, 2000);
}
