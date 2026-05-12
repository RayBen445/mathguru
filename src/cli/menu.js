const ora = require('ora');
const packageJson = require('../../package.json');
const { COMMANDS, executeCommand, getCategoryChoices } = require('./commands');
const { parseNumber } = require('./validation');
const colors = require('./colors');
const { printError, printResult, printInfo, printFooter } = require('./format');
const { buildHelpText } = require('./help');
const { readConfig } = require('../config/configManager');
const { addHistoryEntry } = require('../history/historyManager');
const { formatWithPrecision } = require('../utils/precision');
const { buildStartupBanner } = require('./branding');

const CATEGORY_CHOICES = [
  'Basic Math',
  'Scientific Math',
  'Economics',
  'Finance',
  'Symbolic Math',
  'Graphing',
  'LaTeX',
  'Formula Engine',
  'Help',
  'Exit',
];
let inquirerInstance;

async function getInquirer() {
  if (!inquirerInstance) {
    const module = await import('inquirer');
    inquirerInstance = module.default || module;
  }
  return inquirerInstance;
}

async function promptNumericValue(label, command) {
  const inquirer = await getInquirer();
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message: `Enter ${label}:`,
      validate: (input) => {
        try {
          parseNumber(input, label, command);
          return true;
        } catch (error) {
          return error.message;
        }
      },
    },
  ]);

  return answer.value;
}

async function promptTextValue(message) {
  const inquirer = await getInquirer();
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'value',
      message,
      validate: (input) => (input && input.trim() ? true : 'Value is required.'),
    },
  ]);
  return answer.value;
}

async function promptAverageValues() {
  const inquirer = await getInquirer();
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'values',
      message: 'Enter numbers separated by commas (example: 1, 2, 3):',
      validate: (input) => {
        if (!input || !input.trim()) {
          return 'average: provide at least one numeric value.';
        }
        return true;
      },
    },
  ]);

  return answer.values
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

async function runInteractiveOperation(command) {
  try {
    let rawArgs;

    if (command === 'average') {
      rawArgs = await promptAverageValues();
    } else if (command === 'eval' || command === 'calc' || command === 'latex') {
      rawArgs = [await promptTextValue('Enter expression:')];
    } else if (command === 'graph') {
      rawArgs = [await promptTextValue('Enter graph expression (e.g. sin(x)):')];
    } else if (command === 'formula' || command === 'search' || command === 'explain') {
      rawArgs = [await promptTextValue('Enter query/category:')];
    } else {
      const definition = COMMANDS[command];
      rawArgs = [];
      for (const arg of definition.args) {
        const value = await promptNumericValue(arg, command);
        rawArgs.push(value);
      }
    }

    const spinner = ora('Processing...').start();
    const result = executeCommand(command, rawArgs);
    spinner.succeed('Done');

    const config = readConfig();
    if (typeof result === 'number' && Number.isFinite(result)) {
      const formatted = formatWithPrecision(result, config.precision);
      addHistoryEntry(command, rawArgs, Number(result));
      printResult(formatted);
      return;
    }

    addHistoryEntry(command, rawArgs, result);
    printInfo(String(result));
  } catch (error) {
    printError(error.message);
  }
}

function showStartup() {
  console.log(buildStartupBanner());
  console.log(colors.title('Welcome to MathGuru Interactive CLI'));
  console.log(colors.info(`Version: ${packageJson.version}\n`));
}

async function handleCategory(category) {
  const inquirer = await getInquirer();
  const categoryMap = getCategoryChoices();
  const choices = [...(categoryMap[category] || []), { name: 'Back', value: '__back' }];

  while (true) {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'operation',
        message: `${category} - Choose an operation:`,
        choices,
      },
    ]);

    if (answer.operation === '__back') {
      return;
    }

    await runInteractiveOperation(answer.operation);
    printInfo('');
  }
}

async function startInteractiveMode() {
  const inquirer = await getInquirer();
  showStartup();

  while (true) {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'category',
        message: 'Select a category:',
        choices: CATEGORY_CHOICES,
      },
    ]);

    if (answer.category === 'Exit') {
      printInfo('Goodbye from MathGuru!');
      printFooter();
      return;
    }

    if (answer.category === 'Help') {
      console.log(buildHelpText(packageJson.version));
      printFooter();
      continue;
    }

    await handleCategory(answer.category);
  }
}

module.exports = {
  startInteractiveMode,
};
