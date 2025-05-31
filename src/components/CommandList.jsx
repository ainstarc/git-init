import React from "react";
import CommandItem from "./CommandItem";

export default function CommandList({
  results,
  focusedIndex,
  onCopy,
  copiedCommand,
  darkMode,
}) {
  if (results.length === 0) {
    return (
      <div style={{
        padding: "2rem",
        textAlign: "center",
        backgroundColor: darkMode ? "#1a1a1a" : "#f9f9f9",
        borderRadius: "8px",
        color: darkMode ? "#aaa" : "#666"
      }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          No commands found.
        </p>
        <p style={{ fontSize: "0.9rem" }}>
          Try different keywords or check the spelling.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p style={{ 
        margin: "0.5rem 0", 
        color: darkMode ? "#aaa" : "#666",
        fontSize: "0.9rem" 
      }}>
        Found {results.length} command{results.length !== 1 ? 's' : ''}
      </p>
      
      <ul style={{ 
        listStyle: "none", 
        paddingLeft: 0,
        margin: "1rem 0" 
      }}>
        {results.map((command, index) => (
          <CommandItem
            key={command.command}
            command={command.command}
            description={command.description}
            example={command.example}
            keywords={command.keywords}
            category={command.category}
            isFocused={index === focusedIndex}
            onCopy={onCopy}
            copied={copiedCommand === command.command}
            darkMode={darkMode}
          />
        ))}
      </ul>
    </div>
  );
}