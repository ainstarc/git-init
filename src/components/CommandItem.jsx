import React from "react";

export default function CommandItem({
  command,
  description,
  example,
  keywords,
  category,
  isFocused,
  onCopy,
  copied,
  darkMode,
}) {
  return (
    <li
      style={{
        padding: "0.75rem",
        borderBottom: darkMode ? "1px solid #333" : "1px solid #eee",
        display: "flex",
        flexDirection: "column",
        backgroundColor: isFocused 
          ? (darkMode ? "#2a3b4d" : "#e6f2ff") 
          : "transparent",
        borderRadius: "4px",
        marginBottom: "0.5rem",
        transition: "background-color 0.2s ease",
      }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "0.5rem",
      }}>
        <div>
          <code
            style={{
              backgroundColor: darkMode ? "#333" : "#f5f5f5",
              padding: "0.3rem 0.6rem",
              borderRadius: "3px",
              fontWeight: "bold",
              color: darkMode ? "#4caf50" : "#0066cc",
              fontSize: "1rem",
            }}
          >
            {command}
          </code>
          
          <span
            style={{
              backgroundColor: darkMode ? "#2d2d2d" : "#f0f0f0",
              color: darkMode ? "#aaa" : "#666",
              padding: "0.2rem 0.4rem",
              borderRadius: "3px",
              fontSize: "0.7rem",
              marginLeft: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            {category}
          </span>
        </div>
        
        <button
          onClick={() => onCopy(command)}
          style={{
            backgroundColor: copied ? "#4caf50" : (darkMode ? "#444" : "#e0e0e0"),
            border: "none",
            color: copied ? "white" : (darkMode ? "#eee" : "#333"),
            padding: "0.4rem 0.8rem",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
            transition: "all 0.2s ease",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      
      <p style={{ 
        margin: "0.3rem 0", 
        color: darkMode ? "#ddd" : "#333" 
      }}>
        {description}
      </p>
      
      <pre
        style={{
          backgroundColor: darkMode ? "#222" : "#f5f5f5",
          padding: "0.5rem 0.7rem",
          borderRadius: "3px",
          marginTop: "0.3rem",
          fontSize: "0.9rem",
          whiteSpace: "pre-wrap",
          color: darkMode ? "#bbb" : "#333",
          borderLeft: darkMode ? "3px solid #444" : "3px solid #ddd",
        }}
      >
        {example}
      </pre>
      
      {keywords && keywords.length > 0 && (
        <div style={{ 
          marginTop: "0.5rem", 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "0.3rem" 
        }}>
          {keywords.map((keyword, index) => (
            <span
              key={index}
              style={{
                backgroundColor: darkMode ? "#333" : "#f0f0f0",
                color: darkMode ? "#aaa" : "#666",
                padding: "0.1rem 0.4rem",
                borderRadius: "12px",
                fontSize: "0.75rem",
              }}
            >
              {keyword}
            </span>
          ))}
        </div>
      )}
    </li>
  );
}