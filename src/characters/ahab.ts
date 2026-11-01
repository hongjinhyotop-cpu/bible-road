// 아합 — 오므리의 아들, 북이스라엘 일곱째 왕 (왕상 16:29 – 22:40). 시돈 왕의 딸 이세벨의 남편.
// 9막 A급 kgs1-18-carmel · kgs1-21-naboth에서 키트 임시 그림을 공들여 다시 그림.
//  "아합의 남은 행적과 무릇 행한 일과 그 건축한 상아궁과 …" (왕상 22:39) — 사마리아에서 나온 상아 조각들처럼, 화려하고 바다 건너 시돈 냄새가 나는 왕.
// 실루엣의 표지 (르호보암 = 뾰족한 금관, 솔로몬 = 다섯 봉우리 높은 관, 다윗 = 낮은 관·수금과 구별):
//  - 위가 평평하게 잘린 높은 원뿔 왕관(띠에 둥근 꽃 장식) + 뒤로 늘어진 두 가닥 띠
//  - 어깨에 닿는 굵은 곱슬머리, 층층이 말린 네모난 긴 수염 (그 시대 서쪽 셈족 왕들의 차림)
//  - 자색 긴 옷 위로 몸을 비스듬히 감은 술 달린 숄, 넓은 금 허리띠
//  - 앞손에 짧은 상아 홀 (끝이 꽃봉오리)
//
// 옷 (장면 맨 위 "outfit": {"ahab": "sackcloth"} 또는 beat의 "outfit"):
//  - king (기본)  : 위의 왕의 차림. 갈아입힌 뒤 되돌릴 때 이 이름을 쓴다.
//  - sackcloth   : 옷을 찢고 굵은 베로 몸을 동임 (왕상 21:27). 왕관 없이 헝클어진 맨머리, 찢어진 자색 옷자락 위로
//                  거친 베옷과 새끼 띠, 홀을 놓은 빈손을 아래로.
import type { CharacterDef } from './index';
import { ARM_BENT, ARM_DOWN, BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';

// ── 머리 (hair 부위 — 수염·왕관 포함) ───────────────
/** 어깨에 닿는 굵은 곱슬머리 */
const CURLS = `
  <path d="M100 16 C87 14 77 22 75 36 C73 48 72 60 72 72 C72 84 70 92 72 98 C76 94 80 93 84 95 C84 87 85 80 88 74 C84 64 84 52 87 45 C91 37 99 32 110 31 C116 31 121 33 124 36 C121 23 112 16 100 16 Z"/>
  ${[[74, 64], [72, 76], [73, 88], [78, 97], [80, 54], [77, 44]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.2"/>`).join('')}`;
/** 층층이 말린 네모난 긴 수염 */
const SQUARE_BEARD = `
  <path d="M96 55 C103 60 111 63 119 65 L123 68 C127 80 128 96 127 112 L127 128 L95 128 C92 112 91 96 91 82 C91 70 93 61 96 55 Z"/>
  <path class="detail" d="M95 80 H126 M94 92 H127 M94 104 H127 M95 116 H127" fill="none" stroke-width="0.9"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<circle class="detail" cx="${98 + i * 5.4}" cy="126" r="2.4" fill="none" stroke-width="0.7"/>`).join('')}`;
/** 위가 평평한 높은 원뿔 왕관 + 띠의 꽃 장식 + 뒤로 늘어진 두 가닥 띠 */
const CROWN = `
  <path class="ah-gold" d="M78 34 L82 2 C96 -2 112 -2 124 2 L127 33 C111 28 94 29 78 34 Z"/>
  <path class="ah-gold" d="M76 33 C92 27 110 26 128 31 L128 39 C110 34 92 35 77 41 Z"/>
  ${[86, 98, 110, 121].map((x) => `<circle class="ah-ivory" cx="${x}" cy="${x < 100 ? 34.6 : 33.4}" r="2"/>`).join('')}
  <path class="detail" d="M84 12 C96 9 112 9 124 12 M83 22 C96 19 112 19 125 22" fill="none" stroke-width="0.8"/>
  <path class="ah-gold" d="M78 38 C72 52 68 70 66 92 L70 92 C72 72 76 54 81 40 Z M82 39 C78 56 76 74 75 96 L79 96 C80 76 82 58 85 41 Z"/>`;
const HEAD_KING = `${CURLS}${SQUARE_BEARD}${CROWN}`;
/** 왕관을 벗은 헝클어진 맨머리 (21:27) */
const HEAD_BARE = `
  <path d="M101 12 C86 9 74 18 71 33 C69 46 69 60 69 74 C68 86 66 94 68 100 C72 96 77 95 81 97 C82 89 84 81 87 74 C84 64 84 52 87 45 C91 37 99 32 110 31 C117 31 122 33 125 36 C123 26 119 22 114 20 C110 14 106 12 101 12 Z"/>
  <path d="M76 18 L70 10 L80 16 Z M92 11 L90 3 L97 10 Z M113 15 L118 8 L117 18 Z M70 40 L62 38 L70 46 Z"/>
  ${[[72, 66], [70, 80], [72, 92]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join('')}
  ${SQUARE_BEARD}`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 자색 긴 옷 + 술 달린 밑단 */
const ROBE = `
  <path class="ah-robe" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 212 131 262 136 320 C139 350 141 372 143 392 Q132 397 120 393 Q108 398 96 393 Q86 397 76 392 C76 350 77 300 78 262 C79 230 80 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="ah-gold" d="M76 382 Q90 386 104 383 Q120 387 142 382 L143 390 Q120 395 104 391 Q90 394 76 390 Z"/>
  <path class="detail" d="M80 392 l0 7 M88 393 l0 7 M96 393 l0 7 M104 392 l0 7 M112 393 l0 7 M120 393 l0 7 M128 393 l0 7 M136 392 l0 7" fill="none" stroke-width="1"/>`;
/** 몸을 비스듬히 감은 술 달린 숄 (어깨에서 무릎 쪽으로) + 넓은 금 허리띠 */
const SHAWL = `
  <path class="ah-robe" d="M86 94 C98 88 114 92 122 104 C128 130 132 170 136 230 L126 246 C116 200 104 150 88 116 Z"/>
  <path class="ah-gold" d="M126 246 L136 230 L138 236 L128 252 Z"/>
  <path class="detail" d="M127 250 l-2 7 M130 247 l-1 7 M133 243 l0 7 M136 239 l1 7" fill="none" stroke-width="0.9"/>
  <path class="ah-gold" d="M90 108 C104 130 116 170 124 214 L120 216 C112 172 100 134 87 112 Z"/>
  <path class="ah-gold" d="M79 170 Q100 179 122 173 L122 186 Q100 193 79 184 Z"/>
  ${[86, 98, 110].map((x) => `<circle class="ah-ivory" cx="${x}" cy="${x === 98 ? 181 : 179.4}" r="1.8"/>`).join('')}`;
const KING = `${ROBE}${SHAWL}`;

/** 굵은 베 (21:27): 찢어진 자색 옷 위로 거친 베옷과 새끼 띠 */
const SACK = `
  <path class="ah-robe" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 212 131 262 136 320 C139 350 141 372 143 392 L134 386 L128 396 L118 388 L110 397 L100 386 L92 396 L84 388 L76 392 C76 350 77 300 78 262 C79 230 80 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="ah-sack" d="M86 96 C94 92 104 92 112 96 C120 102 124 112 124 122 C124 140 120 160 120 180 C124 220 128 270 130 318 L122 312 L116 322 L108 313 L100 324 L92 314 L84 322 L78 316 C78 280 79 240 80 210 C81 190 82 176 82 166 C79 146 78 126 80 114 C81 106 83 100 86 96 Z"/>
  <path class="ah-sackline" d="M86 120 L120 118 M84 150 L121 148 M82 200 L123 198 M81 240 L126 238 M80 280 L128 278 M90 110 L88 310 M102 104 L102 316 M114 108 L118 312" stroke-width="0.7"/>
  <path class="ah-sack" d="M80 176 Q100 183 121 178" fill="none" stroke="currentColor" stroke-width="3"/>
  <path class="detail" d="M104 182 L106 206 M108 182 L112 202" fill="none" stroke-width="1.6"/>
  <path class="ah-robe" d="M126 330 L134 340 L128 352 L138 360 L130 372" fill="none" stroke="currentColor" stroke-width="1"/>`;

// ── 앞팔 ──────────────────────────────────────
/** 짧은 상아 홀 (끝이 꽃봉오리) — 손보다 뒤에 */
const SCEPTER = `
  <path class="ah-ivory" d="M141 168 L142.4 112 L145.6 112 L147 168 Z"/>
  <path class="ah-ivory" d="M138 112 C138 104 141 98 144 96 C147 98 150 104 150 112 Z"/>
  <path class="ah-gold" d="M139 113 L149 113 L149 117 L139 117 Z M140 140 L148 140 L148 144 L140 144 Z"/>`;
const ARM_KING = `${SCEPTER}${ARM_BENT}
  <path class="ah-robe" d="M90 94 C100 88 114 92 118 104 C120 116 119 130 118 146 C112 150 104 152 98 150 C95 132 92 112 90 94 Z"/>
  <path class="ah-gold" d="M98 144 C106 147 113 146 119 141 L119 148 C112 153 104 154 98 151 Z"/>`;
const ARM_SACK = `${ARM_DOWN}
  <path class="ah-sack" d="M92 98 C100 92 112 94 115 104 C116 116 115 128 114 140 C108 142 101 142 96 140 C95 126 93 110 92 98 Z"/>`;

const ahab: CharacterDef = {
  id: 'ahab',
  name: '아합',
  traits: '옆모습. 위가 평평한 높은 원뿔 금관(꽃 장식 띠, 뒤로 늘어진 두 가닥 띠), 어깨에 닿는 굵은 곱슬머리, 층층이 말린 네모난 긴 수염, 자색 긴 옷 위로 비스듬히 감은 술 달린 숄과 넓은 금 허리띠, 앞손의 짧은 상아 홀. sackcloth: 관 없이 헝클어진 맨머리, 찢어진 자색 옷 위 거친 굵은 베옷과 새끼 띠',
  faces: 'right',
  height: 1.03,
  tint: '#6e3f8a',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 100],
      cloth: [100, 150],
      hair: [86, 60],
    },
    outfits: {
      king: { markup: KING, height: 1.03, parts: { hair: HEAD_KING, legs: LEGS_SLIM, armR: ARM_KING, armL: BACK_ARM } },
      sackcloth: { markup: SACK, height: 1, parts: { hair: HEAD_BARE, legs: LEGS_SLIM, armR: ARM_SACK, armL: BACK_ARM } },
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g data-part="cloth">${KING}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 14)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD_KING}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_KING}</g>
      </g>`,
  },
};

export default ahab;
