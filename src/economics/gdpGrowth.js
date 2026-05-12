/**
 * gdpGrowth.js
 * Calculates GDP growth rate between two periods.
 */

const { validateRequiredArgs, validateNumber } = require('../utils/validation');

/**
 * Calculates GDP growth: ((newGDP - oldGDP) / oldGDP) * 100.
 *
 * @param {number} oldGDP - Previous GDP value.
 * @param {number} newGDP - Current GDP value.
 * @returns {number} GDP growth percentage.
 */
function gdpGrowth(oldGDP, newGDP) {
  validateRequiredArgs('gdpGrowth', arguments.length, 2);
  validateNumber(oldGDP, 'oldGDP', 'gdpGrowth');
  validateNumber(newGDP, 'newGDP', 'gdpGrowth');

  if (oldGDP === 0) {
    throw new Error('gdpGrowth: oldGDP must not be 0.');
  }

  return ((newGDP - oldGDP) / oldGDP) * 100;
}

module.exports = gdpGrowth;
