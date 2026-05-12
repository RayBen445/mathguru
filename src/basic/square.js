/**
 * square.js
 * Returns the square of a number.
 */

const { validateRequiredArgs, validateNumber } = require('../utils/validation');

/**
 * Squares a number.
 *
 * @param {number} x - Number to square.
 * @returns {number} The square of x.
 */
function square(x) {
  validateRequiredArgs('square', arguments.length, 1);
  validateNumber(x, 'x', 'square');
  return x * x;
}

module.exports = square;
