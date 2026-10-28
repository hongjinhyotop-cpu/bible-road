// 요셉 시대의 바로 (창 12, 40–50). 출애굽의 바로(pharaoh.ts)와는 다른 사람이라 따로 둔다.
// 그림은 같은 바로 그림을 쓰고, 색만 다르다: 요셉의 바로 = 따뜻한 금빛 줄무늬·금 장식,
// 모세의 바로 = 청금석 줄무늬·붉은 기운 도는 장식 (styles/egypt-court.css).
import type { CharacterDef } from './index';
import pharaoh from './pharaoh.ts';

const pharaohJoseph: CharacterDef = {
  ...pharaoh,
  id: 'pharaoh-joseph',
  traits: `${pharaoh.traits} — 요셉 시대: 따뜻한 금빛 줄무늬와 금 장식`,
  tint: '#8a6a2a',
};

export default pharaohJoseph;
