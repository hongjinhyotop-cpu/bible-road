// 이삭 집의 장막 안 (창 25:29-34 팥죽 · 창 27 가로챈 축복, A급 gen-25-stew · gen-27-blessing).
// 배경 그림 'stew-tent' · 'cook-tent' · 'isaac-tent'. 같은 종이 오려낸 그림자극 말투.
// 검은 염소털 천을 가로로 이어 붙인 장막 안: 가운데 기둥과 처진 천장, 오른쪽에 걷어 올린 문 휘장(바깥 들빛이 든다),
// 왼쪽에 항아리들과 매달아 둔 가죽 물부대, 바닥에 깐 줄무늬 깔개.
//  - stew-tent  : 가운데 화덕 위 토기 솥에 붉은 팥죽이 끓는다. 보글거리고 김이 오른다 (창 25:29 "야곱이 죽을 쑤었더니")
//  - cook-tent  : 같은 솥에 갈색 별미가 끓는다 (창 27:14 "그 어미가 그 아비의 즐기는 별미를 만들었더라")
//  - isaac-tent : 문 휘장을 내린 어두운 장막. 낮은 잠자리와 베개, 등잔 하나, 바닥의 그릇과 잔 (창 27:1 눈이 어두운 이삭)
// 폰(세로 화면)에서는 x 110~290만 보인다 → 솥·등잔은 가운데(x 200), mood에 spread를 걸어 인물을 양옆으로 벌린다.
// 실내라 무대 땅(land)을 깔지 않는다. 바닥선은 y 232.
import { W, H, rng } from './backdrop';

const FLOOR = 232;

/** 장막 안의 틀: 염소털 천 벽, 처진 천장, 기둥, 바닥과 깔개 */
function tentRoom(doorOpen: boolean, seed: number): string {
  const r = rng(seed);
  // 가로로 이어 붙인 천의 이음매: 기둥 사이에서 살짝 처진다
  const seams = [64, 104, 146, 190]
    .map((y) => `<path class="bd-seam" d="M${-W * 2} ${y} ${Array.from({ length: 12 }, (_, i) => {
      const x0 = -W * 2 + i * 200;
      return `Q${x0 + 100} ${y + 7 + r() * 3} ${x0 + 200} ${y}`;
    }).join(' ')}"/>`)
    .join('');
  // 천 무늬: 가는 세로 결
  const weave = Array.from({ length: 60 }, (_, i) => {
    const x = -W * 2 + i * 34 + r() * 10;
    return `M${x.toFixed(1)} 40 L${(x + 1).toFixed(1)} ${FLOOR}`;
  }).join(' ');
  const door = doorOpen
    ? `<path class="bd-tentdoor" d="M262 ${FLOOR} L268 128 C274 118 290 118 296 128 L304 ${FLOOR} Z"/>
       <path class="bd-far" d="M262 ${FLOOR} L263 214 C272 208 284 212 294 206 C298 204 302 206 304 208 L304 ${FLOOR} Z"/>
       <path class="bd-curtain" d="M298 120 C306 128 312 150 314 180 C316 200 312 216 306 ${FLOOR} L322 ${FLOOR} C326 200 324 160 316 132 C312 122 306 116 298 120 Z"/>
       <path class="bd-shaft" d="M266 ${FLOOR} L302 ${FLOOR} L330 260 L214 260 Z"/>`
    : `<path class="bd-curtain" d="M262 ${FLOOR} L266 126 C274 116 290 116 298 126 L304 ${FLOOR} Z"/>
       <path class="bd-seam" d="M276 128 L274 ${FLOOR} M288 128 L290 ${FLOOR}"/>`;
  return `
    <defs><linearGradient id="tw-door-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="tw-door-top"/><stop offset="1" class="tw-door-bot"/></linearGradient></defs>
    <rect class="bd-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${FLOOR}"/>
    <path class="bd-weave-tent" d="${weave}"/>
    ${seams}
    ${door}
    <!-- 처진 천장: 기둥 꼭대기에서 들리고 사이에서 처진다 -->
    <path class="bd-mid" d="M${-W * 2} 0 H${W * 3} V40 C1000 58 760 30 560 52 C460 62 420 40 360 30 C300 42 250 50 200 26 C150 50 100 42 40 30 C-20 40 -60 62 -160 52 C-360 30 -600 58 ${-W * 2} 40 Z"/>
    <!-- 기둥 셋 -->
    <g class="bd-mid">
      <rect x="197" y="24" width="6" height="${FLOOR - 24}"/>
      <rect x="37" y="28" width="6" height="${FLOOR - 28}"/>
      <rect x="357" y="28" width="6" height="${FLOOR - 28}"/>
    </g>
    <rect class="bd-floor" x="${-W * 2}" y="${FLOOR}" width="${W * 5}" height="${H - FLOOR}"/>
    <path class="bd-floor-line" d="M${-W * 2} ${FLOOR} H${W * 3}"/>
    <!-- 바닥에 깐 줄무늬 깔개 -->
    <path class="bd-rug" d="M96 236 L304 236 L312 252 L88 252 Z"/>
    <path class="bd-rug-line" d="M94 240 L306 240 M90 248 L310 248"/>`;
}

/** 왼쪽 살림: 항아리 둘, 매달아 둔 가죽 물부대와 마늘·약초 다발 */
function goods(): string {
  return `<g class="bd-mid">
    <path d="M118 ${FLOOR} C110 226 110 212 116 204 L114 198 L126 198 L124 204 C130 212 130 226 122 ${FLOOR} Z"/>
    <path d="M140 ${FLOOR} C134 228 134 218 138 212 L137 208 L145 208 L144 212 C148 218 148 228 142 ${FLOOR} Z"/>
    <path d="M182 70 C176 74 174 86 176 98 C178 106 186 110 192 106 C196 102 196 90 194 80 C193 74 190 70 186 68 Z"/>
    <path d="M186 68 L197 58" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <path d="M43 70 C52 74 60 74 70 70" fill="none" stroke="currentColor" stroke-width="1"/>
    <path d="M50 72 L48 88 L53 88 Z M58 73 L57 92 L61 92 Z M66 71 L65 86 L69 86 Z"/>
  </g>`;
}

/** 가운데 화덕과 토기 솥. red = 팥죽(붉음), 아니면 별미(갈색). 보글거리고 김이 오른다 */
function pot(red: boolean, seed: number): string {
  const r = rng(seed);
  const cx = 200;
  const steam = Array.from({ length: 5 }, (_, i) =>
    `<path class="bd-steam" style="--d:${(i * 0.9 + r()).toFixed(2)}s; --dx:${((r() - 0.5) * 14).toFixed(1)}px" d="M${(cx - 8 + i * 4).toFixed(1)} 206 c-3 -5 3 -8 0 -13 c-3 -5 3 -8 0 -13" fill="none" stroke-linecap="round"/>`,
  ).join('');
  const bubbles = Array.from({ length: 4 }, (_, i) =>
    `<circle class="bd-bubble" style="--d:${(i * 0.6 + r() * 0.5).toFixed(2)}s" cx="${(cx - 10 + i * 6.5 + r() * 2).toFixed(1)}" cy="${(209.6 + r() * 0.8).toFixed(1)}" r="1.2"/>`,
  ).join('');
  return `<g transform="translate(${cx} ${FLOOR}) scale(1.35) translate(${-cx} ${-FLOOR})">
    <circle class="bd-firelight" cx="${cx}" cy="220" r="46"/>
    <g class="bd-near">
      <ellipse cx="${cx - 18}" cy="${FLOOR - 3}" rx="6" ry="4"/><ellipse cx="${cx + 18}" cy="${FLOOR - 3}" rx="6" ry="4"/><ellipse cx="${cx}" cy="${FLOOR - 1}" rx="8" ry="3"/>
    </g>
    <path class="bd-flicker" d="M${cx - 12} ${FLOOR - 4} Q${cx - 10} ${FLOOR - 14} ${cx - 6} ${FLOOR - 18} Q${cx - 4} ${FLOOR - 10} ${cx - 2} ${FLOOR - 4} Z"/>
    <path class="bd-flicker" style="animation-delay:-0.5s" d="M${cx + 2} ${FLOOR - 4} Q${cx + 5} ${FLOOR - 16} ${cx + 9} ${FLOOR - 20} Q${cx + 11} ${FLOOR - 10} ${cx + 13} ${FLOOR - 4} Z"/>
    <g class="bd-pot">
      <path d="M${cx - 21} 212 C${cx - 25} 220 ${cx - 21} 226 ${cx - 13} 228 L${cx + 13} 228 C${cx + 21} 226 ${cx + 25} 220 ${cx + 21} 212 Z"/>
      <path d="M${cx - 23} 208 L${cx + 23} 208 L${cx + 21} 213 L${cx - 21} 213 Z"/>
      <path class="bd-pot-line" d="M${cx - 21} 217 Q${cx} 221 ${cx + 21} 217" fill="none"/>
    </g>
    <ellipse class="${red ? 'bd-stew' : 'bd-stew bd-stew--brown'}" cx="${cx}" cy="209.4" rx="20" ry="2.2"/>
    ${bubbles}
    <g class="bd-steamwrap">${steam}</g>
  </g>`;
}

/** 이삭의 어두운 장막: 왼쪽 낮은 잠자리와 베개, 가운데 등잔, 바닥의 그릇과 잔 */
function isaacCorner(): string {
  return `<g class="bd-mid">
    <path d="M60 ${FLOOR} L62 214 C90 210 150 210 186 214 L188 ${FLOOR} Z"/>
    <path d="M62 214 C60 204 66 196 78 196 C90 196 96 204 94 212 Z"/>
    <path d="M118 ${FLOOR} L118 222 L126 222 L126 ${FLOOR} Z"/>
  </g>
  <path class="bd-rug-line" d="M64 220 C100 216 150 216 184 220"/>
  <g class="bd-near">
    <path d="M222 ${FLOOR} L224 196 L228 196 L230 ${FLOOR} Z M216 ${FLOOR} L236 ${FLOOR} L232 228 L220 228 Z"/>
    <path d="M216 196 C218 190 234 190 236 196 L232 199 L220 199 Z"/>
    <path d="M186 ${FLOOR} C186 226 200 226 200 ${FLOOR} Z"/>
    <path d="M206 ${FLOOR} L208 222 L214 222 L216 ${FLOOR} Z"/>
  </g>
  <path class="bd-lampflame" d="M223 192 Q225 184 226 180 Q228 184 229 192 Z"/>
  <circle class="bd-firelight" cx="226" cy="190" r="52"/>`;
}

export function stewTentArt(kind: 'stew' | 'cook' | 'isaac'): string {
  if (kind === 'isaac') return `${tentRoom(false, 801)}${isaacCorner()}`;
  return `${tentRoom(true, 802)}${goods()}${pot(kind === 'stew', 803)}`;
}
