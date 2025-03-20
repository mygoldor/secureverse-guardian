
import os
import shutil
import time
from backend.logger import log_threat
from backend.threat_scanner import scanner_fichier, scan_directory

# Configuration
QUARANTINE_DIR = "guardia_quarantine/"
BACKUP_DIR = "guardia_backup/"

# Make sure directories exist
os.makedirs(QUARANTINE_DIR, exist_ok=True)
os.makedirs(BACKUP_DIR, exist_ok=True)

# Quarantine a suspicious file
def quarantine_file(file_path):
    if not os.path.exists(file_path):
        return {"status": "Erreur", "message": "Fichier introuvable"}
    
    try:
        # Create a destination path in the quarantine directory
        dest_path = os.path.join(QUARANTINE_DIR, os.path.basename(file_path))
        # Move the file to quarantine
        shutil.move(file_path, dest_path)
        log_threat(f"File quarantined: {file_path}")
        return {
            "status": "OK", 
            "message": f"File moved to quarantine: {dest_path}"
        }
    except Exception as e:
        return {"status": "Erreur", "message": str(e)}

# Scan a file in quarantine
def scan_quarantined_file(file_name):
    file_path = os.path.join(QUARANTINE_DIR, file_name)
    if not os.path.exists(file_path):
        return {"status": "Erreur", "message": "Fichier introuvable dans la quarantaine"}
    
    return scanner_fichier(file_path)

# Restore a file from quarantine
def restore_file(file_name):
    quarantine_path = os.path.join(QUARANTINE_DIR, file_name)
    if not os.path.exists(quarantine_path):
        return {"status": "Erreur", "message": "Fichier introuvable dans la quarantaine"}
    
    try:
        # Create a restore directory if it doesn't exist
        restore_dir = os.path.join(os.path.expanduser("~"), "GuardiaRestore")
        os.makedirs(restore_dir, exist_ok=True)
        
        # Move the file from quarantine to the restore directory
        dest_path = os.path.join(restore_dir, file_name)
        shutil.move(quarantine_path, dest_path)
        
        log_threat(f"File restored from quarantine: {file_name} to {dest_path}")
        return {
            "status": "OK",
            "message": f"File restored to {dest_path}"
        }
    except Exception as e:
        return {"status": "Erreur", "message": str(e)}

# Delete a file from quarantine
def delete_file(file_name):
    quarantine_path = os.path.join(QUARANTINE_DIR, file_name)
    if not os.path.exists(quarantine_path):
        return {"status": "Erreur", "message": "Fichier introuvable dans la quarantaine"}
    
    try:
        os.remove(quarantine_path)
        log_threat(f"File deleted from quarantine: {file_name}")
        return {
            "status": "OK",
            "message": f"File permanently deleted: {file_name}"
        }
    except Exception as e:
        return {"status": "Erreur", "message": str(e)}

# List files in quarantine
def list_quarantined_files():
    try:
        if not os.path.exists(QUARANTINE_DIR):
            return []
        
        return [f for f in os.listdir(QUARANTINE_DIR) if os.path.isfile(os.path.join(QUARANTINE_DIR, f))]
    except Exception as e:
        log_threat(f"Error listing quarantined files: {str(e)}")
        return []

# Backup files
def backup_files(directory):
    if not os.path.exists(directory):
        return {"status": "Erreur", "message": "Directory not found"}
    
    try:
        backup_time = time.strftime('%Y%m%d_%H%M%S')
        backup_subdir = os.path.join(BACKUP_DIR, f"backup_{backup_time}")
        os.makedirs(backup_subdir, exist_ok=True)
        
        # Limit backup to a list of files (not recursive for safety)
        files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
        for file in files:
            file_path = os.path.join(directory, file)
            dest_path = os.path.join(backup_subdir, file)
            shutil.copy2(file_path, dest_path)
        
        log_threat(f"Backup completed for {directory}")
        return {
            "status": "OK",
            "message": f"Backup completed to {backup_subdir}",
            "files_backed_up": len(files)
        }
    except Exception as e:
        return {"status": "Erreur", "message": str(e)}
