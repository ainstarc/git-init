import notes from './notes.json';
import cherryPick from './cherry-pick.json';
import bisect from './bisect.json';
import filterBranch from './filter-branch.json';

const advancedTools = [
  ...notes,
  ...cherryPick,
  ...bisect,
  ...filterBranch
];

export default advancedTools;
