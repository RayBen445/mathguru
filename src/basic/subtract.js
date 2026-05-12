/**
 * subtract.js
 * Returns the difference between two numbers.
 */

const { validateRequiredArgs, validateNumber } = require('../utils/validation');

/**
 * Subtracts the second number from the first number.
 *
 * @param {number} a - The value to subtract from.
 * @param {number} b - The value to subtract.
 * @returns {number} The difference (a - b).
 */
function subtract(a, b) {
  validateRequiredArgs('subtract', arguments.length, 2);
  validateNumber(a, 'a', 'subtract');
  validateNumber(b, 'b', 'subtract');
  return a - b;
}

module.exports = subtract;
