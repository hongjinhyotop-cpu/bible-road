// 동작 라이브러리: B급 에피소드는 새 그림 없이 이 동작들을 조립해서 움직인다.
// 장면 beat에 { "act": "kneel", "who": "abraham" } 처럼 쓴다. type이 없는 beat는 동작만 하고
// 저절로 다음 beat로 넘어간다. 글 beat(narration/line)에 붙이면 글과 동시에 움직인다.
// 구현은 ui/actor.ts(인물 하나) + screens/scene.ts(두 사람·무대 전체). 검사 스크립트도 이 목록을 본다.

export interface ActionInfo {
  /** 설명 (CLAUDE.md·검사 스크립트용) */
  doc: string;
  /** 누가 필요한가: one = 한 사람 이상, two = 두 사람(who 둘, 또는 who + to), none = 무대 전체 */
  needs: 'one' | 'two' | 'none';
  /** 동작만 있는 beat에서 다음으로 넘어가기까지 기다리는 시간(초) */
  hold: number;
}

export const ACTIONS = {
  'walk-in': { doc: '옆에서 걸어 들어옴 (무대에 없으면 세움). B급에서 enter의 기본 등장 방식', needs: 'one', hold: 1.6 },
  'walk-out': { doc: '보는 쪽으로 걸어 나감 → 무대에서 빠짐', needs: 'one', hold: 1.4 },
  leave: { doc: '떠나감: 지평선 쪽으로 작아지며 멀어짐 → 무대에서 빠짐', needs: 'one', hold: 2.4 },
  approach: { doc: '상대(to) 쪽으로 몇 걸음 다가감', needs: 'two', hold: 1.2 },
  'step-back': { doc: '움찔 물러남 (놀람·두려움)', needs: 'one', hold: 0.8 },
  face: { doc: '마주보기: who 둘이 서로 봄. who 하나 + to면 to 쪽을 봄', needs: 'one', hold: 0.6 },
  turn: { doc: '뒤돌아섬 (반대쪽을 봄)', needs: 'one', hold: 0.6 },
  kneel: { doc: '무릎 꿇기', needs: 'one', hold: 1.0 },
  pray: { doc: '기도: 무릎 꿇고 고개와 손을 듦', needs: 'one', hold: 1.2 },
  prostrate: { doc: '땅에 엎드려 절함', needs: 'one', hold: 1.2 },
  'bow-head': { doc: '고개 숙임', needs: 'one', hold: 0.8 },
  'look-up': { doc: '고개 듦 (하늘을 봄)', needs: 'one', hold: 0.8 },
  bless: { doc: '손을 들어 축복함 (손을 얹음)', needs: 'one', hold: 1.0 },
  argue: { doc: '다툼: 두 사람이 번갈아 몸을 들이밀며 맞섬', needs: 'two', hold: 1.8 },
  embrace: { doc: '포옹: 두 사람이 다가가 안음 (part로 풂)', needs: 'two', hold: 1.6 },
  part: { doc: '포옹·다가감을 풀고 제자리로', needs: 'one', hold: 1.0 },
  cry: { doc: '울기: 고개를 떨구고 어깨가 들썩임 (stand까지 계속)', needs: 'one', hold: 1.0 },
  sleep: { doc: '잠듦: 몸을 웅크리고 누움', needs: 'one', hold: 1.4 },
  fall: { doc: '쓰러짐 (절제된 표현: 주저앉으며 어두워짐)', needs: 'one', hold: 1.6 },
  stand: { doc: '원래 자세로: 일어섬, 울음 그침, 고개 바로', needs: 'one', hold: 0.8 },
  crowd: { doc: '군중이 무대 뒤에 모여 섬', needs: 'none', hold: 1.2 },
  'crowd-cheer': { doc: '군중 환호: 손을 들고 들썩임', needs: 'none', hold: 1.2 },
  'crowd-murmur': { doc: '군중 웅성거림: 술렁이며 흔들림', needs: 'none', hold: 1.2 },
  'crowd-bow': { doc: '군중이 엎드림', needs: 'none', hold: 1.2 },
  'crowd-away': { doc: '군중이 흩어져 사라짐', needs: 'none', hold: 1.2 },
  travel: { doc: '여정 지도: from → (via) → to 경로를 옛 지도 위에 그림. to만 쓰면 그 장소 표시', needs: 'none', hold: 3.2 },
} satisfies Record<string, ActionInfo>;

export type ActionName = keyof typeof ACTIONS;

/** 여정 지도 위의 장소 (fx/travel.ts). x·y는 지도 좌표(경도·위도를 400×260으로 옮긴 것) */
export const PLACE_NAMES = {
  ur: '갈대아 우르',
  haran: '하란',
  'paddan-aram': '밧단아람',
  nineveh: '니느웨',
  babylon: '바벨론',
  shinar: '시날',
  damascus: '다메섹',
  canaan: '가나안',
  shechem: '세겜',
  bethel: '벧엘',
  ai: '아이',
  hebron: '헤브론',
  mamre: '마므레',
  'kiriath-arba': '기럇아르바',
  machpelah: '막벨라',
  sodom: '소돔',
  zoar: '소알',
  gerar: '그랄',
  beersheba: '브엘세바',
  'beer-lahai-roi': '브엘라해로이',
  moriah: '모리아',
  salem: '살렘',
  jerusalem: '예루살렘',
  dan: '단',
  mahanaim: '마하나임',
  peniel: '브니엘',
  jabbok: '얍복 나루',
  succoth: '숙곳',
  dothan: '도단',
  bethlehem: '베들레헴',
  'mount-seir': '세일산',
  edom: '에돔',
  egypt: '이집트',
  goshen: '고센',
  shur: '술 광야',
  paran: '바란 광야',
  sinai: '시내산',
  kadesh: '가데스',
  jericho: '여리고',
  galilee: '갈릴리',
  nazareth: '나사렛',
  capernaum: '가버나움',
} as const;
export type PlaceName = keyof typeof PLACE_NAMES;
