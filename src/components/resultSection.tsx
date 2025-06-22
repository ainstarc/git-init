import ResultCard from "./resultCard"
import { QueryResult } from "../types"
import "./styles/resultSection.css"

type Props = {
  result: QueryResult | null
  loading: boolean
  error: string | null
}

export default function ResultSection({ result, loading, error }: Props) {
  const renderContent = () => {
    if (loading) return <p>⏳ Searching Git wisdom...</p>
    if (error) return <p className="error-text">{error}</p>
    if (result) return <ResultCard result={result} />
    return <p>Start by typing a Git-related question above.</p>
  }

  return <div className="result-section">{renderContent()}</div>
}
