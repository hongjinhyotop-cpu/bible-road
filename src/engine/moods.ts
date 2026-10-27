// 장면 분위기(mood). 장면 JSON의 "mood"(시작)와 beat의 "mood"(중간에 바뀜)에 쓴다.
// 배경 그림(art)·밝기(light)·땅(land)·색조(tone)를 한 이름으로 묶는다. 그림은 fx/backdrop.ts.
// 목록에 없는 이름은 기본값(밝고, 언덕만 있는 무대)으로 처리한다. 검사 스크립트도 이 목록을 본다.

export type BackdropArt =
  | 'garden' | 'tree' | 'gate' | 'field' | 'altar' | 'altar-lit' | 'nod'
  | 'cities' | 'yard' | 'peaks' | 'peaks-green' | 'altar-one' | 'vineyard'
  | 'plain' | 'kilns'
  | 'moreh' | 'moreh-altar' | 'bethel-ai'
  | 'moriah-far' | 'moriah' | 'moriah-altar' | 'moriah-thicket' | 'moriah-fire'
  | 'nile' | 'nile-basket' | 'nile-basket-side' | 'nile-found'
  | 'nile-blood' | 'goshen-dark'
  | 'horeb' | 'bush' | 'bush-snake'
  | 'stew-tent' | 'cook-tent' | 'isaac-tent'
  | 'luz' | 'luz-ladder' | 'luz-pillar'
  | 'jabbok' | 'jabbok-cross' | 'jabbok-grey' | 'jabbok-sun' | 'seir-road' | 'seir-host' | 'seir-near'
  | 'sheaves' | 'eleven-stars' | 'dothan' | 'dothan-caravan' | 'cistern'
  | 'goshen-house' | 'goshen-blood' | 'passover-night' | 'egypt-lamps'
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
  // ── 애굽의 재앙 (출 7–10, fx/plagues.ts) — 다른 재앙·심판 장면에서도 쓸 수 있다 ──
  'frogs', // 작은 개구리들이 무대 아래를 폴짝폴짝 가로지름
  'gnats', // 땅의 티끌이 작은 점(이)으로 일어나 낮게 떼 지어 일렁임
  'flies', // 파리 떼: 큰 점 몇 무리가 윙윙 맴돌며 화면을 채움
  'ash', // 무대 가운데서 재가 하늘로 흩날려 퍼졌다가 내려앉음 (독종)
  'hail', // 우박: 쏟아지는 얼음 줄기 + 불덩이, 땅에 닿은 불이 번졌다 꺼짐 (thunder와 같이 쓰면 좋음)
  'locusts', // 메뚜기 떼 구름이 몰려와 하늘·땅을 어둡게 덮고 지나감
  // ── 유월절 (출 12, fx/passover.ts) ──
  'passover', // 어두운 바람이 무대를 쓸고 지나감. 피 바른 문(mood passover-night)만 비켜 가 불빛이 남는다 (출 12:23)
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

  // ── 모리아 (창 22:1-19) ──
  /** 제 삼일, 멀리 보이는 그 산: 광야 길 끝에 홀로 선 산, 꼭대기에 희미한 빛 (창 22:4) */
  'moriah-far': { light: true, land: true, art: 'moriah-far', tone: 'clear' },
  /** 같은 산, 해 질 녘 (사흘 길의 저녁) */
  'moriah-far-dusk': { light: true, land: true, art: 'moriah-far', tone: 'dusk' },
  /** 모리아 산꼭대기: 바위 마루, 흩어진 돌, 발아래 먼 산줄기 (창 22:9) */
  moriah: { light: true, land: true, art: 'moriah', spread: true },
  /** 돌을 쌓은 단 위에 벌여 놓은 나무. 아직 불은 없다 (창 22:9) */
  'moriah-altar': { light: true, land: true, art: 'moriah-altar', spread: true },
  /** 같은 단, 빛이 꺼져 가는 무거운 순간 (창 22:10) */
  'moriah-altar-dusk': { light: true, land: true, art: 'moriah-altar', tone: 'dusk', spread: true },
  /** 뒤의 수풀: 뿔이 걸린 숫양 한 마리, 은은한 빛 (창 22:13) */
  'moriah-ram': { light: true, land: true, art: 'moriah-thicket', tone: 'clear', spread: true },
  /** 아들 대신 드린 번제: 단 위의 불과 연기 (창 22:13-14 "여호와 이레") */
  'moriah-fire': { light: true, land: true, art: 'moriah-fire', tone: 'clear', spread: true },

  // ── 나일강 갈대밭 (출 2:3-10, fx/nile.ts) ──
  /** 나일 강가: 맞은편 왕궁 탑문, 넓은 강, 우거진 파피루스 */
  nile: { light: true, land: true, art: 'nile' },
  /** 같은 강가, 해 질 녘 */
  'nile-dusk': { light: true, land: true, art: 'nile', tone: 'dusk' },
  /** 갈대 사이에 떠 있는 갈 상자 (출 2:3) — 이른 아침 */
  'nile-basket': { light: true, land: true, art: 'nile-basket', tone: 'clear', spread: true },
  /** 같은 상자, 한낮 (출 2:5 바로의 딸이 목욕하러 내려옴). 셋이 서도 보이게 상자가 가운데에서 조금 오른쪽 */
  'nile-basket-day': { light: true, land: true, art: 'nile-basket-side', spread: true },
  /** 건져 올려 연 상자, 우는 아이 (출 2:6). 상자는 가운데에서 조금 오른쪽 */
  'nile-found': { light: true, land: true, art: 'nile-found', spread: true },

  // ── 애굽의 재앙 (출 7–10, fx/nile.ts · fx/plagues.ts) ──
  /** 피로 변한 나일: 붉게 물든 강, 천천히 도는 짙은 소용돌이, 떠내려가는 죽은 고기 (출 7:20-21) */
  'nile-blood': { light: true, land: true, art: 'nile-blood' },
  /** 우박이 내리는 들: 이삭 팬 보리밭, 잿빛 폭풍 하늘 (출 9:23-31). fx hail · thunder와 함께 */
  'hail-field': { light: true, land: true, art: 'field', tone: 'storm' },
  /** 흑암: 더듬을 만한 어둠. 멀리 고센의 집 몇 채에만 등잔 불빛 (출 10:21-23) */
  darkness: { light: false, land: false, art: 'goshen-dark' },

  // ── 호렙산의 떨기나무 (출 3:1-4:17, fx/bush.ts) ──
  /** 하나님의 산 호렙, 비탈의 이드로 양 떼, 왼쪽 앞에 떨기나무 (아직 불 없음) (출 3:1) */
  horeb: { light: true, land: false, art: 'horeb', spread: true },
  /** 같은 곳, 해 질 녘 */
  'horeb-dusk': { light: true, land: false, art: 'horeb', tone: 'dusk', spread: true },
  /** 떨기나무에 불이 붙었으나 타지 않는다: 잎은 초록 그대로, 불꽃이 춤추고 빛 알갱이가 오른다 (출 3:2) */
  bush: { light: true, land: false, art: 'bush', spread: true },
  /** 같은 떨기나무, 해 질 녘 (불빛이 더 또렷하다) */
  'bush-dusk': { light: true, land: false, art: 'bush', tone: 'dusk', spread: true },
  /** 같은 떨기나무 + 땅에 던진 지팡이가 된 뱀 (출 4:3) */
  'bush-snake': { light: true, land: false, art: 'bush-snake', spread: true },

  // ── 이삭 집의 장막 안 (창 25:29-34 · 창 27, fx/stew.ts) ──
  /** 장막 안 화덕 위 토기 솥에 붉은 팥죽이 끓는다. 오른쪽 문으로 들빛 (창 25:29) */
  'stew-tent': { light: true, land: false, art: 'stew-tent', spread: true },
  /** 같은 장막, 해 질 녘 */
  'stew-tent-dusk': { light: true, land: false, art: 'stew-tent', tone: 'dusk', spread: true },
  /** 같은 솥에 갈색 별미가 끓는다 (창 27:14) */
  'cook-tent': { light: true, land: false, art: 'cook-tent', spread: true },
  /** 문 휘장을 내린 이삭의 어두운 장막: 잠자리, 등잔 하나 (창 27:1) */
  'isaac-tent': { light: true, land: false, art: 'isaac-tent', tone: 'dusk' },
  /** 같은 장막, 밤 */
  'isaac-tent-night': { light: true, land: false, art: 'isaac-tent', tone: 'night' },

  // ── 벧엘의 사다리 (창 28:10-22, fx/ladder.ts) ──
  /** 루스 바깥 돌투성이 산마루, 해 질 녘. 가운데 베개 삼을 납작한 돌 (창 28:11) */
  'bethel-stone': { light: true, land: true, art: 'luz', tone: 'dusk', spread: true },
  /** 같은 자리, 밤. 별이 뜬다 */
  'bethel-night': { light: true, land: true, art: 'luz', tone: 'night', spread: true },
  /** 꿈: 땅에서 하늘 끝까지 선 빛의 사닥다리, 오르내리는 빛의 사자들, 꼭대기의 빛 (창 28:12-13) */
  ladder: { light: true, land: true, art: 'luz-ladder', tone: 'night', spread: true },
  /** 아침: 베개였던 돌을 세운 기둥, 위에 부은 기름이 반짝인다 (창 28:18) */
  'bethel-pillar': { light: true, land: true, art: 'luz-pillar', tone: 'clear', spread: true },

  // ── 얍복 나루 (창 32, fx/jabbok.ts) ──
  /** 길르앗 골짜기의 얍복 여울, 해 질 녘. 징검돌, 양쪽 가파른 산 (창 32:22) */
  'jabbok-dusk': { light: true, land: false, art: 'jabbok', tone: 'dusk' },
  /** 같은 여울, 달 없는 밤. 별만 (창 32:24 "야곱은 홀로 남았더니") */
  'jabbok-night': { light: true, land: false, art: 'jabbok', tone: 'night' },
  /** 밤에 등불 하나를 앞세운 행렬이 징검돌을 따라 건너간다 (창 32:22-23) */
  'jabbok-cross': { light: true, land: false, art: 'jabbok-cross', tone: 'night' },
  /** 골짜기 동쪽 틈으로 새벽의 첫 잿빛 (창 32:26 "날이 새려 하니") */
  'jabbok-grey': { light: true, land: false, art: 'jabbok-grey', tone: 'night' },
  /** 해가 돋았다. 물에 빛이 깔린다 (창 32:31) */
  'jabbok-dawn': { light: true, land: false, art: 'jabbok-sun', tone: 'clear' },

  // ── 세일 들 (창 33, fx/jabbok.ts) ──
  /** 얍복 남쪽 넓은 들, 아침. 지평선까지 굽은 길 (창 33:1) */
  'seir-road': { light: true, land: false, art: 'seir-road', tone: 'clear' },
  /** 같은 들, 먼 마루를 따라 늘어선 사백 인. 창끝이 반짝이고 먼지가 인다 (창 33:1) */
  'seir-host': { light: true, land: false, art: 'seir-host', tone: 'clear' },
  /** 사백 인이 바로 뒤 비탈까지 와 섰다 (창 33:4) */
  'seir-near': { light: true, land: false, art: 'seir-near', tone: 'clear' },

  // ── 요셉의 꿈과 도단의 구덩이 (창 37, fx/dothan.ts) ──
  /** 꿈 1: 밭 한가운데 요셉의 단이 일어서고, 둘러선 열한 단이 차례로 그 단에 절한다 (창 37:7) */
  'dream-sheaves': { light: true, land: false, art: 'sheaves', spread: true },
  /** 꿈 2: 밤하늘의 해와 달과 열한 별이 하나씩 내려앉으며 고개를 숙인다 (창 37:9) */
  'dream-stars': { light: true, land: false, art: 'eleven-stars', tone: 'night', spread: true },
  /** 도단 들: 먼 언덕의 도단 성, 양 떼, 길르앗에서 애굽으로 가는 대상로, 가운데 물 없는 구덩이 (창 37:17, 24) */
  dothan: { light: true, land: false, art: 'dothan', spread: true },
  /** 같은 들, 해 질 녘 */
  'dothan-dusk': { light: true, land: false, art: 'dothan', tone: 'dusk', spread: true },
  /** 같은 들 + 향품 실은 이스마엘 사람들의 낙타 떼가 길을 따라 애굽 쪽으로 지나간다 (창 37:25) */
  'dothan-caravan': { light: true, land: false, art: 'dothan-caravan', spread: true },
  /** 구덩이 안: 둥근 돌벽, 머리 위로 동그란 하늘 한 조각, 비스듬한 빛 (창 37:24 "물이 없었더라") */
  'dothan-pit': { light: true, land: false, art: 'cistern' },

  // ── 유월절 밤 (출 11–12, fx/passover.ts) ──
  /** 고센의 흙벽돌 집, 해 질 녘. 가운데 열린 문 안에 등잔 불빛. 아직 피는 없다 (출 12:3-6) */
  'goshen-house': { light: true, land: false, art: 'goshen-house', tone: 'dusk', spread: true },
  /** 같은 집: 문 인방과 좌우 설주에 피가 우슬초 자국으로 그어진다. 문 앞에 피 담은 그릇과 우슬초 (출 12:7, 12:22) */
  'goshen-blood': { light: true, land: false, art: 'goshen-blood', tone: 'dusk', spread: true },
  /** 보름달 밤. 피 바른 문 안에서 식구들이 선 채로, 지팡이를 짚고 급히 먹는다 (출 12:8-11). fx passover와 함께 */
  'passover-night': { light: false, land: false, art: 'passover-night', spread: true },
  /** 멀리 애굽 성읍의 밤: 등불이 가운데 왕궁부터 하나씩 꺼져 변두리 옥까지 (출 12:29) */
  'egypt-lamps': { light: false, land: false, art: 'egypt-lamps' },
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
