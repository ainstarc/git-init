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

// Category color map
export const CATEGORY_COLORS = {
  coreConfig: "#6c63ff",
  staging: "#00b894",
  commits: "#fdcb6e",
  branching: "#0984e3",
  remotes: "#e17055",
  merging: "#00b8d4",
  tagging: "#a29bfe",
  inspection: "#636e72",
  workingTree: "#00cec9",
  advancedTools: "#b2bec3",
};

// Category definitions
export const CATEGORIES = [
  { id: "all", name: "All Commands" },
  { id: "coreConfig", name: "Core Config" },
  { id: "staging", name: "Staging" },
  { id: "commits", name: "Commits" },
  { id: "branching", name: "Branching" },
  { id: "remotes", name: "Remotes" },
  { id: "merging", name: "Merging" },
  { id: "tagging", name: "Tagging" },
  { id: "inspection", name: "Inspection" },
  { id: "workingTree", name: "Working Tree" },
  { id: "advancedTools", name: "Advanced Tools" },
];