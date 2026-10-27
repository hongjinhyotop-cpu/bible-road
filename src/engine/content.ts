// 콘텐츠 로더: content/acts/NN-이름/ 아래의 act.json · scenes · readings를 한곳에서 찾고,
// 본문 순서대로 줄을 세운다. 지도 패널, "다음" 버튼, 장 번호 바로가기가 전부 여기서 나온다.
import { ACTS } from './acts';
import { chapterLength, parseRef, type ParsedRef } from './bible';
import { readingDone, sceneDone } from './progress';

export type ContentKind = 'scene' | 'read';

/** 막 폴더의 act.json */
export interface ActContent {
  act: number;
  title: string;
  /** 막별 게임 방식 모듈 이름 (src/mechanics). 예: "adventure" */
  mechanic: string;
  /** 막 피날레에 쓸 핵심 구절 */
  keyVerse?: string;
}

/** 지도·목록에 필요한 만큼만 추린 장면/읽기 구간 정보 */
export interface ContentItem {
  kind: ContentKind;
  id: string;
  act: number;
  title: string;
  ref: string;
  r: ParsedRef;
  /** 라우터 주소. "/scene/gen-1-light", "/read/gen-5" */
  path: string;
}

interface Meta {
  id: string;
  act: number;
  title?: string;
  ref: string;
}

// 파일 이름 = id. content/acts/01-beginning/scenes/gen-1-light.json → 장면 "gen-1-light"
const files: Record<ContentKind, Record<string, () => Promise<unknown>>> = {
  scene: import.meta.glob('/content/acts/*/scenes/*.json', { import: 'default' }),
  read: import.meta.glob('/content/acts/*/readings/*.json', { import: 'default' }),
};
const actFiles = import.meta.glob<ActContent>('/content/acts/*/act.json', { import: 'default', eager: true });

const idOf = (path: string) => path.replace(/^.*\/|\.json$/g, '');
/** "/content/acts/01-beginning/..." → 1 */
const actOf = (path: string) => +(path.match(/\/acts\/(\d+)-/)?.[1] ?? 0);

const index = (Object.keys(files) as ContentKind[]).flatMap((kind) =>
  Object.keys(files[kind]).map((path) => ({ kind, id: idOf(path), act: actOf(path), path })),
);

function find(kind: ContentKind, id: string) {
  return index.find((f) => f.kind === kind && f.id === id);
}

/** 장면/읽기 JSON 하나를 불러온다. 형식 검사는 scene.ts / reading.ts가 한다. */
export async function loadContent<T>(kind: ContentKind, id: string): Promise<T> {
  const f = find(kind, id);
  if (!f) throw new Error(`${kind === 'scene' ? '장면' : '읽기 구간'} 없음: ${id}`);
  const data = (await files[kind][f.path]()) as T & Meta;
  if (data.id !== id) console.warn(`[${id}] 파일 이름과 id가 다름: "${data.id}"`);
  if (data.act !== f.act) console.warn(`[${id}] act가 ${data.act}인데 ${f.act}막 폴더에 있음`);
  return data;
}

/** 막의 act.json. 없으면 null */
export function actContent(act: number): ActContent | null {
  const key = Object.keys(actFiles).find((p) => actOf(p) === act);
  return key ? actFiles[key] : null;
}

// ── 막별 목록 (본문 순서) ─────────────────────
const actCache = new Map<number, Promise<ContentItem[]>>();

/** 한 막의 장면 + 읽기 구간. 막의 책 순서 → 장 → 절 순서로 정렬된다. */
export function contentOfAct(act: number): Promise<ContentItem[]> {
  let p = actCache.get(act);
  if (!p) {
    p = buildAct(act);
    actCache.set(act, p);
  }
  return p;
}

async function buildAct(act: number): Promise<ContentItem[]> {
  const stops = ACTS[act - 1]?.stops ?? [];
  const items: ContentItem[] = [];
  for (const f of index.filter((f) => f.act === act)) {
    try {
      const m = (await files[f.kind][f.path]()) as Meta;
      const r = parseRef(m.ref);
      items.push({ kind: f.kind, id: f.id, act, title: m.title ?? refLabel(m.ref), ref: m.ref, r, path: `/${f.kind}/${f.id}` });
    } catch (err) {
      console.warn(`[${f.id}]`, err);
    }
  }
  // 이 막의 몇 번째 별(책 구간)에 속하는지. 막 밖의 ref면 맨 뒤로
  const stopOf = (it: ContentItem) => {
    const n = stops.findIndex((s) => s.book === it.r.book.code && it.r.startChapter >= s.from && it.r.startChapter <= s.to);
    if (n < 0) console.warn(`[${it.id}] ref "${it.ref}"가 ${act}막 범위 밖임`);
    return n < 0 ? stops.length : n;
  };
  const sorted = items
    .map((it) => ({ it, stop: stopOf(it) }))
    .sort((a, b) => a.stop - b.stop || a.it.r.startChapter - b.it.r.startChapter || (a.it.r.startVerse ?? 0) - (b.it.r.startVerse ?? 0))
    .map(({ it }) => it);
  warnOverlaps(sorted);
  return sorted;
}

/** 같은 구절을 두 파일이 덮으면 알려준다 (장면과 읽기 구간이 겹치는 실수) */
function warnOverlaps(items: ContentItem[]): void {
  const span = (r: ParsedRef): [number, number] => [r.startChapter * 1000 + (r.startVerse ?? 1), r.endChapter * 1000 + (r.endVerse ?? 999)];
  for (let i = 1; i < items.length; i++) {
    const a = items[i - 1], b = items[i];
    if (a.r.book.code !== b.r.book.code) continue;
    if (span(b.r)[0] <= span(a.r)[1]) console.warn(`[${a.id}] "${a.ref}"와 [${b.id}] "${b.ref}"가 겹침`);
  }
}

/** "창 23-25" → "창세기 23–25장", "창 1:1-2:3" → "창세기 1:1–2:3" */
export function refLabel(ref: string): string {
  const r = parseRef(ref);
  const tail = ref.trim().replace(/^\S+\s+/, '').replace('-', '–');
  return `${r.book.name} ${tail}${r.startVerse == null ? '장' : ''}`;
}

// ── 찾기 ──────────────────────────────────────
/** 막에서 이 책·장을 덮는 장면/읽기 구간 (장 번호 바로가기) */
export async function itemForChapter(act: number, book: string, chapter: number): Promise<ContentItem | null> {
  const items = await contentOfAct(act);
  return items.find((it) => it.r.book.code === book && it.r.startChapter <= chapter && chapter <= it.r.endChapter) ?? null;
}

/** 본문 순서로 바로 다음 장면/읽기 구간. 막의 끝이면 다음 막의 처음으로. 없으면 null */
export async function nextItem(kind: ContentKind, id: string): Promise<ContentItem | null> {
  const f = find(kind, id);
  if (!f) return null;
  const here = await contentOfAct(f.act);
  const i = here.findIndex((it) => it.kind === kind && it.id === id);
  if (i >= 0 && i + 1 < here.length) return here[i + 1];
  for (let a = f.act + 1; a <= ACTS.length; a++) {
    const items = await contentOfAct(a);
    if (items.length) return items[0];
  }
  return null;
}

// ── 장 완료 ───────────────────────────────────
/**
 * 이 장면/읽기를 끝냈을 때 "다 읽은 장"이 되는 장들 ("GEN:2" 형식).
 * 한 장을 여러 파일이 나눠 덮어도(창 2장 = 1:1–2:3 장면 + 2:4–25 장면) 이미 끝낸 것들과 합쳐서
 * 1절부터 마지막 절까지 빈틈없이 덮였으면 완료로 친다.
 */
export async function chaptersDoneWith(kind: ContentKind, id: string): Promise<string[]> {
  const f = find(kind, id);
  if (!f) return [];
  const items = await contentOfAct(f.act);
  const done = items.filter((it) => (it.kind === kind && it.id === id) || (it.kind === 'scene' ? sceneDone(it.id) : readingDone(it.id)));
  const me = items.find((it) => it.kind === kind && it.id === id);
  if (!me) return [];
  const out: string[] = [];
  for (let c = me.r.startChapter; c <= me.r.endChapter; c++) {
    const len = await chapterLength(me.r.book, c);
    if (!len) continue;
    // 이 장을 덮는 구간들을 절 번호로 모아서 1절부터 이어 붙여 본다
    const spans = done
      .filter((it) => it.r.book.code === me.r.book.code && it.r.startChapter <= c && c <= it.r.endChapter)
      .map((it) => [c === it.r.startChapter ? (it.r.startVerse ?? 1) : 1, c === it.r.endChapter ? (it.r.endVerse ?? len) : len] as const)
      .sort((a, b) => a[0] - b[0]);
    let reach = 0;
    for (const [from, to] of spans) if (from <= reach + 1) reach = Math.max(reach, to);
    if (reach >= len) out.push(`${me.r.book.code}:${c}`);
  }
  return out;
}
