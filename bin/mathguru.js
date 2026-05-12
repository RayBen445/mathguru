#!/usr/bin/env node

/**
 * mathguru CLI
 * Parses terminal commands and runs mathguru library functions.
 */

const mathguru = require('../index');
const packageJson = require('../package.json');

/**
 * Prints CLI help information.
 */
function printHelp() {
  console.log(`mathguru CLI v${packageJson.version}

Usage:
  mathguru <command> [arguments]

Math commands:
  mathguru add 2 3
  mathguru subtract 10 4
  mathguru multiply 5 6
  mathguru divide 20 4
  mathguru square 5

Scientific commands:
  mathguru factorial 5
  mathguru sqrt 25
  mathguru power 2 8
  mathguru percentage 20 100
  mathguru modulus 10 3
  mathguru average 1 2 3 4 5

Economics & finance commands:
  mathguru simple-interest 1000 5 2
  mathguru compound-interest 1000 5 2 12
  mathguru inflation 500 700
  mathguru gdp-growth 10000 12000
  mathguru loan-repayment 100000 7.5 60

Utility commands:
  mathguru help
  mathguru version
`);
}

/**
 * Converts argument strings to numbers and validates them.
 *
 * @param {string} command - CLI command name.
 * @param {Array<string>} values - Raw argument values.
 * @returns {Array<number>} Parsed numeric values.
 */
function parseNumericArgs(command, values) {
  const parsed = values.map((value) => Number(value));

  parsed.forEach((value, index) => {
    if (Number.isNaN(value) || !Number.isFinite(value)) {
      throw new Error(`${command}: argument ${index + 1} must be a valid number.`);
    }
  });

  return parsed;
}

const commands = {
  add: { fn: mathguru.add, expectedArgs: 2 },
  subtract: { fn: mathguru.subtract, expectedArgs: 2 },
  multiply: { fn: mathguru.multiply, expectedArgs: 2 },
  divide: { fn: mathguru.divide, expectedArgs: 2 },
  square: { fn: mathguru.square, expectedArgs: 1 },
  factorial: { fn: mathguru.factorial, expectedArgs: 1 },
  sqrt: { fn: mathguru.sqrt, expectedArgs: 1 },
  power: { fn: mathguru.power, expectedArgs: 2 },
  percentage: { fn: mathguru.percentage, expectedArgs: 2 },
  modulus: { fn: mathguru.modulus, expectedArgs: 2 },
  average: { fn: mathguru.average, expectedArgs: null },
  'simple-interest': { fn: mathguru.simpleInterest, expectedArgs: 3 },
  'compound-interest': { fn: mathguru.compoundInterest, expectedArgs: 4 },
  inflation: { fn: mathguru.inflationRate, expectedArgs: 2 },
  'gdp-growth': { fn: mathguru.gdpGrowth, expectedArgs: 2 },
  'loan-repayment': { fn: mathguru.loanRepayment, expectedArgs: 3 },
};

const [command, ...rawArgs] = process.argv.slice(2);

if (!command || command === 'help') {
  printHelp();
  process.exit(0);
}

if (command === 'version') {
  console.log(packageJson.version);
  process.exit(0);
}

const commandConfig = commands[command];

if (!commandConfig) {
  console.error(`Unknown command: ${command}`);
  console.error('Run "mathguru help" to see available commands.');
  process.exit(1);
}

if (commandConfig.expectedArgs !== null && rawArgs.length !== commandConfig.expectedArgs) {
  console.error(
    `${command}: expected ${commandConfig.expectedArgs} argument(s), but received ${rawArgs.length}.`
  );
  console.error('Run "mathguru help" to see usage examples.');
  process.exit(1);
}

if (command === 'average' && rawArgs.length === 0) {
  console.error('average: provide at least one numeric value.');
  process.exit(1);
}

try {
  const numbers = parseNumericArgs(command, rawArgs);
  const result = command === 'average' ? commandConfig.fn(numbers) : commandConfig.fn(...numbers);
  console.log(`Result: ${result}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
