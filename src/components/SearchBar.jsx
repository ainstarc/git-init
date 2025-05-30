import React from "react";

export default function SearchBar({ query, setQuery, onKeyDown, darkMode }) {
  return (
    <input
      type="search"
      placeholder="Search Git commands..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={onKeyDown}
      style={{
        width: "100%",
        padding: "0.75rem",
        fontSize: "1.2rem",
        borderRadius: "5px",
        border: darkMode ? "1px solid #555" : "1px solid #ccc",
        backgroundColor: darkMode ? "#222" : "#fff",
        color: darkMode ? "#eee" : "#000",
        marginBottom: "1rem",
      }}
      autoFocus
    />
  );
}
