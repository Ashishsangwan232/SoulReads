import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import"./AuthPassword.css";
export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

const API_URL = import.meta.env.VITE_API_URL;

const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      return setMessage({ type: 'error', text: 'Passwords do not match' });
    }

    try {
      const res = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });
      setMessage({ type: 'success', text: res.data.message });
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      setMessage({ type: 'error', text: msg });
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>

      {message.text && (
        <p className={message.type === 'error' ? 'error' : 'success'}>
          {message.text}
        </p>
      )}
    </div>
  );
}
