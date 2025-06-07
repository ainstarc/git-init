import React, { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";

import SearchBar from "./components/SearchBar";
import CommandList from "./components/CommandList";
import ThemeSelector from "./components/ThemeSelector";
import UpdateNotification from "./components/UpdateNotification";
import { useThemeContext } from "./context/ThemeContext";
import FaviconSwitcher from "./components/FaviconSwitcher";

import coreConfig from "./data/gitCommands/coreConfig";
import staging from "./data/gitCommands/staging";
import commits from "./data/gitCommands/commits";
import branching from "./data/gitCommands/branching";
import remotes from "./data/gitCommands/remotes";
import merging from "./data/gitCommands/merging";
import tagging from "./data/gitCommands/tagging";
import workingTree from "./data/gitCommands/workingTree";
import inspection from "./data/gitCommands/inspection";
import advancedTools from "./data/gitCommands/advancedTools";
import phrases from "./data/gitCommands/phrases.json";
import { CATEGORIES } from "./constants/themes";
import {
  cleanQuery,
  expandWithSynonyms,
  findPhraseMatches,
  getHighlightTerms,
} from "./utils/searchUtils";
import styles from "./App.module.css";

import "./styles/themes.css";

// Combine all commands modularly
const gitCommands = [
  ...coreConfig,
  ...staging,
  ...commits,
  ...branching,
  ...remotes,
  ...merging,
  ...tagging,
  ...workingTree,
  ...inspection,
  ...advancedTools,
];

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(gitCommands);
  const [copiedCommand, setCopiedCommand] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  useThemeContext();

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
  }, [gitCommands]);

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
    let cleaned = cleanQuery(query);
    cleaned = expandWithSynonyms(cleaned);
    let phraseMatches = findPhraseMatches(query);
    let phraseCommands = [];
    if (phraseMatches.length > 0) {
      phraseCommands = phraseMatches
        .map((pm) =>
          flatCommands.find((cmd) =>
            cmd.command && pm.suggestedCommand && cmd.command.startsWith(pm.suggestedCommand)
          )
        )
        .filter(Boolean);
    }
    let searchResults = [];
    if (!cleaned.trim()) {
      searchResults =
        activeCategory === "all"
          ? flatCommands
          : flatCommands.filter((cmd) => cmd.category === activeCategory);
    } else {
      // Prefer exact command matches first, then fuzzy
      const exactMatches = flatCommands.filter(cmd =>
        cmd.command.toLowerCase() === cleaned
      );
      const fuseResults = fuse.search(cleaned);
      const filtered =
        activeCategory === "all"
          ? fuseResults
          : fuseResults.filter((res) => res.item.category === activeCategory);
      searchResults = [
        ...exactMatches,
        ...filtered.map((res) => res.item).filter(cmd => !exactMatches.includes(cmd))
      ];
    }
    // Merge phraseCommands at the top, dedupe
    const merged = [
      ...phraseCommands,
      ...searchResults.filter((cmd) => !phraseCommands.includes(cmd)),
    ];
    setResults(merged);
    setFocusedIndex(-1);
    setShowAll(false); // Reset show more on new search
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

  const MAX_RESULTS = 12;

  return (
    <div className={styles.appContainer}>
      <FaviconSwitcher />

      <header className={styles.appHeader}>
        <h1>git-init</h1>
        <ThemeSelector />
      </header>

      <p className={styles.appDescription}>
        Search for Git commands using natural language – try "start a repo",
        "undo commit", or "switch branch"
      </p>

      <SearchBar query={query} setQuery={setQuery} onKeyDown={handleKeyDown} />

      <div
        className={styles.categoryFilters}
        role="tablist"
        aria-label="Command categories"
      >
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`${styles.categoryButton} ${
              activeCategory === category.id ? styles.active : ""
            }`}
            aria-pressed={activeCategory === category.id}
            aria-label={`Filter by ${category.name}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <CommandList
        results={showAll ? results : results.slice(0, MAX_RESULTS)}
        focusedIndex={focusedIndex}
        onCopy={copyToClipboard}
        copiedCommand={copiedCommand}
        highlightTerms={getHighlightTerms(query)}
      />
      {results.length > MAX_RESULTS && !showAll && (
        <div className={styles.showMoreContainer}>
          <button className={styles.showMoreBtn} onClick={() => setShowAll(true)}>
            Show More ({results.length - MAX_RESULTS} more)
          </button>
        </div>
      )}

      <footer className={styles.appFooter}>
        <p>Find the perfect Git command for any task</p>
        <p className={styles.keyboardHint}>Use ↑ ↓ and Enter to copy quickly</p>
      </footer>

      <UpdateNotification />
    </div>
  );
}
