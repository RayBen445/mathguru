/**
 * test.js — Example tests for all exported mathguru functions.
 *
 * Run with: node test.js
 */

const mathguru = require('./index');
const path = require('path');
const { spawnSync } = require('child_process');
const packageJson = require('./package.json');

let passed = 0;
let failed = 0;

function assert(description, actual, expected) {
  if (actual === expected) {
    console.log(`  ✅ PASS: ${description}`);
    passed += 1;
  } else {
    console.error(`  ❌ FAIL: ${description} — expected ${expected}, got ${actual}`);
    failed += 1;
  }
}

function assertApprox(description, actual, expected, epsilon = 1e-6) {
  if (Math.abs(actual - expected) <= epsilon) {
    console.log(`  ✅ PASS: ${description}`);
    passed += 1;
  } else {
    console.error(`  ❌ FAIL: ${description} — expected ~${expected}, got ${actual}`);
    failed += 1;
  }
}

function assertThrows(description, fn, expectedMessagePart) {
  try {
    fn();
    console.error(`  ❌ FAIL: ${description} — expected an error`);
    failed += 1;
  } catch (error) {
    if (error.message.includes(expectedMessagePart)) {
      console.log(`  ✅ PASS: ${description}`);
      passed += 1;
    } else {
      console.error(`  ❌ FAIL: ${description} — unexpected message: ${error.message}`);
      failed += 1;
    }
  }
}

function assertIncludes(description, text, expectedPart) {
  if (text.includes(expectedPart)) {
    console.log(`  ✅ PASS: ${description}`);
    passed += 1;
  } else {
    console.error(`  ❌ FAIL: ${description} — expected output to include "${expectedPart}"`);
    failed += 1;
  }
}

console.log('\n--- basic ---');
assert('add(2, 3) === 5', mathguru.add(2, 3), 5);
assert('subtract(10, 4) === 6', mathguru.subtract(10, 4), 6);
assert('multiply(5, 6) === 30', mathguru.multiply(5, 6), 30);
assert('divide(20, 4) === 5', mathguru.divide(20, 4), 5);
assert('square(5) === 25', mathguru.square(5), 25);

console.log('\n--- scientific ---');
assert('sqrt(25) === 5', mathguru.sqrt(25), 5);
assert('power(2, 8) === 256', mathguru.power(2, 8), 256);
assert('factorial(5) === 120', mathguru.factorial(5), 120);
assert('percentage(20, 100) === 20', mathguru.percentage(20, 100), 20);
assert('modulus(10, 3) === 1', mathguru.modulus(10, 3), 1);
assert('average([1, 2, 3, 4, 5]) === 3', mathguru.average([1, 2, 3, 4, 5]), 3);

console.log('\n--- economics & finance ---');
assert('simpleInterest(1000, 5, 2) === 100', mathguru.simpleInterest(1000, 5, 2), 100);
assertApprox(
  'compoundInterest(1000, 5, 2, 12) ~= 104.94133555832692',
  mathguru.compoundInterest(1000, 5, 2, 12),
  104.94133555832692
);
assert('inflationRate(500, 700) === 40', mathguru.inflationRate(500, 700), 40);
assert('gdpGrowth(10000, 12000) === 20', mathguru.gdpGrowth(10000, 12000), 20);
assertApprox(
  'loanRepayment(100000, 7.5, 60) ~= 2003.7948595213268',
  mathguru.loanRepayment(100000, 7.5, 60),
  2003.7948595213268
);

console.log('\n--- validation ---');
assertThrows('add(1) throws missing argument error', () => mathguru.add(1), 'requires 2 argument');
assertThrows('add("a", 1) throws invalid number error', () => mathguru.add('a', 1), 'valid finite number');
assertThrows('divide(5, 0) throws divide-by-zero error', () => mathguru.divide(5, 0), 'division by zero');
assertThrows('sqrt(-1) throws non-negative error', () => mathguru.sqrt(-1), '0 or greater');
assertThrows('factorial(2.5) throws integer error', () => mathguru.factorial(2.5), 'must be an integer');
assertThrows('percentage(1, 0) throws total zero error', () => mathguru.percentage(1, 0), 'must not be 0');
assertThrows('average([]) throws empty array error', () => mathguru.average([]), 'cannot be an empty array');

console.log('\n--- cli command mode ---');
const cliPath = path.join(__dirname, 'bin', 'mathguru.js');

const addCli = spawnSync('node', [cliPath, 'add', '2', '3'], { encoding: 'utf8' });
assert('CLI add exits with code 0', addCli.status, 0);
assertIncludes('CLI add prints result', addCli.stdout, 'Result:');
assertIncludes('CLI add prints numeric output', addCli.stdout, '5');

const factorialCli = spawnSync('node', [cliPath, 'factorial', '5'], { encoding: 'utf8' });
assert('CLI factorial exits with code 0', factorialCli.status, 0);
assertIncludes('CLI factorial prints 120', factorialCli.stdout, '120');

const inflationCli = spawnSync('node', [cliPath, 'inflation', '500', '700'], { encoding: 'utf8' });
assert('CLI inflation exits with code 0', inflationCli.status, 0);
assertIncludes('CLI inflation prints 40', inflationCli.stdout, '40');

const helpCli = spawnSync('node', [cliPath, 'help'], { encoding: 'utf8' });
assert('CLI help exits with code 0', helpCli.status, 0);
assertIncludes('CLI help shows usage', helpCli.stdout, 'Usage:');
assertIncludes('CLI help mentions interactive mode', helpCli.stdout, 'Interactive Mode');

const versionCli = spawnSync('node', [cliPath, 'version'], { encoding: 'utf8' });
assert('CLI version exits with code 0', versionCli.status, 0);
assertIncludes('CLI version prints package version', versionCli.stdout, packageJson.version);

const invalidCli = spawnSync('node', [cliPath, 'not-a-command'], { encoding: 'utf8' });
assert('CLI invalid command exits with code 1', invalidCli.status, 1);
assertIncludes('CLI invalid command prints helpful error', invalidCli.stderr, 'Unknown command');

console.log(`\nResults: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}
