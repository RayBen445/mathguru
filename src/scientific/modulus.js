/**
 * modulus.js
 * Returns the remainder of a division operation.
 */

const { validateRequiredArgs, validateNumber } = require('../utils/validation');

/**
 * Calculates a % b.
 *
 * @param {number} a - Dividend.
 * @param {number} b - Divisor.
 * @returns {number} Remainder after division.
 */
function modulus(a, b) {
  validateRequiredArgs('modulus', arguments.length, 2);
  validateNumber(a, 'a', 'modulus');
  validateNumber(b, 'b', 'modulus');

  if (b === 0) {
    throw new Error('modulus: division by zero is not allowed.');
  }

  return a % b;
}

module.exports = modulus;
