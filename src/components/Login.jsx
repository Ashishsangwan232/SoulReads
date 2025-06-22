import React, { useContext, useState } from 'react';
import ParticleBackground from './ParticleBackground';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Footer from './Footer';
import { useTotalPostCount } from "../context/CountPostContext";
const Login = () => {
  const { refreshMyPosts: refreshpostcount } = useTotalPostCount();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    try {
      const result = await login(email, password, rememberMe);

      if (result.success) {
        setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
        refreshpostcount?.();
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);

      } else {
        const errMsg =
          result.message === 'Email not verified'
            ? 'Please verify your email before logging in. Check your inbox.'
            : result.message || 'Login failed.';
        setMessage({ text: errMsg, type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Something went wrong. Please try again.', type: 'error' });
      console.error('Login error:', err);
    }
  };

  return (
    <>
      <div className="body_log_sig">
        <ParticleBackground />
        <div className="log_sig_cont">
          <h2 className="heading">Welcome Back 👋</h2>
          <form onSubmit={handleLogin}>
            <FloatingInput
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <FloatingInput
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className="fom-opt">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />{' '}
                Remember me
              </label>
              <Link to="/forgot-password">Forgot password?</Link>
              {/* <a href="#">Forgot password?</a> */}
            </div>
            <button className='btn-log-sig' type="submit">Sign In</button>
          </form>

          <div className='botm_log_sig'>

            <p className="log-sig-link">
              Didn’t get the email? <Link to="/resend-verification">Resend</Link>
            </p>
            <p className="log-sig-link">
              New here? <Link to='/register'>Create account</Link>
            </p>
            <p className={`message ${message.type === 'success' ? 'success' : 'error'}`}>
              {message.text}
            </p>
          </div>
        </div>
        <div className='footer_log_sig'>
          <Footer />
        </div>
      </div>
    </>
  );
};

function FloatingInput({ label, type, value, onChange, ...rest }) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="floating-group">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder=" "
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default Login;
