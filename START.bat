@echo off
echo ==========================================
echo   Event Registration System - Startup
echo ==========================================
echo.

echo Checking Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Installing dependencqies...
call npm install

echo.
echo Starting the application...
echo.
echo ==========================================
echo   Application will open at:
echo   http://localhost:3000
echo ==========================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start