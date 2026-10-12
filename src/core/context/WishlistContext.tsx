import React, { createContext, useContext, useState } from 'react';
import { Product } from '../models/product.model';

interface WishlistContextType {
  items: Product[];
  toggle: (product: Product) => void;
  has: (productId: number) => boolean;
}

const STORAGE_KEY = 'kinetic-wishlist';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function loadWishlist(): Product[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Product[];
  } catch {
    return [];
  }
}

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>(loadWishlist);

  const toggle = (product: Product) => {
    const exists = items.some(p => p.id === product.id);
    const updated = exists
      ? items.filter(p => p.id !== product.id)
      : [...items, product];
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const has = (productId: number) => items.some(p => p.id === productId);

  return (
    <WishlistContext.Provider value={{ items, toggle, has }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
