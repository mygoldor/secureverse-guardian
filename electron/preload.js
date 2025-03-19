
// Preload script to safely expose Node.js APIs to the renderer
const { contextBridge, ipcRenderer } = require('electron');

// Expose a limited API to the renderer process
contextBridge.exposeInMainWorld('electron', {
  appInfo: {
    name: 'Guardia Security',
    version: process.env.npm_package_version
  },
  
  // File and system
  selectFile: () => ipcRenderer.invoke('open-file-dialog'),
  selectDirectory: () => ipcRenderer.invoke('open-directory-dialog'),
  scanFile: (filePath) => ipcRenderer.invoke('scan-file', filePath),
  quarantineFile: (filePath) => ipcRenderer.invoke('quarantine-file', filePath),
  backupFiles: (directory) => ipcRenderer.invoke('backup-files', directory),
  
  // Network
  scanNetwork: () => ipcRenderer.invoke('scan-network'),
  
  // Security monitoring
  getSecurityLogs: (lines) => ipcRenderer.invoke('get-security-logs', lines),
  getSuspiciousProcesses: () => ipcRenderer.invoke('get-suspicious-processes'),
  
  // Events
  onBackendReady: (callback) => ipcRenderer.on('backend-ready', () => callback())
});
