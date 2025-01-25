// src/customWebpackConfig.js
const ReactErrorOverlay = require('react-error-overlay');

// Disable WebSocket overlay errors
ReactErrorOverlay.setEditorHandler(() => {});
module.exports = function override(config) {
  config.devServer.client.overlay = false;
  return config;
};
