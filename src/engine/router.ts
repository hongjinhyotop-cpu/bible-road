// 해시 라우터 (#/ , #/map). GitHub Pages에서 새로고침해도 깨지지 않도록 해시를 쓴다.
import { lightBloom } from '../fx/transition';

export interface Screen {
  el: HTMLElement;
  /** 화면이 DOM에 붙은 직후 */
  enter(): void;
  /** 화면을 떠나기 직전 (타이머·관찰자 정리) */
  leave?(): void;
}

type Factory = () => Screen;

const routes = new Map<string, Factory>();
let current: Screen | null = null;
let currentPath = '';
let busy = false;
let pendingOrigin: { x: number; y: number } | undefined;

export function route(path: string, factory: Factory): void {
  routes.set(path, factory);
}

function pathFromHash(): string {
  const p = location.hash.replace(/^#/, '') || '/';
  return routes.has(p) ? p : '/';
}

function mount(path: string): void {
  current?.leave?.();
  current?.el.remove();
  current = routes.get(path)!();
  currentPath = path;
  document.getElementById('app')!.append(current.el);
  current.enter();
}

export function go(path: string, origin?: { x: number; y: number }): void {
  pendingOrigin = origin;
  if (location.hash === `#${path}`) void show(path);
  else location.hash = path;
}

async function show(path: string): Promise<void> {
  if (busy || (path === currentPath && current)) return;
  busy = true;
  try {
    if (!current) mount(path);
    else await lightBloom(() => mount(path), pendingOrigin);
  } finally {
    pendingOrigin = undefined;
    busy = false;
  }
  // 전환 중에 주소가 또 바뀌었으면 따라간다
  if (pathFromHash() !== currentPath) void show(pathFromHash());
}

export function startRouter(): void {
  window.addEventListener('hashchange', () => void show(pathFromHash()));
  void show(pathFromHash());
}
