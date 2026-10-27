// 요셉의 관 (창 50:26 "그들이 그의 몸에 향 재료를 넣고 애굽에서 입관하였더라", A급 gen-50-good). 배경 그림 'joseph-coffin'.
// 창세기의 마지막 그림. 같은 종이 오려낸 그림자극 말투로, 아주 조용하게:
//  - 어두운 돌방. 뒷벽에 희미한 그림 글자 띠 하나 (요셉의 홀과 같은 무늬, 실제 글자 아님)
//  - 낮은 받침 위의 등잔 하나. 불빛만 천천히 숨 쉬고, 가는 연기가 오른다 — 방의 빛은 이것뿐
//  - 그 불빛 안쪽, 낮은 상 위에 누운 이집트식 사람 모양 관: 머리 쪽(오른쪽)에 가발 같은 둥근 머리, 금빛 목깃과 띠
//  - 발치에 향 재료 항아리 셋. 불빛 속을 떠도는 먼지 몇 알
// 폰(세로 화면)에서는 x 100~300만 보인다 → 등잔·관·항아리는 그 안에.
// 그림의 스타일은 styles/coffin.css (이 파일이 직접 불러온다).
import '../styles/coffin.css';
import { W, H, rng } from './backdrop';
import { glyphBand } from './hall';

const FLOOR = 228;

/** 사람 모양 관 (옆에서 본 모양, 머리가 오른쪽): 발끝 → 가슴 → 둥근 머리 */
function coffin(): string {
  const body =
    'M170 207 L170 197 C170 192 174 190 182 190 C204 189 226 187 246 184 C258 182 268 181 276 181 ' +
    'C279 175 286 171 294 171 C303 171 309 177 310 186 C311 194 310 201 308 207 Z';
  const lid = 'M171 199 C200 198 240 197 270 196 C285 195 300 196 309 197';
  const bands = [196, 212, 228, 244].map((x) => `M${x} ${(190 - (x - 196) * 0.11).toFixed(1)} V206`).join(' ');
  // 폰 화면(x 100~300) 안에 머리까지 다 들어오게 조금 줄여서 가운데로 (바닥선은 그대로)
  return `<g class="cf-coffin" transform="translate(13.5 ${(FLOOR * 0.15).toFixed(1)}) scale(0.85)">
    <!-- 낮은 상: 굵은 다리 넷, 사자 발 같은 끝 -->
    <g class="bd-mid">
      <rect x="164" y="207" width="152" height="5" rx="1"/>
      ${[170, 206, 274, 308].map((x) => `<path d="M${x} 212 L${x + 4} 212 L${x + 4} ${FLOOR - 3} Q${x + 7} ${FLOOR - 2} ${x + 7} ${FLOOR} L${x - 1} ${FLOOR} L${x} 212 Z"/>`).join('')}
    </g>
    <path class="cf-wood" d="${body}"/>
    <path class="cf-lit" d="${body}"/>
    <path class="cf-gild" d="${lid}"/>
    <path class="cf-gild cf-gild--thin" d="${bands}"/>
    <!-- 목깃: 가슴 위의 반달 -->
    <path class="cf-gild" d="M268 182 C268 190 272 196 280 198 M262 183 C262 192 267 198 276 200"/>
    <!-- 둥근 머리(가발)와 얼굴 자리 -->
    <path class="cf-wig" d="M280 178 C284 172 292 170 300 172 C306 175 309 181 309 188 L300 188 C300 183 296 180 290 180 C286 180 283 181 280 183 Z"/>
    <ellipse class="cf-face" cx="296" cy="186" rx="5" ry="4"/>
  </g>`;
}

/** 등잔 하나: 가는 받침 위의 납작한 기름 접시, 불꽃, 위로 오르는 가는 연기 */
function lamp(x: number, top: number): string {
  return `<g class="cf-lamp">
    <circle class="cf-glow" cx="${x}" cy="${top - 6}" r="150"/>
    <circle class="cf-glow cf-glow--core" cx="${x}" cy="${top - 6}" r="34"/>
    <g class="bd-near">
      <path d="M${x - 8} ${FLOOR} L${x - 2} ${top + 6} L${x + 2} ${top + 6} L${x + 8} ${FLOOR} Z"/>
      <rect x="${x - 10}" y="${FLOOR - 3}" width="20" height="3" rx="1"/>
      <path d="M${x - 9} ${top} L${x + 11} ${top} C${x + 9} ${top + 5} ${x + 3} ${top + 7} ${x - 2} ${top + 7} C${x - 6} ${top + 7} ${x - 9} ${top + 4} ${x - 9} ${top} Z"/>
      <path d="M${x + 9} ${top} L${x + 14} ${top - 2} L${x + 12} ${top + 2} Z"/>
    </g>
    <path class="bd-lampflame cf-flame" d="M${x + 10} ${top - 1} Q${x + 11} ${top - 9} ${x + 13} ${top - 13} Q${x + 15} ${top - 8} ${x + 15} ${top - 1} Z"/>
    <path class="cf-smoke" d="M${x + 13} ${top - 14} C${x + 9} ${top - 30} ${x + 18} ${top - 44} ${x + 12} ${top - 62} C${x + 8} ${top - 76} ${x + 16} ${top - 88} ${x + 12} ${top - 104}"/>
  </g>`;
}

/** 향 재료 항아리: 둥근 몸, 좁은 목, 넓은 입 */
function jar(x: number, s: number): string {
  return `<g class="bd-near" transform="translate(${x} ${FLOOR}) scale(${s})">
    <path d="M-6 0 C-10 -4 -11 -12 -8 -18 C-6 -21 -4 -22 -3 -24 L-4 -27 L4 -27 L3 -24 C4 -22 6 -21 8 -18 C11 -12 10 -4 6 0 Z"/>
    <rect x="-5" y="-29" width="10" height="2.4" rx="1"/>
  </g>`;
}

/** 요셉의 관이 놓인 방 */
export function josephCoffinArt(): string {
  const r = rng(5026);
  const motes = Array.from({ length: 14 }, () =>
    `<circle class="cf-mote" style="--d:${(r() * 12).toFixed(2)}s; --x:${((r() - 0.5) * 14).toFixed(1)}px" cx="${(110 + r() * 140).toFixed(1)}" cy="${(110 + r() * 100).toFixed(1)}" r="${(0.4 + r() * 0.5).toFixed(2)}"/>`,
  ).join('');
  return `<g class="cf">
    <defs>
      <radialGradient id="cf-glow-g"><stop offset="0" class="cf-glow__c"/><stop offset="0.45" class="cf-glow__m"/><stop offset="1" class="cf-glow__e"/></radialGradient>
    </defs>
    <rect class="cf-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${FLOOR}"/>
    <rect class="jh-band cf-band" x="${-W * 2}" y="96" width="${W * 5}" height="10"/>
    <g class="cf-glyphs">${glyphBand(-W * 2, W * 3, 97, 8, 5027)}</g>
    <!-- 뒷벽의 낮은 문틀 (닫힌 돌방) -->
    <g class="bd-mid cf-niche"><path d="M206 ${FLOOR} L206 132 L262 132 L262 ${FLOOR} L256 ${FLOOR} L256 138 L212 138 L212 ${FLOOR} Z"/></g>
    <rect class="bd-floor" x="${-W * 2}" y="${FLOOR}" width="${W * 5}" height="${H - FLOOR}"/>
    <path class="bd-floor-line" d="M${-W * 2} ${FLOOR} H${W * 3}"/>
    ${lamp(136, 198)}
    ${coffin()}
    ${jar(111, 0.9)}${jar(121, 0.7)}${jar(103, 0.62)}
    <ellipse class="cf-pool" cx="186" cy="${FLOOR + 4}" rx="120" ry="9"/>
    <g class="cf-motes">${motes}</g>
  </g>`;
}
