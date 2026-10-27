// 호렙산의 떨기나무 (출 3:1-4:17, A급 exo-3-bush 「타지 않는 떨기나무」). 배경 그림 'horeb' · 'bush' · 'bush-snake'.
// 같은 종이 오려낸 그림자극 말투: 뒤로 우뚝 솟은 화강암 바위산(호렙, 하나님의 산), 그 앞 비탈에 흩어진 이드로의 양 떼,
// 무대 왼쪽 앞에 가시 많은 떨기나무 한 그루.
//  - horeb      : 아직 불이 없다. 양 떼가 풀을 뜯는다 (출 3:1)
//  - bush       : 떨기나무에 불이 붙었다. 불꽃이 잎 위에서 춤추지만 잎은 짙은 초록 그대로, 하나도 타지 않는다 (출 3:2).
//                 연기도 재도 없다. 빛 알갱이만 조용히 위로 오른다. 파괴하는 불이 아니라 머무는 불.
//  - bush-snake : 같은 불붙은 떨기나무 + 땅에 던진 지팡이가 된 뱀 (출 4:3). 몸을 천천히 뒤틀고 고개를 든다
// 폰(세로 화면)에서는 x 110~290만 보인다 → 떨기나무는 왼쪽(x 152), mood에 spread를 걸어 모세(한 명)를 오른쪽에 세운다.
// 무대 땅(land)은 깔지 않고 여기서 바닥(y 236 아래)을 직접 그린다 (떨기나무 밑동이 가려지지 않게).
import { H, W, rng, thorns } from './backdrop';

const GROUND = 236;
const BX = 160;
/** 떨기나무 크기 (폰에서 모세와 나란히 보이게 키운다) */
const BS = 1.38;

/** 호렙: 울퉁불퉁한 화강암 봉우리들이 겹친 큰 바위산. 꼭대기에 옅은 구름 한 자락 */
function horebMassif(): string {
  return `
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 204 L-560 196 L-420 206 L-300 190 L-180 202 L-60 194 L40 204 L90 198 L${W * 3} 200 L${W * 3} ${H} Z"/>
    <path class="bd-far bd-horeb" d="M60 214 L98 178 L118 170 L134 150 L150 146 L166 120 L182 112 L196 88 L210 82 L222 60 L234 54 L246 66 L258 62 L272 84 L286 92 L298 118 L312 126 L328 152 L350 164 L376 190 L420 214 Z"/>
    <path class="bd-ridge" d="M222 60 L214 96 L200 118 M234 54 L238 92 L252 120 L248 160 M258 62 L270 104 L292 140 M182 112 L176 146 M166 120 L160 158 M298 118 L306 158"/>
    <g class="bd-cloud"><ellipse cx="236" cy="62" rx="40" ry="7"/><ellipse cx="206" cy="70" rx="24" ry="5"/></g>
    <path class="bd-far" d="M-200 ${H} L-200 216 C-60 208 40 214 120 208 C200 202 300 210 380 206 C480 202 600 212 800 208 L800 ${H} Z" opacity="0.95"/>`;
}

/** 이드로의 양 한 마리: 둥근 털 몸통, 작은 머리, 가는 다리. graze면 고개를 숙였다 들었다 한다 */
function ewe(x: number, y: number, s: number, flip: boolean, graze: boolean, d: number): string {
  const head = `<g class="${graze ? 'bd-ewe__head' : ''}" style="transform-origin:${x + 6 * (flip ? -1 : 1)}px ${y - 4}px; --d:${d.toFixed(1)}s">
    <ellipse cx="${x + 8.6 * (flip ? -1 : 1)}" cy="${y - 4.6}" rx="2.6" ry="1.9"/></g>`;
  return `<g class="bd-ewe" transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">
    <path d="M${x - 5} ${y} L${x - 5.4} ${y + 4.6} M${x - 2} ${y + 0.6} L${x - 2} ${y + 4.8} M${x + 2.6} ${y + 0.6} L${x + 2.6} ${y + 4.8} M${x + 5} ${y} L${x + 5.4} ${y + 4.6}" fill="none" stroke="currentColor" stroke-width="0.9"/>
    <ellipse cx="${x}" cy="${y - 2.6}" rx="7" ry="4"/><circle cx="${x - 3.4}" cy="${y - 4.6}" r="2.6"/><circle cx="${x + 1.4}" cy="${y - 5.2}" r="2.8"/><circle cx="${x + 4.6}" cy="${y - 3.6}" r="2.4"/>
    ${head}
  </g>`;
}

function flock(): string {
  const r = rng(3101);
  const spots: [number, number, number][] = [
    [262, 220, 1], [284, 224, 1.1], [306, 219, 0.9], [118, 222, 0.95], [96, 226, 1.1],
    [334, 226, 1.15], [60, 220, 0.9], [-40, 224, 1], [380, 222, 1], [440, 226, 1.1], [-120, 222, 0.9],
  ];
  return spots.map(([x, y, s], i) => ewe(x, y, s, r() < 0.4, i % 3 !== 1, r() * 6)).join('');
}

/** 떨기나무: 밑동에서 갈라져 오르는 가시 돋친 가지들, 그 위에 촘촘한 잎 덩이 */
function bush(lit: boolean): string {
  const r = rng(3111);
  const stems: string[] = [];
  const leaves: string[] = [];
  const tips: [number, number][] = [];
  const n = 9;
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i - (n - 1) / 2) * 0.2 + (r() - 0.5) * 0.12;
    const len = 34 + r() * 22;
    const ex = BX + Math.cos(a) * len * 1.25;
    const ey = GROUND - 2 + Math.sin(a) * len;
    const mx = BX + Math.cos(a) * len * 0.45 + (r() - 0.5) * 8;
    const my = GROUND - 2 + Math.sin(a) * len * 0.5;
    // 가시: 가지 중간중간 짧게 삐죽
    const spikes = [0.45, 0.7].map((t) => {
      const px = BX + (ex - BX) * t;
      const py = GROUND - 2 + (ey - GROUND + 2) * t;
      const side = r() < 0.5 ? -1 : 1;
      return `M${px.toFixed(1)} ${py.toFixed(1)} l${(side * 3.4).toFixed(1)} ${(-2.4).toFixed(1)}`;
    }).join(' ');
    stems.push(`<path d="M${BX + (i - n / 2) * 0.8} ${GROUND} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)} ${spikes}" fill="none" stroke="currentColor" stroke-width="${(1.3 + r() * 0.9).toFixed(2)}" stroke-linecap="round"/>`);
    tips.push([ex, ey]);
  }
  // 잎 덩이: 가지 끝 쪽에 촘촘히 (작은 타원 잎 여러 개). 불이 붙어도 이 잎들은 그대로다
  for (let k = 0; k < 110; k++) {
    const t = r();
    const [tx, ty] = tips[Math.floor(r() * tips.length)];
    const lx = BX + (tx - BX) * (0.5 + t * 0.6) + (r() - 0.5) * 10;
    const ly = GROUND - 2 + (ty - GROUND + 2) * (0.5 + t * 0.6) + (r() - 0.5) * 8;
    const rot = (r() - 0.5) * 140;
    leaves.push(`<ellipse cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" rx="${(2.6 + r() * 2).toFixed(1)}" ry="${(1.2 + r() * 0.9).toFixed(1)}" transform="rotate(${rot.toFixed(0)} ${lx.toFixed(1)} ${ly.toFixed(1)})"/>`);
  }
  const crown = `<g class="bd-bush__leaves${lit ? ' is-lit' : ''} bd-sway" style="transform-origin:${BX}px ${GROUND}px; --d:1.4s">${leaves.join('')}</g>`;
  const wood = `<g class="bd-bush__wood">${stems.join('')}</g>`;
  const scale = (inner: string) => `<g transform="translate(${BX} ${GROUND}) scale(${BS}) translate(${-BX} ${-GROUND})">${inner}</g>`;
  if (!lit) return `<g class="bd-bush">${scale(wood + crown)}</g>`;

  // 불꽃: 뒤 불꽃(크고 흐린 혀, 잎 뒤에서 타올라 잎을 실루엣으로 비춘다) + 앞 불꽃(잎 위에서 날름거리는 작은 혀).
  // 혀 끝은 한쪽으로 휘어 있고, 저마다 다른 빠르기로 일렁인다
  const fr = rng(3121);
  const tongue = (x: number, y: number, h: number, w: number, bend: number) =>
    `M${x - w} ${y} C${x - w * 1.2} ${y - h * 0.35} ${x - w * 0.5 + bend * 0.3} ${y - h * 0.62} ${x + bend} ${y - h}`
    + ` C${x + w * 0.2 + bend * 0.2} ${y - h * 0.66} ${x + w * 1.25} ${y - h * 0.42} ${x + w} ${y} Q${x} ${y + w * 0.7} ${x - w} ${y} Z`;
  const flame = (dx: number, dy: number, s: number, cls: string) => {
    const x = BX + dx;
    const y = GROUND + dy;
    const h = 24 * s;
    const w = 6 * s;
    const bend = (fr() - 0.5) * w * 1.6;
    const st = `style="--d:${(fr() * 2).toFixed(2)}s; --t:${(0.9 + fr() * 0.9).toFixed(2)}s"`;
    return `<g class="bd-flame ${cls}" ${st}><path class="bd-flame__out" d="${tongue(x, y, h, w, bend)}"/><path class="bd-flame__core" d="${tongue(x, y + 1, h * 0.55, w * 0.42, bend * 0.5)}"/></g>`;
  };
  const back = ([[-20, -30, 1.25], [0, -40, 1.5], [20, -32, 1.3], [-34, -16, 0.9], [34, -16, 0.95], [-8, -20, 1.1], [12, -18, 1.05]] as const)
    .map(([dx, dy, k]) => flame(dx, dy, k * 1.3, 'bd-flame--back')).join('');
  const front = ([[-26, -40, 0.6], [-10, -50, 0.75], [8, -52, 0.8], [26, -40, 0.62], [-38, -26, 0.45], [38, -24, 0.45], [-2, -34, 0.55], [18, -22, 0.42], [-18, -18, 0.42]] as const)
    .map(([dx, dy, k]) => flame(dx, dy, k, 'bd-flame--front')).join('');
  // 연기 대신 빛 알갱이가 천천히 오른다 (타지 않는 불: 재가 없다)
  const motes = Array.from({ length: 16 }, () =>
    `<circle class="bd-mote" style="--d:${(fr() * 7).toFixed(2)}s; --dx:${((fr() - 0.5) * 30).toFixed(1)}px; --t:${(5 + fr() * 4).toFixed(1)}s" cx="${(BX + (fr() - 0.5) * 60).toFixed(1)}" cy="${(GROUND - 50 - fr() * 30).toFixed(1)}" r="${(0.7 + fr() * 0.9).toFixed(1)}"/>`,
  ).join('');
  return `<g class="bd-bush is-burning">
    <circle class="bd-bush__halo" cx="${BX}" cy="${GROUND - 56}" r="110"/>
    <path class="bd-bush__shaft" d="M${BX - 30} ${GROUND - 50} L${BX - 64} -20 L${BX + 64} -20 L${BX + 30} ${GROUND - 50} Z"/>
    ${scale(`<ellipse class="bd-bush__warm" cx="${BX}" cy="${GROUND - 36}" rx="64" ry="54"/>
      <g class="bd-bush__fire bd-bush__fire--back">${back}</g>
      ${wood}${crown}
      <g class="bd-bush__fire">${front}</g>`)}
    <g class="bd-bush__motes">${motes}</g>
  </g>`;
}

/** 땅에 던진 지팡이가 된 뱀 (출 4:3): 몸을 S자로 뒤틀며 천천히 꿈틀대고, 고개를 들어 혀를 낼름 */
function snake(x: number, y: number): string {
  return `<g class="bd-snake" style="transform-origin:${x}px ${y}px">
    <ellipse class="bd-snake__shadow" cx="${x + 4}" cy="${y + 2.4}" rx="30" ry="2.6"/>
    <g class="bd-snake__body" style="transform-origin:${x - 10}px ${y}px">
      <path d="M${x - 30} ${y + 0.8} C${x - 22} ${y - 3} ${x - 16} ${y + 4} ${x - 8} ${y + 1} C${x} ${y - 3} ${x + 6} ${y + 4} ${x + 14} ${y + 0.6} C${x + 18} ${y - 1} ${x + 20} ${y - 4} ${x + 21} ${y - 7}
        L${x + 24.4} ${y - 6.4} C${x + 23.4} ${y - 2} ${x + 20} ${y + 3.6} ${x + 14} ${y + 4} C${x + 6} ${y + 6.6} ${x} ${y + 0.4} ${x - 8} ${y + 4.4} C${x - 16} ${y + 7.4} ${x - 22} ${y + 0.6} ${x - 30} ${y + 2.6} Z"/>
    </g>
    <g class="bd-snake__head" style="transform-origin:${x + 22}px ${y - 6}px">
      <path d="M${x + 20.6} ${y - 6} C${x + 20} ${y - 12} ${x + 22} ${y - 16} ${x + 26} ${y - 17} C${x + 30} ${y - 17.6} ${x + 33} ${y - 16} ${x + 33.4} ${y - 14.4} C${x + 33} ${y - 13} ${x + 30} ${y - 12.4} ${x + 27} ${y - 12.6} C${x + 25.4} ${y - 11} ${x + 24.6} ${y - 8.6} ${x + 24.6} ${y - 6} Z"/>
      <path class="bd-snake__tongue" d="M${x + 33.2} ${y - 14.6} l3.4 -0.6 l1.4 -1.4 M${x + 36.6} ${y - 15.2} l1.6 0.6" fill="none"/>
      <circle class="bd-snake__eye" cx="${x + 29}" cy="${y - 15.2}" r="0.7"/>
    </g>
  </g>`;
}

export function bushArt(state: 'horeb' | 'bush' | 'snake'): string {
  const lit = state !== 'horeb';
  return `
    ${horebMassif()}
    <g class="bd-mid"><path d="M${-W * 2} ${H} L${-W * 2} 226 C-500 222 -200 228 40 224 C140 222 200 228 280 225 C420 220 700 228 ${W * 3} 224 L${W * 3} ${H} Z"/></g>
    ${flock()}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 240 C-500 236 -200 242 60 238 C120 236 180 240 240 238 C320 236 520 242 ${W * 3} 238 L${W * 3} ${H} Z"/>
    ${bush(lit)}
    ${state === 'snake' ? `<g transform="translate(186 252) scale(1.1) translate(-186 -252)">${snake(186, 252)}</g>` : ''}
    <g class="bd-near">
      <path d="M-20 262 C-18 238 -2 226 20 226 C36 226 50 236 56 250 C58 256 58 260 58 262 Z"/>
      <path d="M352 262 C354 246 366 236 384 236 C402 236 414 248 416 262 Z"/>
      <path d="M-170 262 C-160 232 -128 218 -104 222 C-84 226 -72 244 -70 262 Z"/>
      <path d="M470 262 C474 238 492 226 512 228 C532 232 542 248 542 262 Z"/>
    </g>
    ${thorns(98, 250, 14, 'bd-near', 3131)}${thorns(318, 252, 16, 'bd-near', 3132)}${thorns(-80, 246, 20, 'bd-near', 3133)}${thorns(460, 248, 18, 'bd-near', 3134)}`;
}
