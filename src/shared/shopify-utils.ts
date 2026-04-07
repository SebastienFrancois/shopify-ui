import type { ShopifyProduct, ShopifyCart } from './types';

export async function fetchProduct(handle: string): Promise<ShopifyProduct> {
  const response = await fetch(`/products/${handle}.js`);
  if (!response.ok) throw new Error(`Product not found: ${handle}`);
  return response.json();
}

export async function addToCart(
  variantId: number,
  quantity = 1,
): Promise<ShopifyCart> {
  const response = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [{ id: variantId, quantity }] }),
  });
  if (!response.ok) throw new Error('Failed to add to cart');
  return response.json();
}

export async function addMultipleToCart(
  items: Array<{ id: number; quantity: number }>,
): Promise<ShopifyCart> {
  const response = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  if (!response.ok) throw new Error('Failed to add items to cart');
  return response.json();
}

export async function getCart(): Promise<ShopifyCart> {
  const response = await fetch('/cart.js');
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
}

export function formatMoney(cents: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}
