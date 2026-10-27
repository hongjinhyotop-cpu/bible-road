import { settings, type Settings } from '../engine/settings';
import { progress } from '../engine/progress';
import { openSheetPanel } from './sheet';

type Option<K extends keyof Settings> = { value: Settings[K]; label: string };

function segment<K extends keyof Settings>(key: K, label: string, options: Option<K>[], hint?: string): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'setting';
  wrap.innerHTML = `<span class="setting__label" id="lbl-${key}">${label}</span><div class="seg" role="group" aria-labelledby="lbl-${key}"></div>${hint ? `<p class="setting__hint">${hint}</p>` : ''}`;
  const seg = wrap.querySelector('.seg')!;
  const sync = () =>
    seg.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', String(options[i].value === settings.get()[key])));
  for (const o of options) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = o.label;
    b.addEventListener('click', () => {
      settings.set({ [key]: o.value } as Partial<Settings>);
      sync();
    });
    seg.append(b);
  }
  sync();
  return wrap;
}

export function openSettings(onReset?: () => void): void {
  const sheet = openSheetPanel('설정', 'Optiones');
  sheet.body.append(
    segment('sound', '소리', [
      { value: false, label: '끄기' },
      { value: true, label: '켜기' },
    ], '배경음과 효과음은 다음 단계에서 들어옵니다.'),
    segment('textSpeed', '글자 속도', [
      { value: 'slow', label: '느리게' },
      { value: 'normal', label: '보통' },
      { value: 'fast', label: '빠르게' },
      { value: 'instant', label: '즉시' },
    ]),
    segment('textSize', '글자 크기', [
      { value: 'small', label: '작게' },
      { value: 'normal', label: '보통' },
      { value: 'large', label: '크게' },
    ]),
    segment('motion', '모션 줄이기', [
      { value: 'system', label: '기기 설정' },
      { value: 'reduce', label: '줄이기' },
      { value: 'full', label: '모두 보기' },
    ], '‘줄이기’를 고르면 움직임이 부드러운 페이드로 바뀝니다.'),
  );

  const reset = document.createElement('div');
  reset.className = 'setting';
  reset.innerHTML = `<span class="setting__label">진도 초기화</span><button class="btn danger" type="button" style="width:100%">처음부터 다시 걷기</button><p class="setting__hint">켜진 별과 인물 카드가 모두 사라집니다.</p>`;
  const btn = reset.querySelector('button')!;
  let armed = false;
  btn.addEventListener('click', () => {
    if (!armed) {
      armed = true;
      btn.textContent = '정말 지울까요? 한 번 더 누르세요';
      setTimeout(() => {
        armed = false;
        btn.textContent = '처음부터 다시 걷기';
      }, 4000);
      return;
    }
    progress.reset();
    btn.textContent = '초기화했습니다';
    btn.disabled = true;
    onReset?.();
  });
  sheet.body.append(reset);

  const src = document.createElement('p');
  src.className = 'setting__hint';
  src.style.textAlign = 'center';
  src.style.marginTop = '20px';
  src.textContent = '본문: 성경전서 개역한글판 (대한성서공회) · 퍼블릭 도메인';
  sheet.body.append(src);
}
