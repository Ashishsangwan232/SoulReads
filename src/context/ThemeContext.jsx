import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'blackviolet';
  });

  useEffect(() => {
    document.body.classList.remove('soulreads-light', 'blackviolet');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
