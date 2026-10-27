import { settings, type Settings } from '../engine/settings';
import { progress } from '../engine/progress';
import { openSheetPanel } from './sheet';

type Option<K extends keyof Settings> = { value: Settings[K]; label: string };

function segment<K extends keyof Settings>(key: K, label: string, options: Option<K>[], hint?: string): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'setting';
  wrap.innerHTML = `<span class="setting__label" id="lbl-${key}">${label}</span><div class="seg" role="group" aria-labelledby="lbl-${key}"></div>${hint ? `<p class="setting__hint voice-talk">${hint}</p>` : ''}`;
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
    ], '배경음이랑 효과음은 다음 업데이트 때 들어옴. 지금은 켜도 조용함 ㅋㅋ'),
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
    ], '움직이는 거 어지러우면 ‘줄이기’ 눌러. 연출이 스르륵 페이드로만 나옴.'),
  );

  const reset = document.createElement('div');
  reset.className = 'setting';
  reset.innerHTML = `<span class="setting__label">진도 초기화</span><button class="btn danger" type="button" style="width:100%">진도 싹 지우기</button><p class="setting__hint voice-talk">켜진 별이랑 인물 카드 전부 날아감. 되돌리기 없음 주의.</p>`;
  const btn = reset.querySelector('button')!;
  let armed = false;
  btn.addEventListener('click', () => {
    if (!armed) {
      armed = true;
      btn.textContent = 'ㄹㅇ 지움? 한 번 더 누르면 끝';
      setTimeout(() => {
        armed = false;
        btn.textContent = '진도 싹 지우기';
      }, 4000);
      return;
    }
    progress.reset();
    btn.textContent = '싹 지웠음. 새로 시작 ㄱㄱ';
    btn.disabled = true;
    onReset?.();
  });
  sheet.body.append(reset);

  const src = document.createElement('p');
  src.className = 'setting__hint voice-talk';
  src.style.textAlign = 'center';
  src.style.marginTop = '20px';
  src.textContent = '성경 본문은 성경전서 개역한글판 (대한성서공회) 그대로 씀. 저작권 끝난 공개 자료임.';
  sheet.body.append(src);
}
