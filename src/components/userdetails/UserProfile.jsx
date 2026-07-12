import React, { useEffect, useState } from 'react';
import './userprofile.css';
import api from '../../services/api';

const UserProfile = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Track error status

  useEffect(() => {
    if (!userId) {
      setUser(null);
      setError('User not found');
      setLoading(false);
      return;
    };

    const fetchUser = async () => {
      try {
        const res = await api.get(`/user/profile/${userId}`);
        setUser(res.data);
        setError(null); // Clear error if successful
      } catch (err) {
        console.error('UserProfile fetch error:', err);
        setUser(null);
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (loading) return <div className="popup-loading">Loading...</div>;

  if (error) {
    return (
      <div className="userprofile-container">
        <div className="userprofile-card">
          <div className="userprofile-close-btn">
            <button type="button" className="material-symbols-outlined userprofile-close-icon" onClick={onClose} aria-label="Close profile">
              close
            </button>
          </div>
          <div className="userprofile-details">
            <p style={{ textAlign: 'center', margin: '2rem 0' }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null; // Shouldn't happen, but safe fallback

  return (
    <div className="userprofile-container">
      <div className="userprofile-card">

        <div className="userprofile-close-btn">
          <button type="button" className="material-symbols-outlined userprofile-close-icon" onClick={onClose} aria-label="Close profile">
            close
          </button>
        </div>

        <div className="userprofile-details">
          <div className="userprofile-name">
            <p>{user.username}</p>
            <h5>Bio</h5>
          </div>
          <img
            src={user.profilePicture || '/default-avatar.png'}
            alt="Profile"
          />
        </div>

        <div className="userprofile-other-details">
          <h5>@{user.username}</h5>
        </div>
        

        <div className="userprofile-table">
          <table>
            <thead>
              <tr>
                <th>Posts</th>
                <th>Likes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.postCount}</td>
                <td>{user.totalLikes ?? 0}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="userprofile-footer">
          <p>SoulReads</p>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
