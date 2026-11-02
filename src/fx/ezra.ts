// 10막 A급 — 에스라 (스 1 「고레스의 조서」 · 스 3 「두 소리」)의 전용 배경과 효과.
// 에스라 B급(스 2, 4, 5–6, 7–8, 9–10)과 느헤미야에서도 재사용하도록 범용으로 그림.
// 같은 종이 오려낸 그림자극 말투. 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - ez-babylon-canal  : 바벨론 강가. 넓은 운하와 버드나무(가지에 걸린 수금 하나 — 시 137:2), 대추야자, 둥근 갈대배,
//                        지평선의 성벽과 계단 탑(지구라트) 실루엣. 포로의 땅 · 출발 장면
//  - ez-cyrus-court    : 바사(페르시아) 왕궁의 큰 홀. 가늘고 높은 홈 파인 기둥 위에 황소 두 마리가 등을 맞댄 기둥머리,
//                        계단 모양 성가퀴, 조공 행렬이 새겨진 띠, 가운데 멀리 차일 아래 왕좌 단 (7막·9막 궁과 다르게)
//  - ez-caravan        : 귀환 행렬. 지평선까지 굽이진 길 위 사람·나귀·낙타의 줄, 궤짝 실은 짐승, 오아시스 야자, 흙먼지
//  - ez-jerusalem-ruin : 폐허 예루살렘. 불탄 성문(검게 탄 망대 둘·내려앉은 문), 이 빠진 성벽, 잡초와 가시덤불,
//                        언덕 위 성전 터의 흩어진 큰 돌무더기, 뒤로 감람산
//  - ez-altar          : 같은 폐허 한가운데 다듬지 않은 돌로 다시 쌓은 제단과 불, 곧게 오르는 연기 기둥 (스 3:2-3)
//  - ez-foundation     : 성전 터에 줄 친 기초석(위에서 비스듬히 본 네모), 말뚝과 측량줄, 레바논 백향목 더미, 일꾼들,
//                        기초 가장자리의 나팔 든 제사장과 제금 든 레위인 실루엣, 왼쪽에 연기 나는 제단 (스 3:7-10)
//  - ez-temple-built   : 다시 지은 둘째 성전. 첫 성전보다 수수한 돌집(금도 놋 기둥도 없음), 앞에 제단과 연기, 성벽은 아직 무너진 채 (스 6:15)
// 효과:
//  - decree     : 조서 (스 1:1-4). 무대 위에 두루마리가 좌우로 펼쳐지고 글줄이 한 줄씩 켜진 뒤 붉은 인장이 쾅 찍히고,
//                 작은 두루마리 사본들이 사방 가장자리로 날아감 = "온 나라에 공포도 하고" (약 9초)
//  - vessels    : 성전 그릇을 세어 줌 (스 1:7-11). 위에 장부가 펴지고 금반 30 · 은반 1,000 · 칼 29 · 금대접 30 · 은대접 410 ·
//                 기타 기명 1,000이 한 줄씩, 그동안 금·은빛 그릇들이 who(주는 사람) → to(받는 사람)로 건너감,
//                 끝에 밑줄과 "도합 5,400" (본문 숫자 그대로, 약 10초)
//  - two-sounds : 두 소리 (스 3:12-13). 무대 왼쪽(who 또는 왼쪽)에서 금빛 '즐거이 부르는 소리' 고리, 오른쪽(to 또는 오른쪽)에서
//                 푸른 '통곡하는 소리' 고리가 퍼져 가운데서 겹치고, 색이 섞여 하나가 된 큰 고리가 화면 밖 멀리까지 퍼짐,
//                 "분변치 못하였느니라" (약 12초)
// 하나님은 그리지 않는다.
import { H, W, palm, reeds, rng, smoke } from './backdrop';
import { folk, ground, ridge } from './joshua';

export type EzraArt =
  | 'ez-babylon-canal' | 'ez-cyrus-court' | 'ez-caravan' | 'ez-jerusalem-ruin' | 'ez-altar' | 'ez-foundation' | 'ez-temple-built';

const f = (n: number) => n.toFixed(1);

// ── 작은 조각들 ─────────────────────────────────
/** 버드나무: 굽은 줄기, 늘어진 가지들. lyre면 가지 하나에 수금을 건다 (시 137:2) */
function willow(x: number, base: number, h: number, lean: number, seed: number, lyre = false): string {
  const r = rng(seed);
  const tx = x + lean;
  const ty = base - h;
  const trunk = `<path class="bd-near" d="M${f(x - 4)} ${base} C${f(x - 3)} ${f(base - h * 0.4)} ${f(tx - 6)} ${f(ty + h * 0.3)} ${f(tx - 2)} ${f(ty)} L${f(tx + 3)} ${f(ty + 2)} C${f(tx)} ${f(ty + h * 0.32)} ${f(x + 3)} ${f(base - h * 0.4)} ${f(x + 5)} ${base} Z"/>`;
  const strands = Array.from({ length: 22 }, (_, i) => {
    const sx = tx - h * 0.5 + (i / 21) * h * 1.0 + (r() - 0.5) * 6;
    const sy = ty - 4 + Math.abs(sx - tx) * 0.22 + r() * 4;
    const len = h * (0.45 + r() * 0.35);
    return `<path style="--d:${f(r() * 5)}s" d="M${f(tx + (sx - tx) * 0.2)} ${f(ty)} Q${f(sx)} ${f(sy - 6)} ${f(sx + (r() - 0.5) * 4)} ${f(sy + len)}"/>`;
  }).join('');
  const crown = Array.from({ length: 7 }, (_, i) => `<ellipse cx="${f(tx - h * 0.36 + i * h * 0.12)}" cy="${f(ty - 2 + (i % 2) * 4)}" rx="${f(h * 0.13)}" ry="${f(h * 0.07)}"/>`).join('');
  const harp = lyre
    ? `<g class="ez-lyre" transform="translate(${f(tx + h * 0.28)} ${f(ty + h * 0.2)})">
        <path class="ez-lyre__string" d="M0 -6 L0 0"/>
        <path d="M-5 0 C-7 6 -6 13 -4 16 L4 16 C6 13 7 6 5 0 L3.4 0 C4.6 6 4 11 2.6 13.4 L-2.6 13.4 C-4 11 -4.6 6 -3.4 0 Z"/>
        <rect x="-5" y="-0.6" width="10" height="1.6"/>
        <path class="ez-lyre__string" d="M-2 1 L-1.6 13 M0 1 L0 13 M2 1 L1.6 13"/>
      </g>`
    : '';
  return `<g class="ez-willow">${trunk}<g class="bd-near">${crown}</g><g class="ez-strands">${strands}</g>${harp}</g>`;
}

/** 계단 탑 (지구라트) — 지평선의 실루엣 */
function ziggurat(cx: number, base: number, s: number, cls = 'bd-far'): string {
  const tiers = [[60, 14], [46, 12], [34, 11], [22, 10]];
  let y = base;
  const blocks = tiers.map(([w, h]) => {
    y -= h * s;
    return `<rect x="${f(cx - w * s)}" y="${f(y)}" width="${f(w * 2 * s)}" height="${f(h * s + 0.4)}"/>`;
  }).join('');
  const shrine = `<rect x="${f(cx - 9 * s)}" y="${f(y - 9 * s)}" width="${f(18 * s)}" height="${f(9 * s + 0.4)}"/>`;
  const stair = `<path class="ez-stair" d="M${f(cx - 4 * s)} ${base} L${f(cx - 2 * s)} ${f(base - 36 * s)} L${f(cx + 2 * s)} ${f(base - 36 * s)} L${f(cx + 4 * s)} ${base} Z"/>`;
  return `<g class="${cls}">${blocks}${shrine}</g>${stair}`;
}

/** 무너진 성벽 한 토막: 위가 들쭉날쭉하고 군데군데 이가 빠짐 */
function brokenWall(x0: number, x1: number, top: number, base: number, seed: number, cls = 'bd-mid'): string {
  const r = rng(seed);
  let d = `M${x0} ${base} L${x0} ${f(top + r() * 10)}`;
  for (let x = x0 + 8; x < x1; x += 8 + r() * 10) {
    const gap = r() < 0.18;
    d += ` L${f(x)} ${f(gap ? top + (base - top) * (0.5 + r() * 0.3) : top + r() * 12)}`;
  }
  d += ` L${x1} ${f(top + r() * 10)} L${x1} ${base} Z`;
  const rows = [0.4, 0.72].map((t) => `M${x0} ${f(top + (base - top) * t)} H${x1}`).join(' ');
  return `<path class="${cls}" d="${d}"/><path class="ez-courses" d="${rows}"/>`;
}

/** 흩어진 돌 덩이들 */
function rubble(x0: number, x1: number, y: number, n: number, smax: number, seed: number, cls = 'bd-near'): string {
  const r = rng(seed);
  return `<g class="${cls}">${Array.from({ length: n }, () => {
    const x = x0 + r() * (x1 - x0);
    const s = smax * (0.4 + r() * 0.6);
    return `<rect x="${f(x)}" y="${f(y - s * 0.7 + r() * 3)}" width="${f(s)}" height="${f(s * 0.7)}" rx="0.8" transform="rotate(${f((r() - 0.5) * 30)} ${f(x)} ${f(y)})"/>`;
  }).join('')}</g>`;
}

/** 잡초·가시덤불 */
function weeds(x0: number, x1: number, y: number, n: number, seed: number): string {
  const r = rng(seed);
  return `<g class="ez-weeds">${Array.from({ length: n }, () => {
    const x = x0 + r() * (x1 - x0);
    const h = 4 + r() * 7;
    return `<path style="--d:${f(r() * 4)}s" d="M${f(x)} ${y} l${f(-2 - r() * 2)} ${f(-h)} M${f(x)} ${y} l${f((r() - 0.5) * 2)} ${f(-h * 1.2)} M${f(x)} ${y} l${f(2 + r() * 2)} ${f(-h * 0.9)}"/>`;
  }).join('')}</g>`;
}

/** 불탄 성문: 검게 탄 망대 둘, 내려앉은 아치, 쓰러진 문짝 */
function burntGate(cx: number, base: number, s: number): string {
  const X = (x: number) => f(cx + x * s);
  const Y = (y: number) => f(base - y * s);
  return `<g class="ez-gate">
    <path class="ez-char" d="M${X(-40)} ${Y(0)} L${X(-40)} ${Y(66)} L${X(-34)} ${Y(70)} L${X(-28)} ${Y(64)} L${X(-20)} ${Y(72)} L${X(-16)} ${Y(60)} L${X(-16)} ${Y(0)} Z"/>
    <path class="ez-char" d="M${X(16)} ${Y(0)} L${X(16)} ${Y(56)} L${X(22)} ${Y(62)} L${X(30)} ${Y(54)} L${X(36)} ${Y(64)} L${X(40)} ${Y(58)} L${X(40)} ${Y(0)} Z"/>
    <path class="ez-char" d="M${X(-16)} ${Y(46)} Q${X(-10)} ${Y(56)} ${X(-4)} ${Y(52)} L${X(-6)} ${Y(44)} Z"/>
    <path class="ez-scorch" d="M${X(-36)} ${Y(56)} L${X(-30)} ${Y(20)} M${X(-22)} ${Y(60)} L${X(-24)} ${Y(30)} M${X(24)} ${Y(50)} L${X(28)} ${Y(14)} M${X(34)} ${Y(52)} L${X(32)} ${Y(30)}"/>
    <path class="ez-door" d="M${X(-14)} ${Y(0)} L${X(-12)} ${Y(4)} L${X(14)} ${Y(12)} L${X(16)} ${Y(8)} Z"/>
    <path class="ez-doorbands" d="M${X(-6)} ${Y(3)} L${X(-5)} ${Y(7)} M${X(4)} ${Y(6)} L${X(5)} ${Y(10)}"/>
  </g>`;
}

/** 성전 터 언덕 (오른쪽 뒤가 아니라 가운데 뒤): 위에 무엇을 얹을지는 top */
function templeMount(top: string): string {
  return `<path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 190 C-40 186 60 176 120 164 C150 158 250 158 280 164 C340 176 440 186 ${W * 3} 190 L${W * 3} ${H} Z"/>
    ${top}`;
}

/** 감람산과 먼 산줄기 */
function farHills(): string {
  return `${ridge([[-W * 2, 132], [-80, 124], [60, 134], [180, 118], [320, 128], [460, 120], [W * 3, 130]], 'bd-far')}`;
}

/** 다듬지 않은 돌로 쌓은 제단 (출 20:25), 위에 불 */
function stoneAltar(cx: number, base: number, s: number, seed: number, lit = true): string {
  const r = rng(seed);
  const stones: string[] = [];
  const rows = 4;
  for (let row = 0; row < rows; row++) {
    const w = (40 - row * 3) * s;
    const n = 5 - (row % 2);
    for (let i = 0; i < n; i++) {
      const sw = (w * 2) / n;
      const x = cx - w + i * sw + (r() - 0.5) * 1.6;
      const y = base - (row + 1) * 8 * s;
      stones.push(`<path d="M${f(x + 1)} ${f(y + 8 * s)} L${f(x + 0.4)} ${f(y + 2 + r() * 2)} Q${f(x + sw * 0.5)} ${f(y - r() * 1.6)} ${f(x + sw - 0.6)} ${f(y + 1 + r() * 2)} L${f(x + sw - 1)} ${f(y + 8 * s)} Z"/>`);
    }
  }
  const topY = base - rows * 8 * s;
  const flames = lit
    ? `<circle class="bd-halo ez-altarhalo" cx="${cx}" cy="${f(topY - 8 * s)}" r="${f(40 * s)}"/>
       <g class="ez-flames">${[-14, -6, 2, 10].map((d, i) => `<path style="--d:${f(i * 0.31)}s" d="M${f(cx + d * s - 5 * s)} ${f(topY)} C${f(cx + d * s - 6 * s)} ${f(topY - 10 * s)} ${f(cx + d * s)} ${f(topY - 12 * s)} ${f(cx + d * s + 1 * s)} ${f(topY - (20 + (i % 2) * 6) * s)} C${f(cx + d * s + 3 * s)} ${f(topY - 11 * s)} ${f(cx + d * s + 7 * s)} ${f(topY - 8 * s)} ${f(cx + d * s + 6 * s)} ${f(topY)} Z"/>`).join('')}</g>
       ${smoke(cx, topY - 24 * s, seed + 1, 7)}`
    : '';
  return `<g class="ez-altar">
    <g class="ez-altarstone">${stones.join('')}</g>
    <path class="ez-altarlines" d="M${f(cx - 36 * s)} ${f(base - 16 * s)} H${f(cx + 36 * s)} M${f(cx - 33 * s)} ${f(base - 24 * s)} H${f(cx + 33 * s)}"/>
    ${flames}
  </g>`;
}

/** 나팔 든 제사장 / 제금 든 레위인 (작은 실루엣) */
function musician(x: number, base: number, s: number, kind: 'trumpet' | 'cymbal', i: number): string {
  const body = `<path d="M${f(x - 2.4 * s)} ${base} L${f(x - 1.8 * s)} ${f(base - 9 * s)} Q${f(x)} ${f(base - 11 * s)} ${f(x + 1.8 * s)} ${f(base - 9 * s)} L${f(x + 2.4 * s)} ${base} Z"/>
    <circle cx="${f(x + 0.3 * s)}" cy="${f(base - 12 * s)}" r="${f(1.7 * s)}"/>`;
  const thing = kind === 'trumpet'
    ? `<path class="ez-trumpet" d="M${f(x + 1.4 * s)} ${f(base - 11.6 * s)} L${f(x + 8 * s)} ${f(base - 15 * s)}"/><path class="ez-trumpet-bell" d="M${f(x + 7.4 * s)} ${f(base - 16.4 * s)} L${f(x + 9.4 * s)} ${f(base - 13.6 * s)} L${f(x + 8.2 * s)} ${f(base - 15.4 * s)} Z"/>`
    : `<ellipse class="ez-cymbal" cx="${f(x - 2.6 * s)}" cy="${f(base - 12.4 * s)}" rx="${f(1.6 * s)}" ry="${f(0.7 * s)}"/><ellipse class="ez-cymbal" cx="${f(x + 3 * s)}" cy="${f(base - 12.4 * s)}" rx="${f(1.6 * s)}" ry="${f(0.7 * s)}"/>`;
  return `<g class="ez-musician" style="--d:${f((i * 0.37) % 2)}s">${body}${thing}</g>`;
}

// ── 1. 바벨론 강가 ─────────────────────────────
function canalArt(): string {
  const r = rng(1101);
  const glints = Array.from({ length: 16 }, () => `<path style="--d:${f(r() * 6)}s" d="M${f(-60 + r() * 520)} ${f(198 + r() * 24)} h${f(6 + r() * 10)}"/>`).join('');
  const cityline = `<g class="bd-far">
    <rect x="${-W * 2}" y="146" width="${W * 5}" height="20"/>
    ${Array.from({ length: 40 }, (_, i) => `<rect x="${-W * 2 + i * 50}" y="140" width="6" height="7"/><rect x="${-W * 2 + 12 + i * 50}" y="140" width="6" height="7"/>`).join('')}
    ${[30, 130, 330, 430].map((x) => `<rect x="${x - 7}" y="132" width="14" height="20"/>`).join('')}
  </g>`;
  return `<g class="ez ez--canal">
    ${cityline}
    ${ziggurat(262, 148, 1.15)}
    ${palm(60, 186, 46, 'bd-mid', 1102)}${palm(336, 184, 54, 'bd-mid', 1103)}${palm(372, 188, 40, 'bd-mid', 1104)}
    <!-- 건너편 둑 -->
    <path class="bd-mid" d="M${-W * 2} 194 C0 188 140 186 200 188 C280 190 400 186 ${W * 3} 190 L${W * 3} 198 L${-W * 2} 198 Z"/>
    <!-- 운하 -->
    <rect class="ez-water" x="${-W * 2}" y="194" width="${W * 5}" height="40"/>
    <g class="ez-glints">${glints}</g>
    <!-- 둥근 갈대배 -->
    <g class="ez-boat"><ellipse class="bd-mid" cx="236" cy="212" rx="13" ry="3.6"/><path class="bd-mid" d="M224 211 Q236 218 248 211 L247 214 Q236 220 225 214 Z"/><path class="ez-pole" d="M240 210 L252 192"/></g>
    ${reeds(300, 232, 16, 'bd-near', 1105)}${reeds(-10, 234, 14, 'bd-near', 1106)}
    ${willow(118, 244, 74, 14, 1107, true)}
    ${willow(410, 246, 62, -8, 1108)}
    ${ground(244)}
  </g>`;
}

// ── 2. 고레스의 궁 ─────────────────────────────
/** 바사식 기둥: 종 모양 받침, 가는 홈 기둥, 겹 소용돌이, 등을 맞댄 황소 두 마리 */
function persianColumn(x: number, base: number, top: number, s: number): string {
  const X = (d: number) => f(x + d * s);
  const flutes = [-2.4, 0, 2.4].map((d) => `M${X(d)} ${f(top + 26 * s)} L${X(d)} ${f(base - 12 * s)}`).join(' ');
  const bull = (dir: 1 | -1) => {
    const k = dir;
    return `<path d="M${X(0)} ${f(top + 4 * s)} L${X(10 * k)} ${f(top + 4 * s)} C${X(14 * k)} ${f(top + 2 * s)} ${X(17 * k)} ${f(top - 1 * s)} ${X(19 * k)} ${f(top - 3 * s)}
      L${X(23 * k)} ${f(top - 2 * s)} C${X(25 * k)} ${f(top)} ${X(25 * k)} ${f(top + 3 * s)} ${X(22 * k)} ${f(top + 5 * s)} L${X(19 * k)} ${f(top + 6 * s)}
      L${X(18 * k)} ${f(top + 13 * s)} L${X(15.6 * k)} ${f(top + 13 * s)} L${X(15 * k)} ${f(top + 8 * s)} L${X(11 * k)} ${f(top + 9 * s)} L${X(10.4 * k)} ${f(top + 13 * s)} L${X(8 * k)} ${f(top + 13 * s)} L${X(7 * k)} ${f(top + 9 * s)} L${X(0)} ${f(top + 9 * s)} Z"/>
      <path class="ez-horn" d="M${X(19.6 * k)} ${f(top - 2.6 * s)} C${X(19 * k)} ${f(top - 7 * s)} ${X(22 * k)} ${f(top - 9 * s)} ${X(24 * k)} ${f(top - 8 * s)}"/>`;
  };
  return `<g class="ez-column">
    <path class="ez-colstone" d="M${X(-7)} ${base} C${X(-7)} ${f(base - 6 * s)} ${X(-4)} ${f(base - 10 * s)} ${X(-3)} ${f(base - 12 * s)} L${X(3)} ${f(base - 12 * s)} C${X(4)} ${f(base - 10 * s)} ${X(7)} ${f(base - 6 * s)} ${X(7)} ${base} Z"/>
    <rect class="ez-colstone" x="${X(-3.6)}" y="${f(top + 26 * s)}" width="${f(7.2 * s)}" height="${f(base - top - 38 * s)}"/>
    <path class="ez-flutes" d="${flutes}"/>
    <path class="ez-colstone" d="M${X(-4.4)} ${f(top + 26 * s)} L${X(-5)} ${f(top + 16 * s)} C${X(-9)} ${f(top + 16 * s)} ${X(-9)} ${f(top + 11 * s)} ${X(-5)} ${f(top + 11 * s)} L${X(5)} ${f(top + 11 * s)} C${X(9)} ${f(top + 11 * s)} ${X(9)} ${f(top + 16 * s)} ${X(5)} ${f(top + 16 * s)} L${X(4.4)} ${f(top + 26 * s)} Z"/>
    <g class="ez-bulls">${bull(1)}${bull(-1)}</g>
    <rect class="ez-beam" x="${X(-28)}" y="${f(top - 6 * s)}" width="${f(56 * s)}" height="${f(3.4 * s)}"/>
  </g>`;
}

function courtArt(): string {
  // 계단 모양 성가퀴 (페르세폴리스)
  const merlons = Array.from({ length: 48 }, (_, i) => {
    const x = -W * 2 + i * 42;
    return `<path d="M${x} 40 L${x} 30 L${x + 4} 30 L${x + 4} 24 L${x + 8} 24 L${x + 8} 18 L${x + 14} 18 L${x + 14} 24 L${x + 18} 24 L${x + 18} 30 L${x + 22} 30 L${x + 22} 40 Z"/>`;
  }).join('');
  // 조공 행렬 띠: 작은 사람들이 한 줄로 걸어감
  const r = rng(1201);
  const tribute = Array.from({ length: 46 }, (_, i) => {
    const x = -W * 2 + 20 + i * 44 + r() * 6;
    const gift = i % 3 === 0 ? `<rect x="${f(x + 3)}" y="146" width="5" height="4" rx="1"/>` : i % 3 === 1 ? `<path d="M${f(x + 3)} 152 l3 -6 l3 6 Z"/>` : '';
    return `<g><rect x="${f(x - 1.6)}" y="144" width="3.4" height="12" rx="1.4"/><circle cx="${f(x)}" cy="141.6" r="2"/>${gift}</g>`;
  }).join('');
  const rosettes = Array.from({ length: 40 }, (_, i) => `<circle cx="${-W * 2 + 10 + i * 50}" cy="166" r="2.4"/>`).join('');
  return `<g class="ez ez--court">
    <rect class="ez-courtwall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <g class="ez-merlons">${merlons}</g>
    <rect class="ez-courtband" x="${-W * 2}" y="40" width="${W * 5}" height="6"/>
    <!-- 뒷벽 창 같은 깊은 문간 셋 -->
    ${[120, 200, 280].map((x) => `<path class="ez-niche" d="M${x - 12} 128 L${x - 12} 66 L${x + 12} 66 L${x + 12} 128 Z"/><path class="ez-nichecap" d="M${x - 15} 66 L${x + 15} 66 L${x + 15} 61 L${x - 15} 61 Z"/>`).join('')}
    <rect class="ez-courtband" x="${-W * 2}" y="136" width="${W * 5}" height="26"/>
    <g class="ez-tribute">${tribute}</g>
    <g class="ez-rosettes">${rosettes}</g>
    <!-- 가운데 멀리 왕좌 단과 차일 -->
    <g class="ez-dais">
      <path class="ez-canopy" d="M168 92 L232 92 L236 98 L164 98 Z"/>
      <path class="ez-fringe" d="M166 98 ${Array.from({ length: 12 }, (_, i) => `L${168 + i * 6} 102 L${171 + i * 6} 98`).join(' ')}"/>
      <path class="ez-canopypole" d="M170 98 L170 150 M230 98 L230 150"/>
      <rect class="ez-step" x="176" y="150" width="48" height="5"/><rect class="ez-step" x="168" y="155" width="64" height="5"/>
      <path class="ez-throne" d="M190 150 L190 124 L194 120 L194 138 L208 138 L208 146 L210 150 Z"/>
      <circle class="bd-halo ez-daishalo" cx="200" cy="124" r="34"/>
    </g>
    ${persianColumn(46, 248, 52, 1.4)}${persianColumn(112, 248, 60, 1.25)}${persianColumn(288, 248, 60, 1.25)}${persianColumn(354, 248, 52, 1.4)}
    ${persianColumn(-20, 248, 46, 1.5)}${persianColumn(420, 248, 46, 1.5)}
    <!-- 바닥 돌판 -->
    <rect class="ez-floor" x="${-W * 2}" y="236" width="${W * 5}" height="${H - 236}"/>
    <path class="ez-floorline" d="M${-W * 2} 244 H${W * 3} M${-W * 2} 252 H${W * 3} ${Array.from({ length: 18 }, (_, i) => `M${-200 + i * 50} 236 L${-260 + i * 58} ${H}`).join(' ')}"/>
    <ellipse class="ez-floorlight" cx="200" cy="244" rx="90" ry="7"/>
  </g>`;
}

// ── 3. 귀환 행렬 ───────────────────────────────
function caravanArt(): string {
  const r = rng(1301);
  // 길: 앞 왼쪽에서 지평선 오른쪽으로 굽이짐
  const P = (t: number) => {
    const y = 250 - t * 96;
    const x = 110 + Math.sin(t * 3.1) * 70 * (1 - t) + t * 150;
    return [x, y] as const;
  };
  const walkers = Array.from({ length: 52 }, (_, i) => {
    const t = 0.04 + (i / 51) * 0.94;
    const [x, y] = P(t);
    const s = 3.8 * (1 - t * 0.82);
    const kind = i % 7 === 3 ? 'camel' : i % 5 === 1 ? 'donkey' : 'person';
    const d = `--d:${f(r() * 3)}s`;
    if (kind === 'camel') {
      return `<g class="ez-beast" style="${d}"><path d="M${f(x - 3 * s)} ${f(y - 2.6 * s)} Q${f(x - 1.6 * s)} ${f(y - 4.6 * s)} ${f(x)} ${f(y - 3 * s)} Q${f(x + 1 * s)} ${f(y - 4.4 * s)} ${f(x + 2 * s)} ${f(y - 3 * s)} L${f(x + 3.2 * s)} ${f(y - 4.6 * s)} L${f(x + 3.8 * s)} ${f(y - 4.2 * s)} L${f(x + 2.6 * s)} ${f(y - 2.2 * s)} L${f(x + 2 * s)} ${f(y)} L${f(x + 1.4 * s)} ${f(y)} L${f(x + 1.2 * s)} ${f(y - 1.6 * s)} L${f(x - 2 * s)} ${f(y - 1.6 * s)} L${f(x - 2.2 * s)} ${f(y)} L${f(x - 2.8 * s)} ${f(y)} Z"/>
        ${i % 2 ? `<rect class="ez-chest" x="${f(x - 1.4 * s)}" y="${f(y - 5.6 * s)}" width="${f(2.6 * s)}" height="${f(1.4 * s)}"/>` : ''}</g>`;
    }
    if (kind === 'donkey') {
      return `<g class="ez-beast" style="${d}"><path d="M${f(x - 2.2 * s)} ${f(y - 2.2 * s)} L${f(x + 1.6 * s)} ${f(y - 2.2 * s)} L${f(x + 2.6 * s)} ${f(y - 3.2 * s)} L${f(x + 3 * s)} ${f(y - 2.8 * s)} L${f(x + 2 * s)} ${f(y - 1.4 * s)} L${f(x + 1.6 * s)} ${f(y)} L${f(x + 1.1 * s)} ${f(y)} L${f(x + 1 * s)} ${f(y - 1.2 * s)} L${f(x - 1.4 * s)} ${f(y - 1.2 * s)} L${f(x - 1.6 * s)} ${f(y)} L${f(x - 2.1 * s)} ${f(y)} Z"/>
        <rect class="ez-pack" x="${f(x - 1.6 * s)}" y="${f(y - 3.4 * s)}" width="${f(2.4 * s)}" height="${f(1.3 * s)}" rx="${f(0.4 * s)}"/></g>`;
    }
    return `<g class="ez-walker" style="${d}"><rect x="${f(x - s * 0.45)}" y="${f(y - s * 3)}" width="${f(s * 0.9)}" height="${f(s * 3)}" rx="${f(s * 0.45)}"/>
      ${i % 4 === 0 ? `<path d="M${f(x + s * 0.7)} ${f(y)} L${f(x + s * 0.9)} ${f(y - s * 3.6)}"/>` : i % 4 === 2 ? `<rect x="${f(x - s * 0.9)}" y="${f(y - s * 3.5)}" width="${f(s * 1.3)}" height="${f(s * 0.9)}" rx="${f(s * 0.3)}"/>` : ''}</g>`;
  }).join('');
  const road = Array.from({ length: 21 }, (_, i) => P(i / 20));
  const left = road.map(([x, y], i) => `${i ? 'L' : 'M'}${f(x - (1 - i / 20) * 26 - 2)} ${f(y)}`).join(' ');
  const right = road.slice().reverse().map(([x, y], i) => `L${f(x + (i / 20) * 26 + 2)} ${f(y)}`).join(' ');
  return `<g class="ez ez--caravan">
    ${ridge([[-W * 2, 150], [-60, 144], [100, 150], [240, 142], [380, 148], [W * 3, 144]], 'bd-far')}
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 160 C0 156 200 152 ${W * 3} 158 L${W * 3} ${H} Z"/>
    ${palm(330, 162, 26, 'bd-mid', 1302)}${palm(346, 164, 20, 'bd-mid', 1303)}${palm(-30, 168, 30, 'bd-mid', 1304)}
    <path class="ez-road" d="${left} ${right} Z"/>
    <g class="ez-dust"><ellipse cx="236" cy="160" rx="34" ry="6"/><ellipse cx="190" cy="186" rx="28" ry="5"/></g>
    <g class="ez-column-walk">${walkers}</g>
    ${ground(254)}
  </g>`;
}

// ── 4. 폐허 예루살렘 / 제단 / 기초 / 완공 ──────────────
type JState = 'ruin' | 'altar' | 'foundation' | 'built';
function jerusalemArt(state: JState): string {
  // 성전 터 위에 얹을 것
  const mountTop = state === 'ruin'
    ? `${rubble(130, 270, 166, 22, 12, 1401, 'bd-mid')}
       <rect class="ez-stump" x="186" y="138" width="9" height="26"/><rect class="ez-stump" x="214" y="150" width="8" height="14"/>
       <path class="ez-stump" d="M150 166 L156 150 L170 152 L174 166 Z M240 166 L246 154 L258 156 L262 166 Z"/>
       ${weeds(120, 280, 166, 26, 1402)}`
    : state === 'altar'
      ? `${rubble(120, 160, 166, 8, 11, 1403, 'bd-mid')}${rubble(244, 284, 166, 8, 11, 1404, 'bd-mid')}
         <rect class="ez-stump" x="252" y="146" width="8" height="18"/>
         ${weeds(116, 290, 166, 16, 1405)}`
      : state === 'foundation'
        ? foundationLines()
        : builtTemple();
  const near = state === 'altar'
    ? stoneAltar(200, 236, 1.15, 1406)
    : state === 'foundation'
      ? `${stoneAltar(58, 236, 0.7, 1407)}
         <g class="ez-cedar">${[0, 1, 2].map((k) => `<rect x="${300 - k * 3}" y="${232 - k * 5}" width="${56 + k * 6}" height="4.6" rx="2.3"/>`).join('')}<circle cx="300" cy="234" r="2.3" class="ez-ring"/><circle cx="297" cy="229" r="2.3" class="ez-ring"/></g>
         ${folk(110, 246, 150, 246, 3, 3.4, 1408, 'ez-folk')}`
      : state === 'built'
        ? stoneAltar(200, 238, 0.8, 1409)
        : `${rubble(70, 340, 244, 12, 9, 1410)}${weeds(40, 360, 246, 24, 1411)}`;
  return `<g class="ez ez--jerusalem ez--${state}">
    ${farHills()}
    ${templeMount(mountTop)}
    ${state === 'ruin'
      ? `${brokenWall(-W * 2, 168, 188, 234, 1412)}${brokenWall(226, W * 3, 190, 234, 1413)}${burntGate(197, 236, 0.78)}`
      : `${brokenWall(-W * 2, 64, 172, 230, 1412)}${brokenWall(336, W * 3, 176, 232, 1413)}`}
    ${state === 'ruin' ? '' : rubble(10, 90, 232, 6, 8, 1414, 'bd-mid')}
    ${near}
    ${ground(248)}
  </g>`;
}

/** 위에서 비스듬히 본 성전 기초: 네모난 큰 돌 줄, 말뚝과 측량줄, 가장자리의 나팔·제금 */
function foundationLines(): string {
  // 앞 변 (넓게), 뒤 변 (좁게) — 사다리꼴 원근
  const front = 172, back = 150;
  const fx0 = 112, fx1 = 288, bx0 = 140, bx1 = 260;
  const blocks = (x0: number, x1: number, y: number, h: number, n: number) => Array.from({ length: n }, (_, i) => {
    const w = (x1 - x0) / n;
    return `<rect x="${f(x0 + i * w + 0.4)}" y="${f(y - h)}" width="${f(w - 0.8)}" height="${f(h)}"/>`;
  }).join('');
  const side = (x0: number, x1: number, n: number) => Array.from({ length: n }, (_, i) => {
    const t0 = i / n, t1 = (i + 1) / n;
    const xa = x0 + (x1 - x0) * t0, xb = x0 + (x1 - x0) * t1;
    const ya = back + (front - back) * t0, yb = back + (front - back) * t1;
    return `<path d="M${f(xa)} ${f(ya - 4)} L${f(xb)} ${f(yb - 5)} L${f(xb)} ${f(yb)} L${f(xa)} ${f(ya)} Z"/>`;
  }).join('');
  return `<g class="ez-found">
    <path class="ez-foundfloor" d="M${bx0} ${back} L${bx1} ${back} L${fx1} ${front} L${fx0} ${front} Z"/>
    <g class="ez-foundstone">${blocks(bx0, bx1, back, 4, 10)}${side(bx0, fx0, 5)}${side(bx1, fx1, 5)}${blocks(fx0, fx1, front, 6, 12)}</g>
    <path class="ez-cord" d="M${bx0 - 6} ${back - 6} L${fx0 - 8} ${front + 2} M${bx1 + 6} ${back - 6} L${fx1 + 8} ${front + 2} M${bx0 - 6} ${back - 6} L${bx1 + 6} ${back - 6} M${(bx0 + bx1) / 2} ${back - 6} L200 ${front + 2}"/>
    ${[[bx0 - 6, back - 6], [bx1 + 6, back - 6], [fx0 - 8, front + 2], [fx1 + 8, front + 2]].map(([x, y]) => `<rect class="ez-peg" x="${x - 1}" y="${y - 6}" width="2" height="7"/>`).join('')}
    <circle class="bd-halo ez-foundhalo" cx="200" cy="160" r="70"/>
    ${musician(124, 150, 1, 'trumpet', 0)}${musician(134, 148, 1, 'trumpet', 1)}${musician(266, 148, 1, 'cymbal', 2)}${musician(276, 150, 1, 'cymbal', 3)}
    ${musician(150, 147, 0.85, 'trumpet', 4)}${musician(250, 147, 0.85, 'cymbal', 5)}
  </g>`;
}

/** 다시 지은 둘째 성전: 수수한 돌집. 금도 놋 기둥도 없다 */
function builtTemple(): string {
  return `<g class="ez-temple2">
    <circle class="bd-halo ez-templehalo" cx="200" cy="130" r="60"/>
    <rect class="ez-t2stone" x="160" y="100" width="80" height="66"/>
    <rect class="ez-t2porch" x="170" y="110" width="60" height="56"/>
    <rect class="ez-t2door" x="190" y="130" width="20" height="36"/>
    <path class="ez-courses" d="M160 122 H240 M160 144 H240 M180 100 V110 M220 100 V110"/>
    <rect class="ez-t2cap" x="156" y="96" width="88" height="5"/>
    <path class="ez-t2court" d="M120 166 L120 156 L160 156 L160 166 Z M240 166 L240 156 L280 156 L280 166 Z"/>
  </g>`;
}

export function ezraArt(art: EzraArt): string {
  switch (art) {
    case 'ez-babylon-canal': return canalArt();
    case 'ez-cyrus-court': return courtArt();
    case 'ez-caravan': return caravanArt();
    case 'ez-jerusalem-ruin': return jerusalemArt('ruin');
    case 'ez-altar': return jerusalemArt('altar');
    case 'ez-foundation': return jerusalemArt('foundation');
    case 'ez-temple-built': return jerusalemArt('built');
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

/** 무대 위 인물의 그림 상자 (scene 기준). 없으면 null */
function actorBox(scene: HTMLElement, id: string | undefined) {
  if (!id) return null;
  const b = scene.getBoundingClientRect();
  const el = [...scene.querySelectorAll<HTMLElement>('.scene__stage .actor')].find((a) => a.dataset.id === id);
  const a = el ? (el.querySelector<SVGElement>('.actor__art') ?? el).getBoundingClientRect() : null;
  if (!a || !a.width) return null;
  return { x: a.left - b.left + a.width / 2, top: a.top - b.top, h: a.height };
}

const DECREE_LINES = ['כֹּה אָמַר כֹּרֶשׁ מֶלֶךְ פָּרַס', 'כָּל מַמְלְכוֹת הָאָרֶץ', 'מִי בָכֶם מִכָּל עַמּוֹ', 'וְיַעַל לִירוּשָׁלַם'];

/** decree: 조서가 펼쳐지고 인장이 찍히고 사본이 온 나라로 (스 1:1-4) */
export function playDecree(scene: HTMLElement, rm: boolean): void {
  const lines = DECREE_LINES.map((t, i) => `<p style="--i:${i}">${t}</p>`).join('');
  const copies = rm ? '' : Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2 + 0.3;
    return `<i style="--dx:${(Math.cos(a) * 62).toFixed(1)}vmax; --dy:${(Math.sin(a) * 46).toFixed(1)}vmax; --r:${((i * 47) % 60 - 30)}deg; --k:${i}"></i>`;
  }).join('');
  layerOf(scene, `fx-decree${rm ? ' is-rm' : ''}`,
    `<div class="fx-decree__glow"></div>
     <div class="fx-decree__body">
       <i class="fx-decree__rod fx-decree__rod--l"></i>
       <div class="fx-decree__sheet">${lines}<b class="fx-decree__seal"><span>고레스</span></b></div>
       <i class="fx-decree__rod fx-decree__rod--r"></i>
     </div>
     <div class="fx-decree__copies">${copies}</div>
     <em class="fx-decree__cap">온 나라에 공포도 하고 조서도 내려</em>`,
    rm ? 4200 : 10500, 1800);
}

const VESSELS: { name: string; n: string; icon: string; metal: 'gold' | 'silver' }[] = [
  { name: '금반', n: '30', metal: 'gold', icon: '<ellipse cx="12" cy="13" rx="10" ry="3.4"/><path d="M3 13 Q12 20 21 13 Z"/>' },
  { name: '은반', n: '1,000', metal: 'silver', icon: '<ellipse cx="12" cy="13" rx="10" ry="3.4"/><path d="M3 13 Q12 20 21 13 Z"/>' },
  { name: '칼', n: '29', metal: 'silver', icon: '<path d="M4 18 L17 5 L19 7 L6 20 Z"/><path d="M3 17 L7 21 M2 22 L4 20"/>' },
  { name: '금대접', n: '30', metal: 'gold', icon: '<path d="M4 9 L20 9 Q19 19 12 19 Q5 19 4 9 Z"/><ellipse cx="12" cy="9" rx="8" ry="2"/>' },
  { name: '은대접', n: '410', metal: 'silver', icon: '<path d="M4 9 L20 9 Q19 19 12 19 Q5 19 4 9 Z"/><ellipse cx="12" cy="9" rx="8" ry="2"/>' },
  { name: '기타 기명', n: '1,000', metal: 'silver', icon: '<path d="M8 5 L16 5 L15 8 Q20 11 18 17 Q16 21 12 21 Q8 21 6 17 Q4 11 9 8 Z"/>' },
];

/** vessels: 느부갓네살이 가져갔던 성전 그릇을 세어 세스바살에게 (스 1:7-11) */
export function playVessels(scene: HTMLElement, from: string | undefined, to: string | undefined, rm: boolean): void {
  const b = scene.getBoundingClientRect();
  const a = actorBox(scene, from) ?? { x: b.width * 0.28, top: b.height * 0.45, h: b.height * 0.3 };
  const c = actorBox(scene, to) ?? { x: b.width * 0.72, top: b.height * 0.45, h: b.height * 0.3 };
  const ay = a.top + a.h * 0.42;
  const cy = c.top + c.h * 0.42;
  const rows = VESSELS.map((v, i) => `<li style="--i:${i}" class="is-${v.metal}"><svg viewBox="0 0 24 24" aria-hidden="true">${v.icon}</svg><span>${v.name}</span><b>${v.n}</b></li>`).join('');
  const flyers = rm ? '' : Array.from({ length: 18 }, (_, i) => {
    const v = VESSELS[i % VESSELS.length];
    return `<i class="is-${v.metal}" style="--k:${i}; --lift:${(-30 - ((i * 37) % 40)).toFixed(0)}px"><svg viewBox="0 0 24 24" aria-hidden="true">${v.icon}</svg></i>`;
  }).join('');
  layerOf(scene, `fx-vessels${rm ? ' is-rm' : ''}`,
    `<div class="fx-vessels__ledger"><h4>여호와의 전 기명 · 스 1:9-11</h4><ol>${rows}</ol><p class="fx-vessels__sum"><span>금, 은기명의 도합</span><b>5,400</b></p></div>
     <div class="fx-vessels__path" style="--x:${a.x.toFixed(0)}px; --y:${ay.toFixed(0)}px; --tx:${(c.x - a.x).toFixed(0)}px; --ty:${(cy - ay).toFixed(0)}px">${flyers}</div>
     <b class="fx-vessels__glow" style="--x:${c.x.toFixed(0)}px; --y:${cy.toFixed(0)}px"></b>`,
    rm ? 4600 : 12000, 2000);
}

/** two-sounds: 즐거이 부르는 소리와 통곡하는 소리가 섞여 분변치 못함 (스 3:12-13) */
export function playTwoSounds(scene: HTMLElement, joy: string | undefined, weep: string | undefined, rm: boolean): void {
  const b = scene.getBoundingClientRect();
  const ja = actorBox(scene, joy);
  const wa = actorBox(scene, weep);
  const y = b.height * 0.42;
  const jx = ja ? ja.x : b.width * 0.18;
  const wx = wa ? wa.x : b.width * 0.82;
  const jy = ja ? ja.top + ja.h * 0.18 : y;
  const wy = wa ? wa.top + wa.h * 0.18 : y;
  const mx = (jx + wx) / 2;
  const my = Math.min(jy, wy) - b.height * 0.02;
  // 이름표는 무대 안쪽으로 비켜 쓴다 (왼쪽 소리는 오른쪽으로, 오른쪽 소리는 왼쪽으로)
  const side = (x: number, other: number) => (x <= other ? 'l' : 'r');
  const rings = (n: number, cls: string) => Array.from({ length: n }, (_, i) => `<i class="${cls}" style="--k:${i}"></i>`).join('');
  const r = rng(313);
  const motes = rm ? '' : Array.from({ length: 26 }, (_, i) => `<s style="--a:${(r() * 360).toFixed(0)}deg; --d:${(r() * 2.4).toFixed(2)}s; --dist:${(30 + r() * 40).toFixed(0)}vmax; --c:${i % 2 ? 'var(--ts-weep)' : 'var(--ts-joy)'}"></s>`).join('');
  layerOf(scene, `fx-twosounds${rm ? ' is-rm' : ''}`,
    `<b class="fx-ts__wash"></b>
     <div class="fx-ts__src fx-ts__src--joy" data-side="${side(jx, wx)}" style="--x:${jx.toFixed(0)}px; --y:${jy.toFixed(0)}px">${rings(6, 'fx-ts__ring')}<em>즐거이 부르는 소리</em></div>
     <div class="fx-ts__src fx-ts__src--weep" data-side="${side(wx, jx)}" style="--x:${wx.toFixed(0)}px; --y:${wy.toFixed(0)}px">${rings(6, 'fx-ts__ring')}<em>통곡하는 소리</em></div>
     <div class="fx-ts__mix" style="--x:${mx.toFixed(0)}px; --y:${my.toFixed(0)}px">
       <b class="fx-ts__core"></b>
       ${rings(8, 'fx-ts__far')}
       <div class="fx-ts__motes">${motes}</div>
     </div>
     <p class="fx-ts__cap">분변치 못하였느니라</p>`,
    rm ? 5000 : 14500, 2600);
}
