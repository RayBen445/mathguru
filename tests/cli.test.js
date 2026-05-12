const path = require('path');
const { spawnSync } = require('child_process');

const cliPath = path.join(__dirname, '..', 'bin', 'mathguru.js');
const env = {
  ...process.env,
  NO_UPDATE_NOTIFIER: '1',
};

describe('CLI commands', () => {
  test('add command works', () => {
    const result = spawnSync('node', [cliPath, 'add', '2', '3'], { encoding: 'utf8', env });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Result:');
  });

  test('alias command works', () => {
    const result = spawnSync('node', [cliPath, 'div', '10', '2'], { encoding: 'utf8', env });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('5');
  });

  test('precision flag works', () => {
    const result = spawnSync('node', [cliPath, 'divide', '10', '3', '--precision', '2'], { encoding: 'utf8', env });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('3.33');
  });

  test('eval command works', () => {
    const result = spawnSync('node', [cliPath, 'eval', 'sqrt(25) + 5'], { encoding: 'utf8', env });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('10');
  });

  test('unknown command suggests closest', () => {
    const result = spawnSync('node', [cliPath, 'factoria'], { encoding: 'utf8', env });
    expect(result.status).toBe(1);
    expect(result.stderr + result.stdout).toContain('Did you mean');
  });
});
