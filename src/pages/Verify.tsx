import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../core/context/AuthContext';

export const Verify: React.FC = () => {
  const { pendingVerification, verify, resendCode, sendOtp } = useAuth();
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);

  const initialSentRef = useRef(false);

  // Send code automatically upon reaching the verification screen if not already dispatched
  useEffect(() => {
    if (!pendingVerification?.email) {
      navigate('/login');
      return;
    }

    if (!initialSentRef.current) {
      initialSentRef.current = true;

      if (pendingVerification.codeSent) {
        setStatusMessage(`Security verification code sent to ${pendingVerification.email}`);
        if (pendingVerification.devOtp) {
          setDevOtpHint(pendingVerification.devOtp);
        }
      } else {
        setIsSending(true);
        sendOtp(pendingVerification.email)
          .then((res) => {
            setIsSending(false);
            if (res.ok) {
              setStatusMessage(`Verification code sent to ${pendingVerification.email}`);
              if (res.devMode && res.devOtp) {
                setDevOtpHint(res.devOtp);
              }
            } else {
              setError(res.message || 'Could not send verification email.');
            }
          })
          .catch((err) => {
            setIsSending(false);
            setError('Failed to dispatch verification email: ' + err.message);
          });
      }
    }
  }, [pendingVerification, navigate, sendOtp]);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    const cleanCode = code.trim();
    if (!/^\d{6}$/.test(cleanCode)) {
      setError('Please enter a valid 6-digit verification code.');
      return;
    }

    setIsVerifying(true);
    const result = await verify(cleanCode);
    setIsVerifying(false);

    if (!result.ok) {
      setError(result.message || 'Incorrect verification code. Please check your inbox.');
      return;
    }

    // Role-based destination
    if (result.user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/products');
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || isSending) return;
    setError('');
    setIsSending(true);
    setStatusMessage('Dispatching a fresh code to your inbox...');

    const res = await resendCode();
    setIsSending(false);

    if (res.ok) {
      setStatusMessage(`Fresh 6-digit code sent to ${pendingVerification?.email}`);
      setCooldown(30);
      if (res.devMode && res.devOtp) {
        setDevOtpHint(res.devOtp);
      }
    } else {
      setError(res.message || 'Failed to resend code.');
    }
  };

  return (
    <section className="verify">
      <div className="box">
        <div className="symbol">✉</div>
        <p className="eyebrow">{pendingVerification?.purpose === 'register' ? 'ACCOUNT ACTIVATION' : 'IDENTITY CHECK'}</p>
        <h1 style={{ fontSize: '48px', margin: '14px 0 8px', letterSpacing: '-0.04em' }}>
          {pendingVerification?.purpose === 'register' ? 'Activate.' : 'Verify.'}
        </h1>
        <p style={{ margin: '0 0 16px', color: '#444', lineHeight: 1.4 }}>
          {pendingVerification?.purpose === 'register'
            ? 'Enter the 6-digit verification code sent to confirm your email and activate your account:'
            : 'Enter the 6-digit security code sent to your email:'}
        </p>

        <div
          style={{
            background: '#ffffff',
            border: '2px solid #111',
            padding: '10px 14px',
            marginBottom: '18px',
            fontSize: '14px',
            wordBreak: 'break-all'
          }}
        >
          Recipient: <strong style={{ color: '#111' }}>{pendingVerification?.email || 'your email'}</strong>
        </div>

        {isSending && (
          <div
            style={{
              background: '#fff8db',
              border: '2px solid #111',
              padding: '10px 14px',
              marginBottom: '16px',
              fontSize: '13px',
              fontWeight: 700
            }}
          >
            ⚡ Dispatching email... Please wait.
          </div>
        )}

        {statusMessage && !isSending && (
          <div
            style={{
              background: '#d7ff4f',
              border: '2px solid #111',
              padding: '10px 14px',
              marginBottom: '16px',
              fontSize: '13px',
              fontWeight: 800
            }}
          >
            ✓ {statusMessage}
          </div>
        )}

        {devOtpHint && (
          <div
            style={{
              background: '#e0f2fe',
              border: '2px solid #0284c7',
              padding: '10px 14px',
              marginBottom: '16px',
              fontSize: '13px',
              color: '#0369a1'
            }}
          >
            <strong>Dev Mode Active:</strong> Gmail credentials not yet configured in <code>server/.env</code>.
            <br />
            Console Code: <b>{devOtpHint}</b>
          </div>
        )}

        <form onSubmit={handleVerify}>
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
              if (error) setError('');
            }}
            maxLength={6}
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="000000"
            autoFocus
            disabled={isVerifying}
            style={{ letterSpacing: '0.35em', fontSize: '28px', fontWeight: 900 }}
          />

          <button
            type="submit"
            disabled={isVerifying || code.length !== 6}
            style={{ opacity: isVerifying || code.length !== 6 ? 0.7 : 1 }}
          >
            {isVerifying ? 'Verifying...' : 'Verify identity →'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        <button
          type="button"
          className="resend"
          onClick={handleResend}
          disabled={cooldown > 0 || isSending}
          style={{ cursor: cooldown > 0 || isSending ? 'not-allowed' : 'pointer', opacity: cooldown > 0 ? 0.6 : 1 }}
        >
          {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code to email'}
        </button>

        <Link to="/login" style={{ marginTop: '20px', display: 'inline-block' }}>
          ← Back to login
        </Link>
      </div>
    </section>
  );
};
