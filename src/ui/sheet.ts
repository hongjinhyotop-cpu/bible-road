// 아래에서 올라오는 패널(모바일) / 가운데 뜨는 패널(데스크톱).
import gsap from 'gsap';
import { reducedMotion } from '../engine/settings';
import { icons } from './icons';

export interface Sheet {
  el: HTMLElement;
  body: HTMLElement;
  close(): Promise<void>;
}

let openSheet: Sheet | null = null;

export function isSheetOpen(): boolean {
  return openSheet != null;
}

export function closeSheet(): void {
  openSheet?.close();
}

export function openSheetPanel(title: string, latin: string): Sheet {
  openSheet?.close();
  const prevFocus = document.activeElement as HTMLElement | null;
  const backdrop = document.createElement('div');
  backdrop.className = 'sheet-backdrop';
  const el = document.createElement('section');
  el.className = 'sheet';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', title);
  el.innerHTML = `
    <div class="sheet__grip"></div>
    <header class="sheet__head">
      <h2 class="sheet__title">${title}<span class="latin">${latin}</span></h2>
      <button class="icon-btn" data-close aria-label="닫기">${icons.close}</button>
    </header>
    <div class="sheet__body"></div>`;
  document.body.append(backdrop, el);

  const desktop = matchMedia('(min-width: 768px)').matches;
  const rm = reducedMotion();
  gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.4 });
  gsap.fromTo(
    el,
    desktop ? { xPercent: -50, yPercent: rm ? -50 : -46, opacity: 0, scale: rm ? 1 : 0.97 } : rm ? { opacity: 0 } : { yPercent: 100 },
    { opacity: 1, yPercent: desktop ? -50 : 0, scale: 1, duration: rm ? 0.3 : 0.7, ease: 'expo.out' },
  );

  let closing = false;
  const sheet: Sheet = {
    el,
    body: el.querySelector('.sheet__body')!,
    async close() {
      if (closing) return;
      closing = true;
      if (openSheet === sheet) openSheet = null;
      await Promise.all([
        gsap.to(backdrop, { opacity: 0, duration: 0.35 }),
        gsap.to(el, rm ? { opacity: 0, duration: 0.25 } : desktop ? { opacity: 0, yPercent: -46, duration: 0.35, ease: 'power2.in' } : { yPercent: 100, duration: 0.45, ease: 'power3.in' }),
      ]);
      backdrop.remove();
      el.remove();
      prevFocus?.focus?.();
    },
  };
  backdrop.addEventListener('click', () => sheet.close());
  el.querySelector('[data-close]')!.addEventListener('click', () => sheet.close());
  openSheet = sheet;
  requestAnimationFrame(() => (el.querySelector('[data-close]') as HTMLElement).focus());
  return sheet;
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && openSheet) openSheet.close();
});
