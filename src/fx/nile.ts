// 나일강 갈대밭 (출 2:3-6, A급 exo-2-basket). 배경 그림 'nile' · 'nile-basket' · 'nile-found'.
// 같은 종이 오려낸 그림자극 말투: 멀리 낮은 맞은편 강둑과 왕궁 탑문(바로의 딸이 내려온 곳),
// 넓게 누운 강물, 강가에 우거진 파피루스(꼭대기가 불꽃처럼 퍼진 갈대). 무대 앞 양옆은 키 큰 파피루스가 막아 선다.
//  - nile        : 갈대밭만 (상자 없음)
//  - nile-basket : 역청 칠한 갈 상자가 갈대 사이에 떠 있다. 물결 따라 천천히 까딱이고, 물에 둥근 물결이 번진다
//  - nile-basket-side : 같은 상자가 가운데에서 조금 오른쪽 (무대에 셋이 서도 가운데 사람에게 가리지 않게)
//  - nile-found  : 상자를 건져 강가에 놓고 뚜껑을 열었다. 안에서 작은 손 하나가 올라와 허우적댄다 (출 2:6 "아이가 우는지라")
// 폰(세로 화면)에서는 x 110~290만 보인다 → 상자는 가운데(x 200) 또는 셋이 설 때 사이 틈(x 236), mood에 spread를 걸어 인물을 양옆으로 벌린다.
// 무대 땅(scene__land)이 가운데 아래(y 228 아래)를 덮으므로, 물과 상자는 y 196~228 사이에 둔다.
import { H, W, palm, rng } from './backdrop';

/** 파피루스 한 무더기: 곧은 줄기 여러 개, 꼭대기마다 가는 실이 부채꼴로 퍼진 꽃송이 */
export function papyrus(x: number, ground: number, h: number, cls: string, seed: number, n = 5): string {
  const r = rng(seed);
  const stems: string[] = [];
  const heads: string[] = [];
  for (let i = 0; i < n; i++) {
    const bx = x + (i - (n - 1) / 2) * h * 0.07 + (r() - 0.5) * h * 0.04;
    const len = h * (0.62 + r() * 0.38);
    const lean = (r() - 0.5) * h * 0.22 + (i - (n - 1) / 2) * h * 0.04;
    const tx = bx + lean;
    const ty = ground - len;
    const sw = Math.max(0.8, h * 0.012);
    stems.push(`<path d="M${bx.toFixed(1)} ${ground} Q${(bx + lean * 0.3).toFixed(1)} ${(ground - len * 0.55).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}" fill="none" stroke="currentColor" stroke-width="${sw.toFixed(2)}" stroke-linecap="round"/>`);
    // 꽃송이: 꼭대기에서 위·옆으로 퍼지는 가는 실 (부채꼴), 끝은 살짝 처진다
    const rays = 13;
    const size = h * (0.08 + r() * 0.04);
    let d = '';
    for (let k = 0; k < rays; k++) {
      const a = Math.PI * (0.96 + (k / (rays - 1)) * 1.08) + (r() - 0.5) * 0.1;
      const ex = tx + Math.cos(a) * size;
      const ey = ty + Math.sin(a) * size * 0.9;
      const droop = size * 0.45;
      d += `M${tx.toFixed(1)} ${ty.toFixed(1)} Q${((tx + ex) / 2).toFixed(1)} ${((ty + ey) / 2 - droop * 0.4).toFixed(1)} ${ex.toFixed(1)} ${(ey + droop * Math.abs(Math.cos(a))).toFixed(1)} `;
    }
    heads.push(`<path d="${d}" fill="none" stroke="currentColor" stroke-width="${(sw * 0.7).toFixed(2)}" stroke-linecap="round"/><circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="${(sw * 1.3).toFixed(1)}"/>`);
  }
  // 밑동의 짧은 잎
  const base = Array.from({ length: 4 }, (_, i) => {
    const bx = x + (i - 1.5) * h * 0.06;
    const len = h * (0.12 + r() * 0.08);
    const lean = (i - 1.5) * h * 0.05;
    return `<path d="M${(bx - 1.2).toFixed(1)} ${ground} Q${bx.toFixed(1)} ${(ground - len * 0.6).toFixed(1)} ${(bx + lean).toFixed(1)} ${(ground - len).toFixed(1)} Q${(bx + 1.2).toFixed(1)} ${(ground - len * 0.5).toFixed(1)} ${(bx + 1.6).toFixed(1)} ${ground} Z"/>`;
  }).join('');
  return `<g class="${cls}">${base}<g class="bd-sway" style="transform-origin:${x}px ${ground}px; --d:${(r() * 3).toFixed(2)}s">${stems.join('')}${heads.join('')}</g></g>`;
}

/** 갈 상자 (출 2:3 "갈 상자 … 역청과 나무 진을 칠하고"): 갈대를 엮은 둥근 바구니에 둥근 뚜껑 */
function basket(x: number, y: number, open: boolean): string {
  const lid = open
    ? // 뚜껑을 열어 뒤로 젖혀 둠
      `<path d="M${x - 15} ${y - 7} C${x - 22} ${y - 14} ${x - 22} ${y - 22} ${x - 16} ${y - 25} C${x - 12} ${y - 22} ${x - 11} ${y - 14} ${x - 12} ${y - 7} Z"/>`
    : `<path d="M${x - 13} ${y - 7} C${x - 12} ${y - 15} ${x - 6} ${y - 18} ${x} ${y - 18} C${x + 6} ${y - 18} ${x + 12} ${y - 15} ${x + 13} ${y - 7} Z"/>
       <path class="bd-weave" d="M${x - 8} ${y - 15} L${x - 9} ${y - 7} M${x} ${y - 18} L${x} ${y - 7} M${x + 8} ${y - 15} L${x + 9} ${y - 7}"/>`;
  // 상자 안의 아이: 감싼 천 위로 작은 팔 하나가 올라와 허우적댄다
  const baby = open
    ? `<circle class="bd-basket-glow" cx="${x}" cy="${y - 12}" r="30"/><circle class="bd-basket-light" cx="${x}" cy="${y - 10}" r="12"/>
       <path class="bd-baby" d="M${x - 9} ${y - 7} C${x - 9} ${y - 11} ${x - 5} ${y - 13} ${x - 1} ${y - 12} C${x + 3} ${y - 14} ${x + 8} ${y - 12} ${x + 9} ${y - 7} Z"/>
       <g class="bd-baby-arm" style="transform-origin:${x + 3}px ${y - 9}px"><path class="bd-baby" d="M${x + 2} ${y - 9} C${x + 3} ${y - 13} ${x + 5} ${y - 17} ${x + 7} ${y - 19} C${x + 8.6} ${y - 20} ${x + 9.6} ${y - 18.6} ${x + 9} ${y - 17.2} C${x + 7.6} ${y - 15} ${x + 6} ${y - 12} ${x + 5} ${y - 8} Z"/></g>`
    : '';
  // 건져 놓은 상자는 무대 앞으로 가까이 왔으니 조금 크게
  const near = open ? ` transform="translate(${x} ${y}) scale(1.35) translate(${-x} ${-y})"` : '';
  // (떠 있는 상자만 CSS로 까딱인다. CSS transform-origin은 transform 속성에도 걸리므로 건져 놓은 상자에는 주지 않는다)
  const bob = open ? '' : ` style="transform-origin:${x}px ${y}px"`;
  return `<g class="bd-basket${open ? '' : ' bd-basket--float'}"${bob}${near}>
    ${baby}
    <g class="bd-near">
      ${lid}
      <path d="M${x - 16} ${y - 8} C${x - 16} ${y - 2} ${x - 10} ${y + 3} ${x} ${y + 3} C${x + 10} ${y + 3} ${x + 16} ${y - 2} ${x + 16} ${y - 8} Z"/>
    </g>
    <path class="bd-weave" d="M${x - 15} ${y - 5} Q${x} ${y - 2} ${x + 15} ${y - 5} M${x - 13} ${y - 1} Q${x} ${y + 1.6} ${x + 13} ${y - 1} M${x - 10} ${y - 8} L${x - 11} ${y + 1} M${x - 3} ${y - 8} L${x - 3} ${y + 3} M${x + 4} ${y - 8} L${x + 4} ${y + 3} M${x + 11} ${y - 8} L${x + 11} ${y + 1}"/>
    <ellipse class="bd-basket-glint" cx="${x + 9}" cy="${y - 6}" rx="2.4" ry="0.9"/>
  </g>`;
}

/** 상자 둘레에 번지는 둥근 물결 */
function ripples(x: number, y: number): string {
  return `<g class="bd-ripples">${[0, 1, 2].map((i) => `<ellipse class="bd-ripple" style="--d:${(i * 1.6).toFixed(1)}s" cx="${x}" cy="${y + 2}" rx="20" ry="3.2"/>`).join('')}</g>`;
}

/** 왕궁 탑문: 위가 좁은 두 탑 사이의 문 (멀리, 바로의 딸이 내려온 곳) */
function pylon(x: number, ground: number, s: number, cls: string): string {
  return `<g class="${cls}" transform="translate(${x} ${ground}) scale(${s})">
    <path d="M-22 0 L-19 -30 L-5 -30 L-3 0 Z M22 0 L19 -30 L5 -30 L3 0 Z"/>
    <path d="M-4 0 L-4 -20 L4 -20 L4 0 Z" opacity="0.8"/>
    <path d="M-20 -30 L-4 -30 L-4 -32.5 L-20 -32.5 Z M20 -30 L4 -30 L4 -32.5 L20 -32.5 Z"/>
    <path d="M28 0 L29 -36 L31 -40 L33 -36 L34 0 Z"/>
  </g>`;
}

export function nileArt(state: 'reeds' | 'basket' | 'basket-side' | 'found'): string {
  const r = rng(271);
  // 강물 위에 흐르는 빛줄기 몇 가닥
  const flows = [204, 211, 218, 225]
    .map((y, i) => `<path class="bd-river" style="animation-duration:${(7 + i * 1.7).toFixed(1)}s" d="M${-W * 2} ${y} C-300 ${y - 3} -100 ${y + 3} 100 ${y} C${200 + r() * 40} ${y - 3} 400 ${y + 3} 600 ${y} C800 ${y - 3} 1000 ${y + 2} ${W * 3} ${y}"/>`)
    .join('');
  return `
    <path class="bd-far" d="M${-W * 2} 200 L${-W * 2} 192 C-500 189 -200 194 60 191 C240 189 420 194 ${W * 3} 190 L${W * 3} 200 Z"/>
    ${pylon(262, 192, 0.62, 'bd-far')}${pylon(-210, 192, 0.8, 'bd-far')}
    ${palm(150, 193, 26, 'bd-far', 701)}${palm(168, 194, 20, 'bd-far', 702)}${palm(318, 193, 24, 'bd-far', 703)}${palm(-60, 193, 30, 'bd-far', 704)}${palm(520, 193, 28, 'bd-far', 705)}
    <path class="bd-nile" d="M${-W * 2} 196 C-400 194 -100 198 200 195 C500 193 700 197 ${W * 3} 195 L${W * 3} ${H} L${-W * 2} ${H} Z"/>
    ${flows}
    ${papyrus(132, 206, 40, 'bd-mid', 711, 4)}${papyrus(244, 205, 34, 'bd-mid', 712, 4)}${papyrus(284, 207, 44, 'bd-mid', 713, 5)}
    ${papyrus(-40, 206, 46, 'bd-mid', 714, 5)}${papyrus(40, 206, 40, 'bd-mid', 715, 4)}${papyrus(440, 206, 44, 'bd-mid', 716, 5)}${papyrus(560, 206, 40, 'bd-mid', 717, 4)}
    ${state === 'basket' ? `${ripples(200, 222)}${papyrus(176, 226, 46, 'bd-mid', 718, 4)}${basket(200, 222, false)}${papyrus(224, 228, 40, 'bd-mid', 719, 3)}` : ''}
    ${state === 'basket-side' ? `${ripples(236, 222)}${papyrus(212, 226, 44, 'bd-mid', 718, 4)}${basket(236, 222, false)}${papyrus(262, 228, 38, 'bd-mid', 719, 3)}${papyrus(172, 228, 40, 'bd-mid', 720, 3)}` : ''}
    ${state === 'reeds' ? `${papyrus(186, 226, 44, 'bd-mid', 718, 4)}${papyrus(216, 228, 38, 'bd-mid', 719, 3)}` : ''}
    ${state === 'found' ? `${papyrus(196, 226, 44, 'bd-mid', 718, 4)}${papyrus(272, 228, 38, 'bd-mid', 719, 3)}${basket(236, 220, true)}` : ''}
    ${papyrus(112, 262, 124, 'bd-near', 721, 6)}${papyrus(298, 262, 132, 'bd-near', 722, 6)}
    ${papyrus(-30, 262, 150, 'bd-near', 723, 7)}${papyrus(440, 262, 150, 'bd-near', 724, 7)}${papyrus(560, 262, 120, 'bd-near', 725, 6)}`;
}
