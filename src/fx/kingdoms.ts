// 9막 — 두 왕국 판 (beat 필드 "kings", 데이터 engine/kings.ts).
// 화면을 반으로 갈라 왼쪽은 북이스라엘, 오른쪽은 남유다. 가운데에 금 간 틈.
//  - 왕이 바뀔 때마다 그 나라 쪽에 왕 카드가 위에서 내려와 쌓인다. 카드에는 이름 · 재위 · 본문 평가(도장처럼 찍힘).
//      악을 행함 = 식은 붉은 잉크 / 정직히 행함 = 금빛 / 섞여 있음 = 반반 / 평가 없음 = 빈 테두리
//  - 아래 시간 줄: 두 나라의 왕들이 같은 시간 축(주전 931 → 586)에 점으로 놓인다. 아직 안 온 왕은 희미한 점.
//    북쪽 줄은 722에서 끊기고, 남쪽 줄만 586까지 이어진다 → 누가 먼저 무너지는지 한눈에.
//  - { "fall": "israel" } : 북쪽 카드들이 잿빛으로 식고 금이 가며 가라앉음 + "앗수르 · 왕하 17:6". 이후 북쪽 칸은 꺼진 채 남는다
//  - 다음 beat에 kings가 없으면 판은 오른쪽 위 작은 표(북 · 남 지금 왕)로 물러나 에피소드 내내 남는다.
// 처음 본 왕은 저장 (progress.kings) → 왕 카드 모음 화면 #/kings.
import { reducedMotion } from '../engine/settings';
import { ISRAEL, JUDAH, KING_BY_ID, REALM, TIME_FROM, TIME_TO, VERDICT_LABEL, type King, type Kingdom, type KingsSpec } from '../engine/kings';
import { meetKings } from '../engine/progress';

export interface KingsBoard {
  el: HTMLElement;
  big(on: boolean): void;
}

const LISTS: Record<Kingdom, King[]> = { israel: ISRAEL, judah: JUDAH };
const f = (n: number) => n.toFixed(2);
/** 시간 축 위치 0~1 */
const tx = (year: number) => (TIME_FROM - year) / (TIME_FROM - TIME_TO);

/** 왕 카드 한 장 (모음 화면에서도 씀) */
export function kingCard(k: King, opts: { no?: number; fresh?: boolean } = {}): string {
  const meta = [`${k.reign}`, k.age != null ? `${k.age}세 즉위` : ''].filter(Boolean).join(' · ');
  return `<div class="kd-card${opts.fresh ? ' is-new' : ''}" data-v="${k.verdict}" data-id="${k.id}">
    <span class="kd-card__no">${opts.no ?? ''}</span>
    <b class="kd-card__name">${k.name}</b>
    <span class="kd-card__meta">${meta}</span>
    <span class="kd-card__stamp"><i class="kd-card__seal" aria-hidden="true"></i><span>${VERDICT_LABEL[k.verdict]}</span></span>
    <q class="kd-card__quote">${k.quote}</q>
    <span class="kd-card__ref">${k.ref}</span>
  </div>`;
}

function timeline(): string {
  const row = (list: King[], y: number, kd: Kingdom) => {
    const end = tx(REALM[kd].end.year);
    const dots = list.map((k) => `<circle class="kd-pip" data-id="${k.id}" data-v="${k.verdict}" cx="${f(4 + tx(k.year) * 92)}" cy="${y}" r="1.25"/>`).join('');
    return `<g class="kd-row" data-k="${kd}">
      <line class="kd-row__ghost" x1="4" y1="${y}" x2="${f(4 + end * 92)}" y2="${y}"/>
      <line class="kd-row__run" x1="4" y1="${y}" x2="4" y2="${y}"/>
      ${dots}
      <g class="kd-row__end" transform="translate(${f(4 + end * 92)} ${y})">
        <path d="M-1.4 -1.4 L1.4 1.4 M1.4 -1.4 L-1.4 1.4"/>
        <text x="0" y="${y < 6 ? -2.6 : 4.6}" text-anchor="middle">${REALM[kd].end.year}</text>
      </g>
      <text class="kd-row__name" x="0.6" y="${f(y + 1)}" text-anchor="end">${REALM[kd].short}</text>
    </g>`;
  };
  return `<svg class="kd__time" viewBox="-4 -2 104 12" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    ${row(ISRAEL, 2.6, 'israel')}${row(JUDAH, 7.4, 'judah')}
    <text class="kd__era" x="4" y="11.6">주전 931</text>
  </svg>`;
}

function markup(): string {
  const col = (kd: Kingdom) => `<div class="kd__col" data-k="${kd}">
      <header class="kd__head"><b>${REALM[kd].name}</b><small>${REALM[kd].capital}</small></header>
      <div class="kd__stack"></div>
      <p class="kd__end"><b>무너짐</b><span>${REALM[kd].end.by} · ${REALM[kd].end.ref}</span></p>
    </div>`;
  return `<div class="kd__board">${col('israel')}<i class="kd__rift" aria-hidden="true"></i>${col('judah')}</div>
    ${timeline()}
    <div class="kd__mini" aria-hidden="true">
      <p data-k="israel"><span class="kd__mini-k">북</span><i class="kd__dot"></i><b></b></p>
      <p data-k="judah"><span class="kd__mini-k">남</span><i class="kd__dot"></i><b></b></p>
    </div>`;
}

function parse(spec: KingsSpec): { add: string[]; fall?: Kingdom } {
  if (typeof spec === 'string') return { add: [spec] };
  if (Array.isArray(spec)) return { add: spec };
  return { add: spec.add == null ? [] : [spec.add].flat(), fall: spec.fall };
}

/** 판을 펴고(없으면 만들고) 이번 왕들을 쌓는다 */
export function showKings(host: HTMLElement, spec: KingsSpec, current?: KingsBoard | null, opts: { gallery?: boolean } = {}): KingsBoard {
  const rm = reducedMotion();
  let el = current?.el;
  if (!el || !el.isConnected) {
    el = document.createElement('div');
    el.className = 'kingdoms';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = markup();
    host.append(el);
  }
  const box = el;
  if (rm) box.classList.add('is-rm');
  const { add, fall } = parse(spec);
  const adds = add.map((id) => KING_BY_ID[id]).filter(Boolean);
  // 이번 왕들보다 앞선 왕들은 이미 쌓여 있다: 같은 나라는 목록에서 앞선 왕, 다른 나라는 즉위가 더 이른 왕
  // (연도는 주전 = 숫자가 클수록 옛날. latest = 이번 왕들 중 가장 늦게 즉위한 해)
  const latest = Math.min(...adds.map((k) => k.year), Infinity);
  const have = new Set((box.dataset.have ?? '').split(' ').filter(Boolean));
  const pre: King[] = [];
  for (const kd of ['israel', 'judah'] as Kingdom[]) {
    const mine = adds.filter((k) => k.kingdom === kd);
    const upto = mine.length ? Math.min(...mine.map((k) => LISTS[kd].indexOf(k))) : -1;
    LISTS[kd].forEach((k, i) => {
      if (opts.gallery || have.has(k.id) || adds.includes(k)) return;
      if (mine.length ? i < upto : adds.length > 0 && k.year > latest) pre.push(k);
    });
  }
  const putCard = (k: King, fresh: boolean) => {
    const stack = box.querySelector(`.kd__col[data-k="${k.kingdom}"] .kd__stack`)!;
    stack.insertAdjacentHTML('beforeend', kingCard(k, { no: LISTS[k.kingdom].indexOf(k) + 1, fresh: fresh && !rm }));
    have.add(k.id);
  };
  for (const k of pre) putCard(k, false);
  for (const k of adds) if (!have.has(k.id)) putCard(k, !opts.gallery);
  box.dataset.have = [...have].join(' ');
  // 북이 무너진 뒤의 장면: 722년 뒤의 유다 왕이 있으면 북쪽은 처음부터 꺼져 있다
  const judahAfter = [...have].some((id) => KING_BY_ID[id]?.kingdom === 'judah' && KING_BY_ID[id].year < REALM.israel.end.year);
  if (judahAfter && !box.classList.contains('fell-israel')) box.classList.add('fell-israel', 'was-fallen');
  if (opts.gallery && have.has('zedekiah')) box.classList.add('fell-judah', 'was-fallen');
  if (fall) {
    box.classList.remove(`fell-${fall}`);
    void box.offsetWidth;
    box.classList.add(`fell-${fall}`);
    box.classList.remove('was-fallen');
  }
  refresh(box, have);
  if (!opts.gallery) meetKings([...have]);
  const board: KingsBoard = {
    el: box,
    big(on) {
      box.classList.toggle('is-big', on);
    },
  };
  board.big(true);
  return board;
}

/** 쌓인 카드 깊이, 시간 줄, 작은 표 */
function refresh(box: HTMLElement, have: Set<string>): void {
  for (const kd of ['israel', 'judah'] as Kingdom[]) {
    const cards = [...box.querySelectorAll<HTMLElement>(`.kd__col[data-k="${kd}"] .kd-card`)];
    // 본문 순서대로 정렬 (늦게 끼어든 앞선 왕이 위로 오지 않게)
    cards.sort((a, b) => LISTS[kd].findIndex((k) => k.id === a.dataset.id) - LISTS[kd].findIndex((k) => k.id === b.dataset.id));
    const stack = box.querySelector(`.kd__col[data-k="${kd}"] .kd__stack`)!;
    cards.forEach((c, i) => {
      stack.append(c);
      const depth = cards.length - 1 - i;
      c.style.setProperty('--d', String(Math.min(depth, 5)));
      c.classList.toggle('is-top', depth === 0);
      c.classList.toggle('is-gone', depth > 4);
    });
    const top = cards.at(-1);
    const mini = box.querySelector<HTMLElement>(`.kd__mini p[data-k="${kd}"]`)!;
    mini.querySelector('b')!.textContent = top ? (KING_BY_ID[top.dataset.id!]?.name ?? '') : '—';
    mini.dataset.v = top?.dataset.v ?? '';
    // 시간 줄
    let last = TIME_FROM;
    for (const k of LISTS[kd]) {
      const pip = box.querySelector<SVGCircleElement>(`.kd-pip[data-id="${k.id}"]`)!;
      const on = have.has(k.id);
      pip.classList.toggle('is-on', on);
      pip.classList.toggle('is-now', on && top?.dataset.id === k.id);
      if (on) last = Math.min(last, k.year);
    }
    const fell = box.classList.contains(`fell-${kd}`);
    const run = box.querySelector<SVGLineElement>(`.kd-row[data-k="${kd}"] .kd-row__run`)!;
    run.setAttribute('x2', f(4 + (fell ? tx(REALM[kd].end.year) : tx(last)) * 92));
  }
}
