import init from './init.json';
import restore from './restore.json';
import stash from './stash.json';
import clean from './clean.json';
import mv from './mv.json';
import rm from './rm.json';

const workingTree = [
  ...init,
  ...restore,
  ...stash,
  ...clean,
  ...mv,
  ...rm
];

export default workingTree;
