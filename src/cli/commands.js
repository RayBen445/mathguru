/**
 * commands.js
 * Shared command metadata and execution logic for CLI argument mode and interactive mode.
 */

const mathguru = require('../../index');
const { parseNumber, parseNumberList } = require('./validation');

const COMMANDS = {
  add: {
    category: 'Basic Math',
    label: 'Add',
    usage: 'mathguru add 2 3',
    args: ['a', 'b'],
    execute: (rawArgs) => mathguru.add(parseNumber(rawArgs[0], 'a', 'add'), parseNumber(rawArgs[1], 'b', 'add')),
  },
  subtract: {
    category: 'Basic Math',
    label: 'Subtract',
    usage: 'mathguru subtract 10 4',
    args: ['a', 'b'],
    execute: (rawArgs) =>
      mathguru.subtract(parseNumber(rawArgs[0], 'a', 'subtract'), parseNumber(rawArgs[1], 'b', 'subtract')),
  },
  multiply: {
    category: 'Basic Math',
    label: 'Multiply',
    usage: 'mathguru multiply 5 6',
    args: ['a', 'b'],
    execute: (rawArgs) =>
      mathguru.multiply(parseNumber(rawArgs[0], 'a', 'multiply'), parseNumber(rawArgs[1], 'b', 'multiply')),
  },
  divide: {
    category: 'Basic Math',
    label: 'Divide',
    usage: 'mathguru divide 20 4',
    args: ['a', 'b'],
    execute: (rawArgs) => mathguru.divide(parseNumber(rawArgs[0], 'a', 'divide'), parseNumber(rawArgs[1], 'b', 'divide')),
  },
  square: {
    category: 'Basic Math',
    label: 'Square',
    usage: 'mathguru square 5',
    args: ['x'],
    execute: (rawArgs) => mathguru.square(parseNumber(rawArgs[0], 'x', 'square')),
  },
  factorial: {
    category: 'Scientific Math',
    label: 'Factorial',
    usage: 'mathguru factorial 5',
    args: ['n'],
    execute: (rawArgs) => mathguru.factorial(parseNumber(rawArgs[0], 'n', 'factorial')),
  },
  power: {
    category: 'Scientific Math',
    label: 'Power',
    usage: 'mathguru power 2 8',
    args: ['base', 'exponent'],
    execute: (rawArgs) => mathguru.power(parseNumber(rawArgs[0], 'base', 'power'), parseNumber(rawArgs[1], 'exponent', 'power')),
  },
  sqrt: {
    category: 'Scientific Math',
    label: 'Square Root',
    usage: 'mathguru sqrt 25',
    args: ['x'],
    execute: (rawArgs) => mathguru.sqrt(parseNumber(rawArgs[0], 'x', 'sqrt')),
  },
  average: {
    category: 'Scientific Math',
    label: 'Average',
    usage: 'mathguru average 1 2 3 4 5',
    args: ['values...'],
    variadic: true,
    execute: (rawArgs) => mathguru.average(parseNumberList(rawArgs, 'average')),
  },
  percentage: {
    category: 'Scientific Math',
    label: 'Percentage',
    usage: 'mathguru percentage 20 100',
    args: ['value', 'total'],
    execute: (rawArgs) =>
      mathguru.percentage(parseNumber(rawArgs[0], 'value', 'percentage'), parseNumber(rawArgs[1], 'total', 'percentage')),
  },
  inflation: {
    category: 'Economics',
    label: 'Inflation Rate',
    usage: 'mathguru inflation 500 700',
    args: ['oldPrice', 'newPrice'],
    execute: (rawArgs) =>
      mathguru.inflationRate(
        parseNumber(rawArgs[0], 'oldPrice', 'inflation'),
        parseNumber(rawArgs[1], 'newPrice', 'inflation')
      ),
  },
  'gdp-growth': {
    category: 'Economics',
    label: 'GDP Growth',
    usage: 'mathguru gdp-growth 10000 12000',
    args: ['oldGDP', 'newGDP'],
    execute: (rawArgs) =>
      mathguru.gdpGrowth(parseNumber(rawArgs[0], 'oldGDP', 'gdp-growth'), parseNumber(rawArgs[1], 'newGDP', 'gdp-growth')),
  },
  'simple-interest': {
    category: 'Finance',
    label: 'Simple Interest',
    usage: 'mathguru simple-interest 1000 5 2',
    args: ['principal', 'rate', 'time'],
    execute: (rawArgs) =>
      mathguru.simpleInterest(
        parseNumber(rawArgs[0], 'principal', 'simple-interest'),
        parseNumber(rawArgs[1], 'rate', 'simple-interest'),
        parseNumber(rawArgs[2], 'time', 'simple-interest')
      ),
  },
  'compound-interest': {
    category: 'Finance',
    label: 'Compound Interest',
    usage: 'mathguru compound-interest 1000 5 2 12',
    args: ['principal', 'rate', 'time', 'frequency'],
    execute: (rawArgs) =>
      mathguru.compoundInterest(
        parseNumber(rawArgs[0], 'principal', 'compound-interest'),
        parseNumber(rawArgs[1], 'rate', 'compound-interest'),
        parseNumber(rawArgs[2], 'time', 'compound-interest'),
        parseNumber(rawArgs[3], 'frequency', 'compound-interest')
      ),
  },
  'loan-repayment': {
    category: 'Finance',
    label: 'Loan Repayment',
    usage: 'mathguru loan-repayment 100000 7.5 60',
    args: ['principal', 'annualRate', 'months'],
    execute: (rawArgs) =>
      mathguru.loanRepayment(
        parseNumber(rawArgs[0], 'principal', 'loan-repayment'),
        parseNumber(rawArgs[1], 'annualRate', 'loan-repayment'),
        parseNumber(rawArgs[2], 'months', 'loan-repayment')
      ),
  },
};

/**
 * Executes a CLI command with validation.
 *
 * @param {string} command - CLI command.
 * @param {Array<string>} rawArgs - Raw CLI args.
 * @returns {number} Calculation result.
 */
function executeCommand(command, rawArgs) {
  const definition = COMMANDS[command];
  if (!definition) {
    throw new Error(`Unknown command: ${command}. Run 'mathguru help' to see available commands.`);
  }

  if (definition.variadic) {
    if (rawArgs.length === 0) {
      throw new Error(`${command}: expected at least one numeric argument.`);
    }
  } else if (rawArgs.length !== definition.args.length) {
    throw new Error(`${command}: expected ${definition.args.length} argument(s), but received ${rawArgs.length}.`);
  }

  return definition.execute(rawArgs);
}

/**
 * Returns command definitions grouped by category for menu rendering.
 *
 * @returns {Record<string, Array<{name:string,value:string}>>} Category-to-command mapping.
 */
function getCategoryChoices() {
  const categories = {
    'Basic Math': [],
    'Scientific Math': [],
    Economics: [],
    Finance: [],
  };

  Object.entries(COMMANDS).forEach(([command, definition]) => {
    if (categories[definition.category]) {
      categories[definition.category].push({
        name: definition.label,
        value: command,
      });
    }
  });

  return categories;
}

/**
 * Builds help lines from command metadata.
 *
 * @returns {Array<string>} Help lines.
 */
function getHelpExamples() {
  return Object.values(COMMANDS).map((definition) => `  ${definition.usage}`);
}

module.exports = {
  COMMANDS,
  executeCommand,
  getCategoryChoices,
  getHelpExamples,
};
