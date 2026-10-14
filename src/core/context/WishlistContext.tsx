import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '../models/product.model';
import { PriceAlert } from '../models/priceAlert.model';
import {
  getLocalAlerts,
  saveLocalAlerts,
  fetchPriceAlerts,
  setPriceAlert,
  removePriceAlert,
  triggerTestAlert
} from '../services/alertService';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  items: Product[];
  alerts: PriceAlert[];
  toggle: (product: Product) => void;
  has: (productId: number) => boolean;
  getAlert: (productId: number) => PriceAlert | undefined;
  saveAlert: (productId: number, targetPrice: number, email: string) => Promise<PriceAlert>;
  removeAlert: (alertId: string) => Promise<boolean>;
  testAlert: (alertId: string) => Promise<{ ok: boolean; message: string; devMode?: boolean }>;
  isAlertActive: (productId: number) => boolean;
  loadAlerts: () => Promise<void>;
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
  const { currentUser } = useAuth();
  const [items, setItems] = useState<Product[]>(loadWishlist);
  const [alerts, setAlerts] = useState<PriceAlert[]>(getLocalAlerts);

  const loadAlerts = useCallback(async () => {
    try {
      const serverAlerts = await fetchPriceAlerts(currentUser?.email);
      setAlerts(serverAlerts);
    } catch {
      setAlerts(getLocalAlerts());
    }
  }, [currentUser?.email]);

  useEffect(() => {
    loadAlerts();

    const handleAlertsUpdated = (e: Event) => {
      const custom = e as CustomEvent<PriceAlert[]>;
      if (custom.detail) {
        setAlerts(custom.detail);
      }
    };

    window.addEventListener('kinetic-alerts-updated', handleAlertsUpdated);
    return () => window.removeEventListener('kinetic-alerts-updated', handleAlertsUpdated);
  }, [loadAlerts]);

  const toggle = (product: Product) => {
    const exists = items.some(p => p.id === product.id);
    const updated = exists
      ? items.filter(p => p.id !== product.id)
      : [...items, product];
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const has = (productId: number) => items.some(p => p.id === productId);

  const getAlert = (productId: number): PriceAlert | undefined => {
    return alerts.find(a => a.productId === productId && a.status === 'active');
  };

  const isAlertActive = (productId: number): boolean => {
    return alerts.some(a => a.productId === productId && a.status === 'active');
  };

  const saveAlert = async (productId: number, targetPrice: number, email: string): Promise<PriceAlert> => {
    const alert = await setPriceAlert({
      productId,
      targetPrice,
      email,
      userId: currentUser?.id
    });
    setAlerts(prev => {
      const filtered = prev.filter(a => a.id !== alert.id && !(a.productId === productId && a.email === email));
      return [alert, ...filtered];
    });
    return alert;
  };

  const removeAlert = async (alertId: string): Promise<boolean> => {
    await removePriceAlert(alertId);
    setAlerts(prev => prev.filter(a => a.id !== alertId));
    return true;
  };

  const testAlert = async (alertId: string) => {
    const res = await triggerTestAlert(alertId);
    if (res.ok) {
      setAlerts(prev =>
        prev.map(a => (a.id === alertId ? { ...a, status: 'triggered' as const, triggeredAt: new Date().toISOString() } : a))
      );
    }
    return res;
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        alerts,
        toggle,
        has,
        getAlert,
        saveAlert,
        removeAlert,
        testAlert,
        isAlertActive,
        loadAlerts
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
