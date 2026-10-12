import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, isAdmin } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    // Normal users/clients are redirected to home and cannot see the admin dashboard
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};
