import { useEffect, useState } from "react"
import {
  getSearchHistory,
  addToSearchHistory,
  clearSearchHistory, getCache, saveToCache
} from "./utils/localStorage"
import PingStatus from "./components/pingStatus"
import { fetchQueryResponse } from "./utils/api"
import { QueryResult } from "./types"
import SearchSection from "./components/searchSection"
import ResultSection from "./components/resultSection"
import "./index.css"

export default function App() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<QueryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [filteredHistory, setFilteredHistory] = useState<string[]>([])
  const [resultCache, setResultCache] = useState<Record<string, QueryResult>>(
    () => getCache()
  )

  useEffect(() => {
    setHistory(getSearchHistory())
    setResultCache(getCache())
  }, [])


  useEffect(() => {
    if (!query) setFilteredHistory([])
    else {
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

      setResultCache((prev) => {
        const updated = {
          ...prev,
          [searchQuery.toLowerCase()]: response
        }
        saveToCache(searchQuery, response)
        return updated
      })

      addToSearchHistory(searchQuery)
      setHistory(getSearchHistory())
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestionClick = (selectedQuery: string) => {
    setQuery(selectedQuery)
    const cached = resultCache[selectedQuery.toLowerCase()]
    if (cached) {
      setResult(cached)
      setError(null)
      setLoading(false)
    } else {
      handleSearch(selectedQuery)
    }
  }

  const handleClearHistory = () => {
    clearSearchHistory()
    setHistory([])
    setFilteredHistory([])
    setResultCache({})
  }

  return (
    <>
      <PingStatus />
      <div className="app-container">
        <h1 className="app-title">🔍 Git Init</h1>
        <SearchSection
          query={query}
          setQuery={setQuery}
          loading={loading}
          filteredHistory={filteredHistory}
          onSearch={() => handleSearch(query)}
          onSuggestionClick={handleSuggestionClick}
          onClearHistory={handleClearHistory}
        />
        <ResultSection result={result} loading={loading} error={error} />
      </div>
    </>
  )
}
