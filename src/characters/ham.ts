// 함 — 노아의 아들 (창 6:10), 가나안의 아버지 (창 9:18).
// 조연이라 _parts 조각으로 만든다. 특징: 단단한 체격, 바짝 친 머리와 짧은 수염, 무릎 길이 튜닉,
// 어깨에 둘러멘 밧줄 뭉치 (방주 일꾼).
import type { CharacterDef } from './index';
import { ARM_DOWN, BEARD_SHORT, FACE_MAN, LEGS_STOCKY, PIVOTS, TORSO_STOCKY, figure } from './_parts.ts';

const ham: CharacterDef = {
  id: 'ham',
  name: '함',
  traits: '옆모습, 단단한 체격, 바짝 친 머리, 짧은 수염, 무릎 길이 튜닉, 어깨에 멘 밧줄 뭉치',
  faces: 'right',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: { ...PIVOTS },
    markup: figure({
      legs: LEGS_STOCKY,
      torso: TORSO_STOCKY,
      hair: `<path d="M100 15 C87 13 76 22 74 37 C73 46 74 55 77 62 C79 59 82 58 84 60 C83 52 84 45 88 40 C93 34 101 31 111 30 C116 30 120 31 122 33 C119 22 111 15 100 15 Z"/>`,
      face: FACE_MAN,
      beard: BEARD_SHORT,
      head: 'matrix(0.9 0 0 0.9 11 10)',
      cloth: `
        <path d="M80 96 C86 91 94 89 101 90 C108 91 113 95 117 99 C124 104 130 112 131 122 C133 134 128 144 124 154 C121 164 121 174 123 184 C127 202 132 232 135 260 C136 270 137 276 139 284 Q132 289 125 285 Q117 291 108 286 Q99 292 90 287 Q82 291 72 285 C71 262 73 236 75 214 C76 198 78 186 80 172 C76 152 72 130 74 114 C75 106 77 100 80 96 Z"/>
        <path class="detail" d="M77 180 Q100 188 124 181" fill="none" stroke-width="3"/>`,
      frontArm: ARM_DOWN,
      // 밧줄 뭉치: 어깨에서 반대편 허리로 비스듬히 두른 고리
      over: `
        <g fill="none" stroke="currentColor" stroke-linecap="round">
          <ellipse cx="102" cy="142" rx="20" ry="52" transform="rotate(-24 102 142)" stroke-width="7"/>
          <ellipse cx="104" cy="144" rx="15" ry="47" transform="rotate(-24 104 144)" stroke-width="3"/>
        </g>
        <path class="detail" d="M86 104 l6 4 M118 176 l5 -5 M80 130 l7 1" fill="none" stroke-width="1"/>`,
    }),
  },
};

export default ham;
