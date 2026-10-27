// 인물 도감 (#/people, #/people/adam). 지금까지 만난 인물 카드를 막별로 모아 본다.
// 카드를 누르면 패널: 큰 실루엣 + 한 줄 소개(친구 말투) + 핵심 구절 카드 + 처음 만난 장면 다시 보기.
// 아직 못 만난 인물은 그림자만 보이고 이름은 "???".
import gsap from 'gsap';
import type { Params, Screen } from '../engine/router';
import { go } from '../engine/router';
import { ACTS } from '../engine/acts';
import { CODEX, codexEntry, hasMet, type CodexEntry } from '../engine/codex';
import { loadContent } from '../engine/content';
import { reducedMotion } from '../engine/settings';
import { loadCharacter } from '../characters';
import { setFieldMode } from '../fx/particles';
import { icons } from '../ui/icons';
import { personCard } from '../ui/person-card';
import { revealScripture, scriptureCard } from '../ui/scripture-card';
import { openSettings } from '../ui/settings-sheet';
import { openSheetPanel } from '../ui/sheet';
import { silhouetteSvg } from '../ui/silhouette';

export function peopleScreen({ id }: Params): Screen {
  const el = document.createElement('section');
  el.className = 'screen people';
  el.dataset.act = '1';
  el.innerHTML = `
    <header class="people__head">
      <button class="icon-btn" data-back aria-label="지도로 가기">${icons.back}</button>
      <div class="people__heading">
        <h1>인물 도감</h1>
        <p class="ui people__count"></p>
      </div>
      <button class="icon-btn" data-settings aria-label="설정">${icons.settings}</button>
    </header>
    <div class="people__scroll">
      <div class="people__body"></div>
      <p class="people__foot ui">이야기를 따라가면 카드가 하나씩 채워짐</p>
    </div>`;

  const $ = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
  let alive = true;

  async function build() {
    const met = CODEX.filter((e) => hasMet(e.id)).length;
    $('.people__count').textContent = `만난 사람 ${met} / ${CODEX.length}`;
    const body = $('.people__body');
    const acts = [...new Set(CODEX.map((e) => e.act))].sort((a, b) => a - b);
    for (const no of acts) {
      const act = ACTS[no - 1];
      const sec = document.createElement('section');
      sec.className = 'people__act';
      sec.dataset.act = String(no);
      sec.innerHTML = `
        <header class="people__act-head">
          <span class="latin">${act.numeral}</span>
          <h2>${act.title}</h2>
          <span class="ui">${act.range}</span>
        </header>
        <div class="pcards"></div>`;
      const grid = sec.querySelector('.pcards')!;
      for (const e of CODEX.filter((x) => x.act === no)) {
        const card = await personCard(e, hasMet(e.id)).catch(() => null);
        if (!card) continue;
        if (hasMet(e.id)) card.addEventListener('click', () => void openPerson(e));
        else card.disabled = true;
        grid.append(card);
      }
      body.append(sec);
    }
    if (!alive) return;
    const rm = reducedMotion();
    gsap.fromTo(el.querySelectorAll('.people__act-head, .pcard'), { opacity: 0, y: rm ? 0 : 16 }, { opacity: 1, y: 0, duration: rm ? 0.3 : 0.8, ease: 'expo.out', stagger: rm ? 0 : 0.05 });
  }

  /** 카드 한 장 크게: 실루엣 + 소개 + 핵심 구절 */
  async function openPerson(e: CodexEntry) {
    const def = await loadCharacter(e.id);
    const act = ACTS[e.act - 1];
    const sheet = openSheetPanel(def.name, `${act.numeral} · ${act.title}`);
    sheet.el.dataset.act = String(e.act);
    sheet.el.classList.add('sheet--person');
    let sceneTitle = '';
    if (e.scene) sceneTitle = (await loadContent<{ title: string }>('scene', e.scene).catch(() => null))?.title ?? '';
    sheet.body.innerHTML = `
      <div class="person__art sil" aria-hidden="true">${silhouetteSvg(def)}</div>
      <p class="person__first ui">처음 나오는 곳 · ${e.first.replace('-', '–')}</p>
      <p class="person__intro voice-talk"></p>
      <p class="setting__label">핵심 구절</p>
      <div class="person__verse"></div>
      ${e.scene && sceneTitle ? `<button class="btn person__scene" data-scene="${e.scene}"><span class="stop__kind stop__kind--scene">플레이</span>${sceneTitle} 다시 보기</button>` : ''}`;
    sheet.body.querySelector('.person__intro')!.textContent = e.intro;
    sheet.body.querySelector<HTMLButtonElement>('[data-scene]')?.addEventListener('click', (ev) => go(`/scene/${e.scene}`, { x: ev.clientX, y: ev.clientY }));
    const rm = reducedMotion();
    gsap.fromTo(sheet.body.querySelector('.person__art'), { opacity: 0, y: rm ? 0 : 14 }, { opacity: 1, y: 0, duration: rm ? 0.3 : 1.2, ease: 'expo.out', delay: 0.15 });
    try {
      const card = await scriptureCard(e.verse, { gloss: e.gloss });
      if (!sheet.el.isConnected) return;
      sheet.body.querySelector('.person__verse')!.append(card);
      revealScripture(card, 0.3);
    } catch (err) {
      console.warn(err);
    }
  }

  return {
    el,
    enter() {
      setFieldMode('stars');
      $('[data-back]').addEventListener('click', () => go('/map'));
      $('[data-settings]').addEventListener('click', () => openSettings());
      void build().then(() => {
        // #/people/adam 으로 들어오면 그 카드를 바로 연다 (막 피날레의 카드에서)
        const e = id ? codexEntry(id) : undefined;
        if (alive && e && hasMet(e.id)) void openPerson(e);
      });
    },
    leave() {
      alive = false;
    },
  };
}
