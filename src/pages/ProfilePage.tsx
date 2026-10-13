import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../core/context/AuthContext';
import { useWishlist } from '../core/context/WishlistContext';
import { useToast } from '../core/context/ToastContext';
import { getOrdersForUser, fetchUserOrdersFromDatabase, resendOrderEmail } from '../core/services/orderService';
import { Order } from '../core/models/order.model';

export const ProfilePage: React.FC = () => {
  const { currentUser, logout, updateProfile, isAdmin } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [resendingId, setResendingId] = useState<string | null>(null);

  // Address edit state
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [pincode, setPincode] = useState(currentUser?.pincode || '');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setPhone(currentUser.phone || '');
      setAddress(currentUser.address || '');
      setCity(currentUser.city || '');
      setPincode(currentUser.pincode || '');
      const userOrders = getOrdersForUser(currentUser.id, currentUser.email);
      setOrders(userOrders);
      fetchUserOrdersFromDatabase(currentUser.id, currentUser.email).then((remote) => {
        if (remote && remote.length > 0) setOrders(remote);
      });
    }
  }, [currentUser]);

  const hasSavedAddress = !!(currentUser?.address && currentUser?.phone && currentUser?.city && currentUser?.pincode);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      showToast('Please enter a valid 10-digit Indian phone number.');
      return;
    }
    if (!address || address.trim().length < 5) {
      showToast('Please provide your complete street address.');
      return;
    }
    if (!city || city.trim().length < 2) {
      showToast('Please enter your city.');
      return;
    }
    if (!pincode || !/^\d{6}$/.test(pincode)) {
      showToast('Please enter a valid 6-digit PIN code.');
      return;
    }

    updateProfile({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
    });

    setIsEditingAddress(false);
    showToast('Delivery address saved! 1-click checkout is now active for future orders. 🚀');
  };

  const handleResendReceipt = async (order: Order) => {
    setResendingId(order.id);
    try {
      const res = await resendOrderEmail(order);
      if (res.ok) {
        showToast(`Receipt for #${order.id} sent to ${order.customerEmail} 📨`);
      } else {
        showToast(res.message || 'Could not send receipt.');
      }
    } catch {
      showToast('Error requesting email receipt.');
    } finally {
      setResendingId(null);
    }
  };

  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <section className="profile-hero-card">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar">
            {(currentUser?.name || 'U').charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="profile-header-meta">
          <div className="profile-tags">
            <span className="profile-badge">MEMBER PROFILE</span>
            {isAdmin && <span className="profile-admin-badge">👑 SYSTEM ADMIN</span>}
          </div>
          <h1>{currentUser?.name || 'Shopper'}</h1>
          <p className="profile-email">
            ✉️ {currentUser?.email} · Account ID: <span className="mono">{currentUser?.id}</span>
          </p>
        </div>
        <div className="profile-actions-header">
          {isAdmin && (
            <Link to="/admin" className="profile-btn-dark">
              👑 Admin Panel
            </Link>
          )}
          <button className="profile-btn-ghost" onClick={() => { logout(); navigate('/home'); }}>
            Logout
          </button>
        </div>
      </section>

      {/* Stats Quick Bar */}
      <div className="profile-stats-bar">
        <div className="profile-stat-box">
          <span className="stat-num">{orders.length}</span>
          <span className="stat-desc">Total Orders</span>
        </div>
        <div className="profile-stat-box">
          <span className="stat-num">{wishlistItems.length}</span>
          <span className="stat-desc">Saved Items</span>
        </div>
        <div className="profile-stat-box">
          <span className="stat-num">₹{totalSpent.toLocaleString('en-IN')}</span>
          <span className="stat-desc">Total Spent</span>
        </div>
        <div className="profile-stat-box">
          <span className="stat-num">{hasSavedAddress ? 'Active ✓' : 'Pending'}</span>
          <span className="stat-desc">1-Click Checkout</span>
        </div>
      </div>

      <div className="profile-content-grid">
        {/* Left Column: Saved Delivery Address Manager */}
        <div className="profile-column-left">
          <div className="profile-card">
            <div className="profile-card-header">
              <div>
                <h2>Saved Delivery Address</h2>
                <p className="profile-card-sub">
                  Used automatically at checkout so you don't have to re-enter your details every time.
                </p>
              </div>
              {!isEditingAddress && hasSavedAddress && (
                <button
                  className="profile-edit-btn"
                  onClick={() => setIsEditingAddress(true)}
                >
                  ✏️ Edit
                </button>
              )}
            </div>

            {isEditingAddress || !hasSavedAddress ? (
              <form onSubmit={handleSaveAddress} className="profile-address-form">
                {!hasSavedAddress && (
                  <div className="profile-notice-box">
                    💡 Save your address once and checkout instantly on all future orders!
                  </div>
                )}
                <label>
                  Full Name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Recipient's Name"
                    required
                  />
                </label>
                <div className="two-col">
                  <label>
                    Mobile Phone
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile"
                      required
                    />
                  </label>
                  <label>
                    City / Town
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Bengaluru, Mumbai, etc."
                      required
                    />
                  </label>
                </div>
                <label>
                  Street Address
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat / Building, Street, Landmark"
                    rows={2}
                    required
                  />
                </label>
                <label>
                  PIN Code
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="6-digit postal code"
                    required
                  />
                </label>
                <div className="address-form-btns">
                  <button type="submit" className="save-address-btn">
                    Save Delivery Details →
                  </button>
                  {hasSavedAddress && (
                    <button
                      type="button"
                      className="cancel-address-btn"
                      onClick={() => setIsEditingAddress(false)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="saved-address-view">
                <div className="recipient-row">
                  <b>{currentUser?.name}</b>
                  <span className="phone-tag">📞 {currentUser?.phone}</span>
                </div>
                <div className="address-body">
                  📍 {currentUser?.address}
                  <br />
                  {currentUser?.city} - {currentUser?.pincode}
                </div>
                <div className="one-click-active-badge">
                  ⚡ 1-Click Fast Checkout is Active for this Address
                </div>
              </div>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="profile-card shortcuts-card">
            <h3>Quick Links</h3>
            <div className="shortcuts-grid">
              <Link to="/products" className="shortcut-btn">
                🛍️ Browse Catalog
              </Link>
              <Link to="/wishlist" className="shortcut-btn">
                ❤️ My Saved Items ({wishlistItems.length})
              </Link>
              <Link to="/cart" className="shortcut-btn">
                🛒 View Cart
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Order History & Receipts */}
        <div className="profile-column-right">
          <div className="profile-card">
            <div className="profile-card-header">
              <div>
                <h2>Order History & Receipts</h2>
                <p className="profile-card-sub">
                  Track your previous purchases and view or resend receipts.
                </p>
              </div>
              <span className="order-count-pill">{orders.length} Orders Placed</span>
            </div>

            {orders.length === 0 ? (
              <div className="no-orders-box">
                <div className="no-orders-icon">📦</div>
                <h3>No orders placed yet</h3>
                <p>Explore our curated catalog and place your first order!</p>
                <Link to="/products" className="start-shopping-btn">
                  Explore Products →
                </Link>
              </div>
            ) : (
              <div className="profile-orders-list">
                {orders.map((ord) => {
                  const dateStr = new Date(ord.createdAt || Date.now()).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });

                  return (
                    <div className="profile-order-item" key={ord.id}>
                      <div className="order-item-header">
                        <div>
                          <span className="order-item-ref">ORDER #{ord.id}</span>
                          <span className="order-item-date">{dateStr}</span>
                        </div>
                        <span className={`status-pill status-${(ord.status || 'Processing').toLowerCase()}`}>
                          {ord.status || 'Processing'}
                        </span>
                      </div>

                      {/* Items Preview */}
                      <div className="order-items-thumbnails">
                        {(ord.items || []).map((it, i) => (
                          <div className="order-thumb-row" key={i}>
                            <img
                              src={it.product.image}
                              alt={it.product.name}
                              className="thumb-img"
                            />
                            <div className="thumb-info">
                              <span className="thumb-name">{it.product.name}</span>
                              <span className="thumb-qty">Qty: {it.quantity} × ₹{it.product.price.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="order-item-footer">
                        <div className="order-footer-details">
                          <span className="dest-city">Deliver to: {ord.city}</span>
                          <span className="pay-method">Mode: {(ord.paymentMethod || 'card').toUpperCase()}</span>
                          <span className="total-amount">Total: <b>₹{ord.total.toLocaleString('en-IN')}</b></span>
                        </div>
                        <div className="order-footer-actions">
                          <button
                            className="resend-mail-action-btn"
                            onClick={() => handleResendReceipt(ord)}
                            disabled={resendingId === ord.id}
                            title="Resend receipt to customer email"
                          >
                            {resendingId === ord.id ? 'Sending...' : '📨 Resend Email'}
                          </button>
                          <Link to={`/order-success/${ord.id}`} className="view-receipt-action-btn">
                            View Receipt →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
