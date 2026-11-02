// 제사장이요 학사 에스라 (스 7–10, 느 8–12). 아론의 자손, 아닥사스다 7년에 바벨론에서 올라옴.
// 10막 A급 neh-8-water-gate(「수문 앞의 울음」)에서 키트 임시 그림을 공들여 다시 그림 (같은 파일 이름 → 에스라서·느헤미야서의 모든 장면에 반영).
// 실루엣의 표지 (이사야 = 두건 꼬리·각진 수염·반쯤 편 두루마리, 느헤미야 = 둥근 모자·짧은 수염과 구별):
//  - 켜켜이 감아 올린 높은 두건(제사장) + 이마의 청색 띠
//  - 허리까지 흘러내리는 긴 흰 수염 (늙은 학사)
//  - 흰 세마포 긴 옷 위에 어깨부터 늘어진 겉옷(밑단 술), 허리띠에 꽂은 학사의 먹그릇과 붓 (겔 9:2 "서기관의 먹 그릇")
//  - 가슴에 세워 안은 큰 율법 두루마리: 두 막대에 감긴 두루마리와 금빛 손잡이 꼭지 (느 8:2 "율법책을 가지고")
//
// 옷 ("outfit": {"ezra": "torn"}):
//  - scribe (기본) : 위의 차림. 되돌릴 때 이 이름.
//  - torn          : 옷과 겉옷을 찢고 머리털과 수염을 뜯음 (스 9:3). 두건이 벗겨져 흐트러진 머리, 뜯겨 들쭉날쭉한 수염,
//                    목둘레가 V자로 찢어진 속옷과 끝이 찢겨 늘어진 겉옷, 빈손을 아래로.
import type { CharacterDef } from './index';
import { ARM_BENT, ARM_DOWN, BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';

// ── 머리 (hair 부위 — 두건·수염) ─────────────────
/** 켜켜이 감아 올린 높은 두건 + 청색 띠 */
const TURBAN = `
  <path class="ezr-wrap" d="M123 36 C125 24 122 10 112 2 C104 -4 92 -4 84 2 C74 9 69 22 69 36 C69 46 71 54 74 60 C78 54 82 50 88 46 C96 40 108 37 123 36 Z"/>
  <path class="detail" d="M72 30 Q96 14 122 22 M71 20 Q94 4 118 10 M76 10 Q92 0 110 2" fill="none" stroke-width="0.9"/>
  <path class="ezr-band" d="M70 42 C86 34 106 32 124 34 L124 40 C106 38 88 41 72 50 Z"/>
  <path class="ezr-wrap" d="M74 56 C70 66 70 76 72 84 C76 84 80 82 84 80 C83 72 84 64 86 58 Z"/>`;
/** 허리까지 흘러내리는 긴 흰 수염 (+콧수염) */
const BEARD = `
  <path class="ezr-beard" d="M95 52 C103 59 112 63 120 65 L124 68 C128 82 130 100 129 120 C128 140 124 158 118 172 C114 180 108 186 104 184 C100 170 96 152 94 132 C92 112 91 92 92 76 C92 66 93 58 95 52 Z"/>
  <path class="ezr-beard" d="M108 62 C114 62 120 64 124 68 L118 72 C114 68 110 66 106 66 Z"/>
  <path class="ezr-beard" d="M88 56 C86 64 86 74 88 82 L94 80 C93 72 93 64 94 58 Z"/>
  <path class="detail" d="M102 80 Q108 120 106 172 M112 78 Q120 116 116 168 M120 80 Q126 110 122 150" fill="none" stroke-width="0.8"/>`;
const HEAD = `${TURBAN}${BEARD}`;
/** 두건이 벗겨져 흐트러진 머리 + 뜯겨 들쭉날쭉한 수염 (스 9:3) */
const HEAD_TORN = `
  <path class="ezr-beard" d="M104 14 C92 12 80 20 76 32 C72 44 73 56 76 66 C78 72 80 78 84 82 L88 76 C86 66 86 56 88 48 C92 38 102 32 114 32 C118 32 122 34 124 36 C122 24 114 16 104 14 Z"/>
  <path class="ezr-beard" d="M80 22 L72 14 L82 18 M92 14 L90 4 L98 13 M106 13 L112 4 L112 15 M76 40 L66 38 L76 46 M76 60 L68 64 L78 66"/>
  <path class="ezr-beard" d="M95 52 C103 59 112 63 120 65 L124 68 C128 80 129 96 127 110 L122 104 L121 118 L115 110 L112 126 L107 114 L103 130 L100 116 C96 104 93 90 92 78 C92 66 93 58 95 52 Z"/>
  <path class="detail" d="M104 80 Q108 100 106 120 M114 78 Q118 96 116 112" fill="none" stroke-width="0.8"/>`;

// ── 옷 (cloth 부위) ────────────────────────────
/** 흰 세마포 긴 옷 */
const ROBE = `
  <path class="ezr-robe" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 210 131 262 136 320 C139 350 141 372 143 390 Q132 395 120 391 Q108 396 96 391 Q86 395 77 390 C77 350 78 300 79 262 C80 230 81 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="detail" d="M90 200 Q88 300 90 376 M112 200 Q122 300 132 376" fill="none" stroke-width="0.9"/>`;
/** 어깨부터 늘어진 겉옷 (등 뒤 자락 + 앞자락) + 밑단 술 */
const MANTLE = `
  <path class="ezr-mantle" d="M92 86 C78 92 68 106 65 128 C61 166 63 220 62 280 C61 316 60 340 60 362 Q72 368 84 362 C84 310 86 250 88 200 C90 156 93 120 100 96 Z"/>
  <path class="ezr-mantle" d="M100 90 C110 88 118 92 122 100 C124 110 124 118 122 126 C118 150 118 176 120 204 C122 232 126 262 130 290 L114 294 C108 262 104 230 103 200 C102 170 102 140 100 116 Z"/>
  <path class="ezr-trim" d="M122 126 C118 150 118 176 120 204 C122 232 126 262 130 290" stroke-width="2"/>
  <path class="ezr-trim" d="M60 362 Q72 368 84 362" stroke-width="2"/>
  <path class="ezr-tassel" d="M62 365 l-2 12 M72 368 l0 12 M82 365 l2 12 M116 295 l-1 12 M128 291 l2 12"/>`;
/** 허리띠 + 학사의 먹그릇과 붓 */
const BELT = `
  <path class="ezr-band" d="M80 172 Q100 179 121 173 L121 181 Q100 188 80 180 Z"/>
  <rect class="ezr-ink" x="84" y="176" width="9" height="16" rx="1.6"/>
  <path class="ezr-ink" d="M86 176 L82 160 L84 159 L89 176 Z"/>`;
const CLOTH = `${ROBE}${MANTLE}${BELT}`;
/** 찢은 옷: V자로 찢긴 목둘레, 끝이 찢겨 늘어진 겉옷 */
const CLOTH_TORN = `${ROBE}
  <path class="ezr-tear" d="M100 94 L106 128 L110 96 Z"/>
  <path class="ezr-mantle" d="M92 86 C78 92 68 106 65 128 C61 166 63 220 62 268 L68 260 L70 278 L76 264 L80 284 L84 266 L86 248 C86 210 88 170 90 140 C92 120 95 104 100 96 Z"/>
  <path class="ezr-band" d="M80 172 Q100 179 121 173 L121 181 Q100 188 80 180 Z"/>`;

// ── 앞팔 ──────────────────────────────────────
const SLEEVE = `<path class="ezr-robe" d="M92 104 C91 97 97 94 104 95 C111 96 114 101 115 110 C115 122 115 134 116 144 C110 147 102 147 96 144 C95 130 93 116 92 106 Z"/>`;
/** 가슴에 세워 안은 큰 율법 두루마리 (두 막대 + 금빛 꼭지) */
const SCROLL = `
  <rect class="ezr-roller" x="128" y="100" width="4" height="96" rx="2"/>
  <rect class="ezr-roller" x="150" y="100" width="4" height="96" rx="2"/>
  <rect class="ezr-scroll" x="124" y="108" width="14" height="80" rx="6"/>
  <rect class="ezr-scroll" x="144" y="108" width="14" height="80" rx="6"/>
  <path class="detail" d="M131 112 L131 184 M151 112 L151 184" fill="none" stroke-width="0.6"/>
  <circle class="ezr-knob" cx="130" cy="98" r="3.4"/><circle class="ezr-knob" cx="152" cy="98" r="3.4"/>
  <circle class="ezr-knob" cx="130" cy="198" r="3"/><circle class="ezr-knob" cx="152" cy="198" r="3"/>`;
const ARM_SCROLL = `${SCROLL}${ARM_BENT}${SLEEVE}`;
const ARM_EMPTY = `${ARM_DOWN}${SLEEVE.replace('C115 122 115 134 116 144 C110 147 102 147 96 144', 'C114 118 113 126 112 132 C106 135 100 135 95 132')}`;

const ezra: CharacterDef = {
  id: 'ezra',
  name: '에스라',
  traits: '옆모습. 켜켜이 감아 올린 높은 두건과 청색 이마 띠, 허리까지 흘러내리는 긴 흰 수염, 흰 세마포 긴 옷, 어깨부터 늘어진 겉옷(밑단 술), 허리띠에 꽂은 먹그릇과 붓, 가슴에 세워 안은 큰 율법 두루마리(두 막대·금빛 꼭지). torn: 두건 없이 흐트러진 머리, 뜯겨 들쭉날쭉한 수염, V자로 찢긴 목둘레와 끝이 찢겨 늘어진 겉옷, 빈손',
  faces: 'right',
  height: 0.98,
  tint: '#d8d0bc',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 100],
      cloth: [100, 150],
      hair: [86, 50],
    },
    outfits: {
      scribe: { markup: CLOTH, parts: { hair: HEAD, legs: LEGS_SLIM, armR: ARM_SCROLL, armL: BACK_ARM } },
      torn: { markup: CLOTH_TORN, parts: { hair: HEAD_TORN, legs: LEGS_SLIM, armR: ARM_EMPTY, armL: BACK_ARM } },
    },
    markup: `
      <g data-part="legs">${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g data-part="cloth">${CLOTH}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 14)">
            ${FACE_MAN}
            <g data-part="hair">${HEAD}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_SCROLL}</g>
      </g>`,
  },
};

export default ezra;
