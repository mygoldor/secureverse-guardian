
// This file is the entry point for the electron app
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if Python is installed
function checkPythonInstallation() {
  const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
  
  try {
    // Try to execute Python --version
    const output = require('child_process').execSync(`${pythonCommand} --version`);
    console.log(`Python detected: ${output.toString().trim()}`);
    return pythonCommand;
  } catch (error) {
    console.error('Python is not installed or not in PATH');
    console.error('Please install Python 3.6+ to use Guardia Security');
    process.exit(1);
  }
}

// Install Python dependencies if needed
function installPythonDependencies(pythonCommand) {
  const requirementsPath = path.join(__dirname, 'requirements.txt');
  
  if (!fs.existsSync(requirementsPath)) {
    console.error('requirements.txt not found');
    return;
  }
  
  console.log('Installing Python dependencies...');
  try {
    const output = require('child_process').execSync(
      `${pythonCommand} -m pip install -r ${requirementsPath}`,
      { stdio: 'inherit' }
    );
    console.log('Python dependencies installed successfully');
  } catch (error) {
    console.error('Failed to install Python dependencies:');
    console.error(error.toString());
    console.error('You may need to install them manually using:');
    console.error(`${pythonCommand} -m pip install -r ${requirementsPath}`);
  }
}

// Start the application
function startApp() {
  // Check Python installation first
  const pythonCommand = checkPythonInstallation();
  
  // Install dependencies if needed
  installPythonDependencies(pythonCommand);
  
  const electronPath = path.join(__dirname, 'node_modules', '.bin', 'electron');
  const mainPath = path.join(__dirname, 'electron', 'main.js');

  // Start Electron
  const electron = spawn(electronPath, [mainPath], { stdio: 'inherit' });

  electron.on('close', (code) => {
    process.exit(code);
  });
}

// Entry point
startApp();
