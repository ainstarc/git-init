export default [
  {
    command: 'git commit -m "Your message"',
    description: "Commit staged changes with a message",
    category: "commits",
    keywords: ["commit", "message", "save"],
  },
  {
    command: "git commit --amend",
    description: "Amend the last commit",
    category: "commits",
    keywords: ["amend", "edit", "fix"],
  },
];
