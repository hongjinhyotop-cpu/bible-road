// 솔로몬 — 다윗과 밧세바의 아들, 이스라엘의 셋째 왕 (삼하 12:24, 왕상 1–11).
// 4단계 A급 kgs1-3-wisdom(왕상 3 「무엇을 줄꼬」)에서 키트 임시 그림을 공들여 다시 그림.
// 실루엣의 표지 (다윗 king = 낮은 금관·둥근 수염·끌리는 겉옷·손의 수금과 구별):
//  - 높고 가는 관: 끝에 구슬이 달린 다섯 봉우리 + 보석 띠. 다윗의 낮은 관보다 위로 솟는다
//  - 수염 없는 젊은 얼굴, 목덜미에서 금띠로 묶은 곧은 머리 — "나는 작은 아이라" (왕상 3:7)
//  - 가늘고 곧은 몸, 기둥처럼 곧게 떨어지는 긴 옷 + 금실 세로 줄 + 어깨를 덮는 짧은 망토(금빛 술)
//  - 앞손에 세워 든 두루마리 — 지혜 (잠언 삼천, 왕상 4:32)
//
// 옷 (장면 맨 위 "outfit": {"solomon": "old"} 또는 beat의 "outfit"):
//  - young (기본) : 젊은 왕 (왕상 1–10). 위의 차림 그대로. 옷을 갈아입힌 뒤 되돌릴 때 이 이름을 쓴다.
//  - old          : 늙은 왕 (왕상 11 "왕의 나이 늙을 때에"). 위아래 세 겹으로 무거워진 관, 회색 머리와 회색 수염,
//                   등이 둥글게 솟은 두꺼운 겉옷에 여러 나라 무늬 띠(지그재그·꽃 무늬·초승달·톱니),
//                   앞손에는 지팡이처럼 땅을 짚은 긴 홀 — 화려함이 무게가 된 모습.
import type { CharacterDef } from './index';
import { ARM_BENT, BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';

// ── 머리 (hair 부위) ───────────────────────────
/** 곧은 머리: 이마를 덮고 목덜미로 내려와 금띠로 묶어 등 쪽으로 늘어뜨림 */
const HAIR_YOUNG = `
  <path d="M101 14 C88 12 77 20 74 34 C72 46 72 58 74 70 C75 76 77 80 80 82 C82 76 84 72 87 70 C84 62 84 52 87 45 C91 37 99 32 110 31 C117 31 122 33 125 36 C123 22 113 14 101 14 Z"/>
  <path d="M77 74 C73 84 70 96 70 110 C70 118 72 124 75 128 C78 120 80 110 82 98 C83 90 83 82 82 76 Z"/>
  <path class="so-gold" d="M74 78 L84 76 L85 81 L75 83 Z"/>`;

/** 높은 관 (젊은 왕): 보석 띠 + 끝에 구슬 달린 다섯 가는 봉우리 */
const CROWN_YOUNG = `
  <path class="so-gold" d="M76 30 C92 24 110 23 126 28 L126 37 C110 32 92 33 77 39 Z"/>
  <path class="so-gold" d="M78 31 L80 6 L85 27 L91 -2 L97 25 L104 -6 L110 24 L117 -1 L121 26 L125 6 L124 29 Z"/>
  <circle class="so-gold" cx="80" cy="5" r="2.6"/><circle class="so-gold" cx="91" cy="-3" r="2.8"/><circle class="so-gold" cx="104" cy="-7.4" r="3"/>
  <circle class="so-gold" cx="117" cy="-2" r="2.8"/><circle class="so-gold" cx="125" cy="5" r="2.4"/>
  <circle class="so-gem" cx="91" cy="32.6" r="1.6"/><circle class="so-gem" cx="104" cy="30.4" r="2.1"/><circle class="so-gem" cx="117" cy="30.6" r="1.6"/>`;

const HEAD_YOUNG = `${HAIR_YOUNG}${CROWN_YOUNG}`;

/** 늙은 왕: 어깨로 흘러내린 회색 머리 + 가슴까지 오는 회색 수염(끝이 모임) + 세 겹으로 무거워진 관 */
const HEAD_OLD = `
  <g class="gray">
    <path d="M101 14 C88 12 77 20 74 34 C72 48 72 62 71 76 C70 88 68 98 70 106 C74 101 78 99 82 101 C82 92 84 84 87 76 C84 66 84 54 87 46 C91 37 99 32 110 31 C117 31 122 33 125 36 C123 22 113 14 101 14 Z"/>
    <path d="M96 55 C103 60 111 63 119 65 L123 68 C129 80 131 96 128 112 C126 124 120 134 112 142 C109 132 105 124 102 118 C96 106 92 92 91 80 C90 70 92 61 96 55 Z"/>
  </g>
  <path class="detail" d="M106 80 Q112 104 109 130 M117 78 Q124 100 119 134" fill="none" stroke-width="0.8"/>
  <path class="so-gold" d="M73 32 C91 25 110 24 128 29 L128 40 C110 35 91 36 74 43 Z"/>
  <path class="so-gold" d="M75 32 L72 12 L84 22 L86 4 L96 20 L104 0 L112 19 L121 3 L123 21 L131 10 L127 31 Z"/>
  <path class="so-gold" d="M78 12 C92 7 112 6 128 10 L127 15 C112 11 92 12 79 17 Z"/>
  <circle class="so-gold" cx="86" cy="3" r="2.6"/><circle class="so-gold" cx="104" cy="-1" r="3"/><circle class="so-gold" cx="121" cy="2" r="2.6"/>
  <circle class="so-gem" cx="86" cy="35" r="1.8"/><circle class="so-gem" cx="98" cy="33" r="1.8"/><circle class="so-gem" cx="110" cy="32.6" r="2.2"/><circle class="so-gem" cx="121" cy="34" r="1.8"/>
  <path class="so-gold" d="M76 41 L74 54 L77 54 L79 42 Z M126 40 L127 52 L130 52 L129 40 Z"/>
  <circle class="so-gold" cx="75.6" cy="56" r="2"/><circle class="so-gold" cx="128.6" cy="54" r="2"/>`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 기둥처럼 곧게 떨어지는 긴 옷 + 금실 세로 줄 + 아랫단 무늬 띠 + 앞으로 늘어진 넓은 금띠 */
const ROBE = `
  <path class="so-robe" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C123 212 128 262 131 320 C133 350 134 372 135 392 Q124 397 112 393 Q100 398 88 393 Q78 397 72 392 C73 350 75 300 77 262 C78 230 80 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="so-thread" d="M88 196 Q86 296 84 388 M97 196 Q97 296 98 390 M106 196 Q110 296 112 390 M114 196 Q121 296 125 390" fill="none" stroke-width="0.9"/>
  <path class="so-gold" d="M73 372 Q86 377 100 373 Q114 378 135 373 L135 386 Q114 391 100 386 Q86 390 73 385 Z"/>
  <path class="so-robe" d="M78 377 L84 382 L78 383 Z M90 377 L96 382 L90 383 Z M102 376 L108 381 L102 382 Z M114 376 L120 381 L114 382 Z M126 375 L132 380 L126 381 Z"/>
  <path class="so-gold" d="M80 172 Q100 180 122 174 L122 183 Q100 190 80 181 Z"/>
  <path class="so-gold" d="M106 182 L112 182 L115 262 L109 270 L104 262 Z"/>
  <circle class="so-gem" cx="101" cy="180" r="2.2"/>`;
/** 어깨를 덮는 짧은 망토: 등 쪽과 앞쪽 자락, 끝에 금빛 술 */
const MANTLE = `
  <path class="so-robe so-mantle" d="M90 84 C76 88 68 102 66 122 C64 138 66 152 70 162 L76 158 L80 166 L86 160 L92 166 L96 154 C94 132 94 110 98 94 Z"/>
  <path class="so-gold" d="M70 158 L76 154 L80 162 L86 156 L92 162 L95 152 L96 158 L92 168 L86 162 L80 168 L76 160 L71 164 Z"/>
  <path class="so-robe so-mantle" d="M86 90 C98 85 112 88 121 98 C124 104 126 112 125 120 C118 124 110 126 102 126 C96 126 90 124 85 120 C83 110 83 98 86 90 Z"/>
  <path class="so-gold" d="M85 116 C93 122 112 124 125 116 L125 122 C112 130 93 128 85 122 Z"/>
  <path class="so-gold" d="M85 94 C93 100 106 102 116 97 L117 102 C106 108 92 106 84 99 Z"/>`;
const YOUNG = `${ROBE}${MANTLE}`;

/** 늙은 왕의 두꺼운 겉옷: 등이 둥글게 솟고(굽은 등), 몸 전체를 감싸 아래로 퍼지며, 여러 나라 무늬 띠가 겹겹이 */
const bandY = [212, 262, 312, 360];
const OLD_ROBE = `
  <path class="so-robe" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 210 132 262 138 320 C141 350 144 372 147 390 Q136 395 124 391 Q112 396 100 391 Q88 395 77 390 C76 350 76 300 77 262 C78 230 80 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="so-heavy" d="M96 78 C78 72 58 80 50 100 C44 116 46 132 52 146 C58 164 60 190 60 226 C60 266 58 306 54 346 C52 366 50 384 48 398 Q70 404 92 400 Q104 403 114 399 C110 360 108 316 108 270 C108 226 110 188 114 158 C118 130 120 108 112 92 C108 84 102 80 96 78 Z"/>
  <path class="detail" d="M60 112 Q50 150 60 200 M74 98 Q66 180 70 300 Q72 360 70 396 M90 94 Q86 200 88 398" fill="none" stroke-width="1"/>
  <!-- 무늬 띠: 지그재그(아래) · 꽃 무늬 · 초승달 · 톱니 — 여러 나라에서 들어온 것들 -->
  <path class="so-gold" d="M50 ${bandY[3]} Q80 ${bandY[3] + 5} 110 ${bandY[3]} L110 ${bandY[3] + 14} Q80 ${bandY[3] + 19} 49 ${bandY[3] + 14} Z"/>
  <path class="so-heavy" d="${Array.from({ length: 6 }, (_, i) => `M${52 + i * 10} ${bandY[3] + 12} L${57 + i * 10} ${bandY[3] + 3} L${62 + i * 10} ${bandY[3] + 12} Z`).join(' ')}"/>
  <path class="so-gold" d="M55 ${bandY[2]} Q82 ${bandY[2] + 4} 109 ${bandY[2]} L109 ${bandY[2] + 10} Q82 ${bandY[2] + 14} 55 ${bandY[2] + 10} Z"/>
  ${Array.from({ length: 5 }, (_, i) => `<circle class="so-heavy" cx="${61 + i * 11}" cy="${bandY[2] + 6}" r="2.6"/><circle class="so-gem" cx="${61 + i * 11}" cy="${bandY[2] + 6}" r="1"/>`).join('')}
  <path class="so-gold" d="M58 ${bandY[1]} Q84 ${bandY[1] + 4} 108 ${bandY[1]} L108 ${bandY[1] + 9} Q84 ${bandY[1] + 13} 58 ${bandY[1] + 9} Z"/>
  ${Array.from({ length: 4 }, (_, i) => `<path class="so-heavy" d="M${64 + i * 12} ${bandY[1] + 2} A3.4 3.4 0 1 0 ${64 + i * 12} ${bandY[1] + 9} A2.4 2.4 0 1 1 ${64 + i * 12} ${bandY[1] + 2} Z"/>`).join('')}
  <path class="so-gold" d="M60 ${bandY[0]} Q86 ${bandY[0] + 4} 110 ${bandY[0]} L110 ${bandY[0] + 8} Q86 ${bandY[0] + 12} 60 ${bandY[0] + 8} Z"/>
  <path class="so-heavy" d="${Array.from({ length: 8 }, (_, i) => `M${62 + i * 6} ${bandY[0] + 8} L${65 + i * 6} ${bandY[0] + 3} L${68 + i * 6} ${bandY[0] + 8} Z`).join(' ')}"/>
  <!-- 어깨의 두꺼운 깃 -->
  <path class="so-gold" d="M58 100 C70 86 94 82 114 92 L116 100 C96 92 72 96 60 108 Z"/>
  <path class="so-gold" d="M80 172 Q100 180 122 174 L122 182 Q100 189 80 180 Z"/>`;

// ── 앞팔 ──────────────────────────────────────
/** 세워 든 두루마리 (양 끝에 손잡이 막대) — 손보다 뒤에 그린다 */
const SCROLL = `
  <rect class="so-scroll" x="137" y="118" width="13" height="64" rx="4"/>
  <path class="detail" d="M140 126 L140 174 M146 124 L146 176" fill="none" stroke-width="0.6"/>
  <path class="so-gold" d="M141.6 108 L145.4 108 L145.4 119 L141.6 119 Z M141.6 181 L145.4 181 L145.4 192 L141.6 192 Z"/>
  <circle class="so-gold" cx="143.5" cy="107" r="2.6"/><circle class="so-gold" cx="143.5" cy="193" r="2.6"/>`;
const ARM_SCROLL = `${SCROLL}${ARM_BENT}<path class="so-gold" d="M112 162 L118 159 L119 170 L113 172 Z"/>`;

/** 늙은 왕: 굽힌 팔로 긴 홀을 지팡이처럼 짚는다 (홀은 legs 부위 — 땅에 붙어 있게) + 겉옷 소매 */
const ARM_OLD = `
  ${ARM_BENT}
  <path class="so-heavy" d="M90 92 C100 86 114 90 119 102 C122 112 121 128 120 146 C116 150 108 154 100 154 C96 136 92 114 90 92 Z"/>
  <path class="so-gold" d="M100 148 C108 150 116 148 121 142 L121 150 C114 156 106 158 99 156 Z"/>`;
const SCEPTER_CANE = `
  <path class="so-gold" d="M141.2 409 L141.8 150 L146.2 150 L146.8 409 Z"/>
  <path class="so-gold" d="M136 150 L152 150 L150 144 C150 136 147 130 144 126 C141 130 138 136 138 144 Z"/>
  <circle class="so-gem" cx="144" cy="139" r="2"/>
  <circle class="so-gold" cx="144" cy="123" r="3.4"/>`;

const solomon: CharacterDef = {
  id: 'solomon',
  name: '솔로몬',
  traits: '옆모습. 젊은 왕(기본 young): 수염 없는 얼굴, 목덜미에서 금띠로 묶은 곧은 머리, 끝에 구슬 달린 다섯 봉우리의 높은 관, 가늘고 곧은 몸, 금실 줄무늬 긴 옷과 금빛 술의 짧은 어깨 망토, 앞손에 세워 든 두루마리. old: 세 겹의 무거운 관·회색 머리와 수염·등이 솟은 두꺼운 겉옷에 여러 나라 무늬 띠·지팡이처럼 짚은 긴 홀',
  faces: 'right',
  height: 1.04,
  tint: '#c79a3e',
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
      young: { markup: YOUNG, height: 1.04, parts: { hair: HEAD_YOUNG, legs: LEGS_SLIM, armR: ARM_SCROLL, armL: BACK_ARM } },
      old: { markup: OLD_ROBE, height: 0.97, parts: { hair: HEAD_OLD, legs: SCEPTER_CANE + LEGS_SLIM, armR: ARM_OLD, armL: BACK_ARM } },
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g data-part="cloth">${YOUNG}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 14)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD_YOUNG}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_SCROLL}</g>
      </g>`,
  },
};

export default solomon;
