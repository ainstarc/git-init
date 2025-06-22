import { useState } from "react"
import SearchInput from "./components/searchInput"
import ResultCard from "./components/resultCard"
import { QueryResult } from "./types"

function App() {
  const [result, setResult] = useState<QueryResult | null>(null)

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>🔍 GitInit</h1>
      <SearchInput onResult={setResult} />
          <ResultCard data={result} />
      </div>
  )
}

export default App
