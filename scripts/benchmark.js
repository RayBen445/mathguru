#!/usr/bin/env node

const { performance } = require('perf_hooks');
const mathguru = require('../index');

function benchmark(name, fn, iterations = 1000) {
  const start = performance.now();
  for (let i = 0; i < iterations; i += 1) {
    fn();
  }
  const end = performance.now();
  return {
    name,
    iterations,
    totalMs: end - start,
    avgMs: (end - start) / iterations,
  };
}

function runBenchmarks() {
  const cases = [
    benchmark('calc.diff', () => mathguru.calc.run('diff(x^4 + 2*x^2)'), 500),
    benchmark('calc.integrate', () => mathguru.calc.run('integrate(sin(x))'), 500),
    benchmark('graph.ascii', () => mathguru.graph.plot('sin(x)', { size: '50x20' }), 100),
    benchmark('latex.convert', () => mathguru.latex.convert('sin(x)^2 + cos(x)^2'), 500),
  ];

  console.log('MathGuru Benchmark Results');
  cases.forEach((result) => {
    console.log(
      `- ${result.name}: total=${result.totalMs.toFixed(2)}ms avg=${result.avgMs.toFixed(4)}ms over ${result.iterations} iterations`
    );
  });
}

runBenchmarks();
