// 사사기 A급 6개 (삿 4–5 · 6–7 · 11 · 13–15 · 16 · 19–21) + 룻기 A급 2개 (룻 1 · 4)의 전용 배경과 효과.
// 같은 종이 오려낸 그림자극 말투. 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  드보라 (삿 4–5)
//  - jg-palm        : 에브라임 산지, 라마와 벧엘 사이 드보라의 종려나무. 그 아래 돌 자리, 재판을 받으러 온 사람들 (4:5)
//  - jg-tabor       : 둥근 다볼산과 이스르엘 평지, 멀리 기손 강가에 늘어선 철 병거 구백 승의 번쩍임 (4:6-7, 13)
//  - jg-kishon      : 폭우에 불어난 기손 강, 진창에 바퀴가 빠져 기울어진 병거들 (5:20-21)
//  - jg-tent        : 사아난님 상수리나무 곁 겐 사람 헤벨의 장막, 저녁. 장막 문이 열려 안에 불빛 (4:11, 17)
//  - jg-tent-shut   : 같은 장막, 문이 닫히고 불이 꺼짐
//  - jg-lattice     : 시스라의 어미가 창문으로, 살창으로 내다봄 — 실내 벽의 격자창, 그 너머 빈 길 (5:28)
//  기드온 (삿 6–7)
//  - jg-winepress   : 오브라 상수리나무 아래 바위를 파서 만든 포도주 틀. 거기서 밀을 타작해 겨가 날림 (6:11)
//  - jg-baal        : 밤, 언덕 위 바알의 단과 그 곁의 아세라 목상 (6:25)
//  - jg-baal-torn   : 새벽, 헐린 바알의 단과 찍힌 아세라, 새로 쌓은 단 위의 연기 (6:28)
//  - jg-fleece-wet  : 밤 타작마당 위 양털 한 뭉치에만 이슬이 반짝이고 땅은 마름 (6:37-38)
//  - jg-fleece-dry  : 이튿날, 양털은 마르고 온 땅에만 이슬이 반짝임 (6:39-40)
//  - jg-harod       : 하롯 샘. 물가에 엎드린 사람들과 손으로 떠 핥는 사람들, 북쪽 모레 산 아래 미디안 진 (7:1, 5-6)
//  - jg-midian      : 밤, 골짜기를 메뚜기처럼 덮은 미디안의 장막과 낙타들을 언덕 위에서 내려다봄 (7:12). fx torches와 같이
//  입다 (삿 11)
//  - jg-mizpah      : 길르앗 미스바, 저녁. 입다의 집 문과 그리로 오르는 길 (11:34)
//  - jg-mountains   : 산들 위의 저녁. 멀리 능선을 걷는 작은 사람들 — 딸과 동무들이 두 달 동안 애곡 (11:38)
//  삼손 (삿 13–16)
//  - jg-zorah       : 소라의 들판, 반석 위의 제단 (13:19). fx flame-up과 같이
//  - jg-timnah      : 딤나의 포도원 사이 길 (14:5)
//  - jg-timnah-lion : 같은 길, 포도원에서 젊은 사자가 뛰어나옴 (14:5)
//  - jg-honey       : 같은 길가, 사자의 주검에 벌 떼 (14:8)
//  - jg-fields      : 블레셋의 곡식밭·포도원·감람원 (15:5)
//  - jg-fields-burnt: 탄 밭, 연기 (15:5)
//  - jg-lehi        : 레히의 바위 언덕과 우묵한 곳 (15:9, 19)
//  - jg-lehi-spring : 우묵한 곳에서 물이 솟음 — 엔학고레 (15:19)
//  - jg-gaza-gate   : 밤중의 가사 성문 (16:2-3)
//  - jg-gate-hill   : 새벽, 헤브론 앞 산꼭대기에 놓인 성 문짝과 문설주 (16:3)
//  - jg-sorek       : 소렉 골짜기 들릴라의 집 안, 등잔과 베틀 (16:4, 13)
//  - jg-mill        : 가사 옥의 맷돌 (16:21)
//  - jg-dagon       : 다곤의 신전. 가운데 두 기둥, 지붕 위 삼천 명, 제사의 불 (16:23-27)
//  - jg-dagon-fallen: 무너진 신전 — 부러진 기둥, 돌더미, 흙먼지 (16:30). 사람 몸은 그리지 않는다
//  레위인과 첩 (삿 19–21)
//  - jg-gibeah      : 밤, 기브아의 거리(광장). 닫힌 문들, 노인의 집 문에만 불빛 (19:15-21)
//  - jg-gibeah-dawn : 동틀 녘, 같은 집 문과 문지방. 아무것도 그리지 않는다 (19:26-27)
//  - jg-gibeah-smoke: 성읍에서 연기 기둥이 하늘로 올라감 (20:40)
//  - jg-rimmon      : 광야의 림몬 바위 (20:47)
//  - jg-shiloh      : 실로 근처 포도원, 멀리 언덕 위 하나님의 집 장막 (21:19-21)
//  룻기 (룻 1 · 4, 룻 2 · 3에도) — 장면 "theme": "harvest"와 같이 밝게
//  - rt-moab-road   : 모압에서 유다로 가는 길, 아침. 갈림길과 이정표 돌무더기 (룻 1:7-8)
//  - rt-bethlehem   : 언덕 위 베들레헴 성읍과 그 아래 보리밭 (룻 1:19, 22)
//  - rt-field       : 보리 추수하는 밭: 베는 사람들의 줄, 단, 이삭 줍는 자리, 원두막 그늘 (룻 2:3, 14)
//  - rt-threshing   : 밤 타작마당: 곡식 더미, 키(까부르는 갈퀴), 등잔 (룻 3:2, 7)
//  - rt-gate        : 성문: 문 곁 돌 자리에 앉은 장로 열 명 (룻 4:1-2)
// 효과:
//  - torches    : 삼백 명이 진 둘레 세 곳에서 항아리를 깨뜨리고 횃불을 듦 → 진 안의 불빛이 흔들리며 흩어짐 (약 9초, 7:19-21)
//  - flame-up   : 제단의 불꽃 속으로 빛이 하늘로 올라감 (약 6초, 13:20)
//  - foxes      : 꼬리에 홰를 단 여우들이 밭을 가로질러 달리고 불이 번짐 (약 8초, 15:4-5)
//  - pillars    : 두 기둥이 휘고 지붕이 무너져 내림, 흙먼지 (약 6초, 16:29-30). shake와 같이
//  - lament     : 산 위에 작은 불빛 넷이 켜지고, 해마다 한 줄씩 늘어남 — "해마다 나흘씩" (약 10초, 11:40)
//  - summons    : 가운데에서 열두 줄기 불티가 사방 끝으로 흩어져 나감 — 이스라엘 온 지경에 (약 5초, 19:29)
//  - genealogy  : 베레스부터 다윗까지 열 이름이 한 줄로 켜지고, 끝에 마태복음의 이음 (약 14초, 룻 4:18-22)
// 하나님은 그리지 않는다. 살해·폭력·죽음은 그리지 않는다 (fx blackout + beat sound로 대신).
import { H, W, palm, rng, smoke, tree } from './backdrop';
import { folk, ground, ridge, stars } from './joshua';

export type JudgesArt =
  | 'jg-palm' | 'jg-tabor' | 'jg-kishon' | 'jg-tent' | 'jg-tent-shut' | 'jg-lattice'
  | 'jg-winepress' | 'jg-baal' | 'jg-baal-torn' | 'jg-fleece-wet' | 'jg-fleece-dry' | 'jg-harod' | 'jg-midian'
  | 'jg-mizpah' | 'jg-mountains'
  | 'jg-zorah' | 'jg-timnah' | 'jg-timnah-lion' | 'jg-honey' | 'jg-fields' | 'jg-fields-burnt' | 'jg-lehi' | 'jg-lehi-spring'
  | 'jg-gaza-gate' | 'jg-gate-hill' | 'jg-sorek' | 'jg-mill' | 'jg-dagon' | 'jg-dagon-fallen'
  | 'jg-gibeah' | 'jg-gibeah-dawn' | 'jg-gibeah-smoke' | 'jg-rimmon' | 'jg-shiloh'
  | 'rt-moab-road' | 'rt-bethlehem' | 'rt-field' | 'rt-threshing' | 'rt-gate';

const f = (n: number) => n.toFixed(1);

/** 먼 산지 (에브라임·유다 산지) */
const farHills = (seed: number, y = 150) => {
  const r = rng(seed);
  return ridge([[-W * 2, y], [-180, y - 10 - r() * 8], [-40, y - 2], [70, y - 18 - r() * 8], [170, y - 6], [270, y - 20 - r() * 6], [380, y - 4], [500, y - 14], [W * 3, y]], 'bd-far');
};

/** 낮은 집 한 채 (평평한 지붕) */
function house(x: number, y: number, w: number, h: number, cls = 'bd-mid', door = false, lit = false): string {
  return `<g class="${cls}"><rect x="${f(x)}" y="${f(y - h)}" width="${f(w)}" height="${f(h)}"/><rect x="${f(x - 1)}" y="${f(y - h - 2)}" width="${f(w + 2)}" height="2"/></g>
    ${door ? `<rect class="jg-door${lit ? ' is-lit' : ''}" x="${f(x + w / 2 - 3)}" y="${f(y - 10)}" width="6" height="10" rx="2.6"/>` : ''}`;
}

/** 늘어선 병거 (작은 실루엣: 바퀴 + 수레 + 말) */
function chariots(x0: number, y: number, n: number, s: number, seed: number, tilt = 0): string {
  const r = rng(seed);
  return `<g class="jg-chariots">${Array.from({ length: n }, (_, i) => {
    const x = x0 + i * s * 9 + (r() - 0.5) * s * 2;
    const yy = y + (r() - 0.5) * s;
    const t = tilt ? (r() - 0.3) * tilt : 0;
    return `<g transform="translate(${f(x)} ${f(yy)}) rotate(${f(t)}) scale(${s})">
      <path class="jg-horse" d="M-7 -3 C-6 -6 -3 -6.4 -1 -5.6 L1 -7 L1.6 -5 C2 -3.6 1 -2.4 -0.4 -2.6 L-0.8 0 L-1.6 0 L-1.8 -2.4 L-5 -2.4 L-5.4 0 L-6.2 0 Z"/>
      <path class="jg-cart" d="M1.6 -4.4 L6.4 -4.4 L6 -1.6 L2 -1.6 Z"/>
      <circle class="jg-wheel" cx="4.2" cy="-1" r="1.7"/>
      <circle class="jg-iron" style="--d:${f(r() * 4)}s" cx="4.2" cy="-1" r="0.6"/>
    </g>`;
  }).join('')}</g>`;
}

/** 장막 하나 (헤벨의 장막, 미디안 진) */
function bigTent(x: number, ground: number, s: number, open: boolean, lit: boolean): string {
  return `<g class="bd-mid jg-tent" transform="translate(${x} ${ground}) scale(${s})">
    <path d="M-46 0 L-36 -26 L-6 -36 L0 -44 L6 -36 L36 -26 L46 0 Z"/>
    <path d="M-50 0 L-36 -26 M50 0 L36 -26" fill="none" stroke="currentColor" stroke-width="1"/>
    ${open ? `<path class="jg-tentdoor${lit ? ' is-lit' : ''}" d="M-8 0 L-2 -28 L6 -28 L10 0 Z"/>` : '<path class="jg-tentdoor" d="M-6 0 L0 -26 L6 0 Z"/>'}
  </g>`;
}

// ── 드보라 (삿 4–5) ─────────────────────────────────
function palmArt(): string {
  return `<g class="jg jg--palm">
    ${farHills(7001, 156)}
    ${ridge([[-W * 2, 206], [-80, 198], [60, 204], [200, 196], [340, 204], [W * 3, 198]], 'bd-mid')}
    ${palm(186, 244, 116, 'bd-mid jg-thepalm', 7002)}
    <path class="bd-mid jg-seat" d="M196 246 L198 234 Q206 230 214 234 L216 246 Z"/>
    ${folk(240, 246, 300, 244, 7, 2.2, 7003)}${folk(80, 246, 130, 246, 5, 2.1, 7004)}
    ${palm(-40, 248, 60, 'bd-near', 7005)}${palm(430, 250, 70, 'bd-near', 7006)}
    ${ground()}
  </g>`;
}

function taborArt(storm: boolean): string {
  const r = rng(7101);
  const tabor = `<path class="bd-far jg-taborhill" d="M40 210 C70 170 104 112 150 98 C178 90 204 104 226 132 C250 162 270 196 300 210 Z"/>`;
  const river = storm
    ? `<path class="jg-flood" d="M${-W * 2} 214 C-60 206 100 222 200 214 C300 206 480 220 ${W * 3} 212 L${W * 3} 236 C460 244 300 230 200 238 C100 244 -80 230 ${-W * 2} 238 Z"/>
       ${Array.from({ length: 10 }, (_, i) => `<path class="js-current" style="--d:${f(i * 0.5)}s" d="M${-80 + i * 56} ${220 + (i % 3) * 5} q12 -2 24 0 t24 0"/>`).join('')}`
    : `<path class="jg-kishon" d="M${-W * 2} 222 C-40 218 120 226 220 220 C320 214 500 224 ${W * 3} 218"/>`;
  return `<g class="jg jg--tabor${storm ? ' is-storm' : ''}">
    ${storm ? `<g class="js-storm"><path d="M60 50 C90 20 170 18 190 40 C220 14 300 22 320 54 C370 50 400 80 370 98 L80 98 C30 96 30 64 60 50 Z"/><path d="M-60 80 C-30 60 40 60 60 80 L60 100 L-60 100 Z"/></g>` : ''}
    ${ridge([[-W * 2, 176], [-120, 168], [0, 174], [380, 170], [520, 164], [W * 3, 172]], 'bd-far js-plain')}
    ${tabor}
    ${storm ? '' : folk(118, 132, 176, 118, 14, 1.2, 7102)}
    ${river}
    ${chariots(storm ? 110 : 250, storm ? 230 : 214, storm ? 14 : 18, storm ? 1.5 : 0.9, 7103, storm ? 34 : 0)}
    ${storm ? '' : chariots(-120, 216, 14, 0.9, 7104)}
    ${Array.from({ length: 3 }, (_, i) => tree(-60 + i * 230 + r() * 20, 250, 40, 'bd-near', 7105 + i, { sway: true })).join('')}
    ${ground(250)}
  </g>`;
}

function tentArt(open: boolean): string {
  return `<g class="jg jg--tent${open ? ' is-open' : ''}">
    ${farHills(7201, 166)}
    ${tree(96, 238, 120, 'bd-mid', 7202, { lean: 0.1, sway: true })}
    ${bigTent(222, 242, 1.5, true, open)}
    ${open ? '<circle class="bd-halo jg-tent-halo" cx="226" cy="222" r="40"/>' : ''}
    ${tree(420, 250, 80, 'bd-near', 7203, { sway: true })}
    ${ground()}
  </g>`;
}

function latticeArt(): string {
  const bars: string[] = [];
  for (let i = 0; i <= 6; i++) bars.push(`M${f(166 + i * 11.3)} 84 L${f(166 + i * 11.3)} 168`);
  for (let j = 0; j <= 7; j++) bars.push(`M166 ${f(84 + j * 12)} L234 ${f(84 + j * 12)}`);
  return `<g class="jg jg--lattice">
    <rect class="bd-near" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <!-- 창 너머: 저녁 하늘과 빈 길 -->
    <rect class="jg-window-sky" x="166" y="84" width="68" height="84"/>
    <path class="jg-window-road" d="M166 168 L196 140 L206 140 L234 168 Z"/>
    <path class="jg-window-hill" d="M166 146 C186 136 214 140 234 132 L234 168 L166 168 Z"/>
    <path class="jg-lattice" d="${bars.join(' ')}"/>
    <rect class="jg-sill" x="158" y="168" width="84" height="6"/>
    <path class="jg-shaft" d="M166 84 L234 84 L300 ${H} L60 ${H} Z"/>
    <rect class="bd-mid" x="${-W * 2}" y="232" width="${W * 5}" height="${H - 232}"/>
  </g>`;
}

// ── 기드온 (삿 6–7) ─────────────────────────────────
function winepressArt(): string {
  const r = rng(7301);
  const chaff = Array.from({ length: 16 }, (_, i) => `<circle class="jg-chaff" style="--i:${i}; --dx:${f((r() - 0.3) * 50)}px; --dy:${f(-20 - r() * 40)}px" cx="${f(196 + (r() - 0.5) * 30)}" cy="${f(232 + (r() - 0.5) * 6)}" r="${f(0.6 + r() * 0.8)}"/>`).join('');
  return `<g class="jg jg--winepress">
    ${farHills(7302, 160)}
    ${tree(132, 236, 136, 'bd-mid', 7303, { lean: 0.15, sway: true })}
    <!-- 바위를 파서 만든 포도주 틀 (위 틀 + 아래 통) -->
    <path class="bd-mid jg-rock" d="M150 248 C152 232 170 224 200 224 C232 224 250 232 252 248 Z"/>
    <path class="jg-vat" d="M166 242 C168 234 182 230 200 230 C218 230 232 234 234 242 Z"/>
    ${chaff}
    ${house(300, 238, 26, 14, 'bd-mid')}${house(330, 240, 22, 12, 'bd-mid')}
    ${ground()}
  </g>`;
}

function baalArt(torn: boolean): string {
  const stones = (x: number, broken: boolean) => broken
    ? `<g class="bd-mid jg-ruinstones">${[0, 1, 2, 3, 4, 5].map((i) => `<ellipse cx="${x - 16 + i * 6.4}" cy="${246 - (i % 2) * 2}" rx="4.2" ry="2.6"/>`).join('')}</g>`
    : `<g class="bd-mid jg-baal-altar"><rect x="${x - 16}" y="222" width="32" height="24" rx="1.4"/><rect x="${x - 19}" y="218" width="38" height="5"/><path d="M${x - 19} 218 l-3 -5 l3 1 Z M${x + 19} 218 l3 -5 l-3 1 Z"/></g>`;
  const asherah = torn
    ? `<g class="bd-mid"><rect x="252" y="236" width="5" height="10"/><path d="M226 247 L280 241 L281 245 L227 250 Z"/></g>`
    : `<g class="bd-mid jg-asherah"><rect x="252" y="160" width="5" height="86"/><path d="M246 168 C252 160 258 160 264 168 C258 166 252 166 246 168 Z"/><circle cx="254.5" cy="156" r="5"/></g>`;
  return `<g class="jg jg--baal${torn ? ' is-torn' : ''}">
    ${torn ? '' : stars(90, 120, 7401)}
    ${farHills(7402, 168)}
    ${ridge([[-W * 2, 236], [-40, 226], [120, 214], [200, 206], [280, 214], [440, 228], [W * 3, 234]], 'bd-mid')}
    ${stones(200, torn)}
    ${asherah}
    ${torn ? `<g class="bd-mid jg-newaltar"><rect x="128" y="226" width="26" height="20" rx="2"/></g>${smoke(141, 222, 7403, 6)}` : ''}
    ${ground()}
  </g>`;
}

function fleeceArt(wet: boolean): string {
  const r = rng(7501);
  const dew = Array.from({ length: wet ? 14 : 60 }, () => {
    const x = wet ? 200 + (r() - 0.5) * 30 : -60 + r() * 520;
    const y = wet ? 238 + (r() - 0.5) * 6 : 236 + r() * 20;
    return `<circle class="jg-dew" style="--d:${f(r() * 4)}s" cx="${f(x)}" cy="${f(y)}" r="${f(0.5 + r() * 0.7)}"/>`;
  }).join('');
  return `<g class="jg jg--fleece${wet ? ' is-wet' : ' is-dry'}">
    ${stars(120, 130, 7502)}
    ${farHills(7503, 176)}
    <ellipse class="bd-mid jg-floor" cx="200" cy="244" rx="90" ry="10"/>
    <path class="jg-fleece" d="M184 242 C184 234 192 230 200 231 C210 230 218 234 217 242 C214 246 188 246 184 242 Z"/>
    ${dew}
    ${ground(250)}
  </g>`;
}

function harodArt(): string {
  const r = rng(7601);
  // 엎드려 마시는 사람들(낮은 둥근 몸) / 손으로 떠 핥는 사람들(서서 몸을 굽힘)
  const kneel = Array.from({ length: 12 }, (_, i) => `<ellipse class="jg-drinker" cx="${f(100 + i * 18 + r() * 4)}" cy="${f(226 + r() * 3)}" rx="3.6" ry="2.2"/>`).join('');
  const lap = Array.from({ length: 4 }, (_, i) => `<path class="jg-lapper" d="M${f(140 + i * 40)} 230 l0 -7 q2 -3 4 -1 l1 8 Z"/>`).join('');
  return `<g class="jg jg--harod">
    ${ridge([[-W * 2, 168], [-80, 160], [80, 166], [200, 146], [260, 140], [320, 150], [460, 164], [W * 3, 168]], 'bd-far jg-moreh')}
    <g class="bd-far jg-farcamp">${Array.from({ length: 22 }, (_, i) => `<path d="M${f(150 + i * 10)} ${f(166 + (i % 3))} l3 -4 l3 4 Z"/>`).join('')}</g>
    ${ridge([[-W * 2, 214], [-60, 206], [100, 212], [260, 204], [420, 210], [W * 3, 206]], 'bd-mid')}
    <path class="jg-pool" d="M60 232 C100 224 300 224 340 232 C300 240 100 240 60 232 Z"/>
    ${kneel}${lap}
    ${ground(250)}
  </g>`;
}

function midianArt(): string {
  const r = rng(7701);
  const tents = Array.from({ length: 90 }, () => {
    const x = -200 + r() * 800;
    const y = 192 + r() * 34;
    const s = 0.6 + (y - 192) / 50;
    return `<path class="jg-mtent" d="M${f(x)} ${f(y)} l${f(4 * s)} ${f(-5 * s)} l${f(4 * s)} ${f(5 * s)} Z"/>`;
  }).join('');
  const camels = Array.from({ length: 30 }, () => {
    const x = -200 + r() * 800;
    const y = 196 + r() * 30;
    return `<path class="jg-camel" d="M${f(x)} ${f(y)} q1 -3 3 -2 q1 -2 2 0 l2 -1 l0.4 3 Z"/>`;
  }).join('');
  const fires = Array.from({ length: 24 }, () => `<circle class="jg-campfire" style="--d:${f(r() * 3)}s" cx="${f(-160 + r() * 720)}" cy="${f(196 + r() * 30)}" r="0.9"/>`).join('');
  // 언덕 둘레 세 무리 (fx torches가 켬)
  const bands = [[-30, 186], [200, 178], [430, 186]].map(([cx, cy], k) => `<g class="jg-band" style="--k:${k}">${Array.from({ length: 34 }, (_, i) => {
    const a = (i / 33) * Math.PI;
    return `<circle class="jg-torch" style="--i:${i % 12}" cx="${f(cx + Math.cos(a) * 70 - 0)}" cy="${f(cy - Math.sin(a) * 6 + (r() - 0.5) * 3)}" r="1.1"/>`;
  }).join('')}</g>`).join('');
  return `<g class="jg jg--midian">
    ${stars(140, 120, 7702)}
    ${ridge([[-W * 2, 172], [-100, 164], [60, 170], [200, 160], [340, 170], [500, 162], [W * 3, 170]], 'bd-far')}
    <g class="bd-mid jg-camp">${tents}${camels}</g>${fires}
    ${bands}
    ${ridge([[-W * 2, 250], [-60, 238], [80, 232], [200, 236], [320, 230], [460, 240], [W * 3, 236]], 'bd-near')}
  </g>`;
}

// ── 입다 (삿 11) ────────────────────────────────────
function mizpahArt(): string {
  return `<g class="jg jg--mizpah">
    ${farHills(7801, 150)}
    ${ridge([[-W * 2, 200], [-60, 192], [100, 196], [240, 188], [400, 196], [W * 3, 190]], 'bd-mid')}
    <!-- 입다의 집 -->
    <g class="bd-mid"><rect x="170" y="176" width="60" height="44"/><rect x="166" y="172" width="68" height="5"/><rect x="232" y="190" width="26" height="30"/><rect x="230" y="186" width="30" height="4"/></g>
    <path class="jg-door is-lit jg-bigdoor" d="M192 220 L192 198 Q200 190 208 198 L208 220 Z"/>
    <circle class="bd-halo jg-door-halo" cx="200" cy="208" r="30"/>
    <path class="js-trail" d="M200 222 C196 232 176 240 150 248 C120 256 60 258 0 260"/>
    ${tree(80, 246, 70, 'bd-near', 7802, { sway: true })}${tree(350, 248, 64, 'bd-near', 7803, { sway: true })}
    ${ground()}
  </g>`;
}

function mountainsArt(): string {
  return `<g class="jg jg--mountains">
    ${stars(80, 90, 7901)}
    ${ridge([[-W * 2, 150], [-150, 120], [-40, 136], [70, 96], [150, 120], [230, 84], [320, 118], [420, 100], [W * 3, 130]], 'bd-far')}
    ${ridge([[-W * 2, 200], [-80, 178], [60, 186], [170, 160], [260, 172], [360, 156], [460, 176], [W * 3, 186]], 'bd-mid jg-ridge2')}
    ${folk(176, 162, 220, 164, 6, 1.1, 7902, 'js-folk jg-mourners')}
    ${ground(246)}
  </g>`;
}

// ── 삼손 (삿 13–16) ────────────────────────────────
function zorahArt(): string {
  return `<g class="jg jg--zorah">
    ${farHills(8001, 160)}
    ${ridge([[-W * 2, 212], [-40, 204], [140, 210], [300, 202], [W * 3, 208]], 'bd-mid')}
    <path class="bd-mid jg-rock" d="M168 248 C170 232 182 222 200 222 C220 222 232 232 234 248 Z"/>
    <ellipse class="bd-ember" cx="200" cy="222" rx="10" ry="2.2"/>
    ${house(300, 236, 24, 14)}${house(326, 238, 20, 12)}
    ${ground()}
  </g>`;
}

function vineRows(y0: number, n: number, seed: number, cls = 'bd-mid'): string {
  const r = rng(seed);
  return `<g class="${cls} jg-vines">${Array.from({ length: n }, (_, row) => {
    const y = y0 + row * 9;
    return Array.from({ length: 26 }, (_, i) => `<circle cx="${f(-140 + i * 26 + (row % 2) * 13 + r() * 3)}" cy="${f(y - r() * 2)}" r="${f(3 + row * 0.8 + r())}"/>`).join('');
  }).join('')}</g>`;
}

function timnahArt(kind: 'road' | 'lion' | 'honey'): string {
  const r = rng(8101);
  const lion = kind === 'lion'
    ? `<path class="bd-near jg-lion" d="M262 238 C266 228 278 222 292 224 C300 218 312 218 316 226 C322 226 326 232 322 236 C320 240 316 240 314 238 L314 250 L308 250 L306 238 L286 238 L282 250 L276 250 L276 238 C270 240 264 240 262 238 Z M316 226 C318 222 322 220 326 222"/>
       <path class="bd-near jg-lion-mane" d="M300 218 C292 216 290 228 296 234 C302 238 314 236 316 228 C318 220 308 214 300 218 Z"/>`
    : '';
  const honey = kind === 'honey'
    ? `<path class="bd-mid jg-carcass" d="M270 248 C272 242 290 240 304 242 C312 244 314 248 312 250 Z"/>
       <g class="jg-bees">${Array.from({ length: 14 }, (_, i) => `<circle style="--i:${i}; --dx:${f((r() - 0.5) * 20)}px; --dy:${f((r() - 0.5) * 12)}px" cx="${f(290 + (r() - 0.5) * 20)}" cy="${f(240 - r() * 8)}" r="0.7"/>`).join('')}</g>`
    : '';
  return `<g class="jg jg--timnah">
    ${farHills(8102, 162)}
    ${vineRows(196, 5, 8103)}
    <path class="js-trail" d="M90 260 C120 244 160 232 200 226 C240 220 300 214 360 206"/>
    ${lion}${honey}
    ${vineRows(246, 1, 8104, 'bd-near')}
    ${ground(254)}
  </g>`;
}

function fieldsArt(burnt: boolean): string {
  const r = rng(8201);
  const grainBand = burnt
    ? `<path class="jg-burnt" d="M${-W * 2} 224 L${W * 3} 222 L${W * 3} 244 L${-W * 2} 246 Z"/>${smoke(80, 214, 8202, 6)}${smoke(200, 210, 8203, 7)}${smoke(320, 214, 8204, 6)}`
    : `<g class="jg-grain">${Array.from({ length: 70 }, (_, i) => `<path d="M${f(-140 + i * 9 + r() * 3)} 244 l${f((r() - 0.5) * 2)} -${f(14 + r() * 6)}"/>`).join('')}</g>`;
  const olives = Array.from({ length: 4 }, (_, i) => tree(-40 + i * 150 + r() * 20, 220, 40 + r() * 10, burnt ? 'bd-mid jg-charred' : 'bd-mid', 8205 + i, { sway: !burnt })).join('');
  return `<g class="jg jg--fields${burnt ? ' is-burnt' : ''}">
    ${farHills(8210, 172)}
    ${vineRows(204, 2, 8211)}
    ${olives}
    ${grainBand}
    ${ground(252)}
  </g>`;
}

function lehiArt(spring: boolean): string {
  return `<g class="jg jg--lehi${spring ? ' is-spring' : ''}">
    ${farHills(8301, 170)}
    <path class="bd-mid jg-crag" d="M60 248 C70 210 96 170 130 150 C160 134 200 140 214 168 C226 150 260 144 284 162 C312 182 330 220 340 248 Z"/>
    <path class="jg-hollow" d="M176 248 C178 234 190 226 202 226 C216 226 226 234 228 248 Z"/>
    ${spring ? `<path class="jg-spring" d="M180 246 C190 240 214 240 224 246 C214 250 190 250 180 246 Z"/>${Array.from({ length: 6 }, (_, i) => `<path class="jg-spout" style="--i:${i}" d="M${200 + (i - 2.5) * 4} 240 q1 -8 0 -14"/>`).join('')}<circle class="bd-halo" cx="202" cy="236" r="34"/>` : ''}
    ${ground()}
  </g>`;
}

function gazaGateArt(): string {
  return `<g class="jg jg--gaza">
    ${stars(100, 110, 8401)}
    <g class="bd-mid">
      <rect x="40" y="150" width="140" height="98"/><rect x="220" y="150" width="140" height="98"/>
      <rect x="166" y="132" width="20" height="116"/><rect x="214" y="132" width="20" height="116"/>
      <rect x="162" y="126" width="76" height="8"/>
      ${Array.from({ length: 20 }, (_, i) => `<rect x="${44 + i * 16}" y="144" width="8" height="6"/>`).join('')}
    </g>
    <!-- 성 문짝 둘 (닫힌 채) -->
    <g class="jg-gatedoors"><rect x="186" y="170" width="14" height="78"/><rect x="200" y="170" width="14" height="78"/><path class="jg-bar" d="M184 204 h32"/></g>
    ${ground()}
  </g>`;
}

function gateHillArt(): string {
  return `<g class="jg jg--gatehill">
    ${ridge([[-W * 2, 190], [-120, 180], [20, 186], [130, 150], [200, 120], [270, 150], [380, 184], [W * 3, 190]], 'bd-far jg-hebronhill')}
    <!-- 산꼭대기에 기대 놓은 문짝과 문설주 -->
    <g class="bd-mid jg-carried" transform="translate(200 124) rotate(-8)"><rect x="-14" y="-30" width="13" height="30"/><rect x="1" y="-30" width="13" height="30"/><rect x="-18" y="-34" width="4" height="34"/><rect x="14" y="-34" width="4" height="34"/><rect x="-18" y="-36" width="36" height="3"/></g>
    <circle class="bd-halo jg-dawnhalo" cx="200" cy="110" r="50"/>
    ${ridge([[-W * 2, 236], [-40, 228], [140, 234], [300, 226], [W * 3, 232]], 'bd-mid')}
    ${ground()}
  </g>`;
}

function sorekArt(): string {
  return `<g class="jg jg--sorek">
    <rect class="bd-near" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <rect class="jg-wall" x="${-W * 2}" y="40" width="${W * 5}" height="200"/>
    <rect class="jg-nightwin" x="250" y="80" width="26" height="34" rx="2"/>
    <!-- 베틀 (16:13-14): 두 기둥과 가로대, 늘어진 날실 -->
    <g class="bd-mid jg-loom"><rect x="110" y="128" width="4" height="104"/><rect x="164" y="128" width="4" height="104"/><rect x="106" y="126" width="66" height="4"/><rect x="108" y="200" width="62" height="3"/>
      <path class="jg-warp" d="${Array.from({ length: 12 }, (_, i) => `M${117 + i * 4} 130 L${117 + i * 4} 200`).join(' ')}"/></g>
    <!-- 등잔 -->
    <g class="jg-lampstand"><rect x="214" y="190" width="4" height="40" class="bd-mid"/><path class="bd-mid" d="M206 190 L226 190 L222 186 L210 186 Z"/><ellipse class="jg-flame" cx="216" cy="182" rx="2" ry="4"/></g>
    <circle class="bd-halo jg-lamphalo" cx="216" cy="184" r="70"/>
    <rect class="bd-mid" x="${-W * 2}" y="232" width="${W * 5}" height="${H - 232}"/>
  </g>`;
}

function millArt(): string {
  return `<g class="jg jg--mill">
    <rect class="bd-near" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <g class="jg-stonewall">${Array.from({ length: 10 }, (_, row) => Array.from({ length: 14 }, (_, i) => `<rect x="${-80 + i * 40 + (row % 2) * 20}" y="${30 + row * 20}" width="38" height="18" rx="1.5"/>`).join('')).join('')}</g>
    <path class="jg-ray" d="M226 30 L246 30 L280 ${H} L210 ${H} Z"/>
    <rect class="jg-slit" x="226" y="30" width="20" height="10"/>
    <!-- 맷돌: 아래 받침돌과 윗돌, 미는 막대 -->
    <g class="bd-mid jg-millstone"><ellipse cx="200" cy="232" rx="40" ry="8"/><rect x="164" y="214" width="72" height="18" rx="4"/><ellipse cx="200" cy="214" rx="36" ry="7"/><rect class="jg-millbar" x="230" y="210" width="44" height="4" rx="2"/></g>
    <rect class="bd-mid" x="${-W * 2}" y="238" width="${W * 5}" height="${H - 238}"/>
  </g>`;
}

function dagonArt(fallen: boolean): string {
  const r = rng(8501);
  if (fallen) {
    const rubble = Array.from({ length: 40 }, (_, i) => `<ellipse style="--i:${i % 9}" cx="${f(40 + r() * 320)}" cy="${f(236 - r() * 24)}" rx="${f(6 + r() * 10)}" ry="${f(3 + r() * 5)}"/>`).join('');
    return `<g class="jg jg--dagon is-fallen">
      ${farHills(8502, 186)}
      <g class="bd-mid jg-rubble">${rubble}</g>
      <g class="bd-mid"><path d="M150 236 L160 180 L172 182 L166 236 Z"/><path d="M244 236 L232 196 L244 192 L258 236 Z"/><rect x="100" y="226" width="80" height="10" transform="rotate(-12 140 231)"/></g>
      <g class="js-dust">${Array.from({ length: 9 }, (_, i) => `<circle style="--i:${i}" cx="${f(60 + i * 34)}" cy="${f(214 - r() * 14)}" r="${f(16 + r() * 10)}"/>`).join('')}</g>
      ${ground()}
    </g>`;
  }
  const roof = folk(60, 116, 340, 116, 60, 1.2, 8503, 'js-folk jg-roofcrowd');
  return `<g class="jg jg--dagon">
    <g class="bd-mid jg-temple">
      <rect x="40" y="118" width="320" height="10"/><rect x="34" y="128" width="332" height="6"/>
      <rect x="54" y="134" width="12" height="104"/><rect x="334" y="134" width="12" height="104"/>
      <rect x="100" y="134" width="10" height="104"/><rect x="290" y="134" width="10" height="104"/>
    </g>
    <!-- 가운데 두 기둥 (16:29) -->
    <g class="bd-mid jg-midpillars"><rect class="jg-pillar" x="170" y="134" width="14" height="104"/><rect class="jg-pillar" x="216" y="134" width="14" height="104"/><rect x="166" y="132" width="22" height="4"/><rect x="212" y="132" width="22" height="4"/></g>
    ${roof}
    <g class="jg-feast-fires">${[78, 322].map((x) => `<ellipse class="jg-flame" cx="${x}" cy="226" rx="4" ry="8"/>`).join('')}</g>
    ${folk(116, 238, 160, 238, 6, 2, 8504)}${folk(240, 238, 284, 238, 6, 2, 8505)}
    <rect class="bd-near" x="${-W * 2}" y="238" width="${W * 5}" height="${H - 238}"/>
  </g>`;
}

// ── 레위인과 첩 (삿 19–21) ──────────────────────────
function gibeahArt(dawn: boolean): string {
  const r = rng(8601);
  const houses = Array.from({ length: 12 }, (_, i) => {
    const x = -120 + i * 54 + r() * 6;
    if (x > 150 && x < 250) return '';
    return house(x, 222 + (i % 2) * 2, 40 + r() * 8, 34 + r() * 10, 'bd-mid', true, false);
  }).join('');
  return `<g class="jg jg--gibeah${dawn ? ' is-dawn' : ''}">
    ${dawn ? '' : stars(100, 100, 8602)}
    ${farHills(8603, 166)}
    ${houses}
    <!-- 노인의 집 -->
    <g class="bd-mid"><rect x="168" y="168" width="64" height="56"/><rect x="164" y="164" width="72" height="5"/></g>
    <path class="jg-door jg-bigdoor${dawn ? '' : ' is-lit'}" d="M192 224 L192 200 Q200 192 208 200 L208 224 Z"/>
    <rect class="jg-threshold" x="188" y="224" width="24" height="3"/>
    ${dawn ? '<circle class="bd-halo jg-dawnhalo" cx="200" cy="120" r="80"/>' : ''}
    ${ground(240)}
  </g>`;
}

function gibeahSmokeArt(): string {
  return `<g class="jg jg--gibeahsmoke">
    ${farHills(8701, 160)}
    ${ridge([[-W * 2, 236], [-40, 226], [130, 204], [200, 190], [270, 204], [440, 228], [W * 3, 234]], 'bd-mid')}
    <g class="bd-mid">${house(170, 192, 18, 12)}${house(190, 190, 22, 14)}${house(214, 192, 16, 10)}</g>
    <g class="jg-pillar-smoke">${smoke(198, 176, 8702, 9)}${smoke(204, 150, 8703, 9)}</g>
    ${folk(30, 246, 120, 244, 12, 1.8, 8704)}${folk(280, 244, 370, 246, 12, 1.8, 8705)}
    ${ground()}
  </g>`;
}

function rimmonArt(): string {
  return `<g class="jg jg--rimmon">
    ${ridge([[-W * 2, 180], [-120, 172], [40, 176], [200, 168], [360, 176], [W * 3, 170]], 'bd-far')}
    <path class="bd-mid jg-crag" d="M110 248 C118 220 136 186 160 168 C176 156 196 150 214 158 C240 168 262 196 272 222 C278 236 282 244 286 248 Z"/>
    ${folk(170, 166, 220, 160, 9, 1.1, 8801)}
    ${ground()}
  </g>`;
}

function shilohArt(): string {
  return `<g class="jg jg--shiloh">
    ${farHills(8901, 158)}
    <!-- 언덕 위 하나님의 집 (장막) -->
    ${ridge([[-W * 2, 196], [-40, 188], [120, 176], [200, 166], [280, 176], [440, 190], [W * 3, 194]], 'bd-mid')}
    <g class="bd-mid"><rect x="186" y="152" width="28" height="14"/><path d="M182 152 L218 152 L214 146 L186 146 Z"/></g>
    ${vineRows(214, 4, 8902)}
    ${vineRows(250, 1, 8903, 'bd-near')}
    ${ground(254)}
  </g>`;
}

// ── 룻기 ───────────────────────────────────────────
function moabRoadArt(): string {
  return `<g class="jg rt rt--road">
    <circle class="rt-sun" cx="300" cy="72" r="14"/><circle class="bd-halo rt-sunhalo" cx="300" cy="72" r="70"/>
    ${ridge([[-W * 2, 160], [-140, 150], [-20, 156], [90, 140], [180, 152], [300, 136], [420, 150], [W * 3, 144]], 'bd-far')}
    ${ridge([[-W * 2, 206], [-60, 200], [100, 204], [260, 198], [420, 204], [W * 3, 200]], 'bd-mid')}
    <!-- 갈림길: 한 길은 서쪽(유다)으로, 한 길은 되돌아 모압으로 -->
    <path class="rt-road" d="M200 262 C200 240 196 224 186 212 C170 196 140 190 80 186"/>
    <path class="rt-road" d="M200 262 C204 240 214 224 232 214 C256 202 300 198 360 196"/>
    <g class="bd-mid rt-cairn"><ellipse cx="200" cy="236" rx="7" ry="3"/><ellipse cx="200" cy="231" rx="5" ry="2.6"/><ellipse cx="200" cy="227" rx="3.4" ry="2"/></g>
    ${ground(252)}
  </g>`;
}

function bethlehemArt(): string {
  const r = rng(9101);
  return `<g class="jg rt rt--bethlehem">
    <circle class="bd-halo rt-sunhalo" cx="120" cy="60" r="80"/>
    ${farHills(9102, 150)}
    ${ridge([[-W * 2, 214], [-40, 206], [110, 186], [200, 170], [290, 186], [440, 208], [W * 3, 212]], 'bd-mid')}
    <g class="bd-mid rt-town">${Array.from({ length: 9 }, (_, i) => `<rect x="${f(160 + i * 9 + r() * 2)}" y="${f(156 - r() * 8)}" width="${f(8 + r() * 3)}" height="${f(14 + r() * 6)}"/>`).join('')}<rect x="150" y="166" width="100" height="8"/></g>
    ${rtBarley(232, 9103)}
    ${ground(254)}
  </g>`;
}

/** 익은 보리 이삭의 띠 */
function rtBarley(y: number, seed: number, n = 90): string {
  const r = rng(seed);
  return `<g class="rt-barley">${Array.from({ length: n }, (_, i) => {
    const x = -160 + i * (720 / n) + r() * 4;
    const h = 12 + r() * 8;
    return `<path d="M${f(x)} ${f(y + 12)} q${f((r() - 0.5) * 3)} -${f(h / 2)} ${f((r() - 0.3) * 3)} -${f(h)}"/><ellipse cx="${f(x + 1)}" cy="${f(y + 12 - h - 2)}" rx="1.1" ry="2.8"/>`;
  }).join('')}</g>`;
}

function fieldArt(): string {
  const r = rng(9201);
  const sheaves = Array.from({ length: 7 }, (_, i) => `<path class="rt-sheaf" d="M${f(60 + i * 46 + r() * 8)} 238 l4 -16 l4 16 Z"/>`).join('');
  return `<g class="jg rt rt--field">
    <circle class="rt-sun" cx="90" cy="54" r="13"/><circle class="bd-halo rt-sunhalo" cx="90" cy="54" r="90"/>
    ${farHills(9202, 160)}
    <g class="bd-far rt-town-far"><rect x="300" y="146" width="8" height="10"/><rect x="310" y="142" width="10" height="14"/><rect x="322" y="148" width="8" height="8"/></g>
    ${rtBarley(186, 9203, 70)}
    ${folk(120, 216, 300, 212, 9, 1.9, 9204, 'js-folk rt-reapers')}
    <!-- 원두막 그늘 (2:14 떡과 볶은 곡식) -->
    <g class="bd-mid rt-shelter"><rect x="330" y="200" width="3" height="30"/><rect x="368" y="200" width="3" height="30"/><path d="M324 202 L376 202 L370 194 L330 194 Z"/></g>
    ${sheaves}
    ${rtBarley(232, 9205, 100)}
    ${ground(256)}
  </g>`;
}

function threshingArt(): string {
  return `<g class="jg rt rt--threshing">
    ${stars(140, 130, 9301)}
    <circle class="js-moon" cx="300" cy="50" r="7"/>
    ${farHills(9302, 176)}
    <ellipse class="bd-mid rt-floor" cx="200" cy="240" rx="120" ry="12"/>
    <path class="rt-heap" d="M150 238 C160 214 180 204 200 204 C222 204 242 214 252 238 Z"/>
    <g class="bd-mid rt-fork"><rect x="276" y="186" width="2.4" height="52" transform="rotate(14 277 212)"/><path d="M278 186 l-6 -10 m6 10 l0 -12 m0 12 l6 -10" fill="none" stroke="currentColor" stroke-width="1.2" transform="rotate(14 277 212)"/></g>
    <g class="jg-lampstand"><ellipse class="jg-flame" cx="118" cy="228" rx="1.8" ry="3.4"/></g><circle class="bd-halo jg-lamphalo" cx="118" cy="228" r="40"/>
    ${ground(252)}
  </g>`;
}

function gateArt(): string {
  return `<g class="jg rt rt--gate">
    <circle class="bd-halo rt-sunhalo" cx="300" cy="60" r="80"/>
    <g class="bd-mid">
      <rect x="20" y="130" width="150" height="118"/><rect x="230" y="130" width="150" height="118"/>
      <rect x="160" y="112" width="20" height="136"/><rect x="220" y="112" width="20" height="136"/><rect x="156" y="106" width="88" height="8"/>
      ${Array.from({ length: 22 }, (_, i) => `<rect x="${22 + i * 16}" y="124" width="8" height="6"/>`).join('')}
    </g>
    <path class="rt-gatelight" d="M180 248 L180 150 Q200 132 220 150 L220 248 Z"/>
    <!-- 문 곁 돌 자리 (4:1-2) -->
    <rect class="bd-near rt-bench" x="60" y="236" width="90" height="8" rx="2"/><rect class="bd-near rt-bench" x="250" y="236" width="90" height="8" rx="2"/>
    ${ground(250)}
  </g>`;
}

export function judgesArt(art: JudgesArt): string {
  switch (art) {
    case 'jg-palm': return palmArt();
    case 'jg-tabor': return taborArt(false);
    case 'jg-kishon': return taborArt(true);
    case 'jg-tent': return tentArt(true);
    case 'jg-tent-shut': return tentArt(false);
    case 'jg-lattice': return latticeArt();
    case 'jg-winepress': return winepressArt();
    case 'jg-baal': return baalArt(false);
    case 'jg-baal-torn': return baalArt(true);
    case 'jg-fleece-wet': return fleeceArt(true);
    case 'jg-fleece-dry': return fleeceArt(false);
    case 'jg-harod': return harodArt();
    case 'jg-midian': return midianArt();
    case 'jg-mizpah': return mizpahArt();
    case 'jg-mountains': return mountainsArt();
    case 'jg-zorah': return zorahArt();
    case 'jg-timnah': return timnahArt('road');
    case 'jg-timnah-lion': return timnahArt('lion');
    case 'jg-honey': return timnahArt('honey');
    case 'jg-fields': return fieldsArt(false);
    case 'jg-fields-burnt': return fieldsArt(true);
    case 'jg-lehi': return lehiArt(false);
    case 'jg-lehi-spring': return lehiArt(true);
    case 'jg-gaza-gate': return gazaGateArt();
    case 'jg-gate-hill': return gateHillArt();
    case 'jg-sorek': return sorekArt();
    case 'jg-mill': return millArt();
    case 'jg-dagon': return dagonArt(false);
    case 'jg-dagon-fallen': return dagonArt(true);
    case 'jg-gibeah': return gibeahArt(false);
    case 'jg-gibeah-dawn': return gibeahArt(true);
    case 'jg-gibeah-smoke': return gibeahSmokeArt();
    case 'jg-rimmon': return rimmonArt();
    case 'jg-shiloh': return shilohArt();
    case 'rt-moab-road': return moabRoadArt();
    case 'rt-bethlehem': return bethlehemArt();
    case 'rt-field': return fieldArt();
    case 'rt-threshing': return threshingArt();
    case 'rt-gate': return gateArt();
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

/** 배경 그림 안의 g에 클래스를 다시 붙여 CSS 애니메이션을 처음부터 */
function restart(scene: HTMLElement, sel: string, cls: string): boolean {
  const g = scene.querySelector(`.scene__backdrop .backdrop:last-child ${sel}`);
  if (!g) return false;
  g.classList.remove(cls);
  void (g as SVGElement).getBoundingClientRect();
  g.classList.add(cls);
  return true;
}

/** torches: 항아리를 깨뜨리고 횃불을 듦 (삿 7:19-21) — 배경 jg-midian의 세 무리가 켜지고, 깨지는 소리 고리 */
export function playTorches(scene: HTMLElement, rm: boolean): void {
  restart(scene, '.jg--midian', 'is-lit');
  const r = rng(Date.now() % 100000);
  const cracks = rm ? '' : Array.from({ length: 12 }, (_, i) => `<i style="--x:${f(8 + (i % 3) * 38 + r() * 10)}%; --y:${f(30 + r() * 12)}%; --d:${f(0.2 + Math.floor(i / 3) * 0.18 + r() * 0.2)}s"></i>`).join('');
  layerOf(scene, 'fx-torches', cracks, rm ? 2000 : 6000, 1400);
}

/** flame-up: 제단 불꽃 속으로 빛이 올라감 (삿 13:20) */
export function playFlameUp(scene: HTMLElement, rm: boolean): void {
  layerOf(scene, `fx-flameup${rm ? ' is-rm' : ''}`, '<i></i><b></b>', rm ? 2400 : 6400, 1800);
}

/** foxes: 꼬리에 홰를 단 여우들이 밭을 가로지름 (삿 15:4-5) */
export function playFoxes(scene: HTMLElement, rm: boolean): void {
  const r = rng(Date.now() % 100000);
  const foxes = Array.from({ length: rm ? 3 : 14 }, (_, i) => `<i style="--y:${f(62 + r() * 22)}%; --d:${f(i * 0.32 + r() * 0.3)}s; --s:${f(0.7 + r() * 0.5)}; --dir:${i % 2 ? -1 : 1}"></i>`).join('');
  layerOf(scene, `fx-foxes${rm ? ' is-rm' : ''}`, `${foxes}<b></b>`, rm ? 2400 : 8400, 1800);
}

/** pillars: 두 기둥이 휘고 신전이 무너짐 (삿 16:29-30) — 배경 jg-dagon의 기둥 + 흙먼지 */
export function playPillars(scene: HTMLElement, rm: boolean): void {
  restart(scene, '.jg--dagon', 'is-falling');
  const r = rng(Date.now() % 100000);
  const dust = Array.from({ length: rm ? 3 : 14 }, () => `<i style="--x:${f(10 + r() * 80)}%; --d:${f(1 + r() * 1.2)}s; --s:${f(0.8 + r() * 1.2)}"></i>`).join('');
  layerOf(scene, 'fx-pillars', dust, rm ? 2000 : 6400, 2000);
}

/** lament: 해마다 나흘씩 — 산 위에 불빛 넷이 켜지고, 한 해 한 해 줄이 늘어남 (삿 11:40) */
export function playLament(scene: HTMLElement, rm: boolean): void {
  const years = rm ? 2 : 7;
  const rows = Array.from({ length: years }, (_, y) => `<p style="--y:${y}">${Array.from({ length: 4 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</p>`).join('');
  layerOf(scene, `fx-lament${rm ? ' is-rm' : ''}`, `${rows}<span>해마다 나흘씩</span>`, rm ? 3000 : 11000, 2000);
}

/** summons: 열두 줄기 불티가 사방으로 (삿 19:29) */
export function playSummons(scene: HTMLElement, rm: boolean): void {
  const rays = Array.from({ length: 12 }, (_, i) => `<i style="--a:${f((i / 12) * 360 + 15)}deg; --d:${f(i * 0.08)}s"></i>`).join('');
  layerOf(scene, `fx-summons${rm ? ' is-rm' : ''}`, rays, rm ? 1800 : 5200, 1400);
}

/** genealogy: 룻 4:18-22 — 열 이름이 한 줄로 켜지고, 끝에 마태복음 1장의 이음 */
const LINE = ['베레스', '헤스론', '람', '암미나답', '나손', '살몬', '보아스', '오벳', '이새', '다윗'];
export function playGenealogy(scene: HTMLElement, rm: boolean): void {
  const names = LINE.map((n, i) => `<li style="--i:${i}" class="${n === '보아스' || n === '오벳' ? 'is-here' : ''}${n === '다윗' ? ' is-king' : ''}"><b>${n}</b>${n === '살몬' ? '<small>+ 라합</small>' : n === '보아스' ? '<small>+ 룻</small>' : ''}</li>`).join('');
  layerOf(scene, `fx-genealogy${rm ? ' is-rm' : ''}`, `<ol>${names}</ol><p class="fx-genealogy__more">… 마태복음 1장 — 예수</p>`, rm ? 5000 : 16000, 2000);
}
