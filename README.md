# mathguru

[![npm version](https://img.shields.io/npm/v/mathguru.svg)](https://www.npmjs.com/package/mathguru)
[![license](https://img.shields.io/npm/l/mathguru.svg)](LICENSE)

A professional, beginner-friendly Node.js utility for **math**, **economics**, and **finance** calculations.

## Version

Current package version: **1.1.0**

---

## Installation

### Library usage

```bash
npm install mathguru
```

### Global CLI usage

```bash
npm install -g mathguru
```

### Local CLI testing (development)

```bash
npm link
```

---

## Usage (JavaScript)

```js
const mathguru = require('mathguru');

console.log(mathguru.add(2, 3));
console.log(mathguru.sqrt(25));
console.log(mathguru.simpleInterest(1000, 5, 2));
```

---

## Usage (CLI)

```bash
mathguru add 2 3
mathguru subtract 10 4
mathguru multiply 5 6
mathguru divide 20 4
mathguru square 5
mathguru factorial 5
mathguru sqrt 25
mathguru percentage 20 100
mathguru simple-interest 1000 5 2
mathguru compound-interest 1000 5 2 12
mathguru inflation 500 700
mathguru gdp-growth 10000 12000
mathguru help
mathguru version
```

---

## API Documentation

### Basic Functions

- `add(a, b)` → sum of two numbers.
- `subtract(a, b)` → difference (`a - b`).
- `multiply(a, b)` → product of two numbers.
- `divide(a, b)` → quotient (`a / b`), throws on divide-by-zero.
- `square(x)` → square of a number.

### Scientific Functions

- `sqrt(x)` → square root of a non-negative number.
- `power(base, exponent)` → raises `base` to `exponent`.
- `factorial(n)` → factorial of a non-negative integer.
- `percentage(value, total)` → percentage of `value` in `total`.
- `modulus(a, b)` → remainder of `a % b`.
- `average(array)` → arithmetic mean of an array of numbers.

### Economics & Finance Functions

- `simpleInterest(principal, rate, time)`
- `compoundInterest(principal, rate, time, frequency)`
- `inflationRate(oldPrice, newPrice)`
- `gdpGrowth(oldGDP, newGDP)`
- `loanRepayment(principal, annualRate, months)`

---

## Economics Examples

```js
const {
  simpleInterest,
  compoundInterest,
  inflationRate,
  gdpGrowth,
  loanRepayment,
} = require('mathguru');

console.log(simpleInterest(1000, 5, 2));         // 100
console.log(compoundInterest(1000, 5, 2, 12));   // 104.94133555832692
console.log(inflationRate(500, 700));            // 40
console.log(gdpGrowth(10000, 12000));            // 20
console.log(loanRepayment(100000, 7.5, 60));     // 2003.7948595213268
```

---

## Input Validation & Error Handling

All functions validate required arguments and numeric input.

Examples of validation errors:

- missing arguments
- invalid numbers (`NaN`, `Infinity`, non-number types)
- divide-by-zero conditions
- empty arrays for `average`

---

## CommonJS Compatibility

This package is fully CommonJS-compatible:

- uses `require()` imports
- uses `module.exports` exports

---

## Run Tests

```bash
npm test
```

---

## License

[MIT](LICENSE)
