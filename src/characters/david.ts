// 다윗 — 이새의 막내, 베들레헴의 목동 → 사울을 피해 다닌 도망자 → 이스라엘의 왕 → 늙은 왕 (삼상 16 – 왕상 2).
// 7막 내내 주인공. 2단계 A급 sam1-16-anoint(삼상 16 「중심을 보시는」)에서 키트 임시 그림을 공들여 다시 그림.
// 실루엣의 표지 (사울=창·큰 키, 사무엘=기름 뿔·두 갈래 지팡이, 요나단=활과 구별):
//  - 수금(킨노르): 비스듬한 두 팔과 가로대, 네모진 울림통. 소년 때는 등에, 왕이 되어서는 손에 든다 (16:23, 삼하 6:5, 23:1)
//  - 물매: 허리끈에 늘어뜨린 두 가닥 끈과 돌 주머니 (17:40). 목자의 제구(가죽 주머니)
//  - 붉은 기가 도는 곱슬머리 — "그의 빛이 붉고 눈이 빼어나고 얼굴이 아름답더라" (16:12, 17:42)
//
// 옷 (장면 맨 위 "outfit": {"david": "fugitive"} 또는 beat의 "outfit"):
//  - shepherd (기본) : 소년 목동 (삼상 16–17). 작은 키(0.85), 수염 없음, 무릎 위 짧은 튜닉, 손에 목자의 막대기,
//                      허리의 물매와 가죽 주머니, 등에 비스듬히 멘 수금.
//  - armor           : 사울의 군복과 놋투구와 갑옷 (17:38-39). 투구가 눈썹까지 내려오고, 비늘 갑옷은 무릎을 덮고,
//                      칼끝이 땅에 끌린다. "익숙치 못하므로" — 곧 shepherd로 돌아온다.
//  - sling           : 물매를 돌리는 순간 (17:48-49). 막대기를 놓고, 앞팔을 머리 위로 들어 끈의 고리가 머리 위에서 돈다.
//  - fugitive        : 도망자 (삼상 18–31, 삼하 1). 어른 키, 덥수룩하게 자란 머리와 짧은 수염, 어깨를 감싼 거친 겉옷,
//                      허리에서 비스듬히 늘어진 긴 칼(골리앗의 칼, 21:9).
//  - king            : 왕 (삼하 2–24). 낮은 금관, 다듬은 둥근 수염, 발목까지 오는 긴 옷과 등 뒤로 끌리는 왕의 겉옷,
//                      앞손에 든 수금 — 시인 왕 (삼하 23:1 "이스라엘의 노래 잘하는 자").
//  - ephod           : 법궤 앞에서 춤출 때 (삼하 6:14 "베 에봇을 입었더라"). 왕의 관과 겉옷을 벗은 맨머리(둥근 수염),
//                      무릎까지 오는 흰 세마포 옷 위에 앞을 덮는 베 에봇과 금빛 띠, 앞팔을 머리 위로 들었다.
//  - old             : 노인 (삼하 24, 왕상 1–2 "나이 많아 늙으니 이불을 덮어도 따뜻하지 아니한지라"). 흰 머리·흰 긴 수염,
//                      가는 금띠 하나, 등이 둥글게 굽고, 어깨부터 몸을 감싼 두꺼운 이불 같은 겉옷을 앞손으로 여민다.
import type { CharacterDef } from './index';
import { ARM_BENT, ARM_DOWN, BACK_ARM, FACE_MAN, LEGS_SLIM, TORSO_SLIM } from './_parts.ts';

// ── 수금 (킨노르) ────────────────────────────────
// 그림 원점 = 가로대의 왼쪽 끝. 울림통(아래)은 오른쪽이 조금 넓은 사다리꼴, 두 팔은 바깥으로 살짝 벌어진다.
const LYRE_SHAPE = `
  <path class="dv-wood" d="M2 8 C1 26 3 46 6 62 L11 62 C9 46 8 28 9 9 Z"/>
  <path class="dv-wood" d="M33 2 C36 22 38 44 36 62 L41 62 C43 44 41 22 39 1 Z"/>
  <path class="dv-wood" d="M-3 4 C10 0 26 -2 44 -4 L45 2 C28 4 12 6 -2 10 Z"/>
  <path class="dv-wood" d="M2 60 L44 58 C46 66 45 74 42 80 L6 82 C3 76 1 68 2 60 Z"/>
  <path class="dv-string" d="M13 7 L13 60 M19 6 L20 60 M25 5 L26 60 M31 4 L32 60" fill="none" stroke-width="0.9"/>
  <path class="detail" d="M6 70 L42 68" fill="none" stroke-width="0.7"/>`;
/** 등에 비스듬히 멘 수금: 위쪽이 어깨 뒤로 비죽 나온다 */
const LYRE_BACK = `<g transform="translate(40 58) rotate(-20) scale(0.92)">${LYRE_SHAPE}</g>
  <path class="rope" d="M58 70 L104 104 L102 107 L56 73 Z"/>`;
/** 앞손에 세워 든 수금 (왕) */
const LYRE_HELD = `<g transform="translate(130 86) rotate(8) scale(0.8)">${LYRE_SHAPE}</g>`;

// ── 머리 (hair 부위 — 수염도 여기에) ────────────────────
// 붉은 기가 도는 짧은 곱슬머리 (소년)
const CURLS = `
  <g class="dv-ruddy">
    <path d="M100 15 C87 13 77 22 75 36 C74 46 75 55 78 62 C80 59 83 58 85 60 C84 52 85 45 89 40 C94 34 101 31 111 30 C116 30 120 31 123 33 C120 21 111 15 100 15 Z"/>
    <circle cx="82" cy="23" r="6.2"/><circle cx="92" cy="16" r="6.4"/><circle cx="103" cy="13.4" r="6.2"/><circle cx="113.5" cy="16" r="5.6"/>
    <circle cx="120.5" cy="23" r="4.4"/><circle cx="76" cy="33" r="6"/><circle cx="74.6" cy="45" r="5.6"/><circle cx="76.4" cy="56" r="5"/><circle cx="80" cy="64" r="3.8"/>
  </g>`;

// 도망자: 목덜미까지 덥수룩하게 자란 머리 + 짧고 거친 수염
const SHAGGY = `
  <g class="dv-ruddy">
    <path d="M101 12 C86 10 74 19 71 34 C69 47 70 60 70 72 C70 82 68 90 70 96 C74 92 78 91 82 93 C82 85 84 78 87 72 C84 62 84 52 87 45 C91 37 99 31 110 30 C117 30 122 32 125 35 C123 21 113 12 101 12 Z"/>
    <circle cx="82" cy="18" r="5.4"/><circle cx="73" cy="30" r="5.6"/><circle cx="70" cy="44" r="5.4"/><circle cx="69" cy="58" r="5"/><circle cx="70" cy="72" r="4.8"/><circle cx="72" cy="86" r="4.4"/>
    <circle cx="92" cy="12.6" r="5"/><circle cx="104" cy="11.4" r="4.8"/><circle cx="115" cy="15" r="4.2"/>
  </g>
  <path d="M96 55 C103 60 111 63 119 65 L122 67 C125 74 125 81 122 88 L118 86 L115 92 L111 87 L106 91 L103 86 C97 81 94 76 93 70 C92 64 93 59 96 55 Z"/>
  <path class="detail" d="M104 72 Q108 80 107 88 M113 72 Q117 80 116 88" fill="none" stroke-width="0.6"/>`;

// 왕: 단정한 물결 머리, 낮은 금관(작은 봉우리와 가운데 보석 — 사울의 관보다 가늘다), 다듬은 둥근 수염
const KING_HEAD = `
  <path class="dv-ruddy" d="M101 13 C87 11 76 20 73 34 C71 46 72 58 73 70 C74 78 76 84 80 88 C82 84 84 80 87 76 C84 66 84 54 87 46 C91 37 99 31 110 30 C117 30 122 32 125 35 C123 21 113 13 101 13 Z"/>
  <circle class="dv-ruddy" cx="74" cy="66" r="4.4"/><circle class="dv-ruddy" cx="77" cy="78" r="4.2"/><circle class="dv-ruddy" cx="82" cy="87" r="3.6"/>
  <path class="crown" d="M75 29 C91 23 109 22 126 27 L126 34 C109 30 91 31 76 36 Z"/>
  <path class="crown" d="M78 29 L81 18 L86 26 L93 14 L99 25 L106 12 L112 24 L119 15 L123 27 Z"/>
  <circle class="glint" cx="106" cy="29.6" r="2"/>
  <path d="M96 55 C103 60 111 63 119 65 L123 68 C127 78 127 90 122 100 C116 106 108 106 102 101 C96 95 93 86 92 76 C91 68 92 61 96 55 Z"/>
  <path class="detail" d="M104 74 Q110 88 107 100 M114 72 Q120 86 117 102" fill="none" stroke-width="0.7"/>`;

// 노인: 흰 머리가 목덜미로 흘러내리고, 가는 금띠 하나, 가슴까지 내려오는 흰 수염
const OLD_HEAD = `
  <g class="gray">
    <path d="M101 14 C88 12 77 20 74 34 C72 48 72 62 71 76 C70 88 67 98 69 106 C73 101 77 99 81 101 C81 92 83 84 87 76 C84 66 84 54 87 46 C91 37 99 31 110 30 C117 30 122 32 125 35 C123 22 113 14 101 14 Z"/>
    <path d="M96 55 C103 60 111 63 119 65 L123 68 C131 82 135 102 132 122 C130 138 124 152 116 166 C113 154 108 146 104 140 C96 126 92 110 91 94 C90 78 92 63 96 55 Z"/>
  </g>
  <path class="crown" d="M76 31 C92 26 109 25 125 29 L125 33.6 C109 30 92 31 77 35.6 Z"/>
  <path class="detail" d="M106 80 Q113 114 110 150 M118 78 Q126 112 120 156" fill="none" stroke-width="0.8"/>`;

// 사울의 놋투구 (17:38): 소년의 머리에는 너무 커서 눈썹까지 내려오고 한쪽으로 기울었다
const BIG_HELMET = `
  ${CURLS}
  <g transform="rotate(8 100 40)">
    <path class="dv-bronze" d="M100 2 C80 2 66 16 66 38 L66 58 C72 55 80 54 86 56 C86 48 88 44 92 42 C100 40 114 40 132 44 C132 18 120 2 100 2 Z"/>
    <path class="dv-bronze" d="M64 40 L134 44 L134 50 L64 47 Z"/>
    <path d="M70 14 C76 -2 94 -9 108 -7 C120 -5 128 4 131 14 C122 5 110 0 98 1 C86 3 77 8 70 14 Z"/>
    <path class="detail" d="M100 4 L100 40" fill="none" stroke-width="0.8"/>
  </g>`;

// ── 옷 (cloth 부위) ─────────────────────────────
/** 무릎 위까지 오는 짧은 튜닉 (목동) */
const SHORT_TUNIC = `
  <path class="tone2" d="M84 98 C89 94 95 92 101 93 C107 94 111 97 114 101 C120 106 124 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C121 196 124 218 126 236 C127 244 128 250 129 256 Q122 261 115 257 Q107 262 99 258 Q91 263 83 258 Q78 261 75 257 C75 238 77 220 79 206 C80 194 81 184 83 172 C79 152 77 130 79 116 C80 108 81 102 84 98 Z"/>
  <path class="detail" d="M88 104 Q83 150 82 172 M90 196 Q86 226 84 254 M112 196 Q118 226 122 254" fill="none" stroke-width="0.8"/>`;
/** 새끼줄 허리띠 */
const ROPE_BELT = `<path class="rope" d="M80 175 Q100 182 121 176 L121 181 Q100 188 80 180 Z"/>`;
/** 목자의 제구: 허리 뒤에 매단 가죽 주머니 (매끄러운 돌 다섯을 넣은 곳, 17:40) */
const BAG = `
  <path class="dv-leather" d="M72 182 C70 196 72 210 78 218 C84 224 92 222 95 214 C97 204 96 192 93 182 Z"/>
  <path class="detail" d="M73 190 Q84 194 95 189" fill="none" stroke-width="0.8"/>`;
/** 물매: 허리끈에 걸어 늘어뜨린 두 가닥 끈과 돌 주머니 */
const SLING_HANG = `
  <path class="dv-cord" d="M96 182 C93 198 94 214 98 228 M101 183 C103 199 103 214 100 228" fill="none" stroke-width="1.5"/>
  <ellipse class="dv-cord" cx="99" cy="231" rx="4.6" ry="3.6"/>`;

const SHEPHERD = `${LYRE_BACK}${SHORT_TUNIC}${ROPE_BELT}${BAG}${SLING_HANG}`;
/** 물매를 돌릴 때: 걸어 둔 물매가 손으로 올라가서 허리에는 주머니만 남는다 */
const SHEPHERD_SLING = `${LYRE_BACK}${SHORT_TUNIC}${ROPE_BELT}${BAG}`;

/** 사울의 군복과 비늘 갑옷 (17:38-39): 무릎을 덮도록 크고, 칼끝이 땅에 끌린다 */
const ARMOR = `
  ${SHORT_TUNIC}
  <path class="dv-bronze" d="M80 94 C88 90 104 90 116 96 C124 102 129 112 129 124 C129 140 124 152 122 166 C124 200 130 240 134 290 Q120 296 106 292 Q92 297 76 291 C74 250 76 210 80 172 C76 150 74 128 76 112 C77 104 78 98 80 94 Z"/>
  <path class="detail" d="${Array.from({ length: 12 }, (_, i) => {
    const y = 106 + i * 15;
    return `M${78 + i * 0.2} ${y} Q${86} ${y + 5} ${94} ${y} Q${102} ${y + 5} ${110} ${y} Q${118} ${y + 5} ${126 + i * 0.6} ${y}`;
  }).join(' ')}" fill="none" stroke-width="0.8"/>
  <path class="rope" d="M76 176 Q102 184 126 177 L126 183 Q102 190 76 182 Z"/>
  <path d="M84 182 L82 190 L75 190 L76 186 Z"/>
  <path d="M74 190 L86 190 L68 400 L64 406 L62 398 Z"/>
  <path class="crown" d="M70 184 L92 186 L91 190 L70 189 Z"/>`;

/** 도망자: 짧은 튜닉 위에 어깨를 감싼 거친 겉옷 + 허리에 비스듬히 늘어진 긴 칼 */
const FUGITIVE = `
  <!-- 겉옷 (등 쪽): 등을 덮고 종아리까지, 해진 아랫단 -->
  <path class="dv-cloak" d="M90 86 C76 90 64 106 60 132 C55 168 56 214 58 258 C59 284 58 304 54 326 L60 322 L64 330 L69 322 L75 330 L80 322 L85 328 C86 290 88 246 90 206 C91 164 92 124 96 98 Z"/>
  <path class="detail" d="M70 112 Q62 200 66 316 M80 104 Q74 220 78 320" fill="none" stroke-width="1.1"/>
  <path class="tone2" d="M84 98 C89 94 95 92 101 93 C107 94 111 97 114 101 C120 106 124 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C122 200 126 228 129 256 C130 266 131 274 133 284 Q126 288 118 284 Q110 290 101 285 Q92 291 84 286 Q78 289 74 284 C74 260 76 234 79 212 C80 198 81 186 83 172 C79 152 77 130 79 116 C80 108 81 102 84 98 Z"/>
  <path class="rope" d="M80 175 Q100 182 121 176 L121 182 Q100 189 80 181 Z"/>
  <!-- 칼: 칼집이 허리 뒤에서 비스듬히 (골리앗의 칼 — 길고 넓다, 21:9) -->
  <path class="dv-leather" d="M84 182 L95 184 L66 306 L60 310 L58 302 Z"/>
  <path class="crown" d="M80 179 L101 175 L102 180 L81 184 Z"/>
  <path d="M88 168 L94 167 L96 178 L90 179 Z"/>
  <circle cx="91" cy="166" r="3.4"/>
  <!-- 앞어깨로 넘어온 겉옷 자락 -->
  <path class="dv-cloak" d="M86 90 C98 86 112 90 120 100 C112 110 104 122 99 136 C95 148 92 160 91 170 L84 172 C82 148 82 124 83 108 C84 100 85 94 86 90 Z"/>`;

/** 왕: 발목까지 오는 긴 옷 + 금빛 깃 + 등 뒤로 바닥까지 끌리는 왕의 겉옷 (아랫단 무늬 띠) */
const ROYAL = `
  <path class="dv-royal" d="M88 88 C74 94 64 114 60 146 C55 196 56 262 56 330 C56 360 54 384 50 404 Q72 410 94 404 C92 330 92 250 94 190 C95 148 96 116 98 96 Z"/>
  <path class="crown" d="M56 386 Q72 392 94 388 L94 396 Q72 400 55 394 Z"/>
  <path class="detail" d="M68 120 Q60 250 64 384 M82 110 Q76 260 82 386" fill="none" stroke-width="1.2"/>
  <path class="tone2" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 210 132 262 138 320 C141 350 144 372 147 390 Q136 395 124 391 Q112 396 100 391 Q88 395 77 390 C76 350 76 300 77 262 C78 230 80 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="crown" d="M80 176 Q100 183 122 177 L122 183 Q100 190 80 182 Z"/>
  <path class="detail" d="M90 200 Q88 300 90 388 M112 200 Q124 300 136 388" fill="none" stroke-width="1"/>
  <path class="crown" d="M84 96 C92 102 106 104 115 99 L116 104 C106 110 92 108 83 101 Z"/>
  <path class="crown" d="M77 380 Q90 384 100 381 Q112 385 124 381 Q136 384 146 380 L147 388 Q136 392 124 389 Q112 393 100 389 Q88 392 77 388 Z"/>`;

/** 노인: 둥글게 굽은 등 위로 어깨부터 몸을 감싼 두꺼운 이불 같은 겉옷 (왕상 1:1), 아랫단의 술 */
const OLD_WRAP = `
  <path class="tone2" d="M84 97 C90 93 96 91 102 92 C108 93 112 96 115 100 C121 105 125 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C124 210 132 262 138 320 C141 350 144 372 147 390 Q136 395 124 391 Q112 396 100 391 Q88 395 77 390 C76 350 76 300 77 262 C78 230 80 200 83 172 C79 152 77 130 79 116 C80 108 81 102 84 97 Z"/>
  <path class="dv-blanket" d="M92 80 C76 76 58 86 52 106 C46 126 50 144 58 160 C64 180 66 206 66 240 C66 270 68 300 72 330 Q90 336 108 332 Q124 336 138 330 C134 300 130 270 128 244 C126 214 126 186 128 162 C130 140 132 120 126 106 C120 94 110 86 100 84 Z"/>
  <path class="detail" d="M70 112 Q62 160 70 220 Q76 280 76 326 M84 100 Q78 180 86 260 Q90 300 92 330 M110 96 Q118 130 116 170" fill="none" stroke-width="1"/>
  <path class="detail" d="M74 330 L74 338 M82 331 L82 339 M90 332 L90 340 M98 332 L98 340 M106 332 L106 340 M114 332 L114 340 M122 332 L122 340 M130 331 L130 339 M136 330 L136 338" fill="none" stroke-width="1.1"/>
  <path class="detail" d="M100 86 C108 100 112 120 114 140" fill="none" stroke-width="1.6"/>`;


/** 왕이 관을 벗은 맨머리 (삼하 6:14) — KING_HEAD에서 관만 뺐다 */
const KING_BARE = `
  <path class="dv-ruddy" d="M101 13 C87 11 76 20 73 34 C71 46 72 58 73 70 C74 78 76 84 80 88 C82 84 84 80 87 76 C84 66 84 54 87 46 C91 37 99 31 110 30 C117 30 122 32 125 35 C123 21 113 13 101 13 Z"/>
  <circle class="dv-ruddy" cx="74" cy="66" r="4.4"/><circle class="dv-ruddy" cx="77" cy="78" r="4.2"/><circle class="dv-ruddy" cx="82" cy="87" r="3.6"/>
  <circle class="dv-ruddy" cx="84" cy="20" r="5"/><circle class="dv-ruddy" cx="95" cy="14" r="5.2"/><circle class="dv-ruddy" cx="107" cy="13" r="4.8"/><circle class="dv-ruddy" cx="117" cy="17" r="4.2"/>
  <path d="M96 55 C103 60 111 63 119 65 L123 68 C127 78 127 90 122 100 C116 106 108 106 102 101 C96 95 93 86 92 76 C91 68 92 61 96 55 Z"/>
  <path class="detail" d="M104 74 Q110 88 107 100 M114 72 Q120 86 117 102" fill="none" stroke-width="0.7"/>`;

/** 베 에봇 (삼하 6:14): 무릎까지 오는 흰 세마포 옷 + 가슴에서 허벅지까지 앞을 덮는 에봇 + 금빛 띠. 관도 겉옷도 없다 */
const EPHOD = `
  ${SHORT_TUNIC.replace('class="tone2"', 'class="dv-linen"')}
  <path class="dv-linen dv-ephod" d="M86 99 C93 94 107 94 115 100 C119 120 121 146 122 170 C110 176 92 176 80 171 C80 146 82 120 86 99 Z"/>
  <path class="detail" d="M91 101 L88 170 M109 98 L114 171 M86 120 Q102 124 118 118" fill="none" stroke-width="0.8"/>
  <path class="crown" d="M79 168 Q100 176 122 169 L122 175 Q100 183 79 174 Z"/>
  <path class="crown" d="M84 174 L80 206 L85 207 L89 175 Z"/>`;

// ── 앞팔 ────────────────────────────────────────
/** 목동: 팔꿈치를 굽혀 막대기를 쥔다 */
const ARM_STICK = ARM_BENT;
/** 왕: 굽힌 팔로 수금을 세워 든다 (수금이 팔보다 뒤) */
const ARM_LYRE = `${LYRE_HELD}${ARM_BENT}`;
/** 물매: 앞팔을 머리 위로 들고, 끈의 고리가 머리 위에서 돈다 */
const ARM_SLING = `
  <path d="M94 110 C91 100 98 93 106 94 C113 95 117 101 116 108 C119 94 123 74 127 54 C129 44 131 34 132 26 C133 19 139 16 143 20 C146 24 144 30 142 34 C139 46 135 64 131 82 C127 98 122 112 116 120 C109 126 99 122 96 116 Z"/>
  <path class="dv-cord dv-whirl" d="M139 20 C150 -2 132 -24 110 -18 C92 -12 96 6 139 20" fill="none" stroke-width="1.6"/>
  <ellipse class="dv-cord dv-whirl" cx="106" cy="-15" rx="6" ry="4.4" transform="rotate(-20 106 -15)"/>`;
/** 춤: 앞팔을 머리 위로 높이 든다 (삼하 6:14, 16 "뛰놀며 춤추는") */
const ARM_RAISED = `
  <path d="M94 110 C91 100 98 93 106 94 C113 95 117 101 116 108 C119 94 123 74 127 54 C129 44 131 34 132 26 C133 19 139 16 143 20 C146 24 144 30 142 34 C139 46 135 64 131 82 C127 98 122 112 116 120 C109 126 99 122 96 116 Z"/>`;
/** 노인: 이불 자락을 가슴께에서 여미는 손 */
const ARM_CLUTCH = `
  <path d="M93 104 C92 97 98 94 104 95 C110 96 113 101 113 110 C113 126 112 140 113 150 C116 146 120 140 122 134 C124 128 130 126 133 130 C136 134 134 140 130 144 C126 152 120 160 112 166 C104 170 98 166 97 158 C96 142 94 120 93 104 Z"/>
  <path class="dv-blanket" d="M88 92 C98 86 112 88 120 98 C126 106 128 118 126 130 C122 128 118 130 116 136 C112 150 108 162 100 172 C94 178 88 176 86 168 C84 146 84 118 88 92 Z"/>
  <path class="detail" d="M94 100 Q104 130 98 168 M108 96 Q118 112 116 132" fill="none" stroke-width="0.9"/>`;

// ── 다리 + 땅에 붙는 소품 ──────────────────────────
/** 목동의 막대기: 거칠게 다듬은 나뭇가지, 위쪽에 잘린 곁가지 혹 (17:40, 43 "막대기를 가지고") */
const STICK = `
  <path d="M141.6 409 L142.8 126 C142.6 122 143.6 118 145 116 L148.4 116 C148.6 120 148 124 147.6 128 L146.8 409 Z"/>
  <path d="M147.4 170 L153 162 L154.6 164 L148 174 Z"/>
  <path class="detail" d="M144.6 200 l1.6 0 M144.4 260 l1.6 0 M144.2 330 l1.6 0" fill="none" stroke-width="1"/>`;
/** 맨 정강이에 감은 신 끈 */
const SANDALS = `<path class="detail" d="M88 386 L100 382 M88 394 L100 390 M118 386 L130 382 M118 394 L130 390" fill="none" stroke-width="1"/>`;

const david: CharacterDef = {
  id: 'david',
  name: '다윗',
  traits: '옆모습. 소년 목동(기본): 작은 키, 붉은 기 도는 곱슬머리, 수염 없음, 짧은 튜닉, 손에 막대기, 허리의 물매와 가죽 주머니, 등에 비스듬히 멘 수금. fugitive: 덥수룩한 머리·짧은 수염·거친 겉옷·허리의 긴 칼. king: 낮은 금관·둥근 수염·끌리는 왕의 겉옷·손에 든 수금. ephod: 관 없는 맨머리·흰 세마포 베 에봇·든 팔. old: 흰 머리·흰 수염·굽은 등·이불 같은 겉옷',
  faces: 'right',
  height: 0.85,
  tint: '#9a5236',
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
      shepherd: { markup: SHEPHERD, height: 0.85, parts: { hair: CURLS, legs: STICK + LEGS_SLIM + SANDALS, armR: ARM_STICK, armL: BACK_ARM } },
      armor: { markup: ARMOR, height: 0.85, parts: { hair: BIG_HELMET, legs: LEGS_SLIM, armR: ARM_DOWN, armL: BACK_ARM } },
      sling: { markup: SHEPHERD_SLING, height: 0.85, parts: { hair: CURLS, legs: LEGS_SLIM + SANDALS, armR: ARM_SLING, armL: BACK_ARM } },
      fugitive: { markup: FUGITIVE, height: 1, parts: { hair: SHAGGY, legs: LEGS_SLIM + SANDALS, armR: ARM_DOWN, armL: BACK_ARM } },
      king: { markup: ROYAL, height: 1.03, parts: { hair: KING_HEAD, legs: LEGS_SLIM, armR: ARM_LYRE, armL: BACK_ARM } },
      ephod: { markup: EPHOD, height: 1.03, parts: { hair: KING_BARE, legs: LEGS_SLIM + SANDALS, armR: ARM_RAISED, armL: BACK_ARM } },
      old: { markup: OLD_WRAP, height: 0.94, parts: { hair: OLD_HEAD, legs: LEGS_SLIM, armR: ARM_CLUTCH, armL: BACK_ARM } },
    },
    markup: `
      <g data-part="legs">${STICK}${LEGS_SLIM}${SANDALS}</g>
      <g data-part="upper">
        <g data-part="armL">${BACK_ARM}</g>
        ${TORSO_SLIM}
        <g data-part="cloth">${SHEPHERD}</g>
        <g data-part="head">
          <g transform="matrix(0.9 0 0 0.9 12 9)">
            ${FACE_MAN}
            <g data-part="hair">${CURLS}</g>
          </g>
        </g>
        <g data-part="armR">${ARM_STICK}</g>
      </g>`,
  },
};

export default david;
