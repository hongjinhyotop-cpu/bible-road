// 므낫세 — 히스기야의 아들, 남유다 열넷째 왕 (왕하 21, 대하 33). 열두 살에 즉위, 오십오 년.
// 9막(2026-11-01)에 키트로 만든 인물을 10막 A급 chr2-33(대하 33 「므낫세의 회개」)에서 공들여 다시 그림.
// 실루엣의 표지 (히스기야 = 성벽 모양 관·넓은 수염, 솔로몬 = 다섯 봉우리 관·수염 없음과 구별):
//  - 해 원반과 뾰족한 별 끝이 솟은 관 — "하늘의 일월 성신을 숭배하여 섬기며" (33:3)
//  - 어깨까지 곧게 내린 검은 머리와 끝이 뾰족한 긴 수염, 마른 몸
//  - 짙은 포도주빛 긴 옷에 흩뿌린 별 무늬, 금띠, 등 뒤 짙은 겉옷
//  - 앞손에 짚은 별 머리의 긴 홀
//
// 옷 ("outfit": {"manasseh-king": "chained"}):
//  - king (기본) : 위의 차림. 옷을 갈아입힌 뒤 되돌릴 때 이 이름을 쓴다.
//  - chained     : 앗수르 군대 장관들에게 사로잡혀 쇠사슬로 결박됨 (33:11). 관 없이 흐트러진 머리, 찢긴 거친 베옷과 새끼줄 띠,
//                  목의 쇠고리, 두 손목의 쇠고랑과 늘어진 사슬.
//  - humbled     : 사슬이 풀린 뒤 (33:13). chained와 같은 베옷·흐트러진 머리, 쇠고리와 사슬만 없음.
import type { CharacterDef } from './index';
import { ARM_BENT, ARM_DOWN, BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';

// ── 머리 ─────────────────────────────────────
/** 어깨까지 곧게 내린 머리 + 끝이 뾰족한 긴 수염 */
const HAIR = `
  <path class="mn-hair" d="M100 14 C87 12 76 21 74 35 C72 50 73 66 72 82 C72 92 74 98 78 100 C82 98 85 92 86 84 C86 72 85 60 87 50 C90 39 98 32 110 31 C117 31 122 33 125 36 C123 22 113 14 100 14 Z"/>
  <path class="mn-hair" d="M96 55 C104 60 111 63 119 65 L122 68 C124 78 122 90 118 102 L113 118 L110 104 C104 98 98 88 95 78 C92 70 92 62 96 55 Z"/>
  <path class="detail" d="M106 72 Q112 90 112 110 M114 74 Q118 88 116 102" fill="none" stroke-width="0.7"/>`;
/** 해 원반과 별 끝이 솟은 관 */
const STAR_CROWN = `
  <path class="mn-gold" d="M75 31 C92 25 110 24 127 29 L127 37 C110 33 92 34 76 39 Z"/>
  <path class="mn-gold" d="M77 31 L80 12 L85 28 L91 6 L96 26 L103 2 L109 25 L115 7 L119 27 L124 13 L126 29 Z"/>
  <circle class="mn-star" cx="80" cy="11" r="1.7"/><circle class="mn-star" cx="91" cy="5" r="1.8"/><circle class="mn-star" cx="115" cy="6" r="1.8"/><circle class="mn-star" cx="124" cy="12" r="1.6"/>
  <circle class="mn-gold" cx="103" cy="14" r="6.6"/>
  <circle class="mn-star" cx="103" cy="14" r="3.6"/>
  <path class="mn-gold" d="M103 2 L104.2 7 L101.8 7 Z"/>`;
const HEAD_KING = `${HAIR}${STAR_CROWN}`;
/** 관 없이 흐트러진 머리: 가닥이 앞뒤로 삐침 */
const HEAD_BARE = `${HAIR}
  <path class="mn-hair" d="M82 22 C78 14 72 12 68 14 C74 16 77 20 78 26 Z M92 15 C90 8 86 5 82 6 C86 9 88 12 88 17 Z M108 14 C110 7 114 5 118 6 C114 9 112 12 112 16 Z"/>
  <path class="mn-hair" d="M74 60 C68 66 66 76 68 86 C70 80 72 74 76 70 Z"/>`;

// ── 옷 ───────────────────────────────────────
/** 별 무늬 긴 옷 + 금띠 + 등 뒤 겉옷 */
const STARS = [[92, 120], [108, 134], [96, 156], [88, 214], [104, 236], [120, 222], [94, 262], [116, 274], [130, 300], [100, 304], [88, 340], [112, 350], [134, 362]]
  .map(([x, y], i) => `<circle class="mn-star" cx="${x}" cy="${y}" r="${i % 3 ? 1.4 : 2}"/>`).join('');
const ROBE = `
  <path class="mn-robe" d="M84 96 C90 92 96 90 102 91 C108 92 113 95 116 100 C122 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 210 132 262 138 320 C141 350 144 372 147 390 Q136 395 124 391 Q112 396 100 391 Q88 395 77 390 C76 350 76 300 77 262 C78 230 80 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  ${STARS}
  <path class="mn-gold" d="M80 172 Q101 180 122 173 L122 183 Q101 190 80 182 Z"/>
  <path class="mn-gold" d="M106 183 L103 220 L108 222 L111 184 Z"/>
  <path class="mn-gold" d="M77 380 Q92 385 106 381 Q126 386 147 380 L147 389 Q126 394 106 390 Q92 394 77 389 Z"/>`;
const MANTLE = `
  <path class="mn-mantle" d="M88 88 C74 94 67 110 66 134 C64 172 66 232 63 300 C62 332 61 356 61 378 Q73 384 85 378 C85 322 87 252 89 202 C91 156 93 118 98 96 Z"/>
  <path class="mn-gold" d="M86 92 C96 87 108 89 116 97 L114 102 C106 96 96 95 88 98 Z"/>`;
const KING = `${ROBE}${MANTLE}`;

/** 찢긴 거친 베옷 + 새끼줄 띠 (+ chained는 목의 쇠고리) */
const SACK = `
  <path class="mn-sack" d="M84 98 C90 92 96 90 102 91 C108 92 113 95 116 100 C122 106 125 113 124 122 C123 134 120 144 118 154 C117 166 118 176 120 186 C124 222 128 280 131 340 L132 352 L126 346 L121 356 L114 347 L107 358 L100 348 L92 357 L86 347 L79 354 C78 320 78 280 79 240 C80 214 81 196 83 176 C79 156 77 134 78 118 C79 108 80 102 84 98 Z"/>
  <path class="mn-stitch" d="M88 106 L86 340 M114 106 L124 340 M80 250 L128 246"/>
  <path class="rope" d="M81 182 Q101 189 120 183 L120 188 Q101 195 81 188 Z"/>
  <path class="rope" d="M100 188 L97 214 L100 216 L103 190 Z"/>
  <path class="mn-mantle" d="M88 90 C78 96 72 110 70 130 C68 150 70 170 68 190 L74 184 L76 196 L82 186 L86 194 L88 176 C90 150 92 122 97 98 Z"/>`;
const COLLAR = `
  <path class="mn-iron" d="M86 84 C94 90 106 91 114 86 L116 92 C107 98 93 97 84 90 Z"/>
  <circle class="mn-iron" cx="100" cy="96" r="2.4"/>`;
const CHAINED = `${SACK}${COLLAR}`;

// ── 팔 ───────────────────────────────────────
/** 별 머리의 긴 홀을 짚은 앞팔 */
const SCEPTER = `
  <rect class="mn-gold" x="140" y="150" width="3.6" height="250" rx="1.8"/>
  <path class="mn-gold" d="M141.8 118 L144.4 128 L154 128 L146.4 134 L149.4 144 L141.8 138 L134.2 144 L137.2 134 L129.6 128 L139.2 128 Z"/>
  <circle class="mn-star" cx="141.8" cy="132" r="2.4"/>`;
const ARM_KING = `${SCEPTER}${ARM_BENT}
  <path class="mn-robe" d="M90 98 C100 92 113 96 117 108 C119 118 118 132 118 144 C112 148 104 150 98 148 C96 132 93 114 90 98 Z"/>
  <path class="mn-gold" d="M98 144 C105 147 112 147 119 143 L119 149 C112 153 104 153 98 150 Z"/>`;
/** 늘어진 사슬 고리들 (x, 시작 y, 개수) */
const links = (x: number, y: number, n: number) => Array.from({ length: n }, (_, i) =>
  `<ellipse class="mn-chain" cx="${(x + Math.sin(i * 0.9) * 1.4).toFixed(1)}" cy="${(y + i * 6).toFixed(1)}" rx="${i % 2 ? 1.2 : 2.6}" ry="3.4"/>`).join('');
const ARM_SACK = `${ARM_DOWN}
  <path class="mn-sack" d="M90 98 C100 92 113 96 116 108 C118 118 117 130 117 140 C111 144 104 146 98 144 C96 128 93 112 90 98 Z"/>`;
const ARM_CHAINED = `${ARM_SACK}
  <rect class="mn-iron" x="116" y="216" width="11" height="7" rx="2" transform="rotate(-24 121 219)"/>
  ${links(124, 228, 6)}`;
const BACK_CHAINED = `${BACK_ARM}
  <rect class="mn-iron" x="64" y="218" width="11" height="7" rx="2" transform="rotate(12 69 221)"/>
  ${links(69, 230, 5)}`;

const manasseh: CharacterDef = {
  id: 'manasseh-king',
  name: '므낫세',
  traits: '옆모습. 왕(기본 king): 해 원반과 뾰족한 별 끝이 솟은 관, 어깨까지 곧게 내린 검은 머리, 끝이 뾰족한 긴 수염, 마른 몸, 별 무늬를 흩뿌린 포도주빛 긴 옷과 금띠, 짙은 겉옷, 앞손에 짚은 별 머리의 긴 홀. chained: 관 없이 흐트러진 머리, 찢긴 거친 베옷과 새끼줄 띠, 목의 쇠고리, 두 손목의 쇠고랑과 늘어진 사슬. humbled: chained에서 쇠고리·사슬만 뺀 베옷 차림',
  faces: 'right',
  height: 1.02,
  tint: '#7a2438',
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
      king: { markup: KING, parts: { hair: HEAD_KING, legs: LEGS_SLIM, armR: ARM_KING, armL: BACK_ARM } },
      chained: { markup: CHAINED, parts: { hair: HEAD_BARE, legs: LEGS_SLIM, armR: ARM_CHAINED, armL: BACK_CHAINED } },
      humbled: { markup: SACK, parts: { hair: HEAD_BARE, legs: LEGS_SLIM, armR: ARM_SACK, armL: BACK_ARM } },
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g data-part="cloth">${KING}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 14)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD_KING}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_KING}</g>
      </g>`,
  },
};

export default manasseh;
