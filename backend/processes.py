
import psutil
from backend.logger import log_threat

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
