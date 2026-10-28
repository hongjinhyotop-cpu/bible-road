// 땅 분배 지도 (beat 필드 "allot"): 가나안을 가까이 본 옛 지도 위에 지파의 몫이 하나씩 칠해진다 (수 13–21).
// "allot": "judah" 또는 ["benjamin", "simeon"]. 다음 beat에도 allot이 있으면 같은 지도에 이어 칠하고, 없으면 접힌다.
// 여호수아서의 분배 순서(ALLOT_ORDER)에서 이번에 칠하는 지파보다 앞선 지파는 처음부터 옅게 칠해져 있다
// → 에피소드가 나뉘어 있어도 지도가 장마다 조금씩 차오른다.
// 특별한 이름: "levi" = 레위인의 성읍(땅 없이 흩어진 점, 수 21) · "refuge" = 도피성 여섯(수 20) · "all" = 열두 지파 전부.
// 경계는 대략의 그림 (정확한 지파 경계는 학자마다 다르게 그림).
import gsap from 'gsap';
import { reducedMotion } from '../engine/settings';
import { at, mapArt } from './travel';

import { ALLOT_ORDER, LEVI, REFUGE, TRIBES, type AllotName, type Pt, type TribeName } from '../engine/tribes';

export interface AllotMap {
  el: HTMLElement;
  hide(): Promise<void>;
}

const f = (n: number) => n.toFixed(2);
const path = (poly: Pt[]) => `M${poly.map(([lon, lat]) => at(lon, lat).map(f).join(' ')).join(' L')} Z`;

/** 지도를 펼치고(이미 있으면 그대로) 이번 지파를 칠한다 */
export function showAllot(host: HTMLElement, list: AllotName[], current?: AllotMap | null): AllotMap {
  const rm = reducedMotion();
  const all = list.includes('all');
  const now = new Set<TribeName>(all ? ALLOT_ORDER : list.filter((n): n is TribeName => n in TRIBES));
  // 이번 것보다 앞선 지파는 이미 칠해져 있다
  const first = Math.min(...[...now].map((t) => ALLOT_ORDER.indexOf(t)), list.some((n) => n === 'levi' || n === 'refuge') ? ALLOT_ORDER.length : Infinity);
  let el = current?.el;
  const fresh = !el;
  if (!el) {
    el = document.createElement('div');
    el.className = 'travel allot';
    el.setAttribute('aria-hidden', 'true');
    host.append(el);
    // 가나안을 가까이: 경도 34.2~36.6, 위도 30.5~33.4. 상자 비율(폰은 세로)에 맞춘다
    const [x0, y0] = at(34.15, 33.45);
    const [x1, y1] = at(36.65, 30.45);
    el.innerHTML = `<svg class="travel__map" preserveAspectRatio="xMidYMid meet" style="--k:0.16">
      <rect class="map__paper" x="-200" y="-200" width="800" height="700"/>
      ${mapArt()}
      <g class="allot__tribes">${ALLOT_ORDER.map((t) => `<path class="allot__land" data-t="${t}" style="--hue:${TRIBES[t].hue}" d="${path(TRIBES[t].poly)}"/>`).join('')}</g>
      <g class="allot__labels">${ALLOT_ORDER.map((t) => { const [x, y] = at(...TRIBES[t].label); return `<text class="allot__name" data-t="${t}" x="${f(x)}" y="${f(y)}">${TRIBES[t].name}</text>`; }).join('')}</g>
      <g class="allot__levi">${LEVI.map((p, i) => { const [x, y] = at(...p); return `<circle style="--i:${i}" cx="${f(x)}" cy="${f(y)}" r="0.55"/>`; }).join('')}</g>
      <g class="allot__refuge">${REFUGE.map((c, i) => { const [x, y] = at(...c.at); return `<g style="--i:${i}"><circle class="allot__ring" cx="${f(x)}" cy="${f(y)}" r="1.5"/><circle cx="${f(x)}" cy="${f(y)}" r="0.6"/><text x="${f(x + 1.6)}" y="${f(y - 0.9)}">${c.name}</text></g>`; }).join('')}</g>
      <text class="allot__jordan" x="${f(at(35.56, 32.25)[0])}" y="${f(at(35.56, 32.25)[1])}">요단</text>
    </svg>`;
    const svg = el.querySelector('svg')!;
    const view = () => {
      const ratio = el!.clientWidth && el!.clientHeight ? el!.clientHeight / el!.clientWidth : 1.2;
      let w = x1 - x0, h = y1 - y0;
      if (h / w < ratio) h = w * ratio; else w = h / ratio;
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      return `${f(cx - w / 2)} ${f(cy - h / 2)} ${f(w)} ${f(h)}`;
    };
    svg.setAttribute('viewBox', view());
    new ResizeObserver(() => svg.setAttribute('viewBox', view())).observe(el);
  }
  const box = el;
  for (const t of ALLOT_ORDER) {
    const i = ALLOT_ORDER.indexOf(t);
    const land = box.querySelector<SVGPathElement>(`.allot__land[data-t="${t}"]`)!;
    const name = box.querySelector<SVGTextElement>(`.allot__name[data-t="${t}"]`)!;
    if (now.has(t)) {
      if (land.classList.contains('is-new') || land.classList.contains('is-done')) continue;
      land.classList.add('is-new');
      name.classList.add('is-new');
    } else if (i < first && !land.classList.contains('is-new')) {
      land.classList.add('is-done');
      name.classList.add('is-done');
    }
  }
  // 앞 beat에서 새로 칠한 것은 이제 "이미 받은 땅"
  if (!fresh) box.querySelectorAll('.is-new').forEach((n) => {
    const t = (n as SVGElement).dataset.t as TribeName;
    if (!now.has(t)) { n.classList.remove('is-new'); n.classList.add('is-done'); }
  });
  box.classList.toggle('show-levi', list.includes('levi'));
  box.classList.toggle('show-refuge', list.includes('refuge'));
  const fresh_ = [...box.querySelectorAll('.allot__land.is-new:not(.is-shown)')];
  const tl = gsap.timeline();
  if (fresh) tl.fromTo(box, { opacity: 0, scale: rm ? 1 : 0.96, rotate: rm ? 0 : -1.2 }, { opacity: 1, scale: 1, rotate: 0, duration: rm ? 0.3 : 0.9, ease: 'expo.out' });
  fresh_.forEach((n, k) => {
    n.classList.add('is-shown');
    const label = box.querySelector(`.allot__name[data-t="${(n as SVGElement).dataset.t}"]`);
    tl.fromTo(n, { opacity: 0 }, { opacity: 1, duration: rm ? 0.2 : 1.1, ease: 'power2.out' }, rm ? 0 : 0.4 + k * 0.9);
    if (label) tl.fromTo(label, { opacity: 0, y: rm ? 0 : 1 }, { opacity: 1, y: 0, duration: rm ? 0.2 : 0.8 }, rm ? 0 : 0.7 + k * 0.9);
  });
  return {
    el: box,
    async hide() {
      tl.kill();
      await gsap.to(box, { opacity: 0, scale: rm ? 1 : 0.98, duration: rm ? 0.2 : 0.6, ease: 'power2.in' });
      box.remove();
    },
  };
}
