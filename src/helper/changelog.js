import parseChangelog from 'changelog-parser';
import * as core from '@actions/core';
import { resolve } from 'node:path';
import fs from 'node:fs';

const internals = {};

/**
 * Get the changelog content for a specific version.
 * @param {string} version
 * @param {string} path Path to the directory containing CHANGELOG.md
 * @returns {Promise<string>}
 */
internals.getChangelogVersion = async (version, path = './') => {
    const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
    const changelogPath = resolve(workspace, path, 'CHANGELOG.md');

    if (!fs.existsSync(changelogPath)) {
        console.warn(`CHANGELOG.md not found at ${changelogPath}`);
        return undefined;
    }

    try {
        const result = await parseChangelog({
            filePath: changelogPath,
            removeMarkdown: false,
        });

        const versionData = result.versions.find((v) => v.version === version);

        if (versionData) {
            let body = versionData.body.trim();

            // Check if there are any version subheaders (###) within the body
            // These usually look like '### [0.182.2]' or '### v0.182.2'
            const subversionHeaderRegex = /^###\s+\[?v?\d+\.\d+\.\d+\]?/m;
            const match = body.match(subversionHeaderRegex);

            if (match) {
                // Truncate the body before the first subversion header
                body = body.substring(0, match.index).trim();
            }

            return body;
        }

        console.warn(`Version ${version} not found in CHANGELOG.md`);
        return undefined;
    } catch (err) {
        console.error(`Error parsing CHANGELOG.md: ${err.message}`);
        return undefined;
    }
};

export default internals;
