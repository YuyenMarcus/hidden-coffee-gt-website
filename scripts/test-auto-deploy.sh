#!/bin/bash

echo "🧪 Testing Automatic Deployment"
echo "================================"

# Check if we're on the right branch
echo "📋 Current branch: $(git branch --show-current)"
if [[ $(git branch --show-current) != "main" ]]; then
    echo "❌ You're not on main branch. Switch to main first."
    exit 1
fi

# Check if there are changes to commit
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Changes detected, committing..."
    git add .
    git commit -m "Test automatic deployment - $(date '+%Y-%m-%d %H:%M:%S')"
else
    echo "📝 No changes to commit. Creating a test file..."
    echo "<!-- Test deployment $(date '+%Y-%m-%d %H:%M:%S') -->" > test-deploy.html
    git add test-deploy.html
    git commit -m "Test automatic deployment - $(date '+%Y-%m-%d %H:%M:%S')"
fi

echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Changes pushed to GitHub!"
echo ""
echo "🔍 Now check your Vercel dashboard:"
echo "   https://vercel.com/dashboard"
echo ""
echo "📊 You should see:"
echo "   1. A new deployment starting automatically"
echo "   2. Build logs showing progress"
echo "   3. Live website updating within 2-3 minutes"
echo ""
echo "🌐 Your live site:"
echo "   https://hiddencoffeegt.nuvio.cloud"
echo ""
echo "⏱️ Timeline:"
echo "   Now: Push completed"
echo "   +30s: Vercel detects push"
echo "   +1m: Build starts"
echo "   +2-3m: Live site updates"
echo ""
echo "🚨 If no deployment starts:"
echo "   - Vercel GitHub integration is broken"
echo "   - Follow the guide in AUTOMATIC_DEPLOYMENT_SETUP.md" 