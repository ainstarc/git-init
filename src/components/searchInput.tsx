import { useState } from "react"

interface Props {
    onSearch: (query: string) => void
}

export default function SearchInput({ onSearch }: Props) {
    const [query, setQuery] = useState("")

    const handleClick = () => {
        if (!query.trim()) return
        onSearch(query)
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
            <button onClick={handleClick}>Search</button>
        </div>
    )
}
