// 요셉의 집 큰 방 (창 44:18–45:15, A급 gen-44-45-joseph). 배경 그림 'joseph-hall' · 'joseph-hall-shut' + 효과 'weep'.
// 같은 종이 오려낸 그림자극 말투. 이집트 총리의 홀:
//  - 위로 벌어진 파피루스 머리 기둥(묶은 줄기 무늬, 목에 감은 띠), 위를 가로지르는 들보와 오목한 처마(이집트식 코니스)
//  - 뒷벽 띠에 그림 글자 같은 무늬(실제 글자는 아님), 높은 창살 창으로 비스듬히 드는 빛
//  - 가운데 큰 문: 'joseph-hall'은 열려 있어 바깥 햇빛과 야자가 보이고,
//    'joseph-hall-shut'은 문짝이 닫혀 문틈과 문지방으로만 빛이 샌다 (45:1 "모든 사람을 자기에게서 물러가라 … 그와 함께한 자가 없었더라")
//  - 양옆 높은 받침 위 화로 둘, 매달린 세마포 휘장
// 폰(세로 화면)에서는 x 100~300만 보인다 → 문·화로·안쪽 기둥은 그 안에.
import { W, H, rng } from './backdrop';

const FLOOR = 238;

/** 파피루스 기둥: 묶은 줄기 무늬의 몸통, 목에 감은 띠 다섯 줄, 위로 벌어진 종 모양 머리 */
export function papyrus(x: number, top: number, bottom: number, w: number, cls: string): string {
  const capH = w * 1.5;
  const neck = top + capH;
  const flare = w * 1.05;
  const stems = Array.from({ length: 5 }, (_, i) => x - w / 2 + (w * (i + 0.5)) / 5)
    .map((sx) => `M${sx.toFixed(1)} ${neck + 12} V${bottom - 10}`)
    .join(' ');
  return `<g class="${cls}">
    <rect x="${x - w * 0.8}" y="${bottom - 7}" width="${w * 1.6}" height="7" rx="2"/>
    <path d="M${x - w / 2} ${bottom - 7} C${x - w * 0.56} ${bottom - 40} ${x - w * 0.5} ${neck + 30} ${x - w * 0.44} ${neck + 2} L${x + w * 0.44} ${neck + 2} C${x + w * 0.5} ${neck + 30} ${x + w * 0.56} ${bottom - 40} ${x + w / 2} ${bottom - 7} Z"/>
    <path d="M${x - w * 0.46} ${neck + 3} C${x - w * 0.6} ${neck - capH * 0.35} ${x - flare} ${top + capH * 0.25} ${x - flare} ${top + 2} L${x + flare} ${top + 2} C${x + flare} ${top + capH * 0.25} ${x + w * 0.6} ${neck - capH * 0.35} ${x + w * 0.46} ${neck + 3} Z"/>
    <rect x="${x - w * 0.56}" y="${top - 5}" width="${w * 1.12}" height="7"/>
    <path class="jh-paint" d="${stems}"/>
    <path class="jh-gild" d="${[0, 1, 2, 3, 4].map((i) => `M${x - w * 0.45} ${neck + 4 + i * 2.6} H${x + w * 0.45}`).join(' ')}"/>
    <path class="jh-paint" d="${[-0.66, -0.33, 0, 0.33, 0.66].map((t) => `M${x + t * w * 0.3} ${neck} Q${x + t * w * 0.7} ${top + capH * 0.4} ${x + t * flare * 0.95} ${top + 3}`).join(' ')}"/>
  </g>`;
}

/** 그림 글자 같은 무늬 줄: 작은 네모·둥근 꼴·세로 막대가 띄엄띄엄 (실제 글자 아님) */
export function glyphBand(x0: number, x1: number, y: number, h: number, seed: number): string {
  const r = rng(seed);
  const out: string[] = [];
  for (let x = x0; x < x1; ) {
    const k = r();
    if (k < 0.3) out.push(`<rect x="${x.toFixed(1)}" y="${(y + h * 0.25).toFixed(1)}" width="${(h * 0.5).toFixed(1)}" height="${(h * 0.5).toFixed(1)}"/>`);
    else if (k < 0.55) out.push(`<circle cx="${(x + h * 0.25).toFixed(1)}" cy="${(y + h / 2).toFixed(1)}" r="${(h * 0.22).toFixed(1)}"/>`);
    else if (k < 0.8) out.push(`<rect x="${x.toFixed(1)}" y="${(y + h * 0.1).toFixed(1)}" width="${(h * 0.14).toFixed(1)}" height="${(h * 0.8).toFixed(1)}"/>`);
    else out.push(`<path d="M${x.toFixed(1)} ${(y + h * 0.8).toFixed(1)} Q${(x + h * 0.3).toFixed(1)} ${(y + h * 0.1).toFixed(1)} ${(x + h * 0.6).toFixed(1)} ${(y + h * 0.8).toFixed(1)}"/>`);
    x += h * (0.6 + r() * 0.5);
  }
  return `<g class="jh-glyphs">${out.join('')}</g>`;
}

/** 높은 받침 위의 화로: 가는 세 다리, 넓은 놋 대접, 불꽃과 불빛 */
export function brazierStand(x: number, ground: number, s: number, low: boolean): string {
  const flame = low
    ? 'M-6 -46 Q-4 -54 0 -57 Q2 -52 5 -50 Q6 -48 6 -46 Z'
    : 'M-7 -46 Q-6 -62 0 -70 Q2 -60 7 -57 Q8 -51 7 -46 Z';
  return `<g transform="translate(${x} ${ground}) scale(${s})">
    <circle class="bd-firelight jh-firelight" cx="0" cy="-54" r="${low ? 24 : 34}"/>
    <g class="bd-near">
      <path d="M-9 0 L-2 -40 L2 -40 L9 0 L7 0 L0 -34 L-7 0 Z"/>
      <rect x="-1.2" y="-40" width="2.4" height="40"/>
      <path d="M-12 -46 L12 -46 C11 -40 6 -38 0 -38 C-6 -38 -11 -40 -12 -46 Z"/>
    </g>
    <path class="jh-gild" d="M-11 -45 H11"/>
    <path class="bd-flicker" d="${flame}"/>
  </g>`;
}

/** 큰 문: 열림 = 바깥 햇빛(야자·먼 신전), 닫힘 = 문짝 둘과 틈새의 빛 */
function door(shut: boolean): string {
  const x0 = 168;
  const x1 = 232;
  const top = 104;
  const outside = `
    <rect class="jh-sun" x="${x0}" y="${top}" width="${x1 - x0}" height="${FLOOR - top}"/>
    <path class="jh-outside" d="M${x0} 214 C${x0 + 16} 210 ${x1 - 20} 212 ${x1} 208 L${x1} ${FLOOR} L${x0} ${FLOOR} Z"/>
    <path class="jh-outside" d="M178 214 L178 176 L182 176 L182 214 Z M186 214 L186 186 L216 186 L216 214 Z M196 186 L201 176 L206 186 Z"/>
    <g class="jh-outside">
      <path d="M220 214 Q221 190 219 168 L221 168 Q224 190 223 214 Z"/>
      <path d="M220 168 Q210 164 204 170 Q212 166 220 170 Q228 162 236 166 Q228 166 221 170 Q216 158 212 156 Q220 160 221 168 Z"/>
    </g>
    <path class="jh-spill" d="M${x0} ${FLOOR} L${x1} ${FLOOR} L${x1 + 46} ${H} L${x0 - 46} ${H} Z"/>`;
  const closed = `
    <rect class="jh-leaf" x="${x0}" y="${top}" width="${(x1 - x0) / 2 - 0.6}" height="${FLOOR - top}"/>
    <rect class="jh-leaf" x="${(x0 + x1) / 2 + 0.6}" y="${top}" width="${(x1 - x0) / 2 - 0.6}" height="${FLOOR - top}"/>
    <path class="jh-paint" d="${[0, 1, 2, 3].map((i) => `M${x0 + 4} ${top + 16 + i * 30} H${(x0 + x1) / 2 - 4} M${(x0 + x1) / 2 + 4} ${top + 16 + i * 30} H${x1 - 4}`).join(' ')}"/>
    <rect class="jh-seam" x="${(x0 + x1) / 2 - 0.7}" y="${top}" width="1.4" height="${FLOOR - top}"/>
    <rect class="jh-seam" x="${x0}" y="${FLOOR - 1.4}" width="${x1 - x0}" height="1.4"/>
    <path class="jh-spill jh-spill--thin" d="M${(x0 + x1) / 2 - 2} ${FLOOR} L${(x0 + x1) / 2 + 2} ${FLOOR} L${(x0 + x1) / 2 + 14} ${H} L${(x0 + x1) / 2 - 14} ${H} Z"/>`;
  return `<g class="jh-door">
    ${shut ? closed : outside}
    <g class="bd-mid">
      <path d="M${x0 - 10} ${FLOOR} L${x0 - 10} ${top - 4} L${x0} ${top - 4} L${x0} ${FLOOR} Z M${x1} ${FLOOR} L${x1} ${top - 4} L${x1 + 10} ${top - 4} L${x1 + 10} ${FLOOR} Z"/>
      <path d="M${x0 - 16} ${top - 4} L${x1 + 16} ${top - 4} L${x1 + 12} ${top - 16} L${x0 - 12} ${top - 16} Z"/>
      <rect x="${x0 - 14}" y="${top - 20}" width="${x1 - x0 + 28}" height="4"/>
    </g>
    <path class="jh-gild" d="M${x0 - 12} ${top - 10} H${x1 + 12}"/>
  </g>`;
}

/** 매달린 세마포 휘장 (아주 천천히 흔들림) */
export function linen(x: number, w: number, h: number, d: number): string {
  return `<path class="jh-linen" style="--d:${d}s" d="M${x} 22 L${x + w} 22 C${x + w + 2} ${22 + h * 0.5} ${x + w - 3} ${22 + h * 0.8} ${x + w - 1} ${22 + h} Q${x + w / 2} ${22 + h + 6} ${x + 1} ${22 + h} C${x + 3} ${22 + h * 0.8} ${x - 2} ${22 + h * 0.5} ${x} 22 Z"/>`;
}

/** 요셉의 홀 (open = 문이 열림, shut = 모두 물러가고 문이 닫힘) */
export function josephHallArt(state: 'open' | 'shut'): string {
  const shut = state === 'shut';
  return `<g class="jh${shut ? ' jh--shut' : ''}">
    <rect class="bd-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${FLOOR}"/>
    <!-- 뒷벽의 띠: 그림 글자 줄 둘 -->
    <rect class="jh-band" x="${-W * 2}" y="58" width="${W * 5}" height="12"/>
    ${glyphBand(-W * 2, W * 3, 59, 10, 901)}
    <rect class="jh-band" x="${-W * 2}" y="150" width="${W * 5}" height="4"/>
    <!-- 높은 창살 창과 비스듬한 빛 -->
    ${[82, 300].map((x) => `<g class="bd-mid"><rect x="${x}" y="28" width="20" height="22"/></g><path class="bd-window-frame" d="${[0, 1, 2, 3].map((i) => `M${x + 3 + i * 4.7} 30 V48`).join(' ')}" stroke-width="1.6" fill="none" stroke="currentColor"/>`).join('')}
    <path class="bd-shaft jh-shaft" d="M82 50 L102 50 L170 ${FLOOR} L128 ${FLOOR} Z"/>
    <path class="bd-shaft jh-shaft" d="M300 50 L320 50 L282 ${FLOOR} L240 ${FLOOR} Z"/>
    ${door(shut)}
    <!-- 바닥 -->
    <rect class="bd-floor" x="${-W * 2}" y="${FLOOR}" width="${W * 5}" height="${H - FLOOR}"/>
    <path class="bd-floor-line" d="M${-W * 2} ${FLOOR} H${W * 3}"/>
    <g class="bd-mid"><rect x="${-W * 2}" y="${FLOOR + 6}" width="${W * 5}" height="2.4"/></g>
    <!-- 안쪽 기둥 줄 -->
    ${[-120, -40, 120, 280, 440, 520].map((x) => papyrus(x, 34, FLOOR, 18, 'bd-mid')).join('')}
    <!-- 들보와 오목한 처마 -->
    <g class="bd-mid">
      <rect x="${-W * 2}" y="16" width="${W * 5}" height="12"/>
      <path d="M${-W * 2} 16 L${W * 3} 16 L${W * 3} 6 C${W} 2 0 2 ${-W * 2} 6 Z"/>
    </g>
    <path class="jh-gild" d="M${-W * 2} 27 H${W * 3}"/>
    ${linen(132, 14, 60, 0)}${linen(254, 14, 60, 1.7)}
    ${brazierStand(146, FLOOR + 2, 1, shut)}${brazierStand(254, FLOOR + 2, 1, shut)}
    <!-- 앞쪽 큰 기둥 (넓은 화면 양옆) -->
    ${[30, 370, -60, 460].map((x) => papyrus(x, -6, H + 2, 32, 'bd-near')).join('')}
  </g>`;
}

/**
 * 효과 weep (45:2 "요셉이 방성대곡하니 애굽 사람에게 들리며 바로의 궁중에 들리더라"):
 * 우는 사람에게서 소리의 물결이 둥글게 퍼져 벽을 지나 화면 밖으로 나간다. 소리는 그리지 않고 퍼지는 고리와 아주 옅은 빛만.
 */
export function playWeep(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-weep';
  const who = scene.querySelector<HTMLElement>('.actor[data-id="joseph"] .actor__art') ?? scene.querySelector<HTMLElement>('.actor[data-id="joseph"]');
  const b = scene.getBoundingClientRect();
  if (who) {
    const a = who.getBoundingClientRect();
    if (a.width) {
      layer.style.setProperty('--x', `${a.left - b.left + a.width / 2}px`);
      layer.style.setProperty('--y', `${a.top - b.top + a.height * 0.22}px`);
    }
  }
  const n = rm ? 1 : 5;
  layer.innerHTML = `<b></b>${Array.from({ length: n }, (_, i) => `<i style="--d:${(i * 1.15).toFixed(2)}s"></i>`).join('')}`;
  scene.append(layer);
  const life = rm ? 2400 : 9000;
  setTimeout(() => layer.classList.add('is-out'), life - 1400);
  setTimeout(() => layer.remove(), life);
}
