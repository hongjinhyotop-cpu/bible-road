// 아브람 시대의 바로 (창 12:10-20). 요셉의 바로(pharaoh-joseph)·출애굽의 바로(pharaoh)와 또 다른 사람이라 따로 둔다.
// 그림은 같은 바로 그림, 색만 다르다: 아브람의 바로 = 공작석 초록 줄무늬·은빛 도는 흰 장식 (styles/egypt-court.css).
import type { CharacterDef } from './index';
import pharaoh from './pharaoh.ts';

const pharaohAbram: CharacterDef = {
  ...pharaoh,
  id: 'pharaoh-abram',
  name: '바로',
  traits: `${pharaoh.traits} — 아브람 시대: 공작석 초록 줄무늬와 은빛 장식`,
  tint: '#4a7a62',
};

export default pharaohAbram;
