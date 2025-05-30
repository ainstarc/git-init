const gitCommands = [
  {
    command: "git init",
    description: "Initialize a new Git repository",
    example: "git init",
  },
  {
    command: "git status",
    description: "Show the working tree status",
    example: "git status",
  },
  {
    command: "git add",
    description: "Add file contents to the index",
    example: "git add <file>",
  },
  {
    command: "git commit",
    description: "Record changes to the repository",
    example: 'git commit -m "your message"',
  },
  {
    command: "git push",
    description: "Update remote refs along with associated objects",
    example: "git push origin main",
  },
  {
    command: "git pull",
    description:
      "Fetch from and integrate with another repository or a local branch",
    example: "git pull origin main",
  },
  {
    command: "git clone",
    description: "Clone a repository into a new directory",
    example: "git clone https://github.com/user/repo.git",
  },
  {
    command: "git branch",
    description: "List, create, or delete branches",
    example: "git branch new-feature",
  },
  {
    command: "git checkout",
    description: "Switch branches or restore working tree files",
    example: "git checkout main",
  },
  {
    command: "git merge",
    description: "Join two or more development histories together",
    example: "git merge feature-branch",
  },
];

export default gitCommands;
