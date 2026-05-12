const updateNotifier = require('update-notifier');

function runUpdateNotifier(pkg) {
  const notifier = updateNotifier({ pkg, updateCheckInterval: 1000 * 60 * 60 * 12 });
  notifier.notify({
    defer: false,
    message: `Update available: {current} → {latest}\nRun:\nnpm install -g mathguru`,
  });
}

module.exports = {
  runUpdateNotifier,
};
