/* ─── Product & Variant Types ─── */

export interface ProductColor {
  name: string;
  hex: string;
  images?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  details?: string[];
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  isNew: boolean;
  isSale: boolean;
  stock: number;
  featured: boolean;
}

/* ─── Cart ─── */

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

/* ─── Wishlist ─── */

export type WishlistItem = string; // product id

/* ─── Filter / Sort ─── */

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc";

export interface Filters {
  category: string | null;
  size: string | null;
  color: string | null;
  priceRange: [number, number] | null;
}
