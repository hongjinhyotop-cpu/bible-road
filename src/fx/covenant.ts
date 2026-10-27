// 별을 세어 보라 · 쪼갠 고기 사이의 횃불 (창 15, A급 gen-15-stars).
// 배경 그림 'cov-count' · 'cov-pieces'와 효과 'kites'(솔개) · 'torch-pass'(연기 나는 풀무와 타는 횃불).
//  - cov-count  : 장막 밖 낮은 언덕 위의 넓은 밤하늘. 처음엔 별이 몇 개뿐인데, 시간이 갈수록 하나둘, 그러다 셀 수 없이 켜진다.
//                 나중엔 은하수 띠까지 떠오른다 (15:5 "하늘을 우러러 뭇별을 셀 수 있나 보라"). 시그니처 그림.
//  - cov-pieces : 쪼갠 고기를 마주 대하여 놓은 두 줄 (15:10). 피·살은 그리지 않는다 — 천을 덮은 낮은 덩이들이
//                 가운데 길을 사이에 두고 멀어지며 두 줄로 놓여 있고, 맨 끝에 쪼개지 않은 새 두 마리.
//                 보는 쪽에서 지평선까지 길이 이어진다 (원근). 밤에는 땅이 아주 어두워진다.
//  - kites      : 솔개 몇 마리가 하늘을 돌다가 고기 쪽으로 내리꽂혔다가, 쫓겨 흩어진다 (15:11)
//  - torch-pass : 해가 져서 어두울 때, 연기 나는 풀무와 타는 횃불이 쪼갠 고기 사이 길을 따라 지평선 쪽에서
//                 보는 쪽으로 천천히 지나온다. 들고 있는 사람은 없다 (15:17). 약 12초.
// 폰(세로 화면)에서는 x 100~300만 보인다 → 길과 고기 줄은 가운데에서 조금 왼쪽(x 174)에. 인물은 오른쪽에 비켜 선다(spread).
import gsap from 'gsap';
import { W, H, rng, hills, tree } from './backdrop';

/** 원근: 지평선 높이와 맨 앞(z=1) 땅 높이 */
const HZ = 190;
const G0 = 252;
/** 쪼갠 고기 사이 길의 가운데 (폰에서 혼자 선 인물은 오른쪽에 서므로 조금 왼쪽으로) */
const CX = 174;
const yAt = (z: number) => HZ + (G0 - HZ) / z;

// ── 별을 세어 보라 ──────────────────────────────

/**
 * 하늘의 별. 켜지는 때(--d)가 처음엔 드문드문, 갈수록 촘촘하다 (켜진 별 수 ∝ 시간²).
 * 큰 별 몇 개만 계속 반짝인다 (나머지는 한 번 켜지고 그대로 — 가볍게).
 */
function countStars(): string {
  const r = rng(1501);
  const out: string[] = [];
  const add = (x: number, y: number, d: number, big: boolean, tiny = false) => {
    const rad = big ? 0.95 + r() * 0.7 : tiny ? 0.22 + r() * 0.2 : 0.3 + r() * 0.45;
    out.push(`<circle class="cov-star${big ? ' is-big' : ''}" style="--d:${d.toFixed(2)}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(2)}"/>`);
  };
  // 처음 몇 개: 밝은 별, 거의 바로
  for (let i = 0; i < 9; i++) add(110 + r() * 180, 14 + r() * 120, 0.3 + i * 0.45, true);
  // 폰에서 보이는 가운데: 시간이 갈수록 촘촘하게
  const N = 300;
  for (let i = 0; i < N; i++) {
    const big = r() < 0.06;
    add(70 + r() * 260, r() * 192, 2.5 + 26 * Math.sqrt(i / N) + r() * 1.2, big);
  }
  // 넓은 화면의 양옆
  for (let i = 0; i < 220; i++) {
    const x = r() < 0.5 ? -W * 1.4 + r() * (W * 1.4 + 70) : 330 + r() * W * 1.4;
    add(x, r() * 192, 3 + 26 * Math.sqrt(i / 220) + r(), r() < 0.05);
  }
  // 은하수 띠 위의 잔별 (나중에, 띠와 함께)
  for (let i = 0; i < 150; i++) {
    const t = r();
    const x = -160 + t * 720;
    const y = 190 - t * 175 + (r() - 0.5) * 34;
    add(x, y, 14 + r() * 16, false, true);
  }
  return `<g class="cov-stars">${out.join('')}</g>`;
}

/** 은하수: 지평선 왼쪽 아래에서 오른쪽 위로 비스듬히 걸친 흐린 빛의 띠 */
function milkyWay(): string {
  return `<g class="cov-milky">
    <defs>
      <linearGradient id="cov-milky-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e8e2f4" stop-opacity="0"/>
        <stop offset="0.5" stop-color="#f2ead8" stop-opacity="0.5"/>
        <stop offset="1" stop-color="#e8e2f4" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <g transform="rotate(-14 200 110)">
      <rect class="cov-milky__band" x="-260" y="88" width="920" height="46" fill="url(#cov-milky-g)"/>
      <rect class="cov-milky__core" x="-120" y="104" width="640" height="14" fill="url(#cov-milky-g)"/>
    </g>
  </g>`;
}

/** 장막 밖 낮은 언덕: 왼쪽에 아브람의 장막(문에 등잔빛), 오른쪽에 상수리나무 한 그루 */
function nightHill(): string {
  return `<g class="cov-dim">
    ${hills(214, 'bd-far', 1511)}
    <path class="bd-mid" d="M-800 260 L-800 226 C-500 222 -220 230 20 226 C120 224 170 230 230 232 C300 233 360 226 460 224 C700 222 1000 230 1200 226 L1200 260 Z"/>
    <g class="bd-mid bd-tent" transform="translate(132 228) scale(0.62)">
      <path d="M-62 0 L-54 -26 L-30 -40 L-18 -34 L0 -46 L18 -34 L30 -40 L54 -26 L62 0 Z"/>
      <path class="cov-tentdoor" d="M-10 0 L-8 -26 L0 -30 L8 -26 L10 0 Z"/>
      <path d="M-70 0 L-54 -26 M70 0 L54 -26" fill="none" stroke="currentColor" stroke-width="0.8"/>
    </g>
    ${tree(318, 230, 70, 'bd-mid', 1512)}
    <path class="bd-near" d="M-800 260 L-800 246 C-400 242 -100 252 120 250 C220 249 300 254 420 250 C700 244 1000 252 1200 248 L1200 260 Z"/>
  </g>`;
}

// ── 쪼갠 고기 ─────────────────────────────────

/** 천을 덮은 낮은 덩이 하나 (쪼갠 짐승의 반쪽). 크기 s, 좌우 dir(-1 왼쪽 줄 / 1 오른쪽 줄) */
function piece(x: number, y: number, s: number, dir: number, w: number, h: number, seed: number): string {
  const r = rng(seed);
  const hw = w / 2;
  const top = h * (0.85 + r() * 0.3);
  // 가운데 길 쪽(안쪽)이 조금 더 높다 — 쪼갠 면이 서로 마주 본다
  const inH = top * 1.1;
  const outH = top * 0.75;
  const ix = dir < 0 ? hw : -hw;
  const body = `M${-hw} 0 C${-hw} ${-(dir < 0 ? outH : inH) * 0.7} ${-hw * 0.5} ${-top} ${(ix * 0.1).toFixed(1)} ${-top} C${hw * 0.5} ${-top} ${hw} ${-(dir < 0 ? inH : outH) * 0.7} ${hw} 0 Z`;
  // 덮은 천의 주름과 늘어진 자락
  const folds = [0.25, 0.55, 0.8]
    .map((t) => {
      const fx = -hw + w * t;
      return `M${fx.toFixed(1)} ${(-top * (0.5 + r() * 0.3)).toFixed(1)} Q${(fx + (r() - 0.5) * 4).toFixed(1)} ${(-top * 0.25).toFixed(1)} ${(fx + (r() - 0.5) * 3).toFixed(1)} 0`;
    })
    .join(' ');
  const fringe = `M${-hw - 1} 0 L${-hw - 2.5} 1.6 M${hw + 1} 0 L${hw + 2.5} 1.6`;
  return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)})">
    <ellipse class="cov-shade" cx="0" cy="0.6" rx="${(hw + 4).toFixed(1)}" ry="2.4"/>
    <path class="cov-cloth" d="${body}"/>
    <path class="cov-fold" d="${folds} ${fringe}"/>
    <path class="cov-rim" d="M${(-hw * 0.6).toFixed(1)} ${(-top * 0.86).toFixed(1)} C${(-hw * 0.2).toFixed(1)} ${(-top * 1.02).toFixed(1)} ${(hw * 0.3).toFixed(1)} ${(-top * 1.0).toFixed(1)} ${(hw * 0.6).toFixed(1)} ${(-top * 0.84).toFixed(1)}"/>
  </g>`;
}

/** 쪼개지 않은 새 (산비둘기·집비둘기 새끼): 작게 엎드린 새 모양 */
function dove(x: number, y: number, s: number, flip: boolean): string {
  return `<g class="cov-dove" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(flip ? -s : s).toFixed(3)} ${s.toFixed(3)})">
    <ellipse class="cov-shade" cx="0" cy="0.5" rx="9" ry="1.6"/>
    <path d="M-8 0 C-8 -3 -5 -5.6 -1 -5.8 C1 -7.6 3.6 -8.2 5.4 -7 C6.6 -6.2 7 -5 8.8 -4.6 L6.8 -3.6 C6.6 -1.6 5 0 2 0 Z"/>
    <path class="cov-fold" d="M-6 -2.4 Q-1 -4.2 3 -2.6"/>
  </g>`;
}

/** 두 줄로 마주 놓은 고기와 그 사이 길. 보는 쪽에서 지평선까지 */
function pieces(): string {
  // [z, 너비, 높이] — 앞에서부터: 암소, 암염소, 수양 (쪼갠 반쪽 둘씩, 좌우로)
  const rows: [number, number, number][] = [
    [1.18, 46, 15],
    [1.85, 36, 12],
    [3.0, 32, 11],
  ];
  const lane = 36; // 길 가운데에서 고기까지 (z=1 기준)
  const out: string[] = [];
  rows.forEach(([z, w, h], i) => {
    const y = yAt(z);
    const s = 1 / z;
    out.push(piece(CX - (lane + w / 2) * s, y, s, -1, w, h, 1520 + i));
    out.push(piece(CX + (lane + w / 2) * s, y, s, 1, w, h, 1530 + i));
  });
  // 맨 끝: 쪼개지 않은 새 두 마리, 한 마리씩 양쪽에
  const zb = 4.6;
  out.push(dove(CX - (lane + 6) / zb, yAt(zb), 1 / zb, true));
  out.push(dove(CX + (lane + 6) / zb, yAt(zb), 1 / zb, false));
  // 길: 맨 앞은 넓고, 지평선에서 한 점으로
  // 땅에 난 희미한 자국 두 줄 (밝은 삼각형처럼 보이지 않게, 가장자리만)
  const track = `M${CX - lane * 0.55} ${H} L${CX - 1.2} ${HZ + 1} M${CX + lane * 0.55} ${H} L${CX + 1.2} ${HZ + 1}`;
  return `<path class="cov-lane" d="M${CX - lane * 0.55} ${H} L${CX - 1.2} ${HZ + 1} L${CX + 1.2} ${HZ + 1} L${CX + lane * 0.55} ${H} Z"/><path class="cov-track" d="${track}"/>${out.reverse().join('')}`;
}

/** 헤브론 쪽 낮은 언덕, 마른 덤불, 흩어진 돌 */
function piecesField(): string {
  const r = rng(1541);
  const scrub = Array.from({ length: 14 }, () => {
    const z = 1.3 + r() * 5;
    const side = r() < 0.5 ? -1 : 1;
    const x = CX + side * (80 + r() * 260) / z;
    const y = yAt(z);
    const s = (5 + r() * 4) / z;
    return `<ellipse cx="${x.toFixed(1)}" cy="${(y - s * 0.3).toFixed(1)}" rx="${(s * 1.4).toFixed(1)}" ry="${(s * 0.55).toFixed(1)}"/>`;
  }).join('');
  return `
    ${hills(182, 'bd-far', 1542)}
    ${tree(70, 188, 34, 'bd-far', 1543)}${tree(342, 187, 30, 'bd-far', 1544)}
    <path class="bd-mid cov-ground" d="M-800 ${H} L-800 ${HZ} C-400 ${HZ - 2} 0 ${HZ + 1} 200 ${HZ} C400 ${HZ - 1} 800 ${HZ + 2} 1200 ${HZ} L1200 ${H} Z"/>
    <g class="bd-mid cov-scrub">${scrub}</g>`;
}

export function covenantArt(kind: 'count' | 'pieces'): string {
  if (kind === 'count') return `${milkyWay()}${countStars()}${nightHill()}`;
  return `<g class="cov-land">${piecesField()}${pieces()}</g>`;
}

// ── 효과 ──────────────────────────────────────

/** 효과 층을 배경과 똑같은 자리·비율로 깐다 (그래야 고기 줄 사이 길과 맞는다) */
function overlay(scene: HTMLElement, cls: string): { layer: HTMLDivElement; svg: SVGSVGElement } {
  const layer = document.createElement('div');
  layer.className = cls;
  const box = scene.querySelector<HTMLElement>('.scene__backdrop');
  const rect = (box ?? scene).getBoundingClientRect();
  const mode = rect.width / Math.max(1, rect.height) > W / H ? 'xMidYMax meet' : 'xMidYMax slice';
  layer.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="${mode}" aria-hidden="true"></svg>`;
  scene.append(layer);
  return { layer, svg: layer.querySelector('svg')! };
}

const NS = 'http://www.w3.org/2000/svg';
const make = (tag: string, attrs: Record<string, string | number>, parent: Element) => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
  parent.append(e);
  return e;
};

/**
 * 솔개 (15:11 "솔개가 그 사체 위에 내릴 때에는 아브람이 쫓았더라").
 * 서너 마리가 높이 돌다가 차례로 고기 쪽으로 내리꽂히고, 땅에 닿기 전에 놀라 날개를 치며 흩어진다.
 */
export function playKites(scene: HTMLElement, rm: boolean): void {
  const { layer, svg } = overlay(scene, 'fx-kites');
  const bird = (i: number) => {
    const g = make('g', { class: 'kite' }, svg) as SVGGElement;
    const wings = make('g', { class: 'kite__wings' }, g);
    // 날개 편 솔개: 갈라진 꼬리, 길고 꺾인 날개
    make('path', { d: 'M0 -1.2 C-4 -3 -9 -3.4 -15 -1.6 C-11 -1.2 -8 0 -6 1.2 C-4 0.6 -2 0.6 0 1.4 C2 0.6 4 0.6 6 1.2 C8 0 11 -1.2 15 -1.6 C9 -3.4 4 -3 0 -1.2 Z' }, wings);
    make('path', { d: 'M-1.2 1 L-2.6 6 L0 4.6 L2.6 6 L1.2 1 Z' }, g);
    make('ellipse', { cx: 0, cy: -0.4, rx: 1.4, ry: 2.6 }, g);
    g.style.setProperty('--flap', `${(0.5 + i * 0.07).toFixed(2)}s`);
    return g;
  };
  const n = rm ? 2 : 4;
  const tl = gsap.timeline({ onComplete: () => layer.remove() });
  for (let i = 0; i < n; i++) {
    const g = bird(i);
    const side = i % 2 ? 1 : -1;
    const s0 = 0.5 + (i % 3) * 0.12;
    const p = { a: 0, x: 200 + side * 160, y: 20 + i * 10, s: s0, r: 0 };
    const set = () => g.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.r.toFixed(1)}) scale(${p.s.toFixed(2)})`);
    set();
    if (rm) {
      tl.fromTo(g, { opacity: 0 }, { opacity: 0.9, duration: 0.6 }, i * 0.3)
        .to(p, { x: 200 - side * 30, duration: 3, ease: 'sine.inOut', onUpdate: set }, i * 0.3)
        .to(g, { opacity: 0, duration: 0.8 }, 2.8);
      continue;
    }
    const t0 = i * 0.9;
    // 높이 돌기 → 내리꽂기 → 놀라 솟구쳐 흩어지기
    tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.8 }, t0)
      .to(p, { x: 200 - side * 40, y: 34 + i * 6, r: side * -8, duration: 2.2, ease: 'sine.inOut', onUpdate: set }, t0)
      .to(p, { x: CX + side * (14 + i * 6), y: yAt(1.6 + i * 0.5) - 18, s: s0 * 1.35, r: side * 26, duration: 1.1, ease: 'power2.in', onUpdate: set }, t0 + 2.2)
      .add(() => g.classList.add('is-flap'), t0 + 3.1)
      .to(p, { x: 200 + side * 230, y: -30 - i * 8, s: s0 * 0.8, r: side * -20, duration: 2.2, ease: 'power2.out', onUpdate: set }, t0 + 3.3)
      .to(g, { opacity: 0, duration: 0.8 }, t0 + 4.6);
  }
  setTimeout(() => layer.remove(), 12000);
}

/**
 * 연기 나는 풀무와 타는 횃불 (15:17). 들고 있는 사람 없이, 쪼갠 고기 사이 길을 따라
 * 지평선 쪽 작은 불빛에서 보는 쪽으로 천천히 다가오며 커지고, 맨 앞에서 스러진다. 지나간 자리에 연기가 남는다.
 */
export function playTorchPass(scene: HTMLElement, rm: boolean): void {
  const { layer, svg } = overlay(scene, 'fx-torch');
  svg.innerHTML = `
    <defs>
      <radialGradient id="tp-glow-g"><stop offset="0" stop-color="#ffd9a0" stop-opacity="0.75"/><stop offset="0.35" stop-color="#f29a48" stop-opacity="0.28"/><stop offset="1" stop-color="#f29a48" stop-opacity="0"/></radialGradient>
      <radialGradient id="tp-flame-g" cx="0.5" cy="0.75" r="0.7"><stop offset="0" stop-color="#fff6d6"/><stop offset="0.35" stop-color="#ffc764"/><stop offset="0.75" stop-color="#e2602a" stop-opacity="0.85"/><stop offset="1" stop-color="#b8361a" stop-opacity="0"/></radialGradient>
    </defs>
    <g class="tp-smoke"></g>
    <g class="tp-pair">
      <circle class="tp-glow" cx="0" cy="-14" r="62"/>
      <!-- 연기 나는 풀무: 아가리가 벌건 낮은 토기 화로 -->
      <g class="tp-pot" transform="translate(-9 0)">
        <path class="tp-pot__body" d="M-9 0 C-11 -3 -11.6 -8 -10 -12 C-9 -14.6 -7.6 -16 -6.4 -16.6 L6.4 -16.6 C7.6 -16 9 -14.6 10 -12 C11.6 -8 11 -3 9 0 Z"/>
        <ellipse class="tp-pot__mouth" cx="0" cy="-16.6" rx="6.6" ry="1.6"/>
        <path class="tp-pot__band" d="M-10.4 -9 Q0 -7.4 10.4 -9" fill="none"/>
        <g class="tp-flame tp-flame--pot"><path d="M-4.6 -16.4 C-5 -20 -2.4 -21.6 -1.6 -25 C0 -22.6 1.4 -23.4 2 -26.4 C3.6 -23 5.4 -20.4 4.6 -16.4 Z"/></g>
      </g>
      <!-- 타는 횃불: 공중에 곧게 선 나무 자루, 끝에서 크게 타는 불 -->
      <g class="tp-torch" transform="translate(11 -6)">
        <path class="tp-torch__shaft" d="M-1.1 2 L-1.5 -26 L1.5 -26 L1.1 2 Z"/>
        <path class="tp-torch__wrap" d="M-2 -24 L2 -24 L2.2 -30 L-2.2 -30 Z"/>
        <g class="tp-flame tp-flame--torch"><path d="M-5 -29 C-6.6 -35 -3 -38 -2.4 -44 C-0.4 -40 1.4 -41.4 1.8 -47 C4.6 -41 6.8 -36 5 -29 Z"/></g>
      </g>
    </g>`;
  const pair = svg.querySelector<SVGGElement>('.tp-pair')!;
  const smoke = svg.querySelector<SVGGElement>('.tp-smoke')!;
  const p = { z: 7.5, o: 0 };
  const place = () => {
    const s = 1.5 / p.z;
    pair.setAttribute('transform', `translate(${CX} ${yAt(p.z).toFixed(2)}) scale(${s.toFixed(3)})`);
    pair.style.opacity = String(p.o);
  };
  place();
  const tl = gsap.timeline({ onComplete: () => { layer.classList.add('is-out'); setTimeout(() => layer.remove(), 3000); } });
  if (rm) {
    p.z = 2.4;
    place();
    tl.to(p, { o: 1, duration: 0.6, onUpdate: place }).to(p, { o: 0, duration: 0.8, delay: 3.4, onUpdate: place });
    return;
  }
  // 지평선의 작은 불씨로 떠올라 → 고기 줄 사이를 지나 다가오고 → 맨 앞에서 스러진다
  tl.to(p, { o: 1, duration: 1.6, ease: 'power1.out', onUpdate: place }, 0)
    .to(p, { z: 1.05, duration: 11, ease: 'sine.inOut', onUpdate: place }, 0.4)
    .to(p, { o: 0, duration: 1.8, ease: 'power1.in', onUpdate: place }, 9.8);
  // 지나간 자리에 연기: 0.3초마다 화로 위에서 한 덩이씩 피어 올라 흩어진다
  let last = 0;
  tl.eventCallback('onUpdate', () => {
    const t = tl.time();
    if (t - last < 0.32 || t > 10.6) return;
    last = t;
    const s = 1.5 / p.z;
    const y = yAt(p.z) - 18 * s;
    const c = make('circle', { class: 'tp-puff', cx: (CX - 9 * s).toFixed(1), cy: y.toFixed(1), r: (3 * s).toFixed(2) }, smoke);
    gsap.to(c, {
      attr: { cy: y - (30 + Math.random() * 16) * s, cx: CX - 9 * s + (Math.random() * 16 - 4) * s, r: (11 + Math.random() * 6) * s },
      opacity: 0,
      duration: 4.2,
      ease: 'power1.out',
      onComplete: () => c.remove(),
    });
  });
}
