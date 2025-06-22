import ResultCard from "./resultCard"
import { QueryResult } from "../types"
import "./styles/resultSection.css"

type Props = {
  result: QueryResult | null
  loading: boolean
  error: string | null
}

export default function ResultSection({ result, loading, error }: Props) {
  return (
    <div className="result-section">
      {loading && <p>⏳ Searching Git wisdom...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && result && <ResultCard result={result} />}
      {!loading && !error && !result && (
        <p>Start by typing a Git-related question above.</p>
      )}
    </div>
  )
}
