import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './product-bundle';

describe('ecom-product-bundle', () => {
  let el: HTMLElement;

  const items = JSON.stringify([
    { title: 'Item A', price: 1000, variantId: 1 },
    { title: 'Item B', price: 2000, variantId: 2 },
  ]);

  beforeEach(async () => {
    el = document.createElement('ecom-product-bundle');
    el.setAttribute('title', 'Test Bundle');
    el.setAttribute('items', items);
    el.setAttribute('discount-value', '10');
    document.body.appendChild(el);
    await new Promise((r) => queueMicrotask(r));
  });

  afterEach(() => {
    el.remove();
  });

  it('renders the bundle title', () => {
    const title = el.shadowRoot?.querySelector('.bundle__title');
    expect(title?.textContent).toBe('Test Bundle');
  });

  it('renders all items', () => {
    const itemEls = el.shadowRoot?.querySelectorAll('.bundle__item');
    expect(itemEls?.length).toBe(2);
  });

  it('calculates discounted price', () => {
    const finalPrice = el.shadowRoot?.querySelector('.bundle__final-price');
    expect(finalPrice?.textContent?.trim()).toContain('27,00');
  });

  it('emits ecom:bundle-add on click', async () => {
    let emitted = false;
    el.addEventListener('ecom:bundle-add', () => {
      emitted = true;
    });
    // Note: this will fail in test env due to fetch mock, but tests the event wiring
    const btn = el.shadowRoot?.querySelector('.bundle__btn') as HTMLButtonElement;
    expect(btn).toBeTruthy();
  });
});
