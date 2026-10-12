import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../core/context/AuthContext';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedForm, setTouchedForm] = useState(false);

  const isValidName = name.trim().length >= 2;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password.length >= 6;
  const isMatch = password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTouchedPassword(true);
    setTouchedForm(true);

    if (!isValidName || !isValidEmail || !isValidPassword || !isMatch) return;

    // All registered users are clients (shoppers)
    const res = register(name, email, password, 'client');
    if (!res.ok) {
      setError(res.message ?? 'Registration failed.');
      return;
    }

    navigate('/products');
  };

  return (
    <section className="auth single">
      <div className="auth-form">
        <p className="eyebrow">NEW ACCOUNT</p>
        <h1>Join Kinetic.</h1>
        <p className="sub">Create an account to start shopping.</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maya Lin"
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouchedPassword(true)}
              placeholder="At least 6 characters"
              required
            />
          </label>
          {touchedPassword && !isValidPassword && (
            <small>Must be at least 6 characters long.</small>
          )}

          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              required
            />
          </label>
          {touchedForm && !isMatch && <small>Passwords do not match.</small>}

          <button className="submit" type="submit">
            Create Account & Sign In →
          </button>
        </form>

        <p className="switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </section>
  );
};
