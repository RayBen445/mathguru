#!/usr/bin/env node

const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const tag = process.env.GITHUB_REF_NAME || '';

if (!tag) {
  console.log('No tag provided; skipping tag/version verification.');
  process.exit(0);
}

if (!/^v\d+\.\d+\.\d+$/.test(tag)) {
  throw new Error(`Invalid tag format: ${tag}. Expected vMAJOR.MINOR.PATCH`);
}

const expected = `v${pkg.version}`;
if (tag !== expected) {
  throw new Error(`Tag ${tag} does not match package.json version ${expected}`);
}

console.log(`Tag/version verification passed: ${tag}`);
