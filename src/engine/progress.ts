import { Store } from './store';

export interface Progress {
  /** 끝낸 장. 키는 "GEN:1" 형식 */
  chapters: Record<string, true>;
  /** 끝낸 장면 id */
  scenes: Record<string, true>;
  /** (옛 기록) 읽기 구간 시절에 끝낸 id → 퀴즈 점수. 지금은 같은 id의 에피소드를 끝낸 것으로 친다 */
  readings: Record<string, number>;
  /** 만난 인물 id (인물 도감) */
  characters: Record<string, true>;
  /** 피날레를 본 막 번호 ("1") */
  finales: Record<string, true>;
  /** 지도에서 점등 연출을 이미 보여 준 별 ("GEN:1-11") */
  litStops: Record<string, true>;
  /** 마지막으로 머문 곳 (이어하기). "map", "scene/gen-1-light", "finale/1" */
  last: string | null;
  startedAt: number | null;
}

export const progress = new Store<Progress>('progress', {
  chapters: {},
  scenes: {},
  readings: {},
  characters: {},
  finales: {},
  litStops: {},
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
  const p = progress.get();
  // 읽기 구간 → B급 에피소드로 바뀌기 전에 끝낸 기록도 그대로 인정한다 (id가 같음)
  return !!p.scenes[id] || p.readings?.[id] != null;
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
  if (last?.startsWith('read/')) return `/scene/${last.slice(5)}`;
  return last && /^(scene|finale)\//.test(last) ? `/${last}` : '/map';
}

/** 막 피날레를 봤다 */
export function markFinale(act: number): void {
  progress.set({ finales: { ...progress.get().finales, [act]: true } });
}

/** 지도에서 이 별들의 점등 연출을 보여 줬다 */
export function markLit(keys: string[]): void {
  if (!keys.length) return;
  progress.set({ litStops: { ...progress.get().litStops, ...Object.fromEntries(keys.map((k) => [k, true as const])) } });
}
