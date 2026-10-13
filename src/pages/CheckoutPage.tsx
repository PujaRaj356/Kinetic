import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../core/context/CartContext';
import { useAuth } from '../core/context/AuthContext';
import { saveOrder } from '../core/services/orderService';
import { getApiBase } from '../core/services/apiConfig';
import { useToast } from '../core/context/ToastContext';

export const CheckoutPage: React.FC = () => {
  const { items, shipping, total, clear } = useCart();
  const { currentUser, updateProfile } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const hasSavedDetails = !!(
    currentUser?.phone &&
    currentUser?.address &&
    currentUser?.city &&
    currentUser?.pincode
  );

  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [pincode, setPincode] = useState(currentUser?.pincode || '');
  const [payment, setPayment] = useState<'card' | 'upi'>('card');
  const [isEditingDetails, setIsEditingDetails] = useState(!hasSavedDetails);
  const [saveToProfile, setSaveToProfile] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (!fullName) setFullName(currentUser.name || '');
      if (!email) setEmail(currentUser.email || '');
      if (!phone && currentUser.phone) setPhone(currentUser.phone);
      if (!address && currentUser.address) setAddress(currentUser.address);
      if (!city && currentUser.city) setCity(currentUser.city);
      if (!pincode && currentUser.pincode) setPincode(currentUser.pincode);
      if (hasSavedDetails) {
        setIsEditingDetails(false);
      }
    }
  }, [currentUser, hasSavedDetails]);

  const isFormValid =
    fullName.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    /^[6-9]\d{9}$/.test(phone) &&
    address.trim().length >= 8 &&
    city.trim().length > 0 &&
    /^\d{6}$/.test(pincode);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid || items.length === 0) {
      if (items.length === 0) {
        showToast('Your cart is empty! Please add items before checkout.');
      } else {
        showToast('Please check your delivery details.');
        setIsEditingDetails(true);
      }
      return;
    }

    setSubmitting(true);

    // If user opts to save or is first time, persist to their profile so future orders never ask again
    if (saveToProfile || !hasSavedDetails) {
      updateProfile({
        name: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        pincode: pincode.trim(),
      });
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

    // Send order confirmation email via backend Express service
    try {
      const API_BASE = getApiBase();
      const resp = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      const data = await resp.json();
      console.log('Order created on backend:', data);
    } catch (err) {
      console.warn('Backend sync / email dispatch notice:', err);
    }

    clear();
    showToast(`Order #${newOrder.id} confirmed! Email sent to ${email.trim()} 📦`);
    navigate(`/order-success/${newOrder.id}`);
  };

  return (
    <section className="checkout-page">
      <p className="eyebrow">FINAL STEP · FAST CHECKOUT</p>
      <h1>Checkout.</h1>

      <div className="checkout-grid">
        <form onSubmit={handlePlaceOrder} className="checkout-main-form">
          {/* Saved Address Summary or Full Form */}
          {!isEditingDetails && hasSavedDetails ? (
            <div className="saved-checkout-card">
              <div className="saved-checkout-header">
                <div>
                  <span className="saved-badge">✓ DELIVERING TO SAVED ADDRESS</span>
                  <h2 style={{ margin: '8px 0 0' }}>{fullName}</h2>
                </div>
                <button
                  type="button"
                  className="change-address-btn"
                  onClick={() => setIsEditingDetails(true)}
                >
                  ✏️ Change Address
                </button>
              </div>

              <div className="saved-checkout-body">
                <p className="saved-address-text">
                  📍 {address}
                  <br />
                  {city} - {pincode}
                </p>
                <p className="saved-contact-text">
                  📞 {phone} · ✉️ {email}
                </p>
              </div>

              <div className="saved-checkout-footer">
                <span className="fast-checkout-hint">
                  ⚡ 1-Click delivery details applied from your profile.
                </span>
              </div>
            </div>
          ) : (
            <div className="address-inputs-section">
              <div className="address-inputs-header">
                <h2>Delivery details</h2>
                {hasSavedDetails && (
                  <button
                    type="button"
                    className="cancel-edit-btn"
                    onClick={() => setIsEditingDetails(false)}
                  >
                    ← Keep Saved Address
                  </button>
                )}
              </div>

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
                  Email for Receipt
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
                  Mobile Phone
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    required
                  />
                </label>
                <label>
                  City / Town
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City / Town"
                    required
                  />
                </label>
              </div>

              <label>
                Street Address
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat / House no, Street, Landmark"
                  rows={2}
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

              <label className="save-profile-checkbox">
                <input
                  type="checkbox"
                  checked={saveToProfile}
                  onChange={(e) => setSaveToProfile(e.target.checked)}
                />
                <span>Save this address to my profile for fast 1-click checkout on future orders</span>
              </label>
            </div>
          )}

          {/* Payment Method Section */}
          <div className="checkout-payment-section">
            <h2>Mode of Payment</h2>
            <div className="payment-options-grid">
              <label className={`payment-pill ${payment === 'card' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={payment === 'card'}
                  onChange={() => setPayment('card')}
                />
                <div className="pill-content">
                  <b>💳 Credit / Debit Card</b>
                  <span>Visa, Mastercard, Rupay</span>
                </div>
              </label>

              <label className={`payment-pill ${payment === 'upi' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={payment === 'upi'}
                  onChange={() => setPayment('upi')}
                />
                <div className="pill-content">
                  <b>⚡ Instant UPI</b>
                  <span>GPay, PhonePe, Paytm, QR</span>
                </div>
              </label>
            </div>
          </div>

          <button className="place" type="submit" disabled={submitting}>
            {submitting ? 'Placing order...' : `Place order (₹${total.toLocaleString('en-IN')}) →`}
          </button>
        </form>

        <aside className="checkout-summary-sidebar">
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

          <div className="delivery-guarantee-box">
            <span className="guarantee-icon">🛡️</span>
            <div>
              <b>Dispatched in 24 Hours</b>
              <p>Email receipt & tracking sent immediately after placing order.</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
