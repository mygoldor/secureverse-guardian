
from backend.app import app
import socket
import sys
import os
import ssl
import threading
import subprocess
import datetime
from flask import Flask, redirect, request, jsonify

def is_port_in_use(port):
    # ... keep existing code (port check function)

def generate_self_signed_cert(cert_file, key_file):
    # ... keep existing code (self-signed cert generation function)

def find_letsencrypt_cert():
    # ... keep existing code (Let's Encrypt cert finding function)

def check_cert_expiration(cert_path):
    """Check a certificate's expiration date"""
    if not os.path.exists(cert_path):
        return {
            "isValid": False,
            "daysRemaining": None,
            "expiryDate": None,
            "error": "Certificate not found"
        }
    
    try:
        # Use OpenSSL to get certificate expiration
        output = subprocess.check_output(
            ["openssl", "x509", "-enddate", "-noout", "-in", cert_path],
            universal_newlines=True
        )
        
        # Parse the expiration date
        expiry_str = output.strip().split("=")[1]
        expiry_date = datetime.datetime.strptime(expiry_str, "%b %d %H:%M:%S %Y %Z")
        
        # Calculate days remaining
        now = datetime.datetime.now()
        days_remaining = (expiry_date - now).days
        
        return {
            "isValid": days_remaining > 0,
            "daysRemaining": days_remaining,
            "expiryDate": expiry_date.isoformat(),
            "error": None
        }
    except Exception as e:
        return {
            "isValid": False,
            "daysRemaining": None,
            "expiryDate": None,
            "error": str(e)
        }

def renew_certificates():
    """Attempt to renew Let's Encrypt certificates"""
    try:
        # Run certbot renew
        result = subprocess.run(
            ["certbot", "renew", "--non-interactive"],
            capture_output=True,
            text=True
        )
        
        success = result.returncode == 0
        message = result.stdout if success else result.stderr
        
        return {
            "success": success,
            "message": message
        }
    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }

def run_http_server(http_port):
    """Run HTTP server that redirects to HTTPS"""
    redirect_app = Flask("redirect_app")
    
    @redirect_app.route('/', defaults={'path': ''})
    @redirect_app.route('/<path:path>')
    def redirect_to_https(path):
        https_url = f"https://{request.host.split(':')[0]}:5000{request.full_path}"
        return redirect(https_url, code=301)
    
    print(f"Starting HTTP redirect server on port {http_port}")
    redirect_app.run(host="127.0.0.1", port=http_port)

# Add API endpoints for certificate management
@app.route('/api/cert-status', methods=['GET'])
def cert_status():
    domain = request.args.get('domain', 'localhost')
    cert_path, _ = find_letsencrypt_cert()
    
    if not cert_path:
        return jsonify({
            "isValid": False,
            "daysRemaining": None,
            "expiryDate": None,
            "error": "Certificate not found"
        })
    
    return jsonify(check_cert_expiration(cert_path))

@app.route('/api/cert-renew', methods=['POST'])
def cert_renew():
    data = request.get_json() or {}
    domain = data.get('domain', 'localhost')
    
    # Check if we have Let's Encrypt certificates first
    cert_path, _ = find_letsencrypt_cert()
    if not cert_path:
        return jsonify({
            "success": False,
            "message": "No Let's Encrypt certificates found to renew"
        })
    
    # Try to renew certificates
    result = renew_certificates()
    return jsonify(result)

if __name__ == "__main__":
    https_port = 5000
    http_port = 5001  # HTTP port for redirection
    
    # Check if the ports are already in use
    if is_port_in_use(https_port):
        print(f"Error: Port {https_port} is already in use. Another instance of Guardia may be running.")
        print("Please close any other instances of Guardia and try again.")
        sys.exit(1)
    
    if is_port_in_use(http_port):
        print(f"Warning: Port {http_port} is already in use. HTTP redirection will not be available.")
    else:
        # Start HTTP server in a separate thread
        http_thread = threading.Thread(target=run_http_server, args=(http_port,))
        http_thread.daemon = True
        http_thread.start()
    
    # Create certificates directory
    cert_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "certs")
    os.makedirs(cert_dir, exist_ok=True)
    
    # First try to find Let's Encrypt certificates
    lets_encrypt_cert, lets_encrypt_key = find_letsencrypt_cert()
    
    if lets_encrypt_cert and lets_encrypt_key:
        print(f"Using Let's Encrypt certificate: {lets_encrypt_cert}")
        # Check expiration
        expiry_info = check_cert_expiration(lets_encrypt_cert)
        if expiry_info["isValid"]:
            print(f"Certificate is valid for {expiry_info['daysRemaining']} more days")
        else:
            print(f"Certificate is invalid or expired: {expiry_info['error']}")
            # Try automatic renewal
            print("Attempting to renew certificates...")
            renewal_result = renew_certificates()
            print(f"Renewal attempt: {renewal_result['message']}")
        
        cert_file = lets_encrypt_cert
        key_file = lets_encrypt_key
        cert_exists = True
    else:
        # Fall back to self-signed certificates
        cert_file = os.path.join(cert_dir, "guardia.crt")
        key_file = os.path.join(cert_dir, "guardia.key")
        cert_exists = generate_self_signed_cert(cert_file, key_file)
    
    print(f"Starting Guardia Security backend on port {https_port} with {'HTTPS' if cert_exists else 'HTTP'}...")
    
    if cert_exists:
        # Create SSL context
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        context.load_cert_chain(cert_file, key_file)
        
        # Run with SSL
        app.run(host="127.0.0.1", port=https_port, ssl_context=context)
    else:
        # Fallback to HTTP
        print("WARNING: Running without SSL. Some features may not work properly.")
        app.run(host="127.0.0.1", port=https_port)
