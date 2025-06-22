const HISTORY_KEY = "search_history";
const CACHE_KEY = "search_cache";

export function getSearchHistory(): string[] {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
}

export function addToSearchHistory(query: string) {
  const history = getSearchHistory();
  if (!history.includes(query)) {
    const updated = [query, ...history].slice(0, 20); // cap at 20 entries
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    console.log("Search History updated for {}", query);
  }
}

export function clearSearchHistory() {
  localStorage.removeItem(HISTORY_KEY);
  localStorage.removeItem(CACHE_KEY);
  console.log("Cleared History and Cache");
}

export function saveToCache(query: string, result: any) {
  const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  cache[query.toLowerCase()] = result;
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  console.log("Cache updated for {}", query);
}

export function getCache(): Record<string, any> {
  return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
}
