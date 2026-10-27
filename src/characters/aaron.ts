// 아론 — 모세의 형(세 살 위, 출 7:7), 말을 대신 해 준 대변인. 나중에 첫 대제사장 (출 4:14–민 20).
// 3–5막에서 모세 다음으로 자주 나오는 사람. A급 exo-32-calf(출 32 「금송아지」)에서 키트 임시 그림을 다시 그림.
// 특징 (모세와 실루엣으로 구별되게):
//  - 모세보다 조금 작고, 나이 든 티가 난다 (어깨가 살짝 둥글다)
//  - 머리를 둥글게 감아 올린 머릿수건(뒤로 매듭, 목덜미로 늘어진 자락) — 모세는 어깨까지 덮는 두건
//  - 가슴까지 내려오는 길고 센(회색) 수염, 끝이 갈라져 물결친다 — 모세는 짙고 네모진 수염
//  - 가늘고 곧은 지팡이, 꼭대기에 아몬드 모양 손잡이, 마디마다 작은 눈(싹 자리 — 민 17:8 싹 난 지팡이) — 모세는 굵고 옹이진 막대기
//
// 옷 두 벌 (장면 beat의 "outfit": {"aaron": "priest"}):
//  - elder  : 기본 차림 (출 4–32). priest에서 돌아올 때 쓴다.
//  - priest : 대제사장 옷 (출 28, 39; 레 8 위임식부터). 이마에 금패를 단 관, 가슴에 열두 보석 흉패,
//             금실 띠를 맨 에봇, 겉옷 아랫단의 방울과 석류. 지팡이는 그대로.
import type { CharacterDef } from './index';
import { ARM_BENT, BACK_ARM, FACE_MAN, LEGS_SLIM, ROBE_LONG } from './_parts.ts';

// 가늘고 곧은 지팡이 + 아몬드 모양 손잡이 + 싹 눈 셋
const STAFF = `
  <path d="M148.6 409 L149.4 40 L154 40 L154.6 409 Z"/>
  <path d="M151.7 16 C156.4 22 157.6 31 154.4 40 L149 40 C146 31 147.2 22 151.7 16 Z"/>
  <path d="M154 118 C157 114 160 113 161 115 C159 117 157 119 154 121 Z"/>
  <path d="M149.2 214 C146 210 143 209 142 211 C144 213 146 215 149.2 217 Z"/>
  <path d="M154.4 300 C157.4 297 160 296 161 298 C159 300 157 301 154.4 303 Z"/>`;

// 머릿수건: 둥글게 감아 올린 수건, 감은 결, 뒤통수의 매듭, 목덜미로 늘어진 자락
const WRAP = `
  <path d="M80 44 C78 54 76 66 76 80 C76 92 79 102 84 110 C85 98 86 88 89 80 C85 70 84 58 86 48 Z"/>
  <path d="M77 40 C70 22 84 6 102 6 C120 6 130 17 128 35 C112 30 92 30 77 40 Z"/>
  <ellipse cx="74" cy="34" rx="6.5" ry="8.5"/>
  <path class="detail" d="M80 30 Q102 19 126 27 M78 36 Q101 26 127 32 M86 18 Q104 11 120 17" fill="none" stroke-width="1"/>`;

// 대제사장의 관: 더 높이 감아 올리고 이마에 금패 (출 28:36-38 "여호와께 성결")
const MITRE = `
  <path d="M80 44 C78 54 76 66 76 80 C76 92 79 102 84 110 C85 98 86 88 89 80 C85 70 84 58 86 48 Z"/>
  <path d="M77 40 C70 12 84 -4 102 -4 C121 -4 131 10 128 35 C112 30 92 30 77 40 Z"/>
  <path class="detail" d="M80 30 Q102 19 126 27 M79 22 Q102 11 127 19 M83 12 Q103 3 124 10" fill="none" stroke-width="1"/>
  <path class="crown" d="M106 22 L124 19.5 L125.4 28.5 L107.2 31 Z"/>
  <path class="detail" d="M110 25.5 h10" fill="none" stroke-width="0.7"/>`;

// 길고 센 수염: 가슴까지, 끝이 셋으로 갈라져 물결친다
const BEARD = `<g class="gray">
  <path d="M97 54 C104 59 112 63 119 65 L123 68 C132 82 137 102 136 124 C135 140 131 152 125 166 L120 154 L115 172 L110 157 L104 168 L101 151 C94 134 91 116 91 98 C90 80 92 64 97 54 Z"/>
  <path class="detail" d="M106 78 Q113 116 109 156 M118 76 Q128 114 121 158" fill="none" stroke-width="0.9"/>
</g>`;

// 기본 차림: 긴 옷 + 등 뒤로 짧게 늘어진 겉옷
const ELDER = `
  ${ROBE_LONG}
  <path d="M86 94 C76 102 70 120 68 146 C66 180 67 214 70 246 C72 262 71 274 67 286 C74 285 80 287 85 290 C86 254 87 214 88 178 C89 144 90 116 92 100 Z"/>
  <path class="detail" d="M77 122 Q72 200 74 280" fill="none" stroke-width="1"/>`;

// 대제사장 옷 (출 28): 청색 겉옷 아랫단의 방울·석류, 에봇과 금실 띠, 열두 보석 흉패, 어깨의 호마노
const PRIEST = `
  ${ROBE_LONG}
  <g class="crown">${Array.from({ length: 7 }, (_, i) => {
    const x = 82 + i * 9.6;
    const y = 386 + (i % 2) * 2;
    return i % 2 ? `<circle cx="${x}" cy="${y}" r="2.2"/>` : `<path d="M${x - 2} ${y + 2} Q${x} ${y - 4} ${x + 2} ${y + 2} Z"/>`;
  }).join('')}</g>
  <path d="M85 99 C95 94 110 96 118 103 C124 110 125 124 122 142 C120 160 120 176 121 198 L84 200 C82 178 82 152 82 130 C81 116 82 106 85 99 Z"/>
  <path class="crown" d="M83 180 Q102 187 121 180 L121 187 Q102 194 83 187 Z"/>
  <path class="crown" d="M117 186 L121 214 L117 214 L114 188 Z"/>
  <circle class="glint" cx="102" cy="101" r="2.6"/>`;

// 흉패 (출 28:15-21): 가슴의 금 판에 열두 보석. 옆모습에선 팔·수염에 가리니 앞팔 위에 얹는다
const PLATE = `
  <path class="crown" d="M110 112 L128 110 L129 136 L111 138 Z"/>
  <g class="glint">${Array.from({ length: 12 }, (_, i) => {
    const c = i % 3;
    const r = Math.floor(i / 3);
    return `<rect x="${(112.6 + c * 5.6).toFixed(1)}" y="${(114 + r * 5.8 - c * 0.2).toFixed(1)}" width="3.2" height="3.6" rx="0.8"/>`;
  }).join('')}</g>`;

const aaron: CharacterDef = {
  id: 'aaron',
  name: '아론',
  traits: '옆모습, 모세보다 조금 작고 나이 든 체격, 둥글게 감아 올린 머릿수건(뒤 매듭, 목덜미 자락), 가슴까지 오는 길고 센 수염, 청색 옷, 가늘고 곧은 지팡이(아몬드 손잡이, 싹 눈). 대제사장 차림(priest): 금패 단 관, 열두 보석 흉패, 금실 띠 에봇, 아랫단 방울과 석류',
  faces: 'right',
  height: 1.01,
  tint: '#3e5f9a',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 102],
      cloth: [102, 110],
      hair: [86, 44],
    },
    outfits: {
      elder: { markup: ELDER, pivot: [102, 110], parts: { hair: WRAP, armR: ARM_BENT } },
      priest: { markup: PRIEST, pivot: [102, 110], parts: { hair: MITRE, armR: ARM_BENT + PLATE } },
    },
    markup: `
      <g data-part="legs">${STAFF}${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        <!-- 몸통: 어깨가 살짝 둥글다 -->
        <path d="M91 74 C90 82 87 88 83 93 C78 99 76 109 77 121 C78 141 84 157 86 173 C84 187 80 198 80 212 C80 220 85 228 92 230 L118 230 C122 220 121 206 119 196 C117 186 116 180 117 172 C119 160 121 148 122 140 C126 132 127 120 124 110 C120 100 115 95 110 89 C108 85 108 81 108 76 Z"/>
        <g data-part="cloth" class="tone2">${ELDER}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 11)">
            <g data-part="hair">${WRAP}</g>
            ${FACE_MAN}
            ${BEARD}
          </g>
        </g>
        <g data-part="armR">${ARM_BENT}</g>
      </g>`,
  },
};

export default aaron;
