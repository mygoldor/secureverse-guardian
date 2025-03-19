
#!/bin/bash
echo "Starting Guardia Security..."

# Check if the application is already running
if pgrep -f "Guardia Security" > /dev/null; then
  echo "Guardia Security is already running."
  exit 0
fi

# Create desktop icon if it doesn't exist (Linux only)
if [ -d "$HOME/.local/share/applications" ] && [ ! -f "$HOME/.local/share/applications/guardia-security.desktop" ]; then
  echo "Creating desktop entry..."
  cat > "$HOME/.local/share/applications/guardia-security.desktop" << EOF
[Desktop Entry]
Name=Guardia Security
Exec=$(readlink -f "./Guardia Security")
Icon=$(readlink -f "./public/icons/guardia-icon-512.png")
Type=Application
Categories=Utility;Security;
EOF
  chmod +x "$HOME/.local/share/applications/guardia-security.desktop"
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

