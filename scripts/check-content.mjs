// 콘텐츠 검사: npm run check:content
// content/acts 아래 파일들의 흔한 실수를 한 번에 찾는다. 오류가 있으면 빌드 전에 멈춘다.
//  - 파일 이름 = id, 폴더 번호 = act, act.json 있음
//  - ref가 실제 본문에 있는 구절인지, 그 막의 범위 안인지
//  - 같은 막 안에서 두 파일이 같은 구절을 덮지 않는지
//  - 장면: 선택지 canon 하나, goto 대상, 인물 파일, 본문 구절 1개 이상, mood 이름, fx 이름, face 방향, outfit 옷 이름
//  - 읽기: 퀴즈 1~3문항, answer 번호
//  - 도감(data/characters.json): 인물 파일, first·verse 구절, scene, unlocks 인물이 도감에 있는지
// 마지막에 막마다 몇 장이 콘텐츠로 덮였는지 보여 준다.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { BOOKS, findBook } from '../src/engine/books.ts';
import { ACTS } from '../src/engine/acts.ts';
import { FX, MOODS } from '../src/engine/moods.ts';

const root = new URL('..', import.meta.url).pathname;
const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`✗ [${where}] ${msg}`);
const warn = (where, msg) => warnings.push(`! [${where}] ${msg}`);

const bibleCache = new Map();
function bookData(book) {
  if (!bibleCache.has(book.code)) {
    const file = join(root, 'data/bible', `${String(book.no).padStart(2, '0')}-${book.code.toLowerCase()}.json`);
    bibleCache.set(book.code, JSON.parse(readFileSync(file, 'utf8')));
  }
  return bibleCache.get(book.code);
}

/** src/engine/bible.ts parseRef와 같은 규칙 + 실제 절이 있는지 확인 */
function parseRef(ref) {
  const m = String(ref).trim().match(/^(\S+)\s+(\d+)(?::(\d+))?(?:\s*[-–]\s*(\d+)(?::(\d+))?)?$/);
  if (!m) throw new Error(`ref 형식 오류: "${ref}"`);
  const book = findBook(m[1]);
  if (!book) throw new Error(`알 수 없는 책: "${m[1]}"`);
  const c1 = +m[2];
  const v1 = m[3] ? +m[3] : null;
  let c2 = c1;
  let v2 = v1;
  if (m[4]) {
    if (m[5]) [c2, v2] = [+m[4], +m[5]];
    else if (v1 != null) v2 = +m[4];
    else c2 = +m[4];
  }
  const chapters = bookData(book).chapters;
  const len = (c) => chapters[c - 1]?.length ?? 0;
  if (!len(c1) || !len(c2)) throw new Error(`"${ref}": ${book.name}에 그런 장이 없음`);
  if (v1 != null && v1 > len(c1)) throw new Error(`"${ref}": ${c1}장은 ${len(c1)}절까지임`);
  if (v2 != null && v2 > len(c2)) throw new Error(`"${ref}": ${c2}장은 ${len(c2)}절까지임`);
  const start = c1 * 1000 + (v1 ?? 1);
  const end = c2 * 1000 + (v2 ?? len(c2));
  if (end < start) throw new Error(`"${ref}": 끝이 시작보다 앞임`);
  return { book, c1, v1, c2, v2: v2 ?? len(c2), start, end, len };
}

const readJson = (file, where) => {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    err(where, `JSON을 읽을 수 없음: ${e.message}`);
    return null;
  }
};

const characters = new Set(readdirSync(join(root, 'src/characters')).filter((f) => f.endsWith('.ts') && f !== 'index.ts' && !f.startsWith('_')).map((f) => f.replace(/\.ts$/, '')));
// 인물 파일의 옷 목록 (beat의 "outfit" 검사용)
const outfits = new Map();
for (const c of characters) {
  const def = (await import(join(root, 'src/characters', `${c}.ts`))).default;
  outfits.set(c, new Set(Object.keys(def?.art?.outfits ?? {})));
}
const actsDir = join(root, 'content/acts');
/** 장면이 인물 카드로 주는 인물 → 그 장면 (도감 검사용) */
const unlocked = new Map();
const sceneIds = new Set();
const seenIds = new Map();
const report = [];

for (const folder of readdirSync(actsDir).sort()) {
  const no = +(folder.match(/^(\d+)-/)?.[1] ?? 0);
  const act = ACTS[no - 1];
  if (!act) {
    err(folder, '폴더 이름은 "01-이름"처럼 막 번호로 시작해야 함');
    continue;
  }
  const dir = join(actsDir, folder);
  const actJson = existsSync(join(dir, 'act.json')) ? readJson(join(dir, 'act.json'), `${folder}/act.json`) : null;
  if (!actJson) warn(folder, 'act.json 없음');
  else {
    if (actJson.act !== no) err(`${folder}/act.json`, `act가 ${actJson.act}인데 폴더는 ${no}막`);
    if (actJson.title !== act.title) warn(`${folder}/act.json`, `title "${actJson.title}"이 acts.ts의 "${act.title}"와 다름`);
    if (!actJson.mechanic) err(`${folder}/act.json`, 'mechanic이 없음');
    if (actJson.keyVerse) try { parseRef(actJson.keyVerse); } catch (e) { err(`${folder}/act.json`, `keyVerse ${e.message}`); }
    if (actJson.finale != null && !(Array.isArray(actJson.finale) && actJson.finale.every((l) => typeof l === 'string' && l))) err(`${folder}/act.json`, 'finale은 문장(문자열) 목록이어야 함');
  }

  const items = [];
  for (const [sub, kind] of [['scenes', 'scene'], ['readings', 'read']]) {
    if (!existsSync(join(dir, sub))) continue;
    for (const file of readdirSync(join(dir, sub)).filter((f) => f.endsWith('.json')).sort()) {
      const where = `${folder}/${sub}/${file}`;
      const data = readJson(join(dir, sub, file), where);
      if (!data) continue;
      const id = file.replace(/\.json$/, '');
      if (data.id !== id) err(where, `id "${data.id}"가 파일 이름과 다름`);
      if (data.act !== no) err(where, `act가 ${data.act}인데 ${no}막 폴더에 있음`);
      const key = `${kind}/${id}`;
      if (seenIds.has(key)) err(where, `같은 id가 ${seenIds.get(key)}에도 있음`);
      seenIds.set(key, where);
      let r;
      try {
        r = parseRef(data.ref);
      } catch (e) {
        err(where, e.message);
        continue;
      }
      const inAct = act.stops.some((s) => s.book === r.book.code && r.c1 >= s.from && r.c2 <= s.to);
      if (!inAct) err(where, `ref "${data.ref}"가 ${no}막(${act.range}) 범위 밖임`);
      items.push({ where, r, ref: data.ref });
      if (kind === 'scene') {
        checkScene(data, where);
        for (const c of data.unlocks?.characters ?? []) unlocked.set(c, where);
        sceneIds.add(id);
      }
      else checkReading(data, where);
    }
  }

  // 겹침 검사 + 덮은 장 세기
  items.sort((a, b) => a.r.book.no - b.r.book.no || a.r.start - b.r.start);
  for (let i = 1; i < items.length; i++) {
    const a = items[i - 1], b = items[i];
    if (a.r.book === b.r.book && b.r.start <= a.r.end) err(b.where, `"${b.ref}"가 ${a.where}의 "${a.ref}"와 겹침`);
  }
  const total = act.stops.reduce((n, s) => n + s.to - s.from + 1, 0);
  const covered = new Set();
  for (const { r } of items) for (let c = r.c1; c <= r.c2; c++) covered.add(`${r.book.code}:${c}`);
  report.push(`  ${String(no).padStart(2)}막 ${act.title} — 장면·읽기 ${String(items.length).padStart(3)}개 · ${covered.size} / ${total}장`);
}

function checkScene(s, where) {
  if (!s.title) err(where, 'title이 없음');
  if (!s.insight) err(where, 'insight(해설)이 없음');
  if (!Array.isArray(s.beats) || !s.beats.length) return err(where, 'beats가 비어 있음');
  const all = [...s.beats, ...Object.values(s.branches ?? {}).flat()];
  const ids = new Set(s.beats.map((b) => b.id).filter(Boolean));
  if (!all.some((b) => b.type === 'scripture')) err(where, '본문 구절(scripture beat)이 하나도 없음 (CLAUDE.md 7번)');
  const people = new Set([...(s.cast ?? []), ...(s.unlocks?.characters ?? [])]);
  const checkMood = (m) => m != null && !MOODS[m] && warn(where, `mood "${m}"가 src/engine/moods.ts에 없음 (기본 무대로 보임)`);
  checkMood(s.mood);
  const checkOutfit = (o) => {
    for (const [c, name] of Object.entries(o ?? {})) {
      people.add(c);
      if (outfits.has(c) && !outfits.get(c).has(name)) err(where, `outfit "${c}": "${name}" 옷이 인물 파일에 없음`);
    }
  };
  checkOutfit(s.outfit);
  for (const b of all) {
    checkMood(b.mood);
    checkOutfit(b.outfit);
    for (const f of b.fx == null ? [] : [b.fx].flat()) if (!FX.includes(f)) err(where, `fx "${f}"가 src/engine/moods.ts FX 목록에 없음`);
    for (const [c, dir] of Object.entries(b.face ?? {})) {
      people.add(c);
      if (dir !== 'left' && dir !== 'right') err(where, `face "${c}": "${dir}"는 left/right만 됨`);
    }
    for (const c of [...(b.enter ?? []), ...(b.exit ?? []), ...Object.keys(b.pose ?? {}), ...(b.who ? [b.who] : [])]) people.add(c);
    if (b.type === 'scripture') try { parseRef(b.ref); } catch (e) { err(where, `scripture ${e.message}`); }
    if (b.type === 'choice') {
      if (b.options.filter((o) => o.canon).length !== 1) err(where, `선택지에 canon이 정확히 하나여야 함: "${b.prompt}"`);
      for (const o of b.options) if (o.goto && !ids.has(o.goto) && !s.branches?.[o.goto]) err(where, `goto 대상 없음: ${o.goto}`);
    }
  }
  for (const c of people) if (!characters.has(c)) warn(where, `인물 파일 없음: src/characters/${c}.ts`);
}

function checkReading(r, where) {
  if (!r.summary) err(where, 'summary가 없음');
  if (!r.insight) err(where, 'insight가 없음');
  const quiz = r.quiz ?? [];
  if (quiz.length < 1 || quiz.length > 3) warn(where, `퀴즈는 1~3문항이 좋음 (지금 ${quiz.length}개)`);
  quiz.forEach((q, i) => {
    if (!(q.answer >= 0 && q.answer < q.options?.length)) err(where, `${i + 1}번 문제: answer 번호가 보기 밖임`);
    if (!q.why) warn(where, `${i + 1}번 문제: why(설명)가 없음`);
  });
}

// 한 줄 번역 파일의 ref도 확인
const glosses = readJson(join(root, 'content/glosses.json'), 'glosses.json') ?? {};
for (const ref of Object.keys(glosses)) try { parseRef(ref); } catch (e) { err('glosses.json', e.message); }

// 인물 도감 (data/characters.json): 인물 파일·구절·장면이 실제로 있는지, 카드로 주는 인물이 다 도감에 있는지
const codex = readJson(join(root, 'data/characters.json'), 'characters.json') ?? {};
for (const [id, e] of Object.entries(codex)) {
  const where = `characters.json ${id}`;
  if (!characters.has(id)) err(where, `인물 파일 없음: src/characters/${id}.ts`);
  if (!ACTS[e.act - 1]) err(where, `act ${e.act}가 없음`);
  if (!e.intro) err(where, 'intro(한 줄 소개)가 없음');
  for (const k of ['first', 'verse']) try { parseRef(e[k]); } catch (x) { err(where, `${k} ${x.message}`); }
  if (e.scene && !sceneIds.has(e.scene)) err(where, `장면 "${e.scene}"이 없음`);
}
for (const [c, where] of unlocked) if (!codex[c]) warn(where, `unlocks의 "${c}"가 data/characters.json(도감)에 없음`);

const totalCh = BOOKS.reduce((n, b) => n + b.chapters, 0);
console.log(`콘텐츠 검사 — 파일 ${seenIds.size}개, 한 줄 번역 ${Object.keys(glosses).length}개 (전체 ${totalCh}장)`);
console.log(report.join('\n'));
if (warnings.length) console.log(`\n주의 ${warnings.length}개\n${warnings.join('\n')}`);
if (errors.length) {
  console.log(`\n오류 ${errors.length}개\n${errors.join('\n')}`);
  process.exit(1);
}
console.log('\n오류 없음 ✓');
