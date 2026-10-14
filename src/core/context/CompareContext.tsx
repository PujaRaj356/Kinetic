import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../models/product.model';
import { getAllProducts } from '../services/productService';

interface CompareContextType {
  compareItems: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: number) => void;
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: number) => boolean;
  clearCompare: () => void;
  getSimilarProducts: (targetProduct: Product, limit?: number) => Product[];
}

const STORAGE_KEY = 'kinetic-compare-items';
const MAX_COMPARE_ITEMS = 4;

const CompareContext = createContext<CompareContextType | undefined>(undefined);

function loadCompareItems(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<Product[]>(loadCompareItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (product: Product): boolean => {
    if (compareItems.some((p) => p.id === product.id)) return true;
    if (compareItems.length >= MAX_COMPARE_ITEMS) {
      return false; // Limit reached
    }
    const updated = [...compareItems, product];
    setCompareItems(updated);
    return true;
  };

  const removeFromCompare = (productId: number) => {
    setCompareItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleCompare = (product: Product) => {
    if (compareItems.some((p) => p.id === product.id)) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const isInCompare = (productId: number): boolean => {
    return compareItems.some((p) => p.id === productId);
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const getSimilarProducts = (targetProduct: Product, limit = 3): Product[] => {
    const all = getAllProducts();
    // Exclude current product and products already in compare list
    const excludedIds = new Set([targetProduct.id, ...compareItems.map((p) => p.id)]);

    // Priority 1: Same category
    const sameCategory = all.filter(
      (p) => p.category === targetProduct.category && !excludedIds.has(p.id)
    );

    if (sameCategory.length >= limit) {
      return sameCategory.slice(0, limit);
    }

    // Priority 2: Similar price range (+/- 40%)
    const minPrice = targetProduct.price * 0.6;
    const maxPrice = targetProduct.price * 1.4;
    const similarPrice = all.filter(
      (p) =>
        !excludedIds.has(p.id) &&
        !sameCategory.some((sc) => sc.id === p.id) &&
        p.price >= minPrice &&
        p.price <= maxPrice
    );

    return [...sameCategory, ...similarPrice].slice(0, limit);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
        clearCompare,
        getSimilarProducts,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
};
