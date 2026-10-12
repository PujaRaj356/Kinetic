import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../core/context/AuthContext';

export const Verify: React.FC = () => {
  const { pendingVerification, verify, resendCode } = useAuth();
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!pendingVerification) {
      navigate('/login');
    }
  }, [pendingVerification, navigate]);

  const handleVerify = () => {
    setError('');
    if (!/^\d{6}$/.test(code)) {
      setError('Enter the 6-digit verification code.');
      return;
    }
    if (!verify(code)) {
      setError('Incorrect code. Demo code: 123456');
      return;
    }
    navigate('/products');
  };

  const handleResend = () => {
    setMessage(`New demo code: ${resendCode()}`);
  };

  return (
    <section className="verify">
      <div className="box">
        <div className="symbol">✓</div>
        <p className="eyebrow">SECOND CHECK</p>
        <h1>Verify.</h1>
        <p>We need one more step before letting you in.</p>
        <div className="demo">
          Demo OTP: <b>123456</b>
        </div>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          inputMode="numeric"
          placeholder="000000"
        />
        <button onClick={handleVerify}>Verify identity →</button>
        {error && <div className="error">{error}</div>}
        <button className="resend" onClick={handleResend}>
          Resend code
        </button>
        {message && <p className="message">{message}</p>}
        <Link to="/login">← Back to login</Link>
      </div>
    </section>
  );
};
