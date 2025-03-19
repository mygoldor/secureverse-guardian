
from flask import Flask, request, jsonify, Response
import os
import hashlib
import json
from flask_cors import CORS
import subprocess
import platform

app = Flask(__name__)
CORS(app)  # Activer CORS pour permettre les requêtes depuis Electron

# Scanner le réseau pour voir les appareils connectés
def scan_reseau():
    devices = []
    
    try:
        # Utiliser la commande appropriée selon le système d'exploitation
        if platform.system() == "Windows":
            output = subprocess.check_output("arp -a", shell=True).decode('utf-8')
        else:  # Linux et macOS
            output = subprocess.check_output("arp -a", shell=True).decode('utf-8')
        
        # Analyser la sortie
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

# Vérifier l'intégrité des fichiers
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

# Scanner un fichier pour détecter les menaces
def scanner_fichier(file_path):
    if not os.path.exists(file_path):
        return {"status": "Erreur", "message": "Fichier introuvable"}
    
    # Simuler une analyse de sécurité
    file_size = os.path.getsize(file_path)
    extension = os.path.splitext(file_path)[1]
    
    # Vérification simplifiée basée sur l'extension et la taille
    suspect = False
    raison = []
    
    if extension.lower() in ['.exe', '.bat', '.sh', '.vbs', '.ps1']:
        suspect = True
        raison.append("Extension potentiellement dangereuse")
    
    if file_size > 10000000:  # 10 MB
        raison.append("Fichier volumineux")
    
    return {
        "status": "Suspect" if suspect else "OK",
        "file_path": file_path,
        "file_size": file_size,
        "extension": extension,
        "raisons": raison
    }

@app.route("/scan-reseau", methods=["GET"])
def api_scan_reseau():
    result = scan_reseau()
    return jsonify(result)

@app.route("/verifier-fichier", methods=["POST"])
def api_verifier_fichier():
    data = request.json
    file_path = data.get("file_path")
    result = verifier_fichier(file_path)
    return jsonify(result)

@app.route("/scanner-fichier", methods=["POST"])
def api_scanner_fichier():
    data = request.json
    file_path = data.get("file_path")
    result = scanner_fichier(file_path)
    return jsonify(result)

@app.route("/status", methods=["GET"])
def api_status():
    return jsonify({"status": "running"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
