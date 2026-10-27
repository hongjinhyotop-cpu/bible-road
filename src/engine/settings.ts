import { Store } from './store';

export type TextSpeed = 'slow' | 'normal' | 'fast' | 'instant';
export type TextSize = 'small' | 'normal' | 'large';
export type MotionPref = 'system' | 'reduce' | 'full';

export interface Settings {
  sound: boolean;
  textSpeed: TextSpeed;
  textSize: TextSize;
  motion: MotionPref;
}

export const settings = new Store<Settings>('settings', {
  sound: false,
  textSpeed: 'normal',
  textSize: 'normal',
  motion: 'system',
});

/** 한 글자가 나타나는 간격(초) */
export const CHAR_DELAY: Record<TextSpeed, number> = {
  slow: 0.085,
  normal: 0.05,
  fast: 0.025,
  instant: 0,
};

const systemReduce = matchMedia('(prefers-reduced-motion: reduce)');

export function reducedMotion(): boolean {
  const m = settings.get().motion;
  return m === 'reduce' || (m === 'system' && systemReduce.matches);
}

/** 설정을 <html> 속성에 반영해 CSS가 읽을 수 있게 한다. */
export function applySettings(): void {
  const root = document.documentElement;
  const s = settings.get();
  root.dataset.textSize = s.textSize;
  root.dataset.reducedMotion = String(reducedMotion());
}

settings.subscribe(applySettings);
systemReduce.addEventListener('change', applySettings);
