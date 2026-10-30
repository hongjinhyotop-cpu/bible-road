// 여정 지도 (동작 "travel"): 옛 지도 한 장이 무대 위로 펼쳐지고, from → via → to 길이 금빛 점선으로 그어진다.
// 작은 불빛(일행)이 그 길을 따라 움직이고, 장소 이름이 하나씩 떠오른다. 다음 beat로 넘어가면 접힌다.
// 지도 좌표: 경도 29°~49°E → x 0~400, 위도 38°N~25°N → y 0~260 (1° = 20). 대략의 위치만 맞춘 그림 지도.
import gsap from 'gsap';
import { PLACE_NAMES, PLACE_NOTES, type PlaceName } from '../engine/actions';
import { reducedMotion } from '../engine/settings';

export const at = (lon: number, lat: number): [number, number] => [(lon - 29) * 20, (38 - lat) * 20];

export const PLACE_XY: Record<PlaceName, [number, number]> = {
  ur: at(46.1, 30.96),
  haran: at(39.03, 36.87),
  'paddan-aram': at(39.03, 36.87),
  nineveh: at(43.15, 36.36),
  babylon: at(44.42, 32.54),
  babel: at(44.42, 32.54),
  shinar: at(44.6, 32.2),
  damascus: at(36.3, 33.51),
  canaan: at(35.1, 31.95),
  shechem: at(35.28, 32.21),
  bethel: at(35.22, 31.93),
  ai: at(35.26, 31.92),
  hebron: at(35.1, 31.53),
  mamre: at(35.1, 31.55),
  'kiriath-arba': at(35.1, 31.53),
  machpelah: at(35.11, 31.52),
  sodom: at(35.4, 31.05),
  zoar: at(35.5, 30.98),
  gerar: at(34.6, 31.38),
  beersheba: at(34.79, 31.25),
  negev: at(34.85, 30.85),
  'beer-lahai-roi': at(34.4, 30.75),
  moriah: at(35.23, 31.78),
  salem: at(35.23, 31.78),
  jerusalem: at(35.23, 31.78),
  dan: at(35.65, 33.25),
  mahanaim: at(35.7, 32.25),
  peniel: at(35.68, 32.19),
  jabbok: at(35.62, 32.18),
  succoth: at(35.57, 32.18),
  dothan: at(35.24, 32.42),
  bethlehem: at(35.2, 31.7),
  'mount-seir': at(35.5, 30.5),
  edom: at(35.6, 30.4),
  egypt: at(31.2, 30.05),
  goshen: at(31.8, 30.7),
  shur: at(33.3, 30.6),
  'shur-way': at(33.3, 30.6),
  paran: at(34.6, 29.9),
  sinai: at(33.97, 28.54),
  // 르비딤: 시내산 가기 직전 진 친 곳 (출 17:1, 19:2). 정확한 위치는 모름 — 전통적으로 와디 페이란 근처로 봄
  rephidim: at(33.62, 28.72),
  // 미디안: 아카바만 동쪽 아라비아 서북부 (모세가 도망가 목자로 산 땅, 출 2:15)
  midian: at(35.4, 28.1),
  kadesh: at(34.42, 30.65),
  jericho: at(35.44, 31.87),
  galilee: at(35.58, 32.82),
  nazareth: at(35.3, 32.7),
  capernaum: at(35.57, 32.88),
  // 라암셋: 나일 삼각주 동쪽, 지금의 칸티르 근처 (출 12:37 출발지)
  rameses: at(31.83, 30.8),
  // 애굽의 숙곳: 와디 투밀랏 동쪽 끝, 텔 엘마스쿠타 근처 (출 12:37). 야곱의 숙곳(succoth, 요단 동편)과 다른 곳
  'succoth-egypt': at(32.1, 30.55),
  // 비하히롯: 믹돌과 바다 사이, 바알스본 맞은편 바닷가 (출 14:2). 정확한 위치는 모름 — 수에즈 북쪽 비터 호수 근처로 둠
  'pi-hahiroth': at(32.35, 30.15),
  // 홍해(얌 수프, 갈대 바다)를 건넌 곳: 어디인지는 논쟁 중 (비터 호수·수에즈만 북쪽 끝 등). 수에즈만 북쪽 끝 근처로 둠
  'red-sea': at(32.55, 30.0),
  // 엘림: 물샘 열둘, 종려 일흔 그루 (출 15:27). 위치는 모름 — 전통적으로 수에즈만 동쪽 와디 가란델로 봄
  elim: at(33.0, 29.35),
  // 신 광야: 엘림과 시내산 사이 (출 16:1). 위치는 모름 — 수에즈만 동쪽 해안 평야(엘 마르카) 근처로 둠
  'sin-desert': at(33.2, 29.0),
  // 애굽 강: 가나안 남서쪽 끝 와디 엘아리시로 보는 해석이 많음 (창 15:18, 민 34:5). 나일로 보는 해석도 있음
  'brook-egypt': at(33.8, 31.12),
  'brook-egypt-num': at(33.8, 31.12),
  // 유브라데: 그 큰 강. 가나안에서 가장 가까운 북쪽 굽이 (갈그미스 근처)
  euphrates: at(38.35, 36.7),
  hazeroth: at(34.4, 28.95),
  taberah: at(34.2, 29.1),
  'kibroth-hattaavah': at(34.25, 28.85),
  'zin-desert': at(34.9, 30.75),
  'mount-hor': at(35.4, 30.3),
  'ezion-geber': at(35.0, 29.55),
  oboth: at(35.55, 30.75),
  arnon: at(35.75, 31.45),
  heshbon: at(35.8, 31.8),
  bashan: at(36.1, 32.8),
  moab: at(35.8, 31.25),
  'moab-plains': at(35.62, 31.83),
  shittim: at(35.65, 31.85),
  pisgah: at(35.73, 31.77),
  nebo: at(35.73, 31.77),
  jordan: at(35.55, 31.9),
  // 여호수아: 대략의 위치 (막게다·립나·에글론·딤낫 세라는 위치가 확실하지 않음 — 많이 쓰는 추정지)
  gilgal: at(35.48, 31.86),
  'adam-city': at(35.55, 32.1),
  gibeon: at(35.18, 31.85),
  'beth-horon': at(35.1, 31.88),
  aijalon: at(35.0, 31.84),
  azekah: at(34.94, 31.7),
  makkedah: at(34.95, 31.62),
  libnah: at(34.87, 31.67),
  lachish: at(34.85, 31.56),
  eglon: at(34.75, 31.5),
  debir: at(34.95, 31.4),
  hazor: at(35.57, 33.02),
  merom: at(35.45, 33.0),
  sidon: at(35.37, 33.56),
  shiloh: at(35.29, 32.06),
  'timnath-serah': at(35.1, 32.02),
  achor: at(35.42, 31.78),
  ebal: at(35.27, 32.23),
  gerizim: at(35.27, 32.2),
  zorah: at(34.97, 31.76),
  bochim: at(35.22, 31.95),
  gilead: at(35.75, 32.2),
  mizpah: at(35.88, 32.4),
  kedesh: at(35.5, 33.11),
  tabor: at(35.39, 32.69),
  ophrah: at(35.3, 32.45),
  timnah: at(34.91, 31.78),
  gaza: at(34.46, 31.5),
  gibeah: at(35.23, 31.82),
  'jabesh-gilead': at(35.66, 32.4),
  'mizpah-benjamin': at(35.21, 31.88),
  'carmel-judah': at(35.13, 31.42),
  ramah: at(35.23, 31.85),
  aphek: at(34.93, 32.1),
  ashdod: at(34.65, 31.75),
  gath: at(34.85, 31.7),
  ekron: at(34.85, 31.78),
  'beth-shemesh': at(34.98, 31.75),
  'kiriath-jearim': at(35.1, 31.8),
  michmash: at(35.28, 31.87),
  geba: at(35.26, 31.85),
  bezek: at(35.4, 32.37),
  elah: at(34.97, 31.69),
  nob: at(35.24, 31.79),
  adullam: at(34.96, 31.65),
  'mizpah-moab': at(35.72, 31.18),
  hereth: at(35.03, 31.58),
  keilah: at(34.99, 31.61),
  ziph: at(35.14, 31.48),
  hachilah: at(35.2, 31.46),
  maon: at(35.11, 31.41),
  engedi: at(35.39, 31.46),
  ziklag: at(34.73, 31.37),
  jezreel: at(35.33, 32.56),
  besor: at(34.5, 31.28),
  shunem: at(35.33, 32.61),
  endor: at(35.39, 32.66),
  gilboa: at(35.4, 32.47),
  bethshan: at(35.5, 32.5),
  rabbah: at(35.93, 31.95),
  'baal-hazor': at(35.27, 31.99),
  geshur: at(35.7, 32.85),
  tyre: at(35.2, 33.27),
  rephaim: at(35.2, 31.75),
  lodebar: at(35.62, 32.6),
  bahurim: at(35.26, 31.8),
  giloh: at(35.08, 31.58),
  gezer: at(34.92, 31.86),
  zobah: at(36.4, 34.1),
  helam: at(36.1, 32.75),
  'abel-beth-maacah': at(35.58, 33.26),
  zelah: at(35.2, 31.83),
  tekoa: at(35.22, 31.63),
};

/** 지도 그림: 바다·강·지역 이름. 한 번만 만든다 */
let base = '';
export function mapArt(): string {
  if (base) return base;
  const sea = [at(29, 36.4), at(31, 36.6), at(33, 36.2), at(34.6, 36.8), at(36.1, 36.6), at(35.8, 35.6), at(35.9, 35.0), at(35.5, 34.1), at(35.1, 33.1), at(34.95, 32.6), at(34.6, 31.8), at(34.25, 31.3), at(33.2, 31.15), at(32.3, 31.25), at(31.6, 31.55), at(30.6, 31.45), at(29.6, 31.15), at(29, 31.0)];
  // 바다는 지도 왼쪽 끝 너머(-300)까지 이어 그린다 (넓은 화면에서 끝이 보이지 않게)
  const seaPath = `M-300 ${at(29, 36.4)[1]} L${sea.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')} L-300 ${at(29, 31)[1]} Z`;
  const line = (pts: [number, number][]) => `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')}`;
  const nile = line([at(31.25, 31.4), at(31.2, 30.6), at(31.25, 30.0), at(31.0, 29.0), at(30.8, 27.8), at(31.3, 26.6), at(32.6, 25.6)]);
  const delta = `${line([at(31.25, 30.6), at(30.4, 31.4)])} ${line([at(31.25, 30.6), at(32.0, 31.35)])}`;
  const euphrates = line([at(38.4, 38), at(38.5, 37.0), at(38.2, 36.3), at(39.5, 35.9), at(40.6, 34.9), at(41.6, 34.4), at(43.0, 33.5), at(44.3, 32.6), at(45.4, 31.8), at(46.4, 30.9), at(47.6, 30.3)]);
  const tigris = line([at(40.2, 38), at(41.8, 37.4), at(42.6, 37.0), at(43.1, 36.3), at(43.6, 35.0), at(44.2, 33.6), at(45.4, 32.6), at(46.6, 31.6), at(47.6, 30.6)]);
  const gulf = `M${at(47.8, 30.4).join(' ')} L${at(48.9, 30.0).join(' ')} L${at(50.5, 29.0).join(' ')} L${at(52, 27).join(' ')} L${at(49, 25).join(' ')} L${at(48.4, 28.6).join(' ')} Z`;
  const redsea = `M${at(32.5, 30.0).join(' ')} L${at(33.6, 28.3).join(' ')} L${at(34.2, 27.8).join(' ')} L${at(34.4, 28.4).join(' ')} L${at(35.0, 29.5).join(' ')} L${at(34.85, 28.0).join(' ')} L${at(36.5, 25).join(' ')} L${at(34.8, 25).join(' ')} L${at(33.4, 27.0).join(' ')} L${at(32.4, 29.4).join(' ')} Z`;
  const jordan = line([at(35.6, 33.2), at(35.6, 32.85), at(35.55, 32.4), at(35.55, 31.78)]);
  const deadSea = at(35.5, 31.5);
  const galilee = at(35.58, 32.83);
  const cyprus = at(33.2, 35.1);
  const label = (txt: string, [x, y]: [number, number], cls = '') => `<text class="map__region ${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${txt}</text>`;
  base = `
    <path class="map__sea" d="${seaPath}"/>
    <ellipse class="map__sea" cx="${cyprus[0]}" cy="${cyprus[1]}" rx="22" ry="6" transform="rotate(-18 ${cyprus[0]} ${cyprus[1]})" style="fill: var(--map-paper-dark)"/>
    <path class="map__sea" d="${gulf}"/><path class="map__sea" d="${redsea}"/>
    <ellipse class="map__sea" cx="${deadSea[0]}" cy="${deadSea[1]}" rx="2.4" ry="7"/>
    <ellipse class="map__sea" cx="${galilee[0]}" cy="${galilee[1]}" rx="1.6" ry="2.4"/>
    <path class="map__river" d="${nile} ${delta}"/>
    <path class="map__river" d="${euphrates}"/><path class="map__river" d="${tigris}"/><path class="map__river" d="${jordan}"/>
    ${label('대해', at(31.6, 33.4), 'is-sea')}
    ${label('메소보다미아', at(41.6, 35.6))}
    ${label('아라비아 광야', at(39.5, 30.6))}
    ${label('애굽', at(29.6, 28.3))}
    ${label('가나안', at(36.2, 31.5))}`;
  return base;
}

export interface TravelSpec {
  from?: PlaceName;
  to: PlaceName;
  via?: PlaceName[];
}

export interface TravelMap {
  el: HTMLElement;
  /** 크기 따라가기를 멈춘다 (같은 지도에 새 길을 그을 때) */
  stop(): void;
  hide(): Promise<void>;
}

/** 지도를 펼치고 길을 긋는다. 이미 펼친 지도가 있으면 그 위에 이어 긋는다 */
export function showTravel(host: HTMLElement, spec: TravelSpec, current?: TravelMap | null): TravelMap {
  const rm = reducedMotion();
  const stops = [spec.from, ...(spec.via ?? []), spec.to].filter((p): p is PlaceName => !!p && p in PLACE_XY);
  const pts = stops.map((p) => PLACE_XY[p]);
  let el = current?.el;
  const fresh = !el;
  if (!el) {
    el = document.createElement('div');
    el.className = 'travel';
    el.setAttribute('aria-hidden', 'true');
    host.append(el);
  }
  // 경로에 맞춰 지도 일부를 확대해서 보여 준다 (가나안 안에서만 움직이면 가까이).
  // 보여 줄 범위는 지도 상자 비율(폰은 세로로 김)에 맞추고, 상자 크기가 바뀌면(아래 카드가 바뀔 때) 다시 맞춘다
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const pad = 40;
  const spanX = Math.max(...xs) - Math.min(...xs) + pad * 2;
  const spanY = Math.max(...ys) - Math.min(...ys) + pad * 2;
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const k = Math.max(130, spanX, spanY) / 400; // 글자·점 크기를 확대에 맞춘다
  const view = () => {
    const ratio = el!.clientWidth && el!.clientHeight ? el!.clientHeight / el!.clientWidth : 260 / 400;
    const w = Math.max(130, spanX, spanY / ratio);
    const h = w * ratio;
    return `${(cx - w / 2).toFixed(1)} ${(cy - h / 2).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`;
  };
  // 이름표가 서로 겹치면 덜 중요한 쪽(경유지)은 점만 찍는다. 도착지 → 출발지 → 경유지 순으로 자리를 잡는다
  const placed: [number, number][] = [];
  const labelled = new Set<number>();
  for (const i of [stops.length - 1, 0, ...stops.map((_, n) => n).slice(1, -1)]) {
    const [x, y] = PLACE_XY[stops[i]];
    if (placed.some(([px, py]) => Math.abs(px - x) < 40 * k && Math.abs(py - y) < 12 * k)) continue;
    placed.push([x, y]);
    labelled.add(i);
  }
  const d = pts.length > 1
    ? pts.map(([x, y], i) => {
        if (!i) return `M${x.toFixed(1)} ${y.toFixed(1)}`;
        const [px, py] = pts[i - 1];
        // 살짝 굽은 길 (직선보다 걸어간 길처럼)
        const mx = (px + x) / 2 + (y - py) * 0.12, my = (py + y) / 2 - (x - px) * 0.12;
        return `Q${mx.toFixed(1)} ${my.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
      }).join(' ')
    : '';
  el.innerHTML = `
    <svg class="travel__map" viewBox="${view()}" preserveAspectRatio="xMidYMid meet" style="--k:${k.toFixed(3)}">
      <rect class="map__paper" x="-200" y="-200" width="800" height="700"/>
      ${mapArt()}
      ${d ? `<path class="travel__route-shadow" d="${d}"/><path class="travel__route" d="${d}" pathLength="1"/>` : ''}
      ${stops.map((p, i) => {
        const [x, y] = PLACE_XY[p];
        const last = i === stops.length - 1;
        return `<g class="travel__stop${last ? ' is-last' : ''}" style="--i:${i}">
          <circle class="travel__dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(last ? 2.6 : 1.8) * k}"/>
          ${last ? `<circle class="travel__ring" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${6 * k}"/>` : ''}
          ${labelled.has(i) ? `<text class="travel__name" x="${(x + 5 * k).toFixed(1)}" y="${(y - 4 * k).toFixed(1)}" style="font-size:${(9 * k).toFixed(2)}px">${PLACE_NAMES[p]}</text>${PLACE_NOTES[p] ? `<text class="travel__note" x="${(x + 5 * k).toFixed(1)}" y="${(y + 5 * k).toFixed(1)}" style="font-size:${(6 * k).toFixed(2)}px">${PLACE_NOTES[p]}</text>` : ''}` : ''}
        </g>`;
      }).join('')}
      ${d ? `<circle class="travel__walker" r="${2.2 * k}"><animateMotion dur="${rm ? '0.01s' : '2.6s'}" fill="freeze" path="${d}" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.3 1"/></circle>` : ''}
    </svg>`;
  const svg = el.querySelector('svg')!;
  const ro = new ResizeObserver(() => svg.setAttribute('viewBox', view()));
  ro.observe(el);
  current?.stop();
  const route = el.querySelector('.travel__route');
  const tl = gsap.timeline();
  if (fresh) tl.fromTo(el, { opacity: 0, scale: rm ? 1 : 0.96, rotate: rm ? 0 : -1.2 }, { opacity: 1, scale: 1, rotate: 0, duration: rm ? 0.3 : 0.9, ease: 'expo.out' });
  if (route) tl.fromTo(route, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: rm ? 0.01 : 2.6, ease: 'power2.inOut' }, rm ? 0 : 0.3);
  tl.fromTo(el.querySelectorAll('.travel__stop'), { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: rm ? 0 : 2.4 / Math.max(1, stops.length - 1) }, rm ? 0 : 0.2);

  return {
    el,
    stop: () => ro.disconnect(),
    async hide() {
      ro.disconnect();
      tl.kill();
      await gsap.to(el!, { opacity: 0, scale: rm ? 1 : 0.98, duration: rm ? 0.2 : 0.6, ease: 'power2.in' });
      el!.remove();
    },
  };
}
