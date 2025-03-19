
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

## Verification

To verify your build:

1. Navigate to the `release` directory
2. Install the application using the appropriate installer for your platform
3. Run the installed application and confirm all functionality works correctly

## Troubleshooting

If you encounter any issues with the build process:

- Ensure all dependencies are installed correctly
- Verify that Python is in your PATH
- Check that the Python dependencies in `requirements.txt` are installed

For advanced troubleshooting, consult the electron-builder documentation at: https://www.electron.build/
