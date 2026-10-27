// 야곱 (이스라엘) — 발꿈치를 잡고 태어난 사람 (창 25–50).
// 기본 실루엣 키트로 만든 임시 그림 (A급 장면 gen-25-stew·gen-32-wrestle에서 다시 그림).
// 특징: 묶은 머리, 짧은 수염, 매끈한 몸(창 27:11), 지팡이 하나 ("내가 내 지팡이만 가지고", 창 32:10).
import { person } from './_kit.ts';

export default person({
  id: 'jacob',
  name: '야곱',
  base: 'man',
  hair: 'tied',
  beard: 'short',
  props: ['staff'],
  tint: 'green',
  traits: '옆모습, 묶은 머리, 짧은 수염, 지팡이 (키트 임시 그림)',
});
