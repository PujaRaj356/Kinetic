import React, { createContext, useContext, useState } from 'react';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

interface CartContextType {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (product: Product) => void;
  decrease: (productId: number) => void;
  increase: (productId: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
}

const STORAGE_KEY = 'kinetic-cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

function loadCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as CartItem[];
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  const save = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  };

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 149;
  const total = subtotal + shipping;

  const add = (product: Product) => {
    const existing = items.find(i => i.product.id === product.id);
    let updated: CartItem[];
    if (existing) {
      updated = items.map(i =>
        i.product.id === product.id
          ? { ...i, quantity: Math.min(i.quantity + 1, product.stock) }
          : i
      );
    } else {
      updated = [...items, { product, quantity: 1 }];
    }
    save(updated);
  };

  const decrease = (productId: number) => {
    const updated = items
      .map(i => (i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i))
      .filter(i => i.quantity > 0);
    save(updated);
  };

  const increase = (productId: number) => {
    const item = items.find(i => i.product.id === productId);
    if (item && item.quantity < item.product.stock) {
      const updated = items.map(i =>
        i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i
      );
      save(updated);
    }
  };

  const remove = (productId: number) => {
    const updated = items.filter(i => i.product.id !== productId);
    save(updated);
  };

  const clear = () => {
    save([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        shipping,
        total,
        add,
        decrease,
        increase,
        remove,
        clear
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
