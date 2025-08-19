import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeDropdown = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="settings-section">
      <h4>Default Theme</h4>
      <div className="settings-field">
        <label>Choose Theme</label>
        <select name="Theme" id="Theme" value={theme} onChange={handleChange}>
          <option value="blackviolet">Dark</option>
          <option value="soulreads-light">Light</option>
        </select>
      </div>
    </div>
  );
};

export default ThemeDropdown;
