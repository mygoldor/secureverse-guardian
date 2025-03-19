
from flask import Flask, request, jsonify, Response
import os
import hashlib
import json
import time
import shutil
import socket
import threading
from flask_cors import CORS
import subprocess
import platform

app = Flask(__name__)
CORS(app)  # Enable CORS for requests from Electron

# --------------------- CONFIGURATION ---------------------
THREAT_DB_PATH = "threat_db.json"  # Local threat database
QUARANTINE_DIR = "guardia_quarantine/"
BACKUP_DIR = "guardia_backup/"
LOG_FILE = "guardia_security.log"
BLACKLISTED_DOMAINS = ["malicious.com", "phishing-site.com"]  # Domain blacklist

# Initialize directories
os.makedirs(QUARANTINE_DIR, exist_ok=True)
os.makedirs(BACKUP_DIR, exist_ok=True)

# Initialize threat database if it doesn't exist
if not os.path.exists(THREAT_DB_PATH):
    with open(THREAT_DB_PATH, "w") as f:
        json.dump({"malware_hashes": []}, f)

# --------------------- SECURITY FUNCTIONS ---------------------

# Network scanning function (from original code)
def scan_reseau():
    devices = []
    
    try:
        # Use the appropriate command based on the operating system
        if platform.system() == "Windows":
            output = subprocess.check_output("arp -a", shell=True).decode('utf-8')
        else:  # Linux and macOS
            output = subprocess.check_output("arp -a", shell=True).decode('utf-8')
        
        # Parse the output
        lines = output.split('\n')
        for line in lines:
            if '(' in line and ')' in line:
                ip = line.split('(')[1].split(')')[0]
                if 'at' in line:
                    mac = line.split('at')[1].strip().split(' ')[0]
                    devices.append({"ip": ip, "mac": mac})
    except Exception as e:
        devices.append({"error": str(e)})
    
    return devices

# Check file integrity (from original code)
def verifier_fichier(file_path):
    if not os.path.exists(file_path):
        return {"status": "Erreur", "message": "Fichier introuvable"}

    hash_md5 = hashlib.md5()
    try:
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
        
        return {"status": "OK", "hash": hash_md5.hexdigest()}
    except Exception as e:
        return {"status": "Erreur", "message": str(e)}

# Scan file for threats (enhanced from original code)
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

# Backup files (simplified from the security agent code)
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

# Simulated process monitoring
def get_suspicious_processes():
    suspicious = []
    
    # This is just a simulation, as we can't access system processes through the web
    # In a real app, this would use psutil or system commands to list processes
    suspicious.append({
        "name": "example_suspicious.exe",
        "pid": 1234,
        "cpu_usage": "2.5%",
        "memory_usage": "15MB",
        "status": "Simulated"
    })
    
    return suspicious

# --------------------- API ENDPOINTS ---------------------

# Network scanning endpoint (from original code)
@app.route("/scan-reseau", methods=["GET"])
def api_scan_reseau():
    result = scan_reseau()
    return jsonify(result)

# File verification endpoint (from original code)
@app.route("/verifier-fichier", methods=["POST"])
def api_verifier_fichier():
    data = request.json
    file_path = data.get("file_path")
    result = verifier_fichier(file_path)
    return jsonify(result)

# File scanning endpoint (from original code, enhanced)
@app.route("/scanner-fichier", methods=["POST"])
def api_scanner_fichier():
    data = request.json
    file_path = data.get("file_path")
    result = scanner_fichier(file_path)
    return jsonify(result)

# Quarantine file endpoint (new)
@app.route("/quarantine-file", methods=["POST"])
def api_quarantine_file():
    data = request.json
    file_path = data.get("file_path")
    result = quarantine_file(file_path)
    return jsonify(result)

# Backup files endpoint (new)
@app.route("/backup-files", methods=["POST"])
def api_backup_files():
    data = request.json
    directory = data.get("directory")
    result = backup_files(directory)
    return jsonify(result)

# Security logs endpoint (new)
@app.route("/security-logs", methods=["GET"])
def api_security_logs():
    lines = request.args.get("lines", default=50, type=int)
    logs = get_security_logs(lines)
    return jsonify({"logs": logs})

# Suspicious processes endpoint (new)
@app.route("/suspicious-processes", methods=["GET"])
def api_suspicious_processes():
    processes = get_suspicious_processes()
    return jsonify({"processes": processes})

# Status endpoint (from original code)
@app.route("/status", methods=["GET"])
def api_status():
    return jsonify({"status": "running"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
