// 읽기 구간(reading) 형식과 불러오기 (CLAUDE.md 6번).
// 큰 사건이 아닌 장들: 본문 전체 + 요약 + 해설 + 퀴즈 1~3문항. 화면은 screens/reading.ts.
import { loadContent } from './content';

export interface QuizItem {
  q: string;
  options: string[];
  /** 정답 보기 번호 (0부터) */
  answer: number;
  /** 왜 그게 답인지 (친구 말투) */
  why: string;
}

export interface Reading {
  id: string;
  act: number;
  /** 화면 제목. 없으면 ref로 만든다 (예: "창세기 5장") */
  title?: string;
  ref: string;
  /** 3~5문장 요약 (친구 말투) */
  summary: string;
  /** 이 구간이 전체 이야기에서 왜 중요한지 */
  insight: string;
  /** 한 줄 요약 */
  tldr?: string;
  /** 결과 카드의 "다음" 버튼 위에 놓이는, 다음 이야기로 넘어가는 한 줄 */
  bridge?: string;
  quiz: QuizItem[];
}

// 파일 찾기·목록·순서는 content.ts가 맡는다. 여기서는 형식 검사만.
export async function loadReading(id: string): Promise<Reading> {
  const reading = await loadContent<Reading>('read', id);
  validate(reading);
  return reading;
}

/** 퀴즈 파일의 흔한 실수를 일찍 알려준다 */
function validate(r: Reading): void {
  if (r.quiz.length < 1 || r.quiz.length > 3) console.warn(`[${r.id}] 퀴즈는 1~3문항이 좋음 (지금 ${r.quiz.length}개)`);
  r.quiz.forEach((q, i) => {
    if (!(q.answer >= 0 && q.answer < q.options.length)) console.warn(`[${r.id}] ${i + 1}번 문제: answer 번호가 보기 밖임`);
  });
}
