import { QueryResult } from "../types"
import { motion } from "framer-motion"
import "./styles/resultCard.css"

type Props = {
  result: QueryResult
}

export default function ResultCard({ result }: Props) {
  return (
    <motion.div
      className="result-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="result-command">{result.command}</h2>
      <p className="result-description">{result.description}</p>
      <small className="result-source">Source: {result.source}</small>
    </motion.div>
  )
}
