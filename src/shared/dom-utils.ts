export function querySlotted<T extends Element>(
  host: HTMLElement,
  selector: string,
): T[] {
  const slot = host.shadowRoot?.querySelector<HTMLSlotElement>('slot');
  if (!slot) return [];
  return slot.assignedElements().filter((el) => el.matches(selector)) as T[];
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as unknown as T;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
