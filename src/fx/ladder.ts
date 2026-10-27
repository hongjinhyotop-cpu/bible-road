// 벧엘의 사다리 (창 28:10-22, A급 gen-28-ladder). 배경 그림 'luz' · 'luz-ladder' · 'luz-pillar'.
// 같은 종이 오려낸 그림자극 말투. 루스 성 바깥, 돌이 많은 산마루. 해가 져서 한 곳에서 유숙한 그 자리.
//  - luz        : 돌투성이 마루, 멀리 언덕 위의 작은 성 루스, 가운데 베개 삼은 납작한 돌. 밤에는 별이 뜬다 (28:11)
//  - luz-ladder : 같은 자리 + 꿈. 땅 위에 선 빛의 사닥다리가 하늘 끝까지 닿고, 꼭대기는 빛 (하나님은 그리지 않는다),
//                 빛 덩이에 날개만 있는 작은 사자들이 천천히 오르락내리락한다 (28:12-13)
//  - luz-pillar : 아침. 베개였던 돌을 세운 돌기둥, 위에 부은 기름이 흘러 반짝인다. 곁에 기름 뿔병 (28:18)
// 폰(세로 화면)에서는 x 100~300만 보인다 → 사닥다리·기둥은 가운데(x 200 근처).
// 밤(tone night)에는 무대가 배경 전체를 어둡게 덮는데(library.css), 사닥다리 빛까지 어두워지면 안 되므로
// 이 그림들은 그 필터를 끄고 땅만 따로 어둡게 한다 (styles/ladder.css의 .lad-dim).
import { W, rng, hills, city } from './backdrop';

const GROUND = 240;

/** 하늘의 별 (밤에만 보인다). 일부는 천천히 반짝인다 */
function stars(seed: number): string {
  const r = rng(seed);
  return `<g class="lad-stars">${Array.from({ length: 150 }, () => {
    const big = r() < 0.1;
    const x = -W * 1.5 + r() * W * 4;
    const y = r() * 200;
    return `<circle class="lad-star${big ? ' is-big' : ''}" style="--d:${(r() * 7).toFixed(2)}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(big ? 1 + r() * 0.6 : 0.3 + r() * 0.5).toFixed(2)}"/>`;
  }).join('')}</g>`;
}

/** 흩어진 돌들 (돌이 많은 산마루) */
function rocks(xs: number[], ground: number, cls: string, seed: number, big = 1): string {
  const r = rng(seed);
  return `<g class="${cls}">${xs.map((x) => {
    const w = (5 + r() * 9) * big;
    const h = (3 + r() * 5) * big;
    return `<path d="M${(x - w).toFixed(1)} ${ground} C${(x - w).toFixed(1)} ${(ground - h * 0.8).toFixed(1)} ${(x - w * 0.4).toFixed(1)} ${(ground - h).toFixed(1)} ${x.toFixed(1)} ${(ground - h).toFixed(1)} C${(x + w * 0.6).toFixed(1)} ${(ground - h).toFixed(1)} ${(x + w).toFixed(1)} ${(ground - h * 0.6).toFixed(1)} ${(x + w).toFixed(1)} ${ground} Z"/>`;
  }).join('')}</g>`;
}

/** 루스 바깥 산마루: 먼 언덕과 작은 성, 가까운 돌투성이 비탈 */
function ridge(pillow: boolean): string {
  return `<g class="lad-dim">
    ${hills(200, 'bd-far', 901)}
    ${city(150, 205, 902, 0.75)}
    <path class="bd-far" d="M-800 260 L-800 214 C-500 210 -260 222 -60 216 C40 212 90 206 140 210 C200 216 260 222 330 216 C420 210 700 220 1200 214 L1200 260 Z"/>
    ${rocks([104, 150, 262, 300, -40, 30, 430, 500], 222, 'bd-far', 903, 0.8)}
    <path class="bd-mid" d="M-800 260 L-800 238 C-500 236 -200 244 40 238 C120 236 160 ${GROUND} 200 ${GROUND} C240 ${GROUND} 300 236 380 238 C620 244 900 236 1200 240 L1200 260 Z"/>
    ${rocks([60, 92, 128, 280, 318, 352, -80, -20, 440, 490], 246, 'bd-mid', 904)}
    ${pillow ? `<g class="bd-mid lad-pillow"><path d="M186 ${GROUND + 2} C185 ${GROUND - 4} 190 ${GROUND - 8} 198 ${GROUND - 8} C208 ${GROUND - 8} 216 ${GROUND - 6} 216 ${GROUND - 1} L216 ${GROUND + 2} Z"/></g>` : ''}
    ${rocks([-30, 20, 410, 456], 262, 'bd-near', 905, 1.8)}
  </g>`;
}

/** 빛의 사닥다리: 땅에서 하늘 끝까지. 원근으로 위로 갈수록 좁아지고 살짝 기운다 */
function ladder(): string {
  // 왼쪽·오른쪽 기둥 (아래 → 위)
  const L = [182, GROUND - 2, 206, -12];
  const R = [214, GROUND - 2, 220, -12];
  const at = (p: number[], t: number) => [p[0] + (p[2] - p[0]) * t, p[1] + (p[3] - p[1]) * t];
  // 가로대: 아래는 띄엄띄엄, 위로 갈수록 촘촘 (멀어지는 느낌)
  const rungs = Array.from({ length: 26 }, (_, i) => {
    const t = 1 - Math.pow(1 - (i + 0.6) / 26, 1.5);
    const [x1, y1] = at(L, t);
    const [x2, y2] = at(R, t);
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }).join(' ');
  return `<g class="lad-ladder">
    <defs>
      <linearGradient id="lad-beam-g" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" class="lad-beam__lo"/><stop offset="0.55" class="lad-beam__mid"/><stop offset="1" class="lad-beam__hi"/>
      </linearGradient>
      <radialGradient id="lad-crown-g"><stop offset="0" class="lad-crown__c"/><stop offset="0.4" class="lad-crown__m"/><stop offset="1" class="lad-crown__e"/></radialGradient>
    </defs>
    <circle class="lad-crown" cx="213" cy="-6" r="110"/>
    <path class="lad-beam" d="M168 ${GROUND} L228 ${GROUND} L234 -20 L196 -20 Z"/>
    <path class="lad-beam lad-beam--core" d="M184 ${GROUND} L212 ${GROUND} L220 -20 L206 -20 Z"/>
    <g class="lad-frame">
      <path class="lad-rail" pathLength="1" d="M${L[0]} ${L[1]} L${L[2]} ${L[3]}"/>
      <path class="lad-rail" pathLength="1" d="M${R[0]} ${R[1]} L${R[2]} ${R[3]}"/>
      <path class="lad-rungs" d="${rungs}"/>
    </g>
    <ellipse class="lad-foot" cx="198" cy="${GROUND - 1}" rx="30" ry="4"/>
    ${angels()}
  </g>`;
}

/**
 * 하나님의 사자들: 얼굴 없는 빛 덩이에 날개 한 쌍. 사닥다리 양옆을 따라 천천히 오르내린다.
 * 움직임은 CSS(--x0,--y0 → --x1,--y1, 크기 --s0 → --s1)로. 오를수록 작아진다(멀어짐).
 */
function angels(): string {
  const r = rng(911);
  const lanes = [
    // [아래 x, 위 x] — 왼쪽 기둥 바깥 / 오른쪽 기둥 바깥 / 가운데
    [172, 201],
    [224, 225],
    [198, 213],
  ];
  const list = [
    { lane: 0, up: true, dur: 19, d: 0 },
    { lane: 1, up: false, dur: 21, d: 3 },
    { lane: 0, up: false, dur: 23, d: 11 },
    { lane: 1, up: true, dur: 18, d: 8 },
    { lane: 2, up: true, dur: 25, d: 15 },
    { lane: 2, up: false, dur: 22, d: 6 },
    { lane: 0, up: true, dur: 20, d: 13 },
  ];
  const yBot = GROUND - 14;
  const yTop = -6;
  return list.map((a, i) => {
    const [xb, xt] = lanes[a.lane];
    const from = a.up ? [xb, yBot, 1] : [xt, yTop, 0.42];
    const to = a.up ? [xt, yTop, 0.42] : [xb, yBot, 1];
    const flap = (1.6 + r() * 0.8).toFixed(2);
    const style = `--x0:${from[0]}px; --y0:${from[1]}px; --s0:${from[2]}; --x1:${to[0]}px; --y1:${to[1]}px; --s1:${to[2]}; --dur:${a.dur}s; --d:${a.d + i * 0.7}s; --flap:${flap}s`;
    return `<g class="lad-angel" style="${style}">
      <circle class="lad-angel__aura" r="9"/>
      <g class="lad-angel__wings">
        <path class="lad-wing" d="M-1 -2 C-5 -9 -11 -11 -14 -8 C-11 -7 -9 -5 -8 -3 C-10 -3 -11 -1 -11 1 C-7 0 -4 -0.5 -1 0 Z"/>
        <path class="lad-wing lad-wing--r" d="M1 -2 C5 -9 11 -11 14 -8 C11 -7 9 -5 8 -3 C10 -3 11 -1 11 1 C7 0 4 -0.5 1 0 Z"/>
      </g>
      <path class="lad-angel__body" d="M0 -6.4 C1.6 -6.4 2.4 -5 2.2 -3.4 C3.4 -1 3.6 3 2.6 7 C1.4 8.4 -1.4 8.4 -2.6 7 C-3.6 3 -3.4 -1 -2.2 -3.4 C-2.4 -5 -1.6 -6.4 0 -6.4 Z"/>
    </g>`;
  }).join('');
}

/** 베개였던 돌을 세운 기둥 + 그 위에 부은 기름 (창 28:18). 곁에 기름 뿔병 */
function pillar(): string {
  const x = 200;
  const g = GROUND;
  // 기름 줄기: 꼭대기에서 앞면을 따라 가늘게 흘러내린다. 그 위로 방울이 천천히 미끄러진다
  const drops = [[197.4, 0], [203.2, 2.1], [200.4, 3.9]]
    .map(([cx, d]) => `<ellipse class="lad-drop" style="--d:${d}s" cx="${cx}" cy="${g - 40}" rx="0.7" ry="1.1"/>`)
    .join('');
  return `<g transform="translate(${x} ${g}) scale(2.5) translate(${-x} ${-g})">
    <path class="lad-memory" d="M192 ${g - 46} L208 ${g - 46} L226 -80 L174 -80 Z"/>
    <g class="lad-stone">
      <path d="M191 ${g} L190.6 ${g - 14} C190.2 ${g - 24} 190.8 ${g - 33} 192.4 ${g - 40} L194 ${g - 44.2} C197 ${g - 46} 201 ${g - 46.8} 205.4 ${g - 45.6} L207.6 ${g - 41} C209.2 ${g - 34} 209.6 ${g - 27} 209.4 ${g - 21} L210.6 ${g - 12} L211 ${g} Z"/>
      <path d="M201 ${g - 30} L203.4 ${g - 33} L204 ${g - 26} Z" class="lad-stone__chip"/>
      <path d="M185 ${g + 1} C186 ${g - 3} 190 ${g - 4.4} 193 ${g - 3} L207 ${g - 3} C210 ${g - 4.4} 214 ${g - 3} 215 ${g + 1} Z"/>
    </g>
    <path class="lad-stone__edge" d="M193.8 ${g - 41} C192.6 ${g - 30} 192.4 ${g - 16} 193 ${g - 3} M206.6 ${g - 26} l1.6 2 M196 ${g - 18} l2 1.2" fill="none"/>
    <path class="lad-oil" d="M194 ${g - 42} C196 ${g - 45.6} 199.4 ${g - 46.4} 202.8 ${g - 45.8} C205.6 ${g - 45} 207.4 ${g - 43} 208.2 ${g - 40} C206.4 ${g - 41.4} 204.4 ${g - 41.6} 203.6 ${g - 40.6} C203.4 ${g - 36} 204 ${g - 30} 203.6 ${g - 25} C203 ${g - 29} 202.6 ${g - 35} 202 ${g - 39.6} C200.4 ${g - 40.2} 199 ${g - 40} 197.8 ${g - 39.4} C197.8 ${g - 35} 197.4 ${g - 31} 196.8 ${g - 28} C196.4 ${g - 32} 196.4 ${g - 36} 196.6 ${g - 39.4} C195.6 ${g - 40.4} 194.8 ${g - 41} 194 ${g - 42} Z"/>
    <path class="lad-glint" d="M196.4 ${g - 43.4} C198.6 ${g - 45} 202 ${g - 45.2} 204.6 ${g - 44.2}" fill="none"/>
    ${drops}
    <g class="bd-mid">
      <path d="M218 ${g} C216.4 ${g - 2.4} 217 ${g - 6} 220 ${g - 7.4} C222.4 ${g - 8.4} 224.4 ${g - 10} 225.2 ${g - 13} L226.8 ${g - 12.4} C226 ${g - 8.6} 224.6 ${g - 5.4} 224.6 ${g - 2.4} L224 ${g} Z"/>
    </g>
  </g>`;
}

export function ladderArt(kind: 'luz' | 'ladder' | 'pillar'): string {
  if (kind === 'pillar') {
    return `<circle class="lad-sunrise" cx="330" cy="214" r="120"/>${stars(921)}${ridge(false)}${pillar()}`;
  }
  return `${stars(921)}${ridge(true)}${kind === 'ladder' ? ladder() : ''}`;
}
