import React, { useEffect, useState } from 'react';
import './DarkModeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'soulreads-light';
  });

  useEffect(() => {
    document.body.classList.remove('soulreads-light', 'blackviolet');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'soulreads-light' ? 'blackviolet' : 'soulreads-light'));
  };

  return (
    <div className="darkmode-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === 'blackviolet'}
          onChange={toggleTheme}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
