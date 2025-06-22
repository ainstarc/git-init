type Props = {
    value: string
    onChange: (value: string) => void
    onSearch: () => void
    loading?: boolean
}

export default function SearchInput({ value, onChange, onSearch, loading }: Props) {
    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                placeholder="e.g., how to check current branch"
                style={{
                    flex: 1,
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "1rem"
                }}
                disabled={loading}
            />
            <button
                onClick={onSearch}
                disabled={loading}
                style={{
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                }}
            >
                {loading ? "Searching..." : "Search"}
            </button>
        </div>
    )
}
