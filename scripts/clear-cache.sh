#!/bin/bash

echo "🧹 Clearing Next.js cache..."
rm -rf .next

echo "🔄 Restarting development server..."
pkill -f "next dev" || true
npm run dev &

echo "⏳ Waiting for server to start..."
sleep 10

echo "🔄 Triggering manual revalidation..."
curl -X GET http://localhost:3000/api/revalidate

echo "📝 Testing blog API..."
curl -X GET http://localhost:3000/api/blog | jq '.[0].title' 2>/dev/null || echo "API response received"

echo "✅ Cache cleared and server restarted!"
echo "🌐 Visit http://localhost:3000/blog-simple to see your blog posts"
echo "🔧 Visit http://localhost:3000/admin to manually refresh content" 