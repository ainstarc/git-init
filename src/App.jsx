import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";

import SearchBar from "./components/SearchBar";
import CommandList from "./components/CommandList";
import DarkModeToggle from "./components/DarkModeToggle";

import gitCommands from "./data/gitCommands";

const fuse = new Fuse(gitCommands, {
  keys: ["command", "description"],
  threshold: 0.3,
});

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(gitCommands);
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults(gitCommands);
    } else {
      const searchResults = fuse.search(query);
      setResults(searchResults.map((result) => result.item));
    }
    setFocusedIndex(-1);
  }, [query]);

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
        maxWidth: 600,
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
      <h1 style={{ display: "flex", alignItems: "center" }}>
        git-init
        <DarkModeToggle
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />
      </h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        onKeyDown={handleKeyDown}
        darkMode={darkMode}
      />
      <CommandList
        results={results}
        focusedIndex={focusedIndex}
        onCopy={copyToClipboard}
        copiedCommand={copiedCommand}
      />
    </div>
  );
}
