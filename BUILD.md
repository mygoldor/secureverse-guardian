
# Guardia Security - Build & Distribution Guide

This document provides instructions for building and distributing the Guardia Security application.

## Prerequisites

- Node.js 14 or higher
- Python 3.6 or higher
- npm or yarn package manager

## Development Build

To run Guardia in development mode:

```bash
# Install dependencies (first time only)
npm install

# Start the development server
npm run electron:dev
```

## Production Build

To build Guardia for production and distribution:

```bash
# Build the React application
npm run build

# Package the entire application for distribution
npm run electron:build
```

The packaged applications will be available in the `release` directory, ready for distribution. Depending on your operating system, you'll find:

- Windows: `.exe` installer and/or `.msi` package
- macOS: `.dmg` disk image and/or `.zip` archive
- Linux: `.AppImage` and/or `.deb` package

## Code Signing

### Why Sign Your Application

Code signing your application is an important security step that:
- Verifies the authenticity of your application
- Removes browser and OS security warnings
- Builds trust with your users
- Prevents tampering with your application

### How to Sign Your Application

#### 1. Obtain a Code Signing Certificate

Purchase a code signing certificate from a trusted Certificate Authority (CA):
- [DigiCert](https://www.digicert.com/code-signing/)
- [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
- [GlobalSign](https://www.globalsign.com/en/code-signing-certificate)

#### 2. Configure electron-builder for Code Signing

Add the following to your `electron-builder.yml` configuration:

```yaml
# For Windows
win:
  # ... existing configuration
  certificateFile: "./path/to/certificate.pfx"
  certificatePassword: "${CERTIFICATE_PASSWORD}"
  signAndEditExecutable: true

# For macOS
mac:
  # ... existing configuration
  hardenedRuntime: true
  gatekeeperAssess: false
  entitlements: "./build/entitlements.mac.plist"
  entitlementsInherit: "./build/entitlements.mac.plist"
  identity: "Developer ID Application: Your Company Name (YOUR_TEAM_ID)"
```

#### 3. Secure Certificate Password

For CI/CD environments, store your certificate password as a secure environment variable.

#### 4. Build with Code Signing

```bash
# On Windows
set CERTIFICATE_PASSWORD=your-password
npm run electron:build

# On macOS/Linux
export CERTIFICATE_PASSWORD=your-password
npm run electron:build
```

## Verification

To verify your build:

1. Navigate to the `release` directory
2. Install the application using the appropriate installer for your platform
3. Run the installed application and confirm all functionality works correctly
4. Verify that the digital signature is valid by checking the file properties

## Troubleshooting

If you encounter any issues with the build process:

- Ensure all dependencies are installed correctly
- Verify that Python is in your PATH
- Check that the Python dependencies in `requirements.txt` are installed
- For code signing issues, verify that your certificate is valid and properly configured

For advanced troubleshooting, consult the electron-builder documentation at: https://www.electron.build/

