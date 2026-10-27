// 시날의 사람들 — 바벨탑을 쌓는 무리 (창 11:2-4). 성경에 이름이 나오는 사람은 없다.
// 같은 일꾼 실루엣을 셋 겹쳐 세운 한 무리 그림. 소품만 다르게: 어깨에 진 벽돌 판, 머리에 인 바구니, 빈손.
// 도감에는 넣지 않는다 (한 사람이 아니라 "우리"라고 말하는 무리라서).
import type { CharacterDef } from './index';
import { ARM_DOWN, BEARD_SHORT, FACE_MAN, LEGS_STOCKY, TORSO_STOCKY } from './_parts.ts';

const HAIR = `<path d="M100 15 C87 13 76 22 74 37 C73 46 74 55 77 62 C79 59 82 58 84 60 C83 52 84 45 88 40 C93 34 101 31 111 30 C116 30 120 31 122 33 C119 22 111 15 100 15 Z"/>`;

/** 무릎 길이 일옷 + 허리끈 */
const TUNIC = `
  <path d="M80 96 C86 91 94 89 101 90 C108 91 113 95 117 99 C124 104 130 112 131 122 C133 134 128 144 124 154 C121 164 121 174 123 184 C127 202 132 232 135 260 C136 270 137 276 139 284 Q132 289 125 285 Q117 291 108 286 Q99 292 90 287 Q82 291 72 285 C71 262 73 236 75 214 C76 198 78 186 80 172 C76 152 72 130 74 114 C75 106 77 100 80 96 Z"/>
  <path class="detail" d="M77 180 Q100 188 124 181" fill="none" stroke-width="3"/>`;

/** 어깨에 걸친 판 위에 벽돌 세 줄 */
const BRICKS = `
  <rect x="62" y="80" width="62" height="5" rx="1"/>
  <rect x="64" y="70" width="18" height="9" rx="1.5"/><rect x="84" y="70" width="18" height="9" rx="1.5"/><rect x="104" y="70" width="18" height="9" rx="1.5"/>
  <rect x="74" y="60" width="18" height="9" rx="1.5"/><rect x="94" y="60" width="18" height="9" rx="1.5"/>`;

/** 머리에 인 흙 바구니 */
const BASKET = `<path d="M72 6 L132 6 L126 24 C116 28 88 28 78 24 Z"/><path class="detail" d="M76 12 L128 12 M78 18 L126 18" fill="none" stroke-width="1"/>`;

const man = (prop: string, head = 'matrix(0.9 0 0 0.9 11 10)') => `
  ${LEGS_STOCKY}
  ${TORSO_STOCKY}
  <g transform="${head}">${HAIR}${FACE_MAN}${BEARD_SHORT}</g>
  <g class="tone2">${TUNIC}</g>
  ${ARM_DOWN}
  ${prop}`;

const builders: CharacterDef = {
  id: 'builders',
  name: '시날의 사람들',
  traits: '일옷 입은 일꾼 셋이 겹쳐 선 무리. 어깨에 벽돌 판, 머리에 흙 바구니',
  // 오른쪽 끝에 서서 왼쪽(가운데의 탑)을 본다
  faces: 'left',
  // 탑·가마가 주인공이라, 무리는 작게 오른쪽 끝에 선다 (styles/babel.css)
  height: 0.6,
  slots: 2,
  art: {
    kind: 'svg',
    viewBox: [360, 420],
    pivots: { upper: [180, 409] },
    markup: `
      <g data-part="upper"><g transform="translate(360 0) scale(-1 1)">
        <g transform="translate(0 28) scale(0.93)">${man(BASKET)}</g>
        <g transform="translate(160 22) scale(0.95)">${man('')}</g>
        <g transform="translate(78 0)">${man(BRICKS)}</g>
      </g></g>`,
  },
};

export default builders;
