// 화면 전환: 빛 번짐. 빛이 화면을 덮는 순간 화면을 바꾸고, 빛이 걷히며 새 화면이 드러난다.
import gsap from 'gsap';
import { reducedMotion } from '../engine/settings';

const bloom = document.createElement('div');
bloom.className = 'bloom';
document.body.append(bloom);

export async function lightBloom(swap: () => void | Promise<void>, origin?: { x: number; y: number }): Promise<void> {
  if (reducedMotion()) {
    const app = document.getElementById('app')!;
    await gsap.to(app, { opacity: 0, duration: 0.3 });
    await swap();
    await gsap.to(app, { opacity: 1, duration: 0.4 });
    return;
  }
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const size = Math.hypot(window.innerWidth, window.innerHeight) * 1.4;
  gsap.set(bloom, { left: x - size / 2, top: y - size / 2, width: size, height: size, inset: 'auto', scale: 0.05, opacity: 0 });
  await gsap.to(bloom, { scale: 1, opacity: 1, duration: 0.85, ease: 'expo.in' });
  await swap();
  await gsap.to(bloom, { opacity: 0, scale: 1.25, duration: 1.1, ease: 'power2.out' });
}
