const KEY = "recent_git_searches";

export function getSearchHistory(): string[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function addToSearchHistory(query: string) {
  const existing = getSearchHistory();
  const updated = [query, ...existing.filter((q) => q !== query)].slice(0, 5); // max 5
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function clearSearchHistory() {
  localStorage.removeItem(KEY);
}
