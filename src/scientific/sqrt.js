/**
 * sqrt.js
 * Returns the square root of a number.
 */

const { validateRequiredArgs, validateNumber, validateNonNegative } = require('../utils/validation');

/**
 * Calculates the square root of a non-negative number.
 *
 * @param {number} x - The value to calculate square root for.
 * @returns {number} The square root of x.
 */
function sqrt(x) {
  validateRequiredArgs('sqrt', arguments.length, 1);
  validateNumber(x, 'x', 'sqrt');
  validateNonNegative(x, 'x', 'sqrt');
  return Math.sqrt(x);
}

module.exports = sqrt;
