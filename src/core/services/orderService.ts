import { Order, OrderStatus } from '../models/order.model';
import { productList } from './productService';
import { getApiBase } from './apiConfig';

const ORDERS_KEY = 'kinetic-customer-orders';

const initialOrders: Order[] = [
  {
    id: 'ORD-90214',
    customerId: 'usr-demo-1',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@example.com',
    customerPhone: '9876543210',
    shippingAddress: '42 Indiranagar 12th Main, 4th Cross',
    city: 'Bengaluru',
    pincode: '560038',
    items: [
      { product: productList[0], quantity: 1 },
      { product: productList[6], quantity: 2 }
    ],
    subtotal: 6797,
    shipping: 0,
    total: 6797,
    paymentMethod: 'card',
    status: 'Delivered',
    createdAt: '2026-10-04T14:32:00Z'
  },
  {
    id: 'ORD-84192',
    customerId: 'usr-demo-2',
    customerName: 'Priya Iyer',
    customerEmail: 'priya.iyer@example.com',
    customerPhone: '9123456789',
    shippingAddress: 'Flat 402, Skyline Residency, Bandra West',
    city: 'Mumbai',
    pincode: '400050',
    items: [
      { product: productList[1], quantity: 1 },
      { product: productList[2], quantity: 1 }
    ],
    subtotal: 5798,
    shipping: 0,
    total: 5798,
    paymentMethod: 'upi',
    status: 'Shipped',
    createdAt: '2026-10-05T09:15:00Z'
  },
  {
    id: 'ORD-76120',
    customerId: 'usr-demo-3',
    customerName: 'Rohan Verma',
    customerEmail: 'rohan.verma@example.com',
    customerPhone: '9988776655',
    shippingAddress: 'House 88, Sector 15',
    city: 'Gurugram',
    pincode: '122001',
    items: [
      { product: productList[5], quantity: 1 }
    ],
    subtotal: 4199,
    shipping: 0,
    total: 4199,
    paymentMethod: 'upi',
    status: 'Processing',
    createdAt: '2026-10-06T11:45:00Z'
  }
];

export function getOrders(): Order[] {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    if (!stored) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(initialOrders));
      return initialOrders;
    }
    const parsed = JSON.parse(stored) as Order[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(initialOrders));
      return initialOrders;
    }
    // Sanitize any existing orders to prevent undefined runtime errors
    return parsed.map((o, idx) => ({
      id: o.id || `ORD-${80000 + idx}`,
      customerId: o.customerId || 'guest',
      customerName: o.customerName || 'Shopper',
      customerEmail: o.customerEmail || 'customer@example.com',
      customerPhone: o.customerPhone || '9876543210',
      shippingAddress: o.shippingAddress || 'Address on file',
      city: o.city || 'City',
      pincode: o.pincode || '000000',
      items: Array.isArray(o.items)
        ? o.items.map(item => ({
            quantity: item?.quantity || 1,
            product: item?.product || productList[0]
          }))
        : [{ product: productList[0], quantity: 1 }],
      subtotal: Number(o.subtotal) || 0,
      shipping: Number(o.shipping) || 0,
      total: Number(o.total) || 0,
      paymentMethod: o.paymentMethod || 'card',
      status: o.status || 'Processing',
      createdAt: o.createdAt || new Date().toISOString()
    }));
  } catch {
    return initialOrders;
  }
}

export function saveOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'> & Partial<Pick<Order, 'id' | 'createdAt' | 'status'>>): Order {
  const all = getOrders();
  const newOrder: Order = {
    ...order,
    id: order.id || `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    status: order.status || 'Processing',
    createdAt: order.createdAt || new Date().toISOString()
  };
  const updated = [newOrder, ...all];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): boolean {
  const all = getOrders();
  const idx = all.findIndex(o => o.id === orderId);
  if (idx === -1) return false;
  all[idx].status = status;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(all));
  return true;
}

export function getOrderById(orderId: string): Order | undefined {
  const all = getOrders();
  return all.find(o => o.id.toLowerCase() === orderId.toLowerCase());
}

export function getOrdersForUser(userId?: string, userEmail?: string): Order[] {
  const all = getOrders();
  if (!userId && !userEmail) return [];
  const cleanEmail = userEmail?.toLowerCase().trim();
  return all.filter(o => {
    if (userId && o.customerId === userId) return true;
    if (cleanEmail && o.customerEmail?.toLowerCase().trim() === cleanEmail) return true;
    return false;
  });
}

export async function fetchUserOrdersFromDatabase(userId?: string, userEmail?: string): Promise<Order[]> {
  try {
    const key = userId || userEmail;
    if (!key) return getOrdersForUser(userId, userEmail);
    const base = getApiBase();
    const res = await fetch(`${base}/api/orders/user/${encodeURIComponent(key)}`);
    if (res.ok) {
      const serverOrders = await res.json();
      if (Array.isArray(serverOrders) && serverOrders.length > 0) {
        const local = getOrders();
        // Merge server orders into local orders without duplicates
        const merged = [...serverOrders];
        local.forEach(l => {
          if (!merged.some(m => m.id === l.id)) {
            merged.push(l);
          }
        });
        localStorage.setItem(ORDERS_KEY, JSON.stringify(merged));
        return getOrdersForUser(userId, userEmail);
      }
    }
  } catch (err) {
    console.warn('Backend order history sync notice:', err);
  }
  return getOrdersForUser(userId, userEmail);
}

export async function resendOrderEmail(order: Order): Promise<{ ok: boolean; message?: string }> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/orders/send-confirmation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order })
    });
    const data = await res.json();
    return {
      ok: !!data.ok,
      message: data.ok ? 'Order receipt resent to your email!' : (data.error || 'Failed to resend confirmation email.')
    };
  } catch (err: any) {
    return { ok: false, message: err.message || 'Could not connect to mail service.' };
  }
}

