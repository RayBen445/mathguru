/**
 * loanRepayment.js
 * Calculates equal monthly loan repayment (EMI).
 */

const {
  validateRequiredArgs,
  validateNonNegative,
  validatePositive,
  validateInteger,
} = require('../utils/validation');

/**
 * Calculates monthly repayment for a fixed-rate loan.
 *
 * @param {number} principal - Loan amount.
 * @param {number} annualRate - Annual interest rate in percent.
 * @param {number} months - Repayment duration in months.
 * @returns {number} Monthly repayment amount.
 */
function loanRepayment(principal, annualRate, months) {
  validateRequiredArgs('loanRepayment', arguments.length, 3);
  validateNonNegative(principal, 'principal', 'loanRepayment');
  validateNonNegative(annualRate, 'annualRate', 'loanRepayment');
  validateInteger(months, 'months', 'loanRepayment');
  validatePositive(months, 'months', 'loanRepayment');

  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return principal / months;
  }

  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

module.exports = loanRepayment;
