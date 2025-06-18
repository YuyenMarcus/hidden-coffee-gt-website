#!/bin/bash

echo "🚀 Auto-Deploy Script for Vercel"
echo "=================================="

# Check if there are changes to commit
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Changes detected, committing..."
    
    # Add all changes
    git add .
    
    # Commit with timestamp
    git commit -m "Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    
    echo "📤 Pushing to GitHub..."
    git push origin main
    
    echo "✅ Changes pushed to GitHub!"
    echo "⏳ Vercel should auto-deploy within 2-3 minutes..."
    echo ""
    echo "🔍 Check deployment status:"
    echo "   https://vercel.com/dashboard"
    echo ""
    echo "🌐 Your live site:"
    echo "   https://hiddencoffeegt.nuvio.cloud"
    
else
    echo "✅ No changes to deploy"
    echo "💡 Make some changes first, then run this script again"
fi

echo ""
echo "📋 Quick commands:"
echo "   ./scripts/deploy.sh    - Deploy changes"
echo "   git status             - Check for changes"
echo "   npm run dev            - Run locally" 