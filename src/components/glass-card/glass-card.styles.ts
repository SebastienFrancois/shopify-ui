import { tokens } from '../../styles/tokens';
import { reset } from '../../styles/reset';
import { fadeIn } from '../../styles/animations';

export const styles = `
  ${tokens}
  ${reset}
  ${fadeIn}

  :host {
    animation: sui-fade-in 0.3s ease;
  }

  .glass {
    background: rgba(255, 255, 255, var(--glass-opacity, 0.15));
    backdrop-filter: blur(var(--glass-blur, 12px));
    -webkit-backdrop-filter: blur(var(--glass-blur, 12px));
    border: 1px solid rgba(255, 255, 255, var(--glass-border-opacity, 0.2));
    border-radius: var(--glass-radius, var(--sui-border-radius-lg));
    padding: var(--glass-padding, var(--sui-spacing-lg));
    transition: transform var(--sui-transition), box-shadow var(--sui-transition);
  }

  .glass:hover {
    transform: translateY(-2px);
    box-shadow: var(--sui-shadow-lg);
  }

  /* Fallback for browsers without backdrop-filter */
  @supports not (backdrop-filter: blur(1px)) {
    .glass {
      background: rgba(255, 255, 255, 0.8);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :host {
      animation: none;
    }
    .glass:hover {
      transform: none;
    }
  }
`;
