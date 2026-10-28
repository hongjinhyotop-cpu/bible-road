// 발람 — 브올의 아들, 유브라데 강변 브돌의 점술가 (민 22–24). A급 num-22-24-balaam 「발람과 나귀」에서 새로 그림.
// 메소포타미아 사람 티가 나게: 머리에 높고 끝이 둥근 고깔 모자(앞으로 살짝 숙음), 귀 아래 늘어뜨린 머리,
// 가로로 층층이 말린 네모난 긴 수염, 비스듬히 두른 술 달린 겉옷(가장자리마다 술), 손에 든 가는 지팡이(22:27 "자기 지팡이로").
// 모세의 굵은 지팡이·두건과 실루엣이 겹치지 않게: 키가 크고 마른 몸, 위로 솟은 모자.
// 나귀를 탄 모습은 donkey.ts(옷 ridden)에 같은 모자·수염으로 그려 넣었다.
import type { CharacterDef } from './index';
import { ARM_BENT, FACE_MAN, LEGS_SLIM, PIVOTS, TORSO_SLIM, figure } from './_parts.ts';

/** 높은 고깔 모자 + 귀 뒤로 늘어진 머리 */
export const BALAAM_CAP = `
  <path d="M74 40 C72 26 76 10 84 -4 C90 -16 98 -26 108 -32 C110 -24 112 -12 116 0 C120 12 124 24 126 36 C110 30 90 32 74 40 Z"/>
  <path class="crown" d="M73 38 C90 30 110 29 127 34 L127 40 C110 35 91 36 74 44 Z"/>
  <path class="detail" d="M84 30 C86 14 94 -4 106 -24 M96 30 C100 14 104 -2 110 -18" fill="none" stroke-width="0.9"/>
  <path d="M76 44 C72 58 70 76 70 94 C74 92 78 92 82 94 C82 80 84 66 88 56 Z"/>`;

/** 가로로 층층이 말린 네모난 긴 수염 */
export const BALAAM_BEARD = `
  <path d="M96 54 C104 59 112 63 119 65 L123 68 C130 82 133 100 132 120 C131 134 128 146 124 156 L96 158 C92 142 90 124 90 106 C90 86 91 68 96 54 Z"/>
  <path class="detail" d="M93 84 Q110 80 128 86 M92 100 Q110 96 131 102 M92 116 Q110 112 131 118 M93 132 Q110 128 129 134 M95 146 Q110 142 126 148" fill="none" stroke-width="1"/>`;

/** 술 달린 겉옷: 발목까지, 한쪽 어깨에서 비스듬히 감아 내려오고 가장자리마다 술 */
const FRINGED = `
  <path d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 210 132 262 138 320 C141 350 144 372 147 390 Q136 395 124 391 Q112 396 100 391 Q88 395 77 390 C76 350 76 300 77 262 C78 230 80 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path d="M86 96 C98 120 112 160 122 200 C126 214 128 226 130 236 L118 244 C112 214 100 170 82 128 Z"/>
  <path class="detail" d="M86 100 C98 124 112 166 124 236" fill="none" stroke-width="1.4"/>
  <path class="detail" d="M118 244 l-1 10 M121 242 l-1 10 M124 240 l-1 10 M127 238 l-1 10 M130 236 l-1 10" fill="none" stroke-width="1.2"/>
  <path class="detail" d="M78 392 l0 10 M84 393 l0 10 M90 393 l0 10 M96 392 l0 10 M102 392 l0 10 M108 393 l0 10 M114 393 l0 10 M120 392 l0 10 M126 392 l0 10 M132 393 l0 10 M138 392 l0 10 M144 391 l0 10" fill="none" stroke-width="1.6"/>
  <path class="detail" d="M81 178 Q100 185 121 179" fill="none" stroke-width="2.6"/>`;

/** 가는 지팡이: 위쪽이 살짝 휘고 끝에 작은 혹 */
const STAFF = `<path d="M142 409 L143 86 C143 78 145 72 149 68 L152 70 C149 74 148 80 148 86 L147 409 Z"/><circle cx="151" cy="66" r="4"/>`;

const balaam: CharacterDef = {
  id: 'balaam',
  name: '발람',
  traits: '옆모습, 크고 마른 몸, 위로 솟은 고깔 모자(금빛 띠), 가로로 층층이 말린 네모 수염, 술 달린 겉옷, 가는 지팡이',
  faces: 'right',
  height: 1.04,
  tint: '#6e3f8a',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: { ...PIVOTS, hair: [80, 50] },
    markup: figure({
      legs: LEGS_SLIM,
      torso: TORSO_SLIM,
      hair: '',
      face: FACE_MAN,
      beard: BALAAM_BEARD + BALAAM_CAP,
      cloth: FRINGED,
      frontArm: ARM_BENT,
      ground: STAFF,
    }),
  },
};

export default balaam;
