import React from "react";
import CommandItem from "./CommandItem";

export default function CommandList({
  results,
  focusedIndex,
  onCopy,
  copiedCommand,
}) {
  if (results.length === 0) return <p>No commands found.</p>;

  return (
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {results.map(({ command, description, example }, index) => (
        <CommandItem
          key={command}
          command={command}
          description={description}
          example={example}
          isFocused={index === focusedIndex}
          onCopy={onCopy}
          copied={copiedCommand === command}
        />
      ))}
    </ul>
  );
}
