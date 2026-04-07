import { tokens } from '../../styles/tokens';
import { reset } from '../../styles/reset';

export const styles = `
  ${tokens}
  ${reset}

  .bundle {
    border: 2px solid var(--sui-border);
    border-radius: var(--sui-border-radius-lg);
    padding: var(--sui-spacing-lg);
    background: var(--sui-bg);
  }

  .bundle__header {
    text-align: center;
    margin-bottom: var(--sui-spacing-lg);
  }

  .bundle__title {
    font-size: var(--sui-font-size-xl);
    font-weight: 700;
    color: var(--sui-text);
  }

  .bundle__subtitle {
    font-size: var(--sui-font-size-sm);
    color: var(--sui-text-muted);
    margin-top: var(--sui-spacing-xs);
  }

  .bundle__items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--sui-spacing-md);
    margin-bottom: var(--sui-spacing-lg);
  }

  .bundle__item {
    text-align: center;
    padding: var(--sui-spacing-sm);
    border: 1px solid var(--sui-border);
    border-radius: var(--sui-border-radius);
    background: var(--sui-bg-muted);
  }

  .bundle__item-image {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: var(--sui-border-radius);
    margin-bottom: var(--sui-spacing-sm);
  }

  .bundle__item-title {
    font-size: var(--sui-font-size-sm);
    font-weight: 600;
    margin-bottom: var(--sui-spacing-xs);
  }

  .bundle__item-price {
    font-size: var(--sui-font-size-sm);
    color: var(--sui-text-muted);
  }

  .bundle__separator {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--sui-font-size-xl);
    color: var(--sui-text-muted);
    padding: 0 var(--sui-spacing-xs);
  }

  .bundle__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--sui-spacing-md);
    padding-top: var(--sui-spacing-lg);
    border-top: 1px solid var(--sui-border);
  }

  .bundle__pricing {
    display: flex;
    flex-direction: column;
  }

  .bundle__original-price {
    font-size: var(--sui-font-size-sm);
    color: var(--sui-text-muted);
    text-decoration: line-through;
  }

  .bundle__final-price {
    font-size: var(--sui-font-size-xl);
    font-weight: 700;
    color: var(--sui-danger);
  }

  .bundle__savings {
    font-size: var(--sui-font-size-xs);
    color: var(--sui-success);
    font-weight: 600;
  }

  .bundle__btn {
    padding: var(--sui-spacing-sm) var(--sui-spacing-xl);
    background: var(--sui-primary);
    color: var(--sui-text-inverse);
    font-size: var(--sui-font-size-base);
    font-weight: 600;
    border-radius: var(--sui-border-radius);
    transition: background var(--sui-transition);
  }

  .bundle__btn:hover {
    background: var(--sui-primary-hover);
  }

  .bundle__btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
