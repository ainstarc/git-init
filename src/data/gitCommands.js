const gitCommands = [
  {
    command: "git init",
    description: "Initialize a new Git repository",
    example: "git init",
    keywords: ["start", "create", "begin", "new", "repository", "repo", "initialize"],
    category: "basics"
  },
  {
    command: "git status",
    description: "Show the working tree status",
    example: "git status",
    keywords: ["check", "state", "changes", "modified", "status", "files"],
    category: "basics"
  },
  {
    command: "git add",
    description: "Add file contents to the index",
    example: "git add <file>",
    keywords: ["stage", "track", "include", "add files", "staging"],
    category: "basics"
  },
  {
    command: "git add .",
    description: "Add all files to the index",
    example: "git add .",
    keywords: ["stage all", "track all", "add everything", "all files", "all changes"],
    category: "basics"
  },
  {
    command: "git commit",
    description: "Record changes to the repository",
    example: 'git commit -m "your message"',
    keywords: ["save", "record", "snapshot", "commit changes", "save changes"],
    category: "basics"
  },
  {
    command: "git push",
    description: "Update remote refs along with associated objects",
    example: "git push origin main",
    keywords: ["upload", "publish", "send", "share", "upload changes", "push changes"],
    category: "remote"
  },
  {
    command: "git pull",
    description: "Fetch from and integrate with another repository or a local branch",
    example: "git pull origin main",
    keywords: ["download", "update", "get", "fetch", "sync", "pull changes"],
    category: "remote"
  },
  {
    command: "git clone",
    description: "Clone a repository into a new directory",
    example: "git clone https://github.com/user/repo.git",
    keywords: ["copy", "download", "duplicate", "get repo", "clone repo"],
    category: "remote"
  },
  {
    command: "git branch",
    description: "List, create, or delete branches",
    example: "git branch new-feature",
    keywords: ["branches", "list branches", "show branches", "create branch"],
    category: "branching"
  },
  {
    command: "git checkout",
    description: "Switch branches or restore working tree files",
    example: "git checkout main",
    keywords: ["switch", "change", "move", "go to", "checkout branch"],
    category: "branching"
  },
  {
    command: "git switch",
    description: "Switch branches (newer alternative to checkout)",
    example: "git switch main",
    keywords: ["switch", "change", "move", "go to", "switch branch"],
    category: "branching"
  },
  {
    command: "git merge",
    description: "Join two or more development histories together",
    example: "git merge feature-branch",
    keywords: ["combine", "join", "integrate", "merge branches", "merge code"],
    category: "branching"
  },
  {
    command: "git log",
    description: "Show commit logs",
    example: "git log",
    keywords: ["history", "commits", "changes", "view history", "show commits"],
    category: "history"
  },
  {
    command: "git diff",
    description: "Show changes between commits, commit and working tree, etc",
    example: "git diff",
    keywords: ["compare", "changes", "difference", "what changed", "show changes"],
    category: "history"
  },
  {
    command: "git reset",
    description: "Reset current HEAD to the specified state",
    example: "git reset --hard HEAD~1",
    keywords: ["undo", "revert", "go back", "reset changes", "undo commit"],
    category: "advanced"
  },
  {
    command: "git stash",
    description: "Stash the changes in a dirty working directory away",
    example: "git stash",
    keywords: ["save", "store", "hide", "stash changes", "save temporarily"],
    category: "advanced"
  },
  {
    command: "git remote",
    description: "Manage set of tracked repositories",
    example: "git remote -v",
    keywords: ["remote", "origin", "repository", "remote repo", "show remotes"],
    category: "remote"
  },
  {
    command: "git fetch",
    description: "Download objects and refs from another repository",
    example: "git fetch origin",
    keywords: ["download", "get", "retrieve", "fetch changes", "update refs"],
    category: "remote"
  },
  {
    command: "git rebase",
    description: "Reapply commits on top of another base tip",
    example: "git rebase main",
    keywords: ["reapply", "move", "change base", "rebase branch"],
    category: "advanced"
  },
  {
    command: "git tag",
    description: "Create, list, delete or verify a tag object signed with GPG",
    example: "git tag v1.0.0",
    keywords: ["version", "release", "tag", "mark", "create tag"],
    category: "advanced"
  }
];

export default gitCommands;