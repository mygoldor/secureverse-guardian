
from flask import Flask, request, jsonify, Response
import os
import hashlib
import json
import time
import shutil
import socket
import threading
import platform
import psutil
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for requests from Electron

# --------------------- CONFIGURATION ---------------------
THREAT_DB_PATH = "threat_db.json"  # Local threat database
QUARANTINE_DIR = "guardia_quarantine/"
BACKUP_DIR = "guardia_backup/"
LOG_FILE = "guardia_security.log"
BLACKLISTED_DOMAINS = ["malicious.com", "phishing-site.com"]  # Domain blacklist
BLOCKED_IPS = set()  # Set to store blocked IPs

# Initialize directories
os.makedirs(QUARANTINE_DIR, exist_ok=True)
os.makedirs(BACKUP_DIR, exist_ok=True)

# Initialize threat database if it doesn't exist
if not os.path.exists(THREAT_DB_PATH):
    with open(THREAT_DB_PATH, "w") as f:
        json.dump({"malware_hashes": []}, f)

# Initialize log file if it doesn't exist
if not os.path.exists(LOG_FILE):
    with open(LOG_FILE, "w") as f:
        f.write(f"{time.strftime('%Y-%m-%d %H:%M:%S')} - Guardia Security initialized\n")

# --------------------- SECURITY FUNCTIONS ---------------------

# Log security events
def log_threat(message):
    with open(LOG_FILE, "a") as log:
        log.write(f"{time.strftime('%Y-%m-%d %H:%M:%S')} - {message}\n")
    print(message)

# Network scanning function
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

# Block an IP address
def block_ip(ip):
    if ip in BLOCKED_IPS:
        return {"status": "Already blocked", "message": f"IP {ip} is already blocked"}
    
    try:
        # Simulated IP blocking - in a real app this would use system firewall commands
        BLOCKED_IPS.add(ip)
        log_threat(f"IP blocked: {ip}")
        return {"status": "OK", "message": f"IP {ip} blocked successfully"}
    except Exception as e:
        return {"status": "Error", "message": str(e)}

# Unblock an IP address
def unblock_ip(ip):
    if ip not in BLOCKED_IPS:
        return {"status": "Not blocked", "message": f"IP {ip} is not in the blocked list"}
    
    try:
        # Simulated IP unblocking
        BLOCKED_IPS.remove(ip)
        log_threat(f"IP unblocked: {ip}")
        return {"status": "OK", "message": f"IP {ip} unblocked successfully"}
    except Exception as e:
        return {"status": "Error", "message": str(e)}

# Check file integrity
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
    normal = []
    
    try:
        # Use psutil to get real processes
        for proc in psutil.process_iter(['pid', 'name', 'username', 'cpu_percent', 'memory_percent']):
            process_info = proc.info
            
            # Simulated check for suspicious processes
            # In a real app, you would have more sophisticated detection
            if process_info['name'] in [
                'cmd.exe', 'powershell.exe', 'python.exe',  # Example of potentially suspicious processes
                'winlogon.exe', 'csrss.exe', 'svchost.exe'  # System processes (often legitimate but can be spoofed)
            ]:
                suspicious.append({
                    "name": process_info['name'],
                    "pid": process_info['pid'],
                    "cpu_usage": f"{process_info['cpu_percent']:.1f}%",
                    "memory_usage": f"{process_info['memory_percent']:.1f}%",
                    "status": "Suspicious"
                })
            else:
                # Add some regular processes for demonstration
                if len(normal) < 5:  # Limit to 5 normal processes
                    normal.append({
                        "name": process_info['name'],
                        "pid": process_info['pid'],
                        "cpu_usage": f"{process_info['cpu_percent']:.1f}%",
                        "memory_usage": f"{process_info['memory_percent']:.1f}%",
                        "status": "Normal"
                    })
    except Exception as e:
        log_threat(f"Error monitoring processes: {str(e)}")
        # Add a simulated process for demo purposes if real monitoring fails
        suspicious.append({
            "name": "malware.exe",
            "pid": 1234,
            "cpu_usage": "2.5%",
            "memory_usage": "15MB",
            "status": "Suspicious"
        })
    
    # Combine suspicious and normal processes
    return suspicious + normal

# Terminate a process
def kill_process(pid):
    try:
        process = psutil.Process(pid)
        process.terminate()
        log_threat(f"Process terminated: {pid}")
        return {"status": "OK", "message": f"Process {pid} terminated successfully"}
    except psutil.NoSuchProcess:
        return {"status": "Erreur", "message": f"Process with PID {pid} not found"}
    except Exception as e:
        return {"status": "Erreur", "message": str(e)}

# --------------------- API ENDPOINTS ---------------------

# Network scanning endpoint
@app.route("/scan-reseau", methods=["GET"])
def api_scan_reseau():
    result = scan_reseau()
    return jsonify(result)

# File verification endpoint
@app.route("/verifier-fichier", methods=["POST"])
def api_verifier_fichier():
    data = request.json
    file_path = data.get("file_path")
    result = verifier_fichier(file_path)
    return jsonify(result)

# File scanning endpoint
@app.route("/scanner-fichier", methods=["POST"])
def api_scanner_fichier():
    data = request.json
    file_path = data.get("file_path")
    result = scanner_fichier(file_path)
    return jsonify(result)

# Directory scanning endpoint
@app.route("/scan-directory", methods=["POST"])
def api_scan_directory():
    data = request.json
    directory_path = data.get("directory_path")
    result = scan_directory(directory_path)
    return jsonify(result)

# Quarantine file endpoint
@app.route("/quarantine-file", methods=["POST"])
def api_quarantine_file():
    data = request.json
    file_path = data.get("file_path")
    result = quarantine_file(file_path)
    return jsonify(result)

# List quarantined files endpoint
@app.route("/list-quarantined-files", methods=["GET"])
def api_list_quarantined_files():
    files = list_quarantined_files()
    return jsonify({"files": files})

# Scan quarantined file endpoint
@app.route("/scan-quarantined-file", methods=["POST"])
def api_scan_quarantined_file():
    data = request.json
    file_name = data.get("file_name")
    result = scan_quarantined_file(file_name)
    return jsonify(result)

# Restore file endpoint
@app.route("/restore-file", methods=["POST"])
def api_restore_file():
    data = request.json
    file_name = data.get("file_name")
    result = restore_file(file_name)
    return jsonify(result)

# Delete file endpoint
@app.route("/delete-file", methods=["POST"])
def api_delete_file():
    data = request.json
    file_name = data.get("file_name")
    result = delete_file(file_name)
    return jsonify(result)

# Backup files endpoint
@app.route("/backup-files", methods=["POST"])
def api_backup_files():
    data = request.json
    directory = data.get("directory")
    result = backup_files(directory)
    return jsonify(result)

# Security logs endpoint
@app.route("/security-logs", methods=["GET"])
def api_security_logs():
    lines = request.args.get("lines", default=50, type=int)
    logs = get_security_logs(lines)
    return jsonify({"logs": logs})

# Suspicious processes endpoint
@app.route("/suspicious-processes", methods=["GET"])
def api_suspicious_processes():
    processes = get_suspicious_processes()
    return jsonify({"processes": processes})

# Kill process endpoint
@app.route("/kill-process", methods=["POST"])
def api_kill_process():
    data = request.json
    pid = data.get("pid")
    result = kill_process(pid)
    return jsonify(result)

# Blocked IPs endpoint
@app.route("/blocked-ips", methods=["GET"])
def api_blocked_ips():
    return jsonify({"ips": list(BLOCKED_IPS)})

# Block IP endpoint
@app.route("/block-ip", methods=["POST"])
def api_block_ip():
    data = request.json
    ip = data.get("ip")
    result = block_ip(ip)
    return jsonify(result)

# Unblock IP endpoint
@app.route("/unblock-ip", methods=["POST"])
def api_unblock_ip():
    data = request.json
    ip = data.get("ip")
    result = unblock_ip(ip)
    return jsonify(result)

# Status endpoint
@app.route("/status", methods=["GET"])
def api_status():
    return jsonify({"status": "running"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
