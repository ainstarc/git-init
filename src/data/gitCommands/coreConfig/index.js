import config from './config.json';
import user from './user.json';
import alias from './alias.json';
import editor from './editor.json';

const coreConfig = [
  ...config,
  ...user,
  ...alias,
  ...editor
];

export default coreConfig;
