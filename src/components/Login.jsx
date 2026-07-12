import React, { useContext, useState } from 'react';
import ParticleBackground from './ParticleBackground';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Footer from './Footer';
import { useTotalPostCount } from "../context/CountPostContext";
import { Eye, EyeOff } from 'lucide-react';
import * as S from './Auth.styles';

const Login = () => {
  const { refreshMyPosts: refreshpostcount } = useTotalPostCount();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setMessage({ text: '', type: '' });
    setSubmitting(true);

    try {
      const result = await login(email, password, rememberMe);

      if (result.success) {
        setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
        refreshpostcount?.();
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);

      } else {
        // Match loosely rather than an exact string: the backend's actual message
        // is "Please verify your email before logging in." (see API_REFERENCE.md),
        // which is already clear -- so we just pass it through as-is instead of
        // (previously) comparing against a string the backend never sends.
        setMessage({ text: result.message || 'Login failed.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Something went wrong. Please try again.', type: 'error' });
      console.error('Login error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <S.AuthBody>
        <ParticleBackground />
        <S.AuthContainer>
          <h2>Welcome Back 👋</h2>
          <form onSubmit={handleLogin}>
            <FloatingInput
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              label="Password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              show={showPassword}
              toggle={() => setShowPassword(prev => !prev)}
              required
            />
            <S.FormOptions>
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />{' '}
                Remember me
              </label>
              <Link to="/forgot-password">Forgot password?</Link>
            </S.FormOptions>
            <S.AuthButton type="submit" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Sign In'}
            </S.AuthButton>
          </form>

          <div style={{ marginTop: '1rem' }}>
            <S.RedirectLink>
              Didn’t get the email? <Link to="/resend-verification">Resend</Link>
            </S.RedirectLink>
            <S.RedirectLink style={{ marginTop: '0.5rem' }}>
              New here? <Link to='/register'>Create account</Link>
            </S.RedirectLink>
            {message.text && (
              <S.Message
                role="alert"
                aria-live="polite"
                className={message.type === 'success' ? 'success' : 'error'}
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

function FloatingInput({ label, type, value, onChange, ...rest }) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <S.FloatingGroup>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder=" "
        {...rest}
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

export default Login;
