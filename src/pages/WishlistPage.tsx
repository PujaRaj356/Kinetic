import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../core/context/WishlistContext';
import { ProductCard } from '../shared/components/ProductCard';
import { useToast } from '../core/context/ToastContext';

export const WishlistPage: React.FC = () => {
  const { items } = useWishlist();
  const { showToast } = useToast();

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

      <p className="eyebrow">SAVED ITEMS</p>
      <h1>
        Your<br />
        selection.
      </h1>
      {items.length > 0 ? (
        <div className="grid">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} onAdded={showToast} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>Nothing saved yet. Tap ♡ on anything you love.</p>
          <div className="empty-actions-row">
            <Link to="/products" className="empty-action-primary">
              Browse Collection →
            </Link>
            <Link to="/home" className="empty-action-secondary">
              🏠 Go to Home
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};
