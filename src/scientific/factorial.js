/**
 * factorial.js
 * Calculates factorial for a non-negative integer.
 */

const { validateRequiredArgs, validateInteger, validateNonNegative } = require('../utils/validation');

/**
 * Calculates n! for a non-negative integer n.
 *
 * @param {number} n - The non-negative integer.
 * @returns {number} The factorial value.
 */
function factorial(n) {
  validateRequiredArgs('factorial', arguments.length, 1);
  validateInteger(n, 'n', 'factorial');
  validateNonNegative(n, 'n', 'factorial');

  let result = 1;
  for (let i = 2; i <= n; i += 1) {
    result *= i;
  }

  return result;
}

module.exports = factorial;
