import React from "react";
import "./CommandItem.css";

export default function CommandItem({
  command,
  description,
  example,
  keywords,
  category,
  isFocused,
  onCopy,
  copied,
}) {
  return (
    <li className={`command-item ${isFocused ? 'focused' : ''}`}>
      <div className="command-header">
        <div>
          <code className="command-code">
            {command}
          </code>
          
          <span className="command-category">
            {category}
          </span>
        </div>
        
        <button
          onClick={() => onCopy(command)}
          className={`copy-button ${copied ? 'copied' : ''}`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      
      <p className="command-description">
        {description}
      </p>
      
      <pre className="command-example">
        {example}
      </pre>
      
      {keywords && keywords.length > 0 && (
        <div className="command-keywords">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="keyword-tag"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}
    </li>
  );
}