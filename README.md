# git-init: The Ultimate Git Command Search & Reference

[![Build Status](https://img.shields.io/github/workflow/status/ainstarc/git-init/CI)](https://github.com/ainstarc/git-init/actions)

A modern, themeable, and accessible Git command search/reference app. Instantly find the right Git command using natural language, fuzzy search, and phrase matching. 

## Features
- 🔍 **Fuzzy & Natural Language Search**: Find commands by keywords, phrases, or intent (e.g. "undo last commit").
- 💡 **Phrase & Synonym Expansion**: Search supports synonyms and common Git task phrasing.
- 🏷️ **Rich Command Data**: Each command includes description, example, keywords, related, and more.
- 🎨 **Themes & System Theme**: Light, dark, sepia, nord, solarized, and system theme support.
- 🖼️ **Category Color Coding**: Instantly scan by command type.
- 🏷️ **Keyword Tags**: See all relevant keywords for each command.
- 🧑‍💻 **Accessible & Responsive**: Keyboard navigation, focus styles, and mobile-friendly.
- 📋 **Quick Copy**: Copy any command with one click or Enter.
- 📈 **PWA: Installable & Offline**: Works as a PWA, with auto-update on new releases.
- 🛠️ **Data Maintenance Scripts**: Ensure unique command IDs, no duplicates, and easy data enrichment.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run locally:**
   ```sh
   npm start
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```
4. **Run data maintenance scripts:**
   ```sh
   node scripts/injectDefaults.js && node scripts/checkDuplicates.js
   ```

## Data Maintenance
- All command data is in `src/data/gitCommands/*.json`.
- Run `injectDefaults.js` to fill missing fields and assign unique IDs.
- Run `checkDuplicates.js` to ensure no duplicate commands (by command string).
- `phrases.json` is for natural language phrase mapping (not a command file).

## PWA & Service Worker
- The app is a PWA and will auto-update to the latest version when a new release is deployed. The service worker is configured to skip waiting and activate immediately on update.

## Accessibility
- All interactive elements are keyboard accessible and have focus styles.
- Color contrast and ARIA labels are provided for screen readers.

## Contributing
Pull requests are welcome! Please run the data scripts before submitting changes to command data.

## License
MIT
