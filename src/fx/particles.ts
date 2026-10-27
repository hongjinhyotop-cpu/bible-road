// 배경에 항상 흐르는 아주 느린 움직임. 하나의 캔버스를 모든 화면이 공유한다.
//  - dust : 빛 속에 떠도는 금빛 먼지 (타이틀)
//  - stars: 반짝이는 별과 아주 느린 흐름 (성경 지도)
// 프레임이 느리면 입자 수를 스스로 줄이고, 모션 줄이기면 정지 화면 한 장만 그린다.
import { reducedMotion } from '../engine/settings';

export type FieldMode = 'dust' | 'stars';

interface P {
  x: number; y: number; r: number;
  vx: number; vy: number;
  a: number; tw: number; ph: number;
  warm: boolean;
}

const canvas = document.createElement('canvas');
canvas.id = 'fx-canvas';
const ctx = canvas.getContext('2d')!;

let mode: FieldMode = 'dust';
let ps: P[] = [];
let w = 0, h = 0, dpr = 1;
let raf = 0;
let last = 0;
let quality = 1;
let slowFrames = 0;
let intensity = 1;

function density(): number {
  const base = mode === 'stars' ? 0.00016 : 0.00014;
  const cores = navigator.hardwareConcurrency || 4;
  const hw = cores <= 4 ? 0.6 : 1;
  return Math.min(mode === 'stars' ? 320 : 160, Math.round(w * h * base * hw * quality));
}

function spawn(initial: boolean): P {
  const stars = mode === 'stars';
  return {
    x: Math.random() * w,
    y: initial ? Math.random() * h : stars ? Math.random() * h : h + 10,
    r: stars ? Math.random() ** 3 * 1.5 + 0.35 : Math.random() ** 2 * 1.9 + 0.4,
    vx: stars ? -0.004 - Math.random() * 0.006 : (Math.random() - 0.5) * 0.012,
    vy: stars ? 0 : -(0.006 + Math.random() * 0.016),
    a: stars ? 0.25 + Math.random() * 0.75 : 0.15 + Math.random() * 0.55,
    tw: 0.4 + Math.random() * 1.6,
    ph: Math.random() * Math.PI * 2,
    warm: Math.random() < (stars ? 0.22 : 0.85),
  };
}

function resize(): void {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  rebuild();
}

function rebuild(): void {
  const n = density();
  ps = Array.from({ length: n }, () => spawn(true));
  draw(performance.now(), 0);
}

function draw(t: number, dt: number): void {
  ctx.clearRect(0, 0, w, h);
  const time = t / 1000;
  for (const p of ps) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (mode === 'dust') {
      p.x += Math.sin(time * 0.3 + p.ph) * 0.004 * dt;
      if (p.y < -10) Object.assign(p, spawn(false));
    }
    if (p.x < -10) p.x = w + 10;
    if (p.x > w + 10) p.x = -10;

    const flicker = 0.55 + 0.45 * Math.sin(time * p.tw + p.ph);
    const alpha = p.a * flicker * intensity;
    if (alpha < 0.02) continue;
    const col = p.warm ? '244, 214, 150' : '220, 228, 255';

    if (p.r > 1.1) {
      // 큰 입자만 은은한 빛 번짐
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0, `rgba(${col}, ${alpha})`);
      g.addColorStop(1, `rgba(${col}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = `rgba(${col}, ${Math.min(1, alpha * 1.2)})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
}

function loop(t: number): void {
  const dt = Math.min(64, t - (last || t));
  last = t;
  // 저사양 감지: 느린 프레임이 이어지면 입자를 절반으로
  if (dt > 26) slowFrames++;
  else slowFrames = Math.max(0, slowFrames - 1);
  if (slowFrames > 45 && quality > 0.3) {
    quality *= 0.5;
    slowFrames = 0;
    ps = ps.slice(0, density());
  }
  draw(t, dt);
  raf = requestAnimationFrame(loop);
}

function start(): void {
  cancelAnimationFrame(raf);
  last = 0;
  if (reducedMotion() || document.hidden) {
    draw(performance.now(), 0);
    return;
  }
  raf = requestAnimationFrame(loop);
}

export function mountField(): void {
  document.body.prepend(canvas);
  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', start);
  start();
}

export function setFieldMode(next: FieldMode): void {
  if (next === mode) return;
  mode = next;
  rebuild();
  start();
}

/** 0~1. 타이틀 오프닝처럼 입자가 서서히 밝아져야 할 때 쓴다. */
export function setFieldIntensity(v: number): void {
  intensity = v;
  if (reducedMotion()) draw(performance.now(), 0);
}

export function getFieldIntensity(): number {
  return intensity;
}

/** 설정이 바뀌었을 때(모션 줄이기 등) 다시 시작 */
export function restartField(): void {
  start();
}
