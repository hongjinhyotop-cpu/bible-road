// 미리암 — 모세·아론의 누이. 갈대 상자를 지켜본 소녀, 홍해를 건넌 뒤 소고 치며 노래한 선지자 (출 2:4, 15:20).
// 기본 실루엣 키트로 만든 임시 그림. 특징: 너울, 보라 옷, 손에 바구니(소고 자리).
// 옷 girl = 소녀 때 (출 2:4-8 "그 누이"): 너울 없이 풀어 내린 머리, 키가 작다.
import { person } from './_kit.ts';

const miriam = person({
  id: 'miriam',
  name: '미리암',
  base: 'woman',
  hair: 'veil',
  props: ['basket'],
  tint: 'purple',
  height: 0.94,
  traits: '옆모습, 너울, 보라 옷, 바구니 (키트 임시 그림). 소녀 때(girl): 풀어 내린 머리, 작은 키',
});

if (miriam.art.kind === 'svg') {
  miriam.art.outfits = {
    girl: {
      height: 0.8,
      parts: {
        hair: `<path d="M100 13 C85 11 73 22 71 39 C69 58 70 82 66 108 C64 126 64 146 68 164 C72 154 77 150 82 152 C82 132 84 110 87 92 C82 78 81 62 85 50 C89 39 98 31 111 30 C117 30 121 32 123 34 C120 20 112 13 100 13 Z"/>`,
      },
    },
  };
}

export default miriam;
