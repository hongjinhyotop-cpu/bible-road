// 노아의 세 며느리 — 셈·함·야벳의 아내들 (창 7:13). 성경에 이름은 나오지 않는다.
// 셋을 한 무리로 겹쳐 세운 실루엣 하나. 너울과 긴 옷, 키를 조금씩 다르게.
import type { CharacterDef } from './index';
import { ARM_DOWN, FACE_WOMAN, LEGS_SLIM, ROBE_WOMAN, TORSO_WOMAN, VEIL } from './_parts.ts';

const one = (head = 'matrix(0.86 0 0 0.86 15 13)') => `
  ${LEGS_SLIM}
  ${TORSO_WOMAN}
  <g transform="${head}">${VEIL}${FACE_WOMAN}</g>
  <g class="tone2">${ROBE_WOMAN}</g>
  ${ARM_DOWN}`;

const sonsWives: CharacterDef = {
  id: 'sons-wives',
  name: '세 며느리',
  traits: '너울 쓴 여자 셋이 겹쳐 선 무리, 키가 조금씩 다름',
  faces: 'right',
  height: 0.9,
  slots: 2,
  art: {
    kind: 'svg',
    viewBox: [340, 420],
    pivots: { upper: [170, 409] },
    markup: `
      <g data-part="upper">
        <g transform="translate(0 30) scale(0.93) translate(0 0)">${one()}</g>
        <g transform="translate(140 20) scale(0.95)">${one()}</g>
        <g transform="translate(70 0) scale(1)">${one()}</g>
      </g>`,
  },
};

export default sonsWives;
