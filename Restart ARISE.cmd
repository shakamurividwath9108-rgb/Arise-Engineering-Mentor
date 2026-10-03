@echo off
setlocal
cd /d "%~dp0"
echo Restarting the local ARISE server to load the latest app files...
echo Your saved study data stays on this device.
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference = 'Stop'; $health = Invoke-RestMethod -Uri 'http://127.0.0.1:3000/api/health' -TimeoutSec 3; if ($health.app -ne 'ARISE') { throw 'Port 3000 is not serving ARISE. No process was stopped.' }; $line = netstat -ano -p tcp | Select-String -Pattern '^\s*TCP\s+0\.0\.0\.0:3000\s+0\.0\.0\.0:0\s+LISTENING\s+(\d+)\s*$' | Select-Object -First 1; if (-not $line) { $line = netstat -ano -p tcp | Select-String -Pattern '^\s*TCP\s+\[::\]:3000\s+\[::\]:0\s+LISTENING\s+(\d+)\s*$' | Select-Object -First 1 }; if (-not $line) { throw 'Could not identify the ARISE listener. No process was stopped.' }; $match = [regex]::Match($line.ToString(), 'LISTENING\s+(\d+)\s*$'); $listenerPid = [int]$match.Groups[1].Value; $process = Get-Process -Id $listenerPid; if ($process.ProcessName -ne 'node') { throw 'The ARISE listener is not Node.js. No process was stopped.' }; Stop-Process -Id $listenerPid -Force; Write-Output ('Stopped ARISE Node.js process ' + $listenerPid)"
if errorlevel 1 (
  echo Could not safely restart ARISE. No process was stopped.
  exit /b 1
)
powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Sleep -Seconds 2" >nul 2>&1
call "%~dp0Start ARISE.cmd"
exit /b %errorlevel%
