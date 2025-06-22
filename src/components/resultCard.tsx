import { QueryResult } from "../types"
import { motion } from "framer-motion"

export default function ResultCard({ result }: { result: QueryResult }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#f9f9f9"
            }}
        >
            <h2 style={{ marginBottom: "0.5rem" }}>{result.command}</h2>
            <p style={{ marginBottom: "0.5rem" }}>{result.description}</p>
            <small style={{ color: "#555" }}>Source: {result.source}</small>
        </motion.div>
    )
}
