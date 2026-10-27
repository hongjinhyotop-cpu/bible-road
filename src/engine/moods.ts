// 장면 분위기(mood). 장면 JSON의 "mood"(시작)와 beat의 "mood"(중간에 바뀜)에 쓴다.
// 배경 그림(art)·밝기(light)·땅(land)·색조(tone)를 한 이름으로 묶는다. 그림은 fx/backdrop.ts.
// 목록에 없는 이름은 기본값(밝고, 언덕만 있는 무대)으로 처리한다. 검사 스크립트도 이 목록을 본다.

export type BackdropArt =
  | 'garden' | 'tree' | 'gate' | 'field' | 'altar' | 'altar-lit' | 'nod'
  | 'cities' | 'yard' | 'peaks' | 'peaks-green' | 'altar-one' | 'vineyard'
  | 'plain' | 'kilns'
  | 'moreh' | 'moreh-altar' | 'bethel-ai'
  | PlaceArt;

/**
 * B급 에피소드용 배경 라이브러리 (장소 유형). 그림은 fx/places.ts.
 * 색은 막 테마([data-act])를 따라가서, 같은 그림이 막마다 다른 색으로 재사용된다.
 * 이름 뒤에 -dusk(저녁) / -night(밤, 별) / -dawn(맑은 아침)을 붙이면 같은 그림에 시간대만 바뀐다.
 */
export const PLACES = {
  tent: '장막: 큰 장막과 작은 장막, 말뚝 줄, 먼 양 떼, 상수리나무',
  well: '우물: 가운데 돌 우물과 물구유, 쉬는 낙타들',
  wilderness: '광야: 꼭대기가 평평한 바위산, 모래 능선, 마른 덤불',
  town: '성읍: 성벽과 성문, 망대, 성 안 집들의 불빛',
  palace: '궁전(실내): 기둥이 늘어선 홀, 휘장, 양옆 화로',
  temple: '성전 뜰: 두 기둥 선 정면, 제단 연기, 계단',
  sea: '바다: 수평선, 밀려오는 물결, 양옆 바위',
  starfield: '밤하늘: 별이 쏟아지는 하늘, 낮은 언덕 (기본이 밤)',
  mountain: '산: 가운데 큰 산, 꼭대기 구름',
  road: '길: 지평선까지 굽어 가는 길, 돌무더기 이정표',
  river: '강: 가로질러 흐르는 강, 갈대, 나루 돌',
  house: '집 안(실내): 벽, 창으로 드는 빛줄기, 등잔, 항아리',
  prison: '감옥·구덩이(실내): 돌벽, 높은 창살 사이 빛 한 줄기',
  oaks: '상수리 숲: 큰 나무들 (마므레, 세겜)',
  cave: '굴: 바위 언덕의 어두운 굴 입구 (막벨라)',
  ruins: '폐허: 무너진 성벽, 피어오르는 연기, 잿빛 땅',
  pasture: '목초지: 완만한 언덕과 흩어진 양 떼, 목자의 돌 우리',
  egypt: '이집트: 강가 야자, 멀리 피라미드와 신전 기둥',
} as const;
export type PlaceArt = keyof typeof PLACES;

/** 실내 장소: 언덕(land)을 깔지 않는다 */
const INDOOR = new Set<PlaceArt>(['palace', 'temple', 'house', 'prison']);
/** 가운데 소품이 있는 장소: 폰에서 인물을 양옆으로 벌려 세운다 */
const CENTERED = new Set<PlaceArt>(['well', 'cave']);
const VARIANTS = { '': undefined, '-dusk': 'dusk', '-night': 'night', '-dawn': 'clear' } as const;

/** 막별 기본 배경: 에피소드에 bg/mood가 없으면 이걸 쓴다 */
export const ACT_BG: Record<number, string> = {
  1: 'field', 2: 'tent', 3: 'egypt', 4: 'mountain', 5: 'wilderness', 6: 'town', 7: 'palace',
  8: 'starfield', 9: 'ruins', 10: 'palace', 11: 'sea', 12: 'sea', 13: 'house', 14: 'starfield',
};

/** 방주 (fx/ark.ts) */
export type ArkState = 'frame' | 'built' | 'boarding' | 'shut' | 'float' | 'rest';

/** 바벨탑 (fx/tower.ts) */
export type TowerState = 'base' | 'rising' | 'high' | 'far' | 'left';

export interface Mood {
  /** false면 태초의 어둠 (하늘이 거의 꺼짐) */
  light: boolean;
  /** false면 언덕이 없다 */
  land: boolean;
  art?: BackdropArt;
  /** dusk = 저녁의 서늘한 색, storm = 비구름에 덮인 잿빛 하늘, clear = 비 갠 뒤 맑게 씻긴 빛, night = 별이 뜬 밤 */
  tone?: 'dusk' | 'storm' | 'clear' | 'night';
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
  /** 바벨탑을 무대에 세운다 */
  tower?: TowerState;
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
  'descend', // 하늘에서 빛기둥이 탑 위로 내려옴 (창 11:5 "강림하셨더라")
  'babble', // 사람들의 말이 떠오르다 낯선 글자로 뒤섞여 흩어짐 (창 11:7)
  'scatter', // 탑 발치의 작은 사람들이 사방으로 걸어 나가 사라짐 (창 11:8)
  // ── 효과 라이브러리 (B급에서 자주 쓰는 것) ──
  'glory', // 하나님의 임재: 위에서 금빛이 내려와 무대를 감쌌다 걷힘 (인물로 그리지 않는다)
  'fire', // 무대 가운데 땅에서 불길이 일었다 잦아듦 (제단·횃불·떨기나무)
  'stars', // 하늘에 별이 쏟아지듯 하나씩 켜짐 (창 15:5 "하늘을 우러러 뭇별을 셀 수 있나")
  'dust', // 모래바람이 화면을 가로질러 지나감 (광야·먼 길)
  'fade', // 화면 전환: 까맣게 닫혔다가 열림. 그 사이에 배경·인물이 바뀐다 (시간이 흐름)
  'thunder', // 번개: 번쩍 + 진동
  'rain-start', // 비가 내리기 시작 (rain-stop까지)
  'rain-stop', // 비 그침
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

  // ── 바벨탑 (창 11:1–9) ──
  /** 시날 평지: 끝없이 평평한 땅, 강, 대추야자 (창 11:2) */
  shinar: { light: true, land: true, art: 'plain' },
  /** 벽돌 굽는 가마들, 말리는 벽돌 줄 (창 11:3) */
  brickworks: { light: true, land: true, art: 'kilns' },
  /** 탑의 아래 두 층, 비계와 일꾼들 (창 11:4) */
  'tower-base': { light: true, land: true, art: 'kilns', tower: 'base' },
  /** 넷째 층까지 올라간 탑 */
  'tower-rising': { light: true, land: true, art: 'plain', tower: 'rising' },
  /** 꼭대기가 구름에 닿은 탑, 해 질 녘 */
  'tower-high': { light: true, land: true, art: 'plain', tower: 'high', tone: 'dusk' },
  /** 하늘에서 보면: 점만 한 탑 (창 11:5) */
  'tower-far': { light: true, land: true, art: 'plain', tower: 'far', tone: 'clear' },
  /** 쌓다 만 탑, 빈 비계, 저녁 바람 (창 11:8-9) */
  'tower-left': { light: true, land: true, art: 'plain', tower: 'left', tone: 'dusk' },

  // ── 아브람의 길 (창 12:1-9) ──
  /** 세겜 땅 모레 상수리나무: 홀로 선 큰 나무, 먼 언덕의 가나안 성 (창 12:6) */
  moreh: { light: true, land: true, art: 'moreh' },
  /** 같은 나무 아래 아브람이 쌓은 단, 은은한 빛과 연기 (창 12:7) */
  'moreh-altar': { light: true, land: true, art: 'moreh-altar', spread: true },
  /** 벧엘 동편 산: 서는 벧엘, 동은 아이. 언덕 위의 단과 장막, 저녁 (창 12:8) */
  'bethel-ai': { light: true, land: true, art: 'bethel-ai', tone: 'dusk', spread: true },
  /** 같은 언덕의 밤 */
  'bethel-ai-night': { light: true, land: true, art: 'bethel-ai', tone: 'night', spread: true },
};

// 배경 라이브러리를 mood 이름으로 등록: tent, tent-dusk, tent-night, tent-dawn ...
// (field·field-dusk처럼 1막에서 이미 있는 이름은 그대로 둔다)
for (const place of Object.keys(PLACES) as PlaceArt[]) {
  for (const [suffix, tone] of Object.entries(VARIANTS)) {
    const name = place + suffix;
    if (MOODS[name]) continue;
    MOODS[name] = {
      light: true,
      land: !INDOOR.has(place) && place !== 'sea',
      art: place,
      tone: place === 'starfield' && !suffix ? 'night' : tone,
      spread: CENTERED.has(place) || undefined,
    };
  }
}
MOODS['field-night'] = { light: true, land: true, art: 'field', tone: 'night' };

const DEFAULT: Mood = { light: true, land: true };

export function moodOf(name: string | undefined): Mood {
  return (name && MOODS[name]) || DEFAULT;
}
