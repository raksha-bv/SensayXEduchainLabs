#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

echo "Installing Python dependencies..."
pip install py-solc-x python-dotenv flask flask-cors google-generativeai

# Print environment information
echo "Build environment information:"
echo "Current directory: $(pwd)"
echo "Files in current directory: $(ls -la)"
echo "Python version: $(python --version)"
echo "Pip packages: $(pip list)"

# We don't need to download or install solc binaries during build
# as they'll be installed at runtime in the /tmp directory
echo "Build script completed successfully"