#!/bin/bash

echo "🚀 Hidden Coffee GT - Deployment Script"
echo "========================================"

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI not found. Please install it first:"
    echo "   brew install gh"
    echo "   gh auth login"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub. Please run:"
    echo "   gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is ready"

# Create GitHub repository
echo "📦 Creating GitHub repository..."
REPO_NAME="hidden-coffee-gt"
REPO_DESC="Hidden Coffee GT website with Notion blog integration"

gh repo create $REPO_NAME --public --description "$REPO_DESC" --source=. --remote=origin --push

if [ $? -eq 0 ]; then
    echo "✅ GitHub repository created and code pushed!"
    echo ""
    echo "🌐 Repository URL: https://github.com/$(gh api user --jq .login)/$REPO_NAME"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to https://vercel.com"
    echo "2. Click 'New Project'"
    echo "3. Import your GitHub repository: $REPO_NAME"
    echo "4. Add environment variables:"
    echo "   - NOTION_TOKEN = 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"
    echo "   - NOTION_DATABASE_ID = 215ac0c14cf080b8894dcb512cbf6dbd"
    echo "5. Click 'Deploy'"
    echo ""
    echo "🎉 Your site will be live with automatic Notion updates!"
else
    echo "❌ Failed to create repository. Please check your GitHub permissions."
    exit 1
fi 