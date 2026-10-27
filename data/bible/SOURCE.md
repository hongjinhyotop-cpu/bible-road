# 성경 본문 출처

## 개역한글판 (1961)

- **본문:** 성경전서 개역한글판 (대한성서공회)
- **라이선스:** 퍼블릭 도메인 — 저작재산권 보호기간 만료(2012년~)
- **가져온 곳:** [crizin/bible-db](https://github.com/crizin/bible-db) 저장소의 `data/krv/krv_holybible.jsonl`
  - 커밋: `4bcb50b3ead59d20b4a6b847f5c79ab4cdba6a2c` (2026-09-19)
  - 해당 저장소 NOTICE에 따르면 holybible.or.kr 본문을 정본으로 수집하고 bible.bskorea.or.kr과 대조했다.
  - 66권 · 1,189장 · 31,101절
- **변환:** `scripts/import-bible.mjs`로 권별 JSON으로 나눴다. 글자는 바꾸지 않았다(앞뒤 공백만 제거).

### 지켜야 할 것 (저작인격권)

- 본문을 임의로 고치지 않는다.
- 화면이나 문서에 출처를 **"성경전서 개역한글판 (대한성서공회)"** 로 표기한다.

> ⚠️ **개역개정판은 대한성서공회 저작권이 살아 있으므로 절대 넣지 않는다.**

## 파일 형식

`NN-code.json` (예: `01-gen.json`)

```json
{ "book": 1, "code": "GEN", "name": "창세기", "chapters": [["1절", "2절", "..."], ["..."]] }
```

`chapters[장-1][절-1]` 이 그 절의 본문이다.
