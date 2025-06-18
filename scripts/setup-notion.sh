#!/bin/bash

echo "🚀 Setting up Notion integration for Hidden Coffee GT Blog"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Notion Configuration
# Get these values from your Notion integration
NOTION_TOKEN=your_notion_integration_token_here
NOTION_DATABASE_ID=your_notion_database_id_here

# Optional: Add your database URL for easier access
# NOTION_DATABASE_URL=https://www.notion.so/your-workspace/your-database-id
EOF
    echo "✅ .env.local file created!"
else
    echo "✅ .env.local file already exists"
fi

echo ""
echo "📋 Next steps to complete Notion setup:"
echo ""
echo "1. Go to https://www.notion.so/my-integrations"
echo "2. Create a new integration for your workspace"
echo "3. Copy the 'Internal Integration Token'"
echo "4. Replace 'your_notion_integration_token_here' in .env.local"
echo ""
echo "5. Create a database in Notion with these properties:"
echo "   - Title (title)"
echo "   - Description (rich_text)"
echo "   - PublishedDate (date)"
echo "   - Category (rich_text)"
echo "   - Author (rich_text)"
echo "   - Tags (multi_select)"
echo "   - Status (status)"
echo "   - Images (url)"
echo "   - URL (url)"
echo ""
echo "6. Share the database with your integration"
echo "7. Copy the database ID from the URL"
echo "8. Replace 'your_notion_database_id_here' in .env.local"
echo ""
echo "9. Create some blog posts in Notion"
echo "10. Set Status to 'Published' for posts you want to show"
echo ""
echo "🔗 Database URL format: https://www.notion.so/workspace/DATABASE_ID?v=..."
echo "   The DATABASE_ID is the part after the last slash and before the ?"
echo ""
echo "🎉 Once configured, restart your dev server and check the blog!" 