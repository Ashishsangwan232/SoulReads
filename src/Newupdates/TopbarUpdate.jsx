import React from 'react';
import './TopbarUpdate.css';
import { Link } from 'react-router-dom';

const TopbarUpdate = () => {
  return (
    <div className="topbar-update">
      <p>
        🚀 <Link to="/updates">New Features Just Landed — Check What's New!</Link>
      </p>
    </div>
  );
};

export default TopbarUpdate;
