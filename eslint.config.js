module.exports = [
  {
    ignores: ['node_modules/**', 'coverage/**', 'exports/**', 'sessions/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-constant-binary-expression': 'error',
    },
  },
];
