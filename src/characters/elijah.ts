// 엘리야 — 길르앗에 우거하는 자 중에 디셉 사람 (왕상 17:1 – 왕하 2:11).
// 9막 A급 kgs1-18-carmel · kgs1-19-whisper에서 키트 임시 그림을 공들여 다시 그림.
//  "그는 털이 많은 사람인데 허리에 가죽 띠를 띠었더이다 … 이는 디셉 사람 엘리야로다" (왕하 1:8)
//  겉옷이 이 사람의 표지다: 겉옷으로 얼굴을 가리고(왕상 19:13), 엘리사 위에 던지고(19:19), 말아서 요단을 치고(왕하 2:8),
//  하늘로 올라갈 때 떨어뜨린다(2:13).
// 실루엣의 표지 (엘리사 = 대머리·지팡이, 사무엘 = 기름 뿔과 구별):
//  - 사방으로 뻗친 덥수룩한 반백 머리와 거칠게 자란 긴 수염 (끝이 갈라짐)
//  - 무릎 아래까지 오는 털옷: 밑단이 들쭉날쭉하고 결마다 털이 일어섬
//  - 허리의 넓은 가죽 띠 + 늘어진 끈
//  - 어깨를 덮고 등 뒤로 종아리까지 늘어진 무거운 겉옷 (끝에 술). 앞어깨에도 한 자락이 걸쳐 있다
//
// 옷 (장면 맨 위 "outfit": {"elijah": "veiled"} 또는 beat의 "outfit"):
//  - mantle (기본) : 털옷 + 가죽 띠 + 겉옷. 갈아입힌 뒤 되돌릴 때 이 이름을 쓴다.
//  - veiled        : 겉옷으로 얼굴을 가림 (왕상 19:13). 겉옷 자락을 머리 위로 끌어 올려 얼굴까지 덮고, 앞팔을 들어 여민다.
//  - girded        : 허리를 동임 (왕상 18:46). 털옷 밑단을 가죽 띠에 걷어 올려 무릎이 드러나고, 겉옷은 어깨에 말아 둘렀다.
//  - bare          : 겉옷 없이 털옷과 가죽 띠만 (왕상 19:19 겉옷을 엘리사 위에 던진 뒤).
import type { CharacterDef } from './index';
import { ARM_DOWN, BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';

// ── 머리 (hair 부위 — 수염도 여기에) ─────────────────
/** 사방으로 뻗친 덥수룩한 머리 + 삐져나온 머리털 */
const MANE = `
  <path class="el-mane" d="M100 8 C84 5 70 15 66 31 C62 45 59 57 53 69 C59 69 61 72 62 76 C57 88 55 98 57 109 C62 104 67 103 70 107 C69 117 70 125 74 131 C78 123 82 119 86 121 C86 109 87 97 89 86 C84 74 83 62 86 51 C90 41 98 34 110 32 C116 31 120 32 124 36 C126 31 128 26 126 21 C120 22 117 19 117 14 C112 10 106 8 100 8 Z"/>
  <path class="el-mane" d="M70 22 L61 15 L68 27 Z M64 40 L53 38 L63 47 Z M58 62 L47 64 L58 70 Z M60 92 L50 98 L61 100 Z M68 118 L62 128 L71 124 Z M86 9 L82 1 L92 8 Z M108 9 L112 1 L114 11 Z"/>
  <path class="detail" d="M72 40 Q64 64 66 92 M80 34 Q72 62 76 112 M90 26 Q84 46 86 70" fill="none" stroke-width="0.8"/>`;
/** 거칠게 자란 긴 수염 — 끝이 여러 갈래로 갈라짐 */
const WILD_BEARD = `
  <path class="el-mane" d="M96 54 C104 59 112 63 119 65 L124 68 C132 82 138 100 137 120 C136 136 132 150 125 164 L121 152 L117 172 L111 156 L105 170 L101 153 L95 162 C91 142 89 122 89 102 C89 84 91 66 96 54 Z"/>
  <path class="detail" d="M104 76 Q110 112 106 150 M116 74 Q126 110 120 156 M124 80 Q132 104 128 132" fill="none" stroke-width="0.8"/>`;
const HEAD = `${MANE}${WILD_BEARD}`;

/** 겉옷을 머리 위로 끌어 올려 얼굴을 덮음 (19:13) — 머리 좌표 */
const HEAD_VEILED = `
  ${WILD_BEARD}
  <path class="el-mantle" d="M100 2 C82 0 66 12 61 32 C57 54 59 80 55 106 C53 124 51 142 55 160 L71 155 L86 162 C90 140 97 118 106 104 C115 97 126 94 135 92 C140 72 140 48 135 30 C129 12 116 2 100 2 Z"/>
  <path class="el-mantle-edge" d="M135 30 C140 48 140 72 135 92 C126 94 115 97 106 104 C97 118 90 140 86 162" stroke-width="1.3"/>
  <path class="detail" d="M78 20 Q70 60 68 120 M96 12 Q90 50 92 92" fill="none" stroke-width="0.8"/>`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 털옷의 털결: 몸통 위에 짧은 획을 흩뿌림 */
const FUR = (() => {
  const strokes: string[] = [];
  for (let row = 0; row < 11; row++) {
    const y = 112 + row * 20;
    const x0 = 84 - (row > 4 ? (row - 4) * 1 : 0);
    const x1 = 118 + (row > 4 ? (row - 4) * 2.4 : 0);
    for (let x = x0 + (row % 2) * 4; x < x1; x += 8) strokes.push(`M${x.toFixed(1)} ${y} l-2.4 6`);
  }
  return `<path class="el-fur" d="${strokes.join(' ')}" stroke-width="0.9"/>`;
})();
/** 무릎 아래까지 오는 털옷, 들쭉날쭉한 밑단 */
const GARMENT = `
  <path class="el-hair-garment" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C123 206 128 250 131 300 L134 332 L128 325 L123 336 L117 326 L111 338 L105 327 L99 339 L93 327 L87 337 L81 326 L76 333 C76 300 77 262 78 240 C79 214 80 196 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  ${FUR}`;
/** 허리를 동임 (18:46): 밑단을 걷어 올린 털옷 */
const GARMENT_GIRDED = `
  <path class="el-hair-garment" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C122 200 125 230 127 262 L121 256 L116 266 L110 257 L104 268 L98 258 L92 267 L86 257 L80 264 C79 240 80 214 81 196 C81 186 82 178 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="el-hair-garment" d="M80 186 C90 196 112 198 124 190 L126 206 C112 214 92 212 80 202 Z"/>
  ${FUR.replace(/M(\d+(\.\d)?) (2[6-9]\d|3\d\d) l-2.4 6/g, '')}`;
/** 넓은 가죽 띠 + 늘어진 끈 */
const BELT = `
  <path class="el-leather" d="M79 172 Q100 181 122 175 L123 189 Q100 196 79 186 Z"/>
  <path class="el-leather" d="M104 188 L109 188 L112 218 L106 222 L102 215 Z M111 188 L115 188 L120 210 L115 213 Z"/>`;
/** 등 뒤로 종아리까지 늘어진 겉옷 (끝에 술) */
const MANTLE_BACK = `
  <path class="el-mantle" d="M93 85 C76 89 63 104 59 127 C55 162 57 212 55 262 C54 302 51 332 49 354 Q59 360 69 354 Q78 360 88 352 C88 302 90 242 92 192 C93 152 94 116 101 94 Z"/>
  <path class="el-mantle-edge" d="M49 354 Q59 360 69 354 Q78 360 88 352" stroke-width="1.3"/>
  <path class="el-mantle-edge" d="M52 358 l-1 6 M58 360 l0 6 M64 359 l0 6 M70 358 l1 6 M76 359 l0 6 M82 357 l1 6" stroke-width="0.8"/>
  <path class="detail" d="M70 120 Q64 220 62 340 M82 108 Q78 220 78 346" fill="none" stroke-width="0.9"/>`;
/** 앞어깨에 걸친 겉옷 자락 */
const MANTLE_FRONT = `
  <path class="el-mantle" d="M85 89 C96 83 112 85 121 95 C125 103 126 111 125 119 C118 125 108 128 98 126 C92 124 88 120 85 116 C83 106 83 96 85 89 Z"/>
  <path class="el-mantle-edge" d="M85 116 C92 124 112 128 125 119" stroke-width="1.1"/>`;
/** 허리를 동였을 때: 겉옷을 말아 어깨에서 허리로 비스듬히 두름 */
const MANTLE_ROLLED = `
  <path class="el-mantle" d="M84 92 C92 86 104 88 110 96 C116 120 120 150 124 170 L114 176 C110 156 102 128 90 106 Z"/>
  <path class="el-mantle" d="M90 88 C80 92 74 104 72 118 C78 116 84 112 90 104 Z"/>
  <path class="el-mantle-edge" d="M88 100 C100 120 108 146 116 172" stroke-width="1"/>`;
const CLOTH_MANTLE = `${MANTLE_BACK}${GARMENT}${BELT}${MANTLE_FRONT}`;
const CLOTH_VEILED = `${MANTLE_BACK}${GARMENT}${BELT}`;
const CLOTH_GIRDED = `${GARMENT_GIRDED}${BELT}${MANTLE_ROLLED}`;
const CLOTH_BARE = `${GARMENT}${BELT}`;

// ── 앞팔 ──────────────────────────────────────
/** 털옷 소매 + 어깨를 덮은 겉옷 자락 */
const SLEEVE = `<path class="el-hair-garment" d="M93 104 C92 97 98 94 104 95 C110 96 113 101 113 110 C113 122 112 132 111 142 C106 144 100 144 96 142 C95 128 94 114 93 104 Z"/>
  <path class="el-fur" d="M100 112 l-2 6 M107 118 l-2 6 M101 128 l-2 6" stroke-width="0.8"/>`;
const ARM_MANTLE = `${ARM_DOWN}${SLEEVE}
  <path class="el-mantle" d="M89 96 C97 89 112 91 117 103 C118 112 117 122 115 132 C108 135 99 135 94 131 C93 118 91 106 89 96 Z"/>
  <path class="el-mantle-edge" d="M94 131 C100 135 109 135 115 132" stroke-width="1"/>`;
const ARM_BARE = `${ARM_DOWN}${SLEEVE}`;
/** 앞팔을 들어 얼굴 앞에서 겉옷을 여밈 (19:13) */
const ARM_VEIL = `
  <path d="M92 106 C90 98 98 93 105 94 C112 95 116 101 116 110 C117 120 118 128 120 134 C123 124 123 110 121 100 C121 93 125 89 130 90 C135 92 135 99 133 105 C132 120 130 136 126 148 C122 156 112 158 106 154 C100 150 98 140 96 128 C94 120 93 112 92 106 Z"/>
  <path class="el-mantle" d="M88 96 C98 88 113 91 118 104 C121 118 122 134 120 146 C112 152 102 152 97 146 C94 130 91 112 88 96 Z"/>
  <path class="el-mantle" d="M118 88 C126 84 136 86 138 94 C139 102 136 108 130 110 C124 108 120 102 118 96 Z"/>`;

const elijah: CharacterDef = {
  id: 'elijah',
  name: '엘리야',
  traits: '옆모습. 사방으로 뻗친 덥수룩한 반백 머리와 끝이 갈라진 거친 긴 수염, 무릎 아래까지 오는 털옷(들쭉날쭉한 밑단·털결), 넓은 가죽 띠와 늘어진 끈, 어깨를 덮고 등 뒤로 종아리까지 늘어진 술 달린 겉옷. veiled: 겉옷으로 머리와 얼굴을 덮고 앞팔로 여밈. girded: 밑단을 걷어 올리고 겉옷을 말아 두름. bare: 겉옷 없이',
  faces: 'right',
  height: 1,
  tint: '#7a5232',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 100],
      cloth: [100, 150],
      hair: [86, 60],
    },
    outfits: {
      mantle: { markup: CLOTH_MANTLE, parts: { hair: HEAD, legs: LEGS_SLIM, armR: ARM_MANTLE, armL: BACK_ARM } },
      veiled: { markup: CLOTH_VEILED, parts: { hair: HEAD_VEILED, legs: LEGS_SLIM, armR: ARM_VEIL, armL: BACK_ARM } },
      girded: { markup: CLOTH_GIRDED, parts: { hair: HEAD, legs: LEGS_SLIM, armR: ARM_BARE, armL: BACK_ARM } },
      bare: { markup: CLOTH_BARE, parts: { hair: HEAD, legs: LEGS_SLIM, armR: ARM_BARE, armL: BACK_ARM } },
    },
    // 등 뒤 겉옷은 옷(cloth) 부위 맨 앞에 그린다: 털옷이 그 위를 덮어 등 "뒤로" 늘어지고, 옷을 바꾸면 같이 바뀐다
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g data-part="cloth">${CLOTH_MANTLE}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 14)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_MANTLE}</g>
      </g>`,
  },
};

export default elijah;
