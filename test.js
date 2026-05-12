/**
 * test.js — Basic tests for the mathguru package
 *
 * Run with: node test.js
 */

const mathguru = require('./index');

let passed = 0;
let failed = 0;

function assert(description, actual, expected) {
  if (actual === expected) {
    console.log(`  ✅ PASS: ${description}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${description} — expected ${expected}, got ${actual}`);
    failed++;
  }
}

console.log('\n--- add ---');
assert('add(2, 3) === 5', mathguru.add(2, 3), 5);
assert('add(-1, 1) === 0', mathguru.add(-1, 1), 0);
assert('add(0, 0) === 0', mathguru.add(0, 0), 0);

console.log('\n--- subtract ---');
assert('subtract(10, 4) === 6', mathguru.subtract(10, 4), 6);
assert('subtract(5, 5) === 0', mathguru.subtract(5, 5), 0);
assert('subtract(3, 7) === -4', mathguru.subtract(3, 7), -4);

console.log('\n--- multiply ---');
assert('multiply(4, 3) === 12', mathguru.multiply(4, 3), 12);
assert('multiply(0, 100) === 0', mathguru.multiply(0, 100), 0);
assert('multiply(-2, 5) === -10', mathguru.multiply(-2, 5), -10);

console.log('\n--- divide ---');
assert('divide(10, 2) === 5', mathguru.divide(10, 2), 5);
assert('divide(9, 3) === 3', mathguru.divide(9, 3), 3);
assert('divide(7, 2) === 3.5', mathguru.divide(7, 2), 3.5);

// Division by zero should throw
try {
  mathguru.divide(5, 0);
  console.error('  ❌ FAIL: divide(5, 0) should throw');
  failed++;
} catch (err) {
  if (err.message === 'Division by zero is not allowed.') {
    console.log('  ✅ PASS: divide(5, 0) throws "Division by zero is not allowed."');
    passed++;
  } else {
    console.error(`  ❌ FAIL: divide(5, 0) threw unexpected message: ${err.message}`);
    failed++;
  }
}

console.log('\n--- square ---');
assert('square(5) === 25', mathguru.square(5), 25);
assert('square(3) === 9', mathguru.square(3), 9);
assert('square(0) === 0', mathguru.square(0), 0);
assert('square(-4) === 16', mathguru.square(-4), 16);

console.log(`\nResults: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}
