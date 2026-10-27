// 인물 카드 한 장 (도감·막 피날레). 막 색 바탕에 역광 실루엣 + 이름 + 핵심 구절 자리.
// 아직 못 만난 인물은 검은 그림자만 보이고 이름은 "???" (어디서 만나는지만 살짝).
import { loadCharacter } from '../characters';
import type { CodexEntry } from '../engine/codex';
import { silhouetteSvg } from './silhouette';

export async function personCard(entry: CodexEntry, met: boolean): Promise<HTMLButtonElement> {
  const def = await loadCharacter(entry.id);
  const b = document.createElement('button');
  b.className = `pcard${met ? '' : ' is-unknown'}`;
  b.dataset.act = String(entry.act);
  b.dataset.id = entry.id;
  b.setAttribute('aria-label', met ? `${def.name} 카드 열기` : `아직 못 만난 인물 (${entry.first.replace('-', '–')} 즈음)`);
  b.innerHTML = `
    <span class="pcard__light" aria-hidden="true"></span>
    <span class="pcard__art sil" aria-hidden="true">${silhouetteSvg(def)}</span>
    <span class="pcard__name"></span>
    <span class="pcard__ref ui"></span>`;
  b.querySelector('.pcard__name')!.textContent = met ? def.name : '???';
  b.querySelector('.pcard__ref')!.textContent = met ? entry.verse : `${entry.first.replace(/:.*/, '장')}쯤`;
  return b;
}
