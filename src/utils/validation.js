/**
 * validation.js
 * Reusable validation helpers used by all mathguru modules.
 */

/**
 * Ensures a function receives the required number of arguments.
 *
 * @param {string} functionName - The function being validated.
 * @param {number} receivedCount - Number of received arguments.
 * @param {number} expectedCount - Number of required arguments.
 */
function validateRequiredArgs(functionName, receivedCount, expectedCount) {
  if (receivedCount < expectedCount) {
    throw new Error(`${functionName} requires ${expectedCount} argument(s), but received ${receivedCount}.`);
  }
}

/**
 * Ensures a value is a valid finite number.
 *
 * @param {number} value - Value to validate.
 * @param {string} paramName - Parameter name for clear errors.
 * @param {string} functionName - Function name for clear errors.
 */
function validateNumber(value, paramName, functionName) {
  if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
    throw new Error(`${functionName}: '${paramName}' must be a valid finite number.`);
  }
}

/**
 * Ensures a number is an integer.
 *
 * @param {number} value - Value to validate.
 * @param {string} paramName - Parameter name for clear errors.
 * @param {string} functionName - Function name for clear errors.
 */
function validateInteger(value, paramName, functionName) {
  validateNumber(value, paramName, functionName);
  if (!Number.isInteger(value)) {
    throw new Error(`${functionName}: '${paramName}' must be an integer.`);
  }
}

/**
 * Ensures a number is greater than zero.
 *
 * @param {number} value - Value to validate.
 * @param {string} paramName - Parameter name for clear errors.
 * @param {string} functionName - Function name for clear errors.
 */
function validatePositive(value, paramName, functionName) {
  validateNumber(value, paramName, functionName);
  if (value <= 0) {
    throw new Error(`${functionName}: '${paramName}' must be greater than 0.`);
  }
}

/**
 * Ensures a number is zero or greater.
 *
 * @param {number} value - Value to validate.
 * @param {string} paramName - Parameter name for clear errors.
 * @param {string} functionName - Function name for clear errors.
 */
function validateNonNegative(value, paramName, functionName) {
  validateNumber(value, paramName, functionName);
  if (value < 0) {
    throw new Error(`${functionName}: '${paramName}' must be 0 or greater.`);
  }
}

/**
 * Ensures a value is a non-empty array of valid finite numbers.
 *
 * @param {Array<number>} values - Values to validate.
 * @param {string} paramName - Parameter name for clear errors.
 * @param {string} functionName - Function name for clear errors.
 */
function validateNumberArray(values, paramName, functionName) {
  if (!Array.isArray(values)) {
    throw new Error(`${functionName}: '${paramName}' must be an array of numbers.`);
  }

  if (values.length === 0) {
    throw new Error(`${functionName}: '${paramName}' cannot be an empty array.`);
  }

  values.forEach((value, index) => {
    if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
      throw new Error(`${functionName}: '${paramName}[${index}]' must be a valid finite number.`);
    }
  });
}

module.exports = {
  validateRequiredArgs,
  validateNumber,
  validateInteger,
  validatePositive,
  validateNonNegative,
  validateNumberArray,
};
