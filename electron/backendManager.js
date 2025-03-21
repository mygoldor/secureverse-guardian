
const { spawn } = require('child_process');
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const { getMainWindow } = require('./windowManager');

// Keep a reference to the Python process
let pythonProcess = null;

// Create an HTTPS agent that allows self-signed certificates
const httpsAgent = new https.Agent({
  rejectUnauthorized: false // Allow self-signed certificates
});

// Certificate renewal related functions
function checkCertificateExpiry(certPath) {
  try {
    // Check if certificate exists
    if (!fs.existsSync(certPath)) {
      return {
        isValid: false,
        daysRemaining: 0,
        expiryDate: null,
        error: 'Certificate not found'
      };
    }

    // Parse the certificate using OpenSSL
    const openSSLCommand = process.platform === 'win32' ? 'openssl.exe' : 'openssl';
    const result = require('child_process').execSync(
      `${openSSLCommand} x509 -enddate -noout -in "${certPath}"`,
      { encoding: 'utf8' }
    );

    // Parse the expiration date
    const expiryMatch = result.match(/notAfter=(.+)/);
    if (!expiryMatch) {
      return {
        isValid: false,
        daysRemaining: 0,
        expiryDate: null,
        error: 'Failed to parse certificate expiration'
      };
    }

    const expiryDate = new Date(expiryMatch[1]);
    const now = new Date();
    const daysRemaining = Math.floor((expiryDate - now) / (1000 * 60 * 60 * 24));

    return {
      isValid: daysRemaining > 0,
      daysRemaining: daysRemaining,
      expiryDate: expiryDate.toISOString(),
      error: null
    };
  } catch (error) {
    console.error('Error checking certificate expiry:', error);
    return {
      isValid: false,
      daysRemaining: null,
      expiryDate: null,
      error: error.message
    };
  }
}

function renewCertificates() {
  return new Promise((resolve, reject) => {
    // Skip actual renewal in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Certificate renewal skipped in development mode');
      resolve({ success: true, message: 'Certificate renewal simulated in development mode' });
      return;
    }

    const certbotCommand = process.platform === 'win32' ? 'certbot.exe' : 'certbot';
    
    // Run certificate renewal
    const certbotProcess = spawn(certbotCommand, ['renew', '--non-interactive']);
    
    let output = '';
    let errorOutput = '';
    
    certbotProcess.stdout.on('data', (data) => {
      const chunk = data.toString();
      output += chunk;
      console.log(`Certbot output: ${chunk}`);
    });
    
    certbotProcess.stderr.on('data', (data) => {
      const chunk = data.toString();
      errorOutput += chunk;
      console.error(`Certbot error: ${chunk}`);
    });
    
    certbotProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Certificate renewal completed successfully');
        resolve({ success: true, message: 'Certificates renewed successfully' });
      } else {
        console.error(`Certificate renewal failed with code ${code}`);
        resolve({ 
          success: false, 
          message: `Certificate renewal failed: ${errorOutput || 'Unknown error'}` 
        });
      }
    });
    
    certbotProcess.on('error', (error) => {
      console.error('Failed to start certbot:', error);
      reject({ 
        success: false, 
        message: `Failed to start certbot: ${error.message}` 
      });
    });
  });
}

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
    // First try HTTPS
    axios.get(`${config.backend.URL}/status`, { httpsAgent })
      .then(() => {
        console.log('Backend is ready on HTTPS!');
        const mainWindow = getMainWindow();
        if (mainWindow) {
          mainWindow.webContents.send('backend-ready');
        }
      })
      .catch((httpsError) => {
        // If HTTPS fails, try HTTP
        console.log('HTTPS connection failed, trying HTTP...', httpsError.message);
        axios.get(`${config.backend.HTTP_URL}/status`)
          .then(() => {
            console.log('Backend is ready on HTTP!');
            const mainWindow = getMainWindow();
            if (mainWindow) {
              mainWindow.webContents.send('backend-ready');
            }
          })
          .catch((httpError) => {
            console.log('Backend not ready yet, retrying...', httpError.message);
            setTimeout(checkBackend, 1000);
          });
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
  callBackendAPI,
  checkCertificateExpiry,
  renewCertificates
};
