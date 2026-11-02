// 바사 왕 고레스 — 키루스 2세 (스 1:1-4, 대하 36:22-23, 사 44:28 · 45:1). 주전 539년 바벨론을 정복한 페르시아 왕.
// 10막 A급 ezr-1-cyrus(스 1 「고레스의 조서」)에서 키트 임시 그림을 공들여 다시 그림 (같은 파일 이름 → 에스라 모든 장면에 반영).
// 실루엣의 표지 (느부갓네살 = 바벨론 왕, 아하수에로 = 같은 바사 왕이지만 다른 그림 — 도우미 3):
//  - 위가 계단 톱니로 끝나는 높은 원통 관(살짝 벌어짐, 세로 홈) + 관 띠에서 등 뒤로 흩날리는 두 가닥 띠
//  - 목덜미에 둥글게 뭉친 곱슬 머리, 가슴까지 오는 네모나게 각진 긴 수염(가로 곱슬 줄)
//  - 바사 궁정 옷: 소매가 넓게 늘어져 비스듬한 주름이 진 긴 옷, 가운데로 모이는 치마 주름, 금띠
//  - 앞손에 땅을 짚는 긴 홀(끝에 둥근 머리) — 페르세폴리스 부조의 왕처럼
//
// 옷 ("outfit": {"cyrus": "king"}):
//  - king (기본) : 위의 차림. 되돌릴 때 이 이름.
import type { CharacterDef } from './index';
import { BACK_ARM, FACE_MAN, LEGS_STOCKY, TORSO_STOCKY } from './_parts.ts';

// ── 머리 (hair 부위 — 머리털·수염·관) ─────────────────
/** 계단 톱니 원통 관 */
const teeth = Array.from({ length: 7 }, (_, i) => {
  const x = 74 + i * 8;
  return `L${x} -10 L${x + 2} -14 L${x + 6} -14 L${x + 8} -10`;
}).join(' ');
const CROWN = `
  <path class="cy-gold" d="M78 34 L74 -10 ${teeth} L130 -10 L125 31 C110 27 92 28 78 34 Z"/>
  <path class="cy-pleat" d="M84 30 L82 -8 M92 28 L91 -8 M100 27 L100 -8 M108 27 L109 -8 M116 28 L118 -8"/>
  <path class="cy-sleeve" d="M77 26 C92 20 110 19 126 23 L126 30 C110 26 92 27 78 33 Z"/>
  <circle class="cy-lotus" cx="104" cy="25.6" r="2.2"/>`;
/** 관 띠에서 등 뒤로 흩날리는 두 가닥 띠 (디아뎀) */
const RIBBONS = `
  <path class="cy-ribbon" d="M80 28 C70 40 62 58 56 84 L60 86 L58 92 C66 66 74 46 84 32 Z"/>
  <path class="cy-ribbon" d="M80 31 C74 48 70 70 68 100 L72 98 L72 106 C74 76 78 52 85 34 Z"/>`;
/** 목덜미의 뭉친 곱슬 머리 */
const HAIR = `
  <path d="M78 32 C74 42 73 54 76 64 L90 62 C86 52 86 42 90 33 Z"/>
  <ellipse cx="79" cy="68" rx="11" ry="13"/>
  ${[[74, 60], [83, 60], [72, 70], [80, 71], [87, 69], [76, 78], [84, 78]].map(([x, y]) => `<circle class="cy-curl" cx="${x}" cy="${y}" r="3.2"/>`).join('')}`;
/** 네모나게 각진 긴 수염 + 가로 곱슬 줄 */
const BEARD = `
  <path class="cy-beard" d="M95 54 C103 60 112 63 120 65 L124 68 C126 86 127 106 126 126 L100 128 C96 112 93 94 93 78 C92 66 93 60 95 54 Z"/>
  <path class="cy-curl" d="${[82, 93, 104, 115].map((y) => `M98 ${y} q3 -3 6 0 q3 3 6 0 q3 -3 6 0 q3 3 6 0`).join(' ')}"/>
  <path class="cy-beard" d="M112 60 C117 61 121 62 124 64 L123 67 C119 66 114 65 110 64 Z"/>`;
const HEAD = `${RIBBONS}${HAIR}${CROWN}${BEARD}`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 바사 궁정 옷: 긴 옷 + 가운데로 모이는 치마 주름 + 금띠 */
const ROBE = `
  <path class="cy-robe" d="M80 95 C88 90 96 88 103 89 C110 90 116 94 120 99 C127 105 131 113 130 122 C130 133 125 144 122 154 C120 164 120 174 122 184 C128 214 136 266 142 324 C145 352 147 374 149 392 Q136 396 122 390 Q108 396 94 391 Q82 396 72 392 C71 350 72 300 73 262 C74 230 76 200 80 174 C75 154 73 132 75 116 C76 106 77 100 80 95 Z"/>
  <path class="cy-pleat" d="M100 190 L84 388 M103 190 L96 389 M106 190 L108 386 M109 190 L120 388 M112 190 L132 389 M115 190 L142 388"/>
  <path class="cy-sleeve" d="M72 392 Q82 386 94 380 Q108 386 122 380 Q136 386 149 382 L149 392 Q136 396 122 390 Q108 396 94 391 Q82 396 72 392 Z"/>
  <path class="cy-gold" d="M78 176 Q102 184 125 177 L125 188 Q102 195 78 187 Z"/>
  <path class="cy-gold" d="M100 188 L96 214 L101 214 L104 189 Z M106 189 L110 210 L114 209 L110 188 Z"/>`;
/** 등 뒤로 늘어진 넓은 소매 자락 (뒤팔) */
const BACK_SLEEVE = `${BACK_ARM}
  <path class="cy-sleeve" d="M88 100 C80 112 76 130 74 152 C70 176 64 200 58 222 L74 216 C80 196 86 176 90 154 C93 134 94 116 92 104 Z"/>
  <path class="cy-pleat" d="M80 140 L66 210 M86 140 L72 214"/>`;

// ── 앞팔 ──────────────────────────────────────
/** 앞팔: 홀을 쥔 손 + 아래로 넓게 늘어진 소매와 비스듬한 주름 */
const ARM_SCEPTER = `
  <path class="cy-sleeve" d="M92 104 C100 94 114 96 117 108 C118 124 118 136 119 146 L140 144 L142 156 C136 178 128 204 118 238 L104 232 C102 206 98 178 96 156 C95 138 94 120 92 104 Z"/>
  <path class="cy-pleat" d="M122 160 L108 228 M130 160 L114 232 M138 158 L120 234 M104 150 L104 222"/>
  <path d="M136 146 C140 143 147 143 150 147 C152 151 152 159 149 163 C146 167 140 167 137 165 C134 162 133 150 136 146 Z"/>
  <path class="cy-gold" d="M134 144 L138 143 L139 167 L135 167 Z"/>`;
/** 땅을 짚는 긴 홀 (legs 부위 — 손이 쥔 자리에 맞춤) */
const SCEPTER = `
  <rect class="cy-gold" x="146.6" y="98" width="3.2" height="311"/>
  <circle class="cy-gold" cx="148.2" cy="94" r="5"/>
  <circle class="cy-lotus" cx="148.2" cy="94" r="2"/>`;

const KING = ROBE;

const cyrus: CharacterDef = {
  id: 'cyrus',
  name: '고레스',
  traits: '옆모습. 바사(페르시아) 왕: 위가 계단 톱니로 끝나는 높은 원통 금관과 등 뒤로 흩날리는 두 가닥 띠, 목덜미의 뭉친 곱슬 머리, 네모나게 각진 긴 수염(가로 곱슬 줄), 넓게 늘어진 소매와 비스듬한 주름의 보라색 궁정 옷, 가운데로 모이는 치마 주름, 금띠, 앞손에 땅을 짚는 긴 홀',
  faces: 'right',
  height: 1.06,
  tint: '#5a3a7a',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 100],
      cloth: [100, 150],
      hair: [86, 40],
    },
    outfits: {
      king: { markup: KING, parts: { hair: HEAD, legs: SCEPTER + LEGS_STOCKY, armR: ARM_SCEPTER, armL: BACK_SLEEVE } },
    },
    markup: `
      <g data-part="legs">${SCEPTER}${LEGS_STOCKY}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_SLEEVE}</g>
        ${TORSO_STOCKY}
        <g data-part="cloth">${KING}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 16)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_SCEPTER}</g>
      </g>`,
  },
};

export default cyrus;
