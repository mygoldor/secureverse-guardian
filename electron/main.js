const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const url = require('url');
const { spawn } = require('child_process');
const axios = require('axios');
const fs = require('fs');

// Keep a global reference of the window object and the Python process
let mainWindow;
let pythonProcess = null;

function startPythonBackend() {
  // Check if Python is installed
  const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
  
  // Start the Flask backend
  pythonProcess = spawn(pythonCommand, [path.join(__dirname, '../backend.py')]);
  
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python backend output: ${data}`);
  });
  
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python backend error: ${data}`);
  });
  
  pythonProcess.on('close', (code) => {
    console.log(`Python backend process exited with code ${code}`);
    pythonProcess = null;
  });

  // Wait for backend to be ready
  waitForBackend();
}

function waitForBackend() {
  const checkBackend = () => {
    axios.get('http://localhost:5000/status')
      .then(() => {
        console.log('Backend is ready!');
        if (mainWindow) {
          mainWindow.webContents.send('backend-ready');
        }
      })
      .catch(() => {
        console.log('Backend not ready yet, retrying...');
        setTimeout(checkBackend, 1000);
      });
  };
  
  setTimeout(checkBackend, 1000);
}

function createWindow() {
  // Create the browser window with security features enabled
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/favicon.ico')
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
}

// Create window and start Python backend when Electron is ready
app.whenReady().then(() => {
  createWindow();
  startPythonBackend();
  
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
  
  // Handle file scanning
  ipcMain.handle('scan-file', async (event, filePath) => {
    try {
      const response = await axios.post('http://localhost:5000/scanner-fichier', {
        file_path: filePath
      });
      return response.data;
    } catch (error) {
      console.error('Scan file error:', error);
      return { status: 'Erreur', message: error.toString() };
    }
  });
  
  // Handle network scanning
  ipcMain.handle('scan-network', async () => {
    try {
      const response = await axios.get('http://localhost:5000/scan-reseau');
      return response.data;
    } catch (error) {
      console.error('Scan network error:', error);
      return { error: error.toString() };
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
  // On macOS re-create a window when dock icon is clicked and no windows are open
  if (mainWindow === null) createWindow();
});

// Clean up Python process when quitting
app.on('quit', () => {
  if (pythonProcess) {
    console.log('Killing Python backend process');
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', pythonProcess.pid, '/f', '/t']);
    } else {
      pythonProcess.kill();
    }
  }
});
