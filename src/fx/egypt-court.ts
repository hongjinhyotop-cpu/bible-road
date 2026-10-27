// 요셉의 애굽 — 보디발의 집, 왕의 옥, 바로의 꿈, 바로의 궁, 버금 수레, 곳간 (창 39·41, A급 gen-39-potiphar · gen-41-pharaoh).
// 같은 종이 오려낸 그림자극 말투. 폰(세로 화면)에서는 x 100~300만 보인다 → 중요한 것은 그 안에.
//  - potiphar        : 보디발의 집 안 (39:2-6). 연꽃 기둥, 연꽃 띠 벽화, 가운데 넓은 문 너머 해 드는 뜰(네모난 못·무화과나무·야자), 왼쪽 안채 휘장 문, 높은 창살 창, 곡식·기름 항아리
//  - potiphar-cloak  : 같은 방, 바닥 가운데 버려진 옷 한 벌 (39:12-16 "그 옷을 곁에 두고")
//  - round-prison    : 왕의 죄수를 가두는 옥 (39:20). 둥근 돌벽, 아주 높은 창 하나에서 내려오는 빛기둥(천천히 옮겨 감), 벽의 열쇠 꾸러미, 물 항아리, 짚
//  - dream-cows      : 바로의 꿈 1 (41:2). 안개 낀 나일, 아름답고 살진 일곱 암소가 물에서 하나씩 올라와 갈밭에 선다
//  - dream-cows-lean : 꿈 1 뒤 (41:3-4). 흉하고 파리한 일곱 암소가 뒤따라 올라오고, 살진 소들이 하나씩 어둠에 삼켜진다
//  - dream-ears      : 꿈 2 (41:5). 한 줄기에서 무성하고 충실한 일곱 이삭이 금빛으로 자라 오른다
//  - dream-ears-thin : 꿈 2 뒤 (41:6-7). 동풍에 마른 가는 일곱 이삭이 나고, 찬 이삭들이 시들어 꺼진다
//  - pharaoh-court   : 바로의 궁 (41:14-45). 파피루스 기둥, 날개 달린 해 원반, 계단 단 위의 사자 다리 보좌, 깃털 부채
//  - chariot         : 버금 수레 (41:43 "엎드리라"). 먼 탑문과 오벨리스크, 길가의 사람들, 두 말이 끄는 수레가 지나가면 그 앞의 사람들이 차례로 엎드린다
//  - granary         : 일곱 해 풍년 (41:48-49). 성 곁에 늘어선 둥근 곳간들, 사다리로 오르내리는 일꾼, "바다 모래 같이" 쌓인 곡식 더미가 자라고 반짝임
//  - granary-famine  : 흉년 (41:54-57). 갈라진 땅, 마른 야자, 열린 곳간 문의 불빛, 자루와 나귀를 끌고 줄 선 사람들
// 효과 signet: 바로가 끼워 준 인장 반지(손)와 목에 건 금사슬(목)에서 금빛이 반짝인다 (41:42).
import { W, H, rng, palm, hills } from './backdrop';
import { papyrus as column, glyphBand, brazierStand, linen } from './hall';
import { papyrus as reedClump } from './nile';

const FLOOR = 238;

// ── 공통 ──────────────────────────────────────

/** 연꽃 띠: 핀 꽃과 봉오리가 번갈아 드는 벽화 줄 */
function lotusFrieze(x0: number, x1: number, y: number, h: number): string {
  const out: string[] = [];
  for (let x = x0, i = 0; x < x1; x += h * 1.1, i++) {
    if (i % 2) out.push(`<path d="M${x} ${y + h} L${x - h * 0.08} ${y + h * 0.45} C${x - h * 0.2} ${y + h * 0.3} ${x - h * 0.14} ${y + h * 0.05} ${x} ${y} C${x + h * 0.14} ${y + h * 0.05} ${x + h * 0.2} ${y + h * 0.3} ${x + h * 0.08} ${y + h * 0.45} Z"/>`);
    else out.push(`<path d="M${x} ${y + h} L${x - h * 0.06} ${y + h * 0.5} L${x - h * 0.42} ${y + h * 0.05} L${x - h * 0.16} ${y + h * 0.42} L${x} ${y + h * 0.02} L${x + h * 0.16} ${y + h * 0.42} L${x + h * 0.42} ${y + h * 0.05} L${x + h * 0.06} ${y + h * 0.5} Z"/>`);
  }
  return `<g class="ec-frieze">${out.join('')}</g>`;
}

/** 연꽃 봉오리 기둥: 가는 몸통을 묶은 띠, 위는 닫힌 봉오리 머리 */
function lotusColumn(x: number, top: number, bottom: number, w: number, cls: string): string {
  const neck = top + w * 1.6;
  return `<g class="${cls}">
    <rect x="${x - w * 0.75}" y="${bottom - 6}" width="${w * 1.5}" height="6" rx="1.5"/>
    <path d="M${x - w / 2} ${bottom - 6} L${x - w * 0.42} ${neck + 4} L${x + w * 0.42} ${neck + 4} L${x + w / 2} ${bottom - 6} Z"/>
    <path d="M${x - w * 0.44} ${neck + 4} C${x - w * 0.8} ${neck - w * 0.4} ${x - w * 0.6} ${top + w * 0.3} ${x} ${top} C${x + w * 0.6} ${top + w * 0.3} ${x + w * 0.8} ${neck - w * 0.4} ${x + w * 0.44} ${neck + 4} Z"/>
    <rect x="${x - w * 0.6}" y="${top - 5}" width="${w * 1.2}" height="5"/>
    <path class="jh-gild" d="${[0, 1, 2].map((i) => `M${x - w * 0.43} ${neck + 6 + i * 2.6} H${x + w * 0.43}`).join(' ')}"/>
    <path class="jh-paint" d="M${x - w * 0.25} ${neck + 14} V${bottom - 10} M${x} ${neck + 14} V${bottom - 10} M${x + w * 0.25} ${neck + 14} V${bottom - 10} M${x - w * 0.3} ${neck} Q${x - w * 0.3} ${top + w * 0.6} ${x} ${top + 2} M${x + w * 0.3} ${neck} Q${x + w * 0.3} ${top + w * 0.6} ${x} ${top + 2}"/>
  </g>`;
}

/** 흙 항아리 (밑이 뾰족한 저장 항아리를 받침에 꽂음) */
function jar(x: number, ground: number, h: number, cls: string): string {
  const w = h * 0.36;
  return `<g class="${cls}">
    <path d="M${x - w * 0.5} ${ground - h * 0.92} L${x + w * 0.5} ${ground - h * 0.92} L${x + w * 0.42} ${ground - h} L${x - w * 0.42} ${ground - h} Z"/>
    <path d="M${x - w * 0.42} ${ground - h * 0.9} C${x - w * 1.2} ${ground - h * 0.78} ${x - w * 1.1} ${ground - h * 0.3} ${x} ${ground - h * 0.06} C${x + w * 1.1} ${ground - h * 0.3} ${x + w * 1.2} ${ground - h * 0.78} ${x + w * 0.42} ${ground - h * 0.9} Z"/>
    <path d="M${x - w * 0.9} ${ground} L${x - w * 0.5} ${ground - h * 0.3} M${x + w * 0.9} ${ground} L${x + w * 0.5} ${ground - h * 0.3}" fill="none" stroke="currentColor" stroke-width="1.6"/>
  </g>`;
}

/** 실내 바닥과 벽 */
function room(): string {
  return `<rect class="bd-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${FLOOR}"/>
    <rect class="bd-floor" x="${-W * 2}" y="${FLOOR}" width="${W * 5}" height="${H - FLOOR}"/>
    <path class="bd-floor-line" d="M${-W * 2} ${FLOOR} H${W * 3}"/>`;
}

// ── 보디발의 집 ────────────────────────────────

/** 버려진 옷 한 벌: 바닥에 구겨져 놓인 세마포 (39:12, 16) */
function cloak(x: number, y: number): string {
  return `<g class="ec-cloak">
    <ellipse class="ec-cloak__glow" cx="${x}" cy="${y - 2}" rx="40" ry="9"/>
    <path class="ec-cloak__cloth" d="M${x - 26} ${y} C${x - 24} ${y - 6} ${x - 14} ${y - 9} ${x - 6} ${y - 7} C${x} ${y - 11} ${x + 10} ${y - 10} ${x + 14} ${y - 6} C${x + 20} ${y - 7} ${x + 27} ${y - 4} ${x + 28} ${y} C${x + 18} ${y + 2} ${x - 14} ${y + 2} ${x - 26} ${y} Z"/>
    <path class="ec-cloak__fold" d="M${x - 18} ${y - 2} Q${x - 8} ${y - 7} ${x + 2} ${y - 3} M${x + 4} ${y - 6} Q${x + 12} ${y - 4} ${x + 20} ${y - 2} M${x - 6} ${y - 1} Q${x + 4} ${y - 1} ${x + 10} ${y}"/>
  </g>`;
}

export function potipharArt(withCloak: boolean): string {
  const x0 = 162;
  const x1 = 238;
  const top = 96;
  const r = rng(1701);
  // 뜰: 해 드는 하늘, 낮은 뜰 담, 네모난 못(물결), 무화과나무, 야자
  const court = `
    <rect class="ec-court-sky" x="${x0}" y="${top}" width="${x1 - x0}" height="${FLOOR - top}"/>
    <g class="ec-court">
      <rect x="${x0}" y="196" width="${x1 - x0}" height="14"/>
      <path d="M${x0 + 18} 196 C${x0 + 14} 176 ${x0 + 18} 156 ${x0 + 30} 150 C${x0 + 40} 140 ${x0 + 56} 144 ${x0 + 60} 156 C${x0 + 70} 160 ${x0 + 70} 178 ${x0 + 60} 184 C${x0 + 54} 190 ${x0 + 44} 190 ${x0 + 40} 188 L${x0 + 40} 196 Z"/>
      ${palm(x1 - 12, 198, 64, 'ec-court', 1702)}
    </g>
    <rect class="ec-pool" x="${x0 + 6}" y="214" width="${x1 - x0 - 12}" height="12"/>
    <path class="ec-ripple" d="M${x0 + 12} 218 H${x0 + 30} M${x0 + 40} 221 H${x0 + 62} M${x0 + 20} 224 H${x0 + 36}"/>
    <path class="jh-spill" d="M${x0} ${FLOOR} L${x1} ${FLOOR} L${x1 + 40} ${H} L${x0 - 40} ${H} Z"/>`;
  return `<g class="ec ec--house">
    ${room()}
    <rect class="jh-band" x="${-W * 2}" y="40" width="${W * 5}" height="14"/>
    ${lotusFrieze(-W * 2, W * 3, 42, 10)}
    <rect class="jh-band" x="${-W * 2}" y="196" width="${W * 5}" height="3"/>
    ${glyphBand(-W * 2, W * 3, 182, 8, 1703)}
    <!-- 가운데 넓은 문과 뜰 -->
    <g class="ec-door">${court}
      <g class="bd-mid">
        <path d="M${x0 - 9} ${FLOOR} V${top - 4} H${x0} V${FLOOR} Z M${x1} ${FLOOR} V${top - 4} H${x1 + 9} V${FLOOR} Z"/>
        <path d="M${x0 - 15} ${top - 4} L${x1 + 15} ${top - 4} L${x1 + 11} ${top - 15} L${x0 - 11} ${top - 15} Z"/>
      </g>
      <path class="jh-gild" d="M${x0 - 12} ${top - 9} H${x1 + 12}"/>
    </g>
    <!-- 왼쪽 안채 문: 늘어진 휘장 -->
    <g class="bd-mid"><path d="M58 ${FLOOR} V128 H64 V${FLOOR} Z M96 ${FLOOR} V128 H102 V${FLOOR} Z M54 128 H106 V120 H54 Z"/></g>
    <rect class="ec-inner" x="64" y="128" width="32" height="${FLOOR - 128}"/>
    <g transform="translate(0 106)">${linen(66, 28, 80, 0.6)}</g>
    <!-- 오른쪽 높은 창살 창과 빛 -->
    <g class="bd-mid"><rect x="300" y="66" width="30" height="18"/></g>
    <path class="bd-window-frame" d="M305 68 V82 M311 68 V82 M317 68 V82 M323 68 V82" stroke-width="1.6" fill="none" stroke="currentColor"/>
    <path class="bd-shaft jh-shaft" d="M300 84 L330 84 L292 ${FLOOR} L246 ${FLOOR} Z"/>
    <!-- 항아리들 (곳간 열쇠를 맡은 총무의 집) -->
    ${jar(286, FLOOR, 30, 'bd-mid')}${jar(300, FLOOR, 26, 'bd-mid')}${jar(118, FLOOR, 24, 'bd-mid')}${jar(-30, FLOOR, 28, 'bd-mid')}${jar(452, FLOOR, 30, 'bd-mid')}
    <g class="bd-mid"><rect x="${-W * 2}" y="${FLOOR + 5}" width="${W * 5}" height="2.4"/></g>
    
    <!-- 연꽃 기둥 -->
    ${[134, 266, -110, 510].map((x) => lotusColumn(x, 30, FLOOR, 12, 'bd-mid')).join('')}
    <g class="bd-mid"><rect x="${-W * 2}" y="20" width="${W * 5}" height="10"/></g>
    <path class="jh-gild" d="M${-W * 2} 29 H${W * 3}"/>
    ${withCloak ? `<g transform="translate(200 251) scale(1.5) translate(-200 -251)">${cloak(200, 251)}</g>` : ''}
    ${[22, 378, -70, 470].map((x) => lotusColumn(x, -10, H + 2, 26, 'bd-near')).join('')}
    <circle class="ec-mote" cx="${(270 + r() * 20).toFixed(1)}" cy="150" r="0.8" style="--d:1s"/><circle class="ec-mote" cx="282" cy="120" r="0.7" style="--d:4s"/><circle class="ec-mote" cx="262" cy="190" r="0.9" style="--d:7s"/>
  </g>`;
}

// ── 왕의 죄수를 가두는 옥 ─────────────────────────

export function roundPrisonArt(): string {
  const r = rng(1711);
  // 둥근 벽: 가로 줄눈이 양 끝에서 아래로 휜다 (원통 안)
  const courses = Array.from({ length: 11 }, (_, i) => {
    const y = 14 + i * 20;
    return `M${-W * 2} ${y + 40} C-60 ${y + 18} 60 ${y} 200 ${y} C340 ${y} 460 ${y + 18} ${W * 3} ${y + 40}`;
  }).join(' ');
  const joints: string[] = [];
  for (let i = 0; i < 11; i++) {
    const y = 14 + i * 20;
    for (let x = -120 + (i % 2) * 18; x < 520; x += 36 + r() * 10) {
      const bend = ((x - 200) / 260) ** 2 * 22;
      joints.push(`M${x.toFixed(1)} ${(y + bend).toFixed(1)} L${(x + (x - 200) * 0.02).toFixed(1)} ${(y + 20 + bend).toFixed(1)}`);
    }
  }
  const straw = Array.from({ length: 46 }, () => {
    const x = -120 + r() * 640;
    const y = FLOOR + 2 + r() * 18;
    const a = (r() - 0.5) * 1.2;
    return `M${x.toFixed(1)} ${y.toFixed(1)} l${(Math.cos(a) * 8).toFixed(1)} ${(Math.sin(a) * 3).toFixed(1)}`;
  }).join(' ');
  const motes = Array.from({ length: 9 }, (_, i) => `<circle class="ec-mote" cx="${(180 + r() * 60).toFixed(1)}" cy="${(70 + r() * 150).toFixed(1)}" r="${(0.6 + r() * 0.6).toFixed(2)}" style="--d:${(i * 1.3).toFixed(1)}s"/>`).join('');
  return `<g class="ec ec--prison">
    <rect class="dt-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${FLOOR}"/>
    <path class="ec-courses" d="${courses}"/>
    <path class="dt-joints" d="${joints.join(' ')}"/>
    <!-- 아주 높은 창 하나 -->
    <rect class="ec-window" x="226" y="12" width="20" height="16"/>
    <path class="bd-window-frame" d="M231 12 V28 M236 12 V28 M241 12 V28" stroke-width="1.4" fill="none" stroke="currentColor"/>
    <g class="ec-shaftwrap"><path class="ec-shaft" d="M226 28 L246 28 L206 ${FLOOR} L150 ${FLOOR} Z"/>${motes}</g>
    <ellipse class="ec-pool-light" cx="178" cy="${FLOOR + 4}" rx="34" ry="5"/>
    <!-- 왼쪽 벽: 쇠고리와 사슬, 나무 못에 건 열쇠 꾸러미 -->
    <g class="bd-mid">
      <circle cx="72" cy="150" r="5" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M72 155 Q70 180 76 200 Q80 214 74 230" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 1.5"/>
      <rect x="114" y="112" width="12" height="3"/>
    </g>
    <g class="ec-keys">
      <circle cx="120" cy="122" r="5" fill="none" stroke-width="1.4"/>
      <path d="M117 126 L114 142 M114 142 L110 142 M114 138 L111 138 M121 127 L122 144 M122 144 L126 144 M122 140 L125 140 M124 125 L130 139 M130 139 L133 137" fill="none" stroke-width="1.3"/>
    </g>
    <!-- 오른쪽: 물 항아리와 낮은 걸상 -->
    ${jar(300, FLOOR, 26, 'bd-mid')}${jar(318, FLOOR, 20, 'bd-mid')}
    <g class="bd-mid"><rect x="-20" y="214" width="70" height="5"/><rect x="-14" y="219" width="4" height="${FLOOR - 219}"/><rect x="40" y="219" width="4" height="${FLOOR - 219}"/></g>
    <rect class="bd-floor" x="${-W * 2}" y="${FLOOR}" width="${W * 5}" height="${H - FLOOR}"/>
    <path class="ec-straw" d="${straw}"/>
    <!-- 앞쪽 굵은 돌기둥 (넓은 화면 양옆) -->
    <g class="bd-near"><path d="M-40 ${H} L-40 0 L40 0 C30 60 34 140 30 ${H} Z M440 ${H} L440 0 L360 0 C370 60 366 140 370 ${H} Z"/></g>
  </g>`;
}

// ── 바로의 꿈 ─────────────────────────────────

/** 나일 소 (오른쪽을 봄, 원점 = 발 가운데). 살진 소 = 둥근 배, 파리한 소 = 등뼈·엉덩이뼈가 솟고 갈비가 보임 */
function cow(lean: boolean): string {
  if (!lean) {
    return `<path d="M-19 -15 C-20 -22 -14 -26 -6 -26 L9 -26 C14 -26 17 -24 19 -21 L25 -14 C27 -12 28 -8 26.5 -6 C25 -4.5 22.6 -5 21.6 -7 L16.8 -13 C15.6 -11 13.6 -10 12 -10 C10 -6.6 8 -5.6 5.6 -6 C0 -3.6 -8 -3.6 -13 -6 C-16.6 -7.6 -19 -11 -19 -15 Z"/>
      <path d="M-15.6 -8 L-15 0 L-12.6 0 L-12.4 -7 Z M-11 -6 L-10 0 L-7.6 0 L-8 -6 Z M4 -7 L4.6 0 L7 0 L7 -7 Z M8.6 -8 L10 0 L12.4 0 L11.6 -8 Z"/>
      <path d="M-18.6 -21 C-21.6 -16 -22 -10 -21 -5" fill="none" stroke="currentColor" stroke-width="0.9"/><circle cx="-21" cy="-4.4" r="1.2"/>
      <path d="M20 -19 C17.6 -25 20 -30 25 -30 M21 -19 C24 -24 29 -25 31 -22" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M18 -18 L14.6 -20 L17.6 -21 Z"/>`;
  }
  return `<path d="M-19 -18 C-20 -23 -17 -27 -13 -28 L-10 -25 C-4 -26 4 -27 9 -27 C14 -27 17 -25 19 -22 L26 -10 C28 -7.6 28 -4 26 -3 C24.4 -2.4 22.6 -3.6 22 -5.6 L16.6 -14 C15 -13 13.6 -12.4 12 -12.6 C8 -11.6 2 -12.4 -2 -13.6 C-8 -14.4 -13 -13 -16 -12.6 C-18 -13 -19 -15 -19 -18 Z"/>
    <path d="M-16.4 -13 L-15.6 0 L-14 0 L-14.4 -13 Z M-12.4 -13 L-11.2 0 L-9.6 0 L-10.4 -13 Z M6 -12 L6.4 0 L8 0 L8 -12 Z M9.6 -12 L11 0 L12.6 0 L11.6 -12 Z"/>
    <path d="M-18.4 -24 C-22 -18 -22.6 -12 -21.6 -6" fill="none" stroke="currentColor" stroke-width="0.7"/>
    <path d="M20 -21 C17 -27 19.4 -32 24.4 -32 M21 -21 C24.4 -26 28.4 -27 30.4 -24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
    <path class="dc-ribs" d="M-6 -24.4 Q-7 -19 -6 -14.6 M-2 -25 Q-3 -19.6 -2 -14 M2 -25.6 Q1 -20 2 -13.6 M6 -26 Q5 -20.6 6 -13.4 M-13 -27.4 L-14.6 -23 M-10 -25.4 L-12.4 -20"/>`;
}

function dreamBase(seed: number, river: boolean): string {
  const r = rng(seed);
  const mist = Array.from({ length: 5 }, (_, i) => `<ellipse class="dc-mist" style="--d:${(i * 2.4).toFixed(1)}s" cx="${(-40 + r() * 480).toFixed(1)}" cy="${(150 + i * 18).toFixed(1)}" rx="${(110 + r() * 80).toFixed(1)}" ry="${(7 + r() * 5).toFixed(1)}"/>`).join('');
  return `
    <circle class="dc-halo" cx="200" cy="170" r="150"/>
    <path class="dc-far" d="M-800 ${river ? 184 : 210} C-400 180 -100 188 200 ${river ? 182 : 206} C500 178 800 186 1200 ${river ? 182 : 206} L1200 260 L-800 260 Z"/>
    ${river ? `<rect class="dc-river" x="${-W * 2}" y="186" width="${W * 5}" height="20"/>
    <path class="dc-shine" d="M-60 190 H20 M60 194 H160 M210 189 H260 M300 196 H420 M120 200 H190"/>` : ''}
    <path class="dc-bank" d="M-800 260 L-800 ${river ? 206 : 232} C-400 202 -100 210 200 ${river ? 205 : 230} C500 200 800 208 1200 ${river ? 205 : 230} L1200 260 Z"/>
    <g class="dc-mists">${mist}</g>`;
}

export function dreamCowsArt(lean: boolean): string {
  // 살진 소 일곱: 가운데 폭(110~290)에 두 줄로 엇갈려 선다
  // 뒷줄 넷(강가, 작게) + 앞줄 셋(크게). 폰 화면(110~290) 안에 일곱이 다 보이게
  const spots = [
    { x: 118, y: 208, s: 0.92 }, { x: 166, y: 207, s: 0.92 }, { x: 214, y: 208, s: 0.92 }, { x: 262, y: 207, s: 0.92 },
    { x: 140, y: 226, s: 1.22 }, { x: 200, y: 227, s: 1.22 }, { x: 260, y: 226, s: 1.22 },
  ];
  const fat = spots.map((p, i) => ({ ...p, i }));
  const leanCows = spots.map((p, i) => ({ x: p.x + 12, y: p.y - 2, s: p.s * 0.98, i }));
  const draw = (list: typeof fat, isLean: boolean) => list.map((c) => `<g transform="translate(${c.x} ${c.y}) scale(${c.s})">
      <g class="${isLean ? 'dc-cow dc-cow--lean' : `dc-cow dc-cow--fat${lean ? ' dc-cow--eaten' : ''}`}" style="--d:${isLean ? (0.6 + c.i * 0.45).toFixed(2) : lean ? (4.4 + c.i * 0.42).toFixed(2) : (0.4 + c.i * 0.55).toFixed(2)}s">${cow(isLean)}</g>
    </g>`).join('');
  return `<g class="dc${lean ? ' dc--lean' : ''}">
    ${dreamBase(1721, true)}
    ${reedClump(-60, 210, 70, 'dc-reeds', 1722, 6)}${reedClump(40, 212, 64, 'dc-reeds', 1723)}${reedClump(360, 210, 66, 'dc-reeds', 1724)}${reedClump(470, 212, 72, 'dc-reeds', 1725, 6)}
    <g class="dc-herd">${draw(fat, false)}${lean ? draw(leanCows, true) : ''}</g>
    <path class="dc-grass" d="${Array.from({ length: 60 }, (_, i) => `M${-200 + i * 14} 250 q2 -8 ${i % 2 ? 4 : -2} -12`).join(' ')}"/>
  </g>`;
}

/** 이삭 하나 (원점 = 이삭이 줄기에 붙은 곳, 위를 향함). 찬 이삭 = 통통한 낱알이 겹겹이 + 까끄라기, 마른 이삭 = 가늘고 휜 껍질 */
function ear(full: boolean, a: number): string {
  if (full) {
    const grains = Array.from({ length: 6 }, (_, k) => `<ellipse cx="${k % 2 ? 2 : -2}" cy="${-3 - k * 3.2}" rx="2.6" ry="3.2"/>`).join('');
    const awns = Array.from({ length: 6 }, (_, k) => `M${k % 2 ? 3.4 : -3.4} ${-4 - k * 3.2} l${k % 2 ? 6 : -6} -7`).join(' ');
    return `<g transform="rotate(${a})">${grains}<path class="de-awn" d="${awns} M0 -20 l0 -9"/></g>`;
  }
  return `<g transform="rotate(${a})"><path d="M-0.8 0 C-2 -6 -2.4 -12 -0.6 -20 C0.4 -22 1.4 -20 1.2 -16 C1.2 -10 0.6 -5 0.8 0 Z"/><path class="de-awn de-awn--dry" d="M-0.6 -14 l-3 -5 M0.8 -18 l3 -6"/></g>`;
}

/** 한 줄기에 일곱 이삭 (41:5 "한 줄기에 … 일곱 이삭") */
function stalk(x: number, ground: number, h: number, full: boolean): string {
  const topY = ground - h;
  const stem = `<path class="de-stem" d="M${x} ${ground} C${x - 3} ${ground - h * 0.4} ${x + 3} ${ground - h * 0.7} ${x} ${topY}" fill="none" stroke-width="${full ? 2.2 : 1.4}"/>
    <path class="de-leaf" d="M${x} ${ground - h * 0.22} C${x - 14} ${ground - h * 0.3} ${x - 22} ${ground - h * 0.24} ${x - 30} ${ground - h * 0.14} C${x - 20} ${ground - h * 0.28} ${x - 10} ${ground - h * 0.32} ${x} ${ground - h * 0.3} Z"/>
    <path class="de-leaf" d="M${x} ${ground - h * 0.4} C${x + 12} ${ground - h * 0.5} ${x + 22} ${ground - h * 0.46} ${x + 28} ${ground - h * 0.38} C${x + 18} ${ground - h * 0.5} ${x + 8} ${ground - h * 0.54} ${x} ${ground - h * 0.5} Z"/>`;
  const ears = Array.from({ length: 7 }, (_, k) => {
    const y = topY + 6 + k * (h * 0.075);
    const side = k === 0 ? 0 : k % 2 ? -1 : 1;
    const ax = x + side * 2;
    const ang = k === 0 ? 0 : side * (full ? 32 + k * 3 : 46 + k * 4);
    return `<g class="de-ear" style="--k:${k}" transform="translate(${ax} ${y.toFixed(1)})">${ear(full, ang)}</g>`;
  }).join('');
  return `${stem}${ears}`;
}

export function dreamEarsArt(thin: boolean): string {
  const r = rng(1731);
  const wind = thin ? Array.from({ length: 9 }, (_, i) => `<path class="de-wind" style="--d:${(i * 0.7).toFixed(1)}s" d="M${(420 + r() * 80).toFixed(1)} ${(70 + r() * 140).toFixed(1)} q-40 ${(r() * 6 - 3).toFixed(1)} -120 0"/>`).join('') : '';
  return `<g class="de${thin ? ' de--thin' : ''}">
    ${dreamBase(1732, false)}
    <path class="dc-grass" d="${Array.from({ length: 60 }, (_, i) => `M${-200 + i * 14} 246 q2 -8 ${i % 2 ? 4 : -2} -12`).join(' ')}"/>
    <g class="de-full">
      <circle class="de-glow" cx="172" cy="130" r="56"/>
      <g class="de-grow">${stalk(172, 236, 132, true)}</g>
    </g>
    ${thin ? `<g class="de-thin"><g class="de-grow de-grow--thin"><g class="de-bend">${stalk(236, 236, 124, false)}</g></g></g>` : ''}
    ${wind}
  </g>`;
}

// ── 바로의 궁 ─────────────────────────────────

/** 날개 달린 해 원반 */
function wingedSun(x: number, y: number, s: number): string {
  const feathers = (dir: number) => Array.from({ length: 6 }, (_, i) => `M${x + dir * (9 + i * 6)} ${y + 1} L${x + dir * (12 + i * 6.4)} ${y + 6 + (i < 3 ? i : 5 - i) * 0.8}`).join(' ');
  return `<g class="ec-sun" transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">
    <circle class="ec-sun__glow" cx="${x}" cy="${y}" r="20"/>
    <path d="M${x - 8} ${y - 1} C${x - 22} ${y - 6} ${x - 40} ${y - 4} ${x - 48} ${y - 1} C${x - 40} ${y + 4} ${x - 22} ${y + 8} ${x - 8} ${y + 4} Z M${x + 8} ${y - 1} C${x + 22} ${y - 6} ${x + 40} ${y - 4} ${x + 48} ${y - 1} C${x + 40} ${y + 4} ${x + 22} ${y + 8} ${x + 8} ${y + 4} Z"/>
    <circle cx="${x}" cy="${y}" r="6.5"/>
    <path class="ec-sun__line" d="${feathers(-1)} ${feathers(1)}"/>
  </g>`;
}

/** 사자 다리 보좌 (오른쪽을 봄) + 계단 단 */
function throne(x: number, ground: number): string {
  return `<g class="bd-mid">
    ${[0, 1, 2].map((i) => `<rect x="${x - 54 + i * 9}" y="${ground - 7 - i * 7}" width="${108 - i * 18}" height="7"/>`).join('')}
    <g transform="translate(${x} ${ground - 21})">
      <path d="M-16 0 L-16 -6 C-16 -9 -18 -10 -18 -13 L-18 -52 C-18 -55 -15 -57 -12 -57 L-9 -57 L-9 -26 L14 -26 C17 -26 18 -24 18 -22 L18 -18 L-9 -18 L-9 -14 L14 -14 L14 -6 C16 -4 17 -2 17 0 L12 0 L11 -5 L-6 -5 L-7 0 Z"/>
      <path d="M-18 -12 L-21 0 L-15 0 Z M15 -12 L19 0 L13 0 Z"/>
    </g>
  </g>
  <path class="jh-gild" d="M${x - 54} ${ground - 7} H${x + 54} M${x - 45} ${ground - 14} H${x + 45} M${x - 36} ${ground - 21} H${x + 36}"/>
  <path class="ec-throne-gild" transform="translate(${x} ${ground - 21})" d="M-12 -54 V-28 M-9 -24 H14 M-16 -8 H14"/>`;
}

/** 긴 장대 위의 깃털 부채 */
function fan(x: number, ground: number, h: number): string {
  return `<g class="bd-mid ec-fan" style="transform-origin:${x}px ${ground - h}px">
    <rect x="${x - 1}" y="${ground - h}" width="2" height="${h}"/>
    <path d="M${x} ${ground - h + 2} C${x - 14} ${ground - h - 4} ${x - 16} ${ground - h - 22} ${x - 6} ${ground - h - 30} C${x - 2} ${ground - h - 24} ${x + 2} ${ground - h - 24} ${x + 6} ${ground - h - 30} C${x + 16} ${ground - h - 22} ${x + 14} ${ground - h - 4} ${x} ${ground - h + 2} Z"/>
  </g>
  <path class="jh-gild" d="M${x - 8} ${ground - h - 8} Q${x} ${ground - h - 20} ${x + 8} ${ground - h - 8}"/>`;
}

export function courtArt(): string {
  return `<g class="ec ec--court">
    ${room()}
    <rect class="jh-band" x="${-W * 2}" y="56" width="${W * 5}" height="12"/>
    ${glyphBand(-W * 2, W * 3, 57, 10, 1741)}
    <rect class="jh-band" x="${-W * 2}" y="160" width="${W * 5}" height="4"/>
    ${glyphBand(-W * 2, W * 3, 146, 9, 1742)}
    <!-- 보좌 뒤 벽감과 날개 달린 해 -->
    <g class="bd-mid"><path d="M150 ${FLOOR} V96 H250 V${FLOOR} Z"/></g>
    <rect class="ec-niche" x="156" y="102" width="88" height="${FLOOR - 102}"/>
    ${wingedSun(200, 84, 1)}
    ${throne(200, FLOOR)}
    ${fan(158, FLOOR - 22, 58)}${fan(242, FLOOR - 22, 58)}
    <!-- 높은 창의 빛 -->
    ${[70, 316].map((x) => `<g class="bd-mid"><rect x="${x}" y="26" width="18" height="20"/></g><path class="bd-window-frame" d="${[0, 1, 2].map((i) => `M${x + 4 + i * 5} 28 V44`).join(' ')}" stroke-width="1.4" fill="none" stroke="currentColor"/>`).join('')}
    <path class="bd-shaft jh-shaft" d="M70 46 L88 46 L150 ${FLOOR} L112 ${FLOOR} Z"/>
    <path class="bd-shaft jh-shaft" d="M316 46 L334 46 L290 ${FLOOR} L252 ${FLOOR} Z"/>
    <g class="bd-mid"><rect x="${-W * 2}" y="${FLOOR + 6}" width="${W * 5}" height="2.4"/></g>
    ${[-130, -50, 110, 290, 450, 530].map((x) => column(x, 32, FLOOR, 18, 'bd-mid')).join('')}
    <g class="bd-mid">
      <rect x="${-W * 2}" y="14" width="${W * 5}" height="12"/>
      <path d="M${-W * 2} 14 L${W * 3} 14 L${W * 3} 4 C${W} 0 0 0 ${-W * 2} 4 Z"/>
    </g>
    <path class="jh-gild" d="M${-W * 2} 25 H${W * 3}"/>
    ${linen(122, 12, 56, 0)}${linen(266, 12, 56, 1.4)}
    ${brazierStand(96, FLOOR + 2, 1, false)}${brazierStand(304, FLOOR + 2, 1, false)}
    ${[24, 376, -66, 466].map((x) => column(x, -8, H + 2, 32, 'bd-near')).join('')}
  </g>`;
}

// ── 버금 수레 ─────────────────────────────────

/** 두 말이 끄는 수레 (왼쪽으로 달림, 원점 = 바퀴 아래). 수레 위에 선 사람 */
function chariotGroup(): string {
  const horse = (dx: number) => `<g transform="translate(${dx} 0)">
      <path d="M-14 -13 C-14 -17 -10 -19 -5 -19 L4 -19 C7 -19 8 -21 9 -24 L12 -30 C13 -32 15 -32 16 -30 L15 -27 C17 -25 17 -22 15 -21 L12 -21 C11 -18 10 -15 7 -13 L6 -11 L-12 -11 C-13 -11 -14 -12 -14 -13 Z" transform="scale(-1 1)"/>
      <g class="ec-legs" transform="scale(-1 1)"><path class="ec-leg" d="M-11 -12 L-13 0 L-11 0 L-9 -12 Z"/><path class="ec-leg ec-leg--b" d="M-7 -12 L-6 0 L-4 0 L-5 -12 Z"/><path class="ec-leg ec-leg--b" d="M3 -12 L5 0 L7 0 L5 -12 Z"/><path class="ec-leg" d="M6 -12 L10 -1 L12 -1 L8 -12 Z"/></g>
      <path d="M-13 -30 L-15 -36 L-11 -32 Z M-14 -31 C-16 -33 -16 -36 -13 -38" transform="scale(-1 1)" class="ec-plume"/>
    </g>`;
  return `<g class="ec-chariot__body">
    ${horse(-30)}${horse(-24)}
    <path d="M-16 -15 L4 -12" fill="none" stroke="currentColor" stroke-width="1.2"/>
    <path d="M2 -24 L14 -24 L14 -10 L2 -10 Z"/>
    <circle class="ec-wheel" cx="9" cy="-6" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/>
    <path class="ec-wheel" d="M9 -12 V0 M3 -6 H15 M5 -10 L13 -2 M13 -10 L5 -2" fill="none" stroke="currentColor" stroke-width="0.7" style="transform-origin:9px -6px"/>
    <path d="M5 -24 L5 -34 C5 -37 7 -38 9 -38 C11 -38 12 -37 12 -35 L12 -24 Z"/><circle cx="8.6" cy="-41" r="3"/>
    <path d="M6 -33 L0 -38" stroke="currentColor" stroke-width="1.4" fill="none"/>
    <path class="ec-chariot__gild" d="M2 -20 H14 M6 -30 Q9 -28 12 -30"/>
  </g>`;
}

/** 길가에 선 사람 하나 (수레가 앞을 지날 때 무릎 꿇고 이마를 땅에 대어 엎드린다: 선 모습 → 엎드린 둥근 등) */
function bystander(x: number, ground: number, h: number, delay: number, seed: number): string {
  const r = rng(seed);
  const w = h * 0.28;
  const dir = r() < 0.5 ? -1 : 1;
  const L = h * 0.62;
  return `<g transform="translate(${x.toFixed(1)} ${ground})" style="--d:${delay.toFixed(2)}s">
    <g class="ec-stand">
      <circle cx="${(r() - 0.5).toFixed(1)}" cy="${(-h + h * 0.1).toFixed(1)}" r="${(h * 0.1).toFixed(1)}"/>
      <path d="M${-w * 0.5} ${-h * 0.8} L${w * 0.5} ${-h * 0.8} L${w * 0.6} 0 L${-w * 0.6} 0 Z"/>
    </g>
    <g class="ec-prone" transform="scale(${dir} 1)">
      <path d="M${-L * 0.55} 0 C${-L * 0.6} ${-h * 0.3} ${-L * 0.3} ${-h * 0.42} ${-L * 0.02} ${-h * 0.38} C${L * 0.24} ${-h * 0.34} ${L * 0.4} ${-h * 0.2} ${L * 0.5} ${-h * 0.06} L${L * 0.5} 0 Z"/>
      <circle cx="${(L * 0.56).toFixed(1)}" cy="${(-h * 0.08).toFixed(1)}" r="${(h * 0.09).toFixed(1)}"/>
    </g>
  </g>`;
}

export function chariotArt(): string {
  const r = rng(1751);
  // 수레는 오른쪽 끝(x 460)에서 왼쪽 끝(x -60)으로 13초에. 사람마다 수레가 앞을 지나는 때에 엎드린다
  const T = 13;
  const at = (x: number) => ((460 - x) / 520) * T - 0.4;
  const people: string[] = [];
  for (let i = 0; i < 26; i++) {
    const x = -40 + i * 18 + r() * 8;
    people.push(bystander(x, 218, 18 + r() * 4, at(x), 1752 + i));
  }
  const near: string[] = [];
  for (let i = 0; i < 14; i++) {
    const x = -60 + i * 38 + r() * 12;
    near.push(bystander(x, 246, 28 + r() * 5, at(x) + 0.3, 1790 + i));
  }
  return `<g class="ec ec--chariot">
    ${hills(198, 'bd-far', 1753)}
    <!-- 먼 성: 탑문 두 채와 깃대, 오벨리스크 -->
    <g class="bd-far">
      <path d="M148 200 L152 150 L190 150 L194 200 Z M206 200 L210 150 L248 150 L252 200 Z M190 200 L190 168 L210 168 L210 200 Z"/>
      <rect x="156" y="132" width="2" height="20"/><rect x="242" y="132" width="2" height="20"/>
      <path d="M298 200 L301 128 L303 122 L305 128 L308 200 Z M96 200 L98 150 L100 146 L102 150 L104 200 Z"/>
      <path d="M-200 200 L-200 178 L60 176 L60 200 Z M340 200 L340 176 L600 178 L600 200 Z"/>
    </g>
    <path class="jh-gild" d="M152 160 H190 M210 160 H248"/>
    ${palm(40, 204, 54, 'bd-far', 1754)}${palm(360, 204, 58, 'bd-far', 1755)}${palm(-80, 206, 50, 'bd-far', 1756)}
    <path class="bd-mid" d="M-800 260 L-800 206 C-400 202 -100 210 200 206 C500 202 800 208 1200 206 L1200 260 Z"/>
    <path class="ec-road" d="M-800 224 C-300 220 100 228 400 222 C700 218 1000 224 1200 222 L1200 234 C900 236 600 230 300 234 C0 238 -400 232 -800 236 Z"/>
    <g class="bd-mid ec-people">${people.join('')}</g>
    <g class="ec-chariot" style="--t:${T}s"><g transform="translate(0 230) scale(1.35)">${chariotGroup()}</g><ellipse class="ec-dust" cx="32" cy="228" rx="28" ry="5"/></g>
    <g class="bd-near ec-people">${near.join('')}</g>
    ${palm(-110, 262, 130, 'bd-near', 1757)}${palm(520, 262, 136, 'bd-near', 1758)}
  </g>`;
}

// ── 곳간 ──────────────────────────────────────

/** 둥근 곳간 (벌집 모양 흙벽돌 곳간, 꼭대기 구멍으로 붓고 아래 문으로 꺼낸다) */
function silo(x: number, ground: number, h: number, cls: string, open: boolean, ladder: boolean): string {
  const w = h * 0.36;
  return `<g class="${cls}">
    <path d="M${x - w} ${ground} C${x - w} ${ground - h * 0.6} ${x - w * 0.7} ${ground - h * 0.92} ${x} ${ground - h} C${x + w * 0.7} ${ground - h * 0.92} ${x + w} ${ground - h * 0.6} ${x + w} ${ground} Z"/>
    <rect x="${x - w * 0.18}" y="${ground - h - 3}" width="${w * 0.36}" height="4"/>
    ${ladder ? `<path d="M${x + w * 0.9} ${ground} L${x + w * 0.3} ${ground - h * 0.94} M${x + w * 1.15} ${ground} L${x + w * 0.55} ${ground - h * 0.94} ${Array.from({ length: 6 }, (_, i) => { const t = (i + 1) / 7; return `M${(x + w * 0.9 - w * 0.6 * t).toFixed(1)} ${(ground - h * 0.94 * t).toFixed(1)} L${(x + w * 1.15 - w * 0.6 * t).toFixed(1)} ${(ground - h * 0.94 * t).toFixed(1)}`; }).join(' ')}" fill="none" stroke="currentColor" stroke-width="0.9"/>` : ''}
  </g>
  <rect class="${open ? 'ec-silo-door ec-silo-door--open' : 'ec-silo-door'}" x="${x - w * 0.22}" y="${ground - h * 0.3}" width="${w * 0.44}" height="${h * 0.3}" rx="${w * 0.2}"/>`;
}

/** 곡식 더미 (바다 모래같이) — 천천히 자라고 낱알이 반짝인다 */
function heap(x: number, ground: number, w: number, h: number, d: number, seed: number): string {
  const r = rng(seed);
  const glints = Array.from({ length: 6 }, (_, i) => `<circle class="ec-glint" cx="${(x + (r() - 0.5) * w * 1.4).toFixed(1)}" cy="${(ground - r() * h * 0.7).toFixed(1)}" r="0.7" style="--d:${(r() * 4 + i * 0.3).toFixed(2)}s"/>`).join('');
  return `<g class="ec-heap" style="--d:${d}s; transform-origin:${x}px ${ground}px"><path d="M${x - w} ${ground} C${x - w * 0.5} ${ground - h * 0.6} ${x - w * 0.2} ${ground - h} ${x} ${ground - h} C${x + w * 0.2} ${ground - h} ${x + w * 0.5} ${ground - h * 0.6} ${x + w} ${ground} Z"/></g>${glints}`;
}

/** 자루를 메고 사다리를 오르내리는 일꾼 */
function porter(x: number, y0: number, y1: number, d: number): string {
  return `<g class="ec-porter" style="--d:${d}s; --dx:${(x - 4).toFixed(1)}px; --y0:${y0}px; --y1:${y1}px">
    <circle cx="0" cy="-9" r="1.6"/><path d="M-1.6 -7.4 L1.6 -7.4 L2.2 0 L-2.2 0 Z"/><ellipse cx="-1.8" cy="-9.4" rx="2.4" ry="1.8"/>
  </g>`;
}

export function granaryArt(famine: boolean): string {
  const r = rng(1761);
  const queue = famine
    ? Array.from({ length: 16 }, (_, i) => {
        const x = 112 + i * 13 + r() * 3;
        const donkey = i % 4 === 2;
        return donkey
          ? `<g class="ec-queue" style="--d:${(i * 0.37).toFixed(2)}s" transform="translate(${x.toFixed(1)} 228)"><path d="M-7 -8 C-7 -10 -5 -11 -2 -11 L4 -11 L7 -15 L9 -14 L7 -9 L6 -6 L-6 -6 Z M-6 -6 L-6 0 L-5 0 L-5 -6 Z M4 -6 L4 0 L5 0 L5 -6 Z"/><rect x="-5" y="-14" width="7" height="4"/></g>`
          : `<g class="ec-queue" style="--d:${(i * 0.37).toFixed(2)}s" transform="translate(${x.toFixed(1)} 228)"><circle cx="0" cy="-14" r="2"/><path d="M-2.4 -11.6 L2.4 -11.6 L3 0 L-3 0 Z"/><ellipse cx="2.6" cy="-12" rx="2.6" ry="3.2"/></g>`;
      }).join('')
    : '';
  const cracks = famine ? `<path class="ec-cracks" d="M-60 248 l20 4 l12 -3 l18 6 M120 252 l14 -4 l10 5 l22 -2 M260 246 l18 5 l8 -4 l20 3 M380 252 l16 -4 l12 4"/>` : '';
  return `<g class="ec ec--granary${famine ? ' ec--famine' : ''}">
    ${hills(196, 'bd-far', 1762)}
    <g class="bd-far"><path d="M-200 200 L-200 178 L40 176 L40 168 L54 168 L54 176 L120 176 L120 200 Z M300 200 L300 174 L560 176 L560 200 Z"/></g>
    ${famine ? `<g class="ec-deadpalm">${palm(70, 206, 46, 'bd-far', 1763)}</g>` : palm(70, 206, 50, 'bd-far', 1763)}${palm(330, 204, 52, 'bd-far', 1764)}
    <!-- 곳간 뜰의 낮은 담 -->
    <path class="bd-mid" d="M-800 260 L-800 210 C-400 206 -100 214 200 210 C500 206 800 212 1200 210 L1200 260 Z"/>
    <g class="bd-mid"><rect x="96" y="194" width="208" height="16"/></g>
    ${silo(124, 202, 52, 'bd-mid', famine, true)}${silo(166, 200, 60, 'bd-mid', famine, false)}${silo(212, 200, 64, 'bd-mid', famine, true)}${silo(258, 200, 58, 'bd-mid', famine, false)}${silo(296, 202, 50, 'bd-mid', famine, true)}
    ${silo(-30, 206, 50, 'bd-mid', famine, false)}${silo(20, 206, 44, 'bd-mid', famine, false)}${silo(380, 206, 46, 'bd-mid', famine, false)}${silo(430, 206, 52, 'bd-mid', famine, false)}
    ${famine ? '' : `${porter(150, 196, 152, 0)}${porter(234, 198, 142, 2.6)}${porter(316, 198, 158, 1.3)}`}
    <g class="ec-heaps${famine ? ' ec-heaps--low' : ''}">${heap(150, 236, 30, 14, 0, 1765)}${heap(250, 238, 36, 18, 1.2, 1766)}${heap(-40, 238, 40, 18, 0.6, 1767)}${heap(450, 238, 40, 16, 1.8, 1768)}${heap(200, 244, 22, 9, 2.4, 1769)}</g>
    ${cracks}
    ${queue}
    <g class="bd-near"><path d="M-800 260 L-800 246 C-500 244 -200 252 0 250 C40 250 60 256 80 262 Z M320 262 C340 254 380 248 440 248 C700 246 900 250 1200 248 L1200 260 Z"/></g>
    ${palm(-100, 262, 120, 'bd-near', 1770)}${palm(510, 262, 128, 'bd-near', 1771)}
  </g>`;
}

// ── 효과 signet ───────────────────────────────

/**
 * 효과 signet (41:42 "자기의 인장 반지를 빼어 요셉의 손에 끼우고 … 금사슬을 목에 걸고"):
 * 요셉의 손(반지)과 목(사슬)에서 차례로 금빛 별이 반짝이고 옅은 빛이 번진다. 약 4초.
 */
export function playSignet(scene: HTMLElement, rm: boolean): void {
  const who = scene.querySelector<HTMLElement>('.actor[data-id="joseph"] .actor__art') ?? scene.querySelector<HTMLElement>('.actor[data-id="joseph"]');
  if (!who) return;
  const b = scene.getBoundingClientRect();
  const a = who.getBoundingClientRect();
  if (!a.width) return;
  const layer = document.createElement('div');
  layer.className = 'fx-signet';
  // 그림 좌표(200×420)에서 손은 (126, 232), 목깃은 (110, 150) 근처. 인물이 왼쪽을 보면 x를 뒤집는다
  const flip = (who.closest('.actor') as HTMLElement | null)?.dataset.face === 'left' || getComputedStyle(who).transform.startsWith('matrix(-1');
  // 그림은 상자 안에 xMidYMax meet로 들어간다
  const k = Math.min(a.width / 200, a.height / 420);
  const ox = (a.width - 200 * k) / 2;
  const oy = a.height - 420 * k;
  const pt = (x: number, y: number) => {
    const fx = flip ? 200 - x : x;
    return `left:${(a.left - b.left + ox + fx * k).toFixed(1)}px; top:${(a.top - b.top + oy + y * k).toFixed(1)}px`;
  };
  layer.innerHTML = `<b style="${pt(126, 230)}; --d:0.1s"></b><i style="${pt(126, 230)}; --d:0.2s"></i><b style="${pt(110, 146)}; --d:1.3s"></b><i style="${pt(110, 146)}; --d:1.4s"></i>`;
  scene.append(layer);
  const life = rm ? 2000 : 5200;
  setTimeout(() => layer.classList.add('is-out'), life - 900);
  setTimeout(() => layer.remove(), life);
}
