
@echo off
echo Starting Guardia Security...

:: Check if the application is already running
tasklist /FI "IMAGENAME eq Guardia Security.exe" 2>NUL | find /I /N "Guardia Security.exe">NUL
if "%ERRORLEVEL%"=="0" (
  echo Guardia Security is already running.
  goto :EOF
)

:: Find and run the executable
if exist "Guardia Security.exe" (
  start "" "Guardia Security.exe"
) else (
  :: Development environment fallback
  npm run electron
)
