import React, { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";

import SearchBar from "./components/SearchBar";
import CommandList from "./components/CommandList";
import ThemeSelector from "./components/ThemeSelector";
import UpdateNotification from "./components/UpdateNotification";
import { useThemeContext } from "./context/ThemeContext";
import FaviconSwitcher from "./components/FaviconSwitcher";

import gitCommands from "./data/gitCommands";
import "./styles/themes.css";
import "./App.css";

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "to",
  "for",
  "of",
  "on",
  "in",
  "with",
  "and",
  "or",
  "by",
  "from",
  "at",
  "as",
  "is",
  "are",
  "be",
  "this",
  "that",
  "it",
  "my",
  "your",
  "their",
  "our",
  "was",
  "were",
  "can",
  "will",
  "should",
  "do",
  "does",
  "did",
  "but",
  "if",
  "so",
  "just",
  "about",
  "into",
  "out",
  "up",
  "down",
  "over",
  "under",
  "then",
  "than",
  "after",
  "before",
  "when",
  "while",
  "which",
  "who",
  "whom",
  "whose",
  "how",
  "what",
  "why",
  "where",
  "all",
  "any",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "too",
  "very",
  "s",
  "t",
  "can",
  "will",
  "don",
  "should",
  "now",
]);

function cleanQuery(query) {
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => !STOP_WORDS.has(word))
    .join(" ");
}

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(gitCommands);
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState("all");

  useThemeContext();

  // Define all categories
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
  ];

  // Flatten commands + their variations for search
  const flatCommands = useMemo(() => {
    const flattenVariations = (cmd, parentCommand = null) => {
      const base = {
        ...cmd,
        isVariation: !!parentCommand,
        parentCommand: parentCommand || null,
      };
      const nested = (cmd.variations || []).flatMap((variation) =>
        flattenVariations(variation, base.command)
      );
      return [base, ...nested];
    };
    return gitCommands.flatMap((cmd) => flattenVariations(cmd));
  }, []);

  // Initialize Fuse with full command list
  const fuse = useMemo(() => {
    return new Fuse(flatCommands, {
      keys: [
        { name: "command", weight: 2 },
        { name: "description", weight: 1.2 },
        { name: "keywords", weight: 1.5 },
        { name: "category", weight: 0.5 },
        { name: "example", weight: 0.7 },
        { name: "related", weight: 0.5 },
      ],
      threshold: 0.35, // more strict
      includeScore: true,
      useExtendedSearch: true,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [flatCommands]);

  // Perform search and filter by category
  useEffect(() => {
    const cleaned = cleanQuery(query);
    if (!cleaned) {
      setResults(
        activeCategory === "all"
          ? flatCommands
          : flatCommands.filter((cmd) => cmd.category === activeCategory)
      );
      return;
    }
    const searchResults = fuse.search(cleaned);
    const filtered =
      activeCategory === "all"
        ? searchResults
        : searchResults.filter((res) => res.item.category === activeCategory);
    setResults(filtered.map((res) => res.item));
    setFocusedIndex(-1);
  }, [query, activeCategory, fuse, flatCommands]);

  // Clipboard copy logic
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCommand(text);
      setTimeout(() => setCopiedCommand(null), 1500);
    });
  };

  // Keyboard navigation
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
      <FaviconSwitcher />

      <header className="app-header">
        <h1>git-init</h1>
        <ThemeSelector />
      </header>

      <p className="app-description">
        Search for Git commands using natural language – try "start a repo",
        "undo commit", or "switch branch"
      </p>

      <SearchBar query={query} setQuery={setQuery} onKeyDown={handleKeyDown} />

      <div
        className="category-filters"
        role="tablist"
        aria-label="Command categories"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`category-button ${
              activeCategory === category.id ? "active" : ""
            }`}
            aria-pressed={activeCategory === category.id}
            aria-label={`Filter by ${category.name}`}
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
        <p className="keyboard-hint">Use ↑ ↓ and Enter to copy quickly</p>
      </footer>

      <UpdateNotification />
    </div>
  );
}
