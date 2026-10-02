@echo off
title Exam Seating Arrangement Server
cd /d "%~dp0"

echo ============================================================
echo Starting Exam Seating Arrangement...
echo ============================================================

where node >nul 2>nul
if %errorlevel% equ 0 (
    echo Starting with Node.js...
    node server.js
    goto end
)

where python >nul 2>nul
if %errorlevel% equ 0 (
    echo Starting with Python...
    python server.py
    goto end
)

echo Starting directly in default browser...
start index.html

:end
pause
