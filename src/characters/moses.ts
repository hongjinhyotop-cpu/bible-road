// 모세 — 물에서 건진 아이, 이집트 왕궁에서 자라 미디안 광야의 목자가 되고, 이스라엘을 이끌고 나온 사람 (출 2–신 34).
// 지금은 기본 실루엣 키트로 만든 임시 그림 (A급 장면 exo-3-bush 만들 때 공들여 다시 그림). 특징: 두건, 긴 수염, 겉옷, 곧은 지팡이.
import { person } from './_kit.ts';

export default person({
  id: 'moses',
  name: '모세',
  base: 'man',
  hair: 'hood',
  beard: 'long',
  props: ['staff', 'cloak'],
  tint: 'brown',
  height: 1.04,
  traits: '옆모습, 두건, 긴 수염, 겉옷, 곧은 지팡이 (키트 임시 그림)',
});
