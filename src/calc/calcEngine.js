const { create, all } = require('mathjs');
const nerdamer = require('nerdamer');
require('nerdamer/Algebra');
require('nerdamer/Calculus');
require('nerdamer/Solve');
const Algebrite = require('algebrite');

const math = create(all, {});

function normalizeOutput(value) {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((entry) => normalizeOutput(entry));
  }
  if (typeof value.toString === 'function') {
    return value.toString();
  }
  return String(value);
}

function evaluate(expression, scope = {}) {
  try {
    return normalizeOutput(math.evaluate(expression, scope));
  } catch (error) {
    throw new Error(`calc evaluate failed: ${error.message}`);
  }
}

function simplify(expression) {
  try {
    return normalizeOutput(nerdamer.simplify(expression));
  } catch (_error) {
    return normalizeOutput(Algebrite.simplify(expression));
  }
}

function differentiate(expression, variable = 'x') {
  try {
    return normalizeOutput(nerdamer.diff(expression, variable));
  } catch (_error) {
    return normalizeOutput(Algebrite.run(`d(${expression},${variable})`));
  }
}

function integrate(expression, variable = 'x') {
  try {
    return normalizeOutput(nerdamer.integrate(expression, variable));
  } catch (_error) {
    return normalizeOutput(Algebrite.run(`integral(${expression},${variable})`));
  }
}

function solveEquation(equation, variable = 'x') {
  const normalized = equation.includes('=')
    ? equation.replace(/\s+/g, '')
    : `${equation.replace(/\s+/g, '')}=0`;

  try {
    const result = nerdamer.solve(normalized, variable);
    const output = normalizeOutput(result);
    return Array.isArray(output) ? output.join(', ') : output;
  } catch (error) {
    throw new Error(`calc solve failed: ${error.message}`);
  }
}

function run(expression) {
  const input = String(expression || '').trim();
  if (!input) {
    throw new Error('calc: expression is required.');
  }

  const diffMatch = input.match(/^diff\((.+)\)$/i);
  if (diffMatch) {
    return differentiate(diffMatch[1]);
  }

  const integrateMatch = input.match(/^integrate\((.+)\)$/i);
  if (integrateMatch) {
    return integrate(integrateMatch[1]);
  }

  const simplifyMatch = input.match(/^simplify\((.+)\)$/i);
  if (simplifyMatch) {
    return simplify(simplifyMatch[1]);
  }

  const solveMatch = input.match(/^solve\((.+)\)$/i);
  if (solveMatch) {
    return solveEquation(solveMatch[1]);
  }

  return evaluate(input);
}

module.exports = {
  evaluate,
  simplify,
  differentiate,
  integrate,
  solveEquation,
  run,
};
