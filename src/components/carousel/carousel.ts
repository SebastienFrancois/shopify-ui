import { BaseElement } from '../../shared/base-element';
import { styles } from './carousel.styles';

export class Carousel extends BaseElement {
  static properties = {
    autoplay: { type: Boolean, default: false },
    interval: { type: Number, default: 5000 },
    loop: { type: Boolean, default: true },
    slidesPerView: { type: Number, default: 1, attribute: 'slides-per-view' },
    gap: { type: String, default: '1rem' },
    navigation: { type: String, default: 'both' },
  };

  declare autoplay: boolean;
  declare interval: number;
  declare loop: boolean;
  declare slidesPerView: number;
  declare gap: string;
  declare navigation: string;

  private _currentIndex = 0;
  private _autoplayTimer?: ReturnType<typeof setInterval>;
  private _observer?: IntersectionObserver;

  protected styles(): string {
    return styles;
  }

  protected firstUpdated(): void {
    this._setupNavigation();
    this._setupIntersectionObserver();
    this._updateSlideWidth();
    if (this.autoplay) this._startAutoplay();
  }

  protected disconnected(): void {
    this._stopAutoplay();
    this._observer?.disconnect();
  }

  private _setupNavigation(): void {
    this.shadowRoot?.addEventListener('click', (e) => {
      const target = e.target as Element;
      if (target.closest('.carousel__nav--prev')) this.prev();
      else if (target.closest('.carousel__nav--next')) this.next();
      else if (target.closest('.carousel__dot')) {
        const idx = Number(target.closest('.carousel__dot')?.getAttribute('data-index'));
        if (!isNaN(idx)) this.goTo(idx);
      }
    });
  }

  private _setupIntersectionObserver(): void {
    const track = this.shadowRoot?.querySelector('.carousel__track');
    if (!track) return;

    this._observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const slides = this._getSlides();
            const idx = slides.indexOf(entry.target as HTMLElement);
            if (idx >= 0) {
              this._currentIndex = idx;
              this._updateDots();
              this.emit('ecom:slide-change', { index: idx });
            }
          }
        }
      },
      { root: track, threshold: 0.5 },
    );

    for (const slide of this._getSlides()) {
      this._observer.observe(slide);
    }
  }

  private _getSlides(): HTMLElement[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot.assignedElements() as HTMLElement[];
  }

  private _updateSlideWidth(): void {
    const track = this.shadowRoot?.querySelector('.carousel__track') as HTMLElement;
    if (!track) return;
    const pct = 100 / this.slidesPerView;
    track.style.setProperty('--carousel-slide-width', `calc(${pct}% - ${this.gap} * ${(this.slidesPerView - 1) / this.slidesPerView})`);
    track.style.setProperty('--carousel-gap', this.gap);
  }

  private _updateDots(): void {
    const dots = this.shadowRoot?.querySelectorAll('.carousel__dot');
    dots?.forEach((dot, i) => {
      dot.classList.toggle('carousel__dot--active', i === this._currentIndex);
    });
  }

  private _startAutoplay(): void {
    this._stopAutoplay();
    this._autoplayTimer = setInterval(() => this.next(), this.interval);
  }

  private _stopAutoplay(): void {
    if (this._autoplayTimer) clearInterval(this._autoplayTimer);
  }

  prev(): void {
    const slides = this._getSlides();
    if (!slides.length) return;
    let idx = this._currentIndex - 1;
    if (idx < 0) idx = this.loop ? slides.length - 1 : 0;
    this.goTo(idx);
  }

  next(): void {
    const slides = this._getSlides();
    if (!slides.length) return;
    let idx = this._currentIndex + 1;
    if (idx >= slides.length) idx = this.loop ? 0 : slides.length - 1;
    this.goTo(idx);
  }

  goTo(index: number): void {
    const slides = this._getSlides();
    if (!slides[index]) return;
    slides[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    this._currentIndex = index;
    this._updateDots();
  }

  protected render(): string {
    const showArrows = this.navigation === 'arrows' || this.navigation === 'both';
    const showDots = this.navigation === 'dots' || this.navigation === 'both';

    const prevArrow = `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
    const nextArrow = `<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

    return `
      <div class="carousel" role="region" aria-roledescription="carousel" aria-label="Carousel" part="carousel">
        ${showArrows ? `<button class="carousel__nav carousel__nav--prev" aria-label="Slide precedente" part="nav-prev">${prevArrow}</button>` : ''}
        ${showArrows ? `<button class="carousel__nav carousel__nav--next" aria-label="Slide suivante" part="nav-next">${nextArrow}</button>` : ''}

        <div class="carousel__track" part="track" role="group">
          <slot></slot>
        </div>

        ${showDots ? `<div class="carousel__dots" part="dots" role="tablist"></div>` : ''}
      </div>
    `;
  }

  // Dots are generated dynamically after slot content is assigned
  protected connected(): void {
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.addEventListener('slotchange', () => {
      this._generateDots();
      this._setupIntersectionObserver();
      this._updateSlideWidth();
    });
  }

  private _generateDots(): void {
    const dotsContainer = this.shadowRoot?.querySelector('.carousel__dots');
    if (!dotsContainer) return;
    const slides = this._getSlides();
    dotsContainer.innerHTML = slides
      .map(
        (_, i) =>
          `<button class="carousel__dot ${i === 0 ? 'carousel__dot--active' : ''}" data-index="${i}" role="tab" aria-label="Slide ${i + 1}" part="dot"></button>`,
      )
      .join('');
  }
}

customElements.define('ecom-carousel', Carousel);
