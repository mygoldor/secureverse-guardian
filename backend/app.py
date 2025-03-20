
from flask import Flask, jsonify, request
from flask_cors import CORS
import os

from backend.network import get_blocked_ips, scan_reseau, block_ip, unblock_ip
from backend.file_ops import (
    quarantine_file, scan_quarantined_file, restore_file, 
    delete_file, list_quarantined_files, backup_files
)
from backend.threat_scanner import scanner_fichier, scan_directory
from backend.processes import get_suspicious_processes, kill_process
from backend.logger import get_security_logs, log_threat

app = Flask(__name__)
CORS(app)  # Enable CORS for requests from Electron

# Initialize needed directories
QUARANTINE_DIR = "guardia_quarantine/"
BACKUP_DIR = "guardia_backup/"
LOG_FILE = "guardia_security.log"

os.makedirs(QUARANTINE_DIR, exist_ok=True)
os.makedirs(BACKUP_DIR, exist_ok=True)

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
    return jsonify({"ips": list(get_blocked_ips())})

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

# File verification function (missed in module extraction)
def verifier_fichier(file_path):
    import hashlib
    import os
    
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

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
