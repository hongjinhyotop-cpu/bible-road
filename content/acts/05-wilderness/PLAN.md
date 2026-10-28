# 5막 광야 40년 (민수기, 신명기) — 계획서

> 2026-10-28. 먼저 **민수기 36장**. 신명기 34장은 그다음.
> 파일을 만들 때 이 표의 ref를 그대로 쓴다. 막 기본 배경: `wilderness`. 막 색: 사막 노을, 테라코타, 밤하늘.
> 배경: `camp`(광야의 진, 레위기 때 생김) · `tabernacle`(성막 뜰) · `wilderness` · `mountain` + 시간대. 여정 지도 `travel`을 넉넉히 (시내 → 바란 → 가데스 → 에돔 둘레 → 모압 평지).
> 인물: 모세·아론·미리암·엘르아살·이다말 + 여호수아·갈렙(여러 번 나옴 → 인물 파일), 고라·발람 등은 A급에서.

## A급 (5개)
| id | ref | 제목(가칭) | 왜 장면인가 |
|---|---|---|---|
| num-13-14-spies | 민 13–14 | 우리는 메뚜기 같으니 | 정탐꾼 열둘, 포도송이, 열 명의 악평 vs 여호수아·갈렙, 온 회중의 통곡, 사십 년 선고 |
| num-16-korah | 민 16 | 땅이 입을 열어 | 고라·다단·아비람의 반역, 향로 이백오십, 땅이 갈라짐 |
| num-20-rock | 민 20 | 반석을 두 번 치다 | 미리암의 죽음, 므리바 물, 모세가 반석을 침 → 약속의 땅에 못 들어감, 아론의 죽음(호르 산) |
| num-21-serpent | 민 21 | 놋뱀 | 불뱀, 장대 위의 놋뱀 "쳐다본즉 살더라" (요 3:14) |
| num-22-24-balaam | 민 22–24 | 발람과 나귀 | 말하는 나귀, 칼 든 사자, 저주하러 갔다가 세 번 축복 |

## B급 (21개)
| id | ref | 제목(가칭) |
|---|---|---|
| num-1-census | 민 1 | 싸울 만한 자를 세라 |
| num-2-camp | 민 2 | 진 배치: 성막을 가운데 두고 |
| num-3-4-levites | 민 3–4 | 레위인과 성막 나르기 |
| num-5-6-blessing | 민 5–6 | 나실인과 아론의 축복 |
| num-7-gifts | 민 7 | 열두 날의 똑같은 예물 |
| num-8-lamps | 민 8 | 등잔과 레위인 봉헌 |
| num-9-cloud | 민 9 | 구름이 떠오르면 |
| num-10-trumpets | 민 10 | 은 나팔, 출발 |
| num-11-quail | 민 11 | 고기를 달라 |
| num-12-miriam | 민 12 | 미리암의 문둥병 |
| num-15-tassels | 민 15 | 옷단의 술 |
| num-17-rod | 민 17 | 싹 난 지팡이 |
| num-18-19-heifer | 민 18–19 | 제사장의 몫과 붉은 암송아지 |
| num-25-peor | 민 25 | 바알브올 (민감) |
| num-26-census | 민 26 | 두 번째 인구 조사 |
| num-27-daughters | 민 27 | 슬로브핫의 딸들, 여호수아 |
| num-28-29-offerings | 민 28–29 | 날마다 절기마다 |
| num-30-vows | 민 30 | 서원 |
| num-31-midian | 민 31 | 미디안 전쟁 (민감) |
| num-32-reuben-gad | 민 32 | 요단 동편에 머물겠다는 지파 |
| num-33-journey | 민 33 | 마흔두 번의 진 (여정 지도) |
| num-34-36-borders | 민 34–36 | 땅의 경계, 도피성, 딸들의 상속 |

### 민감한 장 기준 (레위기와 같음)
- 성 관련(민 5 의심의 소제, 민 25): 담담하게 사실만, 묘사·드립 금지.
- 전쟁·처형(민 15:32-36, 민 25, 민 31): 고대의 맥락을 설명하되 미화하지 않고, 연출은 절제.

## 작업 기록
- num-21-serpent (A급, 2026-10-28): 전용 배경 bz-road/bz-camp/bz-pole/bz-pole-lit + 효과 fiery-serpents·serpent-lift (`src/fx/brazen.ts`, `styles/brazen.css`). 45 beat, 카드 4, 선택지 1.
- num-13-14-spies · num-16-korah · num-20-rock · num-22-24-balaam (A급, 2026-10-28 열세 번째 채팅에서 마무리): 전용 배경 spy-* / kr-* / mr-* / bal-* (`src/fx/spies.ts` `korah.ts` `meribah.ts` `balaam.ts` + css), 효과 grasshopper · earth-open · plague-stop · strike-twice · mantle · bal-strike · eyes-open · clap. 인물 korah·balaam·balak·donkey·angel-sword, 엘르아살 대제사장 옷, 아론 향로 옷(`censer`). 도감 갈렙·고라·발람·발락·비느하스(num-25).
