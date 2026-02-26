#!/bin/bash

set -e

echo "🚀 Building AI Agent Factory..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build server
echo "🔧 Building server..."
cd server
npm ci
npm run build
cd ..

# Build client
echo "🎨 Building client..."
cd client
npm ci
npm run build
cd ..

# Build electron app
echo "📦 Building electron app..."
npm run build

echo "✅ Build complete! Output in dist/"
