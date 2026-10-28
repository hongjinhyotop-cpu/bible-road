// 다른 불 (레 10, A급 lev-10-strange-fire 「다른 불」). 같은 종이 오려낸 그림자극 말투.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - sf-court   : 성막 뜰. 뒤로 성막(널판 위에 늘어진 덮개, 동쪽 문의 청·자·홍색 휘장), 그 위 구름 기둥,
//                 양옆으로 낮게 둘러선 세마포 포장과 기둥, 앞 왼쪽에 놋 번제단(네 뿔, 꺼지지 않는 불 — 레 6:13), 오른쪽에 물두멍
//  - sf-ash     : 같은 뜰, 일이 지난 뒤. 회막 문 앞 그을린 땅에 엎어진 향로 두 개, 식어 가는 숯, 가는 연기 한 줄기 (레 10:2)
//  - sf-outside : 진 밖. 멀리 지평선에 늘어선 장막과 작은 구름 기둥, 앞은 빈 땅과 돌, 지는 해 (레 10:4-5 "진 밖으로")
// 효과 fx "strange-fire" (playStrangeFire): 회막 문(.sf-door)에서 흰 불이 터져 나와 무대를 덮고, 걷힌다 (레 10:2).
//   레 9:24의 불과 같은 금빛이지만 결이 다르다 — 위에서 내려앉는 영광이 아니라, 문에서 앞으로 곧게 뻗는 흰 불.
//   몸이 타는 모습은 그리지 않는다: 빛이 덮었다가 걷히면 끝 (사람은 장면 쪽의 fall 동작으로 어두워진다).
// 하나님은 그리지 않는다 — 구름 기둥·문 안의 빛·불로만 (CLAUDE.md 8-1).
// 폰(세로 화면)에서는 x 100~300만 보인다 → 회막 문(200)·번제단(138)·물두멍(266)은 그 안에.
import { H, W, rng, tent } from './backdrop';

export type StrangeFireState = 'court' | 'ash' | 'outside';

const f = (n: number) => n.toFixed(1);
const CX = 200;
/** 성막이 선 땅 */
const BASE = 214;
/** 뜰의 땅 (번제단·물두멍) */
const YARD = 236;

/** 구름 기둥: 성막 위에 선 흰 구름. 천천히 숨 쉰다 (출 40:34-38) */
function pillar(x: number, top: number, bottom: number, w: number, seed: number): string {
  const r = rng(seed);
  const puffs: string[] = [];
  for (let y = bottom; y > top; y -= 9) {
    const t = (bottom - y) / (bottom - top);
    const rw = w * (0.8 + t * 0.5) * (0.85 + r() * 0.3);
    puffs.push(`<ellipse class="sf-puff" style="--d:${f(r() * 6)}s" cx="${f(x + (r() - 0.5) * w * 0.4)}" cy="${f(y)}" rx="${f(rw)}" ry="${f(rw * 0.62)}"/>`);
  }
  return `<g class="sf-pillar">${puffs.join('')}</g>`;
}

/** 성막: 널판으로 세운 네모난 집 위에 덮개가 늘어지고, 동쪽 문에 다섯 기둥과 휘장 (출 26) */
function tabernacle(): string {
  const L = CX - 54;
  const R = CX + 54;
  const T = BASE - 52;
  const cover = `M${L - 6} ${BASE} L${L - 4} ${T + 6} C${L + 10} ${T - 3} ${R - 10} ${T - 3} ${R + 4} ${T + 6} L${R + 6} ${BASE} Z`;
  const folds = Array.from({ length: 9 }, (_, i) => {
    const x = L + 4 + i * 12;
    return `M${x} ${T + 2} Q${x + 2} ${T + 24} ${x - 1} ${BASE - 2}`;
  }).join(' ');
  const door = [0, 1, 2].map((k) => `<rect class="sf-door__band sf-door__band--${k}" x="${f(CX - 15 + k * 10)}" y="${T + 14}" width="10" height="${BASE - T - 14}"/>`).join('');
  const posts = Array.from({ length: 5 }, (_, i) => `<rect class="sf-post" x="${f(CX - 16 + i * 7.6)}" y="${T + 11}" width="1.6" height="${BASE - T - 11}"/>`).join('');
  return `<g class="sf-tent">
    <path class="bd-mid" d="${cover}"/>
    <path class="sf-fold" d="${folds}"/>
    <path class="sf-hem" d="M${L - 5} ${T + 9} C${L + 10} ${T + 1} ${R - 10} ${T + 1} ${R + 5} ${T + 9}"/>
    <g class="sf-door">
      <rect class="sf-door__glow" x="${CX - 16}" y="${T + 12}" width="32" height="${BASE - T - 12}"/>
      ${door}
      ${posts}
    </g>
    <circle class="sf-door__mark" cx="${CX}" cy="${BASE - 22}" r="1"/>
  </g>`;
}

/** 세마포 포장: 놋 받침 위 기둥에 흰 휘장을 걸어 뜰을 둘렀다 (출 27:9-18). 양옆으로 비스듬히 물러난다 */
function hangings(): string {
  const side = (dir: -1 | 1) => {
    const pts: string[] = [];
    const posts: string[] = [];
    for (let i = 0; i <= 9; i++) {
      const x = CX + dir * (78 + i * 26);
      const y = 222 + i * 1.8;
      const h = 16 + i * 1.6;
      posts.push(`<rect x="${f(x - 0.9)}" y="${f(y - h - 2)}" width="1.8" height="${f(h + 2)}"/><circle cx="${f(x)}" cy="${f(y - h - 2.4)}" r="1.3"/>`);
      pts.push(`${f(x)},${f(y - h)}`);
    }
    const top = pts.join(' L');
    const last = CX + dir * (78 + 9 * 26);
    const first = CX + dir * 78;
    return `<path class="sf-linen" d="M${top} L${f(last)},${f(222 + 9 * 1.8)} L${f(first)},222 Z"/><g class="bd-mid sf-posts">${posts.join('')}</g>`;
  };
  return `<g class="sf-hangings">${side(-1)}${side(1)}</g>`;
}

/** 놋 번제단: 네모난 단, 네 귀퉁이 뿔, 그물 받침, 그 위 꺼지지 않는 불과 연기 (출 27:1-8, 레 6:13) */
function bronzeAltar(x: number, ground: number, seed: number): string {
  const r = rng(seed);
  const w = 30;
  const h = 18;
  const top = ground - h;
  const puffs = Array.from({ length: 6 }, (_, i) =>
    `<circle class="bd-smoke__puff" style="--d:${f(i * 1.1)}s; --dx:${f((r() - 0.5) * 16)}px" cx="${x}" cy="${top - 4}" r="${f(4 + r() * 2)}"/>`,
  ).join('');
  const tongues = Array.from({ length: 5 }, (_, i) => {
    const fx = x - 9 + i * 4.5;
    const fh = 5 + r() * 6;
    return `<path class="sf-flame" style="--d:${f(r() * 2)}s" d="M${f(fx - 2.4)} ${top} Q${f(fx - 1)} ${f(top - fh * 0.6)} ${f(fx)} ${f(top - fh)} Q${f(fx + 1.2)} ${f(top - fh * 0.5)} ${f(fx + 2.4)} ${top} Z"/>`;
  }).join('');
  return `<g class="sf-altar">
    <circle class="sf-altarglow" cx="${x}" cy="${top - 4}" r="30"/>
    <g class="bd-smoke">${puffs}</g>
    ${tongues}
    <g class="bd-mid">
      <path d="M${x - w / 2} ${ground} L${x - w / 2} ${top} L${x + w / 2} ${top} L${x + w / 2} ${ground} Z"/>
      <path d="M${x - w / 2 - 1} ${top + 1} L${x - w / 2 - 2} ${top - 5} L${x - w / 2 + 3} ${top} Z M${x + w / 2 + 1} ${top + 1} L${x + w / 2 + 2} ${top - 5} L${x + w / 2 - 3} ${top} Z"/>
    </g>
    <path class="sf-grate" d="M${x - w / 2} ${top + 8} h${w} M${x - w / 2} ${top + 11} h${w} ${Array.from({ length: 6 }, (_, i) => `M${f(x - w / 2 + 3 + i * 4.8)} ${top + 8} v3`).join(' ')}"/>
    <ellipse class="bd-ember" cx="${x}" cy="${top}" rx="12" ry="2"/>
  </g>`;
}

/** 물두멍: 받침 위의 놋 대야 (출 30:18) */
function laver(x: number, ground: number): string {
  return `<g class="bd-mid sf-laver">
    <path d="M${x - 4} ${ground} L${x - 2} ${ground - 9} L${x + 2} ${ground - 9} L${x + 4} ${ground} Z"/>
    <path d="M${x - 11} ${ground - 15} C${x - 10} ${ground - 8} ${x + 10} ${ground - 8} ${x + 11} ${ground - 15} Z"/>
  </g>
  <ellipse class="sf-water" cx="${x}" cy="${ground - 15}" rx="10" ry="1.4"/>`;
}

/** 향로: 숯불을 담는 손잡이 달린 놋 그릇 (민 16:6). 엎어져 숯이 흩어진 모양 */
function fallenCenser(x: number, ground: number, flip: boolean, seed: number): string {
  const r = rng(seed);
  const s = flip ? -1 : 1;
  const coals = Array.from({ length: 5 }, (_, i) =>
    `<circle class="sf-coal" style="--d:${f(r() * 3)}s" cx="${f(x + s * (8 + i * 2.6 + r() * 2))}" cy="${f(ground - 0.6 - r() * 0.8)}" r="${f(0.5 + r() * 0.5)}"/>`,
  ).join('');
  return `<g class="sf-censer" transform="translate(${x} ${ground}) scale(1.7) translate(${-x} ${-ground})">
    <g class="bd-mid" transform="translate(${x} ${ground}) scale(${s} 1) rotate(-14)">
      <path d="M-6 -1 C-6 -6 6 -6 6 -1 C4 1 -4 1 -6 -1 Z"/>
      <path d="M-5 -3 L-17 -4.4 L-17 -3 L-5 -1.6 Z"/>
    </g>
    ${coals}
    <path class="sf-wisp" style="--d:${f(r() * 4)}s" d="M${x + s * 10} ${ground - 2} C${x + s * 6} ${ground - 14} ${x + s * 14} ${ground - 22} ${x + s * 9} ${ground - 34}"/>
  </g>`;
}

/** 진 밖: 지평선에 늘어선 진, 그 가운데 작은 구름 기둥, 앞은 빈 땅 */
function outside(): string {
  const r = rng(9107);
  const tents: [number, number, number][] = [
    [-120, 210, 0.26], [-60, 212, 0.3], [6, 209, 0.26], [62, 211, 0.3], [128, 208, 0.24],
    [262, 208, 0.24], [316, 211, 0.3], [372, 209, 0.26], [436, 212, 0.3], [500, 210, 0.26],
  ];
  const stones = Array.from({ length: 14 }, () => {
    const x = -60 + r() * 520;
    const y = 240 + r() * 14;
    return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(2 + r() * 4)}" ry="${f(1.2 + r() * 1.6)}"/>`;
  }).join('');
  return `<g class="sf sf--outside">
    <circle class="sf-sun" cx="92" cy="196" r="46"/>
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 206 C-300 200 -100 210 60 204 C160 200 260 208 400 203 C600 198 800 206 ${W * 3} 204 L${W * 3} ${H} Z"/>
    <g class="sf-farcamp">${tents.map(([x, y, s]) => tent(x, y, s)).join('')}
      ${pillar(CX, 132, 200, 6, 9109)}
    </g>
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 226 C-200 222 0 230 160 226 C260 223 360 230 520 224 C700 220 900 228 ${W * 3} 226 L${W * 3} ${H} Z"/>
    <g class="bd-near">${stones}</g>
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 250 C-300 246 0 254 200 250 C400 246 700 254 ${W * 3} 248 L${W * 3} ${H} Z"/>
  </g>`;
}

export function strangeFireArt(state: StrangeFireState): string {
  if (state === 'outside') return outside();
  return `<g class="sf sf--${state}">
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 204 C-300 198 -100 206 80 200 C180 197 260 204 400 199 C600 195 800 203 ${W * 3} 200 L${W * 3} ${H} Z"/>
    ${pillar(CX, 60, 156, 12, 9101)}
    <circle class="sf-holy" cx="${CX}" cy="${BASE - 30}" r="70"/>
    ${tabernacle()}
    ${hangings()}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 228 C-300 224 0 230 120 226 C200 223 300 229 520 225 C700 222 900 228 ${W * 3} 226 L${W * 3} ${H} Z"/>
    ${state === 'ash' ? `<ellipse class="sf-scorch" cx="${CX}" cy="242" rx="44" ry="6"/>` : ''}
    ${bronzeAltar(138, YARD, 9103)}
    ${laver(266, YARD + 2)}
    ${state === 'ash' ? fallenCenser(CX - 22, 244, true, 9105) + fallenCenser(CX + 24, 246, false, 9106) : ''}
    <path class="bd-near sf-near" d="M${-W * 2} ${H} L${-W * 2} 250 C-300 246 0 254 200 250 C400 246 700 254 ${W * 3} 248 L${W * 3} ${H} Z"/>
  </g>`;
}

// ── 효과 strange-fire: 여호와 앞에서 불이 나와 (레 10:2) ─────────────────────
/** scene = .scene. 회막 문에서 흰 불이 앞으로 터져 나와 무대를 덮고, 천천히 걷힌다 (약 7초) */
export function playStrangeFire(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-sfire';
  const b = scene.getBoundingClientRect();
  const door = scene.querySelector<SVGElement>('.sf-door__mark');
  if (door) {
    const a = door.getBoundingClientRect();
    if (a.width || a.height) {
      layer.style.setProperty('--x', `${a.left - b.left + a.width / 2}px`);
      layer.style.setProperty('--y', `${a.top - b.top + a.height / 2}px`);
    }
  }
  const r = rng(Date.now() % 100000);
  // 혀: 문에서 앞(아래)·양옆으로 뻗는 불길. 각도는 아래쪽 반원
  const tongues = rm ? '' : Array.from({ length: 11 }, (_, i) => {
    const a = -70 + i * 14 + (r() - 0.5) * 6; // 0 = 바로 아래
    return `<i style="--a:${f(a)}deg; --d:${f(0.25 + r() * 0.35)}s; --l:${f(0.8 + r() * 0.5)}"></i>`;
  }).join('');
  const embers = rm ? '' : Array.from({ length: 26 }, () =>
    `<u style="--ex:${f(8 + r() * 84)}%; --ey:${f(46 + r() * 44)}%; --d:${f(2.4 + r() * 1.8)}s; --dx:${f((r() - 0.5) * 40)}px; --s:${f(0.6 + r() * 1.2)}"></u>`,
  ).join('');
  layer.innerHTML = `<s></s><b></b>${tongues}${embers}`;
  scene.append(layer);
  if (!rm) {
    scene.classList.add('is-sfire');
    setTimeout(() => scene.classList.remove('is-sfire'), 1100);
  }
  const life = rm ? 2600 : 7600;
  setTimeout(() => layer.classList.add('is-out'), life - 1600);
  setTimeout(() => layer.remove(), life);
}
