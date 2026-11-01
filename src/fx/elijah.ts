// 9막 A급 — 엘리야 (왕상 12 「나라가 둘로」 · 18 「갈멜산」 · 19 「세미한 소리」 · 21 「나봇의 포도원」)의 전용 배경과 효과.
// 같은 종이 오려낸 그림자극 말투. 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - el-shechem      : 세겜. 왼쪽 에발산(바위)·오른쪽 그리심산(푸른 비탈) 사이 골짜기, 가운데 돌 단(왕이 서는 자리), 양쪽에 모인 무리 (왕상 12:1)
//  - el-bethel-calf  : 벧엘의 산당. 가운데 받침 위 금송아지(금빛), 오른쪽 단의 불과 연기, 선돌, 엎드린 무리 (왕상 12:28-33 — 13장에도)
//  - el-drought      : 삼 년 가뭄의 땅. 갈라진 맨땅, 마른 시내 바닥, 잎 없는 나무, 흰 해와 아지랑이 (왕상 18:2, 5)
//  - el-carmel       : 갈멜산 마루. 왼쪽 멀리 바다, 왼쪽 바알의 단(뿔 단 + 선돌), 가운데 무너진 여호와의 단 (18:19-30)
//  - el-carmel-altar : 가운데 다시 쌓은 열두 돌 단 + 나무와 번제물 + 마른 도랑 (18:31-33)
//  - el-carmel-wet   : 같은 단, 물 열두 통 — 돌이 젖어 번들거리고 도랑에 물이 가득 (18:34-35)
//  - el-carmel-burnt : 불이 지나간 자리. 단도 돌도 흙도 없이 검게 패인 자리, 마른 도랑, 가는 연기. 바알의 단은 멀쩡히 그대로 (18:38)
//  - el-summit       : 갈멜산 꼭대기 벼랑. 앞이 탁 트인 바다, 수평선 (18:42-44) — 효과 small-cloud는 여기 수평선에서 오른다
//  - el-broom        : 광야 하룻길, 로뎀나무 한 그루 (19:4)
//  - el-broom-bread  : 같은 나무, 머리맡의 숯불에 구운 떡과 물 한 병 (19:6)
//  - el-horeb        : 하나님의 산 호렙. 큰 바위산 한가운데 굴 어귀 (19:8-9, 13)
//  - el-plow         : 아벨므흘라의 밭. 길게 이어진 밭고랑과 멀어지는 열두 겨리 소, 맨 앞(가까운) 쟁기 (19:19)
//  - el-plow-fire    : 같은 밭, 소의 기구(멍에·쟁기)를 태우는 불과 고기 삶는 솥, 둘러앉은 사람들 (19:21)
//  - el-vineyard     : 이스르엘 나봇의 포도원. 비탈의 포도나무 줄, 망대, 돌담, 오른쪽에 바로 붙은 아합의 궁 담과 창 (21:1-2)
//  - el-chamber      : 이스르엘 궁의 침실. 상아 박은 침상, 포도원이 내다보이는 격자창, 등잔 (21:4 — 22:39 "상아궁")
//  - el-gate         : 이스르엘 성문 광장. 성문, 장로들의 돌 자리, 가운데 높은 자리 (21:12 "나봇을 백성 가운데 높이 앉히매")
//  - el-gate-empty   : 같은 곳, 해 질 녘. 높은 자리는 비었고 성문 밖 길에 돌 몇 개 (21:13 뒤 — 사람은 그리지 않음)
// 효과:
//  - rift         : 나라가 갈라짐 — 무대 한가운데로 위에서 아래로 금이 그어지고, 왼쪽은 찬 청회색·오른쪽은 금빛으로 물들며
//                   "열 지파 · 여로보암 | 유다 · 르호보암"이 뜸, 무대가 흔들림 (약 5초, 왕상 12:16-20). 바로 뒤 beat에 kings
//  - no-answer    : 응답 없음 — 해가 하늘을 가로질러 기울고(아침 → 낮 → 저녁), "바알이여 응답하소서"가 왼쪽에서 거듭 떠올라 흩어짐.
//                   끝에 "……" (약 9초, 18:26-29)
//  - carmel-fire  : 여호와의 불 — 하늘에서 흰 불기둥이 단(배경 표지, 없으면 가운데)에 내리꽂히고, 불길이 단을 삼키고,
//                   도랑에서 김이 피어오름 (약 7초, 18:38). 다음 beat 배경 el-carmel-burnt
//  - small-cloud  : 손만한 작은 구름 — 수평선(el-summit)에서 아주 작은 구름 하나가 떠오르고, 이어 하늘 가득 구름이 부풀어 어두워짐
//                   (약 9초, 18:44-45). 다음 beat에 rain-start
//  - great-wind   : 크고 강한 바람 — 가로로 찢는 바람결과 부서져 날리는 돌 조각 (약 5초, 19:11)
//  - earthquake   : 지진 — 무대가 크게 세 번 흔들리고 땅에 금이 그어지며 흙먼지 (약 4.5초, 19:11)
//  - mount-fire   : 산의 불 — 인물 뒤 산비탈을 따라 불길이 번져 지나감 (약 5초, 19:12)
//  - still-voice  : 세미한 소리 — 모든 것이 잦아들고 무대가 어두워진 채, 가는 빛 한 줄과 아주 작은 글자 "세미한 소리"
//                   (קוֹל דְּמָמָה דַקָּה), 느린 고리 하나 (약 8초, 19:12). 하나님은 그리지 않는다
//  - angel-touch  : 어루만짐 — 누운 사람(who, 없으면 elijah) 위로 따뜻한 빛이 내려와 머묾 (약 4.5초, 19:5, 7). 천사는 그리지 않는다
//  - mantle-throw : 겉옷을 던짐 — 던지는 사람(who, 없으면 elijah)의 어깨에서 겉옷이 펼쳐지며 날아 받는 사람(to, 없으면 elisha)의
//                   어깨에 내려앉음 (약 4초, 19:19). 다음 beat에 elisha 옷 plow-mantle
// 하나님은 그리지 않는다 (voice · glory · 빛 · 글자).
import { H, W, rng, smoke, tree } from './backdrop';
import { folk, ground, ridge, stars } from './joshua';

export type ElijahArt =
  | 'el-shechem' | 'el-bethel-calf' | 'el-drought'
  | 'el-carmel' | 'el-carmel-altar' | 'el-carmel-wet' | 'el-carmel-burnt' | 'el-summit'
  | 'el-broom' | 'el-broom-bread' | 'el-horeb' | 'el-plow' | 'el-plow-fire'
  | 'el-vineyard' | 'el-chamber' | 'el-gate' | 'el-gate-empty';

const f = (n: number) => n.toFixed(1);

/** 효과가 찾아갈 배경 속 표지 (보이지 않는 점) */
const mark = (name: string, x: number, y: number) => `<circle class="el-mark" data-mark="${name}" cx="${f(x)}" cy="${f(y)}" r="1.2"/>`;

/** 잎 없는 마른 나무 */
function deadTree(x: number, y: number, h: number, seed: number, cls = 'bd-mid'): string {
  const r = rng(seed);
  const lines: string[] = [`M${f(x)} ${f(y)} L${f(x + (r() - 0.5) * 4)} ${f(y - h * 0.55)}`];
  const tx = x + (r() - 0.5) * 4;
  const ty = y - h * 0.55;
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI / 2 + (i - 2.5) * 0.42 + (r() - 0.5) * 0.2;
    const l = h * (0.3 + r() * 0.25);
    const ex = tx + Math.cos(a) * l;
    const ey = ty + Math.sin(a) * l;
    lines.push(`M${f(tx)} ${f(ty)} Q${f(tx + Math.cos(a) * l * 0.5 + (r() - 0.5) * 4)} ${f(ty + Math.sin(a) * l * 0.5)} ${f(ex)} ${f(ey)}`);
    lines.push(`M${f(tx + Math.cos(a) * l * 0.6)} ${f(ty + Math.sin(a) * l * 0.6)} l${f((r() - 0.5) * 10)} ${f(-4 - r() * 6)}`);
  }
  return `<path class="${cls} el-dead" d="${lines.join(' ')}" fill="none" stroke="currentColor" stroke-width="${f(Math.max(0.8, h * 0.035))}" stroke-linecap="round"/>`;
}

/** 돌 하나 (둥글게 깎인 다각형) */
function stone(x: number, y: number, w: number, h: number, seed: number, cls: string, tilt = 0): string {
  const r = rng(seed);
  const p = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2;
    const k = 0.82 + r() * 0.18;
    return `${f(x + Math.cos(a) * w * 0.5 * k)} ${f(y + Math.sin(a) * h * 0.5 * k)}`;
  });
  return `<path class="${cls}" transform="rotate(${f(tilt)} ${f(x)} ${f(y)})" d="M${p.join(' L')} Z"/>`;
}

/** 나무를 벌이고 각을 뜬 번제물을 올림 (18:23, 33) — 덩이로만 */
function offering(x: number, y: number, s: number, cls: string): string {
  const logs = [0, 1, 2].map((i) => `<rect class="${cls}" x="${f(x - 16 * s + i * 1.5 * s)}" y="${f(y - (i + 1) * 3.2 * s)}" width="${f(32 * s - i * 3 * s)}" height="${f(3 * s)}" rx="${f(1.4 * s)}"/>`).join('');
  const lumps = [[-8, 0, 6, 3.4], [0, -1.2, 7.4, 4], [8, 0.2, 5.6, 3.2]].map(([dx, dy, rx, ry]) =>
    `<ellipse class="${cls} el-lump" cx="${f(x + dx * s)}" cy="${f(y - 10.4 * s + dy * s)}" rx="${f(rx * s)}" ry="${f(ry * s)}"/>`).join('');
  return `<g>${logs}${lumps}</g>`;
}

/** 열두 돌 단 (18:31-32). state: ruin = 무너져 흩어짐 · built = 다시 쌓음 · wet = 물에 젖음 · burnt = 사라짐 */
function twelve(x: number, y: number, s: number, state: 'ruin' | 'built' | 'wet' | 'burnt'): string {
  const trench = `<ellipse class="el-trench${state === 'wet' ? ' is-wet' : state === 'burnt' ? ' is-dry' : ''}" cx="${f(x)}" cy="${f(y + 1)}" rx="${f(38 * s)}" ry="${f(6.4 * s)}"/>`;
  if (state === 'ruin') {
    const r = rng(1812);
    const fallen = Array.from({ length: 9 }, (_, i) =>
      stone(x - 30 * s + i * 7.4 * s + (r() - 0.5) * 4, y - 1 - r() * 3 * s, (6 + r() * 3) * s, (4 + r() * 2) * s, 1820 + i, 'bd-near el-stone', (r() - 0.5) * 50)).join('');
    return `<g class="el-twelve is-ruin">${stone(x - 4 * s, y - 5 * s, 9 * s, 6 * s, 1830, 'bd-near el-stone', 8)}${stone(x + 6 * s, y - 4 * s, 8 * s, 5 * s, 1831, 'bd-near el-stone', -12)}${fallen}
      <path class="el-weeds" d="M${f(x - 20 * s)} ${f(y)} l-2 -6 M${f(x - 18 * s)} ${f(y)} l1 -7 M${f(x + 16 * s)} ${f(y)} l-1 -6 M${f(x + 18 * s)} ${f(y)} l2 -5"/>
      ${mark('altar', x, y - 6 * s)}</g>`;
  }
  if (state === 'burnt') {
    return `<g class="el-twelve is-burnt">
      <ellipse class="el-scorch" cx="${f(x)}" cy="${f(y - 1)}" rx="${f(44 * s)}" ry="${f(9 * s)}"/>
      ${trench}
      <ellipse class="el-hollow" cx="${f(x)}" cy="${f(y - 1)}" rx="${f(24 * s)}" ry="${f(4 * s)}"/>
      ${smoke(x - 6 * s, y - 6 * s, 1840, 4)}${smoke(x + 10 * s, y - 4 * s, 1841, 3)}
      ${Array.from({ length: 7 }, (_, i) => `<circle class="el-cinder" style="--d:${f(i * 0.6)}s" cx="${f(x - 18 * s + i * 6 * s)}" cy="${f(y - 2 - (i % 3))}" r="${f(0.9 * s)}"/>`).join('')}
      ${mark('altar', x, y - 10 * s)}</g>`;
  }
  // 쌓은 단: 아래부터 다섯 · 넷 · 셋 = 열둘
  const rows = [5, 4, 3];
  const stones = rows.map((n, row) => Array.from({ length: n }, (_, i) =>
    stone(x + (i - (n - 1) / 2) * 9 * s, y - 3.4 * s - row * 6 * s, 9.4 * s, 6.4 * s, 1850 + row * 10 + i, `bd-near el-stone${state === 'wet' ? ' is-wet' : ''}`)).join('')).join('');
  const sheen = state === 'wet'
    ? `<path class="el-drip" d="M${f(x - 14 * s)} ${f(y - 16 * s)} l0 12 M${f(x + 3 * s)} ${f(y - 20 * s)} l0 16 M${f(x + 16 * s)} ${f(y - 14 * s)} l0 10"/>`
    + Array.from({ length: 5 }, (_, i) => `<path class="el-ripple" style="--d:${f(i * 0.6)}s" d="M${f(x - 30 * s + i * 14 * s)} ${f(y + 1 + (i % 2) * 2)} q4 -1 8 0"/>`).join('')
    : '';
  return `<g class="el-twelve">${trench}${stones}${offering(x, y - 19 * s, s, 'bd-near')}${sheen}${mark('altar', x, y - 22 * s)}</g>`;
}

/** 바알의 단: 뿔 달린 단 + 그 위 번제물 + 옆의 선돌(주상)과 아세라 목상 막대 */
function baalAltar(x: number, y: number, s: number): string {
  return `<g class="el-baal">
    <path class="bd-mid" d="M${f(x - 18 * s)} ${f(y)} L${f(x - 16 * s)} ${f(y - 16 * s)} L${f(x - 19 * s)} ${f(y - 21 * s)} L${f(x - 13 * s)} ${f(y - 17 * s)} L${f(x + 13 * s)} ${f(y - 17 * s)} L${f(x + 19 * s)} ${f(y - 21 * s)} L${f(x + 16 * s)} ${f(y - 16 * s)} L${f(x + 18 * s)} ${f(y)} Z"/>
    ${offering(x, y - 17 * s, s * 0.8, 'bd-mid')}
    <path class="bd-mid el-pillar" d="M${f(x + 26 * s)} ${f(y)} L${f(x + 25 * s)} ${f(y - 34 * s)} C${f(x + 26 * s)} ${f(y - 38 * s)} ${f(x + 31 * s)} ${f(y - 38 * s)} ${f(x + 32 * s)} ${f(y - 34 * s)} L${f(x + 33 * s)} ${f(y)} Z"/>
    <path class="bd-mid" d="M${f(x - 28 * s)} ${f(y)} L${f(x - 27 * s)} ${f(y - 40 * s)} L${f(x - 25 * s)} ${f(y - 40 * s)} L${f(x - 24 * s)} ${f(y)} Z M${f(x - 32 * s)} ${f(y - 34 * s)} L${f(x - 20 * s)} ${f(y - 36 * s)} L${f(x - 20 * s)} ${f(y - 33 * s)} L${f(x - 32 * s)} ${f(y - 31 * s)} Z"/>
    <path class="el-trodden" d="M${f(x - 36 * s)} ${f(y + 3)} C${f(x - 20 * s)} ${f(y + 9)} ${f(x + 20 * s)} ${f(y + 9)} ${f(x + 38 * s)} ${f(y + 3)}"/>
  </g>`;
}

/** 바다 (수평선 y) */
function sea(y: number, x0: number, x1: number, seed: number): string {
  const r = rng(seed);
  const glints = Array.from({ length: 16 }, () => {
    const x = x0 + r() * (x1 - x0);
    const yy = y + 3 + r() * 14;
    return `<path class="el-glint" style="--d:${f(r() * 4)}s" d="M${f(x)} ${f(yy)} h${f(4 + r() * 8)}"/>`;
  }).join('');
  return `<path class="el-sea" d="M${f(x0)} ${f(y)} L${f(x1)} ${f(y)} L${f(x1)} ${H} L${f(x0)} ${H} Z"/>${glints}`;
}

/** 포도나무 한 줄 (받침 막대 · 덩굴 · 잎 덩이 · 송이) */
function vineRow(y: number, x0: number, x1: number, s: number, seed: number, cls: string): string {
  const r = rng(seed);
  const parts: string[] = [];
  for (let x = x0; x <= x1; x += s * 2.6) {
    parts.push(`<path d="M${f(x)} ${f(y)} C${f(x - s * 0.3)} ${f(y - s * 0.6)} ${f(x + s * 0.3)} ${f(y - s)} ${f(x)} ${f(y - s * 1.5)}" fill="none" stroke="currentColor" stroke-width="${f(s * 0.14)}"/>`);
    for (let k = 0; k < 4; k++) parts.push(`<circle class="el-leaf" style="--d:${f(r() * 4)}s" cx="${f(x + (r() - 0.5) * s * 1.8)}" cy="${f(y - s * (1.3 + r() * 0.5))}" r="${f(s * (0.34 + r() * 0.2))}"/>`);
    if (r() < 0.75) parts.push(`<ellipse class="el-grape" cx="${f(x + s * 0.5)}" cy="${f(y - s * 0.95)}" rx="${f(s * 0.16)}" ry="${f(s * 0.28)}"/>`);
  }
  return `<g class="${cls}">${parts.join('')}</g>`;
}

/** 납작 지붕 집 */
function house(x: number, y: number, w: number, h: number, cls: string, lit: boolean): string {
  return `<g class="${cls}"><rect x="${f(x)}" y="${f(y - h)}" width="${f(w)}" height="${f(h)}"/><rect x="${f(x - 1)}" y="${f(y - h - 2)}" width="${f(w + 2)}" height="2"/></g>
    ${lit ? `<rect class="el-window" style="--d:${f((x * 7) % 3)}s" x="${f(x + w * 0.4)}" y="${f(y - h * 0.62)}" width="${f(Math.max(1.4, w * 0.12))}" height="${f(Math.max(1.8, h * 0.2))}"/>` : ''}`;
}

// ── 세겜 ──────────────────────────────────────
function shechemArt(): string {
  const r = rng(1201);
  return `<g class="el el--shechem">
    <!-- 에발산(왼쪽, 바위) · 그리심산(오른쪽) -->
    ${ridge([[-W * 2, 150], [-200, 120], [-60, 70], [40, 58], [120, 96], [170, 140], [200, 150]], 'bd-far')}
    ${ridge([[200, 150], [236, 132], [300, 74], [370, 62], [470, 92], [620, 130], [W * 3, 140]], 'bd-far el-green')}
    <path class="el-rockline" d="M-40 92 l14 10 M2 72 l10 14 M60 66 l8 16 M100 92 l10 10"/>
    <!-- 골짜기의 세겜 성 -->
    <path class="bd-mid" d="M150 172 L156 154 L246 154 L252 172 Z"/>
    ${Array.from({ length: 7 }, (_, i) => house(158 + i * 12.4, 156, 8 + (i % 3) * 2, 8 + (i % 2) * 5, 'bd-mid', i % 3 === 1)).join('')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 214 C-60 204 60 196 140 190 C180 186 220 186 260 190 C340 196 460 204 ${W * 3} 212 L${W * 3} ${H} Z"/>
    <!-- 상수리나무 -->
    ${tree(70, 214, 50, 'bd-mid', 1202, { sway: true })}${tree(338, 212, 40, 'bd-mid', 1203, { sway: true })}
    <!-- 모인 무리: 양쪽으로 길게 -->
    ${folk(-60, 214, 150, 206, 28, 1.7, 1204, 'js-folk el-crowd')}${folk(252, 206, 470, 214, 28, 1.7, 1205, 'js-folk el-crowd')}
    ${folk(-20, 226, 140, 220, 18, 2.2, 1206, 'js-folk el-crowd')}${folk(262, 220, 430, 226, 18, 2.2, 1207, 'js-folk el-crowd')}
    <!-- 가운데 돌 단 (왕이 서는 자리) -->
    <path class="bd-near" d="M150 236 L158 222 L242 222 L250 236 Z"/>
    <path class="el-rockline" d="M160 228 H240 M176 222 V236 M200 222 V236 M224 222 V236"/>
    ${Array.from({ length: 3 }, (_, i) => `<ellipse class="bd-near" cx="${f(-60 + i * 220 + r() * 40)}" cy="252" rx="60" ry="8"/>`).join('')}
    ${ground(250)}
  </g>`;
}

// ── 벧엘의 산당과 금송아지 ───────────────────────
function calf(x: number, y: number, s: number): string {
  // 서 있는 송아지 옆모습 (오른쪽을 봄): 몸통 · 목 · 머리 · 작은 뿔 · 네 다리
  const p = (dx: number, dy: number) => `${f(x + dx * s)} ${f(y + dy * s)}`;
  return `<g class="el-calf">
    <path d="M${p(-16, -14)} C${p(-17, -22)} ${p(-10, -25)} ${p(-2, -24)} C${p(6, -24)} ${p(10, -25)} ${p(13, -28)} L${p(16, -34)} C${p(18, -36)} ${p(22, -36)} ${p(24, -33)} L${p(26, -28)} C${p(26, -26)} ${p(24, -25)} ${p(21, -25)} C${p(18, -22)} ${p(16, -18)} ${p(15, -14)} L${p(14, -10)} L${p(14, 0)} L${p(11, 0)} L${p(10, -9)} L${p(6, -10)} L${p(5, 0)} L${p(2, 0)} L${p(1, -10)} L${p(-8, -10)} L${p(-9, 0)} L${p(-12, 0)} L${p(-12, -10)} L${p(-14, -10)} L${p(-15, 0)} L${p(-18, 0)} L${p(-17, -11)} C${p(-20, -12)} ${p(-21, -16)} ${p(-20, -20)} Z"/>
    <path d="M${p(17, -35)} C${p(16, -40)} ${p(18, -42)} ${p(20, -42)} C${p(19, -40)} ${p(19, -38)} ${p(20, -35)} Z M${p(21, -35)} C${p(22, -40)} ${p(24, -41)} ${p(26, -41)} C${p(24, -39)} ${p(24, -37)} ${p(23, -34)} Z"/>
    <path class="el-calf__shine" d="M${p(-12, -20)} C${p(-6, -23)} ${p(4, -22)} ${p(10, -21)}" fill="none"/>
  </g>`;
}
function bethelArt(): string {
  return `<g class="el el--bethel">
    ${stars(40, 110, 1211)}
    ${ridge([[-W * 2, 158], [-160, 140], [-20, 152], [90, 130], [200, 120], [320, 134], [460, 120], [W * 3, 140]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 222 C-80 214 40 200 120 184 C160 176 240 176 280 184 C360 200 480 214 ${W * 3} 222 L${W * 3} ${H} Z"/>
    ${tree(40, 204, 46, 'bd-mid', 1212, { sway: true })}${tree(372, 206, 40, 'bd-mid', 1213, { sway: true })}
    <!-- 선돌들 -->
    <path class="bd-mid" d="M120 186 L119 160 C120 156 125 156 126 160 L127 186 Z M290 186 L289 166 C290 162 294 162 295 166 L296 186 Z"/>
    <!-- 오른쪽 단: 불과 연기 -->
    <path class="bd-near" d="M244 214 L246 198 L276 198 L278 214 Z"/>
    <g class="el-flames">${[0, 1, 2].map((i) => `<path style="--d:${f(i * 0.4)}s" d="M${252 + i * 8} 198 C${248 + i * 8} 190 ${254 + i * 8} 184 ${255 + i * 8} 178 C${260 + i * 8} 186 ${262 + i * 8} 192 ${258 + i * 8} 198 Z"/>`).join('')}</g>
    <circle class="bd-halo el-firehalo" cx="261" cy="190" r="26"/>
    ${smoke(262, 176, 1214, 6)}
    <!-- 가운데: 계단 받침 위 금송아지 -->
    <path class="bd-near" d="M164 214 L168 204 L232 204 L236 214 Z"/>
    <path class="bd-near" d="M174 204 L177 196 L223 196 L226 204 Z"/>
    <circle class="bd-halo el-calfhalo" cx="200" cy="168" r="44"/>
    ${calf(200, 196, 1.5)}
    <!-- 엎드린 무리 -->
    <g class="el-bowing">${Array.from({ length: 14 }, (_, i) => {
      const x = 70 + i * 20 + (i > 6 ? 20 : 0);
      return `<path style="--d:${f(i * 0.3)}s" d="M${x - 5} 236 C${x - 5} 230 ${x + 2} 228 ${x + 6} 231 L${x + 7} 236 Z"/>`;
    }).join('')}</g>
    ${ground(246)}
  </g>`;
}

// ── 가뭄의 땅 ────────────────────────────────────
function droughtArt(): string {
  const r = rng(1801);
  const cracks = Array.from({ length: 26 }, () => {
    const x = -60 + r() * 520;
    const y = 222 + r() * 30;
    return `M${f(x)} ${f(y)} l${f(6 + r() * 8)} ${f((r() - 0.5) * 4)} l${f(4 + r() * 6)} ${f(2 + r() * 3)} m${f(-6)} ${f(-3)} l${f(2)} ${f(-4)}`;
  }).join(' ');
  return `<g class="el el--drought">
    <circle class="el-sun" cx="300" cy="44" r="16"/><circle class="bd-halo el-sunhalo" cx="300" cy="44" r="58"/>
    ${ridge([[-W * 2, 160], [-200, 150], [-40, 160], [80, 142], [220, 156], [340, 138], [500, 152], [W * 3, 146]], 'bd-far')}
    <path class="el-haze" d="M-200 170 C0 166 200 174 600 168"/>
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 200 C-60 196 80 204 160 200 C240 196 340 204 ${W * 3} 198 L${W * 3} ${H} Z"/>
    <!-- 마른 시내 바닥 -->
    <path class="el-wadi" d="M-200 232 C-40 226 80 238 170 230 C240 224 300 236 420 228 C520 222 600 232 700 226"/>
    ${deadTree(96, 204, 46, 1802)}${deadTree(318, 202, 36, 1803)}${deadTree(-40, 206, 40, 1804)}${deadTree(470, 204, 44, 1805)}
    <g class="el-tufts">${Array.from({ length: 18 }, (_, i) => { const x = -80 + i * 32 + r() * 10; return `<path d="M${f(x)} 216 l-2 -5 M${f(x + 1)} 216 l0 -6 M${f(x + 2)} 216 l2 -4"/>`; }).join('')}</g>
    ${ground(246)}
    <path class="el-cracks" d="${cracks}"/>
  </g>`;
}

// ── 갈멜산 마루 ──────────────────────────────────
function carmelArt(state: 'ruin' | 'built' | 'wet' | 'burnt'): string {
  return `<g class="el el--carmel${state === 'burnt' ? ' is-burnt' : ''}">
    ${sea(150, -W * 2, 60, 1810)}
    ${ridge([[40, 150], [120, 132], [220, 112], [320, 104], [440, 118], [620, 110], [W * 3, 124]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 210 C-120 200 -20 186 60 176 C120 168 180 166 230 170 C300 176 380 182 ${W * 3} 186 L${W * 3} ${H} Z"/>
    ${tree(-20, 196, 34, 'bd-mid', 1813, { sway: true })}${tree(360, 190, 30, 'bd-mid', 1814, { sway: true })}
    <!-- 백성: 양옆 비탈에 -->
    ${folk(-120, 214, 60, 200, 22, 1.8, 1815, 'js-folk el-crowd')}${folk(300, 202, 520, 214, 24, 1.8, 1816, 'js-folk el-crowd')}
    <!-- 바알의 단 (왼쪽) -->
    ${baalAltar(112, 220, 1.05)}
    ${state === 'burnt' ? '' : folk(78, 228, 146, 228, 9, 2.1, 1817, 'js-folk el-baalfolk')}
    <!-- 여호와의 단 (가운데) -->
    ${twelve(200, 236, 1.5, state)}
    ${ground(248)}
  </g>`;
}

// ── 갈멜산 꼭대기: 바다를 향한 벼랑 ─────────────────
function summitArt(): string {
  return `<g class="el el--summit">
    ${sea(146, -W * 2, W * 3, 1820)}
    <path class="el-horizon" d="M${-W * 2} 146 H${W * 3}"/>
    ${mark('sea', 200, 143)}
    <!-- 앞쪽 벼랑 꼭대기 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 214 C-120 210 -20 206 60 204 C120 202 170 196 220 196 C280 196 330 202 380 206 C460 212 560 210 ${W * 3} 214 L${W * 3} ${H} Z"/>
    ${stone(66, 208, 22, 10, 1821, 'bd-mid', -6)}${stone(352, 210, 26, 12, 1822, 'bd-mid', 8)}
    ${tree(-10, 210, 30, 'bd-mid', 1823, { sway: true })}${tree(430, 212, 34, 'bd-mid', 1824, { sway: true })}
    ${ground(248)}
  </g>`;
}

// ── 광야의 로뎀나무 ───────────────────────────────
function broom(x: number, y: number, s: number): string {
  const r = rng(1901);
  const twigs = Array.from({ length: 34 }, (_, i) => {
    const a = -Math.PI / 2 + (i / 33 - 0.5) * 2.3;
    const l = (26 + r() * 16) * s;
    const bx = x + (r() - 0.5) * 6 * s;
    const by = y - 14 * s;
    return `M${f(bx)} ${f(by)} Q${f(bx + Math.cos(a) * l * 0.4)} ${f(by + Math.sin(a) * l * 0.6)} ${f(bx + Math.cos(a) * l)} ${f(by + Math.sin(a) * l * 0.9)}`;
  }).join(' ');
  return `<g class="el-broom">
    <path class="bd-near" d="M${f(x - 3 * s)} ${f(y)} C${f(x - 2 * s)} ${f(y - 8 * s)} ${f(x - 4 * s)} ${f(y - 12 * s)} ${f(x - 1 * s)} ${f(y - 16 * s)} L${f(x + 2 * s)} ${f(y - 15 * s)} C${f(x + 1 * s)} ${f(y - 10 * s)} ${f(x + 3 * s)} ${f(y - 6 * s)} ${f(x + 3 * s)} ${f(y)} Z"/>
    <path class="bd-near el-twigs" d="${twigs}" fill="none" stroke="currentColor" stroke-width="${f(0.9 * s)}" stroke-linecap="round"/>
    <ellipse class="bd-near el-crown" cx="${f(x)}" cy="${f(y - 38 * s)}" rx="${f(30 * s)}" ry="${f(14 * s)}"/>
    <ellipse class="el-shade" cx="${f(x + 4 * s)}" cy="${f(y + 1)}" rx="${f(40 * s)}" ry="${f(4 * s)}"/>
  </g>`;
}
function broomArt(bread: boolean): string {
  return `<g class="el el--broom">
    ${ridge([[-W * 2, 168], [-200, 158], [-40, 166], [100, 150], [220, 160], [360, 146], [520, 160], [W * 3, 152]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 208 C-60 200 60 212 150 206 C240 200 340 210 ${W * 3} 204 L${W * 3} ${H} Z"/>
    <path class="el-dune" d="M-100 222 C0 214 80 222 140 218 M260 220 C320 214 400 224 520 216"/>
    ${deadTree(-30, 208, 26, 1902)}${deadTree(440, 206, 22, 1903)}
    ${ground(248)}
    ${broom(196, 246, 1.5)}
    ${bread ? `<g class="el-bread">
      <ellipse class="el-hearth" cx="244" cy="244" rx="11" ry="2.6"/>
      ${[0, 1, 2, 3, 4].map((i) => `<circle class="el-coal" style="--d:${f(i * 0.5)}s" cx="${236 + i * 4}" cy="${243.2 - (i % 2)}" r="1.5"/>`).join('')}
      <ellipse class="el-cake" cx="244" cy="240.6" rx="7" ry="2.2"/>
      <circle class="bd-halo el-coalhalo" cx="244" cy="240" r="16"/>
      <path class="el-jar" d="M262 246 C259 242 259 236 262 233 L262 230 L267 230 L267 233 C270 236 270 242 267 246 Z"/>
    </g>` : ''}
  </g>`;
}

// ── 호렙, 굴 어귀 ─────────────────────────────────
function horebArt(): string {
  const r = rng(1911);
  return `<g class="el el--horeb">
    ${stars(50, 100, 1912)}
    ${ridge([[-W * 2, 140], [-220, 110], [-80, 128], [40, 92], [120, 70], [200, 40], [280, 66], [360, 96], [480, 118], [620, 104], [W * 3, 130]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 196 C-140 186 -20 170 60 150 C110 136 150 118 200 112 C250 118 290 136 340 150 C420 170 540 186 ${W * 3} 196 L${W * 3} ${H} Z"/>
    <path class="el-rockline" d="M90 150 l18 -8 M120 136 l14 6 M286 138 l-16 8 M310 152 l-12 -6 M70 172 l22 -4 M330 170 l-20 -4"/>
    <!-- 굴 어귀 -->
    <path class="el-cave" d="M164 236 C164 196 178 170 200 168 C222 170 236 196 236 236 Z"/>
    <path class="el-cavelip" d="M158 238 C158 194 176 162 200 160 C224 162 242 194 242 238" fill="none"/>
    ${mark('cave', 200, 200)}
    ${Array.from({ length: 6 }, (_, i) => stone(110 + i * 38 + (i > 2 ? 34 : 0), 238 - (i % 2) * 3, 16 + r() * 10, 9 + r() * 4, 1913 + i, 'bd-near', (r() - 0.5) * 20)).join('')}
    ${ground(248)}
  </g>`;
}

// ── 아벨므흘라의 밭 ───────────────────────────────
/** 소 한 겨리 (두 마리가 멍에로 나란히) — 옆모습, 왼쪽을 봄 */
function yoke(x: number, y: number, s: number, cls: string): string {
  const ox = (dx: number) => `<path d="M${f(x + dx - 10 * s)} ${f(y - 6 * s)} C${f(x + dx - 10 * s)} ${f(y - 10 * s)} ${f(x + dx + 6 * s)} ${f(y - 11 * s)} ${f(x + dx + 9 * s)} ${f(y - 8 * s)} L${f(x + dx + 9 * s)} ${f(y)} L${f(x + dx + 7 * s)} ${f(y)} L${f(x + dx + 6 * s)} ${f(y - 4 * s)} L${f(x + dx - 6 * s)} ${f(y - 4 * s)} L${f(x + dx - 7 * s)} ${f(y)} L${f(x + dx - 9 * s)} ${f(y)} L${f(x + dx - 9 * s)} ${f(y - 5 * s)} C${f(x + dx - 12 * s)} ${f(y - 6 * s)} ${f(x + dx - 14 * s)} ${f(y - 8 * s)} ${f(x + dx - 15 * s)} ${f(y - 6 * s)} L${f(x + dx - 13 * s)} ${f(y - 4 * s)} Z"/>`;
  return `<g class="${cls}">${ox(0)}${ox(3 * s)}
    <path d="M${f(x - 12 * s)} ${f(y - 10 * s)} L${f(x - 9 * s)} ${f(y - 10.6 * s)} L${f(x + 22 * s)} ${f(y - 2 * s)}" fill="none" stroke="currentColor" stroke-width="${f(0.9 * s)}"/>
    <path d="M${f(x + 22 * s)} ${f(y - 2 * s)} L${f(x + 25 * s)} ${f(y + 1)} M${f(x + 23 * s)} ${f(y - 6 * s)} L${f(x + 26 * s)} ${f(y - 9 * s)}" fill="none" stroke="currentColor" stroke-width="${f(0.9 * s)}"/>
  </g>`;
}
function plowArt(fire: boolean): string {
  const furrows = Array.from({ length: 12 }, (_, i) => `M${f(-200 + i * 70)} ${H} L${f(120 + i * 16)} 182`).join(' ');
  // 열두 겨리: 멀리서(작게) 가까이로(크게), 열둘째 겨리가 맨 앞
  const teams = Array.from({ length: 12 }, (_, i) => {
    const t = i / 11;
    const x = 60 + t * 250;
    const y = 184 + t * 42;
    return yoke(x, y, 0.35 + t * 0.9, i === 11 ? 'bd-near el-team' : 'bd-mid el-team');
  }).join('');
  return `<g class="el el--plow">
    ${ridge([[-W * 2, 150], [-200, 138], [-60, 146], [80, 128], [220, 140], [360, 124], [520, 140], [W * 3, 132]], 'bd-far')}
    <path class="bd-mid el-field" d="M${-W * 2} ${H} L${-W * 2} 186 C-60 180 100 182 200 180 C300 178 460 184 ${W * 3} 182 L${W * 3} ${H} Z"/>
    <path class="el-furrow" d="${furrows}"/>
    ${tree(-30, 186, 30, 'bd-mid', 1921, { sway: true })}${tree(460, 184, 36, 'bd-mid', 1922, { sway: true })}
    ${fire ? '' : teams}
    ${fire ? `<g class="el-feast">
      ${folk(110, 232, 170, 230, 6, 2.6, 1923, 'js-folk el-crowd')}${folk(232, 230, 296, 232, 6, 2.6, 1924, 'js-folk el-crowd')}
      <path class="bd-near" d="M180 236 L186 226 L190 232 L198 222 L204 232 L212 224 L216 236 Z"/>
      <g class="el-flames el-flames--big">${[0, 1, 2, 3].map((i) => `<path style="--d:${f(i * 0.35)}s" d="M${184 + i * 9} 230 C${178 + i * 9} 218 ${186 + i * 9} 208 ${188 + i * 9} 198 C${194 + i * 9} 210 ${198 + i * 9} 220 ${192 + i * 9} 230 Z"/>`).join('')}</g>
      <circle class="bd-halo el-firehalo" cx="198" cy="212" r="40"/>
      <path class="bd-near" d="M186 212 C186 220 214 220 214 212 L212 206 L188 206 Z"/>
      ${smoke(200, 196, 1925, 6)}
    </g>` : ''}
    ${ground(250)}
  </g>`;
}

// ── 나봇의 포도원 ─────────────────────────────────
function vineyardArt(): string {
  return `<g class="el el--vineyard">
    ${ridge([[-W * 2, 140], [-160, 128], [-20, 136], [110, 120], [240, 132], [360, 118], [520, 132], [W * 3, 126]], 'bd-far')}
    <!-- 오른쪽: 아합의 궁 담과 망대, 창 (21:1 "아합의 궁에서 가깝더니") -->
    <g class="bd-mid">
      <rect x="300" y="110" width="240" height="96"/>
      ${Array.from({ length: 12 }, (_, i) => `<rect x="${300 + i * 20}" y="104" width="10" height="7"/>`).join('')}
      <rect x="312" y="84" width="34" height="122"/>
      ${Array.from({ length: 3 }, (_, i) => `<rect x="${312 + i * 12}" y="78" width="7" height="7"/>`).join('')}
    </g>
    <rect class="el-window" x="324" y="104" width="6" height="12"/>
    <rect class="el-window" x="380" y="140" width="6" height="10"/>
    <!-- 비탈의 포도원 -->
    <path class="bd-mid el-slope" d="M${-W * 2} ${H} L${-W * 2} 180 C-80 172 60 166 160 170 C230 172 290 182 330 196 L${W * 3} 206 L${W * 3} ${H} Z"/>
    ${vineRow(186, -60, 290, 7, 2101, 'bd-mid el-vines')}
    ${vineRow(206, -80, 320, 9, 2102, 'bd-mid el-vines')}
    ${vineRow(230, -100, 360, 11, 2103, 'bd-near el-vines')}
    <!-- 망대 (포도원 지키는 돌 망대) -->
    <path class="bd-mid" d="M78 186 L80 148 C86 142 100 142 106 148 L108 186 Z"/>
    <rect class="el-window" x="90" y="156" width="4" height="7"/>
    <!-- 돌담 -->
    <path class="bd-near" d="M${-W * 2} 244 L${-W * 2} 238 C-100 236 100 240 190 238 C260 236 340 240 ${W * 3} 237 L${W * 3} 244 Z"/>
    <path class="el-rockline" d="M-40 240 v4 M0 240 v4 M40 240 v4 M80 240 v4 M120 240 v4 M160 239 v4 M240 238 v4 M280 239 v4 M320 239 v4 M360 239 v4"/>
    ${ground(250)}
  </g>`;
}

// ── 이스르엘 궁의 침실 ─────────────────────────────
function chamberArt(): string {
  return `<g class="el el--chamber">
    <rect class="el-wall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <path class="el-beam" d="M${-W * 2} 22 H${W * 3} M${-W * 2} 30 H${W * 3}"/>
    <!-- 격자창: 밖으로 포도원 -->
    <rect class="el-winlight" x="246" y="64" width="64" height="78"/>
    <g class="el-vinesout">${vineRow(132, 250, 306, 5, 2111, 'bd-far')}</g>
    <path class="el-lattice" d="M246 64 L310 142 M262 64 L310 122 M278 64 L310 102 M294 64 L310 82 M246 84 L304 142 M246 104 L288 142 M246 124 L272 142 M310 64 L246 142 M294 64 L246 122 M278 64 L246 102 M262 64 L246 82 M310 84 L252 142 M310 104 L268 142 M310 124 L284 142"/>
    <rect class="el-frame" x="242" y="60" width="72" height="86" fill="none"/>
    <path class="el-beam-light" d="M246 142 L310 142 L300 248 L150 248 Z"/>
    <!-- 상아 박은 침상 (22:39 "상아궁") -->
    <g class="el-couch">
      <path class="bd-near" d="M96 212 L98 190 C98 182 106 178 112 182 L116 196 L232 196 L236 212 Z"/>
      <path class="el-ivory" d="M100 198 L114 198 L114 206 L100 206 Z M124 202 L224 202 L224 208 L124 208 Z"/>
      <path class="bd-near" d="M100 212 L100 236 L106 236 L106 212 Z M226 212 L226 236 L232 236 L232 212 Z"/>
      <ellipse class="el-cushion" cx="122" cy="192" rx="12" ry="5"/>
    </g>
    <!-- 등잔 -->
    <path class="bd-near" d="M58 248 L60 200 L64 200 L66 248 Z M52 200 L72 200 L70 196 L54 196 Z"/>
    <path class="el-lampflame" d="M62 196 C60 192 62 188 62 186 C64 189 65 192 62 196 Z"/>
    <circle class="bd-halo el-lamphalo" cx="62" cy="190" r="22"/>
    <path class="el-floor" d="M${-W * 2} 248 H${W * 3} L${W * 3} ${H} L${-W * 2} ${H} Z"/>
  </g>`;
}

// ── 이스르엘 성문 광장 ─────────────────────────────
function gateArt(empty: boolean): string {
  const r = rng(2121);
  return `<g class="el el--gate${empty ? ' is-empty' : ''}">
    ${ridge([[-W * 2, 132], [-120, 120], [40, 130], [160, 116], [300, 128], [460, 114], [W * 3, 124]], 'bd-far')}
    <!-- 성벽과 성문 -->
    <path class="bd-mid" d="M${-W * 2} 200 L${-W * 2} 120 L${W * 3} 120 L${W * 3} 200 Z"/>
    ${Array.from({ length: 40 }, (_, i) => `<rect class="bd-mid" x="${-300 + i * 24}" y="113" width="12" height="8"/>`).join('')}
    <path class="el-rockline" d="M${-W * 2} 140 H${W * 3} M${-W * 2} 162 H${W * 3} M${-W * 2} 184 H${W * 3}"/>
    <g class="bd-mid"><rect x="150" y="92" width="100" height="108"/>${[0, 1, 2, 3].map((i) => `<rect x="${152 + i * 26}" y="85" width="14" height="9"/>`).join('')}</g>
    <path class="el-gatemouth" d="M180 200 L180 150 C180 134 220 134 220 150 L220 200 Z"/>
    <path class="el-road" d="M200 200 C204 220 186 236 200 ${H}"/>
    <!-- 장로들의 돌 자리 (양옆) -->
    <path class="bd-near" d="M60 226 L62 216 L140 216 L142 226 Z M258 226 L260 216 L338 216 L340 226 Z"/>
    ${empty ? '' : folk(66, 214, 136, 214, 6, 2.6, 2122, 'js-folk el-elders') + folk(264, 214, 334, 214, 6, 2.6, 2123, 'js-folk el-elders')}
    ${empty ? '' : folk(-120, 236, 40, 232, 14, 2.4, 2124, 'js-folk el-crowd') + folk(360, 232, 520, 236, 14, 2.4, 2125, 'js-folk el-crowd')}
    <!-- 가운데 높은 자리 -->
    <path class="bd-near el-highseat" d="M178 238 L182 214 L218 214 L222 238 Z M186 214 L188 196 L192 196 L192 214 Z"/>
    ${empty ? `<g class="el-strewn">${Array.from({ length: 5 }, (_, i) => stone(186 + i * 7 + r() * 4, 206 - r() * 3, 4 + r() * 2, 2.6 + r(), 2126 + i, 'bd-near', r() * 40)).join('')}</g>` : ''}
    ${ground(248)}
  </g>`;
}

export function elijahArt(art: ElijahArt): string {
  switch (art) {
    case 'el-shechem': return shechemArt();
    case 'el-bethel-calf': return bethelArt();
    case 'el-drought': return droughtArt();
    case 'el-carmel': return carmelArt('ruin');
    case 'el-carmel-altar': return carmelArt('built');
    case 'el-carmel-wet': return carmelArt('wet');
    case 'el-carmel-burnt': return carmelArt('burnt');
    case 'el-summit': return summitArt();
    case 'el-broom': return broomArt(false);
    case 'el-broom-bread': return broomArt(true);
    case 'el-horeb': return horebArt();
    case 'el-plow': return plowArt(false);
    case 'el-plow-fire': return plowArt(true);
    case 'el-vineyard': return vineyardArt();
    case 'el-chamber': return chamberArt();
    case 'el-gate': return gateArt(false);
    case 'el-gate-empty': return gateArt(true);
  }
}

// ── 효과 ───────────────────────────────────────
function layerOf(scene: HTMLElement, cls: string, html: string, life: number, out: number, behind = false): HTMLElement {
  const layer = document.createElement('div');
  layer.className = cls;
  layer.innerHTML = html;
  const bd = scene.querySelector('.scene__backdrop');
  if (behind && bd) bd.after(layer);
  else scene.append(layer);
  setTimeout(() => layer.classList.add('is-out'), life - out);
  setTimeout(() => layer.remove(), life);
  return layer;
}

/** 배경 속 표지의 가운데 (scene 기준). 없으면 비율 자리 */
function markAt(scene: HTMLElement, name: string, fx: number, fy: number) {
  const b = scene.getBoundingClientRect();
  const n = scene.querySelector(`.scene__backdrop .backdrop:last-child [data-mark="${name}"]`);
  const a = n?.getBoundingClientRect();
  if (a && (a.width || a.height)) return { x: a.left - b.left + a.width / 2, y: a.top - b.top + a.height / 2, w: b.width, h: b.height };
  return { x: b.width * fx, y: b.height * fy, w: b.width, h: b.height };
}

/** 무대 위 인물의 그림 상자 (scene 기준) */
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
  if (!a || !a.width) return { x: b.width / 2, top: b.height * 0.4, h: b.height * 0.5, w: 80 };
  return { x: a.left - b.left + a.width / 2, top: a.top - b.top, h: a.height, w: a.width };
}

function quake(scene: HTMLElement, cls = 'el-quake', ms = 900): void {
  scene.classList.remove(cls);
  void scene.offsetWidth;
  scene.classList.add(cls);
  setTimeout(() => scene.classList.remove(cls), ms);
}

/** rift: 나라가 둘로 갈라짐 (왕상 12:16-20) */
export function playRift(scene: HTMLElement, rm: boolean): void {
  layerOf(scene, `fx-rift${rm ? ' is-rm' : ''}`,
    `<i class="fx-rift__half is-l"></i><i class="fx-rift__half is-r"></i>
     <svg class="fx-rift__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
       <path class="fx-rift__glow" d="M50 0 L47.6 9 L52.4 17 L47 27 L51.6 36 L48 46 L53 55 L47.4 65 L52 74 L48.4 84 L51 92 L49.4 100"/>
       <path class="fx-rift__crack" d="M50 0 L47.6 9 L52.4 17 L47 27 L51.6 36 L48 46 L53 55 L47.4 65 L52 74 L48.4 84 L51 92 L49.4 100"/>
     </svg>
     <span class="fx-rift__label is-l"><b>열 지파</b><small>여로보암</small></span>
     <span class="fx-rift__label is-r"><b>유다</b><small>르호보암</small></span>`,
    rm ? 2600 : 5200, 1200);
  if (!rm) setTimeout(() => quake(scene), 1300);
}

/** no-answer: 아침부터 저녁까지 "바알이여 응답하소서" — 해가 기울고, 대답은 없다 (왕상 18:26-29) */
export function playNoAnswer(scene: HTMLElement, rm: boolean): void {
  const words = ['바알이여', '응답하소서', '바알이여', '우리에게 응답하소서', '바알이여', '응답하소서', '바알이여', '바알이여'];
  const calls = rm ? '' : words.map((w, i) =>
    `<span class="fx-noanswer__call" style="--i:${i}; --x:${f(14 + ((i * 37) % 34))}%; --y:${f(48 + ((i * 23) % 22))}%">${w}</span>`).join('');
  layerOf(scene, `fx-noanswer${rm ? ' is-rm' : ''}`,
    `<i class="fx-noanswer__sun"></i>${calls}<span class="fx-noanswer__hush">……</span>`,
    rm ? 2400 : 9600, 1600);
}

/** carmel-fire: 여호와의 불이 내려 번제물과 나무와 돌과 흙을 태우고 도랑의 물을 핥음 (왕상 18:38) */
export function playCarmelFire(scene: HTMLElement, rm: boolean): void {
  const a = markAt(scene, 'altar', 0.5, 0.72);
  const flames = rm ? '' : Array.from({ length: 9 }, (_, i) =>
    `<i class="fx-cfire__flame" style="--i:${i}; --o:${f((i - 4) * 10)}px"></i>`).join('');
  const steam = rm ? '' : Array.from({ length: 10 }, (_, i) =>
    `<i class="fx-cfire__steam" style="--i:${i}; --o:${f((i - 4.5) * 16)}px"></i>`).join('');
  const embers = rm ? '' : Array.from({ length: 14 }, (_, i) =>
    `<b class="fx-cfire__ember" style="--i:${i}; --o:${f((((i * 41) % 13) - 6) * 7)}px"></b>`).join('');
  layerOf(scene, `fx-cfire${rm ? ' is-rm' : ''}`,
    `<i class="fx-cfire__flash"></i>
     <div class="fx-cfire__at" style="--x:${f(a.x)}px; --y:${f(a.y)}px">
       <i class="fx-cfire__column"></i><i class="fx-cfire__glow"></i>${flames}${steam}${embers}
     </div>`,
    rm ? 2600 : 7600, 1800);
  if (!rm) setTimeout(() => quake(scene), 520);
}

/** small-cloud: 바다에서 사람의 손만한 작은 구름이 일어나고, 하늘이 캄캄해짐 (왕상 18:44-45) */
export function playSmallCloud(scene: HTMLElement, rm: boolean): void {
  const s = markAt(scene, 'sea', 0.5, 0.5);
  const swell = rm ? '' : Array.from({ length: 9 }, (_, i) =>
    `<i class="fx-cloud__puff" style="--i:${i}; --o:${f((((i * 53) % 9) - 4) * 0.12)}; --h:${f(((i * 29) % 7) * 0.025)}"></i>`).join('');
  layerOf(scene, `fx-cloud${rm ? ' is-rm' : ''}`,
    `<i class="fx-cloud__dark"></i>${swell}
     <div class="fx-cloud__at" style="--x:${f(s.x)}px; --y:${f(s.y)}px"><i class="fx-cloud__hand"></i></div>`,
    rm ? 2600 : 9400, 1800);
}

/** great-wind: 크고 강한 바람이 산을 가르고 바위를 부숨 (왕상 19:11) */
export function playGreatWind(scene: HTMLElement, rm: boolean): void {
  const streaks = Array.from({ length: rm ? 4 : 16 }, (_, i) =>
    `<i class="fx-wind__streak" style="--i:${i}; --y:${f(8 + ((i * 47) % 80))}%; --l:${f(30 + ((i * 31) % 50))}%"></i>`).join('');
  const chips = rm ? '' : Array.from({ length: 12 }, (_, i) =>
    `<b class="fx-wind__chip" style="--i:${i}; --y:${f(30 + ((i * 37) % 50))}%; --r:${f(((i * 71) % 360))}deg"></b>`).join('');
  layerOf(scene, `fx-wind${rm ? ' is-rm' : ''}`, `${streaks}${chips}`, rm ? 2000 : 5200, 1400);
  if (!rm) {
    scene.classList.add('el-buffet');
    setTimeout(() => scene.classList.remove('el-buffet'), 4200);
  }
}

/** earthquake: 지진 (왕상 19:11) — 무대가 세 번 크게 흔들리고 땅에 금 */
export function playEarthquake(scene: HTMLElement, rm: boolean): void {
  const dust = rm ? '' : Array.from({ length: 10 }, (_, i) =>
    `<i class="fx-quake__dust" style="--i:${i}; --x:${f(6 + i * 9.6)}%"></i>`).join('');
  layerOf(scene, `fx-quake${rm ? ' is-rm' : ''}`,
    `<svg class="fx-quake__svg" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
       <path class="fx-quake__crack" d="M0 12 L9 10 L15 13 L24 9 L31 12 L40 8 L47 13 L55 10 L63 14 L70 9 L79 12 L86 9 L93 12 L100 10"/>
     </svg>${dust}`,
    rm ? 2000 : 4600, 1400);
  if (rm) return;
  quake(scene, 'el-quake-big', 1000);
  setTimeout(() => quake(scene, 'el-quake-big', 1000), 1200);
  setTimeout(() => quake(scene, 'el-quake', 900), 2500);
}

/** mount-fire: 지진 후에 불 (왕상 19:12) — 인물 뒤 산비탈을 따라 불길이 번져 지나감 */
export function playMountFire(scene: HTMLElement, rm: boolean): void {
  const tongues = rm ? '' : Array.from({ length: 24 }, (_, i) =>
    `<i class="fx-mfire__tongue" style="--i:${i}; --x:${f(-3 + i * 4.4)}%; --s:${f(0.6 + ((i * 37) % 9) * 0.1)}"></i>`).join('');
  layerOf(scene, `fx-mfire${rm ? ' is-rm' : ''}`, `<i class="fx-mfire__glow"></i>${tongues}`, rm ? 2200 : 5200, 1600, true);
}

/** still-voice: 불 후에 세미한 소리 (왕상 19:12) — 그리지 않는다. 잦아듦과 가는 빛, 아주 작은 글자 */
export function playStillVoice(scene: HTMLElement, rm: boolean): void {
  layerOf(scene, `fx-still${rm ? ' is-rm' : ''}`,
    `<i class="fx-still__hush"></i>
     <i class="fx-still__line"></i>
     <i class="fx-still__ring"></i>
     <span class="fx-still__word">세미한 소리<small lang="he" dir="rtl">קוֹל דְּמָמָה דַקָּה</small></span>`,
    rm ? 3000 : 8600, 2000);
}

/** angel-touch: 천사가 어루만짐 (왕상 19:5, 7) — 누운 사람 위로 따뜻한 빛. 천사는 그리지 않는다 */
export function playAngelTouch(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const t = actorBox(scene, who ?? 'elijah', 'center');
  const motes = rm ? '' : Array.from({ length: 8 }, (_, i) =>
    `<b class="fx-touch__mote" style="--i:${i}; --o:${f((i - 3.5) * 9)}px"></b>`).join('');
  layerOf(scene, `fx-touch${rm ? ' is-rm' : ''}`,
    `<div class="fx-touch__at" style="--x:${f(t.x)}px; --y:${f(t.top + t.h * 0.7)}px">
       <i class="fx-touch__shaft"></i><i class="fx-touch__pool"></i><i class="fx-touch__ring"></i>${motes}
     </div>`,
    rm ? 2200 : 4800, 1500);
}

/** mantle-throw: 겉옷을 그의 위에 던짐 (왕상 19:19) */
export function playMantleThrow(scene: HTMLElement, who: string | undefined, to: string | undefined, rm: boolean): void {
  const a = actorBox(scene, who ?? 'elijah', 'left');
  const b = actorBox(scene, to ?? 'elisha', 'right');
  const sx = a.x;
  const sy = a.top + a.h * 0.26;
  const dx = b.x - sx;
  const dy = b.top + b.h * 0.24 - sy;
  const lift = Math.max(70, Math.abs(dx) * 0.45);
  layerOf(scene, `fx-mthrow${rm ? ' is-rm' : ''}`,
    `<div class="fx-mthrow__at" style="--x:${f(sx)}px; --y:${f(sy)}px; offset-path: path('M0 0 Q${f(dx / 2)} ${f(Math.min(0, dy) - lift)} ${f(dx)} ${f(dy)}');">
       <svg class="fx-mthrow__cloak" viewBox="-30 -20 60 44" aria-hidden="true">
         <path d="M-26 -12 C-14 -18 14 -18 26 -12 C24 0 26 12 22 20 C12 16 6 22 0 18 C-6 22 -12 16 -22 20 C-26 12 -24 0 -26 -12 Z"/>
         <path class="fx-mthrow__fringe" d="M-22 20 C-12 16 -6 22 0 18 C6 22 12 16 22 20" fill="none"/>
       </svg>
     </div>
     <div class="fx-mthrow__land" style="--x:${f(b.x)}px; --y:${f(b.top + b.h * 0.24)}px"><i></i></div>`,
    rm ? 2000 : 4200, 1000);
}
