jest.mock('update-notifier', () => {
  return jest.fn(() => ({
    notify: jest.fn(),
  }));
});

const updateNotifier = require('update-notifier');
const { runUpdateNotifier } = require('../src/cli/updateNotifier');

describe('update notifier', () => {
  test('runs notifier with package metadata', () => {
    runUpdateNotifier({ name: 'mathguru', version: '1.0.0' });
    expect(updateNotifier).toHaveBeenCalled();
  });
});
