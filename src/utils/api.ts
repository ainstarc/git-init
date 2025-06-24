const API_URL = import.meta.env.VITE_API_URL;

export async function fetchQueryResponse(query: string) {
  const response = await fetch(`${API_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) throw new Error("Request failed");
  return await response.json();
}

export const pingServer = async (): Promise<number | null> => {
  const start = performance.now();
  try {
    const response = await fetch(`${API_URL}/ping`);
    if (!response.ok) throw new Error("Server error");
    const end = performance.now();
    return Math.round(end - start);
  } catch (error) {
    console.error("Ping failed:", error);
    return null;
  }
};
