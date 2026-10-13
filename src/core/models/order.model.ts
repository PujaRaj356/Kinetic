import { Product } from './product.model';

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'razorpay' | 'card' | 'upi' | string;
  paymentId?: string;
  paymentOrderId?: string;
  paymentStatus?: 'Paid' | 'Pending' | 'Failed';
  status: OrderStatus;
  createdAt: string;
}
