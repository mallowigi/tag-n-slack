import fs from 'node:fs';
import { resolve } from 'node:path';

const internals = {};

/**
 * Find package.json with path.
 * @param path
 */
internals.findPackageJson = (path) => {
  const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
  const fullPath = resolve(workspace, path, 'package.json');
  console.log(`Looking for package.json in ${fullPath}...`);
  console.log(`Current Working Directory (cwd): ${process.cwd()}`);
  console.log(`GitHub Workspace (GITHUB_WORKSPACE): ${process.env.GITHUB_WORKSPACE || 'Not set'}`);

  try {
    return fs.readFileSync(fullPath).toString();
  } catch (err) {
    console.error(`Error: Could not find or read package.json at ${fullPath}. Error: ${err.message}`);
    throw err;
  }
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
