import { QueryResult } from "../types"

interface Props {
    data: QueryResult | null
}

export default function ResultCard({ data }: Props) {
    if (!data) return null

    return (
        <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
            <p><strong>Command:</strong> <code>{data.command}</code></p>
            <p><strong>Description:</strong> {data.description}</p>
            {data.source && <p style={{ fontSize: "0.85rem", color: "gray" }}>Source: {data.source}</p>}
        </div>
    )
}
