// 7막 A급 — 다윗 (삼상 16 「중심을 보시는」 · 17 「물매와 돌 다섯」)의 전용 배경과 효과. 같은 종이 오려낸 그림자극 말투.
// 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - dv-bethlehem  : 베들레헴 성읍 어귀. 언덕 위에 겹겹이 쌓인 집들, 가운데 성문, 성문 앞에 모여 선 장로들의 작은 그림자,
//                    성문으로 오르는 길 (삼상 16:4 "성읍 장로들이 떨며 그를 영접하여")
//  - dv-yard       : 이새의 집 마당. 낮은 돌담과 집 앞면(문·지붕 난간·사다리), 마당의 작은 돌 단과 제사 연기,
//                    감람나무, 큰 항아리 (16:5 "이새와 그 아들들을 성결케 하고 제사에 청하니라")
//  - dv-field      : 베들레헴 들. 굽이진 언덕의 양 떼, 외딴 상수리나무, 먼 언덕 위의 작은 성읍 (16:11 "그가 양을 지키나이다")
//  - dv-court      : 기브아 사울의 궁 안. 두 기둥, 높은 등받이 자리와 벽에 기댄 창, 낮게 타는 화로 둘,
//                    자리 위에 고인 어두운 기운 (16:14 "악신이 그를 번뇌케 한지라" — 인물로 그리지 않는다)
//  - dv-court-calm : 같은 곳, 어두운 기운이 걷히고 화로가 밝다 (16:23 "사울이 상쾌하여 낫고")
//  - dv-elah       : 엘라 골짜기. 이편 산(오른쪽)에 블레셋 진, 저편 산(왼쪽)에 이스라엘 진, 사이 골짜기와 시내 (17:1-3)
//  - dv-brook      : 골짜기 바닥의 시냇가. 물결 사이 매끄러운 돌들, 그 가운데 다섯이 하나씩 빛난다 (17:40)
// 효과:
//  - lyre   : 수금 소리 — 다윗(없으면 무대 가운데)에게서 금빛 소리 결이 물결처럼 퍼지고, 배경의 어두운 기운이 걷힌다 (약 7초, 16:23)
//  - sling  : 물매 — 다윗의 머리 위에서 끈이 세 번 돌고, 돌 하나가 골리앗(없으면 오른쪽 사람) 쪽으로 곧게 날아가
//             닿기 직전 빛줄기만 남기고 사라진다. 이마에 박히는 순간은 그리지 않는다 (약 3초, 17:49)
//  - topple : 큰 몸이 앞으로 쓰러짐 — 대상(beat의 who, 없으면 goliath)이 발끝을 축으로 천천히 기울어 엎드러지고 어두워짐,
//             흙먼지와 무대 흔들림 (약 3초, 17:49 "땅에 엎드러지니라"). 실루엣만, 피·상처 없음
// 하나님은 그리지 않는다 (voice · glory · 빛).
import { H, W, rng, smoke, tree } from './backdrop';
import { folk, ground, ridge } from './joshua';

export type DavidArt = 'dv-bethlehem' | 'dv-yard' | 'dv-field' | 'dv-court' | 'dv-court-calm' | 'dv-elah' | 'dv-brook';

const f = (n: number) => n.toFixed(1);

/** 감람나무 (작고 둥근 잎 덩이) */
const olive = (x: number, y: number, s: number, seed: number, cls = 'bd-mid') => tree(x, y, 34 * s, cls, seed, { sway: true });

/** 풀 뜯는 양 한 마리 (떨기나무 장면의 양과 같은 틀 — styles/bush.css .bd-ewe) */
function ewe(x: number, y: number, s: number, flip: boolean, graze: boolean, d: number): string {
  const k = flip ? -1 : 1;
  const head = `<g class="${graze ? 'bd-ewe__head' : ''}" style="transform-origin:${f(x + 6 * k)}px ${f(y - 4)}px; --d:${f(d)}s">
    <ellipse cx="${f(x + 8.6 * k)}" cy="${f(y - 4.6)}" rx="2.6" ry="1.9"/></g>`;
  return `<g class="bd-ewe" transform="translate(${f(x)} ${f(y)}) scale(${s}) translate(${f(-x)} ${f(-y)})">
    <path d="M${f(x - 5)} ${f(y)} L${f(x - 5.4)} ${f(y + 4.6)} M${f(x - 2)} ${f(y + 0.6)} L${f(x - 2)} ${f(y + 4.8)} M${f(x + 2.6)} ${f(y + 0.6)} L${f(x + 2.6)} ${f(y + 4.8)} M${f(x + 5)} ${f(y)} L${f(x + 5.4)} ${f(y + 4.6)}" fill="none" stroke="currentColor" stroke-width="0.9"/>
    <ellipse cx="${f(x)}" cy="${f(y - 2.6)}" rx="7" ry="4"/><circle cx="${f(x - 3.4)}" cy="${f(y - 4.6)}" r="2.6"/><circle cx="${f(x + 1.4)}" cy="${f(y - 5.2)}" r="2.8"/><circle cx="${f(x + 4.6)}" cy="${f(y - 3.6)}" r="2.4"/>
    ${head}
  </g>`;
}

/** 납작 지붕 집 하나 (창에 불빛) */
function house(x: number, y: number, w: number, h: number, cls: string, lit: boolean): string {
  return `<g class="${cls}"><rect x="${f(x)}" y="${f(y - h)}" width="${f(w)}" height="${f(h)}"/><rect x="${f(x - 1)}" y="${f(y - h - 2)}" width="${f(w + 2)}" height="2"/></g>
    ${lit ? `<rect class="dv-window" style="--d:${f((x * 7) % 3)}s" x="${f(x + w * 0.4)}" y="${f(y - h * 0.62)}" width="${f(Math.max(1.4, w * 0.12))}" height="${f(Math.max(1.8, h * 0.2))}"/>` : ''}`;
}

/** 언덕 위에 겹겹이 쌓인 집들 */
function town(cx: number, top: number, s: number, seed: number, n = 11, cls = 'bd-mid'): string {
  const r = rng(seed);
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    const w = (9 + r() * 10) * s;
    const h = (7 + r() * 8) * s;
    const x = cx - (n / 2) * 9.6 * s + i * 9.6 * s + (r() - 0.5) * 3 * s;
    const y = top + Math.abs(i - (n - 1) / 2) * 2.4 * s + 10 * s;
    out.push(house(x, y, w, h, cls, r() > 0.5));
  }
  return out.join('');
}

/** 장막 하나 (진영) */
function campTent(x: number, y: number, s: number, cls: string): string {
  return `<path class="${cls}" d="M${f(x - 7 * s)} ${f(y)} L${f(x)} ${f(y - 8 * s)} L${f(x + 7 * s)} ${f(y)} Z"/>`;
}

/** 진영: 산비탈의 장막들 + 창을 세운 사람들의 줄 + 깃발 */
function camp(x0: number, y0: number, x1: number, y1: number, seed: number, cls: string, folkCls: string, flag: string): string {
  const r = rng(seed);
  const tents = Array.from({ length: 9 }, (_, i) => {
    const t = i / 8;
    return campTent(x0 + (x1 - x0) * t + (r() - 0.5) * 6, y0 + (y1 - y0) * t - 8 - r() * 6, 0.8 + r() * 0.5, cls);
  }).join('');
  const spears = Array.from({ length: 14 }, (_, i) => {
    const t = i / 13;
    const x = x0 + (x1 - x0) * t + (r() - 0.5) * 3;
    const y = y0 + (y1 - y0) * t;
    return `M${f(x + 1.2)} ${f(y - 1)} L${f(x + 1.6)} ${f(y - 13 - r() * 3)}`;
  }).join(' ');
  const fx = x0 + (x1 - x0) * 0.3;
  const fy = y0 + (y1 - y0) * 0.3 - 18;
  return `${tents}
    ${folk(x0, y0, x1, y1, 14, 1.25, seed + 1, folkCls)}
    <path class="dv-spears" d="${spears}"/>
    <path class="${cls}" d="M${f(fx)} ${f(fy + 18)} L${f(fx)} ${f(fy - 10)} L${f(fx + 1.4)} ${f(fy - 10)} L${f(fx + 1.4)} ${f(fy + 18)} Z"/>
    <path class="dv-flag ${flag}" d="M${f(fx + 1.4)} ${f(fy - 10)} C${f(fx + 6)} ${f(fy - 12)} ${f(fx + 10)} ${f(fy - 7)} ${f(fx + 15)} ${f(fy - 9)} L${f(fx + 14)} ${f(fy - 2)} C${f(fx + 9)} ${f(fy)} ${f(fx + 6)} ${f(fy - 5)} ${f(fx + 1.4)} ${f(fy - 3)} Z"/>`;
}

// ── 베들레헴 성읍 어귀 ─────────────────────────────
function bethlehemArt(): string {
  const r = rng(9601);
  return `<g class="dv dv--bethlehem">
    ${ridge([[-W * 2, 150], [-140, 140], [-20, 148], [90, 136], [210, 146], [330, 132], [470, 146], [W * 3, 140]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 222 C-80 216 40 206 110 186 C150 174 170 150 210 146 C250 142 280 168 320 184 C380 206 470 214 ${W * 3} 218 L${W * 3} ${H} Z"/>
    ${town(214, 120, 1.5, 9602, 13)}
    <!-- 성벽과 성문 -->
    <path class="bd-mid dv-wall" d="M120 186 L130 168 L298 168 L310 188 Z"/>
    <path class="dv-stones" d="M130 174 H298 M126 180 H304 M150 168 V174 M180 168 V174 M250 168 V174 M280 168 V174"/>
    <g class="bd-mid"><rect x="196" y="146" width="40" height="40"/><rect x="192" y="142" width="48" height="6"/><rect x="194" y="136" width="8" height="7"/><rect x="230" y="136" width="8" height="7"/></g>
    <path class="dv-gate" d="M206 186 L206 166 C206 158 226 158 226 166 L226 186 Z"/>
    <circle class="bd-halo dv-gatehalo" cx="216" cy="172" r="30"/>
    <!-- 성문 앞의 장로들 (작게, 떨며) -->
    ${folk(194, 196, 240, 197, 7, 1.7, 9603, 'js-folk dv-elders')}
    <!-- 오르는 길 -->
    <path class="dv-road" d="M150 ${H} C160 240 196 232 204 222 C212 212 198 206 212 196"/>
    ${olive(70, 222, 1.4, 9604)}${olive(112, 212, 1, 9605)}${olive(318, 206, 1.1, 9606)}${olive(352, 214, 1.3, 9607)}
    ${Array.from({ length: 4 }, (_, i) => olive(-40 + i * 160 + r() * 30, 254, 1.7, 9610 + i, 'bd-near')).join('')}
    ${ground(250)}
  </g>`;
}

// ── 이새의 집 마당 ──────────────────────────────
function yardArt(): string {
  return `<g class="dv dv--yard">
    ${ridge([[-W * 2, 140], [-100, 132], [40, 140], [170, 126], [300, 138], [420, 126], [W * 3, 134]], 'bd-far')}
    ${town(330, 112, 1.1, 9621, 9, 'bd-far')}
    <!-- 집 앞면: 돌벽, 문, 지붕 난간, 지붕으로 오르는 사다리 -->
    <g class="bd-mid">
      <rect x="150" y="134" width="190" height="112"/>
      <rect x="146" y="128" width="198" height="7"/>
      <rect x="146" y="120" width="5" height="9"/><rect x="190" y="120" width="5" height="9"/><rect x="240" y="120" width="5" height="9"/><rect x="290" y="120" width="5" height="9"/><rect x="339" y="120" width="5" height="9"/>
      <rect x="146" y="118" width="198" height="3"/>
    </g>
    <path class="dv-stones" d="M150 158 H340 M150 184 H340 M150 210 H340 M180 134 V158 M290 134 V158 M170 158 V184 M320 158 V184 M196 184 V210 M300 184 V210"/>
    <path class="dv-door" d="M236 246 L236 186 C236 176 262 176 262 186 L262 246 Z"/>
    <rect class="dv-window" style="--d:1s" x="300" y="164" width="7" height="9"/>
    <g class="dv-ladder"><path d="M160 246 L172 128 M172 246 L184 128" fill="none" stroke-width="2"/><path d="M162 226 H174 M164 206 H176 M166 186 H178 M168 166 H180 M170 146 H182" fill="none" stroke-width="1.6"/></g>
    <!-- 마당의 낮은 돌담 -->
    <path class="bd-mid" d="M${-W * 2} 246 L${-W * 2} 226 L150 228 L150 246 Z M340 228 L${W * 3} 224 L${W * 3} 246 Z"/>
    <!-- 작은 돌 단과 제사 연기 (16:5) -->
    <g class="bd-mid"><rect x="96" y="214" width="34" height="22"/><rect x="92" y="210" width="42" height="5"/></g>
    <ellipse class="dv-ember" cx="113" cy="209" rx="12" ry="2.2"/>
    ${smoke(113, 202, 9622, 6)}
    <!-- 큰 항아리 -->
    <path class="bd-mid" d="M352 246 C344 236 344 222 350 214 L350 208 L362 208 L362 214 C368 222 368 236 360 246 Z"/>
    ${olive(40, 228, 2.2, 9623)}${olive(390, 230, 1.8, 9624)}
    ${ground(248)}
  </g>`;
}

// ── 베들레헴 들, 양 떼 ───────────────────────────
function fieldArt(): string {
  const r = rng(9641);
  const flock: string[] = [];
  const spots: [number, number, number][] = [
    [128, 214, 1.1], [150, 220, 1.2], [172, 213, 1], [246, 216, 1.15], [268, 222, 1.25], [292, 214, 1], [314, 220, 1.1],
    [196, 206, 0.8], [222, 204, 0.75], [92, 222, 1.2], [350, 226, 1.3], [-40, 224, 1.2], [440, 224, 1.2], [62, 214, 0.9],
  ];
  spots.forEach(([x, y, s], i) => flock.push(ewe(x, y, s, r() < 0.45, i % 3 !== 1, r() * 6)));
  return `<g class="dv dv--field">
    ${ridge([[-W * 2, 152], [-120, 142], [10, 150], [120, 134], [240, 148], [360, 136], [W * 3, 146]], 'bd-far')}
    ${town(120, 116, 0.9, 9642, 9, 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 214 C-60 206 40 192 140 196 C220 200 260 186 330 190 C400 194 500 204 ${W * 3} 208 L${W * 3} ${H} Z"/>
    ${tree(318, 196, 70, 'bd-mid', 9643, { sway: true, lean: -0.1 })}
    ${flock.join('')}
    ${tree(-30, 256, 150, 'bd-near', 9644, { sway: true, lean: 0.2 })}${tree(440, 256, 150, 'bd-near', 9645, { sway: true, lean: -0.2 })}
    ${ground(250)}
  </g>`;
}

// ── 사울의 궁 안 ───────────────────────────────
function courtArt(calm: boolean): string {
  const r = rng(9661);
  const gloom = calm ? '' : `<g class="dv-gloom">${Array.from({ length: 9 }, (_, i) =>
    `<ellipse style="--d:${f(i * 0.9 + r())}s" cx="${f(170 + r() * 60)}" cy="${f(96 + r() * 70)}" rx="${f(24 + r() * 26)}" ry="${f(14 + r() * 14)}"/>`).join('')}</g>`;
  const brazier = (x: number) => `<g class="bd-mid"><path d="M${x - 12} 218 L${x + 12} 218 L${x + 8} 228 L${x - 8} 228 Z"/><path d="M${x - 2} 228 L${x - 8} 246 M${x + 2} 228 L${x + 8} 246" stroke="currentColor" stroke-width="2.2"/></g>
    <ellipse class="dv-ember" cx="${x}" cy="217" rx="10" ry="2"/>
    <g class="dv-fire"><path style="--d:${f(r())}s" d="M${x - 5} 217 C${x - 6} 210 ${x - 2} 206 ${x} 199 C${x + 3} 206 ${x + 6} 210 ${x + 5} 217 Z"/></g>
    <circle class="bd-halo dv-firehalo" cx="${x}" cy="208" r="${calm ? 46 : 26}"/>`;
  return `<g class="dv dv--court${calm ? ' dv--calm' : ''}">
    <rect class="dv-hall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <path class="dv-stones" d="M-60 60 H460 M-60 110 H460 M-60 160 H460 M-60 210 H460 M40 60 V110 M140 60 V110 M260 60 V110 M360 60 V110 M90 110 V160 M200 110 V160 M310 110 V160 M40 160 V210 M150 160 V210 M250 160 V210 M360 160 V210"/>
    <!-- 높은 창 하나: 바깥의 빛 -->
    <rect class="dv-slit" x="196" y="40" width="10" height="44" rx="5"/>
    <!-- 두 기둥 -->
    <g class="bd-mid"><rect x="96" y="30" width="20" height="216"/><rect x="90" y="24" width="32" height="8"/><rect x="90" y="240" width="32" height="8"/>
      <rect x="286" y="30" width="20" height="216"/><rect x="280" y="24" width="32" height="8"/><rect x="280" y="240" width="32" height="8"/></g>
    <!-- 높은 등받이 자리와 벽에 기댄 창 (삼상 18:10) -->
    <g class="bd-mid"><path d="M180 248 L180 206 L172 206 L172 150 C172 140 186 136 201 136 C216 136 230 140 230 150 L230 206 L222 206 L222 248 Z"/><rect x="168" y="204" width="66" height="6"/></g>
    <path class="bd-mid" d="M246 248 L250 70 L253 70 L250 248 Z"/><path class="dv-spearhead" d="M251.5 52 C255 60 255 68 253.4 72 L249.6 72 C248 68 248 60 251.5 52 Z"/>
    ${gloom}
    ${brazier(56)}${brazier(346)}
    ${ground(250)}
  </g>`;
}

// ── 엘라 골짜기 ─────────────────────────────────
function elahArt(): string {
  return `<g class="dv dv--elah">
    ${ridge([[-W * 2, 140], [-160, 128], [-20, 136], [120, 124], [280, 130], [420, 120], [W * 3, 132]], 'bd-far')}
    <!-- 저편 산 (이스라엘, 왼쪽) -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 160 C-200 150 -60 146 40 150 C100 152 120 160 150 178 C176 194 190 210 214 222 L214 ${H} Z"/>
    <!-- 이편 산 (블레셋, 오른쪽) -->
    <path class="bd-mid dv-hill-right" d="M186 ${H} L186 224 C214 212 234 196 256 178 C282 158 310 150 360 150 C460 150 560 156 ${W * 3} 162 L${W * 3} ${H} Z"/>
    ${camp(-60, 158, 136, 178, 9681, 'bd-mid dv-tent-il', 'js-folk dv-ranks', 'dv-flag--il')}
    ${camp(262, 178, 450, 156, 9684, 'bd-mid dv-tent-ph', 'js-folk dv-ranks dv-ranks--ph', 'dv-flag--ph')}
    <!-- 골짜기 바닥과 시내 (17:40) -->
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 236 C-60 232 120 226 200 228 C280 226 460 232 ${W * 3} 236 L${W * 3} ${H} Z"/>
    <path class="dv-brook" d="M150 ${H} C170 250 214 244 206 236 C200 230 214 226 204 222"/>
    ${ground(252)}
  </g>`;
}

// ── 시냇가의 돌 ────────────────────────────────
function brookArt(): string {
  const r = rng(9701);
  const pebbles = Array.from({ length: 34 }, () => {
    const x = -40 + r() * 480;
    const y = 222 + r() * 16;
    return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(2.4 + r() * 4)}" ry="${f(1.4 + r() * 2)}"/>`;
  }).join('');
  // 다섯 개: 가운데 물가에 하나씩 빛난다
  const five = [[176, 236], [192, 240], [206, 235], [222, 241], [238, 237]].map(([x, y], i) =>
    `<ellipse class="dv-five" style="--i:${i}" cx="${x}" cy="${y}" rx="4.6" ry="2.8"/>`).join('');
  const ripples = Array.from({ length: 7 }, (_, i) =>
    `<path class="dv-ripple" style="--d:${f(i * 0.7)}s" d="M${f(40 + i * 50)} ${f(228 + (i % 3) * 3)} q8 -2 16 0"/>`).join('');
  return `<g class="dv dv--brook">
    ${ridge([[-W * 2, 136], [-120, 126], [20, 134], [140, 120], [260, 132], [380, 118], [W * 3, 128]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 168 C-100 160 40 170 120 196 C150 206 170 214 200 216 C230 214 252 206 282 196 C360 170 480 160 ${W * 3} 168 L${W * 3} ${H} Z"/>
    ${folk(30, 176, 120, 196, 9, 1, 9702, 'js-folk dv-ranks')}${folk(286, 196, 380, 172, 9, 1, 9703, 'js-folk dv-ranks dv-ranks--ph')}
    <path class="dv-water" d="M${-W * 2} 222 C-40 220 120 224 200 221 C300 218 460 224 ${W * 3} 222 L${W * 3} 244 C460 246 300 242 200 245 C120 247 -40 243 ${-W * 2} 246 Z"/>
    ${ripples}
    <g class="dv-pebbles">${pebbles}</g>
    ${ground(250)}
    ${five}
  </g>`;
}

export function davidArt(art: DavidArt): string {
  switch (art) {
    case 'dv-bethlehem': return bethlehemArt();
    case 'dv-yard': return yardArt();
    case 'dv-field': return fieldArt();
    case 'dv-court': return courtArt(false);
    case 'dv-court-calm': return courtArt(true);
    case 'dv-elah': return elahArt();
    case 'dv-brook': return brookArt();
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
  if (!a || !a.width) return { el, x: b.width / 2, top: b.height * 0.4, h: b.height * 0.5, w: 80 };
  return { el, x: a.left - b.left + a.width / 2, top: a.top - b.top, h: a.height, w: a.width };
}

/** lyre: 수금 소리 (삼상 16:23) — 금빛 소리 결이 퍼지고, 배경의 어두운 기운(dv-gloom)이 걷힌다 */
export function playLyre(scene: HTMLElement, rm: boolean): void {
  const d = actorBox(scene, 'david', 'center');
  const waves = rm ? '' : Array.from({ length: 6 }, (_, i) => `<i class="fx-lyre__wave" style="--i:${i}"></i>`).join('');
  const notes = rm ? '' : Array.from({ length: 12 }, (_, i) =>
    `<b class="fx-lyre__mote" style="--i:${i}; --o:${f((((i * 37) % 11) - 5) * 9)}px"></b>`).join('');
  layerOf(scene, `fx-lyre${rm ? ' is-rm' : ''}`,
    `<div class="fx-lyre__at" style="--x:${f(d.x)}px; --y:${f(d.top + d.h * 0.3)}px">${waves}${notes}<span class="fx-lyre__glow"></span></div>`,
    rm ? 2400 : 7600, 1600);
  scene.querySelectorAll('.dv-gloom').forEach((g) => g.classList.add('is-lifted'));
}

/** sling: 물매 (삼상 17:49) — 끈이 세 번 돌고 돌 하나가 상대 쪽으로 날아간다. 닿는 순간은 그리지 않는다 */
export function playSling(scene: HTMLElement, rm: boolean): void {
  const from = actorBox(scene, 'david', 'left');
  const to = actorBox(scene, 'goliath', 'right');
  const sx = from.x;
  const sy = from.top + from.h * 0.02;
  const tx = to.x;
  const ty = to.top + to.h * 0.08;
  // 날아가는 돌: 시작점에서 거의 다 가서 (88%) 사라진다
  const dx = (tx - sx) * 0.88;
  const dy = (ty - sy) * 0.88;
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  layerOf(scene, `fx-sling${rm ? ' is-rm' : ''}`,
    `<div class="fx-sling__at" style="--x:${f(sx)}px; --y:${f(sy)}px; --dx:${f(dx)}px; --dy:${f(dy)}px; --ang:${f(ang)}deg; --len:${f(Math.hypot(dx, dy))}px">
      <i class="fx-sling__whirl"></i>
      <b class="fx-sling__streak"></b>
      <b class="fx-sling__stone"></b>
    </div>`,
    rm ? 1600 : 3600, 600);
}

/** topple: 큰 몸이 앞으로 쓰러진다 (삼상 17:49 "땅에 엎드러지니라") — 실루엣만 */
export function playTopple(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const t = actorBox(scene, who ?? 'goliath', 'right');
  const el = t.el;
  const body = el?.querySelector<SVGGElement>('.actor__body');
  if (el && body) {
    // 그림 안 좌표(viewBox 200×420)에서 앞발 끝을 축으로 앞으로 돈다. face()로 뒤집혀 있어도 그림 안에서 돌리므로 늘 "앞"이다
    body.style.transformBox = 'view-box';
    body.style.transformOrigin = '150px 409px';
    body.style.transition = rm ? 'transform 0.3s, filter 0.3s' : 'transform 2.2s cubic-bezier(0.5, 0, 0.9, 0.6), filter 2.6s ease-in';
    void body.getBoundingClientRect();
    body.style.transform = 'rotate(84deg)';
    el.style.transition = 'filter 2.6s ease-in';
    el.style.filter = 'brightness(0.32)';
  }
  if (rm) return;
  setTimeout(() => {
    scene.classList.remove('dv-quake');
    void scene.offsetWidth;
    scene.classList.add('dv-quake');
    const b = scene.getBoundingClientRect();
    const dir = el && el.querySelector<SVGElement>('.actor__art')?.style.transform.includes('-1') ? -1 : 1;
    layerOf(scene, 'fx-topple',
      `<div class="fx-topple__at" style="--x:${f(t.x + dir * t.h * 0.35)}px; --y:${f(t.top + t.h)}px">${Array.from({ length: 10 }, (_, i) =>
        `<i style="--i:${i}; --o:${f((i - 4.5) * Math.min(b.width, 600) * 0.03)}px"></i>`).join('')}</div>`,
      3200, 1400);
  }, 1900);
  setTimeout(() => scene.classList.remove('dv-quake'), 3000);
}
