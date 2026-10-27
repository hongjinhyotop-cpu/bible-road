// 야벳 — 노아의 아들 (창 6:10). "하나님이 야벳을 창대케 하사" (창 9:27).
// 조연이라 _parts 조각으로 만든다. 특징: 가늘고 큰 키, 수염 없는 젊은 얼굴, 뒤로 묶은 상투 머리,
// 어깨에 멘 긴 널빤지 (방주 목재).
import type { CharacterDef } from './index';
import { FACE_MAN, LEGS_SLIM, PIVOTS, TORSO_SLIM, figure } from './_parts.ts';

const japheth: CharacterDef = {
  id: 'japheth',
  name: '야벳',
  traits: '옆모습, 가늘고 큰 키, 수염 없음, 뒤로 묶은 머리, 어깨에 멘 널빤지',
  faces: 'right',
  height: 1.02,
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: { ...PIVOTS },
    markup: figure({
      legs: LEGS_SLIM,
      torso: TORSO_SLIM,
      hair: `
        <path d="M100 13 C86 11 75 21 73 36 C72 46 73 56 76 64 C78 61 81 60 83 62 C82 54 83 46 87 40 C92 33 101 30 111 29 C116 29 120 30 122 32 C119 20 111 13 100 13 Z"/>
        <circle cx="76" cy="32" r="9"/>
        <path d="M70 36 C64 44 62 54 64 62 C67 56 70 52 74 50 Z"/>`,
      face: FACE_MAN,
      cloth: `
        <path d="M84 98 C89 94 95 92 101 93 C107 94 111 97 114 101 C120 106 124 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C122 198 126 226 129 254 C130 264 131 272 133 282 Q126 287 118 283 Q110 289 101 284 Q92 290 84 285 Q78 288 74 283 C74 258 76 232 79 210 C80 196 81 186 83 172 C79 152 77 130 79 116 C80 108 81 102 84 98 Z"/>
        <path class="detail" d="M80 180 Q99 186 120 180" fill="none" stroke-width="2.4"/>`,
      // 널빤지는 어깨에 얹고, 앞팔을 굽혀 붙잡는다
      over: `
        <path d="M18 104 L186 80 L188 92 L20 116 Z"/>
        <path class="detail" d="M40 108 L180 88" fill="none" stroke-width="0.9"/>`,
      frontArm: `
        <path d="M92 106 C90 98 98 93 105 94 C113 95 117 102 117 110 C117 122 116 132 118 142 C122 128 123 114 124 100 C125 90 132 86 137 90 C141 94 139 102 136 110 C132 128 129 144 124 156 C121 162 113 164 107 160 C101 156 99 148 98 140 C96 128 94 116 92 106 Z"/>`,
    }),
  },
};

export default japheth;
