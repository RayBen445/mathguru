/**
 * format.js
 * Reusable formatting helpers for CLI output.
 */

const colors = require('./colors');

/**
 * Formats successful result output.
 *
 * @param {number} result - Calculation result.
 */
function printResult(result) {
  console.log(colors.success(`Result: ${colors.value(String(result))}`));
}

/**
 * Formats standard informational output.
 *
 * @param {string} text - Message body.
 */
function printInfo(text) {
  console.log(colors.info(text));
}

/**
 * Formats user-facing error output.
 *
 * @param {string} text - Error message.
 */
function printError(text) {
  console.error(colors.error(`Error: ${text}`));
}

module.exports = {
  printResult,
  printInfo,
  printError,
};
