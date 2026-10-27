// 신 광야의 만나 (출 16, A급 exo-16-manna 「이것이 무엇이냐」). 배경 그림 'sin-*' + 효과 'quail' · 'stink'.
// 같은 종이 오려낸 그림자극 말투: 엘림과 시내산 사이의 넓고 평평한 모래 광야, 멀리 낮게 누운 남쪽 산줄기,
// 그 앞에 끝없이 흩어진 이스라엘의 장막들.
//  - camp  : 신 광야의 진 (출 16:1). 아무것도 없는 맨땅
//  - glory : 광야 쪽 하늘에 구름이 서고, 그 속에서 금빛이 숨 쉬듯 밝아졌다 잦아든다 (16:10). 하나님은 그리지 않는다
//  - quail : 진 여기저기 내려앉은 메추라기들. 몇 마리는 고개를 까딱인다 (16:13)
//  - dew   : 새벽, 진 사면에 낮게 깔린 이슬 안개 (16:13)
//  - manna : 이슬이 마른 뒤 땅을 덮은 작고 둥근, 서리 같은 것. 몇 알이 반짝인다 (16:14)
//  - melt  : 해가 뜨겁게 쪼이자 서리 같은 것이 천천히 스러진다 (16:21). 아지랑이
// 폰(세로 화면)에서는 x 110~290만 보인다 → 구름·장막·만나는 그 안에도 충분히. 무대 땅(land)은 깔지 않고 여기서 그린다.
import gsap from 'gsap';
import { H, W, rng, thorns } from './backdrop';

export type SinState = 'camp' | 'glory' | 'quail' | 'dew' | 'manna' | 'melt';

const GROUND = 238;

/** 멀리 낮게 누운 산줄기와 평평한 바위산 몇 개 */
function farRange(): string {
  return `
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 206 L-520 198 L-430 204 L-340 192 L-250 200 L-160 194 L-70 202 L10 196 L70 200 L120 192 L150 186 L178 190 L214 182 L240 188 L270 184 L300 194 L350 190 L420 198 L520 192 L640 200 L760 194 L${W * 3} 200 L${W * 3} ${H} Z"/>
    <path class="bd-ridge" d="M150 186 L160 198 M214 182 L222 196 M270 184 L276 196 M-340 192 L-332 202 M520 192 L528 202"/>
    <path class="bd-far" d="M${-W * 2} ${H} L${-W * 2} 214 C-500 210 -200 216 60 212 C180 210 300 214 420 211 C600 208 800 214 ${W * 3} 212 L${W * 3} ${H} Z" opacity="0.95"/>`;
}

/** 작은 장막 하나 (멀리 있는 진). s = 크기 */
function hut(x: number, y: number, s: number, lit: boolean): string {
  return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})">
    <path d="M-9 0 L-6 -5 L0 -8 L6 -5 L9 0 Z"/>${lit ? '<path class="sin-door" d="M-1.4 0 L0 -5 L1.4 0 Z"/>' : ''}
  </g>`;
}

/** 이스라엘의 진: 가운데 띠를 따라 겹겹이 흩어진 장막들 (멀수록 작고 흐리다) */
function camp(night: boolean): string {
  const r = rng(1601);
  const rows: [number, number, string][] = [
    [216, 0.7, 'bd-far'],
    [222, 0.95, 'bd-mid'],
    [229, 1.25, 'bd-mid'],
  ];
  return rows
    .map(([y, s, cls], ri) => {
      const out: string[] = [];
      for (let x = -W * 2; x < W * 3; x += 14 + r() * 22 / s) {
        // 무대 가운데 앞줄은 비워 둔다 (인물이 서는 자리)
        if (ri === 2 && x > 150 && x < 250) continue;
        if (r() < 0.25) continue;
        out.push(hut(x, y + (r() - 0.5) * 3, s * (0.85 + r() * 0.35), night && r() < 0.4));
      }
      return `<g class="${cls} sin-camp">${out.join('')}</g>`;
    })
    .join('');
}

/** 앞쪽 땅: 완만한 모래 마루 + 마른 덤불 + 돌 */
function nearGround(): string {
  return `
    <path class="bd-mid" d="M${-W * 2} ${H} L${-W * 2} 232 C-500 229 -200 234 40 231 C140 229 260 233 360 230 C520 228 700 233 ${W * 3} 231 L${W * 3} ${H} Z"/>
    <path class="bd-near" d="M${-W * 2} ${H} L${-W * 2} 242 C-500 238 -260 244 0 ${GROUND + 2} C120 ${GROUND} 280 ${GROUND + 3} 400 ${GROUND} C560 236 760 242 ${W * 3} 240 L${W * 3} ${H} Z"/>
    ${thorns(96, 252, 13, 'bd-near', 1611)}${thorns(318, 254, 15, 'bd-near', 1612)}${thorns(-90, 248, 20, 'bd-near', 1613)}${thorns(500, 250, 18, 'bd-near', 1614)}
    <g class="bd-near"><ellipse cx="128" cy="257" rx="7" ry="2.6"/><ellipse cx="292" cy="258" rx="9" ry="3"/><ellipse cx="-40" cy="254" rx="10" ry="3"/><ellipse cx="450" cy="256" rx="8" ry="2.6"/></g>`;
}

/**
 * 구름 속의 영광 (16:10 "그들이 광야를 바라보니 여호와의 영광이 구름 속에 나타나더라").
 * 광야 쪽 하늘에 선 큰 구름. 속에서 금빛이 숨 쉬듯 밝아지고, 가장자리만 금테가 빛난다. 아래로 옅은 빛줄기.
 */
function gloryCloud(): string {
  const cx = 206;
  const cy = 66;
  const r = rng(1621);
  // 위쪽은 뭉게뭉게 솟고, 아래는 평평하게 처진 구름 한 덩이
  const puffs = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    const px = cx - 92 + t * 184 + (r() - 0.5) * 8;
    const lift = Math.sin(t * Math.PI);
    const rad = 14 + lift * 16 + r() * 5;
    return `<circle cx="${px.toFixed(1)}" cy="${(cy + 6 - lift * 14).toFixed(1)}" r="${rad.toFixed(1)}"/>`;
  }).join('');
  const mass = `<ellipse cx="${cx}" cy="${cy + 14}" rx="104" ry="18"/>${puffs}`;
  return `<g class="sin-glory">
    <path class="sin-glory__shaft" d="M${cx - 50} ${cy + 24} L${cx - 130} ${GROUND - 16} L${cx + 130} ${GROUND - 16} L${cx + 50} ${cy + 24} Z"/>
    <ellipse class="sin-glory__halo" cx="${cx}" cy="${cy + 2}" rx="140" ry="64"/>
    <g class="sin-glory__rim">${mass}</g>
    <g class="sin-glory__cloud">${mass}</g>
    <ellipse class="sin-glory__core" cx="${cx}" cy="${cy + 4}" rx="58" ry="20"/>
  </g>`;
}

/** 메추라기 한 마리 (앉은 옆모습): 통통한 몸, 작은 머리, 짧은 꼬리. bob이면 고개를 까딱인다 */
function quail(x: number, y: number, s: number, flip: boolean, bob: boolean, d: number): string {
  const f = flip ? -1 : 1;
  return `<g class="sin-quail" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(f * s).toFixed(2)} ${s.toFixed(2)})">
    <path d="M-6 0 C-7 -3 -4 -5.4 0 -5.4 C3 -5.4 5 -4 5.6 -2 L5.6 0 Z"/>
    <path d="M-6 -2 L-8.6 -3.6 L-6.6 -0.6 Z"/>
    <g class="${bob ? 'sin-quail__head' : ''}" style="--d:${d.toFixed(2)}s"><circle cx="4.6" cy="-6.2" r="2.1"/><path d="M6.4 -6.6 L8 -6 L6.4 -5.6 Z"/></g>
    <path class="sin-quail__belly" d="M-3 -1.4 Q1 -0.4 4.6 -2" fill="none"/>
  </g>`;
}

function quails(): string {
  const r = rng(1631);
  const out: string[] = [];
  // 멀리 장막 사이 (작게) + 앞쪽 땅 (크게). 무대 가운데 바로 앞은 조금 비운다
  for (let i = 0; i < 96; i++) {
    const near = i % 3 === 0;
    // 폰에서 보이는 가운데 띠(x 100~300)에 절반쯤 모은다
    const x = i % 2 ? 100 + r() * 200 : -W * 1.5 + r() * W * 4;
    if (near && x > 172 && x < 228) continue;
    const y = near ? 244 + r() * 14 : 222 + r() * 14;
    const s = near ? 1.5 + r() * 0.6 : 0.6 + (y - 222) * 0.05;
    out.push(quail(x, y, s, r() < 0.5, r() < 0.45, r() * 5));
  }
  return `<g class="bd-near sin-quails">${out.join('')}</g>`;
}

/** 이슬: 진 사면에 낮게 깔린 하얀 안개 (16:13) */
function dew(): string {
  const r = rng(1641);
  const puffs = Array.from({ length: 22 }, (_, i) => {
    const x = -W * 1.5 + (i / 22) * W * 4 + r() * 40;
    return `<ellipse style="--d:${(r() * 8).toFixed(2)}s" cx="${x.toFixed(1)}" cy="${(230 + r() * 14).toFixed(1)}" rx="${(60 + r() * 50).toFixed(1)}" ry="${(6 + r() * 5).toFixed(1)}"/>`;
  }).join('');
  return `<g class="sin-dew">${puffs}</g>`;
}

/**
 * 만나: 땅을 덮은 작고 둥근, 서리같이 가는 것 (16:14). 앞쪽은 굵고 성기게, 멀수록 잘고 촘촘하게.
 * 몇 알(--tw)만 별처럼 반짝인다. melt면 해가 뜨거워지며 천천히 스러진다 (16:21).
 */
function flakes(): string {
  const r = rng(1651);
  const out: string[] = [];
  const glints: string[] = [];
  // 띠별로: [y 위, y 아래, 개수, 크기]
  const bands: [number, number, number, number][] = [
    [221, 231, 520, 0.5],
    [231, 240, 460, 0.75],
    [240, 250, 380, 1.05],
    [250, 262, 300, 1.4],
  ];
  for (const [y0, y1, n, s] of bands) {
    for (let i = 0; i < n; i++) {
      const x = -W * 1.6 + r() * W * 4.2;
      const y = y0 + r() * (y1 - y0);
      const rx = (0.7 + r() * 0.6) * s;
      out.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx.toFixed(2)}" ry="${(rx * 0.62).toFixed(2)}"/>`);
      if (r() < 0.035 && x > -200 && x < 600) {
        glints.push(`<path class="sin-glint" style="--d:${(r() * 6).toFixed(2)}s; --t:${(2.6 + r() * 3).toFixed(2)}s" transform="translate(${x.toFixed(1)} ${(y - 0.4).toFixed(1)}) scale(${(s * 0.7).toFixed(2)})" d="M0 -3.4 L0.6 -0.6 L3.4 0 L0.6 0.6 L0 3.4 L-0.6 0.6 L-3.4 0 L-0.6 -0.6 Z"/>`);
      }
    }
  }
  return `<g class="sin-manna"><g class="sin-flakes">${out.join('')}</g><g class="sin-glints">${glints.join('')}</g></g>`;
}

/** 한낮의 뜨거운 해와 아지랑이 (16:21 "해가 뜨겁게 쪼이면 그것이 스러졌더라") */
function noonSun(): string {
  return `<g class="sin-noon">
    <circle class="sin-sun__halo" cx="268" cy="78" r="34"/>
    <circle class="sin-sun" cx="268" cy="78" r="8.5"/>
  </g>
  <g class="sin-haze">${[226, 234, 242].map((y, i) => `<path style="--d:${i * 0.9}s" d="M${-W * 2} ${y} ${Array.from({ length: 60 }, () => 'q10 -1.6 20 0 t20 0').join(' ')}"/>`).join('')}</g>`;
}

export function sinArt(state: SinState): string {
  const night = state === 'camp' || state === 'quail' || state === 'glory';
  return `
    ${farRange()}
    ${state === 'glory' ? gloryCloud() : ''}
    ${state === 'melt' ? noonSun() : ''}
    ${camp(night)}
    ${nearGround()}
    ${state === 'dew' ? dew() : ''}
    ${state === 'manna' || state === 'melt' ? flakes() : ''}
    ${state === 'quail' ? quails() : ''}`;
}

/** 날아가는 메추라기 한 마리 (날개 퍼덕임은 CSS) */
const FLYER = `<svg viewBox="-12 -10 24 16" aria-hidden="true"><path d="M-7 0 C-8 -3 -4 -5 0 -5 C3 -5 6 -3.6 7 -1.6 L9.6 -2.2 L7.6 0.4 C5 2 -3 2.4 -7 0 Z"/><path d="M-9.6 -2 L-7 -0.6 L-9.6 1 Z"/><path class="fx-quail__wing" d="M-3 -3 C-7 -13 5 -14 5 -4 Z"/></svg>`;

/**
 * 효과 quail (16:13 "저녁에는 메추라기가 와서 진에 덮이고"): 작은 새 떼가 한쪽에서 낮게 몰려와 무대를 휩쓸고,
 * 절반쯤은 땅으로 내려앉아 멈춘다 (나머지는 지나감). 약 11초 뒤 흐려지며 사라진다 — 그 뒤는 배경 'sin-quail'이 이어받는다.
 */
export function playQuail(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-quail';
  scene.append(layer);
  const { width: w, height: h } = scene.getBoundingClientRect();
  const n = rm ? 0 : w < 600 ? 54 : 90;
  for (let i = 0; i < n; i++) {
    const b = document.createElement('i');
    b.innerHTML = FLYER;
    const size = (w < 600 ? 20 : 24) + Math.random() * 14;
    b.style.width = `${size}px`;
    layer.append(b);
    const y0 = h * (0.22 + Math.random() * 0.36);
    const settle = Math.random() < 0.55;
    const delay = Math.random() * 3.2;
    const dur = 2.6 + Math.random() * 1.6;
    gsap.set(b, { x: w + 30 + Math.random() * 80, y: y0, scaleX: 1 });
    // 오른쪽에서 낮게 몰려와 왼쪽으로. 위아래로 출렁이며
    const tl = gsap.timeline({ delay });
    if (settle) {
      const gx = w * (0.04 + Math.random() * 0.92);
      const gy = h * (0.8 + Math.random() * 0.13);
      tl.to(b, { x: gx, duration: dur, ease: 'sine.out' })
        .to(b, { y: gy, duration: dur, ease: 'power2.in' }, 0)
        .add(() => b.classList.add('is-down'))
        .to(b, { y: gy - 3, scale: 0.75, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.out' })
        // 내려앉은 새는 잠시 뒤 땅빛에 섞여 든다 (그다음은 배경 sin-quail의 새들이 이어받음)
        .to(b, { opacity: 0, duration: 1.6, delay: 2 + Math.random() * 2 });
    } else {
      tl.to(b, { x: -60, duration: dur * 1.2, ease: 'none' }).to(b, { y: y0 + (Math.random() - 0.5) * h * 0.16, duration: dur * 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);
    }
  }
  const life = rm ? 1200 : 11000;
  setTimeout(() => layer.classList.add('is-out'), life - 1400);
  setTimeout(() => layer.remove(), life);
}

/**
 * 효과 stink (16:20 "벌레가 생기고 냄새가 난지라"): 말하는 사람(없으면 무대 오른쪽 사람) 곁에서 옅은 잿빛 김이
 * 구불구불 피어오르고, 작은 날벌레 두엇이 맴돈다. 가볍게, 징그럽지 않게. 약 6초.
 */
export function playStink(scene: HTMLElement, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = 'fx-stink';
  layer.innerHTML = `<svg viewBox="0 0 40 60" aria-hidden="true">
      <path class="fx-stink__wisp" style="--d:0s" d="M14 58 C8 48 20 42 14 32 C8 22 20 16 14 4"/>
      <path class="fx-stink__wisp" style="--d:0.7s" d="M22 58 C28 48 16 40 22 30 C28 20 18 14 24 2"/>
      <path class="fx-stink__wisp" style="--d:1.4s" d="M30 58 C24 50 34 42 28 34 C22 26 32 20 28 10"/>
    </svg><b></b><b></b>`;
  scene.append(layer);
  // 말하는 사람이 정해진 뒤에 자리를 잡는다 (동작이 먼저 끝나야 해서 잠깐 기다림)
  const place = () => {
    const actors = [...scene.querySelectorAll<HTMLElement>('.actor')];
    const who = scene.querySelector<HTMLElement>('.actor.is-speaking') ?? actors.sort((a, b) => b.getBoundingClientRect().left - a.getBoundingClientRect().left)[0];
    const box = scene.getBoundingClientRect();
    const art = who?.querySelector<HTMLElement>('.actor__art') ?? who;
    if (art) {
      const a = art.getBoundingClientRect();
      layer.style.left = `${a.left - box.left + a.width * 0.62}px`;
      layer.style.top = `${a.top - box.top + a.height * 0.18}px`;
    }
    layer.classList.add('is-on');
  };
  setTimeout(place, rm ? 0 : 700);
  const life = rm ? 2000 : 6500;
  setTimeout(() => layer.classList.add('is-out'), life - 1200);
  setTimeout(() => layer.remove(), life);
}
