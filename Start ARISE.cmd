@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 goto no_node
node -e "const major=Number(process.versions.node.split('.')[0]);if(major<22||!process.release.lts)process.exit(1)" >nul 2>&1
if errorlevel 1 goto no_node

powershell -NoProfile -ExecutionPolicy Bypass -Command "$health = $null; try { $health = Invoke-RestMethod -Uri 'http://127.0.0.1:3000/api/health' -TimeoutSec 2 } catch {}; if ($health -and $health.app -eq 'ARISE') { if ([int]$health.appVersion -ge 24) { exit 0 } else { exit 2 } }; exit 1" >nul 2>&1
if errorlevel 2 goto old_server
if not errorlevel 1 goto open_app

powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath 'node' -ArgumentList 'server.mjs' -WorkingDirectory '%CD%' -WindowStyle Hidden" >nul 2>&1
for /l %%i in (1,1,15) do (
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$health = $null; try { $health = Invoke-RestMethod -Uri 'http://127.0.0.1:3000/api/health' -TimeoutSec 2 } catch {}; if ($health -and $health.app -eq 'ARISE') { if ([int]$health.appVersion -ge 24) { exit 0 } else { exit 2 } }; exit 1" >nul 2>&1
  if errorlevel 2 goto old_server
  if not errorlevel 1 goto open_app
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Sleep -Seconds 1" >nul 2>&1
)
echo ARISE did not start. Make sure a supported Node.js LTS release is installed and port 3000 is available.
pause
exit /b 1

:old_server
echo An older ARISE server is using port 3000. Restart it to load this release and its live features.
call "%~dp0Restart ARISE.cmd"
exit /b %errorlevel%

:open_app
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" "http://localhost:3000/#home"
  exit /b 0
)
if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" "http://localhost:3000/#home"
  exit /b 0
)
if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
  start "" "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" "http://localhost:3000/#home"
  exit /b 0
)
start "" "http://localhost:3000/#home"
exit /b 0

:no_node
echo A supported Node.js LTS release, version 22 or newer, is needed for live feeds, Codeforces suggestions and shared study rooms.
echo You can still open index.html for the downloaded offline learning tools.
start "" "%~dp0index.html"
pause
exit /b 0
