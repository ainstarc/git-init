import { useState } from "react"
import SearchInput from "./components/searchInput"
import ResultCard from "./components/resultCard"
import { QueryResult } from "./types"
import { handleSearch } from "./utils/handleSearch"

function App() {
  const [result, setResult] = useState<QueryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onSearch = (query: string) => {
    setResult(null)
    setError("")
    handleSearch(query, setResult, setError, setLoading)
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>🔍 GitInit</h1>
      <SearchInput onSearch={onSearch} />
      {loading && <p>⏳ Searching...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {result && <ResultCard data={result} />}
    </div>
  )
}

export default App
