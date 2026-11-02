// 바사 왕 아하수에로 — 크세르크세스 1세, 인도부터 구스까지 백이십칠 도의 왕 (에 1:1). 에스더의 왕.
// 10막 A급 est-2-queen(에 2 「왕후가 된 고아」)에서 키트 임시 그림을 공들여 다시 그림 (같은 파일 이름 → 에스더 모든 장면에 반영).
// 실루엣의 표지 (고레스 = 계단 톱니 원통 관·땅을 짚는 긴 홀과 구별):
//  - 뾰족한 톱니가 둘린 높고 각진 관 (위로 벌어짐) + 보석 띠 + 관 뒤로 목덜미를 덮어 늘어진 천
//  - 배까지 내려오는 아주 길고 네모난 수염 (세로로 땋은 줄 + 가로 곱슬 줄), 목덜미의 큰 곱슬 머리 뭉치
//  - 넓은 금 목깃(고리 목걸이), 소매가 크게 늘어진 자색 궁정 옷에 금 국화 무늬 점과 가운데 금 띠
//  - 앞손에 비스듬히 치켜든 짧은 금홀 (끝에 둥근 머리) — "왕이 그 자에게 금홀을 내어 밀어야 살 것이라" (4:11)
//  - 몸집이 크고 무겁다 (height 1.06)
//
// 옷: king (기본) 하나.
import type { CharacterDef } from './index';
import { BACK_ARM, FACE_MAN, LEGS_STOCKY, TORSO_STOCKY } from './_parts.ts';

// ── 머리 (hair 부위) ─────────────────────────────
/** 목덜미의 큰 곱슬 뭉치 + 관 뒤로 늘어진 천 */
const NAPE = `
  <path class="eta-cloth" d="M80 30 C72 44 70 62 72 84 C74 92 80 96 86 94 C86 80 86 62 90 44 Z"/>
  <ellipse class="eta-hair" cx="83" cy="72" rx="12" ry="15"/>
  <path class="detail" d="M73 64 h20 M72 71 h22 M73 78 h20 M75 85 h16" fill="none" stroke-width="0.9"/>`;
/** 배까지 내려오는 길고 네모난 수염 */
const BEARD = `
  <path class="eta-hair" d="M95 53 C103 59 112 62 119 64 L124 67 C128 80 129 100 128 120 L127 146 L100 146 C97 132 94 116 93 100 C91 82 91 66 95 53 Z"/>
  <path class="detail" d="M104 70 V144 M112 70 V144 M120 72 V144" fill="none" stroke-width="0.8"/>
  <path class="detail" d="M96 86 H127 M96 102 H128 M98 118 H128 M99 134 H127" fill="none" stroke-width="0.7"/>`;
/** 뾰족한 톱니가 둘린 높고 각진 관 */
const teeth = Array.from({ length: 8 }, (_, i) => {
  const x = 72 + i * 7.5;
  return `L${x + 3.75} -24 L${x + 7.5} -12`;
}).join(' ');
const CROWN = `
  <path class="eta-gold" d="M78 34 L72 -12 ${teeth} L132 -12 L126 31 C110 27 92 28 78 34 Z"/>
  <path class="eta-band" d="M76 22 C92 16 110 15 127 19 L127 28 C110 24 92 25 77 31 Z"/>
  ${[84, 94, 104, 114, 122].map((x, i) => `<circle class="eta-gem" cx="${x}" cy="${i === 0 ? 25.4 : 23.4 - (i % 2) * 0.6}" r="2"/>`).join('')}
  <path class="detail" d="M80 12 L127 8 M79 2 L128 -2" fill="none" stroke-width="0.8"/>`;
const HEAD = `${NAPE}${BEARD}${CROWN}`;

// ── 옷 (cloth 부위) ────────────────────────────
const ROBE = `
  <path class="eta-robe" d="M80 95 C88 90 96 88 104 89 C112 90 118 95 122 100 C129 106 133 114 132 124 C132 136 127 146 124 156 C122 166 122 176 124 186 C130 216 138 266 143 322 C146 352 148 374 150 392 Q138 397 124 393 Q110 398 96 393 Q84 397 72 392 C71 350 71 300 72 262 C73 230 75 200 78 176 C73 156 71 134 73 118 C74 108 76 100 80 95 Z"/>
  <!-- 가운데 금 띠와 치마 주름 -->
  <path class="eta-gold" d="M104 190 L108 190 L118 392 L110 393 Z"/>
  <path class="detail" d="M88 200 Q86 300 86 386 M96 200 Q98 300 100 388 M124 200 Q132 300 138 388" fill="none" stroke-width="0.9"/>
  <!-- 금 국화 무늬 점 -->
  ${[[86, 230], [94, 268], [84, 306], [96, 344], [128, 236], [132, 290], [136, 340], [90, 370], [126, 372]].map(([x, y]) => `<circle class="eta-dot" cx="${x}" cy="${y}" r="2.1"/>`).join('')}
  <path class="eta-gold" d="M72 380 Q90 386 106 381 Q126 387 150 380 L150 390 Q126 396 106 391 Q90 396 72 390 Z"/>
  <path class="eta-gold" d="M76 178 Q102 186 128 179 L128 190 Q102 197 76 189 Z"/>
  <!-- 넓은 금 목깃 -->
  <path class="eta-gold" d="M86 94 C96 88 110 88 120 96 C123 102 124 108 122 114 C110 120 96 120 86 114 C84 106 84 100 86 94 Z"/>
  <path class="detail" d="M88 101 C98 106 110 106 121 102 M87 108 C98 113 110 113 122 109" fill="none" stroke-width="0.8"/>`;

// ── 앞팔: 늘어진 넓은 소매 + 비스듬히 치켜든 짧은 금홀 ──
const ARM_SCEPTER = `
  <path class="eta-robe" d="M92 102 C100 94 114 96 118 108 C122 124 126 140 136 152 C140 158 140 166 134 170 C128 186 124 210 122 236 C116 240 106 240 100 236 C102 210 100 186 98 166 C96 146 94 124 92 102 Z"/>
  <path class="eta-gold" d="M100 232 C108 236 116 236 122 232 L122 239 C116 243 106 243 100 239 Z"/>
  <path class="detail" d="M102 140 Q110 186 108 230 M112 150 Q118 190 116 232" fill="none" stroke-width="0.8"/>
  <!-- 금홀: 손에서 앞위로 비스듬히 -->
  <path class="eta-scepter" d="M138 168 L176 104 L180 106 L142 170 Z"/>
  <circle class="eta-scepter" cx="179" cy="102" r="5.6"/>
  <circle class="eta-gem" cx="179" cy="102" r="2"/>
  <!-- 손 -->
  <path d="M130 156 C134 150 142 150 146 156 C149 161 148 168 144 172 C140 175 134 174 131 170 C129 166 128 160 130 156 Z"/>
  <path class="eta-gold" d="M128 152 C134 148 140 148 144 151 L143 156 C138 153 133 153 129 157 Z"/>`;

const ahasuerus: CharacterDef = {
  id: 'ahasuerus',
  name: '아하수에로',
  traits: '옆모습. 뾰족한 톱니가 둘린 높고 각진 금관(보석 띠, 목덜미로 늘어진 천), 배까지 내려오는 길고 네모난 수염(세로로 땋은 줄), 목덜미의 큰 곱슬 뭉치, 넓은 금 목깃, 금 국화 무늬 점과 가운데 금 띠가 있는 자색 궁정 옷, 크게 늘어진 소매, 앞손에 비스듬히 치켜든 짧은 금홀. 몸집이 큼',
  faces: 'right',
  height: 1.06,
  tint: '#5a2c74',
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
    markup: `
      <g data-part="legs">${LEGS_STOCKY}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_STOCKY}
        <g data-part="cloth">${ROBE}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 14)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_SCEPTER}</g>
      </g>`,
  },
};

export default ahasuerus;
