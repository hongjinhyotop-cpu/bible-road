// 땅이 입을 열어 (민 16, A급 num-16-korah 「땅이 입을 열어」). 같은 종이 오려낸 그림자극 말투.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - kr-door  : 회막 문 앞. 성막(레 10의 sf 그림을 그대로 빌림)과 구름 기둥, 그 앞에 향로를 든 이백오십 명이
//               세 줄로 늘어섰다 — 멀리 작은 그림자들, 손마다 숯불 한 점과 향 연기 한 줄 (민 16:17-18)
//  - kr-ash   : 같은 뜰, 불이 지나간 뒤. 사람의 그림자는 없고, 향로들만 그 자리에 엎어져 식어 간다 (민 16:35-37).
//               몸이 탄 모습은 그리지 않는다 — 빈 줄과 향로로만
//  - kr-tents : 고라·다단·아비람의 장막 셋. 둘레의 진은 물러나 멀리 빙 둘러섰고, 가운데만 비었다 (민 16:24-27)
//  - kr-gone  : 같은 자리, 장막이 없다. 땅에 아문 금 한 줄만 (민 16:33 "땅이 그 위에 합하니")
// 효과:
//  - earth-open  (playEarthOpen): kr-tents의 장막 밑 땅이 갈라져 벌어지고, 장막 셋이 금 속으로 가라앉고,
//                 흙먼지가 오르고, 땅이 다시 닫혀 아문 금만 남는다. 무대가 흔들린다 (약 8초, 민 16:31-33).
//                 사람의 몸은 그리지 않는다 — 장막과 땅으로만
//  - plague-stop (playPlagueStop): 왼쪽에서 잿빛 그늘(염병)이 무대를 덮어 오고, 아론(무대 위 인물) 자리에서
//                 금빛 향 연기 기둥이 솟아 그늘이 그 앞에서 멈춘다. 그늘은 물러나고 향 연기만 남는다 (약 12초, 민 16:47-48)
// 심판의 불(16:35)은 레 10의 fx strange-fire를 그대로 쓴다 — kr-door에도 회막 문 표시(.sf-door__mark)가 있다.
// 하나님은 그리지 않는다 — 구름 기둥·문 안의 빛·불로만 (CLAUDE.md 8-1).
// 폰(세로 화면)에서는 x 100~300만 보인다.
import { H, W, rng, tent } from './backdrop';
import { bronzeAltar, hangings, pillar, tabernacle } from './strangefire';

export type KorahState = 'door' | 'ash' | 'tents' | 'gone';

const f = (n: number) => n.toFixed(1);
const CX = 200;
/** 장막 셋이 선 땅 */
const G = 222;

/** 향로를 든 사람 하나 (멀리 작은 그림자): 머리, 어깨가 넓은 긴 옷, 앞으로 내민 손의 숯불 + 향 연기 한 줄 */
function bearer(x: number, ground: number, h: number, flip: boolean, seed: number): string {
  const r = rng(seed);
  const s = flip ? -1 : 1;
  const w = h * 0.26;
  const head = h * 0.13;
  const hand = ground - h * 0.52;
  const hx = x + s * w * 1.25;
  const body = `M${f(x - w)} ${ground} L${f(x - w * 0.7)} ${f(ground - h * 0.72)} Q${f(x)} ${f(ground - h * 0.8)} ${f(x + w * 0.7)} ${f(ground - h * 0.72)} L${f(x + w)} ${ground} Z`;
  const arm = `M${f(x + s * w * 0.4)} ${f(ground - h * 0.68)} L${f(hx)} ${f(hand)} L${f(hx)} ${f(hand + h * 0.06)} L${f(x + s * w * 0.3)} ${f(ground - h * 0.56)} Z`;
  return `<g class="kr-man">
    <path d="${body}"/><path d="${arm}"/>
    <circle cx="${f(x)}" cy="${f(ground - h * 0.8 - head)}" r="${f(head)}"/>
    <path class="kr-pan" d="M${f(hx - h * 0.07)} ${f(hand)} Q${f(hx)} ${f(hand + h * 0.07)} ${f(hx + h * 0.07)} ${f(hand)} Z"/>
    <circle class="kr-coal" style="--d:${f(r() * 3)}s" cx="${f(hx)}" cy="${f(hand - 0.3)}" r="${f(Math.max(0.6, h * 0.045))}"/>
    <path class="kr-wisp" style="--d:${f(r() * 4)}s" d="M${f(hx)} ${f(hand - 1)} C${f(hx - 2)} ${f(hand - h * 0.25)} ${f(hx + 2)} ${f(hand - h * 0.45)} ${f(hx - 1)} ${f(hand - h * 0.7)}"/>
  </g>`;
}

/** 엎어진 향로 하나 (사람은 없다): 그릇, 흩어진 숯 두어 점, 가는 연기 */
function dropped(x: number, ground: number, h: number, seed: number): string {
  const r = rng(seed);
  const s = r() < 0.5 ? -1 : 1;
  const k = h * 0.09;
  return `<g class="kr-dropped">
    <path class="bd-mid" transform="translate(${f(x)} ${f(ground)}) rotate(${f(s * (8 + r() * 14))})" d="M${f(-k)} 0 Q0 ${f(-k * 1.3)} ${f(k)} 0 Z M${f(k * 0.8)} ${f(-k * 0.3)} L${f(k * 2.6)} ${f(-k * 0.8)} L${f(k * 2.6)} ${f(-k * 0.4)} L${f(k * 0.8)} 0 Z"/>
    <circle class="kr-coal kr-coal--dim" style="--d:${f(r() * 3)}s" cx="${f(x + s * k * 1.6)}" cy="${f(ground - 0.3)}" r="${f(Math.max(0.5, k * 0.4))}"/>
    ${r() < 0.45 ? `<path class="kr-wisp kr-wisp--thin" style="--d:${f(r() * 4)}s" d="M${f(x)} ${f(ground - 1)} C${f(x - 2)} ${f(ground - h * 0.4)} ${f(x + 3)} ${f(ground - h * 0.7)} ${f(x)} ${f(ground - h)}"/>` : ''}
  </g>`;
}

/** 이백오십 명의 세 줄: 회막 문 쪽(가운데)만 비워 둔다. 넓은 화면에선 양옆으로 길게 이어진다 */
function rows(ash: boolean): string {
  const lines: [number, number, number, number][] = [
    // [땅, 키, 간격, 시드]
    [231, 12, 8.5, 9301],
    [239, 15, 11, 9302],
    [248, 19, 14.5, 9303],
  ];
  let out = '';
  for (const [ground, h, step, seed] of lines) {
    const r = rng(seed);
    const gap = 26 + h * 1.2;
    for (let x = -W * 1.2 + r() * step; x < W * 2.2; x += step * (0.85 + r() * 0.3)) {
      if (Math.abs(x - CX) < gap) continue;
      const y = ground + (r() - 0.5) * 1.6;
      const hh = h * (0.9 + r() * 0.2);
      const sd = seed * 7 + Math.round(x * 3);
      out += ash ? dropped(x, y, hh, sd) : bearer(x, y, hh, x > CX, sd);
    }
  }
  return `<g class="kr-rows">${out}</g>`;
}

/** 회막 문 앞 (kr-door / kr-ash) */
function door(ash: boolean): string {
  return `<g class="kr kr--${ash ? 'ash' : 'door'}">
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 204 C-300 198 -100 206 80 200 C180 197 260 204 400 199 C600 195 800 203 ${W * 3} 200 L${W * 3} ${H} Z"/>
    ${pillar(CX, 60, 156, 12, 9311)}
    <circle class="sf-holy" cx="${CX}" cy="184" r="70"/>
    ${tabernacle()}
    ${hangings()}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 226 C-300 222 0 228 120 224 C200 221 300 227 520 223 C700 220 900 226 ${W * 3} 224 L${W * 3} ${H} Z"/>
    ${ash ? `<ellipse class="kr-scorch" cx="${CX}" cy="240" rx="230" ry="14"/>` : ''}
    ${bronzeAltar(120, 234, 9313)}
    ${rows(ash)}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 254 C-300 250 0 257 200 253 C400 249 700 256 ${W * 3} 252 L${W * 3} ${H} Z"/>
  </g>`;
}

/** 진의 작은 장막 (멀리 빙 둘러섬) */
function farTent(x: number, ground: number, s: number): string {
  return `<g class="bd-mid bd-tent" transform="translate(${f(x)} ${f(ground)}) scale(${f(s)})">
    <path d="M-12 0 L-9 -7 L0 -11 L9 -7 L12 0 Z"/><path class="bd-tent__door" d="M-1.8 0 L0 -7 L1.8 0 Z"/></g>`;
}

/** 진이 물러나 빙 둘러선 모양: skip 구간(가운데)은 비었다 */
function ring(ground: number, s: number, step: number, seed: number, skip: number): string {
  const r = rng(seed);
  let out = '';
  for (let x = -W * 2 + r() * step; x < W * 3; x += step * (0.8 + r() * 0.4)) {
    if (Math.abs(x - CX) < skip) continue;
    out += farTent(x, ground + (r() - 0.5) * 2, s * (0.85 + r() * 0.3));
  }
  return out;
}

/** 갈라진 땅의 입: 장막 셋 밑을 가로지르는 들쭉날쭉한 틈. 처음엔 납작하게 닫혀 있다 */
function crack(): string {
  const r = rng(9321);
  const top: string[] = [];
  const bot: string[] = [];
  const L = 92;
  const R = 310;
  const n = 18;
  for (let i = 0; i <= n; i++) {
    const x = L + ((R - L) * i) / n;
    const t = Math.sin((Math.PI * i) / n); // 가운데가 가장 넓다
    const open = 2 + t * 22;
    top.push(`${f(x + (r() - 0.5) * 4)},${f(G - open * (0.35 + r() * 0.2))}`);
    bot.push(`${f(x + (r() - 0.5) * 4)},${f(G + open * (0.65 + r() * 0.3))}`);
  }
  const d = `M${L - 6},${G} L${top.join(' L')} L${R + 6},${G} L${bot.reverse().join(' L')} Z`;
  // 틈 가장자리에서 떨어지는 흙 부스러기
  const crumbs = Array.from({ length: 14 }, () => {
    const x = L + 10 + r() * (R - L - 20);
    return `<circle class="kr-crumb" style="--d:${f(r() * 1.2)}s; --dy:${f(8 + r() * 10)}px" cx="${f(x)}" cy="${f(G - 1)}" r="${f(0.6 + r() * 0.9)}"/>`;
  }).join('');
  return `<g class="kr-crack"><path class="kr-crack__mouth" d="${d}"/><path class="kr-crack__lip" d="${d}"/></g><g class="kr-crumbs">${crumbs}</g>`;
}

/** 흙먼지: 틈에서 일어나 위로 퍼진다 (earth-open 때만 보인다) */
function dust(): string {
  const r = rng(9331);
  return `<g class="kr-dust">${Array.from({ length: 16 }, (_, i) => {
    const x = 100 + r() * 200;
    return `<ellipse style="--d:${f(1 + i * 0.12 + r() * 0.5)}s; --dx:${f((r() - 0.5) * 40)}px" cx="${f(x)}" cy="${f(G - 4)}" rx="${f(10 + r() * 12)}" ry="${f(5 + r() * 5)}"/>`;
  }).join('')}</g>`;
}

/** 아문 금: 땅이 그 위에 합한 자리 */
function seam(cls: string): string {
  const r = rng(9341);
  const pts = Array.from({ length: 13 }, (_, i) => `${f(96 + i * 17.5 + (r() - 0.5) * 4)},${f(G + 1 + (r() - 0.5) * 2.4)}`);
  return `<path class="${cls}" d="M${pts.join(' L')}"/>`;
}

/** 고라·다단·아비람의 장막 (kr-tents / kr-gone) */
function tents(gone: boolean): string {
  return `<g class="kr kr--${gone ? 'gone' : 'tents'}">
    <defs><clipPath id="kr-clip"><rect x="-1000" y="-100" width="2400" height="${G + 100}"/></clipPath></defs>
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 198 C-300 194 -60 202 120 196 C220 193 300 200 460 195 C640 191 800 199 ${W * 3} 196 L${W * 3} ${H} Z"/>
    ${pillar(CX + 150, 120, 196, 7, 9351)}
    <g class="bd-far"><rect x="${CX + 140}" y="190" width="20" height="7"/></g>
    ${ring(203, 0.42, 13, 9352, 70)}
    ${ring(209, 0.6, 18, 9353, 96)}
    <path class="kr-ground" d="M${-W * 2} ${H} L${-W * 2} ${G} C-300 ${G - 3} 0 ${G + 2} ${CX} ${G} C400 ${G - 2} 700 ${G + 2} ${W * 3} ${G - 1} L${W * 3} ${H} Z"/>
    ${gone ? `${seam('kr-seam')}<ellipse class="kr-turned" cx="${CX}" cy="${G + 3}" rx="116" ry="5"/>` : `
    <g class="kr-sink" clip-path="url(#kr-clip)">
      <g class="kr-sink__in">${tent(134, G, 0.8)}${tent(201, G - 1, 1.02)}${tent(268, G, 0.78)}
        <path class="bd-near kr-rope" d="M92 ${G} L104 ${G - 18} M310 ${G} L298 ${G - 18}" fill="none" stroke="currentColor" stroke-width="0.6"/>
      </g>
    </g>
    ${crack()}${dust()}${seam('kr-seam kr-seam--late')}`}
    ${ring(236, 1.0, 30, 9354, 150)}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 250 C-300 246 0 254 200 250 C400 246 700 254 ${W * 3} 248 L${W * 3} ${H} Z"/>
  </g>`;
}

export function korahArt(state: KorahState): string {
  if (state === 'door' || state === 'ash') return door(state === 'ash');
  return tents(state === 'gone');
}

// ── 효과 earth-open: 땅이 그 입을 열어 (민 16:31-33) ─────────────────────
/** scene = .scene. 장막 셋(kr-tents) 밑의 땅이 갈라져 삼키고 다시 합한다 (약 8초) */
export function playEarthOpen(scene: HTMLElement, rm: boolean): void {
  const all = scene.querySelectorAll<SVGElement>('svg.backdrop[data-art="kr-tents"]');
  const bd = all[all.length - 1];
  if (bd) {
    bd.classList.remove('is-open');
    void bd.getBoundingClientRect();
    bd.classList.add('is-open');
    if (rm) bd.classList.add('is-rm');
  }
  if (rm) return;
  scene.classList.add('is-quake');
  setTimeout(() => scene.classList.remove('is-quake'), 3400);
}

// ── 효과 plague-stop: 죽은 자와 산 자 사이에 섰을 때에 (민 16:47-48) ─────────
/** 왼쪽에서 잿빛 그늘이 덮어 오다가, 아론 자리에서 솟은 향 연기 기둥 앞에서 멈추고 물러난다 (약 12초) */
export function playPlagueStop(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-plague';
  const b = scene.getBoundingClientRect();
  const aaron = scene.querySelector<HTMLElement>('.actor[data-id="aaron"]');
  let x = b.width / 2;
  if (aaron) {
    const a = aaron.getBoundingClientRect();
    if (a.width) x = a.left - b.left + a.width * 0.55;
  }
  layer.style.setProperty('--x', `${x.toFixed(0)}px`);
  const r = rng(Date.now() % 100000);
  const motes = rm ? '' : Array.from({ length: 30 }, () =>
    `<u style="--mx:${f(r() * 100)}%; --my:${f(20 + r() * 70)}%; --d:${f(r() * 3)}s; --s:${f(0.6 + r() * 1.4)}"></u>`,
  ).join('');
  const puffs = Array.from({ length: rm ? 4 : 12 }, (_, i) =>
    `<i style="--i:${i}; --d:${f(1.4 + i * 0.35)}s; --dx:${f((r() - 0.5) * 26)}px; --s:${f(0.8 + r() * 0.6)}"></i>`,
  ).join('');
  layer.innerHTML = `<s>${motes}</s><em></em><b></b>${puffs}`;
  if (rm) layer.classList.add('is-rm');
  const stage = scene.querySelector('.scene__stage');
  if (stage) stage.before(layer);
  else scene.append(layer);
  const life = rm ? 5000 : 12500;
  setTimeout(() => layer.classList.add('is-out'), life - 2200);
  setTimeout(() => layer.remove(), life);
}
