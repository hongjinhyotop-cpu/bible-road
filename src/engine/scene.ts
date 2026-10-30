// 에피소드(scene) 형식과 재생 순서. 화면 그리기는 screens/scene.ts가 맡고,
// 여기서는 "다음에 무엇을 보여줄지"만 정한다 (CLAUDE.md 6번).
// 모든 장은 에피소드다. A급 = 큰 사건(전용 그림·연출), B급 = 라이브러리(동작·배경·키트 인물) 조립.
import type { Facing, Pose } from '../ui/actor';
import type { Base, Beard, Hair, Prop, Tint } from '../characters/_kit';
import type { ActionName, PlaceName } from './actions';
import { loadContent } from './content';

import type { SceneFx } from './moods';
import type { ItemValue } from './items';
import type { AllotName } from './tribes';
import type { CycleSpec } from './cycle';

/** 장면 연출 효과 — 목록은 engine/moods.ts의 FX */
export type { SceneFx };

interface BeatBase {
  /** goto로 찾아올 때 쓰는 이름 */
  id?: string;
  /** 무대에 새로 세울 인물 */
  enter?: string[];
  /** 무대에서 내보낼 인물 */
  exit?: string[];
  /** 인물별 자세 { "adam": "slump" } */
  pose?: Record<string, Pose>;
  /** 인물이 바라보는 쪽 { "eve": "left" }. 새로 선 인물은 자동으로 먼저 선 사람 쪽(왼쪽)을 본다 */
  face?: Record<string, Facing>;
  /** 이 beat부터 이름표를 바꿔 부른다 { "joseph": "요셉" } (장면의 names를 덮어씀) */
  names?: Record<string, string>;
  /** 옷을 갈아입힌다 { "adam": "skins" }. 옷 이름은 인물 파일의 outfits */
  outfit?: Record<string, string>;
  /** 배경 분위기를 바꾼다 (engine/moods.ts). 예: "eden-dusk" */
  mood?: string;
  /** mood와 같음 (B급 배경 라이브러리 이름: "tent-night", "well" …) */
  bg?: string;
  fx?: SceneFx | SceneFx[];
  /** 성막 기구 (engine/items.ts): 무대 가운데 금빛 조명 속에 하나 띄운다. null / "none" = 걷기 */
  item?: ItemValue;
  /** 땅 분배 지도 (fx/allot.ts): 지파 이름 하나 또는 여럿을 지도에 칠한다. 다음 beat에 없으면 접힘 (수 13–21) */
  allot?: AllotName | AllotName[];
  /** 사사기의 순환 고리 (fx/cycle.ts): { round, judge, at?, skip?, broken? }. 다음 beat에 없으면 왼쪽 위로 작게 물러나 남는다 */
  cycle?: CycleSpec;
  /** 소리 글자: 무대 가운데 희미하게 떠올랐다 스러진다. 암전(fx blackout)과 같이 — 보여 주지 않는 장면을 소리로만 */
  sound?: string;
  /** 동작 라이브러리 (engine/actions.ts). 예: "kneel". 누가 = who (line이면 말하는 사람) */
  act?: ActionName;
  /** 동작하는 사람 (한 명 또는 여럿). line beat에서는 말하는 사람 */
  who?: string | string[];
  /** 두 사람 동작의 상대 (approach·embrace·face 등) */
  to?: string;
  /** 여정 지도(travel): 출발지·경유지 */
  from?: PlaceName;
  via?: PlaceName[];
  /** 여정 지도(travel)의 도착지는 to에 장소 이름으로 쓴다 */
  /** 동작 여러 개를 동시에: [{ "act": "embrace", "who": ["jacob", "esau"] }, { "act": "cry", "who": "esau" }] */
  acts?: ActionStep[];
}

/** 동작 하나 (beat의 act·who·to·from·via와 같은 뜻) */
export interface ActionStep {
  act: ActionName;
  who?: string | string[];
  to?: string;
  from?: PlaceName;
  via?: PlaceName[];
}

/** 동작만 하는 beat: 글 없이 움직이고, 잠깐 뒤 저절로 다음 beat로 넘어간다 */
export interface ActionBeat extends BeatBase {
  type?: 'act';
}

/** 이야기 목소리(이영도풍) 서술 */
export interface NarrationBeat extends BeatBase {
  type: 'narration';
  text: string;
}

/** 인물 대사. 말하는 사람이 강조되고 나머지는 어두워진다 */
export interface LineBeat extends BeatBase {
  type: 'line';
  who: string;
  text: string;
}

/** 하나님의 목소리. 인물로 그리지 않고 빛나는 글자로만 (CLAUDE.md 8-1) */
export interface VoiceBeat extends BeatBase {
  type: 'voice';
  text: string;
}

/** 개역한글 본문 카드 + 한 줄 번역 */
export interface ScriptureBeat extends BeatBase {
  type: 'scripture';
  ref: string;
  gloss?: string;
}

export interface ChoiceOption {
  label: string;
  /** 같은 장면 안의 beat id 또는 branches의 이름. 없으면 선택지 바로 다음으로 */
  goto?: string;
  /** 실제 본문 경로 */
  canon?: boolean;
}

export interface ChoiceBeat extends BeatBase {
  type: 'choice';
  prompt: string;
  options: ChoiceOption[];
}

export type Beat = NarrationBeat | LineBeat | VoiceBeat | ScriptureBeat | ChoiceBeat | ActionBeat;

/** 장면에서만 쓰는 이름 없는 조연 (characters/_kit.ts로 그 자리에서 만든다) */
export interface ExtraSpec {
  name: string;
  base: Base;
  hair?: Hair;
  beard?: Beard;
  props?: Prop[];
  tint?: Tint;
  height?: number;
}

export interface Scene {
  id: string;
  act: number;
  /** A = 큰 사건(전용 그림·연출), B = 라이브러리 조립 (기본 A) */
  grade?: 'A' | 'B';
  title: string;
  ref: string;
  pov?: string;
  mood?: string;
  /** mood와 같음. 둘 다 없으면 막 기본 배경 (moods.ts ACT_BG) */
  bg?: string;
  /** 이 장면에서만 나오는 조연: { "servant": { "name": "늙은 종", "base": "old-man" } } */
  extras?: Record<string, ExtraSpec>;
  /** 이 장면에서 이름표를 바꿔 부를 때: { "abraham": "아브람" } */
  names?: Record<string, string>;
  /** 처음부터 무대에 서 있는 인물 */
  cast?: string[];
  /** 무너져 가는 무대 (사사기): 0~13. 높을수록 가장자리부터 어둡고 빛이 바램. cycle의 바퀴가 더 높으면 그만큼 */
  decay?: number;
  /** 막 색 대신 쓰는 색조: "harvest" = 룻기의 밝은 추수 빛 */
  theme?: 'harvest';
  /** 처음부터 입고 있는 옷 { "adam": "skins" } */
  outfit?: Record<string, string>;
  beats: Beat[];
  /** "만약" 장면들. 다 보면 실제 본문 경로(canon)로 돌아간다 */
  branches?: Record<string, Beat[]>;
  /** 해설 (친구 말투, 2~4문장) */
  insight: string;
  /** 한 줄 요약 */
  tldr?: string;
  /** 끝 카드의 "다음" 버튼 위에 놓이는, 다음 이야기로 넘어가는 한 줄 (이야기 목소리) */
  bridge?: string;
  unlocks?: { characters?: string[] };
}


// ── 불러오기 ──────────────────────────────────
// 파일 찾기·목록·순서는 content.ts가 맡는다. 여기서는 형식 검사만.
export async function loadScene(id: string): Promise<Scene> {
  const scene = await loadContent<Scene>('scene', id);
  // type 없이(또는 "act") 글(text)만 붙은 beat는 글이 화면에 안 나왔다 → 이야기 서술로 보여 준다 (검사기도 오류로 잡음)
  for (const b of [...scene.beats, ...Object.values(scene.branches ?? {}).flat()] as Array<{ type?: string; text?: string }>) {
    if ((!b.type || b.type === 'act') && b.text) b.type = 'narration';
  }
  validate(scene);
  return scene;
}

/** 장면 파일의 흔한 실수를 일찍 알려준다 (goto 오타, canon 없음 등) */
function validate(scene: Scene): void {
  const ids = new Set(scene.beats.map((b) => b.id).filter(Boolean));
  const all = [...scene.beats, ...Object.values(scene.branches ?? {}).flat()];
  for (const b of all) {
    if (b.type === 'act' || !b.type) continue;
    if (b.type !== 'choice') continue;
    if (b.options.filter((o) => o.canon).length !== 1) console.warn(`[${scene.id}] 선택지에 canon이 정확히 하나여야 함: "${b.prompt}"`);
    for (const o of b.options) {
      if (o.goto && !ids.has(o.goto) && !scene.branches?.[o.goto]) console.warn(`[${scene.id}] goto 대상 없음: ${o.goto}`);
    }
  }
}

// ── 재생 순서 ─────────────────────────────────
/**
 * 본선(beats)을 순서대로 읽는다. 선택지에서 canon이 아닌 길을 고르면
 * branches의 "만약" 장면을 보여준 뒤, canon 선택지가 가리키는 곳으로 돌아온다.
 */
export class SceneCursor {
  private i = -1;
  /** 지금 보고 있는 "만약" 장면 */
  private branch: { beats: Beat[]; i: number; resume: number } | null = null;

  constructor(readonly scene: Scene) {}

  /** 다음 beat. 끝이면 null */
  next(): Beat | null {
    if (this.branch) {
      const b = this.branch;
      if (++b.i < b.beats.length) return b.beats[b.i];
      this.branch = null;
      this.i = b.resume - 1;
    }
    this.i++;
    return this.scene.beats[this.i] ?? null;
  }

  /** 지금 beat(선택지)에서 n번째 보기를 골랐다 */
  choose(n: number): void {
    const beat = this.branch ? this.branch.beats[this.branch.i] : this.scene.beats[this.i];
    if (beat?.type !== 'choice') return;
    const picked = beat.options[n];
    const canon = beat.options.find((o) => o.canon) ?? beat.options[0];
    // canon 길이 돌아올 자리: goto가 있으면 그 beat, 없으면 선택지 바로 다음
    const after = this.branch ? null : this.i + 1;
    const target = (o: ChoiceOption) => (o.goto ? this.indexOf(o.goto) : after);

    if (picked.goto && this.scene.branches?.[picked.goto]) {
      const resume = target(canon) ?? after ?? this.scene.beats.length;
      this.branch = { beats: this.scene.branches[picked.goto], i: -1, resume };
      return;
    }
    const to = target(picked);
    if (to != null) {
      this.branch = null;
      this.i = to - 1;
    }
  }

  private indexOf(id: string): number | null {
    const n = this.scene.beats.findIndex((b) => b.id === id);
    return n < 0 ? null : n;
  }

  /** 본선에서 몇 번째인지 (진행 막대용, 0~1) */
  get progress(): number {
    return Math.max(0, this.i) / Math.max(1, this.scene.beats.length);
  }
}
