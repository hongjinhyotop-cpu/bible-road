// 요셉 — 야곱이 사랑한 아들, 꿈꾸는 사람. 형들에게 팔려 이집트 총리가 됨 (창 30:24, 37–50).
// 기본 실루엣 키트로 만든 임시 그림 (A급 장면에서 공들여 다시 그릴 수 있음). 특징: 수염 없는 젊은 얼굴, 묶은 머리, 흰 옷에 겉옷(채색옷 자리).
import { person } from './_kit.ts';

export default person({
  id: 'joseph',
  name: '요셉',
  base: 'youth',
  hair: 'tied',
  beard: 'none',
  props: ['cloak'],
  tint: 'white',
  height: 1,
  traits: '옆모습, 수염 없음, 묶은 머리, 흰 옷 + 겉옷 (키트 임시 그림)',
});
