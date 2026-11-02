// 10막 A급 — 역대기 (대상 28–29 「다윗의 마지막 기도」 · 대하 20 「찬양대가 앞서 나간 전쟁」 · 대하 33 「므낫세의 회개」)의
// 전용 배경과 효과. 역대기 B급(대상 21–22 성전 터, 대하 2–4 · 29–31 성전, 포로 장면)에서도 재사용하도록 범용으로 그림.
// 같은 종이 오려낸 그림자극 말투. 폰(세로 화면)에서는 x 100~300만 보인다 → 알아볼 것은 가운데에.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - ch-temple-site   : 모리아 산 오르난의 타작마당 = 성전 터 (대상 21:26 · 22:1-5 · 대하 3:1). 둥근 돌 타작마당,
//                       다윗이 쌓은 작은 단과 가는 연기, 다듬은 돌 더미·백향목 더미·금은 궤짝, 말뚝과 측량줄, 왼쪽 아래 다윗 성
//  - ch-tekoa         : 드고아 들 (대하 20:20). 유다 광야의 둥근 언덕들, 동쪽 지평선 너머 사해 쪽 엷은 띠와 모압 산줄기,
//                       오른쪽 언덕 위 돌로 쌓은 들 망대(20:24), 골짜기로 굽어 내려가는 길, 마른 덤불
//  - ch-tekoa-still   : 같은 들의 골짜기, 일이 끝난 뒤. 버려진 창이 비스듬히 꽂히고 둥근 방패들이 쓰러져 있음, 흙먼지가 가라앉는 중.
//                       사람(시체)은 그리지 않는다 (20:24 "엎드러진 시체뿐" — 보여 주지 않음)
//  - ch-beracah       : 브라가 골짜기 (20:26). 양쪽 비탈 사이 골짜기 바닥에 모여 손을 든 무리, 가운데 탈취물 더미(옷·그릇 반짝),
//                       위로 열린 금빛 하늘
//  - ch-chains        : 바벨론의 옥 (대하 33:11-13). 굵은 벽돌 벽, 높은 곳의 좁은 창살 창에서 비스듬히 떨어지는 한 줄기 빛,
//                       벽에 박힌 쇠고리와 늘어진 사슬, 바닥의 짚과 물 항아리
// 효과:
//  - ch-blueprint     : 성전 식양 (대상 28:11-19). 위에서 가는 금빛 한 줄기("여호와의 손이 내게 임하여")가 두루마리에 닿고,
//                       두루마리가 펴지며 낭실 → 성소 → 지성소(그룹 날개) → 골방 → 뜰 → 번제단·물두멍 선이 차례로 그어지고 이름이 켜짐,
//                       끝에 두루마리가 말려 who(→ david)에게서 to(→ solomon)에게로 건너감 (약 10초)
//  - ch-offerings     : 즐거이 드림 (대상 29:6-9). 위에 장부가 펴지고 "금 5,000 달란트 · 금 다릭 10,000 · 은 10,000 달란트 ·
//                       놋 18,000 달란트 · 철 100,000 달란트 · 보석"이 한 줄씩, 그동안 금·은·놋·철 조각이 사방에서 날아와 무대 가운데
//                       더미로 쌓이고, 기쁨의 티끌이 오름 (약 10초, 본문 숫자 그대로)
//  - ch-praise-march  : 찬양대가 군대 앞에서 (대하 20:21-22). 거룩한 예복(흰 옷)을 입은 노래하는 자들의 줄이 왼쪽에서 걸어 나오고,
//                       그 앞에서 금빛 소리 물결이 오른쪽(적진 쪽)으로 연달아 밀려가며 "여호와께 감사하세 / 그 자비하심이 영원하도다"가
//                       한 글자씩 켜짐, 오른쪽 끝 잿빛 먼지가 소리 물결에 흔들리다 흩어짐 (약 12초)
//  - ch-unchain       : 사슬이 풀림 (대하 33:13). 높은 곳에서 가는 금빛이 who(→ manasseh-king)에게 내려오고, 손목의 쇠사슬 고리가
//                       떨리다 끊어져 떨어짐 (약 5초)
// 하나님은 그리지 않는다 (빛 한 줄기로만).
import { H, W, rng, smoke } from './backdrop';
import { ground, ridge } from './joshua';

export type ChroniclesArt = 'ch-temple-site' | 'ch-tekoa' | 'ch-tekoa-still' | 'ch-beracah' | 'ch-chains';

const f = (n: number) => n.toFixed(1);

// ── 작은 조각들 ─────────────────────────────────
/** 마른 덤불 */
function shrubs(x0: number, x1: number, y: number, n: number, seed: number, cls = 'ch-shrub'): string {
  const r = rng(seed);
  return `<g class="${cls}">${Array.from({ length: n }, () => {
    const x = x0 + r() * (x1 - x0);
    const s = 2.4 + r() * 3.6;
    return `<path style="--d:${f(r() * 4)}s" d="M${f(x - s * 1.6)} ${f(y)} Q${f(x - s)} ${f(y - s * 1.4)} ${f(x)} ${f(y - s * 1.2)} Q${f(x + s)} ${f(y - s * 1.6)} ${f(x + s * 1.7)} ${f(y)} Z"/>`;
  }).join('')}</g>`;
}

/** 다듬은 돌을 쌓은 더미 (원근 상자) */
function stoneStack(x: number, base: number, s: number, rows: number, seed: number): string {
  const r = rng(seed);
  const out: string[] = [];
  for (let row = 0; row < rows; row++) {
    const n = rows - row + 1;
    const bw = 12 * s;
    const bh = 6 * s;
    const x0 = x - (n * bw) / 2 + (r() - 0.5) * 2;
    for (let i = 0; i < n; i++) {
      out.push(`<rect x="${f(x0 + i * bw + 0.4)}" y="${f(base - (row + 1) * bh)}" width="${f(bw - 0.8)}" height="${f(bh - 0.6)}"/>`);
    }
  }
  return `<g class="ch-cutstone">${out.join('')}</g>`;
}

/** 백향목 더미: 둥근 마구리가 보이는 통나무 */
function cedarPile(x: number, base: number, s: number): string {
  const logs = [[0, 0], [1, 0], [2, 0], [0.5, 1], [1.5, 1], [1, 2]].map(([cx, cy]) => {
    const lx = x + cx * 7 * s;
    const ly = base - 3.5 * s - cy * 6 * s;
    return `<rect class="ch-log" x="${f(lx - 30 * s)}" y="${f(ly - 3.2 * s)}" width="${f(30 * s)}" height="${f(6.4 * s)}" rx="${f(3.2 * s)}"/><circle class="ch-logend" cx="${f(lx)}" cy="${f(ly)}" r="${f(3.2 * s)}"/><circle class="ch-ring" cx="${f(lx)}" cy="${f(ly)}" r="${f(1.6 * s)}"/>`;
  }).join('');
  return `<g class="ch-cedar">${logs}</g>`;
}

/** 금은 궤짝 (뚜껑 틈으로 금빛) */
function chest(x: number, base: number, s: number, i: number): string {
  return `<g class="ch-chest">
    <rect x="${f(x - 9 * s)}" y="${f(base - 9 * s)}" width="${f(18 * s)}" height="${f(9 * s)}" rx="${f(1 * s)}"/>
    <path class="ch-chestlid" d="M${f(x - 9.6 * s)} ${f(base - 9 * s)} Q${f(x)} ${f(base - 14 * s)} ${f(x + 9.6 * s)} ${f(base - 9 * s)} Z"/>
    <path class="ch-glint" style="--d:${f(i * 0.9)}s" d="M${f(x - 7 * s)} ${f(base - 9.4 * s)} H${f(x + 7 * s)}"/>
  </g>`;
}

/** 다듬지 않은 돌 단 (작게, 가는 연기) */
function smallAltar(x: number, base: number, s: number, seed: number): string {
  const r = rng(seed);
  const stones: string[] = [];
  for (let row = 0; row < 3; row++) {
    const n = 4 - (row % 2);
    const w = (16 - row * 2) * s;
    for (let i = 0; i < n; i++) {
      const sw = (w * 2) / n;
      const sx = x - w + i * sw;
      const sy = base - (row + 1) * 6 * s;
      stones.push(`<path d="M${f(sx + 0.6)} ${f(sy + 6 * s)} L${f(sx + 0.3)} ${f(sy + 1.4 + r())} Q${f(sx + sw / 2)} ${f(sy - r())} ${f(sx + sw - 0.4)} ${f(sy + 1 + r())} L${f(sx + sw - 0.6)} ${f(sy + 6 * s)} Z"/>`);
    }
  }
  const top = base - 18 * s;
  return `<g class="ch-altar">${stones.join('')}</g>
    <circle class="bd-halo ch-altarhalo" cx="${x}" cy="${f(top - 4)}" r="${f(26 * s)}"/>
    <g class="ch-ember">${[-4, 0, 4].map((d, i) => `<path style="--d:${f(i * 0.4)}s" d="M${f(x + d * s - 3 * s)} ${f(top)} Q${f(x + d * s)} ${f(top - 10 * s)} ${f(x + d * s + 3 * s)} ${f(top)} Z"/>`).join('')}</g>
    ${smoke(x, top - 12 * s, seed + 3, 6)}`;
}

/** 들 망대: 돌로 쌓은 네모 탑, 위에 성가퀴 */
function watchtower(x: number, base: number, s: number): string {
  const w = 11 * s;
  const h = 34 * s;
  const teeth = [-1, 0, 1].map((k) => `<rect x="${f(x + k * 7 * s - 2.4 * s)}" y="${f(base - h - 4 * s)}" width="${f(4.8 * s)}" height="${f(4.4 * s)}"/>`).join('');
  return `<g class="ch-tower">
    <path d="M${f(x - w)} ${base} L${f(x - w + 1.6 * s)} ${f(base - h)} L${f(x + w - 1.6 * s)} ${f(base - h)} L${f(x + w)} ${base} Z"/>
    ${teeth}
    <rect class="ch-towerslit" x="${f(x - 1.2 * s)}" y="${f(base - h * 0.7)}" width="${f(2.4 * s)}" height="${f(6 * s)}"/>
    <path class="ch-courses" d="M${f(x - w + 0.6 * s)} ${f(base - h * 0.33)} H${f(x + w - 0.6 * s)} M${f(x - w + 1.1 * s)} ${f(base - h * 0.66)} H${f(x + w - 1.1 * s)}"/>
  </g>`;
}

// ── 1. 성전 터 (오르난의 타작마당) ─────────────────
function templeSiteArt(): string {
  return `<g class="ch ch--site">
    ${ridge([[-W * 2, 128], [-60, 122], [80, 132], [200, 116], [330, 128], [470, 120], [W * 3, 126]], 'bd-far')}
    <!-- 왼쪽 아래 다윗 성 -->
    <g class="bd-mid ch-city">
      <path d="M${-W * 2} 196 L${-W * 2} 160 L-10 158 L40 166 L76 176 L96 196 Z"/>
      ${[-40, -14, 12, 38, 62].map((x, i) => `<rect x="${x}" y="${150 + i * 4}" width="${14 + (i % 2) * 6}" height="${16 - i}"/>`).join('')}
      <rect x="22" y="138" width="12" height="18"/><rect x="20" y="134" width="16" height="4"/>
    </g>
    <!-- 모리아 산마루 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 214 C60 206 120 182 200 176 C280 172 360 184 ${W * 3} 196 L${W * 3} ${H} Z"/>
    <!-- 둥근 타작마당 -->
    <ellipse class="ch-floor" cx="206" cy="200" rx="86" ry="15"/>
    <ellipse class="ch-floorring" cx="206" cy="200" rx="86" ry="15"/>
    <path class="ch-chaff" d="M150 200 Q206 192 262 200 M168 205 Q206 200 244 205"/>
    <circle class="bd-halo ch-sitehalo" cx="206" cy="170" r="80"/>
    <!-- 말뚝과 측량줄 -->
    <path class="ch-cord" d="M128 196 L176 186 L246 186 L290 196"/>
    ${[[128, 196], [176, 186], [246, 186], [290, 196]].map(([x, y]) => `<rect class="ch-peg" x="${x - 1}" y="${y - 7}" width="2" height="8"/>`).join('')}
    ${smallAltar(206, 198, 1, 2101)}
    ${stoneStack(316, 228, 1.1, 3, 2102)}
    ${cedarPile(108, 230, 1)}
    ${chest(262, 232, 1, 0)}${chest(284, 236, 0.8, 1)}${chest(150, 236, 0.75, 2)}
    ${ground(246)}
  </g>`;
}

// ── 2. 드고아 들 / 일이 끝난 골짜기 ─────────────────
function tekoaArt(still: boolean): string {
  const r = rng(still ? 2203 : 2202);
  const road = `<path class="ch-road" d="M60 ${H} C90 236 150 226 176 214 C204 202 236 198 262 192 C282 188 300 186 318 184 L326 186 C306 190 288 194 270 198 C240 206 214 212 192 224 C170 236 140 246 120 ${H} Z"/>`;
  const debris = still
    ? `<g class="ch-debris">
        ${Array.from({ length: 14 }, (_, i) => {
          const x = 120 + i * 13 + (r() - 0.5) * 6;
          const y = 200 + (i % 4) * 3 + r() * 2;
          const a = -38 + r() * 76;
          return `<path class="ch-spear" d="M${f(x)} ${f(y)} l${f(Math.sin((a * Math.PI) / 180) * 22)} ${f(-Math.cos((a * Math.PI) / 180) * 22)}"/>`;
        }).join('')}
        ${Array.from({ length: 9 }, (_, i) => {
          const x = 130 + i * 18 + (r() - 0.5) * 8;
          const y = 204 + (i % 3) * 3;
          return `<ellipse class="ch-shield" cx="${f(x)}" cy="${f(y)}" rx="${f(4.6 + r() * 1.4)}" ry="${f(2 + r())}" transform="rotate(${f((r() - 0.5) * 30)} ${f(x)} ${f(y)})"/>`;
        }).join('')}
      </g>
      <g class="ch-settle">${Array.from({ length: 6 }, (_, i) => `<ellipse style="--d:${f(i * 1.3)}s" cx="${f(110 + i * 38)}" cy="${f(196 + (i % 2) * 6)}" rx="${f(34 + r() * 10)}" ry="5"/>`).join('')}</g>`
    : '';
  return `<g class="ch ch--tekoa${still ? ' ch--still' : ''}">
    <!-- 동쪽: 모압 산줄기와 사해 쪽 엷은 띠 -->
    ${ridge([[-W * 2, 120], [-40, 114], [100, 120], [220, 110], [360, 118], [W * 3, 112]], 'bd-far ch-moab')}
    <rect class="ch-haze" x="${-W * 2}" y="126" width="${W * 5}" height="8"/>
    ${ridge([[-W * 2, 150], [-20, 140], [70, 150], [150, 138], [240, 150], [330, 140], [440, 150], [W * 3, 144]], 'bd-mid')}
    ${ridge([[-W * 2, 186], [20, 172], [120, 188], [210, 182], [300, 166], [380, 176], [W * 3, 184]], 'bd-mid ch-near-hill')}
    ${watchtower(306, 168, 1)}
    ${still ? '' : `<circle class="bd-halo ch-dawnhalo" cx="220" cy="118" r="70"/>`}
    <path class="bd-near ch-valley" d="M${-W * 2} ${H} L${-W * 2} 214 C40 210 120 196 200 196 C280 196 360 206 ${W * 3} 210 L${W * 3} ${H} Z"/>
    ${road}
    ${debris}
    ${shrubs(-60, 460, 236, 18, still ? 2205 : 2204)}
    ${ground(250)}
  </g>`;
}

// ── 3. 브라가 골짜기 ─────────────────────────────
function beracahArt(): string {
  const r = rng(2301);
  // 손을 든 작은 사람들
  const praisers = Array.from({ length: 34 }, (_, i) => {
    const row = i % 3;
    const x = 40 + (i / 33) * 320 + (r() - 0.5) * 6;
    const y = 206 + row * 7 + (r() - 0.5) * 2;
    const s = 3.2 + row * 0.7;
    const up = i % 2 === 0;
    return `<g class="ch-praiser" style="--d:${f(r() * 3)}s"><rect x="${f(x - s * 0.45)}" y="${f(y - s * 3)}" width="${f(s * 0.9)}" height="${f(s * 3)}" rx="${f(s * 0.45)}"/>
      ${up ? `<path d="M${f(x - s * 0.3)} ${f(y - s * 2.6)} L${f(x - s * 0.9)} ${f(y - s * 3.9)} M${f(x + s * 0.3)} ${f(y - s * 2.6)} L${f(x + s * 0.9)} ${f(y - s * 3.9)}"/>` : ''}</g>`;
  }).join('');
  const spoils = `<g class="ch-spoils">
    <path class="ch-cloth" d="M170 202 Q186 186 204 190 Q222 184 236 200 Q206 206 170 202 Z"/>
    <path class="ch-cloth2" d="M180 200 Q196 192 214 196 Q224 194 230 201 Z"/>
    ${[178, 194, 214, 228].map((x, i) => `<path class="ch-jar" d="M${x - 3} 200 Q${x - 4} 194 ${x - 1.4} 191 L${x - 1.4} 189 L${x + 1.4} 189 L${x + 1.4} 191 Q${x + 4} 194 ${x + 3} 200 Z"/><circle class="ch-spark" style="--d:${f(i * 0.7)}s" cx="${x + 0.4}" cy="${193 - (i % 2) * 2}" r="1.1"/>`).join('')}
  </g>`;
  return `<g class="ch ch--beracah">
    <circle class="bd-halo ch-skyhalo" cx="200" cy="90" r="120"/>
    ${ridge([[-W * 2, 130], [-40, 124], [90, 132], [200, 126], [310, 132], [W * 3, 124]], 'bd-far')}
    <!-- 양쪽 비탈 -->
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 120 C-20 124 60 150 110 180 C130 192 150 200 170 206 L170 ${H} Z"/>
    <path class="bd-mid" d="M${W * 3} ${H} L${W * 3} 118 C420 124 340 150 290 180 C270 192 250 200 232 206 L232 ${H} Z"/>
    <path class="ch-valleyfloor" d="M${-W * 2} 214 C60 204 140 198 200 198 C260 198 340 204 ${W * 3} 214 L${W * 3} ${H} L${-W * 2} ${H} Z"/>
    ${spoils}
    <g class="ch-praisers">${praisers}</g>
    ${shrubs(-60, 90, 190, 6, 2302)}${shrubs(320, 470, 190, 6, 2303)}
    ${ground(250)}
  </g>`;
}

// ── 4. 바벨론의 옥 ───────────────────────────────
function chainsArt(): string {
  const r = rng(2401);
  const bricks: string[] = [];
  for (let row = 0; row < 26; row++) {
    const y = row * 9;
    const off = row % 2 ? 0 : 11;
    for (let x = -W * 2 + off; x < W * 3; x += 22) {
      if (r() < 0.06) continue;
      bricks.push(`<rect x="${x}" y="${y}" width="21" height="8.2"/>`);
    }
  }
  const straw = Array.from({ length: 40 }, () => {
    const x = 60 + r() * 280;
    const y = 238 + r() * 10;
    return `<path d="M${f(x)} ${f(y)} l${f(6 + r() * 8)} ${f((r() - 0.5) * 3)}"/>`;
  }).join('');
  const links = (x: number, y0: number, n: number) => Array.from({ length: n }, (_, i) =>
    `<ellipse cx="${f(x + Math.sin(i * 0.5) * 1.6)}" cy="${f(y0 + i * 5.4)}" rx="${i % 2 ? 1.3 : 2.4}" ry="3.2"/>`).join('');
  return `<g class="ch ch--chains">
    <rect class="ch-cellwall" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <g class="ch-bricks">${bricks.join('')}</g>
    <!-- 높은 창살 창과 빛줄기 -->
    <rect class="ch-window" x="238" y="34" width="34" height="18"/>
    <path class="ch-bars" d="M245 34 V52 M252 34 V52 M259 34 V52 M266 34 V52"/>
    <path class="ch-shaft" d="M238 52 L272 52 L232 246 L150 246 Z"/>
    <g class="ch-motes">${Array.from({ length: 14 }, () => `<circle style="--d:${f(r() * 8)}s" cx="${f(200 + r() * 60)}" cy="${f(80 + r() * 150)}" r="${f(0.5 + r() * 0.7)}"/>`).join('')}</g>
    <!-- 벽의 쇠고리와 늘어진 사슬 -->
    <g class="ch-iron">
      <circle cx="96" cy="128" r="5" class="ch-ring2"/><rect x="93" y="120" width="6" height="4"/>
      <g class="ch-link">${links(96, 134, 14)}</g>
      <circle cx="330" cy="140" r="4.4" class="ch-ring2"/><rect x="327" y="132" width="6" height="4"/>
      <g class="ch-link">${links(330, 145, 10)}</g>
    </g>
    <!-- 바닥 -->
    <rect class="ch-cellfloor" x="${-W * 2}" y="232" width="${W * 5}" height="${H - 232}"/>
    <g class="ch-straw">${straw}</g>
    <path class="ch-pot" d="M342 240 Q338 228 344 222 L344 218 L352 218 L352 222 Q358 228 354 240 Z"/>
    <ellipse class="ch-floorlight" cx="190" cy="244" rx="54" ry="5"/>
  </g>`;
}

export function chroniclesArt(art: ChroniclesArt): string {
  switch (art) {
    case 'ch-temple-site': return templeSiteArt();
    case 'ch-tekoa': return tekoaArt(false);
    case 'ch-tekoa-still': return tekoaArt(true);
    case 'ch-beracah': return beracahArt();
    case 'ch-chains': return chainsArt();
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
  return { x: a.left - b.left + a.width / 2, top: a.top - b.top, h: a.height, w: a.width };
}

/** 성전 식양 그림: 위에서 본 집과 뜰 (선은 pathLength=1로 차례로 그어짐) */
const PLAN: { d: string; k: number; cls?: string }[] = [
  // 뜰 담
  { d: 'M8 10 H232 V100 H8 Z', k: 0, cls: 'is-court' },
  // 낭실
  { d: 'M44 38 H64 V72 H44 Z', k: 1 },
  // 성소
  { d: 'M64 34 H150 V76 H64 Z', k: 2 },
  // 지성소
  { d: 'M150 34 H190 V76 H150 Z', k: 3 },
  // 그룹 날개 (지성소 안, 벽에서 벽까지)
  { d: 'M152 55 Q161 40 170 52 Q179 40 188 55', k: 4, cls: 'is-wing' },
  { d: 'M164 58 H176 V64 H164 Z', k: 4, cls: 'is-ark' },
  // 골방 (세 면을 두른 방들)
  { d: 'M64 26 H198 V84 H64 M64 26 V34 M83 26 V34 M102 26 V34 M121 26 V34 M140 26 V34 M159 26 V34 M178 26 V34 M190 34 H198 M190 48 H198 M190 62 H198 M190 76 H198 M83 76 V84 M102 76 V84 M121 76 V84 M140 76 V84 M159 76 V84 M178 76 V84', k: 5, cls: 'is-rooms' },
  // 등대 · 상 · 향단 (성소 안)
  { d: 'M84 44 V66 M78 48 Q84 54 90 48 M76 44 Q84 58 92 44', k: 6, cls: 'is-item' },
  { d: 'M112 62 H126 V70 H112 Z', k: 6, cls: 'is-item' },
  { d: 'M140 50 H146 V60 H140 Z', k: 6, cls: 'is-item' },
  // 번제단 · 놋바다
  { d: 'M16 44 H34 V62 H16 Z', k: 7, cls: 'is-item' },
  { d: 'M30 86 m-7 0 a7 5 0 1 0 14 0 a7 5 0 1 0 -14 0', k: 7, cls: 'is-item' },
];
const PLAN_LABELS: { t: string; x: number; y: number; k: number }[] = [
  { t: '뜰', x: 220, y: 20, k: 0 },
  { t: '낭실', x: 54, y: 92, k: 1 },
  { t: '성소', x: 104, y: 22, k: 2 },
  { t: '속죄소', x: 170, y: 22, k: 4 },
  { t: '골방', x: 214, y: 56, k: 5 },
  { t: '등대 · 상 · 향단', x: 108, y: 96, k: 6 },
  { t: '번제단', x: 25, y: 40, k: 7 },
];

/** ch-blueprint: 성전 식양이 그려져 다윗 → 솔로몬 (대상 28:11-19) */
export function playBlueprint(scene: HTMLElement, from: string | undefined, to: string | undefined, rm: boolean): void {
  const b = scene.getBoundingClientRect();
  const a = actorBox(scene, from) ?? actorBox(scene, 'david');
  const c = actorBox(scene, to) ?? actorBox(scene, 'solomon');
  const cx = b.width / 2;
  const cy = b.height * 0.3;
  const tx = c ? c.x - cx : 0;
  const ty = c ? c.top + c.h * 0.42 - cy : b.height * 0.2;
  const sx = a ? a.x - cx : 0;
  const lines = PLAN.map((p) => `<path class="${p.cls ?? ''}" style="--k:${p.k}" pathLength="1" d="${p.d}"/>`).join('');
  const labels = PLAN_LABELS.map((l) => `<text style="--k:${l.k}" x="${l.x}" y="${l.y}">${l.t}</text>`).join('');
  layerOf(scene, `fx-bp${rm ? ' is-rm' : ''}`,
    `<b class="fx-bp__ray"></b>
     <div class="fx-bp__move" style="--sx:${sx.toFixed(0)}px; --tx:${tx.toFixed(0)}px; --ty:${ty.toFixed(0)}px">
       <div class="fx-bp__body">
         <i class="fx-bp__rod fx-bp__rod--l"></i>
         <div class="fx-bp__sheet"><svg viewBox="0 0 240 110" aria-hidden="true"><g class="fx-bp__plan">${lines}</g><g class="fx-bp__labels">${labels}</g></svg></div>
         <i class="fx-bp__rod fx-bp__rod--r"></i>
       </div>
     </div>
     <em class="fx-bp__cap">여호와의 손이 내게 임하여 그려 나로 알게 하셨느니라</em>`,
    rm ? 4200 : 11500, 1600);
}

const GIFTS: { name: string; n: string; metal: 'gold' | 'silver' | 'bronze' | 'iron' | 'gem' }[] = [
  { name: '금', n: '5,000 달란트', metal: 'gold' },
  { name: '금 다릭', n: '10,000', metal: 'gold' },
  { name: '은', n: '10,000 달란트', metal: 'silver' },
  { name: '놋', n: '18,000 달란트', metal: 'bronze' },
  { name: '철', n: '100,000 달란트', metal: 'iron' },
  { name: '보석', n: '여호와의 전 곳간으로', metal: 'gem' },
];

/** ch-offerings: 백성이 즐거이 드려 예물이 쌓임 (대상 29:6-9) */
export function playOfferings(scene: HTMLElement, rm: boolean): void {
  const r = rng(2901);
  const rows = GIFTS.map((g, i) => `<li style="--i:${i}" class="is-${g.metal}"><i></i><span>${g.name}</span><b>${g.n}</b></li>`).join('');
  const metals = ['gold', 'gold', 'silver', 'bronze', 'iron', 'gem'];
  const flyers = rm ? '' : Array.from({ length: 34 }, (_, i) => {
    const side = i % 2 ? 1 : -1;
    const dx = side * (24 + r() * 30);
    const dy = -(6 + r() * 26);
    return `<i class="is-${metals[i % metals.length]}" style="--k:${i}; --dx:${dx.toFixed(1)}vw; --dy:${dy.toFixed(1)}vh; --r:${(r() * 360).toFixed(0)}deg"></i>`;
  }).join('');
  const heap = Array.from({ length: 12 }, (_, i) => {
    const m = metals[i % metals.length];
    const row = Math.floor(i / 4);
    return `<b class="is-${m}" style="--i:${i}; --x:${((i % 4) - 1.5) * (22 - row * 5)}px; --y:${-row * 9}px"></b>`;
  }).join('');
  const motes = rm ? '' : Array.from({ length: 22 }, () => `<s style="--x:${(r() * 100).toFixed(0)}%; --d:${(r() * 6).toFixed(2)}s; --dur:${(4 + r() * 3).toFixed(1)}s"></s>`).join('');
  layerOf(scene, `fx-offer${rm ? ' is-rm' : ''}`,
    `<div class="fx-offer__ledger"><h4>즐거이 드린 것 · 대상 29:7-8</h4><ol>${rows}</ol></div>
     <div class="fx-offer__fly">${flyers}</div>
     <div class="fx-offer__heap"><b class="fx-offer__glow"></b>${heap}</div>
     <div class="fx-offer__motes">${motes}</div>
     <em class="fx-offer__cap">백성이 자기의 즐거이 드림으로 기뻐하였으니</em>`,
    rm ? 4400 : 11500, 1800);
}

const PRAISE_1 = '여호와께 감사하세';
const PRAISE_2 = '그 자비하심이 영원하도다';

/** 노래하는 자 하나 (흰 예복, 한 손을 든 모습 / 수금 / 나팔) */
function singer(i: number): string {
  const kind = i % 3;
  const thing = kind === 0
    ? '<path class="fx-pm__arm" d="M15 15 L20 6"/>'
    : kind === 1
      ? '<path class="fx-pm__lyre" d="M16 13 C14 18 15 22 17 23 L22 23 C23 20 23 16 21 13 Z M17 14 L17 22 M19 14 L19 22 M21 15 L21 22"/>'
      : '<path class="fx-pm__horn" d="M15 12 L25 7 L26 10 Z"/>';
  return `<i class="fx-pm__singer" style="--k:${i}"><svg viewBox="0 0 30 46" aria-hidden="true">
    <circle class="fx-pm__head" cx="12" cy="7" r="4.4"/>
    <path class="fx-pm__robe" d="M7 13 Q12 10 17 13 L20 44 Q12 46 4 44 Z"/>
    <path class="fx-pm__sash" d="M7 22 Q12 24 18 22"/>
    ${thing}
  </svg></i>`;
}

/** ch-praise-march: 노래하는 자들이 군대 앞에서 "여호와께 감사하세" (대하 20:21-22) */
export function playPraiseMarch(scene: HTMLElement, rm: boolean): void {
  const r = rng(2021);
  const chars = (t: string, base: number) => [...t].map((ch, i) => `<span style="--c:${base + i}">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');
  const singers = Array.from({ length: 12 }, (_, i) => singer(i)).join('');
  const waves = rm ? '' : Array.from({ length: 9 }, (_, i) => `<i style="--k:${i}"></i>`).join('');
  const notes = rm ? '' : Array.from({ length: 26 }, () => `<s style="--y:${(r() * 60 - 30).toFixed(0)}px; --d:${(1.2 + r() * 7.5).toFixed(2)}s; --s:${(0.6 + r() * 0.9).toFixed(2)}"></s>`).join('');
  layerOf(scene, `fx-pm${rm ? ' is-rm' : ''}`,
    `<b class="fx-pm__wash"></b>
     <b class="fx-pm__far"></b>
     <div class="fx-pm__words"><p>${chars(PRAISE_1, 0)}</p><p>${chars(PRAISE_2, PRAISE_1.length + 2)}</p></div>
     <div class="fx-pm__waves">${waves}</div>
     <div class="fx-pm__notes">${notes}</div>
     <div class="fx-pm__line">${singers}</div>`,
    rm ? 5000 : 14000, 2400);
}

/** ch-unchain: 겸비하여 기도한 사람의 사슬이 풀림 (대하 33:13) */
export function playUnchain(scene: HTMLElement, who: string | undefined, rm: boolean): void {
  const b = scene.getBoundingClientRect();
  const place = () => {
    const a = actorBox(scene, who) ?? actorBox(scene, 'manasseh-king');
    return {
      x: a ? a.x : b.width / 2,
      y: a ? a.top + a.h * 0.56 : b.height * 0.5,
      h: a ? a.top + a.h * 0.3 : b.height * 0.4,
    };
  };
  const p = place();
  const links = Array.from({ length: 7 }, (_, i) => `<i style="--k:${i}; --fx:${((i - 3) * 7).toFixed(0)}px; --fr:${((i % 2 ? 1 : -1) * (40 + i * 12)).toFixed(0)}deg"></i>`).join('');
  const layer = layerOf(scene, `fx-unchain${rm ? ' is-rm' : ''}`,
    `<b class="fx-unchain__ray" style="--x:${p.x.toFixed(0)}px; --h:${p.h.toFixed(0)}px"></b>
     <div class="fx-unchain__chain" style="--x:${p.x.toFixed(0)}px; --y:${p.y.toFixed(0)}px">${links}</div>
     <b class="fx-unchain__glow" style="--x:${p.x.toFixed(0)}px; --y:${p.y.toFixed(0)}px"></b>`,
    rm ? 2600 : 6000, 1200);
  // 인물이 일어서는 동작(stand)이 끝난 뒤 손목 자리를 다시 잰다
  setTimeout(() => {
    const q = place();
    for (const el of layer.querySelectorAll<HTMLElement>('.fx-unchain__chain, .fx-unchain__glow, .fx-unchain__ray')) {
      el.style.setProperty('--x', `${q.x.toFixed(0)}px`);
      if (!el.classList.contains('fx-unchain__ray')) el.style.setProperty('--y', `${q.y.toFixed(0)}px`);
    }
  }, rm ? 0 : 750);
}
