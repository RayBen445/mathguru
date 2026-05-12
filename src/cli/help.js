/**
 * help.js
 * Help and usage output utilities for the CLI.
 */

const { getHelpExamples } = require('./commands');

/**
 * Generates complete help text for command usage.
 *
 * @param {string} version - Current package version.
 * @returns {string} Formatted help text.
 */
function buildHelpText(version) {
  return `MathGuru CLI v${version}

Usage:
  mathguru <command> [arguments]
  mathguru

Command Examples:
${getHelpExamples().join('\n')}
  mathguru help
  mathguru version

Interactive Mode:
  Run 'mathguru' with no arguments to open the interactive terminal menu.
`;
}

module.exports = {
  buildHelpText,
};
