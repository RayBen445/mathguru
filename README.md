# mathguru

[![npm version](https://img.shields.io/npm/v/mathguru.svg)](https://www.npmjs.com/package/mathguru)
[![license](https://img.shields.io/npm/l/mathguru.svg)](LICENSE)

A beginner-friendly math utility package for Node.js. Perform common arithmetic operations — addition, subtraction, multiplication, division, and squaring — with clean, well-documented functions.

---

## Installation

```bash
npm install mathguru
```

---

## Usage

```js
const mathguru = require('mathguru');

console.log(mathguru.add(3, 5));        // 8
console.log(mathguru.subtract(10, 4));  // 6
console.log(mathguru.multiply(4, 3));   // 12
console.log(mathguru.divide(10, 2));    // 5
console.log(mathguru.square(5));        // 25
```

You can also import individual functions using destructuring:

```js
const { add, subtract, multiply, divide, square } = require('mathguru');

add(2, 3);       // 5
subtract(9, 4);  // 5
multiply(3, 4);  // 12
divide(10, 2);   // 5
square(6);       // 36
```

---

## Functions

### `add(a, b)`

Returns the **sum** of two numbers.

| Parameter | Type   | Description        |
|-----------|--------|--------------------|
| `a`       | number | The first number   |
| `b`       | number | The second number  |

```js
add(2, 3); // 5
```

---

### `subtract(a, b)`

Returns the **difference** between two numbers (`a - b`).

| Parameter | Type   | Description               |
|-----------|--------|---------------------------|
| `a`       | number | The number to subtract from |
| `b`       | number | The number to subtract    |

```js
subtract(10, 4); // 6
```

---

### `multiply(a, b)`

Returns the **product** of two numbers.

| Parameter | Type   | Description        |
|-----------|--------|--------------------|
| `a`       | number | The first number   |
| `b`       | number | The second number  |

```js
multiply(4, 3); // 12
```

---

### `divide(a, b)`

Returns the **quotient** of two numbers (`a / b`).

> ⚠️ Throws an `Error` if `b` is `0`.

| Parameter | Type   | Description                        |
|-----------|--------|------------------------------------|
| `a`       | number | The dividend (number to divide)    |
| `b`       | number | The divisor (must not be zero)     |

```js
divide(10, 2); // 5

// Division by zero
try {
  divide(5, 0);
} catch (err) {
  console.error(err.message); // 'Division by zero is not allowed.'
}
```

---

### `square(x)`

Returns the **square** of a number (`x * x`).

| Parameter | Type   | Description           |
|-----------|--------|-----------------------|
| `x`       | number | The number to square  |

```js
square(5); // 25
square(3); // 9
```

---

## Error Handling

`divide(a, b)` will throw an `Error` when the divisor `b` is `0`:

```js
try {
  mathguru.divide(10, 0);
} catch (err) {
  console.error(err.message); // 'Division by zero is not allowed.'
}
```

Always wrap `divide` calls in a `try/catch` block when the divisor is user-supplied.

---

## License

[MIT](LICENSE)
