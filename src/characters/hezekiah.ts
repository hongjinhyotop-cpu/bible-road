// 히스기야 — 아하스의 아들, 남유다 열셋째 왕 (왕하 18–20). 스물다섯에 즉위, 이십구 년.
// 9막 A급 kgs2-18-19-hezekiah(왕하 18–19 「편지를 펴 놓고」)에서 키트 임시 그림을 공들여 다시 그림.
// 실루엣의 표지 (솔로몬 = 다섯 봉우리 높은 관·수염 없음, 다윗 = 낮은 금관·수금, 요시야 = 백합 세 봉우리 관과 구별):
//  - 성벽 모양의 관(네모난 톱니가 둘린 관) — 무너진 성벽을 보수하고 망대를 높인 왕 (대하 32:5, 사 22:10).
//  - 목덜미에서 둥글게 말린 머리와 가슴에 닿는 넓은 수염
//  - 푸른 긴 옷의 네 귀퉁이 술(청색 끈, 민 15:38) — "여호와께서 모세에게 명하신 계명을 지켰더라" (18:6)
//  - 앞손에 든 봉한 두루마리 — 산헤립의 편지를 받아 성전에 펴 놓은 왕 (19:14)
//
// 옷 ("outfit": {"hezekiah": "sackcloth"}):
//  - king (기본) : 위의 차림. 옷을 갈아입힌 뒤 되돌릴 때 이 이름을 쓴다.
//  - sackcloth   : 옷을 찢고 굵은 베를 입음 (19:1). 관을 벗은 맨머리에 재, 거친 자루 같은 베옷(굵은 바늘땀),
//                  찢어진 겉옷 자락이 어깨에 걸쳐 늘어짐, 빈손.
import type { CharacterDef } from './index';
import { ARM_BENT, ARM_DOWN, BACK_ARM, FACE_MAN, LEGS_STOCKY, TORSO_STOCKY } from './_parts.ts';

// ── 머리 (hair 부위 — 머리털·수염·관) ─────────────────
/** 목덜미에서 둥글게 말린 머리 + 가슴에 닿는 넓은 수염 */
const HAIR_BEARD = `
  <path d="M101 13 C88 11 77 19 74 33 C72 45 72 56 74 66 C72 72 72 78 76 84 C80 86 85 84 87 80 C85 72 84 62 86 50 C89 39 98 32 110 31 C117 31 122 33 125 36 C123 21 113 13 101 13 Z"/>
  <circle cx="77" cy="80" r="5.4"/><circle cx="84" cy="85" r="4.6"/>
  <path d="M95 54 C103 60 111 63 119 65 L123 68 C127 78 128 90 125 100 C121 108 114 112 107 112 C101 108 96 100 93 90 C90 78 90 64 95 54 Z"/>
  <path class="detail" d="M104 78 Q110 92 108 106 M114 76 Q120 90 118 104" fill="none" stroke-width="0.7"/>`;
/** 성벽 모양 관: 넓은 띠 + 네모 톱니 다섯 + 가운데 보석 */
const MURAL_CROWN = `
  <path class="hz-gold" d="M75 30 C92 24 110 23 127 28 L127 38 C110 33 92 34 76 40 Z"/>
  <path class="hz-gold" d="M76 31 L76 18 L83 17 L83 24 L89 23 L89 13 L97 12 L97 21 L103 21 L103 10 L111 10 L111 21 L117 22 L117 13 L124 14 L124 25 L127 26 L127 30 Z"/>
  <circle class="hz-tassel" cx="107" cy="31.6" r="2"/>`;
const HEAD_KING = `${HAIR_BEARD}${MURAL_CROWN}`;
/** 관을 벗은 맨머리에 뿌린 재 */
const HEAD_ASH = `${HAIR_BEARD}
  <path class="hz-ash" d="M80 24 C88 16 102 13 114 17 C118 19 121 22 123 26 C114 22 100 21 88 26 C85 27 82 27 80 24 Z"/>
  <circle class="hz-ash" cx="92" cy="16" r="1.6"/><circle class="hz-ash" cx="104" cy="13" r="1.4"/><circle class="hz-ash" cx="84" cy="22" r="1.2"/>`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 푸른 긴 옷 + 네 귀퉁이 술 + 금띠 + 어깨 겉옷 */
const ROBE = `
  <path class="hz-robe" d="M80 95 C88 90 96 88 103 89 C110 90 116 94 120 99 C127 105 131 113 130 122 C130 133 125 144 122 154 C120 164 120 174 122 184 C127 214 134 264 139 322 C142 352 144 374 146 392 Q134 397 120 393 Q106 398 92 393 Q82 397 74 392 C73 350 73 300 74 262 C75 230 77 200 80 174 C75 154 73 132 75 116 C76 106 77 100 80 95 Z"/>
  <path class="hz-gold" d="M78 176 Q102 184 125 177 L125 188 Q102 195 78 187 Z"/>
  <path class="hz-gold" d="M74 380 Q90 385 106 381 Q124 386 146 380 L146 389 Q124 394 106 390 Q90 394 74 389 Z"/>
  <path class="detail" d="M88 202 Q86 300 88 376 M112 202 Q122 300 132 376" fill="none" stroke-width="0.9"/>
  <!-- 네 귀퉁이 술 (청색 끈) -->
  <path class="hz-tassel" d="M76 389 L74 404 L78 404 L79 390 Z M144 389 L147 404 L151 403 L148 389 Z"/>
  <circle class="hz-tassel" cx="76" cy="405" r="2.2"/><circle class="hz-tassel" cx="149" cy="404" r="2.2"/>`;
const MANTLE = `
  <path class="hz-mantle" d="M88 86 C74 92 66 108 64 132 C62 170 64 230 62 300 C61 330 60 352 60 372 Q72 378 84 372 C84 320 86 250 88 200 C90 156 92 118 98 94 Z"/>
  <path class="hz-gold" d="M86 90 C96 86 108 88 116 96 L114 102 C106 95 96 94 88 97 Z"/>`;
const KING = `${ROBE}${MANTLE}`;

/** 굵은 베옷: 자루 같은 곧은 옷 + 굵은 바늘땀 + 새끼줄 띠 + 어깨에 걸린 찢긴 겉옷 자락 */
const SACKCLOTH = `
  <path class="hz-sack" d="M80 96 C88 90 96 88 103 89 C110 90 116 94 120 100 C126 106 129 114 128 124 C127 136 123 146 121 156 C120 168 121 178 123 188 C127 224 131 290 134 360 L135 378 Q122 383 108 379 Q94 384 80 379 L76 377 C75 330 75 280 76 240 C77 214 78 196 80 176 C76 156 74 134 75 118 C76 108 77 101 80 96 Z"/>
  <path class="hz-stitch" d="M84 104 L82 374 M120 104 L130 374 M80 240 L132 236 M78 312 L133 308"/>
  <path class="hz-stitch" d="M94 96 L100 112 L106 96" />
  <path class="rope" d="M79 180 Q102 188 124 181 L124 186 Q102 194 79 186 Z"/>
  <path class="rope" d="M104 186 L101 212 L104 214 L107 188 Z"/>
  <!-- 찢긴 겉옷 자락 -->
  <path class="hz-mantle" d="M86 88 C76 94 70 108 68 128 C66 152 68 176 66 200 L72 194 L74 206 L80 196 L84 204 L86 186 C88 160 90 128 96 98 Z"/>`;

// ── 앞팔 ──────────────────────────────────────
/** 봉한 두루마리를 든 손: 끈과 진흙 인장 */
const LETTER = `
  <rect class="hz-scroll" x="134" y="134" width="24" height="12" rx="5"/>
  <path class="detail" d="M140 134 L140 146 M152 134 L152 146" fill="none" stroke-width="0.7"/>
  <path class="rope" d="M146 132 L146 148" stroke-width="1.6" fill="none"/>
  <circle class="hz-sack" cx="146" cy="148" r="3"/>`;
const ARM_LETTER = `${LETTER}${ARM_BENT}
  <path class="hz-robe" d="M90 98 C100 92 113 96 117 108 C119 118 118 132 118 144 C112 148 104 150 98 148 C96 132 93 114 90 98 Z"/>
  <path class="hz-gold" d="M98 144 C105 147 112 147 119 143 L119 149 C112 153 104 153 98 150 Z"/>`;
const ARM_SACK = `${ARM_DOWN}
  <path class="hz-sack" d="M90 98 C100 92 113 96 116 108 C118 118 117 130 117 140 C111 144 104 146 98 144 C96 128 93 112 90 98 Z"/>`;

const hezekiah: CharacterDef = {
  id: 'hezekiah',
  name: '히스기야',
  traits: '옆모습. 왕(기본 king): 네모 톱니가 둘린 성벽 모양 관, 목덜미에서 둥글게 말린 머리, 가슴에 닿는 넓은 수염, 푸른 긴 옷과 네 귀퉁이의 청색 술, 금띠, 등 뒤 겉옷, 앞손에 든 봉한 두루마리(편지). sackcloth: 관 없는 맨머리에 재, 굵은 바늘땀의 자루 같은 베옷과 새끼줄 띠, 어깨에 걸린 찢긴 겉옷 자락, 빈손',
  faces: 'right',
  height: 1.0,
  tint: '#2f4f86',
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
      king: { markup: KING, parts: { hair: HEAD_KING, legs: LEGS_STOCKY, armR: ARM_LETTER, armL: BACK_ARM } },
      sackcloth: { markup: SACKCLOTH, parts: { hair: HEAD_ASH, legs: LEGS_STOCKY, armR: ARM_SACK, armL: BACK_ARM } },
    },
    markup: `
      <g data-part="legs">${LEGS_STOCKY}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_STOCKY}
        <g data-part="cloth">${KING}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 14)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD_KING}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_LETTER}</g>
      </g>`,
  },
};

export default hezekiah;
