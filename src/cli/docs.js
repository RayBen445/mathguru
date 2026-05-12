function buildDocsText(version) {
  return `MathGuru CLI v${version}\n\n=== Core Commands ===\n- mathguru add 2 3\n- mathguru sqrt 25\n- mathguru inflation 500 700\n- mathguru eval \"sqrt(25) + 5\"\n\n=== Aliases ===\n- mg (CLI alias for mathguru)\n- fact -> factorial\n- div -> divide\n- mul -> multiply\n\n=== History ===\n- mathguru history\n- mathguru clear-history\n\n=== Config ===\n- mathguru config\n- mathguru config get precision\n- mathguru config set precision 2\n\n=== Export ===\n- mathguru export history [json|txt|csv]\n- mathguru export result [json|txt|csv]\n\n=== Shell ===\n- mathguru shell\n\n=== Economics/Finance Examples ===\n- mathguru gdp-growth 10000 12000\n- mathguru simple-interest 1000 5 2\n- mathguru compound-interest 1000 5 2 12\n- mathguru loan-repayment 100000 7.5 60\n\n=== Precision ===\n- mathguru divide 10 3 --precision 2\n- mathguru sqrt 2 --precision 5\n`;
}

module.exports = {
  buildDocsText,
};
