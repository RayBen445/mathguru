/**
 * menu.js
 * Interactive CLI menu powered by inquirer.
 */

const figlet = require('figlet');
const packageJson = require('../../package.json');
const { COMMANDS, executeCommand, getCategoryChoices } = require('./commands');
const { parseNumber } = require('./validation');
const colors = require('./colors');
const { printError, printResult, printInfo } = require('./format');
const { buildHelpText } = require('./help');

const CATEGORY_CHOICES = ['Basic Math', 'Scientific Math', 'Economics', 'Finance', 'Help', 'Exit'];
let inquirerInstance;

/**
 * Lazily loads inquirer for interactive prompts.
 *
 * @returns {Promise<object>} Inquirer module instance.
 */
async function getInquirer() {
  if (!inquirerInstance) {
    const module = await import('inquirer');
    inquirerInstance = module.default || module;
  }
  return inquirerInstance;
}

/**
 * Prompts for one numeric value.
 *
 * @param {string} label - Parameter label.
 * @param {string} command - Command key.
 * @returns {Promise<string>} Raw user input.
 */
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

/**
 * Prompts for average values as comma-separated numbers.
 *
 * @returns {Promise<Array<string>>} Raw value list.
 */
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

        const parts = input
          .split(',')
          .map((part) => part.trim())
          .filter(Boolean);

        if (parts.length === 0) {
          return 'average: provide at least one numeric value.';
        }

        const invalid = parts.find((part) => Number.isNaN(Number(part)) || !Number.isFinite(Number(part)));
        if (invalid !== undefined) {
          return 'average: all values must be valid numbers.';
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

/**
 * Runs a selected operation from interactive mode.
 *
 * @param {string} command - Command key.
 */
async function runInteractiveOperation(command) {
  try {
    let rawArgs;

    if (command === 'average') {
      rawArgs = await promptAverageValues();
    } else {
      const definition = COMMANDS[command];
      rawArgs = [];
      for (const arg of definition.args) {
        // eslint-disable-next-line no-await-in-loop
        const value = await promptNumericValue(arg, command);
        rawArgs.push(value);
      }
    }

    const result = executeCommand(command, rawArgs);
    printResult(result);
  } catch (error) {
    printError(error.message);
  }
}

/**
 * Displays startup banner and welcome details.
 */
function showStartup() {
  const banner = figlet.textSync('MathGuru', { horizontalLayout: 'default' });
  console.log(colors.banner(banner));
  console.log(colors.title('Welcome to MathGuru Interactive CLI'));
  console.log(colors.info(`Version: ${packageJson.version}\n`));
}

/**
 * Handles one category menu loop.
 *
 * @param {string} category - Menu category.
 */
async function handleCategory(category) {
  const inquirer = await getInquirer();
  const categoryMap = getCategoryChoices();
  const choices = [...categoryMap[category], { name: 'Back', value: '__back' }];

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

/**
 * Starts interactive CLI mode.
 */
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
      return;
    }

    if (answer.category === 'Help') {
      console.log(buildHelpText(packageJson.version));
      continue;
    }

    await handleCategory(answer.category);
  }
}

module.exports = {
  startInteractiveMode,
};
