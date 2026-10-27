// 이삭 — 약속의 아들 (창 21–35). 우물을 파고, 들에서 묵상하던 조용한 사람.
// A급 장면 gen-22-moriah(창 22:1-19 "모리아 산으로")에서 키트 임시 그림을 공들여 다시 그림.
// 특징: 곧은 등의 젊은 남자. 아버지(아브라함: 굽은 등, 두건, 센 긴 수염, 큰 지팡이)와 실루엣만으로 구별되게
// 머리는 짧은 곱슬에 천 머리띠(뒤로 늘어진 끈), 턱선을 따라 난 짧은 수염, 정강이까지 오는 옷, 어깨에서 늘어진 짧은 겉옷.
// 손에는 아무것도 들지 않았다 — 무언가를 쥐고 휘두르는 사람이 아니라 받아 드는 사람.
// 옷 "wood": 번제 나무 한 단을 등에 지고 끈을 가슴에 둘렀다 (창 22:6 "번제 나무를 취하여 그 아들 이삭에게 지우고").
//   "plain"으로 다시 내려놓는다.
import type { CharacterDef } from './index';
import { BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM, ARM_DOWN } from './_parts.ts';

/** 어깨에서 허벅지까지 늘어진 짧은 겉옷 */
const MANTLE = `
  <path d="M88 92 C78 98 71 114 69 140 C66 176 67 214 70 248 C71 262 70 274 66 286 C73 284 79 286 84 290 C85 256 87 214 88 178 C89 144 90 116 93 98 Z"/>
  <path class="detail" d="M78 118 Q73 190 75 280" fill="none" stroke-width="1"/>`;

/** 등에 진 번제 나무 한 단: 쪼갠 장작 여섯 개를 두 줄로 묶고, 끈을 앞어깨 너머 가슴으로 둘렀다 */
const WOOD = `
  <g class="wood" transform="rotate(-12 74 140)">
    <path d="M60 58 L66 56 L67 214 L61 216 Z"/>
    <path d="M65 50 L71 52 L72 220 L66 218 Z"/>
    <path d="M70 60 L76 58 L77 212 L71 214 Z"/>
    <path d="M75 48 L82 50 L82 222 L76 220 Z"/>
    <path d="M80 56 L86 58 L86 214 L80 216 Z"/>
    <path d="M85 62 L90 60 L90 208 L85 210 Z"/>
    <path class="detail" d="M66 60 L66.6 212 M71 56 L71.6 216 M76 58 L76.6 214 M81.6 54 L81.6 216 M85.6 60 L85.6 210" fill="none" stroke-width="0.7"/>
    <!-- 장작의 쪼갠 끝 -->
    <path d="M60 58 L62 52 L66 56 Z M75 48 L78 42 L82 50 Z M85 62 L88 56 L90 60 Z"/>
    <!-- 두 줄 묶음 -->
    <g class="rope">
      <path d="M58 92 Q75 97 92 92 L92 96 Q75 101 58 96 Z"/>
      <path d="M58 176 Q75 181 92 176 L92 180 Q75 185 58 180 Z"/>
    </g>
  </g>
  <!-- 앞어깨 너머 가슴으로 두른 끈 -->
  <path class="rope" d="M86 92 C96 88 108 92 113 102 C118 114 118 132 112 150 C106 164 96 172 88 176 L86 172 C94 167 102 160 107 148 C112 132 112 116 108 106 C104 98 96 95 88 96 Z"/>`;

const isaac: CharacterDef = {
  id: 'isaac',
  name: '이삭',
  traits: '옆모습, 곧은 등의 젊은 남자, 짧은 곱슬머리와 천 머리띠, 턱선의 짧은 수염, 정강이까지 오는 옷, 짧은 겉옷. 옷 wood = 등에 진 번제 나무 한 단',
  faces: 'right',
  height: 0.99,
  tint: '#6f6a5a',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      cloth: [88, 98],
      hair: [86, 40],
    },
    outfits: {
      plain: { markup: MANTLE },
      wood: { markup: MANTLE + WOOD },
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <!-- 정강이까지 오는 옷: 젊은 사람이라 발목까지 끌리지 않는다. 넓은 허리띠 -->
        <g class="tone2">
          <path d="M84 98 C89 94 95 92 101 93 C107 94 111 97 114 101 C120 106 124 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C123 204 128 238 132 272 C134 290 136 306 138 320 Q129 325 120 321 Q110 327 100 322 Q90 327 81 322 Q75 325 71 320 C72 290 74 258 77 228 C79 206 81 190 83 172 C79 152 77 130 79 116 C80 108 81 102 84 98 Z"/>
          <path class="detail" d="M80 176 Q100 183 121 177 M80 183 Q100 190 121 184" fill="none" stroke-width="2"/>
          <path class="detail" d="M88 104 Q83 150 82 172 M88 200 Q84 260 84 318 M112 200 Q122 260 128 318" fill="none" stroke-width="1"/>
        </g>
        <g data-part="cloth" class="tone2">${MANTLE}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 10)">
            <g data-part="hair">
              <!-- 짧은 곱슬머리: 뒤통수에 작은 덩이들 -->
              <path d="M101 14 C88 12 77 20 74 33 C72 44 74 54 77 62 C79 70 81 76 85 80 C87 74 89 70 91 66 C86 58 85 50 87 44 C90 36 98 31 110 30 C116 29 121 31 124 34 C122 22 113 15 101 14 Z"/>
              <circle cx="76" cy="38" r="5.4"/><circle cx="74" cy="50" r="5.6"/><circle cx="77" cy="62" r="5.2"/><circle cx="82" cy="72" r="4.6"/>
              <circle cx="86" cy="18" r="5"/><circle cx="97" cy="13" r="5"/>
              <!-- 천 머리띠와 뒤로 늘어진 끈 -->
              <g class="tone2">
                <path d="M78 31 Q101 21 125 30 L125 35 Q101 26 79 37 Z"/>
                <path d="M78 34 C71 42 68 54 70 64 L74 64 C73 54 75 44 81 37 Z"/>
                <path d="M80 35 C76 44 76 52 79 60 L82 58 C80 52 80 44 83 37 Z"/>
              </g>
            </g>
            ${FACE_MAN}
            <!-- 턱선을 따라 난 짧은 수염 -->
            <path d="M95 57 C102 62 110 65 117 66 L121 67 C123 73 122 79 118 83 C110 86 101 84 95 78 C92 72 92 63 95 57 Z"/>
          </g>
        </g>
        <g data-part="armR">${ARM_DOWN}</g>
      </g>`,
  },
};

export default isaac;
