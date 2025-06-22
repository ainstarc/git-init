import { useState } from "react"
import { fetchQueryResponse } from "./utils/api"
import { QueryResult } from "./types"
import ResultCard from "./components/resultCard"
import SearchInput from "./components/searchInput"

export default function App() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<QueryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetchQueryResponse(searchQuery)
      setResult(response)
    } catch (err) {
      console.error("Search error:", err)
      setError("❌ Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🔍 Git Init</h1>
      <SearchInput
        value={query}
        onChange={setQuery}
        onSearch={() => handleSearch(query)}
        loading={loading}
      />

      <div style={{ marginTop: "2rem" }}>
        {loading && <p>⏳ Searching Git wisdom...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && result && <ResultCard result={result} />}

        {!loading && !error && !result && <p>Start by typing a Git-related question above.</p>}
      </div>
    </div>
  )
}
