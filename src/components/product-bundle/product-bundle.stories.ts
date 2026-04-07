import './product-bundle';

export default {
  title: 'Components/ProductBundle',
  tags: ['autodocs'],
};

const sampleItems = JSON.stringify([
  { title: 'T-shirt Blanc', price: 2999, variantId: 1, imageUrl: 'https://picsum.photos/200/200?1' },
  { title: 'Jean Slim', price: 5999, variantId: 2, imageUrl: 'https://picsum.photos/200/200?2' },
  { title: 'Baskets Sport', price: 8999, variantId: 3, imageUrl: 'https://picsum.photos/200/200?3' },
]);

export const Default = () => {
  const el = document.createElement('ecom-product-bundle');
  el.setAttribute('title', 'Look Complet');
  el.setAttribute('items', sampleItems);
  el.setAttribute('discount-value', '15');
  return el;
};

export const FixedDiscount = () => {
  const el = document.createElement('ecom-product-bundle');
  el.setAttribute('title', 'Pack Essentiel');
  el.setAttribute('items', sampleItems);
  el.setAttribute('discount-type', 'fixed');
  el.setAttribute('discount-value', '3000');
  return el;
};
