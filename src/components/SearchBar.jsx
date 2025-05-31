import React from "react";

export default function SearchBar({ query, setQuery, onKeyDown, darkMode }) {
  return (
    <div style={{ position: "relative", marginBottom: "1.5rem" }}>
      <div style={{ 
        position: "absolute", 
        left: "12px", 
        top: "50%", 
        transform: "translateY(-50%)",
        color: darkMode ? "#777" : "#999",
        fontSize: "1.2rem"
      }}>
        <span role="img" aria-label="search">🔍</span>
      </div>
      
      <input
        type="search"
        placeholder="Search Git commands or describe what you want to do..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        style={{
          width: "100%",
          padding: "0.75rem 0.75rem 0.75rem 2.5rem",
          fontSize: "1.1rem",
          borderRadius: "8px",
          border: darkMode ? "1px solid #444" : "1px solid #ddd",
          backgroundColor: darkMode ? "#222" : "#fff",
          color: darkMode ? "#eee" : "#000",
          marginBottom: "0.5rem",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
          transition: "all 0.2s ease",
        }}
        autoFocus
      />
      
      <p style={{ 
        margin: "0.3rem 0 0 0.3rem", 
        fontSize: "0.8rem", 
        color: darkMode ? "#777" : "#888" 
      }}>
        Try: "start a repo", "undo changes", "switch branch", etc.
      </p>
    </div>
  );
}