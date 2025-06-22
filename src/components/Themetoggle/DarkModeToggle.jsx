// components/ThemeToggle.jsx
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    // Clear existing theme classes
    themes.forEach(t => document.body.classList.remove(t.name));
    if (theme !== 'default') {
      document.body.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="theme-toggle-container">
      <select value={theme} onChange={handleChange} className="theme-selector">
        {themes.map(({ name, label }) => (
          <option key={name} value={name}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeToggle;
