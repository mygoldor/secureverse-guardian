
from backend.app import app
import socket
import sys
import os
import ssl
import threading
from flask import Flask, redirect, request

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def generate_self_signed_cert(cert_file, key_file):
    """Generate a self-signed certificate if none exists"""
    if os.path.exists(cert_file) and os.path.exists(key_file):
        print(f"Using existing certificate: {cert_file}")
        return True
    
    try:
        from OpenSSL import crypto
        print("Generating self-signed certificate...")
        
        # Create a key pair
        k = crypto.PKey()
        k.generate_key(crypto.TYPE_RSA, 2048)
        
        # Create a self-signed cert
        cert = crypto.X509()
        cert.get_subject().C = "US"
        cert.get_subject().ST = "State"
        cert.get_subject().L = "City"
        cert.get_subject().O = "Guardia Security"
        cert.get_subject().OU = "Security"
        cert.get_subject().CN = "localhost"
        cert.set_serial_number(1000)
        cert.gmtime_adj_notBefore(0)
        cert.gmtime_adj_notAfter(10*365*24*60*60)  # 10 years
        cert.set_issuer(cert.get_subject())
        cert.set_pubkey(k)
        cert.sign(k, 'sha256')
        
        # Write certificate
        with open(cert_file, "wb") as f:
            f.write(crypto.dump_certificate(crypto.FILETYPE_PEM, cert))
        
        # Write private key
        with open(key_file, "wb") as f:
            f.write(crypto.dump_privatekey(crypto.FILETYPE_PEM, k))
        
        print(f"Self-signed certificate generated: {cert_file}")
        return True
    except Exception as e:
        print(f"Error generating certificate: {e}")
        return False

def find_letsencrypt_cert():
    """Look for Let's Encrypt certificates in common locations"""
    # Common Let's Encrypt certificate locations
    possible_locations = [
        # Linux common locations
        ('/etc/letsencrypt/live/', 'fullchain.pem', 'privkey.pem'),
        # macOS common locations
        ('/usr/local/etc/letsencrypt/live/', 'fullchain.pem', 'privkey.pem'),
        # Windows common locations (with Certbot installed)
        ('C:/Certbot/live/', 'fullchain.pem', 'privkey.pem')
    ]
    
    # Add domain-specific locations
    domains = ['localhost', 'guardia.local', os.environ.get('GUARDIA_DOMAIN', '')]
    
    for base_path, cert_name, key_name in possible_locations:
        for domain in domains:
            if domain:
                domain_path = os.path.join(base_path, domain)
                cert_path = os.path.join(domain_path, cert_name)
                key_path = os.path.join(domain_path, key_name)
                
                if os.path.exists(cert_path) and os.path.exists(key_path):
                    print(f"Found Let's Encrypt certificate for {domain}: {cert_path}")
                    return cert_path, key_path
    
    # Check custom certificate path if specified
    custom_cert = os.environ.get('GUARDIA_CERT_PATH')
    custom_key = os.environ.get('GUARDIA_KEY_PATH')
    
    if custom_cert and custom_key and os.path.exists(custom_cert) and os.path.exists(custom_key):
        print(f"Using custom certificate: {custom_cert}")
        return custom_cert, custom_key
    
    return None, None

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
