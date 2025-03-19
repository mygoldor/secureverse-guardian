
# Initialize the backend package
import os
import sys
import logging
import platform

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(os.path.expanduser('~'), '.guardia', 'logs', 'guardia.log'), mode='a'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('guardia')

def initialize_guardia():
    """Initialize Guardia environment and setup auto-start"""
    logger.info("Initializing Guardia Security environment")
    
    # Create necessary directories
    user_home = os.path.expanduser('~')
    guardia_dir = os.path.join(user_home, '.guardia')
    logs_dir = os.path.join(guardia_dir, 'logs')
    quarantine_dir = os.path.join(guardia_dir, 'quarantine')
    backup_dir = os.path.join(guardia_dir, 'backups')
    
    for directory in [guardia_dir, logs_dir, quarantine_dir, backup_dir]:
        if not os.path.exists(directory):
            os.makedirs(directory)
            logger.info(f"Created directory: {directory}")
    
    # Setup auto-start based on platform
    try:
        current_system = platform.system().lower()
        
        if current_system == 'windows':
            _setup_windows_autostart()
        elif current_system == 'darwin':  # macOS
            _setup_macos_autostart()
        elif current_system == 'linux':
            _setup_linux_autostart()
        else:
            logger.warning(f"Unsupported platform for auto-start: {current_system}")
    except Exception as e:
        logger.error(f"Error setting up auto-start: {str(e)}")
    
    logger.info("Guardia Security environment initialized successfully")
    return True

def _setup_windows_autostart():
    """Setup autostart for Windows"""
    import winreg
    
    try:
        key_path = r"SOFTWARE\Microsoft\Windows\CurrentVersion\Run"
        app_path = os.path.abspath(sys.argv[0])
        
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, key_path, 0, winreg.KEY_WRITE) as key:
            winreg.SetValueEx(key, "Guardia Security", 0, winreg.REG_SZ, app_path)
        
        logger.info("Windows auto-start configured successfully")
    except Exception as e:
        logger.error(f"Failed to configure Windows auto-start: {str(e)}")

def _setup_macos_autostart():
    """Setup autostart for macOS"""
    plist_path = os.path.expanduser("~/Library/LaunchAgents/com.guardia.security.plist")
    app_path = os.path.abspath(sys.argv[0])
    
    plist_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.guardia.security</string>
    <key>ProgramArguments</key>
    <array>
        <string>{app_path}</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
"""
    
    try:
        with open(plist_path, 'w') as f:
            f.write(plist_content)
        
        os.system(f"launchctl load {plist_path}")
        logger.info("macOS auto-start configured successfully")
    except Exception as e:
        logger.error(f"Failed to configure macOS auto-start: {str(e)}")

def _setup_linux_autostart():
    """Setup autostart for Linux"""
    autostart_dir = os.path.expanduser("~/.config/autostart")
    desktop_path = os.path.join(autostart_dir, "guardia-security.desktop")
    app_path = os.path.abspath(sys.argv[0])
    
    desktop_content = f"""[Desktop Entry]
Type=Application
Name=Guardia Security
Exec={app_path}
Icon={os.path.dirname(app_path)}/public/icons/guardia-icon-512.png
Comment=Guardia Security protection service
Categories=Utility;Security;
X-GNOME-Autostart-enabled=true
"""
    
    try:
        if not os.path.exists(autostart_dir):
            os.makedirs(autostart_dir)
            
        with open(desktop_path, 'w') as f:
            f.write(desktop_content)
            
        os.chmod(desktop_path, 0o755)
        logger.info("Linux auto-start configured successfully")
    except Exception as e:
        logger.error(f"Failed to configure Linux auto-start: {str(e)}")

# Initialize Guardia when the package is imported
initialize_guardia()
