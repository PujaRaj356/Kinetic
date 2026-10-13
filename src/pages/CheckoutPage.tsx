import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../core/context/CartContext';
import { useAuth } from '../core/context/AuthContext';
import { saveOrder } from '../core/services/orderService';
import { deductProductStock } from '../core/services/productService';
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
  const [payment, setPayment] = useState<'razorpay' | 'upi' | 'card'>('razorpay');
  const [isEditingDetails, setIsEditingDetails] = useState(!hasSavedDetails);
  const [saveToProfile, setSaveToProfile] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Gateway configuration & Simulator state
  const [razorpayConfig, setRazorpayConfig] = useState<{
    keyId: string;
    isLiveConfigured: boolean;
  }>({
    keyId: 'rzp_test_kineticDemo',
    isLiveConfigured: false,
  });

  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [activeSandboxTab, setActiveSandboxTab] = useState<'upi' | 'card'>('upi');
  const [sandboxOrderInfo, setSandboxOrderInfo] = useState<{
    orderId: string;
    amount: number;
    payload: any;
  } | null>(null);

  const API_BASE = getApiBase();

  // Load Razorpay config on page load
  useEffect(() => {
    fetch(`${API_BASE}/api/payment/config`)
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          setRazorpayConfig({
            keyId: data.keyId,
            isLiveConfigured: data.isLiveConfigured,
          });
        }
      })
      .catch((err) => console.log('Notice loading payment config:', err));
  }, [API_BASE]);

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

  // Finalize order after successful payment verification
  const handlePaymentSuccess = async (verifyResult: any, orderPayload: any) => {
    const verifiedOrder = verifyResult.order || {
      ...orderPayload,
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      paymentId: verifyResult.paymentId || `pay_${Date.now()}`,
      status: 'Processing',
      createdAt: new Date().toISOString(),
    };

    // Save locally
    saveOrder(verifiedOrder);

    // Deduct stock in local inventory state
    deductProductStock(
      items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }))
    );

    clear();
    showToast(
      `Payment verified! Order #${verifiedOrder.id} confirmed (Txn: ${verifyResult.paymentId || 'Success'}) 📦`
    );
    navigate(`/order-success/${verifiedOrder.id}`);
  };

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
      paymentMethod: payment === 'upi' ? 'Razorpay (UPI)' : payment === 'card' ? 'Razorpay (Card)' : 'Razorpay',
      status: 'Processing' as const,
    };

    try {
      // 1. Create Order with backend payment endpoint
      const orderResp = await fetch(`${API_BASE}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          receipt: `rcpt_${Date.now()}`,
          notes: {
            customer: fullName.trim(),
            email: email.trim(),
          },
        }),
      });

      const orderData = await orderResp.json();

      if (!orderResp.ok || !orderData.ok) {
        throw new Error(orderData.message || 'Failed to initiate payment gateway order.');
      }

      // 2. Check if official Razorpay live/test SDK should trigger
      const hasRazorpaySdk = typeof (window as any).Razorpay === 'function';

      if (razorpayConfig.isLiveConfigured && hasRazorpaySdk) {
        // Trigger Official Razorpay Checkout Modal
        const options = {
          key: orderData.keyId || razorpayConfig.keyId,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          name: 'KINETIC',
          description: `Order Payment (${items.length} items) - ₹${total.toLocaleString('en-IN')}`,
          order_id: orderData.orderId,
          prefill: {
            name: fullName.trim(),
            email: email.trim(),
            contact: phone.trim(),
          },
          theme: {
            color: '#111111',
          },
          handler: async function (response: any) {
            try {
              showToast('Verifying payment signature with Razorpay...');
              const verifyResp = await fetch(`${API_BASE}/api/payment/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderData: orderPayload,
                }),
              });
              const verifyResult = await verifyResp.json();
              if (verifyResult.ok) {
                await handlePaymentSuccess(verifyResult, orderPayload);
              } else {
                showToast('Payment verification failed: ' + verifyResult.message);
                setSubmitting(false);
              }
            } catch (err: any) {
              showToast('Error verifying payment: ' + err.message);
              setSubmitting(false);
            }
          },
          modal: {
            ondismiss: function () {
              setSubmitting(false);
              showToast('Payment cancelled. You can complete your order anytime.');
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // 3. Launch Interactive Razorpay Sandbox Test Simulator
        setSandboxOrderInfo({
          orderId: orderData.orderId,
          amount: total,
          payload: orderPayload,
        });
        setShowSandboxModal(true);
        setSubmitting(false);
      }
    } catch (err: any) {
      console.error('Payment checkout error:', err);
      showToast('Could not initiate payment: ' + err.message);
      setSubmitting(false);
    }
  };

  // Complete payment via Sandbox Simulator
  const handleAuthorizeSandboxPayment = async () => {
    if (!sandboxOrderInfo) return;
    setSubmitting(true);
    setShowSandboxModal(false);

    try {
      const mockPaymentId = `pay_test_${Date.now()}`;
      const verifyResp = await fetch(`${API_BASE}/api/payment/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: sandboxOrderInfo.orderId,
          razorpay_payment_id: mockPaymentId,
          razorpay_signature: 'test_sandbox_signature_valid',
          orderData: sandboxOrderInfo.payload,
        }),
      });

      const verifyResult = await verifyResp.json();
      if (verifyResult.ok) {
        await handlePaymentSuccess(verifyResult, sandboxOrderInfo.payload);
      } else {
        showToast('Payment verification error: ' + verifyResult.message);
      }
    } catch (err: any) {
      showToast('Payment error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="checkout-page">
      <p className="eyebrow">FINAL STEP · FAST & SECURE PAYMENT</p>
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
                  Email for Receipt & Invoice
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

          {/* Razorpay Payment Method Section */}
          <div className="checkout-payment-section">
            <div className="payment-section-header">
              <div>
                <h2>Payment Method</h2>
                <span className="gateway-trust-sub">
                  ⚡ Powered by Razorpay · 256-bit SSL Bank Grade Security
                </span>
              </div>
              <span className="gateway-badge">
                🔒 RBI Compliant
              </span>
            </div>

            <div className="payment-options-grid">
              <label className={`payment-pill ${payment === 'razorpay' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={payment === 'razorpay'}
                  onChange={() => setPayment('razorpay')}
                />
                <div className="pill-content">
                  <div className="pill-title-row">
                    <b>⚡ Razorpay All-in-One</b>
                    <span className="recommended-tag">RECOMMENDED</span>
                  </div>
                  <span>Instant UPI (GPay, PhonePe, Paytm, QR), Cards, Netbanking</span>
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
                  <b>📱 Instant UPI Pay</b>
                  <span>Scan QR or enter UPI ID via Google Pay, PhonePe, Paytm</span>
                </div>
              </label>

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
                  <span>Visa, MasterCard, RuPay, Maestro & Corporate Cards</span>
                </div>
              </label>
            </div>

            <div className="supported-gateways-strip">
              <span className="strip-label">Supported Methods:</span>
              <span className="gateway-chip">UPI (GPay, PhonePe, Paytm)</span>
              <span className="gateway-chip">Credit/Debit Cards</span>
              <span className="gateway-chip">NetBanking (50+ Banks)</span>
              <span className="gateway-chip">Wallets</span>
            </div>
          </div>

          <button className="place" type="submit" disabled={submitting}>
            {submitting
              ? 'Connecting to Razorpay...'
              : `Pay ₹${total.toLocaleString('en-IN')} via Razorpay →`}
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
            <span>Total to Pay</span>
            <b>₹{total.toLocaleString('en-IN')}</b>
          </div>

          <div className="delivery-guarantee-box">
            <span className="guarantee-icon">🛡️</span>
            <div>
              <b>Razorpay Purchase Protection</b>
              <p>Instant digital invoice and order tracking sent to your email.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* ========================================================
          RAZORPAY TEST SANDBOX SIMULATOR MODAL (Dev Mode)
          ======================================================== */}
      {showSandboxModal && sandboxOrderInfo && (
        <div className="razorpay-modal-overlay">
          <div className="razorpay-modal-box">
            <div className="rzp-modal-header">
              <div className="rzp-logo-badge">
                <span className="rzp-brand-tag">RAZORPAY</span>
                <span className="rzp-env-tag">TEST SANDBOX</span>
              </div>
              <button
                type="button"
                className="rzp-modal-close"
                onClick={() => setShowSandboxModal(false)}
                title="Cancel payment"
              >
                ✕
              </button>
            </div>

            <div className="rzp-amount-banner">
              <div>
                <span className="rzp-amount-label">AMOUNT PAYABLE</span>
                <div className="rzp-amount-val">₹{sandboxOrderInfo.amount.toLocaleString('en-IN')}</div>
              </div>
              <div className="rzp-order-chip">
                ID: {sandboxOrderInfo.orderId}
              </div>
            </div>

            <div className="rzp-tabs-bar">
              <button
                type="button"
                className={`rzp-tab ${activeSandboxTab === 'upi' ? 'active' : ''}`}
                onClick={() => setActiveSandboxTab('upi')}
              >
                ⚡ UPI Instant Pay
              </button>
              <button
                type="button"
                className={`rzp-tab ${activeSandboxTab === 'card' ? 'active' : ''}`}
                onClick={() => setActiveSandboxTab('card')}
              >
                💳 Card Payment
              </button>
            </div>

            {activeSandboxTab === 'upi' ? (
              <div className="rzp-tab-content">
                <div className="upi-qr-card">
                  <div className="simulated-qr-box">
                    <div className="qr-pattern">
                      <span className="qr-center-logo">KT</span>
                    </div>
                  </div>
                  <div className="upi-meta">
                    <b>Scan with any UPI App</b>
                    <p>Google Pay, PhonePe, Paytm, BHIM, CRED</p>
                    <div className="upi-vpa-pill">kinetic.store@razorpay</div>
                  </div>
                </div>

                <div className="quick-upi-apps">
                  <span className="quick-upi-btn gpay">GPay</span>
                  <span className="quick-upi-btn phonepe">PhonePe</span>
                  <span className="quick-upi-btn paytm">Paytm</span>
                </div>
              </div>
            ) : (
              <div className="rzp-tab-content">
                <div className="simulated-card-preview">
                  <div className="card-chip">■■■</div>
                  <div className="card-number">4111 •••• •••• 1111</div>
                  <div className="card-bottom">
                    <span>{fullName || 'KINETIC SHOPPER'}</span>
                    <span>12/28 · CVV 123</span>
                  </div>
                </div>
                <div className="test-card-note">
                  ✓ Pre-filled with Razorpay Test Card credentials
                </div>
              </div>
            )}

            <div className="rzp-actions">
              <button
                type="button"
                className="rzp-pay-now-btn"
                onClick={handleAuthorizeSandboxPayment}
                disabled={submitting}
              >
                {submitting ? 'Verifying...' : `Authorize & Pay ₹${sandboxOrderInfo.amount.toLocaleString('en-IN')} (Success) ✓`}
              </button>
              <button
                type="button"
                className="rzp-cancel-btn"
                onClick={() => setShowSandboxModal(false)}
              >
                Cancel Transaction
              </button>
            </div>

            <div className="rzp-modal-footer">
              🔒 256-Bit Encrypted · Real Keys can be set in <code>server/.env</code>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
