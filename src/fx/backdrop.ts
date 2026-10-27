// 장면 배경 그림 (막·장면별 무대 뒤 풍경). 역광 실루엣과 같은 종이 오려낸 그림자극 말투.
// 멀수록 하늘색에 가깝고, 가까울수록 어둡다. 잎은 아주 천천히 흔들리고 열매·강물은 은은하게 반짝인다.
// 모양은 코드로 만들되 시드 고정 난수라 매번 같은 그림이 나온다.
import type { BackdropArt } from '../engine/moods';

const W = 400;
const H = 260;

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** 나무 한 그루: 줄기 + 둥근 잎 덩어리 여러 개. sway면 잎이 흔들린다 */
function tree(x: number, ground: number, h: number, cls: string, seed: number, opts: { lean?: number; fruit?: number; sway?: boolean } = {}): string {
  const r = rng(seed);
  const lean = opts.lean ?? 0;
  const topX = x + lean * h * 0.3;
  const topY = ground - h * 0.62;
  const tw = Math.max(2.4, h * 0.05);
  const trunk = `M${x - tw} ${ground} C${x - tw * 0.6} ${ground - h * 0.3} ${topX - tw * 0.5} ${topY + h * 0.12} ${topX - tw * 0.4} ${topY}
    L${topX + tw * 0.4} ${topY} C${topX + tw * 0.5} ${topY + h * 0.12} ${x + tw * 0.6} ${ground - h * 0.3} ${x + tw} ${ground} Z`;
  // 가지 두 개
  const branches = [-1, 1]
    .map((d) => {
      const bx = topX + d * h * (0.22 + r() * 0.1);
      const by = topY - h * (0.05 + r() * 0.08);
      return `<path d="M${topX} ${topY + h * 0.08} Q${(topX + bx) / 2} ${by + h * 0.1} ${bx} ${by}" fill="none" stroke="currentColor" stroke-width="${(tw * 0.7).toFixed(1)}" stroke-linecap="round"/>`;
    })
    .join('');
  const blobs: string[] = [];
  const cr = h * 0.3;
  const n = 7 + Math.floor(r() * 3);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r() * 0.5;
    const d = cr * (0.35 + r() * 0.55);
    const bx = topX + Math.cos(a) * d * 1.25;
    const by = topY - h * 0.12 + Math.sin(a) * d * 0.75;
    blobs.push(`<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${(cr * (0.42 + r() * 0.3)).toFixed(1)}"/>`);
  }
  blobs.push(`<circle cx="${topX.toFixed(1)}" cy="${(topY - h * 0.14).toFixed(1)}" r="${(cr * 0.75).toFixed(1)}"/>`);
  const fruit: string[] = [];
  for (let i = 0; i < (opts.fruit ?? 0); i++) {
    const a = r() * Math.PI * 2;
    const d = cr * (0.2 + r() * 0.85);
    const fx = topX + Math.cos(a) * d * 1.2;
    const fy = topY - h * 0.1 + Math.sin(a) * d * 0.7;
    fruit.push(`<circle class="bd-fruit" style="--d:${(r() * 4).toFixed(2)}s" cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="${(1.4 + r() * 1.2).toFixed(1)}"/>`);
  }
  const crown = `<g class="${opts.sway ? 'bd-sway' : ''}" style="transform-origin:${topX.toFixed(1)}px ${topY.toFixed(1)}px; --d:${(r() * 3).toFixed(2)}s">${blobs.join('')}${fruit.join('')}</g>`;
  // 특별한 나무(동산 가운데)는 뒤에서 은은한 빛이 번진다
  const halo = cls.includes('bd-glow') ? `<circle class="bd-halo" cx="${topX.toFixed(1)}" cy="${(topY - h * 0.12).toFixed(1)}" r="${(cr * 2.3).toFixed(1)}"/>` : '';
  return `<g class="${cls}">${halo}<path d="${trunk}"/>${branches}${crown}</g>`;
}

/** 지평선을 따라 이어지는 먼 숲 */
function treeline(y: number, amp: number, cls: string, seed: number): string {
  const r = rng(seed);
  let d = `M0 ${H} L0 ${y}`;
  for (let x = 0; x < W; ) {
    const step = 14 + r() * 22;
    const top = y - amp * (0.4 + r() * 0.6);
    d += ` Q${x + step / 2} ${top - amp * 0.4} ${x + step} ${y - r() * amp * 0.3}`;
    x += step;
  }
  d += ` L${W} ${H} Z`;
  return `<path class="${cls}" d="${d}"/>`;
}

function hills(y: number, cls: string, seed: number): string {
  const r = rng(seed);
  const p = Array.from({ length: 5 }, (_, i) => [i * 100, y - r() * 18] as const);
  let d = `M0 ${H} L0 ${p[0][1]}`;
  for (let i = 1; i < p.length; i++) d += ` C${p[i - 1][0] + 50} ${p[i - 1][1] - 14} ${p[i][0] - 50} ${p[i][1] - 14} ${p[i][0]} ${p[i][1]}`;
  return `<path class="${cls}" d="${d} L${W} ${H} Z"/>`;
}

/** 엉겅퀴·가시덤불 (창 3:18) */
function thorns(x: number, ground: number, s: number, cls: string, seed: number): string {
  const r = rng(seed);
  const stems = Array.from({ length: 6 }, (_, i) => {
    const a = -Math.PI / 2 + (i - 2.5) * 0.32 + (r() - 0.5) * 0.2;
    const len = s * (0.6 + r() * 0.5);
    const ex = x + Math.cos(a) * len;
    const ey = ground + Math.sin(a) * len;
    return `<path d="M${x} ${ground} L${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="${(s * 0.07).toFixed(1)}"/>`;
  }).join('');
  return `<g class="${cls}">${stems}</g>`;
}

const ART: Record<BackdropArt, () => string> = {
  garden: () => `
    ${treeline(196, 26, 'bd-far', 3)}
    ${tree(200, 190, 64, 'bd-far bd-glow', 11, { fruit: 0, sway: true })}
    <path class="bd-river" d="M-10 214 C70 206 140 220 210 212 C280 204 340 216 410 208"/>
    ${treeline(218, 18, 'bd-mid', 7)}
    ${tree(28, 262, 210, 'bd-near', 21, { lean: 0.25, sway: true })}
    ${tree(378, 262, 230, 'bd-near', 33, { lean: -0.2, sway: true })}
    ${tree(92, 236, 96, 'bd-mid', 41, { sway: true })}
    ${tree(318, 238, 104, 'bd-mid', 52, { sway: true })}`,
  tree: () => `
    ${treeline(200, 22, 'bd-far', 5)}
    ${treeline(220, 16, 'bd-mid', 9)}
    ${tree(200, 236, 190, 'bd-mid bd-glow', 77, { fruit: 16, sway: true })}
    ${tree(22, 262, 200, 'bd-near', 23, { lean: 0.3, sway: true })}
    ${tree(384, 262, 210, 'bd-near', 35, { lean: -0.3, sway: true })}`,
  gate: () => `
    ${treeline(206, 30, 'bd-far', 13)}
    <g class="bd-flame" aria-hidden="true">
      <circle class="bd-flame__glow" cx="118" cy="190" r="46"/>
      <g class="bd-flame__sword"><path d="M118 160 C122 172 124 184 118 214 C112 184 114 172 118 160 Z"/><path d="M104 186 L132 186" stroke-width="2"/></g>
    </g>
    ${hills(222, 'bd-mid', 17)}
    ${thorns(262, 236, 26, 'bd-near', 61)}
    ${thorns(60, 244, 22, 'bd-near', 62)}
    ${thorns(340, 246, 30, 'bd-near', 63)}`,
};

const cache = new Map<BackdropArt, string>();

/** 배경 SVG 한 장 */
export function backdropSvg(art: BackdropArt): string {
  let body = cache.get(art);
  if (!body) {
    body = ART[art]();
    cache.set(art, body);
  }
  const defs = `<defs>
    <radialGradient id="bd-halo-g"><stop offset="0" class="bd-halo__c"/><stop offset="1" class="bd-halo__e"/></radialGradient>
    <radialGradient id="bd-flame-g"><stop offset="0" stop-color="#ffd9a0" stop-opacity="0.75"/><stop offset="0.35" stop-color="#f08a3c" stop-opacity="0.32"/><stop offset="1" stop-color="#f08a3c" stop-opacity="0"/></radialGradient>
  </defs>`;
  return `<svg class="backdrop" data-art="${art}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${defs}${body}</svg>`;
}
