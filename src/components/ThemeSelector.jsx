import React from 'react';
import { AVAILABLE_THEMES } from '../constants/themes';
import { useThemeContext } from '../context/ThemeContext';
import '../styles/ThemeSelector.css';

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <select
      className="theme-selector"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      aria-label="Select theme"
    >
      {AVAILABLE_THEMES.map(theme => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );
};

export default ThemeSelector;