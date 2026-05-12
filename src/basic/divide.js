/**
 * divide.js
 * Returns the quotient of two numbers.
 */

const { validateRequiredArgs, validateNumber } = require('../utils/validation');

/**
 * Divides one number by another number.
 *
 * @param {number} a - The dividend.
 * @param {number} b - The divisor.
 * @returns {number} The quotient (a / b).
 */
function divide(a, b) {
  validateRequiredArgs('divide', arguments.length, 2);
  validateNumber(a, 'a', 'divide');
  validateNumber(b, 'b', 'divide');

  if (b === 0) {
    throw new Error('divide: division by zero is not allowed.');
  }

  return a / b;
}

module.exports = divide;
