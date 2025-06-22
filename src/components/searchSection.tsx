import SearchInput from "./searchInput"
import "./styles/searchSection.css"


type Props = {
  query: string
  setQuery: (value: string) => void
  loading: boolean
  filteredHistory: string[]
  onSearch: () => void
  onClearHistory: () => void
}

export default function SearchSection({
  query,
  setQuery,
  loading,  
  filteredHistory,
  onSearch,
  onClearHistory
}: Props) {
  const handleSuggestionClick = (q: string) => {
    setQuery(q)
    onSearch()
  }

  return (
    <div className="search-section">
      <SearchInput
        value={query}
        onChange={setQuery}
        onSearch={onSearch}
        loading={loading}
        suggestions={filteredHistory}
        onSuggestionClick={handleSuggestionClick}
        onClear={onClearHistory}
      />
    </div>
  )
}
