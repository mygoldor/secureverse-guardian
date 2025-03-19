
import os
import hashlib
import json
import time
import shutil
from backend.logger import log_threat

# Configuration
THREAT_DB_PATH = "threat_db.json"  # Local threat database
QUARANTINE_DIR = "guardia_quarantine/"
BACKUP_DIR = "guardia_backup/"

# Initialize threat database if it doesn't exist
if not os.path.exists(THREAT_DB_PATH):
    with open(THREAT_DB_PATH, "w") as f:
        json.dump({"malware_hashes": []}, f)

# Scan file for threats
def scanner_fichier(file_path):
    if not os.path.exists(file_path):
        return {"status": "Erreur", "message": "Fichier introuvable"}
    
    # Calculate file hash for comparison with threat database
    hash_sha256 = hashlib.sha256()
    try:
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_sha256.update(chunk)
        file_hash = hash_sha256.hexdigest()
    except Exception as e:
        return {"status": "Erreur", "message": str(e)}
    
    # Check if hash is in threat database
    try:
        with open(THREAT_DB_PATH, "r") as f:
            threat_db = json.load(f)
            if file_hash in threat_db.get("malware_hashes", []):
                log_threat(f"Malware detected: {file_path}")
                return {
                    "status": "Malware",
                    "file_path": file_path,
                    "hash": file_hash,
                    "action_needed": "quarantine"
                }
    except Exception as e:
        print(f"Error checking threat database: {str(e)}")
    
    # Simulated security analysis (basic checks)
    file_size = os.path.getsize(file_path)
    extension = os.path.splitext(file_path)[1]
    
    # Simple check based on extension and size
    suspect = False
    raison = []
    
    if extension.lower() in ['.exe', '.bat', '.sh', '.vbs', '.ps1']:
        suspect = True
        raison.append("Potentially dangerous extension")
    
    if file_size > 10000000:  # 10 MB
        raison.append("Large file")
    
    return {
        "status": "Suspect" if suspect else "OK",
        "file_path": file_path,
        "file_size": file_size,
        "extension": extension,
        "raisons": raison
    }

# Scan directory for threats
def scan_directory(directory_path):
    if not os.path.exists(directory_path):
        return {"status": "Erreur", "message": "Directory not found"}
    
    results = {
        "status": "OK",
        "filesScanned": 0,
        "threatsFound": 0,
        "threatsList": []
    }
    
    try:
        # Walk through directory (non-recursive for safety)
        for item in os.listdir(directory_path):
            item_path = os.path.join(directory_path, item)
            
            # Only scan files, not directories
            if os.path.isfile(item_path):
                results["filesScanned"] += 1
                
                # Scan the file
                scan_result = scanner_fichier(item_path)
                
                # If the file is suspicious, add it to the threats list
                if scan_result["status"] != "OK":
                    results["threatsFound"] += 1
                    results["threatsList"].append({
                        "path": item_path,
                        "reason": ", ".join(scan_result.get("raisons", ["Unknown"]))
                    })
        
        log_threat(f"Directory scan completed: {directory_path}, found {results['threatsFound']} threats")
        return results
    except Exception as e:
        log_threat(f"Directory scan error: {str(e)}")
        return {
            "status": "Erreur",
            "message": str(e),
            "filesScanned": results["filesScanned"],
            "threatsFound": results["threatsFound"]
        }

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
