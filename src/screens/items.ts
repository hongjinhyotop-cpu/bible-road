// 숨은 확인용 화면 #/items, #/items/ark — 성막 기구 라이브러리(fx/tabernacle.ts)를 하나씩 띄워 본다.
// 지도에는 연결하지 않는다 (그림을 고칠 때 눈으로 확인하는 용도). 막 색·인물 수를 바꿔 볼 수 있다.
import type { Params, Screen } from '../engine/router';
import { ITEMS, isItem, type ItemName } from '../engine/items';
import { moodOf } from '../engine/moods';
import { backdropSvg, fitBackdrops } from '../fx/backdrop';
import { createItemLayer, setItem } from '../fx/tabernacle';
import { loadCharacter } from '../characters';
import { person } from '../characters/_kit.ts';
import { Actor, Stage } from '../ui/actor';

const IDS = Object.keys(ITEMS) as ItemName[];

export function itemsScreen({ id }: Params): Screen {
  const el = document.createElement('section');
  el.className = 'screen play';
  el.dataset.act = '4';
  el.dataset.light = '1';
  el.dataset.land = '1';
  el.innerHTML = `
    <div class="play__sky" aria-hidden="true"></div>
    <div class="play__halo" aria-hidden="true"></div>
    <div class="scene">
      <div class="scene__backdrop" aria-hidden="true"></div>
      <svg class="scene__land" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
        <path class="far" d="M0 70 C60 40 110 62 170 48 C240 30 300 58 400 40 L400 120 L0 120 Z"/>
        <path class="near" d="M0 92 C80 78 150 96 220 86 C290 76 340 92 400 84 L400 120 L0 120 Z"/>
      </svg>
      <div class="scene__stage"></div>
    </div>
    <div class="dock"><div class="textbox ui" style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;font-size:12px"></div></div>`;
  const box = el.querySelector<HTMLElement>('.textbox')!;
  const backdrop = el.querySelector<HTMLElement>('.scene__backdrop')!;
  const layer = createItemLayer();
  el.querySelector('.scene__stage')!.after(layer);
  const stage = new Stage();
  el.querySelector('.scene__stage')!.append(stage.el);
  const cast: (() => Promise<Actor>)[] = [
    async () => new Actor(await loadCharacter('moses')),
    async () => new Actor(await loadCharacter('aaron')),
    async () => new Actor(person({ id: 'bezalel', name: '브살렐', base: 'man', hair: 'short', beard: 'short', tint: 'blue' })),
  ];
  let count = 0;

  const show = (next: string | null) => {
    setItem(el, layer, next);
    history.replaceState(null, '', `#/items${next ? `/${next}` : ''}`);
  };
  const setBg = (name: string) => {
    const art = moodOf(name).art;
    backdrop.innerHTML = art ? backdropSvg(art) : '';
    fitBackdrops(backdrop);
  };
  async function people(n: number) {
    count = n;
    for (const a of [...stage.actors.keys()]) void stage.remove(a);
    for (let i = 0; i < n; i++) stage.add(await cast[i]());
  }

  const btn = (label: string, on: () => void) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.style.cssText = 'min-height:32px;padding:4px 10px;font-size:12px';
    b.textContent = label;
    b.addEventListener('click', on);
    box.append(b);
  };
  IDS.forEach((k) => btn(k, () => show(k)));
  btn('없음', () => show(null));
  btn('인물 0~3', () => void people((count + 1) % 4));
  btn('막 색', () => {
    el.dataset.act = String((+el.dataset.act! % 14) + 1);
  });
  btn('배경', () => setBg(backdrop.dataset.bg = backdrop.dataset.bg === 'tent' ? 'mountain' : 'tent'));

  return {
    el,
    enter() {
      setBg('mountain');
      void people(2);
      setTimeout(() => show(isItem(id) ? id : 'ark'), 300);
    },
    leave() {
      stage.destroy();
    },
  };
}
