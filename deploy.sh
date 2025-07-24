#!/bin/bash

# Deploy script for EcoTurPB Frontend (Node.js)

echo "🚀 Starting deployment..."

# Stop existing containers
echo "📦 Stopping existing containers..."
docker-compose down

# Clean up old images
echo "🧹 Cleaning up old Docker images..."
docker system prune -f

# Build and start containers
echo "🔨 Building and starting new containers..."
docker-compose up -d --build

# Wait for containers to be ready
echo "⏳ Waiting for containers to be ready..."
sleep 15

# Check if application is running
echo "🔍 Checking application status..."
if curl -f http://localhost:7890 > /dev/null 2>&1; then
    echo "✅ Application is running successfully at http://localhost:7890"
else
    echo "❌ Application failed to start"
    echo "📋 Container logs:"
    docker-compose logs
    exit 1
fi

# Show container status
echo "📊 Container status:"
docker-compose ps

echo "🎉 Deployment completed successfully!"
echo "🌐 Application is available at: http://localhost:7890"
echo "📱 Running on Node.js with Vite preview server"
