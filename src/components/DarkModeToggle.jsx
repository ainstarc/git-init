import React from "react";

export default function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5rem",
        borderRadius: "50%",
        color: darkMode ? "#f1c40f" : "#6c5ce7",
        transition: "all 0.3s ease",
      }}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span role="img" aria-label={darkMode ? "light mode" : "dark mode"}>
        {darkMode ? "☀️" : "🌙"}
      </span>
    </button>
  );
}