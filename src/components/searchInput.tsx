import "./styles/searchInput.css"

type Props = {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  loading?: boolean
  suggestions: string[]
  onSuggestionClick: (q: string) => void
  onClear?: () => void
}

export default function SearchInput({
  value,
  onChange,
  onSearch,
  loading = false,
  suggestions,
  onSuggestionClick,
  onClear
}: Props) {
  return (
    <div className="search-section">
      {/* Input + button row */}
      <div className="search-input-group">
        <input
          type="text"
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="e.g., how to rebase"
        />
        <button className="search-button" onClick={onSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Suggestions and Clear History */}
      {suggestions.length > 0 && (
        <div className="suggestions">
          <p className="suggestions-title">Recent:</p>
          <ul className="suggestions-list">
            {suggestions.map((q, i) => (
              <li className="suggestion-item" key={i} onClick={() => onSuggestionClick(q)}>
                {q}
              </li>
            ))}
          </ul>

          {/* Move Clear History to the right under suggestions */}
          {onClear && (
            <div className="clear-btn-container">
              <button className="clear-btn" onClick={onClear}>
                Clear History
              </button>
            </div>
          )}
        </div>
      )}
    </div>

  )
}
