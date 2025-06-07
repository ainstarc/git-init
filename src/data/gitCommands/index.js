import coreConfig from "./coreConfig";
import staging from "./staging";
import commits from "./commits";
// Add more as needed (e.g., branching, remote, merge, etc.)

const gitCommands = [
  ...coreConfig,
  ...staging,
  ...commits,
  // spread others too
];

export default gitCommands;
