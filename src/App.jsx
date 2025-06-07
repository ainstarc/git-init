import React, { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";

import SearchBar from "./components/SearchBar";
import CommandList from "./components/CommandList";
import ThemeSelector from "./components/ThemeSelector";
import UpdateNotification from "./components/UpdateNotification";
import { useThemeContext } from "./context/ThemeContext";

import gitCommands from "./data/gitCommands";
import "./styles/themes.css";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(gitCommands);
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState("all");

  // Get theme from context
  useThemeContext();

  // Categories for filtering
  const categories = [
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
    { id: "phrases", name: "Phrases" }, // if phrases is command category or maybe info/help
  ];

  const flatCommands = useMemo(() => {
    return gitCommands.flatMap((cmd) => {
      const base = { ...cmd, isVariation: false };
      const variations = (cmd.variations || []).map((variation) => ({
        ...variation,
        parentCommand: cmd.command,
        isVariation: true,
      }));
      return [base, ...variations];
    });
  }, [gitCommands]);

  const fuse = useMemo(() => {
    return new Fuse(flatCommands, {
      keys: [
        { name: "command", weight: 1 },
        { name: "description", weight: 0.7 },
        { name: "keywords", weight: 0.9 },
        { name: "category", weight: 0.5 },
      ],
      threshold: 0.4,
      includeScore: true,
    });
  }, [flatCommands]);

  useEffect(() => {
    let filteredResults;

    if (activeCategory === "all") {
      filteredResults = flatCommands;
    } else {
      filteredResults = flatCommands.filter(
        (cmd) => cmd.category === activeCategory
      );
    }

    if (!query) {
      setResults(filteredResults);
    } else {
      const searchResults = fuse.search(query);

      const finalResults = searchResults
        .filter(
          (result) =>
            activeCategory === "all" || result.item.category === activeCategory
        )
        .map((result) => result.item);

      setResults(finalResults);
    }

    setFocusedIndex(-1);
  }, [query, activeCategory, flatCommands, fuse]);

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
        Search for Git commands using natural language - try "start a repo",
        "undo commit", or "switch branch"
      </p>

      <SearchBar query={query} setQuery={setQuery} onKeyDown={handleKeyDown} />

      {/* Category filters */}
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`category-button ${
              activeCategory === category.id ? "active" : ""
            }`}
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
