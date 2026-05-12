/**
 * compoundInterest.js
 * Calculates compound interest earned for given terms.
 */

const { validateRequiredArgs, validateNonNegative, validatePositive } = require('../utils/validation');

/**
 * Calculates compound interest earned.
 * Formula: principal * (1 + rate / (100 * frequency))^(frequency * time) - principal
 *
 * @param {number} principal - Initial amount.
 * @param {number} rate - Annual rate in percent.
 * @param {number} time - Time in years.
 * @param {number} frequency - Compounding frequency per year.
 * @returns {number} Compound interest amount.
 */
function compoundInterest(principal, rate, time, frequency) {
  validateRequiredArgs('compoundInterest', arguments.length, 4);
  validateNonNegative(principal, 'principal', 'compoundInterest');
  validateNonNegative(rate, 'rate', 'compoundInterest');
  validateNonNegative(time, 'time', 'compoundInterest');
  validatePositive(frequency, 'frequency', 'compoundInterest');

  const amount = principal * Math.pow(1 + rate / (100 * frequency), frequency * time);
  return amount - principal;
}

module.exports = compoundInterest;
