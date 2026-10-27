// 뒤돌아보지 말라 (창 19:1-29, A급 gen-19-sodom). 배경 그림 'sodom-gate*' · 'lot-house' · 'lot-door' · 'sodom-mob' ·
// 'sodom-plain' · 'sodom-fire' · 'salt-pillar' · 'sodom-smoke', 그리고 효과 'blind'.
// 같은 종이 오려낸 그림자극 말투. 무거운 장이라 선정적인 것은 아무것도 그리지 않는다:
// 성 사람들은 얼굴 없는 어두운 덩어리와 횃불로만, 불과 유황은 먼 성 위로 떨어지는 빛줄기로만, 소금 기둥은 창백한 형상 하나로만.
//  - sodom-gate  : 해 질 녘 소돔 성문. 두 망대 사이 아치문, 문 너머 성 안 거리의 불빛, 문 곁 돌 의자, 물 넉넉한 들의 종려 (19:1)
//    sodom-gate-grey : 같은 성문, 동틀 녘 잿빛 (19:15)
//  - lot-house   : 롯의 집 안, 밤. 흙벽, 벽감의 등잔, 낮은 상 위 무교병, 오른쪽에 빗장 지른 널문 (19:3)
//    lot-door    : 같은 방. 문틈과 높은 창으로 바깥 횃불빛이 일렁이고 그림자가 지나가며 문이 떨린다 (19:4-9)
//  - sodom-mob   : 바깥, 밤. 롯의 집 앞을 사방에서 에워싼 무리 — 얼굴 없는 어두운 덩어리, 횃불, 불티 (19:4)
//  - sodom-plain : 동틀 녘의 들. 왼쪽 멀리 소돔, 오른쪽 산자락의 작은 성 소알, 그 사이로 난 길 (19:17-22)
//  - sodom-fire  : 같은 들. 하늘이 붉게 내려앉고 먼 성들 위로 유황과 불이 비같이 떨어진다 (19:24)
//  - salt-pillar : 같은 들, 불은 멀리서 타고, 길 위에 뒤를 돌아본 채 선 창백한 소금 기둥 (19:26)
//  - sodom-smoke : 헤브론 동쪽 산마루, 아침. 발아래 들에서 옹기 가마 같은 연기가 치밀어 오른다 (19:27-28)
// 폰(세로 화면)에서는 x 100~300만 보인다 → 성문·문·기둥은 그 안에 둔다.
import { H, rng, hills, tree, city, palm, reeds } from './backdrop';

const G = 238;

/** 흙벽돌 성벽 한 덩이 (위에 성가퀴) */
function battlement(x1: number, x2: number, top: number, cls: string): string {
  let d = `M${x1} ${H} L${x1} ${top}`;
  for (let x = x1; x < x2; x += 10) d += ` L${x} ${top - 5} L${Math.min(x + 5, x2)} ${top - 5} L${Math.min(x + 5, x2)} ${top} L${Math.min(x + 10, x2)} ${top}`;
  return `<path class="${cls}" d="${d} L${x2} ${H} Z"/>`;
}

/** 평평한 지붕의 집 한 채 (창 몇 개) */
function house(x: number, ground: number, w: number, h: number, cls: string, seed: number, lit = true): string {
  const r = rng(seed);
  const wins = lit
    ? Array.from({ length: Math.max(1, Math.floor(w / 14)) }, () =>
        `<rect class="bd-window sod-win" style="--d:${(r() * 4).toFixed(2)}s" x="${(x + 3 + r() * (w - 8)).toFixed(1)}" y="${(ground - h + 4 + r() * (h * 0.5)).toFixed(1)}" width="2.2" height="3"/>`,
      ).join('')
    : '';
  return `<g class="${cls}"><path d="M${x} ${ground} L${x} ${ground - h} L${x - 1} ${ground - h - 1.6} L${x + w + 1} ${ground - h - 1.6} L${x + w} ${ground - h} L${x + w} ${ground} Z"/>${wins}</g>`;
}

// ── 성문 (19:1) ──
function gateArt(grey: boolean): string {
  const r = rng(1901);
  // 문 너머 성 안 거리: 밝은 길과 집들, 창마다 불빛
  const street = `
    <path class="sod-gate__glow" d="M164 ${G} L164 158 C170 136 186 126 200 126 C214 126 230 136 236 158 L236 ${G} Z"/>
    <g class="sod-gate__inner">
      ${house(160, 222, 26, 30, 'bd-far', 1902)}${house(214, 220, 28, 36, 'bd-far', 1903)}${house(188, 214, 20, 22, 'bd-far', 1904)}
      <path class="bd-far" d="M164 ${G} L164 226 C186 222 214 222 236 226 L236 ${G} Z"/>
    </g>`;
  // 성벽 너머로 보이는 높은 집들과 종려 — 넉넉한 성
  const roofs = [-120, -60, 20, 70, 300, 350, 430, 500].map((x, i) => house(x, 150, 30 + r() * 20, 24 + r() * 30, 'bd-far', 1910 + i)).join('');
  return `
    ${grey ? '<rect class="sod-greysky" x="-800" y="0" width="2000" height="200"/>' : '<ellipse class="sod-sunset" cx="200" cy="150" rx="260" ry="70"/>'}
    ${hills(206, 'bd-far', 1905)}
    ${palm(-40, 168, 60, 'bd-far', 1906)}${palm(330, 160, 70, 'bd-far', 1907)}${palm(80, 162, 54, 'bd-far', 1908)}
    ${roofs}
    ${street}
    <g class="bd-mid sod-wall">
      ${battlement(-800, 124, 128, '')}
      ${battlement(276, 1200, 128, '')}
      <!-- 두 망대 -->
      ${battlement(120, 166, 92, '')}
      ${battlement(234, 280, 92, '')}
      <!-- 아치문 윗벽 -->
      <path d="M164 ${G} L164 158 C170 136 186 126 200 126 C214 126 230 136 236 158 L236 ${G} L240 ${G} L240 112 L160 112 L160 ${G} Z"/>
    </g>
    <path class="sod-rim" d="M120 92 L166 92 M234 92 L280 92 M-800 128 L120 128 M280 128 L1200 128 M164 158 C170 136 186 126 200 126 C214 126 230 136 236 158"/>
    <g class="sod-brick">
      ${Array.from({ length: 9 }, (_, i) => `<path d="M${-60 + i * 14} ${140 + (i % 3) * 22} l12 0 M${296 + i * 13} ${146 + (i % 3) * 20} l12 0"/>`).join('')}
      <path d="M126 110 l14 0 M146 130 l12 0 M128 170 l14 0 M246 116 l14 0 M256 150 l12 0 M240 190 l14 0"/>
    </g>
    <!-- 망대 창 -->
    <rect class="bd-window sod-win" style="--d:0.7s" x="140" y="104" width="3" height="6"/><rect class="bd-window sod-win" style="--d:2.1s" x="256" y="104" width="3" height="6"/>
    <!-- 문 곁 돌 의자 (성문에 앉은 사람들의 자리) -->
    <g class="bd-mid"><path d="M104 ${G} L104 226 L156 226 L156 ${G} Z"/><path d="M244 ${G} L244 228 L290 228 L290 ${G} Z"/></g>
    <path class="sod-rim" d="M104 226 L156 226 M244 228 L290 228"/>
    <path class="bd-near" d="M-800 ${H} L-800 ${G} C-400 ${G - 2} 0 ${G + 2} 200 ${G} C400 ${G - 2} 800 ${G + 2} 1200 ${G} L1200 ${H} Z"/>
    ${palm(30, 262, 150, 'bd-near', 1920)}${palm(388, 262, 140, 'bd-near', 1921)}
    ${reeds(-30, 258, 1.2, 'bd-near', 1922)}${reeds(440, 258, 1.2, 'bd-near', 1923)}`;
}

// ── 롯의 집 안 (19:3-11) ──
function houseArt(state: 'calm' | 'threat'): string {
  const bricks = Array.from({ length: 11 }, (_, row) => {
    const y = 20 + row * 20;
    const off = row % 2 ? 0 : 18;
    return Array.from({ length: 30 }, (_, i) => `M${-400 + off + i * 40} ${y} l34 0`).join(' ');
  }).join(' ');
  const threat = state === 'threat';
  return `
    <rect class="sod-room" x="-800" y="-40" width="2000" height="${H + 40}"/>
    <path class="sod-room__bricks" d="${bricks}"/>
    <!-- 천장 들보 -->
    <g class="sod-beam"><rect x="-800" y="-6" width="2000" height="16"/>${[-120, 0, 120, 240, 360, 480].map((x) => `<rect x="${x}" y="-6" width="10" height="26"/>`).join('')}</g>
    <!-- 등잔빛 -->
    <circle class="sod-lampglow${threat ? ' is-low' : ''}" cx="132" cy="150" r="90"/>
    <!-- 벽감과 등잔 -->
    <path class="sod-niche" d="M116 172 L116 142 C116 132 124 126 132 126 C140 126 148 132 148 142 L148 172 Z"/>
    <g class="sod-lamp"><path d="M122 172 C122 166 128 164 134 164 C140 164 144 166 146 168 L140 172 Z"/><path class="sod-flame" d="M141 166 C139 162 140 157 142 153 C144 157 145 162 143 166 Z"/></g>
    <!-- 바닥 -->
    <path class="sod-floor" d="M-800 ${H} L-800 ${G} L1200 ${G} L1200 ${H} Z"/>
    <!-- 낮은 상 위의 무교병과 물병 -->
    <g class="bd-mid">
      <path d="M150 ${G} L152 222 L248 222 L250 ${G} L244 ${G} L242 228 L158 228 L156 ${G} Z"/>
      <path d="M146 222 L254 222 L252 218 L148 218 Z"/>
      <path d="M232 218 C230 210 232 204 236 202 L236 198 L242 198 L242 202 C246 204 248 210 246 218 Z"/>
    </g>
    <g class="sod-bread"><ellipse cx="170" cy="216.6" rx="11" ry="2"/><ellipse cx="172" cy="214.2" rx="10" ry="1.8"/><ellipse cx="200" cy="216.6" rx="11" ry="2"/></g>
    <!-- 문: 오른쪽, 굵은 널판과 빗장 -->
    <g class="sod-doorway">
      ${threat ? '<path class="sod-seam" d="M266 108 L266 238 M318 108 L318 238 M266 106 L318 106 M262 239 L322 239"/>' : '<path class="sod-seam is-calm" d="M266 108 L266 238 M318 108 L318 238 M262 239 L322 239"/>'}
      <g class="sod-door${threat ? ' is-shaking' : ''}">
        <path d="M268 ${G} L268 108 L316 108 L316 ${G} Z"/>
        <path class="sod-plank" d="M280 110 L280 236 M292 110 L292 236 M304 110 L304 236"/>
        <path class="sod-bar" d="M262 168 L322 168 L322 176 L262 176 Z"/>
      </g>
      <path class="sod-jamb" d="M258 ${G} L258 96 L326 96 L326 ${G} L320 ${G} L320 104 L264 104 L264 ${G} Z"/>
    </g>
    <!-- 높은 창 (밖이 보이지 않는 작은 창) -->
    <g class="sod-window${threat ? ' is-lit' : ''}">
      <rect class="sod-window__hole" x="206" y="60" width="26" height="18"/>
      ${threat ? '<rect class="sod-window__light" x="206" y="60" width="26" height="18"/><ellipse class="sod-window__shadow" cx="219" cy="72" rx="8" ry="10"/>' : ''}
      <path class="sod-beam" d="M213 60 L213 78 M219 60 L219 78 M225 60 L225 78" stroke-width="2"/>
    </g>
    ${threat ? '<ellipse class="sod-underglow" cx="292" cy="240" rx="40" ry="5"/>' : ''}`;
}

// ── 집을 에워싼 무리 (19:4) ──
function mobArt(): string {
  const r = rng(1931);
  // 어두운 덩어리: 머리·어깨가 겹친 줄 세 개 (얼굴 없음)
  const row = (y: number, n: number, size: number, cls: string) =>
    `<g class="sod-mass ${cls}">${Array.from({ length: n }, (_, i) => {
      const x = -260 + (i / n) * 920 + r() * 12;
      const s = size * (0.85 + r() * 0.3);
      return `<g class="sod-mass__p" style="--d:${(r() * 3).toFixed(2)}s"><circle cx="${x.toFixed(1)}" cy="${(y - s * 2.2).toFixed(1)}" r="${(s * 0.62).toFixed(1)}"/><path d="M${(x - s).toFixed(1)} ${H} L${(x - s * 0.9).toFixed(1)} ${(y - s * 1.4).toFixed(1)} Q${x.toFixed(1)} ${(y - s * 1.9).toFixed(1)} ${(x + s * 0.9).toFixed(1)} ${(y - s * 1.4).toFixed(1)} L${(x + s).toFixed(1)} ${H} Z"/></g>`;
    }).join('')}</g>`;
  // 횃불: 막대 + 불꽃 + 번짐
  const torches = Array.from({ length: 16 }, (_, i) => {
    const x = -200 + (i / 16) * 800 + r() * 20;
    const y = 196 + r() * 20;
    const tilt = (r() - 0.5) * 16;
    return `<g class="sod-torch" style="--d:${(r() * 2).toFixed(2)}s" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${tilt.toFixed(1)}) scale(1.5)">
      <circle class="sod-torch__glow" cx="0" cy="-4" r="16"/>
      <path class="sod-torch__stick" d="M-0.9 0 L-0.6 22 L0.6 22 L0.9 0 Z"/>
      <path class="sod-torch__flame" d="M0 -11 C3 -7 4 -3 2.6 0 C1.4 1.6 -1.4 1.6 -2.6 0 C-4 -3 -3 -7 0 -11 Z"/>
      <circle class="sod-spark" style="--d:${(r() * 3).toFixed(2)}s; --dx:${((r() - 0.5) * 14).toFixed(1)}px" cx="0" cy="-10" r="0.7"/>
    </g>`;
  }).join('');
  // 손을 치켜든 팔 몇 개
  const arms = Array.from({ length: 9 }, () => {
    const x = -120 + r() * 640;
    const y = 214 + r() * 16;
    return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} L${(x + (r() - 0.5) * 10).toFixed(1)} ${(y - 18 - r() * 8).toFixed(1)}" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`;
  }).join('');
  return `
    <g class="sod-dim">
      ${hills(170, 'bd-far', 1932)}
      ${house(-140, 220, 90, 70, 'bd-mid', 1933, false)}${house(-40, 222, 70, 56, 'bd-mid', 1934, false)}${house(40, 218, 92, 84, 'bd-mid', 1935, false)}
      ${house(276, 218, 86, 80, 'bd-mid', 1936, false)}${house(360, 222, 70, 60, 'bd-mid', 1937, false)}${house(430, 220, 90, 70, 'bd-mid', 1938, false)}
      <!-- 롯의 집: 가운데 두 층, 굳게 닫힌 문 -->
      <path class="bd-mid sod-lothouse" d="M140 222 L140 112 L138 108 L262 108 L260 112 L260 222 Z"/>
      <path class="sod-lotdoor" d="M188 222 L188 170 L212 170 L212 222 Z"/>
      <path class="sod-houserim" d="M140 222 L140 112 L138 108 L262 108 L260 112 L260 222 M188 222 L188 170 L212 170 L212 222"/>
      <rect class="bd-window sod-win" style="--d:1s" x="160" y="128" width="5" height="7"/><rect class="bd-window sod-win" style="--d:2.4s" x="236" y="128" width="5" height="7"/>
    </g>
    <ellipse class="sod-torchwash" cx="200" cy="200" rx="230" ry="60"/>
    ${row(238, 30, 13, 'sod-mass--back')}
    <g class="sod-torches">${torches}</g>
    <g class="sod-mass sod-mass--arms">${arms}</g>
    ${row(256, 26, 17, 'sod-mass--front')}
    <path class="sod-mass sod-mass--ground" d="M-800 ${H} L-800 250 L1200 250 L1200 ${H} Z"/>`;
}

// ── 들 (19:17-26) ──
/** 무너질 성들 (왼쪽 멀리)과 소알 (오른쪽 산자락) */
function plainBase(state: 'dawn' | 'fire' | 'salt'): string {
  const burning = state !== 'dawn';
  return `
    ${state === 'dawn' ? '<ellipse class="sod-dawnglow" cx="330" cy="190" rx="240" ry="60"/>' : `<rect class="sod-firesky" x="-800" y="-20" width="2000" height="240"/><ellipse class="sod-fireglow${state === 'salt' ? ' is-low' : ''}" cx="40" cy="200" rx="220" ry="70"/>`}
    <!-- 산 (도망하라 하신 산) -->
    <path class="bd-far" d="M240 220 C280 196 300 160 330 140 C352 126 372 132 392 146 C420 128 452 120 480 140 C520 168 560 196 640 214 L640 260 L240 260 Z"/>
    ${hills(214, 'bd-far', 1941)}
    <!-- 소알: 산자락의 작은 성 -->
    ${city(312, 212, 1942, 0.55)}
    <!-- 소돔과 고모라: 왼쪽 멀리 -->
    <g class="sod-cities${burning ? ' is-burning' : ''}">${city(40, 212, 1943, 0.9)}${city(-70, 214, 1944, 0.75)}${city(118, 214, 1945, 0.55)}</g>
    <path class="bd-mid" d="M-800 ${H} L-800 226 C-500 222 -200 230 60 226 C200 224 320 230 460 226 C700 222 1000 230 1200 226 L1200 ${H} Z"/>
    <path class="sod-road" d="M-80 252 C40 244 120 238 200 236 C260 234 300 228 330 220"/>
    ${reeds(70, 250, 0.9, 'bd-near', 1946)}${reeds(330, 252, 0.9, 'bd-near', 1947)}
    <path class="bd-near" d="M-800 ${H} L-800 248 C-500 246 -200 252 60 250 C200 249 320 254 460 250 C700 246 1000 252 1200 250 L1200 ${H} Z"/>
    ${tree(-60, 262, 120, 'bd-near', 1948, { lean: 0.15, sway: true })}${tree(470, 262, 110, 'bd-near', 1949, { lean: -0.15, sway: true })}`;
}

/** 하늘에서 비같이 떨어지는 유황과 불 (19:24): 먼 성들 위로 기울어진 빛줄기 */
function brimstone(soft: boolean): string {
  const r = rng(1951);
  const n = soft ? 14 : 34;
  const streaks = Array.from({ length: n }, () => {
    const x = -140 + r() * 320;
    const len = 30 + r() * 50;
    return `<path class="sod-streak" style="--d:${(r() * 2.4).toFixed(2)}s; --t:${(1.4 + r() * 1.4).toFixed(2)}s" d="M${(x + 40).toFixed(1)} ${(-10 - r() * 40).toFixed(1)} l${(-len * 0.35).toFixed(1)} ${len.toFixed(1)}"/>`;
  }).join('');
  const embers = Array.from({ length: soft ? 0 : 12 }, () => {
    const x = -100 + r() * 260;
    return `<circle class="sod-ember" style="--d:${(r() * 3).toFixed(2)}s" cx="${x.toFixed(1)}" cy="${(206 + r() * 10).toFixed(1)}" r="${(1 + r() * 1.6).toFixed(1)}"/>`;
  }).join('');
  const columns = [40, -70, 118, -10, 80].map((x, i) => `<g class="sod-pillarsmoke" style="--d:${(i * 0.9).toFixed(1)}s">${Array.from({ length: 5 }, (_, j) =>
    `<circle class="sod-billow" style="--d:${(j * 1.3 + i * 0.4).toFixed(1)}s" cx="${x}" cy="200" r="${(10 + r() * 6).toFixed(1)}"/>`).join('')}</g>`).join('');
  return `<g class="sod-fall">${columns}<g class="sod-streaks">${streaks}</g>${embers}</g>`;
}

/** 소금 기둥 (19:26): 너울 쓴 여인의 모양 그대로, 왼쪽(소돔 쪽)을 돌아본 채 굳은 창백한 기둥 */
function saltPillar(x: number, ground: number): string {
  return `<g class="sod-salt" transform="translate(${x} ${ground}) scale(0.5)">
    <path class="sod-salt__mound" d="M-46 2 C-34 -6 -20 -9 0 -9 C20 -9 34 -6 48 2 Z"/>
    <ellipse class="sod-salt__shadow" cx="0" cy="0" rx="34" ry="5"/>
    <path class="sod-salt__body" d="M-20 0 C-22 -30 -20 -64 -18 -92 C-17 -104 -14 -110 -13 -116 C-18 -122 -20 -132 -18 -142 C-15 -156 -4 -164 6 -162 C16 -160 22 -152 22 -142 C22 -132 18 -124 14 -118 C16 -110 18 -100 19 -88 C21 -60 22 -28 24 0 Z"/>
    <!-- 돌아본 얼굴의 옆선 (왼쪽을 향함) -->
    <path class="sod-salt__face" d="M-13 -146 C-16 -142 -18 -138 -19 -134 L-21 -132 L-19 -131 C-19 -128 -17 -126 -14 -125"/>
    <!-- 너울 주름과 결정 면 -->
    <path class="sod-salt__facet" d="M-10 -110 L-12 -40 L-6 0 M4 -112 L6 -60 L2 0 M14 -100 L16 -44 M-16 -80 L-4 -70 L10 -84 M-14 -30 L0 -20 L18 -32 M-18 -54 L-6 -48 L8 -58 L20 -50 M-4 -150 L4 -138 L14 -146 M-8 -126 L6 -122"/>
    <path class="sod-salt__shade" d="M6 -162 C16 -160 22 -152 22 -142 C22 -132 18 -124 14 -118 C16 -110 18 -100 19 -88 C21 -60 22 -28 24 0 L8 0 C8 -30 10 -70 8 -100 C8 -120 12 -140 6 -162 Z"/>
    <!-- 돌아보며 뒤로 뻗친 손 하나 -->
    <path class="sod-salt__body" d="M-16 -100 C-24 -96 -30 -90 -34 -84 C-36 -80 -33 -78 -30 -80 C-26 -84 -20 -88 -14 -90 Z"/>
    <circle class="sod-salt__glint" style="--d:0s" cx="8" cy="-120" r="1.4"/><circle class="sod-salt__glint" style="--d:1.7s" cx="-8" cy="-60" r="1.1"/><circle class="sod-salt__glint" style="--d:3.1s" cx="14" cy="-30" r="1"/>
  </g>`;
}

function plainArt(state: 'dawn' | 'fire' | 'salt'): string {
  return `${plainBase(state)}${state !== 'dawn' ? brimstone(state === 'salt') : ''}${state === 'salt' ? saltPillar(204, 242) : ''}`;
}

// ── 아브라함이 바라본 연기 (19:27-28) ──
function smokeArt(): string {
  // 연기 기둥: 아래는 좁고 위로 갈수록 부풀어 오르는 기둥 (폰에서도 인물 양옆으로 보이게 x 120 · 280 근처)
  const column = (x: number, w: number, seed: number) => {
    const q = rng(seed);
    const L: string[] = [];
    const R: string[] = [];
    for (let i = 0; i <= 8; i++) {
      const y = 196 - i * 26;
      const half = w * 0.05 + w * Math.pow(i / 8, 1.7) + q() * 6;
      const drift = i * i * 0.6;
      L.push(`${(x - half + drift).toFixed(1)} ${y}`);
      R.unshift(`${(x + half + drift + q() * 6).toFixed(1)} ${(y - 6 + q() * 12).toFixed(1)}`);
    }
    return `<g class="sod-column" style="--d:${(q() * 6).toFixed(1)}s"><path d="M${L.join(' T')} L${R.join(' T')} Z"/></g>`;
  };
  // 이미 하늘에 퍼진 연기: 천천히 흐르는 두꺼운 띠
  const banks = [[-60, 70, 180], [120, 40, 200], [300, 64, 190]].map(([x, y, w], i) =>
    `<ellipse class="sod-smokebank" style="--d:${i * 4}s" cx="${x}" cy="${y}" rx="${w}" ry="${30 + i * 6}"/>`).join('');
  const columns = column(118, 64, 1964) + column(286, 72, 1965) + column(20, 56, 1966) + column(390, 56, 1967);
  return `
    <ellipse class="sod-morning" cx="260" cy="120" rx="260" ry="90"/>
    ${banks}
    <g class="sod-below">
      <path class="bd-far" d="M-800 ${H} L-800 176 C-400 172 0 178 200 174 C400 170 800 178 1200 174 L1200 ${H} Z"/>
      <path class="sod-deadsea" d="M-200 196 C0 190 140 194 260 190 C380 186 520 194 700 192 L700 202 C500 204 300 200 100 204 C-60 206 -160 204 -200 202 Z"/>
      <ellipse class="sod-underglow is-wide" cx="200" cy="196" rx="170" ry="7"/>
    </g>
    <g class="sod-furnaces">${columns}</g>
    <path class="bd-mid" d="M-800 ${H} L-800 210 C-500 208 -300 218 -60 220 C60 222 120 230 200 232 C280 234 360 226 460 218 C700 210 1000 214 1200 212 L1200 ${H} Z"/>
    <path class="bd-near" d="M-800 ${H} L-800 246 C-500 244 -200 250 40 248 C200 247 320 252 460 248 C700 244 1000 250 1200 246 L1200 ${H} Z"/>
    ${tree(66, 252, 96, 'bd-near', 1962, { lean: 0.1, sway: true })}${tree(-160, 256, 140, 'bd-near', 1963, { sway: true })}`;
}

export function sodomArt(kind: 'gate' | 'gate-grey' | 'house' | 'door' | 'mob' | 'plain' | 'fire' | 'salt' | 'smoke'): string {
  switch (kind) {
    case 'gate':
      return gateArt(false);
    case 'gate-grey':
      return gateArt(true);
    case 'house':
      return houseArt('calm');
    case 'door':
      return houseArt('threat');
    case 'mob':
      return mobArt();
    case 'plain':
      return plainArt('dawn');
    case 'fire':
      return plainArt('fire');
    case 'salt':
      return plainArt('salt');
    case 'smoke':
      return smokeArt();
  }
}

/** 효과 'blind' (19:11 "그 눈을 어둡게 하니"): 문 쪽에서 흰빛이 터져 화면을 덮었다가 천천히 걷힌다 (약 5초) */
export function playBlind(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-blind';
  layer.innerHTML = '<b></b><i></i>';
  scene.append(layer);
  const life = rm ? 1600 : 5200;
  setTimeout(() => layer.classList.add('is-out'), life - (rm ? 800 : 2200));
  setTimeout(() => layer.remove(), life);
}
