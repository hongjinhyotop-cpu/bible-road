// 7막 A급 — 성전 봉헌 (왕상 8 「이 집을 향하여」) · 솔로몬의 타락 (왕상 11 「마음이 돌아서다」)의 전용 배경과 효과.
// 같은 종이 오려낸 그림자극 말투. 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - tp-court       : 성전 뜰에서 본 성전 정면. 가운데 높은 집과 앞의 낭실(현관), 열린 큰 문 안의 금빛, 문 앞 놋 기둥 둘
//                     (기둥머리 백합·석류 사슬, 7:15-22), 세 겹 다듬은 돌 담(6:36), 왼쪽 앞 놋 번제단과 연기, 오른쪽 앞
//                     열두 소 위의 놋 바다(7:23-25), 계단. 군중은 crowd 동작으로
//  - tp-court-cloud : 같은 곳, 구름이 여호와의 전에 가득함 (8:10-11). 지붕 위와 문에서 금빛 구름이 넘쳐 뜰까지 흘러나옴
//  - tp-holy        : 지성소 안 (6:19-28). 금으로 입힌 벽의 그룹·종려·핀 꽃 새김, 감람목 그룹 둘이 날개를 펴서 바깥 날개는
//                     벽에, 안쪽 날개는 가운데서 서로 닿음. 창 없음 (8:12 "캄캄한데"). 궤 자리는 비어 있음
//  - tp-holy-ark    : 같은 곳, 그룹들의 날개 아래 놓인 궤와 긴 채 (8:6-8). 궤 위로 은은한 빛
//  - tp-heights     : 예루살렘 앞 산(감람산 쪽) 비탈에서 본 풍경. 왼쪽 건너편 언덕 위 성과 성전(금빛, 두 기둥), 사이의 골짜기,
//                     이쪽 산마루에 선 산당 셋 — 돌단·주상·목상 장대, 각각 연기 기둥 (11:7-8). 성전과 산당이 한 화면에
// 효과:
//  - cloud-glory : 구름이 전에 가득함 (8:10-11). 성전 문(.tp-door)에서 금빛 구름 덩이가 차례로 부풀어 나와 무대를 덮고,
//                  화면 전체가 금빛으로 차올랐다 천천히 가라앉는다 (약 9초, 탭하면 빨리 감김). 기존 glory보다 훨씬 크다.
//                  제사장들이 물러나는 것은 같은 beat의 step-back 동작으로
//  - prayers     : 이곳을 향하여 기도하거든 (8:30-50). 무대 사방 끝에서 일곱 줄기 빛이 차례로 그어져 성전(.tp-door, 없으면
//                  .tp-templefar, 없으면 가운데)으로 모이고, 끝마다 작은 이름(다툼 · 패전 · 가뭄 · 기근 · 이방인 · 전쟁 · 포로)이
//                  떠올랐다 스러진다. 다 모이면 성전 자리에서 고리 하나가 퍼진다 (약 9초)
//  - tear-twelve : 새 옷을 열두 조각으로 (11:30-31). 찢는 사람(who, 없으면 ahijah)의 가슴 앞에 새 겉옷이 떠오르고, 금이 가며
//                  열두 조각으로 갈라져, 열 조각은 받는 사람(to, 없으면 jeroboam) 쪽으로 날아가 모이고 두 조각은 남는다 (약 8초)
// 하나님은 그리지 않는다 (빛, 구름, 목소리로만).
import { H, W, rng, smoke } from './backdrop';
import { ground, ridge, stars } from './joshua';

export type TempleArt = 'tp-court' | 'tp-court-cloud' | 'tp-holy' | 'tp-holy-ark' | 'tp-heights';

const f = (n: number) => n.toFixed(1);

// ── 작은 조각들 ─────────────────────────────────
/** 놋 기둥 하나: 기둥몸, 기둥머리(대접 모양 + 백합), 석류 두 줄 (왕상 7:15-22) */
function pillar(x: number, top: number, base: number, w: number): string {
  const capH = 14;
  const pom = Array.from({ length: 7 }, (_, i) => {
    const t = i / 6;
    return `<circle cx="${f(x - w * 0.9 + t * w * 1.8)}" cy="${f(top + capH - 1 + Math.sin(t * Math.PI) * 2.2)}" r="1.2"/>`;
  }).join('');
  return `<g class="tp-pillar">
    <rect class="tp-bronze" x="${f(x - w / 2)}" y="${f(top + capH)}" width="${f(w)}" height="${f(base - top - capH)}"/>
    <path class="tp-bronze" d="M${f(x - w * 0.95)} ${f(top + capH)} C${f(x - w * 1.25)} ${f(top + 6)} ${f(x - w * 0.9)} ${f(top + 2)} ${f(x - w * 0.6)} ${f(top + 2)} L${f(x + w * 0.6)} ${f(top + 2)} C${f(x + w * 0.9)} ${f(top + 2)} ${f(x + w * 1.25)} ${f(top + 6)} ${f(x + w * 0.95)} ${f(top + capH)} Z"/>
    <path class="tp-bronze tp-lily" d="M${f(x - w * 0.6)} ${f(top + 2)} C${f(x - w * 0.8)} ${f(top - 4)} ${f(x - w * 0.3)} ${f(top - 3)} ${f(x)} ${f(top - 7)} C${f(x + w * 0.3)} ${f(top - 3)} ${f(x + w * 0.8)} ${f(top - 4)} ${f(x + w * 0.6)} ${f(top + 2)} Z"/>
    <g class="tp-pom">${pom}</g>
    <path class="tp-net" d="M${f(x - w * 0.9)} ${f(top + 6)} L${f(x + w * 0.9)} ${f(top + 6)} M${f(x - w * 0.9)} ${f(top + 9)} L${f(x + w * 0.9)} ${f(top + 9)}"/>
    <rect class="tp-bronze" x="${f(x - w * 0.8)}" y="${f(base - 4)}" width="${f(w * 1.6)}" height="4"/>
  </g>`;
}

/** 놋 바다: 열두 소 위의 큰 대접 (7:23-25). 앞에서 보이는 소 여섯 */
function brazenSea(x: number, base: number): string {
  const oxen = Array.from({ length: 6 }, (_, i) => {
    const ox = x - 22 + i * 8.8;
    const dir = i < 3 ? -1 : 1;
    return `<g transform="translate(${f(ox)} ${f(base)}) scale(${dir} 1)">
      <path d="M-4 0 L-4 -6 C-4 -9 -1 -10 2 -10 L5 -10 C7 -10 8 -12 8 -9 L8 -6 L6 -6 L6 0 L4 0 L4 -5 L-2 -5 L-2 0 Z"/>
      <path class="tp-horn" d="M7 -11 l1.4 -2.2 M8.6 -10.4 l2 -1.4"/>
    </g>`;
  }).join('');
  return `<g class="tp-sea">
    <g class="tp-bronze">${oxen}</g>
    <path class="tp-bronze" d="M${f(x - 30)} ${f(base - 14)} C${f(x - 28)} ${f(base - 2)} ${f(x + 28)} ${f(base - 2)} ${f(x + 30)} ${f(base - 14)} Z"/>
    <path class="tp-bronze" d="M${f(x - 32)} ${f(base - 16)} L${f(x + 32)} ${f(base - 16)} L${f(x + 30)} ${f(base - 13)} L${f(x - 30)} ${f(base - 13)} Z"/>
    <path class="tp-lilyrim" d="${Array.from({ length: 9 }, (_, i) => `M${f(x - 28 + i * 7)} ${f(base - 16)} q1.6 -2.2 3.2 0`).join(' ')}"/>
    <path class="tp-water" d="M${f(x - 28)} ${f(base - 15.4)} Q${f(x)} ${f(base - 16.6)} ${f(x + 28)} ${f(base - 15.4)}"/>
  </g>`;
}

/** 놋 번제단: 네 뿔, 위의 불과 연기 */
function bronzeAltar(x: number, base: number, seed: number): string {
  return `<g class="tp-altar">
    <rect class="tp-bronze" x="${f(x - 24)}" y="${f(base - 30)}" width="48" height="30"/>
    <rect class="tp-bronze" x="${f(x - 27)}" y="${f(base - 32)}" width="54" height="4"/>
    <path class="tp-bronze" d="M${f(x - 27)} ${f(base - 32)} l2 -5 l2 5 M${f(x + 23)} ${f(base - 32)} l2 -5 l2 5"/>
    <path class="tp-net" d="M${f(x - 24)} ${f(base - 16)} H${f(x + 24)} M${f(x - 24)} ${f(base - 12)} H${f(x + 24)}"/>
    <ellipse class="bd-ember tp-altarfire" cx="${f(x)}" cy="${f(base - 33)}" rx="16" ry="2.6"/>
    <circle class="bd-halo" cx="${f(x)}" cy="${f(base - 36)}" r="34"/>
    ${smoke(x, base - 40, seed, 6)}
  </g>`;
}

/** 세 켜 다듬은 돌과 백향목 한 켜의 안뜰 담 (6:36) */
function courtWall(x0: number, x1: number, top: number, base: number): string {
  const rows = [0.25, 0.5, 0.75].map((t) => `M${x0} ${f(top + (base - top) * t)} H${x1}`).join(' ');
  return `<g><rect class="bd-mid tp-wall" x="${x0}" y="${top}" width="${x1 - x0}" height="${base - top}"/>
    <rect class="tp-cedar" x="${x0}" y="${top}" width="${x1 - x0}" height="3"/>
    <path class="tp-courses" d="${rows}"/></g>`;
}

// ── 성전 뜰 (8:1-11, 22, 54-66) ───────────────────
function courtArt(cloud: boolean): string {
  const r = rng(8801);
  // 옆 골방 세 층의 좁은 창 (6:4-6)
  const wins = [118, 128, 272, 282].flatMap((x) => [160, 184, 206].map((y) => `<rect x="${x}" y="${y}" width="3" height="8"/>`)).join('');
  const puffs = cloud
    ? Array.from({ length: 22 }, (_, i) => {
      const a = (i / 22) * Math.PI;
      const d = 30 + r() * 70;
      const cx = 200 + Math.cos(a) * d * 1.6 * (i % 2 ? 1 : -1) * 0.7;
      const cy = 120 - Math.sin(a) * d * 0.6 + r() * 30;
      return `<ellipse style="--d:${f(r() * 6)}s" cx="${f(cx)}" cy="${f(cy)}" rx="${f(26 + r() * 30)}" ry="${f(12 + r() * 12)}"/>`;
    }).join('')
    : '';
  const spill = cloud
    ? Array.from({ length: 12 }, (_, i) => `<ellipse style="--d:${f(i * 0.5)}s" cx="${f(200 + (r() - 0.5) * 240)}" cy="${f(222 + r() * 20)}" rx="${f(30 + r() * 36)}" ry="${f(6 + r() * 6)}"/>`).join('')
    : '';
  return `<g class="tp tp--court${cloud ? ' is-cloud' : ''}">
    ${ridge([[-W * 2, 150], [-60, 140], [60, 148], [180, 134], [300, 146], [440, 138], [W * 3, 146]], 'bd-far')}
    <!-- 안뜰 담 -->
    ${courtWall(-W * 2, 112, 190, 226)}${courtWall(288, W * 3, 190, 226)}
    <!-- 옆 골방 세 층 (6:5) -->
    <rect class="bd-mid tp-stone" x="106" y="150" width="188" height="76"/>
    <path class="tp-courses" d="M106 174 H294 M106 198 H294"/>
    <g class="tp-slits">${wins}</g>
    <!-- 본채: 높은 집 -->
    <rect class="bd-mid tp-stone" x="138" y="86" width="124" height="140"/>
    <rect class="tp-goldband" x="136" y="84" width="128" height="4"/>
    <!-- 낭실 (현관) -->
    <rect class="tp-porch" x="150" y="100" width="100" height="126"/>
    <rect class="tp-goldband" x="148" y="98" width="104" height="4"/>
    <path class="tp-goldline" d="M150 112 H250 M156 104 V226 M244 104 V226"/>
    <!-- 열린 큰 문과 그 안의 금빛 -->
    <circle class="bd-halo tp-doorhalo" cx="200" cy="186" r="${cloud ? 120 : 60}"/>
    <rect class="tp-door" x="181" y="142" width="38" height="84"/>
    <path class="tp-doorleaf" d="M181 142 L172 146 L172 226 L181 226 Z M219 142 L228 146 L228 226 L219 226 Z"/>
    <rect class="tp-goldband" x="178" y="138" width="44" height="4"/>
    <!-- 놋 기둥 둘 (7:21 야긴과 보아스) -->
    ${pillar(164, 112, 226, 9)}${pillar(236, 112, 226, 9)}
    <!-- 계단 -->
    <g class="bd-mid tp-steps">${Array.from({ length: 3 }, (_, i) => `<rect x="${140 - i * 12}" y="${226 + i * 4}" width="${120 + i * 24}" height="4"/>`).join('')}</g>
    <!-- 뜰: 왼쪽 놋 번제단, 오른쪽 놋 바다 -->
    ${bronzeAltar(84, 240, 8802)}
    ${brazenSea(318, 240)}
    ${cloud ? `<g class="tp-cloudmass">${puffs}</g><g class="tp-cloudspill">${spill}</g>` : ''}
    ${ground(244)}
  </g>`;
}

// ── 지성소 (6:19-28, 8:6-9) ───────────────────────
/** 감람목 그룹 하나 (금을 입힘). dir = 1이면 오른쪽(가운데)을 향함. 바깥 날개는 벽까지, 안쪽 날개는 가운데까지 */
function cherub(x: number, dir: 1 | -1): string {
  const s = dir;
  const inner = 200; // 안쪽 날개 끝이 닿는 곳
  const outer = x - s * 128; // 바깥 날개 끝 (벽)
  // 십 규빗 높이 (6:23) — 무대 위 사람보다 훨씬 크다. 머리와 날개는 사람 머리 위로
  const feathers = (x0: number, x1: number, y0: number, y1: number) =>
    Array.from({ length: 7 }, (_, i) => {
      const t = (i + 1) / 8;
      const fx = x0 + (x1 - x0) * t;
      const fy = y0 + (y1 - y0) * t;
      return `M${f(fx)} ${f(fy + 4)} q${f((x1 - x0) * 0.03)} 9 ${f((x1 - x0) * 0.06)} 18`;
    }).join(' ');
  return `<g class="tp-cherub">
    <!-- 바깥 날개: 어깨에서 위로 솟았다가 벽까지 -->
    <path class="tp-wing" d="M${f(x - s * 6)} 84 C${f(x - s * 30)} 40 ${f(outer + s * 50)} 30 ${f(outer)} 40 L${f(outer)} 58 C${f(outer + s * 40)} 56 ${f(x - s * 34)} 74 ${f(x - s * 10)} 112 Z"/>
    <!-- 안쪽 날개: 가운데까지, 궤 위를 덮음 -->
    <path class="tp-wing" d="M${f(x + s * 6)} 84 C${f(x + s * 26)} 42 ${f(inner - s * 26)} 36 ${f(inner)} 44 L${f(inner)} 60 C${f(inner - s * 26)} 58 ${f(x + s * 30)} 76 ${f(x + s * 10)} 112 Z"/>
    <path class="tp-feather" d="${feathers(x - s * 12, outer + s * 8, 50, 44)} ${feathers(x + s * 12, inner - s * 6, 50, 46)}"/>
    <!-- 몸 -->
    <path d="M${f(x - 16)} 236 C${f(x - 18)} 190 ${f(x - 12)} 130 ${f(x - 11)} 92 C${f(x - 10)} 80 ${f(x + 10)} 80 ${f(x + 11)} 92 C${f(x + 12)} 130 ${f(x + 18)} 190 ${f(x + 16)} 236 Z"/>
    <!-- 머리: 가운데를 향해 조금 숙임 -->
    <ellipse cx="${f(x + s * 3)}" cy="72" rx="8" ry="9.5"/>
    <path class="tp-feather" d="M${f(x - 10)} 120 Q${f(x)} 125 ${f(x + 10)} 120 M${f(x - 12)} 160 Q${f(x)} 165 ${f(x + 12)} 160 M${f(x - 14)} 200 Q${f(x)} 205 ${f(x + 14)} 200"/>
  </g>`;
}

function holyArt(ark: boolean): string {
  const r = rng(8901);
  // 벽의 새김: 그룹·종려·핀 꽃 (6:29) — 흐린 금선
  const carve = Array.from({ length: 16 }, (_, i) => {
    const x = -40 + i * 32;
    return i % 2
      ? `<path d="M${x} 176 L${x} 152 M${x} 156 q-6 -4 -9 -2 M${x} 156 q6 -4 9 -2 M${x} 162 q-6 -3 -8 0 M${x} 162 q6 -3 8 0"/>`
      : `<circle cx="${x}" cy="164" r="5"/><circle cx="${x}" cy="164" r="2"/>`;
  }).join('');
  const motes = Array.from({ length: 14 }, () =>
    `<circle style="--d:${f(r() * 8)}s; --dx:${f((r() - 0.5) * 20)}px" cx="${f(150 + r() * 100)}" cy="${f(150 + r() * 60)}" r="${f(0.5 + r() * 0.9)}"/>`).join('');
  return `<g class="tp tp--holy${ark ? ' has-ark' : ''}">
    <rect class="tp-goldwall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <rect class="tp-cedar" x="${-W * 2}" y="38" width="${W * 5}" height="4"/>
    <g class="tp-carve">${carve}</g>
    <path class="tp-panel" d="${Array.from({ length: 14 }, (_, i) => `M${-60 + i * 40} 84 V230`).join(' ')}"/>
    <circle class="bd-halo tp-arkhalo" cx="200" cy="196" r="${ark ? 110 : 60}"/>
    ${cherub(130, 1)}${cherub(270, -1)}
    ${ark ? `<!-- 궤와 긴 채 (8:6-8) -->
    <g class="tp-ark">
      <rect class="tp-pole" x="96" y="214" width="208" height="2.6" rx="1.3"/>
      <rect x="178" y="200" width="44" height="24"/>
      <rect class="tp-lid" x="175" y="196" width="50" height="5"/>
      <path d="M180 196 C180 186 186 182 192 184 L198 196 Z M220 196 C220 186 214 182 208 184 L202 196 Z"/>
      <path class="tp-goldline" d="M178 206 H222 M178 218 H222"/>
      <rect x="180" y="224" width="4" height="6"/><rect x="216" y="224" width="4" height="6"/>
    </g>` : `<ellipse class="tp-place" cx="200" cy="228" rx="34" ry="3"/>`}
    <g class="tp-motes">${motes}</g>
    <rect class="tp-floor" x="${-W * 2}" y="230" width="${W * 5}" height="${H - 230}"/>
    <path class="tp-floorline" d="${Array.from({ length: 12 }, (_, i) => `M${-40 + i * 44} 230 L${-120 + i * 60} ${H}`).join(' ')}"/>
  </g>`;
}

// ── 예루살렘 앞 산의 산당들 (11:7-8) ──────────────
/** 산당 하나: 돌단 + 주상 + 목상 장대 + 높이 오르는 연기 기둥 */
function highPlace(x: number, base: number, s: number, seed: number): string {
  const r = rng(seed);
  const top = 18 + r() * 14;
  const sway = (r() - 0.5) * 30;
  return `<g class="tp-high">
    <path class="tp-column" style="--d:${f(r() * 4)}s" d="M${f(x - 3 * s)} ${f(base - 12 * s)} C${f(x - 8 * s)} ${f(base - 50)} ${f(x + sway)} ${f(base - 80)} ${f(x + sway * 1.6 - 10)} ${f(top)} L${f(x + sway * 1.6 + 10)} ${f(top)} C${f(x + sway + 12)} ${f(base - 80)} ${f(x + 8 * s)} ${f(base - 50)} ${f(x + 3 * s)} ${f(base - 12 * s)} Z"/>
    <g class="bd-near">
      <rect x="${f(x - 12 * s)}" y="${f(base - 9 * s)}" width="${f(24 * s)}" height="${f(9 * s)}"/>
      <rect x="${f(x - 14 * s)}" y="${f(base - 11 * s)}" width="${f(28 * s)}" height="${f(3 * s)}"/>
      <path d="M${f(x + 16 * s)} ${f(base)} L${f(x + 16 * s)} ${f(base - 22 * s)} Q${f(x + 19 * s)} ${f(base - 26 * s)} ${f(x + 22 * s)} ${f(base - 22 * s)} L${f(x + 22 * s)} ${f(base)} Z"/>
      <rect x="${f(x - 20 * s)}" y="${f(base - 30 * s)}" width="${f(1.8 * s)}" height="${f(30 * s)}"/>
      <path d="M${f(x - 19 * s)} ${f(base - 30 * s)} l-4 6 M${f(x - 19 * s)} ${f(base - 27 * s)} l4 5"/>
    </g>
    <ellipse class="bd-ember tp-hpfire" cx="${f(x)}" cy="${f(base - 11.6 * s)}" rx="${f(9 * s)}" ry="${f(1.6 * s)}"/>
    <circle class="bd-halo tp-hphalo" cx="${f(x)}" cy="${f(base - 14 * s)}" r="${f(26 * s)}"/>
    <g class="tp-hpsmoke">${smoke(x, base - 16 * s, seed, 5)}</g>
  </g>`;
}

function heightsArt(): string {
  // 건너편 언덕(시온·모리아)의 집들
  const houses = Array.from({ length: 16 }, (_, i) => {
    const x = -10 + i * 12;
    const hill = 132 - Math.sin(Math.min(1, Math.max(0, (x + 10) / 170)) * Math.PI) * 26;
    const h = 7 + ((i * 5) % 6);
    return `<rect x="${x}" y="${f(hill - h + 6)}" width="10" height="${f(h + 10)}"/>`;
  }).join('');
  return `<g class="tp tp--heights">
    ${stars(30, 70, 9001)}
    ${ridge([[-W * 2, 150], [-80, 140], [40, 146], [180, 138], [300, 144], [W * 3, 140]], 'bd-far')}
    <!-- 건너편: 성과 성전 (위쪽, 사람 머리 위로 보이게) -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 150 C-60 140 40 120 110 108 C150 102 180 104 210 118 C240 132 262 150 300 168 L300 ${H} Z"/>
    <g class="bd-mid tp-city">${houses}</g>
    <path class="tp-citywall" d="M-20 150 L-20 136 ${Array.from({ length: 13 }, () => 'h8 v-4 h6 v4').join(' ')} L170 150 Z"/>
    <g class="tp-templefar">
      <circle class="bd-halo tp-farhalo" cx="152" cy="84" r="64"/>
      <rect class="tp-farstone" x="126" y="60" width="52" height="48"/>
      <rect class="tp-farstone" x="114" y="80" width="76" height="28"/>
      <rect class="tp-farporch" x="134" y="68" width="36" height="40"/>
      <rect class="tp-fargold" x="123" y="57" width="58" height="3.4"/>
      <rect class="tp-fargold" x="131" y="65" width="42" height="2.4"/>
      <rect class="tp-fardoor" x="146" y="84" width="12" height="24"/>
      <rect class="tp-bronze" x="138" y="76" width="3" height="32"/><rect class="tp-bronze" x="163" y="76" width="3" height="32"/>
      <circle class="tp-bronze" cx="139.5" cy="75" r="2.6"/><circle class="tp-bronze" cx="164.5" cy="75" r="2.6"/>
    </g>
    <!-- 사이의 골짜기 -->
    <path class="tp-valley" d="M${-W * 2} 196 C40 190 160 176 230 172 C270 170 320 184 ${W * 3} 196 L${W * 3} 210 L${-W * 2} 210 Z"/>
    <!-- 이쪽: 산마루와 산당들 — 연기 기둥이 하늘로 -->
    <path class="bd-mid tp-hill" d="M180 ${H} C200 196 230 160 262 146 C290 134 320 128 350 130 C390 132 430 140 ${W * 3} 150 L${W * 3} ${H} Z"/>
    ${highPlace(258, 150, 1.05, 9002)}${highPlace(300, 132, 1.2, 9003)}${highPlace(346, 132, 1, 9004)}
    <path class="tp-path" d="M190 ${H} C206 220 226 190 248 168 C266 152 284 142 300 134"/>
    ${ground(250)}
  </g>`;
}

export function templeArt(art: TempleArt): string {
  switch (art) {
    case 'tp-court': return courtArt(false);
    case 'tp-court-cloud': return courtArt(true);
    case 'tp-holy': return holyArt(false);
    case 'tp-holy-ark': return holyArt(true);
    case 'tp-heights': return heightsArt();
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

/** 배경 속 표지(성전 문 등)의 가운데 (scene 기준). 없으면 비율 자리 */
function markAt(scene: HTMLElement, sels: string[], fx: number, fy: number) {
  const b = scene.getBoundingClientRect();
  const last = scene.querySelector('.scene__backdrop .backdrop:last-child');
  for (const sel of sels) {
    const n = last?.querySelector(sel);
    const a = n?.getBoundingClientRect();
    if (a && (a.width || a.height)) return { x: a.left - b.left + a.width / 2, y: a.top - b.top + a.height / 2, w: b.width, h: b.height };
  }
  return { x: b.width * fx, y: b.height * fy, w: b.width, h: b.height };
}

/** 무대 위 인물의 그림 상자 (scene 기준). 없으면 fallback 쪽 사람 */
function actorBox(scene: HTMLElement, id: string | undefined, fallback: 'right' | 'left') {
  const b = scene.getBoundingClientRect();
  const actors = [...scene.querySelectorAll<HTMLElement>('.scene__stage .actor')];
  const art = (a: HTMLElement) => (a.querySelector<SVGElement>('.actor__art') ?? a).getBoundingClientRect();
  let el = id ? actors.find((a) => a.dataset.id === id) : undefined;
  if (!el && actors.length) {
    const xs = actors.map((a) => [a, art(a).left + art(a).width / 2 - b.left] as const);
    el = (fallback === 'right' ? xs.reduce((m, c) => (c[1] > m[1] ? c : m)) : xs.reduce((m, c) => (c[1] < m[1] ? c : m)))[0];
  }
  const a = el ? art(el) : null;
  if (!a || !a.width) return { x: b.width * (fallback === 'right' ? 0.72 : 0.28), top: b.height * 0.4, h: b.height * 0.5 };
  return { x: a.left - b.left + a.width / 2, top: a.top - b.top, h: a.height };
}

/** cloud-glory: 구름이 여호와의 전에 가득함 (8:10-11) */
export function playCloudGlory(scene: HTMLElement, rm: boolean): void {
  const at = markAt(scene, ['.tp-door'], 0.5, 0.6);
  const puffs = rm ? '' : Array.from({ length: 26 }, (_, i) => {
    // 문에서 나와 사방(위·옆)으로 퍼짐. 뒤에 나온 것일수록 멀리
    const a = -Math.PI * (0.05 + ((i * 37) % 26) / 26 * 0.9);
    const d = 0.25 + (i / 26) * 0.75;
    const dx = Math.cos(a) * at.w * 0.62 * d;
    const dy = Math.sin(a) * at.h * 0.55 * d + at.h * 0.12 * (i % 3) * d;
    const s = 2.4 + (i % 5) * 0.9 + d * 3;
    return `<i style="--dx:${f(dx)}px; --dy:${f(dy)}px; --s:${f(s)}; --d:${f(0.4 + i * 0.16)}s"></i>`;
  }).join('');
  layerOf(scene, `fx-cloudglory${rm ? ' is-rm' : ''}`,
    `<div class="fx-cloudglory__at" style="--x:${f(at.x)}px; --y:${f(at.y)}px">
      <b class="fx-cloudglory__door"></b>${puffs}
    </div>
    <b class="fx-cloudglory__fill"></b>`,
    rm ? 3600 : 11500, 2600);
}

const PRAYERS = ['다툼', '패전', '가뭄', '기근', '이방인', '전쟁', '포로'];

/** prayers: 이곳을 향하여 기도하거든 (8:30-50) — 사방에서 빛줄기가 성전으로 */
export function playPrayers(scene: HTMLElement, rm: boolean): void {
  const at = markAt(scene, ['.tp-door', '.tp-templefar'], 0.5, 0.5);
  // 무대 가장자리의 일곱 자리 (왼쪽 아래 → 위 → 오른쪽 아래)
  const spots: [number, number][] = [[0.1, 0.74], [0.09, 0.4], [0.22, 0.12], [0.5, 0.06], [0.78, 0.12], [0.91, 0.4], [0.9, 0.74]];
  const order = [0, 6, 2, 4, 1, 5, 3];
  const rays = order.map((k, i) => {
    const [px, py] = spots[k];
    const sx = at.w * px;
    const sy = at.h * py;
    const dx = at.x - sx;
    const dy = at.y - sy;
    const len = Math.hypot(dx, dy);
    const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    return `<div class="fx-prayers__ray" style="--x:${f(sx)}px; --y:${f(sy)}px; --len:${f(len)}px; --ang:${f(ang)}deg; --d:${f(rm ? 0 : 0.4 + i * 0.85)}s">
      <b></b><span style="rotate:${f(-ang)}deg">${PRAYERS[i]}</span></div>`;
  }).join('');
  layerOf(scene, `fx-prayers${rm ? ' is-rm' : ''}`,
    `${rays}<b class="fx-prayers__ring" style="--x:${f(at.x)}px; --y:${f(at.y)}px"></b><b class="fx-prayers__glow" style="--x:${f(at.x)}px; --y:${f(at.y)}px"></b>`,
    rm ? 4000 : 10500, 2000);
}

/** tear-twelve: 새 옷을 열두 조각으로 (11:30-31) — 열은 받는 사람에게, 둘은 남음 */
export function playTearTwelve(scene: HTMLElement, from: string | undefined, to: string | undefined, rm: boolean): void {
  const a = actorBox(scene, from ?? 'ahijah', 'left');
  const b = actorBox(scene, to ?? 'jeroboam', 'right');
  const sx = a.x + (b.x - a.x) * 0.28;
  const sy = a.top + a.h * 0.38;
  const tx = b.x;
  const ty = b.top + b.h * 0.5;
  // 4 × 3 조각. 남는 둘 = 가운데 아래 두 조각
  const keep = new Set([9, 10]);
  let sent = 0;
  const pieces = Array.from({ length: 12 }, (_, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const px = (col - 1.5) * 17;
    const py = (row - 1) * 23;
    const stay = keep.has(i);
    // 받는 쪽에서 부채꼴로 쌓임
    const k = stay ? 0 : sent++;
    const ex = stay ? px * 0.9 - 10 + (i === 10 ? 20 : 0) : tx - sx + (k - 4.5) * 4.2;
    const ey = stay ? py + 26 : ty - sy + Math.abs(k - 4.5) * 1.6 - 4;
    const rot = stay ? (i === 9 ? -12 : 10) : (k - 4.5) * 9;
    const jag = ((i * 53) % 7) - 3;
    return `<i class="${stay ? 'is-stay' : 'is-go'}" style="--px:${px}px; --py:${py}px; --ex:${f(ex)}px; --ey:${f(ey)}px; --r:${f(rot)}deg; --j:${jag}deg; --d:${f(rm ? 0 : 3.0 + k * 0.12)}s"></i>`;
  }).join('');
  layerOf(scene, `fx-tear${rm ? ' is-rm' : ''}`,
    `<div class="fx-tear__at" style="--x:${f(sx)}px; --y:${f(sy)}px">
      <b class="fx-tear__glow"></b>${pieces}
      <em class="fx-tear__n fx-tear__n--ten" style="--ex:${f(tx - sx)}px; --ey:${f(ty - sy + 26)}px">10</em>
      <em class="fx-tear__n fx-tear__n--two">2</em>
    </div>`,
    rm ? 4200 : 11000, 1800);
}
