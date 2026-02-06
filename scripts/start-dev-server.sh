#!/bin/bash
# Start a shared Stencil dev server for parallel e2e testing
# This server will be reused by all Playwright tests

set -e

# Pick any component to start the dev server (they all use port 3333)
cd "$(dirname "$0")/../packages/accordion"

echo "Starting shared Stencil dev server on port 3333..."
npx stencil build --dev --watch --serve --no-open &
SERVER_PID=$!

# Wait for server to be ready
echo "Waiting for server to start..."
timeout=60
while ! curl -s http://localhost:3333 > /dev/null 2>&1; do
  sleep 1
  timeout=$((timeout-1))
  if [ $timeout -le 0 ]; then
    echo "Server failed to start within 60 seconds"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
  fi
done

echo "Server is ready!"
echo $SERVER_PID > /tmp/stencil-dev-server.pid
