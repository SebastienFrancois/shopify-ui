import { BaseElement } from '../../shared/base-element';
import { styles } from './whatsapp-chat.styles';

export class WhatsappChat extends BaseElement {
  static properties = {
    phone: { type: String, default: '' },
    message: { type: String, default: '' },
    position: { type: String, default: 'bottom-right' },
    size: { type: String, default: 'md' },
    tooltip: { type: String, default: '' },
    pulse: { type: Boolean, default: false },
    delay: { type: Number, default: 0 },
  };

  declare phone: string;
  declare message: string;
  declare position: string;
  declare size: string;
  declare tooltip: string;
  declare pulse: boolean;
  declare delay: number;

  private _visible = true;
  private _showTooltip = false;

  protected styles(): string {
    return styles;
  }

  protected firstUpdated(): void {
    if (!this.getAttribute('position')) {
      this.setAttribute('position', this.position);
    }
    if (this.getAttribute('size')) {
      this.setAttribute('size', this.size);
    }

    if (this.delay > 0) {
      this._visible = false;
      this.style.display = 'none';
      setTimeout(() => {
        this._visible = true;
        this.style.display = '';
      }, this.delay);
    }

    if (this.tooltip) {
      const btn = this.shadowRoot?.querySelector('.whatsapp__btn');
      btn?.addEventListener('mouseenter', () => {
        this._showTooltip = true;
        this._updateTooltip();
      });
      btn?.addEventListener('mouseleave', () => {
        this._showTooltip = false;
        this._updateTooltip();
      });
    }
  }

  private _updateTooltip(): void {
    const tooltipEl = this.shadowRoot?.querySelector('.whatsapp__tooltip') as HTMLElement;
    if (tooltipEl) {
      tooltipEl.style.display = this._showTooltip ? 'block' : 'none';
    }
  }

  private _getWhatsAppUrl(): string {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const base = isMobile ? 'whatsapp://send' : 'https://wa.me';
    const phone = this.phone.replace(/[^0-9+]/g, '');

    if (isMobile) {
      return `${base}?phone=${phone}${this.message ? `&text=${encodeURIComponent(this.message)}` : ''}`;
    }
    return `${base}/${phone}${this.message ? `?text=${encodeURIComponent(this.message)}` : ''}`;
  }

  protected render(): string {
    const whatsappSvg = `<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

    return `
      <div class="whatsapp" part="whatsapp">
        ${this.tooltip ? `<div class="whatsapp__tooltip" style="display: none;" part="tooltip">${this.tooltip}</div>` : ''}
        <a class="whatsapp__btn" href="${this._getWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" aria-label="Contacter via WhatsApp" part="button">
          ${whatsappSvg}
        </a>
      </div>
    `;
  }
}

customElements.define('ecom-whatsapp-chat', WhatsappChat);
