// 장면 분위기(mood). 장면 JSON의 "mood"(시작)와 beat의 "mood"(중간에 바뀜)에 쓴다.
// 배경 그림(art)·밝기(light)·땅(land)·색조(tone)를 한 이름으로 묶는다. 그림은 fx/backdrop.ts.
// 목록에 없는 이름은 기본값(밝고, 언덕만 있는 무대)으로 처리한다. 검사 스크립트도 이 목록을 본다.

export type BackdropArt = 'garden' | 'tree' | 'gate';

export interface Mood {
  /** false면 태초의 어둠 (하늘이 거의 꺼짐) */
  light: boolean;
  /** false면 언덕이 없다 */
  land: boolean;
  art?: BackdropArt;
  /** dusk = 저녁의 서늘한 색 */
  tone?: 'dusk';
}

export const MOODS: Record<string, Mood> = {
  /** 아무것도 없는 깜깜함 (창 1:2) */
  void: { light: false, land: false },
  /** 아직 아무것도 자라지 않은 맨땅 (창 2:5) */
  'bare-earth': { light: true, land: true },
  /** 에덴동산: 양옆에 큰 나무, 멀리 동산 가운데 나무, 강물 반짝임 */
  eden: { light: true, land: true, art: 'garden' },
  /** 동산 한가운데: 열매가 반짝이는 큰 나무가 무대 바로 뒤에 */
  'eden-tree': { light: true, land: true, art: 'tree' },
  /** 날이 서늘할 때의 동산 (창 3:8) */
  'eden-dusk': { light: true, land: true, art: 'tree', tone: 'dusk' },
  /** 동산 동쪽 바깥: 메마른 땅, 멀리 두루 도는 화염검의 빛 (창 3:24) */
  'east-of-eden': { light: true, land: true, art: 'gate', tone: 'dusk' },
};

const DEFAULT: Mood = { light: true, land: true };

export function moodOf(name: string | undefined): Mood {
  return (name && MOODS[name]) || DEFAULT;
}
