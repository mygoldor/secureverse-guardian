
# Guardia Security - Installation Guide

Guardia is a comprehensive security solution for your computer. This guide will help you install and run Guardia on your system.

## System Requirements

- Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+ recommended)
- Python 3.6 or higher
- Node.js 14 or higher (optional, only for development)

## Installation Options

### Option 1: Pre-built Package (Recommended)

1. Download the latest Guardia Security package for your operating system from our release page.
2. Run the installer and follow the on-screen instructions.
3. Launch Guardia Security from your desktop or start menu.

### Option 2: From Source

If you prefer to run Guardia from source:

1. Ensure Python 3.6+ is installed on your system.
2. Clone this repository or download and extract the source code.
3. Open a terminal/command prompt in the extracted directory.
4. Run the following commands:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run Guardia
# On Windows:
start-guardia.bat
# On macOS/Linux:
chmod +x start-guardia.sh
./start-guardia.sh
```

## First-Time Setup

When you first run Guardia Security:

1. The application will initialize and set up the required directories.
2. You may be prompted to allow system access for security scanning.
3. Follow the onboarding process to configure your security preferences.

## Troubleshooting

If you encounter any issues:

- **Backend not starting**: Ensure Python is correctly installed and in your PATH.
- **Port conflict**: Make sure no other application is using port 5000.
- **Permission issues**: Run the application with administrator/sudo privileges.

For additional help, visit our support portal or contact support@guardia-security.com.

