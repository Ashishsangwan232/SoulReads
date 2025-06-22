// export default ResendVerification;

import React, { useState } from 'react';
import axios from 'axios';
import '../css/authpage.css';

const ResendVerification = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const handleResend = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const res = await axios.post(
                `${API_URL}/auth/resend-verification`,
                { email }
            );
            setMessage({
                text: res.data.message || 'Verification email sent!',
                type: 'success'
            });
        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong. Try again.';
            setMessage({ text: msg, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="body_log_sig">
            <div className="log_sig_cont">
                <h2>Resend Verification</h2>
                <p>Didn't get your verification email? Enter your email below.</p>
                <form onSubmit={handleResend}>
                    <div className="floating-group">
                        <input
                            type="email"
                            id="resend-email"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="resend-email">Email</label>
                    </div>
                    <button className="btn-log-sig" type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Resend Email'}
                    </button>
                </form>

                {message.text && (
                    <p
                        className={`message ${message.type === 'success' ? 'success' : 'error'}`}
                        aria-live="polite"
                    >
                        {message.text}
                    </p>
                )}
            </div>

            <div className="footer_log_sig">
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default ResendVerification;
