import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPassword.css'; 

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(() => {
    const saved = localStorage.getItem('resetCooldown');
    return saved ? parseInt(saved, 10) : 0;
  });

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  // Cooldown Timer
  useEffect(() => {
    if (cooldown <= 0) {
      localStorage.removeItem('resetCooldown');
      clearInterval(timerRef.current);
      return;
    }

    localStorage.setItem('resetCooldown', cooldown);

    timerRef.current = setInterval(() => {
      setCooldown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [cooldown]);

  // Background Password Reset Check
  useEffect(() => {
    if ( cooldown <= 0 ) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(async () => {
      try {
        const res = await axios.post(`${API_URL}/auth/check-reset-status`, { email });
        if (res.data.passwordRecentlyReset) {
          clearInterval(intervalRef.current);
          clearInterval(timerRef.current);
          localStorage.removeItem('resetCooldown');
          navigate('/login', { replace: true });
        }
      } catch (err) {
        console.error('Background check error', err);
      }
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, [email, cooldown, navigate, API_URL]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;

    setLoading(true);
    setMessage({});

    try {
      const statusRes = await axios.post(`${API_URL}/auth/check-reset-status`, { email });
      if (statusRes.data.passwordRecentlyReset) {
        setMessage({
          type: 'error',
          text: 'Password has already been changed. You can request another reset link after 5 minutes if needed.',
        });
        return;
      }

      const res = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      setMessage({ type: 'success', text: res.data.message });

      const expireAt = Math.floor(Date.now() / 1000) + 100;
      localStorage.setItem('resetCooldown', expireAt);
      setCooldown(100);

    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      setMessage({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  // Reset cooldown if email changes
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    if (newEmail !== email) {
      setCooldown(0);
      localStorage.removeItem('resetCooldown');
      clearInterval(timerRef.current);
      clearInterval(intervalRef.current);
    }
    setEmail(newEmail);
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit" disabled={loading || cooldown > 0}>
          {loading ? <span className="spinner" /> : cooldown > 0 ? `Resend in ${cooldown}s` : 'Send Reset Link'}
        </button>
      </form>

      {message.text && (
        <p className={message.type === 'error' ? 'error' : 'success'}>
          {message.text}
        </p>
      )}
    </div>
  );
}
