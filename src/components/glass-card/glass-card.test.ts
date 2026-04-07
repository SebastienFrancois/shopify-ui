import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './glass-card';

describe('ecom-glass-card', () => {
  let el: HTMLElement;

  beforeEach(async () => {
    el = document.createElement('ecom-glass-card');
    el.innerHTML = '<p>Test content</p>';
    document.body.appendChild(el);
    await new Promise((r) => queueMicrotask(r));
  });

  afterEach(() => {
    el.remove();
  });

  it('renders the glass container', () => {
    const glass = el.shadowRoot?.querySelector('.glass');
    expect(glass).toBeTruthy();
  });

  it('renders slotted content', () => {
    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('applies custom blur', async () => {
    el.setAttribute('blur', '20');
    await new Promise((r) => queueMicrotask(r));
    const style = el.shadowRoot?.querySelector('style');
    expect(style?.textContent).toContain('20px');
  });
});
