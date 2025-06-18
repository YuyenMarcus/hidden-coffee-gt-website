#!/bin/bash

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo "Creating .env.local file..."
  cat > .env.local << EOL
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hidden_coffee_gt"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Instagram
INSTAGRAM_ACCESS_TOKEN="your-instagram-access-token"
EOL
  echo "Please update the .env.local file with your actual credentials"
fi

# Start the development server
npm run dev 