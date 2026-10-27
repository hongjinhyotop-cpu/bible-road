// 비 (창 7:11-12 "하늘의 창들이 열려 사십 주야를 비가 땅에 쏟아졌더라").
// 장면 무대 위에 얹는 캔버스 하나. 빗줄기는 비스듬한 가는 선이고, 세기(level)는 천천히 바뀐다.
// 느린 프레임이 이어지면 빗줄기 수를 줄이고, 모션 줄이기면 멈춘 빗줄기 한 장만 그린다.
import { reducedMotion } from '../engine/settings';

interface Drop {
  x: number;
  y: number;
  len: number;
  v: number;
  a: number;
}

const MAX = { 1: 70, 2: 220 } as const;

export class Rain {
  readonly el = document.createElement('canvas');
  private ctx = this.el.getContext('2d')!;
  private drops: Drop[] = [];
  private level = 0;
  /** 지금 보이는 세기 (0~1). 목표(level)를 향해 천천히 따라간다 */
  private shown = 0;
  private w = 0;
  private h = 0;
  private raf = 0;
  private last = 0;
  private quality = 1;
  private slow = 0;
  private ro = new ResizeObserver(() => this.resize());

  constructor() {
    this.el.className = 'scene__rain';
    this.el.setAttribute('aria-hidden', 'true');
    this.ro.observe(this.el);
  }

  /** 0 = 그침, 1 = 비, 2 = 쏟아짐 */
  set(level: number): void {
    this.level = Math.max(0, Math.min(2, level));
    if (this.level > 0 && !this.raf) this.start();
    if (reducedMotion()) {
      this.shown = this.level / 2;
      this.fill();
      this.draw(0);
    }
  }

  private resize(): void {
    const r = this.el.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = r.width;
    this.h = r.height;
    this.el.width = Math.round(r.width * dpr);
    this.el.height = Math.round(r.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.drops = [];
    this.fill();
    this.draw(0);
  }

  private target(): number {
    const area = (this.w * this.h) / (390 * 600);
    const n = this.level === 0 ? 0 : MAX[this.level as 1 | 2];
    return Math.round(n * Math.min(2.2, Math.max(0.6, area)) * this.quality);
  }

  private spawn(top: boolean): Drop {
    const heavy = this.level === 2;
    return {
      x: Math.random() * (this.w + 120) - 60,
      y: top ? -20 - Math.random() * 60 : Math.random() * this.h,
      len: (heavy ? 16 : 10) + Math.random() * (heavy ? 22 : 12),
      v: (heavy ? 1.1 : 0.75) + Math.random() * 0.5,
      a: 0.18 + Math.random() * 0.4,
    };
  }

  private fill(): void {
    const n = this.target();
    while (this.drops.length < n) this.drops.push(this.spawn(false));
  }

  private draw(dt: number): void {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.w, this.h);
    if (this.shown < 0.01) return;
    const slant = 0.22;
    ctx.lineCap = 'round';
    ctx.lineWidth = 1;
    const n = this.target();
    for (let i = this.drops.length - 1; i >= 0; i--) {
      const d = this.drops[i];
      d.y += d.v * dt;
      d.x -= d.v * dt * slant;
      if (d.y - d.len > this.h) {
        // 그치는 중이면 빗줄기가 다시 안 생긴다
        if (this.drops.length > n) this.drops.splice(i, 1);
        else Object.assign(d, this.spawn(true));
        continue;
      }
      ctx.strokeStyle = `rgba(196, 210, 236, ${d.a * this.shown})`;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.len * slant, d.y - d.len);
      ctx.stroke();
    }
  }

  private start(): void {
    cancelAnimationFrame(this.raf);
    this.last = 0;
    if (reducedMotion()) return;
    const loop = (t: number) => {
      const dt = Math.min(48, t - (this.last || t));
      this.last = t;
      if (dt > 26) this.slow++;
      else this.slow = Math.max(0, this.slow - 1);
      if (this.slow > 40 && this.quality > 0.3) {
        this.quality *= 0.5;
        this.slow = 0;
      }
      // 세기는 2~3초에 걸쳐 바뀐다
      const goal = this.level / 2;
      this.shown += (goal - this.shown) * Math.min(1, dt / 1400);
      if (this.level > 0) this.fill();
      this.draw(dt);
      if (this.level === 0 && (this.shown < 0.01 || !this.drops.length)) {
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.raf = 0;
        return;
      }
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  destroy(): void {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.ro.disconnect();
    this.el.remove();
  }
}
