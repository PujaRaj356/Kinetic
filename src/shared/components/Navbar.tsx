import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../core/context/AuthContext';
import { useCart } from '../../core/context/CartContext';

export const Navbar: React.FC = () => {
  const { isLoggedIn, isAdmin, currentUser, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <>
      <header className="nav">
        <Link to="/home" className="brand" title="Kinetic Home">
          <span className="brand-mark">KT</span>
          <span className="brand-name">KINETIC</span>
        </Link>

        <nav className="desktop-nav">
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
            Shop
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/wishlist" className={({ isActive }) => (isActive ? 'active' : '')}>
              Saved
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
              Profile
            </NavLink>
          )}
          {/* Only visible to the Administrator */}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) => `nav-admin-link ${isActive ? 'active' : ''}`}
            >
              👑 Admin Panel
            </NavLink>
          )}
        </nav>

        <div className="nav-actions">
          {/* Dedicated Mobile Header Home Button */}
          <NavLink to="/home" className="mobile-header-home-btn" title="Back to Home">
            🏠 Home
          </NavLink>

          {isLoggedIn ? (
            <>
              <Link to="/profile" className="hello-link" title="My Profile & Orders">
                <span className="hello">
                  Hi, {currentUser?.name}
                  {isAdmin && <span className="admin-tag-label"> [ADMIN]</span>}
                </span>
              </Link>
              <button className="ghost" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="ghost">
                Login
              </Link>
              <Link to="/register" className="dark-btn">
                Join
              </Link>
            </>
          )}
          <Link to="/cart" className="cart-pill" title="Shopping Bag">
            Bag <b>{count}</b>
          </Link>
        </div>
      </header>

      {/* Sticky Mobile Bottom Navigation Bar (Visible on phones) */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Quick Navigation">
        <NavLink
          to="/home"
          className={({ isActive }) => `mobile-nav-tab ${isActive ? 'active' : ''}`}
        >
          <span className="mobile-tab-icon">🏠</span>
          <span className="mobile-tab-label">Home</span>
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => `mobile-nav-tab ${isActive ? 'active' : ''}`}
        >
          <span className="mobile-tab-icon">⚡</span>
          <span className="mobile-tab-label">Shop</span>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => `mobile-nav-tab ${isActive ? 'active' : ''}`}
        >
          <span className="mobile-tab-icon">
            🎒
            {count > 0 && <span className="mobile-tab-badge">{count}</span>}
          </span>
          <span className="mobile-tab-label">Bag</span>
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) => `mobile-nav-tab ${isActive ? 'active' : ''}`}
        >
          <span className="mobile-tab-icon">♡</span>
          <span className="mobile-tab-label">Saved</span>
        </NavLink>
        <NavLink
          to={isLoggedIn ? '/profile' : '/login'}
          className={({ isActive }) => `mobile-nav-tab ${isActive ? 'active' : ''}`}
        >
          <span className="mobile-tab-icon">{isAdmin ? '👑' : '👤'}</span>
          <span className="mobile-tab-label">{isLoggedIn ? 'Profile' : 'Login'}</span>
        </NavLink>
      </nav>
    </>
  );
};
