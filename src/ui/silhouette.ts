// 인물 실루엣을 움직임 없는 그림 한 장으로 (도감 카드, 막 피날레 카드).
// 무대 위 인물(ui/actor.ts)과 같은 그림을 쓰되 숨쉬기·자세 모션은 없다. 색은 .sil (styles/codex.css)
import type { CharacterDef } from '../characters';

export function silhouetteSvg(def: CharacterDef): string {
  const art = def.art;
  if (art.kind === 'image') return `<img class="sil__art" src="${art.src}" alt="" />`;
  const [w, h] = art.viewBox;
  return `<svg class="sil__art" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMax meet" aria-hidden="true" overflow="visible"><g fill="currentColor">${art.markup}</g></svg>`;
}
