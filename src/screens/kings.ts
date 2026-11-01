// 왕 카드 모음 (#/kings) — 9막 분열 왕국의 왕 39명을 두 줄(북이스라엘 · 남유다)로 나란히.
// 9막 에피소드의 두 왕국 판(fx/kingdoms.ts)에서 본 왕은 카드가 펼쳐지고, 아직 못 본 왕은 번호만 보이는 빈 카드.
// 맨 위: 같은 시간 축 위의 두 줄 (북은 722에서 끊기고 남은 586까지). 맨 아래: 헷갈리는 같은 이름 왕들.
import gsap from 'gsap';
import type { Screen } from '../engine/router';
import { go } from '../engine/router';
import { ISRAEL, JUDAH, KINGS, REALM, VERDICT_LABEL, type King, type Kingdom } from '../engine/kings';
import { kingMet } from '../engine/progress';
import { reducedMotion } from '../engine/settings';
import { kingCard, showKings } from '../fx/kingdoms';
import { setFieldMode } from '../fx/particles';
import { icons } from '../ui/icons';
import { openSettings } from '../ui/settings-sheet';

const LISTS: Record<Kingdom, King[]> = { israel: ISRAEL, judah: JUDAH };
/** 같은 이름 다른 왕 (헷갈리기 쉬운 것) */
const TWINS: [string, string][] = [
  ['jehoram-israel', 'jehoram-judah'],
  ['ahaziah-israel', 'ahaziah-judah'],
  ['jehoash-israel', 'joash-judah'],
  ['jehoahaz-israel', 'jehoahaz-judah'],
  ['jeroboam', 'jeroboam-ii'],
];

export function kingsScreen(): Screen {
  const el = document.createElement('section');
  el.className = 'screen people kings';
  el.dataset.act = '9';
  el.innerHTML = `
    <header class="people__head">
      <button class="icon-btn" data-back aria-label="뒤로">${icons.back}</button>
      <div class="people__heading">
        <h1>왕 카드</h1>
        <p class="ui people__count"></p>
      </div>
      <button class="icon-btn" data-settings aria-label="설정">${icons.settings}</button>
    </header>
    <div class="people__scroll">
      <div class="kings__body">
        <p class="kings__lead voice-talk">나라가 둘로 갈라진 뒤 (왕상 12) 왕이 39명이나 나옴. 열왕기는 왕마다 딱 한 줄로 성적표를 매김. <b class="kv-evil">여호와 보시기에 악을 행하여</b> 아니면 <b class="kv-right">정직히 행하여</b>. 북쪽은 정직 판정 받은 왕이 한 명도 없음.</p>
        <div class="kings__time"></div>
        <div class="kings__cols">
          <section class="kings__col" data-k="israel"><h2>${REALM.israel.name}<small>${ISRAEL.length}명 · ${REALM.israel.end.by}에 무너짐 (${REALM.israel.end.ref})</small></h2><div class="kings__list"></div></section>
          <section class="kings__col" data-k="judah"><h2>${REALM.judah.name}<small>${JUDAH.length}명 · ${REALM.judah.end.by}에 무너짐 (${REALM.judah.end.ref})</small></h2><div class="kings__list"></div></section>
        </div>
        <section class="kings__twins">
          <h2>이름 같은 왕 주의</h2>
          <ul></ul>
        </section>
      </div>
      <p class="people__foot ui">9막 이야기를 따라가면 카드가 하나씩 채워짐</p>
    </div>`;
  const $ = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;

  function build() {
    const met = KINGS.filter((k) => kingMet(k.id));
    $('.people__count').textContent = `만난 왕 ${met.length} / ${KINGS.length}`;
    // 시간 줄: 두 왕국 판을 작게, 본 왕만 켜서
    const time = $('.kings__time');
    const board = showKings(time, met.map((k) => k.id), null, { gallery: true });
    board.el.classList.add('kingdoms--static');
    for (const kd of ['israel', 'judah'] as Kingdom[]) {
      const list = el.querySelector(`.kings__col[data-k="${kd}"] .kings__list`)!;
      LISTS[kd].forEach((k, i) => {
        if (kingMet(k.id)) {
          list.insertAdjacentHTML('beforeend', kingCard(k, { no: i + 1 }));
          const card = list.lastElementChild as HTMLElement;
          card.classList.add('is-top');
          card.insertAdjacentHTML('beforeend', `<span class="kd-card__note voice-talk">${k.note}</span>`);
        } else {
          list.insertAdjacentHTML('beforeend', `<div class="kd-card is-top is-locked" data-v="none"><span class="kd-card__no">${i + 1}</span><b class="kd-card__name">???</b><span class="kd-card__meta">${REALM[kd].short}쪽 ${i + 1}번째 왕</span></div>`);
        }
      });
    }
    const ul = $('.kings__twins ul');
    for (const [a, b] of TWINS) {
      const A = KINGS.find((k) => k.id === a)!, B = KINGS.find((k) => k.id === b)!;
      const name = (k: King) => (kingMet(k.id) ? `${k.name} (${REALM[k.kingdom].short} · ${k.reign} · ${VERDICT_LABEL[k.verdict]})` : `??? (${REALM[k.kingdom].short})`);
      ul.insertAdjacentHTML('beforeend', `<li>${name(A)} <span>↔</span> ${name(B)}</li>`);
    }
    const rm = reducedMotion();
    gsap.fromTo(el.querySelectorAll('.kings__col .kd-card'), { opacity: 0, y: rm ? 0 : 12 }, { opacity: 1, y: 0, duration: rm ? 0.3 : 0.7, ease: 'expo.out', stagger: rm ? 0 : 0.03 });
  }

  return {
    el,
    enter() {
      setFieldMode('stars');
      $('[data-back]').addEventListener('click', () => (history.length > 1 ? history.back() : go('/map')));
      $('[data-settings]').addEventListener('click', () => openSettings());
      build();
    },
  };
}
