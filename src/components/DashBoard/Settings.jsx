import React, { useContext, useEffect, useState } from 'react';
import './settings.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Settings = ({ setSettingtab }) => {
    const { user, updateprofile, updateprofilepic } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePicKey, setProfilePicKey] = useState('');
    const [status, setStatus] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    const API_URL = import.meta.env.VITE_API_URL;

    const avatarOptions = [
        { key: 'oggy', label: 'Oggy', ext: 'jpg' },
        { key: 'oggy2', label: 'Oggy2', ext: 'jpg' },
        { key: 'Doremon', label: 'doremon', ext: 'webp' },
        { key: 'shinchan', label: 'Shinchan', ext: 'webp' },
    ];

    const getStrengthLabel = (password) => {
        const lengthCheck = password.length >= 6;
        const upperCheck = /[A-Z]/.test(password);
        const lowerCheck = /[a-z]/.test(password);
        const numberCheck = /\d/.test(password);

        const score = [lengthCheck, upperCheck, lowerCheck, numberCheck].filter(Boolean).length;

        if (score <= 1) return 'Weak';
        if (score === 2) return 'Medium';
        if (score === 3) return 'Strong';
        if (score === 4) return 'Perfect';
    };
    console.log('pic: ', user.profilePicKey);
    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setPhoneNumber(user.phoneNumber || '');
            setProfilePicKey(user.profilePicKey || '');
        }
    }, [user]);

    const handleSave = async (e) => {
        e.preventDefault();

        const noProfileChanges =
            username === user.username &&
            phoneNumber === (user.phoneNumber || '');

        const noProfilePicChanges =
            profilePicKey === (user.profilePicKey || '');

        const noPasswordChanges =
            !oldPassword && !newPassword && !confirmPassword;

        if (noProfileChanges && noPasswordChanges && noProfilePicChanges) {
            setStatus('No changes made.');
            setTimeout(() => setStatus(''), 2500);
            return;
        }

        // Handle password update
        if (!noPasswordChanges) {
            if (newPassword !== confirmPassword) {
                return setMessage({ type: 'error', text: "Passwords don't match." });
            }

            const isLengthValid = newPassword.length >= 6;
            const hasCapital = /[A-Z]/.test(newPassword);
            const hasNumber = /\d/.test(newPassword);

            if (!isLengthValid || !hasCapital || !hasNumber) {
                return setMessage({
                    type: 'error',
                    text: 'Password must be at least 6 characters, include a capital letter and a number.'
                });
            }

            try {
                const res = await axios.post(
                    `${API_URL}/auth/change-password`,
                    { oldPassword, newPassword },
                    { withCredentials: true }
                );
                setMessage({ type: 'success', text: res.data.message });
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } catch (err) {
                const msg = err.response?.data?.message || 'Error changing password';
                setMessage({ type: 'error', text: msg });
            }
        }

        // Handle profile update if changed
        if (!noProfileChanges) {
            const result = await updateprofile(username, phoneNumber);
            if (result.success) {
                setStatus('Profile updated successfully!');
            } else {
                setStatus(result.message || 'Update failed');
            }
        }
        if (!noProfilePicChanges) {
            const result = await updateprofilepic(profilePicKey);
            if (result.success) {
                setStatus('Profile Pic updated successfully!');
            } else {
                setStatus(result.message || 'Update failed pic');
            }
        }

        setTimeout(() => {
            setStatus('');
            setMessage({ type: '', text: '' });
        }, 3000);
    };

    const handleDiscard = () => {
        if (user) {
            setUsername(user.username || '');
            setPhoneNumber(user.phoneNumber || '');
            setProfilePicKey(user.profilePicKey || '');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setStatus('Changes discarded.');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return (
        <div className="settings-container">
            <button className='settings-back-btn' onClick={() => setSettingtab(false)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="40" y1="12" x2="9" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                </svg>
            </button>
            <div className='Settings-head-name'>
                <h1>Settings</h1>
                <div className='Settings-saveanddiscard-btn'>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleDiscard}>Discard</button>
                </div>
            </div>

            <hr />
            <p className="last-updated">
                Last updated: {new Date(user.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                })}
            </p>

            {status && <p className='status-message'>{status}</p>}
            {message.text && (
                <p className={message.type === 'error' ? 'error' : 'success'}>
                    {message.text}
                </p>
            )}

            {/* Username */}
            <div className="settings-section">
                <h4>Update Username</h4>
                <div className="settings-field">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>
            <div className="settings-section">
                <h4>Profile Image</h4>
                <div className="settings-field">
                    <label>Select Avatar</label>
                    <div className="avatar-selector">
                        {avatarOptions.map((avatar) => (
                            <img
                                key={avatar.key}
                                src={`/avatar/${avatar.key}.${avatar.ext}`}  // change URL as needed
                                alt={avatar.label}
                                title={avatar.label}
                                onClick={() => setProfilePicKey(avatar.key)}
                                className={`avatar-option ${profilePicKey === avatar.key ? 'selected' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Password Update */}
            <div className="settings-section ">
                <h4>Update Password</h4>
                <div className="settings-field">
                    <label>Old Password</label>
                    <input
                        type="password"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="settings-field setting-password">
                    <label>New Password</label>
                    <div className='setting-passwordinside'>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {newPassword && (
                            <p className={`strength strength-${getStrengthLabel(newPassword).toLowerCase()}`}>
                                Strength: {getStrengthLabel(newPassword)}
                            </p>
                        )}
                    </div>
                </div>
                <div className="settings-field">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>

            {/* Theme (non-functional placeholder) */}
            <div className="settings-section">
                <h4>Default Theme</h4>
                <div className="settings-field">
                    <label>Choose Theme</label>
                    <select name="Theme" id="Theme">
                        <option value="1">Dark</option>
                        <option value="2">Light</option>
                    </select>
                </div>
            </div>

            {/* Phone Number */}
            <div className="settings-section">
                <h4>Phone Number</h4>
                <div className="settings-field">
                    <label>Number</label>
                    <input
                        type="tel"
                        placeholder="01234-56789"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;
