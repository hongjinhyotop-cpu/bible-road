// 인물 도감 데이터 (data/characters.json) + 막 완료·피날레 판정.
// 인물 그림·이름은 src/characters/의 인물 파일, 소개·핵심 구절은 data/characters.json.
import data from '../../data/characters.json';
import { ACTS } from './acts';
import { countDone, progress } from './progress';

export interface CodexEntry {
  id: string;
  /** 처음 만나는 막 */
  act: number;
  /** 처음 나오는 구절 */
  first: string;
  /** 처음 만나는 장면 id ("그 장면 다시 보기") */
  scene?: string;
  /** 한 줄 소개 (친구 말투) */
  intro: string;
  /** 핵심 구절 */
  verse: string;
  /** 핵심 구절의 한 줄 번역 */
  gloss?: string;
}

/** 도감 순서 = 파일에 적힌 순서 (대개 본문에 처음 나오는 순서) */
export const CODEX: CodexEntry[] = Object.entries(data as Record<string, Omit<CodexEntry, 'id'>>).map(([id, e]) => ({ id, ...e }));

export function codexEntry(id: string): CodexEntry | undefined {
  return CODEX.find((e) => e.id === id);
}

export function hasMet(id: string): boolean {
  return !!progress.get().characters[id];
}

/** 막의 모든 장을 끝냈나 (지도에서 그 막의 별이 전부 켜짐) */
export function actComplete(no: number): boolean {
  const act = ACTS[no - 1];
  return !!act && act.stops.every((s) => countDone(s.book, s.from, s.to) === s.to - s.from + 1);
}

/** 막을 다 끝냈는데 아직 피날레를 안 봤으면 true → "다음" 버튼이 피날레로 간다 */
export function finaleDue(no: number): boolean {
  return actComplete(no) && !progress.get().finales[no];
}
