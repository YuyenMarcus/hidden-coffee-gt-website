#!/bin/bash

echo "🔍 Vercel Deployment Status Check"
echo "=================================="

# Check if we're on the right branch
echo "📋 Current branch: $(git branch --show-current)"
echo "📋 Remote status:"
git status --porcelain

echo ""
echo "🔗 GitHub repository:"
echo "   https://github.com/YuyenMarcus/hidden-coffee-gt-website"

echo ""
echo "🌐 Vercel dashboard:"
echo "   https://vercel.com/dashboard"

echo ""
echo "📊 To check deployment status:"
echo "   1. Go to Vercel dashboard"
echo "   2. Click your project"
echo "   3. Check 'Deployments' tab"
echo "   4. Look for latest deployment"

echo ""
echo "🚨 If deployments are failing:"
echo "   1. Check Vercel project settings"
echo "   2. Verify GitHub integration"
echo "   3. Check build logs for errors"
echo "   4. Ensure environment variables are set"

echo ""
echo "🛠️ Quick fixes:"
echo "   ./scripts/deploy.sh    - Force deploy"
echo "   git push origin main   - Push changes"
echo "   npm run build          - Test build locally"

echo ""
echo "📞 If still having issues:"
echo "   - Check Vercel logs in dashboard"
echo "   - Verify GitHub webhook is active"
echo "   - Contact Vercel support" 