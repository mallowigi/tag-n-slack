const fs = require('fs');
const { join } = require('path');

const internals = {};

/**
 * Find package.json with path.
 * @param path
 */
internals.findPackageJson = (path) => {
  console.log(`Looking for package.json in ${path}...`, process.cwd());
  return fs.readFileSync(join(path, 'package.json')).toString();
};

/**
 * Get version field within package.json
 * @param path
 */
internals.getPackageVersion = (path) => {
  const packageJson = internals.findPackageJson(path);

  return JSON.parse(packageJson).version;
};

module.exports = internals;
