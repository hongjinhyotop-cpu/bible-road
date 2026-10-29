// 사사기의 순환 고리 (beat 필드 "cycle", 삿 2:11-19).
// 죄 → 압제 → 부르짖음 → 구원 → 태평 → 다시 죄. 다섯 마디가 고리로 이어져 있다.
//  - { "round": 4, "judge": "드보라" }          : 고리가 무대 가운데로 커지고, 마디가 하나씩 켜지며 한 바퀴 돈다 (약 5초)
//  - { "round": 12, "judge": "삼손", "skip": ["cry", "rest"] } : 그 마디는 이번 바퀴에 켜지지 않는다 (삼손 때는 아무도 부르짖지 않았다, 13:1)
//  - { "round": 8, "at": "cry" }                : 바퀴를 돌지 않고 그 마디 하나만 밝힌다
//  - { "broken": true }                          : 삿 17–21. 사사가 없다. 마디가 하나씩 꺼지고 고리가 금 가서 흩어진다
// 다음 beat에 cycle이 없으면 고리는 무대 왼쪽 위로 작게 물러나 에피소드 내내 남는다.
// 바퀴(round)가 늘수록 고리 색이 금빛 → 잿빛 → 녹슨 붉은빛으로 바래고, 금이 늘고, 무대 전체가 어두워진다 (data-decay).
import { reducedMotion } from '../engine/settings';
import { CYCLE_LABEL, CYCLE_STAGES, JUDGES, ROUNDS, type CycleSpec, type CycleStage } from '../engine/cycle';

export { CYCLE_STAGES, CYCLE_LABEL, JUDGES, ROUNDS, type CycleStage, type CycleSpec };

export interface CycleRing {
  el: HTMLElement;
  /** 무대 가운데로 크게 / 왼쪽 위로 작게 */
  big(on: boolean): void;
  hide(): void;
}

const R = 40;
const NUMERALS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const pos = (i: number, r = R) => {
  const a = -Math.PI / 2 + (i * Math.PI * 2) / CYCLE_STAGES.length;
  return [50 + Math.cos(a) * r, 50 + Math.sin(a) * r] as const;
};
const f = (n: number) => n.toFixed(2);

function markup(): string {
  const nodes = CYCLE_STAGES.map((s, i) => {
    const [x, y] = pos(i);
    const [lx, ly] = pos(i, R + 10.5);
    const anchor = Math.abs(lx - 50) < 4 ? 'middle' : lx > 50 ? 'start' : 'end';
    return `<g class="cycle__node" data-s="${s}" style="--i:${i}">
      <circle class="cycle__glow" cx="${f(x)}" cy="${f(y)}" r="7"/>
      <circle class="cycle__dot" cx="${f(x)}" cy="${f(y)}" r="3.1"/>
      <text class="cycle__label" x="${f(lx)}" y="${f(ly + 1.6)}" text-anchor="${anchor}">${CYCLE_LABEL[s]}</text>
    </g>`;
  }).join('');
  // 금(crack): 바퀴가 늘수록 하나씩 보인다 (data-cracks)
  const cracks = Array.from({ length: 6 }, (_, k) => {
    const a = -Math.PI / 2 + Math.PI / 5 + (k * Math.PI * 2) / 6 + 0.3;
    const x = 50 + Math.cos(a) * R, y = 50 + Math.sin(a) * R;
    const nx = Math.cos(a), ny = Math.sin(a);
    return `<path class="cycle__crack" style="--k:${k}" d="M${f(x - nx * 3)} ${f(y - ny * 3)} l${f(nx * 2.4 + ny * 1.2)} ${f(ny * 2.4 - nx * 1.2)} l${f(nx * 2 - ny * 1.4)} ${f(ny * 2 + nx * 1.4)} l${f(nx * 2)} ${f(ny * 2)}"/>`;
  }).join('');
  // 깨질 때 흩어지는 고리 조각 다섯 (마디 사이 호)
  const shards = CYCLE_STAGES.map((_, i) => {
    const a0 = -Math.PI / 2 + (i * Math.PI * 2) / 5 + 0.2, a1 = a0 + (Math.PI * 2) / 5 - 0.4;
    const [x0, y0] = [50 + Math.cos(a0) * R, 50 + Math.sin(a0) * R];
    const [x1, y1] = [50 + Math.cos(a1) * R, 50 + Math.sin(a1) * R];
    const mid = (a0 + a1) / 2;
    return `<path class="cycle__shard" style="--i:${i}; --dx:${f(Math.cos(mid) * 9)}px; --dy:${f(Math.sin(mid) * 9 + 6)}px; --rot:${(i % 2 ? 1 : -1) * (8 + i * 3)}deg" d="M${f(x0)} ${f(y0)} A${R} ${R} 0 0 1 ${f(x1)} ${f(y1)}"/>`;
  }).join('');
  return `<svg class="cycle__svg" viewBox="-14 -6 128 112" aria-hidden="true">
    <circle class="cycle__track" cx="50" cy="50" r="${R}"/>
    <circle class="cycle__run" cx="50" cy="50" r="${R}" pathLength="100" transform="rotate(-90 50 50)"/>
    <g class="cycle__shards">${shards}</g>
    <g class="cycle__cracks">${cracks}</g>
    <path class="cycle__arrow" d="M${f(pos(4)[0] + 4)} ${f(pos(4)[1] - 9)} l3.2 -1.8 l-0.4 3.6"/>
    ${nodes}
    <text class="cycle__again" x="50" y="${f(50 - R - 13)}" text-anchor="middle">다시</text>
    <text class="cycle__num" x="50" y="47" text-anchor="middle"></text>
    <text class="cycle__judge" x="50" y="58" text-anchor="middle"></text>
  </svg>`;
}

/** 고리를 보여 준다 (없으면 만들고, 있으면 그 고리로 이어서) */
export function showCycle(host: HTMLElement, spec: CycleSpec, current?: CycleRing | null): CycleRing {
  const rm = reducedMotion();
  let el = current?.el;
  if (!el || !el.isConnected) {
    el = document.createElement('div');
    el.className = 'cycle';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = markup();
    host.append(el);
  }
  const box = el;
  const round = spec.broken ? ROUNDS + 1 : Math.max(1, Math.min(ROUNDS, Math.round(spec.round ?? Number(box.dataset.round ?? 1))));
  box.dataset.round = String(round);
  box.style.setProperty('--r', f(Math.min(1, (round - 1) / (ROUNDS - 1))));
  box.dataset.cracks = String(Math.min(6, Math.floor((round - 1) / 2)));
  const num = box.querySelector<SVGTextElement>('.cycle__num')!;
  const judge = box.querySelector<SVGTextElement>('.cycle__judge')!;
  num.textContent = spec.broken ? '' : NUMERALS[round] ?? String(round);
  judge.textContent = spec.broken ? '왕이 없으므로' : spec.judge ?? JUDGES[round - 1] ?? '';
  box.classList.toggle('is-broken', !!spec.broken);
  const nodes = [...box.querySelectorAll<SVGGElement>('.cycle__node')];
  const skip = new Set(spec.skip ?? []);
  nodes.forEach((n) => n.classList.toggle('is-skip', skip.has(n.dataset.s as CycleStage)));
  // 한 바퀴: 클래스를 다시 붙여 CSS 애니메이션을 처음부터
  box.classList.remove('is-lap', 'is-at', 'is-breaking');
  nodes.forEach((n) => n.classList.remove('is-on'));
  void box.getBoundingClientRect();
  if (spec.broken) box.classList.add('is-breaking');
  else if (spec.at) {
    box.classList.add('is-at');
    box.querySelector(`.cycle__node[data-s="${spec.at}"]`)?.classList.add('is-on');
  } else box.classList.add('is-lap');
  if (rm) box.classList.add('is-rm');
  const ring: CycleRing = {
    el: box,
    big(on) {
      box.classList.toggle('is-big', on);
    },
    hide() {
      box.classList.add('is-out');
      setTimeout(() => box.remove(), rm ? 300 : 1200);
    },
  };
  ring.big(true);
  return ring;
}
