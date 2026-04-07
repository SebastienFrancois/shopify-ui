import { BaseElement } from '../../shared/base-element';
import { styles } from './ai-chat.styles';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class AiChat extends BaseElement {
  static properties = {
    endpoint: { type: String, default: '' },
    apiKey: { type: String, default: '', attribute: 'api-key' },
    position: { type: String, default: 'bottom-right' },
    title: { type: String, default: 'Assistant IA' },
    placeholder: { type: String, default: 'Posez votre question...' },
    welcomeMessage: { type: String, default: 'Bonjour ! Comment puis-je vous aider ?', attribute: 'welcome-message' },
    theme: { type: String, default: 'light' },
    model: { type: String, default: '' },
    storage: { type: Boolean, default: false },
  };

  declare endpoint: string;
  declare apiKey: string;
  declare position: string;
  declare title: string;
  declare placeholder: string;
  declare welcomeMessage: string;
  declare theme: string;
  declare model: string;
  declare storage: boolean;

  private _isOpen = false;
  private _messages: ChatMessage[] = [];
  private _isLoading = false;

  protected styles(): string {
    return styles;
  }

  protected firstUpdated(): void {
    if (!this.getAttribute('position')) {
      this.setAttribute('position', 'bottom-right');
    }

    if (this.storage) {
      const stored = sessionStorage.getItem('ecom-ai-chat-messages');
      if (stored) this._messages = JSON.parse(stored);
    }

    if (this.welcomeMessage && this._messages.length === 0) {
      this._messages.push({ role: 'assistant', content: this.welcomeMessage });
      this._renderMessages();
    }

    this.shadowRoot?.addEventListener('click', (e) => {
      const target = e.target as Element;
      if (target.closest('.fab')) this._toggle();
      if (target.closest('.panel__close')) this._toggle();
      if (target.closest('.panel__send')) this._send();
    });

    this.shadowRoot?.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Enter' && (e.target as Element).matches('input')) {
        this._send();
      }
    });
  }

  private _toggle(): void {
    this._isOpen = !this._isOpen;
    const panel = this.shadowRoot?.querySelector('.panel');
    panel?.classList.toggle('panel--open', this._isOpen);

    if (this._isOpen) {
      this.emit('ecom:chat-open');
      this._scrollToBottom();
      setTimeout(() => {
        const input = this.shadowRoot?.querySelector('input');
        input?.focus();
      }, 100);
    } else {
      this.emit('ecom:chat-close');
    }
  }

  private async _send(): Promise<void> {
    const input = this.shadowRoot?.querySelector('input') as HTMLInputElement;
    const text = input?.value?.trim();
    if (!text || this._isLoading) return;

    input.value = '';
    this._messages.push({ role: 'user', content: text });
    this._renderMessages();
    this._isLoading = true;
    this._showTyping();

    try {
      const response = await this._callApi(text);
      this._messages.push({ role: 'assistant', content: response });
      this.emit('ecom:chat-message', { role: 'assistant', content: response });
    } catch {
      this._messages.push({ role: 'assistant', content: 'Desole, une erreur est survenue. Veuillez reessayer.' });
    } finally {
      this._isLoading = false;
      this._hideTyping();
      this._renderMessages();
      this._persistMessages();
    }
  }

  private async _callApi(message: string): Promise<string> {
    if (!this.endpoint) throw new Error('No endpoint configured');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const body: Record<string, unknown> = {
      messages: this._messages.map((m) => ({ role: m.role, content: m.content })),
    };
    if (this.model) body.model = this.model;

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error('API error');

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? data.content ?? 'Pas de reponse.';
  }

  private _renderMessages(): void {
    const container = this.shadowRoot?.querySelector('.panel__messages');
    if (!container) return;

    container.innerHTML = this._messages
      .map(
        (msg) =>
          `<div class="message message--${msg.role}">${this._escapeHtml(msg.content)}</div>`,
      )
      .join('');

    this._scrollToBottom();
  }

  private _showTyping(): void {
    const container = this.shadowRoot?.querySelector('.panel__messages');
    if (!container) return;
    const typing = document.createElement('div');
    typing.className = 'message message--typing';
    typing.id = 'typing-indicator';
    typing.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    container.appendChild(typing);
    this._scrollToBottom();
  }

  private _hideTyping(): void {
    this.shadowRoot?.querySelector('#typing-indicator')?.remove();
  }

  private _scrollToBottom(): void {
    const container = this.shadowRoot?.querySelector('.panel__messages');
    if (container) container.scrollTop = container.scrollHeight;
  }

  private _persistMessages(): void {
    if (this.storage) {
      sessionStorage.setItem('ecom-ai-chat-messages', JSON.stringify(this._messages));
    }
  }

  private _escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  protected render(): string {
    const chatIcon = `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
    const closeIcon = `&#10005;`;

    return `
      <div class="panel" part="panel">
        <div class="panel__header" part="header">
          <span class="panel__title">${this.title}</span>
          <button class="panel__close" aria-label="Fermer">${closeIcon}</button>
        </div>
        <div class="panel__messages" part="messages">
          ${this._messages.map((msg) => `<div class="message message--${msg.role}">${this._escapeHtml(msg.content)}</div>`).join('')}
        </div>
        <div class="panel__input" part="input">
          <input type="text" placeholder="${this.placeholder}" aria-label="${this.placeholder}">
          <button class="panel__send" ${this._isLoading ? 'disabled' : ''}>Envoyer</button>
        </div>
      </div>
      <button class="fab" aria-label="Ouvrir le chat" part="fab">
        ${chatIcon}
      </button>
    `;
  }
}

customElements.define('ecom-ai-chat', AiChat);
