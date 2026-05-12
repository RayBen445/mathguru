/**
 * multiply.js
 * Returns the product of two numbers.
 */

const { validateRequiredArgs, validateNumber } = require('../utils/validation');

/**
 * Multiplies two numbers.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The product of a and b.
 */
function multiply(a, b) {
  validateRequiredArgs('multiply', arguments.length, 2);
  validateNumber(a, 'a', 'multiply');
  validateNumber(b, 'b', 'multiply');
  return a * b;
}

module.exports = multiply;
