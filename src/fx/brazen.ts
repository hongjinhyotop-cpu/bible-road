// 놋뱀 (민 21, A급 num-21-serpent 「놋뱀」). 같은 종이 오려낸 그림자극 말투.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - bz-road     : 에돔 땅을 두르는 길. 뒤로 깎아지른 붉은 사암 산줄기(에돔), 지평선까지 굽어 가는 하얀 길,
//                  그 길 위 멀리 개미처럼 늘어선 행렬, 흰 해와 아지랑이 (민 21:4 "길로 인하여 마음이 상하니라")
//  - bz-camp     : 광야의 진. 가까이 낮은 장막들, 멀리 작은 구름 기둥, 바람 결이 새겨진 모래 땅과 마른 덤불 (민 21:5-7)
//  - bz-pole     : 같은 진 한가운데 높은 장대, 장대 위를 감고 올라 고개를 든 놋뱀. 받침 돌무더기 (민 21:8-9)
//  - bz-pole-lit : 같은 장대, 놋뱀이 금빛으로 빛나고 빛살이 천천히 돈다 (민 21:9 "쳐다본즉 살더라")
// 효과 fx "fiery-serpents" (playFierySerpents): 모래 위를 불빛 같은 줄기들이 구불구불 스쳐 지나간다 (민 21:6).
//   무는 장면은 그리지 않는다: 불빛이 스치고, 무대 아래가 붉게 어두워질 뿐 (사람은 장면 쪽의 fall 동작으로).
// 효과 fx "serpent-lift" (playSerpentLift): 장대 위 놋뱀(.bz-mark)에서 금빛이 번지고 고리가 퍼진다 (민 21:9).
// 1막 에덴의 뱀(characters/serpent.ts)은 몸을 세워 말을 건다. 이 뱀은 말이 없다. 높이 달려 있을 뿐.
// 하나님은 그리지 않는다 — 구름 기둥·빛으로만 (CLAUDE.md 8-1).
// 폰(세로 화면)에서는 x 100~300만 보인다 → 장대(200)는 가운데.
import { H, W, rng, tent } from './backdrop';

export type BrazenState = 'road' | 'camp' | 'pole' | 'pole-lit';

const f = (n: number) => n.toFixed(1);
const CX = 200;
/** 진의 땅 */
const GROUND = 238;

/** 에돔의 산: 깎아지른 붉은 사암 봉우리들 */
function edomRidge(base: number, peak: number, seed: number, cls: string): string {
  const r = rng(seed);
  let d = `M${-W * 2} ${H} L${-W * 2} ${base}`;
  let x = -W * 2;
  while (x < W * 3) {
    const w = 18 + r() * 34;
    const h = peak * (0.35 + r() * 0.65);
    // 평평한 꼭대기 + 가파른 벽 (사암 메사)
    d += ` L${f(x + w * 0.18)} ${f(base - h)} L${f(x + w * 0.5)} ${f(base - h - r() * 4)} L${f(x + w * 0.78)} ${f(base - h * (0.7 + r() * 0.3))} L${f(x + w)} ${f(base - r() * 6)}`;
    x += w;
  }
  d += ` L${W * 3} ${H} Z`;
  return `<path class="${cls}" d="${d}"/>`;
}

/** 사암의 결: 산 위의 가로 줄무늬 */
function strata(y0: number, n: number): string {
  const lines = Array.from({ length: n }, (_, i) => {
    const y = y0 + i * 5;
    return `M${-W} ${y} C${0} ${y - 2} ${120} ${y + 2} ${220} ${y - 1} C${320} ${y - 3} ${460} ${y + 1} ${W * 2} ${y}`;
  }).join(' ');
  return `<path class="bz-strata" d="${lines}"/>`;
}

/** 아지랑이: 땅 위에서 떨리는 가는 줄 */
function haze(y: number, n: number, seed: number): string {
  const r = rng(seed);
  return `<g class="bz-haze">${Array.from({ length: n }, (_, i) => {
    const x = -40 + r() * 480;
    const w = 40 + r() * 90;
    return `<path style="--d:${f(r() * 4)}s" d="M${f(x)} ${f(y + i * 3)} q${f(w / 4)} -1.4 ${f(w / 2)} 0 t${f(w / 2)} 0"/>`;
  }).join('')}</g>`;
}

/** 마른 덤불 */
function bush(x: number, ground: number, s: number, seed: number): string {
  const r = rng(seed);
  const twigs = Array.from({ length: 7 }, () => {
    const a = -Math.PI / 2 + (r() - 0.5) * 2.2;
    const l = (6 + r() * 8) * s;
    return `M${x} ${ground} L${f(x + Math.cos(a) * l)} ${f(ground + Math.sin(a) * l)}`;
  }).join(' ');
  return `<path class="bd-near bz-twig" d="${twigs}"/>`;
}

/** 길 위의 행렬: 멀리 개미처럼 늘어선 사람들 */
function file(): string {
  const pts: [number, number, number][] = [];
  for (let i = 0; i < 26; i++) {
    const t = i / 25;
    // 길 가운데 선을 따라 (아래 = 가깝고 크게, 위 = 멀고 작게)
    const y = 214 - t * 14;
    const x = 214 + Math.sin(t * 5.2) * (22 - t * 16) + t * 34;
    pts.push([x, y, 1.6 - t * 1.1]);
  }
  return `<g class="bz-file">${pts.map(([x, y, s], i) => `<rect style="--d:${f(i * 0.17)}s" x="${f(x - s * 0.5)}" y="${f(y - s * 3)}" width="${f(s)}" height="${f(s * 3)}" rx="${f(s * 0.5)}"/>`).join('')}</g>`;
}

/** 하얀 길: 앞에서 지평선까지 굽어 간다 */
function road(): string {
  return `<path class="bz-path" d="M150 ${H} C176 246 236 236 232 224 C228 214 196 214 222 206 C240 200 262 199 270 198 L274 198 C266 200 246 202 230 207 C206 215 236 218 240 225 C246 238 196 250 196 ${H} Z"/>`;
}

/** 구름 기둥 (작게, 멀리) */
function pillar(x: number, top: number, bottom: number, w: number, seed: number): string {
  const r = rng(seed);
  const puffs: string[] = [];
  for (let y = bottom; y > top; y -= 7) {
    const t = (bottom - y) / (bottom - top);
    const rw = w * (0.8 + t * 0.5) * (0.85 + r() * 0.3);
    puffs.push(`<ellipse class="bz-puff" style="--d:${f(r() * 6)}s" cx="${f(x + (r() - 0.5) * w * 0.4)}" cy="${f(y)}" rx="${f(rw)}" ry="${f(rw * 0.62)}"/>`);
  }
  return `<g class="bz-pillar">${puffs.join('')}</g>`;
}

/** 모래 결: 바람이 새긴 물결 무늬 */
function ripples(seed: number): string {
  const r = rng(seed);
  const d = Array.from({ length: 16 }, () => {
    const x = -40 + r() * 480;
    const y = 244 + r() * 14;
    const w = 16 + r() * 30;
    return `M${f(x)} ${f(y)} q${f(w / 2)} -2 ${f(w)} 0`;
  }).join(' ');
  return `<path class="bz-ripple" d="${d}"/>`;
}

/** 놋뱀이 달린 장대 (민 21:8-9). 장대를 감고 올라가 꼭대기에서 고개를 든다 */
function pole(lit: boolean): string {
  const top = 92;
  // 감긴 몸: 장대 앞뒤를 번갈아 지나는 S자. 아래(꼬리)는 가늘고 위로 갈수록 굵다
  const coil: string[] = [];
  const y0 = 170;
  const y1 = 112;
  const n = 48;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const y = y0 - (y0 - y1) * t;
    const x = CX + Math.sin(t * Math.PI * 4.5) * (5 + t * 4);
    coil.push(`${i ? 'L' : 'M'}${f(x)} ${f(y)}`);
  }
  // 목과 머리: 장대 꼭대기 위로 휘어 올라 앞을 내려다본다
  const neck = `M${f(CX + Math.sin(Math.PI * 4.5) * 9)} ${y1} C${CX + 14} ${y1 - 8} ${CX + 12} ${top - 2} ${CX + 2} ${top - 4} C${CX - 6} ${top - 6} ${CX - 12} ${top - 2} ${CX - 14} ${top + 4}`;
  const head = `M${CX - 9} ${top + 1} C${CX - 13} ${top - 1} ${CX - 20} ${top + 2} ${CX - 21} ${top + 6} C${CX - 19} ${top + 9} ${CX - 13} ${top + 9} ${CX - 10} ${top + 7} Z`;
  const rays = lit
    ? `<g class="bz-rays" style="transform-origin:${CX}px ${top + 30}px">${Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const l = i % 2 ? 120 : 180;
        return `<path d="M${CX} ${top + 30} L${f(CX + Math.cos(a - 0.04) * l)} ${f(top + 30 + Math.sin(a - 0.04) * l)} L${f(CX + Math.cos(a + 0.04) * l)} ${f(top + 30 + Math.sin(a + 0.04) * l)} Z"/>`;
      }).join('')}</g>`
    : '';
  const stones = rng(7213);
  const cairn = Array.from({ length: 9 }, (_, i) => {
    const x = CX - 13 + (i % 5) * 6.5 + stones() * 2;
    const y = GROUND - (i < 5 ? 2 : 6.5);
    return `<ellipse cx="${f(i < 5 ? x : x + 3)}" cy="${f(y)}" rx="${f(3.6 + stones() * 1.4)}" ry="${f(2.4 + stones() * 0.8)}"/>`;
  }).join('');
  return `<g class="bz-pole${lit ? ' is-lit' : ''}">
    ${rays}
    <circle class="bz-halo" cx="${CX}" cy="${top + 30}" r="${lit ? 92 : 46}"/>
    <rect class="bd-mid bz-staff" x="${CX - 1.8}" y="${top + 4}" width="3.6" height="${GROUND - top - 6}"/>
    <path class="bz-body bz-body--glow" d="${coil.join(' ')} ${neck}"/>
    <path class="bz-body" d="${coil.join(' ')} ${neck}"/>
    <path class="bz-shine" d="${coil.join(' ')} ${neck}"/>
    <path class="bz-head" d="${head}"/>
    <circle class="bz-eye" cx="${CX - 16}" cy="${top + 4.6}" r="0.9"/>
    <circle class="bz-mark" cx="${CX}" cy="${top + 30}" r="1"/>
    <g class="bd-near">${cairn}</g>
  </g>`;
}

function roadArt(): string {
  return `<g class="bz bz--road">
    <circle class="bz-sun" cx="300" cy="58" r="20"/>
    <circle class="bz-glare" cx="300" cy="58" r="70"/>
    ${edomRidge(206, 58, 7201, 'bd-far bz-edom bz-edom--far')}
    ${edomRidge(214, 36, 7202, 'bd-mid bz-edom')}
    ${strata(176, 7)}
    <path class="bd-mid bz-sand" d="M${-W * 2} ${H} L${-W * 2} 212 C-200 208 0 214 140 210 C240 207 340 213 520 209 C700 206 900 212 ${W * 3} 210 L${W * 3} ${H} Z"/>
    ${road()}
    ${file()}
    ${haze(200, 6, 7203)}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 246 C-200 242 40 252 120 250 C150 249 160 256 150 ${H} Z"/>
    <path class="bd-near" d="M${W * 3} ${H} L${W * 3} 244 C700 240 420 250 290 248 C250 248 240 256 250 ${H} Z"/>
    ${bush(118, 249, 1.1, 7204)}
    ${bush(286, 248, 1.3, 7205)}
  </g>`;
}

function campArt(state: BrazenState): string {
  const r = rng(7221);
  const tents: [number, number, number][] = [
    [-150, 214, 0.32], [-80, 216, 0.36], [-10, 213, 0.3], [56, 216, 0.4], [118, 212, 0.3],
    [282, 212, 0.3], [344, 216, 0.4], [410, 213, 0.32], [476, 216, 0.36], [548, 214, 0.32],
  ];
  const near: [number, number, number][] = [[64, 236, 0.62], [336, 236, 0.62]];
  const rocks = Array.from({ length: 10 }, () => {
    const x = -60 + r() * 520;
    const y = 248 + r() * 10;
    return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(2 + r() * 4)}" ry="${f(1.2 + r() * 1.6)}"/>`;
  }).join('');
  const isPole = state === 'pole' || state === 'pole-lit';
  return `<g class="bz bz--${state}">
    ${edomRidge(204, 30, 7222, 'bd-far bz-edom bz-edom--far')}
    ${pillar(CX + (isPole ? 96 : 0), 130, 198, 6, 7223)}
    <path class="bd-mid bz-sand" d="M${-W * 2} ${H} L${-W * 2} 214 C-200 210 0 216 140 212 C240 209 340 215 520 211 C700 208 900 214 ${W * 3} 212 L${W * 3} ${H} Z"/>
    <g class="bz-tents">${tents.map(([x, y, s]) => tent(x, y, s)).join('')}</g>
    ${haze(214, 4, 7224)}
    <path class="bd-mid bz-floor" d="M${-W * 2} ${H} L${-W * 2} ${GROUND} C-200 234 0 240 160 236 C260 233 360 240 520 235 C700 231 900 238 ${W * 3} 236 L${W * 3} ${H} Z"/>
    ${near.map(([x, y, s]) => tent(x, y, s)).join('')}
    ${isPole ? pole(state === 'pole-lit') : ''}
    ${ripples(7225)}
    <g class="bd-near">${rocks}</g>
    ${bush(30, 252, 1.2, 7226)}
    ${bush(372, 250, 1, 7227)}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 254 C-300 250 0 258 200 254 C400 250 700 258 ${W * 3} 252 L${W * 3} ${H} Z"/>
  </g>`;
}

export function brazenArt(state: BrazenState): string {
  return state === 'road' ? roadArt() : campArt(state);
}

// ── 효과 fiery-serpents: 불뱀들을 백성 중에 보내어 (민 21:6) ─────────────────
/** scene = .scene. 모래 위를 불빛 같은 줄기들이 구불구불 스쳐 지나가고, 무대 아래가 붉게 어두워진다 (약 10초) */
export function playFierySerpents(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-fserp';
  const r = rng(Date.now() % 100000);
  const n = rm ? 0 : 11;
  const snakes = Array.from({ length: n }, (_, i) => {
    const y = 64 + r() * 30; // 무대 아래쪽 (땅)
    const amp = 3 + r() * 4;
    const k = 5 + Math.floor(r() * 4);
    // 한 마리 = 넓은 물결 줄 한 가닥. 대시 한 토막(몸)이 줄을 따라 미끄러진다
    let d = 'M0 10';
    for (let j = 1; j <= k * 2; j++) d += ` Q${f((j - 0.5) * (200 / (k * 2)))} ${j % 2 ? 10 - amp : 10 + amp} ${f(j * (200 / (k * 2)))} 10`;
    const flip = i % 2 ? ' scale(-1,1)' : '';
    return `<i style="--y:${f(y)}%; --d:${f(i * 0.55 + r() * 0.6)}s; --t:${f(2.6 + r() * 1.6)}s; --s:${f(0.7 + r() * 0.6)}; transform:translateY(-50%)${flip}">
      <svg viewBox="0 0 200 20" preserveAspectRatio="none"><path class="g" pathLength="100" d="${d}"/><path class="c" pathLength="100" d="${d}"/></svg></i>`;
  }).join('');
  layer.innerHTML = `<b></b>${snakes}`;
  scene.append(layer);
  const life = rm ? 2600 : 10400;
  setTimeout(() => layer.classList.add('is-out'), life - 1600);
  setTimeout(() => layer.remove(), life);
}

// ── 효과 serpent-lift: 놋뱀을 쳐다본즉 살더라 (민 21:9) ─────────────────────
/** scene = .scene. 장대 위 놋뱀에서 금빛이 번지고, 고리가 천천히 퍼져 무대 끝까지 닿는다 (약 9초) */
export function playSerpentLift(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-slift';
  const b = scene.getBoundingClientRect();
  const mark = scene.querySelector<SVGElement>('.bz-mark');
  if (mark) {
    const a = mark.getBoundingClientRect();
    if (a.width || a.height) {
      layer.style.setProperty('--x', `${a.left - b.left + a.width / 2}px`);
      layer.style.setProperty('--y', `${a.top - b.top + a.height / 2}px`);
    }
  }
  const rings = rm ? '' : [0, 1.4, 2.8, 4.2].map((d) => `<i style="--d:${d}s"></i>`).join('');
  const r = rng(Date.now() % 100000);
  const motes = rm ? '' : Array.from({ length: 22 }, () =>
    `<u style="--ex:${f(6 + r() * 88)}%; --ey:${f(60 + r() * 34)}%; --d:${f(1.6 + r() * 3.4)}s; --dx:${f((r() - 0.5) * 30)}px; --s:${f(0.6 + r() * 1.1)}"></u>`,
  ).join('');
  layer.innerHTML = `<s></s>${rings}${motes}`;
  scene.append(layer);
  const life = rm ? 2600 : 9200;
  setTimeout(() => layer.classList.add('is-out'), life - 1800);
  setTimeout(() => layer.remove(), life);
}
