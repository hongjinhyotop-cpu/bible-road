// 이사야 — 아모스의 아들 선지자 (왕하 19–20, 이사야서).
// 2026-11-02: 키트 임시 그림을 공들여 다시 그림 (같은 파일 이름 → 왕하 18–20의 모든 장면에 반영).
// 실루엣의 표지 (엘리야 = 덥수룩한 머리·털옷, 엘리사 = 대머리·지팡이, 사무엘 = 기름 뿔과 구별):
//  - 머리를 감싼 두건 + 등 뒤로 늘어진 두건 꼬리 (왕궁을 드나들던 예루살렘의 선지자 — 왕하 19:2, 20:1)
//  - 가지런히 다듬은 긴 각진 수염
//  - 발목까지 오는 긴 옷 위에, 앞어깨에서 반대편 허리로 비스듬히 두른 겉옷 (밑단에 술 — 민 15:38)
//  - 손에 반쯤 펼친 두루마리: 양쪽 두루마리 막대 사이로 글줄이 보임 ("큰 서판을 취하여 … 쓰라" 사 8:1, 30:8)
//
// 옷 (장면 맨 위 "outfit": {"isaiah": "sackcloth"} 또는 beat의 "outfit"):
//  - robe (기본)  : 위의 차림. 되돌릴 때 이 이름.
//  - sackcloth    : 베옷 (사 20:2 "허리에서 베를 끄르고" 이전 / 왕하 19:2 베를 두른 사자들과 같이). 거친 무릎 길이 베옷 + 새끼 띠, 두루마리 없이 빈손.
import type { CharacterDef } from './index';
import { ARM_DOWN, BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';

// ── 머리 (hair 부위 — 수염도 여기에) ─────────────────
/** 머리를 감싼 두건: 이마 위로 접힌 띠 + 뒤통수를 덮고 등으로 늘어진 꼬리 */
const WRAP = `
  <path class="is-wrap" d="M98 6 C84 6 74 14 70 28 C67 38 68 46 72 52 C77 48 82 44 88 40 C96 34 108 31 122 33 C123 24 118 13 110 9 C106 7 102 6 98 6 Z"/>
  <path class="is-wrap" d="M74 46 C68 60 66 78 64 96 C62 112 60 128 62 140 C66 136 71 134 76 136 C76 120 78 102 82 86 C84 76 86 66 86 58 C82 54 78 50 74 46 Z"/>
  <path class="is-band" d="M71 40 C84 32 104 28 123 31 L123 37 C104 34 86 38 73 47 Z"/>
  <path class="detail" d="M80 16 Q90 12 106 12 M76 26 Q90 20 112 20 M70 80 Q68 104 66 132" fill="none" stroke-width="0.8"/>`;
/** 가지런히 다듬은 긴 각진 수염 (가슴 위까지) */
const BEARD = `
  <path class="is-beard" d="M97 54 C104 59 112 63 119 65 L123 68 C126 80 127 94 126 108 C125 116 123 122 120 126 L100 126 C96 116 93 104 92 92 C91 78 93 64 97 54 Z"/>
  <path class="detail" d="M104 72 Q108 98 106 122 M114 72 Q120 98 117 124" fill="none" stroke-width="0.8"/>`;
const HEAD = `${WRAP}${BEARD}`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 발목까지 오는 긴 옷 + 밑단 띠 */
const ROBE = `
  <path class="is-robe" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 210 131 262 136 320 C139 350 141 372 143 390 Q132 395 120 391 Q108 396 96 391 Q86 395 77 390 C77 350 78 300 79 262 C80 230 81 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="is-hem" d="M77 378 Q86 383 96 379 Q108 384 120 379 Q132 383 142 378 L143 390 Q132 395 120 391 Q108 396 96 391 Q86 395 77 390 Z"/>
  <path class="detail" d="M90 200 Q88 300 90 376 M112 200 Q122 300 132 376" fill="none" stroke-width="0.9"/>`;
/** 앞어깨에서 반대편 허리로 비스듬히 두른 겉옷 + 등 뒤 자락 + 술 */
const MANTLE = `
  <path class="is-mantle" d="M94 86 C80 90 70 102 66 122 C62 152 64 196 64 240 C64 276 62 306 60 330 Q70 336 80 330 C82 290 84 240 86 196 C88 156 92 122 100 100 Z"/>
  <path class="is-mantle" d="M86 90 C98 84 114 86 122 98 C124 106 124 114 122 120 C116 140 112 160 112 182 C112 204 116 228 120 252 L106 258 C100 232 96 206 94 180 C92 156 90 134 86 116 C84 106 84 96 86 90 Z"/>
  <path class="is-trim" d="M122 120 C116 140 112 160 112 182 C112 204 116 228 120 252" fill="none" stroke-width="2.2"/>
  <path class="is-trim" d="M60 330 Q70 336 80 330" fill="none" stroke-width="2"/>
  <path class="is-tassel" d="M62 333 l-2 12 M70 336 l0 12 M78 333 l2 12 M107 259 l-1 12 M118 254 l2 12"/>
  <path class="detail" d="M72 128 Q68 220 68 322 M100 130 Q100 190 108 250" fill="none" stroke-width="0.8"/>`;
/** 허리띠 + 늘어진 술 */
const SASH = `
  <path class="is-band" d="M80 172 Q100 179 121 173 L121 182 Q100 189 80 181 Z"/>
  <path class="is-band" d="M98 182 L103 182 L104 214 L99 218 L95 214 Z"/>`;
const CLOTH_ROBE = `${ROBE}${MANTLE}${SASH}`;

/** 베옷: 무릎 아래까지의 거친 옷 + 새끼 띠 */
const CLOTH_SACK = `
  <path class="is-sack" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C122 210 126 250 128 290 L122 286 L116 294 L110 286 L104 295 L98 286 L92 294 L86 286 L80 292 C79 260 80 220 81 196 C81 186 82 178 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="detail" d="M86 120 l30 0 M84 150 l34 0 M82 210 l40 0 M81 250 l44 0" fill="none" stroke-width="0.7"/>
  <path class="is-rope" d="M80 176 Q100 183 121 177 M100 182 Q98 200 102 214 M103 182 Q108 196 106 208" fill="none" stroke-width="2.4"/>`;

// ── 앞팔 ──────────────────────────────────────
/** 소매 */
const SLEEVE = `<path class="is-robe" d="M92 104 C91 97 97 94 104 95 C111 96 114 101 115 110 C115 122 115 134 116 144 C110 147 102 147 96 144 C95 130 93 116 92 106 Z"/>`;
/** 팔꿈치를 굽혀 앞으로 내민 손 + 반쯤 펼친 두루마리 */
const ARM_SCROLL = `
  <path d="M92 106 C90 98 98 93 105 94 C112 95 116 101 116 110 C116 124 115 136 116 146 C122 146 130 145 137 144 C141 141 148 141 151 145 C153 149 153 157 150 161 C147 165 141 165 138 163 C129 164 119 168 111 170 C103 171 98 166 97 156 C95 140 93 122 92 106 Z"/>
  ${SLEEVE}
  <g transform="matrix(1.25 0 0 1.25 -36 -38)">
  <path class="is-scroll" d="M146 126 C154 124 164 127 174 124 L175 180 C165 183 155 180 146 182 Z"/>
  <path class="is-script" d="M151 135 h17 M151 142 h19 M151 149 h15 M151 156 h18 M151 163 h14 M151 170 h17" fill="none" stroke-width="1.2"/>
  <rect class="is-roller" x="141.5" y="120" width="7" height="68" rx="3"/>
  <rect class="is-roller" x="172" y="118" width="6.5" height="68" rx="3"/>
  <path class="is-roller" d="M143 118 h4 v-4 h-4 Z M143 188 h4 v4 h-4 Z M173.5 116 h4 v-4 h-4 Z M173.5 186 h4 v4 h-4 Z"/>
  </g>
  <path d="M138 148 C141 141 148 141 151 145 C153 149 153 157 150 161 C147 165 141 165 138 163 Z"/>`;
const ARM_SACK = `${ARM_DOWN}<path class="is-sack" d="M92 104 C91 97 97 94 104 95 C111 96 114 101 115 110 C115 118 114 126 113 132 C107 135 100 135 95 132 C94 122 93 112 92 106 Z"/>`;

const isaiah: CharacterDef = {
  id: 'isaiah',
  name: '이사야',
  traits: '옆모습. 머리를 감싼 두건(이마의 띠, 등 뒤로 늘어진 꼬리), 가지런히 다듬은 긴 각진 수염, 발목까지 오는 긴 옷(밑단 띠), 앞어깨에서 반대편 허리로 비스듬히 두른 겉옷(밑단에 술), 앞으로 내민 손에 반쯤 펼친 두루마리(양쪽 막대·글줄). sackcloth: 무릎 아래까지의 거친 베옷 + 새끼 띠, 빈손',
  faces: 'right',
  height: 1.02,
  tint: '#5e5470',
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
      robe: { markup: CLOTH_ROBE, parts: { hair: HEAD, legs: LEGS_SLIM, armR: ARM_SCROLL, armL: BACK_ARM } },
      sackcloth: { markup: CLOTH_SACK, parts: { hair: HEAD, legs: LEGS_SLIM, armR: ARM_SACK, armL: BACK_ARM } },
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g data-part="cloth">${CLOTH_ROBE}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 14)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_SCROLL}</g>
      </g>`,
  },
};

export default isaiah;
