// 베냐민 사람 모르드개 — 에스더의 사촌이자 길러 준 아버지, 대궐 문에 앉은 사람 (에 2–10).
// 10막 A급 est-2-queen · est-4-perish · est-6-sleepless에서 키트 임시 그림을 공들여 다시 그림 (같은 파일 이름 → 에스더 모든 장면에 반영).
// 실루엣의 표지 (하만 = 높은 펠트 모자·짧은 겉옷, 아하수에로 = 톱니 관과 구별):
//  - 머리를 감싼 두건 + 이마의 띠 + 등으로 늘어진 두건 끝
//  - 가슴까지 오는 넓은 수염 (희끗한 줄)
//  - 발목까지 오는 긴 옷 위에 걸친 겉옷, 겉옷 귀퉁이의 술(민 15:38) — 바사 궁정에서도 유다 사람의 옷
//  - 허리띠에 꽂은 먹통(서기관의 붓 통) — 대궐 문에 앉아 일을 보던 사람
//
// 옷 ("outfit": {"mordecai": "sackcloth"}):
//  - official (기본) : 위의 차림. 되돌릴 때 이 이름.
//  - sackcloth       : 옷을 찢고 굵은 베를 입고 재를 무릅씀 (4:1). 두건을 벗은 헝클어진 맨머리에 재, 자루 같은 베옷과 새끼 띠,
//                      어깨에 찢긴 겉옷 자락, 빈손
//  - royal           : 왕복과 관 (6:11 · 8:15 "청색 백색의 조복을 입고 큰 금면류관을 쓰고 자색 가는 베 겉옷"). 금관, 청색 긴 옷에
//                      흰 띠, 자색 겉옷과 금 테두리
import type { CharacterDef } from './index';
import { ARM_DOWN, BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';

// ── 머리 (hair 부위) ─────────────────────────────
/** 가슴까지 오는 넓은 수염 (희끗한 줄) */
export const MORDECAI_BEARD = `
  <path class="etm-beard" d="M95 54 C103 59 111 62 119 64 L123 67 C127 78 128 92 126 106 C124 116 118 122 110 122 C104 118 98 108 95 96 C92 82 92 66 95 54 Z"/>
  <path class="etm-gray" d="M104 74 Q110 96 108 116 M115 74 Q121 94 118 112" fill="none" stroke-width="1.2"/>`;
/** 머리를 감싼 두건 + 띠 + 등으로 늘어진 끝 */
const WRAP = `
  <path class="etm-wrap" d="M99 8 C85 7 74 15 70 29 C68 39 69 47 73 53 C78 48 83 44 89 40 C97 34 109 31 123 33 C124 23 118 13 110 10 C106 8 102 8 99 8 Z"/>
  <path class="etm-wrap" d="M73 46 C67 60 64 80 62 100 C60 116 60 130 62 140 C66 136 70 134 75 136 C75 120 77 102 80 86 C82 74 84 64 85 56 C81 52 77 49 73 46 Z"/>
  <path class="etm-band" d="M71 40 C84 32 104 28 124 31 L124 37 C104 34 86 38 73 47 Z"/>
  <path class="detail" d="M80 18 Q90 13 106 13 M75 28 Q90 21 113 21" fill="none" stroke-width="0.8"/>`;
const HEAD = `${WRAP}${MORDECAI_BEARD}`;
/** 굵은 베: 두건 없이 헝클어진 맨머리 + 재 */
const HEAD_ASH = `
  <path class="etm-hair" d="M100 14 C86 13 76 21 73 34 C70 46 70 58 72 70 C70 78 72 86 76 90 C80 88 84 84 86 78 C84 68 84 56 87 46 C91 36 99 31 111 31 C118 31 122 33 125 36 C123 22 113 14 100 14 Z"/>
  <path class="etm-hair" d="M74 30 L66 26 L72 36 Z M80 20 L74 12 L84 18 Z M92 14 L90 6 L98 13 Z"/>
  <path class="etm-ash" d="M80 26 C88 17 102 14 114 18 C119 20 122 23 124 27 C114 23 100 22 88 27 C85 28 82 28 80 26 Z"/>
  <circle class="etm-ash" cx="90" cy="17" r="1.6"/><circle class="etm-ash" cx="104" cy="14" r="1.4"/><circle class="etm-ash" cx="84" cy="23" r="1.2"/>
  ${MORDECAI_BEARD}`;
/** 왕복: 큰 금면류관 */
export const MORDECAI_HEAD_ROYAL = `
  <path class="etm-hair" d="M100 16 C86 15 76 23 73 36 C70 48 71 60 74 70 C76 76 80 78 85 76 C84 66 84 56 87 47 C91 37 99 32 111 32 C118 32 122 34 125 37 C123 24 113 16 100 16 Z"/>
  <path class="etm-gold" d="M77 34 L74 6 L82 14 L88 0 L95 12 L102 -2 L109 12 L116 0 L121 14 L128 6 L126 31 C110 27 92 28 77 34 Z"/>
  <path class="etm-band" d="M76 24 C92 18 110 17 127 21 L127 28 C110 24 92 25 77 31 Z"/>
  ${[86, 98, 110, 121].map((x) => `<circle class="etm-gem" cx="${x}" cy="${x === 86 ? 26.6 : 24.4}" r="1.9"/>`).join('')}
  ${MORDECAI_BEARD}`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 발목까지 오는 긴 옷 + 걸친 겉옷 + 술 + 먹통 */
const ROBE = `
  <path class="etm-robe" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 210 131 262 136 320 C139 350 141 372 143 390 Q132 395 120 391 Q108 396 96 391 Q86 395 77 390 C77 350 78 300 79 262 C80 230 81 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="detail" d="M90 200 Q88 300 90 376 M112 200 Q122 300 132 376" fill="none" stroke-width="0.9"/>
  <path class="etm-mantle" d="M92 86 C78 90 70 102 66 122 C62 152 64 200 64 250 C64 290 62 320 60 344 Q70 350 80 344 C82 300 84 250 86 204 C88 160 92 124 100 100 Z"/>
  <path class="etm-mantle" d="M86 90 C98 84 114 86 122 98 C124 106 124 114 122 120 C118 136 114 152 112 170 L98 172 C96 152 92 132 88 116 C86 106 85 96 86 90 Z"/>
  <path class="etm-stripe" d="M60 334 Q70 340 80 334 L80 340 Q70 346 60 340 Z"/>
  <path class="etm-tassel" d="M62 346 l-2 13 M70 349 l0 13 M78 346 l2 13"/>
  <path class="etm-sash" d="M80 172 Q100 179 121 173 L121 182 Q100 189 80 181 Z"/>
  <!-- 먹통 (붓 통) -->
  <rect class="etm-inkhorn" x="111" y="166" width="5" height="30" rx="2" transform="rotate(-14 113 180)"/>`;

/** 굵은 베옷: 자루 같은 곧은 옷 + 굵은 바늘땀 + 새끼 띠 + 찢긴 겉옷 자락 */
const SACKCLOTH = `
  <path class="etm-sack" d="M82 97 C89 92 96 90 102 91 C109 92 113 95 116 100 C122 106 125 114 124 124 C123 136 120 146 118 156 C117 168 118 178 120 188 C124 224 128 290 131 360 L132 386 Q120 391 106 387 Q92 392 79 387 L76 385 C75 338 75 288 76 248 C77 220 78 200 80 178 C76 158 75 136 76 120 C77 110 79 102 82 97 Z"/>
  <path class="etm-stitch" d="M86 106 L84 382 M118 106 L127 382 M80 248 L128 244 M78 320 L130 316"/>
  <path class="etm-rope" d="M79 180 Q100 188 122 181 L122 186 Q100 194 79 186 Z"/>
  <path class="etm-rope" d="M102 186 L99 214 L102 216 L105 188 Z"/>
  <path class="etm-mantle" d="M88 88 C78 94 72 108 70 128 C68 152 70 176 68 200 L74 192 L76 206 L82 194 L86 204 L88 184 C90 158 92 128 98 98 Z"/>`;

/** 왕복: 청색 긴 옷 + 흰 띠 + 자색 겉옷과 금 테두리 */
const ROYAL = `
  <path class="etm-royal" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 210 131 262 136 320 C139 350 141 372 143 390 Q132 395 120 391 Q108 396 96 391 Q86 395 77 390 C77 350 78 300 79 262 C80 230 81 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="etm-white" d="M100 186 L106 186 L114 390 L106 391 Z"/>
  <path class="etm-white" d="M77 378 Q86 383 96 379 Q108 384 120 379 Q132 383 142 378 L143 390 Q132 395 120 391 Q108 396 96 391 Q86 395 77 390 Z"/>
  <path class="etm-purple" d="M92 86 C76 90 68 104 64 126 C60 160 62 220 60 290 C59 320 58 344 58 362 Q70 368 82 362 C82 320 84 260 86 210 C88 162 92 124 100 100 Z"/>
  <path class="etm-gold" d="M58 354 Q70 360 82 354 L82 362 Q70 368 58 362 Z"/>
  <path class="etm-gold" d="M100 100 C92 124 88 162 86 210 C84 260 82 320 82 362 L78 362 C78 320 80 260 82 210 C84 160 88 122 96 98 Z"/>
  <path class="etm-white" d="M80 172 Q100 179 121 173 L121 182 Q100 189 80 181 Z"/>
  <path class="etm-gold" d="M86 96 C96 91 108 91 117 98 C119 102 119 106 118 109 C108 113 96 113 87 108 C85 104 85 100 86 96 Z"/>`;

const SLEEVE = `<path class="etm-robe" d="M93 104 C92 97 98 94 104 95 C110 96 113 101 113 110 C113 118 112 126 111 132 C105 135 99 135 95 132 C94 122 93 112 93 104 Z"/>`;
const ARM_OFFICIAL = `${ARM_DOWN}${SLEEVE}`;
const ARM_SACK = `${ARM_DOWN}<path class="etm-sack" d="M93 104 C92 97 98 94 104 95 C110 96 113 101 113 110 C113 118 112 126 111 132 C105 135 99 135 95 132 C94 122 93 112 93 104 Z"/>`;
const ARM_ROYAL = `${ARM_DOWN}<path class="etm-royal" d="M93 104 C92 97 98 94 104 95 C110 96 113 101 113 110 C113 122 112 134 111 142 C105 146 99 146 95 142 C94 128 93 114 93 104 Z"/>
  <path class="etm-gold" d="M95 138 C101 141 107 141 111 138 L111 144 C106 147 100 147 95 144 Z"/>`;

const mordecai: CharacterDef = {
  id: 'mordecai',
  name: '모르드개',
  traits: '옆모습. 머리를 감싼 두건(이마의 띠, 등으로 늘어진 끝), 가슴까지 오는 넓은 수염(희끗한 줄), 발목까지 오는 긴 옷 위에 걸친 겉옷과 귀퉁이 술, 허리띠에 꽂은 먹통. sackcloth: 헝클어진 맨머리에 재, 굵은 바늘땀의 자루 같은 베옷과 새끼 띠, 찢긴 겉옷 자락. royal: 큰 금면류관, 청색 긴 옷에 흰 띠, 자색 겉옷과 금 테두리',
  faces: 'right',
  height: 1.0,
  tint: '#4a5468',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 100],
      cloth: [100, 150],
      hair: [80, 60],
    },
    outfits: {
      official: { markup: ROBE, parts: { hair: HEAD, legs: LEGS_SLIM, armR: ARM_OFFICIAL, armL: BACK_ARM } },
      sackcloth: { markup: SACKCLOTH, parts: { hair: HEAD_ASH, legs: LEGS_SLIM, armR: ARM_SACK, armL: BACK_ARM } },
      royal: { markup: ROYAL, parts: { hair: MORDECAI_HEAD_ROYAL, legs: LEGS_SLIM, armR: ARM_ROYAL, armL: BACK_ARM } },
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g data-part="cloth">${ROBE}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 14)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_OFFICIAL}</g>
      </g>`,
  },
};

export default mordecai;
