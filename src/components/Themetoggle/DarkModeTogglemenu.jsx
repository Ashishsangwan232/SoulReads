// import React, { useEffect, useState } from 'react';
// import './DarkModeToggle.css';

// const ThemeToggle = () => {
//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem('theme') || 'blackviolet';
//   });

//   useEffect(() => {
//     document.body.classList.remove('soulreads-light', 'blackviolet');
//     document.body.classList.add(theme);
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prev => (prev === 'soulreads-light' ? 'blackviolet' : 'soulreads-light'));
//   };

//   return (
//     <div className="darkmode-toggle">
//       <label className="switch">
//         <input
//           type="checkbox"
//           checked={theme === 'blackviolet'}
//           onChange={toggleTheme}
//         />
//         <span className="slider"></span>
//       </label>
//     </div>
//   );
// };

// export default ThemeToggle;

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './DarkModeToggle.css';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

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


// import React from "react";
// import { useTheme } from "../../context/ThemeContext";
// import { Sun, Moon } from "lucide-react"; // lightweight outline icons
// import "./DarkModeToggle.css";

// const ThemeToggle = () => {
//   const { theme, setTheme } = useTheme();

//   const toggleTheme = () => {
//     setTheme((prev) =>
//       prev === "soulreads-light" ? "blackviolet" : "soulreads-light"
//     );
//   };

//   return (
//     <button
//       className="darkmode-btn"
//       onClick={toggleTheme}
//       aria-label="Toggle dark mode"
//     >
//       {theme === "soulreads-light" ? (
//         <Sun className="icon sun-icon" size={20} />
//       ) : (
//         <Moon className="icon moon-icon" size={20} />
//       )}
//     </button>
//   );
// };

// export default ThemeToggle;
