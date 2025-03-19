
const { ipcMain, dialog } = require('electron');
const { callBackendAPI } = require('./backendManager');

function setupIpcHandlers() {
  // Set up IPC handlers for file dialogs
  ipcMain.handle('open-file-dialog', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile']
    });
    if (!canceled) {
      return filePaths[0];
    }
    return null;
  });
  
  ipcMain.handle('open-directory-dialog', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    if (!canceled) {
      return filePaths[0];
    }
    return null;
  });
  
  // Handle file scanning
  ipcMain.handle('scan-file', async (event, filePath) => {
    try {
      return await callBackendAPI('scanner-fichier', 'POST', { file_path: filePath });
    } catch (error) {
      console.error('Scan file error:', error);
      return { status: 'Erreur', message: error.toString() };
    }
  });
  
  // Handle directory scanning
  ipcMain.handle('scan-directory', async (event, directoryPath) => {
    try {
      return await callBackendAPI('scan-directory', 'POST', { directory_path: directoryPath });
    } catch (error) {
      console.error('Scan directory error:', error);
      return { status: 'Erreur', message: error.toString(), filesScanned: 0, threatsFound: 0 };
    }
  });
  
  // Handle network scanning
  ipcMain.handle('scan-network', async () => {
    try {
      return await callBackendAPI('scan-reseau', 'GET');
    } catch (error) {
      console.error('Scan network error:', error);
      return { error: error.toString() };
    }
  });

  // Handle file quarantine
  ipcMain.handle('quarantine-file', async (event, filePath) => {
    try {
      return await callBackendAPI('quarantine-file', 'POST', { file_path: filePath });
    } catch (error) {
      console.error('Quarantine file error:', error);
      return { status: 'Erreur', message: error.toString() };
    }
  });

  // Handle file backup
  ipcMain.handle('backup-files', async (event, directory) => {
    try {
      return await callBackendAPI('backup-files', 'POST', { directory });
    } catch (error) {
      console.error('Backup files error:', error);
      return { status: 'Erreur', message: error.toString() };
    }
  });

  // Handle list quarantined files
  ipcMain.handle('list-quarantined-files', async () => {
    try {
      const response = await callBackendAPI('list-quarantined-files', 'GET');
      return response.files || [];
    } catch (error) {
      console.error('List quarantined files error:', error);
      return [];
    }
  });

  // Handle restore file from quarantine
  ipcMain.handle('restore-file', async (event, fileName) => {
    try {
      return await callBackendAPI('restore-file', 'POST', { file_name: fileName });
    } catch (error) {
      console.error('Restore file error:', error);
      return { status: 'Erreur', message: error.toString() };
    }
  });

  // Handle delete file from quarantine
  ipcMain.handle('delete-file', async (event, fileName) => {
    try {
      return await callBackendAPI('delete-file', 'POST', { file_name: fileName });
    } catch (error) {
      console.error('Delete file error:', error);
      return { status: 'Erreur', message: error.toString() };
    }
  });
  
  // Handle scan quarantined file
  ipcMain.handle('scan-quarantined-file', async (event, fileName) => {
    try {
      return await callBackendAPI('scan-quarantined-file', 'POST', { file_name: fileName });
    } catch (error) {
      console.error('Scan quarantined file error:', error);
      return { status: 'Erreur', message: error.toString() };
    }
  });

  // Handle security logs retrieval
  ipcMain.handle('get-security-logs', async (event, lines) => {
    try {
      const response = await callBackendAPI(`security-logs?lines=${lines || 50}`, 'GET');
      return response;
    } catch (error) {
      console.error('Get security logs error:', error);
      return { logs: [] };
    }
  });

  // Handle suspicious processes retrieval
  ipcMain.handle('get-suspicious-processes', async () => {
    try {
      return await callBackendAPI('suspicious-processes', 'GET');
    } catch (error) {
      console.error('Get suspicious processes error:', error);
      return { processes: [] };
    }
  });
  
  // Handle process termination
  ipcMain.handle('kill-process', async (event, pid) => {
    try {
      return await callBackendAPI('kill-process', 'POST', { pid });
    } catch (error) {
      console.error('Kill process error:', error);
      return { status: 'Erreur', message: error.toString() };
    }
  });
  
  // Handle get blocked IPs
  ipcMain.handle('get-blocked-ips', async () => {
    try {
      const response = await callBackendAPI('blocked-ips', 'GET');
      return response.ips || [];
    } catch (error) {
      console.error('Get blocked IPs error:', error);
      return [];
    }
  });
  
  // Handle block IP
  ipcMain.handle('block-ip', async (event, ip) => {
    try {
      return await callBackendAPI('block-ip', 'POST', { ip });
    } catch (error) {
      console.error('Block IP error:', error);
      return { status: 'Erreur', message: error.toString() };
    }
  });
  
  // Handle unblock IP
  ipcMain.handle('unblock-ip', async (event, ip) => {
    try {
      return await callBackendAPI('unblock-ip', 'POST', { ip });
    } catch (error) {
      console.error('Unblock IP error:', error);
      return { status: 'Erreur', message: error.toString() };
    }
  });
}

module.exports = {
  setupIpcHandlers
};
