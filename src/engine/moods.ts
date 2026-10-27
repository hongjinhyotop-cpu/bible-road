// 장면 분위기(mood). 장면 JSON의 "mood"(시작)와 beat의 "mood"(중간에 바뀜)에 쓴다.
// 배경 그림(art)·밝기(light)·땅(land)·색조(tone)를 한 이름으로 묶는다. 그림은 fx/backdrop.ts.
// 목록에 없는 이름은 기본값(밝고, 언덕만 있는 무대)으로 처리한다. 검사 스크립트도 이 목록을 본다.

export type BackdropArt =
  | 'garden' | 'tree' | 'gate' | 'field' | 'altar' | 'altar-lit' | 'nod'
  | 'cities' | 'yard' | 'peaks' | 'peaks-green' | 'altar-one' | 'vineyard';

/** 방주 (fx/ark.ts) */
export type ArkState = 'frame' | 'built' | 'boarding' | 'shut' | 'float' | 'rest';

export interface Mood {
  /** false면 태초의 어둠 (하늘이 거의 꺼짐) */
  light: boolean;
  /** false면 언덕이 없다 */
  land: boolean;
  art?: BackdropArt;
  /** dusk = 저녁의 서늘한 색, storm = 비구름에 덮인 잿빛 하늘, clear = 비 갠 뒤 맑게 씻긴 빛 */
  tone?: 'dusk' | 'storm' | 'clear';
  /** 방주를 무대에 세운다 */
  ark?: ArkState;
  /** 물 높이 0~1 (1 = 무대 높이의 70%까지). 바뀌면 천천히 차오르거나 빠진다 */
  water?: number;
  /** 비 0 = 없음, 1 = 비, 2 = 쏟아짐 */
  rain?: 0 | 1 | 2;
  /** 구름 속의 무지개 (창 9:13) */
  bow?: boolean;
  /** 배경 가운데 소품(제단 등)이 보이게, 폰에서 인물들을 양옆으로 벌려 세운다 */
  spread?: boolean;
}

/** beat의 "fx" 연출 이름. 검사 스크립트도 이 목록을 본다 */
export const FX = [
  'flash', // 빛이 번쩍
  'dawn', // 어둠이 걷히고 하늘이 밝아짐
  'dark', // 다시 어두워짐
  'land', // 땅(언덕)이 떠오름
  'shake', // 화면 진동
  'raven', // 방주 창에서 까마귀가 날아가 오락가락함 (창 8:7)
  'dove', // 비둘기가 나갔다가 앉을 곳을 못 찾고 돌아옴 (창 8:8-9)
  'dove-leaf', // 비둘기가 올리브 잎을 물고 돌아옴 (창 8:11)
  'dove-away', // 비둘기가 날아가 다시 돌아오지 않음 (창 8:12)
] as const;
export type SceneFx = (typeof FX)[number];

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
  /** 동산 바깥의 들판: 밭고랑, 앞쪽 이삭, 먼 언덕의 양 떼 (창 4:2) */
  field: { light: true, land: true, art: 'field' },
  /** 해 질 녘 들판 (창 4:8 "그들이 들에 있을 때에") */
  'field-dusk': { light: true, land: true, art: 'field', tone: 'dusk' },
  /** 두 제단, 두 줄기 연기 (창 4:3-4) */
  altar: { light: true, land: true, art: 'altar', spread: true },
  /** 한쪽 제단에만 은은한 빛 — "열납하셨으나" (창 4:4-5) */
  'altar-regard': { light: true, land: true, art: 'altar-lit', spread: true },
  /** 에덴 동편 놋 땅: 메마른 언덕, 떠도는 길, 멀리 가인이 쌓은 성 (창 4:16-17) */
  nod: { light: true, land: true, art: 'nod', tone: 'dusk' },

  // ── 노아 (창 6–9) ──
  /** 강포가 가득한 땅: 여기저기 성, 피어오르는 연기 (창 6:11) */
  cities: { light: true, land: true, art: 'cities', tone: 'dusk' },
  /** 방주 짓는 터: 뼈대만 선 방주, 비계, 쌓인 목재 (창 6:14-16) */
  'ark-frame': { light: true, land: true, art: 'yard', ark: 'frame' },
  /** 다 지은 방주 (창 6:22) */
  'ark-built': { light: true, land: true, art: 'yard', ark: 'built' },
  /** 짐승들이 둘씩 들어간다 (창 7:8-9) */
  'ark-boarding': { light: true, land: true, art: 'yard', ark: 'boarding', tone: 'dusk' },
  /** 문이 닫히고, 하늘이 어두워진다 (창 7:16) */
  'ark-shut': { light: true, land: true, art: 'yard', ark: 'shut', tone: 'storm', rain: 1 },
  /** 깊음의 샘이 터지고 하늘의 창이 열림: 쏟아지는 비, 차오르는 물 (창 7:11-17) */
  deluge: { light: true, land: true, art: 'yard', ark: 'float', tone: 'storm', rain: 2, water: 0.4 },
  /** 높은 산까지 다 덮인 물. 방주 하나만 떠 있다 (창 7:18-23) */
  'deluge-high': { light: true, land: false, ark: 'float', tone: 'storm', rain: 2, water: 0.62 },
  /** 비는 그쳤고, 물만 남았다 (창 7:24 백오십 일) */
  waters: { light: true, land: false, ark: 'float', tone: 'storm', water: 0.62 },
  /** 바람이 불고 물이 줄어든다. 아라랏 산꼭대기에 멈춘 방주 (창 8:1-5) */
  ararat: { light: true, land: false, art: 'peaks', ark: 'rest', water: 0.5 },
  /** 물이 더 빠졌다. 방주 창 (창 8:6-12, 까마귀·비둘기) */
  'ararat-low': { light: true, land: false, art: 'peaks', ark: 'rest', water: 0.22, tone: 'dusk' },
  /** 땅이 말랐다. 산기슭에 풀이 돋는다 (창 8:13-19) */
  'dry-earth': { light: true, land: true, art: 'peaks-green', ark: 'rest', tone: 'clear' },
  /** 홍수 뒤 첫 제단 (창 8:20) */
  'noah-altar': { light: true, land: true, art: 'altar-one', tone: 'clear', spread: true },
  /** 구름이 해를 가린 산기슭: 서늘해진 빛 (창 9:14 "구름으로 땅을 덮을 때에") */
  overcast: { light: true, land: true, art: 'peaks-green', ark: 'rest', tone: 'dusk' },
  /** 구름 속의 무지개 (창 9:12-17) */
  rainbow: { light: true, land: true, art: 'peaks-green', ark: 'rest', bow: true, tone: 'clear' },
  /** 포도원과 장막, 저녁 (창 9:20-21) */
  vineyard: { light: true, land: true, art: 'vineyard', tone: 'dusk' },
};

const DEFAULT: Mood = { light: true, land: true };

export function moodOf(name: string | undefined): Mood {
  return (name && MOODS[name]) || DEFAULT;
}
