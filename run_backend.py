
from backend.app import app
import socket
import sys

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

if __name__ == "__main__":
    port = 5000
    
    # Check if the port is already in use
    if is_port_in_use(port):
        print(f"Error: Port {port} is already in use. Another instance of Guardia may be running.")
        print("Please close any other instances of Guardia and try again.")
        sys.exit(1)
    
    print(f"Starting Guardia Security backend on port {port}...")
    app.run(host="127.0.0.1", port=port)

