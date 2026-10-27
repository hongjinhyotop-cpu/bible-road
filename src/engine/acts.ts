// 14막 구성. CLAUDE.md 2장의 표를 데이터로 옮긴 것.
// stops = 지도 위의 별 하나하나. 한 권이 두 막에 걸치면 막마다 따로 별이 생긴다.

export interface Stop {
  /** 책 코드 (books.ts) */
  book: string;
  from: number;
  to: number;
}

export interface Act {
  no: number;
  numeral: string;
  title: string;
  latin: string;
  range: string;
  mood: string;
  stops: Stop[];
}

const s = (book: string, from: number, to: number): Stop => ({ book, from, to });

export const ACTS: Act[] = [
  { no: 1, numeral: 'I', title: '태초', latin: 'In Principio', range: '창 1–11', mood: '깊은 남색 속에 생겨나는 빛',
    stops: [s('GEN', 1, 11)] },
  { no: 2, numeral: 'II', title: '족장들', latin: 'Patres', range: '창 12–50', mood: '양피지, 장막, 별밤',
    stops: [s('GEN', 12, 50)] },
  { no: 3, numeral: 'III', title: '출애굽', latin: 'Exodus', range: '출 1–18', mood: '이집트 석회암, 붉은 강',
    stops: [s('EXO', 1, 18)] },
  { no: 4, numeral: 'IV', title: '시내산과 성막', latin: 'Tabernaculum', range: '출 19–40, 레위기', mood: '아카시아 나무, 청색·자색·홍색 실',
    stops: [s('EXO', 19, 40), s('LEV', 1, 27)] },
  { no: 5, numeral: 'V', title: '광야 40년', latin: 'Desertum', range: '민수기, 신명기', mood: '사막 노을, 밤하늘',
    stops: [s('NUM', 1, 36), s('DEU', 1, 34)] },
  { no: 6, numeral: 'VI', title: '정복과 사사', latin: 'Iudices', range: '여호수아, 사사기, 룻기', mood: '누아르 사건 파일',
    stops: [s('JOS', 1, 24), s('JDG', 1, 21), s('RUT', 1, 4)] },
  { no: 7, numeral: 'VII', title: '왕국', latin: 'Regnum', range: '삼상–왕상 11, 역대기 일부', mood: '왕실 보라, 청동, 횃불',
    stops: [s('1SA', 1, 31), s('2SA', 1, 24), s('1KI', 1, 11), s('1CH', 1, 29), s('2CH', 1, 9)] },
  { no: 8, numeral: 'VIII', title: '지혜와 노래', latin: 'Sapientia', range: '욥기–아가', mood: '여백과 물결',
    stops: [s('JOB', 1, 42), s('PSA', 1, 150), s('PRO', 1, 31), s('ECC', 1, 12), s('SNG', 1, 8)] },
  { no: 9, numeral: 'IX', title: '분열과 예언', latin: 'Prophetae', range: '왕상 12–왕하, 예언서', mood: '폭풍 하늘, 재, 두루마리',
    stops: [s('1KI', 12, 22), s('2KI', 1, 25), s('2CH', 10, 36), s('ISA', 1, 66), s('JER', 1, 52), s('LAM', 1, 5),
      s('HOS', 1, 14), s('JOL', 1, 3), s('AMO', 1, 9), s('OBA', 1, 1), s('JON', 1, 4), s('MIC', 1, 7),
      s('NAM', 1, 3), s('HAB', 1, 3), s('ZEP', 1, 3), s('HAG', 1, 2), s('ZEC', 1, 14), s('MAL', 1, 4)] },
  { no: 10, numeral: 'X', title: '포로와 귀환', latin: 'Captivitas', range: '에스겔, 다니엘, 에스라, 느헤미야, 에스더', mood: '바빌론 청색 타일, 돌벽',
    stops: [s('EZK', 1, 48), s('DAN', 1, 12), s('EZR', 1, 10), s('NEH', 1, 13), s('EST', 1, 10)] },
  { no: 11, numeral: 'XI', title: '복음서', latin: 'Evangelium', range: '마태–요한', mood: '갈릴리 호수, 올리브',
    stops: [s('MAT', 1, 28), s('MRK', 1, 16), s('LUK', 1, 24), s('JHN', 1, 21)] },
  { no: 12, numeral: 'XII', title: '교회의 시작', latin: 'Ecclesia', range: '사도행전', mood: '고지도, 바다, 돛',
    stops: [s('ACT', 1, 28)] },
  { no: 13, numeral: 'XIII', title: '편지들', latin: 'Epistulae', range: '로마서–유다서', mood: '밀랍 봉인, 촛불, 파피루스',
    stops: [s('ROM', 1, 16), s('1CO', 1, 16), s('2CO', 1, 13), s('GAL', 1, 6), s('EPH', 1, 6), s('PHP', 1, 4),
      s('COL', 1, 4), s('1TH', 1, 5), s('2TH', 1, 3), s('1TI', 1, 6), s('2TI', 1, 4), s('TIT', 1, 3),
      s('PHM', 1, 1), s('HEB', 1, 13), s('JAS', 1, 5), s('1PE', 1, 5), s('2PE', 1, 3), s('1JN', 1, 5),
      s('2JN', 1, 1), s('3JN', 1, 1), s('JUD', 1, 1)] },
  { no: 14, numeral: 'XIV', title: '마지막', latin: 'Apocalypsis', range: '요한계시록', mood: '우주, 유리 바다, 빛',
    stops: [s('REV', 1, 22)] },
];
