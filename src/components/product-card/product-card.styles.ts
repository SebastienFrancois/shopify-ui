import { tokens } from '../../styles/tokens';
import { reset } from '../../styles/reset';
import { slideUp } from '../../styles/animations';

export const styles = `
  ${tokens}
  ${reset}
  ${slideUp}

  :host {
    animation: sui-slide-up 0.3s ease;
  }

  .card {
    border-radius: var(--sui-border-radius-lg);
    overflow: hidden;
    background: var(--sui-bg);
    box-shadow: var(--sui-shadow-sm);
    transition: box-shadow var(--sui-transition), transform var(--sui-transition);
    position: relative;
  }

  .card:hover {
    box-shadow: var(--sui-shadow-lg);
    transform: translateY(-2px);
  }

  .card__image-wrapper {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1;
    background: var(--sui-bg-muted);
  }

  .card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .card:hover .card__image {
    transform: scale(1.05);
  }

  .card__badge {
    position: absolute;
    top: var(--sui-spacing-sm);
    left: var(--sui-spacing-sm);
    padding: var(--sui-spacing-xs) var(--sui-spacing-sm);
    background: var(--sui-danger);
    color: var(--sui-text-inverse);
    font-size: var(--sui-font-size-xs);
    font-weight: 600;
    border-radius: var(--sui-border-radius);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .card__body {
    padding: var(--sui-spacing-md);
  }

  .card__title {
    font-size: var(--sui-font-size-base);
    font-weight: 600;
    color: var(--sui-text);
    margin-bottom: var(--sui-spacing-xs);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card__vendor {
    font-size: var(--sui-font-size-xs);
    color: var(--sui-text-muted);
    margin-bottom: var(--sui-spacing-sm);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .card__pricing {
    display: flex;
    align-items: center;
    gap: var(--sui-spacing-sm);
    margin-bottom: var(--sui-spacing-md);
  }

  .card__price {
    font-size: var(--sui-font-size-lg);
    font-weight: 700;
    color: var(--sui-text);
  }

  .card__price--sale {
    color: var(--sui-danger);
  }

  .card__compare-price {
    font-size: var(--sui-font-size-sm);
    color: var(--sui-text-muted);
    text-decoration: line-through;
  }

  .card__btn {
    width: 100%;
    padding: var(--sui-spacing-sm) var(--sui-spacing-md);
    background: var(--sui-primary);
    color: var(--sui-text-inverse);
    font-size: var(--sui-font-size-sm);
    font-weight: 600;
    border-radius: var(--sui-border-radius);
    transition: background var(--sui-transition);
    text-align: center;
  }

  .card__btn:hover {
    background: var(--sui-primary-hover);
  }

  .card__btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Horizontal layout */
  :host([layout="horizontal"]) .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }

  :host([layout="horizontal"]) .card__image-wrapper {
    aspect-ratio: auto;
    height: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    :host {
      animation: none;
    }
    .card:hover {
      transform: none;
    }
    .card:hover .card__image {
      transform: none;
    }
  }
`;
