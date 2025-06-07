import fetch from './fetch.json';
import pull from './pull.json';
import push from './push.json';
import remote from './remote.json';

const remotes = [
  ...fetch,
  ...pull,
  ...push,
  ...remote
];

export default remotes;
