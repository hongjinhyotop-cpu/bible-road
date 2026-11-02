// 에스더 — 아비하일의 딸, 히브리 이름 하닷사, 바사 왕후 (에 2–9). 부모를 잃고 사촌 모르드개의 손에서 자람 (2:7).
// 10막 A급 est-2-queen(에 2 「왕후가 된 고아」)에서 키트 임시 그림을 공들여 다시 그림 (같은 파일 이름 → 에스더 모든 장면에 반영).
// 성적 뉘앙스 없이: 몸매가 아니라 옷과 자세로 사람을 보여 준다 (PLAN 수위 기준).
// 실루엣의 표지 (이세벨 = 원통 관·붉은 층층 옷, 밧세바·미갈 = 키트 너울과 구별):
//  - 기본(처녀): 머리를 덮고 등까지 내려오는 흰 너울 + 이마의 가는 띠, 너울 밖으로 나온 한 가닥 긴 땋은 머리,
//    소박한 청색 긴 옷과 허리끈, 앞에 모은 손
//  - queen(왕후): 작은 계단 톱니가 둘린 금관(5:1 "왕후의 예복") + 관 뒤로 허리까지 늘어진 얇은 너울, 등까지 내린 머리,
//    금 목걸이, 세로 주름이 진 자색·청색 예복과 금 밑단, 크게 늘어진 소매와 팔찌
//  - 키가 조금 작다 (0.96), 등이 곧다
//
// 옷 ("outfit": {"esther": "queen"}):
//  - maiden (기본) : 위의 처녀 차림. 되돌릴 때 이 이름.
//  - queen          : 왕후의 예복과 관 (2:17 이후, 5:1)
import type { CharacterDef } from './index';
import { ARM_DOWN, BACK_ARM, FACE_WOMAN, LEGS_SLIM, TORSO_WOMAN } from './_parts.ts';

// ── 머리 (hair 부위) ─────────────────────────────
/** 처녀: 머리를 덮어 등까지 내려오는 흰 너울 + 이마 띠 + 너울 밖으로 나온 땋은 머리 */
const HEAD_MAIDEN = `
  <path class="etq-hair" d="M80 52 C76 64 76 78 80 90 C82 104 82 118 84 130 L90 128 C88 116 88 102 88 90 C86 78 86 64 88 54 Z"/>
  <path class="detail" d="M80 66 l7 -2 M80 76 l8 -2 M81 86 l7 -2 M82 96 l7 -2 M83 106 l6 -2 M84 116 l5 -2" fill="none" stroke-width="0.8"/>
  <path class="etq-veil" d="M99 10 C84 9 72 19 69 36 C66 56 68 76 66 98 C64 124 62 150 66 180 C72 174 78 174 82 178 C82 152 82 126 84 104 C84 94 84 86 86 78 C82 70 81 60 84 50 C88 39 96 31 109 29 C115 28 120 30 124 34 C121 20 112 10 99 10 Z"/>
  <path class="etq-band" d="M84 36 C96 30 110 28 124 31 L124 35 C110 32 96 34 85 40 Z"/>
  <path class="detail" d="M74 60 Q72 110 72 168 M80 80 Q78 120 78 172" fill="none" stroke-width="0.8"/>`;
/** 왕후: 등까지 내린 머리 + 계단 톱니 금관 + 관 뒤로 허리까지 늘어진 얇은 너울 */
const HEAD_QUEEN = `
  <path class="etq-veil etq-veil--sheer" d="M82 28 C70 44 64 72 62 104 C60 140 58 180 60 214 C66 210 72 210 76 214 C78 176 80 140 84 108 C86 84 88 60 92 36 Z"/>
  <path class="etq-hair" d="M100 16 C86 15 76 23 73 36 C70 50 70 66 72 82 C72 100 74 118 78 134 L88 132 C86 116 86 98 86 84 C85 70 85 58 88 48 C92 38 100 32 112 32 C118 32 122 34 125 37 C123 24 113 16 100 16 Z"/>
  <path class="detail" d="M76 70 Q76 100 80 128 M82 66 Q82 96 84 126" fill="none" stroke-width="0.8"/>
  <path class="etq-gold" d="M80 34 L78 14 L83 14 L83 10 L89 10 L89 14 L95 13 L95 8 L101 8 L101 13 L107 13 L107 8 L113 8 L113 13 L119 14 L119 10 L124 11 L124 31 C110 27 94 28 80 34 Z"/>
  ${[88, 98, 108, 118].map((x) => `<circle class="etq-gem" cx="${x}" cy="${x === 88 ? 27 : 25}" r="1.7"/>`).join('')}
  <circle class="etq-gold" cx="95" cy="66" r="2.4"/>`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 처녀: 소박한 청색 긴 옷 + 허리끈 + 밑단 줄 */
const MAIDEN = `
  <path class="etq-robe" d="M86 100 C92 95 100 95 106 98 C112 101 118 106 124 112 C131 120 132 132 125 143 C121 150 118 158 118 168 C122 182 128 200 131 222 C135 262 140 330 146 392 Q135 397 124 392 Q113 398 102 392 Q91 397 80 392 C78 340 76 280 76 232 C76 212 78 196 82 180 C85 166 86 152 84 138 C82 124 81 112 82 106 C83 103 84 101 86 100 Z"/>
  <path class="etq-sash" d="M84 164 Q102 171 121 165 L121 172 Q102 178 84 171 Z"/>
  <path class="etq-sash" d="M100 172 L104 172 L106 212 L102 216 L98 212 Z"/>
  <path class="etq-hemline" d="M80 380 Q92 385 104 381 Q118 386 145 380" fill="none" stroke-width="1.6"/>
  <path class="detail" d="M92 220 Q92 300 94 376 M116 222 Q128 300 134 376" fill="none" stroke-width="0.9"/>`;
/** 왕후: 세로 주름 예복 + 금 목걸이 + 금 밑단 + 뒤로 늘어진 겉옷 */
const QUEEN = `
  <path class="etq-mantle" d="M88 94 C76 100 70 116 68 140 C64 190 64 260 62 330 C62 360 62 380 64 396 Q76 400 88 396 C88 340 88 270 90 210 C92 160 94 124 98 100 Z"/>
  <path class="etq-royal" d="M86 100 C92 95 100 95 106 98 C112 101 118 106 124 112 C131 120 132 132 125 143 C121 150 118 158 118 168 C122 182 130 200 134 222 C140 262 146 330 152 394 Q138 400 124 394 Q112 400 100 394 Q88 399 78 394 C76 340 76 280 76 232 C76 212 78 196 82 180 C85 166 86 152 84 138 C82 124 81 112 82 106 C83 103 84 101 86 100 Z"/>
  <path class="detail" d="M88 200 Q86 300 88 388 M96 200 Q96 300 100 390 M106 200 Q110 300 114 390 M116 200 Q124 300 130 390 M124 204 Q134 300 142 390" fill="none" stroke-width="0.8"/>
  <path class="etq-gold" d="M78 382 Q92 388 104 383 Q122 389 152 382 L152 393 Q122 400 104 394 Q92 399 78 393 Z"/>
  <path class="etq-gold" d="M84 164 Q102 171 121 165 L121 173 Q102 179 84 172 Z"/>
  <path class="etq-gold" d="M88 98 C96 94 106 94 114 100 C116 104 116 108 115 111 C106 115 96 115 88 110 C86 106 86 102 88 98 Z"/>
  ${[92, 100, 108].map((x) => `<circle class="etq-gem" cx="${x}" cy="${113 + (x === 100 ? 1 : 0)}" r="1.5"/>`).join('')}`;

// ── 앞팔 ──────────────────────────────────────
const ARM_MAIDEN = `${ARM_DOWN}<path class="etq-robe" d="M93 104 C92 97 98 94 104 95 C110 96 113 101 113 110 C113 118 112 126 111 132 C105 135 99 135 95 132 C94 122 93 112 93 104 Z"/>`;
/** 왕후: 크게 늘어진 소매 + 팔찌 */
const ARM_QUEEN = `${ARM_DOWN}
  <path class="etq-royal" d="M92 102 C92 96 98 93 104 94 C111 95 114 101 114 110 C114 126 113 142 113 156 C116 172 120 190 120 206 C114 212 104 212 98 206 C98 188 96 168 96 150 C95 132 93 116 92 102 Z"/>
  <path class="etq-gold" d="M98 202 C104 206 114 206 120 202 L120 208 C114 213 104 213 98 208 Z"/>
  <path class="etq-gold" d="M115 214 C118 213 121 214 123 216 L122 219 C120 217 117 217 115 218 Z"/>`;

const esther: CharacterDef = {
  id: 'esther',
  name: '에스더',
  traits: '옆모습. 기본(maiden): 머리를 덮고 등까지 내려오는 흰 너울과 이마 띠, 너울 밖으로 나온 땋은 머리, 소박한 청색 긴 옷과 허리끈. queen: 작은 계단 톱니 금관과 허리까지 늘어진 얇은 너울, 등까지 내린 머리, 금 목걸이, 세로 주름 예복과 금 밑단, 뒤로 늘어진 겉옷, 크게 늘어진 소매와 팔찌',
  faces: 'right',
  height: 0.96,
  tint: '#3d5f9a',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 100],
      cloth: [104, 150],
      hair: [80, 50],
    },
    outfits: {
      maiden: { markup: MAIDEN, parts: { hair: HEAD_MAIDEN, legs: LEGS_SLIM, armR: ARM_MAIDEN, armL: BACK_ARM } },
      queen: { markup: QUEEN, parts: { hair: HEAD_QUEEN, legs: LEGS_SLIM, armR: ARM_QUEEN, armL: BACK_ARM } },
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_WOMAN}
        <g data-part="cloth">${MAIDEN}</g>
        <g data-part="head">
          <g transform="matrix(0.86 0 0 0.86 15 16)">
            ${FACE_WOMAN}
            <g data-part="hair">${HEAD_MAIDEN}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_MAIDEN}</g>
      </g>`,
  },
};

export default esther;
