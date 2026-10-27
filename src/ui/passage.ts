// "본문 전체 보기": 에피소드가 덮는 개역한글 본문 전체를 패널로 펼친다.
// 에피소드 안에서는 핵심 구절만 카드로 나오고, 나머지 절은 여기서 언제든 읽을 수 있다 (1,189장 전부 빠짐없이).
import { getPassage } from '../engine/bible';
import { openSheetPanel } from './sheet';

/** 본문을 장 번호 + 절 번호 + 글로 그린다 */
export function renderPassageInto(body: HTMLElement, verses: { chapter: number; verse: number; text: string }[], highlight: Set<string> = new Set()): void {
  const multi = verses[0].chapter !== verses[verses.length - 1].chapter;
  let chapter = -1;
  let block: HTMLElement | null = null;
  for (const v of verses) {
    if (v.chapter !== chapter) {
      chapter = v.chapter;
      block = document.createElement('div');
      block.className = 'passage__chapter';
      if (multi || v.verse === 1) block.innerHTML = `<h3 class="passage__ch"><span class="latin">${chapter}</span><span class="ui">장</span></h3>`;
      body.append(block);
    }
    const p = document.createElement('p');
    p.className = 'verse';
    if (highlight.has(`${v.chapter}:${v.verse}`)) p.classList.add('is-key');
    p.innerHTML = `<span class="verse__no latin">${v.verse}</span><span class="verse__text"></span>`;
    p.querySelector('.verse__text')!.textContent = v.text;
    block!.append(p);
  }
}

/**
 * 본문 패널을 연다. keys = 에피소드에 카드로 나온 구절들 (금빛 표시)
 */
export async function openPassage(ref: string, title: string, keys: string[] = []): Promise<void> {
  const sheet = openSheetPanel('본문 전체', ref.replace('-', '–'));
  sheet.el.classList.add('sheet--passage');
  sheet.body.innerHTML = `<p class="passage__lead voice-talk">${title} · 개역한글. 에피소드에 나온 구절은 금빛으로 표시해 둠.</p><div class="passage"></div><p class="passage__source ui">개역한글 (퍼블릭 도메인)</p>`;
  try {
    const passage = await getPassage(ref);
    const marks = new Set<string>();
    for (const k of keys) {
      try {
        for (const v of (await getPassage(k)).verses) marks.add(`${v.chapter}:${v.verse}`);
      } catch { /* 카드 ref가 틀려도 본문은 보여 준다 */ }
    }
    renderPassageInto(sheet.body.querySelector('.passage')!, passage.verses, marks);
    sheet.body.querySelector('.passage__lead')!.textContent = `${title} · ${passage.book.name} ${ref.replace(/^\S+\s+/, '').replace('-', '–')}${/:/.test(ref) ? '' : '장'} · ${passage.verses.length}절. 에피소드에 카드로 나온 구절은 금빛.`;
  } catch (err) {
    console.warn(err);
    sheet.body.querySelector('.passage')!.textContent = '본문을 못 불러왔음. 잠깐 뒤에 다시 눌러 줘.';
  }
}
