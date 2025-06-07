import React from "react";
import "../styles/CommandItem.css";
import ReportIssue from "./ReportIssue"; 

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
}) {
  return (
    <li
      className={`command-item 
      ${isFocused ? "focused" : ""} 
      ${isVariation ? "variation" : ""}`}
    >
      <div className="command-header">
        <div>
          <code className="command-code">{command}</code>

          {/* {isVariation && (
            <span className="variation-badge">
              variation
            </span>
          )} */}

          <span className="command-category">{category}</span>
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

      <p className="command-description">{description}</p>

      {isVariation && parentCommand && (
        <p className="command-meta">
          ↳ Based on <code>{parentCommand}</code>
        </p>
      )}

      {example && example !== command && (
        <pre className="command-example">e.g. {example}</pre>
      )}

      {keywords && keywords.length > 0 && (
        <div className="command-keywords">
          {keywords.map((keyword, index) => (
            <span key={index} className="keyword-tag">
              {keyword}
            </span>
          ))}
        </div>
      )}

    </li>
  );
}
