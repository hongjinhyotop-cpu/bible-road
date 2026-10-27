// 마므레의 세 손님 (창 18, A급 gen-18-visitors). 배경 그림 'mamre' · 'mamre-meal' · 'mamre-door*' · 'sodom-view'.
// 같은 종이 오려낸 그림자극 말투.
//  - mamre       : 오정(한낮)의 마므레 상수리 수풀. 왼쪽에 염소털 큰 장막(문에 밝은 휘장 — 그 뒤에 사라의 그림자가 작게),
//                  오른쪽에 큰 상수리나무, 하늘 높이 흰 해, 지평선의 아지랑이 (18:1)
//  - mamre-meal  : 같은 곳 + 나무 그늘 아래 깐 자리 위의 떡·버터와 우유 그릇·송아지 요리, 김이 오름 (18:8)
//  - mamre-door  : 장막 문 가까이. 햇빛이 뒤에서 비치는 휘장에 사라의 그림자 — 귀를 기울이고 있다 (18:10)
//    mamre-laugh : 같은 그림자가 손으로 입을 가리고 어깨를 들썩인다 (18:12 "속으로 웃고")
//    mamre-start : 같은 그림자가 움찔 물러선다 (18:13-15 "사라가 왜 웃으며" → "두려워서")
//  - sodom-view  : 헤브론 동쪽 산마루 길. 발아래 멀리 깊이 꺼진 요단 들과 사해, 아지랑이 속 작은 성들 (18:16)
// 폰(세로 화면)에서는 x 100~300만 보인다 → 장막 문은 x 120~170, 큰 나무는 x 260~320에 둔다.
import { H, rng, hills, tree, treeline, city, smoke } from './backdrop';

const G = 238;

/** 한낮의 해와 지평선의 아지랑이 */
function noonSky(): string {
  const waves = [0, 1, 2]
    .map((i) => `<path class="mam-heat" style="--d:${(i * 1.7).toFixed(1)}s" d="M-400 ${206 + i * 5} Q-300 ${203 + i * 5} -200 ${206 + i * 5} T0 ${206 + i * 5} T200 ${206 + i * 5} T400 ${206 + i * 5} T600 ${206 + i * 5} T800 ${206 + i * 5}"/>`)
    .join('');
  return `<circle class="mam-sun__halo" cx="250" cy="22" r="70"/><circle class="mam-sun" cx="250" cy="22" r="9"/>
    <g class="mam-far">${hills(204, 'bd-far', 1801)}${treeline(210, 10, 'bd-far', 1802)}</g>${waves}`;
}

/** 휘장 뒤 사라의 그림자: 너울 쓴 옆모습 (오른쪽, 손님들 쪽을 향함). state에 따라 손과 몸이 바뀐다 */
function sarahShadow(state: 'listen' | 'laugh' | 'start'): string {
  // 좌표: 발 (0,0), 키 약 100. 앞은 +x
  const arm =
    state === 'laugh'
      ? // 손으로 입을 가림
        '<path d="M2 -60 C8 -62 12 -66 14 -72 C15 -76 18 -79 21 -78 C23 -77 23 -74 21 -71 C18 -66 14 -60 8 -55 Z"/>'
      : state === 'start'
        ? // 손이 가슴께로 내려옴 (놀람)
          '<path d="M2 -60 C8 -58 12 -54 13 -48 C14 -45 13 -42 10 -42 C8 -43 8 -46 7 -50 C6 -53 4 -55 1 -56 Z"/>'
        : // 귀 쪽으로 손을 대고 휘장 틈에 기댐
          '<path d="M2 -60 C6 -66 9 -74 10 -82 C11 -86 14 -88 16 -86 C17 -84 16 -81 14 -79 C12 -72 9 -64 6 -56 Z"/>';
  const lean = state === 'start' ? 'rotate(-5)' : state === 'laugh' ? 'rotate(3)' : 'rotate(6)';
  return `<g class="mam-shadow mam-shadow--${state}">
    <g transform="${lean}">
      <g class="mam-shadow__body">
        <!-- 너울: 머리에서 등 뒤로 길게 -->
        <path d="M-2 -100 C-10 -100 -15 -94 -16 -86 C-18 -70 -20 -46 -22 -20 C-23 -10 -24 -4 -24 0 L16 0 C14 -10 12 -24 10 -40 C9 -52 10 -60 8 -66 C10 -70 12 -74 12 -80 C12 -84 13 -86 14 -88 C12 -96 6 -100 -2 -100 Z"/>
        <!-- 얼굴 옆선 (너울 앞으로 살짝) -->
        <path d="M8 -92 C12 -90 13 -86 14 -84 L16.4 -82 L14 -81 L14.6 -79 L13.6 -78 C13.8 -76 13 -75 11 -74 L8 -73 Z"/>
        ${arm}
      </g>
    </g>
  </g>`;
}

/** 염소털 큰 장막: 길고 낮은 지붕, 앞이 트인 문, 밝은 아마 휘장. 휘장 뒤에 사라의 그림자 */
function bigTent(x: number, ground: number, s: number, shadow: 'listen' | 'laugh' | 'start' | null): string {
  return `<g transform="translate(${x} ${ground}) scale(${s})">
    <g class="bd-mid">
      <path d="M-70 0 L-66 -30 L-40 -44 L-14 -38 L10 -48 L40 -40 L62 -30 L68 0 Z"/>
      <path class="mam-seam" d="M-50 -38 L-52 0 M-26 -41 L-27 0 M44 -38 L46 0" fill="none"/>
      <path d="M-78 2 L-66 -30 M76 2 L62 -30 M10 -48 L10 -54" fill="none" stroke="currentColor" stroke-width="0.9"/>
    </g>
    <!-- 문: 걷어 올린 자락 아래 아마 휘장이 빛을 받는다 -->
    <path class="mam-curtain" d="M8 0 L9 -36 C14 -38 22 -38 28 -36 L29 0 Z"/>
    ${shadow ? `<g class="mam-shadow-small" transform="translate(19 0) scale(0.31)">${sarahShadow(shadow)}</g>` : ''}
    <path class="bd-mid" d="M6 -36 C12 -42 24 -42 31 -36 L33 -32 C24 -36 14 -36 4 -32 Z"/>
    <path class="mam-curtain__fold" d="M14 -34 Q13 -16 14 0 M22 -35 Q23 -18 22 0" fill="none"/>
  </g>`;
}

/** 나무 그늘 아래 차린 음식 (18:8): 깐 자리, 떡, 버터와 우유 그릇, 송아지 요리. 김이 오른다 */
function meal(x: number, ground: number): string {
  return `<g class="mam-meal" transform="translate(${x} ${ground})">
    <ellipse class="mam-mat" cx="0" cy="0" rx="34" ry="5"/>
    <path class="mam-mat__edge" d="M-34 0 Q0 6 34 0" fill="none"/>
    <g class="mam-food">
      <ellipse cx="-20" cy="-1.6" rx="6" ry="1.8"/><ellipse cx="-18" cy="-3.2" rx="5.4" ry="1.6"/><ellipse cx="-21" cy="-4.6" rx="4.8" ry="1.4"/>
      <path d="M-8 -1 C-8 -5 -4 -6 0 -6 C4 -6 8 -5 8 -1 Z"/>
      <path d="M10 -1 C10 -4 12 -5.6 15 -5.6 C18 -5.6 20 -4 20 -1 Z"/>
      <path d="M22 -1 C22 -7 26 -9 30 -9 C33 -9 34 -6 33 -1 Z"/>
    </g>
    <ellipse class="mam-milk" cx="15" cy="-5.4" rx="4" ry="0.8"/>
    <g class="mam-steam">
      <path style="--d:0s" d="M-1 -7 C-3 -11 1 -13 -1 -18"/>
      <path style="--d:1.3s" d="M3 -7 C5 -12 1 -14 3 -19"/>
      <path style="--d:0.6s" d="M27 -10 C25 -14 29 -16 27 -21"/>
    </g>
  </g>`;
}

function grove(meal_: boolean, shadow: 'listen' | null): string {
  return `
    ${noonSky()}
    ${tree(30, 214, 60, 'bd-far', 1803)}${tree(-90, 216, 70, 'bd-far', 1804)}${tree(470, 214, 64, 'bd-far', 1805)}
    <path class="bd-mid" d="M-800 ${H} L-800 228 C-500 224 -200 232 40 228 C160 226 260 232 380 229 C600 224 900 232 1200 228 L1200 ${H} Z"/>
    ${bigTent(126, 236, 1.05, shadow)}
    ${tree(292, 246, 178, 'bd-near', 1806, { lean: -0.12, sway: true })}
    <ellipse class="mam-shade" cx="282" cy="247" rx="70" ry="6"/>
    ${meal_ ? meal(262, 246) : ''}
    <path class="bd-near" d="M-800 ${H} L-800 246 C-500 244 -200 250 60 248 C200 247 320 252 460 248 C700 244 1000 250 1200 248 L1200 ${H} Z"/>
    ${tree(-180, 262, 200, 'bd-near', 1807, { lean: 0.15, sway: true })}${tree(560, 262, 190, 'bd-near', 1808, { lean: -0.15, sway: true })}`;
}

/** 장막 문 가까이: 염소털 벽이 화면을 채우고, 가운데 문의 휘장에 사라의 그림자 */
function doorClose(state: 'listen' | 'laugh' | 'start'): string {
  const r = rng(1811);
  const stripes = Array.from({ length: 16 }, (_, i) => {
    const x = -400 + i * 75 + r() * 10;
    return `M${x} 0 L${x - 6} ${H}`;
  }).join(' ');
  return `
    <path class="mam-wall" d="M-800 ${H} L-800 30 C-400 20 0 34 200 26 C400 18 800 30 1200 24 L1200 ${H} Z"/>
    <path class="mam-seam mam-seam--big" d="${stripes}" fill="none"/>
    <path class="mam-ropes" d="M-800 30 L-900 -40 M1200 24 L1300 -40" fill="none"/>
    <!-- 문 휘장: 뒤(장막 안쪽 뒷문)에서 한낮 햇빛을 받아 따뜻하게 빛난다 -->
    <path class="mam-curtain mam-curtain--big" d="M132 ${G + 12} L134 52 C160 44 240 44 266 52 L268 ${G + 12} Z"/>
    <g class="mam-curtain__glow"><ellipse cx="200" cy="150" rx="60" ry="80"/></g>
    <path class="mam-curtain__fold" d="M152 52 Q148 150 152 ${G + 12} M178 48 Q182 150 176 ${G + 12} M224 48 Q220 150 226 ${G + 12} M250 52 Q254 150 248 ${G + 12}" fill="none"/>
    <g transform="translate(196 ${G + 10}) scale(1.62)">${sarahShadow(state)}</g>
    <!-- 걷어 올린 위 자락과 문기둥 -->
    <path class="mam-wall" d="M120 60 C150 40 250 40 280 60 L284 42 C250 28 150 28 116 42 Z"/>
    <path class="mam-pole" d="M128 ${H} L131 34 L136 34 L135 ${H} Z M264 ${H} L265 34 L270 34 L271 ${H} Z"/>
    <path class="bd-near" d="M-800 ${H} L-800 ${G + 12} C-300 ${G + 10} 100 ${G + 14} 200 ${G + 12} C400 ${G + 10} 800 ${G + 14} 1200 ${G + 12} L1200 ${H} Z"/>`;
}

/** 헤브론 동쪽 산마루: 발아래 멀리 깊이 꺼진 요단 들, 사해의 흐린 물빛, 아지랑이 속 작은 성들 */
function sodomView(): string {
  const r = rng(1821);
  return `
    <g class="mam-plain">
      <path class="bd-far" d="M-800 ${H} L-800 168 C-400 164 0 170 200 166 C400 162 800 170 1200 166 L1200 ${H} Z"/>
      <path class="mam-sea" d="M-200 192 C0 186 140 190 260 186 C380 182 520 190 700 188 L700 198 C500 200 300 196 100 200 C-60 202 -160 200 -200 198 Z"/>
      ${city(150, 194, 1822, 0.55)}${city(236, 192, 1823, 0.5)}${city(-60, 194, 1824, 0.5)}
      ${smoke(150, 176, 1825, 3)}${smoke(236, 175, 1826, 3)}
      <path class="mam-haze" d="M-800 200 C-300 190 300 196 1200 190 L1200 214 L-800 214 Z"/>
    </g>
    <path class="bd-mid" d="M-800 ${H} L-800 206 C-500 204 -300 214 -60 216 C60 218 120 226 200 228 C280 230 360 222 460 214 C700 206 1000 210 1200 208 L1200 ${H} Z"/>
    <path class="mam-road" d="M-40 ${H} C40 248 120 240 180 236 C230 233 270 228 330 222 C380 217 440 214 520 212"/>
    <g class="bd-mid">${Array.from({ length: 9 }, () => {
      const x = 60 + r() * 300;
      const y = 232 + r() * 10;
      return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(3 + r() * 6).toFixed(1)}" ry="${(1.6 + r() * 2).toFixed(1)}"/>`;
    }).join('')}</g>
    <path class="bd-near" d="M-800 ${H} L-800 244 C-500 242 -200 250 40 248 C200 247 320 252 460 248 C700 244 1000 250 1200 246 L1200 ${H} Z"/>
    ${tree(70, 250, 90, 'bd-near', 1827, { lean: 0.1, sway: true })}`;
}

export function mamreArt(kind: 'grove' | 'meal' | 'door' | 'laugh' | 'start' | 'sodom'): string {
  switch (kind) {
    case 'grove':
      return grove(false, 'listen');
    case 'meal':
      return grove(true, 'listen');
    case 'door':
      return doorClose('listen');
    case 'laugh':
      return doorClose('laugh');
    case 'start':
      return doorClose('start');
    case 'sodom':
      return sodomView();
  }
}

