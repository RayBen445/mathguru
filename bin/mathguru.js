#!/usr/bin/env node

/**
 * mathguru.js
 * CLI entrypoint supporting both argument mode and interactive mode.
 */

const packageJson = require('../package.json');
const { executeCommand } = require('../src/cli/commands');
const { buildHelpText } = require('../src/cli/help');
const { printError, printInfo, printResult } = require('../src/cli/format');
const { startInteractiveMode } = require('../src/cli/menu');

/**
 * Runs the CLI program.
 */
async function main() {
  const [command, ...rawArgs] = process.argv.slice(2);

  if (!command) {
    await startInteractiveMode();
    return;
  }

  if (command === 'help') {
    printInfo(buildHelpText(packageJson.version));
    return;
  }

  if (command === 'version') {
    printInfo(packageJson.version);
    return;
  }

  try {
    const result = executeCommand(command, rawArgs);
    printResult(result);
  } catch (error) {
    printError(error.message);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  printError(error.message || 'Unexpected CLI failure.');
  process.exit(1);
});
