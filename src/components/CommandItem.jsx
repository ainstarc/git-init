import React from "react";
import "../styles/CommandItem.css";
import ReportIssue from "./ReportIssue";
import { CATEGORY_COLORS } from "../constants/themes";

export default function CommandItem({
  command,
  description,
  example,
  keywords,
  category,
  isFocused,
  onCopy,
  copied,
  isVariation = false,
  parentCommand = null,
  highlight = [], // array of terms to highlight
}) {
  // Highlight helper
  function highlightText(text) {
    if (!highlight.length) return text;
    let parts = [text];
    highlight.forEach((term, termIdx) => {
      const regex = new RegExp(`(${term})`, "gi");
      parts = parts.flatMap((part, partIdx) =>
        typeof part === "string" && regex.test(part)
          ? part.split(regex).map((p, i) =>
              regex.test(p)
                ? <mark key={`h-${termIdx}-${partIdx}-${i}`}>{p}</mark>
                : p
            )
          : [part]
      );
    });
    return parts;
  }

  return (
    <li
      className={`command-item 
      ${isFocused ? "focused" : ""} 
      ${isVariation ? "variation" : ""}`}
    >
      <div className="command-header">
        <div>
          <code className="command-code">{highlightText(command)}</code>
          <span
            className="command-category"
            style={{ backgroundColor: CATEGORY_COLORS[category] || "#ccc" }}
          >
            {category}
          </span>
          <ReportIssue commandId={command} 
          commandDescription={description}
          commandExample={example}
          commandKeywords={keywords}
          commandCategory={category}
          />
        </div>
        <button
          onClick={() => onCopy(command)}
          className={`copy-button ${copied ? "copied" : ""}`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <p className="command-description">{highlightText(description)}</p>
      {example && (
        <pre className="command-example">{highlightText(example)}</pre>
      )}
      {keywords && (
        <div className="command-keywords">
          {keywords.map((kw, i) => (
            <span className="keyword-tag" key={i}>
              {highlightText(kw)}
            </span>
          ))}
        </div>
      )}
      {parentCommand && (
        <div className="parent-command">Variation of: <code>{parentCommand}</code></div>
      )}
    </li>
  );
}
