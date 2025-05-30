import React from "react";

export default function CommandItem({
  command,
  description,
  example,
  isFocused,
  onCopy,
  copied,
}) {
  return (
    <li
      style={{
        padding: "0.5rem 0",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: isFocused ? "#d0eaff" : "transparent",
      }}
    >
      <div>
        <code
          style={{
            backgroundColor: "#f5f5f5",
            padding: "0.2rem 0.5rem",
            borderRadius: "3px",
          }}
        >
          {command}
        </code>
        <p style={{ margin: "0.3rem 0 0" }}>{description}</p>
        <pre
          style={{
            backgroundColor: "#e8e8e8",
            padding: "0.3rem 0.5rem",
            borderRadius: "3px",
            marginTop: "0.3rem",
            fontSize: "0.9rem",
            whiteSpace: "pre-wrap",
          }}
        >
          {example}
        </pre>
      </div>
      <button
        onClick={() => onCopy(command)}
        style={{
          backgroundColor: copied ? "#4caf50" : "#008cba",
          border: "none",
          color: "white",
          padding: "0.4rem 0.8rem",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "0.9rem",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </li>
  );
}
