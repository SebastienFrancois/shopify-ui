# Integration Shopify

## Installation rapide

### Option 1 : CDN (recommande)

Ajoutez dans votre `theme.liquid`, avant `</head>` :

```html
<script type="module" src="https://unpkg.com/@shopify-ui/components/dist/shopify-ui.es.js"></script>
```

### Option 2 : Assets du theme

1. Copiez `shopify/assets/shopify-ui.es.js` dans les Assets de votre theme Shopify
2. Ajoutez dans `theme.liquid` :

```liquid
<script type="module" src="{{ 'shopify-ui.es.js' | asset_url }}"></script>
```

## Utilisation des snippets

Copiez les fichiers `shopify/snippets/*.liquid` dans le dossier `snippets/` de votre theme.

### Product Card

```liquid
{% render 'ecom-product-card', product: product %}
```

### Product Bundle

```liquid
{% render 'ecom-product-bundle',
  products: collection.products,
  title: 'Pack Complet',
  discount_value: 15
%}
```

### Carousel

```liquid
{% render 'ecom-carousel',
  images: product.images,
  autoplay: true,
  interval: 4000
%}
```

### Glass Card

```liquid
{% render 'ecom-glass-card',
  blur: 16,
  content: '<h2>Promo</h2><p>-20% ce weekend</p>'
%}
```

### AI Chat

```liquid
{% render 'ecom-ai-chat',
  endpoint: '/apps/my-chat-app/api',
  title: 'Assistant'
%}
```

### WhatsApp Chat

```liquid
{% render 'ecom-whatsapp-chat',
  phone: '+33612345678',
  message: 'Bonjour !',
  tooltip: 'Besoin d aide ?'
%}
```

## Personnalisation

Tous les composants utilisent des CSS Custom Properties. Ajoutez ceci dans votre theme pour personnaliser :

```css
:root {
  --sui-primary: #your-brand-color;
  --sui-primary-hover: #your-brand-hover;
  --sui-border-radius: 8px;
  --sui-font-family: 'Your Font', sans-serif;
}
```
