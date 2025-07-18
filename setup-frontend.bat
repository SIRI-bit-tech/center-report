@echo off
echo Setting up Next.js Frontend for The Central Report...

cd frontend

echo Installing dependencies...
npm install

echo Creating Next.js app structure...
mkdir app
mkdir components
mkdir lib
mkdir types

echo Setup complete! Next steps:
echo 1. cd frontend
echo 2. npm run dev

pause 