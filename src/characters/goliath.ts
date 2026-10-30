// 골리앗 — 가드 사람 블레셋 장수, 여섯 규빗 한 뼘 (삼상 17:4). 2단계 A급에서 공들여 다시 그림.
// 7막 왕국 준비(2026-10-30): 여러 에피소드에 나와서 키트로 만든 인물 파일.
import { person } from './_kit.ts';

export default person({
  id: 'goliath',
  name: '골리앗',
  base: 'soldier',
  height: 1.45,
  beard: 'long',
  props: ['spear', 'shield'],
  tint: 'gray',
});
