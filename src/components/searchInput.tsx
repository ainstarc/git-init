import { useState } from "react"
import { fetchQueryResponse } from "../utils/api"
import { QueryResult } from "../types"

interface Props {
    onResult: (result: QueryResult) => void
}

export default function SearchInput({ onResult }: Props) {
    const [query, setQuery] = useState("")

    const handleSearch = async () => {
        if (!query.trim()) return
        const result = await fetchQueryResponse(query)
        onResult(result)
    }

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Git command..."
                style={{ width: "70%", padding: "0.5rem", marginRight: "0.5rem" }}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}
