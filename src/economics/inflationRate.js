/**
 * inflationRate.js
 * Calculates inflation rate between an old and new price.
 */

const {
  validateRequiredArgs,
  validateNumber,
} = require('../utils/validation');

/**
 * Calculates inflation rate: ((newPrice - oldPrice) / oldPrice) * 100.
 *
 * @param {number} oldPrice - Previous period price.
 * @param {number} newPrice - Current period price.
 * @returns {number} Inflation rate percentage.
 */
function inflationRate(oldPrice, newPrice) {
  validateRequiredArgs('inflationRate', arguments.length, 2);
  validateNumber(oldPrice, 'oldPrice', 'inflationRate');
  validateNumber(newPrice, 'newPrice', 'inflationRate');

  if (oldPrice === 0) {
    throw new Error('inflationRate: oldPrice must not be 0.');
  }

  return ((newPrice - oldPrice) / oldPrice) * 100;
}

module.exports = inflationRate;
