import { BaseElement } from '../../shared/base-element';
import { formatMoney, addToCart } from '../../shared/shopify-utils';
import { styles } from './product-card.styles';

export class ProductCard extends BaseElement {
  static properties = {
    handle: { type: String, default: '' },
    title: { type: String, default: '' },
    price: { type: Number, default: 0 },
    compareAtPrice: { type: Number, default: 0, attribute: 'compare-at-price' },
    imageUrl: { type: String, default: '', attribute: 'image-url' },
    imageAlt: { type: String, default: '', attribute: 'image-alt' },
    vendor: { type: String, default: '' },
    badge: { type: String, default: '' },
    variantId: { type: Number, default: 0, attribute: 'variant-id' },
    layout: { type: String, default: 'vertical' },
    currency: { type: String, default: 'EUR' },
    buttonText: { type: String, default: 'Ajouter au panier', attribute: 'button-text' },
  };

  declare handle: string;
  declare title: string;
  declare price: number;
  declare compareAtPrice: number;
  declare imageUrl: string;
  declare imageAlt: string;
  declare vendor: string;
  declare badge: string;
  declare variantId: number;
  declare layout: string;
  declare currency: string;
  declare buttonText: string;

  protected styles(): string {
    return styles;
  }

  protected firstUpdated(): void {
    this.shadowRoot?.addEventListener('click', (e) => {
      const btn = (e.target as Element).closest('.card__btn');
      if (btn) this._handleAddToCart();
    });
  }

  private async _handleAddToCart(): Promise<void> {
    if (!this.variantId) {
      this.emit('ecom:add-to-cart', { handle: this.handle, title: this.title });
      return;
    }
    const btn = this.shadowRoot?.querySelector('.card__btn') as HTMLButtonElement;
    if (btn) btn.disabled = true;

    try {
      await addToCart(this.variantId);
      this.emit('ecom:add-to-cart', { variantId: this.variantId, handle: this.handle });
    } catch {
      this.emit('ecom:cart-error', { variantId: this.variantId });
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  protected render(): string {
    const isOnSale = this.compareAtPrice > 0 && this.compareAtPrice > this.price;
    const priceFormatted = formatMoney(this.price, this.currency);
    const compareFormatted = isOnSale ? formatMoney(this.compareAtPrice, this.currency) : '';

    return `
      <article class="card" part="card">
        <div class="card__image-wrapper" part="image-wrapper">
          ${this.imageUrl ? `<img class="card__image" src="${this.imageUrl}" alt="${this.imageAlt || this.title}" loading="lazy" part="image">` : ''}
          ${this.badge ? `<span class="card__badge" part="badge">${this.badge}</span>` : ''}
        </div>
        <div class="card__body" part="body">
          ${this.vendor ? `<p class="card__vendor" part="vendor">${this.vendor}</p>` : ''}
          <h3 class="card__title" part="title">${this.title}</h3>
          <div class="card__pricing" part="pricing">
            <span class="card__price ${isOnSale ? 'card__price--sale' : ''}" part="price">
              ${priceFormatted}
            </span>
            ${isOnSale ? `<span class="card__compare-price" part="compare-price">${compareFormatted}</span>` : ''}
          </div>
          <button class="card__btn" part="button">${this.buttonText}</button>
        </div>
        <slot></slot>
      </article>
      ${this._renderJsonLd()}
    `;
  }

  private _renderJsonLd(): string {
    if (!this.title) return '';
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: this.title,
      image: this.imageUrl,
      offers: {
        '@type': 'Offer',
        price: (this.price / 100).toFixed(2),
        priceCurrency: this.currency,
        availability: 'https://schema.org/InStock',
      },
    };
    return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
  }
}

customElements.define('ecom-product-card', ProductCard);
