export interface PropertyDefinition {
  type: typeof String | typeof Number | typeof Boolean;
  default?: unknown;
  attribute?: string;
}

export type PropertyMap = Record<string, PropertyDefinition>;

export abstract class BaseElement extends HTMLElement {
  static properties: PropertyMap = {};

  private _initialized = false;
  private _updateScheduled = false;

  static get observedAttributes(): string[] {
    return Object.entries(this.properties).map(
      ([key, def]) => def.attribute ?? key.replace(/([A-Z])/g, '-$1').toLowerCase(),
    );
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._initProperties();
  }

  private _initProperties(): void {
    const ctor = this.constructor as typeof BaseElement;
    for (const [key, def] of Object.entries(ctor.properties)) {
      const internal = `_${key}`;
      (this as any)[internal] = def.default ?? this._getDefaultForType(def.type);

      Object.defineProperty(this, key, {
        get: () => (this as any)[internal],
        set: (value: unknown) => {
          const old = (this as any)[internal];
          (this as any)[internal] = this._coerce(value, def.type);
          if (old !== (this as any)[internal]) {
            this.scheduleUpdate();
          }
        },
        enumerable: true,
        configurable: true,
      });
    }
  }

  private _getDefaultForType(type: PropertyDefinition['type']): unknown {
    switch (type) {
      case String:
        return '';
      case Number:
        return 0;
      case Boolean:
        return false;
      default:
        return undefined;
    }
  }

  private _coerce(value: unknown, type: PropertyDefinition['type']): unknown {
    if (value === null || value === undefined) return this._getDefaultForType(type);
    switch (type) {
      case String:
        return String(value);
      case Number:
        return Number(value);
      case Boolean:
        return value !== false && value !== 'false' && value !== null;
      default:
        return value;
    }
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
    const ctor = this.constructor as typeof BaseElement;
    for (const [key, def] of Object.entries(ctor.properties)) {
      const attrName = def.attribute ?? key.replace(/([A-Z])/g, '-$1').toLowerCase();
      if (attrName === name) {
        if (def.type === Boolean) {
          (this as any)[key] = newValue !== null;
        } else {
          (this as any)[key] = newValue;
        }
        break;
      }
    }
  }

  connectedCallback(): void {
    if (!this._initialized) {
      this._initialized = true;
      this.update();
      this.firstUpdated();
    }
    this.connected();
  }

  disconnectedCallback(): void {
    this.disconnected();
  }

  protected scheduleUpdate(): void {
    if (this._updateScheduled || !this._initialized) return;
    this._updateScheduled = true;
    queueMicrotask(() => {
      this._updateScheduled = false;
      this.update();
    });
  }

  protected update(): void {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = '';

    const styles = this.styles();
    if (styles) {
      const style = document.createElement('style');
      style.textContent = styles;
      this.shadowRoot.appendChild(style);
    }

    const template = document.createElement('template');
    template.innerHTML = this.render();
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  protected emit<T>(name: string, detail?: T): void {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected abstract render(): string;
  protected styles(): string {
    return '';
  }
  protected connected(): void {}
  protected disconnected(): void {}
  protected firstUpdated(): void {}
}
