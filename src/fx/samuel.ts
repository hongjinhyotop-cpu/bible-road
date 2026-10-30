// 7막 A급 — 한나와 어린 사무엘 (삼상 1–2 · 3)의 전용 배경과 효과. 같은 종이 오려낸 그림자극 말투.
// 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - sm-road     : 실로로 오르는 길. 굽이진 비탈길을 오르는 순례자들, 언덕 꼭대기 돌담 안의 여호와의 집 (삼상 1:3, 24)
//  - sm-shiloh   : 실로 여호와의 집 앞. 두 문설주와 휘장 문(안에 등불), 왼쪽 문설주 곁 엘리의 의자 (1:9),
//                  오른쪽 번제단 연기, 왼쪽 불 위의 큰 솥 (2:13-14)
//  - sm-ramah    : 라마의 집 안, 밤. 벽감의 등잔, 작은 겉옷이 반쯤 짜인 베틀, 못에 걸린 다 지은 작은 겉옷 (2:19)
//  - sm-lamp     : 실로 여호와의 전 안, 밤 — 둘로 나뉜 방. 왼쪽: 휘장 너머 궤의 빛, 낮게 타는 일곱 등잔의 등대,
//                  바닥의 소년의 자리 (3:3). 오른쪽: 벽 너머 엘리의 처소, 낮은 침상과 작은 등잔 (3:2)
//  - sm-lamp-out : 같은 곳, 새벽. 등대의 불은 꺼져 가는 연기 한 줄, 오른쪽 문이 열려 아침빛이 들어옴 (3:15)
// 효과:
//  - little-robes : 해마다 지어 온 작은 겉옷 — 한 벌씩 조금 더 큰 옷이 줄지어 켜지고 "해마다" (약 9초, 2:19)
// 하나님은 그리지 않는다 (voice · glory · 빛).
import { H, W, rng, smoke, tree } from './backdrop';
import { folk, ground, ridge } from './joshua';

export type SamuelArt = 'sm-road' | 'sm-shiloh' | 'sm-ramah' | 'sm-lamp' | 'sm-lamp-out';

const f = (n: number) => n.toFixed(1);

/** 감람나무 (작고 둥근 잎 덩이) */
const olive = (x: number, y: number, s: number, seed: number, cls = 'bd-mid') => tree(x, y, 34 * s, cls, seed, { sway: true });

// ── 실로로 오르는 길 ─────────────────────────────
function roadArt(): string {
  const r = rng(9101);
  // 계단식 밭의 줄
  const terraces = Array.from({ length: 6 }, (_, i) => {
    const y = 206 - i * 13;
    return `<path class="sm-terrace" d="M${f(-60 + i * 20)} ${y} C${f(60 + i * 10)} ${y - 4} ${f(160 + i * 8)} ${y + 2} ${f(230 - i * 2)} ${y - 6}"/>`;
  }).join('');
  return `<g class="sm sm--road">
    ${ridge([[-W * 2, 150], [-160, 140], [-40, 148], [60, 132], [150, 146], [330, 138], [460, 146], [W * 3, 140]], 'bd-far')}
    <!-- 실로 언덕 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 214 C-60 210 60 200 140 176 C190 160 220 128 262 122 C300 118 330 140 370 170 C410 196 500 206 ${W * 3} 210 L${W * 3} ${H} Z"/>
    ${terraces}
    <!-- 꼭대기: 돌담 안의 여호와의 집 -->
    <g class="bd-mid sm-house">
      <rect x="232" y="104" width="62" height="18"/>
      <path d="M238 104 L246 92 L282 92 L290 104 Z"/>
      <rect x="226" y="118" width="74" height="5"/>
    </g>
    <rect class="sm-doorlit" x="259" y="110" width="7" height="12" rx="1"/>
    <circle class="bd-halo sm-househalo" cx="262" cy="104" r="44"/>
    <!-- 굽이진 길 -->
    <path class="sm-road" d="M140 ${H} C150 238 196 232 210 220 C226 206 170 196 172 184 C174 170 228 168 236 152 C242 140 236 130 248 124"/>
    ${folk(176, 226, 206, 220, 4, 2.1, 9102)}${folk(184, 184, 214, 170, 4, 1.7, 9103)}${folk(230, 150, 242, 132, 3, 1.4, 9104)}
    ${olive(70, 214, 1.3, 9105)}${olive(110, 206, 1, 9106)}${olive(330, 186, 1.1, 9107)}${olive(372, 200, 1.2, 9108)}
    ${Array.from({ length: 4 }, (_, i) => olive(-30 + i * 150 + r() * 30, 252, 1.6, 9110 + i, 'bd-near')).join('')}
    ${ground(250)}
  </g>`;
}

// ── 실로 여호와의 집 앞 ──────────────────────────
function shilohArt(): string {
  return `<g class="sm sm--shiloh">
    ${ridge([[-W * 2, 142], [-120, 134], [20, 140], [140, 126], [260, 136], [380, 124], [W * 3, 134]], 'bd-far')}
    <!-- 집의 앞면 (돌벽) -->
    <g class="bd-mid sm-facade">
      <rect x="120" y="118" width="180" height="122"/>
      <rect x="114" y="112" width="192" height="8"/>
      <path class="sm-stones" d="M120 140 H300 M120 164 H300 M120 188 H300 M120 212 H300 M150 118 V140 M250 118 V140 M140 140 V164 M270 140 V164 M150 164 V188 M262 164 V188 M136 188 V212 M276 188 V212"/>
    </g>
    <!-- 문 안의 등불 -->
    <rect class="sm-doorway" x="186" y="150" width="40" height="90"/>
    <circle class="bd-halo sm-lamphalo" cx="206" cy="190" r="46"/>
    <g class="sm-innerlamp"><rect x="204" y="196" width="4" height="30"/><path d="M196 196 h20 l-3 -4 h-14 Z"/><ellipse class="sm-flame" cx="206" cy="187" rx="2" ry="4"/></g>
    <!-- 반쯤 걷힌 휘장 -->
    <path class="sm-curtain" d="M186 150 L204 150 C200 172 194 196 192 240 L186 240 Z"/>
    <!-- 두 문설주와 인방 -->
    <g class="sm-post"><rect x="178" y="146" width="9" height="94"/><rect x="225" y="146" width="9" height="94"/><rect x="174" y="140" width="64" height="8"/></g>
    <!-- 문설주 곁 엘리의 의자 (1:9) -->
    <g class="sm-chair"><rect x="150" y="214" width="22" height="4"/><rect x="151" y="218" width="3" height="22"/><rect x="168" y="218" width="3" height="22"/><path d="M150 214 L148 184 C152 180 156 180 158 184 L156 214 Z"/></g>
    <!-- 오른쪽: 번제단과 연기 -->
    <g class="bd-mid"><rect x="312" y="212" width="40" height="28"/><rect x="308" y="208" width="48" height="5"/><path d="M308 208 l-3 -5 l4 1 Z M356 208 l3 -5 l-4 1 Z"/></g>
    <ellipse class="sm-ember" cx="332" cy="207" rx="14" ry="2.4"/>
    ${smoke(332, 200, 9201, 7)}
    <!-- 왼쪽: 불 위의 큰 솥 (2:13-14) -->
    <g class="bd-mid sm-pot"><path d="M64 214 C64 230 76 238 90 238 C104 238 116 230 116 214 Z"/><rect x="60" y="210" width="60" height="5" rx="2"/><path d="M72 238 L68 246 M108 238 L112 246" stroke="currentColor" stroke-width="3"/></g>
    <ellipse class="sm-ember" cx="90" cy="244" rx="16" ry="2.6"/>
    <path class="sm-steam" d="M84 206 C80 196 88 190 84 180 M96 206 C100 196 92 188 98 178"/>
    ${ground(242)}
  </g>`;
}

// ── 라마의 집 안 ────────────────────────────────
/** 작은 겉옷 하나 (어깨 너비 w, 길이 h) */
function coat(x: number, y: number, w: number, h: number, cls: string): string {
  const s = w / 2;
  return `<path class="${cls}" d="M${f(x - s * 0.36)} ${f(y)} Q${f(x)} ${f(y + h * 0.06)} ${f(x + s * 0.36)} ${f(y)} L${f(x + s)} ${f(y + h * 0.1)} L${f(x + s * 1.1)} ${f(y + h * 0.42)} L${f(x + s * 0.7)} ${f(y + h * 0.44)} L${f(x + s * 0.76)} ${f(y + h)} L${f(x - s * 0.76)} ${f(y + h)} L${f(x - s * 0.7)} ${f(y + h * 0.44)} L${f(x - s * 1.1)} ${f(y + h * 0.42)} L${f(x - s)} ${f(y + h * 0.1)} Z"/>`;
}

function ramahArt(): string {
  const warp = Array.from({ length: 13 }, (_, i) => `M${158 + i * 4} 132 L${158 + i * 4} 214`).join(' ');
  return `<g class="sm sm--ramah">
    <rect class="sm-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <!-- 높은 창, 밤 하늘과 달 -->
    <rect class="sm-nightwin" x="282" y="56" width="30" height="40" rx="2"/>
    <circle class="sm-moon" cx="300" cy="68" r="5"/>
    <path class="sm-shaft" d="M282 96 L312 96 L340 236 L250 236 Z"/>
    <!-- 벽감의 등잔 -->
    <path class="sm-niche" d="M96 176 L96 150 Q108 138 120 150 L120 176 Z"/>
    <path class="bd-mid" d="M100 176 C100 172 106 170 112 170 C118 170 120 172 119 176 Z"/>
    <ellipse class="jg-flame" cx="117" cy="166" rx="1.8" ry="3.6"/>
    <circle class="bd-halo sm-lamphalo" cx="112" cy="166" r="64"/>
    <!-- 베틀: 두 기둥, 가로대, 날실, 반쯤 짜인 작은 겉옷 -->
    <g class="bd-mid sm-loom"><rect x="150" y="122" width="5" height="114"/><rect x="211" y="122" width="5" height="114"/><rect x="146" y="120" width="74" height="5"/><rect x="148" y="214" width="70" height="4"/></g>
    <path class="sm-warp" d="${warp}"/>
    <path class="sm-cloth" d="M156 186 L210 186 L210 214 L156 214 Z"/>
    <path class="sm-weft" d="M156 192 H210 M156 198 H210 M156 204 H210 M156 210 H210"/>
    <!-- 못에 걸린 다 지은 작은 겉옷 -->
    <rect class="bd-mid" x="248" y="118" width="4" height="4"/>
    <path class="sm-peg" d="M250 122 L240 130 M250 122 L260 130"/>
    ${coat(250, 128, 26, 44, 'sm-coat-hung')}
    <rect class="bd-mid" x="${-W * 2}" y="236" width="${W * 5}" height="${H - 236}"/>
  </g>`;
}

// ── 여호와의 전 안 (밤 / 새벽) ───────────────────
function lampArt(dawn: boolean): string {
  // 등대 (일곱 등잔): 가운데 줄기, 양쪽 세 가지
  const cx = 168;
  const arms = [1, 2, 3].map((k) => {
    const dx = k * 9;
    return `<path d="M${cx} ${200 - k * 4} C${cx - dx * 0.4} ${200 - k * 4} ${cx - dx} ${196 - k * 8} ${cx - dx} ${168}" /><path d="M${cx} ${200 - k * 4} C${cx + dx * 0.4} ${200 - k * 4} ${cx + dx} ${196 - k * 8} ${cx + dx} ${168}"/>`;
  }).join('');
  const cups = [-27, -18, -9, 0, 9, 18, 27];
  const flames = dawn
    ? `<g class="sm-outsmoke">${smoke(cx, 150, 9301, 3)}</g>`
    : cups.map((d, i) => `<ellipse class="sm-lowflame" style="--d:${f(i * 0.37)}s" cx="${cx + d}" cy="${163 - (d === 0 ? 2 : 0)}" rx="1.5" ry="2.6"/>`).join('');
  const veilLines = Array.from({ length: 6 }, (_, i) => `M${54 + i * 22} 64 Q${60 + i * 22} 150 ${52 + i * 22} 236`).join(' ');
  return `<g class="sm sm--lamp${dawn ? ' is-dawn' : ''}">
    <rect class="sm-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <!-- 왼쪽 방: 휘장 너머 궤의 빛 -->
    <rect class="sm-veil" x="30" y="58" width="150" height="178"/>
    <path class="sm-veillines" d="${veilLines}"/>
    <!-- 휘장에 수놓은 그룹 (날개를 마주 편 둘) -->
    <g class="sm-cherub">${[118, 150].map((x, i) => `<path transform="translate(${x} 92) scale(${i ? -1 : 1} 1)" d="M0 0 C6 -10 14 -14 22 -12 C16 -8 12 -2 10 6 C8 2 4 0 0 0 Z M8 8 C10 14 10 22 7 28 L4 28 C5 22 5 14 4 9 Z"/>`).join('')}</g>
    <circle class="bd-halo sm-arkglow" cx="134" cy="104" r="64"/>
    <!-- 등대 -->
    <g class="sm-lampstand">${arms}<rect x="${cx - 1.6}" y="160" width="3.2" height="76"/><path d="M${cx - 12} 236 L${cx} 226 L${cx + 12} 236 Z"/>
      ${cups.map((d) => `<path d="M${cx + d - 3} 166 h6 l-1.4 3 h-3.2 Z"/>`).join('')}</g>
    ${flames}
    ${dawn ? '' : `<circle class="bd-halo sm-lamphalo" cx="${cx}" cy="164" r="54"/>`}
    <!-- 소년의 자리 -->
    <path class="sm-mat" d="M84 238 L170 238 L174 242 L80 242 Z"/>
    <!-- 가운데 벽: 엘리의 처소로 난 문 -->
    <rect class="sm-wall2" x="196" y="0" width="22" height="236"/>
    <rect class="sm-passage" x="200" y="150" width="14" height="86"/>
    <!-- 오른쪽 방: 엘리의 처소 -->
    <rect class="sm-nightwin" x="248" y="58" width="20" height="28" rx="2"/>
    ${dawn ? '' : '<g class="js-stars"><circle cx="253" cy="66" r="0.8"/><circle cx="262" cy="72" r="0.6"/><circle cx="257" cy="80" r="0.7"/></g>'}
    <path class="sm-door${dawn ? ' is-open' : ''}" d="M300 236 L300 128 L330 128 L330 236 Z"/>
    ${dawn ? `<path class="sm-morning" d="M300 128 L330 128 L380 ${H} L232 ${H} Z"/><circle class="bd-halo sm-dawnhalo" cx="315" cy="180" r="80"/>` : ''}
    <path class="sm-niche" d="M262 170 L262 150 Q270 142 278 150 L278 170 Z"/>
    ${dawn ? '' : '<ellipse class="jg-flame" cx="272" cy="160" rx="1.4" ry="2.8"/><circle class="bd-halo sm-smallhalo" cx="270" cy="162" r="34"/>'}
    <g class="bd-mid sm-bed"><rect x="232" y="222" width="86" height="6" rx="2"/><rect x="236" y="228" width="4" height="10"/><rect x="310" y="228" width="4" height="10"/><path d="M232 222 C230 214 236 210 244 212 L246 222 Z"/></g>
    <rect class="bd-mid" x="${-W * 2}" y="236" width="${W * 5}" height="${H - 236}"/>
  </g>`;
}

export function samuelArt(art: SamuelArt): string {
  switch (art) {
    case 'sm-road': return roadArt();
    case 'sm-shiloh': return shilohArt();
    case 'sm-ramah': return ramahArt();
    case 'sm-lamp': return lampArt(false);
    case 'sm-lamp-out': return lampArt(true);
  }
}

// ── 효과 ───────────────────────────────────────
const YEARS = ['한 해', '두 해', '세 해', '네 해', '다섯 해', '여섯 해'];

/** little-robes: 해마다 지어 온 작은 겉옷 (삼상 2:19) — 한 벌씩 조금 더 큰 옷이 줄지어 켜진다 */
export function playLittleRobes(scene: HTMLElement, rm: boolean): void {
  const n = rm ? 3 : YEARS.length;
  const robes = Array.from({ length: n }, (_, i) => {
    const h = 34 + i * 9;
    const w = 20 + i * 4.4;
    return `<li style="--i:${i}"><svg viewBox="-40 -6 80 ${h + 12}" width="${f(w * 1.6)}" height="${f(h + 12)}" aria-hidden="true">${coat(0, 0, w, h, 'fx-robes__coat')}<path class="fx-robes__hem" d="M${f(-w * 0.38)} ${f(h - 3)} L${f(w * 0.38)} ${f(h - 3)}"/></svg><small>${YEARS[i]}</small></li>`;
  }).join('');
  const layer = document.createElement('div');
  layer.className = `fx-robes${rm ? ' is-rm' : ''}`;
  layer.innerHTML = `<ol>${robes}</ol><p>해마다</p>`;
  scene.append(layer);
  const life = rm ? 3200 : 9400;
  setTimeout(() => layer.classList.add('is-out'), life - 1600);
  setTimeout(() => layer.remove(), life);
}
