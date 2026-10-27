// 에서 (에돔) — 야곱의 쌍둥이 형. 붉고 털 많은 사냥꾼 (창 25:25-27).
// 기본 실루엣 키트로 만든 임시 그림. 특징: 단단한 체격, 덥수룩한 머리, 짧은 튜닉, 어깨에 멘 활, 붉은 옷.
import { person } from './_kit.ts';

export default person({
  id: 'esau',
  name: '에서',
  base: 'youth',
  hair: 'shaggy',
  beard: 'short',
  props: ['bow'],
  tint: 'red',
  height: 1.03,
  traits: '옆모습, 덥수룩한 머리, 짧은 튜닉, 활, 붉은 옷 (키트 임시 그림)',
});
