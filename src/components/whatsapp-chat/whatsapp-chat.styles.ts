import { tokens } from '../../styles/tokens';
import { reset } from '../../styles/reset';
import { scaleIn, pulse } from '../../styles/animations';

export const styles = `
  ${tokens}
  ${reset}
  ${scaleIn}
  ${pulse}

  :host {
    position: fixed;
    z-index: 9998;
    animation: sui-scale-in 0.3s ease;
  }

  :host([position="bottom-right"]) {
    bottom: var(--sui-spacing-lg);
    right: var(--sui-spacing-lg);
  }

  :host([position="bottom-left"]) {
    bottom: var(--sui-spacing-lg);
    left: var(--sui-spacing-lg);
  }

  .whatsapp {
    position: relative;
  }

  .whatsapp__btn {
    width: var(--whatsapp-size, 56px);
    height: var(--whatsapp-size, 56px);
    border-radius: var(--sui-border-radius-full);
    background: #25D366;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--sui-shadow-lg);
    transition: transform var(--sui-transition), box-shadow var(--sui-transition);
    cursor: pointer;
    text-decoration: none;
  }

  .whatsapp__btn:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(37, 211, 102, 0.4);
  }

  .whatsapp__btn svg {
    width: 28px;
    height: 28px;
    fill: currentColor;
  }

  :host([pulse]) .whatsapp__btn {
    animation: sui-pulse 2s infinite;
  }

  .whatsapp__tooltip {
    position: absolute;
    bottom: calc(100% + var(--sui-spacing-sm));
    white-space: nowrap;
    padding: var(--sui-spacing-sm) var(--sui-spacing-md);
    background: var(--sui-bg);
    color: var(--sui-text);
    font-size: var(--sui-font-size-sm);
    border-radius: var(--sui-border-radius);
    box-shadow: var(--sui-shadow);
    animation: sui-scale-in 0.2s ease;
    pointer-events: none;
  }

  :host([position="bottom-right"]) .whatsapp__tooltip {
    right: 0;
  }

  :host([position="bottom-left"]) .whatsapp__tooltip {
    left: 0;
  }

  .whatsapp__tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 20px;
    border: 6px solid transparent;
    border-top-color: var(--sui-bg);
  }

  :host([size="sm"]) { --whatsapp-size: 44px; }
  :host([size="sm"]) .whatsapp__btn svg { width: 22px; height: 22px; }
  :host([size="lg"]) { --whatsapp-size: 68px; }
  :host([size="lg"]) .whatsapp__btn svg { width: 34px; height: 34px; }

  @media (prefers-reduced-motion: reduce) {
    :host, .whatsapp__tooltip {
      animation: none;
    }
    :host([pulse]) .whatsapp__btn {
      animation: none;
    }
  }
`;
