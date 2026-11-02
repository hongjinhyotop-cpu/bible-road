// 요사닥의 아들 예수아 — 첫 귀환 때의 대제사장 (스 2:2 · 3:2, 8-9 · 5:2, 학 1:1, 슥 3·6:11에서는 "여호수아").
// 모세 뒤의 여호수아(joshua)와 다른 사람. 대제사장 여호사닥(대상 6:15, 사로잡혀 감)의 아들.
// 10막 A급 ezr-3-foundation(스 3 「두 소리」)에서 키트 임시 그림을 공들여 다시 그림 (같은 파일 이름 → 에스라·학개·스가랴 장면에 반영).
// 실루엣의 표지 (아론 = 머릿수건·아몬드 지팡이, 엘르아살과 구별):
//  - 이마에 금패를 단 높은 관("여호와께 성결" 출 28:36) + 관 뒤로 늘어진 끈
//  - 가슴까지 오는 센 수염 (포로지에서 자라 돌아온 나이 든 대제사장)
//  - 열두 보석 흉패(세 빛깔이 섞임), 금실 띠를 맨 에봇, 청색 겉옷 아랫단의 방울과 석류 — 지팡이 없음
//
// 옷 ("outfit": {"jeshua-priest": "trumpet"}):
//  - priest (기본) : 위의 대제사장 차림, 앞손은 펴서 앞으로 (축복·인도). 되돌릴 때 이 이름.
//  - trumpet       : 같은 차림 + 손에 든 은 나팔 (스 3:10 "제사장들은 예복을 입고 나팔을 들고" — 민 10:2)
//  - linen         : 장식 없는 흰 세마포 옷과 관 (예복을 갖추기 전 — 제단을 쌓는 날, 스 3:2)
import type { CharacterDef } from './index';
import { ARM_BENT, BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';

// ── 머리 (hair 부위) ──────────────────────────
/** 센 수염 (가슴까지, 끝이 둥글게) */
const BEARD = `
  <path class="jp-beard" d="M97 54 C104 59 112 63 119 65 L123 68 C130 82 132 100 130 118 C128 130 122 140 114 146 C106 144 100 136 96 124 C92 110 91 92 91 80 C91 68 93 60 97 54 Z"/>
  <path class="detail" d="M104 76 Q110 104 106 136 M116 74 Q124 102 118 140" fill="none" stroke-width="0.8"/>
  <path class="jp-beard" d="M78 48 C74 56 74 66 77 74 C81 76 85 74 86 70 C84 62 84 56 86 50 Z"/>`;
/** 높게 감아 올린 관 + 이마의 금패 + 뒤로 늘어진 청색 끈 */
const MITRE = `
  <path class="jp-linen" d="M77 42 C70 12 84 -6 102 -6 C121 -6 132 10 128 36 C112 30 92 31 77 42 Z"/>
  <path class="detail" d="M80 30 Q102 19 126 27 M79 21 Q102 10 127 18 M83 11 Q103 2 124 9" fill="none" stroke-width="0.8"/>
  <path class="jp-gold" d="M105 22 L124 19 L125.6 29 L106.4 32 Z"/>
  <path class="detail" d="M109 26 h12" fill="none" stroke-width="0.7"/>
  <path class="jp-robe" d="M80 34 C74 46 70 62 68 80 L72 80 C74 64 78 50 84 38 Z"/>`;
const HEAD = `${MITRE}${BEARD}`;
/** 장식 없는 세마포 관 */
const LINEN_CAP = `
  <path class="jp-linen" d="M77 42 C71 16 84 0 102 0 C121 0 131 12 128 36 C112 30 92 31 77 42 Z"/>
  <path class="detail" d="M80 30 Q102 19 126 27 M80 20 Q102 10 127 18" fill="none" stroke-width="0.8"/>
  ${BEARD}`;

// ── 옷 (cloth 부위) ────────────────────────────
const ROBE_SHAPE = `M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 210 132 262 138 320 C141 350 144 372 147 390 Q136 395 124 391 Q112 396 100 391 Q88 395 77 390 C76 350 76 300 77 262 C78 230 80 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z`;
/** 대제사장 옷: 청색 겉옷 + 아랫단 방울·석류 + 에봇 + 금실 띠 + 어깨 호마노 */
const PRIEST = `
  <path class="jp-robe" d="${ROBE_SHAPE}"/>
  <path class="detail" d="M90 200 Q88 300 90 384 M112 200 Q124 300 136 384" fill="none" stroke-width="0.9"/>
  <g>${Array.from({ length: 8 }, (_, i) => {
    const x = 80 + i * 9;
    const y = 389 + (i % 2) * 2;
    return i % 2 ? `<circle class="jp-gold" cx="${x}" cy="${y}" r="2.3"/>` : `<path class="jp-ephod" d="M${x - 2.2} ${y + 2} Q${x} ${y - 4} ${x + 2.2} ${y + 2} Z"/>`;
  }).join('')}</g>
  <path class="jp-ephod" d="M85 99 C95 94 110 96 118 103 C124 110 125 124 122 142 C120 160 120 176 121 200 L84 202 C82 178 82 152 82 130 C81 116 82 106 85 99 Z"/>
  <path class="detail" d="M88 120 Q86 160 87 196 M100 110 Q99 160 100 198" fill="none" stroke-width="0.7"/>
  <path class="jp-gold" d="M83 180 Q102 187 121 180 L121 187 Q102 194 83 187 Z"/>
  <path class="jp-gold" d="M117 186 L122 218 L118 218 L114 188 Z"/>
  <circle class="jp-gem" cx="101" cy="101" r="3"/>`;
/** 세마포 옷: 흰 긴 옷 + 세마포 띠 */
const LINEN = `
  <path class="jp-linen" d="${ROBE_SHAPE}"/>
  <path class="detail" d="M90 200 Q88 300 90 384 M112 200 Q124 300 136 384" fill="none" stroke-width="0.7"/>
  <path class="jp-linen" d="M81 176 Q102 184 121 177 L121 185 Q102 193 81 184 Z"/>
  <path class="jp-linen" d="M110 186 L116 185 L118 250 C117 254 113 255 111 251 Z"/>`;

// ── 앞팔 ──────────────────────────────────────
/** 흉패: 가슴의 금 판에 열두 보석 (세 빛깔). 옆모습이라 앞팔 위에 얹는다 */
const PLATE = `
  <path class="jp-gold" d="M108 108 L128 106 L129.4 134 L109.4 136 Z"/>
  ${Array.from({ length: 12 }, (_, i) => {
    const c = i % 3;
    const r = Math.floor(i / 3);
    const cls = ['jp-gem', 'jp-gem2', 'jp-gem3'][(i + r) % 3];
    return `<rect class="${cls}" x="${(111 + c * 5.8).toFixed(1)}" y="${(110 + r * 6.2 - c * 0.2).toFixed(1)}" width="3.4" height="3.8" rx="0.8"/>`;
  }).join('')}
  <path class="jp-gold" d="M110 107 L112 98 M127 105 L124 97" fill="none" stroke-width="1.2"/>`;
const SLEEVE = `<path class="jp-robe" d="M92 104 C100 94 114 96 117 108 C118 122 117 136 117 146 C111 150 104 151 98 149 C96 134 94 118 92 104 Z"/>`;
const SLEEVE_LINEN = `<path class="jp-linen" d="M92 104 C100 94 114 96 117 108 C118 122 117 136 117 146 C111 150 104 151 98 149 C96 134 94 118 92 104 Z"/>`;
/** 은 나팔 (민 10:2) — 앞손에서 비스듬히 위로 */
const TRUMPET = `
  <path class="jp-silver" d="M140 150 L184 112 L186 115 L142 154 Z"/>
  <path class="jp-silver" d="M182 106 C188 104 194 108 194 114 L190 120 C186 120 182 116 182 106 Z"/>
  <circle class="jp-silver" cx="160" cy="135" r="2.4"/>`;
const ARM_PRIEST = `${ARM_BENT}${SLEEVE}${PLATE}`;
const ARM_TRUMPET = `${TRUMPET}${ARM_BENT}${SLEEVE}${PLATE}`;
const ARM_LINEN = `${ARM_BENT}${SLEEVE_LINEN}`;

const jeshua: CharacterDef = {
  id: 'jeshua-priest',
  name: '예수아',
  traits: '옆모습, 나이 든 대제사장. 이마에 금패를 단 높은 세마포 관과 뒤로 늘어진 청색 끈, 가슴까지 오는 센 수염, 열두 보석 흉패(세 빛깔), 금실 띠의 에봇, 청색 겉옷 아랫단의 방울과 석류. 지팡이 없음. trumpet: 앞손에 은 나팔. linen: 장식 없는 흰 세마포 옷과 관',
  faces: 'right',
  height: 0.99,
  tint: '#2a4a9a',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 100],
      cloth: [102, 110],
      hair: [86, 40],
    },
    outfits: {
      priest: { markup: PRIEST, pivot: [102, 110], parts: { hair: HEAD, armR: ARM_PRIEST } },
      trumpet: { markup: PRIEST, pivot: [102, 110], parts: { hair: HEAD, armR: ARM_TRUMPET } },
      linen: { markup: LINEN, pivot: [102, 110], parts: { hair: LINEN_CAP, armR: ARM_LINEN } },
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g data-part="cloth">${PRIEST}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 14)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_PRIEST}</g>
      </g>`,
  },
};

export default jeshua;
