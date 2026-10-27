// 금송아지 (출 32, A급 exo-32-calf 「금송아지」). 같은 종이 오려낸 그림자극 말투.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - calf-camp  : 시내산 발치의 진, 밤. 산꼭대기는 여전히 짙은 구름(흑암)에 덮여 있고, 장막 사이에 모닥불 몇 개 (출 32:1 "모세가 … 더딤을 보고")
//  - calf-forge : 진 한가운데 풀무 구덩이. 금이 녹는 빛, 위로 튀는 불티 (32:4 "그 고리를 받아 부어서")
//  - calf-idol  : 돌 받침 위의 금송아지. 불빛을 받아 금빛으로 빛나고, 그 앞에 아직 불 없는 단 (32:4-5)
//  - calf-feast : 같은 송아지 + 불붙은 단의 연기 + 그 둘레에서 춤추는 사람들의 그림자 (32:6, 19). 절제해서: 실루엣이 천천히 들썩일 뿐
//  - calf-view  : 산길 위에서 내려다본 진. 아래 멀리 불빛 점들과 금빛 한 점, 거기서 소리의 고리가 피어오른다 (32:17-18 "노래하는 소리로다")
//  - calf-burn  : 받침 위의 송아지가 불길에 싸여 금빛을 잃고 주저앉는다 (32:20 "불살라"). 산 아래 깨진 돌판 조각
//  - calf-ash   : 이튿날 아침. 빈 받침과 재, 산에서 흘러내리는 시내에 금가루가 반짝이며 떠내려간다 (32:20, 신 9:21)
// 효과 fx "tablets-break" (playTabletsBreak): 떠 있던 증거판 두 돌판(성막 기구 "tablets" 그림 그대로)에 금이 그어지고,
// 여덟 조각으로 갈라져 산 아래로 떨어진다 (32:19). 하나님은 그리지 않는다 (CLAUDE.md 8-1).
// 폰(세로 화면)에서는 x 100~300만 보인다 → 송아지(200)와 단은 그 안에, 춤추는 사람들은 양옆까지.
import gsap from 'gsap';
import { W, H, rng, tent, altar } from './backdrop';
import { cloud, massif } from './sinai';
import { setItem } from './tabernacle';

export type CalfState = 'camp' | 'forge' | 'idol' | 'feast' | 'view' | 'burn' | 'ash';

const f = (n: number) => n.toFixed(1);
const CX = 200;
/** 받침이 선 땅 */
const BASE = 224;

/** 금송아지: 옆모습(오른쪽을 봄), 원점 = 발굽 가운데. 어린 황소 — 짧은 뿔, 단단한 어깨, 꼬리 */
function calfShape(): string {
  return `
    <path d="M-27 -30 C-31 -26 -32 -18 -31 -10 C-30 -8 -28 -8 -28 -10 C-29 -17 -28 -24 -25 -28 Z"/>
    <path d="M-32 -11 C-34 -7 -32 -3 -29 -4 C-28 -7 -29 -10 -31 -12 Z"/>
    <path d="M-25 -21 L-21 -21 L-20.4 -1.6 L-18 0 L-24.4 0 L-24.2 -2 Z"/>
    <path d="M-17 -20 L-13 -20 L-12.6 -1.6 L-10.4 0 L-16.6 0 L-16.4 -2 Z"/>
    <path d="M11 -20 L15 -20 L15.6 -1.6 L18 0 L11.4 0 L11.6 -2 Z"/>
    <path d="M18 -21 L22 -21 L23 -1.6 L25.6 0 L19 0 L18.8 -2 Z"/>
    <path d="M-28 -24 C-29 -33 -20 -37 -8 -36 C2 -35 10 -38 16 -41 C20 -43 24 -43 26 -40 L28 -33 C27 -27 25 -22 21 -19 C10 -16 -8 -16 -20 -17 C-25 -18 -28 -20 -28 -24 Z"/>
    <path d="M17 -42 C19 -48 24 -51 29 -50 C33 -49 36 -45 38 -40 C40 -36 40 -32 37 -31 C34 -30 31 -32 28 -31 C25 -30 22 -31 20 -33 C18 -36 16 -39 17 -42 Z"/>
    <path d="M22 -48 C19 -53 20 -58 24 -60 C23 -56 24 -52 26 -49 Z"/>
    <path d="M28 -50 C30 -55 34 -57 38 -56 C35 -54 33 -51 32 -48 Z"/>
    <path d="M21 -45 L13 -47 C15 -44 18 -43 21 -42 Z"/>`;
}

/** 송아지 + 돌 받침. state별로 빛·불길이 다르다 */
function idol(state: CalfState): string {
  const r = rng(6101);
  const plinth = `<g class="cf-plinth">
    <path d="M${CX - 30} ${BASE} L${CX - 27} ${BASE - 15} L${CX + 27} ${BASE - 15} L${CX + 30} ${BASE} Z"/>
    <path d="M${CX - 32} ${BASE - 15} L${CX + 32} ${BASE - 15} L${CX + 31} ${BASE - 19} L${CX - 31} ${BASE - 19} Z"/>
    ${state === 'ash' ? `<path class="cf-crack" d="M${CX + 6} ${BASE - 19} L${CX + 2} ${BASE - 12} L${CX + 8} ${BASE - 6} L${CX + 4} ${BASE}"/>` : ''}
  </g>`;
  const top = BASE - 19;
  if (state === 'ash') {
    // 빈 받침 위의 재 더미와 가는 연기
    const wisps = [0, 1, 2].map((i) => `<path class="cf-wisp" style="--d:${i * 2.2}s" pathLength="1" d="M${CX - 4 + i * 4} ${top - 3} C${CX - 10 + i * 6} ${top - 14} ${CX + 2 + i * 3} ${top - 22} ${CX - 4 + i * 5} ${top - 34}"/>`).join('');
    return `${plinth}<path class="cf-ash" d="M${CX - 22} ${top} C${CX - 14} ${top - 7} ${CX + 10} ${top - 8} ${CX + 22} ${top} Z"/>${wisps}`;
  }
  const s = 1.18;
  const calf = `<g class="cf-calf" transform="translate(${CX} ${top}) scale(${s})">
    <g class="cf-calf__body">${calfShape()}</g>
    <path class="cf-calf__hi" d="M-24 -31 C-16 -35 0 -34 12 -38 C17 -40 22 -42 25 -41 M20 -45 C24 -49 30 -49 34 -45"/>
    <path class="cf-calf__cut" d="M-8 -34 C-6 -28 -6 -22 -8 -18 M4 -35 C6 -29 6 -23 4 -18 M-18 -32 C-20 -27 -20 -22 -19 -18"/>
  </g>`;
  const halo = `<ellipse class="cf-halo" cx="${CX + 4}" cy="${top - 30}" rx="${state === 'burn' ? 62 : 54}" ry="46"/>`;
  // 불살라 (32:20): 받침 위에서 불길이 송아지를 감싼다. 가운데가 높고, 뒷줄은 낮고 붉다. 불티가 솟는다
  const tongue = (i: number, n: number, back: boolean) => {
    const t = i / (n - 1) - 0.5;
    const x = CX - 4 + t * (back ? 70 : 60) + (r() - 0.5) * 4;
    const h = (back ? 30 : 22) + (1 - Math.abs(t) * 1.8) * (back ? 44 : 30) * (0.6 + r() * 0.6);
    return flameTongue(x, top + (back ? -2 : 2), h, (back ? 2.2 : 1.6) + r() * 1.2, r() * 2);
  };
  const sparks = Array.from({ length: 12 }, () => `<circle class="cf-spark" style="--d:${f(r() * 4)}s; --dx:${f((r() - 0.5) * 40)}px; --t:${f(2.2 + r() * 2)}s" cx="${f(CX + (r() - 0.5) * 50)}" cy="${f(top - 30)}" r="${f(0.6 + r() * 0.7)}"/>`).join('');
  const burn = state !== 'burn' ? '' : `<g class="cf-pyre">
    <circle class="cf-firelight cf-firelight--pyre" cx="${CX}" cy="${top - 26}" r="70"/>
    <g class="cf-pyre__back">${Array.from({ length: 9 }, (_, i) => tongue(i, 9, true)).join('')}</g>
    <g class="cf-pyre__front">${Array.from({ length: 11 }, (_, i) => tongue(i, 11, false)).join('')}</g>
    ${sparks}
  </g>`;
  return `${halo}${plinth}${calf}${burn}`;
}

/** 불꽃 하나 (x, 바닥 y, 높이 h, 너비 w, 지연) */
function flameTongue(x: number, y: number, h: number, w: number, d: number): string {
  // 위치는 바깥 g의 transform 속성, 일렁임(CSS transform)은 안쪽 g — 둘이 겹치면 CSS가 속성을 덮어쓴다
  return `<g transform="translate(${f(x)} ${f(y)})"><g class="cf-flame" style="--d:${f(d)}s; --t:${f(1 + (h % 7) * 0.12)}s">
    <path class="cf-flame__out" d="M${f(-w * 2.4)} 0 Q${f(-w * 3)} ${f(-h * 0.5)} 0 ${f(-h)} Q${f(w * 3)} ${f(-h * 0.5)} ${f(w * 2.4)} 0 Z"/>
    <path class="cf-flame__in" d="M${f(-w)} 0 Q${f(-w * 1.2)} ${f(-h * 0.35)} 0 ${f(-h * 0.6)} Q${f(w * 1.2)} ${f(-h * 0.35)} ${f(w)} 0 Z"/>
  </g></g>`;
}

/** 진의 모닥불: 땅의 불빛 + 작은 불꽃 둘셋 */
function campfire(x: number, y: number, s: number, seed: number, big = false): string {
  const r = rng(seed);
  const n = big ? 4 : 3;
  const tongues = Array.from({ length: n }, (_, i) => flameTongue(x + (i - (n - 1) / 2) * 2.4 * s, y, (6 + r() * 6) * s * (big ? 1.4 : 1), 0.5 * s, r() * 2)).join('');
  return `<g class="cf-fire">
    <circle class="cf-firelight" style="--d:${f(r() * 3)}s" cx="${f(x)}" cy="${f(y - 4 * s)}" r="${f((big ? 30 : 20) * s)}"/>
    <path class="cf-logs" d="M${f(x - 5 * s)} ${f(y + 1)} L${f(x + 5 * s)} ${f(y - 1.4 * s)} M${f(x - 5 * s)} ${f(y - 1.4 * s)} L${f(x + 5 * s)} ${f(y + 1)}"/>
    ${tongues}
  </g>`;
}

/** 춤추는 사람 하나 (그림자): 팔을 들고 천천히 들썩인다. 앞줄은 크게, 뒷줄은 작게 */
function dancer(x: number, ground: number, h: number, i: number, woman: boolean, r: () => number): string {
  const w = h * 0.26;
  const head = h * 0.12;
  const top = -h + head * 2;
  const body = woman
    ? `<path d="M${f(-w * 0.45)} ${f(top)} Q0 ${f(top - head * 0.6)} ${f(w * 0.45)} ${f(top)} L${f(w * 0.8)} 0 Q0 ${f(h * 0.04)} ${f(-w * 0.8)} 0 Z"/>`
    : `<path d="M${f(-w * 0.5)} ${f(top)} L${f(w * 0.5)} ${f(top)} L${f(w * 0.62)} 0 L${f(-w * 0.62)} 0 Z"/>`;
  const sw = f(w * 0.22);
  const up = (dir: number, k: number) => `<path class="cf-arm${dir < 0 ? ' cf-arm--b' : ''}" d="M${f(dir * w * 0.3)} ${f(top + 2)} L${f(dir * w * (0.5 + k * 0.4))} ${f(top - h * (0.28 + k * 0.08))}" stroke-width="${sw}"/>`;
  return `<g class="cf-dancer" style="--d:${f(r() * 3)}s; --t:${f(1.5 + r() * 0.9)}s; --i:${i}" transform="translate(${f(x)} ${f(ground)})">
    <g class="cf-dancer__b"><circle cx="0" cy="${f(top - head * 0.9)}" r="${f(head)}"/>${body}${up(1, r())}${up(-1, r())}</g>
  </g>`;
}

function dancers(): { back: string; front: string } {
  const r = rng(6301);
  const back: string[] = [];
  const front: string[] = [];
  // 뒷줄: 송아지 바로 뒤 둘레 (폰에서도 보이게 가운데 가까이), 넓은 화면에선 양옆까지
  for (let x = -120; x <= 520; x += (Math.abs(x - CX) < 90 ? 11 : 17) + r() * 5) {
    if (Math.abs(x - CX) < 22) continue;
    back.push(dancer(x, 222 + r() * 2, Math.abs(x - CX) < 90 ? 21 + r() * 4 : 16 + r() * 4, back.length, r() < 0.45, r));
  }
  // 앞줄: 받침 앞 (단이 선 가운데는 비움)
  for (let x = -100; x <= 500; x += (Math.abs(x - CX) < 100 ? 16 : 26) + r() * 6) {
    if (Math.abs(x - CX) < 30) continue;
    front.push(dancer(x, 236 + r() * 3, Math.abs(x - CX) < 100 ? 28 + r() * 5 : 23 + r() * 5, front.length + 40, r() < 0.45, r));
  }
  return { back: `<g class="cf-dance cf-dance--back">${back.join('')}</g>`, front: `<g class="cf-dance">${front.join('')}</g>` };
}

/** 진의 장막들 (가운데는 비워 둔다) */
function camp(): string {
  const spots: [number, number, number][] = [
    [-170, 230, 0.5], [-90, 228, 0.42], [-10, 232, 0.5], [52, 228, 0.42], [104, 233, 0.46], [148, 226, 0.34],
    [254, 226, 0.34], [298, 233, 0.46], [350, 228, 0.42], [412, 232, 0.5], [490, 228, 0.42], [570, 230, 0.5],
  ];
  return `<g class="cf-tents">${spots.map(([x, y, s]) => tent(x, y, s)).join('')}</g>`;
}

/** 진 곳곳의 모닥불. feast면 더 많고 크다 */
function fires(state: CalfState): string {
  const base: [number, number, number][] = [[-60, 236, 1], [78, 238, 0.9], [322, 238, 0.9], [460, 236, 1]];
  const more: [number, number, number][] = [[-130, 240, 1.2], [124, 242, 1.1], [276, 242, 1.1], [530, 240, 1.2], [20, 244, 1.3], [380, 244, 1.3]];
  const list = state === 'feast' || state === 'idol' ? [...base, ...more] : base;
  return list.map(([x, y, s], i) => campfire(x, y, s, 6200 + i, state === 'feast')).join('');
}

/** 산에서 흘러내리는 시내 (신 9:21 "그 가루를 산에서 흘러내리는 시내에 뿌렸느니라"). 금가루가 반짝이며 떠내려간다 */
function brook(): string {
  const d = 'M262 214 C252 222 236 224 226 230 C214 238 188 238 160 244 C130 250 96 252 60 262';
  const r = rng(6401);
  const specks = Array.from({ length: 16 }, (_, i) => `<circle class="cf-speck" style="--d:${f(r() * 6)}s" r="${f(0.5 + r() * 0.6)}" cx="0" cy="0"><animateMotion dur="${f(7 + r() * 4)}s" begin="-${f(i * 0.7)}s" repeatCount="indefinite" path="${d}"/></circle>`).join('');
  return `<g class="cf-brook">
    <path class="cf-water" d="${d}"/>
    <path class="cf-water__hi" d="${d}"/>
    ${specks}
  </g>`;
}

/** 산 아래 흩어진 돌판 조각 (32:19 "산 아래로 던져 깨뜨리니라") */
function shards(): string {
  const bits: [number, number, number, string][] = [
    [118, 246, -14, 'M0 0 L10 -2 L14 -12 L6 -18 L-2 -10 Z'],
    [140, 249, 22, 'M0 0 L12 1 L9 -9 L2 -12 Z'],
    [262, 247, -30, 'M0 0 L9 -1 L12 -10 L4 -15 L-2 -7 Z'],
    [286, 250, 12, 'M0 0 L8 0 L6 -7 Z'],
    [104, 252, 40, 'M0 0 L6 0 L4 -5 Z'],
  ];
  return `<g class="cf-shards">${bits.map(([x, y, a, d]) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="${d}"/><path class="cf-shard-line" d="M2 -4 h5 M3 -7 h4"/></g>`).join('')}</g>`;
}

/** 산길 위에서 내려다본 진 (32:17-18). 발밑은 바위 비탈, 저 아래 불빛 점들, 금빛 한 점, 피어오르는 소리의 고리 */
function view(): string {
  const r = rng(6501);
  const stars = Array.from({ length: 40 }, () => `<circle class="bd-star" style="--d:${f(r() * 6)}s" cx="${f(-200 + r() * 800)}" cy="${f(r() * 120)}" r="${f(0.3 + r() * 0.7)}"/>`).join('');
  const dots = Array.from({ length: 34 }, () => {
    const x = 40 + r() * 320;
    const y = 176 + r() * 14 + Math.abs(x - CX) * -0.02;
    return `<circle class="cf-dot" style="--d:${f(r() * 3)}s" cx="${f(x)}" cy="${f(y)}" r="${f(0.6 + r() * 0.9)}"/>`;
  }).join('');
  const tents = Array.from({ length: 22 }, () => tent(40 + r() * 320, 178 + r() * 12, 0.08 + r() * 0.04)).join('');
  const rings = [0, 1, 2, 3].map((i) => `<ellipse class="cf-ring" style="--d:${i * 1.6}s" cx="${CX}" cy="182" rx="22" ry="7"/>`).join('');
  return `
    ${stars}
    <path class="bd-far" d="M${-W * 2} 186 C-200 170 0 160 80 168 C140 160 260 158 320 166 C420 160 600 172 ${W * 3} 180 L${W * 3} ${H} L${-W * 2} ${H} Z"/>
    <g class="cf-valley">${tents}${dots}
      <circle class="cf-firelight cf-firelight--far" cx="${CX}" cy="183" r="24"/>
      <circle class="cf-gold" cx="${CX}" cy="183" r="1.6"/>
      ${rings}
    </g>
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 200 C-100 196 40 204 100 214 C130 220 150 232 160 ${H} Z"/>
    <path class="bd-mid" d="M${W * 3} ${H} L${W * 3} 196 C500 194 360 204 300 214 C270 222 252 236 246 ${H} Z"/>
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 222 C-60 220 60 226 110 236 C140 242 170 250 200 ${H} Z"/>
    <path class="bd-near" d="M${W * 3} ${H} L${W * 3} 220 C460 220 340 228 300 238 C270 244 240 252 220 ${H} Z"/>
    <path class="bd-ridge" d="M40 224 L70 230 M90 236 L120 244 M330 230 L300 238 M280 244 L262 252" />`;
}

export function calfArt(state: CalfState): string {
  if (state === 'view') return `<g class="cf cf--view">${view()}</g>`;
  const glowing = state === 'idol' || state === 'feast' || state === 'burn';
  const dance = state === 'feast' ? dancers() : { back: '', front: '' };
  return `<g class="cf cf--${state}">
    <g class="cf-mount sn sn--dark">${massif()}${state === 'ash' ? '' : cloud('dark')}</g>
    ${state === 'ash' ? '' : `<ellipse class="cf-campglow" cx="${CX}" cy="222" rx="260" ry="34"/>`}
    <g class="cf-dim">
      <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 226 C-400 222 -100 230 100 224 C200 221 300 226 500 222 C700 220 900 226 ${W * 3} 224 L${W * 3} ${H} Z"/>
      ${camp()}
    </g>
    ${state === 'ash' ? brook() : ''}
    ${state !== 'ash' ? fires(state) : ''}
    ${state === 'forge' ? forge() : ''}
    ${state === 'feast' ? dance.back : ''}
    ${glowing || state === 'ash' ? idol(state) : ''}
    ${state === 'feast' ? dance.front : ''}
    ${state === 'idol' || state === 'feast' ? altar(CX, 246, false, 6601) : ''}
    ${state === 'feast' ? `<g class="cf-altarfire">${[0, 1, 2, 3].map((i) => flameTongue(CX - 6 + i * 4, 223, 8 + ((i * 5) % 7), 0.8, i * 0.5)).join('')}</g>` : ''}
    ${state === 'burn' || state === 'ash' ? shards() : ''}
    <path class="bd-near cf-near" d="M${-W * 2} ${H} L${-W * 2} 248 C-300 244 0 252 200 248 C400 244 700 252 ${W * 3} 246 L${W * 3} ${H} Z"/>
  </g>`;
}

/** 풀무 구덩이: 금이 녹는 빛, 튀어 오르는 불티 (32:4 "부어서") */
function forge(): string {
  const r = rng(6701);
  const sparks = Array.from({ length: 14 }, () => `<circle class="cf-spark" style="--d:${f(r() * 4)}s; --dx:${f((r() - 0.5) * 30)}px; --t:${f(2.4 + r() * 2)}s" cx="${f(CX + (r() - 0.5) * 14)}" cy="214" r="${f(0.5 + r() * 0.6)}"/>`).join('');
  const tongues = Array.from({ length: 6 }, (_, i) => flameTongue(CX - 13 + i * 5.2, 218, 10 + r() * 12, 1.2, r() * 2)).join('');
  return `<g class="cf-forge">
    <circle class="cf-firelight cf-firelight--forge" cx="${CX}" cy="206" r="64"/>
    ${tongues}
    <path class="cf-pit" d="M${CX - 22} 222 C${CX - 20} 214 ${CX + 20} 214 ${CX + 22} 222 Z"/>
    <ellipse class="cf-melt" cx="${CX}" cy="216" rx="12" ry="2.6"/>
    <path class="cf-pit cf-pit--stones" d="M${CX - 26} 224 Q${CX - 24} 216 ${CX - 18} 217 Q${CX - 16} 222 ${CX - 12} 224 Z M${CX + 26} 224 Q${CX + 24} 216 ${CX + 18} 217 Q${CX + 16} 222 ${CX + 12} 224 Z"/>
    ${sparks}
  </g>`;
}

// ── 효과 tablets-break: 돌판이 깨진다 (32:19) ─────────────────────
// 성막 기구 그림(fx/tabernacle.ts, viewBox 240×200)의 두 돌판 위에 금이 그어지고, 여덟 조각으로 갈라져 아래로 떨어진다.
// 조각은 기구 그림을 그대로 복제해 다각형으로 잘라 낸 것 (clip-path) — 그래서 새겨진 글줄까지 조각마다 남는다.
const VW = 240;
const VH = 200;
type Pt = [number, number];
const SHARDS: Pt[][] = [
  [[44, 30], [86, 30], [82, 70], [90, 96], [84, 128], [74, 116], [62, 106], [44, 112]],
  [[44, 112], [62, 106], [74, 116], [84, 128], [92, 150], [88, 182], [44, 182]],
  [[86, 30], [120, 30], [120, 98], [102, 90], [90, 96], [82, 70]],
  [[90, 96], [102, 90], [120, 98], [120, 182], [88, 182], [92, 150], [84, 128]],
  [[120, 30], [150, 30], [156, 64], [146, 92], [158, 118], [150, 146], [134, 134], [120, 140]],
  [[120, 140], [134, 134], [150, 146], [160, 182], [120, 182]],
  [[150, 30], [196, 30], [196, 94], [166, 84], [146, 92], [156, 64]],
  [[146, 92], [166, 84], [196, 94], [196, 182], [160, 182], [150, 146], [158, 118]],
];
const CRACKS = [
  'M86 40 L82 70 L90 96 L84 128 L92 150 L88 172',
  'M62 106 L74 116 L84 128 M90 96 L102 90 L114 96',
  'M150 44 L156 64 L146 92 L158 118 L150 146 L156 172',
  'M126 138 L134 134 L150 146 M146 92 L166 84 L176 88',
];

/** 돌판 깨짐. play = .play, items = 성막 기구 층(.scene__items) */
export function playTabletsBreak(play: HTMLElement, items: HTMLElement, rm: boolean): void {
  let ti = items.querySelector<HTMLElement>('.ti[data-id="tablets"]:not(.is-out)');
  if (!ti) {
    setItem(play, items, 'tablets', true);
    ti = items.querySelector<HTMLElement>('.ti[data-id="tablets"]:not(.is-out)');
  }
  const art = ti?.querySelector<SVGSVGElement>('.ti__art');
  if (!ti || !art) return;
  const box = items.getBoundingClientRect();
  const a = art.getBoundingClientRect();
  const pos = { left: `${a.left - box.left}px`, top: `${a.top - box.top}px`, width: `${a.width}px`, height: `${a.height}px` };

  const layer = document.createElement('div');
  layer.className = 'fx-break';
  items.append(layer);
  const finish = () => {
    ti?.remove();
    if (!items.querySelector('.ti:not(.is-out)')) delete play.dataset.item;
  };
  setTimeout(() => layer.remove(), rm ? 2400 : 4200);

  // 1) 금: 돌판 위로 흰 금빛 선이 번개처럼 그어진다
  const crack = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  crack.setAttribute('viewBox', `0 0 ${VW} ${VH}`);
  crack.classList.add('fx-break__cracks');
  crack.innerHTML = CRACKS.map((d) => `<path pathLength="1" d="${d}"/>`).join('');
  Object.assign(crack.style, pos);
  layer.append(crack);

  if (rm) {
    // 모션 줄이기: 금이 보였다가 조용히 사라진다
    gsap.to(ti, { opacity: 0, duration: 0.8, delay: 0.8, onComplete: finish });
    gsap.to(crack, { opacity: 0, duration: 0.8, delay: 0.8 });
    return;
  }

  const label = ti.querySelector('.ti__label');
  const tl = gsap.timeline();
  tl.to(label, { opacity: 0, duration: 0.3 }, 0);
  tl.fromTo(crack.querySelectorAll('path'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.42, stagger: 0.12, ease: 'power3.in' }, 0.05);
  tl.fromTo(ti, { x: 0 }, { x: 3, duration: 0.05, repeat: 9, yoyo: true, ease: 'none' }, 0.2);

  // 2) 조각: 같은 그림을 복제해 다각형으로 잘라 둔다
  const pieces = SHARDS.map((poly) => {
    const p = document.createElement('div');
    p.className = 'ti is-on is-instant fx-break__shard';
    p.dataset.id = 'tablets';
    Object.assign(p.style, pos);
    p.style.clipPath = `polygon(${poly.map(([x, y]) => `${f((x / VW) * 100)}% ${f((y / VH) * 100)}%`).join(', ')})`;
    p.append(art.cloneNode(true));
    p.style.visibility = 'hidden';
    layer.append(p);
    const cx = poly.reduce((s, [x]) => s + x, 0) / poly.length;
    const cy = poly.reduce((s, [, y]) => s + y, 0) / poly.length;
    p.style.transformOrigin = `${f((cx / VW) * 100)}% ${f((cy / VH) * 100)}%`;
    return { p, cx, cy };
  });

  const T = 0.85;
  tl.add(() => {
    pieces.forEach(({ p }) => (p.style.visibility = 'visible'));
    if (ti) ti.style.visibility = 'hidden';
    play.querySelector<HTMLElement>('.play__flash') && gsap.fromTo(play.querySelector('.play__flash'), { opacity: 0.5 }, { opacity: 0, duration: 0.9, ease: 'power2.out' });
    gsap.fromTo(play.querySelector('.scene'), { x: -5 }, { x: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.2)' });
  }, T);
  tl.to(crack, { opacity: 0, duration: 0.25 }, T);
  const fall = box.height - a.top + box.top + a.height * 0.2;
  pieces.forEach(({ p, cx, cy }, i) => {
    const dx = (cx - VW / 2) * (a.width / VW);
    const spin = (cx < VW / 2 ? -1 : 1) * (18 + ((i * 37) % 50));
    const at = T + (cy > 110 ? 0 : 0.08) + (i % 3) * 0.04;
    tl.to(p, { x: dx * 0.22, y: -8 - (i % 3) * 3, rotation: spin * 0.12, duration: 0.2, ease: 'power2.out' }, at);
    tl.to(p, { x: dx * (0.6 + (i % 4) * 0.12), y: fall + (i % 3) * 30, rotation: spin, duration: 1.15 + (i % 3) * 0.12, ease: 'power2.in' }, at + 0.2);
  });
  // 3) 땅에 닿는 자리에서 돌가루가 인다
  tl.add(() => {
    const puff = document.createElement('div');
    puff.className = 'fx-break__dust';
    layer.append(puff);
  }, T + 1.15);
  tl.add(finish, T + 1.6);
}
