export interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  stock: number;
  description: string;
  image: string;
  images?: string[];
  accent: string;
  featured?: boolean;
  highlights: string[];
  specs: Record<string, string>;
  reviews: Review[];
}
