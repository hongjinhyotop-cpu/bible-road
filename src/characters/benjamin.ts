// 베냐민 — 야곱의 막내, 라헬이 죽으며 낳은 아들 (창 35:18, 42–45).
// 기본 실루엣 키트로 만든 임시 그림 (A급 장면에서 공들여 다시 그릴 수 있음). 특징: 작은 키의 소년, 짧은 머리, 초록 옷, 등에 곡식 자루.
import { person } from './_kit.ts';

export default person({
  id: 'benjamin',
  name: '베냐민',
  base: 'youth',
  hair: 'short',
  beard: 'none',
  props: ['bundle'],
  tint: 'green',
  height: 0.9,
  traits: '옆모습, 작은 키, 짧은 머리, 초록 옷, 봇짐 (키트 임시 그림)',
});
