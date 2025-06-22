import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../css/autosave-history.css';
import { extractPlainTextFromSlate } from '../../utils/extractPlainTextFromSlate';

const AutosaveHistory = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [versions, setVersions] = useState([]);

    const userKey = !loading && user
        ? user.id || user.id || user.email || 'anonymous'
        : null;

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            alert("You're not logged in.");
            navigate('/login');
        }
    }, [loading, user, navigate]);

    // Load autosaved versions
    useEffect(() => {
        if (!userKey) return;

        const indexKey = `autosave-${userKey}-index`;
        const savedVersions = JSON.parse(localStorage.getItem(indexKey)) || [];

        const detailed = savedVersions.map(({ key, time }) => {
            try {
                const raw = localStorage.getItem(key);
                if (!raw) return null;

                const data = JSON.parse(raw);
                const plainText = data?.content?.replace(/<[^>]+>/g, ' ').trim() || '';
                const wordCount = plainText ? plainText.split(/\s+/).length : 0;

                return { ...data, key, time, wordCount };
            } catch (err) {
                console.warn(`Corrupted or missing version skipped: ${key}`, err);
                return null;
            }
        }).filter(Boolean);

        setVersions(detailed.sort((a, b) => new Date(b.time) - new Date(a.time)));
    }, [userKey]);

    const handleDelete = (keyToDelete) => {
        if (!userKey) return;
        const indexKey = `autosave-${userKey}-index`;
        const updatedVersions = versions.filter((v) => v.key !== keyToDelete);
        setVersions(updatedVersions);
        localStorage.removeItem(keyToDelete);
        localStorage.setItem(
            indexKey,
            JSON.stringify(updatedVersions.map(({ key, time }) => ({ key, time })))
        );
    };

    const handleRestore = (version) => {
        if (!userKey) return;
        localStorage.setItem(`autosave-${userKey}`, JSON.stringify(version));
        alert('Version restored! Now go back to the writing page.');
        navigate('/writing');
    };

    const handleClearAll = () => {
        const isconfirm =window.confirm("All clear");
        if(!isconfirm)return;
        if (!userKey) return;
        if (!window.confirm('Are you sure you want to delete all autosaved versions?')) return;

        const indexKey = `autosave-${userKey}-index`;
        versions.forEach((v) => localStorage.removeItem(v.key));
        localStorage.removeItem(indexKey);
        setVersions([]);
    };

    const displayName =
        user?.email?.split('@')[0] ||
        'User';

    return (
        <div className="version-history-container">
            <div className='autosave-top'>
                <Link to="/dashboard">← Back to Dashboard</Link>
                <button className="clear-all-btn" onClick={handleClearAll}>
                    Clear All Versions
                </button>

            </div>
            <h2>Autosave History</h2>

            {loading ? (
                <p>Loading...</p>
            ) : versions.length === 0 ? (
                <p>No saved versions found.</p>
            ) : (
                <>
                    <ul className="version-list">
                        {versions.map((v) => (
                            <li key={v.key} className="version-item">
                                <h4>{v.title || 'Untitled Draft'}</h4>
                                <h5>@{displayName}</h5>
                                <p><b>Saved:</b> {new Date(v.time).toLocaleString()}</p>
                                <p><b>Content:</b>{' '}
                                    {extractPlainTextFromSlate(v.content)}
                                </p>
                                <p><b>Words:</b> {v.wordCount}</p>
                                <div className="version-actions">
                                    <button onClick={() => handleRestore(v)}>Restore</button>
                                    <button onClick={() => handleDelete(v.key)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}

        </div>
    );
};

export default AutosaveHistory;
