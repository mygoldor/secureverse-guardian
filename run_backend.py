
from backend.app import app
import socket
import sys
import os
import ssl

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

if __name__ == "__main__":
    port = 5000
    
    # Check if the port is already in use
    if is_port_in_use(port):
        print(f"Error: Port {port} is already in use. Another instance of Guardia may be running.")
        print("Please close any other instances of Guardia and try again.")
        sys.exit(1)
    
    # Create certificates directory
    cert_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "certs")
    os.makedirs(cert_dir, exist_ok=True)
    
    # Certificate and key paths
    cert_file = os.path.join(cert_dir, "guardia.crt")
    key_file = os.path.join(cert_dir, "guardia.key")
    
    # Generate certificate if needed
    cert_exists = generate_self_signed_cert(cert_file, key_file)
    
    print(f"Starting Guardia Security backend on port {port} with {'HTTPS' if cert_exists else 'HTTP'}...")
    
    if cert_exists:
        # Create SSL context
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        context.load_cert_chain(cert_file, key_file)
        
        # Run with SSL
        app.run(host="127.0.0.1", port=port, ssl_context=context)
    else:
        # Fallback to HTTP
        print("WARNING: Running without SSL. Some features may not work properly.")
        app.run(host="127.0.0.1", port=port)
