import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getOrderById, getOrders, resendOrderEmail } from '../core/services/orderService';
import { Order } from '../core/models/order.model';
import { useToast } from '../core/context/ToastContext';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      const found = getOrderById(orderId);
      if (found) {
        setOrder(found);
      } else {
        const all = getOrders();
        if (all.length > 0) {
          setOrder(all[0]);
        }
      }
    }
  }, [orderId]);

  const handleResendReceipt = async () => {
    if (!order) return;
    setResending(true);
    setResendStatus(null);
    try {
      const res = await resendOrderEmail(order);
      if (res.ok) {
        showToast(`Receipt resent to ${order.customerEmail} 📨`);
        setResendStatus(`✓ Fresh receipt dispatched to ${order.customerEmail}! Please check Inbox & Spam.`);
      } else {
        showToast(res.message || 'Could not resend email.');
        setResendStatus(`Notice: ${res.message}`);
      }
    } catch {
      showToast('Network error while requesting email resend.');
      setResendStatus('Could not reach mail server. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="order-success-page">
        <div className="order-not-found">
          <p className="eyebrow">ORDER CONFIRMATION</p>
          <h1>Order Not Found</h1>
          <p>We could not locate this order reference.</p>
          <Link to="/products" className="hero-btn">
            Browse Products →
          </Link>
        </div>
      </div>
    );
  }

  // Format order date & estimated delivery (+3 to +5 business days)
  const orderDateObj = new Date(order.createdAt || Date.now());
  const orderDateFormatted = orderDateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const orderTimeFormatted = orderDateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const deliveryStart = new Date(orderDateObj);
  deliveryStart.setDate(deliveryStart.getDate() + 3);
  const deliveryEnd = new Date(orderDateObj);
  deliveryEnd.setDate(deliveryEnd.getDate() + 5);

  const deliveryFormatted = `${deliveryStart.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })} – ${deliveryEnd.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })}`;

  return (
    <div className="order-success-page">
      {/* Celebration Hero */}
      <section className="order-hero-banner">
        <div className="order-hero-badge">✓ PAYMENT VERIFIED & ORDER CONFIRMED</div>
        <h1>Order Confirmed! 🎉</h1>
        <p className="order-hero-sub">
          Thank you, <b>{order.customerName}</b>! Your order <b>#{order.id}</b> has been received and is being packed.
        </p>
        <p className="order-email-alert">
          📨 An itemized receipt and delivery tracking updates have been sent to{' '}
          <span className="email-highlight">{order.customerEmail}</span>
        </p>
      </section>

      {/* Delivery Schedule Highlight Box */}
      <div className="delivery-timeline-card">
        <div className="timeline-header">
          <div>
            <span className="timeline-eyebrow">ESTIMATED DELIVERY WINDOW</span>
            <h2>{deliveryFormatted}</h2>
            <p className="timeline-sub">
              Order Date: <b>{orderDateFormatted}</b> at {orderTimeFormatted} · Standard Express Shipping (FREE)
            </p>
          </div>
          <div className="order-status-tag">{order.status || 'Processing'}</div>
        </div>

        {/* Stepper */}
        <div className="order-stepper">
          <div className="step-node active">
            <div className="step-circle">✓</div>
            <div className="step-label">Order Placed</div>
            <div className="step-sub">{orderDateFormatted}</div>
          </div>
          <div className="step-connector active" />
          <div className="step-node current">
            <div className="step-circle">📦</div>
            <div className="step-label">Processing</div>
            <div className="step-sub">Warehouse Dispatch</div>
          </div>
          <div className="step-connector" />
          <div className="step-node">
            <div className="step-circle">🚚</div>
            <div className="step-label">In Transit</div>
            <div className="step-sub">Carrier Pickup</div>
          </div>
          <div className="step-connector" />
          <div className="step-node">
            <div className="step-circle">🏠</div>
            <div className="step-label">Delivered</div>
            <div className="step-sub">By {deliveryEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details & Receipt */}
      <div className="order-summary-grid">
        {/* Left Column: Delivery & Email Details */}
        <div className="order-meta-col">
          {/* Recipient Destination Card */}
          <div className="order-card-box">
            <div className="box-title">📍 Delivery Destination</div>
            <div className="recipient-name">{order.customerName}</div>
            <div className="recipient-contact">
              📞 <b>{order.customerPhone}</b>
            </div>
            <div className="recipient-address">
              {order.shippingAddress}
              <br />
              {order.city} - {order.pincode}
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="order-card-box">
            <div className="box-title">💳 Mode of Payment</div>
            <div className="payment-mode-line">
              <span className="payment-chip">
                {order.paymentMethod === 'upi' ? '⚡ UPI Instant' : '💳 Credit / Debit Card'}
              </span>
              <span className="payment-status">Paid ₹{order.total.toLocaleString('en-IN')} ✓</span>
            </div>
          </div>

          {/* Email Receipt Status & Resend */}
          <div className="order-card-box email-resend-box">
            <div className="box-title">✉️ Email Confirmation Receipt</div>
            <p className="email-card-desc">
              We dispatched your receipt to <b>{order.customerEmail}</b>. If it hasn't appeared yet, please check your spam folder or trigger a resend.
            </p>
            {resendStatus && <div className="resend-status-msg">{resendStatus}</div>}
            <button
              className="resend-mail-btn"
              onClick={handleResendReceipt}
              disabled={resending}
            >
              {resending ? 'Sending...' : '📨 Resend Email Receipt'}
            </button>
          </div>
        </div>

        {/* Right Column: Complete Receipt & Itemization */}
        <div className="order-receipt-col">
          <div className="order-receipt-card">
            <div className="receipt-header">
              <div>
                <span className="brand-mark-mini">KT</span>
                <b>KINETIC OFFICIAL RECEIPT</b>
              </div>
              <span className="receipt-id">REF: #{order.id}</span>
            </div>

            <div className="receipt-items-list">
              {order.items.map((item, idx) => (
                <div className="receipt-item-row" key={idx}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="receipt-prod-img"
                  />
                  <div className="receipt-prod-info">
                    <div className="receipt-prod-name">{item.product.name}</div>
                    <div className="receipt-prod-cat">{item.product.category}</div>
                    <div className="receipt-prod-qty">
                      Qty: <b>{item.quantity}</b> × ₹{item.product.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="receipt-prod-total">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="receipt-divider" />

            <div className="receipt-pricing-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <b>₹{order.subtotal.toLocaleString('en-IN')}</b>
              </div>
              <div className="price-row">
                <span>Express Shipping</span>
                <b className="free-shipping-tag">{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</b>
              </div>
              <div className="price-row grand-total-row">
                <span>Total Amount Paid</span>
                <span className="grand-price">₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="receipt-actions">
              <button className="receipt-action-btn print-btn" onClick={handlePrint}>
                🖨️ Print Receipt
              </button>
              <Link to="/profile" className="receipt-action-btn profile-btn">
                👤 View In Profile
              </Link>
              <Link to="/products" className="receipt-action-btn shop-btn">
                🛍️ Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
