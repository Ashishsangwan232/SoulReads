import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        gap: '0.75rem',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', margin: 0 }}>404</h1>
      <p style={{ margin: 0 }}>This page doesn't exist.</p>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default NotFound;
