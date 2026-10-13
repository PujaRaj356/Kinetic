import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../core/context/CartContext';
import { CartItemComponent } from '../shared/components/CartItemComponent';

export const CartPage: React.FC = () => {
  const { items, subtotal, shipping, total } = useCart();

  return (
    <section className="cart-page">
      <div className="cart-nav-breadcrumbs">
        <Link to="/home" className="cart-back-link">
          🏠 Home
        </Link>
        <span className="crumb-sep">/</span>
        <Link to="/products" className="cart-back-link">
          ⚡ Continue Shopping
        </Link>
      </div>

      <header>
        <p className="eyebrow">YOUR BAG</p>
        <h1>
          Ready<br />
          to checkout?
        </h1>
      </header>
      {items.length > 0 ? (
        <div className="cart-layout">
          <div>
            {items.map((item) => (
              <CartItemComponent key={item.product.id} item={item} />
            ))}
          </div>
          <aside>
            <h2>Summary</h2>
            <div>
              <span>Subtotal</span>
              <b>₹{subtotal.toLocaleString('en-IN')}</b>
            </div>
            <div>
              <span>Shipping</span>
              <b>{shipping === 0 ? 'FREE' : `₹${shipping}`}</b>
            </div>
            <hr />
            <div className="total">
              <span>Total</span>
              <b>₹{total.toLocaleString('en-IN')}</b>
            </div>
            <Link to="/checkout" className="checkout">
              Checkout →
            </Link>
            <div className="cart-secondary-nav">
              <Link to="/products" className="cart-continue-link">
                ← Continue Shopping
              </Link>
              <Link to="/home" className="cart-home-link">
                🏠 Back to Home Page
              </Link>
            </div>
          </aside>
        </div>
      ) : (
        <div className="empty">
          <div>🛒</div>
          <h2>Your bag is empty.</h2>
          <div className="empty-actions-row">
            <Link to="/products" className="empty-action-primary">
              ⚡ Explore Products →
            </Link>
            <Link to="/home" className="empty-action-secondary">
              🏠 Back to Home
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};
