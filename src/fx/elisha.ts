// 9막 A급 — 엘리사와 북이스라엘의 끝 (왕하 2 「불 수레」 · 5 「요단에 일곱 번」 · 17 「사마리아가 무너지다」).
// 전용 배경과 효과. 같은 종이 오려낸 그림자극 말투. 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - es-bethel        : 언덕 꼭대기의 벧엘 성읍, 오르는 굽은 길, 성 곁 산당의 금송아지 빛, 오른쪽 앞의 빽빽한 수풀 (왕하 2:2-3, 23-24)
//  - es-jericho       : 종려나무 사이 둔덕 위의 여리고(다시 세운 성), 요단 평지, 멀리 모압 산 (2:4-5, 15-18)
//  - es-jordan        : 요단 가. 가로질러 흐르는 강과 갈대, 건너편 평지와 모압 산, 왼쪽 둔덕 위에 멀리 서서 바라보는 생도 오십 인 (2:7).
//                       fx mantle-strike로 물이 이리저리 갈라진다
//  - es-jordan-parted : 같은 강, 물이 양쪽으로 물러나 쌓이고 가운데 마른 바닥 (2:8, 14)
//  - es-beyond        : 요단 건너편 동쪽 평지. 낮은 언덕, 넓은 하늘, 하늘 가운데 천천히 도는 구름 소용돌이 (2:9-12)
//  - es-spring        : 여리고의 물 근원. 바위 틈의 샘과 못, 잿빛 물, 열매가 익지 못하고 떨어진 나무들 (2:19). fx salt로 고쳐진다
//  - es-spring-sweet  : 같은 샘, 맑은 물이 반짝이고 나무에 열매, 새싹 (2:21-22)
//  - es-damascus      : 다메섹. 멀리 흰 눈 덮인 헐몬, 성과 림몬의 신당, 미루나무, 앞으로 흐르는 맑은 두 강 아마나·바르발 (5:1, 12, 18)
//  - es-door          : 사마리아의 엘리사의 집 문. 작은 흙벽돌 집과 닫힌 문, 그 앞에 선 나아만의 병거와 말들 (5:9)
//  - es-jordan-naaman : 요단 물속. 앞쪽이 온통 흙빛 강물, 건너편의 빽빽한 요단 수풀과 갈대 (5:14). fx seven-dips와 같이
//  - es-samaria       : 사마리아 산 위의 성. 둘레의 성벽과 망대, 꼭대기의 상아궁 기둥 (왕상 16:24, 22:39 — 왕하 17:1)
//  - es-samaria-siege : 같은 성, 산 아래 앗수르의 진 — 장막, 깃발, 화톳불, 성벽에 걸친 토성과 성 치는 틀 (17:5). fx samaria-falls
//  - es-samaria-fallen: 무너진 성벽, 부러진 기둥, 피어오르는 연기 기둥 (17:6)
//  - es-exile-road    : 해 지는 쪽에서 해 뜨는 쪽으로 끝없이 걸어가는 사로잡힌 사람들의 줄과 창 든 호송병 (17:6, 23)
//  - es-calves        : 벧엘 산당의 금송아지 — 돌 단 위의 금빛 송아지와 향 연기, 먼 북쪽 산마루에 또 하나의 금빛 점(단) (17:16, 21-22)
//  - es-high-places   : 산마다 산당 — 언덕 꼭대기마다 작은 단과 연기, 푸른 나무 아래 목상과 주상 (17:9-11, 29-33)
// 효과:
//  - mantle-strike : 겉옷을 말아 물을 침 — 치는 사람(who, 없으면 elijah → 가운데 사람)의 손에서 말린 겉옷이 내리쳐지고 물보라 고리,
//                    배경(es-jordan)의 강이 양쪽으로 물러나 쌓이며 가운데 마른 바닥이 드러남 (약 5초, 왕하 2:8, 14)
//  - chariot-fire  : 불 수레와 불 말들이 두 사람 사이를 가르고 지나감 → 회리바람이 엘리야(who, 없으면 elijah)를 감아 올려
//                    인물이 하늘로 작아지며 사라짐 (약 10초, 2:11). 인물은 빛 속에 사라지고, 다음 beat에서 exit
//  - mantle-fall   : 하늘에서 겉옷 한 벌이 너울너울 내려와 받는 사람(to → who → elisha) 발치에 떨어짐 (약 5초, 2:13)
//  - salt          : 새 그릇의 소금 — 던지는 사람(who, 없으면 elisha) 손에서 흰 알갱이가 샘으로 흩어지고 물결 고리, 배경 es-spring이 맑아짐 (약 6초, 2:21)
//  - seven-dips    : 요단에 일곱 번 — 대상(who, 없으면 naaman)이 물에 잠겼다 나오기를 일곱 번, 위에 숫자 1…7, 마지막에 살빛이 밝아짐 (약 13초, 5:14).
//                    다음 beat에 naaman 옷 healed
//  - samaria-falls : 사마리아가 무너짐 — 배경 es-samaria-siege의 성벽 토막이 차례로 무너지고 상아궁 기둥이 기울고 연기 기둥, 흙먼지 (약 7초, 17:6). shake와 같이
//  - warnings      : 각 선지자와 각 선견자 — 어두운 하늘에 보낸 선지자들의 이름이 등불처럼 하나씩 켜졌다가(아히야 … 호세아),
//                    "듣지 아니하고" 하나씩 꺼짐 (약 12초, 17:13-14)
// 하나님은 그리지 않는다. 함락·사로잡힘은 성벽과 연기, 걸어가는 줄로만 — 죽음·폭력은 그리지 않는다.
import { H, W, palm, reeds, rng, smoke, tree } from './backdrop';
import { folk, ground, ridge } from './joshua';

export type ElishaArt =
  | 'es-bethel' | 'es-jericho' | 'es-jordan' | 'es-jordan-parted' | 'es-beyond' | 'es-spring' | 'es-spring-sweet'
  | 'es-damascus' | 'es-door' | 'es-jordan-naaman'
  | 'es-samaria' | 'es-samaria-siege' | 'es-samaria-fallen' | 'es-exile-road' | 'es-calves' | 'es-high-places';

const f = (n: number) => n.toFixed(1);

/** 납작 지붕 집들 (언덕 위 성읍) */
function houses(cx: number, top: number, n: number, step: number, seed: number, cls = 'bd-mid', lit = 0.4): string {
  const r = rng(seed);
  return Array.from({ length: n }, (_, i) => {
    const w = step * (0.8 + r() * 0.5);
    const h = 6 + r() * 9;
    const x = cx - (n / 2) * step + i * step + (r() - 0.5) * 2;
    const y = top + Math.abs(i - (n - 1) / 2) * 1.6;
    const win = r() < lit ? `<rect class="es-window" style="--d:${f(r() * 4)}s" x="${f(x + w * 0.4)}" y="${f(y - h * 0.6)}" width="1.6" height="2.2"/>` : '';
    return `<g class="${cls}"><rect x="${f(x)}" y="${f(y - h)}" width="${f(w)}" height="${f(h)}"/></g>${win}`;
  }).join('');
}

/** 성가퀴 달린 성벽 토막 */
function battlement(x0: number, x1: number, top: number, base: number): string {
  const teeth: string[] = [];
  for (let x = x0; x < x1 - 2; x += 5.5) teeth.push(`<rect x="${f(x)}" y="${f(top - 3)}" width="3" height="3"/>`);
  return `<rect x="${f(x0)}" y="${f(top)}" width="${f(x1 - x0)}" height="${f(base - top)}"/>${teeth.join('')}`;
}

/** 작은 금송아지 (옆모습). 원점 = 발 가운데 */
function calf(x: number, y: number, s: number, cls = 'es-calf'): string {
  return `<g class="${cls}" transform="translate(${f(x)} ${f(y)}) scale(${s})">
    <path d="M-9 0 L-8.4 -6 L-6.8 -6 L-6.6 0 Z M-4 0 L-4 -6 L-2.6 -6 L-2.4 0 Z M4 0 L4.4 -6 L6 -6 L6.2 0 Z M8 0 L8 -6 L9.4 -6 L9.8 0 Z"/>
    <path d="M-10 -6 C-11 -10 -8 -13 -2 -13 L6 -13 C9 -13 10 -12 11 -14 C12 -17 14 -18 16 -17 L18 -15 L17 -13 C16 -11 14 -10 12 -9 C11 -7 10 -6 9 -5 L-8 -5 C-9 -5 -10 -5 -10 -6 Z"/>
    <path d="M13 -18 C12 -21 13 -23 15 -23 M16 -18 C17 -21 18 -22 20 -21" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linecap="round"/>
    <path d="M-10 -9 C-13 -8 -14 -5 -13 -2" fill="none" stroke="currentColor" stroke-width="0.8"/>
  </g>`;
}

/** 산당: 돌 단 + 연기 + 목상(아세라)·주상 + 푸른 나무 */
function shrine(x: number, y: number, s: number, seed: number, cls = 'bd-mid'): string {
  const r = rng(seed);
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s}) translate(${f(-x)} ${f(-y)})">
    ${tree(x + 13, y, 34, cls, seed + 1, { sway: true, lean: r() * 0.2 - 0.1 })}
    <g class="${cls}"><rect x="${f(x - 7)}" y="${f(y - 7)}" width="14" height="7"/><rect x="${f(x - 8.5)}" y="${f(y - 9)}" width="17" height="2.4"/>
      <rect x="${f(x - 16)}" y="${f(y - 16)}" width="2.2" height="16"/><path d="M${f(x - 17.6)} ${f(y - 16)} L${f(x - 12.2)} ${f(y - 16)} L${f(x - 13)} ${f(y - 19)} L${f(x - 16.8)} ${f(y - 19)} Z"/>
      <path d="M${f(x - 22)} ${f(y)} L${f(x - 21)} ${f(y - 12)} C${f(x - 21)} ${f(y - 14)} ${f(x - 19)} ${f(y - 14)} ${f(x - 19)} ${f(y - 12)} L${f(x - 18)} ${f(y)} Z"/></g>
    <ellipse class="es-ember" cx="${f(x)}" cy="${f(y - 9.4)}" rx="5" ry="1.1"/>
    ${smoke(x, y - 12, seed + 2, 4)}
  </g>`;
}

/** 병거 한 대 (옆모습, 오른쪽을 봄). 원점 = 바퀴 아래 */
function chariot(x: number, y: number, s: number): string {
  return `<g class="bd-mid es-chariot" transform="translate(${f(x)} ${f(y)}) scale(${s})">
    <path d="M-12 -10 L8 -10 L10 -22 L-10 -22 Z"/><path d="M8 -12 L26 -16" stroke="currentColor" stroke-width="1.6" fill="none"/>
    <circle cx="-1" cy="-9" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
    <path d="M-1 -18 V0 M-10 -9 H8 M-7.4 -15.4 L5.4 -2.6 M5.4 -15.4 L-7.4 -2.6" stroke="currentColor" stroke-width="0.9"/>
    <rect x="-12" y="-36" width="2" height="16"/><path class="es-pennon" d="M-10 -36 L0 -33 L-10 -30 Z"/>
  </g>`;
}

/** 말 한 마리 (옆모습, 오른쪽을 봄). 원점 = 발 아래 */
function horse(x: number, y: number, s: number, cls = 'bd-mid', head = 0): string {
  return `<g class="${cls}" transform="translate(${f(x)} ${f(y)}) scale(${s})">
    <path d="M-14 0 L-13 -12 L-11 -12 L-11 0 Z M-8 0 L-8 -12 L-6 -12 L-5.6 0 Z M8 0 L9 -12 L11 -12 L11 0 Z M13 0 L13 -12 L15 -12 L15.6 0 Z"/>
    <path d="M-16 -12 C-18 -18 -14 -24 -6 -24 L8 -24 C12 -24 14 -26 16 -30 C17 -33 19 -37 22 -38 L27 ${f(-35 + head)} C28 ${f(-33 + head)} 27 ${f(-31 + head)} 25 ${f(-31 + head)} L21 -31 C19 -27 18 -20 16 -14 C15 -12 13 -11 10 -11 L-12 -11 C-14 -11 -15 -11 -16 -12 Z"/>
    <path d="M17 -32 C14 -30 12 -27 11 -24 L14 -24 C15 -27 17 -30 19 -32 Z"/>
    <path d="M-16 -18 C-21 -16 -22 -10 -20 -4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </g>`;
}

// ── 벧엘 (2:2-3, 23-24) ──────────────────────────
function bethelArt(): string {
  const r = rng(9101);
  const thicket = Array.from({ length: 9 }, (_, i) => tree(286 + i * 22 + r() * 8, 246 - r() * 6, 66 + r() * 34, i % 2 ? 'bd-mid' : 'bd-near', 9110 + i, { sway: true, lean: (r() - 0.5) * 0.3 })).join('');
  return `<g class="es es--bethel">
    ${ridge([[-W * 2, 150], [-120, 140], [20, 148], [120, 134], [250, 142], [380, 128], [W * 3, 140]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 214 C-60 210 40 190 92 162 C120 146 140 132 166 128 L246 128 C272 132 294 148 320 168 C360 194 470 206 ${W * 3} 212 L${W * 3} ${H} Z"/>
    <!-- 언덕 위 성읍과 성벽 -->
    ${houses(206, 122, 10, 9, 9102)}
    <g class="bd-mid">${battlement(160, 194, 120, 132)}${battlement(214, 252, 120, 132)}<rect x="192" y="114" width="24" height="18"/><rect x="190" y="111" width="28" height="3"/></g>
    <path class="es-gate" d="M199 132 L199 122 Q204 116 209 122 L209 132 Z"/>
    <!-- 성 곁 산당의 금송아지 (왕상 12:29 "하나는 벧엘에 두고") -->
    <g class="bd-mid"><rect x="258" y="124" width="18" height="8"/><rect x="256" y="121" width="22" height="3"/></g>
    <circle class="es-calf-halo" cx="267" cy="116" r="12"/>
    ${calf(267, 121, 0.36, 'es-calf es-calf--small')}
    <!-- 굽어 오르는 길 -->
    <path class="es-road" d="M176 ${H} C150 246 132 236 150 222 C170 206 238 204 240 186 C242 170 212 162 206 150 C202 142 204 136 204 132"/>
    ${tree(70, 224, 70, 'bd-mid', 9103, { sway: true })}${tree(118, 210, 44, 'bd-mid', 9104, { sway: true })}
    <!-- 오른쪽 앞의 수풀 (2:24 "수풀에서") -->
    <g class="es-thicket">${thicket}</g>
    ${ground(250)}
  </g>`;
}

// ── 여리고 (2:4-5, 15-18) ────────────────────────
function jerichoArt(): string {
  const r = rng(9121);
  return `<g class="es es--jericho">
    ${ridge([[-W * 2, 132], [-160, 122], [-40, 132], [60, 128], [160, 150], [280, 146], [360, 128], [480, 120], [W * 3, 128]], 'bd-far')}
    ${ridge([[-W * 2, 190], [-60, 186], [80, 192], [200, 188], [320, 192], [480, 186], [W * 3, 190]], 'bd-far es-plain')}
    <path class="es-glint" d="M300 191 C330 189 360 193 400 190 C440 188 480 192 520 190"/>
    <path class="bd-mid" d="M30 ${H} L30 230 C70 220 100 204 128 198 L272 198 C300 204 330 220 370 230 L370 ${H} Z"/>
    ${houses(200, 194, 14, 10, 9122)}
    <g class="bd-mid">${battlement(126, 186, 190, 200)}${battlement(214, 276, 190, 200)}</g>
    ${Array.from({ length: 7 }, (_, i) => palm(112 + i * 30 + r() * 8, 200 + r() * 4, 34 + r() * 12, 'bd-mid', 9130 + i)).join('')}
    ${palm(40, 250, 120, 'bd-near', 9140)}${palm(360, 252, 130, 'bd-near', 9141)}${palm(-40, 252, 110, 'bd-near', 9142)}${palm(440, 250, 100, 'bd-near', 9143)}
    ${ground(250)}
  </g>`;
}

// ── 요단 가 (2:7-8, 13-14) ───────────────────────
function jordanArt(parted: boolean): string {
  const riverL = `M${-W * 2} 200 C-200 197 0 203 120 199 C160 198 190 201 200 200 L200 233 C190 234 160 232 120 234 C0 237 -200 232 ${-W * 2} 235 Z`;
  const riverR = `M200 200 C210 199 240 202 280 199 C400 196 600 203 ${W * 3} 199 L${W * 3} 234 C600 237 400 232 280 234 C240 235 210 233 200 233 Z`;
  const flow = Array.from({ length: 6 }, (_, i) => `<path class="es-flow" style="--d:${f(i * 1.3)}s" d="M${f(-60 + i * 90)} ${f(210 + (i % 3) * 7)} q14 -2.4 28 0"/>`).join('');
  return `<g class="es es--jordan${parted ? ' es--parted' : ''}">
    ${ridge([[-W * 2, 140], [-120, 128], [40, 136], [150, 122], [260, 132], [380, 118], [W * 3, 128]], 'bd-far')}
    <path class="bd-far es-plain" d="M${-W * 2} ${H} L${-W * 2} 190 C0 186 200 192 ${W * 3} 186 L${W * 3} ${H} Z"/>
    ${Array.from({ length: 5 }, (_, i) => palm(250 + i * 34, 194, 16 + (i % 2) * 5, 'bd-far', 9150 + i)).join('')}
    <!-- 왼쪽 둔덕 위: 멀리 서서 바라보는 생도 오십 인 (2:7) -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 198 C-60 194 40 186 90 180 C120 177 140 184 160 196 L160 ${H} Z"/>
    ${folk(64, 182, 146, 192, 22, 1.2, 9151, 'js-folk es-fifty')}
    <!-- 강바닥 (물이 물러나면 드러남) -->
    <path class="es-bed" d="M120 199 C160 198 240 202 280 199 L280 234 C240 235 160 232 120 234 Z"/>
    <path class="es-bed__line" d="M150 210 C180 214 220 208 250 212 M140 224 C176 228 226 222 262 226"/>
    <g class="es-river">
      <g class="es-river__l"><path class="es-water" d="${riverL}"/><path class="es-heap" d="M200 234 C192 222 190 200 196 184 C198 178 203 178 205 186 C207 196 206 214 206 234 Z"/></g>
      <g class="es-river__r"><path class="es-water" d="${riverR}"/><path class="es-heap es-heap--r" d="M200 234 C208 222 210 200 204 184 C202 178 197 178 195 186 C193 196 194 214 194 234 Z"/></g>
      <g class="es-flows">${flow}</g>
    </g>
    ${reeds(110, 238, 1.2, 'bd-mid', 9152)}${reeds(300, 238, 1.3, 'bd-mid', 9153)}${reeds(40, 240, 1.4, 'bd-mid', 9154)}${reeds(372, 240, 1.2, 'bd-mid', 9155)}
    ${ground(250)}
  </g>`;
}

// ── 요단 건너편 (2:9-12) ─────────────────────────
function beyondArt(): string {
  const r = rng(9171);
  const swirl = Array.from({ length: 6 }, (_, i) =>
    `<ellipse style="--i:${i}" cx="200" cy="${f(52 + i * 3)}" rx="${f(26 + i * 18)}" ry="${f(6 + i * 4)}"/>`).join('');
  const scrub = Array.from({ length: 10 }, () => {
    const x = -40 + r() * 480;
    const y = 222 + r() * 16;
    return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(4 + r() * 6)}" ry="${f(2 + r() * 2)}"/>`;
  }).join('');
  return `<g class="es es--beyond">
    <g class="es-swirl">${swirl}</g>
    ${ridge([[-W * 2, 188], [-100, 182], [60, 190], [180, 184], [300, 190], [440, 180], [W * 3, 188]], 'bd-far')}
    <path class="es-glint" d="M-80 196 C0 194 60 198 120 195"/>
    ${Array.from({ length: 4 }, (_, i) => palm(-20 + i * 22, 198, 12, 'bd-far', 9172 + i)).join('')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 214 C-40 210 100 216 200 212 C300 208 480 214 ${W * 3} 210 L${W * 3} ${H} Z"/>
    <g class="bd-mid">${scrub}</g>
    ${tree(334, 226, 40, 'bd-mid', 9177, { lean: -0.3, sway: true })}
    ${ground(250)}
  </g>`;
}

// ── 여리고의 샘 (2:19-22) ────────────────────────
function springArt(sweet: boolean): string {
  const r = rng(9191);
  const fruitTree = (x: number, g: number, h: number, seed: number) => {
    const rr = rng(seed);
    const fruit = Array.from({ length: 7 }, () => `<circle class="es-fruit" style="--d:${f(rr() * 4)}s" cx="${f(x + (rr() - 0.5) * h * 0.5)}" cy="${f(g - h * 0.62 + (rr() - 0.5) * h * 0.3)}" r="${f(1.4 + rr())}"/>`).join('');
    const fallen = Array.from({ length: 5 }, () => `<ellipse class="es-fallen" cx="${f(x + (rr() - 0.5) * h * 0.7)}" cy="${f(g - 0.6)}" rx="1.8" ry="1"/>`).join('');
    return `${tree(x, g, h, 'bd-mid es-orchard', seed, { sway: true })}${fruit}${fallen}`;
  };
  const sparkles = Array.from({ length: 9 }, (_, i) => `<circle class="es-sparkle" style="--d:${f(r() * 3)}s" cx="${f(150 + i * 12 + r() * 4)}" cy="${f(222 + r() * 6)}" r="0.9"/>`).join('');
  const sprouts = Array.from({ length: 14 }, (_, i) => {
    const x = 30 + i * 26 + r() * 8;
    return `<path class="es-sprout" d="M${f(x)} 244 q-1 -5 -3 -7 M${f(x)} 244 q1 -6 3 -8"/>`;
  }).join('');
  return `<g class="es es--spring${sweet ? ' es--sweet' : ''}">
    ${ridge([[-W * 2, 150], [-100, 140], [40, 148], [150, 136], [260, 146], [400, 134], [W * 3, 142]], 'bd-far')}
    <!-- 바위 틈의 샘 -->
    <path class="bd-mid" d="M120 ${H} L120 214 C126 196 140 180 160 172 C176 166 190 170 200 176 C214 166 232 164 248 174 C266 184 278 200 282 214 L282 ${H} Z"/>
    <path class="es-cleft" d="M194 176 C196 188 198 198 200 210 C202 198 205 186 206 177"/>
    <path class="es-trickle" d="M200 184 C199 194 201 204 200 214"/>
    <ellipse class="es-pool" cx="200" cy="224" rx="74" ry="11"/>
    <path class="es-pool__line" d="M150 222 q10 -2 20 0 M200 227 q12 -2 24 0 M176 230 q8 -1.6 16 0"/>
    ${sparkles}
    <path class="es-stream" d="M126 226 C90 230 60 236 -40 238 M274 226 C310 230 360 234 460 238"/>
    ${fruitTree(60, 236, 70, 9192)}${fruitTree(110, 230, 50, 9193)}${fruitTree(300, 230, 54, 9194)}${fruitTree(352, 236, 74, 9195)}
    ${fruitTree(-30, 240, 80, 9196)}${fruitTree(430, 240, 80, 9197)}
    ${ground(248)}
    <g class="es-sprouts">${sprouts}</g>
  </g>`;
}

// ── 다메섹 (5:1, 12) ────────────────────────────
function damascusArt(): string {
  const r = rng(9211);
  const poplars = Array.from({ length: 9 }, (_, i) => {
    const x = 60 + i * 38 + r() * 10;
    const h = 30 + r() * 20;
    return `<path class="bd-mid es-poplar" style="--d:${f(r() * 5)}s" d="M${f(x)} 206 C${f(x - 4)} ${f(206 - h * 0.4)} ${f(x - 3)} ${f(206 - h * 0.8)} ${f(x)} ${f(206 - h)} C${f(x + 3)} ${f(206 - h * 0.8)} ${f(x + 4)} ${f(206 - h * 0.4)} ${f(x)} 206 Z"/>`;
  }).join('');
  return `<g class="es es--damascus">
    <!-- 헐몬: 흰 눈 -->
    <path class="bd-far" d="M${-W * 2} 170 C-200 160 -60 150 10 110 C40 94 60 82 80 80 C100 82 130 100 170 130 C220 160 300 162 ${W * 3} 168 L${W * 3} ${H} L${-W * 2} ${H} Z"/>
    <path class="es-snow" d="M48 92 C60 84 72 80 80 80 C92 82 104 88 116 98 C106 96 98 100 90 96 C82 100 74 96 66 100 C60 96 54 98 48 92 Z"/>
    ${ridge([[-W * 2, 186], [-60, 180], [80, 186], [200, 182], [340, 186], [W * 3, 182]], 'bd-far es-plain')}
    <!-- 성과 림몬의 신당 -->
    ${houses(200, 196, 18, 12, 9212, 'bd-mid', 0.5)}
    <g class="bd-mid">
      ${battlement(96, 184, 186, 200)}${battlement(216, 304, 186, 200)}
      <rect x="180" y="156" width="40" height="30"/><rect x="176" y="150" width="48" height="6"/><rect x="172" y="186" width="56" height="8"/>
      <path d="M176 150 L200 138 L224 150 Z"/>
      <rect x="186" y="160" width="3" height="26" class="es-col"/><rect x="198.5" y="160" width="3" height="26" class="es-col"/><rect x="211" y="160" width="3" height="26" class="es-col"/>
    </g>
    <circle class="es-shrine-glow" cx="200" cy="170" r="22"/>
    ${poplars}
    <!-- 맑은 두 강, 아마나와 바르발 (5:12) -->
    <path class="es-clear" d="M${-W * 2} 218 C-80 214 60 222 150 228 C180 230 196 236 200 244 L200 ${H} L${-W * 2} ${H} Z"/>
    <path class="es-clear" d="M${W * 3} 216 C480 214 340 222 250 228 C220 230 204 236 200 244 L200 ${H} L${W * 3} ${H} Z"/>
    ${Array.from({ length: 8 }, (_, i) => `<path class="es-flow es-flow--clear" style="--d:${f(i * 0.9)}s" d="M${f(-20 + i * 58)} ${f(232 + (i % 3) * 5)} q12 -2 24 0"/>`).join('')}
    ${tree(-20, 250, 120, 'bd-near', 9213, { sway: true })}${tree(430, 250, 120, 'bd-near', 9214, { sway: true })}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 252 C-100 250 100 256 200 254 C300 252 500 256 ${W * 3} 252 L${W * 3} ${H} Z"/>
  </g>`;
}

// ── 엘리사의 집 문 (5:9-10, 15-16, 25) ────────────
function doorArt(): string {
  return `<g class="es es--door">
    ${ridge([[-W * 2, 140], [-100, 130], [40, 138], [160, 118], [260, 128], [380, 116], [W * 3, 128]], 'bd-far')}
    ${houses(320, 158, 10, 11, 9231, 'bd-far', 0.3)}
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 206 C-40 202 100 198 200 200 C300 202 460 196 ${W * 3} 200 L${W * 3} ${H} Z"/>
    <!-- 작은 흙벽돌 집, 닫힌 문 (5:9 "엘리사의 집 문에 서니") — 가운데 -->
    <g class="es-housewall">
      <rect x="150" y="146" width="112" height="100"/>
      <rect x="146" y="140" width="120" height="7"/>
      <rect x="146" y="132" width="5" height="9"/><rect x="190" y="132" width="5" height="9"/><rect x="232" y="132" width="5" height="9"/><rect x="261" y="132" width="5" height="9"/>
      <path d="M262 246 L262 196 L292 246 Z"/>
    </g>
    <path class="es-bricks" d="M150 166 H262 M150 186 H262 M150 206 H262 M150 226 H262 M170 146 V166 M226 146 V166 M190 166 V186 M244 166 V186 M168 186 V206 M236 186 V206 M180 206 V226 M248 206 V226"/>
    <path class="es-door" d="M192 246 L192 194 C192 184 220 184 220 194 L220 246 Z"/>
    <path class="es-door__seam" d="M206 188 V246"/>
    <rect class="es-window" style="--d:1s" x="236" y="164" width="8" height="10"/>
    <!-- 문 앞에 선 나아만의 병거와 말들 (5:9) -->
    ${horse(122, 242, 1.15)}${horse(100, 238, 1.05, 'bd-mid', 2)}
    ${chariot(62, 244, 1.2)}
    ${folk(-20, 238, 40, 240, 7, 1.8, 9232, 'js-folk es-guards')}
    ${ground(250)}
  </g>`;
}

// ── 나아만의 요단 (5:14) ─────────────────────────
function naamanJordanArt(): string {
  const r = rng(9251);
  const jungle = Array.from({ length: 12 }, (_, i) => tree(-60 + i * 46 + r() * 10, 196, 50 + r() * 30, 'bd-mid', 9252 + i, { sway: true, lean: (r() - 0.5) * 0.4 })).join('');
  const rip = Array.from({ length: 9 }, (_, i) => `<path class="es-flow es-flow--mud" style="--d:${f(i * 0.8)}s" d="M${f(-30 + i * 56)} ${f(214 + (i % 4) * 9)} q14 -2.4 28 0"/>`).join('');
  return `<g class="es es--jordan-naaman">
    ${ridge([[-W * 2, 150], [-80, 140], [60, 148], [180, 136], [300, 146], [440, 132], [W * 3, 142]], 'bd-far')}
    <!-- 건너편 요단의 빽빽한 수풀 -->
    <g class="es-thicket">${jungle}</g>
    <path class="bd-mid" d="M${-W * 2} 206 L${-W * 2} 194 C0 190 200 196 ${W * 3} 192 L${W * 3} 206 Z"/>
    ${reeds(30, 204, 1.2, 'bd-mid', 9270)}${reeds(150, 204, 1, 'bd-mid', 9271)}${reeds(280, 204, 1.1, 'bd-mid', 9272)}${reeds(390, 204, 1.2, 'bd-mid', 9273)}
    <!-- 흙빛 강물: 무대 앞쪽이 온통 물 -->
    <path class="es-mud" d="M${-W * 2} ${H} L${-W * 2} 204 C-100 202 100 208 200 205 C300 202 500 207 ${W * 3} 204 L${W * 3} ${H} Z"/>
    ${rip}
    ${reeds(-10, 258, 2, 'bd-near', 9274)}${reeds(420, 258, 2.1, 'bd-near', 9275)}
  </g>`;
}

// ── 사마리아 (17:1-6) ────────────────────────────
function samariaArt(state: 'city' | 'siege' | 'fallen'): string {
  const r = rng(9301);
  // 성벽 토막들 (무너질 때 하나씩) — 언덕 꼭대기 둘레
  const segs: string[] = [];
  const xs = [118, 140, 162, 184, 206, 228, 250, 272];
  xs.forEach((x, i) => {
    const y = 140 + Math.abs(i - 3.5) * 3.4;
    const broken = state === 'fallen' && i % 3 !== 1;
    segs.push(broken
      ? `<path d="M${x} ${f(y + 16)} L${x} ${f(y + 9 - r() * 4)} L${x + 7} ${f(y + 6 + r() * 3)} L${x + 13} ${f(y + 11 - r() * 3)} L${x + 22} ${f(y + 8)} L${x + 22} ${f(y + 16)} Z"/>`
      : `<g class="es-seg" style="--i:${i}; transform-origin:${x + 11}px ${f(y + 16)}px">${battlement(x, x + 22, y, y + 16)}</g>`);
  });
  const towers = [116, 202, 292].map((x, i) => {
    const y = 132 + (i === 1 ? 0 : 6);
    return state === 'fallen' && i !== 1
      ? `<path d="M${x - 6} ${y + 24} L${x - 6} ${y + 12} L${x - 1} ${y + 8} L${x + 4} ${y + 14} L${x + 7} ${y + 24} Z"/>`
      : `<g class="es-seg es-tower" style="--i:${i * 3 + 1}; transform-origin:${x}px ${y + 24}px"><rect x="${x - 7}" y="${y}" width="14" height="24"/><rect x="${x - 8.5}" y="${y - 3}" width="17" height="3"/></g>`;
  }).join('');
  // 상아궁: 꼭대기의 기둥들 (왕상 22:39 "상아궁")
  const cols = [180, 190, 200, 210, 220].map((x, i) => {
    const tilt = state === 'fallen' ? (i % 2 ? 0 : (i - 2) * 9) : 0;
    const h = state === 'fallen' && i === 3 ? 10 : 22;
    return `<rect class="es-ivory es-col" style="--i:${i}; transform-origin:${x + 1.6}px 134px; rotate:${tilt}deg" x="${x}" y="${134 - h}" width="3.2" height="${h}"/>`;
  }).join('');
  const roof = state === 'fallen' ? '' : `<path class="es-ivory es-roof" d="M174 112 L226 112 L228 108 L172 108 Z"/>`;
  const camp = state === 'siege' ? `
    <g class="es-camp">
      ${Array.from({ length: 16 }, (_, i) => {
        const x = -60 + i * 34 + r() * 10;
        if (x > 120 && x < 280) return '';
        const y = 222 + r() * 8;
        return `<path class="bd-mid" d="M${f(x - 8)} ${f(y)} L${f(x)} ${f(y - 10)} L${f(x + 8)} ${f(y)} Z"/><ellipse class="es-campfire" style="--d:${f(r() * 2)}s" cx="${f(x + 12)}" cy="${f(y)}" rx="2.4" ry="1.2"/>`;
      }).join('')}
      ${folk(120, 232, 280, 234, 30, 1.6, 9302, 'js-folk es-host')}
      <!-- 성벽에 걸친 토성과 성 치는 틀 -->
      <path class="bd-mid" d="M70 232 C96 214 118 188 130 160 L142 160 C134 192 118 218 100 236 Z"/>
      <g class="bd-mid es-ram"><rect x="114" y="168" width="20" height="10" rx="2"/><path d="M130 172 L144 166 L145 169 L131 175 Z"/><circle cx="118" cy="180" r="2.6"/><circle cx="130" cy="180" r="2.6"/></g>
      ${[40, 330].map((x) => `<rect class="bd-mid" x="${x}" y="196" width="1.6" height="30"/><path class="es-banner" d="M${x + 1.6} 196 L${x + 14} 199 L${x + 1.6} 203 Z"/>`).join('')}
    </g>` : '';
  const ruin = state === 'fallen' ? `
    <g class="es-stone es-rubble">${Array.from({ length: 18 }, () => `<ellipse cx="${f(110 + r() * 190)}" cy="${f(160 + r() * 14)}" rx="${f(3 + r() * 5)}" ry="${f(2 + r() * 2)}"/>`).join('')}</g>
    ${smoke(150, 140, 9303, 7)}${smoke(206, 110, 9304, 8)}${smoke(262, 140, 9305, 6)}
    <g class="es-embers">${Array.from({ length: 10 }, () => `<circle style="--d:${f(r() * 3)}s" cx="${f(130 + r() * 150)}" cy="${f(150 + r() * 20)}" r="${f(0.8 + r() * 0.8)}"/>`).join('')}</g>` : '';
  // 무너질 때 피어오르는 연기 (fx samaria-falls가 켬)
  const fallSmoke = state === 'siege' ? `<g class="es-fallsmoke">${smoke(150, 140, 9306, 7)}${smoke(206, 112, 9307, 8)}${smoke(262, 140, 9308, 6)}</g>` : '';
  return `<g class="es es--samaria es--${state}">
    ${ridge([[-W * 2, 150], [-100, 140], [40, 150], [140, 142], [260, 148], [400, 136], [W * 3, 146]], 'bd-far')}
    <!-- 사마리아 산 (왕상 16:24 "세멜에게서 사마리아 산을 사고") -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 236 C-60 232 40 224 80 206 C108 192 116 166 132 152 C150 140 176 136 200 134 C224 136 250 140 268 152 C284 166 292 192 320 206 C360 224 460 232 ${W * 3} 236 L${W * 3} ${H} Z"/>
    ${state !== 'fallen' ? houses(200, 150, 12, 11, 9309, 'es-roofs', 0.45) : ''}
    ${roof}<g class="es-palace">${cols}</g>
    <g class="es-stone es-walls">${segs.join('')}${towers}</g>
    ${fallSmoke}${camp}${ruin}
    ${ground(250)}
  </g>`;
}

// ── 사로잡혀 가는 길 (17:6, 23) ───────────────────
function exileArt(): string {
  const r = rng(9331);
  // 줄: 왼쪽 앞에서 오른쪽 지평선 쪽으로 — 사람 사이 간격만큼 계속 흘러가서 끊김 없이 걸어간다
  const line: string[] = [];
  for (let i = -2; i < 26; i++) {
    const x = -40 + i * 18;
    const guard = i % 6 === 2;
    const h = guard ? 13 : 10 + r() * 2;
    line.push(`<g class="es-walker${guard ? ' es-walker--guard' : ''}" style="--d:${f(r() * 0.6)}s">
      <rect x="${f(x - 1.8)}" y="${f(-h)}" width="3.6" height="${f(h)}" rx="1.8"/>${guard ? `<path d="M${f(x + 2.6)} 0 L${f(x + 3.4)} -19" stroke="currentColor" stroke-width="0.7"/>` : `<path class="es-bundle" d="M${f(x - 3.6)} ${f(-h + 2)} a2.6 2.6 0 1 0 0.1 0 Z"/>`}</g>`);
  }
  return `<g class="es es--exile">
    <circle class="es-sun" cx="320" cy="168" r="16"/>
    ${ridge([[-W * 2, 178], [-60, 172], [100, 178], [240, 172], [380, 176], [W * 3, 170]], 'bd-far')}
    <path class="bd-far es-plain" d="M${-W * 2} ${H} L${-W * 2} 196 C0 192 200 198 ${W * 3} 192 L${W * 3} ${H} Z"/>
    <path class="es-road es-road--long" d="M${-W * 2} 246 C-100 238 100 224 200 214 C260 208 320 200 420 194"/>
    <!-- 끝없는 줄 (원근: 앞은 크게, 지평선 쪽은 작게) -->
    <g transform="translate(-10 246) scale(1.25) skewY(-8)"><g class="es-line">${line.join('')}</g></g>
    <g class="es-dustline">${Array.from({ length: 7 }, (_, i) => `<ellipse style="--d:${f(i * 0.8)}s" cx="${f(60 + i * 50)}" cy="${f(232 - i * 4)}" rx="22" ry="5"/>`).join('')}</g>
    ${ground(252)}
  </g>`;
}

// ── 벧엘의 금송아지 (17:16, 21-22) ─────────────────
function calvesArt(): string {
  return `<g class="es es--calves">
    ${ridge([[-W * 2, 132], [-100, 124], [40, 132], [160, 120], [280, 128], [400, 112], [W * 3, 124]], 'bd-far')}
    <!-- 먼 북쪽 산마루의 또 하나 (왕상 12:29 "하나는 단에 둔지라") -->
    <circle class="es-calf-halo es-calf-halo--far" cx="352" cy="110" r="7"/>
    ${calf(352, 113, 0.22, 'es-calf es-calf--small')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 212 C-40 206 80 196 140 186 L260 186 C320 196 440 206 ${W * 3} 212 L${W * 3} ${H} Z"/>
    <!-- 산당의 돌 단 -->
    <g class="bd-mid">
      <rect x="150" y="170" width="100" height="18"/><rect x="144" y="166" width="112" height="5"/>
      <rect x="172" y="152" width="56" height="14"/><rect x="168" y="149" width="64" height="4"/>
      <rect x="132" y="120" width="6" height="66"/><rect x="262" y="120" width="6" height="66"/>
      <rect x="128" y="116" width="14" height="5"/><rect x="258" y="116" width="14" height="5"/>
    </g>
    <circle class="es-calf-halo" cx="200" cy="128" r="46"/>
    ${calf(200, 149, 1.7, 'es-calf')}
    ${smoke(144, 112, 9351, 5)}${smoke(266, 112, 9352, 5)}
    <ellipse class="es-ember" cx="144" cy="115" rx="5" ry="1.4"/><ellipse class="es-ember" cx="266" cy="115" rx="5" ry="1.4"/>
    ${folk(40, 214, 120, 206, 8, 1.8, 9353, 'js-folk')}${folk(282, 206, 368, 214, 8, 1.8, 9354, 'js-folk')}
    ${ground(250)}
  </g>`;
}

// ── 산마다 산당 (17:9-11, 29-33) ───────────────────
function highPlacesArt(): string {
  return `<g class="es es--high">
    ${ridge([[-W * 2, 150], [-120, 120], [-40, 146], [40, 118], [120, 148], [200, 110], [280, 146], [360, 116], [440, 146], [W * 3, 130]], 'bd-far')}
    ${shrine(40, 120, 0.55, 9371, 'bd-far')}${shrine(200, 112, 0.6, 9372, 'bd-far')}${shrine(360, 118, 0.55, 9373, 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 210 C-80 200 20 168 90 166 C140 166 160 196 200 196 C240 196 260 160 316 160 C380 162 460 196 ${W * 3} 206 L${W * 3} ${H} Z"/>
    ${shrine(90, 166, 1.1, 9374)}${shrine(316, 160, 1.15, 9375)}
    ${tree(200, 198, 44, 'bd-mid', 9376, { sway: true })}
    ${shrine(-30, 214, 1.4, 9377, 'bd-near')}${shrine(440, 214, 1.4, 9378, 'bd-near')}
    ${ground(250)}
  </g>`;
}

export function elishaArt(art: ElishaArt): string {
  switch (art) {
    case 'es-bethel': return bethelArt();
    case 'es-jericho': return jerichoArt();
    case 'es-jordan': return jordanArt(false);
    case 'es-jordan-parted': return jordanArt(true);
    case 'es-beyond': return beyondArt();
    case 'es-spring': return springArt(false);
    case 'es-spring-sweet': return springArt(true);
    case 'es-damascus': return damascusArt();
    case 'es-door': return doorArt();
    case 'es-jordan-naaman': return naamanJordanArt();
    case 'es-samaria': return samariaArt('city');
    case 'es-samaria-siege': return samariaArt('siege');
    case 'es-samaria-fallen': return samariaArt('fallen');
    case 'es-exile-road': return exileArt();
    case 'es-calves': return calvesArt();
    case 'es-high-places': return highPlacesArt();
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

/** 무대 위 인물의 그림 상자 (scene 기준 좌표) */
function actorBox(scene: HTMLElement, id: string | undefined, fallback: 'center' | 'right' | 'left') {
  const b = scene.getBoundingClientRect();
  const actors = [...scene.querySelectorAll<HTMLElement>('.scene__stage .actor')];
  const art = (a: HTMLElement) => (a.querySelector<SVGElement>('.actor__art') ?? a).getBoundingClientRect();
  let el = id ? actors.find((a) => a.dataset.id === id) : undefined;
  if (!el && actors.length) {
    const xs = actors.map((a) => [a, art(a).left + art(a).width / 2 - b.left] as const);
    if (fallback === 'right') el = xs.reduce((m, c) => (c[1] > m[1] ? c : m))[0];
    else if (fallback === 'left') el = xs.reduce((m, c) => (c[1] < m[1] ? c : m))[0];
    else el = xs.reduce((m, c) => (Math.abs(c[1] - b.width / 2) < Math.abs(m[1] - b.width / 2) ? c : m))[0];
  }
  const a = el ? art(el) : null;
  if (!a || !a.width) return { el, x: b.width / 2, top: b.height * 0.4, h: b.height * 0.5, w: 80, bw: b.width, bh: b.height };
  return { el, x: a.left - b.left + a.width / 2, top: a.top - b.top, h: a.height, w: a.width, bw: b.width, bh: b.height };
}

/** 인물이 보는 쪽 (1 = 오른쪽, -1 = 왼쪽) */
function facing(el: HTMLElement | undefined): number {
  const t = el?.querySelector<SVGElement>('.actor__art')?.style.transform ?? '';
  return /scaleX\(-1|matrix\(-1/.test(t) ? -1 : 1;
}

/** mantle-strike: 말아 쥔 겉옷으로 물을 친다 → 물이 이리저리 갈라짐 (왕하 2:8, 14) */
export function playMantleStrike(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const t = actorBox(scene, who ?? 'elijah', 'center');
  const dir = facing(t.el);
  const hx = t.x + dir * t.w * 0.3;
  const hy = t.top + t.h * 0.35;
  const wy = t.top + t.h * 0.92;
  layerOf(scene, `fx-mstrike${rm ? ' is-rm' : ''}`,
    `<div class="fx-mstrike__at" style="--x:${f(hx)}px; --y:${f(hy)}px; --dir:${dir}">
       <i class="fx-mstrike__roll"></i><b class="fx-mstrike__arc"></b>
     </div>
     <div class="fx-mstrike__splash" style="--x:${f(hx + dir * 14)}px; --y:${f(wy)}px">${Array.from({ length: 3 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}
       ${Array.from({ length: 12 }, (_, i) => `<b style="--i:${i}; --a:${f(-160 + i * 12)}deg"></b>`).join('')}</div>`,
    rm ? 2000 : 5200, 1200);
  // 강이 갈라진다: 배경 es-jordan의 두 물 덩이가 양쪽으로 물러나 쌓인다
  setTimeout(() => scene.querySelectorAll('.es--jordan').forEach((g) => g.classList.add('is-parting')), rm ? 0 : 1100);
}

/** chariot-fire: 불 수레와 불 말들이 두 사람 사이로 → 회리바람이 엘리야를 감아 올림 (왕하 2:11) */
export function playChariotFire(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const t = actorBox(scene, who ?? 'elijah', 'left');
  const b = scene.getBoundingClientRect();
  const y = t.top + t.h * 0.45;
  // 불 말 둘과 수레: 왼쪽 위 하늘에서 내려와 두 사람 사이를 가르고 오른쪽으로 치솟아 나간다
  const steed = (k: number) => `<svg class="fx-chariot__steed" style="--k:${k}" viewBox="-30 -42 60 44" aria-hidden="true"><path d="M-14 0 L-11 -12 L-8 -12 L-9 0 Z M8 0 L12 -12 L15 -12 L13 0 Z M-17 -12 C-19 -18 -14 -24 -6 -24 L8 -24 C12 -24 14 -27 16 -31 C18 -35 20 -38 24 -38 L29 -34 C30 -32 28 -30 26 -31 L22 -30 C20 -26 18 -19 16 -14 C14 -12 12 -11 9 -11 L-13 -11 Z M-17 -18 C-24 -18 -28 -12 -30 -6 C-24 -10 -20 -12 -17 -12 Z"/></svg>`;
  layerOf(scene, `fx-chariot${rm ? ' is-rm' : ''}`,
    `<div class="fx-chariot__run" style="--y:${f(y)}px; --w:${f(b.width)}px">
       <div class="fx-chariot__team">${steed(0)}${steed(1)}
         <svg class="fx-chariot__car" viewBox="-24 -34 48 36" aria-hidden="true"><path d="M-20 -14 L6 -14 C11 -14 14 -19 14 -27 L10 -27 C10 -22 8 -19 4 -19 L-16 -19 L-18 -26 L-21 -26 Z"/><path d="M6 -16 L24 -20" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="-6" cy="-11" r="11" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M-6 -22 V0 M-17 -11 H5 M-13.8 -18.8 L1.8 -3.2 M1.8 -18.8 L-13.8 -3.2" stroke="currentColor" stroke-width="1.1"/><path class="fx-chariot__flame" d="M-20 -26 C-26 -32 -22 -38 -18 -34 C-18 -40 -12 -42 -12 -34 C-8 -40 -2 -38 -6 -30 Z"/></svg>
         <i class="fx-chariot__trail"></i>
       </div>
     </div>
     <div class="fx-whirl" style="--x:${f(t.x)}px; --y:${f(t.top + t.h)}px; --h:${f(t.h)}px">${Array.from({ length: 7 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}<b class="fx-whirl__beam"></b></div>`,
    rm ? 2600 : 10400, 1600);
  // 엘리야가 회리바람을 타고 오른다: 인물 그림이 위로 작아지며 빛 속에 사라짐
  const art = t.el?.querySelector<SVGElement>('.actor__art');
  if (!art) return;
  const go = () => {
    art.style.transformOrigin = '50% 100%';
    art.style.transition = rm ? 'opacity 0.6s' : 'translate 4.6s cubic-bezier(0.5, 0, 0.75, 0.4), scale 4.6s cubic-bezier(0.4, 0, 0.7, 0.5), opacity 1.6s ease-in 3.2s, filter 2.4s ease-in';
    void art.getBoundingClientRect();
    if (!rm) {
      art.style.translate = `0 ${f(-(t.top + t.h) * 1.05)}px`;
      art.style.scale = '0.18';
      art.style.filter = 'brightness(2.2) sepia(0.6)';
    }
    art.style.opacity = '0';
  };
  setTimeout(go, rm ? 300 : 3400);
}

/** mantle-fall: 하늘에서 겉옷이 너울너울 떨어져 받는 사람 발치에 (왕하 2:13) */
export function playMantleFall(scene: HTMLElement, to: string | undefined, rm: boolean): void {
  const t = actorBox(scene, to ?? 'elisha', 'center');
  const dir = facing(t.el);
  layerOf(scene, `fx-mfall${rm ? ' is-rm' : ''}`,
    `<div class="fx-mfall__drop" style="--x:${f(t.x + dir * t.w * 0.45)}px; --y:${f(t.top + t.h - 8)}px">
       <svg class="fx-mfall__cloth" viewBox="-40 -24 80 52" aria-hidden="true"><path d="M-34 -16 C-20 -22 14 -22 34 -14 C30 -2 33 10 28 20 L25 17 L22 24 L18 18 L14 25 L10 19 L6 26 L2 20 L-2 26 L-6 19 L-10 25 L-14 18 L-18 24 L-22 17 L-26 22 C-30 10 -30 -4 -34 -16 Z"/><path class="fx-mfall__fold" d="M-18 -18 C-15 0 -18 10 -15 20 M0 -20 C3 0 0 10 2 22 M16 -18 C19 0 16 10 18 20" fill="none"/></svg>
     </div>`,
    rm ? 2000 : 5600, 1400);
}

/** salt: 새 그릇의 소금을 샘에 던짐 → 물결 고리, 샘(es-spring)이 맑아짐 (왕하 2:21) */
export function playSalt(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const t = actorBox(scene, who ?? 'elisha', 'center');
  const dir = facing(t.el);
  const sx = t.x + dir * t.w * 0.32;
  const sy = t.top + t.h * 0.36;
  const tx = t.bw / 2;
  const ty = t.bh * 0.86;
  layerOf(scene, `fx-salt${rm ? ' is-rm' : ''}`,
    `<div class="fx-salt__from" style="--x:${f(sx)}px; --y:${f(sy)}px; --dx:${f(tx - sx)}px; --dy:${f(ty - sy)}px">${Array.from({ length: 18 }, (_, i) =>
      `<b style="--i:${i}; --o:${f(((i * 37) % 13) - 6)}px"></b>`).join('')}</div>
     <div class="fx-salt__rings" style="--x:${f(tx)}px; --y:${f(ty)}px">${Array.from({ length: 4 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}<span class="fx-salt__glow"></span></div>`,
    rm ? 2400 : 6400, 1600);
  setTimeout(() => scene.querySelectorAll('.es--spring').forEach((g) => g.classList.add('is-healed')), rm ? 0 : 2200);
}

/** seven-dips: 요단에 일곱 번 잠김 — 1…7, 마지막에 살빛이 밝아짐 (왕하 5:14) */
export function playSevenDips(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const t = actorBox(scene, who ?? 'naaman', 'center');
  const step = rm ? 0.3 : 1.55;
  const total = 0.6 + step * 7 + 2.6;
  const layer = layerOf(scene, `fx-dips${rm ? ' is-rm' : ''}`,
    `<div class="fx-dips__water" style="--y:${f(t.top + t.h * 0.58)}px"><i class="fx-dips__line"></i></div>
     <div class="fx-dips__count" style="--x:${f(t.x)}px; --y:${f(Math.max(24, t.top - 10))}px">${Array.from({ length: 7 }, (_, i) =>
      `<b style="--i:${i}; --s:${step}s">${i + 1}</b>`).join('')}</div>
     <div class="fx-dips__rings" style="--x:${f(t.x)}px; --y:${f(t.top + t.h * 0.58)}px; --s:${step}s">${Array.from({ length: 7 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>
     <div class="fx-dips__glow" style="--x:${f(t.x)}px; --y:${f(t.top + t.h * 0.4)}px; --t:${f(0.6 + step * 7)}s"></div>`,
    total * 1000, 1600);
  void layer;
  const art = t.el?.querySelector<SVGElement>('.actor__art');
  if (!art || rm) return;
  // 잠겼다 나오기: 몸이 물선 아래로 내려갔다가 올라온다 (물 띠가 앞을 가림)
  const down = t.h * 0.62;
  const frames: Keyframe[] = Array.from({ length: 7 }).flatMap(() => [
    { translate: '0 0', easing: 'cubic-bezier(0.5, 0, 0.6, 1)' },
    { translate: `0 ${f(down)}px`, easing: 'cubic-bezier(0.3, 0, 0.4, 1)' },
  ]);
  frames.push({ translate: '0 0' });
  art.animate(
    frames,
    { duration: step * 7 * 1000, delay: 600, fill: 'none' },
  );
}

/** samaria-falls: 성벽이 무너지고 기둥이 기울고 연기가 오름 (왕하 17:6) */
export function playSamariaFalls(scene: HTMLElement, rm: boolean): void {
  scene.querySelectorAll('.es--samaria').forEach((g) => g.classList.add('is-falling'));
  if (rm) return;
  const b = scene.getBoundingClientRect();
  layerOf(scene, 'fx-sfall',
    `<div class="fx-sfall__dust" style="--y:${f(b.height * 0.55)}px">${Array.from({ length: 12 }, (_, i) =>
      `<i style="--i:${i}; --o:${f((i - 5.5) * Math.min(b.width, 700) * 0.06)}px"></i>`).join('')}</div>
     <div class="fx-sfall__ash">${Array.from({ length: 26 }, (_, i) => `<b style="--i:${i}; --x:${f(((i * 53) % 100))}%"></b>`).join('')}</div>`,
    7600, 2000);
}

/** warnings: 보낸 선지자들의 이름이 등불처럼 켜졌다가, 하나씩 꺼진다 (왕하 17:13-14) */
export function playWarnings(scene: HTMLElement, rm: boolean): void {
  const names = ['아히야', '엘리야', '미가야', '엘리사', '요나', '아모스', '호세아'];
  layerOf(scene, `fx-warn${rm ? ' is-rm' : ''}`,
    `<div class="fx-warn__row">${names.map((n, i) => `<span class="fx-warn__lamp" style="--i:${i}; --n:${names.length}"><i></i><b>${n}</b></span>`).join('')}</div>
     <p class="fx-warn__more">그리고 이름이 남지 않은 선지자들</p>`,
    rm ? 3000 : 12600, 1800);
}
