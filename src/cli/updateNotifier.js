const updateNotifierModule = require('update-notifier');

function runUpdateNotifier(pkg) {
  const updateNotifier = updateNotifierModule.default || updateNotifierModule;
  if (typeof updateNotifier !== 'function') {
    return;
  }

  const notifier = updateNotifier({ pkg, updateCheckInterval: 1000 * 60 * 60 * 12 });
  if (notifier && typeof notifier.notify === 'function') {
    notifier.notify({
      defer: false,
      message: `Update available: {current} → {latest}\nRun:\nnpm install -g mathguru`,
    });
  }
}

module.exports = {
  runUpdateNotifier,
};
