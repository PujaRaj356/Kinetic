import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../core/context/AuthContext';

export const ForgotPassword: React.FC = () => {
  const { setPendingVerification } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValidEmail) return;

    setPendingVerification({ email, purpose: 'reset' });
    navigate('/verify');
  };

  return (
    <section className="forgot-page">
      <div className="forgot-box">
        <p className="eyebrow">ACCOUNT RECOVERY</p>
        <h1>Forgot?</h1>
        <p>Enter your account email. We'll send you a verification step.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          {touched && !isValidEmail && (
            <small style={{ color: '#b32b16', fontWeight: 800 }}>
              Enter a valid email address.
            </small>
          )}
          <button type="submit">Send verification →</button>
        </form>
        <Link to="/login">← Back to login</Link>
      </div>
    </section>
  );
};
