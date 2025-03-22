
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/6e07c166-7a13-401c-b63f-a59fc1067614

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6e07c166-7a13-401c-b63f-a59fc1067614) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Electron
- Python (for backend operations)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6e07c166-7a13-401c-b63f-a59fc1067614) and click on Share -> Publish.

For distributing the Electron application:
1. Run `npm run build` to build the React application
2. Run `npm run electron:build` to package the Electron app for distribution

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Security Features

This application includes:
- Real-time file scanning and threat detection
- Network security monitoring
- Process management and monitoring
- Automated backups
- Quarantine system for suspicious files
- Let's Encrypt integration for SSL certificates

## Latest Updates

- Improved cookie management system
- Enhanced multi-language support
- PWA installation options
- Electron packaging and distribution
- Desktop shortcut creation support
```

4. Let's update the electron.js file to use the latest Electron features:

<lov-write file_path="electron.js">
// This file is the entry point for the electron app
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { app } = require('electron');

// Disable hardware acceleration for better compatibility
app.disableHardwareAcceleration();

// Disable CORS for local development
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

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
if (require.main === module) {
  startApp();
}

module.exports = {
  checkPythonInstallation,
  installPythonDependencies,
  startApp
};
