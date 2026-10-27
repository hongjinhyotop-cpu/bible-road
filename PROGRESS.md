# 진행 기록 (PROGRESS)

> 세션을 시작할 때 `CLAUDE.md`와 이 파일을 먼저 읽는다. 끝날 때 이 파일을 업데이트한다.

- **사이트 주소:** https://hongjinhyotop-cpu.github.io/bible-road/
- **현재 단계:** Phase 0 — 기반 (타이틀·지도·설정·본문 데이터·배포 완료 / 장면 재생기 남음)

---

## 2026-10-27 · Phase 0 첫 세션

### 완료한 것
- **프로젝트 세팅:** Vite + Vanilla TypeScript + GSAP. `npm run dev`(개발), `npm run build`(빌드).
- **배포 파이프라인:** `.github/workflows/deploy.yml` — `main`에 push하면 GitHub Pages로 자동 배포. (Actions 탭에서 수동 실행도 가능)
- **개역한글 본문:** 66권 · 1,189장 · 31,101절 → `data/bible/NN-code.json` (권별). 출처·라이선스는 `data/bible/SOURCE.md`.
  - 다시 만들 때: `node scripts/import-bible.mjs <krv_holybible.jsonl>`
  - 엔진: `src/engine/bible.ts` — `getPassage("창 1:1-3")` / `"창 1:31-2:3"` / `"창 23-25"` 형식 지원. 권 파일은 필요할 때만 불러온다.
- **디자인 토큰:** `src/styles/tokens.css`, 14막 테마 `src/styles/acts.css` (`[data-act="N"]`).
- **14막 데이터:** `src/engine/acts.ts` — 막별 범위가 1,189장을 빠짐없이·중복 없이 덮는지 확인함.
  - 두 막에 걸친 책(창세기, 출애굽기, 열왕기상, 역대하)은 막마다 별이 따로 있다. 역대하는 1–9장은 7막, 10–36장은 9막.
- **저장:** `src/engine/storage.ts`(try/catch), `settings.ts`, `progress.ts`.
- **타이틀 화면:** 어둠 속 한 점의 빛 → 빛이 퍼짐 → "태초에"가 빛나며 한 글자씩 → 창 1:1 나머지가 잉크처럼 번짐(본문은 데이터에서 불러옴) → 금빛 선 → "말씀의 길" → 버튼. 화면 탭/스페이스/엔터로 건너뛰기.
- **성경 지도(빈 상태):** 14막·70개의 별이 하나의 구불구불한 길로 연결. 스크롤하면 길이 앞으로 그려지고 별이 떠오르며, 막에 들어설 때마다 하늘 색이 그 막의 색으로 바뀜. 시작점(창세기 1–11)이 점등되며 숨쉬듯 빛남. 데스크톱(1100px 이상)은 왼쪽에 막 목차.
  - 별을 누르면 패널: 그 구간 첫 절이 **금빛 테두리가 그어지는 본문 카드**로 나타남 + 장 목록 (아직 "준비 중").
- **설정:** 소리, 글자 속도, 글자 크기, 모션 줄이기(기기 설정/줄이기/모두 보기), 진도 초기화(두 번 눌러 확인).
- **시그니처 모션 구현됨:** 잉크 번짐 글자(`src/fx/ink.ts`), 금빛 테두리 본문 카드(`src/ui/scripture-card.ts`), 빛 번짐 화면 전환(`src/fx/transition.ts`), 촛불 버튼 호버, 배경 입자(먼지/별, `src/fx/particles.ts` — 느린 프레임이 이어지면 입자 수 자동 감소).
- **모션 줄이기:** 켜면 연출이 짧은 페이드로 바뀌고 배경 입자는 멈춘다.
- **확인:** 390px(모바일) / 1440px(데스크톱) 브라우저 스크린샷으로 확인, 콘솔 에러 없음.

### 다음 할 일
1. **엔진: 장면 재생기** (`src/engine/scene-player`) — scene JSON의 beats(narration/scripture/choice) 재생, `canon` 경로 복귀, 키보드(스페이스/엔터=다음, 숫자키=선택지).
2. **읽기 구간 화면** — 본문 전체 + 해설 + 퀴즈.
3. 콘텐츠 폴더 구조(`content/acts/01-beginning/…`)와 로더.
4. 그다음 **Phase 1: 1막 태초** (창조 장면부터).

### 알려진 문제 / 메모
- **소리:** 설정 스위치만 있고 실제 소리 파일·Howler.js는 아직 없음 (소리가 들어오는 단계에서 추가).
- **이어하기:** 지금은 지도 화면으로만 이동한다 (장면 재생기가 생기면 마지막 장면으로).
- 지도 패널의 장 번호는 아직 눌러도 아무 일 없음 (준비 중 표시).
- 글꼴: Noto Serif KR / Cormorant Garamond는 Google Fonts, Pretendard는 npm 패키지로 직접 포함.
- 인물 도감 화면은 아직 없음 (Phase 1에서 첫 인물과 함께).
