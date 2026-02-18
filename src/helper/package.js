import fs from 'node:fs';
import { resolve } from 'node:path';

const internals = {};

/**
 * Find package.json with path.
 * @param path
 */
internals.findPackageJson = (path) => {
  const fullPath = resolve(process.cwd(), path, 'package.json');
  console.log(`Looking for package.json in ${fullPath}...`);
  return fs.readFileSync(fullPath).toString();
};

/**
 * Get version field within package.json
 * @param path
 */
internals.getPackageVersion = (path) => {
  const packageJson = internals.findPackageJson(path);

  return JSON.parse(packageJson).version;
};

export default internals;
