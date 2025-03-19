
const { app } = require('electron');
const { createWindow } = require('./windowManager');
const { startPythonBackend, stopPythonBackend } = require('./backendManager');
const { setupIpcHandlers } = require('./ipcHandlers');
const { ensureDirectoriesExist } = require('./fileSystem');

// Create window and start Python backend when Electron is ready
app.whenReady().then(() => {
  // Ensure required directories exist
  ensureDirectoriesExist();
  
  // Create the main window
  createWindow();
  
  // Start the Python backend
  startPythonBackend();
  
  // Set up IPC handlers
  setupIpcHandlers();
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
  // On macOS re-create a window when dock icon is clicked and no windows are open
  const { getMainWindow } = require('./windowManager');
  if (getMainWindow() === null) createWindow();
});

// Clean up Python process when quitting
app.on('quit', () => {
  stopPythonBackend();
});
