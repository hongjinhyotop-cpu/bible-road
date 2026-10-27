// 유월절 밤 (출 11:1-12:42, A급 exo-12-passover 「어린 양의 피」). 같은 종이 오려낸 그림자극 말투.
// 배경 그림:
//  - goshen-house  : 고센의 흙벽돌 집 한 채(가운데 문). 해 질 녘, 문 안에 등잔 불빛. 아직 피는 없다 (출 12:3-6)
//  - goshen-blood  : 같은 집. 문 인방과 좌우 설주에 피가 우슬초 자국으로 그어진다 (출 12:7, 12:22). 문 앞에 피 담은 그릇과 우슬초 묶음
//  - passover-night: 보름달 뜬 밤(니산월 14일은 늘 보름). 피 바른 문 안에서 온 가족이 선 채로, 허리에 띠 띠고 지팡이를 짚고 먹는다 (출 12:11)
//  - egypt-lamps   : 멀리 애굽 성읍의 밤. 등불들이 하나씩 꺼진다 — 맨 먼저 가운데 왕궁, 그다음 성읍, 맨 끝은 변두리의 옥 (출 12:29)
// 효과 fx "passover": 어두운 바람이 무대를 쓸고 지나간다. 피 바른 문만 그 어둠 밖에 남아 불빛이 지켜진다 (출 12:13, 12:23).
// 폰(세로 화면)에서는 x 110~290만 보인다 → 문은 한가운데(x 200). mood에 spread를 걸어 인물을 양옆으로 벌린다.
// 무대 땅(land)은 깔지 않고 바닥(y 236 아래)을 여기서 그린다. 모션 줄이기면 등불은 짧게 사그라들고, 바람은 잠깐 어두워졌다 걷힌다.
import gsap from 'gsap';
import { H, W, palm, rng } from './backdrop';

const G = 236;
const DX = 200;
/** 문 구멍: 폭 44, 높이 86 */
const DW = 22;
const DT = 150;

function stars(seed: number, n: number, maxY: number): string {
  const r = rng(seed);
  return `<g class="bd-stars">${Array.from({ length: n }, () => {
    const big = r() < 0.08;
    return `<circle class="bd-star${big ? ' is-big' : ''}" style="--d:${(r() * 6).toFixed(2)}s" cx="${(-W * 1.5 + r() * W * 4).toFixed(1)}" cy="${(r() * maxY).toFixed(1)}" r="${(big ? 1 + r() * 0.5 : 0.3 + r() * 0.45).toFixed(2)}"/>`;
  }).join('')}</g>`;
}

/** 밤하늘: 짙은 남색 하늘 + 별 + 보름달 */
function nightSky(seed: number, moonX: number, moonY: number): string {
  return `
    <defs><linearGradient id="px-sky-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05060f"/><stop offset="0.7" stop-color="#121226"/><stop offset="1" stop-color="#2a1a1e"/></linearGradient></defs>
    <rect x="${-W * 2}" y="0" width="${W * 5}" height="${H}" fill="url(#px-sky-g)"/>
    ${stars(seed, 110, 150)}
    <circle class="px-moonglow" cx="${moonX}" cy="${moonY}" r="34"/>
    <circle class="px-moon" cx="${moonX}" cy="${moonY}" r="9"/>`;
}

/** 흙벽돌 집 한 채: 평평한 지붕과 난간, 작은 창. 가운데 집은 큰 문 (따로 그림) */
function house(x0: number, x1: number, top: number, cls: string, win: [number, number][] = [], seed = 0): string {
  const r = rng(seed + 7);
  const courses = Array.from({ length: Math.floor((G - top) / 9) }, (_, i) => {
    const y = top + 8 + i * 9;
    return `M${x0 + 2} ${y} L${x1 - 2} ${(y + (r() - 0.5) * 0.8).toFixed(1)}`;
  }).join(' ');
  return `<g class="${cls}">
    <path d="M${x0} ${G} L${x0} ${top} L${x0 - 2} ${top} L${x0 - 2} ${top - 4} L${x1 + 2} ${top - 4} L${x1 + 2} ${top} L${x1} ${top} L${x1} ${G} Z"/>
    <path class="px-course" d="${courses}"/>
    ${win.map(([wx, wy]) => `<rect class="px-window" x="${wx - 3}" y="${wy}" width="6" height="7" rx="2.6"/>`).join('')}
  </g>`;
}

/** 이웃집의 작은 문. marked면 인방·설주에 핏자국 */
function smallDoor(x: number, h: number, marked: boolean): string {
  const t = G - h;
  return `<path class="px-smalldoor" d="M${x - 6} ${G} L${x - 6} ${t + 4} Q${x} ${t - 1} ${x + 6} ${t + 4} L${x + 6} ${G} Z"/>
    ${marked ? `<path class="px-blood px-blood--small" d="M${x - 8} ${t + 1} L${x + 8} ${t + 1} M${x - 7.5} ${t + 6} L${x - 7.5} ${t + 22} M${x + 7.5} ${t + 6} L${x + 7.5} ${t + 20}" pathLength="1"/>` : ''}`;
}

/** 문 안: 등잔 불빛이 비친 방. meal이면 선 채로 먹는 식구들 (허리띠·지팡이·어깨에 멘 보따리) */
function interior(meal: boolean): string {
  const l = DX - DW;
  const r = DX + DW;
  const fig = (x: number, h: number, staff: boolean, woman: boolean, lift = false) => {
    const top = G - h;
    const head = h * 0.078;
    const w = h * 0.3;
    const body = woman
      ? `<path d="M${x - w * 0.42} ${top + head * 2} Q${x} ${top + head * 1.2} ${x + w * 0.42} ${top + head * 2} L${x + w * 0.62} ${G} L${x - w * 0.62} ${G} Z"/><path d="M${x - head * 1.1} ${top + head * 2.2} Q${x} ${top - head * 0.6} ${x + head * 1.1} ${top + head * 2.2} Z"/>`
      : `<path d="M${x - w * 0.5} ${top + head * 2.2} L${x + w * 0.5} ${top + head * 2.2} L${x + w * 0.58} ${G} L${x - w * 0.58} ${G} Z"/>`;
    const belt = `<path class="px-belt" d="M${x - w * 0.52} ${top + h * 0.48} L${x + w * 0.52} ${top + h * 0.48}"/>`;
    const st = staff ? `<path d="M${x + w * 0.7} ${G} L${x + w * 0.62} ${top + head}" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>` : '';
    const arm = lift
      ? `<path class="px-eat" d="M${x - w * 0.3} ${top + h * 0.34} L${x - w * 0.1} ${top + head * 1.6}" fill="none" stroke="currentColor" stroke-width="${(w * 0.22).toFixed(1)}" stroke-linecap="round" style="transform-origin:${x - w * 0.3}px ${top + h * 0.34}px"/>`
      : '';
    return `<g class="px-fig">${st}<circle cx="${x}" cy="${top + head}" r="${head}"/>${body}${belt}${arm}</g>`;
  };
  return `
    <defs><radialGradient id="px-room-g" cx="0.78" cy="0.45" r="0.95"><stop offset="0" stop-color="#ffdca0"/><stop offset="0.35" stop-color="#e8a45a"/><stop offset="0.75" stop-color="#9a5428"/><stop offset="1" stop-color="#4a2210"/></radialGradient></defs>
    <rect class="px-room" x="${l}" y="${DT}" width="${DW * 2}" height="${G - DT}" fill="url(#px-room-g)"/>
    <path class="px-roomwall" d="M${l} ${G - 14} L${r} ${G - 16} L${r} ${G} L${l} ${G} Z"/>
    <path class="px-niche" d="M${r - 9} 196 L${r - 9} 186 Q${r - 5} 182 ${r - 1} 186 L${r - 1} 196 Z"/>
    <path class="bd-lampflame" d="M${r - 6} 190 Q${r - 5} 185 ${r - 4.6} 183 Q${r - 4} 186 ${r - 3.4} 190 Z"/>
    <circle class="px-lamp" cx="${r - 5}" cy="189" r="24"/>
    ${meal ? `<g class="px-family">
      <path class="px-table" d="M${DX - 10} ${G} L${DX - 10} 222 L${DX + 10} 222 L${DX + 10} ${G} Z M${DX - 13} 222 L${DX + 13} 222 L${DX + 13} 219 L${DX - 13} 219 Z"/>
      ${fig(l + 7, 60, true, false, true)}${fig(DX + 4, 34, false, false)}${fig(r - 9, 54, true, true)}
    </g>` : ''}`;
}

/** 가운데 집의 문틀: 인방과 좌우 설주. blood면 피가 우슬초로 그어진다 */
function doorFrame(blood: 'none' | 'draw' | 'set'): string {
  const l = DX - DW;
  const r = DX + DW;
  const marks = blood === 'none' ? '' : `<g class="px-bloodset${blood === 'draw' ? ' is-draw' : ''}">
      <path class="px-blood" style="--i:0" pathLength="1" d="M${l - 3} ${DT - 6} C${l + 8} ${DT - 8.5} ${DX - 6} ${DT - 4.5} ${DX + 2} ${DT - 6.6} C${DX + 10} ${DT - 8} ${r - 4} ${DT - 4.8} ${r + 3} ${DT - 6.4}"/>
      <path class="px-blood" style="--i:1" pathLength="1" d="M${l - 4.4} ${DT + 6} C${l - 3.6} ${DT + 18} ${l - 5} ${DT + 30} ${l - 4.2} ${DT + 44}"/>
      <path class="px-blood" style="--i:2" pathLength="1" d="M${r + 4.4} ${DT + 4} C${r + 3.6} ${DT + 16} ${r + 5} ${DT + 30} ${r + 4.2} ${DT + 40}"/>
      <path class="px-blood px-blood--thin" style="--i:0" pathLength="1" d="M${l + 2} ${DT - 4} C${l + 14} ${DT - 5.6} ${DX + 4} ${DT - 3.4} ${r - 2} ${DT - 4.6}"/>
      <path class="px-blood px-drip" style="--i:1" pathLength="1" d="M${DX - 9} ${DT - 4} L${DX - 9.2} ${DT + 1.5} M${DX + 7} ${DT - 4} L${DX + 7.1} ${DT + 3.2} M${l - 4.8} ${DT + 44} L${l - 4.9} ${DT + 51}"/>
      <g class="px-drops" style="--i:3"><circle cx="${l - 4}" cy="${DT + 52}" r="0.9"/><circle cx="${r + 4.6}" cy="${DT + 47}" r="0.8"/><circle cx="${DX - 8}" cy="${DT - 2}" r="0.7"/><circle cx="${DX + 12}" cy="${DT - 1.6}" r="0.6"/></g>
    </g>`;
  return `
    <g class="px-frame">
      <rect x="${l - 8}" y="${DT - 11}" width="${DW * 2 + 16}" height="9" rx="1"/>
      <rect x="${l - 8}" y="${DT - 2}" width="7" height="${G - DT + 2}"/>
      <rect x="${r + 1}" y="${DT - 2}" width="7" height="${G - DT + 2}"/>
      <path class="px-grain" d="M${l - 6} ${DT - 7} L${r + 6} ${DT - 7.5} M${l - 4.5} ${DT + 6} L${l - 4.6} ${G - 2} M${r + 4.5} ${DT + 6} L${r + 4.4} ${G - 2}"/>
    </g>
    ${marks}`;
}

/** 문 앞: 피 담은 그릇과 우슬초 묶음 (출 12:22) */
function basin(): string {
  const x = DX - DW - 22;
  return `<g class="px-basin">
    <path class="bd-near" d="M${x - 9} ${G - 6} C${x - 8} ${G + 1} ${x + 8} ${G + 1} ${x + 9} ${G - 6} Z"/>
    <ellipse class="px-bowlblood" cx="${x}" cy="${G - 6}" rx="8.4" ry="1.4"/>
    <path class="bd-near" d="M${x + 4} ${G - 7} L${x + 15} ${G - 22}" stroke="currentColor" stroke-width="1.1" fill="none"/>
    <g class="bd-near"><ellipse cx="${x + 16}" cy="${G - 24}" rx="3.2" ry="2"/><ellipse cx="${x + 13.6}" cy="${G - 22}" rx="2.4" ry="1.6"/><ellipse cx="${x + 17.8}" cy="${G - 21.2}" rx="2.2" ry="1.4"/></g>
  </g>`;
}

export type GoshenKind = 'house' | 'blood' | 'night';

/** 고센의 집 (house · blood · night) */
export function goshenArt(kind: GoshenKind): string {
  const night = kind === 'night';
  const marked = kind !== 'house';
  return `
    ${night ? nightSky(1201, 262, 34) : ''}
    ${palm(-90, 214, 70, 'bd-far', 1202)}${palm(470, 214, 76, 'bd-far', 1203)}
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 214 C-300 210 -100 216 100 212 C260 209 420 215 ${W * 3} 211 L${W * 3} ${H} Z"/>
    ${house(-260, -120, 140, 'bd-mid px-house', [[-200, 160]], 1)}
    ${house(-116, 52, 128, 'bd-mid px-house', [[-60, 150]], 2)}
    ${smallDoor(-30, 52, marked)}
    ${house(56, 132, 112, 'bd-mid px-house px-house--side', [[92, 136]], 3)}
    ${house(268, 360, 118, 'bd-mid px-house px-house--side', [[322, 140]], 4)}
    ${smallDoor(300, 56, marked)}
    ${house(364, 520, 134, 'bd-mid px-house', [[430, 156]], 5)}
    ${smallDoor(470, 50, marked)}
    ${house(126, 274, 104, 'bd-near px-house px-house--main', [[150, 124], [252, 124]], 6)}
    ${interior(night)}
    ${doorFrame(kind === 'blood' ? 'draw' : marked ? 'set' : 'none')}
    <path class="px-doorlight" d="M${DX - DW} ${G} L${DX + DW} ${G} L${DX + DW + 40} ${H} L${DX - DW - 40} ${H} Z"/>
    ${kind === 'blood' ? basin() : ''}
    <rect class="px-floor" x="${-W * 2}" y="${G}" width="${W * 5}" height="${H - G}"/>
    <path class="px-floorline" d="M${-W * 2} ${G} H${W * 3}"/>
    ${palm(40, 262, 120, 'bd-near', 1204)}${palm(372, 262, 128, 'bd-near', 1205)}`;
}

/** 먼 애굽 성읍의 밤. 등불은 가운데 왕궁부터 꺼져서 바깥으로 번지고, 맨 끝은 변두리 옥 (출 12:29) */
export function egyptLampsArt(): string {
  const r = rng(1301);
  const hz = 206;
  const lamps: string[] = [];
  /** 등불 하나: 거리(가운데 왕궁에서 얼마나 먼가)에 따라 꺼지는 순서가 정해진다 */
  const lamp = (x: number, y: number, s: number, d: number) =>
    lamps.push(`<g class="px-elamp" style="--d:${d.toFixed(2)}s"><circle class="px-elamp__glow" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(6 * s).toFixed(1)}"/><rect class="px-elamp__dot" x="${(x - 1.1 * s).toFixed(1)}" y="${(y - 1.3 * s).toFixed(1)}" width="${(2.2 * s).toFixed(1)}" height="${(2.6 * s).toFixed(1)}" rx="0.6"/></g>`);
  // 왕궁: 가운데, 탑문 둘과 기둥 홀. 맨 먼저 꺼진다 ("위에 앉은 바로의 장자로부터")
  const palace = `
    <path d="M150 ${hz} L154 156 L176 156 L180 ${hz} Z M220 ${hz} L224 156 L246 156 L250 ${hz} Z"/>
    <rect x="178" y="170" width="44" height="${hz - 170}"/>
    <rect x="176" y="166" width="48" height="5"/>
    <path d="M262 ${hz} L265 128 L269 128 L272 ${hz} Z M266 128 L267 121 L268 128 Z"/>`;
  lamp(200, 184, 1.4, 2.2);
  lamp(188, 194, 1, 2.6);
  lamp(212, 194, 1, 2.9);
  lamp(165, 170, 1, 3.3);
  lamp(235, 170, 1, 3.5);
  // 성읍의 집들: 평평한 지붕 덩이가 지평선을 따라 늘어선다
  let blocks = '';
  for (let x = -330; x < 740; ) {
    const w = 10 + r() * 16;
    if (x > 140 && x < 280) {
      x = 280;
      continue;
    }
    const h = 8 + r() * 18 * Math.max(0.3, 1 - Math.abs(x - 200) / 520);
    blocks += `<rect x="${x.toFixed(1)}" y="${(hz - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"/>`;
    if (r() < 0.62) {
      const dist = Math.abs(x + w / 2 - 200);
      lamp(x + w * (0.3 + r() * 0.4), hz - h + 3 + r() * (h - 6), 0.8, 3.8 + dist / 36 + r() * 1.6);
    }
    x += w + 1 + r() * 6;
  }
  // 변두리의 옥: 오른쪽 끝 낮고 두꺼운 벽, 창살 하나. 맨 나중에 꺼진다 ("옥에 갇힌 사람의 장자까지")
  const prison = `<path d="M318 ${hz} L320 178 L352 178 L354 ${hz} Z"/><path class="px-bars" d="M332 186 L332 194 M336 186 L336 194 M340 186 L340 194"/>`;
  lamp(336, 190, 0.9, 13.6);
  return `
    ${nightSky(1302, 140, 40)}
    <g class="bd-far px-city">${palace}${blocks}${prison}</g>
    <g class="px-lamps">${lamps.join('')}</g>
    <path class="bd-river" d="M-600 216 C-420 212 -260 220 -100 216 C40 212 160 220 300 215 C440 210 600 218 900 214"/>
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 224 C-300 220 -40 228 140 223 C300 219 520 227 ${W * 3} 222 L${W * 3} ${H} Z"/>
    ${palm(30, 262, 116, 'bd-near', 1303)}${palm(-80, 262, 132, 'bd-near', 1304)}${palm(388, 262, 122, 'bd-near', 1305)}${palm(500, 262, 130, 'bd-near', 1306)}`;
}

/**
 * fx "passover": 어두운 바람 한 줄기가 무대를 왼쪽에서 오른쪽으로 쓸고 지나간다 (출 12:23 "두루 다니실 때에").
 * 하나님도 멸하는 자도 그리지 않는다. 어둠과 바람결만. 피 바른 문(배경의 .px-room)이 있으면 그 자리만 어둠이 비켜 가고 불빛이 더 또렷해진다.
 */
export function playPassover(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-passover';
  const room = scene.querySelector<SVGGraphicsElement>('.scene__backdrop .backdrop:last-child .px-room');
  if (room) {
    const a = room.getBoundingClientRect();
    const b = scene.getBoundingClientRect();
    if (a.width) {
      layer.style.setProperty('--mx', `${a.left - b.left + a.width / 2}px`);
      layer.style.setProperty('--my', `${a.top - b.top + a.height * 0.55}px`);
      layer.style.setProperty('--mw', `${a.width * 1.15}px`);
      layer.style.setProperty('--mh', `${a.height * 0.85}px`);
      layer.classList.add('has-door');
    }
  }
  const streaks = Array.from({ length: rm ? 0 : 16 }, () => `<i style="--y:${(8 + Math.random() * 80).toFixed(1)}%; --d:${(Math.random() * 1.2).toFixed(2)}s; --w:${(18 + Math.random() * 30).toFixed(0)}%"></i>`).join('');
  layer.innerHTML = `<b class="fx-passover__sweep"></b><div class="fx-passover__streaks">${streaks}</div>`;
  scene.append(layer);
  scene.classList.add('is-passing');
  const sweep = layer.firstElementChild as HTMLElement;
  const life = rm ? 2600 : 8200;
  if (rm) {
    gsap.fromTo(sweep, { opacity: 0, xPercent: -50 }, { opacity: 1, duration: 0.8, yoyo: true, repeat: 1, repeatDelay: 0.6 });
  } else {
    gsap.fromTo(sweep, { xPercent: -130 }, { xPercent: 130, duration: 6.4, delay: 0.7, ease: 'sine.inOut' });
  }
  setTimeout(() => scene.classList.remove('is-passing'), life - 1200);
  setTimeout(() => layer.remove(), life);
}
