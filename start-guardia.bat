
@echo off
echo Starting Guardia Security...

:: Check if the application is already running
tasklist /FI "IMAGENAME eq Guardia Security.exe" 2>NUL | find /I /N "Guardia Security.exe">NUL
if "%ERRORLEVEL%"=="0" (
  echo Guardia Security is already running.
  goto :EOF
)

:: Set the app icon in the taskbar
if exist "%SystemRoot%\System32\reg.exe" (
  reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run" /v "Guardia Security" /t REG_BINARY /d 020000000000000000000000 /f >NUL 2>&1
)

:: Find and run the executable
if exist "Guardia Security.exe" (
  start "" "Guardia Security.exe"
) else (
  :: Development environment fallback
  npm run electron
)

