// 장면·읽기 끝 카드의 "다음" 버튼. 본문 순서로 바로 다음 것을 보여 준다.
import type { ContentItem } from '../engine/content';
import { go } from '../engine/router';

/** bridge = 다음 이야기로 넘어가는 한 줄 (장면·읽기 파일의 "bridge"). 버튼 위에 이야기 목소리로 놓인다 */
export function nextButton(next: ContentItem, bridge?: string): string {
  const kind = next.kind === 'scene' ? '플레이' : '읽기';
  const line = bridge ? `<p class="next-bridge voice-story">${escape(bridge)}</p>` : '';
  return `${line}<button class="btn btn--primary btn--next" data-go-next="${next.path}">
    <span class="btn--next__eyebrow ui">다음 · ${kind}</span>
    <span class="btn--next__title">${next.title}</span>
  </button>`;
}

/** 막을 다 끝냈을 때: "다음" 대신 막 피날레로 (피날레가 끝나면 지도에서 별이 켜진다) */
export function finaleButton(act: { no: number; numeral: string; title: string }): string {
  return `<p class="next-bridge voice-story">여기까지가 한 막이다. 길 위에 ${act.no === 1 ? '첫 번째' : '또 하나의'} 별이 켜질 차례다.</p>
  <button class="btn btn--primary btn--next btn--finale" data-go-next="/finale/${act.no}">
    <span class="btn--next__eyebrow ui">제${act.no}막 끝 · 피날레</span>
    <span class="btn--next__title">${act.title}, 그 마지막 장면</span>
  </button>`;
}

function escape(t: string): string {
  return t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
}

export function bindNext(root: HTMLElement): void {
  const b = root.querySelector<HTMLButtonElement>('[data-go-next]');
  b?.addEventListener('click', (e) => go(b.dataset.goNext!, { x: e.clientX, y: e.clientY }));
}
