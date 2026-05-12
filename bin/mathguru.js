#!/usr/bin/env node

const ora = require('ora');
const figlet = require('figlet');
const packageJson = require('../package.json');
const { executeCommand, resolveCommandName, listCommands } = require('../src/cli/commands');
const { buildHelpText } = require('../src/cli/help');
const colors = require('../src/cli/colors');
const { printError, printInfo, printResult, printSuccess, printSection, printTable } = require('../src/cli/format');
const { startInteractiveMode } = require('../src/cli/menu');
const { readHistory, clearHistory, addHistoryEntry, getLatestHistoryEntry } = require('../src/history/historyManager');
const { readConfig, setConfigValue, getConfigValue } = require('../src/config/configManager');
const { readPrecisionFromArgs, formatWithPrecision } = require('../src/utils/precision');
const { exportData } = require('../src/export/exportManager');
const { startShell } = require('../src/shell/shell');
const { getCommandSuggestions } = require('../src/utils/suggestions');
const { listPlugins, loadBuiltInPlugins } = require('../src/plugins/loader');
const { runUpdateNotifier } = require('../src/cli/updateNotifier');

function printHistory() {
  const history = readHistory();
  printSection('Calculation History');
  printTable(
    history.map((entry) => ({
      timestamp: entry.timestamp,
      command: entry.command,
      inputs: JSON.stringify(entry.inputs),
      result: entry.result,
    }))
  );
}

function printConfig(config) {
  printSection('Configuration');
  printTable(
    Object.entries(config).map(([key, value]) => ({
      key,
      value: String(value),
    }))
  );
}

async function main() {
  const config = readConfig();
  colors.setColorsEnabled(config.colors);
  loadBuiltInPlugins();
  runUpdateNotifier(packageJson);

  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    if (config.shellStartup) {
      await startShell();
      return;
    }
    console.log(colors.banner(figlet.textSync('MathGuru', { horizontalLayout: 'default' })));
    await startInteractiveMode();
    return;
  }

  if (command === 'help' || command === 'docs') {
    printInfo(buildHelpText(packageJson.version));
    return;
  }

  if (command === 'version') {
    printInfo(packageJson.version);
    return;
  }

  if (command === 'history') {
    printHistory();
    return;
  }

  if (command === 'clear-history') {
    clearHistory();
    printSuccess('History cleared successfully.');
    return;
  }

  if (command === 'plugins') {
    printSection('Plugins');
    printTable(listPlugins().map((plugin) => ({ name: plugin.name, version: plugin.version, description: plugin.description })));
    return;
  }

  if (command === 'config') {
    const sub = args[1];
    if (!sub) {
      printConfig(getConfigValue());
      return;
    }

    if (sub === 'get') {
      const key = args[2];
      if (!key) {
        throw new Error('config get: key is required.');
      }
      printInfo(`${key}: ${String(getConfigValue(key))}`);
      return;
    }

    if (sub === 'set') {
      const key = args[2];
      const value = args[3];
      if (!key || value === undefined) {
        throw new Error('config set: usage mathguru config set <key> <value>');
      }
      const updated = setConfigValue(key, value);
      printSuccess(`Updated ${key} = ${updated}`);
      return;
    }

    throw new Error(`config: unknown subcommand '${sub}'.`);
  }

  if (command === 'export') {
    const target = args[1];
    const format = (args[2] || config.exportFormat || 'json').toLowerCase();
    const spinner = ora('Exporting...').start();

    try {
      if (target === 'history') {
        const filePath = exportData('history', readHistory(), format);
        spinner.succeed(`Exported history to ${filePath}`);
        return;
      }

      if (target === 'result') {
        const latest = getLatestHistoryEntry();
        if (!latest) {
          throw new Error('export result: no latest result found.');
        }
        const filePath = exportData('result', latest, format);
        spinner.succeed(`Exported latest result to ${filePath}`);
        return;
      }

      throw new Error('export: usage mathguru export <history|result> [json|txt|csv]');
    } catch (error) {
      spinner.fail('Export failed');
      throw error;
    }
  }

  if (command === 'shell') {
    await startShell();
    return;
  }

  const rawArgs = args.slice(1);
  const { args: cleanArgs, precision } = readPrecisionFromArgs(rawArgs);
  const finalPrecision = precision ?? config.precision;
  const resolvedCommand = resolveCommandName(command);

  try {
    const spinner = ['eval', 'compound-interest', 'loan-repayment'].includes(resolvedCommand)
      ? ora('Processing...').start()
      : null;

    const result = executeCommand(resolvedCommand, cleanArgs);
    if (spinner) {
      spinner.succeed('Done');
    }

    addHistoryEntry(resolvedCommand, cleanArgs, Number(result));
    printResult(formatWithPrecision(result, finalPrecision));
  } catch (error) {
    const suggestions = getCommandSuggestions(command, listCommands());
    printError(error.message);
    if (error.message.startsWith('Unknown command') && suggestions.length > 0) {
      printInfo('\nDid you mean:');
      suggestions.forEach((suggestion) => printInfo(`- ${suggestion}`));
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  printError(error.message || 'Unexpected CLI failure.');
  process.exit(1);
});
