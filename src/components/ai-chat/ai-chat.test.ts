import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ai-chat';

describe('ecom-ai-chat', () => {
  let el: HTMLElement;

  beforeEach(async () => {
    el = document.createElement('ecom-ai-chat');
    el.setAttribute('endpoint', '/api/chat');
    el.setAttribute('title', 'Test Chat');
    document.body.appendChild(el);
    await new Promise((r) => queueMicrotask(r));
  });

  afterEach(() => {
    el.remove();
  });

  it('renders the FAB button', () => {
    const fab = el.shadowRoot?.querySelector('.fab');
    expect(fab).toBeTruthy();
  });

  it('panel is hidden by default', () => {
    const panel = el.shadowRoot?.querySelector('.panel');
    expect(panel?.classList.contains('panel--open')).toBe(false);
  });

  it('opens panel on FAB click', async () => {
    const fab = el.shadowRoot?.querySelector('.fab') as HTMLButtonElement;
    fab?.click();
    await new Promise((r) => queueMicrotask(r));
    const panel = el.shadowRoot?.querySelector('.panel');
    expect(panel?.classList.contains('panel--open')).toBe(true);
  });

  it('shows welcome message', async () => {
    // Welcome message is rendered in firstUpdated, need to wait
    await new Promise((r) => setTimeout(r, 50));
    const messages = el.shadowRoot?.querySelectorAll('.message');
    expect(messages?.length).toBeGreaterThanOrEqual(1);
  });
});
