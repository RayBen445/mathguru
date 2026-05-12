# MathGuru CLI

**Powered by Kontyra**

[![npm version](https://img.shields.io/npm/v/mathguru.svg)](https://www.npmjs.com/package/mathguru)
[![license](https://img.shields.io/npm/l/mathguru.svg)](LICENSE)
[![tests](https://img.shields.io/badge/tests-jest-brightgreen)](#testing)

MathGuru is a polished ecosystem-grade developer terminal toolkit for mathematics, scientific workflows, economics, and finance.

---

## Installation

```bash
npm install mathguru
```

Global CLI:

```bash
npm install -g mathguru
```

CLI aliases:

```bash
mathguru add 2 3
mg sqrt 25
```

---

## Kontyra Branding

MathGuru is delivered as a **Kontyra** product and includes:
- startup banner branding
- help/docs branding
- terminal footer branding
- package metadata branding

Display text:

```text
Powered by Kontyra
```

---

## CLI Examples

```bash
mathguru add 2 3
mathguru divide 10 3 --precision 2
mathguru inflation 500 700
mathguru eval "sqrt(25) + 5"
```

---

## Shell Mode

```bash
mathguru shell
```

Shell features:
- persistent command session
- command history
- `help`, `clear`, `stats`, `exit`
- colorful prompts
- session statistics

Example:

```text
mathguru> add 2 3
5

mathguru> inflation 500 700
40
```

---

## Session Management

```bash
mathguru save-session
mathguru save-session workday
mathguru load-session workday
mathguru export-session markdown workday
```

Session data includes:
- command history
- timestamps
- results

Stored in:
- `sessions/`

Supported session export formats:
- JSON
- TXT
- Markdown

---

## History and Exports

History commands:

```bash
mathguru history
mathguru clear-history
```

Export commands:

```bash
mathguru export history json
mathguru export history markdown
mathguru export result csv
```

Supported export formats:
- JSON
- CSV
- TXT
- Markdown

Stored in:
- `exports/`

---

## Config System

```bash
mathguru config
mathguru config get precision
mathguru config set precision 2
mathguru config set colors false
mathguru config set shellStartup true
mathguru config set exportFormat markdown
```

Config options:
- decimal precision
- colors on/off
- shell startup behavior
- default export format
- currency symbol

Stored locally in user config storage and defaults from project `config.json`.

---

## Offline Documentation

```bash
mathguru docs
mathguru help
```

Includes:
- command categories
- examples
- economics docs
- finance docs
- shell docs
- export docs

---

## Plugin-Ready Architecture

Plugin foundation is available in `src/plugins/`.

Prepared for future extensions:
- statistics plugins
- graphing plugins
- engineering formula plugins
- future AI support architecture (**no AI implementation yet**)

---

## Advanced Terminal UX

Built with:
- `chalk`
- `figlet`
- `ora`
- `inquirer`

Provides:
- loading spinners
- section dividers
- clean spacing
- styled success/error/info output

---

## SDK Usage (CommonJS)

```js
const mathguru = require('mathguru');

console.log(mathguru.add(2, 3));
console.log(mathguru.sqrt(81));
console.log(mathguru.compoundInterest(1000, 5, 2, 12));
console.log(mathguru.evaluateExpression('sqrt(25) + 5'));
```

Type definitions are available via `types/index.d.ts` for autocomplete.

---

## Screenshots / Terminal Example

```text
================================================
   __  __       _   _      _____ _      ___
  |  \/  | __ _| |_| |__  |  ___| |    |_ _|
  | |\/| |/ _` | __| '_ \ | |_  | |     | |
  | |  | | (_| | |_| | | ||  _| | |___  | |
  |_|  |_|\__,_|\__|_| |_||_|   |_____| |___|

Powered by Kontyra
================================================
```

---

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
├── exports/
├── sessions/
├── tests/
├── types/
├── README.md
├── CHANGELOG.md
├── LICENSE
├── package.json
└── test.js
```

---

## Testing

```bash
npm test
npm run test:legacy
```

Jest covers:
- CLI commands
- shell mode
- exports
- configs
- history
- parser
- precision system
- session management

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Add/update tests for changes.
4. Run full test suite.
5. Open a pull request.

---

## License

[MIT](LICENSE)
