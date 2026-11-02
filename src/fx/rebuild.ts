// 10막 — 다시 세워지는 예루살렘 판 (beat 필드 "rebuild", 데이터 engine/rebuild.ts).
// 위에서 내려다본 옛 지도처럼: 불탄 성벽 고리(점선 잔해) 위로 구간이 하나씩 솟아 굵은 금빛 돌벽이 되고,
// 가운데(북동쪽) 성전 터는 폐허 → 제단의 불 → 기초 테두리 → (멈춤: 잿빛) → 완공된 집으로 바뀐다.
// 크게(is-big) = 무대를 덮는 판, 작게 = 왼쪽 위 작은 표.
import { reducedMotion } from '../engine/settings';
import { GATES, TEMPLE_LABEL, TEMPLE_STAGES, WALL_MAX, type RebuildSpec, type TempleStage } from '../engine/rebuild';

export interface RebuildBoard {
  el: HTMLElement;
  big(on: boolean): void;
}

const f = (n: number) => n.toFixed(1);
/** 문 자리 (viewBox 0 0 100 120 — 위가 북쪽). 북동 양문에서 시작해 서쪽 → 남쪽 → 동쪽으로 한 바퀴 (느 3 순서) */
const P: [number, number][] = [[70, 18], [46, 13], [22, 26], [20, 62], [42, 108], [58, 104], [68, 80], [76, 56], [81, 38], [79, 25]];
/** 구간 i = 문 i → 문 i+1. 바깥으로 살짝 부푼 곡선 */
function seg(i: number): string {
  const [x0, y0] = P[i];
  const [x1, y1] = P[(i + 1) % P.length];
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
  const cx = 50, cy = 60;
  const dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy) || 1;
  return `M${f(x0)} ${f(y0)} Q${f(mx + (dx / d) * 5)} ${f(my + (dy / d) * 5)} ${f(x1)} ${f(y1)}`;
}

function temple(): string {
  return `<g class="rb-temple" transform="translate(60 42)">
    <path class="rb-rubble" d="M-9 4 l3 -3 l3 2 l2 -4 l4 3 l3 -2 l3 4 Z M-6 7 h4 v-2 h-4 Z M3 7 h5 v-2 h-5 Z"/>
    <g class="rb-altar"><rect x="-3" y="1" width="6" height="5" rx="0.6"/><path class="rb-flame" d="M0 1 C-2 -2 -1 -4 0 -6 C1 -4 2 -2 0 1 Z"/></g>
    <rect class="rb-found" x="-12" y="-9" width="24" height="16" rx="0.5"/>
    <g class="rb-house"><path d="M-10 7 V-5 L0 -11 L10 -5 V7 Z"/><rect class="rb-door" x="-2" y="0" width="4" height="7"/></g>
    <text class="rb-halt" x="0" y="-12" text-anchor="middle">멈춤</text>
  </g>`;
}

function markup(): string {
  const rubble = P.map((_, i) => `<path class="rb-ruin" d="${seg(i)}"/>`).join('');
  const segs = P.map((_, i) => `<path class="rb-seg" data-i="${i}" d="${seg(i)}" pathLength="100"/>`).join('');
  const gates = GATES.map((g, i) => {
    const [x, y] = P[i];
    const out = x < 50 ? -1 : 1;
    return `<g class="rb-gate" data-g="${g.id}">
      <circle class="rb-gate__glow" cx="${x}" cy="${y}" r="5"/>
      <rect class="rb-gate__dot" x="${x - 1.6}" y="${y - 1.6}" width="3.2" height="3.2" rx="0.6"/>
      <text class="rb-gate__name" x="${f(x + out * 3.6)}" y="${f(y + 1.2)}" text-anchor="${out < 0 ? 'end' : 'start'}">${g.name}</text>
    </g>`;
  }).join('');
  return `<svg class="rb__map" viewBox="-14 0 128 120" aria-hidden="true">
      <path class="rb-valley" d="M88 10 C96 40 92 80 70 116 M10 20 C4 60 12 96 40 118"/>
      <text class="rb-compass" x="50" y="6" text-anchor="middle">북</text>
      ${rubble}${segs}${temple()}${gates}
    </svg>
    <div class="rb__info"><b class="rb__count"></b><span class="rb__temple"></span><em class="rb__label"></em></div>
    <div class="rb__mini"><i class="rb__bar"><i></i></i><span></span></div>`;
}

/** 판을 펴고(없으면 만들고) 이번 상태로 바꾼다. 앞보다 늘어난 성벽 구간은 하나씩 솟는다 */
export function showRebuild(host: HTMLElement, spec: RebuildSpec, current?: RebuildBoard | null): RebuildBoard {
  const rm = reducedMotion();
  let el = current?.el;
  const first = !el || !el.isConnected;
  if (first) {
    el = document.createElement('div');
    el.className = 'rebuild';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = markup();
    host.append(el);
  }
  const box = el!;
  if (rm) box.classList.add('is-rm');
  const prevWall = Number(box.dataset.wall ?? -1);
  const wall = Math.max(0, Math.min(WALL_MAX, Math.round(spec.wall ?? (prevWall < 0 ? 0 : prevWall))));
  const start = spec.from != null ? Math.max(0, Math.min(wall, spec.from)) : prevWall < 0 ? wall : Math.min(prevWall, wall);
  const stage: TempleStage = spec.temple ?? ((box.dataset.temple as TempleStage) || 'ruin');
  box.dataset.wall = String(wall);
  box.dataset.temple = stage;
  box.dataset.t = String(TEMPLE_STAGES.indexOf(stage));
  box.querySelectorAll<SVGPathElement>('.rb-seg').forEach((p) => {
    const i = Number(p.dataset.i);
    p.classList.remove('is-rise');
    p.style.removeProperty('--k');
    p.classList.toggle('is-up', i < wall);
    if (i >= start && i < wall && !rm) {
      p.style.setProperty('--k', String(i - start));
      void p.getBoundingClientRect();
      p.classList.add('is-rise');
    }
  });
  box.querySelectorAll<SVGGElement>('.rb-gate').forEach((g, i) => {
    g.classList.toggle('is-up', wall > 0 && i <= wall);
    g.classList.toggle('is-at', spec.at === g.dataset.g);
  });
  box.querySelector('.rb__count')!.textContent = wall >= WALL_MAX ? '성벽 완성' : wall === 0 ? '무너진 성벽' : `성벽 ${wall} / ${WALL_MAX}`;
  box.querySelector('.rb__temple')!.textContent = TEMPLE_LABEL[stage];
  box.querySelector('.rb__label')!.textContent = spec.label ?? '';
  box.querySelector<HTMLElement>('.rb__bar > i')!.style.width = `${(wall / WALL_MAX) * 100}%`;
  box.querySelector('.rb__mini span')!.textContent = `${TEMPLE_LABEL[stage].split(' · ')[0]} · 성벽 ${wall}/${WALL_MAX}`;
  const board: RebuildBoard = { el: box, big: (on) => box.classList.toggle('is-big', on) };
  board.big(true);
  return board;
}

/** 이번 beat에서 판이 보여 줄 시간(초): 솟는 구간 수만큼 */
export function rebuildHold(spec: RebuildSpec, current?: RebuildBoard | null): number {
  const prev = Number(current?.el.dataset.wall ?? -1);
  const wall = spec.wall ?? prev;
  const start = spec.from ?? (prev < 0 ? wall : prev);
  return Math.min(7, 2.6 + Math.max(0, wall - start) * 0.5);
}
