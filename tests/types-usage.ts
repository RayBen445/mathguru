import mathguru = require('mathguru');

const addResult: number = mathguru.add(2, 3);
const sqrtResult: number = mathguru.sqrt(16);

if (addResult < 0 || sqrtResult < 0) {
  throw new Error('Type usage smoke test failed');
}
