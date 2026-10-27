/** 빈 줄("\n\n")로 나눈 글을 문단으로. 해설이 길어도 한 덩어리로 뭉치지 않게 (textContent라 HTML로 해석되지 않음) */
export function paragraphs(box: HTMLElement, text: string): void {
  box.replaceChildren(...text.split(/\n\s*\n/).map((t) => {
    const p = document.createElement('p');
    p.textContent = t.trim();
    return p;
  }));
}
