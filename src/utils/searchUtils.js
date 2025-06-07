// Stop words for search
export const STOP_WORDS = new Set([
  // ...existing stop words from App.jsx...
  "the", "a", "an", "to", "for", "of", "on", "in", "with", "and", "or", "by", "from", "at", "as", "is", "are", "be", "this", "that", "it", "my", "your", "their", "our", "was", "were", "can", "will", "should", "do", "does", "did", "but", "if", "so", "just", "about", "into", "out", "up", "down", "over", "under", "then", "than", "after", "before", "when", "while", "which", "who", "whom", "whose", "how", "what", "why", "where", "all", "any", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "too", "very", "s", "t", "can", "will", "don", "should", "now"
]);

// Synonym map for expansion
export const SYNONYMS = {
  repo: ["repository", "project"],
  commit: ["save", "record", "snapshot"],
  push: ["upload", "send"],
  pull: ["fetch", "download", "sync"],
  branch: ["switch", "checkout", "change"],
  revert: ["undo", "reset"],
  status: ["changed", "unstaged", "staged"],
  history: ["log"],
  add: ["stage", "track"],
  file: ["files"],
};

export function cleanQuery(query) {
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => !STOP_WORDS.has(word))
    .join(" ");
}

export function expandWithSynonyms(query) {
  const words = query.split(/\s+/);
  let expanded = [...words];
  for (const word of words) {
    for (const [key, syns] of Object.entries(SYNONYMS)) {
      if (word === key || syns.includes(word)) {
        expanded.push(key, ...syns);
      }
    }
  }
  return Array.from(new Set(expanded)).join(" ");
}

export function findPhraseMatches(query) {
  // phrases must be imported in the file using this function
  // e.g. import phrases from '../data/gitCommands/phrases.json'
  // and pass as argument if needed
  return [];
}

export function getHighlightTerms(query) {
  let cleaned = cleanQuery(query);
  cleaned = expandWithSynonyms(cleaned);
  return cleaned.split(/\s+/).filter(Boolean);
}
