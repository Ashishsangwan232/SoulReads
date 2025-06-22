import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/component css/register.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './signup.css';
const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState({ text: '', color: '' });
    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const handlechange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setMessage({ text: 'Password do not match.', color: 'crimson' });
            return;
        }
        try {
            // for connection with backend
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
            )
            setUser(response.data.user); // ✅ Update global context
            setMessage({ text: response.data.message || 'registration successful.  redirecting...', color: 'green' });

            setForm({ name: '', email: '', password: '', confirmPassword: '' });

            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            const errMsg = error.response?.data?.message || 'Registration failed. Please try again.';

            setMessage({ text: errMsg, color: 'crimson' });
            console.error('Registration error:', error.response?.data);
        };
    };
    return (
        <>
            <div className="register-container">
                <h2>Create an Account</h2>
                <p>Begin your journey of thoughts, stories, and reflections.</p>

                <form id="registerForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handlechange}
                        required />

                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handlechange}
                        required />

                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handlechange}
                        required />

                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handlechange}
                        required />

                    <button type="submit">Register</button>
                </form>
                <p className="redirect-msg">
                    Already have an account?{' '}
                    <Link to="/login">Sign In</Link>
                </p>
                <p className={`message ${message.color === 'green' ? 'success' : 'error'}`}>
                    {message.text}
                </p>
            </div>
        </>
    );
};

export default Register;