import { useState, useEffect } from 'react';
import { getSavedTheme, getSystemTheme, saveTheme } from '../utils/themeUtils';

/**
 * Custom hook for theme management
 * @returns {[string, function]} Theme state and setter function
 */
export const useTheme = () => {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    return getSavedTheme() || getSystemTheme();
  });

  // Apply theme to document and save to localStorage when changed
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      // Only update if no user preference is saved
      if (!getSavedTheme()) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add listener for theme changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // For older browsers
      mediaQuery.addListener(handleSystemThemeChange);
    }
    
    return () => {
      // Clean up
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  return [theme, setTheme];
};