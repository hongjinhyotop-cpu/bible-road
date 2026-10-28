// 반석을 두 번 치다 (민 20, A급 num-20-rock). 같은 종이 오려낸 그림자극 말투.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - mr-kadesh  : 신 광야 가데스의 진. 멀리 바위산과 장막 줄, 가운데 앞 갓 쌓은 돌무덤 하나 (민 20:1 미리암)
//  - mr-rock    : 므리바의 반석. 가운데 큰 바위(세로로 갈라진 틈), 마른 땅의 갈라진 금 (민 20:8-10)
//  - mr-water   : 같은 반석, 틈에서 물이 여러 줄기로 쏟아져 웅덩이가 되고 앞으로 시내가 흘러나온다 (민 20:11)
//  - mr-edom    : 에돔 땅 어귀. 붉은 사암 절벽 사이로 난 왕의 대로를 칼 든 무리가 가로막았다 (민 20:17-20)
//  - mr-hor     : 진에서 올려다본 호르산(봉우리 둘). 산길 위에 작은 사람 셋 (민 20:27 "회중의 목전에서")
//  - mr-hor-mourn : 같은 산, 아무도 없는 산길, 꼭대기에 머문 희미한 빛 (민 20:29 삼십 일 애곡)
//  - mr-summit  : 호르산 꼭대기. 넓은 하늘, 발아래 멀리 아라바 골짜기의 안개, 위에서 내려오는 빛 한 줄기 (민 20:28)
// 효과 fx "strike-twice" (playStrikeTwice): 반석의 틈(.mr-cleft)에 두 번 내리치는 빛과 금, 그리고 물보라 (민 20:11)
// 효과 fx "mantle" (playMantle): 금빛 티끌이 아론에게서 엘르아살에게로 둥글게 옮겨 간다 (민 20:28, 옷이 옮겨 가는 순간)
// 하나님은 그리지 않는다 — 빛으로만 (CLAUDE.md 8-1).
// 폰(세로 화면)에서는 x 100~300만 보인다 → 무덤(200)·반석(205)·길목(204)·봉우리(176~224)는 그 안에.
import { H, W, rng, tent, thorns } from './backdrop';

export type MeribahState = 'kadesh' | 'rock' | 'water' | 'edom' | 'hor' | 'hor-mourn' | 'summit';

const f = (n: number) => n.toFixed(1);
const CX = 205;

/** 꼭대기가 평평한 바위산 */
function mesa(x: number, ground: number, w: number, h: number, cls: string): string {
  return `<path class="${cls}" d="M${x - w} ${ground} L${x - w * 0.7} ${ground - h * 0.6} L${x - w * 0.55} ${ground - h} L${x + w * 0.5} ${ground - h} L${x + w * 0.62} ${ground - h * 0.55} L${x + w} ${ground} Z"/>`;
}

/** 넓게 깔리는 땅 한 겹 */
function band(y: number, amp: number, cls: string, seed: number): string {
  const r = rng(seed);
  let d = `M${-W * 2} ${H} L${-W * 2} ${y}`;
  for (let x = -W * 2; x <= W * 3; x += 100) d += ` Q${x + 50} ${f(y + (r() - 0.5) * amp * 2)} ${x + 100} ${f(y + (r() - 0.5) * amp)}`;
  return `<path class="${cls}" d="${d} L${W * 3} ${H} Z"/>`;
}

/** 멀리 늘어선 장막 줄 */
function tents(y: number, s: number, xs: number[]): string {
  return xs.map((x) => tent(x, y, s)).join('');
}

/** 돌 몇 개 */
function rocks(xs: number[], ground: number, cls: string, seed: number): string {
  const r = rng(seed);
  return `<g class="${cls}">${xs.map((x) => `<ellipse cx="${f(x)}" cy="${f(ground - 1)}" rx="${f(3 + r() * 5)}" ry="${f(1.6 + r() * 2)}"/>`).join('')}</g>`;
}

/** 가데스: 진 + 갓 쌓은 돌무덤 (민 20:1) */
function kadesh(): string {
  const r = rng(2001);
  // 돌무덤: 아래 큰 돌에서 위로 작아지게 쌓은 둥근 더미
  const cairn: string[] = [];
  const rows: [number, number, number][] = [[7, 246, 7], [5, 240.5, 6], [4, 235.5, 5], [2, 231.5, 4.2], [1, 228, 3.6]];
  for (const [n, y, rx] of rows) {
    const w = (n - 1) * rx * 1.5;
    for (let i = 0; i < n; i++) {
      const x = 200 - w / 2 + i * rx * 1.5 + (r() - 0.5) * 1.6;
      cairn.push(`<ellipse cx="${f(x)}" cy="${f(y + (r() - 0.5) * 0.8)}" rx="${f(rx * (0.85 + r() * 0.3))}" ry="${f(rx * 0.62)}"/>`);
    }
  }
  return `<g class="mr mr--kadesh">
    ${mesa(-160, 206, 110, 46, 'bd-far')}${mesa(130, 206, 52, 30, 'bd-far')}${mesa(300, 207, 64, 40, 'bd-far')}${mesa(620, 206, 100, 36, 'bd-far')}
    ${band(206, 2, 'bd-far', 2002)}
    <g class="mr-camp">${tents(214, 0.32, [-260, -190, -120, -50, 40, 92, 312, 360, 430, 500, 570, 640])}${tents(222, 0.46, [-220, -110, 10, 120, 290, 400, 520, 620])}</g>
    ${band(228, 3, 'bd-mid', 2003)}
    ${thorns(96, 236, 14, 'bd-mid', 2004)}${thorns(318, 238, 16, 'bd-mid', 2005)}
    <ellipse class="mr-grave-glow" cx="200" cy="238" rx="34" ry="14"/>
    <ellipse class="mr-earth" cx="200" cy="248" rx="22" ry="3.2"/>
    <g class="bd-near mr-cairn">${cairn.join('')}</g>
    ${band(250, 2, 'bd-near', 2006)}
    ${rocks([120, 290, 40, 380, -120, 520], 256, 'bd-near', 2007)}
  </g>`;
}

/** 므리바의 반석: 가운데 큰 바위와 세로 틈. wet면 물이 쏟아진다 */
function rock(wet: boolean): string {
  const r = rng(2011);
  const cracks = wet ? '' : `<path class="mr-crack" d="${Array.from({ length: 9 }, () => {
    const x = -40 + r() * 480;
    const y = 246 + r() * 12;
    return `M${f(x)} ${f(y)} l${f(6 + r() * 8)} ${f((r() - 0.5) * 3)} l${f(4 + r() * 6)} ${f((r() - 0.5) * 3)} M${f(x + 7)} ${f(y)} l${f((r() - 0.5) * 4)} ${f(2 + r() * 2)}`;
  }).join(' ')}"/>`;
  // 바위 몸: 울퉁불퉁한 어깨, 가운데로 갈라진 틈
  const body = `M150 236 C146 220 150 204 156 192 C158 178 166 166 176 158 C184 150 194 146 202 147 C210 145 222 148 230 156 C240 164 248 178 252 192 C258 206 262 222 260 236 Z`;
  const cleft = `M203 150 C201 162 207 172 204 184 C201 196 208 206 205 218 C203 226 206 232 205 236 L209 236 C210 230 207 224 209 216 C212 204 205 194 208 182 C211 170 205 160 207 150 Z`;
  const strata = `M160 196 Q182 188 200 192 M212 190 Q234 184 250 196 M156 214 Q178 208 200 212 M212 210 Q236 206 256 216 M170 172 Q186 164 199 168 M214 166 Q228 162 240 172`;
  const water = wet ? (() => {
    const falls = [[205, 168, -4], [206, 186, 3], [204, 204, -2], [207, 220, 4]].map(([x, y, dx], i) =>
      `<path class="mr-fall" style="--d:${f(i * 0.17)}s" d="M${x} ${y} C${x + dx} ${y + 10} ${x + dx * 2.6} ${f((y + 236) / 2)} ${x + dx * 3} 238"/>`).join('');
    const spray = Array.from({ length: 10 }, (_, i) => `<circle class="mr-spray" style="--d:${f(i * 0.23)}s; --dx:${f((r() - 0.5) * 30)}px" cx="${f(CX + (r() - 0.5) * 18)}" cy="238" r="${f(1 + r() * 1.6)}"/>`).join('');
    return `<g class="mr-water">
      <path class="mr-stream" d="M178 238 C150 244 120 248 96 256 C80 261 70 266 60 270 L130 270 C150 262 176 252 200 244 C224 252 250 262 270 270 L350 270 C330 262 300 252 262 244 C246 240 236 238 232 238 Z"/>
      <ellipse class="mr-pool" cx="${CX}" cy="240" rx="36" ry="5"/>
      <path class="mr-glint" d="M172 240 h14 M222 241 h12 M120 252 h18 M276 254 h16 M92 262 h20 M300 263 h18"/>
      ${falls}
      ${spray}
    </g>`;
  })() : '';
  return `<g class="mr mr--${wet ? 'water' : 'rock'}">
    ${mesa(-140, 208, 120, 40, 'bd-far')}${mesa(96, 208, 40, 26, 'bd-far')}${mesa(330, 209, 56, 34, 'bd-far')}${mesa(640, 208, 110, 40, 'bd-far')}
    ${band(208, 2, 'bd-far', 2012)}
    <g class="mr-camp">${tents(216, 0.3, [-240, -160, -80, 20, 380, 450, 530, 610])}</g>
    ${band(226, 3, 'bd-mid', 2013)}
    <path class="bd-mid" d="M120 238 C126 226 136 222 146 228 L150 238 Z M256 238 L262 226 C272 220 284 226 290 238 Z"/>
    <path class="bd-mid mr-rock" d="${body}"/>
    <path class="mr-strata" d="${strata}"/>
    <path class="mr-cleft-shade" d="${cleft}"/>
    <circle class="mr-cleft" cx="${CX + 1}" cy="196" r="1"/>
    ${band(240, 2, 'bd-near', 2014)}
    ${cracks}
    ${water}
    ${rocks([110, 300, 30, 380, -100, 520], 256, 'bd-near', 2015)}
    ${thorns(84, 258, 16, 'bd-near', 2016)}${thorns(330, 258, 18, 'bd-near', 2017)}
  </g>`;
}

/** 에돔 어귀: 붉은 절벽 사이 왕의 대로, 길을 막아선 무리 (민 20:20) */
function edom(): string {
  const r = rng(2021);
  const host = Array.from({ length: 15 }, (_, i) => {
    const x = 176 + i * 4 + (r() - 0.5) * 1.2;
    const y = 207 + (i % 2) * 0.8;
    const h = 7 + r() * 1.4;
    return `<g><circle cx="${f(x)}" cy="${f(y - h - 1.4)}" r="1.4"/><rect x="${f(x - 1.3)}" y="${f(y - h)}" width="2.6" height="${f(h)}"/>
      <path d="M${f(x + 1.6)} ${f(y - 1)} L${f(x + 1.6 + (r() - 0.5) * 1.2)} ${f(y - h - 9)}" stroke="currentColor" stroke-width="0.6"/>
      ${i % 3 === 0 ? `<ellipse cx="${f(x - 1.4)}" cy="${f(y - h * 0.55)}" rx="1.6" ry="2.6"/>` : ''}</g>`;
  }).join('');
  const tips = Array.from({ length: 15 }, (_, i) => `<circle class="mr-tip" style="--d:${f(r() * 4)}s" cx="${f(177.6 + i * 4)}" cy="${f(198 - 8 - r() * 1.4)}" r="0.7"/>`).join('');
  return `<g class="mr mr--edom">
    ${band(208, 1, 'bd-far', 2022)}
    <path class="bd-far" d="M150 208 L160 180 L172 174 L186 188 L198 196 L212 194 L226 184 L240 178 L254 208 Z"/>
    <path class="bd-mid mr-sandstone" d="M${-W * 2} ${H} L${-W * 2} 110 L-200 100 L-60 120 L20 92 L80 108 L120 86 L148 112 L160 150 L170 196 L178 214 L186 ${H} Z"/>
    <path class="bd-mid mr-sandstone" d="M${W * 3} ${H} L${W * 3} 104 L560 96 L460 118 L380 90 L320 110 L282 84 L256 116 L246 152 L238 196 L230 214 L222 ${H} Z"/>
    <path class="mr-strata" d="M-40 140 Q60 132 150 146 M-80 176 Q60 168 162 182 M260 146 Q360 134 480 142 M246 182 Q360 170 520 178 M100 118 Q130 112 146 122 M270 120 Q296 112 320 122"/>
    <path class="mr-road" d="M196 ${H} C198 246 200 232 202 222 C203 216 204 212 204 208 L206 208 C207 214 210 224 216 236 C222 248 226 ${H} 230 ${H} Z"/>
    <g class="bd-mid mr-host">${host}</g>
    ${tips}
    <path class="bd-mid" d="M196 168 L196 196 M196 168 L206 171 L196 175" fill="none" stroke="currentColor" stroke-width="0.8"/>
    ${band(252, 2, 'bd-near', 2023)}
    ${rocks([120, 290, 40, 360], 256, 'bd-near', 2024)}
  </g>`;
}

/** 호르산을 올려다봄. climb면 산길 위에 작은 사람 셋 (민 20:27) */
function hor(climb: boolean): string {
  const mount = `M40 214 C80 196 110 170 140 136 C152 120 162 100 174 90 C180 86 184 90 188 96 C192 102 196 106 200 104 C206 100 212 88 220 84 C226 82 232 90 238 104 C252 132 280 168 316 192 C336 204 360 212 380 214 Z`;
  const path = `M150 212 L170 200 L156 188 L176 174 L164 160 L184 146 L176 132 L192 120 L190 110 L198 104`;
  const climbers = climb ? [[178, 134], [182, 131.6], [186, 129.4]].map(([x, y], i) =>
    `<g class="mr-climber" style="--d:${i * 0.4}s"><circle cx="${x}" cy="${f(y - 4.4)}" r="1"/><path d="M${x - 1} ${y} L${x - 0.8} ${f(y - 3.4)} L${x + 0.8} ${f(y - 3.4)} L${x + 1} ${y} Z"/></g>`).join('') : '';
  return `<g class="mr mr--${climb ? 'hor' : 'hor-mourn'}">
    ${mesa(-200, 214, 140, 40, 'bd-far')}${mesa(600, 214, 130, 46, 'bd-far')}
    <circle class="mr-peakglow" cx="200" cy="96" r="${climb ? 20 : 34}"/>
    <path class="bd-far mr-hormount" d="${mount}"/>
    <path class="mr-strata" d="M120 168 Q150 160 168 150 M232 120 Q260 140 290 170 M100 190 Q140 182 160 176 M250 170 Q290 188 330 200"/>
    <path class="mr-trail" d="${path}"/>
    <g class="bd-mid">${climbers}</g>
    ${band(216, 2, 'bd-mid', 2031)}
    <g class="mr-camp">${tents(222, 0.42, [-260, -180, -100, -20, 60, 340, 420, 500, 580])}${tents(236, 0.7, [-220, -80, 40, 360, 470, 600])}</g>
    ${band(244, 2, 'bd-near', 2032)}
    ${tent(80, 262, 1.2)}${tent(330, 262, 1.25)}
    ${rocks([140, 270, 200], 258, 'bd-near', 2033)}
  </g>`;
}

/** 호르산 꼭대기: 넓은 하늘, 발아래 먼 골짜기, 위에서 내려오는 빛 (민 20:28) */
function summit(): string {
  const r = rng(2041);
  const ridge = Array.from({ length: 4 }, (_, i) => band(196 + i * 6, 3 + i, 'bd-far mr-haze', 2042 + i)).join('');
  const boulders = [[96, 238, 18, 10], [126, 240, 10, 6], [300, 238, 20, 12], [334, 240, 12, 7], [-60, 236, 40, 18], [470, 236, 44, 20]]
    .map(([x, y, w, h]) => `<path d="M${x - w} ${y} C${x - w} ${y - h * 0.8} ${x - w * 0.3} ${y - h} ${x} ${y - h} C${x + w * 0.5} ${y - h} ${x + w} ${y - h * 0.6} ${x + w} ${y} Z"/>`).join('');
  const motes = Array.from({ length: 14 }, () => `<circle class="mr-mote" style="--d:${f(r() * 8)}s; --dx:${f((r() - 0.5) * 20)}px" cx="${f(160 + r() * 90)}" cy="${f(60 + r() * 160)}" r="${f(0.6 + r() * 0.9)}"/>`).join('');
  return `<g class="mr mr--summit">
    ${ridge}
    <polygon class="mr-shaft" points="186,-10 226,-10 270,244 140,244"/>
    ${motes}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 232 C-300 226 -100 236 60 230 C120 226 160 236 205 234 C250 232 300 226 360 232 C500 238 800 228 ${W * 3} 232 L${W * 3} ${H} Z"/>
    <g class="bd-near">${boulders}</g>
    <ellipse class="mr-lit" cx="205" cy="242" rx="58" ry="7"/>
    ${band(250, 2, 'bd-near', 2047)}
  </g>`;
}

export function meribahArt(state: MeribahState): string {
  switch (state) {
    case 'kadesh': return kadesh();
    case 'rock': return rock(false);
    case 'water': return rock(true);
    case 'edom': return edom();
    case 'hor': return hor(true);
    case 'hor-mourn': return hor(false);
    case 'summit': return summit();
  }
}

// ── 효과 strike-twice: 그 손을 들어 그 지팡이로 반석을 두 번 치매 (민 20:11) ──────────
/** scene = .scene. 반석의 틈에 두 번 내리치는 빛(두 번째가 더 크다), 금이 번지고, 물보라가 터진다 (약 6.5초) */
export function playStrikeTwice(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-strike';
  const b = scene.getBoundingClientRect();
  const mark = scene.querySelector<SVGElement>('.mr-cleft');
  if (mark) {
    const a = mark.getBoundingClientRect();
    if (a.width || a.height) {
      layer.style.setProperty('--x', `${a.left - b.left + a.width / 2}px`);
      layer.style.setProperty('--y', `${a.top - b.top + a.height / 2}px`);
    }
  }
  const r = rng(Date.now() % 100000);
  // 금: 친 자리에서 사방으로 번지는 가는 선 (두 번째 칠 때 더 길게)
  const cracks = (n: number, k: number, delay: number) => Array.from({ length: n }, (_, i) =>
    `<i style="--a:${f(i * (360 / n) + (r() - 0.5) * 20)}deg; --l:${f((14 + r() * 18) * k)}px; --d:${delay}s"></i>`).join('');
  const drops = rm ? '' : Array.from({ length: 34 }, () => {
    const a = (-150 + r() * 120) * (Math.PI / 180); // 위쪽 부채꼴
    const v = 40 + r() * 90;
    return `<u style="--dx:${f(Math.cos(a) * v)}px; --dy:${f(Math.sin(a) * v)}px; --d:${f(2.55 + r() * 0.5)}s; --s:${f(0.6 + r() * 1.2)}"></u>`;
  }).join('');
  layer.innerHTML = `<b style="--d:0.15s"></b><b class="is-hard" style="--d:1.45s"></b>
    <s style="--d:0.15s"></s><s class="is-hard" style="--d:1.45s"></s>
    ${rm ? '' : cracks(6, 1, 0.2) + cracks(9, 1.7, 1.5)}
    <em></em>${drops}`;
  scene.append(layer);
  if (!rm) {
    for (const [t, cls] of [[150, 'is-strike'], [1450, 'is-strike-hard']] as const) {
      setTimeout(() => {
        scene.classList.add(cls);
        setTimeout(() => scene.classList.remove(cls), cls === 'is-strike' ? 260 : 520);
      }, t);
    }
  }
  const life = rm ? 2600 : 6800;
  setTimeout(() => layer.classList.add('is-out'), life - 1400);
  setTimeout(() => layer.remove(), life);
}

// ── 효과 mantle: 아론의 옷을 벗겨 그 아들 엘르아살에게 입히매 (민 20:28) ──────────
/** 금빛 티끌이 아론의 어깨에서 떠올라 둥글게 넘어가 엘르아살에게 내려앉는다 (약 6초). 옷 갈아입기(outfit)와 같이 쓴다 */
export function playMantle(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-mantle';
  const b = scene.getBoundingClientRect();
  const at = (id: string, fx: number) => {
    const el = scene.querySelector<HTMLElement>(`.actor[data-id="${id}"] .actor__art`) ?? scene.querySelector<HTMLElement>(`.actor[data-id="${id}"]`);
    const a = el?.getBoundingClientRect();
    if (a && (a.width || a.height)) return [a.left - b.left + a.width / 2, a.top - b.top + a.height * 0.32];
    return [b.width * fx, b.height * 0.5];
  };
  const [x1, y1] = at('aaron', 0.35);
  const [x2, y2] = at('eleazar', 0.65);
  layer.style.cssText = `--x1:${f(x1)}px; --y1:${f(y1)}px; --x2:${f(x2)}px; --y2:${f(y2)}px; --mx:${f((x1 + x2) / 2)}px; --my:${f(Math.min(y1, y2) - 70)}px`;
  const r = rng(Date.now() % 100000);
  const motes = Array.from({ length: rm ? 0 : 28 }, () =>
    `<i style="--d:${f(r() * 1.8)}s; --o:${f((r() - 0.5) * 26)}px; --s:${f(0.6 + r() * 1.3)}"></i>`).join('');
  layer.innerHTML = `<b class="is-from"></b><b class="is-to"></b>${motes}`;
  scene.append(layer);
  const life = rm ? 2400 : 6400;
  setTimeout(() => layer.classList.add('is-out'), life - 1400);
  setTimeout(() => layer.remove(), life);
}
