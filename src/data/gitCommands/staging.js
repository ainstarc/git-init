export default [
  {
    command: "git add .",
    description: "Stage all modified and new files",
    category: "staging",
    keywords: ["stage", "all", "add"],
  },
  {
    command: "git restore --staged file.txt",
    description: "Unstage a file without deleting changes",
    category: "staging",
    keywords: ["unstage", "restore", "file"],
  },
];
