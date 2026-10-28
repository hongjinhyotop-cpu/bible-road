// 발람과 나귀 (민 22–24, A급 num-22-24-balaam 「발람과 나귀」). 같은 종이 오려낸 그림자극 말투.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - bal-moab   : 모압 고원의 벼랑. 왼쪽에 모압 성벽과 망대, 발아래 넓은 평지를 장막이 "지면에 덮여" 채웠다 (민 22:1-5)
//  - bal-road   : 새벽 길. 지평선까지 곧게 뻗은 길, 양옆 밭과 포도나무 줄 (민 22:21-23 "밭으로 들어간지라")
//  - bal-walls  : 포도원 사이 좁은 길. 양옆으로 돌담이 소실점까지 이어지고, 담 위로 포도 덩굴 (민 22:24)
//  - bal-narrow : 좌우로 피할 데 없는 좁은 곳. 양쪽에서 바위벽이 닫혀 들고 가운데 틈으로만 빛 (민 22:26)
//  - bal-baal   : 바알의 산당 꼭대기. 앞 능선에 일곱 단, 연기. 발아래 평지에 진의 절반 (민 22:41, 23:1)
//  - bal-pisgah : 소빔 들, 비스가 꼭대기. 일곱 단, 진의 끝자락만 (민 23:13 "그 끝만 보리니")
//  - bal-peor   : 광야가 내려다보이는 브올산 꼭대기. 일곱 단, 지파대로 네모나게 진 친 온 이스라엘과 가운데 성막·구름 기둥 (민 23:28, 24:2)
//  - bal-star   : 같은 곳의 밤. 진의 등불들 위로 별 하나가 떠올라 밝아진다 (민 24:17 "한 별이 야곱에게서 나오며")
// 효과: bal-strike(채찍질 — 나귀 위 발람의 팔이 휘둘리고 나귀가 움찔), eyes-open(눈이 밝아짐 — 흐린 막이 걷히고 사자의 칼날이 번쩍),
//       clap(발락이 손뼉을 침 — 손에서 짧은 소리의 고리 두 번, 민 24:10)
// 하나님은 그리지 않는다. 여호와의 사자도 얼굴 없는 빛(characters/angel-sword.ts).
// 폰(세로 화면)에서는 x 100~300만 보인다 → 중요한 것은 그 안에.
import { H, W, rng, smoke } from './backdrop';

export type BalaamState = 'moab' | 'road' | 'walls' | 'narrow' | 'baal' | 'pisgah' | 'peor' | 'star';

const f = (n: number) => n.toFixed(1);

/** 먼 평지의 작은 장막 하나 */
function minitent(x: number, y: number, s: number): string {
  return `<path d="M${f(x - 3 * s)} ${f(y)} L${f(x)} ${f(y - 2.6 * s)} L${f(x + 3 * s)} ${f(y)} Z"/>`;
}

/** 평지를 덮은 장막들 (x0~x1, y0~y1). night면 문마다 등불 */
function tentField(x0: number, x1: number, y0: number, y1: number, n: number, seed: number, night = false): string {
  const r = rng(seed);
  const tents: string[] = [];
  const lamps: string[] = [];
  for (let i = 0; i < n; i++) {
    const y = y0 + r() * (y1 - y0);
    const s = 0.5 + ((y - y0) / Math.max(1, y1 - y0)) * 0.7;
    const x = x0 + r() * (x1 - x0);
    tents.push(minitent(x, y, s));
    if (night && r() < 0.5) lamps.push(`<circle class="bal-lamp" style="--d:${f(r() * 4)}s" cx="${f(x)}" cy="${f(y - 0.6)}" r="${f(0.5 + s * 0.4)}"/>`);
  }
  return `<g class="bal-tents">${tents.join('')}</g>${lamps.length ? `<g>${lamps.join('')}</g>` : ''}`;
}

/** 지파대로 네모나게 진 친 온 이스라엘: 가운데 성막(작은 네모)과 구름 기둥, 사방에 세 지파씩 (민 2, 24:2) */
function wholeCamp(cx: number, cy: number, night: boolean): string {
  const blocks: [number, number][] = [[-46, 0], [46, 0], [0, -9], [0, 9], [-24, -6], [24, -6], [-24, 7], [24, 7]];
  const tents = blocks.map(([dx, dy], i) => tentField(cx + dx - 14, cx + dx + 14, cy + dy - 2.5, cy + dy + 2.5, 16, 7300 + i, night)).join('');
  const flags = [[-46, -5], [46, -5], [0, -15], [0, 15]].map(([dx, dy]) =>
    `<path class="bal-flag" d="M${cx + dx} ${cy + dy} l0 -7 l5 1.6 l-5 1.6"/>`).join('');
  return `<g class="bal-camp">
    <ellipse class="bal-campglow" cx="${cx}" cy="${cy}" rx="78" ry="16"/>
    ${tents}${flags}
    <rect class="bal-holy" x="${cx - 4}" y="${cy - 3}" width="8" height="4"/>
    <g class="bal-pillar">${[0, 1, 2, 3, 4].map((k) => `<ellipse cx="${f(cx + (k % 2 ? 1.5 : -1.5))}" cy="${cy - 8 - k * 7}" rx="${f(3.4 + k * 0.5)}" ry="4"/>`).join('')}</g>
  </g>`;
}

/** 발아래 평지: 먼 산(요단 건너편)과 아래로 깔린 평지 */
function plain(y: number): string {
  return `<path class="bd-far bal-far" d="M${-W * 2} ${H} L${-W * 2} ${y - 14} C-300 ${y - 22} -100 ${y - 12} 60 ${y - 18} C160 ${y - 24} 260 ${y - 14} 400 ${y - 20} C600 ${y - 26} 800 ${y - 14} ${W * 3} ${y - 18} L${W * 3} ${H} Z"/>
    <path class="bal-plain" d="M${-W * 2} ${H} L${-W * 2} ${y} C-200 ${y - 2} 200 ${y + 2} 600 ${y - 1} L${W * 3} ${y} L${W * 3} ${H} Z"/>
    <path class="bal-jordan" d="M-120 ${y + 3} C0 ${y + 6} 60 ${y + 2} 140 ${y + 5} C220 ${y + 8} 320 ${y + 3} 520 ${y + 6}"/>`;
}

/** 산꼭대기 앞 능선과 일곱 단: 돌을 쌓은 작은 단마다 불과 연기 (민 23:1-2) */
function summit(seed: number, fires: boolean): string {
  const r = rng(seed);
  const xs = [118, 146, 172, 200, 228, 254, 282];
  const altars = xs.map((x, i) => {
    const g = 226 + Math.abs(i - 3) * 1.5;
    const w = 9;
    const h = 7;
    return `<g class="bal-altar">
      ${fires ? `<circle class="bal-altarglow" style="--d:${f(r() * 3)}s" cx="${x}" cy="${g - h - 2}" r="9"/>${smoke(x, g - h - 2, seed + i, 4)}` : ''}
      <path class="bd-mid" d="M${x - w / 2} ${g} L${x - w / 2 + 0.8} ${g - h} L${x + w / 2 - 0.8} ${g - h} L${x + w / 2} ${g} Z"/>
      <path class="bal-stones" d="M${x - w / 2 + 0.6} ${g - h / 2} h${w - 1.2} M${x - 1} ${g - h} v${h / 2} M${x + 1.5} ${g - h / 2} v${h / 2}"/>
      ${fires ? `<path class="bal-flame" style="--d:${f(r() * 2)}s" d="M${x - 3} ${g - h} Q${x - 1} ${g - h - 5} ${x} ${g - h - 7} Q${x + 1.5} ${g - h - 4} ${x + 3} ${g - h} Z"/>` : ''}
    </g>`;
  }).join('');
  const rocks = Array.from({ length: 12 }, () => {
    const x = -80 + r() * 560;
    return `<ellipse cx="${f(x)}" cy="${f(244 + r() * 10)}" rx="${f(3 + r() * 5)}" ry="${f(1.5 + r() * 2)}"/>`;
  }).join('');
  return `<path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 236 C-200 228 0 222 120 226 C180 224 240 222 300 227 C420 232 600 226 ${W * 3} 234 L${W * 3} ${H} Z"/>
    ${altars}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 250 C-300 246 0 254 200 250 C400 246 700 254 ${W * 3} 248 L${W * 3} ${H} Z"/>
    <g class="bd-near">${rocks}</g>`;
}

/** 모압 성벽: 벼랑 위 성벽과 망대 둘, 성문 위 불빛 */
function moabWall(): string {
  return `<g class="bd-mid bal-wall">
    <path d="M-300 ${H} L-300 150 L-40 150 L-40 136 L-20 136 L-20 150 L60 150 L60 130 L84 130 L84 150 L104 152 L118 196 L126 ${H} Z"/>
    <path class="bal-crenel" d="M-300 150 ${Array.from({ length: 18 }, () => `h8 v-5 h6 v5`).join(' ')}"/>
    <rect class="bal-window" x="68" y="138" width="4" height="7"/>
    <rect class="bal-window" x="-32" y="142" width="3" height="6"/>
  </g>`;
}

export function balaamArt(state: BalaamState): string {
  switch (state) {
    case 'moab':
      return `<g class="bal bal--moab">
        ${plain(206)}
        ${tentField(110, 420, 204, 222, 160, 7101)}
        ${moabWall()}
        <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 238 C-200 234 0 236 120 236 C200 238 300 248 420 244 C600 238 800 246 ${W * 3} 248 L${W * 3} ${H} Z"/>
      </g>`;
    case 'road': {
      const rows = Array.from({ length: 16 }, (_, i) => {
        const bx = -600 + i * 100;
        if (bx > 120 && bx < 300) return '';
        const tx = 205 + (bx - 205) * 0.12;
        return `M${f(bx)} ${H} L${f(tx)} 206`;
      }).join(' ');
      const r = rng(7111);
      const vines = Array.from({ length: 40 }, () => {
        const t = r();
        const side = r() < 0.5 ? -1 : 1;
        const bx = 205 + side * (110 + r() * 600);
        const x = 205 + (bx - 205) * (0.12 + t * 0.88);
        const y = 206 + t * (H - 206);
        return `<circle cx="${f(x)}" cy="${f(y - 2 - t * 6)}" r="${f(1 + t * 4)}"/>`;
      }).join('');
      return `<g class="bal bal--road">
        <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 200 C-200 194 0 202 160 198 C240 196 320 202 480 197 C700 194 900 200 ${W * 3} 198 L${W * 3} ${H} Z"/>
        <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 208 C-200 206 100 206 205 206 C320 206 600 206 ${W * 3} 208 L${W * 3} ${H} Z"/>
        <path class="bal-rows" d="${rows}"/>
        <g class="bd-near bal-vines">${vines}</g>
        <path class="bal-road" d="M205 206 L198 206 C190 220 140 240 70 ${H} L340 ${H} C270 240 220 220 212 206 Z"/>
      </g>`;
    }
    case 'walls': {
      const courses = (dir: -1 | 1) => Array.from({ length: 9 }, (_, i) => {
        const yb = 250 - i * 22;
        return `M${dir < 0 ? -300 : 700} ${yb} L${dir < 0 ? 40 : 360} ${yb} L${dir < 0 ? 186 : 214} ${f(206 - i * 1.2)}`;
      }).join(' ');
      const r = rng(7121);
      const leaves = (dir: -1 | 1) => Array.from({ length: 22 }, () => {
        const t = r();
        const x = dir < 0 ? -300 + t * 486 : 700 - t * 486;
        const y = x < 40 && dir < 0 || x > 360 && dir > 0 ? 60 : 60 + (dir < 0 ? (x - 40) : (360 - x)) * (136 / 146);
        return `<circle cx="${f(x)}" cy="${f(y - 2)}" r="${f(12 - t * 9)}"/>`;
      }).join('');
      return `<g class="bal bal--walls">
        <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 200 C0 196 200 200 400 197 C600 194 900 200 ${W * 3} 198 L${W * 3} ${H} Z"/>
        <path class="bal-road" d="M190 206 L210 206 L330 ${H} L70 ${H} Z"/>
        <g class="bd-near bal-vines">${leaves(-1)}${leaves(1)}</g>
        <path class="bd-mid bal-stonewall" d="M-300 ${H} L-300 60 L40 60 L186 196 L188 208 L90 ${H} Z"/>
        <path class="bd-mid bal-stonewall" d="M700 ${H} L700 60 L360 60 L214 196 L212 208 L310 ${H} Z"/>
        <path class="bal-courses" d="${courses(-1)} ${courses(1)}"/>
      </g>`;
    }
    case 'narrow':
      return `<g class="bal bal--narrow">
        <rect class="bal-gap" x="150" y="40" width="100" height="200"/>
        <path class="bal-road" d="M188 210 L212 210 L280 ${H} L120 ${H} Z"/>
        <path class="bd-mid" d="M-300 ${H} L-300 20 L60 30 C110 60 150 110 166 160 C176 190 182 206 186 ${H} Z"/>
        <path class="bd-mid" d="M700 ${H} L700 20 L340 30 C292 64 250 114 234 160 C224 190 218 206 214 ${H} Z"/>
        <path class="bd-near" d="M-300 ${H} L-300 60 L20 70 C70 110 110 170 124 ${H} Z M700 ${H} L700 60 L380 70 C330 110 290 170 276 ${H} Z"/>
        <path class="bal-crack" d="M70 60 L96 120 L90 170 M330 64 L306 118 L314 176"/>
      </g>`;
    case 'baal':
      return `<g class="bal bal--height">
        ${plain(212)}
        ${tentField(190, 430, 209, 223, 110, 7131)}
        ${summit(7141, true)}
      </g>`;
    case 'pisgah':
      return `<g class="bal bal--height">
        ${plain(212)}
        ${tentField(282, 430, 210, 222, 46, 7151)}
        ${summit(7161, true)}
      </g>`;
    case 'peor':
    case 'star': {
      const night = state === 'star';
      return `<g class="bal bal--height bal--${state}">
        ${night ? `<g class="bal-star"><circle class="bal-star__halo" cx="200" cy="74" r="40"/><path class="bal-star__ray" d="M200 46 L203 71 L228 74 L203 77 L200 102 L197 77 L172 74 L197 71 Z"/><circle class="bal-star__core" cx="200" cy="74" r="3.6"/></g>` : ''}
        ${plain(214)}
        ${wholeCamp(200, 216, night)}
        ${summit(7171, !night)}
      </g>`;
    }
  }
}

// ── 효과 ─────────────────────────────────────────

/** 무대 안 인물의 위치 (scene 기준) */
function spot(scene: HTMLElement, id: string, fy: number, fx = 0.5): { x: number; y: number } | null {
  const a = scene.querySelector<HTMLElement>(`.actor[data-id="${id}"]`);
  if (!a) return null;
  const b = scene.getBoundingClientRect();
  const r = a.getBoundingClientRect();
  return { x: r.left - b.left + r.width * fx, y: r.top - b.top + r.height * fy };
}

/** bal-strike: 나귀 위의 발람이 지팡이를 휘두르고(.dk-arm), 나귀가 움찔. 맞은 자리에 짧은 흰 빗금 (민 22:23, 25, 27) */
export function playStrike(scene: HTMLElement, rm: boolean): void {
  const donkey = scene.querySelector<HTMLElement>('.actor[data-id="donkey"]');
  if (!donkey) return;
  donkey.classList.remove('is-strike');
  void donkey.offsetWidth;
  donkey.classList.add('is-strike');
  setTimeout(() => donkey.classList.remove('is-strike'), 1400);
  if (rm) return;
  const p = spot(scene, 'donkey', 0.66, 0.42);
  if (!p) return;
  const mark = document.createElement('div');
  mark.className = 'fx-bstrike';
  mark.style.left = `${p.x}px`;
  mark.style.top = `${p.y}px`;
  mark.innerHTML = '<i></i><i></i>';
  scene.append(mark);
  setTimeout(() => mark.remove(), 1600);
}

/** eyes-open: 무대를 덮은 흐린 막이 걷히고, 사자의 칼날을 따라 빛이 위로 그어지며 번쩍 (민 22:31 "발람의 눈을 밝히시매") */
export function playEyesOpen(scene: HTMLElement, rm: boolean): void {
  const veil = document.createElement('div');
  veil.className = 'fx-eyes';
  const blade = scene.querySelector<SVGElement>('.actor[data-id="angel-sword"] .as-blade');
  const b = scene.getBoundingClientRect();
  if (blade) {
    const a = blade.getBoundingClientRect();
    if (a.width || a.height) {
      veil.style.setProperty('--x', `${a.left - b.left + a.width / 2}px`);
      veil.style.setProperty('--top', `${a.top - b.top}px`);
      veil.style.setProperty('--len', `${a.height}px`);
    }
  }
  veil.innerHTML = rm ? '<s></s>' : '<s></s><b></b><u></u>';
  scene.append(veil);
  setTimeout(() => veil.remove(), rm ? 2200 : 4600);
}

/** clap: 발락이 손뼉을 친다 — 손 높이에서 짧은 소리의 고리가 두 번 퍼진다 (민 24:10) */
export function playClap(scene: HTMLElement, rm: boolean): void {
  const p = spot(scene, 'balak', 0.4, 0.6);
  if (!p) return;
  const el = document.createElement('div');
  el.className = 'fx-clap';
  el.style.left = `${p.x}px`;
  el.style.top = `${p.y}px`;
  el.innerHTML = rm ? '<i></i>' : '<i></i><i></i>';
  scene.append(el);
  const who = scene.querySelector<HTMLElement>('.actor[data-id="balak"]');
  if (who && !rm) {
    who.classList.add('is-clap');
    setTimeout(() => who.classList.remove('is-clap'), 900);
  }
  setTimeout(() => el.remove(), 2000);
}
