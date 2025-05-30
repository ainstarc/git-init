import React from "react";

export default function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      style={{
        marginLeft: "1rem",
        padding: "0.3rem 0.8rem",
        fontSize: "0.9rem",
        cursor: "pointer",
      }}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
