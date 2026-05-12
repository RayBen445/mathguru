function buildDocsText(version) {
  return `MathGuru CLI v${version}

Usage:
- mathguru <command> [arguments]
- mathguru

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
- mathguru export history [json|txt|csv]
- mathguru export result [json|txt|csv]

=== Shell ===
- mathguru shell

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
`;
}

module.exports = {
  buildDocsText,
};
