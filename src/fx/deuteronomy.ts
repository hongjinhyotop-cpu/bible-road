// 신명기 A급 4개 (신 6 · 27–28 · 32 · 34). 같은 종이 오려낸 그림자극 말투.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - dt-door       : 약속의 땅의 돌집 문 앞 (신 6:9 "네 집 문설주와 바깥 문에 기록할찌니라"). 돌 문틀, 열린 문 안의 등잔 불빛,
//                    문 옆 올리브나무와 포도 덩굴, 멀리 언덕의 성읍 — 아직 오지 않은 날의 집 (foresee와 같이)
//  - dt-door-lit   : 같은 문. 문설주와 인방에 금빛 글줄이 그어져 있고, 문설주에 작은 두루마리 갑
//  - dt-twin       : 세겜 골짜기에서 본 두 산. 왼쪽 그리심, 오른쪽 에발. 에발 비탈에 다듬지 않은 돌 제단과 석회 바른 큰 돌들,
//                    두 산 비탈에 늘어선 백성의 줄, 골짜기 가운데 궤 (신 27:2-8, 12-13; 수 8:30-35)
//  - dt-twin-bless : 같은 곳, 그리심 쪽에 금빛이 내리고 밭이 익는다 (신 28:1-14)
//  - dt-twin-curse : 같은 곳, 에발 쪽에 먹구름과 마른 땅 (신 28:15-68). 절제: 그림은 날씨와 땅으로만
//  - dt-song       : 모압 평지의 밤. 넓은 하늘, 왼쪽 높은 바위 벼랑(반석, 신 32:4)과 꼭대기의 독수리 둥지 (신 32:11)
//  - dt-nebo-path  : 느보산 오르는 길. 모압 평지에서 비스가 꼭대기로 굽은 길, 아래로 진 (신 34:1)
//  - dt-nebo-view  : 비스가 꼭대기에서 서쪽을 본 온 땅. 앞 바위 마루, 아래 요단 골짜기와 여리고, 남쪽 염해, 멀리 겹겹 산지,
//                    지평선 끝에 서해(지중해) 한 줄 (신 34:1-3). fx land-show가 땅을 구역별로 밝힌다
//  - dt-nebo-empty : 같은 꼭대기, 아무도 없다. 바위 마루 위에 머문 빛 (신 34:5-6 "그 묘를 아는 자가 없느니라")
// 효과:
//  - shema     : 무대 위에 "들으라"(그리고 희미한 שְׁמַע)가 금빛으로 떠오르고, 소리의 고리가 백성 쪽으로 퍼진다 (신 6:4)
//  - pass-on   : 금빛 티끌이 왼쪽 인물의 가슴에서 떠올라 오른쪽 인물에게 내려앉는다 (신 6:6-7 "네 자녀에게 부지런히 가르치며")
//  - amen      : 백성 쪽에서 "아멘" 글자들이 물결처럼 떠올랐다 스러진다 (신 27:15-26)
//  - eagle     : 독수리가 둥지를 흔들고, 떨어지는 새끼 밑으로 날개를 펴 받아 올린다 (신 32:11)
//  - land-show : 느보산 전경(dt-nebo-view)에서 땅이 북쪽부터 남쪽까지 차례로 밝아지며 이름이 뜬다 (신 34:1-3, 약 12초, 탭하면 빨리 감김)
// 하나님은 그리지 않는다 — 빛으로만 (CLAUDE.md 8-1). 모세의 죽음은 그리지 않는다: 빛이 머물다 걷힐 뿐.
// 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
import gsap from 'gsap';
import { H, W, palm, rng, smoke, tree } from './backdrop';

export type DeutArt = 'dt-door' | 'dt-door-lit' | 'dt-twin' | 'dt-twin-bless' | 'dt-twin-curse' | 'dt-song' | 'dt-nebo-path' | 'dt-nebo-view' | 'dt-nebo-empty';

const f = (n: number) => n.toFixed(1);

/** 부드러운 산줄기 (점 여러 개를 이은 곡선) */
function ridge(pts: [number, number][], cls: string, bottom = H): string {
  let d = `M${pts[0][0]} ${bottom} L${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    d += ` Q${f(px + (x - px) * 0.5)} ${f(Math.min(py, y) - 2)} ${x} ${y}`;
  }
  return `<path class="${cls}" d="${d} L${pts[pts.length - 1][0]} ${bottom} Z"/>`;
}

/** 작은 사람들의 줄 (비탈에 선 백성): (x0,y0)→(x1,y1)을 따라 점처럼 */
function people(x0: number, y0: number, x1: number, y1: number, n: number, s: number, seed: number, cls = 'dt-folk'): string {
  const r = rng(seed);
  return `<g class="${cls}">${Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const x = x0 + (x1 - x0) * t + (r() - 0.5) * 2;
    const y = y0 + (y1 - y0) * t + (r() - 0.5) * 1.6;
    const h = s * (2.6 + r() * 0.8);
    return `<rect style="--d:${f(r() * 3)}s" x="${f(x - s * 0.45)}" y="${f(y - h)}" width="${f(s * 0.9)}" height="${f(h)}" rx="${f(s * 0.45)}"/>`;
  }).join('')}</g>`;
}

/** 별 (밤하늘) */
function stars(n: number, maxY: number, seed: number): string {
  const r = rng(seed);
  return `<g class="dt-stars">${Array.from({ length: n }, () =>
    `<circle style="--d:${f(r() * 5)}s" cx="${f(-W * 2 + r() * W * 5)}" cy="${f(r() * maxY)}" r="${f(0.35 + r() * 0.8)}"/>`).join('')}</g>`;
}

// ── 문설주 (신 6:9) ───────────────────────────────
function doorArt(lit: boolean): string {
  // 돌집 정면: 가운데 문(x 176~224), 문 위 큰 인방돌
  const blocks: string[] = [];
  const r = rng(6601);
  for (let row = 0; row < 9; row++) {
    const y = 108 + row * 14;
    let x = 96 + (row % 2) * 12 - 24;
    while (x < 304) {
      const w = 18 + r() * 14;
      // 문 자리는 비운다
      if (!(x + w > 172 && x < 228 && y > 120)) blocks.push(`<rect x="${f(x)}" y="${f(y)}" width="${f(w - 1.4)}" height="12.6" rx="1.2"/>`);
      x += w;
    }
  }
  const lines = (x: number, y0: number, y1: number) => Array.from({ length: Math.floor((y1 - y0) / 7) }, (_, i) => {
    const y = y0 + i * 7;
    return `<path style="--i:${i}" pathLength="1" d="M${x - 3.5} ${y} q1.8 -1.2 3.5 0 t3.5 0"/>`;
  }).join('');
  const writing = lit ? `<g class="dt-script">
      ${lines(170, 132, 236)}${lines(230, 132, 236)}
      <g style="--i:3">${[0, 1, 2, 3, 4].map((i) => `<path style="--i:${i}" pathLength="1" d="M${180 + i * 9} 121 q2 -1.2 4 0 t3.4 0"/>`).join('')}</g>
    </g>
    <g class="dt-mezuzah"><rect x="229" y="150" width="4" height="14" rx="1.6" transform="rotate(-12 231 157)"/></g>
    <circle class="dt-door-glow" cx="200" cy="170" r="80"/>` : '';
  return `<g class="dt dt--door${lit ? ' is-lit' : ''}">
    ${ridge([[-W * 2, 180], [-200, 170], [-60, 178], [60, 168], [150, 176], [260, 166], [380, 174], [520, 164], [W * 3, 172]], 'bd-far')}
    <g class="bd-far dt-town"><rect x="40" y="160" width="14" height="12"/><rect x="56" y="156" width="12" height="16"/><rect x="70" y="162" width="16" height="10"/><rect x="334" y="158" width="14" height="14"/><rect x="350" y="162" width="12" height="10"/></g>
    ${ridge([[-W * 2, 200], [-100, 194], [40, 198], [140, 190], [300, 196], [460, 188], [W * 3, 196]], 'bd-mid')}
    <g class="bd-mid dt-house">${blocks.join('')}<rect x="78" y="100" width="236" height="8" rx="2"/></g>
    <rect class="dt-doorway" x="176" y="128" width="48" height="114" rx="2"/>
    <ellipse class="dt-lamp" cx="200" cy="196" rx="3.4" ry="4.4"/>
    <circle class="bd-halo dt-lamp-halo" cx="200" cy="196" r="30"/>
    <g class="bd-near dt-frame"><rect x="164" y="122" width="12" height="122"/><rect x="224" y="122" width="12" height="122"/><rect x="158" y="112" width="84" height="12" rx="1.5"/><rect x="154" y="242" width="92" height="6"/></g>
    ${writing}
    ${tree(70, 262, 96, 'bd-near', 6602, { lean: 0.1, sway: true })}
    <g class="bd-near dt-vine"><path d="M318 248 C320 210 306 180 320 150 C330 128 320 116 312 108" fill="none" stroke="currentColor" stroke-width="2.4"/>${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${f(312 + (i % 3) * 6)}" cy="${f(132 + Math.floor(i / 3) * 6)}" r="2.6"/>`).join('')}<path d="M300 120 l14 -6 l-2 10 Z M322 160 l12 -4 l-4 10 Z"/></g>
    ${tree(-140, 262, 130, 'bd-near', 6603, { lean: 0.2, sway: true })}${tree(560, 262, 140, 'bd-near', 6604, { lean: -0.2, sway: true })}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 248 C-200 246 100 250 200 248 C320 246 600 250 ${W * 3} 248 L${W * 3} ${H} Z"/>
  </g>`;
}

// ── 그리심과 에발 (신 27–28) ───────────────────────
function twinArt(state: 'plain' | 'bless' | 'curse'): string {
  const r = rng(2701);
  // 에발 비탈: 다듬지 않은 돌 제단 + 석회 바른 큰 돌 셋 (27:2-6)
  const altar = Array.from({ length: 10 }, (_, i) => {
    const x = 262 + (i % 4) * 6 + (i >= 8 ? 6 : 0) + r();
    const y = 174 - Math.floor(i / 4) * 4.6;
    return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(3.4 + r())}" ry="${f(2.3 + r() * 0.4)}"/>`;
  }).join('');
  const plaster = [0, 1, 2].map((i) => `<g transform="translate(${236 + i * 11} ${172 - i * 2})"><rect class="dt-plaster" x="-4.4" y="-13" width="8.8" height="13" rx="1.2"/>${[0, 1, 2, 3].map((k) => `<path class="dt-law" d="M-3 ${-10.5 + k * 2.8} h6"/>`).join('')}</g>`).join('');
  const bless = state === 'bless' ? `<g class="dt-bless">
      <path class="dt-bless__beam" d="M60 -20 L150 -20 L190 210 L20 210 Z"/>
      ${Array.from({ length: 9 }, (_, i) => `<path class="dt-grain" style="--d:${f(i * 0.3)}s" d="M${40 + i * 14} 226 q2 -10 0 -18 M${40 + i * 14} 216 l-3 -3 M${40 + i * 14} 212 l3 -3"/>`).join('')}
    </g>` : '';
  const curse = state === 'curse' ? `<g class="dt-curse">
      <path class="dt-cloud" d="M${200} 70 C220 40 270 36 290 54 C310 30 370 34 380 62 C420 60 440 86 420 104 L210 104 C180 104 176 80 200 70 Z"/>
      <path class="dt-crack" d="M250 232 l8 -6 l-4 -6 l10 -4 M300 236 l-6 -6 l8 -5 M340 230 l-8 -4"/>
    </g>` : '';
  return `<g class="dt dt--twin dt--${state}">
    ${ridge([[-W * 2, 186], [-260, 176], [-120, 184], [W * 3, 182]], 'bd-far')}
    <!-- 그리심 (왼쪽): 비탈이 완만하고 나무가 있다 -->
    ${ridge([[-W * 2, 210], [-140, 160], [-20, 120], [60, 92], [110, 96], [168, 150], [196, 214]], 'bd-mid dt-gerizim')}
    <!-- 에발 (오른쪽): 더 높고 돌투성이 -->
    ${ridge([[204, 214], [236, 150], [290, 86], [336, 80], [420, 118], [520, 150], [W * 3, 200]], 'bd-mid dt-ebal')}
    ${people(10, 172, 150, 196, 22, 1.4, 2702)}${people(-120, 186, 40, 166, 16, 1.6, 2703)}
    ${people(250, 196, 400, 168, 22, 1.4, 2704)}${people(420, 172, 560, 188, 14, 1.6, 2705)}
    <g class="bd-near dt-altar">${altar}</g>${smoke(266, 160, 2706, 5)}
    ${plaster}
    ${tree(-40, 200, 40, 'bd-mid', 2707)}${tree(80, 140, 26, 'bd-mid', 2708)}
    <path class="bd-mid dt-valley" d="M${-W * 2} ${H} L${-W * 2} 222 C-200 218 120 224 200 214 C280 224 600 218 ${W * 3} 222 L${W * 3} ${H} Z"/>
    <!-- 골짜기 가운데 언약궤와 제사장들 (수 8:33) -->
    <g class="dt-ark"><rect x="193" y="208" width="14" height="7" rx="1"/><path d="M191 214 h-10 M209 214 h10" stroke-width="1"/><path class="dt-ark__wing" d="M195 208 q5 -6 10 0"/></g>
    ${people(170, 222, 186, 222, 4, 1.8, 2709, 'dt-folk dt-folk--priest')}${people(214, 222, 230, 222, 4, 1.8, 2710, 'dt-folk dt-folk--priest')}
    ${bless}${curse}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 246 C-100 242 120 250 200 247 C300 244 560 250 ${W * 3} 246 L${W * 3} ${H} Z"/>
  </g>`;
}

// ── 모세의 노래 (신 32) ──────────────────────────
function songArt(): string {
  // 왼쪽 높은 바위 벼랑과 둥지
  return `<g class="dt dt--song">
    ${stars(120, 150, 3201)}
    <path class="dt-milky" d="M-200 30 C40 60 260 10 600 70"/>
    ${ridge([[-W * 2, 214], [-80, 206], [80, 212], [240, 204], [400, 210], [W * 3, 206]], 'bd-far')}
    <path class="bd-mid dt-crag" d="M${-W * 2} ${H} L${-W * 2} 120 L-40 96 L40 60 L82 56 L110 80 L128 120 L136 170 L150 222 L160 ${H} Z"/>
    <path class="dt-crag-edge" d="M40 60 L82 56 L110 80 L128 120"/>
    <g class="bd-mid dt-nest"><path d="M64 58 C68 52 84 52 88 58 Z"/><path d="M62 58 L90 58" stroke="currentColor" stroke-width="1.4"/></g>
    <circle class="dt-nest-mark" cx="76" cy="54" r="1"/>
    <path class="bd-mid" d="M160 ${H} L160 224 C220 220 300 226 ${W * 3} 222 L${W * 3} ${H} Z"/>
    <g class="bd-mid dt-camp">${Array.from({ length: 14 }, (_, i) => `<path d="M${180 + i * 26} 226 l7 -9 l7 9 Z"/>`).join('')}</g>
    ${[0, 1, 2, 3].map((i) => `<circle class="dt-fire" style="--d:${i * 0.7}s" cx="${210 + i * 52}" cy="228" r="1.6"/>`).join('')}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 248 C-100 244 120 252 200 249 C300 246 560 252 ${W * 3} 248 L${W * 3} ${H} Z"/>
  </g>`;
}

// ── 느보산 (신 34) ───────────────────────────────
function neboPathArt(): string {
  return `<g class="dt dt--path">
    ${ridge([[-W * 2, 150], [-100, 120], [60, 70], [160, 40], [230, 46], [320, 90], [460, 130], [W * 3, 160]], 'bd-far dt-nebo')}
    <path class="dt-trail" d="M90 ${H} C150 230 250 220 230 190 C214 166 150 160 190 130 C214 110 236 96 200 66 C190 56 196 48 206 44"/>
    <circle class="bd-halo" cx="206" cy="40" r="40"/>
    ${ridge([[-W * 2, 206], [-60, 196], [100, 186], [240, 200], [420, 190], [W * 3, 204]], 'bd-mid')}
    <g class="bd-mid dt-camp">${Array.from({ length: 12 }, (_, i) => `<path d="M${-60 + i * 44} 238 l6 -8 l6 8 Z"/>`).join('')}</g>
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 244 C-100 240 120 248 200 245 C300 242 560 248 ${W * 3} 244 L${W * 3} ${H} Z"/>
  </g>`;
}

/** 비스가에서 서쪽을 본 땅의 구역들. 서쪽을 보고 서 있으니 오른쪽 = 북쪽, 왼쪽 = 남쪽 (land-show가 북 → 남으로 차례로 밝힘).
 *  폰에서 보이는 x 100~300 안에 이름표를 둔다 */
const REGIONS: { name: string; cx: number; cy: number; rx: number; ry: number; lx: number; ly: number }[] = [
  { name: '길르앗 온 땅, 단까지', cx: 300, cy: 132, rx: 70, ry: 8, lx: 262, ly: 124 },
  { name: '납달리', cx: 262, cy: 144, rx: 40, ry: 7, lx: 262, ly: 140 },
  { name: '에브라임과 므낫세', cx: 210, cy: 152, rx: 48, ry: 8, lx: 210, ly: 150 },
  { name: '서해까지 유다 온 땅', cx: 140, cy: 146, rx: 56, ry: 9, lx: 146, ly: 136 },
  { name: '남방', cx: 96, cy: 166, rx: 54, ry: 8, lx: 124, ly: 166 },
  { name: '종려나무 성 여리고', cx: 214, cy: 190, rx: 30, ry: 6, lx: 214, ly: 182 },
  { name: '소알까지', cx: 128, cy: 214, rx: 26, ry: 5, lx: 140, ly: 208 },
];

function neboViewArt(empty: boolean): string {
  return `<g class="dt dt--view${empty ? ' is-empty' : ''}">
    <!-- 지평선 끝 서해(지중해) 한 줄 -->
    <path class="dt-westsea" d="M${-W * 2} 118 C-100 117 200 119 ${W * 3} 117 L${W * 3} 121 L${-W * 2} 122 Z"/>
    ${ridge([[-W * 2, 128], [-100, 124], [60, 127], [200, 122], [360, 126], [520, 121], [W * 3, 127]], 'bd-far dt-hills dt-hills--far')}
    <g class="dt-regions">${REGIONS.map((g, i) => `<ellipse class="dt-region" style="--i:${i}" cx="${g.cx}" cy="${g.cy}" rx="${g.rx}" ry="${g.ry}"/>`).join('')}</g>
    ${ridge([[-W * 2, 172], [-60, 166], [80, 170], [180, 162], [300, 168], [420, 160], [W * 3, 166]], 'bd-far dt-hills')}
    <!-- 요단 골짜기와 염해: 오른쪽(북)에서 왼쪽(남)으로 흘러 염해로 -->
    <path class="bd-mid dt-valleyfloor" d="M${-W * 2} 196 C-100 192 120 184 260 188 C400 192 600 186 ${W * 3} 190 L${W * 3} ${H} L${-W * 2} ${H} Z"/>
    <path class="dt-jordan" d="M520 180 C440 184 360 182 320 192 C280 202 250 196 226 204 C200 212 180 210 164 214"/>
    <path class="dt-deadsea" d="M166 212 C150 208 112 208 86 214 C64 220 80 230 112 228 C140 226 164 222 170 216 Z"/>
    <g class="dt-jericho">${palm(204, 196, 14, 'bd-mid', 3401)}${palm(226, 197, 12, 'bd-mid', 3402)}<rect class="bd-mid" x="208" y="190" width="12" height="7"/></g>
    <g class="dt-labels">${REGIONS.map((g, i) => `<text class="dt-label" style="--i:${i}" x="${g.lx}" y="${g.ly}" text-anchor="middle">${g.name}</text>`).join('')}</g>
    <!-- 비스가 꼭대기 바위 마루 (서는 자리) -->
    <path class="bd-near dt-summit" d="M${-W * 2} ${H} L${-W * 2} 238 C-120 232 60 226 150 230 C200 226 260 226 320 232 C420 236 600 234 ${W * 3} 238 L${W * 3} ${H} Z"/>
    ${empty ? '<circle class="dt-stay" cx="210" cy="220" r="70"/><path class="dt-stay__beam" d="M190 -20 L230 -20 L250 230 L170 230 Z"/>' : ''}
  </g>`;
}

export function deutArt(art: DeutArt): string {
  switch (art) {
    case 'dt-door': return doorArt(false);
    case 'dt-door-lit': return doorArt(true);
    case 'dt-twin': return twinArt('plain');
    case 'dt-twin-bless': return twinArt('bless');
    case 'dt-twin-curse': return twinArt('curse');
    case 'dt-song': return songArt();
    case 'dt-nebo-path': return neboPathArt();
    case 'dt-nebo-view': return neboViewArt(false);
    case 'dt-nebo-empty': return neboViewArt(true);
  }
}

// ── 효과 ───────────────────────────────────────
function layerOf(scene: HTMLElement, cls: string, html: string, life: number, out: number): HTMLElement {
  const layer = document.createElement('div');
  layer.className = cls;
  layer.innerHTML = html;
  scene.append(layer);
  setTimeout(() => layer.classList.add('is-out'), life - out);
  setTimeout(() => layer.remove(), life);
  return layer;
}

/** shema: "들으라"가 금빛으로 떠오르고 소리의 고리가 퍼진다 (약 8초) */
export function playShema(scene: HTMLElement, rm: boolean): void {
  const rings = rm ? '' : [0, 1.2, 2.4, 3.6].map((d) => `<i style="--d:${d}s"></i>`).join('');
  layerOf(scene, 'fx-shema', `${rings}<p><span class="fx-shema__he" lang="he">שְׁמַע</span><span class="fx-shema__ko">들으라</span></p>`, rm ? 3000 : 8200, 1800);
}

/** pass-on: 금빛 티끌이 왼쪽 인물에서 오른쪽 인물에게 (약 5초) */
export function playPassOn(scene: HTMLElement, rm: boolean): void {
  const actors = [...scene.querySelectorAll<HTMLElement>('.actor')];
  const b = scene.getBoundingClientRect();
  const pt = (a: HTMLElement | undefined, fx: number) => {
    if (!a) return [b.width * fx, b.height * 0.55];
    const r = a.getBoundingClientRect();
    return [r.left - b.left + r.width / 2, r.top - b.top + r.height * 0.4];
  };
  const sorted = actors.sort((p, q) => p.getBoundingClientRect().left - q.getBoundingClientRect().left);
  const [x0, y0] = pt(sorted[0], 0.3);
  const [x1, y1] = pt(sorted[sorted.length - 1], 0.7);
  const r = rng(Date.now() % 100000);
  const motes = rm ? '' : Array.from({ length: 18 }, (_, i) =>
    `<u style="--d:${f(i * 0.09 + r() * 0.3)}s; --lift:${f(-30 - r() * 40)}px; --s:${f(0.6 + r())}"></u>`).join('');
  const layer = layerOf(scene, 'fx-passon', `<s></s><s class="to"></s>${motes}`, rm ? 2400 : 5200, 1400);
  layer.style.setProperty('--x0', `${x0}px`);
  layer.style.setProperty('--y0', `${y0}px`);
  layer.style.setProperty('--x1', `${x1}px`);
  layer.style.setProperty('--y1', `${y1}px`);
}

/** amen: 백성 쪽에서 "아멘"이 물결처럼 떠오른다 (약 6초) */
export function playAmen(scene: HTMLElement, rm: boolean): void {
  const r = rng(Date.now() % 100000);
  const words = Array.from({ length: rm ? 3 : 22 }, (_, i) =>
    `<b style="--x:${f(6 + r() * 88)}%; --y:${f(58 + r() * 30)}%; --d:${f((i % 11) * 0.12 + Math.floor(i / 11) * 1.4 + r() * 0.2)}s; --s:${f(0.7 + r() * 0.6)}">아멘</b>`).join('');
  layerOf(scene, 'fx-amen', words, rm ? 2400 : 6000, 1400);
}

/** eagle: 독수리가 둥지를 흔들고, 떨어지는 새끼를 날개로 받아 올린다 (약 9초). 둥지(.dt-nest-mark)가 보이면 거기서, 없으면 왼쪽 위에서 */
export function playEagle(scene: HTMLElement, rm: boolean): void {
  const wing = `<svg viewBox="-30 -12 60 24"><path class="w" d="M0 0 C-8 -2 -16 -10 -29 -8 C-20 -3 -12 2 -4 3 L0 6 L4 3 C12 2 20 -3 29 -8 C16 -10 8 -2 0 0 Z"/><path d="M-3 3 L0 -2 L3 3 L0 9 Z"/></svg>`;
  const chick = `<svg viewBox="-8 -6 16 12"><path d="M0 -3 C-3 -3 -5 -1 -6 1 C-3 0 -1 2 0 3 C1 2 3 0 6 1 C5 -1 3 -3 0 -3 Z"/></svg>`;
  const layer = layerOf(scene, 'fx-eagle', `<i class="fx-eagle__big">${wing}</i><i class="fx-eagle__small">${chick}</i>`, rm ? 2600 : 9400, 1600);
  const b = scene.getBoundingClientRect();
  const w = b.width, h = b.height;
  let nx = w * 0.2, ny = h * 0.22;
  const mark = scene.querySelector<SVGElement>('.dt-nest-mark');
  const m = mark?.getBoundingClientRect();
  if (m && (m.width || m.height) && m.left > b.left && m.left < b.right) { nx = m.left - b.left; ny = m.top - b.top; }
  const big = layer.querySelector<HTMLElement>('.fx-eagle__big')!;
  const small = layer.querySelector<HTMLElement>('.fx-eagle__small')!;
  const bw = Math.min(140, Math.max(70, w * 0.26));
  gsap.set(big, { width: bw, height: bw * 0.4, xPercent: -50, yPercent: -50, x: -bw, y: ny - 20 });
  gsap.set(small, { width: 18, height: 14, xPercent: -50, yPercent: -50, x: nx, y: ny, opacity: 0 });
  if (rm) {
    gsap.set(big, { x: w * 0.6, y: h * 0.3 });
    return;
  }
  const low = Math.min(h * 0.62, ny + h * 0.42);
  gsap.timeline()
    // 둥지 위를 돌며 어지럽힘 (32:11 "보금자리를 어지럽게 하며")
    .to(big, { x: nx + 30, y: ny - 24, duration: 1.4, ease: 'power2.out' })
    .to(big, { x: nx - 10, y: ny - 34, duration: 0.6, ease: 'sine.inOut' })
    .to(small, { opacity: 1, duration: 0.2 }, '<')
    // 새끼가 떨어진다
    .to(small, { x: nx + w * 0.16, y: low, duration: 1.3, ease: 'power2.in' })
    // 날개를 펴서 밑으로 파고든다 (32:11 "날개를 펴서 새끼를 받으며")
    .to(big, { x: nx + w * 0.16, y: low + 10, duration: 1.2, ease: 'power3.in' }, '<0.15')
    // 날개에 업고 높이 오른다 (32:11 "그 날개 위에 그것을 업는 것 같이")
    .to([big, small], { x: w * 0.92, y: h * 0.12, duration: 2.6, ease: 'power2.inOut' })
    .to([big, small], { x: w + bw, y: -20, duration: 1.2, ease: 'power1.in' });
}

/** land-show: 느보산 전경의 땅이 북쪽부터 차례로 밝아진다 — 배경 그림의 구역에 클래스만 붙임 (styles/deuteronomy.css) */
export function playLandShow(scene: HTMLElement): void {
  const g = scene.querySelector('.dt--view');
  if (!g) return;
  g.classList.remove('is-showing');
  void (g as SVGElement).getBoundingClientRect();
  g.classList.add('is-showing');
}
