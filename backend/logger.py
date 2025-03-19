
import os
import time

# Security log file
LOG_FILE = "guardia_security.log"

# Initialize log file if it doesn't exist
if not os.path.exists(LOG_FILE):
    with open(LOG_FILE, "w") as f:
        f.write(f"{time.strftime('%Y-%m-%d %H:%M:%S')} - Guardia Security initialized\n")

# Log security events
def log_threat(message):
    with open(LOG_FILE, "a") as log:
        log.write(f"{time.strftime('%Y-%m-%d %H:%M:%S')} - {message}\n")
    print(message)

# Get security logs
def get_security_logs(lines=50):
    if not os.path.exists(LOG_FILE):
        return []
    
    with open(LOG_FILE, "r") as log:
        all_lines = log.readlines()
        return all_lines[-lines:] if lines < len(all_lines) else all_lines
