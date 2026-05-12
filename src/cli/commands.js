const mathguru = require('../../index');
const { parseNumber, parseNumberList } = require('./validation');
const { evaluateExpression } = require('../parser/expressionParser');
const {
  list: listFormulas,
  get: getFormula,
  search: searchFormulas,
  explain: explainFormula,
  getCategories,
  formatFormulaSummary,
} = require('../formulas/formulaEngine');
const { runDoctor, formatDoctorReport } = require('../core/doctor');

const COMMAND_ALIASES = {
  plus: 'add',
  sub: 'subtract',
  mul: 'multiply',
  div: 'divide',
  fact: 'factorial',
  infl: 'inflation',
  gdp: 'gdp-growth',
  si: 'simple-interest',
  ci: 'compound-interest',
  loan: 'loan-repayment',
  plot: 'graph',
};

function parseOptions(rawArgs) {
  const args = [...rawArgs];
  const positionals = [];
  const options = {};

  while (args.length > 0) {
    const token = args.shift();
    if (token && token.startsWith('--')) {
      const key = token.replace(/^--/, '');
      options[key] = args.shift();
    } else {
      positionals.push(token);
    }
  }

  return { positionals, options };
}

function parseGraphArgs(rawArgs) {
  const { positionals, options } = parseOptions(rawArgs);
  return {
    expression: positionals[0],
    options,
  };
}

function executeFormulaCommand(rawArgs) {
  if (rawArgs.length === 0) {
    return `Available formula categories:\n${getCategories()
      .map((item) => `- ${item}`)
      .join('\n')}`;
  }

  if (rawArgs[0] === 'search') {
    const query = rawArgs.slice(1).join(' ');
    const results = searchFormulas(query);
    return `Formula search results for '${query}':\n${formatFormulaSummary(results.slice(0, 10))}`;
  }

  const [category, maybeFormula] = rawArgs;
  if (!maybeFormula) {
    const items = listFormulas(category);
    return `Formulas in ${category}:\n${formatFormulaSummary(items)}`;
  }

  const formula = getFormula(maybeFormula, category);
  if (!formula) {
    throw new Error(`formula: no formula named '${maybeFormula}' in category '${category}'.`);
  }

  return explainFormula(maybeFormula, { category });
}

const COMMANDS = {
  add: {
    category: 'Basic Math',
    label: 'Add',
    usage: 'mathguru add 2 3',
    args: ['a', 'b'],
    execute: (rawArgs) =>
      mathguru.add(parseNumber(rawArgs[0], 'a', 'add'), parseNumber(rawArgs[1], 'b', 'add')),
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
    execute: (rawArgs) =>
      mathguru.divide(parseNumber(rawArgs[0], 'a', 'divide'), parseNumber(rawArgs[1], 'b', 'divide')),
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
    execute: (rawArgs) =>
      mathguru.power(parseNumber(rawArgs[0], 'base', 'power'), parseNumber(rawArgs[1], 'exponent', 'power')),
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
      mathguru.percentage(
        parseNumber(rawArgs[0], 'value', 'percentage'),
        parseNumber(rawArgs[1], 'total', 'percentage')
      ),
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
      mathguru.gdpGrowth(
        parseNumber(rawArgs[0], 'oldGDP', 'gdp-growth'),
        parseNumber(rawArgs[1], 'newGDP', 'gdp-growth')
      ),
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
  eval: {
    category: 'Scientific Math',
    label: 'Evaluate Expression',
    usage: 'mathguru eval "sqrt(25) + 5"',
    args: ['expression'],
    variadic: true,
    execute: (rawArgs) => evaluateExpression(rawArgs.join(' ')),
  },
  calc: {
    category: 'Symbolic Math',
    label: 'Symbolic Calculator',
    usage: 'mathguru calc "integrate(sin(x))"',
    args: ['expression'],
    variadic: true,
    execute: (rawArgs) => mathguru.calc.run(rawArgs.join(' ')),
  },
  graph: {
    category: 'Graphing',
    label: 'Graph Function',
    usage: 'mathguru graph "sin(x)" [--format ascii|svg|png] [--size 80x20]',
    args: ['expression', 'options...'],
    variadic: true,
    execute: (rawArgs) => {
      const { expression, options } = parseGraphArgs(rawArgs);
      if (!expression) {
        throw new Error('graph: expression is required.');
      }
      const normalizedFormat = String(options.format || 'ascii').toLowerCase();
      if (['svg', 'png'].includes(normalizedFormat)) {
        const filePath = mathguru.graph.export(expression, options);
        return `Graph exported to ${filePath}`;
      }
      return mathguru.graph.plot(expression, options);
    },
  },
  latex: {
    category: 'LaTeX',
    label: 'LaTeX Converter',
    usage: 'mathguru latex "sin(x)^2 + cos(x)^2"',
    args: ['expression'],
    variadic: true,
    execute: (rawArgs) => mathguru.latex.convert(rawArgs.join(' ')),
  },
  formula: {
    category: 'Formula Engine',
    label: 'Formula Browser',
    usage: 'mathguru formula economics cobb-douglas',
    args: ['category|search', 'formula-or-query...'],
    variadic: true,
    execute: (rawArgs) => executeFormulaCommand(rawArgs),
  },
  search: {
    category: 'Formula Engine',
    label: 'Formula Search',
    usage: 'mathguru search derivative',
    args: ['query'],
    variadic: true,
    execute: (rawArgs) => {
      const { positionals, options } = parseOptions(rawArgs);
      const query = positionals.join(' ');
      const results = searchFormulas(query, options.category ? { category: options.category } : {});
      return `Search results for '${query}':\n${formatFormulaSummary(results.slice(0, 10))}`;
    },
  },
  explain: {
    category: 'Formula Engine',
    label: 'Formula Explanation',
    usage: 'mathguru explain cobb-douglas',
    args: ['formula'],
    variadic: true,
    execute: (rawArgs) => explainFormula(rawArgs.join(' ')),
  },
  trainer: {
    category: 'Education',
    label: 'Trainer',
    usage: 'mathguru trainer calculus --difficulty medium --count 3',
    args: ['category', 'options...'],
    variadic: true,
    execute: (rawArgs) => {
      const { positionals, options } = parseOptions(rawArgs);
      const category = positionals[0];
      if (!category) {
        throw new Error('trainer: category is required (algebra|calculus|statistics).');
      }
      const quiz = mathguru.trainer.generate(
        category,
        options.difficulty || 'easy',
        Number(options.count || 3)
      );
      return mathguru.trainer.format(quiz);
    },
  },
  convert: {
    category: 'Utilities',
    label: 'Unit Converter',
    usage: 'mathguru convert 5 km miles',
    args: ['value', 'from', 'to'],
    variadic: true,
    execute: (rawArgs) => {
      const value = rawArgs[0];
      const from = rawArgs[1];
      const to = rawArgs[2];
      if (value === undefined || !from || !to) {
        throw new Error('convert: usage mathguru convert <value> <fromUnit> <toUnit>');
      }
      const result = mathguru.convert.run(value, from, to);
      return mathguru.convert.format(result);
    },
  },
  md: {
    category: 'Utilities',
    label: 'Markdown Math Formatter',
    usage: 'mathguru md notes.md',
    args: ['filePath'],
    execute: (rawArgs) => {
      const result = mathguru.markdown.processFile(rawArgs[0]);
      return `Formatted ${result.expressions} math expressions in ${result.filePath}`;
    },
  },
  doctor: {
    category: 'Utilities',
    label: 'Platform Diagnostics',
    usage: 'mathguru doctor',
    args: [],
    execute: () => formatDoctorReport(runDoctor()),
  },
};

function resolveCommandName(command) {
  const normalized = String(command || '').toLowerCase();
  return COMMAND_ALIASES[normalized] || normalized;
}

function executeCommand(command, rawArgs) {
  const resolved = resolveCommandName(command);
  const definition = COMMANDS[resolved];
  if (!definition) {
    throw new Error(`Unknown command: ${command}. Run 'mathguru help' to see available commands.`);
  }

  if (definition.variadic) {
    if (rawArgs.length === 0) {
      throw new Error(`${resolved}: expected at least one argument.`);
    }
  } else if (rawArgs.length !== definition.args.length) {
    throw new Error(
      `${resolved}: expected ${definition.args.length} argument(s), but received ${rawArgs.length}.`
    );
  }

  return definition.execute(rawArgs);
}

function getCategoryChoices() {
  const categories = {
    'Basic Math': [],
    'Scientific Math': [],
    Economics: [],
    Finance: [],
    'Symbolic Math': [],
    Graphing: [],
    LaTeX: [],
    'Formula Engine': [],
    Education: [],
    Utilities: [],
  };
  Object.entries(COMMANDS).forEach(([command, definition]) => {
    if (categories[definition.category]) {
      categories[definition.category].push({ name: definition.label, value: command });
    }
  });
  return categories;
}

function getHelpExamples() {
  return Object.values(COMMANDS).map((definition) => `  ${definition.usage}`);
}

function listCommands() {
  return Object.keys(COMMANDS);
}

module.exports = {
  COMMANDS,
  COMMAND_ALIASES,
  executeCommand,
  resolveCommandName,
  getCategoryChoices,
  getHelpExamples,
  listCommands,
};
