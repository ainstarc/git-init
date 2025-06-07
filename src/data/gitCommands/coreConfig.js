export default [
  {
    command: 'git config --global user.name "Your Name"',
    description: "Set your global Git username",
    category: "core-config",
    keywords: ["username", "config", "global"],
  },
  {
    command: 'git config --global user.email "you@example.com"',
    description: "Set your global Git email",
    category: "core-config",
    keywords: ["email", "config", "global"],
  },
  {
    command: "git init",
    description: "Initialize a new Git repository",
    category: "core-config",
    keywords: ["init", "repository", "start"],
  },
];
