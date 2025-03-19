
#!/bin/bash
echo "Starting Guardia Security..."

# Check if the application is already running
if pgrep -f "Guardia Security" > /dev/null; then
  echo "Guardia Security is already running."
  exit 0
fi

# Determine the actual path of the executable based on platform
if [ -f "./Guardia Security" ]; then
  # Direct execution on Linux
  "./Guardia Security"
elif [ -d "./Guardia Security.app" ]; then
  # macOS application bundle
  open "./Guardia Security.app"
else
  # Development environment fallback
  npm run electron
fi
