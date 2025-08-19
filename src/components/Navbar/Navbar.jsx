// // src/components/Navbar.js
// import React, { useEffect, useContext, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import './Navbar.css';
// import { AuthContext } from '../../context/AuthContext';
// import ImageDropdown from './ImageDropdown';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import DarkModeTogglemenu from '../Themetoggle/DarkModeTogglemenu';
// import Logobook from './Logobook';
// import Smallscreennav from './Smallscreennav';

// function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
//   const isWritingPage = location.pathname === '/writing';

//   const { user } = useContext(AuthContext);

//   const displayName = user?.user?.username
//     ? user.user.username.split(' ')[0]
//     : user?.username?.split(' ')[0] || '';

//   // Init AOS
//   useEffect(() => {
//     AOS.init({
//       once: false,
//       easing: 'ease-in-out',
//     });
//   }, []);

//   // Refresh AOS on route change
//   useEffect(() => {
//     AOS.refresh();
//   }, [location.pathname]);



//   return (
//     <nav className={`navbar ${isWritingPage ? 'writingnavbar' : ''}`}>
//       <div className="logo" data-aos="fade-down" data-aos-duration="1000">
//         <Logobook />
//         <p>SoulReads</p>
//       </div>

//       <div className="nav-links">
//         <Link
//           to="/"
//           className={`aos-link ${location.pathname === '/' ? 'active' : ''}`}
//           data-aos="fade-down"
//           data-aos-duration="800"
//         >
//           <span className="material-symbols-outlined">Home</span>
//           <p>Home</p>
//         </Link>
//         <Link
//           to="/explore"
//           className={`aos-link ${location.pathname === '/explore' ? 'active' : ''}`}
//           data-aos="fade-down"
//           data-aos-duration="1000"
//         >
//           <span className="material-symbols-outlined">Browse</span>
//           <p>Explore</p>
//         </Link>
//         <Link
//           to="/about"
//           className={`aos-link ${location.pathname === '/about' ? 'active' : ''}`}
//           data-aos="fade-down"
//           data-aos-duration="1100"
//         ><span className="material-symbols-outlined">info</span>
//           <p>About</p>
//         </Link>
//       </div>

//       {!isAuthPage && (
//         user ? (
//           <div
//             className="user-actions"
//             data-aos="fade-down"
//             data-aos-anchor-placement="center-bottom"
//           >
//             <Link to="/dashboard">
//               <span className="user-name">Welcome back,</span>
//               <p>{displayName}</p>
//             </Link>
//             <ImageDropdown />
//             <div className='DarkModetoggle'>
//               <DarkModeTogglemenu dash={false} />
//             </div>
//           </div>
//         ) : (
//           <div className='User-login-handle'>
//             <button
//               className="login-btn"
//               onClick={() => navigate('/login')}
//               data-aos="zoom-in"
//               data-aos-duration="800"
//             >
//               Login
//             </button>
//             <button
//               className="signup-btn"
//               onClick={() => navigate('/register')}
//               data-aos="zoom-in"
//               data-aos-duration="800"
//             >
//               Sign up
//             </button>
//             <div className='DarkModetoggle'>
//               <DarkModeTogglemenu dash={false} />
//             </div>
//           </div>

//         )
//       )}
//     </nav>
//   );
// }

// export default Navbar;


// src/components/Navbar.js
import React, { useEffect, useContext, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../../context/AuthContext';
import ImageDropdown from './ImageDropdown';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DarkModeTogglemenu from '../Themetoggle/DarkModeTogglemenu';
import Logobook from './Logobook';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isWritingPage = location.pathname === '/writing';
  const displayName = user?.user?.username
    ? user.user.username.split(' ')[0]
    : user?.username?.split(' ')[0] || '';

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Init AOS
  useEffect(() => {
    AOS.init({ once: false, easing: 'ease-in-out' });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className={`navbar ${isWritingPage ? 'writingnavbar' : ''}`}>
      <div className="logo" data-aos="fade-down" data-aos-duration="1000">
        <Logobook />
        <p>SoulReads</p>
      </div>



      {/* Normal Nav Links for large screens */}
      <div className="nav-links large-screen">
        <Link to="/" className={`aos-link ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="material-symbols-outlined">Home</span>
          <p>Home</p>
        </Link>
        <Link to="/explore" className={`aos-link ${location.pathname === '/explore' ? 'active' : ''}`}>
          <span className="material-symbols-outlined">Browse</span>
          <p>Explore</p>
        </Link>
        <Link to="/about" className={`aos-link ${location.pathname === '/about' ? 'active' : ''}`}>
          <span className="material-symbols-outlined">info</span>
          <p>About</p>
        </Link>
      </div>

      {/* User Actions */}
      {!isAuthPage && (
        user ? (
          <div className="user-actions">
            <div className='user-details-nav'>
              <Link to="/dashboard">
                <span className="user-name">Welcome back,</span>
                <p>{displayName}</p>
              </Link>
              <ImageDropdown />
            </div>
            {/* Hamburger for small screens */}
            <div className='DarkModetoggle'>
              <DarkModeTogglemenu dash={false} />
            </div>
            <div
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent closing immediately
                setMenuOpen((prev) => !prev);
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
          <div className='User-login-handle'>
            <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
            <button className="signup-btn" onClick={() => navigate('/register')}>Sign up</button>
            {/* Hamburger for small screens */}
            <div
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent closing immediately
                setMenuOpen((prev) => !prev);
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className='DarkModetoggle'>
              <DarkModeTogglemenu dash={false} />
            </div>
          </div>
        )
      )}
      {/* Slide Menu for small screens */}
      {menuOpen && (
        <div className="small-menu" ref={menuRef}>
          {/* <div className='DarkModetoggle'>
            <DarkModeTogglemenu dash={false} />
          </div>   */}
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/explore" onClick={() => setMenuOpen(false)}>Explore</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <div className='user-details-nav-smallscreen'>
            <Link to="/dashboard">
              <span className="user-name">Welcome back,</span>
              <p>{displayName}</p>
            </Link>
            <ImageDropdown />
          </div>
        </div>
      )}

    </nav>
  );
}

export default Navbar;

