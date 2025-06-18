# Hidden Coffee GT Website

A modern, responsive website for Hidden Coffee GT, a coffee shop located in Panajachel, Guatemala. This website is built using Next.js and implements a pixel-perfect clone of the Brune template with custom branding and content management capabilities.

## Features

- Pixel-perfect clone of the Brune template
- Custom teal and white color scheme
- Responsive design with identical breakpoints
- **Notion-powered Blog System** - Manage blog posts directly from Notion
- Content Management System (CMS) for easy content updates
- Optimized images and animations
- SEO-friendly with server-side rendering
- Mobile-first approach

## Blog System

The website includes a powerful blog system powered by Notion as a headless CMS:

### Blog Features
- **Notion Integration**: Write and manage blog posts directly in Notion
- **Video Support**: Embed YouTube and Vimeo videos
- **Rich Content**: Support for headings, paragraphs, lists, images, and code blocks
- **Tags & Categories**: Organize posts with tags
- **SEO Optimized**: Automatic meta tags and Open Graph images
- **Static Generation**: Fast loading with pre-built pages
- **Responsive Design**: Beautiful layout on all devices

### Blog Post Structure
Each blog post includes:
- Title
- Description/Excerpt
- Cover Image (optional)
- Video URL (YouTube/Vimeo)
- Published Date
- Tags (optional)
- Rich content body

### Quick Setup
1. Run the setup script:
```bash
./scripts/setup-notion.sh
```

2. Follow the interactive setup guide or visit `/admin` for detailed instructions

3. Create your Notion database with the required properties:
   - Title (Title property)
   - Description (Rich text property)
   - CoverImage (URL property)
   - VideoURL (URL property)
   - PublishedDate (Date property)
   - Tags (Multi-select property)
   - Slug (Rich text property)

4. Add your Notion integration token and database ID to `.env.local`

5. Start creating blog posts in Notion!

### Troubleshooting Blog Issues

#### Common Issues and Fixes

**1. Blog posts not showing up**
- ✅ **Fixed**: Removed fake placeholder posts - now shows setup instructions when no posts are available
- ✅ **Fixed**: Improved error handling for Notion API failures
- ✅ **Fixed**: Added proper loading states

**2. Images not displaying**
- ✅ **Fixed**: Updated Next.js config to allow external images from Notion
- ✅ **Fixed**: Added support for SVG images with `dangerouslyAllowSVG`
- ✅ **Fixed**: Added fallback to local images when external images fail

**3. Navigation issues**
- ✅ **Fixed**: Added "Back to Home" navigation to blog pages
- ✅ **Fixed**: Fixed "Leer más" links to properly navigate to blog posts
- ✅ **Fixed**: Improved navigation between blog listing and individual posts

**4. Notion API errors**
- ✅ **Fixed**: Removed problematic database filters that caused validation errors
- ✅ **Fixed**: Improved error handling and logging
- ✅ **Fixed**: Added client-side filtering instead of server-side filtering

**5. Content not displaying**
- ✅ **Fixed**: Improved content extraction from Notion blocks
- ✅ **Fixed**: Better handling of rich text and paragraph content
- ✅ **Fixed**: Added proper excerpt generation

#### Required Notion Database Properties

Make sure your Notion database has these exact property names:
```
Title (title)
Description (rich_text)
PublishedDate (date)
Category (rich_text)
Author (rich_text)
Tags (multi_select)
Status (status)
Images (url)
URL (url)
```

#### Environment Variables

Create a `.env.local` file with:
```env
NOTION_TOKEN=your_notion_integration_token_here
NOTION_DATABASE_ID=your_notion_database_id_here
```

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- **@notionhq/client** (Notion API integration)
- **@tailwindcss/typography** (Blog content styling)
- Framer Motion (for animations)
- GSAP (for advanced animations)
- Prisma (for database)
- NextAuth.js (for authentication)
- Cloudinary (for image management)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Notion account (for blog management)
- A Cloudinary account (for image management)
- A database (PostgreSQL recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hidden-coffee-gt.git
cd hidden-coffee-gt
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up the blog system:
```bash
./scripts/setup-notion.sh
```

4. Configure your Notion integration:
   - Create a Notion integration at https://www.notion.so/my-integrations
   - Create a database with the required properties
   - Share the database with your integration
   - Update `.env.local` with your credentials

5. Set up additional environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
# Notion API Configuration
NOTION_TOKEN="your_notion_integration_token"
NOTION_DATABASE_ID="your_notion_database_id"

# Database
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

6. Initialize the database:
```bash
npx prisma db push
```

7. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The website will be available at `http://localhost:3000`

### Blog URLs
- Blog listing: `/blog`
- Individual posts: `/blog/[slug]`
- CMS guide: `/admin`

## Content Management System

The CMS is accessible at `/admin` and provides the following features:

### Blog Management (Notion-powered)
- Create, edit, and delete blog posts directly in Notion
- Rich text editing with formatting options
- Image and video embedding
- Tag management
- Automatic slug generation
- Real-time preview

### Traditional CMS Features
1. News/Blog Management
   - Create, edit, and delete blog posts
   - Upload and manage images
   - Schedule posts for future publication

2. Menu Management
   - Update menu items and prices
   - Add new categories
   - Manage item availability

3. Image Gallery
   - Upload and manage Instagram gallery images
   - Reorder images via drag-and-drop
   - Add captions and links

## Deployment

1. Build the project:
```bash
npm run build
# or
yarn build
```

2. Start the production server:
```bash
npm run start
# or
yarn start
```

For production deployment, we recommend using Vercel or a similar platform that supports Next.js applications.

**Note**: Make sure to set your Notion environment variables in your production environment.

## Customization

### Colors
The color scheme can be modified in `tailwind.config.js`. The primary colors are:
- Teal: #008080
- White: #FFFFFF

### Fonts
The website uses:
- Inter (sans-serif) for body text
- Playfair Display (serif) for headings

Fonts can be modified in `tailwind.config.js` and `src/app/layout.tsx`.

### Blog Styling
Blog content styling can be customized by modifying the Tailwind Typography plugin configuration in `tailwind.config.js`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@hiddencoffeegt.com or open an issue in the GitHub repository. 