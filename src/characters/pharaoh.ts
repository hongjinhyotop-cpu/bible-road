// 바로 — 이집트 왕의 칭호 (창 12, 40–50, 출 1–14). 요셉 시대와 모세 시대의 바로는 다른 사람이지만 같은 그림을 쓴다.
// 기본 실루엣 키트로 만든 임시 그림. 특징: 왕관, 금빛 옷, 홀, 왕의 겉옷.
import { person } from './_kit.ts';

export default person({
  id: 'pharaoh',
  name: '바로',
  base: 'king',
  hair: 'crown',
  beard: 'none',
  props: ['scepter'],
  tint: 'gold',
  height: 1.04,
  traits: '옆모습, 왕관, 금빛 옷, 홀 (키트 임시 그림)',
});
