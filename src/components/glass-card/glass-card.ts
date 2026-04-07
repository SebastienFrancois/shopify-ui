import { BaseElement } from '../../shared/base-element';
import { styles } from './glass-card.styles';

export class GlassCard extends BaseElement {
  static properties = {
    blurAmount: { type: Number, default: 12, attribute: 'blur' },
    glassOpacity: { type: Number, default: 0.15, attribute: 'opacity' },
    borderOpacity: { type: Number, default: 0.2, attribute: 'border-opacity' },
    tint: { type: String, default: '255, 255, 255' },
    radius: { type: String, default: '' },
    glassPadding: { type: String, default: '', attribute: 'padding' },
  };

  declare blurAmount: number;
  declare glassOpacity: number;
  declare borderOpacity: number;
  declare tint: string;
  declare radius: string;
  declare glassPadding: string;

  protected styles(): string {
    return `
      ${styles}
      :host {
        --glass-blur: ${this.blurAmount}px;
        --glass-opacity: ${this.glassOpacity};
        --glass-border-opacity: ${this.borderOpacity};
        ${this.radius ? `--glass-radius: ${this.radius};` : ''}
        ${this.glassPadding ? `--glass-padding: ${this.glassPadding};` : ''}
      }
      .glass {
        background: rgba(${this.tint}, ${this.glassOpacity});
        border-color: rgba(${this.tint}, ${this.borderOpacity});
      }
    `;
  }

  protected render(): string {
    return `
      <div class="glass" part="glass">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('ecom-glass-card', GlassCard);
