// 셈 — 노아의 아들 (창 6:10). 나중에 아브라함으로 이어지는 줄기 (창 11:10-26).
// 조연이라 _parts 조각으로 만든다. 특징: 머리를 덮어 어깨까지 내려오는 두건과 머리띠, 짧은 수염,
// 발목까지 오는 긴 옷, 곧은 지팡이 (아벨의 갈고리 지팡이와 구별되게 끝이 둥근 손잡이).
import type { CharacterDef } from './index';
import { ARM_BENT, BEARD_SHORT, FACE_MAN, LEGS_SLIM, PIVOTS, ROBE_LONG, TORSO_SLIM, figure } from './_parts.ts';

const shem: CharacterDef = {
  id: 'shem',
  name: '셈',
  traits: '옆모습, 어깨까지 덮는 두건과 머리띠, 짧은 수염, 긴 옷, 곧은 지팡이',
  faces: 'right',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: { ...PIVOTS },
    markup: figure({
      legs: LEGS_SLIM,
      torso: TORSO_SLIM,
      hair: `
        <path d="M99 10 C85 9 72 20 70 37 C68 54 70 72 67 90 C66 100 69 108 75 112 C79 102 83 94 88 86 C84 74 83 61 86 50 C89 40 97 32 110 30 C116 29 121 31 125 35 C122 21 113 10 99 10 Z"/>
        <path class="detail" d="M84 33 Q103 25 124 33" fill="none" stroke-width="2.2"/>`,
      face: FACE_MAN,
      beard: BEARD_SHORT,
      cloth: ROBE_LONG,
      frontArm: ARM_BENT,
      ground: `
        <path d="M141 409 L142 70 L147 70 L147 409 Z"/>
        <circle cx="144.5" cy="68" r="5"/>`,
    }),
  },
};

export default shem;
