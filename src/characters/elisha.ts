// 엘리사 — 아벨므흘라 사밧의 아들, 엘리야의 뒤를 이은 선지자 (왕상 19 – 왕하 13).
// 9막 A급 kgs2-2-chariot(왕하 2 「불 수레」)에서 키트 임시 그림을 공들여 다시 그림.
// 실루엣의 표지 (엘리야 = 덥수룩한 머리·털옷·가죽 띠와 구별):
//  - 대머리 (왕하 2:23 "대머리여 올라가라"): 정수리가 매끈하게 빛나고, 귀 뒤로만 짧은 머리가 띠처럼 남음. 짧게 다듬은 검은 수염
//  - 엘리야에게서 받은 겉옷 (2:13): 어깨를 덮고 등 뒤로 무릎까지 늘어지는 거친 털 겉옷. 가장자리가 털처럼 들쭉날쭉하다
//  - 곧은 지팡이 (4:29 "내 지팡이를 손에 들고 가서")
//
// 옷 (장면 맨 위 "outfit": {"elisha": "follower"} 또는 beat의 "outfit"):
//  - prophet (기본) : 엘리야의 겉옷을 받은 선지자 (왕하 2:13 이후). 위의 차림 그대로. 되돌릴 때 이 이름.
//  - follower       : 엘리야를 따라다니던 때 (왕상 19:21 – 왕하 2:12). 겉옷 없이 띠 맨 수수한 긴 옷 + 지팡이.
//  - torn           : 자기 옷을 잡아 둘에 찢음 (왕하 2:12). follower의 옷이 가슴에서 아래로 갈라져 늘어짐, 지팡이 없이 빈손.
//  (왕상 19:19 밭 가는 청년 옷은 그 에피소드 도우미가 outfits에 더할 수 있음 — 있으면 그대로 둔다)
import type { CharacterDef } from './index';
import { ARM_BENT, ARM_DOWN, BACK_ARM, BEARD_SHORT, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';
import { PLOW_OUTFITS } from './_elisha-plow.ts';

// ── 머리 (hair 부위): 대머리 + 귀 뒤의 짧은 머리 띠 + 수염 ─────────────
// 폰(작은 화면)에서도 대머리가 보이게 (2026-11-02): 정수리에 넓은 빛 반사 면 + 굵은 윤곽 빛, 귀 뒤 머리 띠는 더 진하고 두툼하게
const HEAD = `
  <path class="es-fringe" d="M79 38 C75 50 75 62 79 72 C83 77 88 79 92 78 C89 70 88 62 89 55 C87 50 85 44 85 38 Z"/>
  <path class="es-dome" d="M82 34 C85 22 96 13 108 14 C117 15 123 20 125 29 C116 25 104 25 94 30 C89 33 85 36 82 34 Z"/>
  <path class="es-shine" d="M83 28 C89 16 102 11 114 14 C120 16 124 20 126 26" fill="none" stroke-width="2.6" stroke-linecap="round"/>
  ${BEARD_SHORT}`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 띠 맨 수수한 긴 옷 */
const ROBE = `
  <path class="es-robe" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C123 210 129 262 134 320 C137 350 139 372 141 390 Q130 395 118 391 Q106 396 94 391 Q84 395 76 390 C76 350 77 300 78 262 C79 230 80 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="es-sash" d="M80 172 Q100 179 121 173 L121 182 Q100 189 80 181 Z"/>
  <path class="es-sash" d="M100 182 L105 182 L107 222 L102 226 L98 222 Z"/>
  <path class="detail" d="M90 200 Q88 300 90 386 M112 200 Q120 300 128 386" fill="none" stroke-width="0.9"/>`;
/** 엘리야의 겉옷: 어깨를 덮고 등 뒤로 무릎 아래까지, 가장자리가 털처럼 들쭉날쭉 */
const MANTLE = `
  <path class="es-hide" d="M96 86 C80 88 68 100 64 120 C60 150 62 190 62 230 C62 262 60 292 58 316 L62 312 L65 320 L69 312 L73 322 L77 312 L81 320 L84 310 C86 270 88 220 90 180 C92 150 94 124 100 104 Z"/>
  <path class="es-hide" d="M88 90 C100 84 116 88 124 100 C127 108 127 116 125 124 L122 130 L118 124 L113 132 L108 124 L103 132 L98 124 L93 130 L88 122 C85 112 85 100 88 90 Z"/>
  <path class="detail" d="M70 130 Q66 200 68 300 M78 120 Q76 200 78 306 M96 96 Q104 104 112 102 M100 108 Q108 114 118 110" fill="none" stroke-width="0.8"/>`;
const PROPHET = `${ROBE}${MANTLE}`;
/** 둘로 찢은 옷: 가슴에서 아래로 갈라진 틈 + 늘어진 자락 */
const TORN = `
  <path class="es-robe" d="M84 97 C90 93 96 91 100 92 L101 120 L96 160 L99 210 L92 270 L95 330 L90 391 Q84 395 76 390 C76 350 77 300 78 262 C79 230 80 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="es-robe" d="M104 92 C110 93 113 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C123 210 129 262 134 320 C137 350 139 372 141 390 Q130 395 118 391 Q108 395 100 391 L104 330 L100 270 L106 210 L103 160 L108 120 Z"/>
  <path class="es-sash" d="M80 172 Q90 176 98 176 L98 184 Q90 184 80 181 Z M106 177 Q114 177 121 173 L121 182 Q114 186 106 186 Z"/>
  <path class="es-torn" d="M100 92 L101 120 L96 160 L99 210 L92 270 L95 330 L90 391 M104 92 L108 120 L103 160 L106 210 L100 270 L104 330 L100 391" fill="none" stroke-width="0.8"/>`;

// ── 지팡이 (legs 부위 — 땅에 붙어 있게) ────────────
const STAFF = `<path d="M141.4 409 L142.4 66 L146.6 66 L146.6 409 Z"/><path d="M141.6 70 C140 62 143 56 144.5 54 C146 56 149 62 147.4 70 Z"/>`;

const elisha: CharacterDef = {
  id: 'elisha',
  name: '엘리사',
  traits: '옆모습. 매끈하게 빛나는 대머리와 귀 뒤의 짧은 머리 띠, 짧게 다듬은 검은 수염, 띠 맨 수수한 긴 옷, 어깨를 덮고 등 뒤로 무릎 아래까지 늘어진 거친 털 겉옷(엘리야의 겉옷), 곧은 지팡이. follower: 겉옷 없음. torn: 가슴에서 아래로 둘로 찢어진 옷, 빈손',
  faces: 'right',
  height: 1,
  tint: '#6f6658',
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
      prophet: { markup: PROPHET, parts: { hair: HEAD, legs: STAFF + LEGS_SLIM, armR: ARM_BENT } },
      follower: { markup: ROBE, parts: { hair: HEAD, legs: STAFF + LEGS_SLIM, armR: ARM_BENT } },
      torn: { markup: TORN, parts: { hair: HEAD, legs: LEGS_SLIM, armR: ARM_DOWN } },
      // 왕상 19:19 밭 가는 청년 (plow) · 엘리야의 겉옷을 받은 순간 (plow-mantle) — _elisha-plow.ts
      ...PLOW_OUTFITS,
    },
    markup: `
      <g data-part="legs">${STAFF}${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g data-part="cloth">${PROPHET}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 14)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_BENT}</g>
      </g>`,
  },
};

export default elisha;
