import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { getErrorMessage } from '../services/api';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground';
import { Eye, EyeOff } from 'lucide-react';
import * as S from './Auth.styles';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState({ text: '', color: '' });
  const navigate = useNavigate();

  const handlechange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (form.password !== form.confirmPassword) {
      setMessage({ text: 'Passwords do not match.', color: 'crimson' });
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.post('/auth/signup', {
        username: form.name,
        email: form.email,
        password: form.password,
      });

      setMessage({
        text: response.data.message || 'Registered successfully. Please check your email to verify your account.',
        color: 'green',
      });

      setForm({ name: '', email: '', password: '', confirmPassword: '' });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setMessage({ text: getErrorMessage(error, 'Registration failed. Please try again.'), color: 'crimson' });
      console.error('Registration error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <S.AuthBody>
        <ParticleBackground />
        <S.AuthContainer>
          <h2>Create an Account</h2>
          <p>Begin your journey of thoughts, stories, and reflections.</p>

          <form id="registerForm" onSubmit={handleSubmit}>
            <FloatingInput
              label="Full Name"
              type="text"
              id="name"
              value={form.name}
              onChange={handlechange}
              required
            />
            <FloatingInput
              label="Email"
              type="email"
              id="email"
              value={form.email}
              onChange={handlechange}
              required
            />
            <PasswordInput
              label="Password"
              id="password"
              value={form.password}
              onChange={handlechange}
              show={showPassword}
              toggle={() => setShowPassword(prev => !prev)}
              required
            />
            <PasswordInput
              label="Confirm Password"
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={handlechange}
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword(prev => !prev)}
              required
            />

            <S.AuthButton type="submit" disabled={submitting}>
              {submitting ? 'Registering...' : 'Register'}
            </S.AuthButton>
          </form>

          <div style={{ marginTop: '1rem' }}>
            <S.RedirectLink>
              Already have an account? <Link to="/login">Login</Link>
            </S.RedirectLink>
            {message.text && (
              <S.Message
                role="alert"
                aria-live="polite"
                className={message.color === 'green' ? 'success' : 'error'}
              >
                {message.text}
              </S.Message>
            )}
          </div>
        </S.AuthContainer>
        <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <Footer />
        </div>
      </S.AuthBody>
    </>
  );
};

function FloatingInput({ label, type, id, value, onChange, required }) {
  return (
    <S.FloatingGroup>
      <input
        type={type}
        id={id}
        placeholder=" "
        value={value}
        onChange={onChange}
        required={required}
      />
      <label htmlFor={id}>{label}</label>
    </S.FloatingGroup>
  );
}

function PasswordInput({ label, id, value, onChange, show, toggle, required }) {
  return (
    <S.FloatingGroup>
      <input
        type={show ? 'text' : 'password'}
        id={id}
        placeholder=" "
        value={value}
        onChange={onChange}
        required={required}
      />
      <label htmlFor={id}>{label}</label>
      <S.PasswordToggle
        as="button"
        type="button"
        onClick={toggle}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </S.PasswordToggle>
    </S.FloatingGroup>
  );
}

export default Register;
