// 애굽의 재앙들 (출 7–10, A급 exo-7-plagues). 다른 에피소드에서도 쓰는 효과 라이브러리.
//  - fx "frogs"   : 작은 개구리 실루엣들이 무대 아래를 폴짝폴짝 가로지름 (출 8:6)
//  - fx "gnats"   : 땅의 티끌이 일어나 아주 작은 점들이 낮게 떼 지어 일렁임 (출 8:17 이)
//  - fx "flies"   : 큰 점들이 몇 무리로 윙윙 맴돌며 화면을 채움 (출 8:24 파리 떼)
//  - fx "ash"     : 무대 가운데서 재가 하늘로 흩날려 퍼졌다가 천천히 내려앉음 (출 9:10 풀무의 재 → 독종)
//  - fx "hail"    : 비스듬히 쏟아지는 얼음 줄기 + 불덩이 줄기, 땅에 닿으면 불빛이 번졌다 꺼짐 (출 9:23-24)
//  - fx "locusts" : 빽빽한 메뚜기 떼 구름이 한쪽에서 몰려와 하늘을 덮고(땅이 어두워짐) 지나감 (출 10:13-15)
// 피로 변한 나일(mood nile-blood)과 흑암(mood darkness)은 장면이 이어지는 동안 남아야 해서 배경(fx/nile.ts, goshenDarkArt)으로 만든다.
// 개구리는 SVG + GSAP, 나머지는 캔버스 하나에 가벼운 입자 (60fps). 모션 줄이기면 멈춘 한 장면만 잠깐 보여 주고 사라진다.
import gsap from 'gsap';
import { H, W } from './backdrop';

export type PlagueFx = 'frogs' | 'gnats' | 'flies' | 'ash' | 'hail' | 'locusts';

/** 효과가 무대에 머무는 시간 (ms). 끝나기 1.6초 전에 흐려진다 */
const LIFE: Record<PlagueFx, number> = { frogs: 11000, gnats: 10000, flies: 10000, ash: 8000, hail: 10000, locusts: 12000 };

export function playPlague(host: HTMLElement, fx: PlagueFx, rm: boolean): void {
  const layer = document.createElement('div');
  layer.className = `fx-plague fx-${fx}`;
  host.append(layer);
  const life = rm ? 3000 : LIFE[fx];
  const stop = fx === 'frogs' ? frogs(layer, rm) : particles(layer, fx, rm, life);
  setTimeout(() => layer.classList.add('is-out'), life - (rm ? 900 : 1600));
  setTimeout(() => {
    stop();
    layer.remove();
  }, life);
}

// ── 개구리 ─────────────────────────────────────
/** 앉은 개구리 옆모습: 둥근 등, 튀어나온 눈, 접은 뒷다리 */
const FROG = `<svg viewBox="0 0 40 26" aria-hidden="true"><path d="M3 24 C2 20 4 16 8 14 C9 9 13 6 18 6 C20 3 24 2 26 4 C29 4 32 6 33 9 C36 10 38 13 37 16 C35 17 33 17 31 18 C33 20 34 22 33 24 L28 24 C28 22 27 21 25 21 L17 21 C15 23 12 24 9 24 Z"/><circle class="frog-eye" cx="27.5" cy="6.4" r="1.1"/></svg>`;

function frogs(layer: HTMLElement, rm: boolean): () => void {
  const w = layer.clientWidth || 400;
  const n = w < 600 ? 11 : 16;
  const tls: gsap.core.Timeline[] = [];
  for (let i = 0; i < n; i++) {
    const f = document.createElement('i');
    const dir = i % 2 ? -1 : 1;
    const size = 16 + Math.random() * 14; // px
    f.style.cssText = `--s:${size.toFixed(0)}px; bottom:${(2 + Math.random() * 14).toFixed(1)}%; z-index:${Math.round(size)}`;
    f.innerHTML = `<b>${FROG}</b>`;
    if (dir < 0) f.classList.add('is-left');
    layer.append(f);
    const body = f.firstElementChild as HTMLElement;
    const startX = dir > 0 ? -size - Math.random() * w * 0.5 : w + Math.random() * w * 0.5;
    if (rm) {
      gsap.set(f, { x: Math.random() * (w - size) });
      continue;
    }
    gsap.set(f, { x: startX });
    const tl = gsap.timeline({ delay: Math.random() * 2.4 });
    let x = startX;
    const hops = 9 + Math.floor(Math.random() * 6);
    for (let k = 0; k < hops; k++) {
      const dx = dir * (size * (1.6 + Math.random() * 1.6));
      x += dx;
      const t = 0.32 + Math.random() * 0.1;
      tl.to(f, { x, duration: t, ease: 'none' })
        .to(body, { y: -size * (0.6 + Math.random() * 0.5), duration: t / 2, ease: 'power2.out', yoyo: true, repeat: 1 }, '<')
        .to(body, { rotate: -dir * 8, duration: t / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<')
        .to({}, { duration: 0.15 + Math.random() * 0.6 });
    }
    tls.push(tl);
  }
  return () => tls.forEach((t) => t.kill());
}

// ── 입자 (캔버스) ───────────────────────────────
interface P {
  x: number; y: number; vx: number; vy: number; r: number; ph: number; k: number; a: number;
}

function particles(layer: HTMLElement, fx: Exclude<PlagueFx, 'frogs'>, rm: boolean, life: number): () => void {
  const canvas = document.createElement('canvas');
  layer.append(canvas);
  const ctx = canvas.getContext('2d')!;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  let w = layer.clientWidth || W;
  let h = layer.clientHeight || H;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.scale(dpr, dpr);
  const small = w * h < 500_000 || (navigator.hardwareConcurrency || 4) <= 4;
  const count = { gnats: 150, flies: 70, ash: 120, hail: 90, locusts: 320 }[fx];
  const n = Math.round(count * (small ? 0.65 : 1));
  const R = Math.random;
  const ground = h * 0.88;

  // 무리의 중심 (파리·이): 천천히 떠도는 점 몇 개
  const hubs = Array.from({ length: fx === 'flies' ? 4 : 3 }, (_, i) => ({ x: w * (0.2 + i * 0.3), y: h * (fx === 'gnats' ? 0.72 : 0.4), ph: R() * 6 }));
  const ps: P[] = Array.from({ length: n }, (_, i) => spawn(i, true));
  /** 땅에 떨어진 불덩이 자국 (우박) */
  const glows: { x: number; t: number }[] = [];

  function spawn(i: number, first: boolean): P {
    switch (fx) {
      case 'gnats':
      case 'flies':
        return { x: 0, y: 0, vx: 0, vy: 0, r: fx === 'flies' ? 1.5 + R() * 1.4 : 0.7 + R() * 0.7, ph: R() * 100, k: i % hubs.length, a: 0.5 + R() * 0.5 };
      case 'ash':
        // 가운데에서 위로 솟구쳤다가 퍼지며 천천히 내려옴
        return { x: w * (0.46 + R() * 0.08), y: h * 0.7, vx: (R() - 0.5) * w * 0.32, vy: -(h * (0.35 + R() * 0.45)), r: 0.8 + R() * 1.8, ph: R() * 6, k: R() * 0.9, a: 0.35 + R() * 0.45 };
      case 'hail': {
        const fire = i % 9 === 0;
        return { x: R() * w * 1.3 - w * 0.15, y: first ? R() * -h : -20 - R() * h * 0.4, vx: -h * 0.28, vy: h * (fire ? 0.9 : 1.15 + R() * 0.5), r: fire ? 2.8 : 0.9 + R() * 0.8, ph: 0, k: fire ? 1 : 0, a: 0.55 + R() * 0.4 };
      }
      case 'locusts':
        // 떼 구름 안에서의 자리 (dx: 구름 중심에서의 거리)
        return { x: (R() - 0.5) * w * 1.6, y: h * (0.04 + Math.pow(R(), 1.3) * 0.8), vx: 0, vy: 0, r: 1.6 + R() * 1.4, ph: R() * 6, k: 0.85 + R() * 0.3, a: 0.6 + R() * 0.4 };
    }
  }

  let raf = 0;
  let t0 = 0;
  let last = 0;

  function draw(now: number) {
    if (!t0) t0 = last = now;
    const t = (now - t0) / 1000;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    ctx.clearRect(0, 0, w, h);
    const ink = 'rgba(14, 9, 8, 0.85)';
    if (fx === 'gnats' || fx === 'flies') {
      // 무리 중심이 천천히 떠돈다. 점들은 중심 둘레를 빠르게 맴돌며 떨린다
      hubs.forEach((c, i) => {
        c.x = w * (0.2 + i * (fx === 'flies' ? 0.22 : 0.3)) + Math.sin(t * 0.4 + c.ph) * w * 0.12;
        c.y = h * (fx === 'gnats' ? 0.74 : 0.42) + Math.cos(t * 0.33 + c.ph) * h * (fx === 'gnats' ? 0.08 : 0.2);
      });
      // 처음 2초는 모여들기(퍼짐이 커짐)
      const grow = Math.min(1, t / 2);
      ctx.fillStyle = ink;
      for (const p of ps) {
        const c = hubs[p.k];
        const spread = (fx === 'flies' ? w * 0.2 : w * 0.16) * grow;
        const sp = fx === 'flies' ? 3.2 : 4.6;
        const x = c.x + Math.sin(t * sp * p.a + p.ph) * spread * (0.3 + (p.ph % 1)) + Math.sin(t * 13 + p.ph * 3) * 2.2;
        const y = c.y + Math.cos(t * sp * 1.3 * p.a + p.ph * 1.7) * spread * 0.45 * (0.3 + (p.ph % 1)) + Math.cos(t * 17 + p.ph) * 2;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (fx === 'flies') {
          // 떨리는 날개: 아주 옅은 가로 획
          ctx.globalAlpha = p.a * 0.3;
          ctx.fillRect(x - p.r * 2, y - p.r * 0.9, p.r * 4, p.r * 0.5);
        }
      }
    } else if (fx === 'ash') {
      ctx.fillStyle = 'rgb(150, 128, 116)';
      for (const p of ps) {
        // 솟구침 → 공기 저항으로 멈춤 → 천천히 흔들리며 내려앉음
        p.vx *= 1 - 1.4 * dt;
        p.vy = p.vy * (1 - 1.8 * dt) + h * 0.05 * dt;
        p.x += (p.vx + Math.sin(t * 0.9 + p.ph) * 10) * dt;
        p.y = Math.min(ground, p.y + p.vy * dt);
        ctx.globalAlpha = p.a * Math.min(1, t * 2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // 퍼진 재는 붉은 기운 도는 옅은 먼지 막이 된다
      ctx.globalAlpha = Math.min(0.16, t * 0.04);
      ctx.fillStyle = 'rgb(120, 70, 56)';
      ctx.fillRect(0, 0, w, h);
    } else if (fx === 'hail') {
      ctx.lineCap = 'round';
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const len = p.k ? 0.06 : 0.02 + p.r * 0.012;
        const tx = p.x - p.vx * len;
        const ty = p.y - p.vy * len;
        if (p.k) {
          // 불덩이: 붉은 꼬리 + 밝은 머리
          const g = ctx.createLinearGradient(tx, ty, p.x, p.y);
          g.addColorStop(0, 'rgba(214, 70, 30, 0)');
          g.addColorStop(1, 'rgba(255, 170, 80, 0.9)');
          ctx.strokeStyle = g;
          ctx.lineWidth = 4;
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          ctx.fillStyle = '#ffe1a8';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // 얼음 알갱이: 옅은 꼬리 + 둥근 흰 알
          ctx.strokeStyle = 'rgba(226, 238, 250, 1)';
          ctx.lineWidth = p.r * 0.7;
          ctx.globalAlpha = p.a * 0.35;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          ctx.globalAlpha = p.a;
          ctx.fillStyle = '#eef5fb';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        if (p.y > ground - R() * h * 0.08) {
          if (p.k) glows.push({ x: p.x, t });
          ps[i] = spawn(i, false);
        }
      }
      // 땅에 닿은 불: 잠깐 번졌다 꺼짐 (출 9:23 "불을 내려 땅에 달리게")
      for (let i = glows.length - 1; i >= 0; i--) {
        const g = glows[i];
        const age = t - g.t;
        if (age > 1.2) {
          glows.splice(i, 1);
          continue;
        }
        const rad = 10 + age * 26;
        const grd = ctx.createRadialGradient(g.x, ground, 0, g.x, ground, rad);
        grd.addColorStop(0, `rgba(255, 180, 90, ${0.55 * (1 - age / 1.2)})`);
        grd.addColorStop(1, 'rgba(240, 110, 40, 0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = grd;
        ctx.fillRect(g.x - rad, ground - rad, rad * 2, rad * 2);
      }
    } else {
      // 메뚜기: 구름 중심이 오른쪽 바깥에서 왼쪽 바깥으로 (동풍). 지나는 동안 땅이 어두워진다
      const lt = life / 1000;
      const prog = Math.min(1, t / (lt - 1));
      const cx = w * 1.5 - prog * w * 2.0;
      const cover = Math.max(0, 1 - Math.abs(cx - w * 0.5) / (w * 1.05));
      ctx.globalAlpha = cover * 0.45;
      ctx.fillStyle = 'rgb(16, 12, 8)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = ink;
      for (const p of ps) {
        const x = cx + p.x * p.k + Math.sin(t * 2.4 + p.ph) * 14;
        const y = p.y + Math.sin(t * 3.1 + p.ph * 2) * 6;
        if (x < -10 || x > w + 10) continue;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.ellipse(x, y, p.r * 1.9, p.r * 0.75, -0.15, 0, Math.PI * 2);
        ctx.fill();
        // 날개 떨림
        ctx.globalAlpha = p.a * 0.28;
        ctx.fillRect(x - p.r * 0.5, y - p.r * (1.4 + Math.sin(t * 40 + p.ph)), p.r * 2.4, p.r * 0.6);
      }
    }
    ctx.globalAlpha = 1;
    if (!rm) raf = requestAnimationFrame(draw);
  }

  if (rm) {
    // 멈춘 한 장면: 각 효과가 가장 잘 보이는 순간
    const peek = { gnats: 3, flies: 3, ash: 1.6, hail: 0.6, locusts: life / 2000 }[fx];
    let tt = 0;
    while (tt < peek) {
      tt += 0.04;
      // 입자 위치만 진행시키고 마지막에 한 번 그린다
      if (fx === 'ash' || fx === 'hail') step(0.04);
    }
    t0 = 1;
    last = 1;
    draw(1 + peek * 1000);
  } else {
    raf = requestAnimationFrame(draw);
  }

  function step(dt: number) {
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      if (fx === 'ash') {
        p.vx *= 1 - 1.4 * dt;
        p.vy = p.vy * (1 - 1.8 * dt) + h * 0.05 * dt;
        p.x += p.vx * dt;
        p.y = Math.min(ground, p.y + p.vy * dt);
      } else {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.y > ground) ps[i] = spawn(i, false);
      }
    }
  }

  const onResize = () => {
    w = layer.clientWidth || w;
    h = layer.clientHeight || h;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  window.addEventListener('resize', onResize);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
  };
}

// ── 흑암 (출 10:21-23) 배경 그림 ──────────────────
/**
 * 'goshen-dark': 무대 전체가 더듬을 만한 어둠. 짙은 어둠 덩이가 아주 느리게 흘러간다.
 * 오른쪽 멀리(폰에서도 보이는 x 250 근처) 고센의 낮은 흙벽 집 몇 채에만 등잔 불빛과 따뜻한 빛 무리 (출 10:23 "광명이 있었더라").
 */
export function goshenDarkArt(): string {
  const gx = 252;
  const g = 214;
  const house = (x: number, w: number, hh: number, door: boolean) => `
    <path class="bd-goshen-wall" d="M${x - w / 2} ${g} L${x - w / 2} ${g - hh} L${x + w / 2} ${g - hh} L${x + w / 2} ${g} Z"/>
    <path class="bd-goshen-wall" d="M${x - w / 2 - 1.5} ${g - hh} L${x + w / 2 + 1.5} ${g - hh} L${x + w / 2 + 1.5} ${g - hh - 1.6} L${x - w / 2 - 1.5} ${g - hh - 1.6} Z"/>
    ${door ? `<path class="bd-goshen-door" d="M${x - 2.4} ${g} L${x - 2.4} ${g - hh * 0.62} Q${x} ${g - hh * 0.72} ${x + 2.4} ${g - hh * 0.62} L${x + 2.4} ${g} Z"/>` : `<rect class="bd-goshen-door" x="${x + w * 0.12}" y="${g - hh * 0.7}" width="3" height="2.6"/>`}`;
  return `
    <rect class="bd-dark" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>
    <circle class="bd-goshen-halo" cx="${gx}" cy="${g - 14}" r="84"/>
    <g class="bd-goshen" transform="translate(${gx} ${g}) scale(1.5) translate(${-gx} ${-g})">
      <path class="bd-goshen-ground" d="M${gx - 70} ${g + 6} C${gx - 40} ${g - 2} ${gx + 40} ${g - 2} ${gx + 70} ${g + 6} Z"/>
      ${house(gx - 22, 16, 11, false)}${house(gx, 20, 14, true)}${house(gx + 21, 14, 10, false)}${house(gx + 36, 10, 8, false)}
      <ellipse class="bd-lampflame" cx="${gx}" cy="${g - 3.2}" rx="0.9" ry="1.6"/>
    </g>
    <g class="bd-murk">
      <ellipse style="--d:0s" cx="80" cy="150" rx="140" ry="40"/>
      <ellipse style="--d:-7s" cx="320" cy="90" rx="160" ry="44"/>
      <ellipse style="--d:-13s" cx="180" cy="230" rx="180" ry="36"/>
    </g>`;
}
