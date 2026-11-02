// 족보 가계도 (beat 필드 "lineage", 그림 fx/lineage.ts) — 역대상 1–9처럼 이름이 길게 이어지는 장.
//  { "names": ["아담", "셋", "에노스"], "ref": "대상 1:1" }       : 금빛 줄기를 따라 이름이 하나씩 위에서 아래로 돋아난다
//  { "names": [...], "mark": ["노아"] }                             : 그 이름은 크고 밝게 (이야기에서 중요한 사람)
//  { "names": [...], "branch": { "노아": ["셈", "함", "야벳"] } }   : 그 이름 옆으로 잔가지(형제·아들들)가 작게 갈라짐
//  { "title": "아담에서 아브라함까지" }                              : 판 위의 제목
//  { "names": [...], "fresh": true }                                : 앞 줄기를 지우고 새 줄기로 시작 (다른 가문으로 넘어갈 때)
// 같은 에피소드에서 다음 lineage beat는 앞 줄기에 이어 붙는다 (오래된 이름은 위로 밀려 흐려짐).
// 다음 beat에 lineage가 없으면 판은 왼쪽 위 작은 표(제목 · 마지막 이름)로 물러나 남는다.
export interface LineageSpec {
  names?: string[];
  ref?: string;
  title?: string;
  mark?: string[];
  branch?: Record<string, string[]>;
  fresh?: boolean;
}
