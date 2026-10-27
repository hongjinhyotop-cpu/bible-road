// 시내산 (출 19–20, A급 exo-19-20-sinai 「산이 연기에 싸이다」). 4막의 문. 같은 종이 오려낸 그림자극 말투.
// 배경 그림 (engine/moods.ts의 mood 이름 = art 이름):
//  - sinai-camp  : 시내 광야. 가운데 우뚝 선 붉은 화강암 산(쌍봉 어깨, 깊은 골), 그 발치에 늘어선 장막들 (출 19:2)
//  - sinai-bound : 같은 산 + 산 둘레에 박은 말뚝과 줄 — 지경(경계). 줄이 은은하게 빛난다 (출 19:12)
//  - sinai-storm : 제 삼일 아침. 빽빽한 먹구름이 산 윗부분을 삼키고, 구름 속에서 번개가 번쩍인다 (출 19:16)
//  - sinai-fire  : 불 가운데 강림: 꼭대기에 불빛, 옹기 가마 같은 연기 기둥이 하늘로 오르고, 온 산이 이따금 떤다 (출 19:18)
//  - sinai-dark  : 하나님이 계신 흑암: 산꼭대기를 덮은 짙은 어둠, 가장자리만 금빛. 번개는 멀어졌다 (출 20:21)
// 하나님은 그리지 않는다 — 구름·불·연기·번개·나팔 소리(효과 trumpet)로만 (CLAUDE.md 8-1).
// 폰(세로 화면)에서는 x 100~300만 보인다 → 산꼭대기(200, 44)와 경계 줄은 그 안에.
// 효과 fx "trumpet": 꼭대기에서 금빛 소리의 고리가 퍼진다. 부를 때마다 더 커지고 더 밝다 (19:19 "나팔 소리가 점점 커질 때에").
import { H, W, rng, tent } from './backdrop';

export type SinaiState = 'camp' | 'bound' | 'storm' | 'fire' | 'dark';

const SX = 200;
const SY = 44;
const FOOT = 214;
const f = (n: number) => n.toFixed(1);

/** 시내산: 가운데 높은 봉우리, 양옆 어깨 봉우리, 골짜기 능선. 화강암이 갈라진 결 */
function massif(): string {
  return `
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 196 L-560 186 L-420 198 L-300 180 L-170 194 L-60 186 L20 196 L${W * 3} 194 L${W * 3} ${H} Z"/>
    <path class="bd-far sn-mount" d="M-30 ${FOOT} L18 192 L44 184 L62 162 L84 150 L98 128 L116 122 L130 100 L146 92 L160 70 L172 66 L184 50 L${SX - 6} ${SY + 2} L${SX + 4} ${SY - 2} L212 50 L222 48 L232 64 L246 70 L258 92 L272 98 L286 122 L302 128 L318 152 L340 162 L360 184 L388 192 L430 ${FOOT} Z"/>
    <path class="bd-ridge" d="M${SX + 4} ${SY - 2} L198 74 L186 98 L180 132 M212 50 L218 84 L232 108 L236 150 M146 92 L140 126 L128 154 M258 92 L266 128 L280 160 M98 128 L94 156 M302 128 L306 166 M172 66 L166 96"/>
    <path class="bd-mid sn-shoulder" d="M-120 ${FOOT + 6} L-40 196 L10 186 L40 192 L70 182 L104 196 L130 ${FOOT + 6} Z M270 ${FOOT + 6} L300 196 L330 184 L362 190 L392 180 L440 194 L520 ${FOOT + 6} Z"/>
    <circle class="sn-summit" cx="${SX}" cy="${SY + 6}" r="1"/>`;
}

/** 진: 산 발치에 늘어선 장막들 (출 19:2 "산 앞에 장막을 치니라") */
function camp(): string {
  const spots: [number, number, number][] = [
    [-150, 232, 0.5], [-70, 230, 0.42], [12, 234, 0.5], [70, 230, 0.4], [118, 236, 0.46],
    [282, 236, 0.46], [330, 230, 0.4], [388, 234, 0.5], [470, 230, 0.42], [550, 232, 0.5],
  ];
  return `<g class="sn-camp">${spots.map(([x, y, s]) => tent(x, y, s)).join('')}</g>`;
}

/** 지경: 산 둘레를 따라 박은 말뚝과 이어 맨 줄 (출 19:12 "사면으로 지경을 정하고") */
function boundary(): string {
  const r = rng(4201);
  const pts: [number, number][] = [];
  for (let x = -60; x <= 460; x += 17) {
    const t = (x - SX) / 260;
    pts.push([x + (r() - 0.5) * 4, FOOT + 6 + t * t * 14]);
  }
  const stakes = pts.map(([x, y]) => `<path d="M${f(x - 0.8)} ${f(y + 2)} L${f(x - 0.6)} ${f(y - 7)} L${f(x + 0.6)} ${f(y - 7.4)} L${f(x + 0.8)} ${f(y + 2)} Z"/>`).join('');
  let cord = `M${f(pts[0][0])} ${f(pts[0][1] - 6)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    cord += ` Q${f((x0 + x1) / 2)} ${f((y0 + y1) / 2 - 3.6)} ${f(x1)} ${f(y1 - 6)}`;
  }
  return `<g class="sn-bound"><path class="sn-cord-glow" d="${cord}"/><g class="bd-mid">${stakes}</g><path class="sn-cord" d="${cord}"/></g>`;
}

/** 빽빽한 구름: 산 윗부분을 감싼 먹구름 덩이들. 천천히 굴러가고, 속에서 번개가 번쩍인다 */
function cloud(state: SinaiState): string {
  const r = rng(state === 'dark' ? 4311 : 4301);
  const n = state === 'storm' ? 34 : 40;
  const blobs = Array.from({ length: n }, (_, i) => {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r());
    const cx = SX + Math.cos(a) * d * 170;
    const cy = 62 + Math.sin(a) * d * (state === 'dark' ? 44 : 52);
    const rr = 18 + r() * 26;
    const st = `--d:${f(r() * 14)}s; --dx:${f((r() - 0.5) * 14)}px`;
    // 덩이마다 위쪽에 밝은 볼록면(빛 받는 면)을 하나 더 얹어 부피를 준다
    const hi = i % 2 ? '' : `<ellipse class="sn-puff sn-puff--hi" style="${st}" cx="${f(cx - rr * 0.3)}" cy="${f(cy - rr * 0.45)}" rx="${f(rr * 0.95)}" ry="${f(rr * 0.5)}"/>`;
    return `<ellipse class="sn-puff" style="${st}" cx="${f(cx)}" cy="${f(cy)}" rx="${f(rr * 1.5)}" ry="${f(rr)}"/>${hi}`;
  }).join('');
  // 넓은 화면: 양옆 하늘까지 이어진 구름 띠
  const band = `<path class="sn-band" d="M${-W * 2} 0 L${W * 3} 0 L${W * 3} 64 C900 92 700 70 520 96 C420 110 360 92 300 112 C240 130 160 130 100 112 C40 92 -20 112 -120 96 C-300 72 -560 96 ${-W * 2} 70 Z"/>`;
  const bolts = state === 'dark' ? '' : [
    `M150 40 L162 64 L154 66 L170 96`,
    `M248 30 L240 58 L250 60 L236 90 L244 92 L232 118`,
    `M98 70 L110 88 L102 90 L114 112`,
    `M306 64 L296 84 L304 86 L292 108`,
    `M196 18 L204 36 L196 38 L208 58`,
  ].map((d, i) => `<path class="sn-bolt" style="--d:${[0.4, 2.9, 5.1, 6.6, 3.8][i]}s" d="${d}"/>`).join('');
  return `<g class="sn-cloud sn-cloud--${state}">
    ${band}
    <ellipse class="sn-inner" cx="${SX}" cy="70" rx="140" ry="52"/>
    ${blobs}
    ${bolts}
    <ellipse class="sn-rim" cx="${SX}" cy="78" rx="150" ry="54"/>
  </g>`;
}

/** 불 가운데 강림 (19:18): 꼭대기의 불빛과 불꽃(구름 앞, 빛으로 번짐), 옹기 가마 연기처럼 오르는 연기 기둥(구름 뒤) */
function fire(dark: boolean): { back: string; front: string } {
  const r = rng(4401);
  const puffs = Array.from({ length: dark ? 8 : 14 }, (_, i) => `<circle class="sn-smoke" style="--d:${f(i * 0.62 + r() * 0.4)}s; --dx:${f((r() - 0.5) * 60)}px" cx="${f(SX + (r() - 0.5) * 16)}" cy="${SY + 8}" r="${f(9 + r() * 6)}"/>`).join('');
  const tongues = dark ? '' : Array.from({ length: 7 }, (_, i) => {
    const x = SX - 34 + i * 11.4 + (r() - 0.5) * 3;
    const h = 16 + r() * 18;
    return `<g class="bd-flame bd-flame--back" style="--d:${f(r() * 2)}s; --t:${f(1 + r() * 0.8)}s" transform="translate(${f(x)} ${SY + 22}) scale(2)">
      <path class="bd-flame__out" d="M-4 0 Q-5 ${f(-h * 0.5)} 0 ${f(-h)} Q5 ${f(-h * 0.5)} 4 0 Z"/>
      <path class="bd-flame__core" d="M-1.6 0 Q-2 ${f(-h * 0.35)} 0 ${f(-h * 0.6)} Q2 ${f(-h * 0.35)} 1.6 0 Z"/>
    </g>`;
  }).join('');
  return {
    back: `<g class="sn-column">${puffs}</g>`,
    front: `<g class="sn-fire${dark ? ' is-dark' : ''}">
    <ellipse class="sn-underglow" cx="${SX}" cy="${SY + 40}" rx="${dark ? 90 : 150}" ry="${dark ? 40 : 60}"/>
    <circle class="sn-fireglow" cx="${SX}" cy="${SY + 10}" r="${dark ? 50 : 84}"/>
    ${dark ? '' : `<ellipse class="sn-core" cx="${SX}" cy="${SY + 14}" rx="30" ry="14"/>`}
    <g class="sn-tongues">${tongues}</g>
  </g>`,
  };
}

export function sinaiArt(state: SinaiState): string {
  const storm = state === 'storm' || state === 'fire' || state === 'dark';
  const burning = state === 'fire' || state === 'dark' ? fire(state === 'dark') : null;
  return `<g class="sn sn--${state}">
    <g class="sn-quake">
      ${massif()}
      ${burning ? burning.back : ''}
      ${storm ? cloud(state) : `<g class="bd-cloud"><ellipse cx="${SX + 30}" cy="${SY + 10}" rx="44" ry="7"/><ellipse cx="${SX - 20}" cy="${SY + 20}" rx="28" ry="5"/></g>`}
      ${burning ? burning.front : ''}
    </g>
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 226 C-400 222 -100 230 100 224 C200 221 300 226 500 222 C700 220 900 226 ${W * 3} 224 L${W * 3} ${H} Z"/>
    ${state !== 'camp' ? boundary() : ''}
    ${camp()}
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 244 C-300 240 0 248 200 244 C400 240 700 248 ${W * 3} 242 L${W * 3} ${H} Z"/>
  </g>`;
}

/**
 * 효과 trumpet (19:16 "나팔 소리가 심히 크니", 19:19 "나팔 소리가 점점 커질 때에"):
 * 산꼭대기에서 금빛 소리의 고리가 퍼져 나와 화면 밖으로 지나간다. 나팔은 그리지 않는다 — 누가 부는지 아무도 보지 못했다.
 * 같은 에피소드에서 부를 때마다 한 단계씩 커진다 (고리 수·크기·밝기·화면 떨림). 4단계까지.
 */
export function playTrumpet(scene: HTMLElement, rm: boolean): void {
  const level = Math.min(4, Number(scene.dataset.trumpet ?? 0) + 1);
  scene.dataset.trumpet = String(level);
  const layer = document.createElement('div');
  layer.className = 'fx-trumpet';
  layer.style.setProperty('--lv', String(level));
  const b = scene.getBoundingClientRect();
  const top = scene.querySelector<SVGElement>('.sn-summit');
  if (top) {
    const a = top.getBoundingClientRect();
    if (a.width || a.height) {
      layer.style.setProperty('--x', `${a.left - b.left + a.width / 2}px`);
      layer.style.setProperty('--y', `${a.top - b.top + a.height / 2}px`);
    }
  }
  const n = rm ? 1 : 2 + level;
  layer.innerHTML = `<b></b>${Array.from({ length: n }, (_, i) => `<i style="--d:${(i * (1.3 - level * 0.12)).toFixed(2)}s"></i>`).join('')}`;
  scene.append(layer);
  if (!rm && level >= 2) {
    scene.classList.add('is-blast');
    setTimeout(() => scene.classList.remove('is-blast'), 1400 + level * 500);
  }
  const life = rm ? 2400 : 8200;
  setTimeout(() => layer.classList.add('is-out'), life - 1400);
  setTimeout(() => layer.remove(), life);
}
