const { app } = require('electron');
const path = require('path');
const os = require('os');

// Determine default Let's Encrypt paths based on OS
function getDefaultLetsEncryptPath() {
  if (process.platform === 'win32') {
    return 'C:/Certbot/live/';
  } else if (process.platform === 'darwin') {
    return '/usr/local/etc/letsencrypt/live/';
  } else {
    return '/etc/letsencrypt/live/';
  }
}

// Configuration constants
const config = {
  // Directory paths
  paths: {
    QUARANTINE_DIR: path.join(app.getPath('userData'), 'quarantine'),
    BACKUP_DIR: path.join(app.getPath('userData'), 'backup'),
    ICON_PATH: path.join(__dirname, '../public/favicon.ico'),
    LETSENCRYPT_DIR: process.env.GUARDIA_LETSENCRYPT_DIR || getDefaultLetsEncryptPath()
  },

  // Backend configuration
  backend: {
    URL: 'https://localhost:5000',
    HTTP_URL: 'http://localhost:5001', // HTTP URL for redirection
    PYTHON_SCRIPT: path.join(__dirname, '../backend.py')
  },

  // Window configuration
  window: {
    DEFAULT_WIDTH: 1200,
    DEFAULT_HEIGHT: 800
  },
  
  // Certificate configuration
  certificates: {
    USE_LETSENCRYPT: process.env.GUARDIA_USE_LETSENCRYPT === 'true' || false,
    DOMAIN: process.env.GUARDIA_DOMAIN || 'www.cybergard.eu',
    CERT_PATH: process.env.GUARDIA_CERT_PATH || null,
    KEY_PATH: process.env.GUARDIA_KEY_PATH || null
  }
};

module.exports = config;
