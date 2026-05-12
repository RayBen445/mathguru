#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const tag = process.argv[2];
if (!tag) {
  throw new Error('Tag argument is required. Example: v1.2.0');
}

const version = tag.replace(/^v/, '');
if (!/^\d+\.\d+\.\d+$/.test(version)) {
  throw new Error(`Invalid version tag: ${tag}`);
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
const outputPath = path.join(process.cwd(), 'release-notes.md');
const changelog = fs.readFileSync(changelogPath, 'utf8');

const safeVersion = escapeRegExp(version);
const pattern = new RegExp(`## \\[${safeVersion}\\][\\s\\S]*?(?=\\n## \\[|$)`, 'm');
const match = changelog.match(pattern);

const summary = [
  `# Release ${tag}`,
  '',
  '## Upgrade Summary',
  '- Professional GitHub CI/CD workflows (test, lint, release, publish).',
  '- Semantic-versioning and changelog automation scripts.',
  '- Contributor/security/release documentation and maintainability tooling.',
  '- Kontyra branding and CommonJS/npm compatibility retained.',
  '',
  '## Changelog Extract',
  '',
  match ? match[0] : `No explicit changelog section found for ${version}.`,
].join('\n');

fs.writeFileSync(outputPath, summary);
console.log(`Wrote ${outputPath}`);
