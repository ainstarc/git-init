import React from "react";
import CommandItem from "./CommandItem";
import "../styles/CommandList.css";

export default function CommandList({
  results,
  focusedIndex,
  onCopy,
  copiedCommand,
}) {
  if (results.length === 0) {
    return (
      <div className="no-results">
        <p className="no-results-title">
          No commands found.
        </p>
        <p className="no-results-subtitle">
          Try different keywords or check the spelling.
        </p>
      </div>
    );
  }

  return (
    <div className="command-list">
      <p className="results-count">
        Found {results.length} command{results.length !== 1 ? 's' : ''}
      </p>
      
      <ul className="command-list-container">
        {results.map((command, index) => (
          <CommandItem
            key={command.command}
            command={command.command}
            description={command.description}
            example={command.example}
            keywords={command.keywords}
            category={command.category}
            isFocused={index === focusedIndex}
            isVariation={!!command.variations}
            parentCommand={command.parentCommand}
            onCopy={onCopy}
            copied={copiedCommand === command.command}
          />
        ))}
      </ul>
    </div>
  );
}