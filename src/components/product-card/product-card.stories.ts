import './product-card';

export default {
  title: 'Components/ProductCard',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    price: { control: 'number' },
    compareAtPrice: { control: 'number' },
    imageUrl: { control: 'text' },
    vendor: { control: 'text' },
    badge: { control: 'text' },
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
    currency: { control: 'text' },
    buttonText: { control: 'text' },
  },
};

const Template = (args: Record<string, unknown>) => {
  const el = document.createElement('ecom-product-card');
  el.setAttribute('title', String(args.title ?? 'T-shirt Premium'));
  el.setAttribute('price', String(args.price ?? 2999));
  el.setAttribute('image-url', String(args.imageUrl ?? 'https://picsum.photos/400/400'));
  if (args.compareAtPrice) el.setAttribute('compare-at-price', String(args.compareAtPrice));
  if (args.vendor) el.setAttribute('vendor', String(args.vendor));
  if (args.badge) el.setAttribute('badge', String(args.badge));
  if (args.layout) el.setAttribute('layout', String(args.layout));
  if (args.currency) el.setAttribute('currency', String(args.currency));
  if (args.buttonText) el.setAttribute('button-text', String(args.buttonText));
  return el;
};

export const Default = Template.bind({});

export const OnSale = Template.bind({});
(OnSale as any).args = {
  title: 'Sneakers Limited Edition',
  price: 7999,
  compareAtPrice: 12999,
  badge: 'Promo',
  vendor: 'NikeShop',
};

export const Horizontal = Template.bind({});
(Horizontal as any).args = {
  title: 'Sac en Cuir Artisanal',
  price: 14999,
  layout: 'horizontal',
  vendor: 'Maroquinerie Paris',
};
