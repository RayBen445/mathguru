/**
 * average.js
 * Calculates the arithmetic mean of an array of numbers.
 */

const { validateRequiredArgs, validateNumberArray } = require('../utils/validation');

/**
 * Calculates average of numeric values.
 *
 * @param {Array<number>} array - Array of numbers.
 * @returns {number} Arithmetic mean.
 */
function average(array) {
  validateRequiredArgs('average', arguments.length, 1);
  validateNumberArray(array, 'array', 'average');

  const sum = array.reduce((accumulator, value) => accumulator + value, 0);
  return sum / array.length;
}

module.exports = average;
