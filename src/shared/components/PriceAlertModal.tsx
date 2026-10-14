import React, { useState, useEffect } from 'react';
import { Product } from '../../core/models/product.model';
import { useWishlist } from '../../core/context/WishlistContext';
import { useAuth } from '../../core/context/AuthContext';
import { useToast } from '../../core/context/ToastContext';

interface PriceAlertModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({ product, isOpen, onClose }) => {
  const { getAlert, saveAlert, removeAlert, testAlert } = useWishlist();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const existingAlert = getAlert(product.id);

  const [targetPrice, setTargetPrice] = useState<number>(() => {
    if (existingAlert) return existingAlert.targetPrice;
    return Math.round(product.price * 0.9);
  });

  const [email, setEmail] = useState<string>(() => {
    if (existingAlert) return existingAlert.email;
    return currentUser?.email || '';
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const current = getAlert(product.id);
      if (current) {
        setTargetPrice(current.targetPrice);
        setEmail(current.email);
      } else {
        setTargetPrice(Math.round(product.price * 0.9));
        setEmail(currentUser?.email || '');
      }
      setError('');
    }
  }, [isOpen, product.id, product.price, currentUser]);

  if (!isOpen) return null;

  const savings = Math.max(0, product.price - targetPrice);
  const percentOff = product.price > 0 ? Math.round((savings / product.price) * 100) : 0;

  const presets = [
    { label: '5% OFF', value: Math.round(product.price * 0.95) },
    { label: '10% OFF', value: Math.round(product.price * 0.9) },
    { label: '15% OFF', value: Math.round(product.price * 0.85) },
    { label: '20% OFF', value: Math.round(product.price * 0.8) },
    { label: '30% OFF', value: Math.round(product.price * 0.7) },
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setError('Please enter a valid email address to receive notifications.');
      return;
    }

    if (!targetPrice || targetPrice >= product.price) {
      setError(`Target price must be lower than the current price (₹${product.price.toLocaleString('en-IN')}).`);
      return;
    }

    if (targetPrice <= 0) {
      setError('Target price must be greater than zero.');
      return;
    }

    setIsSubmitting(true);
    try {
      await saveAlert(product.id, targetPrice, cleanEmail);
      showToast(`🔔 Price alert active for ${product.name} at ₹${targetPrice.toLocaleString('en-IN')}!`);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save price alert. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async () => {
    if (!existingAlert) return;
    if (window.confirm(`Cancel price alert for "${product.name}"?`)) {
      await removeAlert(existingAlert.id);
      showToast('Price alert cancelled.');
      onClose();
    }
  };

  const handleTest = async () => {
    if (!existingAlert) return;
    setIsTesting(true);
    try {
      const res = await testAlert(existingAlert.id);
      if (res.ok) {
        showToast(res.message || '⚡ Price drop email simulation dispatched!');
      } else {
        setError(res.message || 'Could not test alert');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to trigger test alert');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="alert-modal-backdrop" onClick={onClose}>
      <div className="alert-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="alert-modal-header">
          <div className="alert-modal-tag">⚡ SMART PRICE RADAR</div>
          <button className="alert-modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="alert-product-summary">
          <img
            src={product.image || ''}
            alt={product.name}
            className="alert-prod-thumb"
            style={{ background: product.accent || '#ddd' }}
          />
          <div className="alert-prod-info">
            <span className="alert-prod-cat">{product.category}</span>
            <h3 className="alert-prod-title">{product.name}</h3>
            <div className="alert-prod-current">
              Current Retail: <b>₹{product.price.toLocaleString('en-IN')}</b>
              {product.oldPrice && (
                <span className="alert-prod-strikethrough">₹{product.oldPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
          </div>
        </div>

        {existingAlert && (
          <div className="existing-alert-banner">
            <span className="pulse-dot"></span>
            <div>
              <b>Tracking Active:</b> Set at <b>₹{existingAlert.targetPrice.toLocaleString('en-IN')}</b> for{' '}
              <span className="tracked-email">{existingAlert.email}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSave} className="alert-form">
          <div className="alert-section-title">1. Choose Your Target Price</div>
          
          <div className="preset-chips-row">
            {presets.map((p) => {
              const isSelected = targetPrice === p.value;
              return (
                <button
                  type="button"
                  key={p.label}
                  className={`preset-chip ${isSelected ? 'selected' : ''}`}
                  onClick={() => setTargetPrice(p.value)}
                >
                  <span className="preset-label">{p.label}</span>
                  <span className="preset-price">₹{p.value.toLocaleString('en-IN')}</span>
                </button>
              );
            })}
          </div>

          <div className="slider-wrap">
            <label className="slider-label">
              <span>Custom Target:</span>
              <span className="slider-val">₹{targetPrice.toLocaleString('en-IN')}</span>
            </label>
            <input
              type="range"
              min={Math.round(product.price * 0.2)}
              max={Math.round(product.price * 0.99)}
              step={50}
              value={targetPrice}
              onChange={(e) => setTargetPrice(Number(e.target.value))}
              className="target-slider"
            />
            <div className="slider-range-hints">
              <span>Deep Discount (80% off)</span>
              <span>Near Current Price</span>
            </div>
          </div>

          <div className="savings-highlight-card">
            <div className="savings-label">PROJECTED SAVINGS</div>
            <div className="savings-number">
              ₹{savings.toLocaleString('en-IN')} <span className="savings-pill">{percentOff}% OFF</span>
            </div>
            <div className="savings-note">
              We notify you the instant the price matches or beats ₹{targetPrice.toLocaleString('en-IN')}.
            </div>
          </div>

          <div className="alert-section-title">2. Notification Email Address</div>
          <div className="email-input-wrapper">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="alert-email-field"
            />
          </div>

          {error && <div className="alert-error-banner">⚠️ {error}</div>}

          <div className="alert-modal-actions">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`alert-save-btn ${isSubmitting ? 'submitting' : ''}`}
            >
              {isSubmitting
                ? 'Activating Price Radar...'
                : existingAlert
                ? 'Update Price Alert ↗'
                : '⚡ Set Price Alert'}
            </button>

            {existingAlert && (
              <div className="existing-actions-row">
                <button
                  type="button"
                  disabled={isTesting}
                  onClick={handleTest}
                  className="alert-test-btn"
                  title="Simulate a price drop right now to verify the email delivery"
                >
                  {isTesting ? 'Sending Simulation...' : '🚀 Test Email Alert Now'}
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="alert-delete-btn"
                >
                  🗑️ Cancel Alert
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
