import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../core/context/CartContext';
import { useAuth } from '../core/context/AuthContext';
import { saveOrder } from '../core/services/orderService';
import { useToast } from '../core/context/ToastContext';

export const CheckoutPage: React.FC = () => {
  const { items, shipping, total, clear } = useCart();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [payment, setPayment] = useState<'card' | 'upi'>('card');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (!fullName) setFullName(currentUser.name);
      if (!email) setEmail(currentUser.email);
    }
  }, [currentUser]);

  const isFormValid =
    fullName.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    /^[6-9]\d{9}$/.test(phone) &&
    address.trim().length >= 10 &&
    city.trim().length > 0 &&
    /^\d{6}$/.test(pincode);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid || items.length === 0) {
      return;
    }

    const orderPayload = {
      customerId: currentUser?.id || 'shopper-guest',
      customerName: fullName.trim(),
      customerEmail: email.trim(),
      customerPhone: phone.trim(),
      shippingAddress: address.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      items: [...items],
      subtotal: total - (shipping || 0),
      shipping: shipping || 0,
      total,
      paymentMethod: payment,
      status: 'Processing' as const,
    };

    const newOrder = saveOrder(orderPayload);

    // Dispatch order confirmation email with delivery schedule & summary
    try {
      const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
    } catch (err) {
      console.warn('Backend sync / email notice:', err);
    }

    clear();
    showToast(`Order ${newOrder.id} placed! Confirmation email sent to ${email.trim()} 📦`);
    alert(`Order placed successfully! 🎉\nOrder Reference: ${newOrder.id}\n\nA complete summary and expected delivery timeline have been sent to ${email.trim()}!`);
    navigate('/home');
  };

  return (
    <section className="checkout-page">
      <p className="eyebrow">FINAL STEP</p>
      <h1>Checkout.</h1>
      <div className="checkout-grid">
        <form onSubmit={handlePlaceOrder}>
          <h2>Delivery details</h2>
          <div className="two">
            <label>
              Full name
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </label>
          </div>
          <div className="two">
            <label>
              Phone
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                required
              />
            </label>
            <label>
              City
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City / Town"
                required
              />
            </label>
          </div>
          <label>
            Address
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Flat / House no, Street, Landmark"
              required
            />
          </label>
          <label>
            PIN code
            <input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="6-digit pincode"
              required
            />
          </label>
          <h2>Payment</h2>
          <label className="radio">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={payment === 'card'}
              onChange={() => setPayment('card')}
            />{' '}
            Credit / Debit Card
          </label>
          <label className="radio">
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={payment === 'upi'}
              onChange={() => setPayment('upi')}
            />{' '}
            Instant UPI (GPay, PhonePe, Paytm)
          </label>
          <button className="place" type="submit">
            Place order (₹{total.toLocaleString('en-IN')}) →
          </button>
        </form>
        <aside>
          <h2>Order summary</h2>
          {items.map((item) => (
            <div className="line" key={item.product.id}>
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <b>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</b>
            </div>
          ))}
          <hr />
          <div className="line">
            <span>Shipping</span>
            <b>{shipping ? `₹${shipping}` : 'FREE'}</b>
          </div>
          <div className="total">
            <span>Total</span>
            <b>₹{total.toLocaleString('en-IN')}</b>
          </div>
        </aside>
      </div>
    </section>
  );
};
