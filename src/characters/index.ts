// 인물 레지스트리. 이 폴더의 인물 파일(adam.ts ...)을 자동으로 찾는다.
// 장면 JSON의 "cast": ["adam"] 은 여기서 id로 불러온다.
//
// 그림 방식은 두 가지 (CLAUDE.md 8-1):
//  - svg   : 코드로 그린 역광 실루엣. 부위별(data-part)로 나뉘어 있어 숨쉬기·자세 모션이 붙는다.
//  - image : 나중에 일러스트로 바꿔 끼울 때. 인물 파일의 art만 바꾸면 장면은 그대로 동작한다.

/** 움직일 수 있는 부위. SVG 안의 <g data-part="..."> 와 이름이 같다. */
/** sway = 몸 전체가 천천히 흔들리는 부위 (뱀처럼 팔다리가 없는 인물) */
export type Part = 'head' | 'upper' | 'armL' | 'armR' | 'cloth' | 'hair' | 'legs' | 'sway';

export interface SvgArt {
  kind: 'svg';
  viewBox: [number, number];
  /** <g data-part="...">로 나뉜 SVG 도형들. 색은 currentColor로 칠한다. */
  markup: string;
  /** 부위별 회전·흔들림 기준점 (viewBox 좌표) */
  pivots: Partial<Record<Part, [number, number]>>;
}

export interface ImageArt {
  kind: 'image';
  src: string;
  width: number;
  height: number;
}

export interface CharacterDef {
  id: string;
  name: string;
  /** 실루엣만 봐도 알아보게 하는 특징 (소품·체형) — 문서용 메모 */
  traits: string;
  /** 그림이 바라보는 쪽. 장면에서 "face"로 돌려 세울 때 기준이 된다 (기본 right) */
  faces?: 'left' | 'right';
  /** 무대 높이 대비 키 (기본 1). 하와 0.95처럼 인물 사이 키 차이를 준다 */
  height?: number;
  art: SvgArt | ImageArt;
}

const files = import.meta.glob<CharacterDef>(['./*.ts', '!./index.ts'], { import: 'default' });

export async function loadCharacter(id: string): Promise<CharacterDef> {
  const loader = files[`./${id}.ts`];
  if (!loader) throw new Error(`인물 파일 없음: src/characters/${id}.ts`);
  return loader();
}
