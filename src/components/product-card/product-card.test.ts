import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './product-card';

describe('ecom-product-card', () => {
  let el: HTMLElement;

  beforeEach(async () => {
    el = document.createElement('ecom-product-card');
    el.setAttribute('title', 'Test Product');
    el.setAttribute('price', '1999');
    el.setAttribute('image-url', 'https://example.com/image.jpg');
    document.body.appendChild(el);
    await new Promise((r) => queueMicrotask(r));
  });

  afterEach(() => {
    el.remove();
  });

  it('renders the product title', () => {
    const title = el.shadowRoot?.querySelector('.card__title');
    expect(title?.textContent).toBe('Test Product');
  });

  it('renders the formatted price', () => {
    const price = el.shadowRoot?.querySelector('.card__price');
    expect(price?.textContent?.trim()).toContain('19,99');
  });

  it('shows badge when set', async () => {
    el.setAttribute('badge', 'New');
    await new Promise((r) => queueMicrotask(r));
    const badge = el.shadowRoot?.querySelector('.card__badge');
    expect(badge?.textContent).toBe('New');
  });

  it('shows compare-at-price when on sale', async () => {
    el.setAttribute('compare-at-price', '2999');
    await new Promise((r) => queueMicrotask(r));
    const compare = el.shadowRoot?.querySelector('.card__compare-price');
    expect(compare).toBeTruthy();
  });

  it('emits ecom:add-to-cart on button click', async () => {
    let emitted = false;
    el.addEventListener('ecom:add-to-cart', () => {
      emitted = true;
    });
    const btn = el.shadowRoot?.querySelector('.card__btn') as HTMLButtonElement;
    btn?.click();
    await new Promise((r) => setTimeout(r, 10));
    expect(emitted).toBe(true);
  });

  it('renders JSON-LD structured data', () => {
    const script = el.shadowRoot?.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    const data = JSON.parse(script?.textContent ?? '{}');
    expect(data['@type']).toBe('Product');
    expect(data.name).toBe('Test Product');
  });
});
