// // components/DarkModeToggle.jsx
// import React, { useEffect, useState } from 'react';
// import './DarkModeToggle.css';

// const DarkModeToggle = () => {
//   const [isDark, setIsDark] = useState(() =>
//     localStorage.getItem('theme') === 'dark'
//   );

//   useEffect(() => {
//     const classAction = isDark ? 'add' : 'remove';
//     document.body.classList[classAction]('dark');
//     localStorage.setItem('theme', isDark ? 'dark' : 'light');
//   }, [isDark]);

//   const toggleTheme = () => setIsDark(prev => !prev);

//   return (
//     <label className="switch">
//       <input
//         type="checkbox"
//         checked={isDark}
//         onChange={toggleTheme}
//       />
//       <span className="slider">
//         <span className="icon">{isDark ? '🌙' : '☀️'}</span>
//       </span>
//     </label>
//   );
// };

// export default DarkModeToggle;







// // components/ThemeToggle.jsx
// import React, { useEffect, useState } from 'react';
// import './DarkModeToggle.css';

// const themes = [
//   { name: 'default', label: '☀️' },
//   { name: 'sandstonetheme', label: '🏜️' },
//   { name: 'twilighttheme', label: '🌆' },
//   { name: 'oceantheme', label: '🌊' },
//   { name: 'auratheme', label: '🪄' },
//   { name: 'naturegreentheme', label: '🌿' },
// ];

// const ThemeToggle = () => {
//   const [themeIndex, setThemeIndex] = useState(() => {
//     const savedTheme = localStorage.getItem('theme') || 'default';
//     const index = themes.findIndex(t => t.name === savedTheme);
//     return index === -1 ? 0 : index;
//   });

//   useEffect(() => {
//     // Remove all theme classes
//     themes.forEach(({ name }) => document.body.classList.remove(name));
//     // Apply selected theme (except default)
//     const currentTheme = themes[themeIndex].name;
//     if (currentTheme !== 'default') {
//       document.body.classList.add(currentTheme);
//     }
//     localStorage.setItem('theme', currentTheme);
//   }, [themeIndex]);

//   const toggleTheme = () => {
//     setThemeIndex(prev => (prev + 1) % themes.length);
//   };

//   return (
//     <label className="switch" title={`Theme: ${themes[themeIndex].name}`}>
//       <input type="checkbox" onChange={toggleTheme} />
//       <span className="slider">
//         <span className="icon">{themes[themeIndex].label}</span>
//       </span>
//     </label>
//   );
// };

// export default ThemeToggle;


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
