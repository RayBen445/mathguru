#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = process.cwd();
const pkgPath = path.join(root, 'package.json');
const readmePath = path.join(root, 'README.md');
const changelogPath = path.join(root, 'CHANGELOG.md');
const typesPath = path.join(root, 'types', 'index.d.ts');

function ensure(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  ensure(fs.existsSync(pkgPath), 'package.json is missing');
  ensure(fs.existsSync(readmePath), 'README.md is missing');
  ensure(fs.existsSync(changelogPath), 'CHANGELOG.md is missing');
  ensure(fs.existsSync(typesPath), 'types/index.d.ts is missing');

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  ensure(/^\d+\.\d+\.\d+$/.test(pkg.version), `Invalid semver version: ${pkg.version}`);
  ensure(pkg.main && fs.existsSync(path.join(root, pkg.main)), `Main entry not found: ${pkg.main}`);
  ensure(
    pkg.bin && pkg.bin.mathguru && fs.existsSync(path.join(root, pkg.bin.mathguru)),
    'CLI bin entry is invalid'
  );
  ensure(pkg.kontyra && pkg.kontyra.poweredBy === 'Powered by Kontyra', 'Kontyra branding metadata missing');

  execSync('npm pack --dry-run', { stdio: 'inherit' });

  console.log('Package validation passed.');
}

main();
