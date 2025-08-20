export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  featured: boolean;
  trending: boolean;
  brand: string;
  specifications?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface FilterState {
  category: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  brands: string[];
  searchQuery: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  addedAt: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type Theme = 'light' | 'dark';

export type ViewMode = 'grid' | 'list';
