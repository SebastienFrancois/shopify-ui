# Shopify UI Components

Bibliotheque de composants Web modernes, legers et SEO-friendly pour boutiques Shopify.

**Zero dependances** | **Web Components natifs** | **< 15KB gzip** | **SEO optimise**

## Composants

| Composant | Tag | Description |
|---|---|---|
| Product Card | `<ecom-product-card>` | Fiche produit optimisee avec JSON-LD |
| Product Bundle | `<ecom-product-bundle>` | Bundle de produits avec reduction |
| Carousel | `<ecom-carousel>` | Carrousel CSS scroll-snap performant |
| Glass Card | `<ecom-glass-card>` | Conteneur glassmorphisme |
| AI Chat | `<ecom-ai-chat>` | Widget chat IA flottant |
| WhatsApp Chat | `<ecom-whatsapp-chat>` | Bouton WhatsApp flottant |

## Installation

### CDN

```html
<script type="module" src="https://unpkg.com/@shopify-ui/components/dist/shopify-ui.es.js"></script>
```

### npm

```bash
npm install @shopify-ui/components
```

```js
import '@shopify-ui/components';
```

### Shopify Theme

Voir [shopify/README.md](./shopify/README.md) pour l'integration complete.

## Utilisation

```html
<ecom-product-card
  title="Mon Produit"
  price="2999"
  image-url="/product.jpg"
  vendor="Ma Marque"
></ecom-product-card>

<ecom-carousel autoplay interval="4000">
  <div>Slide 1</div>
  <div>Slide 2</div>
</ecom-carousel>

<ecom-glass-card blur="16" opacity="0.15">
  <h2>Contenu glassmorphisme</h2>
</ecom-glass-card>

<ecom-whatsapp-chat phone="+33612345678" tooltip="Aide ?"></ecom-whatsapp-chat>
```

## Personnalisation

Tous les composants sont personnalisables via CSS Custom Properties :

```css
:root {
  --sui-primary: #2563eb;
  --sui-border-radius: 8px;
  --sui-font-family: 'Inter', sans-serif;
}
```

Chaque composant expose des `::part()` pour un styling granulaire :

```css
ecom-product-card::part(button) {
  background: #e11d48;
}
```

## Developpement

### Prerequisites

- Node.js >= 20
- Docker (optionnel)

### Setup

```bash
npm install
```

### Commandes

```bash
just dev           # Serveur de dev Vite
just storybook     # Storybook sur :6006
just test          # Tests unitaires
just test-watch    # Tests en mode watch
just lint          # ESLint
just format        # Prettier
just build         # Build production
just check         # Lint + Test + Build
just generate name # Scaffolder un nouveau composant
```

### Docker

```bash
just docker-up     # Demarrer les containers
just docker-shell  # Shell dans le container
```

### Generer un nouveau composant

```bash
just generate mon-composant
```

Cree automatiquement :
- `src/components/mon-composant/mon-composant.ts`
- `src/components/mon-composant/mon-composant.styles.ts`
- `src/components/mon-composant/mon-composant.stories.ts`
- `src/components/mon-composant/mon-composant.test.ts`

## Architecture

```
src/
  components/      # Chaque composant = Web Component autonome
  shared/          # Base class, utilitaires Shopify, helpers
  styles/          # Design tokens, reset, animations
shopify/
  snippets/        # Snippets Liquid prets a copier
  assets/          # Build output pour upload Shopify
demo/              # Pages de demo standalone
```

### Principes

- **Zero JS inutile** : CSS scroll-snap pour le carrousel, `<slot>` pour la composition
- **Shadow DOM** : Encapsulation totale, pas de conflits CSS avec le theme
- **SEO** : JSON-LD, `<noscript>` fallbacks, contenu dans le light DOM
- **Accessible** : ARIA roles, navigation clavier, `prefers-reduced-motion`
- **Themable** : CSS Custom Properties traversent le Shadow DOM

## License

MIT
