# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2025-06-07

### Added

- Added support for Git command variations to provide more detailed command options.
- Introduced new Git command modules covering core configuration, commits, and staging.
- Enhanced UI for command items with improved focus, copy feedback, and category display.

### Changed

- Refactored Git command data structure for better organization and easier expansion.
- Improved scripts and components for handling command variations and filtering.

### Fixed

- Various UI and interaction improvements related to command listing and clipboard functionality.

## [1.1.0] - 2025-05-31

### Added

- ThemeSelector component for users to select their preferred theme
- Multiple themes: light, dark, sepia, nord, and solarized-light
- Theme persistence across sessions using localStorage
- System theme detection for automatic light/dark mode
- UpdateNotification component to inform users of available updates
- Service worker for offline capabilities and update handling
- PWA support for installable web app experience

### Changed

- Refactored App component to utilize ThemeContext
- Enhanced CommandItem and CommandList components with new styles
- Updated SearchBar component with improved styling and structure
- Separated CSS into component-specific files for better maintainability
- Improved accessibility for theme selector and other components

### Fixed

- CSS styling issues with proper theme variable implementation
- Mobile responsiveness improvements

## [1.0.0] - 2025-05-30

### Added

- Initial release with basic Git command search functionality
- Fuzzy search using Fuse.js
- Command categories for filtering
- Copy to clipboard functionality
- Keyboard navigation support
