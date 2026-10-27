// 바다가 갈라지다 (출 14, A급 exo-14-sea). 3막의 클라이맥스. 같은 종이 오려낸 그림자극 말투.
// 배경 그림 (engine/moods.ts의 mood 이름 → art):
//  - sea-camp      → redsea-camp     : 비하히롯 앞 바닷가 진. 바다 건너 바알스본 산, 왼쪽 믹돌 망대, 물가를 따라 늘어선 장막 (출 14:2)
//  - sea-chariots  → redsea-chariots : 해 질 녘 서쪽 마루를 따라 먼지를 일으키며 오는 병거의 줄. 창끝이 반짝인다 (출 14:9-10)
//  - sea-pillar    → redsea-pillar   : 밤. 가운데 불 기둥, 왼쪽(애굽 진)은 구름과 흑암, 오른쪽(이스라엘 진)은 불빛 (출 14:19-20)
//  - sea-wind      → redsea-wind     : 밤바다. 큰 동풍에 물결이 일어서고 구름이 달린다 (출 14:21)
//  - sea-part      → redsea-part     : 물이 갈라진다. 가운데가 꺼지며 마른 길이 열리고 좌우로 물벽이 솟는다 (약 8초, 탭하면 빨리 감김)
//  - sea-crossing  → redsea-crossing : 물벽 사이 마른 길. 백성이 긴 줄로 바다 가운데를 걸어 멀어진다. 등 뒤의 불 기둥 빛 (출 14:22)
//  - sea-chase     → redsea-chase    : 새벽 잿빛. 같은 길에 들어온 병거들이 비틀거리고 바퀴가 빠진다 (출 14:23-25)
//  - sea-return    → redsea-return   : 물벽이 안쪽으로 무너지고 길이 물에 덮인다 (약 8초, 탭하면 빨리 감김). 사람은 그리지 않는다 (출 14:27-28)
//  - sea-sunrise   → redsea-sunrise  : 해 돋는 잔잔한 바다. 물가 모래에 반쯤 묻힌 바퀴 하나만 (출 14:30-31)
// 물벽은 원근: 소실점(200,150)으로 모이는 두 벽의 안쪽 면. 폰(x 110~290)에서는 벽이 양옆을 다 채우고 가운데로 하늘이 V자로 보인다.
// 효과 fx "east-wind": 동풍 줄기가 무대를 가로질러 몰아친다 (약 9초).
// 모션 줄이기면 솟고 무너지는 연출 없이 끝 상태만 보여 준다 (styles/sea.css).
import { H, W, rng, tent } from './backdrop';

/** 소실점 */
const VX = 200;
const VY = 150;
/** 화면 아래(y 262)에서 길의 반폭 */
const PATH = 62;
/** 벽 높이: 눈높이의 몇 배인가 (위쪽 선의 기울기) */
const TALL = 1.5;

const f = (n: number) => n.toFixed(1);

function stars(seed: number, n: number, maxY: number): string {
  const r = rng(seed);
  return `<g class="rs-stars">${Array.from({ length: n }, () => {
    const big = r() < 0.1;
    return `<circle class="rs-star${big ? ' is-big' : ''}" style="--d:${(r() * 6).toFixed(2)}s" cx="${f(-W * 1.5 + r() * W * 4)}" cy="${f(r() * maxY)}" r="${(big ? 0.9 + r() * 0.5 : 0.3 + r() * 0.4).toFixed(2)}"/>`;
  }).join('')}</g>`;
}

type Sky = 'night' | 'grey' | 'dawn' | 'day' | 'dusk';
const SKY: Record<Sky, [string, string, string]> = {
  night: ['#03050c', '#0b1324', '#1b2234'],
  grey: ['#1a1e28', '#3a3f4c', '#6c6a6c'],
  dawn: ['#2c3450', '#c88a78', '#f4d2a0'],
  day: ['#6f8fa4', '#b9c4c0', '#e8d6b4'],
  dusk: ['#1e1c34', '#7a4a4a', '#e09a68'],
};
function sky(kind: Sky, id: string): string {
  const [a, b, c] = SKY[kind];
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="0.62" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs>
    <rect x="${-W * 2}" y="-40" width="${W * 5}" height="${H + 40}" fill="url(#${id})"/>`;
}

// ── 바닷가 (멀리서 본 바다) ─────────────────────────

/** 수평선 아래 바다 띠와 물결 줄 */
function seaBand(top: number, bottom: number, cls: string, seed: number, rows = 6): string {
  const r = rng(seed);
  const lines = Array.from({ length: rows }, (_, i) => {
    const t = (i + 0.5) / rows;
    const y = top + (bottom - top) * t * t;
    const step = 10 + t * 26;
    const amp = 0.5 + t * 2.4;
    return `<path class="rs-wave" style="--d:${(r() * 6).toFixed(2)}s; --dx:${f(step)}px" d="M${-W * 2 - step * 2} ${f(y)} ${Array.from({ length: Math.ceil((W * 5) / step) + 4 }, () => `q${f(step / 4)} ${f(-amp)} ${f(step / 2)} 0 t${f(step / 2)} 0`).join(' ')}"/>`;
  }).join('');
  return `<g class="${cls}"><rect class="rs-water" x="${-W * 2}" y="${top}" width="${W * 5}" height="${bottom - top}"/>${lines}</g>`;
}

/** 바다 건너 동쪽 기슭: 낮은 산줄기, 오른쪽에 바알스본 산 (출 14:2 "바알스본 맞은편") */
function farShore(y: number): string {
  return `<path class="bd-far rs-farshore" d="M${-W * 2} ${y} L-200 ${y - 3} L-60 ${y - 6} L40 ${y - 2} L120 ${y - 5} L200 ${y - 3} L246 ${y - 9} L276 ${y - 22} L290 ${y - 26} L304 ${y - 18} L330 ${y - 8} L420 ${y - 4} L560 ${y - 7} L${W * 3} ${y - 2} L${W * 3} ${y + 1} L${-W * 2} ${y + 1} Z"/>`;
}

/** 믹돌: 왼쪽 땅끝의 망대 (출 14:2 "바다와 믹돌 사이") */
function migdol(x: number, ground: number): string {
  return `<g class="bd-far rs-migdol">
    <path d="M${x - 7} ${ground} L${x - 5} ${ground - 34} L${x + 5} ${ground - 34} L${x + 7} ${ground} Z"/>
    <path d="M${x - 7} ${ground - 34} L${x - 7} ${ground - 38} L${x - 4} ${ground - 38} L${x - 4} ${ground - 36} L${x - 1} ${ground - 36} L${x - 1} ${ground - 38} L${x + 2} ${ground - 38} L${x + 2} ${ground - 36} L${x + 5} ${ground - 36} L${x + 5} ${ground - 38} L${x + 7} ${ground - 38} L${x + 7} ${ground - 34} Z"/>
    <rect class="rs-slit" x="${x - 0.8}" y="${ground - 26}" width="1.6" height="4"/>
  </g>`;
}

/** 물가를 따라 늘어선 장막들 */
function camp(ground: number, seed: number, lit: boolean): string {
  const r = rng(seed);
  let out = '';
  for (let x = -460; x < 860; x += 26 + r() * 40) {
    const s = 0.22 + r() * 0.16;
    out += tent(x, ground + r() * 4, s);
    if (lit && r() < 0.35) out += `<circle class="rs-campfire" style="--d:${(r() * 3).toFixed(2)}s" cx="${f(x + 12)}" cy="${f(ground + 1)}" r="${f(1.2 + r())}"/>`;
  }
  return `<g class="rs-camp${lit ? ' is-lit' : ''}">${out}</g>`;
}

/** 모래 바닥 (무대 땅을 깔지 않는 장면용) */
function sand(y: number, cls = 'rs-sand'): string {
  return `<path class="${cls}" d="M${-W * 2} ${H + 10} L${-W * 2} ${y + 4} C-300 ${y} -60 ${y + 6} 120 ${y + 2} C260 ${y - 1} 420 ${y + 5} ${W * 3} ${y} L${W * 3} ${H + 10} Z"/>`;
}

/** 비하히롯 앞 바닷가 진 (낮/저녁은 mood의 tone이 덮는다) */
function campArt(): string {
  return `
    ${sky('day', 'rs-sky-day')}
    ${farShore(176)}
    ${seaBand(176, 214, 'rs-sea', 1401)}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 206 C-260 204 -80 212 40 214 C110 216 150 218 180 220 L520 222 L${W * 3} 220 L${W * 3} ${H} Z"/>
    ${migdol(-18, 210)}
    ${camp(222, 1402, false)}
    ${sand(236)}`;
}

/** 병거 하나 (옆모습, 오른쪽으로 달림): 말 둘이 겹친 실루엣 + 바퀴 + 몰이꾼과 창 든 군사 */
function chariotSide(x: number, y: number, s: number, seed: number): string {
  const r = rng(seed);
  const spokes = [0, 60, 120].map((a) => {
    const c = Math.cos((a * Math.PI) / 180) * 4.4;
    const d = Math.sin((a * Math.PI) / 180) * 4.4;
    return `M${f(-c)} ${f(-5 - d)} L${f(c)} ${f(-5 + d)}`;
  }).join(' ');
  return `<g class="rs-ch" transform="translate(${f(x)} ${f(y)}) scale(${s})" style="--d:${(r() * 0.6).toFixed(2)}s">
    <g class="rs-ch__body">
      <path d="M6 -9 C8 -12 14 -13 19 -12 C22 -14 24 -17 25 -20 L27 -21 L27.6 -18 C27 -15 25.6 -12.6 23 -11 L22 -7 L23.4 0 L22 0 L20.2 -6.2 L14 -6.4 L12.4 0 L11 0 L11.6 -7 C9 -7.4 7 -8 6 -9 Z"/>
      <path d="M3 -10 L18 -10.5" stroke="currentColor" stroke-width="0.8" fill="none"/>
      <path d="M-7 -12 L3 -12 L4 -6 L-6 -6 Z"/>
      <circle cx="-2.4" cy="-15.6" r="1.6"/><path d="M-4 -14 L-1 -14 L-0.6 -11.6 L-4.4 -11.6 Z"/>
      <circle cx="1.4" cy="-16.2" r="1.5"/><path d="M0 -14.6 L3 -14.6 L3 -12 L-0.2 -12 Z"/>
      <path class="rs-spear" d="M1.6 -15 L6.2 -27" fill="none" stroke="currentColor" stroke-width="0.6"/>
      <circle class="rs-glint" style="--d:${(r() * 4).toFixed(2)}s" cx="6.2" cy="-27" r="0.9"/>
    </g>
    <g class="rs-ch__wheel" transform="translate(-1.5 0)"><circle cx="0" cy="-5" r="4.6" fill="none" stroke="currentColor" stroke-width="1"/><path d="${spokes}" stroke="currentColor" stroke-width="0.5"/></g>
  </g>`;
}

/** 해 질 녘, 서쪽 마루를 따라 오는 병거의 줄 (출 14:9-10 "눈을 들어 본즉") */
function chariotsArt(): string {
  const r = rng(1411);
  let row = '';
  for (let i = 0; i < 20; i++) {
    const x = -340 + i * 34 + r() * 8;
    row += chariotSide(x, 186 - Math.sin((x + 300) / 160) * 3, 0.62 + r() * 0.08, 1412 + i);
  }
  let row2 = '';
  for (let i = 0; i < 16; i++) row2 += chariotSide(-330 + i * 32 + r() * 10, 176, 0.4, 1440 + i);
  return `
    ${sky('dusk', 'rs-sky-dusk')}
    <circle class="rs-sun rs-sun--low" cx="40" cy="168" r="11"/>
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 182 C-300 176 -100 186 60 180 C220 175 360 186 ${W * 3} 180 L${W * 3} ${H} Z"/>
    <g class="rs-dust">${Array.from({ length: 18 }, (_, i) => `<ellipse style="--d:${(r() * 5).toFixed(2)}s" cx="${f(-360 + i * 34 + r() * 20)}" cy="${f(176 - r() * 10)}" rx="${f(18 + r() * 22)}" ry="${f(5 + r() * 6)}"/>`).join('')}</g>
    <g class="rs-host"><g class="rs-host__far bd-far">${row2}</g><g class="rs-host__near bd-mid">${row}</g></g>
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 204 C-200 200 0 210 160 206 C300 203 460 210 ${W * 3} 205 L${W * 3} ${H} Z"/>
    ${camp(232, 1413, true)}
    ${sand(244)}`;
}

/** 불 기둥: 땅에서 하늘 끝까지 선 불. 속은 희고, 겉은 주홍. 불꽃 덩이가 끝없이 위로 흐른다 */
function pillar(x: number, ground: number): string {
  const r = rng(1421);
  const tongues = Array.from({ length: 18 }, (_, i) => {
    const side = i % 2 ? 1 : -1;
    const tx = x + side * (5 + r() * 9);
    return `<path class="rs-pillar__tongue" style="--d:${(i * 0.36 + r() * 0.3).toFixed(2)}s; --x:${f(side * (2 + r() * 8))}px" d="M${f(tx - 5)} ${ground - 6} C${f(tx - 6)} ${ground - 18} ${f(tx - 1)} ${ground - 26} ${f(tx + side * 2)} ${ground - 40} C${f(tx + 3)} ${ground - 26} ${f(tx + 6)} ${ground - 16} ${f(tx + 5)} ${ground - 6} Z"/>`;
  }).join('');
  return `<g class="rs-pillar">
    <defs>
      <linearGradient id="rs-pillar-g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d0501e" stop-opacity="0"/><stop offset="0.2" stop-color="#e2682a" stop-opacity="0.75"/><stop offset="0.38" stop-color="#f6a046"/><stop offset="0.5" stop-color="#fff0c8"/><stop offset="0.62" stop-color="#f6a046"/><stop offset="0.8" stop-color="#e2682a" stop-opacity="0.75"/><stop offset="1" stop-color="#d0501e" stop-opacity="0"/></linearGradient>
      <radialGradient id="rs-pillar-glow"><stop offset="0" stop-color="#ffd59a" stop-opacity="0.55"/><stop offset="0.4" stop-color="#f0903c" stop-opacity="0.22"/><stop offset="1" stop-color="#f0903c" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse class="rs-pillar__glow" cx="${x}" cy="${ground - 60}" rx="150" ry="170" fill="url(#rs-pillar-glow)"/>
    <path class="rs-pillar__body" d="M${x - 14} ${ground} C${x - 12} ${ground - 80} ${x - 20} ${ground - 170} ${x - 24} -40 L${x + 24} -40 C${x + 20} ${ground - 170} ${x + 12} ${ground - 80} ${x + 14} ${ground} Z" fill="url(#rs-pillar-g)"/>
    <g class="rs-pillar__flow">${tongues}</g>
    <path class="rs-pillar__core" d="M${x - 3} ${ground} C${x - 4} ${ground - 90} ${x - 6} ${ground - 170} ${x - 7} -40 L${x + 7} -40 C${x + 6} ${ground - 170} ${x + 4} ${ground - 90} ${x + 3} ${ground} Z"/>
    <ellipse class="rs-pillar__foot" cx="${x}" cy="${ground}" rx="34" ry="4"/>
  </g>`;
}

/** 구름과 흑암: 애굽 진 쪽을 덮은 어둠. 멀리 그 너머 화톳불 몇 개가 아주 희미하게만 (출 14:20) */
function darkCloud(edge: number): string {
  const r = rng(1431);
  const puffs = Array.from({ length: 26 }, () => {
    const y = -10 + r() * 250;
    return `<ellipse style="--d:${(r() * 9).toFixed(2)}s" cx="${f(edge - 20 - r() * 520)}" cy="${f(y)}" rx="${f(36 + r() * 50)}" ry="${f(22 + r() * 30)}"/>`;
  }).join('');
  return `<g class="rs-darkness">
    <defs><linearGradient id="rs-dark-g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#020203" stop-opacity="0.98"/><stop offset="0.82" stop-color="#05050a" stop-opacity="0.95"/><stop offset="1" stop-color="#05050a" stop-opacity="0"/></linearGradient></defs>
    <circle class="rs-efire" cx="-80" cy="214" r="1.3"/><circle class="rs-efire" cx="-30" cy="216" r="1"/><circle class="rs-efire" cx="40" cy="213" r="1.1"/>
    <rect x="${-W * 2}" y="-40" width="${edge + W * 2}" height="${H + 60}" fill="url(#rs-dark-g)"/>
    <g class="rs-darkness__puffs">${puffs}</g>
  </g>`;
}

/** 밤: 불 기둥이 두 진 사이에 섰다 (출 14:19-20) */
function pillarArt(): string {
  return `
    ${sky('night', 'rs-sky-night')}
    ${stars(1422, 90, 150)}
    ${farShore(178)}
    ${seaBand(178, 214, 'rs-sea rs-sea--night', 1423)}
    <path class="rs-shore" d="M${-W * 2} ${H} L${-W * 2} 210 C-200 208 0 214 140 216 C260 218 400 214 ${W * 3} 216 L${W * 3} ${H} Z"/>
    ${camp(226, 1424, true)}
    ${sand(240, 'rs-sand rs-sand--lit')}
    ${darkCloud(150)}
    ${pillar(172, 238)}`;
}

/** 큰 동풍: 밤바다의 물결이 일어서고, 구름이 빠르게 달린다 (출 14:21 "밤새도록") */
function windArt(): string {
  const r = rng(1451);
  const scud = Array.from({ length: 9 }, (_, i) => `<ellipse style="--d:${(r() * 7).toFixed(2)}s" cx="${f(-300 + i * 110 + r() * 40)}" cy="${f(30 + r() * 90)}" rx="${f(50 + r() * 50)}" ry="${f(6 + r() * 6)}"/>`).join('');
  return `
    ${sky('night', 'rs-sky-wind')}
    ${stars(1452, 70, 160)}
    <g class="rs-scud">${scud}</g>
    ${farShore(VY + 16)}
    ${seaBand(VY + 16, 236, 'rs-sea rs-sea--night rs-sea--wind', 1453, 9)}
    <g class="rs-gust">${Array.from({ length: 16 }, () => `<path style="--d:${(r() * 2.4).toFixed(2)}s; --s:${(1.4 + r() * 1.2).toFixed(2)}s" d="M${f(-60 + r() * 520)} ${f(20 + r() * 210)} q${f(-20 - r() * 20)} ${f(-1 - r() * 2)} ${f(-50 - r() * 50)} 0"/>`).join('')}</g>
    ${sand(238, 'rs-sand rs-sand--lit')}
    <ellipse class="rs-behind" cx="200" cy="300" rx="260" ry="120"/>`;
}

// ── 갈라진 바다 (원근으로 본 물벽) ─────────────────

/** 소실점에서 뻗는 선이 y에 닿을 때의 x (아래쪽 선) */
const baseX = (y: number, side: -1 | 1) => VX + side * (2 + ((PATH - 2) * (y - VY)) / (262 - VY));

/**
 * 왼쪽 물벽 하나 (오른쪽은 이것을 좌우로 뒤집어 쓴다).
 * 안쪽 면 = 아래 선(길 가장자리)과 위 선(물마루) 사이. 화면 왼쪽 끝까지 다 벽이다.
 */
function wall(seed: number): string {
  const r = rng(seed);
  const vb = { x: -(PATH - 2), y: 262 - VY };
  const vt = { x: -(PATH - 2), y: -(262 - VY) * TALL };
  const far = (v: { x: number; y: number }, k: number) => `${f(VX - 2 + v.x * k)} ${f(VY + v.y * k)}`;
  // 벽 덩이: 소실점 → 아래 선 끝 → 화면 바깥 → 위 선 끝
  const mass = `M${VX - 2} ${VY + 0.6} L${far(vb, 3)} L${-W * 2} ${f(VY + vb.y * 3)} L${-W * 2} -400 L${far(vt, 3.3)} Z`;
  // 깊이 결: 소실점에서 퍼지는 물결 줄 (물이 엉겨 선 결, 출 15:8)
  const a0 = Math.atan2(vb.y, vb.x);
  const a1 = Math.atan2(vt.y, vt.x) + Math.PI * 2;
  const strata = Array.from({ length: 13 }, (_, i) => {
    const a = a0 + ((a1 - a0) * (i + 0.6 + r() * 0.5)) / 14;
    const len = 700;
    return `<path style="--d:${(r() * 12).toFixed(2)}s" d="M${VX - 2} ${VY} L${f(VX - 2 + Math.cos(a) * len)} ${f(VY + Math.sin(a) * len)}"/>`;
  }).join('');
  // 세로 빛줄기: 벽 속으로 꺾여 든 빛. 가까울수록 굵고 성기다
  const shafts = [0.12, 0.2, 0.31, 0.46, 0.66, 0.93, 1.3, 1.8, 2.5].map((s, i) => {
    const x = VX - 2 + vb.x * s;
    return `<path class="rs-shaft" style="--d:${(i * 0.7 + r()).toFixed(2)}s; --w:${f(0.6 + s * 3.4)}" d="M${f(x)} ${f(VY + vb.y * s - 1)} L${f(x)} ${f(VY + vt.y * s + 2)}"/>`;
  }).join('');
  // 물마루: 위 선을 따라 흰 거품이 출렁인다 (멀수록 잘다)
  const crest: string[] = [];
  const spray: string[] = [];
  const foam: string[] = [];
  for (let k = 0.04; k < 2.6; k *= 1.09) {
    const x = VX - 2 + vt.x * k + (r() - 0.5) * 6 * k;
    const y = VY + vt.y * k;
    crest.push(`<ellipse style="--d:${(r() * 3).toFixed(2)}s" cx="${f(x)}" cy="${f(y + (0.4 + r()) * 2 * k)}" rx="${f((1.6 + r() * 4) * (0.4 + k))}" ry="${f((0.5 + r() * 1.2) * (0.4 + k))}"/>`);
    foam.push(`${f(VX - 2 + vt.x * k + (r() - 0.5) * 5 * k)} ${f(y + (r() * 3 + 1) * k)}`);
    if (k > 0.15) spray.push(`<circle style="--d:${(r() * 4).toFixed(2)}s; --dx:${f(-4 - r() * 10 * k)}px; --dy:${f(-6 - r() * 16 * k)}px" cx="${f(x + (r() - 0.5) * 8 * k)}" cy="${f(y)}" r="${f(0.4 + r() * 1.2 * k)}"/>`);
  }
  // 벽 발치: 길과 닿는 곳의 젖은 거품 줄
  const foot = `M${VX - 2} ${VY + 0.6} L${far(vb, 1.4)}`;
  return `<g class="rs-wall">
    <path class="rs-wall__mass" d="${mass}" fill="url(#rs-wall-g)"/>
    <path class="rs-wall__depth" d="${mass}" fill="url(#rs-wall-depth)"/>
    <g class="rs-wall__strata">${strata}</g>
    <g class="rs-wall__shafts">${shafts}</g>
    <path class="rs-wall__edge" d="M${VX - 2} ${VY} L${far(vt, 3.3)}"/>
    <g class="rs-crest">${crest.join('')}</g>
    <path class="rs-foam" d="M${foam.join(' L')}" stroke-width="1.6"/>
    <g class="rs-spray">${spray.join('')}</g>
    <path class="rs-wall__foot" d="${foot}"/>
  </g>`;
}

/** 바다 가운데 마른 길: 젖은 모래, 물결 자국, 군데군데 남은 물웅덩이 */
function seabed(seed: number): string {
  const r = rng(seed);
  const ripples = Array.from({ length: 16 }, (_, i) => {
    const s = 0.03 + Math.pow(i / 15, 1.7) * 1.2;
    const y = VY + 112 * s;
    const hw = 2 + 60 * s;
    return `<path d="M${f(VX - hw + 2)} ${f(y)} Q${f(VX)} ${f(y - 1.4 * s - 0.3)} ${f(VX + hw - 2)} ${f(y)}"/>`;
  }).join('');
  const pools = Array.from({ length: 7 }, () => {
    const s = 0.15 + r() * 0.9;
    const y = VY + 112 * s;
    const x = VX + (r() - 0.5) * 2 * (40 * s);
    return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(2 + 6 * s)}" ry="${f(0.4 + 1 * s)}"/>`;
  }).join('');
  return `<g class="rs-path">
    <path class="rs-path__floor" d="M${VX - 2} ${VY + 0.6} L${VX + 2} ${VY + 0.6} L${f(baseX(400, 1))} 400 L${f(baseX(400, -1))} 400 Z" fill="url(#rs-floor-g)"/>
    <g class="rs-path__ripples">${ripples}</g>
    <g class="rs-path__pools">${pools}</g>
  </g>`;
}

/** 걸어가는 사람 하나 (뒷모습). 발이 (0,0). 길을 따라 소실점 쪽으로 작아지며 멀어진다 */
function walker(i: number, r: () => number): string {
  const h = 30 + r() * 8;
  const w = h * 0.3;
  const head = h * 0.1;
  const woman = r() < 0.4;
  const child = r() < 0.15;
  const k = child ? 0.62 : 1;
  const body = woman
    ? `<path d="M${f(-w * 0.45 * k)} ${f(-h * k + head * 2)} Q0 ${f(-h * k + head * 0.9)} ${f(w * 0.45 * k)} ${f(-h * k + head * 2)} L${f(w * 0.62 * k)} 0 L${f(-w * 0.62 * k)} 0 Z"/>`
    : `<path d="M${f(-w * 0.52 * k)} ${f(-h * k + head * 2.1)} L${f(w * 0.52 * k)} ${f(-h * k + head * 2.1)} L${f(w * 0.56 * k)} 0 L${f(-w * 0.56 * k)} 0 Z"/>`;
  const extra = !child && r() < 0.45
    ? `<path d="M${f(w * 0.2)} ${f(-h * 0.82)} q${f(w * 0.6)} ${f(-h * 0.06)} ${f(w * 0.7)} ${f(h * 0.2)} q${f(-w * 0.4)} ${f(h * 0.1)} ${f(-w * 0.7)} 0 Z"/>`
    : !child && r() < 0.4
      ? `<path d="M${f(w * 0.62)} 0 L${f(w * 0.56)} ${f(-h * 1.04)}" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>`
      : '';
  const lamp = !child && r() < 0.16 ? `<circle class="rs-walker__lamp" cx="${f(-w * 0.7)}" cy="${f(-h * 0.5)}" r="1.5"/>` : '';
  const lane = (r() - 0.5) * 1.7;
  return `<g class="rs-walker" style="--lane:${lane.toFixed(2)}; --d:${(i * 0.92 + r() * 0.4).toFixed(2)}s">
    <g class="rs-walker__bob" style="--b:${(0.5 + r() * 0.3).toFixed(2)}s"><circle cx="0" cy="${f(-h * k + head)}" r="${f(head * k)}"/>${body}${extra}${lamp}</g>
  </g>`;
}

/** 길 위의 병거 (뒷모습): 상자, 양옆 바퀴(옆에서 본 얇은 타원), 탄 사람과 창, 앞쪽에 말 두 마리의 등 */
function chariotRear(x: number, y: number, s: number, i: number): string {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})">
    <g class="rs-stuck" style="--i:${i}">
      <path class="rs-horse" d="M-9 -15 C-9 -20 -4 -21 -3 -16 L-3 -11 L-9 -11 Z M3 -16 C4 -21 9 -20 9 -15 L9 -11 L3 -11 Z M-7 -20 L-6.4 -27 L-4.6 -21 Z M6.6 -21 L5.6 -27.4 L4.4 -20.6 Z"/>
      <path d="M-8 -13 L8 -13 L8.6 -4 L-8.6 -4 Z"/>
      <circle cx="-1.6" cy="-18.4" r="2"/><path d="M-4 -16.4 L0.8 -16.4 L1 -13 L-4.2 -13 Z"/>
      <circle cx="3" cy="-17.6" r="1.8"/><path d="M1.2 -15.8 L5 -15.8 L5.2 -13 L1 -13 Z"/>
      <path d="M4.4 -15.6 L8.4 -30" fill="none" stroke="currentColor" stroke-width="0.7"/>
      <circle class="rs-glint" style="--d:${i * 0.9}s" cx="8.4" cy="-30" r="0.9"/>
      <path d="M-10 -4.6 L10 -4.6" stroke="currentColor" stroke-width="0.8"/>
      <ellipse cx="-10" cy="-5" rx="1.5" ry="5"/>
      <ellipse class="rs-wheel-off" cx="10" cy="-5" rx="1.5" ry="5"/>
    </g>
  </g>`;
}

export type SeaKind = 'part' | 'crossing' | 'chase' | 'return';

/** 갈라진 바다 (part · crossing · chase · return) */
function partedArt(kind: SeaKind): string {
  const r = rng(1461);
  const tone: Sky = kind === 'chase' ? 'grey' : kind === 'return' ? 'grey' : 'night';
  const walkers = kind === 'crossing' ? Array.from({ length: 26 }, (_, i) => walker(i, r)).join('') : '';
  const chariots = kind === 'chase'
    ? `<g class="rs-chariots bd-near">${chariotRear(166, 218, 1.1, 0)}${chariotRear(188, 200, 0.82, 1)}${chariotRear(176, 187, 0.6, 2)}${chariotRear(196, 177, 0.42, 3)}${chariotRear(190, 169, 0.3, 4)}</g>`
    : '';
  return `
    <defs>
      <linearGradient id="rs-wall-g" gradientUnits="userSpaceOnUse" x1="${VX}" y1="0" x2="-40" y2="0">
        <stop offset="0" stop-color="#6fa9b8"/><stop offset="0.05" stop-color="#2f6c80"/><stop offset="0.22" stop-color="#15405a"/><stop offset="0.55" stop-color="#0a2232"/><stop offset="1" stop-color="#040c14"/>
      </linearGradient>
      <radialGradient id="rs-wall-depth" gradientUnits="userSpaceOnUse" cx="${VX}" cy="300" r="260">
        <stop offset="0" stop-color="#f3b06a" stop-opacity="0.38"/><stop offset="0.5" stop-color="#f3b06a" stop-opacity="0.08"/><stop offset="1" stop-color="#f3b06a" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="rs-floor-g" gradientUnits="userSpaceOnUse" x1="0" y1="${VY}" x2="0" y2="262">
        <stop offset="0" stop-color="#1c2328"/><stop offset="0.5" stop-color="#3a3028"/><stop offset="1" stop-color="#6c5236"/>
      </linearGradient>
    </defs>
    ${sky(tone, `rs-sky-${kind}`)}
    ${tone === 'night' ? stars(1462, 80, VY) : ''}
    <circle class="rs-vp" cx="${VX}" cy="${VY - 2}" r="30"/>
    ${kind === 'part' || kind === 'return' ? '' : `<path class="bd-far rs-farshore" d="M${VX - 4} ${VY} L${VX - 1} ${VY - 1.6} L${VX + 1.5} ${VY - 1} L${VX + 4} ${VY} Z"/>`}
    ${seabed(1463)}
    ${kind === 'part' ? `<g class="rs-flat">${seaBand(VY - 1, 270, 'rs-sea rs-sea--night', 1464, 8)}</g>` : ''}
    <g class="rs-procession">${walkers}</g>
    ${chariots}
    <g class="rs-walls">
      <g class="rs-side">${wall(1465)}</g>
      <g transform="translate(${VX * 2} 0) scale(-1 1)"><g class="rs-side">${wall(1466)}</g></g>
    </g>
    ${kind === 'return' ? `<g class="rs-churn">${seaBand(VY - 2, 270, 'rs-sea rs-sea--grey', 1467, 9)}<ellipse class="rs-burst" cx="${VX}" cy="${VY + 8}" rx="120" ry="14"/></g>` : ''}
    <ellipse class="rs-behind" cx="${VX}" cy="320" rx="240" ry="120"/>`;
}

/** 해 돋는 아침: 잔잔한 바다, 물가 모래에 반쯤 묻힌 병거 바퀴 하나 (출 14:30-31) */
function sunriseArt(): string {
  const r = rng(1481);
  const shimmer = Array.from({ length: 14 }, (_, i) => {
    const y = 176 + i * 3.4 + i * i * 0.12;
    const w = 4 + i * 2.4;
    return `<path style="--d:${(r() * 3).toFixed(2)}s" d="M${f(200 - w + (r() - 0.5) * 6)} ${f(y)} h${f(w * 2)}"/>`;
  }).join('');
  const spokes = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 6 + 0.2;
    return `M${f(Math.cos(a) * -10)} ${f(Math.sin(a) * -10)} L${f(Math.cos(a) * 10)} ${f(Math.sin(a) * 10)}`;
  }).join(' ');
  return `
    ${sky('dawn', 'rs-sky-dawn')}
    <circle class="rs-sunhalo" cx="200" cy="174" r="80"/>
    <circle class="rs-sun" cx="200" cy="176" r="12"/>
    ${farShore(176)}
    ${seaBand(176, 232, 'rs-sea rs-sea--dawn', 1482, 7)}
    <g class="rs-shimmer">${shimmer}</g>
    ${sand(230, 'rs-sand rs-sand--dawn')}
    <g class="rs-wheel" transform="translate(204 243) rotate(-14) scale(0.72)">
      <circle cx="0" cy="0" r="11" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="${spokes}" stroke="currentColor" stroke-width="1"/>
      <circle cx="0" cy="0" r="2.4"/>
      <path class="rs-wheel__rim" d="M-9 -6 A11 11 0 0 1 4 -10.3" fill="none" stroke-width="1"/>
    </g>
    <path class="rs-sand rs-sand--dawn rs-sand--front" d="M168 262 C180 251 194 246 208 246 C224 246 236 251 246 262 Z"/>
    ${Array.from({ length: 5 }, (_, i) => `<path class="rs-foamline" style="--d:${(i * 1.3).toFixed(2)}s" d="M${-W * 2} ${231 + i * 0.3} C-100 ${229 + i} 100 ${233 - i} 260 ${230 + i * 0.5} C400 ${228} 600 ${232} ${W * 3} 230"/>`).join('')}`;
}

export type RedSeaArt = 'camp' | 'chariots' | 'pillar' | 'wind' | SeaKind | 'sunrise';

/** 홍해 배경 그림 */
export function redSeaArt(kind: RedSeaArt): string {
  switch (kind) {
    case 'camp':
      return campArt();
    case 'chariots':
      return chariotsArt();
    case 'pillar':
      return pillarArt();
    case 'wind':
      return windArt();
    case 'sunrise':
      return sunriseArt();
    default:
      return partedArt(kind);
  }
}

/**
 * fx "east-wind": 큰 동풍 (출 14:21). 바람 줄기가 화면을 가로질러 몰아치고, 무대 전체가 살짝 밀린다.
 * 약 9초 뒤 저절로 잦아든다. 모션 줄이기면 줄기 몇 개만 잠깐 보였다 사라진다.
 */
export function playEastWind(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-eastwind';
  const n = rm ? 6 : window.innerWidth < 600 ? 22 : 34;
  layer.innerHTML = Array.from({ length: n }, () => `<i style="--y:${(4 + Math.random() * 90).toFixed(1)}%; --d:${(Math.random() * 2.2).toFixed(2)}s; --s:${(0.9 + Math.random() * 0.9).toFixed(2)}s; --w:${(14 + Math.random() * 30).toFixed(0)}%"></i>`).join('');
  scene.append(layer);
  scene.classList.add('is-windy');
  const life = rm ? 2400 : 9000;
  setTimeout(() => {
    layer.classList.add('is-out');
    scene.classList.remove('is-windy');
  }, life - 1400);
  setTimeout(() => layer.remove(), life);
}
