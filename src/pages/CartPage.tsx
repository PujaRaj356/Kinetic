import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../core/context/CartContext';
import { CartItemComponent } from '../shared/components/CartItemComponent';

export const CartPage: React.FC = () => {
  const { items, subtotal, shipping, total } = useCart();

  return (
    <section className="cart-page">
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
          </aside>
        </div>
      ) : (
        <div className="empty">
          <div>🛒</div>
          <h2>Your bag is empty.</h2>
          <Link to="/products">Start shopping →</Link>
        </div>
      )}
    </section>
  );
};
