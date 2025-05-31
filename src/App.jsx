import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";

import SearchBar from "./components/SearchBar";
import CommandList from "./components/CommandList";
import DarkModeToggle from "./components/DarkModeToggle";

import gitCommands from "./data/gitCommands";

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
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

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
    <div
      style={{
        maxWidth: 800,
        margin: "2rem auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: darkMode ? "#121212" : "#fff",
        color: darkMode ? "#eee" : "#000",
        minHeight: "100vh",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: darkMode
          ? "0 0 10px rgba(255, 255, 255, 0.1)"
          : "0 0 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "1rem"
      }}>
        <h1 style={{ margin: 0 }}>git-init</h1>
        <DarkModeToggle
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />
      </header>
      
      <p style={{ 
        marginBottom: "1.5rem", 
        color: darkMode ? "#aaa" : "#666" 
      }}>
        Search for Git commands using natural language - try "start a repo", "undo commit", or "switch branch"
      </p>
      
      <SearchBar
        query={query}
        setQuery={setQuery}
        onKeyDown={handleKeyDown}
        darkMode={darkMode}
      />
      
      {/* Category filters */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: "0.5rem",
        marginBottom: "1rem" 
      }}>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            style={{
              padding: "0.4rem 0.8rem",
              backgroundColor: activeCategory === category.id 
                ? (darkMode ? "#4d4d4d" : "#e0e0e0") 
                : (darkMode ? "#2d2d2d" : "#f5f5f5"),
              border: "none",
              borderRadius: "4px",
              color: darkMode ? "#eee" : "#333",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: activeCategory === category.id ? "bold" : "normal",
            }}
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
        darkMode={darkMode}
      />
      
      <footer style={{ 
        marginTop: "2rem", 
        textAlign: "center",
        fontSize: "0.9rem",
        color: darkMode ? "#888" : "#666"
      }}>
        <p>Find the perfect Git command for any task</p>
      </footer>
    </div>
  );
}