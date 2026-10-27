// 야곱 (이스라엘) — 발꿈치를 잡고 태어난 사람 (창 25–50).
// A급 장면 gen-25-stew(창 25:19-34 "붉은 죽 한 그릇")에서 키트 임시 그림을 공들여 다시 그림.
// 특징: "종용한 사람인고로 장막에 거하니"(창 25:27). 형 에서(넓은 어깨, 뻗친 붉은 머리, 짧은 튜닉, 활)와 정반대로
// 가늘고 곧은 몸, 뒤로 단정히 묶어 늘어뜨린 머리(끈으로 맨 상투), 짧게 다듬은 수염, 발목까지 오는 줄무늬 긴 옷과
// 등 뒤로 늘어진 겉옷. 앞손은 팔꿈치를 굽혀 지팡이 하나를 쥐었다 ("내가 내 지팡이만 가지고 이 요단을 건넜더니", 창 32:10).
// 매끈한 몸이라(창 27:11) 털 표시는 하나도 없다.
// 옷:
//  - "plain"    : 기본 (겉옷 + 지팡이)
//  - "bowl"     : 지팡이 대신 김이 오르는 붉은 죽 그릇을 든다 (창 25:29-34)
//  - "disguise" : 형의 좋은 옷(붉은 겉옷)을 입고, 염소 새끼 가죽으로 손과 목을 덮었다. 손에는 별미 그릇 (창 27:15-17)
//  - "limp"     : 얍복 나루 뒤 (창 32:31). 지팡이를 앞으로 짚고 기대어 선다. 걸음은 절뚝인다 (A급 gen-32-wrestle)
import type { CharacterDef } from './index';
import { BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM, ARM_BENT } from './_parts.ts';

/** 지팡이: 땅에 짚는다 (legs 부위라 자세가 바뀌어도 발과 함께 있다). 손에 쥐는 높이(y 155)를 지나 위로 */
const STAFF = `
  <path d="M141.6 409 L140.6 58 L146 58 L147 409 Z"/>
  <ellipse cx="143.3" cy="58" rx="3.6" ry="4.2"/>`;

const LEGS = LEGS_SLIM;

/** 등 뒤로 종아리까지 늘어진 겉옷: 끝이 반듯하고 짧은 술 */
const MANTLE = `
  <path d="M90 90 C78 96 70 112 68 140 C64 186 66 240 70 290 C71 310 70 330 66 346 C72 345 78 347 84 350 C86 300 88 250 90 206 C91 160 92 124 95 98 Z"/>
  <path class="detail" d="M79 112 Q72 220 76 344" fill="none" stroke-width="1"/>
  <path class="detail" d="M68 347 L67 354 M73 347 L73 355 M78 348 L78 356" fill="none" stroke-width="0.9"/>`;

/** 형의 좋은 옷 (창 27:15): 더 넓고 긴 붉은 겉옷, 가장자리에 수놓은 띠 */
const ESAU_ROBE = `
  <g class="esau-red">
    <path d="M92 86 C76 92 64 110 60 142 C55 190 57 244 62 296 C64 322 62 344 56 362 C64 361 71 363 78 367 C82 364 86 364 90 366 C90 312 92 254 94 208 C95 160 96 122 98 94 Z"/>
    <path class="detail" d="M64 150 Q58 250 62 356 M71 120 Q64 230 70 360" fill="none" stroke-width="1.4"/>
  </g>`;

/** 목을 덮은 염소 새끼 가죽: 털이 들쭉날쭉한 깃 */
const GOAT_NECK = `
  <path class="goat" d="M83 87 L87 80 L92 84 L96 77 L100 83 L105 76 L109 82 L114 77 L116 85 L121 83 L119 91 L124 96 L115 98 L111 105 L104 99 L98 105 L92 99 L86 103 L84 95 L79 92 Z"/>`;

/** 앞팔: 팔꿈치를 굽혀 그릇을 앞으로 받쳐 든다. 붉은 죽 위로 김 두 가닥 */
const ARM_BOWL = `
  ${ARM_BENT}
  <path d="M132 144 L168 144 C167 155 159 162 150 162 C141 162 133 155 132 144 Z"/>
  <ellipse class="stew" cx="150" cy="144.4" rx="17" ry="2.6"/>
  <path class="steam" d="M144 138 C140 132 148 128 144 120 M154 138 C151 131 158 127 155 118" fill="none" stroke-width="1.4" stroke-linecap="round"/>`;

/** 손등과 팔뚝을 덮은 염소 가죽 (앞팔) */
const GOAT_HAND = `
  <path class="goat" d="M112 146 L118 142 L122 146 L128 141 L132 145 L138 141 L144 145 L150 143 L153 150 L149 156 L154 162 L147 166 L141 163 L135 170 L129 164 L123 170 L117 165 L111 168 L113 160 L108 156 Z"/>`;

/** 뒤쪽 손의 염소 가죽 */
const GOAT_HAND_BACK = `
  <path class="goat" d="M62 212 L66 208 L70 212 L75 209 L77 216 L81 220 L77 225 L79 231 L73 233 L69 239 L64 235 L59 238 L60 230 L56 226 L60 221 Z"/>`;

/**
 * 절뚝이는 야곱 (창 32:25, 31 "환도뼈가 위골되었더라 … 그 환도뼈로 인하여 절었더라"):
 * 지팡이를 앞으로 더 멀리 짚고, 앞팔을 쭉 뻗어 거기에 몸을 기댄다. 앞발은 뒤꿈치를 들어 땅을 겨우 디딘다.
 * 걸을 때는 무대(actor.ts Stage.limp)가 고르지 않은 걸음으로 흔든다.
 */
const STAFF_LEAN = `
  <path d="M151 409 L146.6 138 L152 138 L157 409 Z"/>
  <ellipse cx="149.3" cy="138" rx="3.6" ry="4.2"/>`;
const LEGS_LIMP = LEGS_SLIM.replace(
  'L116 408 L152 409 C152 404 146 401 139 399 C132 396 129 388 129 378',
  'L119 399 L148 409 C148 405 143 401 138 398 C133 394 130 386 129 376',
);
const ARM_LEAN = `
  <path d="M92 106 C90 98 98 93 105 94 C112 95 117 101 119 110 C125 130 136 158 146 182 C150 188 151 196 148 200 C144 204 138 203 136 197 C126 174 108 144 98 124 Z"/>`;

const jacob: CharacterDef = {
  id: 'jacob',
  name: '야곱',
  traits: '옆모습, 가늘고 곧은 몸, 뒤로 단정히 묶어 늘어뜨린 머리, 짧게 다듬은 수염, 발목까지 오는 줄무늬 긴 옷과 겉옷, 앞손에 쥔 지팡이. 옷 bowl = 붉은 죽 그릇, disguise = 형의 붉은 옷 + 손·목의 염소 가죽, limp = 지팡이에 기대 절뚝임',
  faces: 'right',
  height: 0.98,
  tint: '#4d6a6a',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 100],
      cloth: [90, 96],
      hair: [86, 40],
    },
    outfits: {
      plain: { markup: MANTLE, parts: { legs: STAFF + LEGS, armR: ARM_BENT, armL: BACK_ARM } },
      limp: { markup: MANTLE, parts: { legs: STAFF_LEAN + LEGS_LIMP, armR: ARM_LEAN, armL: BACK_ARM } },
      bowl: { markup: MANTLE, parts: { legs: LEGS, armR: ARM_BOWL, armL: BACK_ARM } },
      disguise: { markup: ESAU_ROBE + GOAT_NECK, parts: { legs: LEGS, armR: ARM_BOWL + GOAT_HAND, armL: BACK_ARM + GOAT_HAND_BACK } },
    },
    markup: `
      <g data-part="legs">${STAFF}${LEGS}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <!-- 발목까지 오는 긴 옷: 가는 세로 줄무늬, 반듯한 허리띠 -->
        <g class="tone2">
          <path d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 210 131 262 136 320 C139 350 141 372 143 390 Q133 395 122 391 Q111 396 100 391 Q89 395 78 390 C77 350 77 300 78 262 C79 230 80 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
          <path class="detail" d="M81 177 Q100 184 121 178 M81 183 Q100 190 121 184" fill="none" stroke-width="1.8"/>
          <path class="detail" d="M88 104 Q83 150 82 174 M92 196 Q90 300 92 388 M101 196 Q102 300 106 390 M110 196 Q115 300 122 389 M118 198 Q126 300 134 388" fill="none" stroke-width="0.8"/>
        </g>
        <g data-part="cloth" class="tone2">${MANTLE}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 10)">
            <g data-part="hair">
              <!-- 머리에 붙게 빗어 넘기고, 뒤에서 끈으로 묶어 상투를 틀고 꽁지를 늘어뜨렸다 -->
              <path d="M100 15 C88 13 78 20 75 32 C73 42 75 52 79 60 C81 66 84 70 88 72 C88 64 87 56 88 48 C90 38 98 32 110 31 C116 30 121 32 124 35 C122 22 113 15 100 15 Z"/>
              <ellipse cx="74" cy="48" rx="8.4" ry="7.4"/>
              <path d="M70 53 C64 64 62 78 65 90 L69 89 C68 79 70 68 75 58 Z"/>
              <path class="tone2" d="M77 41 L82 53 L79 55 L74 43 Z"/>
            </g>
            ${FACE_MAN}
            <!-- 짧게 다듬은 수염 -->
            <path d="M98 58 C104 62 112 64 119 65 L121 67 C123 72 122 78 119 82 L106 83 C100 80 96 76 95 70 C94 65 95 61 98 58 Z"/>
          </g>
        </g>
        <g data-part="armR">${ARM_BENT}</g>
      </g>`,
  },
};

export default jacob;
