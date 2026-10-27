import { Store } from './store';

export interface Progress {
  /** 끝낸 장. 키는 "GEN:1" 형식 */
  chapters: Record<string, true>;
  /** 끝낸 장면 id */
  scenes: Record<string, true>;
  /** 만난 인물 id (인물 도감) */
  characters: Record<string, true>;
  /** 마지막으로 머문 곳 (이어하기). "map" 또는 "scene/gen-1-light" */
  last: string | null;
  startedAt: number | null;
}

export const progress = new Store<Progress>('progress', {
  chapters: {},
  scenes: {},
  characters: {},
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

export function sceneDone(id: string): boolean {
  return !!progress.get().scenes[id];
}

/** 장면을 끝냈다: 장면·인물·장을 한꺼번에 기록한다 */
export function completeScene(id: string, chapters: string[], characters: string[]): void {
  const p = progress.get();
  const add = (rec: Record<string, true>, keys: string[]) => Object.fromEntries([...Object.keys(rec), ...keys].map((k) => [k, true as const]));
  progress.set({
    scenes: add(p.scenes, [id]),
    chapters: add(p.chapters, chapters),
    characters: add(p.characters, characters),
    startedAt: p.startedAt ?? Date.now(),
  });
}

/** "이어서 하기"가 갈 주소 */
export function continuePath(): string {
  const last = progress.get().last;
  return last && last.startsWith('scene/') ? `/${last}` : '/map';
}
