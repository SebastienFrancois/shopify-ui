import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './carousel';

describe('ecom-carousel', () => {
  let el: HTMLElement;

  beforeEach(async () => {
    el = document.createElement('ecom-carousel');
    for (let i = 0; i < 3; i++) {
      const slide = document.createElement('div');
      slide.textContent = `Slide ${i}`;
      el.appendChild(slide);
    }
    document.body.appendChild(el);
    await new Promise((r) => queueMicrotask(r));
  });

  afterEach(() => {
    el.remove();
  });

  it('renders the carousel structure', () => {
    const track = el.shadowRoot?.querySelector('.carousel__track');
    expect(track).toBeTruthy();
  });

  it('renders navigation arrows by default', () => {
    const prev = el.shadowRoot?.querySelector('.carousel__nav--prev');
    const next = el.shadowRoot?.querySelector('.carousel__nav--next');
    expect(prev).toBeTruthy();
    expect(next).toBeTruthy();
  });

  it('has correct ARIA attributes', () => {
    const region = el.shadowRoot?.querySelector('[role="region"]');
    expect(region?.getAttribute('aria-roledescription')).toBe('carousel');
  });
});
