export interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  description: string;
  published_at: string;
  vendor: string;
  product_type: string;
  tags: string[];
  price: number;
  price_min: number;
  price_max: number;
  available: boolean;
  compare_at_price: number | null;
  images: ShopifyImage[];
  featured_image: string;
  variants: ShopifyVariant[];
  url: string;
}

export interface ShopifyVariant {
  id: number;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image: string | null;
  available: boolean;
  price: number;
  compare_at_price: number | null;
  inventory_quantity: number;
}

export interface ShopifyImage {
  id: number;
  src: string;
  alt: string | null;
  width: number;
  height: number;
}

export interface ShopifyCartItem {
  id: number;
  quantity: number;
  variant_id: number;
  title: string;
  price: number;
  line_price: number;
  image: string;
  url: string;
}

export interface ShopifyCart {
  token: string;
  note: string | null;
  items: ShopifyCartItem[];
  item_count: number;
  total_price: number;
  total_weight: number;
  currency: string;
}
