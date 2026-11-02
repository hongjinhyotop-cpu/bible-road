// 10막 — 다시 세워지는 예루살렘 (beat 필드 "rebuild", 그림 fx/rebuild.ts).
// 에스라·느헤미야 내내 무너진 성이 조금씩 다시 선다: 가운데 성전(5단계) + 성벽 열 구간(느 3의 문 열 개 사이).
//  { "temple": "altar" }                  : 성전 단계만 (ruin 폐허 → altar 제단 스 3:2 → foundation 기초 3:10 → halted 공사 멈춤 4:24 → built 완공 6:15)
//  { "wall": 4 }                          : 성벽이 넷째 구간까지 섬 (양문부터 느 3 순서). 같은 에피소드에서 앞보다 늘어난 구간은 하나씩 솟아오름
//  { "wall": 10, "from": 0 }              : 0부터 10까지 한 구간씩 차례로 솟음 (첫 표시에서 애니메이션을 보여 줄 때)
//  { "at": "water" }                      : 그 문 하나를 밝힘 (느 8 수문 앞 광장)
//  { "label": "쉰두 날" }                  : 판 아래 한 줄
// 다음 beat에 rebuild가 없으면 판은 왼쪽 위 작은 표(성전 단계 · 성벽 n/10)로 물러나 에피소드 내내 남는다.
export const TEMPLE_STAGES = ['ruin', 'altar', 'foundation', 'halted', 'built'] as const;
export type TempleStage = (typeof TEMPLE_STAGES)[number];
export const TEMPLE_LABEL: Record<TempleStage, string> = {
  ruin: '성전 터 · 폐허',
  altar: '제단 · 스 3:2',
  foundation: '성전 기초 · 스 3:10',
  halted: '공사 멈춤 · 스 4:24',
  built: '성전 완공 · 스 6:15',
};

/** 느헤미야 3장의 문 열 개 (개역한글 표기, 본문 순서 — 양문에서 시작해 한 바퀴) */
export const GATES = [
  { id: 'sheep', name: '양문', ref: '느 3:1' },
  { id: 'fish', name: '어문', ref: '느 3:3' },
  { id: 'old', name: '옛 문', ref: '느 3:6' },
  { id: 'valley', name: '골짜기 문', ref: '느 3:13' },
  { id: 'dung', name: '분문', ref: '느 3:14' },
  { id: 'fountain', name: '샘문', ref: '느 3:15' },
  { id: 'water', name: '수문', ref: '느 3:26' },
  { id: 'horse', name: '마문', ref: '느 3:28' },
  { id: 'east', name: '동문', ref: '느 3:29' },
  { id: 'muster', name: '함밉갓 문', ref: '느 3:31' },
] as const;
export type GateId = (typeof GATES)[number]['id'];
export const GATE_IDS = GATES.map((g) => g.id) as GateId[];
export const WALL_MAX = GATES.length;

export interface RebuildSpec {
  temple?: TempleStage;
  wall?: number;
  from?: number;
  at?: GateId;
  label?: string;
}
