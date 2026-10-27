import { Store } from './store';

export interface Progress {
  /** 끝낸 장. 키는 "GEN:1" 형식 */
  chapters: Record<string, true>;
  /** 끝낸 장면 id */
  scenes: Record<string, true>;
  /** 끝낸 읽기 구간 id → 퀴즈 최고 점수 */
  readings: Record<string, number>;
  /** 읽다 만 읽기 구간 id → 읽던 자리 ("2:15" = 2장 15절, "insight" = 해설, "quiz" = 퀴즈) */
  readingSpots: Record<string, string>;
  /** 만난 인물 id (인물 도감) */
  characters: Record<string, true>;
  /** 피날레를 본 막 번호 ("1") */
  finales: Record<string, true>;
  /** 지도에서 점등 연출을 이미 보여 준 별 ("GEN:1-11") */
  litStops: Record<string, true>;
  /** 마지막으로 머문 곳 (이어하기). "map", "scene/gen-1-light", "read/gen-5", "finale/1" */
  last: string | null;
  startedAt: number | null;
}

export const progress = new Store<Progress>('progress', {
  chapters: {},
  scenes: {},
  readings: {},
  readingSpots: {},
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

export function readingDone(id: string): boolean {
  return progress.get().readings[id] != null;
}

/** 읽기 구간을 끝냈다: 퀴즈 점수(최고 기록)와 장을 기록한다 */
export function completeReading(id: string, chapters: string[], score: number): void {
  const p = progress.get();
  const best = Math.max(score, p.readings[id] ?? 0);
  const { [id]: _, ...spots } = p.readingSpots;
  progress.set({
    readings: { ...p.readings, [id]: best },
    readingSpots: spots,
    chapters: { ...p.chapters, ...Object.fromEntries(chapters.map((c) => [c, true as const])) },
    startedAt: p.startedAt ?? Date.now(),
  });
}

/** "이어서 하기"가 갈 주소 */
export function continuePath(): string {
  const last = progress.get().last;
  return last && /^(scene|read|finale)\//.test(last) ? `/${last}` : '/map';
}

/** 읽기 구간에서 읽던 자리. 없으면 null */
export function readingSpot(id: string): string | null {
  return progress.get().readingSpots[id] ?? null;
}

/** 읽던 자리를 기억한다 (null이면 지움 = 맨 위) */
export function setReadingSpot(id: string, spot: string | null): void {
  const { [id]: old, ...rest } = progress.get().readingSpots;
  if ((old ?? null) === spot) return;
  progress.set({ readingSpots: spot ? { ...rest, [id]: spot } : rest });
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
