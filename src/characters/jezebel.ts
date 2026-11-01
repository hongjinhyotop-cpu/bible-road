// 이세벨 — 시돈 사람의 왕 엣바알의 딸, 아합의 아내 (왕상 16:31 – 왕하 9:37).
// 9막 A급 kgs1-21-naboth에서 키트 임시 그림을 공들여 다시 그림.
//  "왕이 이제 이스라엘 나라를 다스리시나이까" (왕상 21:7) — 아합보다 키가 커 보이는 왕비.
//  "눈을 그리고 머리를 꾸미고 창에서 바라보다가" (왕하 9:30)
// 실루엣의 표지 (밧세바 · 미갈 = 너울, 다른 여인들과 구별):
//  - 위가 평평한 높은 원통 관 (시돈·페니키아 왕실 차림) + 관 뒤로 등까지 늘어진 얇은 너울
//  - 관 아래로 층층이 땋아 내린 검은 머리, 큰 고리 귀걸이, 길게 그린 눈
//  - 목을 덮는 넓은 금 목걸이, 세 층으로 겹친 술 달린 붉은 긴 옷, 곧게 선 등
//  - 앞손을 반쯤 들어 손가락에 인장 반지 — 아합의 이름으로 편지를 쓰고 그 인을 친 손 (21:8)
import type { CharacterDef } from './index';
import { BACK_ARM, FACE_WOMAN, LEGS_SLIM, TORSO_WOMAN } from './_parts.ts';

// ── 머리 (hair 부위) ─────────────────────────────
/** 층층이 땋아 내린 머리: 관 아래 목덜미에서 등까지 */
const BRAIDS = `
  <path class="jz-hair" d="M78 36 C72 52 70 70 70 90 C70 112 68 132 70 150 L80 152 C80 132 82 110 84 92 C82 78 82 62 86 50 C88 44 92 40 96 38 Z"/>
  <path class="jz-hair" d="M84 42 C80 60 80 80 82 100 C83 116 84 128 88 140 L94 136 C90 122 89 108 89 94 C88 80 88 62 91 46 Z"/>
  <path class="detail" d="M71 60 h10 M70 72 h12 M70 84 h12 M70 96 h13 M70 108 h12 M70 120 h11 M70 132 h11 M70 144 h10" fill="none" stroke-width="0.8"/>`;
/** 위가 평평한 높은 원통 관 + 띠 장식 + 뒤로 늘어진 얇은 너울 */
const POLOS = `
  <path class="jz-robe" d="M80 22 C70 40 64 70 62 104 C60 132 58 160 60 186 L68 182 C68 150 72 116 78 84 C82 62 86 42 90 28 Z" opacity="0.75"/>
  <path class="jz-gold" d="M80 34 L82 -4 C96 -8 112 -8 124 -4 L124 32 C110 27 94 28 80 34 Z"/>
  <path class="jz-gold" d="M78 32 C94 26 110 25 126 29 L126 36 C110 32 94 33 79 39 Z"/>
  <path class="detail" d="M83 6 C96 2 112 2 123 5 M83 16 C96 12 112 12 123 15 M83 25 C96 21 112 21 123 24" fill="none" stroke-width="0.8"/>
  ${[88, 100, 112, 121].map((x) => `<circle class="jz-gem" cx="${x}" cy="${x < 96 ? 33.2 : 31.6}" r="1.7"/>`).join('')}`;
/** 큰 고리 귀걸이 + 그린 눈 (눈꼬리를 길게) */
const FACE_PAINT = `
  <circle class="jz-gold" cx="96" cy="66" r="4.6" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path class="detail" d="M108 45 C111 43 116 43 120 44 L124 42" fill="none" stroke-width="1.3"/>`;
const HEAD = `${BRAIDS}${POLOS}${FACE_PAINT}`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 세 층으로 겹친 술 달린 붉은 긴 옷 + 넓은 금 목걸이 + 허리띠 */
const tier = (y: number, w0: number, w1: number) => `
  <path class="jz-robe" d="M${100 - w0} ${y} C${100 - w0} ${y} ${100 + w0} ${y - 3} ${100 + w0 + 6} ${y} L${100 + w1 + 14} ${y + 64} Q${108} ${y + 70} ${100 - w1} ${y + 64} Z"/>
  <path class="jz-gold" d="M${100 - w1} ${y + 60} Q108 ${y + 66} ${100 + w1 + 14} ${y + 60} L${100 + w1 + 14} ${y + 64} Q108 ${y + 70} ${100 - w1} ${y + 64} Z"/>
  <path class="detail" d="${Array.from({ length: 9 }, (_, i) => `M${(100 - w1 + i * ((w1 * 2 + 14) / 8)).toFixed(1)} ${y + 66} l0 5`).join(' ')}" fill="none" stroke-width="0.9"/>`;
const ROBE = `
  <path class="jz-robe" d="M86 100 C92 95 100 95 106 98 C112 101 118 106 124 112 C131 120 132 132 125 143 C121 150 118 158 118 168 C122 182 128 200 131 222 C135 262 140 330 146 392 Q135 397 124 392 Q113 398 102 392 Q91 397 80 392 C78 340 76 280 76 232 C76 212 78 196 82 180 C85 166 86 152 84 138 C82 124 81 112 82 106 C83 103 84 101 86 100 Z"/>
  ${tier(206, 22, 26)}${tier(262, 26, 30)}${tier(320, 30, 34)}
  <path class="jz-gold" d="M84 164 Q102 171 121 165 L121 174 Q102 180 84 173 Z"/>
  <path class="jz-gold" d="M86 98 C94 94 106 94 116 100 C120 104 122 110 121 116 C110 122 96 122 86 116 C84 110 84 104 86 98 Z"/>
  <path class="detail" d="M88 104 C98 110 110 110 120 106 M87 110 C98 116 110 116 121 112" fill="none" stroke-width="0.8"/>
  ${[92, 100, 108, 116].map((x) => `<circle class="jz-gem" cx="${x}" cy="${118 + (x === 100 || x === 108 ? 1 : 0)}" r="1.6"/>`).join('')}`;

// ── 앞팔: 반쯤 든 손, 인장 반지 ──────────────────
const ARM_SEAL = `
  <path d="M92 106 C90 99 97 95 104 96 C110 97 114 102 114 110 C114 124 114 136 116 146 C122 144 129 140 134 134 C136 128 141 124 146 126 C150 128 150 134 147 138 C144 144 138 148 132 152 C124 158 114 162 106 162 C100 162 97 156 96 148 C95 134 93 118 92 106 Z"/>
  <path class="jz-robe" d="M90 98 C99 92 112 95 116 106 C118 118 118 130 117 142 C110 146 102 146 96 144 C94 128 92 112 90 98 Z"/>
  <path class="jz-gold" d="M96 138 C104 141 111 140 117 136 L117 143 C110 147 103 147 96 145 Z"/>
  <circle class="jz-seal" cx="144" cy="130" r="3.2"/>
  <circle class="jz-gem" cx="144" cy="130" r="1.3"/>`;

const jezebel: CharacterDef = {
  id: 'jezebel',
  name: '이세벨',
  traits: '옆모습. 위가 평평한 높은 원통 금관(보석 띠)과 등까지 늘어진 붉은 너울, 관 아래 층층이 땋아 내린 검은 머리, 큰 고리 귀걸이·길게 그린 눈, 넓은 금 목걸이, 세 층으로 겹친 술 달린 붉은 긴 옷, 반쯤 든 앞손의 인장 반지',
  faces: 'right',
  height: 1,
  tint: '#8a2a2a',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 100],
      cloth: [104, 150],
      hair: [86, 60],
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_WOMAN}
        <g data-part="cloth">${ROBE}</g>
        <g data-part="head">
          <g transform="matrix(0.86 0 0 0.86 15 16)">
            ${FACE_WOMAN}
            <g data-part="hair">${HEAD}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_SEAL}</g>
      </g>`,
  },
};

export default jezebel;
