// 얍복 나루와 세일 들 (창 32–33, A급 gen-32-wrestle · gen-33-esau). 배경 그림 'jabbok*' · 'seir*'.
// 같은 종이 오려낸 그림자극 말투.
//  - jabbok       : 길르앗 산지 사이 깊은 골짜기. 가운데로 얍복 시내가 가로질러 흐르고, 건널 수 있는 얕은 여울에
//                   징검돌이 놓였다. 달 없는 밤에는 별만 (창 32:22-24)
//  - jabbok-cross : 같은 여울 + 등불 하나를 앞세운 작은 사람들·낙타·양 떼가 징검돌을 따라 건너가 맞은편 어둠으로 사라진다 (32:22-23)
//  - jabbok-grey  : 같은 자리, 골짜기 동쪽 틈으로 새벽의 첫 잿빛이 번진다 — "날이 새려 하니" (32:26)
//  - jabbok-sun   : 해가 골짜기 틈 위로 돋는다. 물에 빛이 깔린다 (32:31)
//  - seir-road    : 얍복 남쪽 넓은 들, 아침. 지평선까지 굽은 길 (창 33:1)
//  - seir-host    : 같은 들 + 먼 마루를 따라 늘어선 사백 인. 창끝이 반짝이고 먼지가 인다. 아주 천천히 다가온다 (33:1)
//  - seir-near    : 사백 인이 바로 뒤 비탈까지 와 섰다 (33:4 에서가 달려옴)
// 폰(세로 화면)에서는 x 100~300만 보인다 → 여울·징검돌·해·군대 앞머리는 가운데(x 160~260).
// 밤에는 무대가 배경 전체를 어둡게 덮는데(library.css), 새벽빛·등불까지 어두워지면 안 되므로
// 이 그림들은 그 필터를 끄고 땅(.jab-dim)만 따로 어둡게 한다 (styles/jabbok.css).
import { W, rng, reeds, thorns, hills } from './backdrop';

const RIVER = 226;

/** 별 (밤에만 보인다) */
function stars(seed: number): string {
  const r = rng(seed);
  return `<g class="jab-stars">${Array.from({ length: 130 }, () => {
    const big = r() < 0.1;
    const x = -W * 1.5 + r() * W * 4;
    const y = r() * 190;
    return `<circle class="jab-star${big ? ' is-big' : ''}" style="--d:${(r() * 7).toFixed(2)}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(big ? 0.9 + r() * 0.6 : 0.3 + r() * 0.45).toFixed(2)}"/>`;
  }).join('')}</g>`;
}

/** 흩어진 바위 */
function rocks(xs: number[], ground: number, cls: string, seed: number, big = 1): string {
  const r = rng(seed);
  return `<g class="${cls}">${xs.map((x) => {
    const w = (5 + r() * 9) * big;
    const h = (3 + r() * 6) * big;
    return `<path d="M${(x - w).toFixed(1)} ${ground} C${(x - w).toFixed(1)} ${(ground - h * 0.8).toFixed(1)} ${(x - w * 0.3).toFixed(1)} ${(ground - h).toFixed(1)} ${x.toFixed(1)} ${(ground - h).toFixed(1)} C${(x + w * 0.6).toFixed(1)} ${(ground - h).toFixed(1)} ${(x + w).toFixed(1)} ${(ground - h * 0.5).toFixed(1)} ${(x + w).toFixed(1)} ${ground} Z"/>`;
  }).join('')}</g>`;
}

/** 새벽빛: grey = 첫 잿빛, sun = 돋는 해 */
function dawn(kind: 'grey' | 'sun'): string {
  return `<defs>
      <radialGradient id="jab-dawn-${kind}" cx="0.5" cy="0.62" r="0.6">
        <stop offset="0" class="jab-dawn__c"/><stop offset="0.45" class="jab-dawn__m"/><stop offset="1" class="jab-dawn__e"/>
      </radialGradient>
    </defs>
    <ellipse class="jab-dawn jab-dawn--${kind}" fill="url(#jab-dawn-${kind})" cx="226" cy="188" rx="${kind === 'sun' ? 260 : 190}" ry="${kind === 'sun' ? 130 : 78}"/>
    ${kind === 'sun' ? '<circle class="jab-sun" cx="226" cy="178" r="13"/>' : ''}`;
}

/** 골짜기: 양쪽 가파른 산, 가운데 틈으로 먼 언덕 */
function gorge(): string {
  return `
    <path class="bd-far jab-far" d="M-800 260 L-800 196 C-600 190 -420 200 -300 196 C-200 192 -120 204 -60 200 C20 194 120 202 200 198 C260 196 320 204 400 198 C520 190 700 200 1200 196 L1200 260 Z"/>
    <path class="bd-mid jab-cliff" d="M-800 260 L-800 120 C-600 110 -400 90 -260 98 C-160 104 -80 86 0 92 C40 95 70 104 96 100 C116 97 132 112 146 128 C158 142 166 160 176 178 C184 192 190 204 196 214 L196 260 Z"/>
    <path class="bd-mid jab-cliff" d="M248 260 L248 214 C254 202 262 186 270 170 C280 150 290 132 304 118 C318 104 340 110 360 106 C400 98 460 112 540 104 C700 90 900 112 1200 108 L1200 260 Z"/>
    <path class="jab-ledge" d="M96 100 C116 97 132 112 146 128 M304 118 C318 104 340 110 360 106" fill="none"/>
    <path class="jab-strata" d="M20 130 C60 124 100 134 132 150 M-40 160 C20 150 90 162 150 178 M0 196 C60 186 120 196 168 206 M290 150 C320 140 360 146 420 138 M270 182 C320 170 380 176 460 168 M256 206 C300 196 360 202 430 196"/>
    ${thorns(150, 140, 10, 'bd-mid', 931)}${thorns(292, 136, 9, 'bd-mid', 932)}
    ${thorns(60, 104, 12, 'bd-mid', 933)}${thorns(352, 110, 11, 'bd-mid', 934)}`;
}

/** 얍복 시내: 골짜기 바닥을 가로지르는 물, 물결, 여울의 징검돌 */
function river(glow: 'none' | 'grey' | 'sun'): string {
  const r = rng(941);
  const ripples = Array.from({ length: 16 }, (_, i) => {
    const x = -60 + i * 34 + r() * 16;
    const y = RIVER + 2 + r() * 9;
    const w = 8 + r() * 14;
    return `<path class="jab-ripple" style="--d:${(r() * 4).toFixed(2)}s" d="M${x.toFixed(1)} ${y.toFixed(1)} q${(w / 2).toFixed(1)} -1.2 ${w.toFixed(1)} 0"/>`;
  }).join('');
  // 징검돌: 가까운 왼쪽 물가에서 먼 오른쪽 물가로 비스듬히
  const stones = [[148, 238, 7], [166, 235, 6], [184, 232.5, 5.4], [201, 230.4, 4.8], [217, 228.6, 4.2], [232, 227, 3.8], [246, 225.6, 3.4]]
    .map(([x, y, w]) => `<path d="M${x - w} ${y} C${x - w} ${y - w * 0.55} ${x - w * 0.3} ${y - w * 0.7} ${x} ${y - w * 0.7} C${x + w * 0.5} ${y - w * 0.7} ${x + w} ${y - w * 0.4} ${x + w} ${y} Z"/>`)
    .join('');
  return `
    <path class="jab-water" d="M-800 ${RIVER} C-400 ${RIVER - 2} -100 ${RIVER + 2} 120 ${RIVER - 1} C200 ${RIVER - 3} 260 ${RIVER - 4} 330 ${RIVER - 2} C600 ${RIVER} 900 ${RIVER - 2} 1200 ${RIVER} L1200 ${RIVER + 16} L-800 ${RIVER + 16} Z"/>
    ${glow !== 'none' ? `<path class="jab-sheen jab-sheen--${glow}" d="M150 ${RIVER} C190 ${RIVER - 2} 260 ${RIVER - 2} 300 ${RIVER} L292 ${RIVER + 12} C250 ${RIVER + 10} 200 ${RIVER + 10} 160 ${RIVER + 12} Z"/>` : ''}
    <path class="jab-starlight" d="M-200 ${RIVER + 3} C0 ${RIVER + 1} 200 ${RIVER + 4} 600 ${RIVER + 2} L600 ${RIVER + 5} C200 ${RIVER + 7} 0 ${RIVER + 4} -200 ${RIVER + 6} Z"/>
    <g class="jab-ripples">${ripples}</g>
    <g class="bd-mid jab-stone">${stones}</g>
    <path class="jab-foam" d="M150 239 q4 -1 8 0 M168 236 q3 -1 6 0 M186 233.4 q3 -0.8 6 0 M203 231.2 q2.6 -0.7 5 0" fill="none"/>`;
}

/** 가까운 물가: 자갈 비탈, 양옆 협죽도·갈대 덤불 */
function nearBank(): string {
  return `
    <path class="bd-mid" d="M-800 300 L-800 240 C-500 236 -200 244 40 240 C100 238 130 241 150 240 C180 238 230 242 270 240 C300 238 340 241 400 239 C700 236 900 242 1200 240 L1200 300 Z"/>
    ${rocks([64, 96, 300, 336, -40, 20, 420, 470], 248, 'bd-mid', 951)}
    ${reeds(112, 242, 26, 'bd-near', 952)}${reeds(292, 242, 24, 'bd-near', 953)}
    ${reeds(58, 244, 30, 'bd-near', 954)}${reeds(346, 244, 30, 'bd-near', 955)}
    ${reeds(250, 226, 12, 'bd-mid', 956)}${reeds(132, 227, 12, 'bd-mid', 957)}
    ${rocks([-60, 10, 400, 452], 271, 'bd-near', 958, 1.9)}`;
}

/** 밤에 여울을 건너는 행렬: 등불 하나, 사람들, 낙타, 양. 왼쪽 물가에서 징검돌을 따라 맞은편으로 */
function crossing(): string {
  const r = rng(961);
  const walkers: string[] = [];
  const kinds = ['lamp', 'man', 'woman', 'child', 'camel', 'woman', 'child', 'sheep', 'sheep', 'man', 'camel', 'woman', 'sheep', 'child', 'man'];
  kinds.forEach((k, i) => {
    const d = (i * 1.15 + r() * 0.4).toFixed(2);
    let body = '';
    if (k === 'camel') body = '<path d="M-7 0 L-6 -6 C-8 -7 -9 -9 -8 -10 C-5 -11 -3 -9 -2 -10 C0 -13 3 -13 4 -10 C5 -9 6 -10 7 -12 L9 -13 L9 -11 L8 -9 L7 -6 L7 0 L6 0 L5.4 -5 L-4.6 -5 L-5.4 0 Z"/>';
    else if (k === 'sheep') body = '<ellipse cx="0" cy="-2" rx="3" ry="2"/><circle cx="3" cy="-3" r="1"/>';
    else {
      const h = k === 'child' ? 7 : 10.5;
      const w = k === 'woman' ? 2.6 : 2.1;
      body = `<circle cx="0" cy="${-h}" r="${(h * 0.12).toFixed(1)}"/><path d="M${-w * 0.5} ${-h + 1.4} L${w * 0.5} ${-h + 1.4} L${w} 0 L${-w} 0 Z"/>`;
      if (k === 'lamp') body += `<circle class="jab-lamp" cx="2.6" cy="${-h + 4}" r="1.1"/><circle class="jab-lamp__glow" cx="2.6" cy="${-h + 4}" r="6"/>`;
    }
    walkers.push(`<g class="jab-walker" style="--d:${d}s">${body}</g>`);
  });
  return `<g class="jab-crossing">${walkers.join('')}</g>`;
}

export function jabbokArt(kind: 'night' | 'cross' | 'grey' | 'sun'): string {
  const glow = kind === 'grey' ? 'grey' : kind === 'sun' ? 'sun' : 'none';
  // 폰에서 여울이 인물 발치에 가리지 않게, 골짜기·시내는 조금 위로 올리고 가까운 물가를 넓게 깐다
  return `${glow !== 'none' ? dawn(glow) : ''}${stars(971)}
    <g transform="translate(0 -20)">
      <g class="jab-dim">${gorge()}${river(glow)}</g>
      ${kind === 'cross' ? crossing() : ''}
    </g>
    <g class="jab-dim" transform="translate(0 -9)">${nearBank()}</g>`;
}

// ── 세일 들 (창 33) ──

/** 사백 인: 먼 마루를 따라 늘어선 작은 사람들. 창끝이 반짝인다. 몇은 낙타를 탔다 */
function host(near: boolean): string {
  const r = rng(981);
  const men: string[] = [];
  const k = near ? 1.7 : 1;
  for (let i = 0; i < 90; i++) {
    const x = (near ? 40 : 120) + i * 2.6 * (near ? 3.6 : 1) + (r() - 0.5) * 3 * k + (i % 3) * 0.6 * k;
    const y = (near ? 222 : 206) + (i % 3) * 1.6 * k + r() * 0.8;
    const h = (5 + r() * 1.4 + (i % 3) * 0.5) * k;
    const spear = r() < 0.55;
    const camel = r() < 0.05;
    let fig = camel
      ? `<path d="M${x - 4} ${y} L${x - 3.4} ${y - 3.6} C${x - 4.6} ${y - 4.2} ${x - 5} ${y - 5.4} ${x - 4.4} ${y - 6} C${x - 2.8} ${y - 6.6} ${x - 1.8} ${y - 5.4} ${x - 1} ${y - 6.2} L${x - 0.6} ${y - 9.6} L${x + 0.6} ${y - 9.6} L${x + 0.8} ${y - 6.4} C${x + 2} ${y - 7.4} ${x + 3} ${y - 7} ${x + 4} ${y - 7.6} L${x + 4.6} ${y - 6.2} L${x + 4} ${y - 3.6} L${x + 4} ${y} L${x + 3.4} ${y} L${x + 3} ${y - 3} L${x - 2.6} ${y - 3} L${x - 3.2} ${y} Z"/>`
      : `<circle cx="${x.toFixed(1)}" cy="${(y - h).toFixed(1)}" r="${(h * 0.14).toFixed(2)}"/><path d="M${(x - 0.8).toFixed(1)} ${(y - h + 1).toFixed(1)} L${(x + 0.8).toFixed(1)} ${(y - h + 1).toFixed(1)} L${(x + 1.3).toFixed(1)} ${y.toFixed(1)} L${(x - 1.3).toFixed(1)} ${y.toFixed(1)} Z"/>`;
    if (spear) fig += `<path class="jab-spear" d="M${(x + 1.4).toFixed(1)} ${(y - 0.6).toFixed(1)} L${(x + 2.2).toFixed(1)} ${(y - h - 4).toFixed(1)}"/><circle class="jab-tip" style="--d:${(r() * 4).toFixed(2)}s" cx="${(x + 2.2).toFixed(1)}" cy="${(y - h - 4.2).toFixed(1)}" r="0.55"/>`;
    men.push(fig);
  }
  return `<g class="jab-host${near ? ' is-near' : ''}">
    <ellipse class="jab-dust" cx="${near ? 200 : 236}" cy="${near ? 214 : 200}" rx="${near ? 260 : 150}" ry="${near ? 20 : 14}"/>
    <ellipse class="jab-dust jab-dust--b" cx="200" cy="${near ? 220 : 204}" rx="${near ? 200 : 110}" ry="9"/>
    <g class="bd-far jab-host__men">${men.join('')}</g>
  </g>`;
}

/** 넓은 들과 굽은 길. host = 사백 인이 먼 마루에 (far) / 가까운 비탈까지 와 있다 (near) */
export function seirArt(withHost: false | 'far' | 'near'): string {
  return `
    <circle class="bd-halo" cx="110" cy="150" r="140"/>
    ${hills(196, 'bd-far', 991)}
    <path class="bd-far" d="M-800 260 L-800 210 C-500 206 -200 214 60 208 C160 206 240 212 330 208 C600 204 900 212 1200 208 L1200 260 Z"/>
    ${withHost === 'far' ? host(false) : ''}
    <path class="bd-mid" d="M-800 260 L-800 230 C-500 226 -200 234 40 230 C140 228 260 234 400 230 C700 226 900 232 1200 230 L1200 260 Z"/>
    ${withHost === 'near' ? host(true) : ''}
    <path class="jab-road" d="M226 210 C218 216 206 222 200 228 C190 238 170 248 150 262 L262 262 C246 248 232 238 226 228 C222 222 224 216 228 210 Z"/>
    ${rocks([70, 104, 312, 344, -30, 450], 244, 'bd-mid', 993)}
    ${thorns(96, 250, 16, 'bd-near', 994)}${thorns(318, 252, 14, 'bd-near', 995)}
    ${rocks([-40, 30, 400, 450], 262, 'bd-near', 996, 1.8)}`;
}
