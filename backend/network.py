
import subprocess
import platform
from backend.logger import log_threat

# Domain blacklist
BLACKLISTED_DOMAINS = ["malicious.com", "phishing-site.com"]
# Set to store blocked IPs
BLOCKED_IPS = set()

def get_blocked_ips():
    """Return the set of blocked IPs"""
    return BLOCKED_IPS

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
