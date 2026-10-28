// 엘르아살 — 아론의 셋째 아들, 제사장. 아론 뒤를 이어 대제사장이 됨 (출 6:23, 레 10, 민 20:28).
// A급 num-20-rock(민 20 「반석을 두 번 치다」)에서 키트 임시 그림을 손그림으로 다시 그림 (틀은 _sons.ts — 나답·아비후와 형제 체형).
// 특징: 짧고 고른 턱수염, 조금 높게 감고 뒤로 끈이 늘어진 관. 세마포 반포 속옷 + 앞으로 늘어진 띠.
// 옷 두 벌 (장면 beat의 "outfit": {"eleazar": "high"}):
//  - plain : 제사장 차림 (기본). high에서 돌아올 때도 쓴다.
//  - high  : 호르산에서 아버지에게서 받은 대제사장 옷 (민 20:26-28). 아론의 priest 옷과 같은 것 —
//            금패 단 관, 열두 보석 흉패, 금실 띠 에봇, 청색 겉옷 아랫단의 방울과 석류. 색칠은 styles/meribah.css.
import type { SvgArt } from './index';
import { ARM_BENT, ARM_DOWN, ROBE_LONG } from './_parts.ts';
import { priestSon } from './_sons.ts';

// 대제사장의 관: 이마에 금패 (출 28:36-38 "여호와께 성결") — 아론 관과 같은 모양
const MITRE = `
  <path d="M80 44 C78 54 76 66 76 80 C76 92 79 102 84 110 C85 98 86 88 89 80 C85 70 84 58 86 48 Z"/>
  <path d="M77 40 C70 12 84 -4 102 -4 C121 -4 131 10 128 35 C112 30 92 30 77 40 Z"/>
  <path class="detail" d="M80 30 Q102 19 126 27 M79 22 Q102 11 127 19 M83 12 Q103 3 124 10" fill="none" stroke-width="1"/>
  <path class="crown" d="M106 22 L124 19.5 L125.4 28.5 L107.2 31 Z"/>
  <path class="detail" d="M110 25.5 h10" fill="none" stroke-width="0.7"/>`;

// 원래 관 (plain으로 돌아올 때) — _sons.ts의 tall 관과 같은 모양
const CAP = `
  <path d="M79 40 C72 16 86 1 103 1 C120 1 130 14 126 36 C112 31 92 31 79 40 Z"/>
  <path class="detail" d="M81 32 Q102 22 125 29 M82 23 Q102 13 124 20 M88 13 Q103 6 118 11" fill="none" stroke-width="1"/>
  <path d="M78 34 C70 40 66 52 66 66 C68 62 71 60 74 60 C74 52 76 45 80 40 Z"/>`;

// 대제사장 옷 (출 28): 청색 겉옷 + 아랫단 방울·석류, 에봇과 금실 띠, 어깨의 호마노
const HIGH = `
  <g class="mr-robe">${ROBE_LONG}</g>
  <g class="crown">${Array.from({ length: 7 }, (_, i) => {
    const x = 82 + i * 9.6;
    const y = 386 + (i % 2) * 2;
    return i % 2 ? `<circle cx="${x}" cy="${y}" r="2.2"/>` : `<path d="M${x - 2} ${y + 2} Q${x} ${y - 4} ${x + 2} ${y + 2} Z"/>`;
  }).join('')}</g>
  <path d="M85 99 C95 94 110 96 118 103 C124 110 125 124 122 142 C120 160 120 176 121 198 L84 200 C82 178 82 152 82 130 C81 116 82 106 85 99 Z"/>
  <path class="crown" d="M83 180 Q102 187 121 180 L121 187 Q102 194 83 187 Z"/>
  <path class="crown" d="M117 186 L121 214 L117 214 L114 188 Z"/>
  <circle class="glint" cx="102" cy="101" r="2.6"/>`;

// 흉패: 금 판에 열두 보석 (출 28:15-21)
const PLATE = `
  <path class="crown" d="M110 112 L128 110 L129 136 L111 138 Z"/>
  <g class="glint">${Array.from({ length: 12 }, (_, i) => {
    const c = i % 3;
    const r = Math.floor(i / 3);
    return `<rect x="${(112.6 + c * 5.6).toFixed(1)}" y="${(114 + r * 5.8 - c * 0.2).toFixed(1)}" width="3.2" height="3.6" rx="0.8"/>`;
  }).join('')}</g>`;

const eleazar = priestSon({
  id: 'eleazar',
  name: '엘르아살',
  height: 1.0,
  tint: '#cfc6ae',
  beard: 'full',
  cap: 'tall',
  traits: '옆모습, 짧고 고른 턱수염, 조금 높게 감고 뒤로 끈이 늘어진 제사장 관, 세마포 반포 속옷과 앞으로 늘어진 띠. 옷 high: 아론에게서 받은 대제사장 옷(금패 관, 열두 보석 흉패, 에봇, 청색 겉옷의 방울과 석류)',
});

// 틀(_sons.ts)의 cloth 그림 = 반포 속옷. plain으로 돌아올 때 다시 입힌다.
const art = eleazar.art as SvgArt;
const tunic = /<g data-part="cloth" class="tone2">([\s\S]*?)<\/g>\s*<g data-part="head">/.exec(art.markup)?.[1];
art.outfits = {
  plain: { markup: tunic, parts: { hair: CAP, armR: ARM_DOWN } },
  high: { markup: HIGH, parts: { hair: MITRE, armR: ARM_BENT + PLATE } },
};

export default eleazar;
