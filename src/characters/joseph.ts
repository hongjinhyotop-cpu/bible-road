// 요셉 — 야곱이 사랑한 아들, 꿈꾸는 사람. 형들에게 팔려 이집트 총리가 됨 (창 30:24, 37–50).
// A급 장면 gen-37-coat(창 37 "채색옷과 구덩이")에서 키트 임시 그림을 공들여 다시 그림.
// 특징: 열일곱 살 소년(창 37:2). 형들(르우벤·유다: 수염 난 어른)과 실루엣만으로 구별되게 수염이 없고,
// 몸이 가늘고 반듯하며 머리가 조금 작다. 머리는 단정히 빗어 넘겨 목덜미에서 살짝 말렸다. 손에는 아무것도 들지 않았다.
// 옷:
//  - "plain"  : 기본. 무릎까지 오는 거친 튜닉에 새끼줄 허리띠, 맨팔 — 팔려 간 종, 옥에 갇힌 사람 (창 39–40)
//  - "coat"   : 채색옷 (창 37:3). 발목까지 오고 소매가 손목까지 내려오는 긴 옷에 여러 빛깔의 띠.
//               (히브리어 '케토네트 파심'은 "여러 색 옷"으로도 "긴 소매 옷"으로도 읽힌다 — 둘 다 보이게 그림.)
//               일하는 사람은 입을 수 없는 옷. 띠 색은 막 테마색에 섞여 막마다 톤이 바뀐다 (styles/joseph.css)
//  - "vizier" : 이집트 총리 (창 41:42 "세마포 옷을 입히고 금사슬을 목에 걸고"). 흰 세마포 옷, 넓은 금 목깃과 사슬,
//               이집트식 단발 가발. 41–50장용 (아직 쓰는 에피소드 없음)
import type { CharacterDef } from './index';
import { BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM, ARM_DOWN } from './_parts.ts';

/** 단정히 빗어 넘긴 머리: 이마 위로 반듯하고, 목덜미에서 살짝 말린다 */
const HAIR = `
  <path d="M101 14 C88 12 77 20 74 33 C72 44 73 56 76 66 C78 73 81 78 86 81 C88 77 90 73 91 69 C86 60 85 51 87 44 C90 36 98 31 110 30 C116 29 121 31 124 34 C122 22 113 15 101 14 Z"/>
  <path d="M76 70 C74 76 75 82 80 85 C83 86 86 84 86 81 C82 80 79 76 78 71 Z"/>
  <circle cx="75" cy="60" r="4.2"/><circle cx="77" cy="72" r="4"/><circle cx="83" cy="80" r="3.6"/>
  <path class="detail" d="M84 30 Q94 22 112 22 M80 44 Q84 34 96 28" fill="none" stroke-width="0.7"/>`;

/** 이집트식 단발 가발: 뭉툭하게 자른 끝, 이마를 덮는 앞머리 (창 41:14 "수염을 깎고") */
const WIG = `
  <path d="M100 11 C84 10 71 21 69 38 C67 54 68 70 69 86 L92 88 C90 80 89 72 90 64 C87 56 86 48 88 42 C91 36 98 34 108 34 L124 35 C123 21 114 11 100 11 Z"/>
  <path class="detail" d="M72 50 L90 50 M71 62 L89 62 M70 74 L90 74" fill="none" stroke-width="0.6"/>`;

/** 무릎까지 오는 거친 튜닉 (기본 몸에 늘 입고 있다. 채색옷·세마포가 그 위를 덮는다) */
const TUNIC = `
  <path d="M84 98 C89 94 95 92 101 93 C107 94 111 97 114 101 C120 106 124 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C122 198 126 226 129 254 C130 264 131 272 133 282 Q126 286 119 283 Q111 288 102 284 Q93 289 85 284 Q79 287 75 283 C75 258 77 232 79 210 C80 196 81 186 83 172 C79 152 77 130 79 116 C80 108 81 102 84 98 Z"/>
  <path class="detail" d="M88 104 Q83 150 82 172 M90 196 Q86 240 84 280 M112 196 Q120 240 126 280" fill="none" stroke-width="0.9"/>`;

/** 기본: 새끼줄 허리띠 (끝이 늘어진 매듭) */
const ROPE_BELT = `
  <path class="rope" d="M80 176 Q100 183 121 177 L121 181 Q100 187 80 180 Z"/>
  <path class="rope" d="M114 180 L117 198 L115 199 L112 181 Z M118 180 L122 196 L120 197 L116 181 Z"/>`;

// ── 채색옷 ──────────────────────────────────
// 옷 윤곽: 어깨에서 발목까지, 아래로 조금 퍼진다
const COAT_OUTLINE = 'M83 95 C89 91 96 89 102 90 C109 91 113 94 116 98 C122 103 126 111 126 120 C127 130 123 140 120 150 C118 160 118 170 120 180 C126 212 134 266 140 322 C143 350 146 372 149 392 Q138 397 126 393 Q114 398 102 393 Q90 397 78 392 C76 352 75 304 76 264 C77 230 79 200 82 172 C78 152 76 130 78 114 C79 106 80 100 83 95 Z';

/**
 * 여러 빛깔의 띠: 몸을 따라 살짝 휘는 가로띠를 아래위로 쌓는다. 색 이름(jc-1 ~ jc-4)은 styles/joseph.css.
 * 넓은 띠와 가는 금빛 띠가 번갈아 들고, 사이사이에 잉크색이 남아 실로 짠 옷처럼 보인다. (0 = 잉크 그대로)
 */
const BAND_RHYTHM: [number, number][] = [[1, 12], [3, 3], [2, 10], [0, 2], [4, 13], [3, 3], [1, 8], [2, 14], [0, 2], [3, 9], [4, 4], [0, 2]];
function bands(x0: number, x1: number, y0: number, y1: number, k: number, bow: number): string {
  const out: string[] = [];
  let y = y0;
  for (let i = 0; y < y1; i++) {
    const [c, h0] = BAND_RHYTHM[i % BAND_RHYTHM.length];
    const h = h0 * k;
    if (c) {
      const t = y + 0.5;
      const b = y + h - 0.5;
      out.push(`<path class="jc-${c}" d="M${x0} ${t} Q${(x0 + x1) / 2} ${t + bow} ${x1} ${t} L${x1} ${b} Q${(x0 + x1) / 2} ${b + bow} ${x0} ${b} Z"/>`);
    }
    y += h;
  }
  return out.join('');
}

const COAT = `
  <defs><clipPath id="joseph-coat-clip"><path d="${COAT_OUTLINE}"/></clipPath></defs>
  <path d="${COAT_OUTLINE}"/>
  <g clip-path="url(#joseph-coat-clip)">
    ${bands(60, 160, 102, 400, 1, 4)}
    <!-- 등 쪽 그늘: 옷이 둥근 몸을 감싼 느낌 -->
    <path class="jc-shade" d="M70 90 L92 90 C88 130 86 170 88 210 C90 280 92 340 94 400 L60 400 Z"/>
    <!-- 목둘레의 짙은 단 -->
    <path d="M86 93 C92 100 104 103 115 98 L116 102 C104 108 91 106 84 98 Z"/>
  </g>
  <!-- 허리띠: 두 겹으로 감은 천 -->
  <path d="M79 174 Q100 182 122 175 L122 182 Q100 190 79 181 Z"/>
  <path class="detail" d="M79 177.5 Q100 185.5 122 178.5" fill="none" stroke-width="0.6"/>
  <!-- 접힌 주름 -->
  <path class="detail" d="M90 200 Q87 300 89 390 M102 200 Q103 300 108 392 M114 202 Q124 300 132 390" fill="none" stroke-width="0.7"/>
  <!-- 발목 단의 술 -->
  <path class="detail" d="M82 393 L82 398 M90 394 L90 399 M98 394 L98 399 M106 394 L106 399 M114 394 L114 399 M122 394 L122 399 M130 394 L130 399 M138 393 L138 398 M146 392 L146 397" fill="none" stroke-width="1"/>`;

/** 앞팔 + 손목까지 내려오는 긴 소매 (띠는 소매에도 이어진다) */
const SLEEVE_R_OUTLINE = 'M90 104 C88 94 98 90 105 91 C113 92 118 99 118 110 C118 128 116 144 115 157 C118 174 123 190 128 203 L130 211 C125 214 119 215 114 214 C108 200 100 184 97 170 C94 156 93 140 91 126 C90 116 90 110 90 104 Z';
const ARM_COAT = `
  ${ARM_DOWN}
  <defs><clipPath id="joseph-sleeve-r"><path d="${SLEEVE_R_OUTLINE}"/></clipPath></defs>
  <path d="${SLEEVE_R_OUTLINE}"/>
  <g clip-path="url(#joseph-sleeve-r)">${bands(80, 140, 100, 220, 0.8, 3)}</g>
  <path d="M113 211 C119 213 125 212 131 208 L132 213 C126 217 119 218 113 216 Z"/>`;

/** 뒤쪽 팔의 긴 소매 */
const SLEEVE_L_OUTLINE = 'M84 100 C78 110 76 126 76 144 C76 162 74 180 70 196 L68 206 C72 209 77 210 82 208 C86 194 90 176 92 160 C94 142 95 124 94 108 Z';
const ARM_L_COAT = `
  ${BACK_ARM}
  <defs><clipPath id="joseph-sleeve-l"><path d="${SLEEVE_L_OUTLINE}"/></clipPath></defs>
  <path d="${SLEEVE_L_OUTLINE}"/>
  <g clip-path="url(#joseph-sleeve-l)">${bands(60, 100, 100, 214, 0.8, 3)}<path class="jc-shade" d="M60 100 H100 V214 H60 Z"/></g>`;

// ── 이집트 총리 ────────────────────────────────
/** 흰 세마포 긴 옷 + 넓은 금 목깃(우세크) + 금사슬 (창 41:42) */
const VIZIER = `
  <path class="linen" d="${COAT_OUTLINE}"/>
  <path class="detail" d="M88 200 Q86 300 88 390 M96 200 Q95 300 98 392 M104 200 Q105 300 110 392 M112 202 Q118 300 126 390 M119 204 Q129 300 138 390" fill="none" stroke-width="0.5"/>
  <path class="linen-belt" d="M79 172 Q100 180 122 173 L122 182 Q100 190 79 181 Z"/>
  <path class="linen-belt" d="M106 184 L118 182 L124 236 L110 238 Z"/>
  <!-- 넓은 목깃: 금과 색 구슬 줄 -->
  <path class="crown" d="M82 96 C88 92 96 90 103 91 C110 92 115 95 118 100 C121 108 120 118 114 124 C104 130 92 128 84 120 C80 113 79 103 82 96 Z"/>
  <path class="detail" d="M84 104 C94 112 108 112 117 105 M84 111 C94 120 108 120 116 113 M86 117 C95 124 106 124 113 119" fill="none" stroke-width="0.9"/>
  <!-- 금사슬 -->
  <path class="crown" d="M108 122 C112 132 113 142 110 150 L113 151 C116 142 115 131 111 121 Z"/>
  <circle class="crown" cx="111" cy="154" r="3.2"/>`;

/** 세마포 소매 없이 드러난 팔 + 금 팔찌 */
const ARM_VIZIER = `${ARM_DOWN}<path class="crown" d="M117 204 L127 200 L129 206 L119 210 Z"/>`;

const joseph: CharacterDef = {
  id: 'joseph',
  name: '요셉',
  traits: '옆모습, 수염 없는 열일곱 살 소년, 가늘고 반듯한 몸, 단정히 빗어 넘겨 목덜미에서 말린 머리, 무릎 튜닉. 옷 coat = 발목까지 오는 긴 소매 채색옷(여러 빛깔 띠), vizier = 이집트 세마포 옷 + 금 목깃·사슬 + 단발 가발',
  faces: 'right',
  height: 0.95,
  tint: '#6f6656',
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
      plain: { markup: ROPE_BELT, parts: { hair: HAIR, armR: ARM_DOWN, armL: BACK_ARM } },
      coat: { markup: COAT, parts: { hair: HAIR, armR: ARM_COAT, armL: ARM_L_COAT } },
      vizier: { markup: VIZIER, parts: { hair: WIG, armR: ARM_VIZIER, armL: BACK_ARM } },
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g class="tone2">${TUNIC}</g>
        <g data-part="cloth">${ROPE_BELT}</g>
        <g data-part="head">
          <g transform="matrix(0.85 0 0 0.85 16 14)">
            <g data-part="hair">${HAIR}</g>
            ${FACE_MAN}
          </g>
        </g>
        <g data-part="armR">${ARM_DOWN}</g>
      </g>`,
  },
};

export default joseph;
