
@echo off
title SPORT-MAPS
cd /d "%~dp0"

echo ============================
echo       SPORT-MAPS
echo ============================
echo.

echo Atualizando dependencias...
call npm install
call npm --prefix backend install
call npm --prefix frontend install

if errorlevel 1 (
    echo.
    echo ERRO: Falha na instalacao das dependencias.
    pause
    exit /b 1
)

echo.
echo Iniciando SPORT-MAPS...
echo.

start "" http://localhost:5173

call npm run dev

pause
