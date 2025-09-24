#!/bin/bash

echo "=========================================="
echo "  Event Registration System - Startup"
echo "=========================================="
echo ""

echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please download and install Node.js from: https://nodejs.org/"
    exit 1
fi

node --version
echo ""

echo "Installing dependencies..."
npm install

echo ""
echo "Starting the application..."
echo ""
echo "=========================================="
echo "  Application will open at:"
echo "  http://localhost:3000"
echo "=========================================="
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start