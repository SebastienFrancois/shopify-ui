import { BaseElement } from '../../shared/base-element';
import { formatMoney, addMultipleToCart } from '../../shared/shopify-utils';
import { styles } from './product-bundle.styles';

interface BundleItem {
  title: string;
  price: number;
  imageUrl?: string;
  variantId: number;
  quantity?: number;
}

export class ProductBundle extends BaseElement {
  static properties = {
    title: { type: String, default: 'Bundle' },
    items: { type: String, default: '[]' },
    discountType: { type: String, default: 'percentage', attribute: 'discount-type' },
    discountValue: { type: Number, default: 10, attribute: 'discount-value' },
    currency: { type: String, default: 'EUR' },
    buttonText: { type: String, default: 'Ajouter le bundle', attribute: 'button-text' },
  };

  declare title: string;
  declare items: string;
  declare discountType: string;
  declare discountValue: number;
  declare currency: string;
  declare buttonText: string;

  private _parsedItems(): BundleItem[] {
    try {
      return JSON.parse(this.items);
    } catch {
      return [];
    }
  }

  protected styles(): string {
    return styles;
  }

  protected firstUpdated(): void {
    this.shadowRoot?.addEventListener('click', (e) => {
      const btn = (e.target as Element).closest('.bundle__btn');
      if (btn) this._handleAddBundle();
    });
  }

  private async _handleAddBundle(): Promise<void> {
    const items = this._parsedItems();
    if (!items.length) return;

    const btn = this.shadowRoot?.querySelector('.bundle__btn') as HTMLButtonElement;
    if (btn) btn.disabled = true;

    try {
      const cartItems = items.map((item) => ({
        id: item.variantId,
        quantity: item.quantity ?? 1,
      }));
      await addMultipleToCart(cartItems);
      this.emit('ecom:bundle-add', { items: cartItems });
    } catch {
      this.emit('ecom:cart-error', { bundle: this.title });
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  protected render(): string {
    const items = this._parsedItems();
    const totalPrice = items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
    const discount =
      this.discountType === 'percentage'
        ? totalPrice * (this.discountValue / 100)
        : this.discountValue;
    const finalPrice = Math.max(0, totalPrice - discount);

    return `
      <section class="bundle" part="bundle">
        <header class="bundle__header" part="header">
          <h2 class="bundle__title" part="title">${this.title}</h2>
          <p class="bundle__subtitle">
            ${this.discountType === 'percentage' ? `-${this.discountValue}%` : `-${formatMoney(this.discountValue, this.currency)}`}
            sur le lot
          </p>
        </header>

        <div class="bundle__items" part="items">
          ${items
            .map(
              (item) => `
            <div class="bundle__item" part="item">
              ${item.imageUrl ? `<img class="bundle__item-image" src="${item.imageUrl}" alt="${item.title}" loading="lazy">` : ''}
              <p class="bundle__item-title">${item.title}</p>
              <p class="bundle__item-price">${formatMoney(item.price, this.currency)}</p>
            </div>
          `,
            )
            .join('')}
        </div>

        <footer class="bundle__footer" part="footer">
          <div class="bundle__pricing">
            <span class="bundle__original-price">${formatMoney(totalPrice, this.currency)}</span>
            <span class="bundle__final-price">${formatMoney(finalPrice, this.currency)}</span>
            <span class="bundle__savings">Vous economisez ${formatMoney(discount, this.currency)}</span>
          </div>
          <button class="bundle__btn" part="button">${this.buttonText}</button>
        </footer>
        <slot></slot>
      </section>
    `;
  }
}

customElements.define('ecom-product-bundle', ProductBundle);
