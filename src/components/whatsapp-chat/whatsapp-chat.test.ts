import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './whatsapp-chat';

describe('ecom-whatsapp-chat', () => {
  let el: HTMLElement;

  beforeEach(async () => {
    el = document.createElement('ecom-whatsapp-chat');
    el.setAttribute('phone', '+33612345678');
    document.body.appendChild(el);
    await new Promise((r) => queueMicrotask(r));
  });

  afterEach(() => {
    el.remove();
  });

  it('renders the WhatsApp button', () => {
    const btn = el.shadowRoot?.querySelector('.whatsapp__btn');
    expect(btn).toBeTruthy();
  });

  it('generates correct WhatsApp URL', () => {
    const link = el.shadowRoot?.querySelector('.whatsapp__btn') as HTMLAnchorElement;
    expect(link?.href).toContain('wa.me');
    expect(link?.href).toContain('33612345678');
  });

  it('includes pre-filled message in URL', async () => {
    el.setAttribute('message', 'Hello');
    await new Promise((r) => queueMicrotask(r));
    const link = el.shadowRoot?.querySelector('.whatsapp__btn') as HTMLAnchorElement;
    expect(link?.href).toContain('text=Hello');
  });

  it('renders tooltip when set', async () => {
    el.setAttribute('tooltip', 'Help');
    await new Promise((r) => queueMicrotask(r));
    const tooltip = el.shadowRoot?.querySelector('.whatsapp__tooltip');
    expect(tooltip?.textContent).toBe('Help');
  });
});
