// 읽기 구간(reading) 형식과 불러오기 (CLAUDE.md 6번).
// 큰 사건이 아닌 장들: 본문 전체 + 요약 + 해설 + 퀴즈 1~3문항. 화면은 screens/reading.ts.

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
  quiz: QuizItem[];
}

// 파일 이름 = 읽기 id. content/acts/01-beginning/readings/gen-5.json → "gen-5"
const files = import.meta.glob<Reading>('/content/acts/*/readings/*.json', { import: 'default' });

const idOf = (path: string) => path.replace(/^.*\/|\.json$/g, '');
const pathById = new Map(Object.keys(files).map((p) => [idOf(p), p]));

export interface ReadingInfo {
  id: string;
  title?: string;
  ref: string;
}

/** 한 막의 읽기 구간 목록 (지도 패널) */
export async function readingsOfAct(act: number): Promise<ReadingInfo[]> {
  const prefix = `/content/acts/${String(act).padStart(2, '0')}-`;
  const paths = Object.keys(files).filter((p) => p.startsWith(prefix));
  return Promise.all(paths.map(async (p) => {
    const r = await files[p]();
    return { id: r.id, title: r.title, ref: r.ref };
  }));
}

export async function loadReading(id: string): Promise<Reading> {
  const path = pathById.get(id);
  if (!path) throw new Error(`읽기 구간 없음: ${id}`);
  const reading = await files[path]();
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
