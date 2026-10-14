export type PriceAlertStatus = 'active' | 'triggered' | 'cancelled';

export interface PriceAlert {
  id: string;
  productId: number;
  productName: string;
  productImage: string;
  productCategory: string;
  originalPrice: number;
  targetPrice: number;
  email: string;
  userId?: string;
  createdAt: string;
  status: PriceAlertStatus;
  triggeredAt?: string;
  lastNotifiedPrice?: number;
}

export interface SetPriceAlertPayload {
  productId: number;
  targetPrice: number;
  email: string;
  userId?: string;
}
