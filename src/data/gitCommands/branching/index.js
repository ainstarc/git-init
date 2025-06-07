// Combine all modular branching command data
import branch from './branch.json';
import rebase from './rebase.json';
import checkout from './checkout.json';
import switchCmd from './switch.json';

const branchingCommands = [
  ...branch,
  ...rebase,
  ...checkout,
  ...switchCmd
];

export default branchingCommands;
