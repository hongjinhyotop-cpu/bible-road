// 7막 A급 — 솔로몬 (왕상 3 「무엇을 줄꼬」 · 「칼을 가져오라」)의 전용 배경과 효과. 같은 종이 오려낸 그림자극 말투.
// 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// (왕상 8 성전 봉헌 · 11 타락은 다른 파일 — 여기엔 3장 것만)
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - so-gibeon      : 기브온 산당. 언덕 꼭대기의 세 층 큰 돌 단과 그 위의 불, 끊이지 않는 연기 기둥들, 단 옆의 작은 장막,
//                     비탈길을 오르는 사람들과 제물 짐승의 줄 (왕상 3:4 "거기는 산당이 큼이라 … 일천 번제")
//  - so-dream       : 기브온의 밤. 별, 멀리 언덕 위 단의 남은 불씨, 진의 장막들, 하늘에서 무대 가운데로 내려오는
//                     부드러운 빛기둥과 떠도는 빛 티끌 (3:5 "밤에 … 꿈에 나타나시니라" — 하나님은 그리지 않는다)
//  - so-dream-wake  : 같은 곳, 새벽. 빛기둥은 걷히고 별이 지고 단의 연기만 가늘게 (3:15 "깨어 보니 꿈이더라")
//  - so-court       : 왕의 재판 자리. 백향목 기둥들 사이 세 층 단 위의 높은 등받이 보좌, 매단 등잔, 양옆에 늘어선 신하들
//                     (3:16, 28 — 7:7 "재판하기 위하여 … 낭실"을 미리)
//  - so-house       : 작은 집 안, 밤. 흙벽, 낮은 들보, 별이 보이는 작은 창, 벽감의 등잔 하나, 양쪽 벽에 붙은 낮은 침상 둘
//                     (3:17-20 "한 집에서 사는데 … 우리 둘 외에는 집에 다른 사람이 없었나이다")
//  - so-house-dawn  : 같은 집, 미명. 등잔은 꺼져 가는 심지의 연기만, 창으로 희뿌연 빛줄기가 바닥에 떨어짐 (3:21)
// 효과:
//  - thousand : 일천 번제 — 지평선을 따라 연기 기둥이 하나둘 계속 피어올라 하늘을 덮고, 가운데 숫자가 1에서 1000까지 차오른 뒤
//               "일천 번제"로 바뀜 (약 9초, 3:4)
//  - asks     : 구하지 아니한 것 — "장수" "부" "원수의 생명"이 희미하게 떠올랐다 가라앉고, 가운데에 "듣는 마음"(לֵב שֹׁמֵעַ)이
//               금빛으로 켜짐 (약 10초, 3:9-11)
//  - swaddle  : 강보에 싼 아기 하나 — beat의 to(없으면 who)의 품에 안긴다. 이미 다른 사람 품에 있으면 그 품에서 스러져
//               금빛 티끌을 따라 새 품으로 옮겨 간다. 아이는 이야기 내내 하나뿐이다 (3:20, 27). 인물의 몸(상체)에 붙어 같이 움직임
//  - blade    : 칼이 왕 앞에 옴 — 무대가 차갑게 식고, 칼 든 사람(who, 없으면 오른쪽 사람)의 칼 높이에서 찬빛 한 줄기가 번득임
//               (약 5초, 3:24). 아무도 다치지 않는다
// 하나님은 그리지 않는다 (voice · glory · 빛).
import { H, W, rng, smoke } from './backdrop';
import { folk, ground, ridge, stars } from './joshua';

export type SolomonArt = 'so-gibeon' | 'so-dream' | 'so-dream-wake' | 'so-court' | 'so-house' | 'so-house-dawn';

const f = (n: number) => n.toFixed(1);

// ── 작은 조각들 ─────────────────────────────────
/** 제물 짐승: 작은 양 / 소 (비탈길의 줄) */
function beast(x: number, y: number, s: number, ox: boolean): string {
  const bw = ox ? 9 : 6;
  const bh = ox ? 4.6 : 3.6;
  return `<g class="bd-mid" transform="translate(${f(x)} ${f(y)}) scale(${s})">
    <ellipse cx="0" cy="${f(-bh - 2)}" rx="${bw}" ry="${bh}"/>
    <circle cx="${f(bw + 1.6)}" cy="${f(-bh - 3.6)}" r="${ox ? 2.8 : 2.2}"/>
    <path d="M${f(-bw + 2)} -3 L${f(-bw + 2)} 0 M${f(-bw + 5)} -3 L${f(-bw + 5)} 0 M${f(bw - 5)} -3 L${f(bw - 5)} 0 M${f(bw - 2)} -3 L${f(bw - 2)} 0" stroke="currentColor" stroke-width="1.1" fill="none"/>
    ${ox ? `<path d="M${f(bw + 1)} ${f(-bh - 6)} l-2 -3 M${f(bw + 3)} ${f(-bh - 6)} l2 -3" stroke="currentColor" stroke-width="0.9" fill="none"/>` : ''}
  </g>`;
}

/** 불꽃 몇 갈래 (단 위·화로) */
function flames(x: number, y: number, s: number, n = 5): string {
  return `<g class="so-flame">${Array.from({ length: n }, (_, i) => {
    const dx = (i - (n - 1) / 2) * 6 * s;
    const h = (12 + ((i * 7) % 5) * 3) * s * (i === (n - 1) / 2 ? 1.3 : 1);
    return `<path style="--d:${f(i * 0.37)}s" d="M${f(x + dx - 4 * s)} ${f(y)} C${f(x + dx - 5 * s)} ${f(y - h * 0.5)} ${f(x + dx - 1 * s)} ${f(y - h * 0.7)} ${f(x + dx)} ${f(y - h)} C${f(x + dx + 2 * s)} ${f(y - h * 0.6)} ${f(x + dx + 5 * s)} ${f(y - h * 0.45)} ${f(x + dx + 4 * s)} ${f(y)} Z"/>`;
  }).join('')}</g>`;
}

/** 진의 작은 장막 */
const tentlet = (x: number, y: number, s: number, cls: string) =>
  `<path class="${cls}" d="M${f(x - 9 * s)} ${f(y)} L${f(x - 2 * s)} ${f(y - 10 * s)} L${f(x + 2 * s)} ${f(y - 10 * s)} L${f(x + 9 * s)} ${f(y)} Z"/>`;

// ── 기브온 산당 (3:4) ──────────────────────────────
function gibeonArt(): string {
  const r = rng(9941);
  const queue: string[] = [];
  // 왼쪽 비탈을 오르는 짐승의 줄 (양·소)
  for (let i = 0; i < 9; i++) {
    const t = i / 8;
    queue.push(beast(28 + t * 112, 236 - t * 52 + (r() - 0.5) * 2, 0.9 + (1 - t) * 0.5, i % 3 === 0));
  }
  return `<g class="so so--gibeon">
    ${ridge([[-W * 2, 140], [-60, 130], [70, 138], [190, 122], [320, 136], [450, 124], [W * 3, 132]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 236 C-60 232 50 220 110 194 C140 180 156 160 200 158 C246 156 268 176 296 192 C340 214 460 226 ${W * 3} 230 L${W * 3} ${H} Z"/>
    <path class="so-road" d="M20 ${H} C60 236 100 214 130 196 C150 184 162 172 176 166"/>
    ${queue.join('')}
    ${folk(36, 238, 142, 188, 9, 1.6, 9942, 'js-folk so-folk')}
    <!-- 단 옆의 작은 장막 -->
    <path class="bd-mid" d="M262 160 L268 138 L296 134 L304 160 Z"/>
    <path class="so-tentline" d="M268 138 L296 134 M276 160 L279 137 M290 160 L289 135"/>
    <!-- 세 층의 큰 돌 단과 네 뿔 -->
    <circle class="bd-halo so-altarhalo" cx="200" cy="112" r="56"/>
    <g class="bd-mid">
      <rect x="156" y="138" width="88" height="22"/>
      <rect x="165" y="122" width="70" height="17"/>
      <rect x="174" y="110" width="52" height="13"/>
      <rect x="172" y="104" width="6" height="7"/><rect x="222" y="104" width="6" height="7"/>
    </g>
    <path class="so-stones" d="M156 149 H244 M170 138 V149 M200 138 V149 M228 138 V149 M165 131 H235 M186 122 V131 M214 122 V131 M188 110 V122 M212 110 V122"/>
    <ellipse class="so-ember" cx="200" cy="109" rx="24" ry="3"/>
    ${flames(200, 110, 1.15, 5)}
    ${smoke(188, 92, 9943, 7)}${smoke(202, 86, 9944, 8)}${smoke(216, 92, 9945, 7)}
    <!-- 단 둘레의 제사장들 -->
    ${folk(150, 160, 170, 160, 3, 1.5, 9946, 'js-folk so-folk')}${folk(232, 160, 254, 160, 3, 1.5, 9947, 'js-folk so-folk')}
    ${ground(250)}
  </g>`;
}

// ── 기브온의 밤, 꿈 (3:5-15) ───────────────────────
function dreamArt(wake: boolean): string {
  const r = rng(9951);
  const motes = wake ? '' : Array.from({ length: 22 }, () =>
    `<circle class="so-mote" style="--d:${f(r() * 9)}s; --dx:${f((r() - 0.5) * 30)}px" cx="${f(150 + r() * 100)}" cy="${f(40 + r() * 190)}" r="${f(0.6 + r() * 1.1)}"/>`).join('');
  const tents = [[22, 232, 1.5], [58, 236, 1.8], [318, 232, 1.6], [354, 238, 2], [392, 232, 1.4], [-20, 236, 1.7]]
    .map(([x, y, s]) => tentlet(x, y, s, 'bd-mid')).join('');
  return `<g class="so so--dream${wake ? ' so--wake' : ''}">
    ${wake ? stars(16, 60, 9952) : stars(90, 170, 9952)}
    ${ridge([[-W * 2, 162], [-60, 152], [70, 160], [190, 150], [320, 158], [450, 148], [W * 3, 156]], 'bd-far')}
    <!-- 멀리 왼쪽 언덕 위의 큰 단: 남은 불씨, 새벽엔 가는 연기 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 214 C-40 208 20 180 70 172 C110 168 128 186 150 204 C190 226 300 230 ${W * 3} 226 L${W * 3} ${H} Z"/>
    <g class="bd-mid"><rect x="52" y="160" width="36" height="12"/><rect x="58" y="152" width="24" height="9"/></g>
    <ellipse class="so-ember so-ember--low" cx="70" cy="151" rx="11" ry="1.8"/>
    ${wake ? smoke(70, 146, 9953, 4) : ''}
    ${tents}
    <!-- 빛기둥: 하늘에서 무대 가운데로 (하나님은 그리지 않는다) -->
    <g class="so-dreamlight">
      <path class="so-shaft" d="M182 -20 L218 -20 L262 252 L138 252 Z"/>
      <path class="so-shaft so-shaft--core" d="M194 -20 L206 -20 L222 252 L178 252 Z"/>
      <ellipse class="so-pool" cx="200" cy="244" rx="80" ry="9"/>
      ${motes}
    </g>
    ${ground(248)}
  </g>`;
}

// ── 왕의 재판 자리 (3:16-28) ───────────────────────
function courtArt(): string {
  const pillar = (x: number, w: number, cls: string) => `<g class="${cls}">
      <rect x="${f(x - w / 2)}" y="58" width="${f(w)}" height="176"/>
      <path d="M${f(x - w / 2 - 5)} 58 L${f(x + w / 2 + 5)} 58 L${f(x + w / 2 + 2)} 66 L${f(x - w / 2 - 2)} 66 Z"/>
      <path d="M${f(x - w / 2 - 4)} 234 L${f(x + w / 2 + 4)} 234 L${f(x + w / 2 + 4)} 240 L${f(x - w / 2 - 4)} 240 Z"/>
    </g>
    <path class="so-grain" d="M${f(x - w / 4)} 70 L${f(x - w / 4)} 230 M${f(x + w / 6)} 70 L${f(x + w / 6)} 230"/>`;
  const lamp = (x: number, y: number, d: number) => `<path class="so-chain" d="M${x} 40 L${x} ${y - 4}"/>
    <path class="bd-mid" d="M${x - 7} ${y - 4} L${x + 7} ${y - 4} L${x + 3} ${y + 2} L${x - 3} ${y + 2} Z"/>
    <g class="so-flame so-flame--lamp"><path style="--d:${d}s" d="M${x - 2} ${y - 4} C${x - 3} ${y - 8} ${x} ${y - 10} ${x} ${y - 13} C${x + 1} ${y - 10} ${x + 3} ${y - 8} ${x + 2} ${y - 4} Z"/></g>
    <circle class="bd-halo so-lamphalo" cx="${x}" cy="${y - 6}" r="22"/>`;
  return `<g class="so so--court">
    <rect class="so-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <rect class="so-beam" x="${-W * 2}" y="34" width="${W * 5}" height="12"/>
    <path class="so-beamline" d="M${-W * 2} 40 H${W * 3}"/>
    <!-- 백향목 기둥: 뒤 줄은 작게, 앞 줄은 크게 -->
    ${[-40, 30, 370, 440].map((x) => pillar(x, 22, 'bd-mid')).join('')}
    ${[96, 304].map((x) => pillar(x, 16, 'bd-far')).join('')}
    ${lamp(140, 92, 0.3)}${lamp(260, 92, 1.1)}
    <!-- 보좌 뒤 휘장과 빛 -->
    <circle class="bd-halo so-thronehalo" cx="200" cy="140" r="70"/>
    <path class="so-drape" d="M160 60 C170 70 230 70 240 60 L246 196 L154 196 Z"/>
    <path class="so-drapeline" d="M174 68 L170 196 M200 70 L200 196 M226 68 L230 196"/>
    <!-- 세 층 단과 높은 등받이 보좌 -->
    <g class="bd-mid">
      <rect x="140" y="214" width="120" height="12"/>
      <rect x="152" y="203" width="96" height="12"/>
      <rect x="164" y="193" width="72" height="11"/>
      <path d="M180 193 L180 108 C180 100 186 94 200 94 C214 94 220 100 220 108 L220 193 Z"/>
      <rect x="170" y="160" width="60" height="8"/>
      <path d="M170 160 L170 146 C170 140 176 138 178 144 L178 160 Z M230 160 L230 146 C230 140 224 138 222 144 L222 160 Z"/>
      <rect x="176" y="168" width="48" height="25"/>
    </g>
    <path class="so-goldline" d="M184 112 C186 104 192 100 200 100 C208 100 214 104 216 112 M140 214 H260 M152 203 H248 M164 193 H236"/>
    <circle class="so-goldline-dot" cx="200" cy="106" r="2.2"/>
    <!-- 양옆에 늘어선 신하들 -->
    ${folk(-30, 232, 120, 230, 12, 2.2, 9961, 'js-folk so-folk')}${folk(280, 230, 430, 232, 12, 2.2, 9962, 'js-folk so-folk')}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 240 L${W * 3} 240 L${W * 3} ${H} Z"/>
    <path class="so-tiles" d="M${-W * 2} 246 H${W * 3} M${-W * 2} 254 H${W * 3} M60 240 L20 ${H} M130 240 L110 ${H} M200 240 L200 ${H} M270 240 L290 ${H} M340 240 L380 ${H}"/>
  </g>`;
}

// ── 작은 집 안 (3:17-21) ───────────────────────────
function houseArt(dawn: boolean): string {
  const bricks = Array.from({ length: 9 }, (_, i) => `M${-W * 2} ${f(70 + i * 20)} H${W * 3}`).join(' ');
  const joints = Array.from({ length: 9 }, (_, i) =>
    Array.from({ length: 12 }, (_, j) => `M${f(-20 + j * 40 + (i % 2) * 20)} ${f(70 + i * 20)} v20`).join(' ')).join(' ');
  return `<g class="so so--house${dawn ? ' so--dawn' : ''}">
    <rect class="so-mud" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <path class="so-bricks" d="${bricks} ${joints}"/>
    <!-- 낮은 들보 -->
    <rect class="bd-mid" x="${-W * 2}" y="48" width="${W * 5}" height="14"/>
    ${[40, 120, 200, 280, 360].map((x) => `<rect class="bd-mid" x="${x - 5}" y="40" width="10" height="10"/>`).join('')}
    <!-- 작은 창: 밤엔 별, 미명엔 희뿌연 빛 -->
    <rect class="so-window" x="262" y="78" width="26" height="30"/>
    ${dawn ? '' : '<circle class="so-winstar" cx="270" cy="88" r="0.9"/><circle class="so-winstar" style="--d:1.4s" cx="281" cy="97" r="0.7"/><circle class="so-winstar" style="--d:2.6s" cx="276" cy="84" r="0.6"/>'}
    <path class="bd-mid" d="M260 76 H290 V80 H260 Z M260 106 H290 V110 H260 Z M274 78 V108" stroke="currentColor" stroke-width="2"/>
    ${dawn ? '<path class="so-dawnbeam" d="M262 108 L288 108 L250 240 L170 240 Z"/>' : ''}
    <!-- 벽감과 등잔 -->
    <path class="so-niche" d="M188 150 L188 130 C188 122 212 122 212 130 L212 150 Z"/>
    <path class="bd-mid" d="M192 150 C192 144 208 144 208 150 Z"/>
    ${dawn
      ? smoke(203, 140, 9971, 3)
      : `<g class="so-flame so-flame--lamp"><path style="--d:0.4s" d="M201 146 C200 142 203 139 203 135 C204 139 207 142 205 146 Z"/></g><circle class="bd-halo so-lamphalo so-lamphalo--big" cx="203" cy="140" r="52"/>`}
    <!-- 양쪽 벽에 붙은 낮은 침상 둘과 깔개 -->
    <g class="bd-mid">
      <rect x="20" y="214" width="122" height="20"/><rect x="258" y="214" width="122" height="20"/>
    </g>
    <path class="so-mat" d="M26 214 C60 208 104 208 138 213 L138 218 L26 218 Z M262 213 C296 208 340 208 374 214 L374 218 L262 218 Z"/>
    <!-- 물 항아리와 매단 바구니 -->
    <path class="bd-mid" d="M160 236 C152 226 152 212 158 204 L158 198 L170 198 L170 204 C176 212 176 226 168 236 Z"/>
    <path class="so-chain" d="M330 62 L322 96 M330 62 L338 96"/>
    <path class="bd-mid" d="M318 96 L342 96 L338 112 L322 112 Z"/>
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 236 L${W * 3} 236 L${W * 3} ${H} Z"/>
  </g>`;
}

export function solomonArt(art: SolomonArt): string {
  switch (art) {
    case 'so-gibeon': return gibeonArt();
    case 'so-dream': return dreamArt(false);
    case 'so-dream-wake': return dreamArt(true);
    case 'so-court': return courtArt();
    case 'so-house': return houseArt(false);
    case 'so-house-dawn': return houseArt(true);
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

const stageActors = (scene: HTMLElement) => [...scene.querySelectorAll<HTMLElement>('.scene__stage .actor')];

/** 무대 위 인물의 그림 상자 (scene 기준 좌표). id가 없거나 무대에 없으면 fallback 쪽 사람 */
function actorBox(scene: HTMLElement, id: string | undefined, fallback: 'center' | 'right' | 'left') {
  const b = scene.getBoundingClientRect();
  const actors = stageActors(scene);
  const art = (a: HTMLElement) => (a.querySelector<SVGElement>('.actor__art') ?? a).getBoundingClientRect();
  let el = id ? actors.find((a) => a.dataset.id === id) : undefined;
  if (!el && actors.length) {
    const xs = actors.map((a) => [a, art(a).left + art(a).width / 2 - b.left] as const);
    if (fallback === 'right') el = xs.reduce((m, c) => (c[1] > m[1] ? c : m))[0];
    else if (fallback === 'left') el = xs.reduce((m, c) => (c[1] < m[1] ? c : m))[0];
    else el = xs.reduce((m, c) => (Math.abs(c[1] - b.width / 2) < Math.abs(m[1] - b.width / 2) ? c : m))[0];
  }
  const a = el ? art(el) : null;
  if (!a || !a.width) return { el, x: b.width / 2, top: b.height * 0.4, h: b.height * 0.5, w: 80 };
  return { el, x: a.left - b.left + a.width / 2, top: a.top - b.top, h: a.height, w: a.width };
}

/** thousand: 일천 번제 (왕상 3:4) — 연기 기둥이 하나둘 늘어나고 숫자가 1000까지 차오름 */
export function playThousand(scene: HTMLElement, rm: boolean): void {
  const n = rm ? 0 : 30;
  const plumes = Array.from({ length: n }, (_, i) => {
    const x = 4 + ((i * 37) % 92) + ((i * 13) % 5);
    return `<i style="--x:${f(x)}%; --i:${i}; --s:${f(0.7 + ((i * 29) % 7) / 10)}; --sw:${f((((i * 17) % 9) - 4) * 3)}px"></i>`;
  }).join('');
  const layer = layerOf(scene, `fx-thousand${rm ? ' is-rm' : ''}`,
    `${plumes}<div class="fx-thousand__count"><b>${rm ? '1000' : '1'}</b><span>일천 번제</span></div>`,
    rm ? 3200 : 9400, 1800);
  if (rm) return;
  const num = layer.querySelector('b')!;
  const t0 = performance.now() + 600;
  const dur = 5600;
  const tick = (t: number) => {
    if (!layer.isConnected) return;
    const p = Math.min(1, Math.max(0, (t - t0) / dur));
    num.textContent = String(Math.max(1, Math.round(1000 * (1 - Math.pow(1 - p, 2.2)))));
    if (p < 1) requestAnimationFrame(tick);
    else layer.classList.add('is-done');
  };
  requestAnimationFrame(tick);
}

/** asks: 구하지 아니한 것들이 가라앉고 "듣는 마음"이 켜짐 (왕상 3:9-11) */
export function playAsks(scene: HTMLElement, rm: boolean): void {
  const words: [string, number, number][] = [['장수', 22, 26], ['부', 78, 20], ['원수의 생명', 50, 12]];
  layerOf(scene, `fx-asks${rm ? ' is-rm' : ''}`,
    `${words.map(([w, x, y], i) => `<span class="fx-asks__w" style="--x:${x}%; --y:${y}%; --i:${i}">${w}</span>`).join('')}
     <div class="fx-asks__heart"><b>듣는 마음</b><small lang="he">לֵב שֹׁמֵעַ</small></div>`,
    rm ? 3600 : 10400, 1800);
}

/** swaddle: 강보에 싼 아기 — 한 아이가 to(없으면 who)의 품에 안긴다. 다른 품에 있었으면 옮겨 간다 (왕상 3:20, 27) */
const BABE = `
  <g class="so-babe__in">
    <circle class="so-babe__glow" cx="118" cy="140" r="30"/>
    <path class="so-babe__cloth" d="M94 150 C90 142 96 132 108 130 C120 128 132 128 138 132 C142 136 140 144 132 148 C120 154 104 156 94 150 Z"/>
    <path class="so-babe__band" d="M104 133 Q102 142 106 152 M116 130 Q114 141 118 152 M127 130 Q126 140 129 149" fill="none"/>
    <circle class="so-babe__face" cx="139" cy="134" r="7.2"/>
    <path class="so-babe__cloth" d="M132 128 C136 122 146 124 147 131 C143 128 138 128 134 132 Z"/>
  </g>`;

function babeOn(actor: HTMLElement, rm: boolean): void {
  const host = actor.querySelector<SVGGElement>('[data-part="upper"]') ?? actor.querySelector<SVGGElement>('.actor__body');
  if (!host) return;
  host.querySelector('.so-babe')?.remove();
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', `so-babe${rm ? ' is-rm' : ''}`);
  g.innerHTML = BABE;
  host.append(g);
}

export function playSwaddle(scene: HTMLElement, who: string | undefined, to: string | undefined, rm: boolean): void {
  const target = actorBox(scene, to ?? who, 'center');
  if (!target.el) return;
  const prev = stageActors(scene).find((a) => a !== target.el && a.querySelector('.so-babe'));
  if (!prev) {
    babeOn(target.el, rm);
    return;
  }
  // 옮겨 감: 앞 품에서 스러지고, 금빛 티끌이 새 품으로 건너간 뒤 안긴다
  const from = actorBox(scene, prev.dataset.id, 'center');
  const old = prev.querySelector('.so-babe');
  old?.classList.add('is-out');
  setTimeout(() => old?.remove(), rm ? 300 : 900);
  const sx = from.x;
  const sy = from.top + from.h * 0.34;
  const tx = target.x;
  const ty = target.top + target.h * 0.34;
  if (!rm) {
    layerOf(scene, 'fx-swaddle',
      `<div class="fx-swaddle__at" style="--x:${f(sx)}px; --y:${f(sy)}px; --dx:${f(tx - sx)}px; --dy:${f(ty - sy)}px">
        ${Array.from({ length: 9 }, (_, i) => `<i style="--i:${i}; --o:${f(((i * 7) % 9 - 4) * 3)}px"></i>`).join('')}
      </div>`,
      3200, 900);
  }
  const el = target.el;
  setTimeout(() => { if (el.isConnected) babeOn(el, rm); }, rm ? 300 : 1500);
}

/** blade: 칼이 왕 앞에 옴 (왕상 3:24) — 무대가 차갑게 식고, 칼 높이에서 찬빛 한 줄기 */
export function playBlade(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const s = actorBox(scene, who, 'right');
  layerOf(scene, `fx-blade${rm ? ' is-rm' : ''}`,
    `<div class="fx-blade__chill"></div>
     <div class="fx-blade__at" style="--x:${f(s.x)}px; --y:${f(s.top + s.h * 0.5)}px; --w:${f(Math.max(60, s.w * 0.9))}px">
       <span class="fx-blade__glint"></span><span class="fx-blade__star"></span>
     </div>`,
    rm ? 2600 : 5200, 1600);
}
