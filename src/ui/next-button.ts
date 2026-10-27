// 장면·읽기 끝 카드의 "다음" 버튼. 본문 순서로 바로 다음 것을 보여 준다.
import type { ContentItem } from '../engine/content';
import { go } from '../engine/router';

export function nextButton(next: ContentItem): string {
  const kind = next.kind === 'scene' ? '플레이' : '읽기';
  return `<button class="btn btn--primary btn--next" data-go-next="${next.path}">
    <span class="btn--next__eyebrow ui">다음 · ${kind}</span>
    <span class="btn--next__title">${next.title}</span>
  </button>`;
}

export function bindNext(root: HTMLElement): void {
  const b = root.querySelector<HTMLButtonElement>('[data-go-next]');
  b?.addEventListener('click', (e) => go(b.dataset.goNext!, { x: e.clientX, y: e.clientY }));
}
