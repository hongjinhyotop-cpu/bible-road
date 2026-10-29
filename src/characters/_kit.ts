// 기본 실루엣 키트: 조연·B급 인물은 새로 그리지 않고 이걸 조합해서 만든다 (CLAUDE.md 8-1).
//  - base  = 몸틀 (노인 / 남자 / 청년 / 여자 / 노파 / 소녀 / 아이 / 병사 / 왕 / 제사장)
//  - hair  = 머리 (두건, 짧은 머리, 묶은 머리, 긴 머리, 너울 …). 생략하면 몸틀 기본값
//  - beard = 수염 (none / short / long / gray)
//  - props = 소품 (지팡이, 목자 지팡이, 항아리, 활, 칼, 왕관 …) 여러 개 OK
//  - tint  = 옷 색 (막 테마 위에 살짝 섞이는 색)
// 인물 파일은 `export default person({ ... })` 한 줄이면 된다. 장면 JSON의 "extras"도 같은 키트로 그 자리에서 만든다.
import type { CharacterDef } from './index';
import {
  ARM_BENT, ARM_DOWN, BEARD_SHORT, FACE_MAN, FACE_WOMAN, LEGS_SLIM, LEGS_STOCKY, PIVOTS,
  ROBE_LONG, ROBE_WOMAN, TORSO_SLIM, TORSO_STOCKY, TORSO_WOMAN, VEIL, figure,
} from './_parts.ts';

export const BASES = ['old-man', 'man', 'youth', 'woman', 'old-woman', 'girl', 'child', 'soldier', 'king', 'priest'] as const;
export type Base = (typeof BASES)[number];

export const HAIRS = ['hood', 'short', 'tied', 'long', 'bald', 'veil', 'loose', 'helmet', 'crown', 'turban', 'shaggy', 'locks'] as const;
export type Hair = (typeof HAIRS)[number];

export const BEARDS = ['none', 'short', 'long', 'gray'] as const;
export type Beard = (typeof BEARDS)[number];

export const PROPS = ['staff', 'crook', 'jar', 'lamp', 'bundle', 'lamb', 'bow', 'sword', 'spear', 'shield', 'scepter', 'scroll', 'basket', 'sheaf', 'cloak', 'torch', 'horn', 'timbrel'] as const;
export type Prop = (typeof PROPS)[number];

/** 옷 색. 막 테마색 위에 살짝 섞인다 (실루엣이라 아주 은은하게) */
export const TINTS = {
  red: '#b0482e',
  blue: '#3e5f9a',
  purple: '#6e3f8a',
  green: '#4f7a46',
  gold: '#c79a3e',
  white: '#d8d2c0',
  brown: '#7a5232',
  gray: '#7d808a',
} as const;
export type Tint = keyof typeof TINTS;

export interface PersonSpec {
  id: string;
  name: string;
  base: Base;
  hair?: Hair;
  beard?: Beard;
  props?: Prop[];
  tint?: Tint;
  /** 키 비율 (몸틀 기본값을 덮어씀) */
  height?: number;
  /** 문서용 메모 */
  traits?: string;
}

// ── 머리 ──────────────────────────────────────
const HAIR: Record<Hair, string> = {
  // 어깨까지 덮는 두건 + 머리띠 (셈과 같은 틀)
  hood: `
    <path d="M99 10 C85 9 72 20 70 37 C68 54 70 72 67 90 C66 100 69 108 75 112 C79 102 83 94 88 86 C84 74 83 61 86 50 C89 40 97 32 110 30 C116 29 121 31 125 35 C122 21 113 10 99 10 Z"/>
    <path class="detail" d="M84 33 Q103 25 124 33" fill="none" stroke-width="2.2"/>`,
  short: `<path d="M100 15 C87 13 76 22 74 37 C73 46 74 55 77 62 C79 59 82 58 84 60 C83 52 84 45 88 40 C93 34 101 31 111 30 C116 30 120 31 122 33 C119 22 111 15 100 15 Z"/>`,
  tied: `
    <path d="M100 13 C86 11 75 21 73 36 C72 46 73 56 76 64 C78 61 81 60 83 62 C82 54 83 46 87 40 C92 33 101 30 111 29 C116 29 120 30 122 32 C119 20 111 13 100 13 Z"/>
    <circle cx="76" cy="32" r="9"/>
    <path d="M70 36 C64 44 62 54 64 62 C67 56 70 52 74 50 Z"/>`,
  // 어깨 아래로 흘러내리는 긴 머리
  long: `<path d="M100 14 C86 12 74 22 72 38 C70 56 70 76 66 98 C64 112 66 124 70 132 C74 124 78 120 82 120 C82 108 84 96 87 86 C83 74 82 60 85 50 C89 39 98 31 111 30 C117 30 121 32 123 34 C120 21 112 14 100 14 Z"/>`,
  // 벗어진 정수리, 뒤로 남은 머리 (늙은이)
  bald: `<path class="gray" d="M90 22 C78 28 71 40 70 54 C69 68 71 80 69 94 C68 106 65 116 68 126 C72 121 76 121 78 125 C80 118 83 115 86 117 C85 107 86 96 88 86 C83 74 82 62 85 51 C87 42 90 33 96 26 Z"/>`,
  veil: VEIL,
  // 너울 없이 풀어 내린 머리 (젊은 여자)
  loose: `<path d="M100 13 C85 11 73 22 71 39 C69 58 70 82 66 108 C64 126 64 146 68 164 C72 154 77 150 82 152 C82 132 84 110 87 92 C82 78 81 62 85 50 C89 39 98 31 111 30 C117 30 121 32 123 34 C120 20 112 13 100 13 Z"/>`,
  // 병사 투구: 둥근 투구 + 볏
  helmet: `
    <path d="M98 12 C84 12 73 22 72 38 L72 54 C75 52 80 52 84 54 C84 46 86 40 90 36 C96 30 106 29 116 31 L124 34 C122 20 112 12 98 12 Z"/>
    <path d="M74 30 C80 10 104 2 124 14 C112 10 96 10 86 18 C80 22 77 26 74 30 Z"/>
    <path d="M70 56 L86 56 L86 62 L72 62 Z"/>`,
  // 왕관: 짧은 머리 위에 뾰족한 관
  crown: `
    <path d="M100 15 C87 13 76 22 74 37 C73 46 74 55 77 62 C79 59 82 58 84 60 C83 52 84 45 88 40 C93 34 101 31 111 30 C116 30 120 31 122 33 C119 22 111 15 100 15 Z"/>
    <path class="crown" d="M78 22 L80 4 L88 14 L96 0 L104 13 L112 2 L116 16 L122 8 L122 24 C108 18 92 18 78 22 Z"/>`,
  // 제사장 관: 둥글게 감은 두건(관) + 앞의 금빛 패
  turban: `
    <path d="M78 34 C74 18 86 6 102 6 C118 6 128 16 126 32 C112 28 92 28 78 34 Z"/>
    <path d="M76 36 C90 30 112 30 127 34 L126 40 C112 36 90 36 77 42 Z"/>
    <rect class="crown" x="108" y="26" width="10" height="6" rx="1"/>
    <path d="M78 40 C74 50 72 60 74 70 C77 66 80 64 84 64 C82 56 83 48 86 42 Z"/>`,
  // 일곱 가닥으로 땋아 내린 긴 머리 (나실인 — 머리에 삭도를 대지 않음, 삿 13:5, 16:13)
  locks: `
    <path d="M100 12 C85 10 73 21 71 38 C70 50 70 62 72 72 C76 66 80 62 84 60 C83 52 84 45 88 40 C93 34 101 31 111 30 C117 30 121 32 123 34 C120 20 112 12 100 12 Z"/>
    <path d="M73 44 C66 70 64 104 66 150 L71 150 C70 108 72 76 78 50 Z"/>
    <path d="M79 52 C74 80 73 112 76 168 L81 167 C79 116 80 86 84 58 Z"/>
    <path d="M70 40 C60 62 56 96 58 136 L63 136 C62 100 65 70 74 46 Z"/>
    <path d="M85 60 C82 90 83 120 87 178 L92 177 C88 124 88 94 90 64 Z"/>
    <path class="detail" d="M68 70 l4 2 M67 90 l4 2 M67 110 l4 2 M76 86 l4 2 M76 108 l4 2 M77 130 l4 2 M60 84 l4 2 M60 108 l4 2 M85 100 l4 2 M86 124 l4 2 M87 148 l4 2" fill="none" stroke-width="1"/>`,
  // 덥수룩한 머리 (에서처럼 털 많은 사람, 창 25:25)
  shaggy: `<path d="M100 10 C84 8 70 18 68 36 C66 50 64 64 60 76 C66 74 68 76 70 80 C68 90 66 100 68 108 C72 102 76 100 80 102 C80 94 82 88 86 84 C82 72 82 60 85 50 C89 40 97 33 110 31 C118 30 123 32 126 36 C125 30 124 26 126 22 C121 22 118 20 117 16 C112 12 106 10 100 10 Z"/>`,
};

// ── 수염 ──────────────────────────────────────
const LONG_BEARD = `
  <path d="M97 54 C104 59 112 63 119 65 L123 68 C131 80 136 98 135 116 C134 130 130 142 124 154 L119 144 L114 160 L109 147 L103 158 L100 143 C94 128 91 112 91 96 C90 80 92 64 97 54 Z"/>
  <path class="detail" d="M106 76 Q112 112 108 144 M118 74 Q127 110 121 148" fill="none" stroke-width="0.9"/>`;
const BEARD: Record<Beard, string> = {
  none: '',
  short: BEARD_SHORT,
  long: LONG_BEARD,
  gray: `<g class="gray">${LONG_BEARD}</g>`,
};

// ── 옷 ────────────────────────────────────────
/** 무릎 길이 튜닉 (청년·병사·목자) */
const TUNIC = `
  <path d="M84 98 C89 94 95 92 101 93 C107 94 111 97 114 101 C120 106 124 112 125 120 C126 130 122 140 119 150 C117 160 117 170 119 180 C122 198 126 226 129 254 C130 264 131 272 133 282 Q126 287 118 283 Q110 289 101 284 Q92 290 84 285 Q78 288 74 283 C74 258 76 232 79 210 C80 196 81 186 83 172 C79 152 77 130 79 116 C80 108 81 102 84 98 Z"/>
  <path class="detail" d="M80 180 Q99 186 120 180" fill="none" stroke-width="2.4"/>`;
/** 등 뒤로 늘어진 겉옷 (왕·족장) */
const MANTLE = `
  <path d="M86 92 C76 100 68 118 66 146 C63 186 64 232 68 276 C70 298 68 318 62 338 C70 336 76 338 82 342 C84 300 86 250 88 206 C89 160 90 120 92 98 Z"/>
  <path class="detail" d="M76 120 Q70 200 72 330" fill="none" stroke-width="1"/>`;
/** 제사장 흉패: 가슴의 네모 판 + 줄 */
const BREASTPLATE = `
  <rect class="crown" x="96" y="118" width="20" height="22" rx="2"/>
  <path class="detail" d="M96 125 h20 M96 132 h20 M103 118 v22 M110 118 v22" fill="none" stroke-width="0.7"/>`;

// ── 소품 ──────────────────────────────────────
// ground = 땅에 붙는 것 (자세가 바뀌어도 발과 함께), hand = 앞손에 쥔 것(앞팔 위), back = 등·어깨 (몸과 함께)
interface PropArt { ground?: string; hand?: string; back?: string; /** 팔을 굽혀 앞으로 내밀어 쥐는가 */ bent?: boolean }
const PROP: Record<Prop, PropArt> = {
  // 곧은 지팡이 (끝이 둥근 손잡이)
  staff: { bent: true, ground: `<path d="M141 409 L142 70 L147 70 L147 409 Z"/><circle cx="144.5" cy="68" r="5"/>` },
  // 목자 지팡이: 끝이 갈고리처럼 굽음
  crook: { bent: true, ground: `<path d="M141 409 L142 72 L147 72 L147 409 Z"/><path d="M142 74 C138 52 150 38 164 44 C176 50 174 66 164 70 L162 64 C168 61 168 52 162 49 C154 46 148 56 147 74 Z"/>` },
  // 어깨에 멘 물 항아리 (창 24:15 "물 항아리를 어깨에 메고")
  jar: { back: `<path d="M66 70 C58 74 54 84 56 94 C58 104 66 110 76 110 C86 110 92 102 92 92 C92 82 86 74 78 72 L80 64 L68 64 Z"/><path d="M64 62 h18 v4 h-18 Z"/>` },
  // 손끝에 든 작은 등잔
  lamp: { hand: `<path d="M118 236 C118 232 124 230 132 230 C140 230 144 232 143 236 C141 242 135 244 130 244 C124 244 119 241 118 236 Z"/><ellipse class="glint" cx="141" cy="227" rx="2" ry="3.4"/>` },
  // 등에 진 봇짐 (나그네)
  bundle: { back: `<path d="M60 96 C50 104 48 124 52 142 C56 158 68 166 80 162 C88 158 90 146 88 130 C86 114 80 100 72 94 Z"/><path class="detail" d="M70 96 L92 150" fill="none" stroke-width="2"/>` },
  // 발치의 어린 양
  lamb: { ground: `<path d="M150 380 C150 370 160 364 172 365 C180 362 188 366 190 372 C196 372 198 378 194 382 C192 388 186 390 180 389 L180 404 L176 404 L175 390 L160 390 L159 404 L155 404 L154 389 C150 387 149 384 150 380 Z"/><path d="M186 368 C190 362 196 362 198 366 C196 370 192 372 188 372 Z"/>` },
  // 어깨에 멘 사냥 활 (에서, 창 27:3 "너의 기구 곧 전동과 활")
  bow: { back: `<path d="M62 60 C40 110 42 170 72 220" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M62 60 L72 220" fill="none" stroke="currentColor" stroke-width="1"/>` },
  // 앞손에 늘어뜨려 쥔 칼
  sword: { hand: `<path d="M124 226 L130 226 L132 232 L126 232 Z"/><path d="M118 232 L140 230 L140 234 L118 236 Z"/><path d="M126 236 L131 236 L130 300 L128 306 L126 300 Z"/>` },
  // 긴 창 (땅에 짚음)
  spear: { bent: true, ground: `<path d="M142 409 L143 40 L147 40 L147 409 Z"/><path d="M145 6 L152 30 L145 44 L138 30 Z"/>` },
  // 앞쪽 둥근 방패
  shield: { hand: `<circle cx="118" cy="196" r="34"/><circle class="detail" cx="118" cy="196" r="26" fill="none" stroke-width="1.2"/><circle class="crown" cx="118" cy="196" r="5"/>` },
  // 짧은 홀 (왕)
  scepter: { bent: true, hand: `<path d="M143 166 L146 104 L150 104 L148 166 Z"/><circle class="crown" cx="148" cy="100" r="6"/>` },
  // 두루마리
  scroll: { bent: true, hand: `<rect x="134" y="136" width="12" height="34" rx="5"/><rect x="146" y="136" width="12" height="34" rx="5"/><path d="M140 146 h12 v14 h-12 Z"/>` },
  // 팔에 걸친 바구니
  basket: { hand: `<path d="M112 228 L148 228 L144 256 L116 256 Z"/><path d="M114 228 C116 214 144 214 146 228" fill="none" stroke="currentColor" stroke-width="2.4"/><path class="detail" d="M114 238 h32 M115 247 h30" fill="none" stroke-width="0.8"/>` },
  // 앞팔에 안은 곡식 단
  sheaf: { bent: true, hand: `<path d="M138 170 L134 110 L140 110 L144 170 Z M144 170 L148 112 L154 114 L150 170 Z M132 170 L124 116 L130 114 L138 170 Z"/><ellipse cx="130" cy="108" rx="4" ry="9"/><ellipse cx="140" cy="104" rx="4" ry="10"/><ellipse cx="151" cy="108" rx="4" ry="9"/>` },
  // 등 뒤로 늘어진 겉옷
  cloak: { back: MANTLE },
  // 치켜든 횃불 (기드온의 삼백 명, 삿 7:20)
  torch: { bent: true, hand: `<path d="M142 172 L145 112 L151 112 L148 172 Z"/><path class="glint" d="M148 112 C139 104 141 90 147 80 C148 90 157 94 155 104 C154 109 151 112 148 112 Z"/>` },
  // 손에 늘어뜨려 든 양각 나팔 (삿 3:27, 6:34, 7:18)
  horn: { hand: `<path d="M120 230 C130 228 140 234 146 246 C150 254 156 258 163 256 L161 265 C150 268 141 262 135 252 C131 245 127 241 120 239 Z"/>` },
  // 치켜든 소고 (삿 11:34 — 입다의 딸, 출 15:20 미리암)
  timbrel: { bent: true, hand: `<circle cx="150" cy="140" r="15"/><circle class="detail" cx="150" cy="140" r="10.5" fill="none" stroke-width="1"/><circle class="glint" cx="150" cy="124" r="2"/><circle class="glint" cx="165" cy="140" r="2"/><circle class="glint" cx="150" cy="156" r="2"/><circle class="glint" cx="135" cy="140" r="2"/>` },
};

// ── 몸틀 ──────────────────────────────────────
interface BaseDef {
  legs: string;
  torso: string;
  face: string;
  cloth: string;
  hair: Hair;
  beard: Beard;
  height: number;
  head?: string;
  /** 몸틀에 원래 붙은 것 (왕의 겉옷, 제사장 흉패 …) */
  extra?: string;
  props?: Prop[];
  stocky?: boolean;
}
const BASE: Record<Base, BaseDef> = {
  'old-man': { legs: LEGS_SLIM, torso: TORSO_SLIM, face: FACE_MAN, cloth: ROBE_LONG, hair: 'bald', beard: 'gray', height: 0.98, props: ['staff'] },
  man: { legs: LEGS_SLIM, torso: TORSO_SLIM, face: FACE_MAN, cloth: ROBE_LONG, hair: 'short', beard: 'short', height: 1 },
  youth: { legs: LEGS_SLIM, torso: TORSO_SLIM, face: FACE_MAN, cloth: TUNIC, hair: 'short', beard: 'none', height: 0.97 },
  woman: { legs: LEGS_SLIM, torso: TORSO_WOMAN, face: FACE_WOMAN, cloth: ROBE_WOMAN, hair: 'veil', beard: 'none', height: 0.93, head: 'matrix(0.86 0 0 0.86 15 13)' },
  'old-woman': { legs: LEGS_SLIM, torso: TORSO_WOMAN, face: FACE_WOMAN, cloth: ROBE_WOMAN, hair: 'veil', beard: 'none', height: 0.9, head: 'matrix(0.86 0 0 0.86 15 13)', props: ['staff'] },
  girl: { legs: LEGS_SLIM, torso: TORSO_WOMAN, face: FACE_WOMAN, cloth: ROBE_WOMAN, hair: 'loose', beard: 'none', height: 0.8, head: 'matrix(0.92 0 0 0.92 9 8)' },
  child: { legs: LEGS_SLIM, torso: TORSO_SLIM, face: FACE_MAN, cloth: TUNIC, hair: 'short', beard: 'none', height: 0.6, head: 'matrix(1.02 0 0 1.02 -2 -4)' },
  soldier: { legs: LEGS_STOCKY, torso: TORSO_STOCKY, face: FACE_MAN, cloth: TUNIC, hair: 'helmet', beard: 'short', height: 1.02, head: 'matrix(0.9 0 0 0.9 11 10)', props: ['spear', 'shield'], stocky: true },
  king: { legs: LEGS_SLIM, torso: TORSO_SLIM, face: FACE_MAN, cloth: ROBE_LONG, hair: 'crown', beard: 'short', height: 1.02, extra: MANTLE, props: ['scepter'] },
  priest: { legs: LEGS_SLIM, torso: TORSO_SLIM, face: FACE_MAN, cloth: ROBE_LONG, hair: 'turban', beard: 'long', height: 1, extra: BREASTPLATE },
};

/** 키트로 인물 하나를 만든다 */
export function person(spec: PersonSpec): CharacterDef {
  const b = BASE[spec.base];
  const props = (spec.props ?? b.props ?? []).map((p) => PROP[p]).filter(Boolean);
  const bent = props.some((p) => p.bent);
  const hair = spec.hair ?? b.hair;
  const beard = spec.beard ?? b.beard;
  // 너울·두건 같은 머리는 흔들리고, 투구·왕관·관은 머리에 붙어 있다
  const fixedHead = hair === 'helmet' || hair === 'crown' || hair === 'turban';
  const back = props.map((p) => p.back ?? '').join('');
  return {
    id: spec.id,
    name: spec.name,
    traits: spec.traits ?? `키트: ${spec.base}${spec.props?.length ? ` + ${spec.props.join(', ')}` : ''}`,
    faces: 'right',
    height: spec.height ?? b.height,
    tint: spec.tint ? TINTS[spec.tint] : undefined,
    art: {
      kind: 'svg',
      viewBox: [200, 420],
      pivots: { ...PIVOTS, ...(hair === 'veil' || hair === 'loose' || hair === 'locks' ? { hair: [86, 60] as [number, number] } : {}) },
      markup: figure({
        legs: b.legs,
        torso: b.torso + back + (b.extra ?? ''),
        hair: fixedHead ? '' : HAIR[hair],
        face: b.face,
        beard: BEARD[beard] + (fixedHead ? HAIR[hair] : ''),
        head: b.head,
        cloth: b.cloth,
        frontArm: bent ? ARM_BENT : ARM_DOWN,
        ground: props.map((p) => p.ground ?? '').join(''),
        over: props.map((p) => p.hand ?? '').join(''),
      }),
    },
  };
}
