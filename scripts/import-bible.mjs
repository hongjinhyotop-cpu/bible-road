// 개역한글 원본(JSONL, 한 줄에 한 절)을 권별 JSON으로 바꾼다.
// 사용법: node scripts/import-bible.mjs <krv_holybible.jsonl 경로>
// 출처와 라이선스는 data/bible/SOURCE.md 참고.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const src = process.argv[2];
if (!src) {
  console.error('사용법: node scripts/import-bible.mjs <krv_holybible.jsonl>');
  process.exit(1);
}

const outDir = join(import.meta.dirname, '..', 'data', 'bible');
mkdirSync(outDir, { recursive: true });

const books = new Map();
for (const line of readFileSync(src, 'utf8').split('\n')) {
  if (!line.trim()) continue;
  const r = JSON.parse(line);
  if (!books.has(r.book)) books.set(r.book, { book: r.book, code: r.code, name: r.name_kr, chapters: [] });
  const b = books.get(r.book);
  const ch = (b.chapters[r.chapter - 1] ??= []);
  ch[r.verse - 1] = r.text.trim();
}

let verses = 0;
for (const b of books.values()) {
  b.chapters.forEach((ch, i) => {
    ch.forEach((v, j) => {
      if (typeof v !== 'string') throw new Error(`${b.code} ${i + 1}:${j + 1} 누락`);
      verses++;
    });
  });
  const file = `${String(b.book).padStart(2, '0')}-${b.code.toLowerCase()}.json`;
  writeFileSync(join(outDir, file), JSON.stringify(b));
}
console.log(`${books.size}권, ${verses}절 저장 완료 → data/bible/`);
