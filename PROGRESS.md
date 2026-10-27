# 진행 기록 (PROGRESS)

> 세션을 시작할 때 `CLAUDE.md`와 이 파일을 먼저 읽는다. 끝날 때 이 파일을 업데이트한다.

## 한눈에 보기

| 항목 | 상태 |
|---|---|
| 사이트 | https://hongjinhyotop-cpu.github.io/bible-road/ — 2026-10-27 첫 배포 완료 (GitHub Pages 켜짐) |
| 현재 단계 | **Phase 1 — 1막 태초, 4번 중 1번째 끝** (에덴과 선악과). 다음은 2번째: 가인과 아벨 |
| 다음 세션 할 일 | **Phase 1-2 가인과 아벨 (창 4)** (아래 "다음 할 일" 1번) |
| 머지 | **Claude가 PR 만들고 직접 main에 머지**한다. 사용자에게 버튼 누르라고 하지 않는다 (사용자 허락, CLAUDE.md 10번) |
| 사용자와 말투 | **반말, 편하게.** 사용자는 개발자가 아니니까 쉬운 말로 설명 |
| 지금까지 머지된 PR | [#1](https://github.com/hongjinhyotop-cpu/bible-road/pull/1) Phase 0 전체 · [#2](https://github.com/hongjinhyotop-cpu/bible-road/pull/2) 머지 규칙 · [#3](https://github.com/hongjinhyotop-cpu/bible-road/pull/3) 기록 정리 · [#4](https://github.com/hongjinhyotop-cpu/bible-road/pull/4) 장면 재생기 · [#5](https://github.com/hongjinhyotop-cpu/bible-road/pull/5) 읽기 구간 화면 · [#6](https://github.com/hongjinhyotop-cpu/bible-road/pull/6) 콘텐츠 로더 · Phase 1-1 에덴 PR(다섯 번째 채팅) |

---

## 지금까지 한 것 (2026-10-27, 첫 채팅)

### 1. 기반
- **스택:** Vite + Vanilla TypeScript + GSAP. `npm run dev` / `npm run build`.
- **배포:** `.github/workflows/deploy.yml` — main에 push하면 GitHub Pages 자동 배포. Actions 탭에서 수동 실행도 가능(`workflow_dispatch`).
- **라우팅:** 해시 방식(`#/`, `#/map`, `#/stage-test`). `src/engine/router.ts`. 화면 전환은 빛 번짐. 화면이 바뀌면 열린 패널은 자동으로 닫힌다.
- **저장:** `src/engine/storage.ts`(localStorage, 전부 try/catch) → `store.ts`(구독 가능한 저장 상태) → `settings.ts`(설정), `progress.ts`(끝낸 장 `"GEN:1"`, 마지막 위치, 시작 시각).

### 2. 개역한글 본문
- 66권 · 1,189장 · 31,101절 → `data/bible/NN-code.json` (권별). 출처: [crizin/bible-db](https://github.com/crizin/bible-db) (퍼블릭 도메인). 자세한 건 `data/bible/SOURCE.md`.
- 다시 만들 때: `node scripts/import-bible.mjs <krv_holybible.jsonl>`
- `src/engine/bible.ts` — `getPassage("창 1:1-3")`, `"창 1:31-2:3"`, `"창 23-25"`, `"창 1"` 지원. 권 파일은 필요할 때만 불러온다(권별로 따로 묶여 빌드됨).
- `src/engine/books.ts` — 66권 정보 + 약칭(창, 출, 삼상 …). `findBook()`은 약칭·이름·코드 다 받는다.

### 3. 14막 데이터
- `src/engine/acts.ts` — CLAUDE.md 2번 표를 데이터로 옮긴 것. **1,189장을 빠짐없이·중복 없이 덮는지 검사 통과.**
- 두 막에 걸친 책은 막마다 별이 따로: 창세기(1–11 / 12–50), 출애굽기(1–18 / 19–40), 열왕기상(1–11 / 12–22), 역대하(1–9는 7막 / 10–36은 9막). 그래서 지도 별은 **70개**.

### 4. 디자인 시스템
- `src/styles/tokens.css` — 색·글꼴·크기·모션 토큰. `acts.css` — `[data-act="N"]` 14막 테마.
- `voice.css` — **두 목소리** (CLAUDE.md 7-1)
  - `.voice-story` 이야기(이영도풍) = Noto Serif KR + 상아색
  - `.voice-talk` 설명(친구 말투) = Pretendard + 박하색
  - 성경 본문 = 금빛 테두리 카드
- 글꼴: Noto Serif KR · Cormorant Garamond는 Google Fonts, Pretendard는 npm 패키지로 직접 포함.
- 종이 그레인 + 비네팅 오버레이가 모든 화면에 깔려 있음 (`base.css`).

### 5. 시그니처 모션 (구현 완료)
- 잉크 번짐 글자, 탭하면 즉시 전체 표시 — `src/fx/ink.ts`
- 금빛 테두리 본문 카드 + 아래 "한 줄 번역" 말풍선 — `src/ui/scripture-card.ts`
- 빛 번짐 화면 전환 — `src/fx/transition.ts`
- 촛불처럼 밝아지는 버튼 — `ui.css .btn`
- 배경 입자(먼지/별). 느린 프레임이 이어지면 입자 수 자동 감소 — `src/fx/particles.ts`
- 지도: 스크롤하면 길이 그려지고, 시작점 별이 점등됨
- 모션 줄이기: 연출이 짧은 페이드로 바뀌고 입자는 멈춤
- **아직 없음:** 막 피날레 시퀀스, 새 권이 열릴 때 점등+길 잇기(지금은 시작점만)

### 6. 화면
- **타이틀:** 한 점의 빛 → 빛이 퍼짐 → "태초에" → 창 1:1 나머지(데이터에서 불러옴) → 금빛 선 → "말씀의 길" → "처음부터 시작 / 이어서 하기". 탭·스페이스·엔터로 스킵.
- **성경 지도:** 14막·별 70개가 하나의 길로 이어짐. 막에 들어서면 하늘색이 바뀜. PC(1100px 이상)는 왼쪽에 막 목차.
  - 별을 누르면 패널: 그 구간 첫 절 본문 카드 + 한 줄 번역 + 장 목록("공사 중").
- **설정:** 소리 / 글자 속도 / 글자 크기 / 모션 줄이기 / 진도 초기화(두 번 눌러야 지워짐).
- **시험 화면 `#/stage-test`:** 아담 실루엣 + 텍스트 박스 + 자세·말하기·막 색 바꾸기 버튼. 지도의 창세기 1–11 패널에서 들어감.

### 7. 말투 (CLAUDE.md 7-1)
- 사이트 안내 문구는 전부 20대 친구 반말로 바꿈.
- `content/glosses.json` — ref별 한 줄 번역. 지금은 지도 별 70개의 첫 절만 있음. 장면에서는 scripture beat의 `"gloss"`로 직접 넣어도 됨.

### 8. 캐릭터 (CLAUDE.md 8-1)
- `src/characters/index.ts` — 인물 레지스트리. 폴더 안의 `아이디.ts`를 자동으로 찾음 → `loadCharacter("adam")`.
  - 그림 방식: `svg`(코드 실루엣, `<g data-part="head|upper|armL|armR|cloth|hair|legs">`로 나눔 + `pivots` 기준점) / `image`(나중에 일러스트로 교체하면 몸 전체 모션만 붙음).
- `src/ui/actor.ts`
  - `Actor`: 숨쉬기, 옷자락·머리카락 흔들림, 자세(`neutral`/`slump`/`lift`/`tremble`), `setSpeaking`(앞으로 나오고 밝아짐), `setDim`(어두워짐)
  - `Stage`: `setSpeaker(id)` — 말하는 사람만 강조
- 스타일(`stage.css`): 막 색으로 섞은 어두운 잉크 + 막 강조색 역광 테두리 + 종이 그림자. 2톤 레이어는 `.tone2`.
- `adam.ts`: 무화과 잎 치마, 긴 머리·수염, 맨발. 오른쪽을 봄.

---

## 두 번째 채팅 (2026-10-27): 장면 재생기

- **엔진** `src/engine/scene.ts`
  - scene JSON 형식(타입) + 불러오기. 파일 이름 = 장면 id. 막 폴더 `content/acts/NN-이름/scenes/*.json`.
  - `SceneCursor`: beat를 순서대로 꺼냄. 선택지에서 canon이 아닌 걸 고르면 `branches`의 "만약" 장면을 보여준 뒤 canon 길로 자동 복귀.
  - 장면 파일 실수(goto 오타, canon 없음)는 콘솔 경고로 알려줌.
  - beat 종류·필드 설명은 **CLAUDE.md 6번 "장면 beat 종류"**에 적어 둠.
- **화면** `src/screens/scene.ts` + `src/styles/play.css`, 주소 `#/scene/<id>`
  - 시작: 막 이름 + 장면 제목이 빛나며 떠올랐다 사라짐.
  - 위 머리줄(뒤로/제목/설정 + 얇은 진행 막대), 가운데 무대(인물), 아래 "독"에 카드 한 장씩(이야기 글 / 본문 카드 / 선택지 / 해설).
  - 대사: 이름표 + 말하는 사람만 밝게. 하나님 목소리(`voice`): 인물 없이 무대 가운데 금빛 글자.
  - 효과: `flash`(빛 번쩍) `dawn`(어둠이 걷힘) `dark` `land`(언덕이 떠오름) `shake`.
  - 끝: "방금 그거 뭐였냐면" 해설 + 한 줄 요약 + 새 인물 카드 획득 표시 + 지도로/다시 보기.
  - 조작: 탭·스페이스·엔터 = 다음(글이 번지는 중이면 먼저 전체 표시), 숫자키 = 선택지.
- **저장** `progress.ts`: 끝낸 장면(`scenes`), 만난 인물(`characters`) 추가. 장면이 장 전체를 덮으면 그 장도 완료 처리(`bible.ts fullChapters`). "이어서 하기"는 보던 장면으로 감(`continuePath`).
- **라우터**: `/scene/:id` 같은 자리 표시자 주소 지원.
- **지도 패널**: 그 구간에 장면이 있으면 "플레이 장면" 목록(완료 표시). 없으면 "공사 중".
- **시험 장면** `content/acts/01-beginning/scenes/gen-1-light.json` — 창 1:1–2:3 "빛이 있으라". 어둠 → 빛 → 땅 → 아담 등장 → 선택지(첫 마디는?) → 안식. Phase 1에서 그대로 1막 첫 장면으로 써도 됨.
- 지움: `#/stage-test` 시험 화면, 지도 패널의 "아담 실루엣 미리보기" 버튼.
- 확인: 390px·1440px 둘 다 끝까지 플레이(만약 길·canon 길 둘 다), 모션 줄이기 모드도 끝까지, 콘솔 에러 없음.

---

## 세 번째 채팅 (2026-10-27): 읽기 구간 화면

- **엔진** `src/engine/reading.ts` — reading JSON 형식(타입) + 불러오기. 파일 이름 = id. `content/acts/NN-이름/readings/*.json`. 퀴즈 개수(1~3)·answer 번호 실수는 콘솔 경고.
  - 형식에 `title`(화면 제목), `tldr`(한 줄 요약) 추가. `summary`·`insight`는 빈 줄로 문단 나눔. CLAUDE.md 6번에 반영.
- **화면** `src/screens/reading.ts` + `src/styles/reading.css`, 주소 `#/read/<id>`
  - 위→아래 한 줄기: 제목(잉크 번짐) → "먼저 줄거리부터"(친구 말투 카드) → **본문 전체**(개역한글, 장 번호 크게, 절 번호는 왼쪽 여백에 금빛) → "근데 이게 왜 중요하냐면" 해설 + 한 줄 요약 → 확인 퀴즈 → 결과.
  - 본문은 스크롤해서 화면에 들어오는 절부터 잉크처럼 번지며 나타남(흐림→선명). 머리줄 얇은 막대 = 읽은 만큼.
  - 퀴즈: 한 문제씩. 고르면 정답 보기에 촛불처럼 빛이 번지고, 틀린 건 가라앉음 + "왜" 설명. 숫자키로 고르기 가능. 위에 점 3개(맞힘=금빛).
  - 결과: 금빛 고리가 한 바퀴 그어지며 점수(2 / 3) + 점수별 한마디 + "N장 읽음 표시 완료". 지도로 / 퀴즈 다시.
  - PC(1100px 이상): 왼쪽에 목차 레일(줄거리 / 장마다 / 해설 / 퀴즈). 지금 보는 곳에 불 들어옴, 누르면 그리로 스크롤.
  - 퀴즈가 없는 읽기 구간은 "다 읽었음" 버튼으로 완료.
- **저장** `progress.ts`: `readings`(id → 퀴즈 최고 점수), `completeReading()`, `readingDone()`. 점수와 상관없이 퀴즈를 끝까지 풀면 장 완료. "이어서 하기"가 읽기 구간으로도 감(`last: "read/<id>"`).
- **지도 패널**: "플레이 장면" → **"이 구간에서 할 것"**. 장면과 읽기 구간을 본문 순서대로 한 목록에, "플레이"(금빛)/"읽기"(박하색) 꼬리표.
- **예시 읽기 구간** `content/acts/01-beginning/readings/gen-5.json` — 창 5 아담의 족보 "그리고 죽었더라". 퀴즈 3문항. Phase 1에서 그대로 써도 됨.
- 확인: 390px·1440px 끝까지(오답·정답·결과), 여러 장짜리(창 23-25 임시 파일로 시험 후 삭제), 모션 줄이기, 이어서 하기, 기존 장면 화면, 콘솔 에러 없음.

---

## 네 번째 채팅 (2026-10-27): 콘텐츠 폴더와 로더

- **공통 로더** `src/engine/content.ts` — 장면·읽기 구간 파일 찾기를 한곳으로 합침 (전엔 `scene.ts`/`reading.ts`에 비슷한 코드가 따로 있었음).
  - `contentOfAct(막)`: 그 막의 장면+읽기를 **본문 순서**(막의 책 순서 → 장 → 절)로. 막별로 한 번만 불러와서 기억함.
  - `nextItem(kind, id)`: 본문 순서로 바로 다음 것. 막 끝이면 다음 막의 처음. 없으면 null.
  - `itemForChapter(막, 책, 장)`: 그 장을 덮는 장면/읽기.
  - `actContent(막)`: `act.json`. 파일 id≠파일 이름, act≠폴더 번호, 막 범위 밖 ref, 서로 겹치는 구간은 콘솔 경고.
  - `scene.ts`/`reading.ts`엔 형식(타입)과 형식 검사만 남음.
- **`content/acts/01-beginning/act.json`** — `{ act, title, mechanic: "adventure", keyVerse: "창 1:1" }`. 형식은 CLAUDE.md 6번.
- **"다음" 버튼** `src/ui/next-button.ts` — 장면 해설 카드·읽기 결과 카드 맨 위에 "다음 · 플레이/읽기 + 제목" 큰 버튼. 엔터로 바로 넘어감. 다음이 없으면 예전처럼 "지도로 돌아가기"가 주 버튼.
  - 끝내면 "이어서 하기"가 **다음 것**으로 가게 저장(`last`).
- **지도 패널 장 번호** — 장면/읽기로 이어지는 장은 눌러짐(테두리 밝음, 촛불 빛). 없는 장은 흐리게. 목록도 `content.ts`에서 받아옴.
- **콘텐츠 검사** `scripts/check-content.mjs` = `npm run check:content`. `npm run build`가 먼저 돌림(오류면 빌드 멈춤 → 배포도 안 됨).
  - 검사: id=파일 이름, act=폴더, act.json, ref가 실제 있는 절인지·막 범위 안인지, 겹침, scripture beat 1개 이상, canon 하나, goto, 인물 파일(없으면 주의), 퀴즈 1~3·answer 번호, glosses.json ref.
  - 마지막에 막별로 "장면·읽기 N개 · 덮은 장 / 전체 장" 표시 → 1,189장 채워 가는 진척표로 쓰면 됨.
- 확인: 390px·1440px — 지도 패널 → 장 번호 2 → 장면 끝까지 → "다음: 그리고 죽었더라" → 읽기 → 퀴즈 → 결과(1막 마지막이라 다음 없음) → 지도에서 완료 표시. 콘솔 에러 없음. 일부러 틀린 파일로 검사 스크립트가 잡는 것도 확인.

---

## 다섯 번째 채팅 (2026-10-27): Phase 1-1 — 에덴과 선악과

### Phase 1 계획 (사용자와 정함 — 1막을 4번에 나눠서)
1. **에덴과 선악과** (창 2:4–3장) + 아담 다듬기 + 하와 ← **이번에 끝**
2. **가인과 아벨** (창 4) ← 다음
3. **노아** (창 6–9, 홍수)
4. **바벨탑** (창 10–11) + **1막 피날레** + **인물 도감 화면**

### 한 것
- **아담 새로 그림** (`src/characters/adam.ts`): 그림자극처럼 **옆모습**으로. 코·입술·턱수염·가슴·발끝이 전부 앞을 가리켜서 "등 돌린 것 같은" 문제 해결. 눈에 역광 한 점(`.glint`). 넓은 어깨, 한 발 내민 짝다리, 잎 끝이 뾰족한 무화과 잎 치마, 손은 치마 위에 겹쳐 보임.
- **하와** `eve.ts`: 허리까지 오는 긴 머리, 가슴~허벅지 잎 옷, 작은 코·도톰한 입술, 키 0.95.
- **뱀** `serpent.ts`: 똬리 + S자로 세운 몸, 갈라진 혀(붉은 금빛), 몸이 천천히 흔들림(`sway` 부위).
- **인물 시스템 추가** (`characters/index.ts`, `ui/actor.ts`)
  - `faces`(그림이 보는 쪽), `height`(키 비율).
  - `actor.face('left'|'right')` — 몸이 얇아졌다 펴지는 "돌아서기". 나중에 선 인물은 자동으로 먼저 선 사람 쪽(왼쪽)을 봄.
  - 여럿이 서면 한 사람당 폭을 나눠서 키를 줄임(폰에서 셋이 서도 안 잘림). 발은 늘 땅에.
- **장면 배경** `fx/backdrop.ts` + `engine/moods.ts` + `styles/backdrop.css`
  - mood 목록: `void` / `bare-earth`(맨땅) / `eden`(양옆 큰 나무, 멀리 빛나는 나무, 강물 반짝임) / `eden-tree`(열매가 반짝이는 큰 나무) / `eden-dusk`(저녁, 서늘한 색) / `east-of-eden`(메마른 땅, 엉겅퀴, 멀리 빙글 도는 화염검).
  - 잎은 천천히 흔들리고, 열매·강물·불칼은 은은하게 움직임. 모션 줄이기면 멈춤.
  - 새 mood는 `moods.ts`에 이름 추가 + `backdrop.ts`에 그림 추가.
- **beat 필드 추가** (CLAUDE.md 6번에 반영): `"face": {"eve": "left"}`, `"mood": "eden-dusk"`(장면 중간에 배경이 천천히 바뀜). 검사 스크립트가 mood 이름·face 값도 봄.
- **장면 2개**
  - `gen-2-eden` 「동산, 그리고 둘」 창 2:4–25 — 흙과 숨, 동산, 규칙 하나, "좋지 못하니", 동물 작명(선택지), 깊은 잠, 하와 등장, "뼈 중의 뼈"(선택지).
  - `gen-3-where` 「네가 어디 있느냐」 창 3 — 뱀과 하와의 티키타카("요즘 귀가 영." / "난 질문만 했을 뿐이야."), 내내 옆에 있던 아담, 숨음, **"네가 어디 있느냐"는 드립 없이 조용히**, 탓 넘기기, 선고, "하와"라는 이름, 가죽옷, 동쪽으로. 선택지 2개(열매 앞 / 아담의 대답 — "여기 있습니다"를 고르면 아브라함·모세·사무엘·이사야 얘기).
- **장 하나를 여러 파일이 나눠 덮어도 완료 처리** — `content.ts chaptersDoneWith()`: 끝낸 장면·읽기를 합쳐서 1절~끝 절이 빈틈없으면 그 장 완료. (창 2장 = `gen-1-light` 2:1–3 + `gen-2-eden` 2:4–25)
- **읽기 구간: 읽던 자리 저장** (사용자 요청) — 스크롤이 멈추면 화면 위쪽에 걸린 절을 기억(`progress.readingSpots`, "5:15"/"insight"/"quiz"). 다시 들어오면 그 절로 바로 가고, 금빛이 잠깐 번지고, 위에 "지난번 읽던 데부터 · 5장 15절 [처음부터]" 알림. 퀴즈까지 끝내면 지워짐.
- 장면 해설(insight)도 읽기처럼 빈 줄로 문단이 나뉨 (`ui/paragraphs.ts`).
- 확인: 390px·1440px로 두 장면 끝까지(만약 길·canon 길), 읽던 자리 복원, 콘솔 에러 없음, `npm run build` 통과.

---

## 다음 할 일

### 1. Phase 1-2 — 가인과 아벨 (창 4) ← 다음 세션은 이것부터
- 인물: **가인**(농부 — 낫이나 곡식 단), **아벨**(목자 — 지팡이, 어린 양). 실루엣만으로 구별되게.
- 새 배경 mood 필요: 들판/제단 연기 등 (`moods.ts` + `backdrop.ts`).
- 창 4:7 "죄의 소원은 네게 있으나"는 3:16과 같은 표현 — 해설에서 연결하면 좋음.
- 살인 장면은 선정적이지 않게, 문장을 아끼고 조용하게 (CLAUDE.md 7번 5항).
- "네 아우 아벨이 어디 있느냐"(4:9)는 3:9 "네가 어디 있느냐"와 짝 — 연출로 대비.
- 창 4장 뒷부분(가인의 후손, 셋)은 장면 안에서 짧게 또는 읽기 구간으로.

### 2. Phase 1-3 — 노아 (창 6–9)
- 노아·방주·홍수. 홍수 연출은 무게감 있게. 창 6:1–8, 10장 족보는 읽기 구간으로 나눌지 결정.

### 3. Phase 1-4 — 바벨탑 (창 10–11) + 1막 피날레 + 인물 도감
- 막 피날레 시퀀스(`act.json keyVerse` + 인물 카드), 인물 도감 화면, 새 별이 켜지며 길이 이어지는 연출.
- 하나님은 인물로 그리지 않는다 (빛·불꽃·구름·화면 진동·목소리 텍스트로만).

---

## 알려진 문제 / 다듬을 것

### 그림·연출
- 아담·하와·뱀은 옆모습 실루엣으로 다시 그림. 손가락은 아직 뭉뚱그린 손 모양.
- 하와·아담은 처음부터 잎 옷을 입고 있음(실루엣 표현상). 3:21 가죽옷으로 옷이 바뀌는 연출은 아직 없음.
- PC 넓은 화면에서는 `eden-tree` 배경의 큰 나무 윗부분이 화면 위로 잘림 (나무줄기·아랫잎만 보임). 크게 거슬리진 않음.
- 배경 그림은 에덴 계열만 있음. 다른 막 배경은 그 막 만들 때.
- 지도: 막과 막 사이 길이 길게 직선으로 이어지는 구간이 있음. 막 제목 뒤의 어두운 빈터가 길을 가림.
- 지도: 화면 폭을 바꾸면(회전 등) 별이 다시 떠오르는 애니메이션이 한 번 더 나옴 (작은 문제).

### 기능 빈칸
- **소리 없음.** 설정 스위치만 있음. Howler.js·소리 파일은 아직 안 넣음.
- 장면 중간에 나갔다 오면 그 장면 **처음부터** 다시 시작함 (beat 위치는 저장 안 함).
- 읽기 구간은 읽던 절은 기억하지만, 퀴즈를 풀다 나가면 퀴즈는 1번부터 다시.
- 장면을 끝내도 지도의 별은 아직 안 켜짐(별은 그 구간 장이 전부 끝나야 켜짐).
- 이 기능 전에 장면을 끝낸 사람은, 나눠 덮인 장(창 2장)이 다음 장면을 끝낼 때 같이 계산됨 (이미 둘 다 끝냈으면 하나를 다시 끝내야 켜짐).
- `act.json`의 `mechanic`·`keyVerse`는 아직 읽는 화면이 없음 (mechanic 모듈·막 피날레 만들 때 씀).
- 인물 도감 화면 없음. 막 피날레 없음.
- 한 줄 번역은 70개 구절에만 있음.
- 지도 패널의 막 분위기 문구(예: "깊은 남색 속에 생겨나는 빛")는 디자인 메모 같은 말투라, 친구 말투로 바꿀지 다음에 결정.

### 확인 못 한 것
- 실제 사이트(github.io)를 Claude가 직접 열어보지는 못함. 작업 환경에서 github.io 접속이 막혀 있음. 배포 Actions 성공까지만 확인했고, 사용자가 실제로 확인해야 함.
- 60fps는 헤드리스 브라우저로만 측정함. 실제 저사양 폰에서는 아직 확인 안 함.
- 배포 액션 `actions/deploy-pages@v4`에 Node 20 지원 종료 경고가 뜸. 지금은 경고일 뿐 동작은 정상. 나중에 새 버전이 나오면 올리기.

---

## 작업 환경 메모 (다음 Claude에게)

- **스크린샷 확인:** `npm run build && npx vite preview --port 4173`로 띄운 뒤 Playwright로 찍는다. Google Fonts를 받으려면 `chromium.launch({ proxy: { server: process.env.HTTPS_PROXY, bypass: 'localhost' } })`. (cdn.jsdelivr.net은 작업 환경에서 막혀 있어서 Pretendard를 npm으로 넣었음)
- **preview 서버 끄기:** `pkill -f "vite preview"`는 쓰지 마. 자기 셸까지 죽는다. 대신 `ps -eo pid,args | grep "[v]ite" | awk '{print $1}' | xargs -r kill`.
- **기다리기:** `sleep`이 막혀 있음. `timeout 45 tail -f /dev/null` 사용.
- **브랜치:** PR이 머지되면 같은 브랜치 이름으로 main에서 다시 시작한다: `git fetch origin main && git checkout -B <브랜치> origin/main`. 그다음 일반 push. force push는 막혀 있고, 필요도 없음.
- **머지:** GitHub MCP의 `create_pull_request` → `merge_pull_request`(`expectedHeadSha`는 40자 전체). 그다음 `actions_list`로 배포가 성공했는지 확인.
- **14막 범위 검사:** `node --experimental-strip-types`로 `src/engine/acts.ts`를 불러와서 1,189장이 다 덮이는지 확인할 수 있음.
