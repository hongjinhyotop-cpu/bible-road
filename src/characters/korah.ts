// 고라 — 레위의 증손, 고핫의 손자, 이스할의 아들 (출 6:21, 민 16:1). 모세·아론과 사촌 사이(아므람과 이스할이 형제, 출 6:18).
// 성막을 섬기는 레위인이었지만 제사장 자리를 구하며 모세와 아론을 거스름 (민 16). A급 num-16-korah 「땅이 입을 열어」.
// 특징 (모세·아론과 실루엣으로 구별되게):
//  - 키가 크고 고개를 살짝 쳐들었다 (당당한, 조금은 높은 자세)
//  - 머리에 두른 천이 목덜미로 길게 늘어지고, 이마에 두 겹 끈 — 아론의 감아 올린 관·모세의 두건과 다르다
//  - 끝이 뾰족하게 다듬어진 수염 — 아론은 길게 센 수염, 모세는 네모진 짙은 수염
//  - 등 뒤로 늘어진 고운 겉옷, 아랫단에 넓은 띠 무늬와 모서리의 술 (민 15:38 "옷단 귀에 술을 만들고" — 바로 앞 장)
//  - 지팡이가 없다
// 옷 (장면 beat의 "outfit": {"korah": "censer"}):
//  - plain  : 두 손을 몸 앞에 내린 기본 차림
//  - point  : 앞팔을 곧게 뻗어 손가락으로 가리킨다 (민 16:3 "너희가 분수에 지나도다")
//  - censer : 앞손에 향로 — 숯불과 향 연기 (민 16:17-18). 그림은 아론의 아들들과 같은 향로(_sons.ts)
import type { CharacterDef } from './index';
import { ARM_BENT, ARM_DOWN, BACK_ARM, FACE_MAN, LEGS_SLIM, ROBE_LONG, TORSO_SLIM } from './_parts.ts';
import { CENSER } from './_sons.ts';

// 머리에 두른 천: 정수리를 덮고 목덜미로 어깨까지 늘어진다, 이마에 두 겹 끈
const HEADCLOTH = `
  <path d="M78 36 C70 50 66 70 65 96 C65 110 69 120 76 124 C78 110 82 96 88 86 C84 74 83 60 86 49 Z"/>
  <path d="M77 40 C70 17 84 3 102 3 C120 3 130 14 128 34 C112 29 92 29 77 40 Z"/>
  <path class="crown" d="M77 33 Q102 23 128 28 L128 32.4 Q102 27.4 78 37.4 Z"/>
  <path class="crown" d="M77.6 38.6 Q102 28.6 128 33.6 L128 36.4 Q102 31.4 78 41.4 Z" opacity="0.8"/>`;

// 끝이 뾰족하게 다듬어진 수염
const BEARD = `
  <path d="M97 55 C104 60 112 63 119 65 L122 67 C126 76 127 88 124 100 L119 114 C113 106 105 97 100 89 C95 81 93 73 93 67 C93 61 94 58 97 55 Z"/>
  <path class="detail" d="M106 74 Q112 92 117 106" fill="none" stroke-width="0.8"/>`;

// 고운 겉옷: 등 뒤로 늘어진 자락, 아랫단의 넓은 띠, 모서리의 술. 앞어깨로 넘어온 자락 한 줄
const MANTLE = `
  <path d="M86 92 C74 102 66 122 64 152 C61 196 62 246 66 292 C67 306 66 318 63 330 C71 328 78 330 84 334 C86 290 87 240 88 196 C89 152 90 118 92 98 Z"/>
  <path class="crown" d="M66.6 300 C67.2 310 66.4 320 63.6 329.6 C71 327.6 78 329.6 84 333.6 L84 326.6 C78 322.8 72.6 321.6 69 322.2 C70 314 70.2 306 69.6 300 Z" opacity="0.75"/>
  <path d="M62.4 330 L65 330 L64.4 350 L61.6 350 Z"/><circle cx="63" cy="352" r="1.8"/>
  <path d="M81 333 L83.6 334 L82.6 353 L80 352 Z"/><circle cx="81.3" cy="355" r="1.8"/>
  <path class="detail" d="M76 120 Q70 200 72 310" fill="none" stroke-width="1"/>`;

const DRAPE = `
  <path d="M96 93 C108 98 117 110 120 128 C121 136 120 144 118 150 L112 150 C113 140 113 130 110 120 C106 108 100 101 93 97 Z"/>
  <path class="crown" d="M117.6 146 L112.4 146 L112 150 L118 150 Z" opacity="0.7"/>`;

// 앞 겉옷 아랫단의 술 (발치)
const HEM_TASSEL = `<path d="M141 386 L143.6 386 L144.4 403 L141.8 403 Z"/><circle cx="143.1" cy="405" r="1.7"/>`;

// 앞팔: 곧게 뻗어 손가락으로 가리킨다
const ARM_POINT = `
  <path d="M92 106 C90 98 98 93 105 94 C112 95 117 100 120 106 C132 110 146 113 158 114 C163 113 168 113 172 115 C175 117 174 120 170 120 L162 121 C158 123 150 123 144 122 C132 122 120 121 112 119 C102 117 96 113 92 106 Z"/>`;

const korah: CharacterDef = {
  id: 'korah',
  name: '고라',
  traits: '옆모습, 키가 크고 고개를 살짝 쳐든 자세, 목덜미로 늘어진 머릿천과 이마의 두 겹 끈, 끝이 뾰족한 수염, 등 뒤로 늘어진 고운 겉옷(아랫단 띠 무늬, 모서리의 술), 지팡이 없음. 옷 point: 손가락으로 가리킴, censer: 향로(숯불·향 연기)',
  faces: 'right',
  height: 1.05,
  tint: '#7a4a6e',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 102],
      cloth: [102, 110],
      hair: [86, 44],
    },
    outfits: {
      plain: { parts: { armR: ARM_DOWN } },
      point: { parts: { armR: ARM_POINT } },
      censer: { parts: { armR: ARM_BENT + CENSER } },
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${MANTLE}
        ${TORSO_SLIM}
        <g data-part="cloth" class="tone2">${ROBE_LONG}${HEM_TASSEL}${DRAPE}</g>
        <g data-part="head">
          <g transform="matrix(0.87 -0.05 0.05 0.87 11 15)">
            <g data-part="hair">${HEADCLOTH}</g>
            ${FACE_MAN}
            ${BEARD}
          </g>
        </g>
        <g data-part="armR">${ARM_DOWN}</g>
      </g>`,
  },
};

export default korah;
