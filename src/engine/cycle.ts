// 사사기의 순환 고리 데이터 (그림·연출은 fx/cycle.ts). 검사기도 이 목록을 본다.
export const CYCLE_STAGES = ['sin', 'oppress', 'cry', 'save', 'rest'] as const;
export type CycleStage = (typeof CYCLE_STAGES)[number];
export const CYCLE_LABEL: Record<CycleStage, string> = { sin: '죄', oppress: '압제', cry: '부르짖음', save: '구원', rest: '태평' };
/** 사사기의 사사 열두 명 (바퀴 번호) — 문서용·검사기용 */
export const JUDGES = ['옷니엘', '에훗', '삼갈', '드보라', '기드온', '돌라', '야일', '입다', '입산', '엘론', '압돈', '삼손'] as const;
export const ROUNDS = JUDGES.length;

export interface CycleSpec {
  round?: number;
  judge?: string;
  at?: CycleStage;
  skip?: CycleStage[];
  broken?: boolean;
}

