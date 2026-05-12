const readline = require('readline');
const packageJson = require('../../package.json');
const { executeCommand, resolveCommandName } = require('../cli/commands');
const { buildDocsText } = require('../cli/docs');
const { addHistoryEntry } = require('../history/historyManager');
const { readConfig } = require('../config/configManager');
const { formatWithPrecision, readPrecisionFromArgs } = require('../utils/precision');

function splitArgs(input) {
  const result = [];
  const regex = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let match;
  while ((match = regex.exec(input)) !== null) {
    result.push(match[1] ?? match[2] ?? match[3]);
  }
  return result;
}

function handleShellLine(line) {
  const trimmed = line.trim();
  if (!trimmed) {
    return { type: 'empty' };
  }

  const tokens = splitArgs(trimmed);
  const command = tokens[0];
  const args = tokens.slice(1);

  if (command === 'help' || command === 'docs') {
    return { type: 'docs' };
  }

  if (command === 'exit') {
    return { type: 'exit' };
  }

  if (command === 'clear') {
    return { type: 'clear' };
  }

  const config = readConfig();
  const { args: cleanedArgs, precision } = readPrecisionFromArgs(args);
  const resolvedCommand = resolveCommandName(command);
  const result = executeCommand(resolvedCommand, cleanedArgs);
  const finalPrecision = precision ?? config.precision;
  addHistoryEntry(resolvedCommand, cleanedArgs, result);

  return {
    type: 'result',
    output: formatWithPrecision(result, finalPrecision),
    command: resolvedCommand,
  };
}

async function startShell() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    historySize: 1000,
    prompt: '> ',
  });

  console.log(`MathGuru Shell v${packageJson.version}`);
  console.log('Type help for commands, clear to clear, exit to quit.');
  rl.prompt();

  rl.on('line', (line) => {
    try {
      const result = handleShellLine(line);
      if (result.type === 'empty') {
        rl.prompt();
        return;
      }
      if (result.type === 'docs') {
        console.log(buildDocsText(packageJson.version));
        rl.prompt();
        return;
      }
      if (result.type === 'clear') {
        console.clear();
        rl.prompt();
        return;
      }
      if (result.type === 'exit') {
        rl.close();
        return;
      }

      console.log(result.output);
      rl.prompt();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log('Goodbye from MathGuru shell!');
  });
}

module.exports = {
  splitArgs,
  handleShellLine,
  startShell,
};
