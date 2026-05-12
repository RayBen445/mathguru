const registeredPlugins = [];

function registerPlugin(plugin) {
  if (!plugin || typeof plugin !== 'object') {
    throw new Error('plugin: plugin object is required.');
  }
  if (!plugin.name || typeof plugin.name !== 'string') {
    throw new Error('plugin: plugin name is required.');
  }
  registeredPlugins.push({
    name: plugin.name,
    version: plugin.version || '0.0.0',
    description: plugin.description || '',
  });
}

function listPlugins() {
  return [...registeredPlugins];
}

function loadBuiltInPlugins() {
  return listPlugins();
}

module.exports = {
  registerPlugin,
  listPlugins,
  loadBuiltInPlugins,
};
