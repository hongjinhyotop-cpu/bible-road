// 나아만 — 아람 왕의 군대장관, 큰 용사이나 문둥병자 (왕하 5).
// 9막 A급 kgs2-5-naaman(왕하 5 「요단에 일곱 번」)에서 키트 임시 그림을 공들여 다시 그림.
// 실루엣의 표지 (이스라엘 왕·병사와 구별):
//  - 깃털 술이 솟은 아람의 놋투구, 다부진 몸, 무릎까지 오는 비늘 갑옷과 넓은 놋 허리띠, 등 뒤로 늘어진 붉은 겉옷
//  - 허리에 찬 긴 칼을 앞손으로 누름
//  - 얼굴과 손등의 흰 얼룩 — 문둥병(차라앗, 5:1 "저는 큰 용사나 문둥병자더라"). 갑옷이 가리지 못하는 곳에만
//
// 옷 (장면 맨 위 "outfit": {"naaman": "river"} 또는 beat의 "outfit"):
//  - general (기본) : 장군. 위의 차림 그대로 (흰 얼룩 있음).
//  - river          : 요단에 들어갈 때 — 투구·갑옷·칼을 벗은 맨머리, 짧은 머리와 수염, 무릎 위 흰 베 속옷 하나. 흰 얼룩이 그대로 (5:14)
//  - healed         : 일곱 번 잠긴 뒤 — 같은 베 속옷, 얼룩이 없어지고 살빛이 따뜻하게 밝음 "어린아이의 살 같아서" (5:14)
//  - restored       : 다시 장군 차림, 얼룩 없음 (5:15 이후)
import type { CharacterDef } from './index';
import { ARM_DOWN, BACK_ARM, BEARD_SHORT, FACE_MAN, LEGS_STOCKY, TORSO_STOCKY } from './_parts.ts';

// ── 머리 (hair 부위 — 얼굴 좌표, 머리를 따라 움직임) ────────────
/** 얼굴의 흰 얼룩 */
const FACE_SPOTS = `
  <ellipse class="nm-spot" cx="104" cy="58" rx="4" ry="2.6"/><ellipse class="nm-spot" cx="96" cy="66" rx="2.6" ry="1.8"/>
  <ellipse class="nm-spot" cx="112" cy="70" rx="2.2" ry="1.4"/><ellipse class="nm-spot" cx="90" cy="48" rx="2" ry="2.6"/>`;
/** 아람의 놋투구: 둥근 정수리, 목가리개, 위로 솟은 깃털 술 */
const HELMET = `
  <path class="nm-bronze" d="M76 46 C74 28 86 14 102 13 C116 12 126 22 127 36 C118 32 98 32 80 40 L82 56 C80 60 78 62 74 62 C72 56 73 50 76 46 Z"/>
  <path class="nm-bronze" d="M77 38 C92 30 112 29 128 34 L128 40 C112 36 92 37 78 45 Z"/>
  <path class="nm-bronze" d="M74 56 L84 54 L86 78 C82 80 76 80 72 76 Z"/>
  <path class="nm-plume" d="M100 14 C96 4 90 -4 80 -8 C84 -2 86 4 86 10 C80 4 72 2 64 4 C72 8 78 12 84 18 Z"/>
  <path class="detail" d="M84 22 Q100 18 120 24" fill="none" stroke-width="0.7"/>`;
/** 맨머리: 짧게 깎은 검은 머리 */
const BARE = `<path d="M100 15 C87 13 77 22 75 36 C74 46 75 56 78 64 C80 60 83 58 86 60 C84 52 85 45 89 40 C94 34 101 31 111 30 C116 30 120 31 123 33 C120 21 111 15 100 15 Z"/>`;
/** 고쳐진 얼굴: 뺨의 따뜻한 빛 */
const FRESH = `<ellipse class="nm-fresh" cx="104" cy="62" rx="9" ry="7" opacity="0.6"/>`;
const HEAD_GENERAL = `${HELMET}${BEARD_SHORT}${FACE_SPOTS}`;
const HEAD_RIVER = `${BARE}${BEARD_SHORT}${FACE_SPOTS}`;
const HEAD_HEALED = `${BARE}${BEARD_SHORT}${FRESH}`;
const HEAD_RESTORED = `${HELMET}${BEARD_SHORT}`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 등 뒤로 늘어진 붉은 겉옷 */
const CLOAK = `<path class="nm-cloak" d="M86 88 C74 94 66 112 64 138 C61 176 62 222 64 262 C65 280 63 296 60 308 Q72 314 84 308 C84 270 86 220 88 180 C89 140 90 110 94 94 Z"/>`;
/** 비늘 갑옷 (무릎까지) + 놋 어깨 + 넓은 허리띠 */
const scales = Array.from({ length: 9 }, (_, row) => Array.from({ length: 5 }, (_, i) =>
  `<path d="M${82 + i * 9 + (row % 2) * 4.5} ${108 + row * 18} q4.5 7 9 0"/>`).join('')).join('');
const ARMOR = `
  ${CLOAK}
  <path class="nm-scale" d="M80 96 C88 90 98 88 106 89 C114 90 120 94 124 100 C130 108 132 118 130 130 C128 142 124 154 122 168 C126 196 130 230 132 262 C133 272 134 280 134 288 Q124 293 114 289 Q104 294 94 289 Q84 293 76 288 C76 262 77 236 79 212 C80 196 80 184 80 170 C76 150 74 126 76 110 C77 104 78 100 80 96 Z"/>
  <g class="detail" fill="none" stroke-width="0.7">${scales}</g>
  <path class="nm-bronze" d="M84 90 C94 84 110 84 122 92 C126 98 128 104 128 110 C116 104 98 102 84 106 C82 100 82 94 84 90 Z"/>
  <path class="nm-bronze" d="M77 168 Q102 176 126 168 L126 182 Q102 191 77 182 Z"/>
  <circle class="nm-plume" cx="102" cy="176" r="3"/>`;
/** 흰 베 속옷 (무릎 위) */
const LINEN = `
  <path class="nm-linen" d="M82 160 Q102 166 124 160 C126 190 130 220 132 246 Q122 252 110 248 Q98 253 86 248 Q80 250 76 246 C77 220 79 190 82 160 Z"/>
  <path class="detail" d="M80 168 Q102 174 124 168" fill="none" stroke-width="2"/>`;

// ── 앞팔 ──────────────────────────────────────
/** 손등의 흰 얼룩 (ARM_DOWN 손 위) */
const HAND_SPOTS = `<ellipse class="nm-spot" cx="122" cy="214" rx="2.4" ry="1.6"/><ellipse class="nm-spot" cx="126" cy="226" rx="2" ry="1.4"/><ellipse class="nm-spot" cx="110" cy="150" rx="2.4" ry="3"/>`;
/** 허리에 찬 긴 칼 (자루를 앞손으로 누름) */
const SWORD = `
  <path class="nm-bronze" d="M128 186 L134 184 L137 190 L131 192 Z"/><path class="nm-bronze" d="M124 192 L142 188 L143 192 L125 196 Z"/>
  <path d="M132 194 L137 193 L146 268 L142 274 L138 268 Z"/>`;
const ARM_GENERAL = `${SWORD}${ARM_DOWN}${HAND_SPOTS}`;
const ARM_RESTORED = `${SWORD}${ARM_DOWN}`;
const ARM_RIVER = `${ARM_DOWN}${HAND_SPOTS}`;
const ARM_HEALED = `${ARM_DOWN}<ellipse class="nm-fresh" cx="120" cy="214" rx="5" ry="10" opacity="0.5"/>`;

const naaman: CharacterDef = {
  id: 'naaman',
  name: '나아만',
  traits: '옆모습. 깃털 술이 솟은 놋투구와 목가리개, 다부진 몸, 무릎까지 오는 비늘 갑옷·놋 어깨·넓은 놋 허리띠, 등 뒤의 붉은 겉옷, 허리에 찬 긴 칼, 얼굴과 손등의 흰 얼룩(문둥병). river: 맨머리·흰 베 속옷(얼룩 그대로). healed: 얼룩 없이 살빛이 따뜻함. restored: 다시 장군 차림, 얼룩 없음',
  faces: 'right',
  height: 1.04,
  tint: '#8a3a30',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 100],
      cloth: [100, 150],
      hair: [100, 50],
    },
    outfits: {
      general: { markup: ARMOR, parts: { hair: HEAD_GENERAL, armR: ARM_GENERAL } },
      river: { markup: LINEN, parts: { hair: HEAD_RIVER, armR: ARM_RIVER } },
      healed: { markup: LINEN, parts: { hair: HEAD_HEALED, armR: ARM_HEALED } },
      restored: { markup: ARMOR, parts: { hair: HEAD_RESTORED, armR: ARM_RESTORED } },
    },
    markup: `
      <g data-part="legs">${LEGS_STOCKY}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_STOCKY}
        <g data-part="cloth">${ARMOR}</g>
        <g data-part="head">
          <g transform="matrix(0.9 0 0 0.9 11 10)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD_GENERAL}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_GENERAL}</g>
      </g>`,
  },
};

export default naaman;
