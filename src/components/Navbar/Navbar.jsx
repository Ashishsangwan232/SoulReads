// src/components/Navbar.js
import React, { useEffect, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../../context/AuthContext';
import ImageDropdown from './ImageDropdown';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DarkModeToggle from '../Themetoggle/DarkModeToggle';
import DarkModeTogglemenu from '../Themetoggle/DarkModeTogglemenu';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isWritingPage = location.pathname === '/writing';

  const { user } = useContext(AuthContext);

  const displayName = user?.user?.username
    ? user.user.username.split(' ')[0]
    : user?.username?.split(' ')[0] || '';

  // Init AOS
  useEffect(() => {
    AOS.init({
      // duration: 2500,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  // Refresh AOS on route change
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);



  return (
    <nav className={`navbar ${isWritingPage ? 'writingnavbar' : ''}`}>

      <div className="logo" data-aos="fade-down" data-aos-duration="1000">
        <img src="/logo/logobook2.svg" alt="logo" />
        <p>SoulReads</p>
      </div>

      <div className='nav-links-smallerscreen'>
        <div className='DarkModetogglemenu'>
          <DarkModeTogglemenu dash={false} />
        </div>
        <div className="nav-links">
          <Link
            to="/"
            className={`aos-link ${location.pathname === '/' ? 'active' : ''}`}
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <span className="material-symbols-outlined">Home</span>
            <p>Home</p>
          </Link>
          <Link
            to="/explore"
            className={`aos-link ${location.pathname === '/explore' ? 'active' : ''}`}
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <span className="material-symbols-outlined">Browse</span>
            <p>Explore</p>
          </Link>
          <Link
            to="/about"
            className={`aos-link ${location.pathname === '/about' ? 'active' : ''}`}
            data-aos="fade-down"
            data-aos-duration="1100"
          ><span className="material-symbols-outlined">info</span>
            <p>About</p>
          </Link>
          {/* <Link
            to="/read-book"
            className={`aos-link ${location.pathname === '/about' ? 'active' : ''}`}
            data-aos="fade-down"
            data-aos-duration="1100"
          >
            <p>Bookpage</p>
          </Link> */}
          <div className='DarkModetoggle'>
            <DarkModeTogglemenu dash={false} />
          </div>
        </div>
      </div>
      {!isAuthPage && (
        user ? (
          <div
            className="user-actions"
            data-aos="fade-down"
            data-aos-anchor-placement="center-bottom"
          >
            <Link to="/dashboard">
              <span className="user-name">Hi, {displayName}</span>
            </Link>
            <ImageDropdown />
          </div>
        ) : (
          <div className='User-login-handle'>
            <button
              className="login-btn"
              onClick={() => navigate('/login')}
              data-aos="zoom-in"
              data-aos-duration="800"
            >
              Login
            </button>
            <button
              className="signup-btn"
              onClick={() => navigate('/register')}
              data-aos="zoom-in"
              data-aos-duration="800"
            >
              Sign up
            </button>
          </div>

        )
      )}

    </nav>
  );
}

export default Navbar;

