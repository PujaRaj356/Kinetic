import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../core/context/AuthContext';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedConfirm, setTouchedConfirm] = useState(false);

  // Auto-fill email if passed in query string from login
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryEmail = params.get('email');
    if (queryEmail) {
      setEmail(queryEmail);
    }
  }, [location.search]);

  // Strict email regex validation
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = EMAIL_REGEX.test(email.trim());
  const isValidName = name.trim().length >= 2;

  // Known placeholder and disposable spam domains
  const BLOCKED_DOMAINS = new Set([
    'example.com', 'example.org', 'example.net', 'test.com', 'sample.com',
    'fake.com', 'dummy.com', 'tempmail.com', 'temp-mail.org', 'mailinator.com',
    '10minutemail.com', 'guerrillamail.com', 'trashmail.com', 'sharklasers.com',
    'yopmail.com', 'dispostable.com', 'throwawaymail.com', 'inboxkitten.com'
  ]);

  const emailDomain = email.includes('@') ? email.split('@')[1]?.toLowerCase().trim() : '';
  const isBlockedDomain = !!(emailDomain && BLOCKED_DOMAINS.has(emailDomain));

  // Real-time password criteria
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  const passedRules = [hasMinLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  const isPasswordSecure = hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial;
  const isMatch = password.length > 0 && password === confirmPassword;

  // Strength score and color
  const getStrengthData = () => {
    if (password.length === 0) return { percent: 0, label: 'None', color: '#e5e7eb' };
    if (passedRules <= 2) return { percent: 30, label: 'Weak', color: '#ef4444' };
    if (passedRules === 3) return { percent: 60, label: 'Fair', color: '#f97316' };
    if (passedRules === 4) return { percent: 80, label: 'Good', color: '#eab308' };
    return { percent: 100, label: 'Strong & Secure', color: '#10b981' };
  };

  const strength = getStrengthData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setErrorCode('');
    setTouchedEmail(true);
    setTouchedPassword(true);
    setTouchedConfirm(true);

    if (!isValidName) {
      setError('Please provide your full name (at least 2 characters).');
      return;
    }
    if (!isValidEmail) {
      setError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }
    if (isBlockedDomain) {
      setError(`The domain "@${emailDomain}" is a test/placeholder domain and cannot receive real emails. Please use a real active email address (e.g. Gmail, Outlook, Yahoo).`);
      return;
    }
    if (!isPasswordSecure) {
      setError('Please ensure your password meets all 5 security requirements below.');
      return;
    }
    if (!isMatch) {
      setError('Passwords do not match. Please verify your confirmation password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await register(name, email, password, 'client');
      if (!res.ok) {
        setError(res.message ?? 'Registration failed.');
        setErrorCode(res.code || '');
        return;
      }

      if (res.requiresVerification) {
        navigate('/verify');
        return;
      }

      navigate('/products');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth single">
      <div className="auth-form">
        <p className="eyebrow">NEW ACCOUNT</p>
        <h1>Join Kinetic.</h1>
        <p className="sub">Create an account to start shopping our in-house gear.</p>

        {error && (
          <div className="auth-alert-banner">
            <div>⚠️ {error}</div>
            {(errorCode === 'EMAIL_ALREADY_EXISTS' || error.toLowerCase().includes('already exists')) && (
              <div>
                Already registered?{' '}
                <Link to="/login">
                  Click here to log into your account →
                </Link>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Maya Lin"
              required
            />
          </label>

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
            <small>Please enter a valid email address format (e.g. name@domain.com).</small>
          )}
          {isBlockedDomain && (
            <small style={{ color: '#b32b16', fontWeight: 900 }}>
              ⚠️ &quot;@{emailDomain}&quot; is a placeholder or test domain and cannot receive real emails.
            </small>
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
                placeholder="Create a strong password"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          {/* Interactive Password Strength Meter */}
          {password.length > 0 && (
            <div className="password-meter-wrap">
              <div className="password-meter-bar">
                <div
                  className="password-meter-fill"
                  style={{
                    width: `${strength.percent}%`,
                    backgroundColor: strength.color
                  }}
                />
              </div>
              <div className="password-meter-label">
                <span>Password Strength</span>
                <span style={{ color: strength.color }}>{strength.label}</span>
              </div>
            </div>
          )}

          {/* Real-time Password Rules Checklist */}
          <div className="password-rules">
            <div className={`password-rule ${hasMinLength ? 'met' : 'unmet'}`}>
              <span>{hasMinLength ? '✓' : '○'}</span> 8+ characters
            </div>
            <div className={`password-rule ${hasUpper ? 'met' : 'unmet'}`}>
              <span>{hasUpper ? '✓' : '○'}</span> Uppercase letter (A-Z)
            </div>
            <div className={`password-rule ${hasLower ? 'met' : 'unmet'}`}>
              <span>{hasLower ? '✓' : '○'}</span> Lowercase letter (a-z)
            </div>
            <div className={`password-rule ${hasNumber ? 'met' : 'unmet'}`}>
              <span>{hasNumber ? '✓' : '○'}</span> Number (0-9)
            </div>
            <div className={`password-rule ${hasSpecial ? 'met' : 'unmet'}`} style={{ gridColumn: 'span 2' }}>
              <span>{hasSpecial ? '✓' : '○'}</span> Special character (!@#$%^&*)
            </div>
          </div>

          <label>
            Confirm Password
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setTouchedConfirm(true);
                if (error) setError('');
              }}
              placeholder="Re-enter your password"
              required
            />
          </label>
          {touchedConfirm && confirmPassword.length > 0 && (
            <div className={`match-status ${isMatch ? 'match' : 'mismatch'}`}>
              {isMatch ? '✓ Passwords match' : '✕ Passwords do not match'}
            </div>
          )}

          <button
            className={`submit ${isLoading ? 'auth-btn-loading' : ''}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Secure Account...' : 'Create Account & Sign In →'}
          </button>
        </form>

        <p className="switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </section>
  );
};
