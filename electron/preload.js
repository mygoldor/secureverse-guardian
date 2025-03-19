
// Preload script to safely expose Node.js APIs to the renderer
const { contextBridge } = require('electron');

// Expose a limited API to the renderer process
contextBridge.exposeInMainWorld('electron', {
  appInfo: {
    name: 'Guardia Security',
    version: process.env.npm_package_version
  }
});
