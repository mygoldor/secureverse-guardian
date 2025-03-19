
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
  scanDirectory: (directoryPath) => ipcRenderer.invoke('scan-directory', directoryPath),
  quarantineFile: (filePath) => ipcRenderer.invoke('quarantine-file', filePath),
  backupFiles: (directory) => ipcRenderer.invoke('backup-files', directory),
  listQuarantinedFiles: () => ipcRenderer.invoke('list-quarantined-files'),
  restoreFile: (fileName) => ipcRenderer.invoke('restore-file', fileName),
  deleteFile: (fileName) => ipcRenderer.invoke('delete-file', fileName),
  scanQuarantinedFile: (fileName) => ipcRenderer.invoke('scan-quarantined-file', fileName),
  
  // Network
  scanNetwork: () => ipcRenderer.invoke('scan-network'),
  getBlockedIPs: () => ipcRenderer.invoke('get-blocked-ips'),
  blockIP: (ip) => ipcRenderer.invoke('block-ip', ip),
  unblockIP: (ip) => ipcRenderer.invoke('unblock-ip', ip),
  
  // Security monitoring
  getSecurityLogs: (lines) => ipcRenderer.invoke('get-security-logs', lines),
  getSuspiciousProcesses: () => ipcRenderer.invoke('get-suspicious-processes'),
  killProcess: (pid) => ipcRenderer.invoke('kill-process', pid),
  
  // Events
  onBackendReady: (callback) => ipcRenderer.on('backend-ready', () => callback()),
  onThreatDetected: (callback) => ipcRenderer.on('threat-detected', (_, data) => callback(data))
});
