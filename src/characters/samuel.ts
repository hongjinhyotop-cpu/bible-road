// 사무엘 — 한나가 구해서 얻은 아들, 실로에서 자란 아이, 라마의 선지자이자 마지막 사사 (삼상 1–25).
// 7막 A급 sam1-1-2-hannah · sam1-3-call에서 키트 임시 그림을 공들여 다시 그림 (파일 이름 그대로 → 모든 에피소드에 반영).
// 특징 (모세·엘리와 실루엣으로 구별되게):
//  - 정수리가 살짝 뾰족한 깊은 두건이 등 쪽으로 길게 떨어진다 (모세는 둥근 두건, 엘리는 제사장 관)
//  - 끝이 가늘게 모이는 긴 수염, 흰 가닥이 섞였다 (모세는 네모진 짙은 수염)
//  - 허리끈에 매단 기름 뿔 — 구부러진 숫양 뿔에 마개 (삼상 10:1, 16:1, 13). 이 사람의 표지
//  - 어깨 높이의 가는 지팡이, 꼭대기가 두 갈래로 갈라짐 (순회하며 다스림, 7:16)
//  - 발목까지 오는 겉옷(메일), 아랫단에 짙은 단 — 어머니가 지어 오던 작은 겉옷(2:19)이 자라 이 옷이 됐다.
//    사울이 붙잡다 찢은 것도 이 옷자락(15:27), 엔돌에서 "겉옷을 입었나이다"(28:14)
//
// 옷 (장면 beat의 "outfit": {"samuel": "child"}):
//  - child   : 실로의 어린 사무엘 (삼상 2:18-19, 3장). 작은 키(0.6), 큰 머리·짧은 머리, 수염 없음.
//              흰 세마포 에봇(어깨끈·허리에 감은 띠)을, 어머니가 해마다 지어 온 작은 겉옷(정강이까지, 색 있는 천) 위에 입었다.
//  - old     : 늙은 사무엘 (삼상 8:1 "늙으매", 12:2 "나는 늙어 머리가 희었고"). 센 두건과 흰 수염, 등이 둥글게 굽은 겉옷, 지팡이에 기댐.
//  - prophet : 기본 차림 (장년의 선지자). child·old에서 돌아올 때 쓴다.
import type { CharacterDef } from './index';
import { ARM_BENT, ARM_DOWN, BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';

// ── 지팡이: 어깨 높이, 가늘고 꼭대기가 두 갈래 ─────────
const STAFF = `
  <path d="M141.2 409 L142.2 92 L146.4 92 L147 409 Z"/>
  <path d="M142.4 96 C140 86 136 80 131 77 L133 74 C138 77 142 83 144.2 90 C146 82 150 76 156 73 L157.6 76 C152 79 148 86 146.4 96 Z"/>
  <path class="detail" d="M141.8 150 h5 M142 152.6 h5" fill="none" stroke-width="0.8"/>`;

// ── 머리 ────────────────────────────────────────
// 정수리가 살짝 뾰족한 깊은 두건: 이마를 덮고, 목덜미를 지나 등 쪽으로 길게 떨어진다
const HOOD_SHAPE = 'M104 2 C96 4 86 8 78 16 C70 26 67 38 67 52 C67 72 68 92 64 112 C62 124 63 134 67 142 C72 136 78 133 85 134 C85 118 86 100 89 86 C85 74 84 61 87 50 C90 40 98 33 111 31 C118 30 123 31 127 34 C125 24 120 16 114 10 C111 7 108 4 104 2 Z';
const HOOD = `
  <path d="${HOOD_SHAPE}"/>
  <path class="detail" d="M88 33 Q104 23 124 30 M73 44 Q70 92 66 134 M80 40 Q79 84 80 128" fill="none" stroke-width="0.9"/>`;
const HOOD_GRAY = `<g class="gray"><path d="${HOOD_SHAPE}"/></g>
  <path class="detail" d="M88 33 Q104 23 124 30 M73 44 Q70 92 66 134" fill="none" stroke-width="0.9"/>`;

// 끝이 가늘게 모이는 긴 수염 (흰 가닥 둘)
const BEARD_SHAPE = 'M97 54 C104 59 112 63 119 65 L123 68 C130 82 133 100 130 118 C128 132 123 146 116 160 C114 150 110 142 106 136 C98 124 93 110 91 96 C90 80 92 64 97 54 Z';
const BEARD = `
  <path d="${BEARD_SHAPE}"/>
  <path class="gray" d="M118 78 C124 98 124 122 117 150 L115 149 C121 122 121 100 116 79 Z"/>
  <path class="detail" d="M106 78 Q112 108 110 136" fill="none" stroke-width="0.9"/>`;
// 노년: 더 길고 흰 수염 (12:2 "머리가 희었고")
const BEARD_OLD = `<g class="gray">
  <path d="M97 54 C104 59 112 63 119 65 L123 68 C131 82 135 104 132 126 C130 142 124 158 116 174 C113 162 108 152 104 146 C96 132 92 116 91 98 C90 80 92 64 97 54 Z"/>
  <path class="detail" d="M106 78 Q113 112 110 148 M118 78 Q126 112 120 160" fill="none" stroke-width="0.9"/>
</g>`;

// 어린 사무엘: 머리를 조금 크게 (얼굴을 한 번 더 그려 덮는다 — 실루엣이라 겹쳐도 한 덩어리) + 짧은 아이 머리
const CHILD_HEAD = `
  <g transform="matrix(1.16 0 0 1.16 -16 -8.8)">
    ${FACE_MAN}
    <path d="M100 13 C87 11 76 20 74 35 C73 45 74 55 77 63 C79 60 82 59 84 61 C83 53 84 46 88 41 C92 35 99 31 108 30 C113 29 118 30 122 32 C120 24 116 18 110 15 C112 12 114 11 116 12 C112 9 106 10 103 13 Z"/>
    <path d="M86 16 C82 12 76 13 74 17 C78 16 82 17 85 19 Z"/>
  </g>`;

// ── 옷 (cloth 부위) ─────────────────────────────
// 기름 뿔: 허리끈에 매단 구부러진 숫양 뿔, 넓은 끝에 마개 (기름이 든 쪽이 위)
const HORN = `
  <path class="rope" d="M112 182 L116 194 L114.4 194.6 L110.6 183 Z"/>
  <g class="sm-horn">
    <path d="M110 196 C118 192 127 195 130 205 C133 216 131 229 124 242 C122 246 118 247 117 244 C122 232 124 220 121 210 C119 204 114 202 109 203 Z"/>
    <ellipse cx="110" cy="199.4" rx="3.4" ry="4.4" transform="rotate(-18 110 199.4)"/>
  </g>
  <path class="detail" d="M118 205 Q124 208 125 214 M120 220 Q125 223 125 229" fill="none" stroke-width="0.7"/>`;

/** 발목까지 오는 겉옷(메일): 아랫단의 짙은 단, 허리끈 */
const ROBE_SHAPE = 'M84 96 C90 92 96 90 102 91 C108 92 112 95 115 99 C121 104 125 111 125 119 C126 129 122 139 119 149 C117 159 117 169 119 179 C124 209 132 261 138 319 C141 349 144 371 147 389 Q136 394 124 390 Q112 395 100 390 Q88 394 77 389 C76 349 76 299 77 261 C78 229 80 199 83 171 C79 151 77 129 79 115 C80 107 81 101 84 96 Z';
const ROBE = `
  <path d="${ROBE_SHAPE}"/>
  <path class="sm-hem" d="M77 374 Q88 379 100 375 Q112 380 124 375 Q136 379 145.6 374 L147 389 Q136 394 124 390 Q112 395 100 390 Q88 394 77 389 Z"/>
  <path class="detail" d="M81 177 Q100 184 121 178" fill="none" stroke-width="2.6"/>
  <path class="detail" d="M88 104 Q83 150 82 172 M90 200 Q88 300 90 372 M112 200 Q124 300 134 372" fill="none" stroke-width="1"/>`;

/** 등 뒤 짧은 어깨 망토 (두건과 이어짐) */
const CAPE = `
  <path d="M86 92 C78 98 72 112 70 132 C68 152 69 170 72 186 C78 182 84 182 90 184 C89 160 90 132 93 100 Z"/>
  <path class="detail" d="M78 112 Q73 150 76 182" fill="none" stroke-width="0.9"/>`;

const PROPHET = `${CAPE}${ROBE}${HORN}`;

/** 노년: 둥글게 굽은 등 — 어깨와 등을 덮는 망토가 불룩하게 솟는다 */
const OLD = `
  <path d="M90 88 C80 86 70 92 64 104 C58 118 58 134 62 150 C64 166 66 182 70 194 C77 189 84 189 91 191 C89 166 90 134 94 100 Z"/>
  <path class="detail" d="M70 108 Q62 140 72 188" fill="none" stroke-width="0.9"/>
  ${ROBE}${HORN}`;

/** 어린 사무엘: 어머니가 지어 온 작은 겉옷(색 천, 정강이까지) 위에 흰 세마포 에봇(어깨끈, 허리에 감은 띠) */
const CHILD = `
  <path class="sm-coat" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C123 206 129 248 133 290 C135 308 137 322 139 336 Q128 341 116 337 Q104 342 92 337 Q82 340 76 336 C76 300 77 264 79 236 C80 212 81 190 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="detail" d="M78 330 Q100 336 138 330" fill="none" stroke-width="1.4"/>
  <path class="detail" d="M90 196 Q88 270 88 332 M112 198 Q122 270 130 332" fill="none" stroke-width="0.8"/>
  <path class="linen" d="M85 100 C92 95 104 95 113 100 C120 106 123 116 122 130 C121 150 119 166 120 182 C122 200 126 218 128 236 Q114 241 100 238 Q88 241 80 236 C80 214 81 196 82 180 C80 160 79 138 80 120 C81 110 82 104 85 100 Z"/>
  <path class="detail" d="M94 98 Q98 120 96 140 M88 200 Q100 205 124 200" fill="none" stroke-width="0.6"/>
  <path class="linen-belt" d="M80 172 Q101 180 121 173 L121 181 Q101 189 80 180 Z"/>
  <path class="linen-belt" d="M110 182 L117 181 L121 214 L114 216 Z"/>`;

const samuel: CharacterDef = {
  id: 'samuel',
  name: '사무엘',
  traits: '옆모습, 정수리가 살짝 뾰족하고 등으로 길게 떨어지는 두건, 끝이 모이는 긴 수염(흰 가닥), 허리에 매단 기름 뿔(마개 달린 숫양 뿔), 꼭대기가 두 갈래인 가는 지팡이, 아랫단이 짙은 겉옷. 어린 시절(child): 작은 키·큰 머리, 흰 세마포 에봇 + 작은 겉옷. 노년(old): 센 두건·흰 수염, 굽은 등',
  faces: 'right',
  height: 1,
  tint: '#7d6a4e',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      head: [104, 84],
      upper: [100, 206],
      armL: [88, 104],
      armR: [104, 100],
      cloth: [102, 110],
      hair: [96, 66],
    },
    outfits: {
      prophet: { markup: PROPHET, height: 1, parts: { hair: HOOD + BEARD, legs: STAFF + LEGS_SLIM, armR: ARM_BENT, armL: BACK_ARM } },
      child: { markup: CHILD, height: 0.6, parts: { hair: CHILD_HEAD, legs: LEGS_SLIM, armR: ARM_DOWN, armL: BACK_ARM } },
      old: { markup: OLD, height: 0.96, parts: { hair: HOOD_GRAY + BEARD_OLD, legs: STAFF + LEGS_SLIM, armR: ARM_BENT, armL: BACK_ARM } },
    },
    markup: `
      <g data-part="legs">${STAFF}${LEGS_SLIM}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g data-part="cloth" class="tone2">${PROPHET}</g>
        <g data-part="head">
          <g transform="matrix(0.88 0 0 0.88 13 10)">
            ${FACE_MAN}
            <g data-part="hair">${HOOD}${BEARD}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_BENT}</g>
      </g>`,
  },
};

export default samuel;
