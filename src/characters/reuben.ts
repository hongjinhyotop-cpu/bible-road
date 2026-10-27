// 르우벤 — 야곱의 맏아들. 요셉을 구덩이에서 건지려 했던 형 (창 29:32, 37, 42).
// 기본 실루엣 키트로 만든 임시 그림 (A급 장면에서 공들여 다시 그릴 수 있음). 특징: 덥수룩한 머리, 짧은 수염, 청색 옷, 목자 지팡이.
import { person } from './_kit.ts';

export default person({
  id: 'reuben',
  name: '르우벤',
  base: 'man',
  hair: 'shaggy',
  beard: 'short',
  props: ['crook'],
  tint: 'blue',
  height: 1.04,
  traits: '옆모습, 덥수룩한 머리, 짧은 수염, 청색 옷, 목자 지팡이 (키트 임시 그림)',
});
