// import React, { useEffect, useState } from 'react';
// import './userprofile.css';
// import axios from 'axios';

// const UserProfile = ({ userId, onClose }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const API_URL = import.meta.env.VITE_API_URL;

//   console.log('userprofile id:', userId);
//   useEffect(() => {
//     if (!userId) return;

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/user/profile/${userId}`);
//         setUser(res.data);
//       } catch (err) {
//         console.error('UserProfile fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   if (loading) return <div className="popup-loading">Loading...</div>;
//   if (!user) return <div className="popup-loading">User not found.</div>;

//   return (
//     <div className="userprofile-container">
//       <div className="userprofile-card">

//         <div className="userprofile-close-btn">
//           <span className="material-symbols-outlined" onClick={() => onClose()}>
//             close
//           </span>

//         </div>

//         <div className="userprofile-details">
//           <div className="userprofile-name">
//             <p>{user.username}</p>
//             <h5>Bio</h5>
//           </div>
//           <img
//             src={user.profilePicture || '/default-avatar.png'}
//             alt="Profile"
//           />
//         </div>

//         <div className="userprofile-other-details">
//           <h5>@{user.username}</h5>
//         </div>

//         <div className="userprofile-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>Posts</th>
//                 <th>Likes</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{user.postCount}</td>
//                 <td>{user.totalLikes ?? 0}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="userprofile-footer">
//           <p>SoulReads</p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default UserProfile;







import React, { useEffect, useState } from 'react';
import './userprofile.css';
import axios from 'axios';

const UserProfile = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Track error status
  const API_URL = import.meta.env.VITE_API_URL;

  // console.log('userprofile id:', userId);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      setError('User not found');
      setLoading(false);
      return;
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/profile/${userId}`);
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
            <span className="material-symbols-outlined" onClick={onClose}>
              close
            </span>
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
          <span className="material-symbols-outlined" onClick={onClose}>
            close
          </span>
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
