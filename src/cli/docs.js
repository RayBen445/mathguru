const { POWERED_BY_KONTYRA } = require('./branding');

function buildDocsText(version) {
  return `MathGuru Unified Platform v${version}
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

=== Symbolic Math ===
- mathguru calc "sqrt(144)"
- mathguru calc "diff(x^2)"
- mathguru calc "integrate(sin(x))"
- mathguru calc "solve(x^2-4=0)"

=== Graphing ===
- mathguru graph "sin(x)"
- mathguru graph "x^2" --format svg --size 640x360
- mathguru graph "cos(x)" --format png

=== LaTeX ===
- mathguru latex "integral x^2"
- mathguru latex "sin(x)^2 + cos(x)^2"

=== Formula Engine ===
- mathguru formula
- mathguru formula calculus
- mathguru formula economics cobb-douglas
- mathguru formula finance compound-interest
- mathguru formula search derivative
- mathguru search inflation --category economics
- mathguru explain cobb-douglas

=== Trainer ===
- mathguru trainer calculus --difficulty medium --count 3
- mathguru trainer algebra --difficulty easy
- mathguru trainer statistics --difficulty hard

=== Unit Conversion ===
- mathguru convert 5 km miles
- mathguru convert 100 celsius fahrenheit
- mathguru convert 10 kg pounds

=== Markdown Math ===
- mathguru md notes.md

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
- mathguru config set graphSize 80x20
- mathguru config set graphFormat svg

=== Export ===
- mathguru export history [json|txt|csv|markdown]
- mathguru export result [json|txt|csv|markdown]

=== Session Management ===
- mathguru save-session [name]
- mathguru load-session [name]
- mathguru export-session [json|txt|markdown|csv] [name]

=== Shell ===
- mathguru shell
- Shell commands: help, clear, stats, exit

Future-ready architecture (not implemented yet):
- AI integrations
- VSCode extension
- REST API server
- cloud sync and collaboration

Terminal Footer:
- ${POWERED_BY_KONTYRA}
`;
}

module.exports = {
  buildDocsText,
};
