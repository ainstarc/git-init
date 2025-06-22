import SearchInput from "./searchInput"

type Props = {
  query: string
  setQuery: (value: string) => void
  loading: boolean
  filteredHistory: string[]
  onSearch: () => void
  onSuggestionClick: (q: string) => void
  onClearHistory: () => void
}

export default function SearchSection({
  query,
  setQuery,
  loading,
  filteredHistory,
  onSearch,
  onSuggestionClick,
  onClearHistory
}: Props) {
  return (
    <SearchInput
      value={query}
      onChange={setQuery}
      onSearch={onSearch}
      loading={loading}
      suggestions={filteredHistory}
      onSuggestionClick={onSuggestionClick}
      onClear={onClearHistory}
    />
  )
}
