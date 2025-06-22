import { QueryResult } from "../types"
import { motion } from "framer-motion"
import "./styles/resultCard.css"

export default function ResultCard({ result }: { result: QueryResult }) {
  return (
    <motion.div
      className="result-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2>{result.command}</h2>
      <p>{result.description}</p>
      <small>Source: {result.source}</small>
    </motion.div>
  )
}
