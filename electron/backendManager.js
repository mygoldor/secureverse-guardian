
const { spawn } = require('child_process');
const axios = require('axios');
const https = require('https');
const config = require('./config');
const { getMainWindow } = require('./windowManager');

// Keep a reference to the Python process
let pythonProcess = null;

// Create an HTTPS agent that allows self-signed certificates
const httpsAgent = new https.Agent({
  rejectUnauthorized: false // Allow self-signed certificates
});

function startPythonBackend() {
  // Check if Python is installed
  const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
  
  // Set environment variables for certificate configuration
  const env = {
    ...process.env,
    GUARDIA_USE_LETSENCRYPT: config.certificates.USE_LETSENCRYPT.toString(),
    GUARDIA_DOMAIN: config.certificates.DOMAIN
  };
  
  // Add custom certificate paths if defined
  if (config.certificates.CERT_PATH) {
    env.GUARDIA_CERT_PATH = config.certificates.CERT_PATH;
  }
  if (config.certificates.KEY_PATH) {
    env.GUARDIA_KEY_PATH = config.certificates.KEY_PATH;
  }
  
  // Start the Flask backend
  pythonProcess = spawn(pythonCommand, [config.backend.PYTHON_SCRIPT], { env });
  
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
    axios.get(`${config.backend.URL}/status`, { httpsAgent })
      .then(() => {
        console.log('Backend is ready!');
        const mainWindow = getMainWindow();
        if (mainWindow) {
          mainWindow.webContents.send('backend-ready');
        }
      })
      .catch((error) => {
        console.log('Backend not ready yet, retrying...', error.message);
        setTimeout(checkBackend, 1000);
      });
  };
  
  setTimeout(checkBackend, 1000);
}

function stopPythonBackend() {
  if (pythonProcess) {
    console.log('Killing Python backend process');
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', pythonProcess.pid, '/f', '/t']);
    } else {
      pythonProcess.kill();
    }
  }
}

// Create a function for making backend API requests
async function callBackendAPI(endpoint, method = 'GET', data = null) {
  try {
    const options = {
      method,
      url: `${config.backend.URL}/${endpoint}`,
      httpsAgent
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.data = data;
    }

    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(`API call error (${endpoint}):`, error.message);
    throw error;
  }
}

module.exports = {
  startPythonBackend,
  stopPythonBackend,
  callBackendAPI
};
