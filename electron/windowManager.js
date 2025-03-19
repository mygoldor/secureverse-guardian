const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const config = require('./config');

// Keep a global reference of the window object
let mainWindow = null;

function createWindow() {
  // Create the browser window with security features enabled
  mainWindow = new BrowserWindow({
    width: config.window.DEFAULT_WIDTH,
    height: config.window.DEFAULT_HEIGHT,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: config.paths.ICON_PATH
  });

  // Load the app
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  });
  
  mainWindow.loadURL(startUrl);

  // Open DevTools in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed
  mainWindow.on('closed', function() {
    // Dereference the window object
    mainWindow = null;
  });

  return mainWindow;
}

function getMainWindow() {
  return mainWindow;
}

module.exports = {
  createWindow,
  getMainWindow
};
