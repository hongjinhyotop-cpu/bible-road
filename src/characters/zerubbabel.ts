// 스알디엘의 아들 스룹바벨 — 첫 귀환을 이끈 다윗의 자손, 유다 총독 (스 2:2 · 3:2, 8 · 5:2, 학 1:1, 슥 4).
// 10막 A급 ezr-1-cyrus / ezr-3-foundation에서 키트 임시 그림을 공들여 다시 그림 (같은 파일 이름 → 에스라·학개·스가랴 장면에 반영).
// 실루엣의 표지 (느헤미야·에스라와 구별되게):
//  - 젊은 지도자: 곧은 등, 짧게 다듬은 검은 수염
//  - 흰 머릿수건을 감고 그 위에 가는 금 띠(왕관이 아니라 띠 — 다윗의 자손이지만 왕이 아니라 총독)
//  - 푸른 긴 옷 + 한쪽 어깨에 두른 갈색 겉옷(밑단 청색 술)
//  - 앞손에서 늘어진 다림줄(줄 끝의 추) — "스룹바벨의 손에 다림줄이 있음을 보고 기뻐하리라" (슥 4:10)
//
// 옷 ("outfit": {"zerubbabel": "travel"}):
//  - governor (기본) : 위의 차림. 되돌릴 때 이 이름.
//  - travel          : 먼 길 (스 1:11 · 2:1). 겉옷을 머리까지 덮어쓰고, 다림줄 대신 지팡이, 무릎 아래로 걷어 묶은 옷자락.
import type { CharacterDef } from './index';
import { ARM_BENT, BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';

// ── 머리 (hair 부위) ──────────────────────────
/** 짧게 다듬은 검은 수염 + 목덜미 곱슬 */
const BEARD = `
  <path d="M97 55 C104 60 112 63 119 65 L122 67 C125 76 125 86 121 94 L104 95 C98 90 94 82 93 74 C92 66 93 60 97 55 Z"/>
  <path d="M80 50 C76 58 76 68 80 76 C84 78 88 76 89 72 C86 64 86 56 88 50 Z"/>`;
/** 흰 머릿수건 + 가는 금 띠 */
const WRAP = `
  <path class="zr-wrap" d="M100 8 C86 8 76 16 74 30 C73 38 75 46 79 52 C82 46 86 40 92 36 C100 32 110 31 122 33 C122 20 113 8 100 8 Z"/>
  <path class="detail" d="M80 22 Q96 14 116 18 M77 32 Q96 24 120 27" fill="none" stroke-width="0.8"/>
  <path class="zr-gold" d="M76 36 C90 29 106 27 123 30 L123 34 C106 31 91 33 78 40 Z"/>
  <circle class="zr-gold" cx="108" cy="30.4" r="1.8"/>`;
const HEAD = `${WRAP}${BEARD}`;
/** 겉옷을 머리까지 덮어씀 (먼 길) */
const HOOD = `
  <path class="zr-mantle" d="M100 4 C84 4 72 14 69 30 C66 48 66 70 64 92 C62 110 62 124 64 136 C70 132 76 132 80 134 C80 114 82 94 86 78 C84 68 84 58 87 48 C90 38 98 32 110 31 C116 31 121 33 124 35 C123 18 113 4 100 4 Z"/>
  <path class="detail" d="M72 50 Q70 90 68 128" fill="none" stroke-width="0.8"/>
  ${BEARD}`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 푸른 긴 옷 + 어깨에 두른 갈색 겉옷 + 청색 술 */
const ROBE = `
  <path class="zr-robe" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 210 130 262 135 320 C138 350 140 372 142 390 Q131 395 119 391 Q107 396 95 391 Q85 395 77 390 C77 350 78 300 79 262 C80 230 81 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="detail" d="M81 178 Q100 185 121 179" fill="none" stroke-width="2.6"/>
  <path class="detail" d="M90 200 Q88 300 90 386 M112 200 Q122 300 132 386" fill="none" stroke-width="0.9"/>`;
const MANTLE = `
  <path class="zr-mantle" d="M92 88 C78 92 70 106 67 128 C63 164 66 214 66 262 C66 292 64 312 62 330 Q72 336 82 330 C84 290 85 240 87 196 C89 156 92 124 100 102 Z"/>
  <path class="zr-mantle" d="M88 92 C100 86 114 88 121 100 C123 110 122 118 120 124 C112 144 106 164 104 186 L94 184 C92 160 90 136 88 116 Z"/>
  <path class="zr-tassel" d="M62 330 l-2 12 l3 0 Z M72 334 l0 12 l3 0 Z M80 331 l2 12 l3 -1 Z"/>`;
const GOVERNOR = `${ROBE}${MANTLE}`;
/** 먼 길: 무릎 아래로 걷어 묶은 옷 + 덮어쓴 겉옷의 몸 자락 */
const TRAVEL = `
  <path class="zr-robe" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C123 210 128 250 131 300 Q118 306 104 300 Q92 306 80 300 C80 262 81 220 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="rope" d="M81 176 Q100 184 121 178 L121 184 Q100 191 81 183 Z"/>
  <path class="zr-mantle" d="M90 90 C78 96 70 110 67 132 C64 160 66 196 66 230 Q76 236 86 230 C86 200 88 164 92 132 C94 116 96 104 100 96 Z"/>`;

// ── 앞팔 ──────────────────────────────────────
/** 다림줄을 늘어뜨린 손 (슥 4:10) */
const ARM_PLUMB = `${ARM_BENT}
  <path class="zr-robe" d="M92 104 C100 94 114 96 117 108 C118 122 117 136 117 146 C111 150 104 151 98 149 C96 134 94 118 92 104 Z"/>
  <path class="zr-line" d="M147 158 L147 226"/>
  <path class="zr-plumb" d="M143 226 L151 226 L149.6 236 L147 240 L144.4 236 Z"/>`;
/** 지팡이를 쥔 손 (먼 길) */
const ARM_STAFF = `${ARM_BENT}
  <path class="zr-robe" d="M92 104 C100 94 114 96 117 108 C118 122 117 136 117 146 C111 150 104 151 98 149 C96 134 94 118 92 104 Z"/>`;
const STAFF = `<path class="zr-staff" d="M146 409 L147.4 110 C147.6 104 152 102 154 106 L151 110 L150.6 409 Z"/>`;

const zerubbabel: CharacterDef = {
  id: 'zerubbabel',
  name: '스룹바벨',
  traits: '옆모습, 곧은 젊은 지도자. 흰 머릿수건 위 가는 금 띠(왕관이 아님), 짧게 다듬은 검은 수염, 푸른 긴 옷과 한쪽 어깨에 두른 갈색 겉옷(청색 술), 앞손에서 늘어진 다림줄과 추(슥 4:10). travel: 겉옷을 머리까지 덮어쓰고 지팡이, 걷어 묶은 옷자락',
  faces: 'right',
  height: 1.0,
  tint: '#2e5a8a',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 100],
      cloth: [100, 150],
      hair: [86, 40],
    },
    outfits: {
      governor: { markup: GOVERNOR, parts: { hair: HEAD, legs: LEGS_SLIM, armR: ARM_PLUMB, armL: BACK_ARM } },
      travel: { markup: TRAVEL, parts: { hair: HOOD, legs: STAFF + LEGS_SLIM, armR: ARM_STAFF, armL: BACK_ARM } },
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g data-part="cloth">${GOVERNOR}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 12)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_PLUMB}</g>
      </g>`,
  },
};

export default zerubbabel;
