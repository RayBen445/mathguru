const readline = require('readline');
const packageJson = require('../../package.json');
const { executeCommand, resolveCommandName } = require('../cli/commands');
const { buildDocsText } = require('../cli/docs');
const { addHistoryEntry } = require('../history/historyManager');
const { readConfig } = require('../config/configManager');
const { formatWithPrecision, readPrecisionFromArgs } = require('../utils/precision');
const colors = require('../cli/colors');
const { POWERED_BY_KONTYRA } = require('../cli/branding');

function splitArgs(input) {
  const result = [];
  const regex = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let match;
  while ((match = regex.exec(input)) !== null) {
    result.push(match[1] ?? match[2] ?? match[3]);
  }
  return result;
}

function createSessionStats() {
  return {
    startedAt: new Date(),
    commandsRun: 0,
    successes: 0,
    errors: 0,
  };
}

function getSessionStatsRows(stats) {
  const uptimeSeconds = Math.max(0, Math.floor((Date.now() - stats.startedAt.getTime()) / 1000));
  return [
    { metric: 'Commands run', value: stats.commandsRun },
    { metric: 'Successful commands', value: stats.successes },
    { metric: 'Failed commands', value: stats.errors },
    { metric: 'Session uptime (s)', value: uptimeSeconds },
  ];
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

  if (command === 'stats') {
    return { type: 'stats' };
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
  const stats = createSessionStats();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    historySize: 1000,
    prompt: colors.prompt('mathguru> '),
  });

  console.log(colors.title(`MathGuru Shell v${packageJson.version}`));
  console.log(colors.brand(POWERED_BY_KONTYRA));
  console.log(colors.info('Type help for commands, clear to clear, stats for session stats, exit to quit.'));
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
      if (result.type === 'stats') {
        console.log(colors.section('Session Statistics'));
        getSessionStatsRows(stats).forEach((row) => {
          console.log(`${colors.info(row.metric)}: ${colors.value(String(row.value))}`);
        });
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

      stats.commandsRun += 1;
      stats.successes += 1;
      console.log(colors.success(result.output));
      rl.prompt();
    } catch (error) {
      stats.commandsRun += 1;
      stats.errors += 1;
      console.error(colors.error(`Error: ${error.message}`));
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log(colors.section('Session Statistics'));
    getSessionStatsRows(stats).forEach((row) => {
      console.log(`${colors.info(row.metric)}: ${colors.value(String(row.value))}`);
    });
    console.log(colors.brand(POWERED_BY_KONTYRA));
    console.log(colors.info('Goodbye from MathGuru shell!'));
  });
}

module.exports = {
  splitArgs,
  handleShellLine,
  createSessionStats,
  getSessionStatsRows,
  startShell,
};
