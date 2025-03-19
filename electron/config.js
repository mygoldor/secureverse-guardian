
const { app } = require('electron');
const path = require('path');

// Configuration constants
const config = {
  // Directory paths
  paths: {
    QUARANTINE_DIR: path.join(app.getPath('userData'), 'quarantine'),
    BACKUP_DIR: path.join(app.getPath('userData'), 'backup'),
    ICON_PATH: path.join(__dirname, '../public/favicon.ico')
  },

  // Backend configuration
  backend: {
    URL: 'https://localhost:5000',
    PYTHON_SCRIPT: path.join(__dirname, '../backend.py')
  },

  // Window configuration
  window: {
    DEFAULT_WIDTH: 1200,
    DEFAULT_HEIGHT: 800
  }
};

module.exports = config;
