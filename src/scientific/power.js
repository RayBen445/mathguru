/**
 * power.js
 * Raises a base to a given exponent.
 */

const { validateRequiredArgs, validateNumber } = require('../utils/validation');

/**
 * Calculates base raised to exponent.
 *
 * @param {number} base - The base number.
 * @param {number} exponent - The exponent value.
 * @returns {number} The calculated power.
 */
function power(base, exponent) {
  validateRequiredArgs('power', arguments.length, 2);
  validateNumber(base, 'base', 'power');
  validateNumber(exponent, 'exponent', 'power');
  return Math.pow(base, exponent);
}

module.exports = power;
