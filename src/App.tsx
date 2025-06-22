import { useState, useEffect } from "react"
import {
  getSearchHistory,
  addToSearchHistory,
  clearSearchHistory
} from "./utils/localStorage"
import { fetchQueryResponse } from "./utils/api"
import { QueryResult } from "./types"
import SearchSection from "./components/searchSection"
import ResultSection from "./components/resultSection"

export default function App() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<QueryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [filteredHistory, setFilteredHistory] = useState<string[]>([])

  useEffect(() => {
    setHistory(getSearchHistory())
  }, [])

  useEffect(() => {
    if (!query) {
      setFilteredHistory([])
    } else {
      setFilteredHistory(
        history.filter((h) => h.toLowerCase().includes(query.toLowerCase()))
      )
    }
  }, [query, history])

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetchQueryResponse(searchQuery)
      setResult(response)
      addToSearchHistory(searchQuery)
      setHistory(getSearchHistory())
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <h1 className="app-title">🔍 GitBot</h1>
      <SearchSection
        query={query}
        setQuery={setQuery}
        loading={loading}
        filteredHistory={filteredHistory}
        onSearch={() => handleSearch(query)}
        onClearHistory={() => {
          clearSearchHistory()
          setHistory([])
        }}
      />
      <ResultSection result={result} loading={loading} error={error} />
    </div>
  )
}
