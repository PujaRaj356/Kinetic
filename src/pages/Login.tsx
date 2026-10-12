import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../core/context/AuthContext';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTouchedEmail(true);
    setTouchedPassword(true);

    if (!isValidEmail || !isValidPassword) return;

    const res = login(email, password, rememberMe);
    if (!res.ok) {
      setError(res.message ?? 'Login failed. Please check credentials.');
      return;
    }

    if (res.user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/products');
    }
  };

  return (
    <section className="auth">
      <div className="auth-art">
        <span>KT</span>
        <p>
          GOOD PRODUCTS.
          <br />
          ZERO BORING.
        </p>
      </div>
      <div className="auth-form">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Log in.</h1>
        <p className="sub">Sign in to continue your Kinetic session.</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouchedEmail(true)}
              placeholder="you@example.com"
            />
          </label>
          {touchedEmail && !isValidEmail && <small>Enter a valid email.</small>}

          <label>
            Password
            <div className="password">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouchedPassword(true)}
                placeholder="Enter password"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
          {touchedPassword && !isValidPassword && (
            <small>Please enter your password.</small>
          )}

          <div className="remember-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me on this browser</span>
            </label>
          </div>

          <button className="submit" type="submit">
            Sign In →
          </button>
        </form>

        <Link to="/forgot-password" className="forgot">
          Forgot password?
        </Link>
        <p className="switch">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
};
