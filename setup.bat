@echo off
echo ========================================
echo Job Tracker Full Stack - Setup
echo ========================================
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found: 
node --version
echo.

echo Installing root dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install root dependencies
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo Creating environment files...
if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo Created backend\.env
)

if not exist frontend\.env (
    echo REACT_APP_API_URL=http://localhost:3001 > frontend\.env
    echo Created frontend\.env
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Get your Anthropic API key from https://console.anthropic.com
echo 2. Run: npm run dev
echo 3. Open: http://localhost:5173
echo 4. Go to Settings and save your API key
echo.
pause
