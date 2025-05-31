import React, { createContext, useContext } from 'react';
import { useTheme } from '../hooks/useTheme';

// Create theme context
const ThemeContext = createContext();

/**
 * Theme provider component
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use the theme context
 */
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};