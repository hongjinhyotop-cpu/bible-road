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
  | 'redsea-camp' | 'redsea-chariots' | 'redsea-pillar' | 'redsea-wind' | 'redsea-part' | 'redsea-crossing' | 'redsea-chase' | 'redsea-return' | 'redsea-sunrise'
  | 'joseph-hall' | 'joseph-hall-shut' | 'joseph-coffin'
  | 'sinai-camp' | 'sinai-bound' | 'sinai-storm' | 'sinai-fire' | 'sinai-dark'
  | 'sin-camp' | 'sin-glory' | 'sin-quail' | 'sin-dew' | 'sin-manna' | 'sin-melt'
  | 'calf-camp' | 'calf-forge' | 'calf-idol' | 'calf-feast' | 'calf-view' | 'calf-burn' | 'calf-ash'
  | 'ord-court' | 'ord-altar' | 'ord-blaze'
  | 'sf-court' | 'sf-ash' | 'sf-outside'
  | 'atone-lots' | 'atone-live' | 'atone-gone' | 'atone-holy' | 'atone-edge'
  | 'bz-road' | 'bz-camp' | 'bz-pole' | 'bz-pole-lit'
  | 'cov-count' | 'cov-pieces'
  | 'mamre' | 'mamre-meal' | 'mamre-door' | 'mamre-laugh' | 'mamre-start' | 'sodom-view'
  | 'sodom-gate' | 'sodom-gate-grey' | 'lot-house' | 'lot-door' | 'sodom-mob' | 'sodom-plain' | 'sodom-fire' | 'salt-pillar' | 'sodom-smoke'
  | 'potiphar' | 'potiphar-cloak' | 'round-prison' | 'dream-cows' | 'dream-cows-lean' | 'dream-ears' | 'dream-ears-thin' | 'pharaoh-court' | 'chariot' | 'granary' | 'granary-famine'
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
  tabernacle: '성막 뜰: 세마포 울타리, 가운데 번제단과 연기, 뒤로 성막 장막과 그 위 구름 기둥 (레위기·민수기)',
  camp: '광야의 진: 지평선까지 늘어선 장막들, 지파 깃발, 가운데 멀리 성막과 구름 기둥 (레위기·민수기)',
} as const;
export type PlaceArt = keyof typeof PLACES;

/** 실내 장소: 언덕(land)을 깔지 않는다 */
const INDOOR = new Set<PlaceArt>(['palace', 'temple', 'house', 'prison']);
/** 가운데 소품이 있는 장소: 폰에서 인물을 양옆으로 벌려 세운다 */
const CENTERED = new Set<PlaceArt>(['well', 'cave', 'tabernacle']);
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
  // ── 홍해 (출 14, fx/sea.ts) ──
  'east-wind', // 큰 동풍: 바람 줄기가 화면을 가로질러 몰아침 (약 9초, 출 14:21)
  // ── 나는 요셉이라 (창 45, fx/hall.ts) ──
  'weep', // 큰 울음: 요셉에게서 소리의 고리가 둥글게 퍼져 벽 너머로 나간다 (약 9초, 창 45:2)
  // ── 시내산 (출 19–20, fx/sinai.ts) ──
  'trumpet', // 나팔 소리: 산꼭대기(sinai-* 배경)에서 금빛 소리의 고리가 퍼진다. 부를 때마다 더 크고 밝다 (약 8초, 출 19:16-19)
  // ── 만나 (출 16, fx/manna.ts) ──
  'quail', // 메추라기 떼: 작은 새들이 한쪽에서 낮게 몰려와 무대를 휩쓸고, 절반쯤 땅에 내려앉음 (약 11초, 출 16:13). 뒤이어 배경 sin-quail
  'stink', // 냄새: 말하는 사람(없으면 오른쪽 사람) 곁에서 옅은 잿빛 김이 구불구불 오르고 날벌레 두엇이 맴돎 (약 6초, 출 16:20). 가볍게
  // ── 금송아지 (출 32, fx/calf.ts) ──
  'tablets-break', // 돌판 깨짐: 떠 있는 증거판 두 돌판(item tablets, 없으면 세움)에 금이 그어지고 여덟 조각으로 갈라져 아래로 떨어짐 (약 3초, 출 32:19)
  // ── 대속죄일 (레 16, fx/atonement.ts) ──
  'cast-lots', // 제비뽑기: 두 염소(배경 atone-lots) 위로 제비가 떠올라 왼쪽은 금빛 "여호와께", 오른쪽은 잿빛 "아사셀에게" (약 9초, 레 16:8)
  'incense-cloud', // 향연: 아래에서 흰 향 연기가 피어올라 떠 있는 기구(item ark)를 덮고 머물렀다 옅어짐 (약 13초, 레 16:13)
  'confess', // 안수와 고백: 사방에서 어두운 티끌이 모여들어 산 염소(배경 atone-live)의 머리에 내려앉고, 염소가 검게 가라앉음 (약 7초, 레 16:21)
  'scapegoat', // 아사셀 염소: 정한 사람이 염소를 끌고 길(배경 atone-edge)을 따라 지평선 쪽으로 작아지고, 염소 혼자 너머로 사라짐 (약 15초, 레 16:22)
  // ── 하늘에서 내린 불 (레 8–9, fx/ordination.ts) ──
  'fire-fall', // 여호와 앞에서 나온 불: 성막 쪽이 밝아지고 금빛 불줄기가 제단(ord-* 배경)으로 내리꽂혀 번쩍, 불티가 솟고 무대가 금빛으로 물듦 (약 9초, 레 9:24). 배경 ord-blaze와 같이
  // ── 다른 불 (레 10, fx/strangefire.ts) ──
  // ── 놋뱀 (민 21, fx/brazen.ts) ──
  'fiery-serpents', // 불뱀: 모래 위를 불빛 같은 줄기들이 구불구불 스쳐 가고 무대 아래가 붉게 어두워짐 (약 10초, 민 21:6). 무는 모습 없음 — fall과 같이
  'serpent-lift', // 놋뱀을 쳐다봄: 장대 위 놋뱀(bz-pole 배경)에서 금빛이 번지고 고리가 퍼짐 (약 9초, 민 21:9). 배경 bz-pole-lit과 같이
  'strange-fire', // 심판의 불: 회막 문(sf-* 배경)에서 흰 불이 앞으로 곧게 터져 나와 무대를 덮고, 불티만 남기고 걷힘 (약 7초, 레 10:2). 쓰러짐(fall)과 같이, 몸이 타는 모습은 없음
  // ── 별을 세어 보라 (창 15, fx/covenant.ts) ──
  'kites', // 솔개 서너 마리가 하늘을 돌다 쪼갠 고기(배경 covenant-*) 쪽으로 내리꽂혔다가 쫓겨 흩어짐 (약 8초, 창 15:11)
  'torch-pass', // 연기 나는 풀무와 타는 횃불이 쪼갠 고기 사이 길을 따라 지평선에서 보는 쪽으로 지나옴. 드는 사람 없음 (약 12초, 창 15:17)
  // ── 뒤돌아보지 말라 (창 19, fx/sodom.ts) ──
  'blind', // 눈을 어둡게 함: 문 쪽에서 흰빛이 터져 화면을 덮었다가 천천히 걷힘 (약 5초, 창 19:11)
  // ── 요셉의 애굽 (창 39·41, fx/egypt-court.ts) ──
  'signet', // 인장 반지와 금사슬: 요셉의 손과 목에서 차례로 금빛이 반짝임 (약 4초, 창 41:42)
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

  // ── 바다가 갈라지다 (출 14, fx/sea.ts) ──
  /** 비하히롯 앞 바닷가 진: 바다 건너 바알스본 산, 왼쪽 믹돌 망대, 물가의 장막들 (출 14:2) */
  'sea-camp': { light: true, land: false, art: 'redsea-camp' },
  /** 같은 진, 해 질 녘 */
  'sea-camp-dusk': { light: true, land: false, art: 'redsea-camp', tone: 'dusk' },
  /** 해 질 녘 서쪽 마루를 따라 먼지를 일으키며 다가오는 병거의 줄, 반짝이는 창끝 (출 14:9-10) */
  'sea-chariots': { light: true, land: false, art: 'redsea-chariots' },
  /** 밤: 두 진 사이에 선 불 기둥. 왼쪽 애굽 진은 구름과 흑암, 오른쪽 이스라엘 진은 불빛 (출 14:19-20) */
  'sea-pillar': { light: true, land: false, art: 'redsea-pillar', tone: 'night', spread: true },
  /** 밤바다에 큰 동풍: 물결이 일어서고 구름이 달린다 (출 14:21). fx east-wind와 함께 */
  'sea-wind': { light: true, land: false, art: 'redsea-wind', tone: 'night', spread: true },
  /** 물이 갈라진다: 가운데가 꺼지며 길이 열리고 좌우로 물벽이 솟는다 (약 9초, 탭하면 빨리 감김) (출 14:21) */
  'sea-part': { light: true, land: false, art: 'redsea-part', tone: 'night', spread: true },
  /** 물벽 사이 마른 길: 백성이 긴 줄로 바다 가운데를 걸어 멀어진다 (출 14:22) */
  'sea-crossing': { light: true, land: false, art: 'redsea-crossing', tone: 'night', spread: true },
  /** 새벽 잿빛, 같은 길에 들어온 병거들이 비틀거리고 바퀴가 빠진다 (출 14:23-25) */
  'sea-chase': { light: true, land: false, art: 'redsea-chase', tone: 'storm', spread: true },
  /** 물벽이 안쪽으로 무너지고 길이 물에 덮인다 (약 9초, 탭하면 빨리 감김). 사람은 그리지 않는다 (출 14:27-28) */
  'sea-return': { light: true, land: false, art: 'redsea-return', tone: 'storm', spread: true },
  /** 해 돋는 잔잔한 바다, 물가 모래에 반쯤 묻힌 병거 바퀴 하나 (출 14:30-31) */
  'sea-sunrise': { light: true, land: false, art: 'redsea-sunrise', tone: 'clear' },

  // ── 나는 요셉이라 (창 44:18–45:15, fx/hall.ts) ──
  /** 요셉의 집 큰 방: 파피루스 기둥, 그림 글자 띠, 화로, 열린 큰 문 너머 이집트 한낮 */
  'joseph-hall': { light: true, land: false, art: 'joseph-hall' },
  /** 같은 방, 모두 물러가고 문이 닫힘: 문틈으로만 빛, 화로는 낮게 (창 45:1) */
  'joseph-hall-shut': { light: true, land: false, art: 'joseph-hall-shut' },
  /** 같은 방, 저녁 */
  'joseph-hall-dusk': { light: true, land: false, art: 'joseph-hall-shut', tone: 'dusk' },
  /** 요셉의 관: 어두운 돌방, 등잔 하나, 낮은 상 위의 이집트식 사람 모양 관과 향 재료 항아리 (창 50:26, fx/coffin.ts) */
  'joseph-coffin': { light: true, land: false, art: 'joseph-coffin' },

  // ── 시내산 (출 19–20, fx/sinai.ts) ──
  /** 시내 광야: 가운데 우뚝 선 붉은 화강암 산, 발치에 늘어선 장막 (출 19:1-2) */
  'sinai-camp': { light: true, land: false, art: 'sinai-camp', tone: 'clear', spread: true },
  /** 같은 진, 해 질 녘 */
  'sinai-camp-dusk': { light: true, land: false, art: 'sinai-camp', tone: 'dusk', spread: true },
  /** 산 둘레에 말뚝과 줄로 지경을 세웠다. 줄이 은은하게 빛난다 (출 19:12) */
  'sinai-bound': { light: true, land: false, art: 'sinai-bound', spread: true },
  /** 제 삼일 아침: 빽빽한 먹구름이 산을 삼키고 번개가 친다. 기슭의 백성(crowd)이 떤다 (출 19:16) */
  'sinai-storm': { light: true, land: false, art: 'sinai-storm', tone: 'storm', spread: true },
  /** 불 가운데 강림: 꼭대기의 불, 옹기 가마 같은 연기 기둥, 이따금 떠는 산 (출 19:18) */
  'sinai-fire': { light: true, land: false, art: 'sinai-fire', tone: 'storm', spread: true },
  /** 하나님이 계신 흑암: 꼭대기를 덮은 짙은 어둠, 가장자리만 금빛 (출 20:21) */
  'sinai-dark': { light: true, land: false, art: 'sinai-dark', tone: 'storm', spread: true },

  // ── 신 광야의 만나 (출 16, fx/manna.ts) ──
  /** 신 광야의 진: 넓고 평평한 모래 광야, 멀리 낮은 산줄기, 겹겹이 흩어진 장막들 (출 16:1) */
  'sin-camp': { light: true, land: false, art: 'sin-camp' },
  /** 같은 진, 해 질 녘 */
  'sin-camp-dusk': { light: true, land: false, art: 'sin-camp', tone: 'dusk' },
  /** 같은 진, 밤 (장막 몇에 불빛) */
  'sin-camp-night': { light: true, land: false, art: 'sin-camp', tone: 'night' },
  /** 같은 진, 맑은 아침 (아무것도 없는 맨땅 — 안식일 아침) */
  'sin-camp-dawn': { light: true, land: false, art: 'sin-camp', tone: 'clear' },
  /** 광야 쪽 하늘의 구름 속에 여호와의 영광: 금빛이 숨 쉬듯 밝아지고 아래로 빛줄기 (출 16:10). 인물로 그리지 않는다 */
  'sin-glory': { light: true, land: false, art: 'sin-glory', tone: 'dusk' },
  /** 진을 덮은 메추라기: 장막 사이와 앞쪽 땅에 내려앉은 새들, 몇은 고개를 까딱 (출 16:13). fx quail 뒤에 */
  'sin-quail': { light: true, land: false, art: 'sin-quail', tone: 'dusk' },
  /** 새벽, 진 사면에 낮게 깔린 이슬 안개 (출 16:13) */
  'manna-dew': { light: true, land: false, art: 'sin-dew', tone: 'clear' },
  /** 이슬이 마른 아침: 땅을 덮은 작고 둥근, 서리 같은 흰 알갱이. 드문드문 반짝 (출 16:14) */
  'manna-dawn': { light: true, land: false, art: 'sin-manna', tone: 'clear' },
  /** 한낮: 뜨거운 해, 아지랑이, 땅의 만나가 천천히 스러진다 (출 16:21) */
  'manna-noon': { light: true, land: false, art: 'sin-melt' },

  // ── 금송아지 (출 32, fx/calf.ts) ──
  /** 시내산 발치의 진, 밤: 흑암에 덮인 산꼭대기, 장막 사이 모닥불 (출 32:1) */
  'calf-camp': { light: true, land: false, art: 'calf-camp', tone: 'night' },
  /** 진 한가운데 풀무 구덩이: 금이 녹는 빛, 튀는 불티 (출 32:4 "부어서") */
  'calf-forge': { light: true, land: false, art: 'calf-forge', tone: 'night' },
  /** 돌 받침 위의 금송아지가 불빛에 빛나고, 그 앞에 단 (출 32:4-5). 폰에서 인물은 양옆으로 */
  'calf-idol': { light: true, land: false, art: 'calf-idol', tone: 'night', spread: true },
  /** 잔치: 송아지 + 불붙은 단 + 둘레에서 들썩이는 사람들의 그림자 (출 32:6, 19). 절제 */
  'calf-feast': { light: true, land: false, art: 'calf-feast', tone: 'night', spread: true },
  /** 산길 위에서 내려다본 진: 멀리 불빛 점과 금빛 한 점, 피어오르는 소리의 고리 (출 32:17-18) */
  'calf-view': { light: true, land: false, art: 'calf-view', tone: 'night' },
  /** 불살라: 송아지가 불길에 싸여 검게 식으며 주저앉음, 산 아래 돌판 조각 (출 32:20) */
  'calf-burn': { light: true, land: false, art: 'calf-burn', tone: 'dusk', spread: true },
  /** 이튿날 아침: 빈 받침의 재, 금가루가 반짝이며 흐르는 시내 (출 32:20, 신 9:21) */
  'calf-ash': { light: true, land: false, art: 'calf-ash', tone: 'clear' },

  // ── 대속죄일 (레 16, fx/atonement.ts) ──
  /** 회막 문 앞: 성막과 구름 기둥, 세마포 뜰, 매어 둔 수염소 둘 (레 16:7) */
  'atone-lots': { light: true, land: false, art: 'atone-lots', spread: true },
  'atone-lots-dawn': { light: true, land: false, art: 'atone-lots', tone: 'clear', spread: true },
  /** 같은 자리, 산 염소 하나 (레 16:20-21 안수) */
  'atone-live': { light: true, land: false, art: 'atone-live', spread: true },
  'atone-live-dusk': { light: true, land: false, art: 'atone-live', tone: 'dusk', spread: true },
  /** 같은 자리, 염소가 떠난 빈 말뚝 (레 16:23-28) */
  'atone-gone': { light: true, land: false, art: 'atone-gone', spread: true },
  'atone-gone-dusk': { light: true, land: false, art: 'atone-gone', tone: 'dusk', spread: true },
  /** 지성소 안: 금 널판 벽, 양옆 휘장, 가운데 위에 고인 빛. 법궤는 item ark로 (레 16:2, 12-15) */
  'atone-holy': { light: true, land: false, art: 'atone-holy' },
  /** 진의 가장자리: 바라보는 사람들의 등, 지평선까지 굽은 광야 길 (레 16:21-22) */
  'atone-edge': { light: true, land: false, art: 'atone-edge', spread: true },
  'atone-edge-dusk': { light: true, land: false, art: 'atone-edge', tone: 'dusk', spread: true },

  // ── 하늘에서 내린 불 (레 8–9, fx/ordination.ts) ──
  /** 회막 문 앞: 세마포 뜰 울타리와 청·자·홍색 뜰 문, 성막 지붕 위 구름 기둥, 앞에 놋 번제단(불 없음)과 물두멍 (레 8:3-4) */
  'ord-court': { light: true, land: false, art: 'ord-court', spread: true },
  /** 같은 뜰, 맑은 아침 */
  'ord-court-dawn': { light: true, land: false, art: 'ord-court', tone: 'clear', spread: true },
  /** 같은 뜰, 밤 (위임식 칠 주야, 레 8:35) */
  'ord-court-night': { light: true, land: false, art: 'ord-court', tone: 'night', spread: true },
  /** 같은 뜰, 제단 위에서 제물이 타고 연기가 오른다 (레 8:16-28, 9:8-21) */
  'ord-altar': { light: true, land: false, art: 'ord-altar', spread: true },
  /** 하늘에서 내린 불: 제단 위에 높은 금빛 불, 구름 기둥 속이 빛나고 뜰 전체가 금빛 (레 9:24). fx fire-fall과 같이 */
  'ord-blaze': { light: true, land: false, art: 'ord-blaze', spread: true },

  // ── 다른 불 (레 10, fx/strangefire.ts) ──
  /** 성막 뜰: 구름 기둥 아래 성막과 청·자·홍색 문, 문 안의 빛, 세마포 포장, 꺼지지 않는 번제단 불, 물두멍. fx strange-fire는 이 문에서 나온다 */
  'sf-court': { light: true, land: false, art: 'sf-court', spread: true },
  /** 같은 뜰, 저녁 (레 10:16-20) */
  'sf-court-dusk': { light: true, land: false, art: 'sf-court', tone: 'dusk', spread: true },
  /** 일이 지난 뒤: 회막 문 앞 그을린 땅, 엎어진 향로 둘, 식어 가는 숯과 가는 연기 (레 10:2-3) */
  'sf-ash': { light: true, land: false, art: 'sf-ash', tone: 'dusk', spread: true },
  /** 진 밖: 지평선의 진과 작은 구름 기둥, 빈 땅, 지는 해 (레 10:4-5) */
  'sf-outside': { light: true, land: false, art: 'sf-outside', tone: 'dusk' },

  // ── 놋뱀 (민 21, fx/brazen.ts) ──
  /** 에돔 땅을 두르는 길: 붉은 사암 산줄기, 지평선까지 굽은 하얀 길과 먼 행렬, 흰 해, 아지랑이 (민 21:4) */
  'bz-road': { light: true, land: false, art: 'bz-road' },
  'bz-road-dusk': { light: true, land: false, art: 'bz-road', tone: 'dusk' },
  /** 광야의 진: 낮은 장막들, 먼 구름 기둥, 모래 결, 마른 덤불 (민 21:5-7) */
  'bz-camp': { light: true, land: false, art: 'bz-camp' },
  'bz-camp-dusk': { light: true, land: false, art: 'bz-camp', tone: 'dusk' },
  'bz-camp-night': { light: true, land: false, art: 'bz-camp', tone: 'night' },
  /** 진 한가운데 장대, 장대를 감고 올라 고개 든 놋뱀 (민 21:8-9) */
  'bz-pole': { light: true, land: false, art: 'bz-pole', tone: 'dusk', spread: true },
  'bz-pole-dawn': { light: true, land: false, art: 'bz-pole', tone: 'clear', spread: true },
  /** 같은 장대, 놋뱀이 금빛으로 빛나고 빛살이 돈다 (민 21:9). fx serpent-lift와 같이 */
  'bz-pole-lit': { light: true, land: false, art: 'bz-pole-lit', tone: 'dusk', spread: true },

  // ── 별을 세어 보라 (창 15, fx/covenant.ts) ──
  /** 장막 밖 넓은 밤하늘: 별이 처음엔 몇 개, 시간이 갈수록 셀 수 없이 켜지고 은하수가 떠오른다 (창 15:5). 낮은 언덕과 장막 */
  'stars-count': { light: true, land: false, art: 'cov-count', tone: 'night', spread: true },
  /** 쪼갠 고기를 마주 대하여 놓은 두 줄과 그 사이 길 (천을 덮은 덩이, 끝에 쪼개지 않은 새 둘) (창 15:10) */
  'covenant-pieces': { light: true, land: false, art: 'cov-pieces', spread: true },
  /** 같은 곳, 해 질 녘 (창 15:12) */
  'covenant-pieces-dusk': { light: true, land: false, art: 'cov-pieces', tone: 'dusk', spread: true },
  /** 같은 곳, 해가 져서 캄캄함 (창 15:12, 17). fx torch-pass와 함께 */
  'covenant-dark': { light: false, land: false, art: 'cov-pieces', tone: 'night', spread: true },

  // ── 마므레의 세 손님 (창 18, fx/mamre.ts) ──
  /** 오정의 마므레 상수리 수풀: 염소털 큰 장막(문 휘장 뒤에 사라의 그림자), 큰 상수리나무, 흰 해, 아지랑이 (창 18:1) */
  mamre: { light: true, land: false, art: 'mamre' },
  /** 같은 곳 + 나무 그늘 아래 차린 떡·버터·우유·송아지 요리, 김 (창 18:8) */
  'mamre-meal': { light: true, land: false, art: 'mamre-meal', spread: true },
  /** 장막 문 가까이: 뒤에서 빛을 받은 휘장에 사라의 그림자가 귀를 기울인다 (창 18:10) */
  'mamre-door': { light: true, land: false, art: 'mamre-door' },
  /** 같은 휘장, 그림자가 손으로 입을 가리고 어깨를 들썩인다 (창 18:12 "속으로 웃고") */
  'mamre-laugh': { light: true, land: false, art: 'mamre-laugh' },
  /** 같은 휘장, 그림자가 움찔 물러선다 (창 18:13-15) */
  'mamre-start': { light: true, land: false, art: 'mamre-start' },
  /** 헤브론 동쪽 산마루 길, 해 질 녘: 발아래 멀리 요단 들과 사해, 아지랑이 속 작은 성들 (창 18:16) */
  'sodom-view': { light: true, land: false, art: 'sodom-view', tone: 'dusk' },
  /** 같은 산마루, 밤 */
  'sodom-view-night': { light: true, land: false, art: 'sodom-view', tone: 'night' },

  // ── 뒤돌아보지 말라 (창 19:1-29, fx/sodom.ts) ──
  /** 해 질 녘 소돔 성문: 두 망대 사이 아치문, 문 너머 성 안의 불빛, 문 곁 돌 의자, 종려 (창 19:1) */
  'sodom-gate': { light: true, land: false, art: 'sodom-gate', tone: 'dusk' },
  /** 같은 성문, 동틀 녘 잿빛 (창 19:15) */
  'sodom-grey': { light: true, land: false, art: 'sodom-gate-grey', tone: 'dusk' },
  /** 롯의 집 안, 밤: 흙벽, 벽감의 등잔, 낮은 상 위 무교병, 빗장 지른 널문 (창 19:3) */
  'lot-house': { light: true, land: false, art: 'lot-house', tone: 'night', spread: true },
  /** 같은 방: 문틈과 높은 창으로 바깥 횃불빛이 일렁이고 문이 떨린다 (창 19:4-9) */
  'lot-door': { light: true, land: false, art: 'lot-door', tone: 'night', spread: true },
  /** 바깥, 밤: 롯의 집을 사방에서 에워싼 무리 — 얼굴 없는 어두운 덩어리와 횃불 (창 19:4) */
  'sodom-mob': { light: true, land: false, art: 'sodom-mob', tone: 'night' },
  /** 동틀 녘의 들: 왼쪽 멀리 소돔, 오른쪽 산자락의 작은 성 소알, 그 사이 길 (창 19:17-23) */
  'plain-dawn': { light: true, land: false, art: 'sodom-plain', tone: 'clear' },
  /** 같은 들: 붉게 내려앉은 하늘, 먼 성들 위로 비같이 떨어지는 유황과 불 (창 19:24-25) */
  'sodom-fire': { light: true, land: false, art: 'sodom-fire' },
  /** 같은 들, 불은 멀리서 타고 길 위에 뒤를 돌아본 채 선 창백한 소금 기둥 (창 19:26) */
  'salt-pillar': { light: true, land: false, art: 'salt-pillar', spread: true },
  /** 헤브론 동쪽 산마루, 아침: 발아래 들에서 옹기 가마 같은 연기가 치밀어 오른다 (창 19:27-28) */
  'sodom-smoke': { light: true, land: false, art: 'sodom-smoke', tone: 'clear' },
  // ── 보디발의 집과 왕의 옥 (창 39, fx/egypt-court.ts) ──
  /** 보디발의 집 안: 연꽃 기둥, 연꽃 띠 벽화, 가운데 넓은 문 너머 해 드는 뜰(못·무화과·야자), 안채 휘장 문, 항아리 (창 39:2-6) */
  potiphar: { light: true, land: false, art: 'potiphar' },
  /** 같은 집, 해 질 녘 */
  'potiphar-dusk': { light: true, land: false, art: 'potiphar', tone: 'dusk' },
  /** 같은 집, 바닥 가운데 버려진 옷 한 벌 (창 39:12-16). 폰에서 인물은 양옆으로 */
  'potiphar-cloak': { light: true, land: false, art: 'potiphar-cloak', spread: true },
  /** 같은 옷, 해 질 녘 (주인이 돌아오기를 기다림, 창 39:16) */
  'potiphar-cloak-dusk': { light: true, land: false, art: 'potiphar-cloak', tone: 'dusk', spread: true },
  /** 왕의 죄수를 가두는 옥: 둥근 돌벽, 아주 높은 창 하나에서 천천히 옮겨 가는 빛기둥, 열쇠 꾸러미 (창 39:20-23, 41:14) */
  'round-prison': { light: true, land: false, art: 'round-prison' },
  /** 같은 옥, 밤 */
  'round-prison-night': { light: true, land: false, art: 'round-prison', tone: 'night' },

  // ── 바로의 꿈과 총리 (창 41, fx/egypt-court.ts) ──
  /** 꿈 1: 안개 낀 나일, 아름답고 살진 일곱 암소가 물에서 하나씩 올라온다 (창 41:2) */
  'dream-cows': { light: true, land: false, art: 'dream-cows', tone: 'dusk', spread: true },
  /** 꿈 1 뒤: 흉하고 파리한 일곱 암소가 올라오고, 살진 소들이 하나씩 어둠에 삼켜진다 (약 8초, 창 41:3-4) */
  'dream-cows-lean': { light: true, land: false, art: 'dream-cows-lean', tone: 'dusk', spread: true },
  /** 꿈 2: 한 줄기에서 무성하고 충실한 일곱 이삭이 금빛으로 자란다 (창 41:5) */
  'dream-ears': { light: true, land: false, art: 'dream-ears', tone: 'dusk', spread: true },
  /** 꿈 2 뒤: 동풍에 마른 일곱 이삭이 나고, 찬 이삭이 시들어 꺼진다 (약 7초, 창 41:6-7) */
  'dream-ears-thin': { light: true, land: false, art: 'dream-ears-thin', tone: 'dusk', spread: true },
  /** 바로의 궁: 파피루스 기둥, 날개 달린 해 원반, 계단 단 위 사자 다리 보좌, 깃털 부채 (창 41:8-45) */
  'pharaoh-court': { light: true, land: false, art: 'pharaoh-court' },
  /** 버금 수레: 먼 탑문, 길가의 사람들, 수레가 지나가는 자리마다 사람들이 엎드린다 (약 13초, 창 41:43) */
  chariot: { light: true, land: false, art: 'chariot', tone: 'clear' },
  /** 일곱 해 풍년: 둥근 곳간들, 사다리를 오르내리는 일꾼, 바다 모래같이 자라는 곡식 더미 (창 41:47-49) */
  granary: { light: true, land: false, art: 'granary', spread: true },
  /** 흉년: 갈라진 땅, 열린 곳간 문의 불빛, 자루와 나귀를 끌고 줄 선 사람들 (창 41:54-57) */
  'granary-famine': { light: true, land: false, art: 'granary-famine', tone: 'dusk', spread: true },
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
