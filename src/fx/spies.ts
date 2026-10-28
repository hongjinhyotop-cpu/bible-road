// 우리는 메뚜기 같으니 (민 13–14, A급 num-13-14-spies). 같은 종이 오려낸 그림자극 말투.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - spy-hebron  : 헤브론. 언덕 위의 큰 돌 성벽과 성문, 그 앞에 선 아낙 자손 셋(아히만·세새·달매 — 민 13:22).
//                  성문 곁의 보통 사람(작은 점)과 견주어 보인다. fx grasshopper가 이 거인들을 키운다
//  - spy-eshcol  : 에스골 골짜기. 양쪽 비탈에 계단처럼 늘어선 포도원, 석류나무·무화과나무, 마른 시내 (민 13:23)
//  - spy-cluster : 같은 골짜기. 두 사람이 막대기에 꿴 포도송이 하나를 메고 왼쪽에서 걸어 들어온다 — 송이가 사람 허리보다 크다
//  - spy-report  : 바란 광야 가데스의 진. 가운데 두 갈래 말뚝 위에 그 막대기와 포도송이, 석류·무화과 바구니 (민 13:26)
//  - spy-lament  : 같은 진, 밤. 장막마다 등불, 문 앞에 웅크린 사람들, 장막에서 울음의 고리가 밤새 퍼져 오른다 (민 14:1)
// 효과 fx "grasshopper" (playGrasshopper): 헤브론의 거인들이 하늘을 덮을 만큼 커지고, 무대 위 사람들은 작아진다.
//   발치에 메뚜기 몇 마리가 폴짝 (민 13:33 "우리는 스스로 보기에도 메뚜기 같으니"). 약 9초 뒤 제자리로.
// 폰(세로 화면)에서는 x 100~300만 보인다 → 성문(200)·거인(146·200·256)·포도송이(200)는 그 안에.
import { H, W, rng, tent, tree } from './backdrop';

export type SpiesState = 'hebron' | 'eshcol' | 'cluster' | 'report' | 'lament';

const f = (n: number) => n.toFixed(1);

/** 유다 산지: 둥근 등성이 두 겹 */
function hillCountry(seed: number): string {
  const r = rng(seed);
  const ridge = (y: number, amp: number, cls: string) => {
    let d = `M${-W * 2} ${H} L${-W * 2} ${y}`;
    for (let x = -W * 2; x <= W * 3; x += 70) d += ` Q${f(x + 35)} ${f(y - amp * (0.4 + r()))} ${f(x + 70)} ${f(y + (r() - 0.5) * 4)}`;
    return `<path class="${cls}" d="${d} L${W * 3} ${H} Z"/>`;
  };
  return ridge(188, 22, 'bd-far') + ridge(206, 12, 'bd-far spy-far2');
}

/** 큰 돌로 쌓은 성벽과 망대, 가운데 성문 (민 13:28 "성읍은 견고하고 심히 클뿐 아니라") */
function fortress(): string {
  const G = 214;
  const top = G - 62;
  const blocks: string[] = [];
  for (let row = 0; row < 7; row++) {
    const y = G - 8 - row * 8.6;
    for (let x = 96 + (row % 2) * 9; x < 304; x += 18) {
      if (x > 176 && x < 224 && row < 5) continue;
      blocks.push(`M${x} ${y} h16`);
    }
  }
  const towers = [104, 296].map((x) =>
    `<path d="M${x - 14} ${G} L${x - 14} ${top - 18} l4 0 l0 -5 l5 0 l0 5 l6 0 l0 -5 l5 0 l0 5 l4 0 L${x + 14} ${G} Z"/>`,
  ).join('');
  const battle = Array.from({ length: 11 }, (_, i) => `<rect x="${118 + i * 16}" y="${top - 5}" width="7" height="5"/>`).join('');
  return `<g class="spy-fort">
    <g class="bd-mid">
      <path d="M90 ${G} L90 ${top} L310 ${top} L310 ${G} Z"/>
      ${towers}${battle}
      <path d="M178 ${G} L178 ${G - 34} Q200 ${G - 50} 222 ${G - 34} L222 ${G} Z"/>
    </g>
    <path class="spy-gate" d="M183 ${G} L183 ${G - 32} Q200 ${G - 45} 217 ${G - 32} L217 ${G} Z"/>
    <path class="spy-blocks" d="${blocks.join(' ')}"/>
    <g class="bd-window-set">
      <rect class="bd-window" style="--d:0.6s" x="101" y="${top - 6}" width="2" height="3"/>
      <rect class="bd-window" style="--d:2.1s" x="295" y="${top - 8}" width="2" height="3"/>
    </g>
  </g>`;
}

/** 아낙 자손 하나: 키 100 기준으로 그려 h만큼 키운다. 투구와 볏, 넓은 어깨, 수염, 긴 창(또는 둥근 방패) */
function giant(x: number, ground: number, h: number, flip: boolean, spear: boolean, seed: number): string {
  const r = rng(seed);
  const k = h / 100;
  const s = flip ? -1 : 1;
  const legs = `<path d="M-10 0 L-8.5 -44 L-1.5 -44 L-2.5 0 Z"/><path d="M3 0 L1.5 -44 L8.5 -44 L10.5 0 Z"/>
    <path d="M-12 0 L-12 -2.4 L-2 -2.4 L-1 0 Z"/><path d="M2 0 L2.5 -2.4 L13 -2.4 L13 0 Z"/>`;
  const tunic = `<path d="M-16 -40 L-19 -78 C-19 -83 -14 -85 -6 -85 L6 -85 C14 -85 19 -83 19 -78 L16 -40 Z"/>
    <path d="M-17 -42 L-15 -36 L15 -36 L17 -42 Z"/>`;
  const head = `<path d="M-3.5 -84 L-3.5 -88 L3.5 -88 L3.5 -84 Z"/>
    <ellipse cx="1" cy="-93" rx="6.2" ry="7"/>
    <path d="M-2 -90 C-1 -82 4 -78 8 -81 C8 -86 7 -89 6 -91 Z"/>
    <path d="M-6.5 -94 C-6.5 -103 7.5 -103 7.5 -94 L8.5 -92 L-7.5 -92 Z"/>
    <path class="spy-crest" d="M0 -101 C-6 -106 -14 -104 -18 -98 C-12 -101 -6 -100 -1 -97 Z"/>`;
  const arms = spear
    ? `<path d="M15 -82 L23 -58 L25 -60 L19 -82 Z"/><path d="M-15 -82 L-21 -56 L-17 -55 L-12 -78 Z"/>
       <path d="M24 6 L24 -128" fill="none" stroke="currentColor" stroke-width="1.6"/>
       <path d="M21.4 -126 L24 -140 L26.6 -126 Z"/>`
    : `<path d="M15 -82 L21 -56 L17 -55 L12 -78 Z"/><path d="M-15 -82 L-20 -60 L-16 -59 L-12 -78 Z"/>
       <ellipse cx="-20" cy="-60" rx="9" ry="12"/><circle class="spy-boss" cx="-20" cy="-60" r="1.6"/>`;
  return `<g class="spy-giant" style="--d:${f(r() * 4)}s; transform-origin:${f(x)}px ${ground}px">
    <ellipse class="spy-giant__shade" cx="${f(x)}" cy="${ground}" rx="${f(h * 0.3)}" ry="${f(h * 0.025)}"/>
    <g class="bd-near spy-giant__body" transform="translate(${f(x)} ${ground}) scale(${f(s * k)} ${f(k)})">${legs}${tunic}${arms}${head}</g>
  </g>`;
}

/** 성문 곁의 보통 사람 (견줌용 점) */
function smallFolk(xs: number[], ground: number): string {
  return `<g class="bd-mid spy-folk">${xs.map((x) => `<path d="M${x - 1.6} ${ground} L${x - 1.1} ${ground - 7} L${x + 1.1} ${ground - 7} L${x + 1.6} ${ground} Z"/><circle cx="${x}" cy="${ground - 8.4}" r="1.3"/>`).join('')}</g>`;
}

/** 포도나무 줄: 받침 막대, 덩굴 잎, 송이 */
function vineRow(y: number, from: number, to: number, size: number, cls: string, seed: number): string {
  const r = rng(seed);
  const parts: string[] = [];
  for (let x = from; x <= to; x += size * 2.2) {
    parts.push(`<path d="M${f(x)} ${f(y)} L${f(x)} ${f(y - size * 1.5)}" fill="none" stroke="currentColor" stroke-width="${f(size * 0.12)}"/>`);
    for (let k = 0; k < 4; k++) parts.push(`<circle cx="${f(x + (r() - 0.5) * size * 1.8)}" cy="${f(y - size * (1.1 + r() * 0.6))}" r="${f(size * (0.3 + r() * 0.24))}"/>`);
    if (r() < 0.8) parts.push(`<ellipse class="spy-bunch" cx="${f(x + size * 0.4)}" cy="${f(y - size * 0.75)}" rx="${f(size * 0.18)}" ry="${f(size * 0.3)}"/>`);
  }
  return `<g class="${cls}">${parts.join('')}</g>`;
}

/** 계단식 포도원 비탈 (왼쪽 또는 오른쪽에서 골짜기로 내려옴) */
function terraces(side: -1 | 1, seed: number): string {
  const rows: string[] = [];
  for (let i = 0; i < 5; i++) {
    const y = 196 + i * 11;
    const inner = 200 + side * (30 + i * 16);
    const outer = 200 + side * 700;
    const [a, b] = side < 0 ? [outer, inner] : [inner, outer];
    rows.push(`<path class="${i < 2 ? 'bd-far' : 'bd-mid'}" d="M${a} ${y + 12} L${a} ${y} L${b} ${y + 2} L${b} ${y + 12} Z"/>`);
    rows.push(vineRow(y, Math.min(a, b) + 6, Math.max(a, b) - 6, 3.2 + i * 0.8, i < 2 ? 'bd-far' : 'bd-mid', seed + i));
  }
  return rows.join('');
}

/** 석류: 둥근 열매 끝에 작은 왕관 */
function pomegranate(x: number, y: number, r0: number): string {
  return `<g class="spy-pom"><circle cx="${f(x)}" cy="${f(y)}" r="${f(r0)}"/><path d="M${f(x - r0 * 0.4)} ${f(y - r0 * 0.85)} l${f(r0 * 0.2)} ${f(-r0 * 0.5)} l${f(r0 * 0.2)} ${f(r0 * 0.3)} l${f(r0 * 0.2)} ${f(-r0 * 0.3)} l${f(r0 * 0.2)} ${f(r0 * 0.5)} Z"/></g>`;
}

/** 거대한 포도송이: 막대기(pole y)에 매달린 거꾸로 선 삼각형 모양 알갱이 더미 */
function cluster(cx: number, poleY: number, w: number, h: number, seed: number): string {
  const r = rng(seed);
  const berries: string[] = [];
  const rows = 11;
  for (let i = 0; i < rows; i++) {
    const t = i / (rows - 1);
    const y = poleY + 6 + t * h;
    const half = (w / 2) * (1 - t * 0.82) * (i < 2 ? 0.8 + i * 0.1 : 1);
    const n = Math.max(1, Math.round((half * 2) / (w * 0.11)));
    for (let k = 0; k < n; k++) {
      const x = cx - half + (n === 1 ? half : (k / (n - 1)) * half * 2) + (r() - 0.5) * 1.2;
      const rad = w * (0.055 + r() * 0.018);
      berries.push(`<circle class="spy-berry" style="--d:${f(r() * 3)}s" cx="${f(x)}" cy="${f(y + (r() - 0.5) * 1.4)}" r="${f(rad)}"/>`);
    }
  }
  const leaf = `<path class="spy-leaf" d="M${f(cx - 2)} ${f(poleY + 3)} C${f(cx - w * 0.5)} ${f(poleY - 2)} ${f(cx - w * 0.6)} ${f(poleY + 10)} ${f(cx - w * 0.3)} ${f(poleY + 12)} C${f(cx - w * 0.2)} ${f(poleY + 8)} ${f(cx - 4)} ${f(poleY + 7)} ${f(cx - 2)} ${f(poleY + 3)} Z"/>`;
  return `<g class="spy-cluster">
    <path class="spy-stem" d="M${f(cx)} ${f(poleY)} L${f(cx)} ${f(poleY + 7)}"/>
    ${leaf}
    <g class="spy-berries">${berries.join('')}</g>
    <path class="spy-glint" d="M${f(cx - w * 0.28)} ${f(poleY + 10)} L${f(cx - w * 0.06)} ${f(poleY + h * 0.75)}"/>
  </g>`;
}

/** 막대기를 멘 사람 하나 (걷는 다리 둘) */
function carrier(x: number, ground: number, h: number, flip: boolean, cls: string): string {
  const s = flip ? -1 : 1;
  const sh = h * 0.17;
  const neck = ground - h * 0.82;
  const hd = h * 0.08;
  return `<g class="spy-man ${cls}">
    <g class="spy-man__leg spy-man__leg--a" style="transform-origin:${f(x)}px ${f(ground - h * 0.42)}px"><path d="M${f(x - h * 0.045)} ${f(ground - h * 0.44)} L${f(x - h * 0.05)} ${ground} L${f(x + h * 0.03)} ${ground} L${f(x + h * 0.045)} ${f(ground - h * 0.44)} Z"/></g>
    <g class="spy-man__leg spy-man__leg--b" style="transform-origin:${f(x)}px ${f(ground - h * 0.42)}px"><path d="M${f(x - h * 0.045)} ${f(ground - h * 0.44)} L${f(x - h * 0.04)} ${ground} L${f(x + h * 0.05)} ${ground} L${f(x + h * 0.045)} ${f(ground - h * 0.44)} Z"/></g>
    <path d="M${f(x - sh * 0.9)} ${f(ground - h * 0.36)} L${f(x - sh)} ${f(neck + h * 0.05)} Q${f(x)} ${f(neck - h * 0.03)} ${f(x + sh)} ${f(neck + h * 0.05)} L${f(x + sh * 0.9)} ${f(ground - h * 0.36)} Z"/>
    <circle cx="${f(x + s * 0.8)}" cy="${f(neck - hd)}" r="${f(hd)}"/>
    <path d="M${f(x - hd * 1.1)} ${f(neck - hd * 1.1)} Q${f(x)} ${f(neck - hd * 2.4)} ${f(x + hd * 1.2)} ${f(neck - hd * 1.1)} L${f(x - s * hd * 1.6)} ${f(neck + hd * 0.6)} Z"/>
    <path d="M${f(x + s * sh * 0.5)} ${f(neck + h * 0.05)} L${f(x + s * sh * 0.25)} ${f(neck - h * 0.05)} L${f(x + s * sh * 0.85)} ${f(neck - h * 0.06)} L${f(x + s * sh * 1.1)} ${f(neck + h * 0.08)} Z"/>
  </g>`;
}

/** 둘이 막대기에 꿰어 멘 포도송이 (민 13:23) */
function carriers(): string {
  const G = 246;
  const h = 58;
  const poleY = G - h * 0.84;
  return `<g class="spy-carry">
    <g class="spy-carry__walk">
      ${carrier(160, G, h, false, 'bd-near spy-man--back')}
      ${carrier(240, G, h, false, 'bd-near spy-man--front')}
      <path class="spy-pole" d="M148 ${f(poleY + 1)} L252 ${f(poleY - 1)}"/>
      <g class="spy-sway" style="transform-origin:200px ${f(poleY)}px">${cluster(200, poleY, 46, 40, 7321)}</g>
    </g>
  </g>`;
}

/** 두 갈래 말뚝 위에 내려놓은 막대기와 송이, 석류·무화과 바구니 (민 13:26 "그 땅 실과를 보이고") */
function display(): string {
  const G = 244;
  const poleY = 196;
  const stake = (x: number) => `<path d="M${x - 1.4} ${G} L${x - 1} ${poleY + 2} L${x - 4} ${poleY - 4} L${x - 2.6} ${poleY - 4.4} L${x} ${poleY} L${x + 2.6} ${poleY - 4.4} L${x + 4} ${poleY - 4} L${x + 1} ${poleY + 2} L${x + 1.4} ${G} Z"/>`;
  const figs = Array.from({ length: 5 }, (_, i) => `<path class="spy-fig" d="M${238 + i * 4} ${G - 9} q-2.2 -1 -1.6 -3.6 q1.6 -2.8 3.2 0 q0.6 2.6 -1.6 3.6 Z"/>`).join('');
  return `<g class="spy-display">
    <ellipse class="spy-display__glow" cx="200" cy="${poleY + 18}" rx="56" ry="30"/>
    <g class="bd-near">${stake(166)}${stake(234)}</g>
    <path class="spy-pole" d="M150 ${poleY} L250 ${poleY}"/>
    ${cluster(200, poleY, 48, 42, 7322)}
    <g class="bd-near"><path d="M150 ${G} L148 ${G - 8} L170 ${G - 8} L168 ${G} Z"/><path d="M232 ${G} L230 ${G - 8} L260 ${G - 8} L258 ${G} Z"/></g>
    ${pomegranate(153, G - 10, 2.6)}${pomegranate(159, G - 11, 2.8)}${pomegranate(165, G - 10, 2.5)}${pomegranate(156, G - 14, 2.4)}
    ${figs}
  </g>`;
}

/** 가데스의 진: 늘어선 장막, 뒤로 낮은 메사 */
function kadeshCamp(night: boolean): string {
  const r = rng(night ? 7411 : 7410);
  const rows: string[] = [];
  const row = (y: number, s: number, step: number, cls: string) => {
    for (let x = -360; x < 760; x += step * (0.8 + r() * 0.4)) {
      if (x > 168 && x < 232 && s > 0.6) continue;
      rows.push(`<g class="${cls}">${tent(x, y, s).replace('bd-near bd-tent', `bd-tent ${night ? 'spy-ltent' : ''}`)}</g>`);
    }
  };
  row(204, 0.32, 22, 'bd-far');
  row(214, 0.48, 30, 'bd-mid');
  row(230, 0.78, 54, 'bd-mid');
  return `
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 192 L-120 192 L-100 176 L-30 174 L-12 192 L250 194 L268 180 L330 178 L344 194 L${W * 3} 194 L${W * 3} ${H} Z"/>
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 202 C-200 198 100 204 260 200 C500 196 800 202 ${W * 3} 200 L${W * 3} ${H} Z"/>
    ${rows.join('')}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 246 C-200 242 0 250 200 246 C400 242 700 250 ${W * 3} 246 L${W * 3} ${H} Z"/>`;
}

/** 울음의 고리: 장막에서 밤새 퍼져 오른다 (민 14:1) */
function wails(): string {
  const r = rng(7431);
  const spots: [number, number][] = [[64, 222], [118, 208], [150, 226], [246, 224], [286, 208], [338, 222], [10, 210], [392, 210], [200, 212]];
  return `<g class="spy-wails">${spots.map(([x, y], i) =>
    `<circle class="spy-wail" style="--d:${f(i * 0.9 + r() * 1.5)}s" cx="${x}" cy="${y - 10}" r="5"/><circle class="spy-wail" style="--d:${f(i * 0.9 + 3.4 + r())}s" cx="${x}" cy="${y - 10}" r="5"/>`,
  ).join('')}</g>`;
}

/** 장막 문 앞에 웅크린 사람들 (머리를 무릎에 묻음) */
function hunched(spots: [number, number, number][]): string {
  return `<g class="bd-near spy-hunch">${spots.map(([x, y, s]) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-6 0 C-7 -6 -4 -11 1 -11 C5 -11 7 -7 6 0 Z"/><circle cx="3.4" cy="-10.6" r="2.4"/></g>`,
  ).join('')}</g>`;
}

export function spiesArt(state: SpiesState): string {
  if (state === 'hebron') {
    return `<g class="spy spy--hebron">
      ${hillCountry(7301)}
      <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 214 C-200 210 60 216 200 212 C340 208 600 216 ${W * 3} 212 L${W * 3} ${H} Z"/>
      ${fortress()}
      ${smallFolk([170, 230, 236, 120], 214)}
      <g class="spy-giants">
        ${giant(200, 216, 128, false, false, 7304)}
        ${giant(140, 224, 150, false, true, 7302)}
        ${giant(262, 224, 144, true, true, 7303)}
      </g>
      <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 228 C-200 224 0 232 200 228 C400 224 700 232 ${W * 3} 228 L${W * 3} ${H} Z"/>
      ${tree(70, 250, 46, 'bd-near', 7305, { sway: true })}${tree(338, 250, 50, 'bd-near', 7306, { sway: true })}
      <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 248 C-200 244 0 252 200 248 C400 244 700 252 ${W * 3} 248 L${W * 3} ${H} Z"/>
    </g>`;
  }
  if (state === 'eshcol' || state === 'cluster') {
    return `<g class="spy spy--${state}">
      ${hillCountry(7311)}
      ${terraces(-1, 7312)}${terraces(1, 7317)}
      <path class="bd-mid spy-wadi" d="M${-W * 2} ${H} L${-W * 2} 236 C-100 232 120 240 200 238 C300 236 500 242 ${W * 3} 236 L${W * 3} ${H} Z"/>
      <g class="bd-mid">${tree(106, 238, 40, 'bd-mid', 7313, { fruit: 6, sway: true })}${tree(300, 238, 36, 'bd-mid', 7314, { fruit: 5, sway: true })}</g>
      ${pomegranate(100, 214, 2.2)}${pomegranate(112, 220, 2)}${pomegranate(296, 216, 2.1)}
      ${state === 'cluster' ? carriers() : ''}
      <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 250 C-200 246 0 254 200 250 C400 246 700 254 ${W * 3} 250 L${W * 3} ${H} Z"/>
      ${vineRow(256, -200, 70, 7, 'bd-near', 7315)}${vineRow(256, 330, 600, 7, 'bd-near', 7316)}
    </g>`;
  }
  if (state === 'report') {
    return `<g class="spy spy--report">${kadeshCamp(false)}${display()}</g>`;
  }
  return `<g class="spy spy--lament">${kadeshCamp(true)}${wails()}${hunched([[60, 240, 1], [96, 238, 0.9], [306, 240, 1], [344, 238, 0.95], [130, 228, 0.6], [270, 228, 0.62]])}</g>`;
}

// ── 효과 grasshopper: "우리는 스스로 보기에도 메뚜기 같으니" (민 13:33) ─────────────
/** scene = .scene. 배경의 거인(spy-hebron)이 커지고 무대 위 사람들은 작아진다. 발치에 메뚜기 몇 마리 (약 9초) */
export function playGrasshopper(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-hopper';
  const r = rng(Date.now() % 100000);
  const hoppers = rm ? '' : Array.from({ length: 4 }, (_, i) =>
    `<i style="--x:${f(8 + i * 24 + r() * 10)}%; --d:${f(1.4 + i * 0.7 + r() * 0.5)}s; --dir:${r() < 0.5 ? -1 : 1}"><svg viewBox="0 0 24 12" aria-hidden="true"><path d="M2 8 C5 4 13 3.5 19 5 L22 6 L19 7.5 C14 9 7 9.5 2 8 Z M8 7 L4 11.5 M12 6.5 L15 2 L19 11.5" /></svg></i>`,
  ).join('');
  layer.innerHTML = `<s></s>${hoppers}`;
  scene.append(layer);
  scene.classList.add('is-grasshopper');
  const life = rm ? 5000 : 9400;
  setTimeout(() => {
    scene.classList.remove('is-grasshopper');
    layer.classList.add('is-out');
  }, life - 1800);
  setTimeout(() => layer.remove(), life);
}
