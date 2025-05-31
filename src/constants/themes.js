// Available themes in the application
export const AVAILABLE_THEMES = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
  { id: 'sepia', name: 'Sepia' },
  { id: 'nord', name: 'Nord' },
  { id: 'solarized-light', name: 'Solarized Light' }
];

// Get theme IDs array for validation
export const THEME_IDS = AVAILABLE_THEMES.map(theme => theme.id);