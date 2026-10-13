import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../core/context/AuthContext';

export const Login: React.FC = () => {
  const { login, setPendingVerification } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = EMAIL_REGEX.test(email.trim());
  const isValidPassword = password.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setErrorCode('');
    setTouchedEmail(true);
    setTouchedPassword(true);

    if (!isValidEmail) {
      setError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }
    if (!isValidPassword) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email, password, rememberMe);
      if (!res.ok) {
        setError(res.message ?? 'Login failed. Please check credentials.');
        setErrorCode(res.code || '');
        return;
      }

      if (res.requires2FA) {
        navigate('/verify');
        return;
      }

      if (res.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/products');
      }
    } finally {
      setIsLoading(false);
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

        {error && (
          <div className="auth-alert-banner">
            <div>⚠️ {error}</div>
            {(errorCode === 'USER_NOT_FOUND' || error.toLowerCase().includes('no account found')) && (
              <div>
                Not registered yet?{' '}
                <Link to={`/register?email=${encodeURIComponent(email.trim())}`}>
                  Create an account now →
                </Link>
              </div>
            )}
            {(errorCode === 'INCORRECT_PASSWORD' || error.toLowerCase().includes('incorrect password')) && (
              <div>
                Trouble logging in?{' '}
                <Link to="/forgot-password">
                  Reset password or use email OTP →
                </Link>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>
            Email Address
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              onBlur={() => setTouchedEmail(true)}
              placeholder="you@example.com"
              required
            />
          </label>
          {touchedEmail && !isValidEmail && email.trim().length > 0 && (
            <small>Please enter a valid email format (e.g. name@domain.com).</small>
          )}

          <label>
            Password
            <div className="password">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                onBlur={() => setTouchedPassword(true)}
                placeholder="Enter password"
                required
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

          <button
            className={`submit ${isLoading ? 'auth-btn-loading' : ''}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying Credentials...' : 'Sign In →'}
          </button>
        </form>

        <div style={{ marginTop: '14px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => {
              if (email && isValidEmail) {
                setPendingVerification({ email: email.trim().toLowerCase(), purpose: 'login' });
                navigate('/verify');
              } else {
                navigate('/forgot-password');
              }
            }}
            style={{
              background: '#f6f1e7',
              border: '2px solid #111',
              padding: '12px 14px',
              width: '100%',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              color: '#111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            ✉ Sign in with 6-Digit Email Code
          </button>
        </div>

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
