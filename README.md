# mathguru

[![npm version](https://img.shields.io/npm/v/mathguru.svg)](https://www.npmjs.com/package/mathguru)
[![license](https://img.shields.io/npm/l/mathguru.svg)](LICENSE)

A professional Node.js math, economics, and finance library with a polished CLI (command mode + interactive menu mode).

## Version

Current package version: **1.1.0**

---

## Installation

### As a library

```bash
npm install mathguru
```

### As a global CLI

```bash
npm install -g mathguru
```

### Local CLI development

```bash
npm link
```

---

## Project Structure

```text
mathguru/
├── bin/
│   └── mathguru.js
├── src/
│   ├── basic/
│   ├── scientific/
│   ├── economics/
│   ├── finance/
│   ├── cli/
│   └── utils/
├── index.js
├── package.json
├── README.md
└── test.js
```

---

## CLI Usage

### Command mode

```bash
mathguru add 2 3
mathguru factorial 5
mathguru inflation 500 700
mathguru help
mathguru version
```

### Interactive mode

Run without arguments:

```bash
mathguru
```

This opens an interactive terminal app with:

- ASCII startup banner (figlet)
- colored output (chalk)
- category menu:
  - Basic Math
  - Scientific Math
  - Economics
  - Finance
  - Help
  - Exit

---

## Interactive Terminal Output Examples

### Startup example

```text
 __  __       _   _      _____                 
|  \/  | __ _| |_| |__  |  ___|   _ _ __   ___ 
| |\/| |/ _` | __| '_ \ | |_ | | | | '_ \ / _ \
| |  | | (_| | |_| | | ||  _|| |_| | | | |  __/
|_|  |_|\__,_|\__|_| |_||_|   \__,_|_| |_|\___|

Welcome to MathGuru Interactive CLI
Version: 1.1.0
```

### Result example

```text
Select a category: Basic Math
Choose an operation: Add
Enter a: 12
Enter b: 8
Result: 20
```

---

## Command Reference

### Basic Math

- `mathguru add <a> <b>`
- `mathguru subtract <a> <b>`
- `mathguru multiply <a> <b>`
- `mathguru divide <a> <b>`
- `mathguru square <x>`

### Scientific Math

- `mathguru factorial <n>`
- `mathguru power <base> <exponent>`
- `mathguru sqrt <x>`
- `mathguru average <n1> <n2> ...`
- `mathguru percentage <value> <total>`

### Economics

- `mathguru inflation <oldPrice> <newPrice>`
- `mathguru gdp-growth <oldGDP> <newGDP>`

### Finance

- `mathguru simple-interest <principal> <rate> <time>`
- `mathguru compound-interest <principal> <rate> <time> <frequency>`
- `mathguru loan-repayment <principal> <annualRate> <months>`

---

## JavaScript API Usage

```js
const {
  add,
  sqrt,
  factorial,
  simpleInterest,
  compoundInterest,
  inflationRate,
  gdpGrowth,
  loanRepayment,
} = require('mathguru');

console.log(add(2, 3));
console.log(sqrt(25));
console.log(factorial(5));
console.log(simpleInterest(1000, 5, 2));
console.log(compoundInterest(1000, 5, 2, 12));
console.log(inflationRate(500, 700));
console.log(gdpGrowth(10000, 12000));
console.log(loanRepayment(100000, 7.5, 60));
```

---

## Validation and Error Handling

MathGuru validates all inputs and shows friendly errors for:

- missing values
- invalid numbers
- divide-by-zero
- empty average input
- command misuse or unknown command

---

## CommonJS Compatibility

MathGuru remains CommonJS compatible:

- `require()` imports
- `module.exports` exports

---

## Run Tests

```bash
npm test
```

---

## License

[MIT](LICENSE)
