// 아론의 아들들(제사장) 손그림 틀 — A급 lev-10-strange-fire(레 10 「다른 불」)에서 나답·아비후를 키트에서 다시 그리며 만듦.
// 옷은 출 28:40, 39:27-29 그대로: 발목까지 오는 세마포 반포 속옷(바둑 무늬 결), 허리의 띠(앞으로 길게 늘어진 끝),
// 머리의 관(둥글게 감은 두건 — 아론의 높은 관·금패와 다르게 낮고 금패 없음). 흉패·에봇은 대제사장(아론)만 → 없음.
// 옷 두 벌 (장면 beat의 "outfit"):
//  - plain  : 두 손을 몸 앞에 모은 기본 차림
//  - censer : 앞손에 향로(민 16:6, 손잡이 달린 놋 그릇)를 들었다. 숯불이 빨갛게 숨 쉬고 향 연기가 위로 흐른다 (레 10:1)
// 색칠(숯불·연기)은 styles/strangefire.css 의 .sf-pan · .sf-hot · .sf-incense.
import type { CharacterDef } from './index';
import { ARM_BENT, ARM_DOWN, BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';

export interface SonSpec {
  id: string;
  name: string;
  traits: string;
  height: number;
  tint: string;
  /** 수염: full = 짧고 고른 턱수염(맏아들), thin = 턱 끝만 성긴 수염(아우) */
  beard: 'full' | 'thin';
  /** 관 모양: low = 낮고 둥근 관, tall = 조금 높게 감고 뒤로 끈이 늘어진 관 */
  cap: 'low' | 'tall';
}

// 관 (출 28:40 "관") — 아론의 관(이마의 금패, 높이 감음)보다 낮고 단순하다
const CAP_LOW = `
  <path d="M79 40 C74 22 86 9 102 9 C118 9 128 19 126 36 C112 31 92 31 79 40 Z"/>
  <path class="detail" d="M81 33 Q102 23 125 30 M84 24 Q103 15 121 21" fill="none" stroke-width="1"/>
  <path d="M80 42 C76 52 75 62 77 70 C80 66 83 64 86 64 C84 56 85 49 87 44 Z"/>`;
const CAP_TALL = `
  <path d="M79 40 C72 16 86 1 103 1 C120 1 130 14 126 36 C112 31 92 31 79 40 Z"/>
  <path class="detail" d="M81 32 Q102 22 125 29 M82 23 Q102 13 124 20 M88 13 Q103 6 118 11" fill="none" stroke-width="1"/>
  <path d="M78 34 C70 40 66 52 66 66 C68 62 71 60 74 60 C74 52 76 45 80 40 Z"/>`;

const BEARD_FULL = `
  <path d="M97 55 C104 60 112 63 119 65 L122 67 C126 75 126 84 122 92 C116 96 108 96 102 92 C96 86 93 79 93 72 C92 65 93 60 97 55 Z"/>`;
const BEARD_THIN = `
  <path d="M104 66 C110 68 116 68 120 67 C122 72 121 78 118 83 C114 85 110 84 107 80 C105 76 104 71 104 66 Z"/>`;

// 반포 속옷: 발목까지 오는 세마포 옷, 바둑 무늬 결(출 28:39 "반포 속옷")
const TUNIC = `
  <path d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 210 131 262 136 320 C139 350 141 372 143 390 Q132 395 121 391 Q110 396 99 391 Q88 395 78 390 C77 350 77 300 78 262 C79 230 81 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="detail" d="M86 214 L136 214 M84 246 L133 246 M82 278 L134 278 M80 310 L137 310 M80 342 L139 342 M96 200 L94 388 M112 200 L118 388" fill="none" stroke-width="0.5" opacity="0.6"/>
  <!-- 띠: 허리를 감고, 끝이 앞으로 무릎께까지 늘어진다 -->
  <path class="crown" d="M81 174 Q100 181 121 175 L121 183 Q100 190 81 182 Z"/>
  <path class="crown" d="M114 182 L119 182 L123 262 L119 266 L116 262 Z"/>
  <path class="crown" d="M108 184 L112 184 L113 248 L110 252 L107 248 Z"/>`;

// 향로: 손잡이를 쥐고 앞으로 내민 놋 그릇 + 숯불 + 향 연기 (레 10:1 "각기 향로를 가져다가")
export const CENSER = `
  <path class="sf-incense" d="M176 144 C168 128 184 116 176 100 C168 84 182 72 174 56 C168 44 176 34 172 22"/>
  <path class="sf-incense" d="M181 146 C188 132 176 118 184 104 C190 92 180 80 186 66"/>
  <path class="sf-pan" d="M146 157 L163 154.6 L163 157.4 L146 160 Z"/>
  <path class="sf-pan" d="M161 151 C161 162 191 162 191 151 Z"/>
  <path class="sf-pan" d="M159 150 h34 v2.4 h-34 Z"/>
  <g class="sf-hot"><ellipse cx="169" cy="149.4" rx="3.4" ry="2"/><ellipse cx="176.5" cy="148.6" rx="3.8" ry="2.4"/><ellipse cx="184" cy="149.4" rx="3.2" ry="1.9"/></g>`;

export function priestSon(s: SonSpec): CharacterDef {
  const cap = s.cap === 'tall' ? CAP_TALL : CAP_LOW;
  const beard = s.beard === 'full' ? BEARD_FULL : BEARD_THIN;
  return {
    id: s.id,
    name: s.name,
    traits: s.traits,
    faces: 'right',
    height: s.height,
    tint: s.tint,
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
        plain: { parts: { armR: ARM_DOWN } },
        censer: { parts: { armR: ARM_BENT + CENSER } },
      },
      markup: `
        <g data-part="legs">${LEGS_SLIM}</g>
        <g data-part="upper">
          <g data-part="armL">${BACK_ARM}</g>
          ${TORSO_SLIM}
          <g data-part="cloth" class="tone2">${TUNIC}</g>
          <g data-part="head">
            <g transform="matrix(0.88 0 0 0.88 13 10)">
              <g data-part="hair">${cap}</g>
              ${FACE_MAN}
              ${beard}
            </g>
          </g>
          <g data-part="armR">${ARM_DOWN}</g>
        </g>`,
    },
  };
}
