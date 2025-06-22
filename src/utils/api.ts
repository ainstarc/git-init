import { QueryResult } from "../types"

const API_URL = import.meta.env.VITE_API_URL

export async function fetchQueryResponse(query: string): Promise<QueryResult> {
  const response = await fetch(`${API_URL}/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    throw new Error("API request failed")
  }

  return await response.json()
}
