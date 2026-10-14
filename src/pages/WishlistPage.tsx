import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../core/context/WishlistContext';
import { useCart } from '../core/context/CartContext';
import { useToast } from '../core/context/ToastContext';
import { Product } from '../core/models/product.model';
import { PriceAlertModal } from '../shared/components/PriceAlertModal';

export const WishlistPage: React.FC = () => {
  const { items, toggle, getAlert, testAlert } = useWishlist();
  const { add } = useCart();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'all' | 'alerts'>('all');
  const [selectedProductForAlert, setSelectedProductForAlert] = useState<Product | null>(null);
  const [testingAlertId, setTestingAlertId] = useState<string | null>(null);

  const itemsWithAlerts = items.filter((p) => !!getAlert(p.id));
  const displayedItems = activeTab === 'alerts' ? itemsWithAlerts : items;

  // Calculate potential savings across all alerts
  const totalPotentialSavings = itemsWithAlerts.reduce((acc, p) => {
    const alert = getAlert(p.id);
    if (!alert) return acc;
    return acc + Math.max(0, p.price - alert.targetPrice);
  }, 0);

  const handleTestEmail = async (alertId: string, productName: string) => {
    setTestingAlertId(alertId);
    try {
      const res = await testAlert(alertId);
      if (res.ok) {
        showToast(res.message || `⚡ Dispatched price drop simulation for ${productName}!`);
      } else {
        showToast(res.message || 'Could not send test email.');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to trigger test email.');
    } finally {
      setTestingAlertId(null);
    }
  };

  return (
    <section className="wish">
      <div className="cart-nav-breadcrumbs">
        <Link to="/home" className="cart-back-link">
          🏠 Home
        </Link>
        <span className="crumb-sep">/</span>
        <Link to="/products" className="cart-back-link">
          ⚡ Shop All
        </Link>
      </div>

      <div className="wish-header-wrap">
        <div>
          <p className="eyebrow">SMART WISHLIST & PRICE RADAR</p>
          <h1>
            Your<br />
            selection.
          </h1>
        </div>

        {items.length > 0 && (
          <div className="wish-stats-pill">
            <div className="wish-stat-item">
              <span className="wish-stat-num">{items.length}</span>
              <span className="wish-stat-label">Saved</span>
            </div>
            <div className="wish-stat-divider"></div>
            <div className="wish-stat-item">
              <span className="wish-stat-num">{itemsWithAlerts.length}</span>
              <span className="wish-stat-label">Alerts Set</span>
            </div>
            {totalPotentialSavings > 0 && (
              <>
                <div className="wish-stat-divider"></div>
                <div className="wish-stat-item">
                  <span className="wish-stat-num green">₹{totalPotentialSavings.toLocaleString('en-IN')}</span>
                  <span className="wish-stat-label">Potential Savings</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      {items.length > 0 && (
        <div className="wish-filter-tabs">
          <button
            className={`wish-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Saved Items ({items.length})
          </button>
          <button
            className={`wish-tab-btn ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            🔔 Active Price Alerts ({itemsWithAlerts.length})
          </button>
        </div>
      )}

      {displayedItems.length > 0 ? (
        <div className="wish-grid">
          {displayedItems.map((product) => {
            const alert = getAlert(product.id);
            const savings = alert ? Math.max(0, product.price - alert.targetPrice) : 0;
            const percentOff = alert && product.price > 0 ? Math.round((savings / product.price) * 100) : 0;

            return (
              <article key={product.id} className="wish-card">
                <div className="wish-card-visual" style={{ background: product.accent || '#eee' }}>
                  <span className="badge">{product.category}</span>
                  <Link to={`/products/${product.id}`} className="wish-img-link">
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <button
                    className="wish-remove-btn"
                    onClick={() => {
                      toggle(product);
                      showToast(`Removed "${product.name}" from wishlist.`);
                    }}
                    title="Remove from wishlist"
                    aria-label="Remove from wishlist"
                  >
                    ♥
                  </button>
                </div>

                <div className="wish-card-body">
                  <div className="wish-card-info">
                    <div className="wish-prod-title-row">
                      <Link to={`/products/${product.id}`}>
                        <h3>{product.name}</h3>
                      </Link>
                      <div className="price">₹{product.price.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="wish-prod-rating">★ {product.rating}</div>
                  </div>

                  {/* Price Alert Status Banner */}
                  <div className={`wish-alert-banner ${alert ? 'has-alert' : 'no-alert'}`}>
                    {alert ? (
                      <div className="alert-badge-wrap">
                        <div className="alert-status-line">
                          <span className="radar-pulse"></span>
                          <span className="alert-target-label">
                            Target: <b>₹{alert.targetPrice.toLocaleString('en-IN')}</b>
                          </span>
                          <span className="savings-badge">-{percentOff}%</span>
                        </div>
                        <div className="alert-meta-note">
                          Notifies <span className="alert-email-highlight">{alert.email}</span> on price drop.
                        </div>
                        <div className="alert-card-btn-row">
                          <button
                            type="button"
                            className="btn-edit-alert"
                            onClick={() => setSelectedProductForAlert(product)}
                          >
                            ⚙️ Edit Target
                          </button>
                          <button
                            type="button"
                            className="btn-test-alert"
                            disabled={testingAlertId === alert.id}
                            onClick={() => handleTestEmail(alert.id, product.name)}
                            title="Simulate price drop and send email alert now"
                          >
                            {testingAlertId === alert.id ? 'Sending...' : '⚡ Test Email'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="no-alert-callout">
                        <span className="no-alert-text">Want a deal? Get notified if price drops.</span>
                        <button
                          type="button"
                          className="btn-set-alert-cta"
                          onClick={() => setSelectedProductForAlert(product)}
                        >
                          🔔 Set Price Alert
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Bottom Actions */}
                  <div className="wish-card-bottom-actions">
                    <button
                      type="button"
                      className="wish-add-bag-btn"
                      onClick={() => {
                        add(product);
                        showToast(`Added "${product.name}" to Bag!`);
                      }}
                    >
                      🛍️ Add to Bag
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty">
          {activeTab === 'alerts' ? (
            <>
              <p>No active price alerts set yet.</p>
              <div className="empty-actions-row">
                <button
                  type="button"
                  className="empty-action-primary"
                  onClick={() => setActiveTab('all')}
                >
                  View All Saved Items ({items.length}) →
                </button>
              </div>
            </>
          ) : (
            <>
              <p>Nothing saved yet. Tap ♡ on anything you love to build your wishlist.</p>
              <div className="empty-actions-row">
                <Link to="/products" className="empty-action-primary">
                  Browse Collection →
                </Link>
                <Link to="/home" className="empty-action-secondary">
                  🏠 Go to Home
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      {/* Price Alert Modal */}
      {selectedProductForAlert && (
        <PriceAlertModal
          product={selectedProductForAlert}
          isOpen={!!selectedProductForAlert}
          onClose={() => setSelectedProductForAlert(null)}
        />
      )}
    </section>
  );
};
