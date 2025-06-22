import { fetchQueryResponse } from "./api"
import { QueryResult } from "../types"

export async function handleSearch(
  query: string,
  onSuccess: (result: QueryResult) => void,
  onError: (msg: string) => void,
  onLoading?: (loading: boolean) => void
) {
  try {
    onLoading?.(true)
    const result = await fetchQueryResponse(query)
    onSuccess(result)
  } catch (err) {
    console.error(err)
    onError("Something went wrong. Try again.")
  } finally {
    onLoading?.(false)
  }
}
