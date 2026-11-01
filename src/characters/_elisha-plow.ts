// 엘리사의 밭 가는 청년 옷 (왕상 19:19-21) — elisha.ts의 outfits에 더한다. 9막 A급 kgs1-19-whisper.
//  "저가 열 두 겨리 소를 앞세우고 밭을 가는데 자기는 열둘째 겨리와 함께 있더라 엘리야가 그리로 건너가서 겉옷을 그의 위에 던졌더니"
//  - plow        : 밭 가는 청년. 짧게 깎은 검은 머리와 짧은 수염, 무릎 위 짧은 튜닉과 새끼 띠, 소 모는 긴 막대(끝이 뾰족)
//  - plow-mantle : 같은 차림 위로 엘리야가 던진 겉옷이 어깨에 걸쳐 등 뒤로 늘어짐 (fx mantle-throw 다음 beat)
// 파일 이름이 _로 시작해서 인물 목록에는 안 잡힌다.
import type { Outfit } from './index';
import { ARM_BENT, BEARD_SHORT, LEGS_SLIM } from './_parts.ts';

/** 짧게 깎은 검은 머리 + 짧은 수염 (머리 좌표) */
const HAIR = `
  <path d="M100 15 C87 13 76 22 74 37 C73 46 74 55 77 62 C79 59 82 58 84 60 C83 52 84 45 88 40 C93 34 101 31 111 30 C116 30 120 31 122 33 C119 22 111 15 100 15 Z"/>
  ${BEARD_SHORT}`;

/** 무릎 위 짧은 튜닉 + 새끼 띠 */
const TUNIC = `
  <path class="es-plow" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C122 200 125 230 127 262 Q114 268 102 264 Q90 268 78 262 C78 236 80 210 82 190 C82 182 83 176 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="detail" d="M80 176 Q100 183 121 177" fill="none" stroke-width="2.6"/>
  <path class="detail" d="M104 182 L106 200 M108 182 L111 198" fill="none" stroke-width="1.2"/>
  <path class="detail" d="M92 196 Q90 230 92 260 M112 196 Q118 230 120 260" fill="none" stroke-width="0.8"/>`;

/** 엘리야의 겉옷이 어깨에 걸쳐 등 뒤로 (el-mantle 색 — styles/elijah.css) */
const THROWN = `
  <path class="el-mantle" d="M94 86 C78 90 66 104 62 126 C58 160 60 210 58 256 L56 292 Q66 298 76 292 Q84 298 92 290 C92 250 92 200 94 160 C95 130 96 110 101 94 Z"/>
  <path class="el-mantle-edge" d="M56 292 Q66 298 76 292 Q84 298 92 290" stroke-width="1.2"/>
  <path class="el-mantle" d="M86 90 C96 84 112 86 121 96 C125 104 126 112 125 120 C118 126 108 128 98 126 C92 124 88 120 85 116 C83 106 83 96 86 90 Z"/>
  <path class="el-mantle-edge" d="M85 116 C92 124 112 128 125 119" stroke-width="1"/>`;

/** 소 모는 긴 막대 (끝이 뾰족) — legs 부위, 땅에 닿음 */
const GOAD = `<path d="M142 409 L143.2 70 L146 70 L146.6 409 Z"/><path d="M143 72 L144.6 52 L146.2 72 Z"/>`;

export const PLOW_OUTFITS: Record<string, Outfit> = {
  plow: { markup: TUNIC, height: 0.98, parts: { hair: HAIR, legs: GOAD + LEGS_SLIM, armR: ARM_BENT } },
  'plow-mantle': { markup: TUNIC + THROWN, height: 0.98, parts: { hair: HAIR, legs: GOAD + LEGS_SLIM, armR: ARM_BENT } },
};
