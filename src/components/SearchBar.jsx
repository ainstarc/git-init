import React from "react";
import "./SearchBar.css";

export default function SearchBar({ query, setQuery, onKeyDown }) {
  return (
    <div className="search-container">
      <div className="search-icon">
        <span role="img" aria-label="search">🔍</span>
      </div>
      
      <input
        type="search"
        className="search-bar"
        placeholder="Search Git commands or describe what you want to do..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        autoFocus
      />
      
      <p className="search-hint">
        Try: "start a repo", "undo changes", "switch branch", etc.
      </p>
    </div>
  );
}