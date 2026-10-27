// 플레이 장면(scene) 형식과 재생 순서. 화면 그리기는 screens/scene.ts가 맡고,
// 여기서는 "다음에 무엇을 보여줄지"만 정한다 (CLAUDE.md 6번).
import type { Pose } from '../ui/actor';

/** 장면 연출 효과 */
export type SceneFx =
  | 'flash' // 빛이 번쩍
  | 'dawn' // 어둠이 걷히고 하늘이 밝아짐
  | 'dark' // 다시 어두워짐
  | 'land' // 땅(언덕)이 떠오름
  | 'shake'; // 화면 진동

interface BeatBase {
  /** goto로 찾아올 때 쓰는 이름 */
  id?: string;
  /** 무대에 새로 세울 인물 */
  enter?: string[];
  /** 무대에서 내보낼 인물 */
  exit?: string[];
  /** 인물별 자세 { "adam": "slump" } */
  pose?: Record<string, Pose>;
  fx?: SceneFx | SceneFx[];
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

export type Beat = NarrationBeat | LineBeat | VoiceBeat | ScriptureBeat | ChoiceBeat;

export interface Scene {
  id: string;
  act: number;
  title: string;
  ref: string;
  pov?: string;
  mood?: string;
  /** 처음부터 무대에 서 있는 인물 */
  cast?: string[];
  beats: Beat[];
  /** "만약" 장면들. 다 보면 실제 본문 경로(canon)로 돌아간다 */
  branches?: Record<string, Beat[]>;
  /** 해설 (친구 말투, 2~4문장) */
  insight: string;
  /** 한 줄 요약 */
  tldr?: string;
  unlocks?: { characters?: string[] };
}

// ── 불러오기 ──────────────────────────────────
// 파일 이름 = 장면 id. content/acts/01-beginning/scenes/gen-1-light.json → "gen-1-light"
const files = import.meta.glob<Scene>('/content/acts/*/scenes/*.json', { import: 'default' });

const idOf = (path: string) => path.replace(/^.*\/|\.json$/g, '');
const pathById = new Map(Object.keys(files).map((p) => [idOf(p), p]));

export interface SceneInfo {
  id: string;
  title: string;
  ref: string;
}

/** 한 막의 장면 목록 (지도 패널). 막 폴더 이름이 "01-..." 처럼 번호로 시작한다. */
export async function scenesOfAct(act: number): Promise<SceneInfo[]> {
  const prefix = `/content/acts/${String(act).padStart(2, '0')}-`;
  const paths = Object.keys(files).filter((p) => p.startsWith(prefix));
  return Promise.all(paths.map(async (p) => {
    const s = await files[p]();
    return { id: s.id, title: s.title, ref: s.ref };
  }));
}

export async function loadScene(id: string): Promise<Scene> {
  const path = pathById.get(id);
  if (!path) throw new Error(`장면 없음: ${id}`);
  const scene = await files[path]();
  validate(scene);
  return scene;
}

/** 장면 파일의 흔한 실수를 일찍 알려준다 (goto 오타, canon 없음 등) */
function validate(scene: Scene): void {
  const ids = new Set(scene.beats.map((b) => b.id).filter(Boolean));
  const all = [...scene.beats, ...Object.values(scene.branches ?? {}).flat()];
  for (const b of all) {
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
