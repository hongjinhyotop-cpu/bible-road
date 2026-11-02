// 족보 가계도 판 (beat 필드 "lineage", engine/lineage.ts).
// 어두운 판 가운데로 금빛 줄기 하나가 내려가고, 이름이 마디마다 하나씩 돋아난다. 중요한 이름(mark)은 크게 빛나고,
// 형제·아들들(branch)은 옆으로 작은 잔가지. 오래된 마디는 위로 밀려 흐려진다 → "아담에서 여기까지" 이어진 시간의 길이.
import { reducedMotion } from '../engine/settings';
import type { LineageSpec } from '../engine/lineage';

export interface LineageBoard {
  el: HTMLElement;
  big(on: boolean): void;
}

const KEEP = 13;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export function showLineage(host: HTMLElement, spec: LineageSpec, current?: LineageBoard | null): LineageBoard {
  const rm = reducedMotion();
  let el = current?.el;
  if (!el || !el.isConnected) {
    el = document.createElement('div');
    el.className = 'lineage';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `<div class="lg__head"><b class="lg__title"></b><span class="lg__ref"></span></div>
      <div class="lg__view"><ol class="lg__trunk"></ol></div>
      <div class="lg__mini"><i></i><span></span></div>`;
    host.append(el);
  }
  const box = el;
  if (rm) box.classList.add('is-rm');
  const trunk = box.querySelector<HTMLOListElement>('.lg__trunk')!;
  if (spec.fresh) trunk.innerHTML = '';
  if (spec.title != null) box.querySelector('.lg__title')!.textContent = spec.title;
  box.querySelector('.lg__ref')!.textContent = spec.ref ?? '';
  trunk.querySelectorAll('.lg__node.is-new').forEach((n) => n.classList.remove('is-new'));
  const mark = new Set(spec.mark ?? []);
  const names = spec.names ?? [];
  // 줄기 자체에 없는 이름이 mark/branch에만 있으면, 이미 있는 마디를 밝히거나 가지를 붙인다
  const existing = new Map([...trunk.querySelectorAll<HTMLElement>('.lg__node')].map((n) => [n.dataset.name!, n]));
  names.forEach((name, i) => {
    const li = document.createElement('li');
    li.className = 'lg__node is-new';
    li.dataset.name = name;
    li.style.setProperty('--k', String(i));
    li.innerHTML = `<span class="lg__dot"></span><span class="lg__name">${esc(name)}</span>`;
    trunk.append(li);
    existing.set(name, li);
  });
  for (const [name, n] of existing) if (mark.has(name)) n.classList.add('is-mark');
  for (const [name, kids] of Object.entries(spec.branch ?? {})) {
    const n = existing.get(name);
    if (!n || n.querySelector('.lg__twigs')) continue;
    n.insertAdjacentHTML('beforeend', `<span class="lg__twigs">${kids.map((k) => `<em>${esc(k)}</em>`).join('')}</span>`);
  }
  // 오래된 마디는 위로 밀려 흐려지고, 너무 오래되면 접힘
  const all = [...trunk.querySelectorAll<HTMLElement>('.lg__node')];
  all.forEach((n, i) => {
    const age = all.length - 1 - i;
    n.classList.toggle('is-old', age >= KEEP - 3);
    n.classList.toggle('is-gone', age >= KEEP);
  });
  const last = all.at(-1)?.dataset.name ?? '';
  box.querySelector('.lg__mini span')!.textContent = `${box.querySelector('.lg__title')!.textContent || '족보'} · ${last}`;
  box.style.setProperty('--n', String(Math.min(all.length, KEEP)));
  // 이름이 적으면 판 가운데에, 많으면 아래에 붙여 오래된 이름이 위로 밀려 흐려지게
  box.classList.toggle('is-few', all.filter((n) => !n.classList.contains('is-gone')).length <= 9);
  const board: LineageBoard = { el: box, big: (on) => box.classList.toggle('is-big', on) };
  board.big(true);
  return board;
}

/** 글 없는 lineage beat를 보여 줄 시간(초) */
export function lineageHold(spec: LineageSpec): number {
  return Math.min(8, 1.6 + (spec.names?.length ?? 0) * 0.35);
}
