import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";

import SearchBar from "./components/SearchBar";
import CommandList from "./components/CommandList";
import ThemeSelector from "./components/ThemeSelector";
import UpdateNotification from "./components/UpdateNotification";
import { useThemeContext } from "./context/ThemeContext";

import gitCommands from "./data/gitCommands";
import "./styles/themes.css";
import "./App.css";

// Configure Fuse.js for advanced searching
const fuse = new Fuse(gitCommands, {
  keys: [
    { name: "command", weight: 1 },
    { name: "description", weight: 0.7 },
    { name: "keywords", weight: 0.9 },
    { name: "category", weight: 0.5 }
  ],
  threshold: 0.4, // Slightly more lenient threshold for better matches
  includeScore: true,
});

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(gitCommands);
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Get theme from context
  const { theme } = useThemeContext();

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Commands" },
    { id: "basics", name: "Basics" },
    { id: "branching", name: "Branching" },
    { id: "remote", name: "Remote" },
    { id: "history", name: "History" },
    { id: "advanced", name: "Advanced" }
  ];

  useEffect(() => {
    let filteredResults;
    
    // First filter by category if needed
    if (activeCategory === "all") {
      filteredResults = gitCommands;
    } else {
      filteredResults = gitCommands.filter(cmd => cmd.category === activeCategory);
    }
    
    // Then apply search if there's a query
    if (!query) {
      setResults(filteredResults);
    } else {
      // Use Fuse to search with the query
      const searchResults = fuse.search(query);
      
      // Filter search results by active category if needed
      const finalResults = searchResults
        .filter(result => activeCategory === "all" || result.item.category === activeCategory)
        .map(result => result.item);
      
      setResults(finalResults);
    }
    
    setFocusedIndex(-1);
  }, [query, activeCategory]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCommand(text);
      setTimeout(() => setCopiedCommand(null), 1500);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      copyToClipboard(results[focusedIndex].command);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>git-init</h1>
        <ThemeSelector />
      </header>
      
      <p className="app-description">
        Search for Git commands using natural language - try "start a repo", "undo commit", or "switch branch"
      </p>
      
      <SearchBar
        query={query}
        setQuery={setQuery}
        onKeyDown={handleKeyDown}
      />
      
      {/* Category filters */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <CommandList
        results={results}
        focusedIndex={focusedIndex}
        onCopy={copyToClipboard}
        copiedCommand={copiedCommand}
      />
      
      <footer className="app-footer">
        <p>Find the perfect Git command for any task</p>
      </footer>
      
      <UpdateNotification />
    </div>
  );
}