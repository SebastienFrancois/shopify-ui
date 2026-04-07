import { tokens } from '../../styles/tokens';
import { reset } from '../../styles/reset';
import { scaleIn, slideUp } from '../../styles/animations';

export const styles = `
  ${tokens}
  ${reset}
  ${scaleIn}
  ${slideUp}

  :host {
    position: fixed;
    z-index: 9999;
  }

  :host([position="bottom-right"]) {
    bottom: var(--sui-spacing-lg);
    right: var(--sui-spacing-lg);
  }

  :host([position="bottom-left"]) {
    bottom: var(--sui-spacing-lg);
    left: var(--sui-spacing-lg);
  }

  .fab {
    width: 56px;
    height: 56px;
    border-radius: var(--sui-border-radius-full);
    background: var(--sui-primary);
    color: var(--sui-text-inverse);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--sui-shadow-lg);
    transition: transform var(--sui-transition), background var(--sui-transition);
    cursor: pointer;
  }

  .fab:hover {
    background: var(--sui-primary-hover);
    transform: scale(1.1);
  }

  .fab svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  .panel {
    display: none;
    position: absolute;
    bottom: 70px;
    width: 380px;
    max-height: 500px;
    border-radius: var(--sui-border-radius-lg);
    background: var(--sui-bg);
    box-shadow: var(--sui-shadow-lg);
    overflow: hidden;
    flex-direction: column;
    animation: sui-scale-in 0.2s ease;
  }

  :host([position="bottom-right"]) .panel {
    right: 0;
  }

  :host([position="bottom-left"]) .panel {
    left: 0;
  }

  .panel--open {
    display: flex;
  }

  .panel__header {
    padding: var(--sui-spacing-md);
    background: var(--sui-primary);
    color: var(--sui-text-inverse);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .panel__title {
    font-weight: 600;
    font-size: var(--sui-font-size-base);
  }

  .panel__close {
    color: var(--sui-text-inverse);
    opacity: 0.8;
    transition: opacity var(--sui-transition);
  }

  .panel__close:hover {
    opacity: 1;
  }

  .panel__messages {
    flex: 1;
    overflow-y: auto;
    padding: var(--sui-spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--sui-spacing-sm);
    min-height: 300px;
    max-height: 350px;
  }

  .message {
    max-width: 85%;
    padding: var(--sui-spacing-sm) var(--sui-spacing-md);
    border-radius: var(--sui-border-radius-lg);
    font-size: var(--sui-font-size-sm);
    line-height: 1.5;
    animation: sui-slide-up 0.2s ease;
    word-wrap: break-word;
  }

  .message--user {
    align-self: flex-end;
    background: var(--sui-primary);
    color: var(--sui-text-inverse);
    border-bottom-right-radius: 4px;
  }

  .message--assistant {
    align-self: flex-start;
    background: var(--sui-bg-muted);
    color: var(--sui-text);
    border-bottom-left-radius: 4px;
  }

  .message--typing {
    align-self: flex-start;
    background: var(--sui-bg-muted);
  }

  .typing-dots {
    display: flex;
    gap: 4px;
    padding: 4px 0;
  }

  .typing-dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--sui-text-muted);
    animation: sui-pulse 1.4s infinite;
  }

  .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
  .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes sui-pulse {
    0%, 80%, 100% { opacity: 0.3; }
    40% { opacity: 1; }
  }

  .panel__input {
    display: flex;
    border-top: 1px solid var(--sui-border);
    padding: var(--sui-spacing-sm);
    gap: var(--sui-spacing-sm);
  }

  .panel__input input {
    flex: 1;
    border: 1px solid var(--sui-border);
    border-radius: var(--sui-border-radius);
    padding: var(--sui-spacing-sm) var(--sui-spacing-md);
    font-size: var(--sui-font-size-sm);
    outline: none;
    transition: border-color var(--sui-transition);
  }

  .panel__input input:focus {
    border-color: var(--sui-primary);
  }

  .panel__send {
    padding: var(--sui-spacing-sm) var(--sui-spacing-md);
    background: var(--sui-primary);
    color: var(--sui-text-inverse);
    border-radius: var(--sui-border-radius);
    font-size: var(--sui-font-size-sm);
    font-weight: 600;
    transition: background var(--sui-transition);
  }

  .panel__send:hover {
    background: var(--sui-primary-hover);
  }

  .panel__send:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    .panel {
      width: calc(100vw - 2rem);
      max-height: 70vh;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .panel, .message {
      animation: none;
    }
  }
`;
