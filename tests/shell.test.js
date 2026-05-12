const path = require('path');
const os = require('os');

process.env.HOME = path.join(os.tmpdir(), `mathguru-shell-${Date.now()}`);

const { splitArgs, handleShellLine, createSessionStats, getSessionStatsRows } = require('../src/shell/shell');

describe('shell mode helpers', () => {
  test('splitArgs handles quoted values', () => {
    expect(splitArgs('eval "sqrt(25) + 5"')).toEqual(['eval', 'sqrt(25) + 5']);
  });

  test('handleShellLine handles simple calculation', () => {
    const result = handleShellLine('add 2 3');
    expect(result.type).toBe('result');
    expect(result.output).toContain('5');
  });

  test('handleShellLine handles control commands', () => {
    expect(handleShellLine('help').type).toBe('docs');
    expect(handleShellLine('clear').type).toBe('clear');
    expect(handleShellLine('stats').type).toBe('stats');
    expect(handleShellLine('exit').type).toBe('exit');
  });

  test('session stats helpers build rows', () => {
    const stats = createSessionStats();
    const rows = getSessionStatsRows(stats);
    expect(Array.isArray(rows)).toBe(true);
    expect(rows.some((row) => row.metric === 'Commands run')).toBe(true);
  });
});
