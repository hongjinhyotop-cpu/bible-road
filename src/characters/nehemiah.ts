// 하가랴의 아들 느헤미야 — 바사 왕 아닥사스다의 술 맡은 관원, 뒤에 유다 총독 (느 1–13).
// 10막 A급 neh-1-2(「짧은 기도」)에서 키트 임시 그림을 공들여 다시 그림 (같은 파일 이름 → 느헤미야서의 모든 장면에 반영).
// 실루엣의 표지 (에스라 = 긴 흰 수염·높은 두건·두루마리, 스룹바벨·고레스와 구별):
//  - 바사 궁정풍의 둥근 모자: 앞으로 살짝 숙은 부드러운 둥근 꼭대기 + 이마 띠 + 목덜미로 늘어진 덮개 (메대·바사 궁정 관리의 모자)
//  - 짧게 다듬어 끝이 둥글게 말린 수염 (바사 궁정풍)
//  - 왕의 술 맡은 관원(cupbearer, 기본): 넓게 늘어지는 소매의 궁정 긴 옷(앞자락에 비스듬한 주름), 금띠, 앞손에 든 금잔과 팔에 걸친 수건 (느 1:11, 2:1)
//
// 옷 ("outfit": {"nehemiah": "governor"}):
//  - cupbearer (기본) : 위의 차림. 되돌릴 때 이 이름.
//  - governor         : 성벽 공사의 총독 (느 4–6). 같은 모자, 무릎까지 오는 띠 맨 겉옷과 바지, 걷어 올린 소매, 허리에 찬 칼(칼집) —
//                       "건축하는 자는 각각 칼을 차고 건축하며" (4:18). 빈손.
import type { CharacterDef } from './index';
import { ARM_BENT, ARM_DOWN, BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';

// ── 머리 (hair 부위 — 모자·수염) ─────────────────
/** 바사 궁정 모자: 둥근 꼭대기(앞으로 살짝) + 목덜미 덮개 + 이마 띠 */
const CAP = `
  <path class="nm-cap" d="M122 37 C124 24 120 10 110 4 C104 0 96 0 90 3 C78 9 71 21 70 34 C69 46 70 56 72 64 C70 78 70 94 72 108 C76 110 82 110 86 108 C86 96 86 82 88 70 C86 62 86 52 89 46 C96 40 108 37 122 37 Z"/>
  <path class="nm-band" d="M71 44 C86 36 104 33 124 35 L124 41 C104 39 88 42 73 51 Z"/>
  <path class="detail" d="M84 12 Q96 8 112 10 M76 24 Q92 18 116 20 M78 64 Q76 86 78 104" fill="none" stroke-width="0.8"/>`;
/** 짧게 다듬어 끝이 말린 수염 */
const BEARD = `
  <path class="nm-beard" d="M97 55 C104 60 112 63 119 65 L122 67 C125 75 125 83 121 89 C116 93 108 93 102 90 C97 85 94 79 93 72 C92 66 93 60 97 55 Z"/>
  <circle class="nm-beard" cx="104" cy="91" r="2.6"/><circle class="nm-beard" cx="110.5" cy="93" r="2.6"/><circle class="nm-beard" cx="117" cy="91" r="2.4"/>
  <path class="detail" d="M104 72 Q108 80 106 88 M113 72 Q117 80 115 88" fill="none" stroke-width="0.7"/>`;
const HEAD = `${CAP}${BEARD}`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 바사 궁정 긴 옷: 앞자락의 비스듬한 주름, 금띠, 깃 */
const COURT = `
  <path class="nm-robe" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C126 214 136 264 144 320 C148 350 151 372 154 390 Q140 396 126 391 Q110 397 96 391 Q86 395 77 390 C76 350 76 300 77 262 C78 230 80 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="nm-pleat" d="M112 196 L150 384 M106 198 L138 388 M100 200 L124 390 M120 194 L154 372"/>
  <path class="nm-pleat" d="M88 200 Q86 300 88 386"/>
  <path class="nm-trim" d="M77 380 Q90 386 100 382 Q118 388 154 380 L154 390 Q140 396 126 391 Q110 397 96 391 Q86 395 77 390 Z"/>
  <path class="nm-trim" d="M80 172 Q101 180 122 173 L122 183 Q101 190 80 182 Z"/>
  <path class="nm-trim" d="M104 183 L109 183 L110 220 L106 224 L102 220 Z"/>
  <path class="nm-trim" d="M100 92 C104 98 110 100 116 100 L115 105 C108 105 102 102 98 97 Z"/>`;
/** 총독의 차림: 무릎까지 오는 띠 맨 겉옷 + 바지 자락 + 허리의 칼 */
const GOVERNOR = `
  <path class="nm-coat" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 204 130 236 134 268 L136 284 Q122 290 108 285 Q94 290 80 284 L78 282 C78 250 79 220 81 196 C81 186 82 178 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="nm-pleat" d="M92 196 L88 280 M108 196 L114 284 M118 192 L128 278"/>
  <path class="nm-trim" d="M78 274 Q94 280 108 276 Q122 281 136 275 L136 284 Q122 290 108 285 Q94 290 80 284 Z"/>
  <path class="nm-leather" d="M80 172 Q101 180 122 173 L122 183 Q101 190 80 182 Z"/>
  <!-- 칼집과 칼자루 (오른허벅지 앞) -->
  <path class="nm-leather" d="M114 186 L121 184 L152 244 C153 248 149 251 146 248 Z"/><path class="nm-trim" d="M146 240 L152 238 L154 244 L149 247 Z"/>
  <path class="nm-sword" d="M110 180 L118 177 L120 182 L113 186 Z"/>
  <rect class="nm-sword" x="111" y="170" width="4" height="10" rx="1.6" transform="rotate(-20 113 175)"/>
  <circle class="nm-trim" cx="111" cy="168" r="2.6"/>
  <path class="nm-trim" d="M100 92 C104 98 110 100 116 100 L115 105 C108 105 102 102 98 97 Z"/>`;

// ── 앞팔 ──────────────────────────────────────
/** 넓게 늘어지는 궁정 소매 */
const SLEEVE = `<path class="nm-robe" d="M92 104 C91 97 97 94 104 95 C111 96 115 101 116 110 C117 122 117 134 118 146 C122 156 122 168 116 178 C110 176 104 170 100 162 C97 146 94 124 92 106 Z"/>
  <path class="nm-trim" d="M118 146 C122 156 122 168 116 178 L112 175 C117 166 117 156 114 148 Z"/>`;
/** 금잔(굽 달린 잔)을 든 손 + 팔에 걸친 수건 */
const CUP = `
  <path class="nm-cup" d="M135 122 C136 132 141 137 147 137 C153 137 158 132 159 122 Z"/>
  <ellipse class="nm-cup" cx="147" cy="122" rx="12" ry="2.2"/>
  <rect class="nm-cup" x="145.5" y="136" width="3" height="12"/>
  <ellipse class="nm-cup" cx="147" cy="167" rx="6" ry="1.6"/>
  <rect class="nm-cup" x="145.6" y="160" width="2.8" height="7"/>`;
const NAPKIN = `<path class="nm-band" d="M120 166 C124 168 128 168 132 166 L134 186 L130 182 L127 190 L124 183 L120 188 Z"/>`;
const ARM_CUP = `${ARM_BENT}${CUP}${SLEEVE}${NAPKIN}`;
/** 걷어 올린 소매 (팔꿈치 위에 말린 단) */
const ARM_ROLLED = `${ARM_DOWN}
  <path class="nm-coat" d="M93 104 C92 97 98 94 104 95 C110 96 113 101 113 110 C113 120 112 128 111 136 C106 139 100 139 96 136 C95 124 94 112 93 104 Z"/>
  <path class="nm-trim" d="M95 132 C101 136 107 136 112 132 L111 140 C106 143 100 143 96 140 Z"/>`;

const nehemiah: CharacterDef = {
  id: 'nehemiah',
  name: '느헤미야',
  traits: '옆모습. 바사 궁정풍 둥근 모자(앞으로 살짝 숙은 꼭대기, 청색 이마 띠, 목덜미 덮개), 짧게 다듬어 끝이 말린 수염. cupbearer(기본): 넓은 소매의 궁정 긴 옷(앞자락 비스듬한 주름·금띠·금단), 앞손에 든 굽 달린 금잔과 팔에 걸친 수건. governor: 무릎까지 오는 청색 겉옷에 가죽띠, 오른허벅지 앞의 칼집과 칼자루, 걷어 올린 소매, 빈손',
  faces: 'right',
  height: 1.0,
  tint: '#8a6430',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 100],
      cloth: [100, 150],
      hair: [80, 50],
    },
    outfits: {
      cupbearer: { markup: COURT, parts: { hair: HEAD, legs: LEGS_SLIM, armR: ARM_CUP, armL: BACK_ARM } },
      governor: { markup: GOVERNOR, parts: { hair: HEAD, legs: LEGS_SLIM, armR: ARM_ROLLED, armL: BACK_ARM } },
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g data-part="cloth">${COURT}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 14)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_CUP}</g>
      </g>`,
  },
};

export default nehemiah;
