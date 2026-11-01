// 9막 A급 — 유다의 마지막 백 년 (왕하 18–19 「편지를 펴 놓고」 · 22–23 「율법책」 · 25 「성전이 불타다」)의 전용 배경과 효과.
// 같은 종이 오려낸 그림자극 말투. 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - jd-nehushtan        : 성전 뜰 한쪽, 장대에 감긴 놋뱀과 그 앞의 향단·연기 (왕하 18:4 — 민 21:9의 그 뱀)
//  - jd-nehushtan-broken : 같은 곳, 장대가 꺾이고 놋뱀이 조각나 땅에, 향단이 엎어짐 ("느후스단", 놋 조각)
//  - jd-lachish          : 언덕 위 견고한 성 라기스, 왼쪽에서 성벽까지 올라간 공성 토성, 앞쪽 앗수르 진의 장막과 깃대 (18:14, 17)
//  - jd-wall-conduit     : 윗못 수도 곁 세탁자의 밭 큰 길 (18:17). 위로 예루살렘 성벽과 그 위에 앉은 백성의 머리들(18:26-27),
//                          왼쪽 못과 수도, 길가 줄에 널린 흰 천(세탁자의 밭)
//  - jd-camp             : 예루살렘 언덕을 멀리 두고 앞 들판을 메운 앗수르 진. 장막마다 모닥불(.jd-fire) — 밤에 (19:35)
//  - jd-camp-still       : 같은 진의 아침. 불은 다 꺼지고 가는 연기만, 깃대가 기울어 있음. 사람은 그리지 않음 (19:35 "아침에")
//  - jd-repair           : 비계를 두른 성전 정면, 쌓인 재목과 다듬은 돌, 일꾼들 (왕하 22:5-6)
//  - jd-scroll-room      : 성전 안 어두운 곳간. 높은 창에서 내리는 빛줄기, 먼지 티끌, 흩어진 돌과 궤짝 (22:8 율법책을 발견)
//  - jd-kidron-fire      : 예루살렘 바깥 기드론 골짜기. 위로 성벽, 골짜기 바닥에 쌓아 태우는 더미들과 연기 기둥 (23:4, 6, 12)
//  - jd-bethel           : 벧엘의 산당 제단(뿔 넷, 금 간 단)과 연기, 오른쪽 산비탈의 묘실 문들, 그중 하나 앞 작은 비석 (23:15-18)
//  - jd-megiddo          : 므깃도 언덕(텔)과 이스르엘 평지, 멀리 갈멜 줄기, 지평선의 병거 먼지 (23:29)
//  - jd-siege            : 성 밖에서 본 예루살렘. 성벽 아래 쌓아 올린 토성 셋, 갈대아 진의 불빛 (25:1-3)
//  - jd-breach           : 두 성벽 사이 왕의 동산 곁문 길. 바깥 성벽에 뚫린 구멍과 무너진 돌 (25:4) — 밤에
//  - jd-temple-burning   : 불타는 성전과 왕궁·집들. 문과 창에서 불길, 붉은 하늘, 검은 연기 (25:9) — 사람은 그리지 않음
//  - jd-temple-ash       : 불탄 뒤. 지붕이 내려앉은 검은 벽, 기둥 자리의 밑동, 가는 연기와 재 (25:9-10)
//  - jd-exile-road       : 지평선까지 이어진 길 위 사로잡혀 가는 긴 행렬과 창 든 병사, 뒤로 연기 오르는 성 (25:11)
//  - jd-babylon-court    : 바벨론 왕궁. 푸른 유약 벽돌 벽, 걸어가는 사자 띠와 국화 무늬, 높은 문, 가운데 긴 상과 등잔 (25:27-30)
// 효과:
//  - letter-spread : 편지를 펴 놓음 (19:14). 히스기야(who) 손에서 두루마리가 무대 가운데 바닥으로 내려가 펼쳐지고, 쐐기 글자가
//                    흐리게 비친 뒤 그 자리에서 가는 빛 한 줄기가 위로 오른다 (약 8초)
//  - camp-silence  : 그 밤 (19:35). 배경 jd-camp의 모닥불이 가장자리부터 하나씩 꺼지고, 찬 은빛 바람이 진을 한 번 쓸고 지나감.
//                    사람·시체는 그리지 않음 (약 9초)
//  - scroll-found  : 율법책 (22:8-11). 무대 위에 두루마리가 떠올라 펼쳐지고 글줄이 한 줄씩 금빛으로 켜짐 (약 9초)
//  - burn-idols    : 우상 기구를 불사름 (18:4 · 23:4-15). 무대 가운데 목상·주상·해 바퀴·작은 신상들의 그림자가 붉게 달아올라
//                    부서지며 재로 흩어지고 가루 더미만 남음 (약 8초)
//  - temple-fire   : 성전이 불탐 (25:9). 아래에서 붉은빛이 차오르고 불티가 끝없이 날아오르며 연기가 무대를 덮음 (약 11초)
//  - pillars-fall  : 놋 기둥이 쓰러짐 (25:13, 17). 무대 가운데 놋 기둥 둘(야긴·보아스)이 기울어 넘어지고, 기둥머리 석류가 흩어지며
//                    흙먼지 (약 7초) — 왕상 7:21과 이음
//  - small-lamp    : 작은 불빛 (25:27-30). 두 왕국 판이 펴져 있으면 무너진 남유다 칸에 작은 등불 하나가 켜져 남는다(판에 붙어서
//                    에피소드 끝까지). 판이 없으면 무대 가운데 아래에 켜짐 (약 6초)
// 하나님은 그리지 않는다. 죽음·폭력은 그리지 않는다 (암전·소리·결과만).
import { H, W, rng, smoke } from './backdrop';
import { folk, ground, ridge, stars } from './joshua';

export type JudahArt =
  | 'jd-nehushtan' | 'jd-nehushtan-broken' | 'jd-lachish' | 'jd-wall-conduit' | 'jd-camp' | 'jd-camp-still'
  | 'jd-repair' | 'jd-scroll-room' | 'jd-kidron-fire' | 'jd-bethel' | 'jd-megiddo'
  | 'jd-siege' | 'jd-breach' | 'jd-temple-burning' | 'jd-temple-ash' | 'jd-exile-road' | 'jd-babylon-court';

const f = (n: number) => n.toFixed(1);

// ── 작은 조각들 ─────────────────────────────────
/** 성벽 한 줄: 위에 톱니(여장), 돌 켜 줄. 망대는 towers의 x마다 */
function wall(x0: number, x1: number, top: number, base: number, towers: number[] = [], cls = 'bd-mid'): string {
  const teeth = Array.from({ length: Math.ceil((x1 - x0) / 9) }, (_, i) => `<rect x="${x0 + i * 9}" y="${top - 4}" width="5" height="4.4"/>`).join('');
  const tw = towers.map((x) => `<rect x="${x - 11}" y="${top - 16}" width="22" height="${base - top + 16}"/>
    ${[0, 1, 2].map((i) => `<rect x="${x - 11 + i * 8}" y="${top - 20}" width="5" height="4.4"/>`).join('')}
    <rect class="jd-slit" x="${x - 1}" y="${top - 10}" width="2" height="6"/>`).join('');
  const rows = [0.33, 0.66].map((t) => `M${x0} ${f(top + (base - top) * t)} H${x1}`).join(' ');
  return `<g class="${cls}"><rect x="${x0}" y="${top}" width="${x1 - x0}" height="${base - top}"/>${teeth}${tw}</g>
    <path class="jd-courses" d="${rows}"/>`;
}

/** 성전 정면 (7막 tp-court를 작게 줄인 모양): 높은 집 + 낭실 + 문 + 놋 기둥 둘. state: whole / fire / ash / scaffold */
function temple(cx: number, base: number, s: number, state: 'whole' | 'fire' | 'ash' | 'scaffold'): string {
  const X = (x: number) => f(cx + x * s);
  const Y = (y: number) => f(base - y * s);
  const ash = state === 'ash';
  const body = ash
    // 지붕이 내려앉아 위가 들쭉날쭉한 검은 벽
    ? `<path class="jd-charred" d="M${X(-62)} ${Y(0)} L${X(-62)} ${Y(96)} L${X(-48)} ${Y(104)} L${X(-34)} ${Y(92)} L${X(-20)} ${Y(118)} L${X(-6)} ${Y(100)} L${X(10)} ${Y(124)} L${X(24)} ${Y(98)} L${X(40)} ${Y(110)} L${X(52)} ${Y(90)} L${X(62)} ${Y(96)} L${X(62)} ${Y(0)} Z"/>
       <rect class="jd-hole" x="${X(-12)}" y="${Y(56)}" width="${f(24 * s)}" height="${f(56 * s)}"/>
       <path class="jd-charline" d="M${X(-50)} ${Y(80)} L${X(-44)} ${Y(20)} M${X(30)} ${Y(90)} L${X(36)} ${Y(30)} M${X(-20)} ${Y(70)} L${X(-26)} ${Y(40)}"/>`
    : `<rect class="jd-stone" x="${X(-62)}" y="${Y(140)}" width="${f(124 * s)}" height="${f(140 * s)}"/>
       <rect class="jd-gold" x="${X(-64)}" y="${Y(142)}" width="${f(128 * s)}" height="${f(4 * s)}"/>
       <rect class="jd-porch" x="${X(-50)}" y="${Y(126)}" width="${f(100 * s)}" height="${f(126 * s)}"/>
       <rect class="jd-gold" x="${X(-52)}" y="${Y(128)}" width="${f(104 * s)}" height="${f(4 * s)}"/>
       <rect class="${state === 'fire' ? 'jd-door jd-door--fire' : 'jd-door'}" x="${X(-19)}" y="${Y(84)}" width="${f(38 * s)}" height="${f(84 * s)}"/>
       <rect class="jd-gold" x="${X(-22)}" y="${Y(88)}" width="${f(44 * s)}" height="${f(4 * s)}"/>`;
  const pillars = ash
    ? `<rect class="jd-bronze" x="${X(-40)}" y="${Y(14)}" width="${f(9 * s)}" height="${f(14 * s)}"/><rect class="jd-bronze" x="${X(31)}" y="${Y(10)}" width="${f(9 * s)}" height="${f(10 * s)}"/>`
    : [-36, 36].map((x) => `<rect class="jd-bronze" x="${X(x - 4.5)}" y="${Y(100)}" width="${f(9 * s)}" height="${f(100 * s)}"/>
       <path class="jd-bronze" d="M${X(x - 9)} ${Y(100)} C${X(x - 11)} ${Y(108)} ${X(x - 7)} ${Y(112)} ${X(x - 4)} ${Y(112)} L${X(x + 4)} ${Y(112)} C${X(x + 7)} ${Y(112)} ${X(x + 11)} ${Y(108)} ${X(x + 9)} ${Y(100)} Z"/>
       <path class="jd-lily" d="M${X(x - 5)} ${Y(112)} C${X(x - 6)} ${Y(117)} ${X(x - 2)} ${Y(116)} ${X(x)} ${Y(120)} C${X(x + 2)} ${Y(116)} ${X(x + 6)} ${Y(117)} ${X(x + 5)} ${Y(112)} Z"/>`).join('');
  const scaffold = state === 'scaffold'
    ? `<g class="jd-scaffold">
        ${[-70, -40, 40, 70].map((x) => `<path d="M${X(x)} ${Y(0)} L${X(x)} ${Y(150)}"/>`).join('')}
        ${[40, 80, 120].map((y) => `<path d="M${X(-74)} ${Y(y)} L${X(-36)} ${Y(y)} M${X(36)} ${Y(y)} L${X(74)} ${Y(y)}"/>`).join('')}
        <path d="M${X(-70)} ${Y(40)} L${X(-40)} ${Y(80)} M${X(-70)} ${Y(80)} L${X(-40)} ${Y(120)} M${X(40)} ${Y(40)} L${X(70)} ${Y(80)} M${X(40)} ${Y(80)} L${X(70)} ${Y(120)}"/>
        <path class="jd-rope" d="M${X(56)} ${Y(150)} L${X(56)} ${Y(60)}"/>
        <rect class="jd-block" x="${X(52)}" y="${Y(60)}" width="${f(8 * s)}" height="${f(6 * s)}"/>
      </g>`
    : '';
  // 지붕선과 문·창에서 솟는 들쭉날쭉한 불길 (작고 많게)
  const tongue = (x: number, y: number, k: number, i: number) =>
    `<path style="--d:${f((i * 0.29) % 1.4)}s" d="M${X(x - 6 * k)} ${Y(y)} L${X(x - 5 * k)} ${Y(y + 8 * k)} L${X(x - 3 * k)} ${Y(y + 5 * k)} L${X(x - 1 * k)} ${Y(y + 17 * k)} L${X(x + 1.4 * k)} ${Y(y + 7 * k)} L${X(x + 3 * k)} ${Y(y + 12 * k)} L${X(x + 5 * k)} ${Y(y + 4 * k)} L${X(x + 6 * k)} ${Y(y)} Z"/>`;
  const fire = state === 'fire'
    ? `<g class="jd-flames">${Array.from({ length: 12 }, (_, i) => tongue(-58 + i * 10.5, 142, 0.7 + ((i * 7) % 5) * 0.12, i)).join('')}
       ${[[-8, 84, 1], [6, 84, 0.8], [-44, 126, 0.7], [44, 126, 0.7]].map(([x, y, k], i) => tongue(x, y, k, i + 12)).join('')}</g>`
    : '';
  return `<g class="jd-temple jd-temple--${state}">
    <circle class="bd-halo jd-templehalo" cx="${X(0)}" cy="${Y(state === 'fire' ? 110 : 60)}" r="${f((state === 'fire' ? 140 : 60) * s)}"/>
    ${body}${pillars}${scaffold}${fire}
  </g>`;
}

/** 장막 하나 (앗수르·갈대아 진). fire면 앞에 모닥불 */
function camptent(x: number, y: number, s: number, fire: boolean, still: boolean, i: number): string {
  return `<g>
    <path class="jd-tent" d="M${f(x - 9 * s)} ${f(y)} L${f(x)} ${f(y - 9 * s)} L${f(x + 9 * s)} ${f(y)} Z"/>
    <path class="jd-tentpole" d="M${f(x)} ${f(y - 9 * s)} L${f(x)} ${f(y - 12 * s)}"/>
    ${fire ? (still
      ? `<circle class="jd-ash" cx="${f(x + 11 * s)}" cy="${f(y - 1)}" r="${f(1.6 * s)}"/>`
      : `<circle class="jd-firehalo jd-fire" style="--d:${f((i * 0.53) % 3)}s" cx="${f(x + 11 * s)}" cy="${f(y - 2 * s)}" r="${f(6 * s)}"/>
         <circle class="jd-fire jd-firecore" style="--d:${f((i * 0.71) % 2)}s" cx="${f(x + 11 * s)}" cy="${f(y - 1.5 * s)}" r="${f(1.4 * s)}"/>`) : ''}
  </g>`;
}

/** 진 (여러 줄의 장막). 뒤 줄일수록 작고 빽빽함 */
function camp(seed: number, still: boolean, rows: [number, number, number][]): string {
  const r = rng(seed);
  let i = 0;
  return rows.map(([y, s, n]) => Array.from({ length: n }, (_, k) => {
    const x = -W * 0.6 + (k + r() * 0.6) * ((W * 2.2) / n);
    return camptent(x, y + (r() - 0.5) * 3, s, r() < 0.7, still, i++);
  }).join('')).join('');
}

/** 깃대 (앗수르 군기: 장대 끝의 둥근 표 + 늘어진 띠). lean = 기울기(도) */
function standard(x: number, base: number, h: number, lean = 0): string {
  return `<g class="jd-standard" transform="rotate(${lean} ${x} ${base})">
    <path d="M${x} ${base} L${x} ${base - h}"/>
    <circle cx="${x}" cy="${base - h - 4}" r="4"/>
    <path class="jd-standard__ribbon" d="M${x} ${base - h + 2} q-3 6 -1 14 M${x} ${base - h + 2} q3 6 1 14"/>
  </g>`;
}

/** 멀리 언덕 위의 예루살렘 (성벽 + 가운데 성전) */
function farCity(cx: number, top: number, s: number, burning = false): string {
  const houses = Array.from({ length: 12 }, (_, i) => `<rect x="${f(cx - 70 * s + i * 12 * s)}" y="${f(top - (6 + ((i * 7) % 5)) * s)}" width="${f(10 * s)}" height="${f((14 + ((i * 7) % 5)) * s)}"/>`).join('');
  return `<g class="jd-farcity">
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} ${f(top + 34 * s)} C${f(cx - 160 * s)} ${f(top + 20 * s)} ${f(cx - 90 * s)} ${f(top + 6 * s)} ${f(cx)} ${f(top + 4 * s)} C${f(cx + 90 * s)} ${f(top + 6 * s)} ${f(cx + 160 * s)} ${f(top + 22 * s)} ${W * 3} ${f(top + 36 * s)} L${W * 3} ${H} Z"/>
    <g class="bd-far">${houses}
      <rect x="${f(cx - 14 * s)}" y="${f(top - 26 * s)}" width="${f(28 * s)}" height="${f(30 * s)}"/>
      <rect x="${f(cx - 22 * s)}" y="${f(top - 14 * s)}" width="${f(44 * s)}" height="${f(18 * s)}"/>
    </g>
    <path class="bd-far" d="M${f(cx - 84 * s)} ${f(top + 8 * s)} L${f(cx - 84 * s)} ${f(top - 2 * s)} ${Array.from({ length: 14 }, () => `h${f(6 * s)} v${f(-3 * s)} h${f(6 * s)} v${f(3 * s)}`).join(' ')} L${f(cx + 84 * s)} ${f(top + 8 * s)} Z"/>
    ${burning ? '' : `<rect class="jd-fargold" x="${f(cx - 15 * s)}" y="${f(top - 27.5 * s)}" width="${f(30 * s)}" height="${f(2 * s)}"/>`}
  </g>`;
}

// ── 1. 놋뱀 (18:4) ─────────────────────────────
function nehushtanArt(broken: boolean): string {
  // 장대 위 놋뱀: 가로대에 S자로 감긴 뱀 (민 21:9)
  const serpent = `<path class="jd-serpent" d="M200 118 C186 116 184 128 196 132 C210 136 214 148 200 152 C188 156 188 166 200 168 C210 170 212 180 202 184"/>
    <path class="jd-serpenthead" d="M200 118 C206 112 214 113 216 118 C213 121 207 122 200 120 Z"/>`;
  const pole = broken
    ? `<g class="jd-bronzepole"><rect x="198" y="196" width="4" height="48"/>
        <path d="M199 196 L203 194 L201 199 Z"/>
        <rect x="216" y="236" width="56" height="4" rx="2" transform="rotate(-8 216 236)"/></g>
       <g class="jd-serpentbits">
        <path class="jd-serpent" d="M150 240 C156 232 168 234 170 240"/>
        <path class="jd-serpent" d="M236 242 C242 236 252 238 256 243"/>
        <path class="jd-serpent" d="M178 244 C184 240 190 241 194 245"/>
        <path class="jd-serpenthead" d="M262 238 C268 232 276 233 278 238 C275 241 269 242 262 240 Z"/>
       </g>`
    : `<g class="jd-bronzepole"><rect x="198" y="112" width="4" height="132"/><rect x="186" y="126" width="28" height="3"/></g>${serpent}
       <circle class="bd-halo jd-serpenthalo" cx="200" cy="150" r="54"/>`;
  const stand = broken
    ? `<g class="bd-near"><path d="M118 244 L148 236 L152 242 L122 250 Z"/><ellipse cx="150" cy="246" rx="8" ry="2"/></g>`
    : `<g class="bd-near jd-incense"><rect x="148" y="214" width="16" height="30"/><rect x="144" y="210" width="24" height="4"/></g>
       <ellipse class="bd-ember" cx="156" cy="209" rx="7" ry="1.6"/>${smoke(156, 200, 1804, 6)}
       <g class="bd-near"><rect x="236" y="226" width="22" height="18"/><rect x="233" y="222" width="28" height="4"/></g>
       <ellipse class="bd-ember" cx="247" cy="221" rx="9" ry="1.6"/>${smoke(247, 214, 1805, 5)}`;
  return `<g class="jd jd--nehushtan${broken ? ' is-broken' : ''}">
    ${ridge([[-W * 2, 140], [-40, 132], [120, 140], [260, 128], [420, 138], [W * 3, 134]], 'bd-far')}
    ${wall(-W * 2, W * 3, 150, 236, [40, 360])}
    <rect class="jd-gate" x="268" y="170" width="30" height="66"/>
    ${pole}${stand}
    ${ground(244)}
  </g>`;
}

// ── 2. 라기스 (18:14, 17) ──────────────────────
function lachishArt(): string {
  return `<g class="jd jd--lachish">
    ${ridge([[-W * 2, 150], [-80, 140], [80, 148], [260, 136], [460, 146], [W * 3, 140]], 'bd-far')}
    <!-- 언덕(텔) -->
    <path class="bd-mid" d="M40 ${H} C90 214 130 170 170 156 C200 148 260 148 290 156 C330 168 370 210 420 ${H} Z"/>
    <!-- 두 겹 성벽과 성문 망대 -->
    ${wall(156, 304, 134, 160, [180, 280])}
    ${wall(176, 284, 112, 136, [230], 'bd-far')}
    <rect class="jd-gate" x="222" y="140" width="16" height="20"/>
    <!-- 왼쪽에서 성벽까지 올라간 토성 -->
    <path class="jd-ramp" d="M60 ${H} L84 236 C110 210 140 184 166 160 L186 162 C170 190 150 220 140 ${H} Z"/>
    <path class="jd-rampline" d="M80 240 L170 164 M100 238 L178 168 M120 240 L184 172"/>
    <!-- 공성 망대(바퀴 달린) -->
    <g class="bd-near jd-engine"><rect x="148" y="150" width="18" height="22"/><path d="M146 150 L157 140 L168 150 Z"/><rect x="164" y="160" width="14" height="3"/><circle cx="152" cy="174" r="3"/><circle cx="163" cy="174" r="3"/></g>
    ${smoke(214, 106, 1814, 6)}${smoke(262, 112, 1815, 5)}
    <!-- 앞쪽 앗수르 진 -->
    <g class="jd-campfront">${camp(1817, false, [[238, 1.6, 9]])}</g>
    ${standard(110, 244, 48, -4)}${standard(318, 246, 44, 3)}
    ${ground(248)}
  </g>`;
}

// ── 3. 윗못 수도 곁 (18:17, 26-28) ───────────────
function conduitArt(): string {
  const r = rng(1826);
  // 성벽 위에 앉은 백성의 머리들
  const heads = Array.from({ length: 34 }, (_, i) => {
    const x = -40 + i * 14 + r() * 6;
    return `<g style="--d:${f(r() * 4)}s"><circle cx="${f(x)}" cy="${f(96 - r() * 2)}" r="${f(2.4 + r() * 0.6)}"/><rect x="${f(x - 2.6)}" y="${f(97 - r())}" width="5.2" height="6" rx="2"/></g>`;
  }).join('');
  // 세탁자의 밭: 줄에 널린 흰 천
  const cloths = Array.from({ length: 7 }, (_, i) => `<rect style="--d:${f(i * 0.6)}s" x="${f(244 + i * 18)}" y="${f(186 + (i % 2))}" width="${f(10 + (i % 3) * 2)}" height="${f(14 + (i % 2) * 4)}"/>`).join('');
  return `<g class="jd jd--conduit">
    ${ridge([[-W * 2, 92], [-60, 84], [120, 90], [300, 82], [W * 3, 88]], 'bd-far')}
    ${wall(-W * 2, W * 3, 104, 170, [-20, 160, 330])}
    <g class="jd-heads">${heads}</g>
    <!-- 왼쪽 윗못과 수도 -->
    <path class="bd-mid" d="M${-W * 2} 178 C-40 176 60 174 140 176 C220 178 300 180 ${W * 3} 178 L${W * 3} ${H} L${-W * 2} ${H} Z"/>
    <ellipse class="jd-pool" cx="60" cy="196" rx="70" ry="9"/>
    <path class="jd-pool-glint" d="M20 195 Q60 192 100 195"/>
    <path class="jd-conduit" d="M126 194 L240 194 L246 200 L${W * 3} 200"/>
    <path class="jd-conduitline" d="M126 191 L240 191"/>
    <!-- 세탁자의 밭 -->
    <path class="jd-line" d="M238 186 Q300 190 370 185"/>
    <g class="jd-cloths">${cloths}</g>
    <path class="jd-post" d="M238 184 L238 214 M370 183 L370 214"/>
    <!-- 큰 길 -->
    <path class="jd-road" d="M${-W * 2} 230 C0 224 140 222 200 224 C280 226 420 232 ${W * 3} 228"/>
    ${ground(246)}
  </g>`;
}

// ── 4. 앗수르 진 (19:35) ───────────────────────
function campArt(still: boolean): string {
  return `<g class="jd jd--camp${still ? ' is-still' : ''}">
    ${still ? '' : stars(40, 70, 1935)}
    ${farCity(200, 112, 0.9)}
    <g class="jd-campfield">${camp(1936, still, [[150, 0.8, 22], [168, 1.05, 18], [192, 1.35, 14], [224, 1.7, 11]])}</g>
    ${standard(132, 236, 52, still ? -22 : -3)}${standard(276, 238, 46, still ? 26 : 4)}${standard(46, 230, 40, still ? -14 : 2)}
    ${still ? `<g class="jd-wisps">${smoke(96, 214, 1937, 3)}${smoke(214, 182, 1938, 3)}${smoke(300, 200, 1939, 3)}</g>` : ''}
    ${ground(248)}
  </g>`;
}

// ── 5. 성전 수리 (22:5-6) ─────────────────────
function repairArt(): string {
  return `<g class="jd jd--repair">
    ${ridge([[-W * 2, 150], [-60, 140], [100, 148], [280, 138], [W * 3, 146]], 'bd-far')}
    ${wall(-W * 2, 120, 186, 228)}${wall(280, W * 3, 186, 228)}
    ${temple(200, 228, 0.92, 'scaffold')}
    <!-- 재목과 다듬은 돌 -->
    <g class="bd-near">
      ${[0, 1, 2].map((k) => `<rect x="${86 - k * 4}" y="${232 - k * 5}" width="${46 + k * 8}" height="4.4" rx="2"/>`).join('')}
      ${[0, 1, 2, 3].map((k) => `<rect x="${296 + (k % 2) * 14}" y="${234 - Math.floor(k / 2) * 10}" width="13" height="9"/>`).join('')}
    </g>
    ${folk(118, 246, 150, 246, 3, 3.4, 2251)}${folk(258, 246, 286, 246, 2, 3.4, 2252)}
    ${ground(248)}
  </g>`;
}

// ── 6. 성전 곳간 (22:8) ────────────────────────
function scrollRoomArt(): string {
  const r = rng(2208);
  const motes = Array.from({ length: 18 }, () =>
    `<circle style="--d:${f(r() * 9)}s; --dx:${f((r() - 0.5) * 18)}px" cx="${f(170 + r() * 70)}" cy="${f(90 + r() * 140)}" r="${f(0.5 + r() * 0.9)}"/>`).join('');
  const blocks = Array.from({ length: 9 }, (_, i) => `M${-60 + i * 60} ${24 * (i % 2)} V230`).join(' ');
  return `<g class="jd jd--room">
    <rect class="jd-roomwall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <path class="jd-roomcourses" d="${Array.from({ length: 9 }, (_, i) => `M${-W * 2} ${24 + i * 24} H${W * 3}`).join(' ')} ${blocks}"/>
    <!-- 높은 창과 빛줄기 -->
    <rect class="jd-window" x="236" y="30" width="16" height="22"/>
    <path class="jd-shaft" d="M236 34 L252 34 L250 ${H} L156 ${H} Z"/>
    <g class="jd-motes">${motes}</g>
    <!-- 궤짝과 흩어진 돌, 선반 -->
    <g class="bd-near">
      <rect x="40" y="208" width="54" height="30"/><rect x="36" y="204" width="62" height="5"/>
      <rect x="300" y="150" width="90" height="4"/><rect x="306" y="134" width="12" height="16"/><rect x="324" y="138" width="16" height="12"/><rect x="350" y="130" width="10" height="20"/>
      <path d="M140 244 L150 234 L162 236 L166 246 Z M236 246 L242 238 L254 240 L256 248 Z"/>
    </g>
    <!-- 빛줄기가 떨어지는 바닥의 빛 자리 -->
    <ellipse class="jd-pool-light" cx="203" cy="236" rx="46" ry="6"/>
    <rect class="jd-floor" x="${-W * 2}" y="238" width="${W * 5}" height="${H - 238}"/>
  </g>`;
}

// ── 7. 기드론 밭 (23:4-6, 12) ───────────────────
function kidronArt(): string {
  const pyre = (x: number, base: number, s: number, seed: number) => `<g class="jd-pyre">
    <circle class="bd-halo jd-pyrehalo" cx="${x}" cy="${f(base - 8 * s)}" r="${f(30 * s)}"/>
    <path class="bd-near" d="M${f(x - 16 * s)} ${base} L${f(x - 6 * s)} ${f(base - 12 * s)} L${f(x + 4 * s)} ${f(base - 16 * s)} L${f(x + 16 * s)} ${base} Z"/>
    <path class="jd-pole" d="M${f(x - 12 * s)} ${f(base - 4)} L${f(x + 8 * s)} ${f(base - 24 * s)} M${f(x + 12 * s)} ${f(base - 2)} L${f(x - 4 * s)} ${f(base - 20 * s)}"/>
    <g class="jd-flames">${[-6, 0, 6].map((d, i) => `<path style="--d:${f((seed % 7) * 0.2 + i * 0.4)}s" d="M${f(x + d * s - 5 * s)} ${f(base - 8 * s)} C${f(x + d * s - 6 * s)} ${f(base - 18 * s)} ${f(x + d * s)} ${f(base - 20 * s)} ${f(x + d * s)} ${f(base - 30 * s)} C${f(x + d * s + 2 * s)} ${f(base - 20 * s)} ${f(x + d * s + 6 * s)} ${f(base - 16 * s)} ${f(x + d * s + 5 * s)} ${f(base - 8 * s)} Z"/>`).join('')}</g>
    ${smoke(x, base - 34 * s, seed, 6)}
  </g>`;
  return `<g class="jd jd--kidron">
    ${ridge([[-W * 2, 120], [-40, 110], [140, 118], [300, 104], [W * 3, 112]], 'bd-far')}
    <!-- 위 왼쪽 언덕 위 성벽 (예루살렘), 오른쪽은 감람산 비탈 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 120 C-60 118 60 124 140 150 C170 162 190 186 200 210 L200 ${H} Z"/>
    ${wall(-W * 2, 120, 100, 132, [20, 90])}
    <path class="bd-mid jd-olives" d="M200 ${H} L200 210 C220 176 270 150 330 140 C380 132 420 134 ${W * 3} 136 L${W * 3} ${H} Z"/>
    <!-- 골짜기 바닥의 더미들 -->
    ${pyre(150, 240, 1.1, 2341)}${pyre(250, 238, 1.3, 2342)}${pyre(330, 244, 0.9, 2343)}
    <path class="jd-brook" d="M${-W * 2} 250 C60 246 140 252 200 250 C280 248 360 254 ${W * 3} 250"/>
    ${ground(252)}
  </g>`;
}

// ── 8. 벧엘의 제단과 묘실 (23:15-18) ──────────────
function bethelArt(): string {
  return `<g class="jd jd--bethel">
    ${ridge([[-W * 2, 140], [-40, 128], [120, 136], [260, 120], [W * 3, 130]], 'bd-far')}
    <!-- 오른쪽 산비탈과 묘실 문들 -->
    <path class="bd-mid" d="M150 ${H} C190 200 240 150 300 128 C350 112 400 110 ${W * 3} 116 L${W * 3} ${H} Z"/>
    <g class="jd-tombs">${[[246, 176, 1], [282, 152, 0.9], [322, 142, 0.8], [356, 160, 1], [300, 188, 1.1]].map(([x, y, s]) =>
      `<path d="M${f(x - 7 * s)} ${f(y + 10 * s)} L${f(x - 7 * s)} ${f(y)} Q${f(x)} ${f(y - 8 * s)} ${f(x + 7 * s)} ${f(y)} L${f(x + 7 * s)} ${f(y + 10 * s)} Z"/>`).join('')}</g>
    <!-- 하나님의 사람의 묘실 앞 작은 비석 (23:17) -->
    <g class="jd-marker"><circle class="bd-halo jd-markerhalo" cx="262" cy="214" r="26"/><path d="M255 234 L255 206 Q262 198 269 206 L269 234 Z"/></g>
    <!-- 벧엘 제단: 뿔 넷, 갈라진 단 (왕상 13:3, 5) -->
    <g class="jd-altar">
      <path class="bd-near" d="M150 244 L150 206 L156 206 L158 198 L161 206 L176 206 L178 214 L180 206 L196 206 L199 198 L202 206 L208 206 L208 244 Z"/>
      <path class="jd-crack" d="M178 208 L172 222 L180 230 L174 244"/>
      <ellipse class="bd-ember" cx="179" cy="205" rx="20" ry="2.4"/>
      ${smoke(179, 196, 2315, 7)}
    </g>
    <path class="jd-calfbase" d="M98 244 L98 230 L124 230 L124 244 Z"/>
    ${ground(248)}
  </g>`;
}

// ── 9. 므깃도 (23:29) ─────────────────────────
function megiddoArt(): string {
  return `<g class="jd jd--megiddo">
    ${ridge([[-W * 2, 150], [-80, 136], [60, 142], [200, 150], [W * 3, 156]], 'bd-far')}
    <!-- 갈멜 줄기 (오른쪽 멀리) -->
    <path class="bd-far" d="M140 ${H} L140 150 C220 130 320 120 ${W * 3} 128 L${W * 3} ${H} Z"/>
    <!-- 므깃도 텔 (왼쪽) -->
    <path class="bd-mid" d="M-60 ${H} L-60 200 C-20 170 40 158 100 158 C140 158 170 170 190 ${H} Z"/>
    ${wall(-10, 150, 148, 162, [60], 'bd-mid')}
    <!-- 이스르엘 평지와 지평선의 병거 먼지 -->
    <path class="bd-mid" d="M${-W * 2} 196 C40 192 200 186 ${W * 3} 190 L${W * 3} ${H} L${-W * 2} ${H} Z"/>
    <g class="jd-dust"><ellipse cx="300" cy="184" rx="40" ry="8"/><ellipse cx="340" cy="180" rx="30" ry="7"/><ellipse cx="264" cy="186" rx="22" ry="5"/></g>
    <g class="jd-chariots">${[270, 290, 312, 334, 352].map((x, i) => `<g transform="translate(${x} ${186 + (i % 2)})"><circle cx="0" cy="0" r="2"/><rect x="-3" y="-5" width="5" height="4"/><path d="M2 -3 L7 -4 L9 -1 L7 0 Z"/></g>`).join('')}</g>
    ${ground(248)}
  </g>`;
}

// ── 10. 에워싸인 예루살렘 (25:1-3) ────────────────
function siegeArt(): string {
  return `<g class="jd jd--siege">
    ${stars(26, 60, 2501)}
    ${ridge([[-W * 2, 120], [-40, 112], [160, 118], [300, 108], [W * 3, 116]], 'bd-far')}
    ${wall(-W * 2, W * 3, 120, 196, [30, 130, 270, 370])}
    <rect class="jd-gate" x="186" y="150" width="28" height="46"/>
    <g class="bd-far jd-skyline">${Array.from({ length: 10 }, (_, i) => `<rect x="${110 + i * 18}" y="${100 - ((i * 5) % 9)}" width="14" height="${22 + ((i * 5) % 9)}"/>`).join('')}
      <rect x="182" y="78" width="36" height="44"/><rect x="172" y="94" width="56" height="28"/></g>
    <!-- 토성 셋 -->
    ${[[100, 1], [250, 1.2], [350, 0.9]].map(([x, s]) => `<path class="jd-ramp" d="M${f(x - 40 * s)} 236 C${f(x - 20 * s)} ${f(210)} ${f(x - 8 * s)} ${f(190)} ${f(x)} ${f(170)} L${f(x + 14 * s)} 172 C${f(x + 20 * s)} 196 ${f(x + 30 * s)} 216 ${f(x + 46 * s)} 236 Z"/>`).join('')}
    <g class="jd-campfront">${camp(2502, false, [[236, 1.4, 12]])}</g>
    ${ground(246)}
  </g>`;
}

// ── 11. 두 성벽 사이 (25:4) ─────────────────────
function breachArt(): string {
  return `<g class="jd jd--breach">
    ${stars(30, 70, 2504)}
    <!-- 안쪽 성벽 (뒤) -->
    ${wall(-W * 2, W * 3, 96, 220, [80, 320], 'bd-far')}
    <!-- 왕의 동산 나무들 -->
    <g class="bd-mid">${[120, 160, 250, 290].map((x, i) => `<rect x="${x - 1.4}" y="${190 - i % 2 * 6}" width="2.8" height="40"/><ellipse cx="${x}" cy="${182 - i % 2 * 6}" rx="${14 + i % 2 * 4}" ry="12"/>`).join('')}</g>
    <!-- 곁문 -->
    <path class="jd-gate jd-gate--open" d="M190 230 L190 186 Q200 176 210 186 L210 230 Z"/>
    <!-- 바깥 성벽 (앞) — 왼쪽에 뚫린 구멍과 무너진 돌 -->
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 214 L40 214 L44 206 L58 210 L62 222 L72 236 L96 236 L104 222 L110 210 L124 206 L130 214 L${W * 3} 214 L${W * 3} ${H} Z"/>
    <g class="bd-near jd-rubble">${[[60, 246, 9], [78, 250, 7], [100, 244, 8], [118, 252, 6], [44, 252, 6]].map(([x, y, s]) => `<rect x="${x}" y="${y}" width="${s}" height="${s * 0.7}" transform="rotate(${(x * 7) % 30 - 15} ${x} ${y})"/>`).join('')}</g>
    <path class="jd-breachedge" d="M44 206 L58 210 L62 222 L72 236 M96 236 L104 222 L110 210 L124 206"/>
    <path class="jd-path" d="M200 232 C230 240 300 244 ${W * 3} 242"/>
  </g>`;
}

// ── 12. 불타는 성전 / 불탄 뒤 (25:9-10) ─────────────
function burningArt(ash: boolean): string {
  const r = rng(ash ? 2510 : 2509);
  const roofs = Array.from({ length: 9 }, (_, i) => {
    const x = -60 + i * 64 + r() * 20;
    const w = 30 + r() * 20;
    const h = 22 + r() * 14;
    return ash
      ? `<path class="jd-charred" d="M${f(x)} 248 L${f(x)} ${f(248 - h)} L${f(x + w * 0.3)} ${f(248 - h + 6)} L${f(x + w * 0.6)} ${f(248 - h - 2)} L${f(x + w)} ${f(248 - h + 8)} L${f(x + w)} 248 Z"/>`
      : `<rect class="bd-near" x="${f(x)}" y="${f(248 - h)}" width="${f(w)}" height="${f(h)}"/>
         ${i % 2 ? `<path class="jd-roofflame" style="--d:${f(r() * 2)}s" d="M${f(x + 4)} ${f(248 - h)} C${f(x + 6)} ${f(248 - h - 14)} ${f(x + w * 0.5)} ${f(248 - h - 10)} ${f(x + w * 0.5)} ${f(248 - h - 22)} C${f(x + w * 0.6)} ${f(248 - h - 10)} ${f(x + w - 6)} ${f(248 - h - 12)} ${f(x + w - 4)} ${f(248 - h)} Z"/>` : ''}
         <rect class="jd-winfire" x="${f(x + w * 0.4)}" y="${f(248 - h + 6)}" width="4" height="5"/>`;
  }).join('');
  return `<g class="jd jd--burning${ash ? ' is-ash' : ''}">
    ${ridge([[-W * 2, 150], [-40, 140], [140, 146], [300, 136], [W * 3, 144]], 'bd-far')}
    ${ash ? '' : '<rect class="jd-redsky" x="-800" y="0" width="2000" height="260"/>'}
    <g class="jd-bigsmoke">${smoke(170, 60, 2511, 8)}${smoke(232, 50, 2512, 8)}${smoke(110, 120, 2513, 5)}${smoke(300, 110, 2514, 5)}</g>
    ${temple(200, 226, 1, ash ? 'ash' : 'fire')}
    ${roofs}
    ${ash ? `<g class="jd-ashfall">${Array.from({ length: 30 }, () => `<circle style="--d:${f(r() * 10)}s; --dx:${f((r() - 0.5) * 30)}px" cx="${f(r() * W)}" cy="${f(r() * 120)}" r="${f(0.6 + r() * 0.8)}"/>`).join('')}</g>` : ''}
    ${ground(250)}
  </g>`;
}

// ── 13. 사로잡혀 가는 길 (25:11, 21) ─────────────
function exileArt(): string {
  // 길을 따라 지평선까지 줄어드는 행렬
  const r = rng(2521);
  const walkers = Array.from({ length: 46 }, (_, i) => {
    const t = i / 45;
    const y = 246 - t * 92;
    const x = 120 + Math.sin(t * 3.4) * 50 * (1 - t) + t * 120;
    const s = 3.6 * (1 - t * 0.85);
    const soldier = i % 9 === 4;
    return `<g class="${soldier ? 'jd-guard' : 'jd-captive'}" style="--d:${f(r() * 3)}s">
      <rect x="${f(x - s * 0.45)}" y="${f(y - s * 3)}" width="${f(s * 0.9)}" height="${f(s * 3)}" rx="${f(s * 0.45)}"/>
      ${soldier ? `<path d="M${f(x + s * 0.6)} ${f(y)} L${f(x + s * 0.6)} ${f(y - s * 5)}"/>` : i % 4 === 1 ? `<rect x="${f(x - s * 0.9)}" y="${f(y - s * 3.6)}" width="${f(s * 1.4)}" height="${f(s * 0.9)}" rx="${f(s * 0.3)}"/>` : ''}
    </g>`;
  }).join('');
  return `<g class="jd jd--exile">
    ${ridge([[-W * 2, 152], [-60, 146], [120, 150], [300, 144], [W * 3, 150]], 'bd-far')}
    <!-- 왼쪽 뒤로 연기 오르는 성 -->
    ${farCity(30, 150, 0.6, true)}
    <g class="jd-bigsmoke">${smoke(22, 120, 2522, 6)}${smoke(46, 126, 2523, 5)}</g>
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 170 C0 166 200 160 ${W * 3} 166 L${W * 3} ${H} Z"/>
    <path class="jd-exileroad" d="M80 ${H} C120 230 170 210 186 196 C206 178 220 168 240 156 L246 156 C232 168 222 182 210 198 C190 222 170 240 170 ${H} Z"/>
    <g class="jd-column">${walkers}</g>
    ${ground(254)}
  </g>`;
}

// ── 14. 바벨론 왕궁 (25:27-30) ───────────────────
function babylonArt(): string {
  const lions = Array.from({ length: 7 }, (_, i) => {
    const x = -60 + i * 76;
    return `<path class="jd-lion" d="M${x} 112 C${x + 4} 104 ${x + 14} 102 ${x + 22} 104 C${x + 28} 98 ${x + 36} 100 ${x + 38} 106 L${x + 40} 112 L${x + 36} 112 L${x + 34} 108 C${x + 30} 110 ${x + 26} 110 ${x + 22} 110 L${x + 20} 120 L${x + 16} 120 L${x + 16} 112 L${x + 8} 112 L${x + 6} 120 L${x + 2} 120 Z"/>`;
  }).join('');
  const rosettes = Array.from({ length: 14 }, (_, i) => `<circle cx="${-60 + i * 38}" cy="134" r="3"/><circle class="jd-rosecore" cx="${-60 + i * 38}" cy="134" r="1.2"/>`).join('');
  const bricks = Array.from({ length: 10 }, (_, i) => `M${-W * 2} ${f(20 + i * 22)} H${W * 3}`).join(' ');
  return `<g class="jd jd--babylon">
    <rect class="jd-tile" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <path class="jd-brickline" d="${bricks}"/>
    <rect class="jd-band" x="${-W * 2}" y="96" width="${W * 5}" height="28"/>
    <g class="jd-lions">${lions}</g>
    <g class="jd-rosettes">${rosettes}</g>
    <!-- 높은 문 (가운데) -->
    <path class="jd-arch" d="M164 228 L164 104 Q200 72 236 104 L236 228 Z"/>
    <path class="jd-archlight" d="M172 228 L172 110 Q200 84 228 110 L228 228 Z"/>
    <!-- 등잔 둘 -->
    ${[110, 290].map((x, i) => `<g><rect class="jd-lampstand" x="${x - 1.5}" y="176" width="3" height="58"/><ellipse class="jd-lampflame" style="--d:${i * 0.6}s" cx="${x}" cy="172" rx="2.4" ry="4.2"/><circle class="bd-halo" cx="${x}" cy="170" r="26"/></g>`).join('')}
    <!-- 긴 상: 떡과 잔 -->
    <g class="jd-table"><rect x="118" y="214" width="164" height="5"/><rect x="126" y="219" width="4" height="22"/><rect x="270" y="219" width="4" height="22"/>
      ${[140, 166, 200, 234, 260].map((x, i) => i % 2 ? `<path d="M${x - 4} 214 L${x - 3} 207 L${x + 3} 207 L${x + 4} 214 Z"/>` : `<ellipse cx="${x}" cy="211" rx="8" ry="3.4"/>`).join('')}</g>
    <rect class="jd-floor" x="${-W * 2}" y="240" width="${W * 5}" height="${H - 240}"/>
  </g>`;
}

export function judahArt(art: JudahArt): string {
  switch (art) {
    case 'jd-nehushtan': return nehushtanArt(false);
    case 'jd-nehushtan-broken': return nehushtanArt(true);
    case 'jd-lachish': return lachishArt();
    case 'jd-wall-conduit': return conduitArt();
    case 'jd-camp': return campArt(false);
    case 'jd-camp-still': return campArt(true);
    case 'jd-repair': return repairArt();
    case 'jd-scroll-room': return scrollRoomArt();
    case 'jd-kidron-fire': return kidronArt();
    case 'jd-bethel': return bethelArt();
    case 'jd-megiddo': return megiddoArt();
    case 'jd-siege': return siegeArt();
    case 'jd-breach': return breachArt();
    case 'jd-temple-burning': return burningArt(false);
    case 'jd-temple-ash': return burningArt(true);
    case 'jd-exile-road': return exileArt();
    case 'jd-babylon-court': return babylonArt();
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

/** 무대 위 인물의 그림 상자 (scene 기준). 없으면 가운데 */
function actorBox(scene: HTMLElement, id: string | undefined) {
  const b = scene.getBoundingClientRect();
  const actors = [...scene.querySelectorAll<HTMLElement>('.scene__stage .actor')];
  const el = (id ? actors.find((a) => a.dataset.id === id) : undefined) ?? actors[0];
  const a = el ? (el.querySelector<SVGElement>('.actor__art') ?? el).getBoundingClientRect() : null;
  if (!a || !a.width) return { x: b.width * 0.5, top: b.height * 0.4, h: b.height * 0.5, w: b.width, H: b.height };
  return { x: a.left - b.left + a.width / 2, top: a.top - b.top, h: a.height, w: b.width, H: b.height };
}

/** letter-spread: 편지를 여호와 앞에 펴 놓음 (19:14) */
export function playLetterSpread(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const a = actorBox(scene, who ?? 'hezekiah');
  const b = scene.getBoundingClientRect();
  const tx = b.width * 0.5;
  const ty = b.height * 0.8;
  const marks = Array.from({ length: 5 }, (_, i) => `<i style="--i:${i}; --w:${70 + ((i * 37) % 26)}%"></i>`).join('');
  layerOf(scene, `fx-spread${rm ? ' is-rm' : ''}`,
    `<div class="fx-spread__from" style="--x:${a.x.toFixed(0)}px; --y:${(a.top + a.h * 0.45).toFixed(0)}px; --tx:${(tx - a.x).toFixed(0)}px; --ty:${(ty - a.top - a.h * 0.45).toFixed(0)}px"><b></b></div>
     <div class="fx-spread__sheet" style="--x:${tx.toFixed(0)}px; --y:${ty.toFixed(0)}px"><span>${marks}</span></div>
     <b class="fx-spread__ray" style="--x:${tx.toFixed(0)}px; --y:${ty.toFixed(0)}px"></b>`,
    rm ? 4200 : 10000, 1800);
}

/** camp-silence: 그 밤 (19:35) — 진의 불이 하나씩 꺼짐. 시체는 그리지 않는다 */
export function playCampSilence(scene: HTMLElement, rm: boolean): void {
  const last = scene.querySelector('.scene__backdrop .backdrop:last-child');
  const fires = [...(last?.querySelectorAll<SVGElement>('.jd-fire') ?? [])];
  const b = scene.getBoundingClientRect();
  // 가장자리부터 가운데로: 가운데에서 먼 불이 먼저 꺼진다
  const cx = b.left + b.width / 2;
  const dist = fires.map((n) => Math.abs(n.getBoundingClientRect().left - cx));
  const max = Math.max(1, ...dist);
  fires.forEach((n, i) => {
    const t = 1 - dist[i] / max;
    n.style.setProperty('--o', `${(rm ? 0 : 0.6 + t * 6 + ((i * 37) % 10) / 12).toFixed(2)}s`);
  });
  last?.classList.add('jd-silencing');
  layerOf(scene, `fx-silence${rm ? ' is-rm' : ''}`, `<b class="fx-silence__wind"></b><b class="fx-silence__dark"></b>`, rm ? 3000 : 11000, 2400);
}

const SCROLL_LINES = ['אֵלֶּה הַדְּבָרִים', 'שְׁמַע יִשְׂרָאֵל', 'וְאָהַבְתָּ', 'בְּכָל־לְבָבְךָ', 'וּבְכָל־נַפְשְׁךָ'];

/** scroll-found: 율법책이 펼쳐지며 글줄이 켜짐 (22:8-11) */
export function playScrollFound(scene: HTMLElement, rm: boolean): void {
  const lines = SCROLL_LINES.map((t, i) => `<p style="--i:${i}">${t}</p>`).join('');
  layerOf(scene, `fx-scroll${rm ? ' is-rm' : ''}`,
    `<div class="fx-scroll__glow"></div>
     <div class="fx-scroll__body"><i class="fx-scroll__rod fx-scroll__rod--l"></i><div class="fx-scroll__sheet">${lines}</div><i class="fx-scroll__rod fx-scroll__rod--r"></i></div>`,
    rm ? 4200 : 10500, 1800);
}

/** burn-idols: 우상 기구를 불사름 (18:4 · 23:4-15) */
export function playBurnIdols(scene: HTMLElement, rm: boolean): void {
  // 목상(아세라) · 주상 · 해 바퀴 · 작은 신상 둘 · 놋뱀 장대
  const idols = `
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g class="fx-burn__idol" style="--i:0"><path d="M30 118 L30 34 L26 30 L34 22 L42 30 L38 34 L38 118 Z"/><path d="M34 46 L22 40 M34 58 L46 52 M34 70 L24 66"/></g>
      <g class="fx-burn__idol" style="--i:1"><path d="M60 118 L62 54 Q70 44 78 54 L80 118 Z"/></g>
      <g class="fx-burn__idol" style="--i:2"><circle cx="110" cy="70" r="20" fill="none" stroke-width="5"/><path d="M110 50 L110 90 M90 70 L130 70 M96 56 L124 84 M124 56 L96 84" fill="none" stroke-width="2.6"/><path d="M106 90 L104 118 L116 118 L114 90 Z"/></g>
      <g class="fx-burn__idol" style="--i:3"><path d="M146 118 L146 92 Q144 82 150 80 Q146 74 151 70 Q156 74 152 80 Q158 82 156 92 L156 118 Z"/></g>
      <g class="fx-burn__idol" style="--i:4"><path d="M172 118 L174 98 Q172 90 177 88 Q174 82 178 80 Q182 82 180 88 Q185 90 183 98 L185 118 Z"/></g>
    </svg>`;
  const r = rng(Date.now() % 9973);
  const sparks = rm ? '' : Array.from({ length: 34 }, () => `<i style="--x:${(r() * 100).toFixed(0)}%; --dx:${((r() - 0.5) * 60).toFixed(0)}px; --d:${(1.4 + r() * 4).toFixed(2)}s; --s:${(0.6 + r()).toFixed(2)}"></i>`).join('');
  layerOf(scene, `fx-burn${rm ? ' is-rm' : ''}`,
    `<div class="fx-burn__stage">${idols}<b class="fx-burn__heat"></b><b class="fx-burn__pile"></b><div class="fx-burn__sparks">${sparks}</div></div>`,
    rm ? 4000 : 10000, 1800);
}

/** temple-fire: 성전이 불탐 (25:9) — 불빛·불티·연기. 사람은 그리지 않는다 */
export function playTempleFire(scene: HTMLElement, rm: boolean): void {
  const r = rng(2509);
  const sparks = rm ? '' : Array.from({ length: 60 }, () => `<i style="--x:${(r() * 100).toFixed(1)}%; --dx:${((r() - 0.5) * 80).toFixed(0)}px; --d:${(r() * 9).toFixed(2)}s; --t:${(2.6 + r() * 3).toFixed(2)}s; --s:${(0.5 + r() * 1.2).toFixed(2)}"></i>`).join('');
  const smokes = rm ? '' : Array.from({ length: 7 }, (_, i) => `<b class="fx-tfire__smoke" style="--x:${(8 + i * 14 + r() * 6).toFixed(0)}%; --d:${(i * 0.9).toFixed(1)}s"></b>`).join('');
  layerOf(scene, `fx-tfire${rm ? ' is-rm' : ''}`, `<b class="fx-tfire__glow"></b>${smokes}<div class="fx-tfire__sparks">${sparks}</div>`, rm ? 4000 : 12500, 2600);
}

/** pillars-fall: 놋 기둥 둘이 쓰러짐 (25:13, 17 — 왕상 7:21 야긴과 보아스) */
export function playPillarsFall(scene: HTMLElement, rm: boolean): void {
  const pillar = (name: string, side: 'l' | 'r') => `<div class="fx-pfall__p fx-pfall__p--${side}">
    <svg viewBox="0 0 40 200" aria-hidden="true">
      <path class="fx-pfall__bronze" d="M14 196 L14 46 L26 46 L26 196 Z"/>
      <path class="fx-pfall__bronze" d="M6 46 C3 34 8 24 13 24 L27 24 C32 24 37 34 34 46 Z"/>
      <path class="fx-pfall__lily" d="M12 24 C10 14 16 14 20 6 C24 14 30 14 28 24 Z"/>
      <path class="fx-pfall__net" d="M7 32 H33 M6 38 H34"/>
      ${Array.from({ length: 7 }, (_, i) => `<circle class="fx-pfall__pom" cx="${8 + i * 4}" cy="${44 - Math.sin((i / 6) * Math.PI) * 2}" r="1.6"/>`).join('')}
      <rect class="fx-pfall__bronze" x="10" y="194" width="20" height="5"/>
    </svg>
    <em>${name}</em>
  </div>`;
  const poms = rm ? '' : Array.from({ length: 14 }, (_, i) => `<i style="--dx:${((i - 6.5) * 14).toFixed(0)}px; --d:${(2.3 + (i % 4) * 0.08).toFixed(2)}s"></i>`).join('');
  layerOf(scene, `fx-pfall${rm ? ' is-rm' : ''}`,
    `<div class="fx-pfall__stage">${pillar('야긴', 'l')}${pillar('보아스', 'r')}<b class="fx-pfall__dust"></b><div class="fx-pfall__poms">${poms}</div></div>`,
    rm ? 4000 : 9000, 2000);
}

/** small-lamp: 작은 불빛 (25:27-30). 두 왕국 판의 남유다 칸에 등불이 켜져 남는다 */
export function playSmallLamp(scene: HTMLElement, rm: boolean): void {
  const lamp = `<span class="jd-lamp${rm ? ' is-rm' : ''}" aria-hidden="true"><b class="jd-lamp__halo"></b><b class="jd-lamp__clay"></b><b class="jd-lamp__flame"></b><small>왕하 25:27</small></span>`;
  // 판은 같은 beat의 kings로 막 펴졌을 수 있다 → 한 틀 뒤에 찾는다
  requestAnimationFrame(() => {
    const board = scene.querySelector<HTMLElement>('.kingdoms');
    const col = board?.querySelector('.kd__col[data-k="judah"]');
    if (board && col) {
      if (!col.querySelector('.jd-lamp')) col.insertAdjacentHTML('beforeend', lamp);
      board.classList.add('has-lamp');
      const mini = board.querySelector('.kd__mini p[data-k="judah"]');
      if (mini && !mini.querySelector('.jd-minilamp')) mini.insertAdjacentHTML('beforeend', '<i class="jd-minilamp"></i>');
      return;
    }
    layerOf(scene, `fx-lamp${rm ? ' is-rm' : ''}`, lamp, rm ? 4000 : 9000, 2400);
  });
}
