import { THEME_IDS } from '../constants/themes';

/**
 * Gets the user's preferred theme from localStorage
 * @returns {string|null} The saved theme ID or null if not found
 */
export const getSavedTheme = () => {
  try {
    const savedTheme = localStorage.getItem('git-init-theme');
    return savedTheme && THEME_IDS.includes(savedTheme) ? savedTheme : null;
  } catch (error) {
    console.error('Error reading theme from localStorage:', error);
    return null;
  }
};

/**
 * Gets the system's preferred color scheme
 * @returns {string} 'dark' or 'light'
 */
export const getSystemTheme = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

/**
 * Saves theme preference to localStorage
 * @param {string} theme Theme ID to save
 */
export const saveTheme = (theme) => {
  try {
    if (THEME_IDS.includes(theme)) {
      localStorage.setItem('git-init-theme', theme);
    }
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
};