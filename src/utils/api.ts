import { QueryResult } from "../types";

export async function fetchQueryResponse(query: string): Promise<QueryResult> {
  // Simulate delay
  await new Promise((r) => setTimeout(r, 500));

  // Mock response
  return {
    command: "git reset --soft HEAD~1",
    description: "Undo the last commit but keep changes staged",
    source: "mock-db",
  };
}
