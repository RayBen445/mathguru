/**
 * simpleInterest.js
 * Calculates simple interest using principal, rate, and time.
 */

const { validateRequiredArgs, validateNonNegative } = require('../utils/validation');

/**
 * Calculates simple interest: (principal * rate * time) / 100.
 *
 * @param {number} principal - Initial amount.
 * @param {number} rate - Annual rate in percent.
 * @param {number} time - Time period in years.
 * @returns {number} Simple interest amount.
 */
function simpleInterest(principal, rate, time) {
  validateRequiredArgs('simpleInterest', arguments.length, 3);
  validateNonNegative(principal, 'principal', 'simpleInterest');
  validateNonNegative(rate, 'rate', 'simpleInterest');
  validateNonNegative(time, 'time', 'simpleInterest');

  return (principal * rate * time) / 100;
}

module.exports = simpleInterest;
