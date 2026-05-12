const add = require('../basic/add');
const subtract = require('../basic/subtract');
const multiply = require('../basic/multiply');
const divide = require('../basic/divide');
const square = require('../basic/square');

const sqrt = require('../scientific/sqrt');
const power = require('../scientific/power');
const factorial = require('../scientific/factorial');
const percentage = require('../scientific/percentage');
const modulus = require('../scientific/modulus');
const average = require('../scientific/average');

const simpleInterest = require('../economics/simpleInterest');
const inflationRate = require('../economics/inflationRate');
const gdpGrowth = require('../economics/gdpGrowth');

const compoundInterest = require('../finance/compoundInterest');
const loanRepayment = require('../finance/loanRepayment');

const { evaluateExpression } = require('../parser/expressionParser');
const calc = require('../calc/calcEngine');
const graph = require('../graph/graphEngine');
const latex = require('../latex/latexEngine');
const formulas = require('../formulas/formulaEngine');

module.exports = {
  basic: { add, subtract, multiply, divide, square },
  scientific: { sqrt, power, factorial, percentage, modulus, average },
  economics: {
    simpleInterest,
    inflationRate,
    gdpGrowth,
    cobbDouglas: (A, L, K, alpha, beta) => A * L ** alpha * K ** beta,
  },
  finance: { compoundInterest, loanRepayment },
  calc: {
    evaluate: calc.evaluate,
    simplify: calc.simplify,
    differentiate: calc.differentiate,
    integrate: calc.integrate,
    solve: calc.solveEquation,
    run: calc.run,
  },
  graph: {
    plot: graph.plotAscii,
    export: graph.exportGraph,
  },
  latex: {
    convert: latex.convert,
  },
  formulas: {
    get: formulas.get,
    list: formulas.list,
    search: formulas.search,
    explain: formulas.explain,
    categories: formulas.getCategories,
  },
  parser: { evaluateExpression },
};
