// 콘텐츠 검사: npm run check:content
// content/acts 아래 파일들의 흔한 실수를 한 번에 찾는다. 오류가 있으면 빌드 전에 멈춘다.
//  - 파일 이름 = id, 폴더 번호 = act, act.json 있음
//  - ref가 실제 본문에 있는 구절인지, 그 막의 범위 안인지
//  - 같은 막 안에서 두 파일이 같은 구절을 덮지 않는지
//  - 에피소드: 선택지 canon 하나, goto 대상, 인물 파일(또는 extras), 본문 구절 1개 이상, mood·bg 이름, fx 이름,
//    face 방향, outfit 옷 이름, 동작(act) 이름·대상, 여정 지도 장소, extras 키트 이름, 퀴즈 1~2문제·answer 번호
//  - B급: 선택지 최대 1개, 퀴즈 필수, 새 인물 파일 없이(키트 extras·기존 인물만) — CLAUDE.md 6번
//  - 도감(data/characters.json): 인물 파일, first·verse 구절, scene, unlocks 인물이 도감에 있는지
// 마지막에 막마다 몇 장이 콘텐츠로 덮였는지 보여 준다.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { BOOKS, findBook } from '../src/engine/books.ts';
import { ACTS } from '../src/engine/acts.ts';
import { FX, MOODS } from '../src/engine/moods.ts';
import { ACTIONS, PLACE_NAMES } from '../src/engine/actions.ts';
import { BASES, BEARDS, HAIRS, PROPS, TINTS } from '../src/characters/_kit.ts';

const root = new URL('..', import.meta.url).pathname;
const BEAT_TYPES = new Set(['narration', 'line', 'voice', 'scripture', 'choice', 'act']);
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
    if (actJson.mechanic) warn(`${folder}/act.json`, 'mechanic은 이제 안 씀 (막별 게임 방식은 없어졌음) — 지워도 됨');
    if (actJson.keyVerse) try { parseRef(actJson.keyVerse); } catch (e) { err(`${folder}/act.json`, `keyVerse ${e.message}`); }
    if (actJson.finale != null && !(Array.isArray(actJson.finale) && actJson.finale.every((l) => typeof l === 'string' && l))) err(`${folder}/act.json`, 'finale은 문장(문자열) 목록이어야 함');
  }

  const items = [];
  if (existsSync(join(dir, 'readings')) && readdirSync(join(dir, 'readings')).some((f) => f.endsWith('.json'))) {
    err(`${folder}/readings`, '읽기 구간은 없어졌음 — B급 에피소드로 바꿔서 scenes/에 넣어야 함 (CLAUDE.md 6번)');
  }
  for (const [sub, kind] of [['scenes', 'scene']]) {
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
      items.push({ where, r, ref: data.ref, grade: data.grade });
      if (kind === 'scene') {
        checkScene(data, where);
        for (const c of data.unlocks?.characters ?? []) unlocked.set(c, where);
        sceneIds.add(id);
      }
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
  report.push(`  ${String(no).padStart(2)}막 ${act.title} — 에피소드 ${String(items.length).padStart(3)}개 (A ${items.filter((i) => i.grade !== 'B').length} · B ${items.filter((i) => i.grade === 'B').length}) · ${covered.size} / ${total}장`);
}

function checkScene(s, where) {
  if (!s.title) err(where, 'title이 없음');
  if (!s.insight) err(where, 'insight(해설)이 없음');
  if (s.grade != null && s.grade !== 'A' && s.grade !== 'B') err(where, `grade는 "A" 또는 "B" (지금 "${s.grade}")`);
  const B = s.grade === 'B';
  if (!Array.isArray(s.beats) || !s.beats.length) return err(where, 'beats가 비어 있음');
  const all = [...s.beats, ...Object.values(s.branches ?? {}).flat()];
  const ids = new Set(s.beats.map((b) => b.id).filter(Boolean));
  if (!all.some((b) => b.type === 'scripture')) err(where, '본문 구절(scripture beat)이 하나도 없음 (CLAUDE.md 7번)');
  // 조연 (키트로 그 자리에서 만드는 인물)
  const extras = s.extras ?? {};
  for (const [id, x] of Object.entries(extras)) {
    if (characters.has(id)) warn(where, `extras "${id}"는 인물 파일이 이미 있음 → 인물 파일을 쓰면 됨`);
    if (!x?.name) err(where, `extras "${id}": name이 없음`);
    if (!BASES.includes(x?.base)) err(where, `extras "${id}": base "${x?.base}"는 ${BASES.join('/')} 중 하나`);
    if (x.hair && !HAIRS.includes(x.hair)) err(where, `extras "${id}": hair "${x.hair}"는 ${HAIRS.join('/')} 중 하나`);
    if (x.beard && !BEARDS.includes(x.beard)) err(where, `extras "${id}": beard "${x.beard}"는 ${BEARDS.join('/')} 중 하나`);
    if (x.tint && !(x.tint in TINTS)) err(where, `extras "${id}": tint "${x.tint}"는 ${Object.keys(TINTS).join('/')} 중 하나`);
    for (const p of x.props ?? []) if (!PROPS.includes(p)) err(where, `extras "${id}": 소품 "${p}"는 ${PROPS.join('/')} 중 하나`);
  }
  const people = new Set([...(s.cast ?? []), ...(s.unlocks?.characters ?? [])]);
  const checkMood = (m) => m != null && !MOODS[m] && (B ? err : warn)(where, `배경 "${m}"가 src/engine/moods.ts에 없음 (기본 무대로 보임)`);
  checkMood(s.mood);
  checkMood(s.bg);
  // 퀴즈 (에피소드 끝 1~2문제)
  const quiz = s.quiz ?? [];
  if (!quiz.length) (B ? err : warn)(where, '끝 퀴즈(quiz)가 없음 — 1~2문제');
  if (quiz.length > 2) warn(where, `퀴즈는 1~2문제 (지금 ${quiz.length}개)`);
  quiz.forEach((q, i) => {
    if (!q.q || !Array.isArray(q.options) || q.options.length < 2) err(where, `퀴즈 ${i + 1}번: q·options(2개 이상)가 필요함`);
    if (!(q.answer >= 0 && q.answer < q.options?.length)) err(where, `퀴즈 ${i + 1}번: answer 번호가 보기 밖임`);
    if (!q.why) warn(where, `퀴즈 ${i + 1}번: why(설명)가 없음`);
  });
  const choices = all.filter((b) => b.type === 'choice').length;
  if (B && choices > 1) err(where, `B급은 선택지가 에피소드당 최대 1개 (지금 ${choices}개)`);
  const checkOutfit = (o) => {
    for (const [c, name] of Object.entries(o ?? {})) {
      people.add(c);
      if (outfits.has(c) && !outfits.get(c).has(name)) err(where, `outfit "${c}": "${name}" 옷이 인물 파일에 없음`);
    }
  };
  checkOutfit(s.outfit);
  for (const b of all) {
    if (b.type != null && !BEAT_TYPES.has(b.type)) err(where, `beat type "${b.type}"은 없음 (${[...BEAT_TYPES].join('/')})`);
    if ((b.type == null || b.type === 'act') && !b.act && !b.acts && !b.enter && !b.exit && !b.fx && !b.mood && !b.bg) warn(where, 'type도 act도 없는 빈 beat');
    checkMood(b.mood);
    checkMood(b.bg);
    checkOutfit(b.outfit);
    for (const st of [...(b.act ? [{ act: b.act, who: b.who, to: b.to, from: b.from, via: b.via }] : []), ...(b.acts ?? [])]) {
      const info = ACTIONS[st.act];
      if (!info) {
        err(where, `동작 "${st.act}"이 src/engine/actions.ts에 없음`);
        continue;
      }
      const who = [st.who ?? (b.type === 'line' ? b.who : undefined)].flat().filter(Boolean);
      who.forEach((c) => people.add(c));
      if (st.act === 'travel') {
        for (const pl of [st.from, st.to, ...(st.via ?? [])].filter(Boolean)) if (!(pl in PLACE_NAMES)) err(where, `travel 장소 "${pl}"가 actions.ts PLACE_NAMES에 없음`);
        if (!st.to) err(where, 'travel에는 to(도착지)가 필요함');
        continue;
      }
      if (st.to) people.add(st.to);
      if (info.needs === 'one' && !who.length) err(where, `동작 "${st.act}"에 who가 없음`);
      if (info.needs === 'two' && who.length + (st.to ? 1 : 0) < 2) err(where, `동작 "${st.act}"는 두 사람이 필요함 (who 둘, 또는 who + to)`);
    }
    for (const f of b.fx == null ? [] : [b.fx].flat()) if (!FX.includes(f)) err(where, `fx "${f}"가 src/engine/moods.ts FX 목록에 없음`);
    for (const [c, dir] of Object.entries(b.face ?? {})) {
      people.add(c);
      if (dir !== 'left' && dir !== 'right') err(where, `face "${c}": "${dir}"는 left/right만 됨`);
    }
    for (const c of [...(b.enter ?? []), ...(b.exit ?? []), ...Object.keys(b.pose ?? {}), ...(b.who ? [b.who].flat() : [])]) people.add(c);
    if (b.type === 'scripture') try { parseRef(b.ref); } catch (e) { err(where, `scripture ${e.message}`); }
    if (b.type === 'choice') {
      if (b.options.filter((o) => o.canon).length !== 1) err(where, `선택지에 canon이 정확히 하나여야 함: "${b.prompt}"`);
      for (const o of b.options) if (o.goto && !ids.has(o.goto) && !s.branches?.[o.goto]) err(where, `goto 대상 없음: ${o.goto}`);
    }
  }
  for (const c of people) if (!characters.has(c) && !extras[c]) (B ? err : warn)(where, `인물 파일 없음: src/characters/${c}.ts${B ? ' (B급은 새 인물 파일 대신 extras 키트를 씀)' : ''}`);
  for (const c of s.unlocks?.characters ?? []) if (extras[c]) err(where, `extras "${c}"는 인물 카드(unlocks)로 줄 수 없음 (도감엔 인물 파일만)`);
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
