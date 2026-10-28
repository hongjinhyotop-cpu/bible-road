// 대속죄일 (레 16, A급 lev-16-atonement 「대속죄일」). 같은 종이 오려낸 그림자극 말투.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - atone-lots : 성막 뜰, 회막 문 앞. 세마포 울타리, 뒤로 성막과 그 위 구름 기둥, 문 앞에 매어 둔 수염소 둘 (16:7 "회막문 여호와 앞에 두고")
//  - atone-live : 같은 자리, 산 염소 하나만 남았다 (16:20 "산 염소를 드리되") — 안수(16:21) 장면
//  - atone-gone : 같은 자리, 염소는 떠나고 빈 자리에 말뚝과 풀린 줄만 (16:26 이후)
//  - atone-holy : 지성소 안. 금 입힌 널판 벽, 양옆으로 늘어진 휘장(청·자·홍색, 그룹 무늬), 가운데 위쪽에 구름처럼 고인 빛.
//                 법궤는 성막 기구 item "ark"로 띄운다 (16:2 "내가 구름 가운데서 속죄소 위에 나타남이니라" — 하나님은 그리지 않는다)
//  - atone-edge : 진의 가장자리에서 광야 쪽을 본다. 양옆 앞에 장막과 등을 보인 채 바라보는 사람들, 가운데로 지평선까지 굽은 길
// 효과:
//  - cast-lots     : 두 염소 위로 제비 두 개가 떠올라 하나는 금빛 "여호와께", 하나는 잿빛 "아사셀에게" (약 9초, 16:8)
//  - incense-cloud : 향로에서 향연이 피어올라 속죄소(떠 있는 법궤)를 덮고 머물렀다 옅어진다 (약 13초, 16:12-13)
//  - confess       : 진 곳곳에서 어두운 티끌들이 모여들어 산 염소의 머리에 내려앉고, 염소가 어두워진다 (약 7초, 16:21)
//  - scapegoat     : 정한 사람이 어두워진 염소를 끌고 길을 따라 지평선 쪽으로 걸어가 작아진다. 무인지경에서 줄을 풀고,
//                    염소는 혼자 지평선 너머로 사라지고, 사람은 돌아선다 (약 15초, 16:21-22, 26)
// 폰(세로 화면)에서는 x 100~300만 보인다 → 염소·길은 가운데, 인물은 양옆(spread).
import gsap from 'gsap';
import { W, H, rng, hills, tent, altar } from './backdrop';

export type AtoneState = 'lots' | 'live' | 'gone' | 'holy' | 'edge';

const f = (n: number) => n.toFixed(1);
const CX = 200;
/** 회막 문 앞 땅 */
const G = 240;

// ── 염소 ─────────────────────────────────────────

/** 수염소 옆모습(오른쪽을 봄), 원점 = 발굽 가운데. 높이 약 30. 뒤로 휜 뿔, 턱수염, 바짝 선 짧은 꼬리 */
export function goatShape(legsCls = 'at-legs'): string {
  return `
    <g class="${legsCls}">
      <path class="at-leg at-leg--a" d="M-10 -9 L-7.6 -9 L-7.8 0 L-10.2 0 Z"/>
      <path class="at-leg at-leg--b" d="M-6.6 -9 L-4.2 -9 L-4.4 0 L-6.8 0 Z"/>
      <path class="at-leg at-leg--b" d="M6.4 -9 L8.8 -9 L9 0 L6.6 0 Z"/>
      <path class="at-leg at-leg--a" d="M9.8 -9 L12.2 -9 L12.6 0 L10.2 0 Z"/>
    </g>
    <path d="M-12 -14 C-13 -19 -8 -21.4 0 -21.4 C6 -21.4 10 -20.4 12 -18.6 L14.2 -12.4 C13 -9 9 -8 4 -8 L-8 -8 C-11 -8.8 -12 -11 -12 -14 Z"/>
    <path d="M9 -19.4 C11 -24.4 13 -27.4 16 -29.4 C19 -30.6 22 -29.6 23.4 -27.4 L24.6 -23.4 C23.6 -22 21.4 -22 19.4 -23 C17.4 -21 15.4 -18 13.4 -15 Z"/>
    <path d="M16.4 -29.4 C15 -34.6 11 -37.4 6.8 -36.6 C10.4 -35 13 -32.6 14 -28.6 Z"/>
    <path d="M18.6 -30 C18 -35 14.6 -38.6 11 -38.6 C14 -36.6 16.4 -33.6 16.8 -29.4 Z"/>
    <path d="M17 -27.4 L12.4 -25.4 L15.8 -24 Z"/>
    <path d="M21.4 -22.6 L20.2 -16.6 L22.8 -21.6 Z"/>
    <path d="M-11.6 -18.6 C-14.6 -21.4 -15.6 -23.6 -14 -25.6 C-12.8 -22.6 -11.8 -20.6 -10.6 -19.4 Z"/>`;
}

/** 배경의 염소 한 마리 (x, 땅, 크기, 왼쪽을 보면 flip) */
function goat(x: number, s: number, flip: boolean, id: string, d = 0): string {
  return `<g transform="translate(${x} ${G}) scale(${flip ? -s : s} ${s})"><g class="at-goat" data-goat="${id}" style="--d:${d}s">${goatShape()}</g></g>`;
}

/** 말뚝과 매어 둔 줄 */
function stake(x: number, loose: boolean): string {
  return `<g class="at-stake">
    <path class="bd-near" d="M${x - 1.2} ${G + 2} L${x - 0.8} ${G - 10} L${x + 0.8} ${G - 10} L${x + 1.2} ${G + 2} Z"/>
    <path class="at-rope" d="${loose ? `M${x} ${G - 8} C${x + 4} ${G - 2} ${x + 10} ${G + 2} ${x + 16} ${G + 1}` : `M${x} ${G - 8} C${x + 6} ${G - 6} ${x + 12} ${G - 16} ${x + 18} ${G - 22}`}"/>
  </g>`;
}

// ── 성막 뜰: 회막 문 앞 ───────────────────────────

/** 성막 장막: 널판 위에 덮은 네 겹 덮개(짙은 해달 가죽), 동쪽 문의 휘장(청·자·홍색 줄), 기둥 다섯 */
function tabernacle(): string {
  const x0 = CX - 66;
  const x1 = CX + 66;
  const top = 150;
  const base = 214;
  const pillars = [0, 1, 2, 3, 4].map((i) => {
    const x = CX - 26 + i * 13;
    return `<rect class="at-pillar" x="${f(x - 1.3)}" y="${top + 8}" width="2.6" height="${base - top - 8}"/>`;
  }).join('');
  const stripes = ['at-thread--b', 'at-thread--p', 'at-thread--s'].map((c, i) =>
    `<path class="at-thread ${c}" d="M${CX - 26} ${top + 20 + i * 4} H${CX + 26}"/>`,
  ).join('');
  return `<g class="at-tab">
    <path class="bd-mid" d="M${x0} ${base} L${x0} ${top + 6} Q${CX} ${top - 6} ${x1} ${top + 6} L${x1} ${base} Z"/>
    <path class="at-cover" d="M${x0 - 3} ${top + 10} Q${CX} ${top - 8} ${x1 + 3} ${top + 10} L${x1 + 2} ${top + 15} Q${CX} ${top - 2} ${x0 - 2} ${top + 15} Z"/>
    <rect class="at-screen" x="${CX - 26}" y="${top + 8}" width="52" height="${base - top - 8}"/>
    ${stripes}
    ${pillars}
  </g>`;
}

/** 구름 기둥: 성막 위에 서 있는 흰 구름 (출 40:34-38). 아주 천천히 피어오른다 */
function cloudPillar(): string {
  const r = rng(1601);
  const puffs = Array.from({ length: 22 }, () => {
    const t = r();
    const y = 146 - t * 136;
    const w = 12 + (1 - t) * 4 + r() * 10;
    return `<ellipse class="at-cloud__puff" style="--d:${f(r() * 9)}s" cx="${f(CX + (r() - 0.5) * 16)}" cy="${f(y)}" rx="${f(w)}" ry="${f(w * (0.7 + r() * 0.4))}"/>`;
  }).join('');
  return `<g class="at-cloud">${puffs}</g>`;
}

/** 뜰의 세마포 포장: 놋 받침의 기둥 사이로 흰 휘장이 이어진다. 문 쪽 가운데는 비어 있다 */
function fence(): string {
  const y0 = 200;
  const y1 = 226;
  const posts: string[] = [];
  for (let x = -W * 2; x <= W * 3; x += 16) {
    if (Math.abs(x - CX) < 80) continue;
    posts.push(`<rect x="${x - 1}" y="${y0 - 3}" width="2" height="${y1 - y0 + 3}"/>`);
  }
  const panel = (a: number, b: number) => `<rect class="at-linen" x="${a}" y="${y0}" width="${b - a}" height="${y1 - y0 - 4}"/>`;
  return `<g class="at-fence">
    ${panel(-W * 2, CX - 80)}${panel(CX + 80, W * 3)}
    <g class="bd-mid">${posts.join('')}</g>
  </g>`;
}

function court(state: 'lots' | 'live' | 'gone'): string {
  const goats = state === 'lots'
    ? `${stake(CX - 52, false)}${stake(CX + 42, false)}${goat(CX - 38, 1.25, false, 'lord', 0)}${goat(CX + 46, 1.25, true, 'azazel', 1.4)}`
    : state === 'live'
      ? `${stake(CX - 18, false)}${goat(CX - 2, 1.45, false, 'live', 0)}`
      : `${stake(CX - 18, true)}`;
  return `<g class="at at--${state}">
    ${hills(190, 'bd-far', 1602)}
    ${cloudPillar()}
    ${tabernacle()}
    ${altar(70, 232, false, 1603)}
    ${fence()}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 226 C-200 224 0 230 ${CX} 228 C400 226 600 230 ${W * 3} 226 L${W * 3} ${H} Z"/>
    <path class="at-ground" d="M${-W * 2} ${H} L${-W * 2} 238 C-100 236 100 242 ${CX} 240 C300 238 500 242 ${W * 3} 238 L${W * 3} ${H} Z"/>
    ${goats}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 252 C-200 250 0 256 ${CX} 254 C400 252 600 256 ${W * 3} 252 L${W * 3} ${H} Z"/>
  </g>`;
}

// ── 지성소 ─────────────────────────────────────────

/** 지성소 안: 금 입힌 널판 벽, 양옆 휘장, 가운데 위에 고인 빛 (구름) */
function holy(): string {
  const r = rng(1611);
  const boards = Array.from({ length: 44 }, (_, i) => {
    const x = -W * 2 + i * 26;
    return `<path class="at-board" d="M${x} 0 V232"/>`;
  }).join('');
  // 휘장 한 폭: 위에서 늘어져 아래로 갈수록 주름이 진다. 청·자·홍색 실 줄, 그룹 날개 무늬(희미한 금선)
  const veil = (side: -1 | 1) => {
    const edge = CX + side * 88;
    const out = CX + side * 640;
    const folds = Array.from({ length: 6 }, (_, i) => {
      const x = edge + side * (8 + i * 12);
      return `<path class="at-veil__fold" d="M${x} 0 C${x - side * 2} 80 ${x + side * 3} 160 ${x + side * 6} 236"/>`;
    }).join('');
    const wings = [70, 150].map((y) => {
      const x = edge + side * 30;
      return `<path class="at-veil__cherub" d="M${x} ${y} q${side * 10} -14 ${side * 22} -6 M${x} ${y} q${side * 10} -4 ${side * 20} 6 M${x} ${y + 4} q${side * 4} 8 ${side * 2} 16"/>`;
    }).join('');
    return `<g class="at-veil">
      <path class="at-veil__cloth" d="M${edge} 0 C${edge + side * 6} 70 ${edge - side * 4} 150 ${edge + side * 10} 236 L${out} 236 L${out} 0 Z"/>
      ${folds}
      <path class="at-thread at-thread--b" d="M${edge + side * 2} 0 C${edge + side * 8} 70 ${edge - side * 2} 150 ${edge + side * 12} 236"/>
      <path class="at-thread at-thread--p" d="M${edge + side * 5} 0 C${edge + side * 11} 70 ${edge + side * 1} 150 ${edge + side * 15} 236"/>
      <path class="at-thread at-thread--s" d="M${edge + side * 8} 0 C${edge + side * 14} 70 ${edge + side * 4} 150 ${edge + side * 18} 236"/>
      ${wings}
    </g>`;
  };
  const haze = Array.from({ length: 9 }, (_, i) =>
    `<ellipse class="at-haze" style="--d:${f(i * 1.3 + r())}s" cx="${f(CX + (r() - 0.5) * 140)}" cy="${f(60 + r() * 120)}" rx="${f(40 + r() * 40)}" ry="${f(10 + r() * 8)}"/>`,
  ).join('');
  return `<g class="at at--holy">
    <rect class="at-dark" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <g class="at-boards">${boards}</g>
    <ellipse class="at-shekinah" cx="${CX}" cy="112" rx="110" ry="80"/>
    ${haze}
    <rect class="at-floor" x="${-W * 2}" y="232" width="${W * 5}" height="${H - 232}"/>
    <path class="bd-floor-line" d="M${-W * 2} 232 H${W * 3}"/>
    ${veil(-1)}${veil(1)}
  </g>`;
}

// ── 진의 가장자리 → 광야 ─────────────────────────

/** 원근: 지평선 높이와 맨 앞(z=1) 땅 높이. 길의 가운데 x는 z에 따라 조금씩 굽는다 */
const HZ = 184;
const G0 = 262;
const yAt = (z: number) => HZ + (G0 - HZ) / z;
const xAt = (z: number) => CX + (26 * Math.sin(z * 0.62 + 0.3)) / Math.sqrt(z);

function road(): string {
  const zs = Array.from({ length: 40 }, (_, i) => 1 + i * i * 0.05);
  const half = (z: number) => 22 / z;
  const left = zs.map((z) => `${f(xAt(z) - half(z))} ${f(yAt(z))}`);
  const right = zs.map((z) => `${f(xAt(z) + half(z))} ${f(yAt(z))}`).reverse();
  return `<path class="at-road" d="M${left.join(' L')} L${right.join(' L')} Z"/>
    <path class="at-road__rut" d="M${zs.map((z) => `${f(xAt(z) - half(z) * 0.4)} ${f(yAt(z))}`).join(' L')}"/>
    <path class="at-road__rut" d="M${zs.map((z) => `${f(xAt(z) + half(z) * 0.4)} ${f(yAt(z))}`).join(' L')}"/>`;
}

/** 등을 보이고 서서 광야 쪽을 바라보는 사람 (원점 = 발). 여자는 너울, 아이는 작게 */
function watcher(x: number, ground: number, h: number, kind: 'man' | 'woman' | 'child', d: number): string {
  const w = h * (kind === 'child' ? 0.34 : 0.3);
  const head = h * 0.12;
  const top = -h + head * 2.1;
  const body = kind === 'woman'
    ? `<path d="M${f(-w * 0.42)} ${f(top - head * 1.6)} Q0 ${f(top - head * 3.2)} ${f(w * 0.42)} ${f(top - head * 1.6)} L${f(w * 0.62)} 0 L${f(-w * 0.62)} 0 Z"/>`
    : `<path d="M${f(-w * 0.5)} ${f(top)} Q0 ${f(top - head * 0.5)} ${f(w * 0.5)} ${f(top)} L${f(w * 0.6)} 0 L${f(-w * 0.6)} 0 Z"/>`;
  // 위치는 바깥 g의 transform 속성, 숨쉬기(CSS transform)는 안쪽 g — 둘이 겹치면 CSS가 속성을 덮어쓴다
  return `<g transform="translate(${f(x)} ${f(ground)})"><g class="at-watch" style="--d:${f(d)}s">
    <circle cx="0" cy="${f(top - head * 0.9)}" r="${f(head)}"/>${body}
  </g></g>`;
}

function edge(): string {
  const r = rng(1621);
  const mesas = `<path class="bd-far" d="M${-W * 2} ${HZ} L-300 ${HZ} L-280 166 L-200 164 L-186 ${HZ} L40 ${HZ} L56 172 L104 170 L116 ${HZ} L300 ${HZ} L318 162 L392 160 L404 ${HZ} L640 ${HZ} L654 170 L720 168 L734 ${HZ} L${W * 3} ${HZ} L${W * 3} ${HZ + 2} L${-W * 2} ${HZ + 2} Z"/>`;
  const plain = `<path class="at-plain" d="M${-W * 2} ${HZ} L${W * 3} ${HZ} L${W * 3} ${H} L${-W * 2} ${H} Z"/>`;
  const scrub = Array.from({ length: 60 }, () => {
    const z = 1.4 + r() * 18;
    const side = r() < 0.5 ? -1 : 1;
    const x = xAt(z) + side * (30 / z + r() * 260 / Math.sqrt(z));
    const s = 3.2 / z;
    return `<path class="at-scrub" d="M${f(x - 3 * s)} ${f(yAt(z))} Q${f(x)} ${f(yAt(z) - 4 * s)} ${f(x + 3 * s)} ${f(yAt(z))} Z"/>`;
  }).join('');
  // 진의 끝자락: 양옆의 장막들 (길 양쪽으로 비켜서)
  const tents = [[-200, 244, 0.6], [-110, 248, 0.66], [-20, 244, 0.54], [58, 247, 0.5], [118, 242, 0.36], [284, 242, 0.36], [344, 247, 0.5], [420, 244, 0.54], [510, 248, 0.66], [600, 244, 0.6]]
    .map(([x, y, s]) => tent(x, y, s)).join('');
  // 바라보는 사람들: 장막 앞, 길 양옆에 등을 보이고 섰다. 폰에서도 보이게 길 가까이(x 120~180, 222~285)에도
  const people: string[] = [];
  const spots: [number, number, 'man' | 'woman' | 'child'][] = [
    [-80, 252, 'man'], [-66, 251, 'woman'], [-4, 253, 'man'], [10, 252, 'child'], [70, 251, 'woman'], [84, 252, 'man'],
    [124, 247, 'man'], [136, 248, 'woman'], [148, 247, 'child'], [162, 246, 'man'], [174, 245, 'woman'],
    [248, 245, 'man'], [260, 246, 'child'], [272, 247, 'woman'], [284, 248, 'man'], [296, 247, 'woman'],
    [318, 252, 'man'], [332, 251, 'child'], [400, 252, 'woman'], [414, 253, 'man'], [480, 251, 'man'],
  ];
  spots.forEach(([x, y, k], i) => people.push(watcher(x + (r() - 0.5) * 3, y, (k === 'child' ? 13 : 19) + r() * 3, k, r() * 4 + i * 0.1)));
  return `<g class="at at--edge">
    ${plain}${mesas}
    ${road()}
    ${scrub}
    <g class="at-camp">${tents}</g>
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 258 C-100 256 60 262 120 262 L140 ${H} Z"/>
    <path class="bd-near" d="M${W * 3} ${H} L${W * 3} 258 C500 256 340 262 280 262 L260 ${H} Z"/>
    <g class="at-watchers">${people.join('')}</g>
  </g>`;
}

export function atoneArt(state: AtoneState): string {
  if (state === 'holy') return holy();
  if (state === 'edge') return edge();
  return court(state);
}

// ── 효과 공통 ────────────────────────────────────

function overlay(scene: HTMLElement, cls: string): { layer: HTMLDivElement; svg: SVGSVGElement } {
  const layer = document.createElement('div');
  layer.className = `fx-atone ${cls}`;
  const box = scene.querySelector<HTMLElement>('.scene__backdrop');
  const rect = (box ?? scene).getBoundingClientRect();
  const mode = rect.width / Math.max(1, rect.height) > W / H ? 'xMidYMax meet' : 'xMidYMax slice';
  layer.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="${mode}" aria-hidden="true"></svg>`;
  scene.append(layer);
  return { layer, svg: layer.querySelector('svg')! };
}

function finish(layer: HTMLElement, after: number) {
  setTimeout(() => layer.classList.add('is-out'), after);
  setTimeout(() => layer.remove(), after + 2200);
}

// ── cast-lots: 제비뽑기 (16:8) ─────────────────────

export function playLots(scene: HTMLElement, rm: boolean): void {
  const { layer, svg } = overlay(scene, 'fx-lots');
  // 염소 두 마리 위 (배경 atone-lots: 왼쪽 = 여호와께, 오른쪽 = 아사셀에게)
  const spots = [
    { x: CX - 34, label: '여호와께', cls: 'is-lord' },
    { x: CX + 42, label: '아사셀에게', cls: 'is-azazel' },
  ];
  svg.innerHTML = spots.map((s, i) => `
    <g class="lt ${s.cls}" data-i="${i}" transform="translate(${s.x} 196)">
      <circle class="lt__glow" r="22"/>
      <g class="lt__stone"><rect x="-6" y="-8" width="12" height="16" rx="3"/><path class="lt__mark" d="M-3 -3 h6 M-3 1 h6"/></g>
      <text class="lt__label" y="-16" text-anchor="middle">${s.label}</text>
    </g>`).join('');
  const groups = Array.from(svg.querySelectorAll<SVGGElement>('.lt'));
  const tl = gsap.timeline();
  if (rm) {
    tl.fromTo(groups, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    groups.forEach((g) => g.classList.add('is-shown'));
    finish(layer, 6000);
    return;
  }
  groups.forEach((g, i) => {
    const stone = g.querySelector('.lt__stone');
    const at = i * 1.6;
    // 제비가 아래(제사장의 손 높이)에서 튀어 올라 뒤집히며 떠오른다
    tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.4 }, at)
      .fromTo(stone, { y: 40, rotation: 0, svgOrigin: '0 0' }, { y: 0, rotation: 540, duration: 1.1, ease: 'power3.out' }, at)
      .add(() => g.classList.add('is-shown'), at + 1.05);
  });
  finish(layer, 9000);
}

// ── incense-cloud: 향연이 속죄소를 가린다 (16:12-13) ─────

export function playIncense(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-atone fx-incense';
  const n = rm ? 8 : 26;
  layer.innerHTML = Array.from({ length: n }, (_, i) => {
    const x = 50 + (Math.random() - 0.5) * 34;
    const y = 12 + Math.random() * 30;
    return `<i style="--x:${f(x)}%; --y:${f(y)}%; --s:${f(0.7 + Math.random() * 0.9)}; --d:${f(i * 0.16)}s; --dx:${f((Math.random() - 0.5) * 30)}%"></i>`;
  }).join('');
  scene.append(layer);
  finish(layer, rm ? 4000 : 11000);
}

// ── confess: 모든 죄가 산 염소의 머리 위로 (16:21) ─────────

export function playConfess(scene: HTMLElement, rm: boolean): void {
  const { layer, svg } = overlay(scene, 'fx-confess');
  // 배경 atone-live의 염소 머리 (goat(CX - 2, 1.45): 머리 ≈ 원점 + (20, -27) × 1.45)
  const hx = CX - 2 + 20 * 1.45;
  const hy = G - 27 * 1.45;
  const darken = () => scene.querySelectorAll('.at-goat[data-goat="live"]').forEach((g) => g.classList.add('is-laden'));
  const ring = `<circle class="cn-sink" cx="${f(hx)}" cy="${f(hy)}" r="6"/>`;
  svg.innerHTML = ring;
  if (rm) {
    darken();
    finish(layer, 1500);
    return;
  }
  const NS = 'http://www.w3.org/2000/svg';
  const N = 60;
  for (let i = 0; i < N; i++) {
    const a = Math.random() * Math.PI * 2;
    const sx = hx + Math.cos(a) * (220 + Math.random() * 260);
    const sy = Math.min(250, hy + Math.sin(a) * (150 + Math.random() * 60));
    const c = document.createElementNS(NS, 'path');
    // 티끌 하나: 먹물이 번진 듯한 작은 조각
    const s = 1.6 + Math.random() * 2;
    c.setAttribute('d', `M${-s} 0 Q0 ${-s * 1.4} ${s} 0 Q0 ${s * 1.2} ${-s} 0 Z`);
    c.setAttribute('class', 'cn-mote');
    svg.append(c);
    const dur = 2.6 + Math.random() * 1.6;
    const delay = (i / N) * 3.2;
    const mx = (sx + hx) / 2 + (Math.random() - 0.5) * 120;
    const my = Math.min(sy, hy) - 40 - Math.random() * 60;
    const p = { t: 0 };
    gsap.fromTo(c, { opacity: 0 }, { opacity: 0.9, duration: 0.6, delay });
    gsap.to(p, {
      t: 1,
      duration: dur,
      delay,
      ease: 'power2.in',
      onUpdate: () => {
        const t = p.t;
        const x = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * mx + t * t * hx;
        const y = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * my + t * t * hy;
        c.setAttribute('transform', `translate(${f(x)} ${f(y)}) scale(${f(1 - t * 0.6)})`);
      },
      onComplete: () => c.remove(),
    });
  }
  const sink = svg.querySelector('.cn-sink');
  gsap.fromTo(sink, { opacity: 0, attr: { r: 4 } }, { opacity: 0.9, attr: { r: 12 }, duration: 3.6, delay: 1.2, ease: 'power1.in' });
  gsap.to(sink, { opacity: 0, attr: { r: 3 }, duration: 1.2, delay: 5.4, ease: 'power2.in' });
  setTimeout(darken, 4200);
  finish(layer, 6800);
}

// ── scapegoat: 무인지경으로 (16:21-22) ─────────────

export function playScapegoat(scene: HTMLElement, rm: boolean): void {
  const { layer, svg } = overlay(scene, 'fx-scapegoat');
  // 정한 사람(등을 보임) + 줄 + 어두워진 염소. 원점 = 길 가운데 발 높이
  svg.innerHTML = `
    <g class="sg-dust"></g>
    <g class="sg-goat"><g class="sg-goat__flip"><g class="at-goat is-laden is-walking">${goatShape()}</g></g></g>
    <g class="sg-man">
      <g class="sg-man__body">
        <path class="sg-man__foot sg-man__foot--a" d="M-4.6 0 L-1.6 0 L-1.8 -5 L-4.4 -5 Z"/>
        <path class="sg-man__foot sg-man__foot--b" d="M1.6 0 L4.6 0 L4.4 -5 L1.8 -5 Z"/>
        <path d="M-7 -3 L-5.4 -27 Q0 -31 5.4 -27 L7 -3 Q0 -1 -7 -3 Z"/>
        <path d="M-3.8 -30 C-4.4 -36 -2.4 -39.6 0 -39.6 C2.4 -39.6 4.4 -36 3.8 -30 Z"/>
        <path d="M-5.4 -27 L-9.6 -16 L-8 -15 L-4 -24 Z"/>
        <path class="sg-staff" d="M7.4 -38 L8.4 -38 L8.9 1 L7.9 1 Z"/>
      </g>
      <path class="sg-rope" d="M-9 -15.4 C-12 -12 -15 -12 -18 -14.4"/>
    </g>`;
  const man = svg.querySelector<SVGGElement>('.sg-man')!;
  const goat = svg.querySelector<SVGGElement>('.sg-goat')!;
  const flip = svg.querySelector<SVGGElement>('.sg-goat__flip')!;
  const rope = svg.querySelector<SVGPathElement>('.sg-rope')!;
  const dust = svg.querySelector<SVGGElement>('.sg-dust')!;
  // 염소는 사람 왼쪽에서 따라간다. 길이 굽는 쪽으로 몸을 돌린다
  const m = { z: 1.15, o: 0, back: 0 };
  const g = { z: 1.15, o: 0, dx: -16 };
  const place = () => {
    const ms = 1.45 / m.z;
    man.setAttribute('transform', `translate(${f(xAt(m.z))} ${f(yAt(m.z))}) scale(${f(ms)})`);
    man.style.opacity = String(m.o);
    const gs = 1.2 / g.z;
    goat.setAttribute('transform', `translate(${f(xAt(g.z) + g.dx * gs)} ${f(yAt(g.z))}) scale(${f(gs)})`);
    goat.style.opacity = String(g.o);
    // 길이 휘는 방향 (z가 커질 때 x가 줄면 왼쪽을 본다)
    const dir = xAt(g.z + 0.3) < xAt(g.z) ? -1 : 1;
    flip.setAttribute('transform', `scale(${dir} 1)`);
    rope.style.opacity = String(Math.min(m.o, g.o) * (Math.abs(m.z - g.z) < 0.4 ? 1 : 0));
  };
  place();
  const tl = gsap.timeline();
  if (rm) {
    m.z = g.z = 3;
    tl.to([m, g], { o: 1, duration: 0.6, onUpdate: place })
      .to([m, g], { o: 0, duration: 1, delay: 3, onUpdate: place });
    finish(layer, 5200);
    return;
  }
  // 1) 둘이 함께 진을 떠나 길을 따라 작아진다 (~9초)
  tl.to([m, g], { o: 1, duration: 1, onUpdate: place }, 0)
    .to([m, g], { z: 9, duration: 9, ease: 'sine.inOut', onUpdate: place }, 0.2)
    // 2) 무인지경: 사람이 멈춰 줄을 풀고, 염소 혼자 계속 가서 지평선 너머로 (~4초)
    .to(g, { z: 46, duration: 4.4, ease: 'power1.in', onUpdate: place }, 9.4)
    .to(g, { dx: 0, duration: 1.2, onUpdate: place }, 9.4)
    .to(g, { o: 0, duration: 1.4, ease: 'power1.in', onUpdate: place }, 12.4)
    // 3) 사람은 돌아서서 진 쪽으로 몇 걸음, 그리고 흐려진다
    .add(() => man.classList.add('is-back'), 10.4)
    .to(m, { z: 6.5, duration: 3.4, ease: 'sine.inOut', onUpdate: place }, 10.8)
    .to(m, { o: 0, duration: 1.6, onUpdate: place }, 12.8);
  // 발밑에서 이는 흙먼지 (0.45초마다)
  let last = 0;
  const NS = 'http://www.w3.org/2000/svg';
  tl.eventCallback('onUpdate', () => {
    const t = tl.time();
    if (t - last < 0.45 || t > 12) return;
    last = t;
    const z = g.z;
    const s = 1.2 / z;
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('class', 'sg-puff');
    c.setAttribute('cx', f(xAt(z) + g.dx * s));
    c.setAttribute('cy', f(yAt(z) - 1));
    c.setAttribute('r', f(2 * s));
    dust.append(c);
    gsap.to(c, { attr: { r: 7 * s, cy: yAt(z) - 6 * s }, opacity: 0, duration: 2.2, ease: 'power1.out', onComplete: () => c.remove() });
  });
  finish(layer, 14500);
}
