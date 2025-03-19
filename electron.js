
// This file is a temporary workaround to run the electron app
// It's referenced in package.json
const { spawn } = require('child_process');
const path = require('path');

const electronPath = path.join(__dirname, 'node_modules', '.bin', 'electron');
const mainPath = path.join(__dirname, 'electron', 'main.js');

// Start Electron
const electron = spawn(electronPath, [mainPath], { stdio: 'inherit' });

electron.on('close', (code) => {
  process.exit(code);
});
