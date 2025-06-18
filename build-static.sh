#!/bin/bash

echo "🚀 Starting static build process..."

# Check if environment variables are set
if [ -z "$NOTION_TOKEN" ] || [ -z "$NOTION_DATABASE_ID" ]; then
  echo "❌ Error: NOTION_TOKEN and NOTION_DATABASE_ID must be set in environment"
  echo "Please check your .env.local file"
  exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🧹 Cleaning previous build..."
rm -rf .next out

echo "🔨 Building static site with latest Notion data..."
npm run build

echo "✅ Build completed! Static files are in the 'out' directory"
echo "📁 You can now deploy the contents of the 'out' directory to your hosting provider" 