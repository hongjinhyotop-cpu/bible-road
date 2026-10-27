// 저장되는 작은 상태 묶음. 바뀌면 구독자에게 알리고 바로 저장한다.
import { load, save, remove } from './storage';

export class Store<T extends object> {
  private value: T;
  private listeners = new Set<(v: T) => void>();

  constructor(private key: string, private defaults: T) {
    this.value = load(key, defaults);
  }

  get(): T {
    return this.value;
  }

  set(patch: Partial<T>): void {
    this.value = { ...this.value, ...patch };
    save(this.key, this.value);
    this.listeners.forEach((fn) => fn(this.value));
  }

  reset(): void {
    remove(this.key);
    this.value = { ...this.defaults };
    this.listeners.forEach((fn) => fn(this.value));
  }

  subscribe(fn: (v: T) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}
