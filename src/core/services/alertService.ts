import { PriceAlert, SetPriceAlertPayload } from '../models/priceAlert.model';
import { getApiBase } from './apiConfig';
import { getAllProducts } from './productService';

const ALERTS_STORAGE_KEY = 'kinetic-price-alerts';

export function getLocalAlerts(): PriceAlert[] {
  try {
    const raw = localStorage.getItem(ALERTS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PriceAlert[]) : [];
  } catch {
    return [];
  }
}

export function saveLocalAlerts(alerts: PriceAlert[]): void {
  try {
    localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts));
    window.dispatchEvent(new CustomEvent('kinetic-alerts-updated', { detail: alerts }));
  } catch (err) {
    console.warn('Could not save local alerts:', err);
  }
}

export async function fetchPriceAlerts(email?: string): Promise<PriceAlert[]> {
  const apiBase = getApiBase();
  try {
    const query = email ? `?email=${encodeURIComponent(email.trim().toLowerCase())}` : '';
    const res = await fetch(`${apiBase}/api/alerts${query}`);
    if (res.ok) {
      const data = await res.json();
      if (data.ok && Array.isArray(data.alerts)) {
        saveLocalAlerts(data.alerts);
        return data.alerts;
      }
    }
  } catch (err) {
    console.warn('Backend alerts fetch notice:', err);
  }
  // Fallback to localStorage
  const local = getLocalAlerts();
  if (email) {
    return local.filter(a => a.email.toLowerCase() === email.trim().toLowerCase());
  }
  return local;
}

export async function setPriceAlert(payload: SetPriceAlertPayload): Promise<PriceAlert> {
  const apiBase = getApiBase();
  const cleanEmail = payload.email.trim().toLowerCase();
  const target = Math.round(Number(payload.targetPrice));
  const products = getAllProducts();
  const product = products.find(p => p.id === payload.productId);

  let newAlert: PriceAlert = {
    id: `alt_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`,
    productId: payload.productId,
    productName: product?.name || 'Product',
    productImage: product?.image || '',
    productCategory: product?.category || 'General',
    originalPrice: product?.price || target,
    targetPrice: target,
    email: cleanEmail,
    userId: payload.userId,
    status: 'active',
    createdAt: new Date().toISOString()
  };

  try {
    const res = await fetch(`${apiBase}/api/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: payload.productId,
        targetPrice: target,
        email: cleanEmail,
        userId: payload.userId
      })
    });
    const data = await res.json();
    if (res.ok && data.ok && data.alert) {
      newAlert = data.alert;
    }
  } catch (err) {
    console.warn('Backend price alert creation notice:', err);
  }

  // Update local storage
  const current = getLocalAlerts();
  const filtered = current.filter(
    a => !(a.productId === payload.productId && a.email.toLowerCase() === cleanEmail)
  );
  const updated = [newAlert, ...filtered];
  saveLocalAlerts(updated);

  return newAlert;
}

export async function removePriceAlert(alertId: string): Promise<boolean> {
  const apiBase = getApiBase();
  try {
    await fetch(`${apiBase}/api/alerts/${encodeURIComponent(alertId)}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('Backend price alert delete notice:', err);
  }

  const current = getLocalAlerts();
  const updated = current.filter(a => a.id !== alertId);
  saveLocalAlerts(updated);
  return true;
}

export async function triggerTestAlert(
  alertId: string
): Promise<{ ok: boolean; message: string; devMode?: boolean; alert?: PriceAlert }> {
  const apiBase = getApiBase();
  try {
    const res = await fetch(`${apiBase}/api/alerts/test-trigger/${encodeURIComponent(alertId)}`, {
      method: 'POST'
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      // Mark local alert as triggered
      const current = getLocalAlerts();
      const updated = current.map(a =>
        a.id === alertId
          ? { ...a, status: 'triggered' as const, triggeredAt: new Date().toISOString() }
          : a
      );
      saveLocalAlerts(updated);
      return data;
    }
    return { ok: false, message: data.message || 'Simulation failed' };
  } catch (err: any) {
    return { ok: false, message: err.message || 'Could not connect to backend server' };
  }
}
