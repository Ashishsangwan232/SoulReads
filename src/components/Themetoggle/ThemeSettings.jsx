import React, { useEffect, useState } from 'react';
import ThemeToggle from './DarkModeTogglemenu';
import ThemeDropdown from './ThemeDropdown';

const ThemeSettings = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'blackviolet';
  });

  useEffect(() => {
    document.body.classList.remove('soulreads-light', 'blackviolet');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <ThemeDropdown theme={theme} setTheme={setTheme} />
    </>
  );
};

export default ThemeSettings;