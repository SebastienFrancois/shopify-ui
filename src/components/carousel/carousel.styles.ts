import { tokens } from '../../styles/tokens';
import { reset } from '../../styles/reset';

export const styles = `
  ${tokens}
  ${reset}

  .carousel {
    position: relative;
    overflow: hidden;
  }

  .carousel__track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    gap: var(--carousel-gap, 1rem);
  }

  .carousel__track::-webkit-scrollbar {
    display: none;
  }

  ::slotted(*) {
    scroll-snap-align: start;
    flex: 0 0 var(--carousel-slide-width, 100%);
    min-width: 0;
  }

  .carousel__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: var(--sui-border-radius-full);
    background: var(--sui-bg);
    box-shadow: var(--sui-shadow);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    transition: opacity var(--sui-transition), background var(--sui-transition);
  }

  .carousel__nav:hover {
    background: var(--sui-bg-muted);
  }

  .carousel__nav--prev {
    left: var(--sui-spacing-sm);
  }

  .carousel__nav--next {
    right: var(--sui-spacing-sm);
  }

  .carousel__nav svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: var(--sui-text);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .carousel__dots {
    display: flex;
    justify-content: center;
    gap: var(--sui-spacing-sm);
    padding: var(--sui-spacing-md) 0;
  }

  .carousel__dot {
    width: 8px;
    height: 8px;
    border-radius: var(--sui-border-radius-full);
    background: var(--sui-border);
    transition: background var(--sui-transition), transform var(--sui-transition);
  }

  .carousel__dot--active {
    background: var(--sui-primary);
    transform: scale(1.3);
  }

  .carousel__nav[hidden],
  .carousel__dots[hidden] {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .carousel__track {
      scroll-behavior: auto;
    }
  }
`;
