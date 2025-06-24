import React, { useEffect, useRef, useState } from 'react';
import './DarkModeToggle.css';

const themes = [
  { name: 'default', label: 'Default Light' },
  { name: 'sandstonetheme', label: 'Sandstone 🏜️' },
  { name: 'twilighttheme', label: 'Twilight 🌆' },
  { name: 'oceantheme', label: 'Ocean 🌊' },
  { name: 'auratheme', label: 'Aura 🪄' },
  { name: 'naturegreentheme', label: 'Nature Green 🌿' },
  { name: 'frenchgrayscale', label: 'French Grayscale 🇫🇷' },
  { name: 'rosedusk', label: 'Rose Dusk 🌸' },
  { name: 'sagewood', label: 'Sagewood 🍃' },
  { name: 'rosequartz', label: 'Rose Quartz 💎' },
  { name: 'siennasteel', label: 'Sienna Steel 🧱' },
  { name: 'deepfern', label: 'Deep Fern 🌲' },
  { name: 'graphiteaqua', label: 'Graphite Aqua 🧊' },
  { name: 'soulreads-light', label: 'soulreads-light' },
];

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'default';
  });
  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    themes.forEach(t => document.body.classList.remove(t.name));
    if (theme !== 'default') {
      document.body.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    setShowMenu(false);
  };

  return (
    <div className="theme-toggle-container" ref={containerRef}>
      <span className="material-symbols-outlined" onClick={() => setShowMenu(!showMenu)}>
        menu
      </span>

      {showMenu && (
        <div className="theme-options">
          {themes.map(({ name, label }) => (
            <div
              key={name}
              className={`theme-option ${theme === name ? 'active' : ''}`}
              onClick={() => handleThemeSelect(name)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;