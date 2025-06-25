import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './signup.css';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground';
import { Eye, EyeOff } from 'lucide-react'; // Lucide icons

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const [message, setMessage] = useState({ text: '', color: '' });
    const { setUser } = useContext(AuthContext); // Keep this for future login use
    const navigate = useNavigate();

    const handlechange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setMessage({ text: 'Passwords do not match.', color: 'crimson' });
            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/auth/signup`,
                {
                    username: form.name,
                    email: form.email,
                    password: form.password,
                },
                {
                    withCredentials: true,
                }
            );

            // ✅ DO NOT log user in before verification
            setMessage({
                text: response.data.message || 'Registered successfully. Please check your email to verify your account.',
                color: 'green',
            });

            setForm({ name: '', email: '', password: '', confirmPassword: '' });

            setTimeout(() => {
                navigate('/login');
            }, 3000); // Redirect after 3 seconds
        } catch (error) {
            const errMsg = error.response?.data?.message || 'Registration failed. Please try again.';
            setMessage({ text: errMsg, color: 'crimson' });
            console.error('Registration error:', error.response?.data);
        }
    };

    return (
        <>
            <div className='body_log_sig'>
                <ParticleBackground />
                <div className="log_sig_cont">
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
                        {/* <FloatingInput
                            label="Password"
                            type="password"
                            id="password"
                            value={form.password}
                            onChange={handlechange}
                            required
                        />
                        <FloatingInput
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handlechange}
                            required
                        /> */}
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

                        <button className='btn-log-sig' type="submit">Register</button>
                    </form>

                    {/* <p className="log-sig-link">
                            Didn’t get the email? <Link to="/resend-verification">Resend</Link>
                        </p> */}
                    <div className='botm_log_sig'>
                        <p className="log-sig-link">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                        <p className={`message ${message.color === 'green' ? 'success' : 'error'}`}>
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

function FloatingInput({ label, type, id, value, onChange, required }) {
    return (
        <div className="floating-group">
            <input
                type={type}
                id={id}
                placeholder=" "
                value={value}
                onChange={onChange}
                required={required}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}
function PasswordInput({ label, id, value, onChange, show, toggle, required }) {
    return (
        <div className="floating-group password-group">
            <input
                type={show ? 'text' : 'password'}
                id={id}
                placeholder=" "
                value={value}
                onChange={onChange}
                required={required}
            />
            <label htmlFor={id}>{label}</label>
            <span className="password-toggle" onClick={toggle}>
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
        </div>
    );
}



export default Register;
