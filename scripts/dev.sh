#!/bin/bash

set -e

echo "🚀 Starting AI Agent Factory Development Mode..."

# Start server in background
echo "🔧 Starting server..."
cd server
npm run dev &
SERVER_PID=$!
cd ..

# Wait for server to start
sleep 3

# Start client in background
echo "🎨 Starting client..."
cd client
npm run dev &
CLIENT_PID=$!
cd ..

echo "✅ Development mode started!"
echo "📍 Server: http://localhost:3001"
echo "📍 Client: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop"

# Wait for processes
wait
