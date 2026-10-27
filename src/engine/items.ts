// 성막 기구 라이브러리 (출 25–31, 35–40). beat에 "item": "ark"를 쓰면 무대 가운데 금빛 조명 속에
// 그 기구 하나가 떠오른다 (그림·움직임은 fx/tabernacle.ts, 모양은 styles/tabernacle.css).
// "item": null 또는 "none"이면 걷힌다. 검사 스크립트도 이 목록을 본다 (DOM 없이 읽혀야 함).

export const ITEMS = {
  ark: { name: '증거궤와 속죄소', note: '두 그룹 사이, 만남의 자리', ref: '출 25:10–22' },
  table: { name: '진설병 상', note: '늘 차려 두는 떡 열두 개', ref: '출 25:23–30' },
  lampstand: { name: '순금 등대', note: '꺼지지 않는 일곱 등잔', ref: '출 25:31–40' },
  altar: { name: '번제단', note: '네 뿔 달린 놋 제단', ref: '출 27:1–8' },
  laver: { name: '물두멍', note: '들어가기 전에 씻는 놋 대야', ref: '출 30:17–21' },
  incense: { name: '분향단', note: '아침저녁 피어오르는 향', ref: '출 30:1–10' },
  tent: { name: '성막', note: '네 겹 덮개 아래, 하나님의 집', ref: '출 26' },
  veil: { name: '휘장', note: '청색·자색·홍색 실, 지성소 앞', ref: '출 26:31–33' },
  garments: { name: '대제사장의 옷', note: '가슴엔 열두 지파, 이마엔 성결', ref: '출 28' },
  court: { name: '성막 뜰', note: '세마포 울타리, 문은 동쪽 하나', ref: '출 27:9–19' },
  tablets: { name: '증거판 두 돌판', note: '하나님이 친히 쓰신 글', ref: '출 31:18' },
  oil: { name: '관유와 향품', note: '거룩하게 구별하는 기름', ref: '출 30:22–38' },
  'manna-jar': { name: '만나 항아리', note: '광야에서 먹은 양식 한 오멜', ref: '출 16:32–34' },
} as const;

export type ItemName = keyof typeof ITEMS;

/** beat의 "item" 값: 기구 이름, 또는 걷기(null / "none") */
export type ItemValue = ItemName | 'none' | null;

export function isItem(v: unknown): v is ItemName {
  return typeof v === 'string' && v in ITEMS;
}
