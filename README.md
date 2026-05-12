# mathguru

[![npm version](https://img.shields.io/npm/v/mathguru.svg)](https://www.npmjs.com/package/mathguru)
[![license](https://img.shields.io/npm/l/mathguru.svg)](LICENSE)
[![tests](https://img.shields.io/badge/tests-jest-brightgreen)](#testing)

A professional developer-focused CLI ecosystem for mathematics, scientific formulas, economics, and finance.

## Installation

```bash
npm install mathguru
```

Global CLI:

```bash
npm install -g mathguru
```

## CLI Usage

```bash
mathguru add 2 3
mathguru sqrt 25
mathguru inflation 500 700
mathguru eval "sqrt(25) + 5"
```

Alias:

```bash
mg add 2 3
```

## Offline Docs / Help

```bash
mathguru docs
mathguru help
```

Includes commands, examples, categories, aliases, and economics/finance usage.

## Precision Controls

Per command:

```bash
mathguru divide 10 3 --precision 2
mathguru sqrt 2 --precision 5
```

Global config:

```bash
mathguru config set precision 2
mathguru config get precision
```

## History System

```bash
mathguru history
mathguru clear-history
```

History entries include:
- command
- inputs
- result
- timestamp

## Export System

```bash
mathguru export history json
mathguru export result csv
```

Formats:
- JSON
- TXT
- CSV

Files are saved under `exports/`.

## Config System

```bash
mathguru config
mathguru config set colors false
mathguru config set exportFormat csv
mathguru config set currencySymbol ₦
mathguru config set shellStartup true
```

Config values are persisted in local `config.json` storage.

## Shell Mode

```bash
mathguru shell
```

Example:

```text
> add 2 3
5

> sqrt 81
9

> inflation 500 700
40
```

Shell supports:
- command history
- `help`
- `clear`
- `exit`

## Formula Engine

```bash
mathguru eval "5 * (10 + 2)"
mathguru eval "sqrt(25) + 5"
mathguru eval "50% * 200"
mathguru eval "2^8"
```

Supported:
- `+ - * /`
- parentheses
- `sqrt(...)`
- powers `^`
- percentages `%`

## Advanced Terminal UX

- `chalk` for colored output
- `figlet` banners
- `ora` spinners
- `inquirer` keyboard-friendly menus
- section dividers and table formatting
- success/error/info styles

## Plugin Foundation

Plugin architecture is initialized in `src/plugins/`.

Prepared for future plugin categories:
- statistics
- graph
- AI
- engineering formulas

## API Usage

```js
const {
  add,
  sqrt,
  inflationRate,
  evaluateExpression,
  setConfigValue,
  readHistory,
} = require('mathguru');

console.log(add(2, 3));
console.log(sqrt(25));
console.log(inflationRate(500, 700));
console.log(evaluateExpression('sqrt(25) + 5'));
setConfigValue('precision', 2);
console.log(readHistory());
```

Type definitions are provided via `types/index.d.ts` for editor autocomplete.

## Screenshots / Output Examples

```text
----------------------------------------
Calculation History
----------------------------------------
timestamp                | command | inputs      | result
-------------------------|---------|-------------|-------
2026-05-12T10:00:00.000Z | add     | ["2","3"] | 5
```

## Testing

```bash
npm test
```

Uses Jest for:
- math functions
- parser
- config/history/export
- CLI commands
- shell helpers
- update notifier integration

## Project Structure

```text
mathguru/
├── bin/
├── src/
│   ├── basic/
│   ├── scientific/
│   ├── economics/
│   ├── finance/
│   ├── cli/
│   ├── shell/
│   ├── parser/
│   ├── config/
│   ├── history/
│   ├── export/
│   ├── plugins/
│   └── utils/
├── tests/
├── exports/
├── types/
├── README.md
├── CHANGELOG.md
├── LICENSE
├── package.json
└── test.js
```

## Contributing

1. Fork and create a feature branch.
2. Add tests for your changes.
3. Run `npm test`.
4. Open a pull request.

## License

[MIT](LICENSE)
