// 시험용 무대: 아담 실루엣이 어떤 느낌인지 보는 화면 (#/stage-test).
// 장면 재생기가 생기면 이 구조(무대 + 텍스트 박스)를 그대로 가져다 쓴다.
import gsap from 'gsap';
import type { Screen } from '../engine/router';
import { go } from '../engine/router';
import { ACTS } from '../engine/acts';
import { loadCharacter } from '../characters';
import { Actor, Stage, type Pose } from '../ui/actor';
import { inkReveal, type InkHandle } from '../fx/ink';
import { setFieldMode } from '../fx/particles';
import { icons } from '../ui/icons';

interface Line {
  text: string;
  speaker: string | null;
  pose: Pose;
}

// 창 2:7, 2:19-20을 바탕으로 한 시험 문장 (이야기 목소리)
const LINES: Line[] = [
  { speaker: null, pose: 'lift', text: '흙이었다. 그리고 숨이 들어왔다. 그게 전부였고, 그걸로 충분했다.' },
  { speaker: null, pose: 'neutral', text: '첫 사람이 처음 받은 일은 이름 짓기였다. 세상에 이름 없는 것이 그렇게 많다는 걸, 아무도 미리 말해 주지 않았다.' },
  { speaker: 'adam', pose: 'neutral', text: '“…저건 뭐라고 부르지.”' },
  { speaker: null, pose: 'slump', text: '짐승들은 짝을 지어 지나갔다. 이름을 다 붙이고 나서야 그는 알았다. 자기 옆자리만 비어 있다는 것을.' },
];

const POSE_LABEL: [Pose, string][] = [
  ['neutral', '기본'],
  ['slump', '어깨 처짐'],
  ['lift', '고개 듦'],
  ['tremble', '떨림'],
];

export function stageTestScreen(): Screen {
  const el = document.createElement('section');
  el.className = 'screen stage-test';
  el.dataset.act = '1';
  el.innerHTML = `
    <header class="stage-test__head">
      <button class="icon-btn" data-back aria-label="지도로 가기">${icons.back}</button>
      <p class="voice-talk">캐릭터 미리보기 <span>시험용</span></p>
      <span style="width:44px"></span>
    </header>
    <div class="scene">
      <svg class="scene__land" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
        <path class="far" d="M0 70 C60 40 110 62 170 48 C240 30 300 58 400 40 L400 120 L0 120 Z"/>
        <path class="near" d="M0 92 C80 78 150 96 220 86 C290 76 340 92 400 84 L400 120 L0 120 Z"/>
      </svg>
      <div class="scene__stage"></div>
    </div>
    <div class="textbox" tabindex="0" aria-live="polite">
      <p class="textbox__name"></p>
      <p class="textbox__text voice-story"></p>
      <span class="textbox__next ui" aria-hidden="true">탭해서 다음</span>
    </div>
    <div class="stage-test__controls voice-talk">
      <div class="chips" data-poses></div>
      <div class="chips">
        <button data-speak aria-pressed="false">말하기</button>
        <button data-act-cycle>막 색 바꾸기 · 1막</button>
      </div>
    </div>`;

  const $ = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
  const stage = new Stage();
  let adam: Actor | null = null;
  let ink: InkHandle | null = null;
  let line = -1;
  let act = 1;

  function next() {
    if (ink && ink.timeline.progress() < 1) {
      ink.finish();
      return;
    }
    line = (line + 1) % LINES.length;
    const l = LINES[line];
    const name = $('.textbox__name');
    name.textContent = l.speaker ? adam?.def.name ?? '' : '';
    name.hidden = !l.speaker;
    stage.setSpeaker(l.speaker);
    $('[data-speak]').setAttribute('aria-pressed', String(!!l.speaker));
    adam?.pose(l.pose);
    syncPoseChips();
    ink = inkReveal($('.textbox__text'), l.text);
  }

  function syncPoseChips() {
    el.querySelectorAll<HTMLButtonElement>('[data-pose]').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.pose === adam?.currentPose)),
    );
  }

  async function enter() {
    setFieldMode('dust');
    $('[data-back]').addEventListener('click', () => go('/map'));
    $('.scene__stage').append(stage.el);

    const poses = $('[data-poses]');
    for (const [pose, label] of POSE_LABEL) {
      const b = document.createElement('button');
      b.dataset.pose = pose;
      b.textContent = label;
      b.addEventListener('click', () => {
        adam?.pose(pose);
        syncPoseChips();
      });
      poses.append(b);
    }
    $('[data-speak]').addEventListener('click', (e) => {
      const on = (e.currentTarget as HTMLElement).getAttribute('aria-pressed') !== 'true';
      (e.currentTarget as HTMLElement).setAttribute('aria-pressed', String(on));
      stage.setSpeaker(on ? 'adam' : null);
    });
    $('[data-act-cycle]').addEventListener('click', (e) => {
      act = (act % 14) + 1;
      el.dataset.act = String(act);
      (e.currentTarget as HTMLElement).textContent = `막 색 바꾸기 · ${act}막 ${ACTS[act - 1].title}`;
    });
    const box = $('.textbox');
    box.addEventListener('click', next);
    box.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        next();
      }
    });

    adam = stage.add(new Actor(await loadCharacter('adam')));
    gsap.fromTo(adam.el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out' });
    next();
  }

  return {
    el,
    enter: () => void enter(),
    leave() {
      ink?.timeline.kill();
      stage.destroy();
    },
  };
}
