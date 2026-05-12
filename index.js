const add = require('./src/basic/add');
const subtract = require('./src/basic/subtract');
const multiply = require('./src/basic/multiply');
const divide = require('./src/basic/divide');
const square = require('./src/basic/square');

const sqrt = require('./src/scientific/sqrt');
const power = require('./src/scientific/power');
const factorial = require('./src/scientific/factorial');
const percentage = require('./src/scientific/percentage');
const modulus = require('./src/scientific/modulus');
const average = require('./src/scientific/average');

const simpleInterest = require('./src/economics/simpleInterest');
const inflationRate = require('./src/economics/inflationRate');
const gdpGrowth = require('./src/economics/gdpGrowth');

const compoundInterest = require('./src/finance/compoundInterest');
const loanRepayment = require('./src/finance/loanRepayment');

const { evaluateExpression } = require('./src/parser/expressionParser');
const { readConfig, setConfigValue, getConfigValue } = require('./src/config/configManager');
const { readHistory, clearHistory } = require('./src/history/historyManager');
const { registerPlugin, listPlugins } = require('./src/plugins/loader');

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  square,
  sqrt,
  power,
  factorial,
  percentage,
  modulus,
  average,
  simpleInterest,
  compoundInterest,
  inflationRate,
  gdpGrowth,
  loanRepayment,
  evaluateExpression,
  readConfig,
  setConfigValue,
  getConfigValue,
  readHistory,
  clearHistory,
  registerPlugin,
  listPlugins,
};
