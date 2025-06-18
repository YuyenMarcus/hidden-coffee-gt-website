#!/bin/bash

echo "🚀 Deploying to Vercel with automatic updates..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "🔧 Next steps for automatic updates:"
echo "1. Set up Notion webhook (see docs/notion-webhook-setup.md)"
echo "2. Or use the cron job (already configured - revalidates every 5 minutes)"
echo "3. Test by adding a new post to Notion"
echo ""
echo "📝 Manual revalidation:"
echo "   https://your-domain.vercel.app/admin"
echo ""
echo "🔍 Check deployment logs:"
echo "   vercel logs" 