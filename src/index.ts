// Components
export { ProductCard } from './components/product-card/product-card';
export { ProductBundle } from './components/product-bundle/product-bundle';
export { Carousel } from './components/carousel/carousel';
export { GlassCard } from './components/glass-card/glass-card';
export { AiChat } from './components/ai-chat/ai-chat';
export { WhatsappChat } from './components/whatsapp-chat/whatsapp-chat';

// Shared utilities
export { BaseElement } from './shared/base-element';
export { formatMoney, addToCart, getCart, fetchProduct } from './shared/shopify-utils';
export type { ShopifyProduct, ShopifyVariant, ShopifyCart, ShopifyCartItem } from './shared/types';
