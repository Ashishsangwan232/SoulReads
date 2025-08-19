import React from 'react';
import { Link } from 'react-router-dom';
import './Smallscreennav.css';

const Smallscreennav = () => {
  return (
    <div className='Smallscreennav-navbar'>
      <ul className='nav-links-smallscreen'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/explore">Explore</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </div>
  );
}

export default Smallscreennav;
