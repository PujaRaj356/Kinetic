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
    <header className="nav">
      <Link to="/home" className="brand">
        <span className="brand-mark">KT</span>
        <span>KINETIC</span>
      </Link>

      <nav>
        <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
          Shop
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/wishlist" className={({ isActive }) => (isActive ? 'active' : '')}>
            Saved
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
        {isLoggedIn ? (
          <>
            <span className="hello">
              Hi, {currentUser?.name}
              {isAdmin && <span className="admin-tag-label"> [ADMIN]</span>}
            </span>
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
        <Link to="/cart" className="cart-pill">
          Bag <b>{count}</b>
        </Link>
      </div>
    </header>
  );
};
