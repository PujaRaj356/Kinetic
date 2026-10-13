import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../core/context/AuthContext';
import { useCart } from '../../core/context/CartContext';

export const Footer: React.FC = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  const { count } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-top-banner">
        <div className="footer-banner-item">
          <span className="banner-icon">⚡</span>
          <div>
            <strong>100% In-House Crafted</strong>
            <p>Proprietary designs manufactured without middlemen</p>
          </div>
        </div>
        <div className="footer-banner-item">
          <span className="banner-icon">📦</span>
          <div>
            <strong>Fast Express Shipping</strong>
            <p>Free delivery on all orders over ₹5,000</p>
          </div>
        </div>
        <div className="footer-banner-item">
          <span className="banner-icon">✉</span>
          <div>
            <strong>Instant Order Invoices</strong>
            <p>Automatic order receipts sent directly to your Gmail</p>
          </div>
        </div>
      </div>

      <div className="footer-main-grid">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link to="/home" className="footer-brand" onClick={scrollToTop}>
            <span className="brand-mark">KT</span>
            <span>KINETIC</span>
          </Link>
          <p className="footer-tagline">
            GOOD PRODUCTS. ZERO BORING. Official studio merch, horology, eyewear, footwear & industrial tech engineered for uncompromising taste.
          </p>
          <div className="footer-quick-home">
            <Link to="/home" className="footer-home-pill" onClick={scrollToTop}>
              🏠 Back to Home Page
            </Link>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="footer-col">
          <h4>Pages</h4>
          <ul className="footer-links">
            <li>
              <Link to="/home" onClick={scrollToTop}>Home</Link>
            </li>
            <li>
              <Link to="/products" onClick={scrollToTop}>Shop All Products</Link>
            </li>
            <li>
              <Link to="/cart" onClick={scrollToTop}>
                Shopping Bag {count > 0 && <span className="footer-badge">{count}</span>}
              </Link>
            </li>
            <li>
              <Link to="/wishlist" onClick={scrollToTop}>Saved Wishlist</Link>
            </li>
            <li>
              <Link to="/profile" onClick={scrollToTop}>My Orders & Profile</Link>
            </li>
          </ul>
        </div>

        {/* Categories Column */}
        <div className="footer-col">
          <h4>Categories</h4>
          <ul className="footer-links">
            <li>
              <Link to="/products?category=Apparel%20%26%20Merch" onClick={scrollToTop}>Apparel & Merch</Link>
            </li>
            <li>
              <Link to="/products?category=Horology" onClick={scrollToTop}>Horology Watches</Link>
            </li>
            <li>
              <Link to="/products?category=Footwear" onClick={scrollToTop}>Footwear</Link>
            </li>
            <li>
              <Link to="/products?category=Tech" onClick={scrollToTop}>Tech & Smart Gear</Link>
            </li>
            <li>
              <Link to="/products?category=Eyewear" onClick={scrollToTop}>Eyewear</Link>
            </li>
            <li>
              <Link to="/products?category=Bags%20%26%20Carry" onClick={scrollToTop}>Bags & Carry</Link>
            </li>
            <li>
              <Link to="/products?category=Audio" onClick={scrollToTop}>Audio</Link>
            </li>
            <li>
              <Link to="/products?category=Workspace" onClick={scrollToTop}>Workspace</Link>
            </li>
          </ul>
        </div>

        {/* Account & Administration Column */}
        <div className="footer-col">
          <h4>Account</h4>
          <ul className="footer-links">
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile" onClick={scrollToTop}>My Order History</Link>
                </li>
                <li>
                  <Link to="/profile" onClick={scrollToTop}>Shipping Address</Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link to="/admin" onClick={scrollToTop} className="admin-footer-link">
                      👑 Admin Dashboard
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={scrollToTop}>Sign In to Account</Link>
                </li>
                <li>
                  <Link to="/register" onClick={scrollToTop}>Create New Account</Link>
                </li>
                <li>
                  <Link to="/forgot-password" onClick={scrollToTop}>Password Reset / OTP</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/cart" onClick={scrollToTop}>Direct Checkout</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <p className="copyright">
          © {new Date().getFullYear()} Kinetic Studio, Inc. All rights reserved.
        </p>
        <button type="button" className="scroll-top-btn" onClick={scrollToTop} title="Scroll back to top">
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
};
