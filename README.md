# Git-Init: Find Git Commands Instantly

Git-Init is a user-friendly tool that helps you find the right Git command for any task. Whether you're a beginner or an experienced developer, this tool makes it easy to discover Git commands using natural language.

## Features

- **Natural Language Search**: Find commands by describing what you want to do
- **Keyword Matching**: Search for commands using alternative terms and concepts
- **Command Categories**: Browse commands by category (basics, branching, remote, etc.)
- **Copy to Clipboard**: Easily copy commands with a single click
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Keyboard Navigation**: Use arrow keys to navigate through results

## How to Use

1. Type what you want to do in the search bar (e.g., "start a repo", "undo changes", "switch branch")
2. Browse the matching Git commands
3. Click "Copy" to copy the command to your clipboard
4. Use the category filters to narrow down results

## Examples of Natural Language Queries

- "start a new repository" → `git init`
- "save my changes" → `git commit`
- "upload to GitHub" → `git push`
- "download updates" → `git pull`
- "switch to another branch" → `git checkout` or `git switch`
- "undo my last commit" → `git reset`

## Running Locally

To run this project locally:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/git-init.git
   cd git-init
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   # For Node.js v17 or higher, use:
   set NODE_OPTIONS=--openssl-legacy-provider && npm start
   
   # For Linux/Mac:
   # export NODE_OPTIONS=--openssl-legacy-provider && npm start
   
   # For older Node.js versions:
   # npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run deploy` - Deploys the app to GitHub Pages

## Technologies Used

- React 19
- Fuse.js for fuzzy searching
- GitHub Pages for deployment

## Browser Compatibility

Git-Init works with all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Node.js Compatibility

This project is compatible with:
- Node.js v16+ (recommended)
- Node.js v17+ and v20+ (requires OpenSSL legacy provider flag as noted in the running instructions)

## Contributing

Contributions are welcome! Feel free to add more Git commands, improve search functionality, or enhance the UI.

## License

This project is open source and available under the MIT License.