import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './core/context/AuthContext';
import { CartProvider } from './core/context/CartContext';
import { WishlistProvider } from './core/context/WishlistContext';
import { ToastProvider } from './core/context/ToastContext';
import { Navbar } from './shared/components/Navbar';
import { Toast } from './shared/components/Toast';
import { RequireAuth } from './core/guards/RequireAuth';
import { RequireAdmin } from './core/guards/RequireAdmin';

import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfilePage } from './pages/ProfilePage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Verify } from './pages/Verify';
import { ForgotPassword } from './pages/ForgotPassword';
import { AdminDashboard } from './pages/AdminDashboard';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="page-shell">
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route
                  path="/admin"
                  element={
                    <RequireAdmin>
                      <AdminDashboard />
                    </RequireAdmin>
                  }
                />

                <Route
                  path="/cart"
                  element={
                    <RequireAuth>
                      <CartPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <RequireAuth>
                      <WishlistPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <RequireAuth>
                      <CheckoutPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <ProfilePage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/order-success/:orderId"
                  element={
                    <RequireAuth>
                      <OrderSuccessPage />
                    </RequireAuth>
                  }
                />

                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </main>
            <Toast />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};
