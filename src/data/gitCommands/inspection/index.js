import log from './log.json';
import status from './status.json';
import diff from './diff.json';
import blame from './blame.json';
import reflog from './reflog.json';

const inspectionCommands = [
  ...log,
  ...status,
  ...diff,
  ...blame,
  ...reflog
];

export default inspectionCommands;
