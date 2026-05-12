const { POWERED_BY_KONTYRA } = require('./branding');

function buildDocsText(version) {
  return `MathGuru CLI v${version}
${POWERED_BY_KONTYRA}

Usage:
- mathguru <command> [arguments]
- mathguru
- mg <command> [arguments]

=== Core Commands ===
- mathguru add 2 3
- mathguru sqrt 25
- mathguru inflation 500 700
- mathguru eval "sqrt(25) + 5"

=== Aliases ===
- mg (CLI alias for mathguru)
- fact -> factorial
- div -> divide
- mul -> multiply

=== History ===
- mathguru history
- mathguru clear-history

=== Config ===
- mathguru config
- mathguru config get precision
- mathguru config set precision 2

=== Export ===
- mathguru export history [json|txt|csv|markdown]
- mathguru export result [json|txt|csv|markdown]

=== Session Management ===
- mathguru save-session [name]
- mathguru load-session [name]
- mathguru export-session [json|txt|markdown] [name]

=== Shell ===
- mathguru shell
- Shell commands: help, clear, stats, exit

=== Economics/Finance Examples ===
- mathguru gdp-growth 10000 12000
- mathguru simple-interest 1000 5 2
- mathguru compound-interest 1000 5 2 12
- mathguru loan-repayment 100000 7.5 60

=== Precision ===
- mathguru divide 10 3 --precision 2
- mathguru sqrt 2 --precision 5

Interactive Mode:
- Run 'mathguru' with no arguments to open the interactive terminal menu.

Terminal Footer:
- ${POWERED_BY_KONTYRA}
`;
}

module.exports = {
  buildDocsText,
};
