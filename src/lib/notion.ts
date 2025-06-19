import { Client } from '@notionhq/client'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { BlogPost, NotionProperty, getTitle, getRichText, getDate, getMultiSelect } from '@/types/blog'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const databaseId = process.env.NOTION_DATABASE_ID!

// Convert Notion rich text to HTML
export function convertRichTextToHtml(richText: any[]): string {
  return richText
    .map((text) => {
      const content = text.plain_text
      const annotations = text.annotations

      let html = content

      if (annotations.bold) html = `<strong>${html}</strong>`
      if (annotations.italic) html = `<em>${html}</em>`
      if (annotations.strikethrough) html = `<del>${html}</del>`
      if (annotations.underline) html = `<u>${html}</u>`
      if (annotations.code) html = `<code>${html}</code>`

      if (text.href) {
        html = `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${html}</a>`
      }

      return html
    })
    .join('')
}

// Convert Notion page to BlogPost
export function convertNotionPageToBlogPost(page: PageObjectResponse): BlogPost {
  const properties = page.properties as Record<string, NotionProperty>

  // Get cover image from page cover or from properties
  let coverImage = ''
  
  // First try to get cover from page cover
  if (page.cover?.type === 'external') {
    coverImage = page.cover.external.url
  } else if (page.cover?.type === 'file') {
    coverImage = page.cover.file.url
  }
  
  // If no cover found, try to get from properties.images
  if (!coverImage && properties.images?.type === 'files' && properties.images.files.length > 0) {
    const firstImage = properties.images.files[0]
    if ('file' in firstImage) {
      coverImage = firstImage.file.url
    } else if ('external' in firstImage) {
      coverImage = firstImage.external.url
    }
  }

  // Proxy Notion images through our API to avoid expiring URLs
  if (coverImage && (coverImage.includes('notion.so') || coverImage.includes('amazonaws.com'))) {
    coverImage = `/api/notion-image?url=${encodeURIComponent(coverImage)}`
  }

  return {
    id: page.id,
    slug: page.id, // Use page ID as slug since URL property was removed
    title: getTitle(properties.Title || { type: 'title', title: [] }),
    description: getRichText(properties.Description || { type: 'rich_text', rich_text: [] }),
    coverImage: coverImage,
    videoUrl: '', // Video URL property was removed
    publishedDate: getDate(properties.PublishedDate || { type: 'date', date: null }),
    tags: getMultiSelect(properties.Tags || { type: 'multi_select', multi_select: [] }),
    content: '', // Will be populated when fetching individual post
  }
}

// Fetch all blog posts from Notion database
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'PublishedDate',
          direction: 'descending',
        },
      ],
    })

    return response.results
      .filter((page): page is PageObjectResponse => page.object === 'page')
      .map(convertNotionPageToBlogPost)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// Fetch a single blog post by slug (now using page ID)
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Since we're using page ID as slug, we can directly retrieve the page
    const page = await notion.pages.retrieve({ page_id: slug })
    
    if (!page || page.object !== 'page') {
      return null
    }

    const pageObject = page as PageObjectResponse
    const blogPost = convertNotionPageToBlogPost(pageObject)

    // Fetch the page content
    const blocks = await notion.blocks.children.list({
      block_id: pageObject.id,
    })

    // Convert blocks to HTML content
    const content = blocks.results
      .map((block: any) => {
        switch (block.type) {
          case 'paragraph':
            return `<p>${convertRichTextToHtml(block.paragraph.rich_text)}</p>`
          case 'heading_1':
            return `<h1>${convertRichTextToHtml(block.heading_1.rich_text)}</h1>`
          case 'heading_2':
            return `<h2>${convertRichTextToHtml(block.heading_2.rich_text)}</h2>`
          case 'heading_3':
            return `<h3>${convertRichTextToHtml(block.heading_3.rich_text)}</h3>`
          case 'bulleted_list_item':
            return `<li>${convertRichTextToHtml(block.bulleted_list_item.rich_text)}</li>`
          case 'numbered_list_item':
            return `<li>${convertRichTextToHtml(block.numbered_list_item.rich_text)}</li>`
          case 'quote':
            return `<blockquote>${convertRichTextToHtml(block.quote.rich_text)}</blockquote>`
          case 'code':
            return `<pre><code>${convertRichTextToHtml(block.code.rich_text)}</code></pre>`
          case 'image':
            const imageUrl = block.image.external?.url || block.image.file?.url
            if (imageUrl) {
              // Proxy Notion images through our API to avoid expiring URLs
              const proxiedUrl = imageUrl.includes('notion.so') || imageUrl.includes('amazonaws.com')
                ? `/api/notion-image?url=${encodeURIComponent(imageUrl)}`
                : imageUrl
              return `<img src="${proxiedUrl}" alt="Blog image" class="w-full h-auto rounded-lg" />`
            }
            return ''
          default:
            return ''
        }
      })
      .join('')

    return {
      ...blogPost,
      content,
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

// Get all slugs for static generation (now using page IDs)
export async function getAllSlugs(): Promise<string[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'PublishedDate',
          direction: 'descending',
        },
      ],
    })

    return response.results
      .filter((page): page is PageObjectResponse => page.object === 'page')
      .map((page) => page.id) // Use page ID as slug
  } catch (error) {
    console.error('Error fetching slugs:', error)
    return []
  }
} 