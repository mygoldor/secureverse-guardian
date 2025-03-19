
// Preload script to safely expose Node.js APIs to the renderer
const { contextBridge, ipcRenderer } = require('electron');

// Expose a limited API to the renderer process
contextBridge.exposeInMainWorld('electron', {
  appInfo: {
    name: 'Guardia Security',
    version: process.env.npm_package_version
  },
  
  // Fichier et système
  selectFile: () => ipcRenderer.invoke('open-file-dialog'),
  scanFile: (filePath) => ipcRenderer.invoke('scan-file', filePath),
  
  // Réseau
  scanNetwork: () => ipcRenderer.invoke('scan-network'),
  
  // Événements
  onBackendReady: (callback) => ipcRenderer.on('backend-ready', () => callback())
});
