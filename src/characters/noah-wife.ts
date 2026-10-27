// 노아의 아내 (창 6:18, 7:7). 성경에 이름은 나오지 않는다.
// 조연이라 _parts 조각으로 만든다. 특징: 머리를 덮어 등까지 내려오는 너울, 발목까지 오는 긴 옷,
// 앞에 모은 손에 작은 등잔 (방주 안의 긴 밤).
import type { CharacterDef } from './index';
import { ARM_DOWN, FACE_WOMAN, LEGS_SLIM, PIVOTS, ROBE_WOMAN, TORSO_WOMAN, VEIL, figure } from './_parts.ts';

const noahWife: CharacterDef = {
  id: 'noah-wife',
  name: '노아의 아내',
  traits: '옆모습, 등까지 내려오는 너울, 긴 옷, 손에 든 작은 등잔',
  faces: 'right',
  height: 0.93,
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: { ...PIVOTS, hair: [86, 60] },
    markup: figure({
      legs: LEGS_SLIM,
      torso: TORSO_WOMAN,
      hair: VEIL,
      face: FACE_WOMAN,
      head: 'matrix(0.86 0 0 0.86 15 13)',
      cloth: ROBE_WOMAN,
      frontArm: ARM_DOWN,
      // 등잔: 손끝에 매달린 작은 그릇과 불빛 한 점
      over: `
        <path d="M118 236 C118 232 124 230 132 230 C140 230 144 232 143 236 C141 242 135 244 130 244 C124 244 119 241 118 236 Z"/>
        <ellipse class="glint" cx="141" cy="227" rx="2" ry="3.4"/>`,
    }),
  },
};

export default noahWife;
