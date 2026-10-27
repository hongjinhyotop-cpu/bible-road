import { Store } from './store';

export interface Progress {
  /** 끝낸 장. 키는 "GEN:1" 형식 */
  chapters: Record<string, true>;
  /** 마지막으로 머문 곳 (이어하기) */
  last: string | null;
  startedAt: number | null;
}

export const progress = new Store<Progress>('progress', {
  chapters: {},
  last: null,
  startedAt: null,
});

export function chapterDone(book: string, chapter: number): boolean {
  return !!progress.get().chapters[`${book}:${chapter}`];
}

export function countDone(book: string, from: number, to: number): number {
  let n = 0;
  for (let c = from; c <= to; c++) if (chapterDone(book, c)) n++;
  return n;
}

export function totalDone(): number {
  return Object.keys(progress.get().chapters).length;
}

export function hasSave(): boolean {
  return progress.get().startedAt != null;
}
