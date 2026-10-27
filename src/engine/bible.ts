// 개역한글 본문 로더. 권별 JSON을 필요할 때만 불러온다.
// 장면 파일은 "창 1:1-3" 같은 ref만 갖고, 본문은 여기서 꺼낸다.
import { findBook, type Book } from './books';

interface BookData {
  book: number;
  code: string;
  name: string;
  chapters: string[][];
}

export interface Verse {
  chapter: number;
  verse: number;
  text: string;
}

export interface Passage {
  ref: string;
  book: Book;
  verses: Verse[];
}

export interface ParsedRef {
  book: Book;
  startChapter: number;
  startVerse: number | null;
  endChapter: number;
  endVerse: number | null;
}

const files = import.meta.glob<BookData>('/data/bible/*.json', { import: 'default' });
const cache = new Map<string, Promise<BookData>>();

function loadBook(book: Book): Promise<BookData> {
  let p = cache.get(book.code);
  if (!p) {
    const key = `/data/bible/${String(book.no).padStart(2, '0')}-${book.code.toLowerCase()}.json`;
    const loader = files[key];
    if (!loader) return Promise.reject(new Error(`본문 파일 없음: ${key}`));
    p = loader();
    cache.set(book.code, p);
  }
  return p;
}

/**
 * 지원 형식:
 *  "창 1:1"  "창 1:1-3"  "창 1:31-2:3"  "창 1"  "창 23-25"  "창세기 1:1"
 */
export function parseRef(ref: string): ParsedRef {
  const m = ref.trim().match(/^(\S+)\s+(\d+)(?::(\d+))?(?:\s*[-–]\s*(\d+)(?::(\d+))?)?$/);
  if (!m) throw new Error(`ref 형식 오류: "${ref}"`);
  const book = findBook(m[1]);
  if (!book) throw new Error(`알 수 없는 책: "${m[1]}"`);
  const c1 = +m[2];
  const v1 = m[3] ? +m[3] : null;
  let c2 = c1;
  let v2: number | null = v1;
  if (m[4]) {
    if (m[5]) {
      c2 = +m[4];
      v2 = +m[5];
    } else if (v1 != null) {
      v2 = +m[4];
    } else {
      c2 = +m[4];
    }
  }
  return { book, startChapter: c1, startVerse: v1, endChapter: c2, endVerse: v2 };
}

export async function getPassage(ref: string): Promise<Passage> {
  const r = parseRef(ref);
  const data = await loadBook(r.book);
  const verses: Verse[] = [];
  for (let c = r.startChapter; c <= r.endChapter; c++) {
    const ch = data.chapters[c - 1];
    if (!ch) throw new Error(`${ref}: ${c}장이 없음`);
    const from = c === r.startChapter && r.startVerse != null ? r.startVerse : 1;
    const to = c === r.endChapter && r.endVerse != null ? r.endVerse : ch.length;
    for (let v = from; v <= to; v++) {
      if (ch[v - 1] == null) throw new Error(`${ref}: ${c}:${v}절이 없음`);
      verses.push({ chapter: c, verse: v, text: ch[v - 1] });
    }
  }
  return { ref, book: r.book, verses };
}
