
import os
import hashlib
import json
from backend.logger import log_threat

# Configuration
THREAT_DB_PATH = "threat_db.json"  # Local threat database

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
