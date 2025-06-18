import { getDatabase, getTitle, getRichText, getDate, getMultiSelect, getSelect, getPeople, getFiles, getStatus } from '@/lib/notion-simple'
import Link from 'next/link'
import { format } from 'date-fns'
import { useLanguage } from '@/contexts/LanguageContext'
import { Media } from '@/components/Media'
import { unstable_cache } from 'next/cache'

// Add ISR support - regenerate every 60 seconds
export const revalidate = 60

// Cache the blog posts with a tag for revalidation
const getCachedPosts = unstable_cache(
  async () => {
    try {
      const notionPosts = await getDatabase()
      return notionPosts.map((post: any) => {
        const properties = post.properties
        
        // Get the text content from the Text property
        const textContent = getRichText(properties.Text) || ''
        
        // Create excerpt from text content (first 150 characters)
        const excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '')
        
        // Get images from the files property
        const images = getFiles(properties.images)
        const firstImageFromFiles = images.length > 0 ? images[0] : null
        
        return {
          id: post.id,
          title: getTitle(properties.Title),
          excerpt: excerpt || 'No content available',
          content: textContent, // Full text content
          date: getDate(properties.PublishedDate),
          image: firstImageFromFiles || '/images/blog/workshop.jpg',
          images: images, // All media files
          category: getSelect(properties.Category) || 'General',
          author: getPeople(properties.Author).join(', ') || 'Unknown',
          tags: getMultiSelect(properties.Tags),
          status: getStatus(properties.Status),
        }
      })
    } catch (error) {
      console.error('Error fetching posts:', error)
      return []
    }
  },
  ['blog-simple-posts'],
  {
    tags: ['blog-posts'],
    revalidate: 60
  }
)

export default async function BlogSimplePage() {
  const posts = await getCachedPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center text-teal hover:text-teal-dark font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Blog & Vlog</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our latest coffee adventures, brewing tips, and behind-the-scenes content
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No posts yet</h2>
            <p className="text-gray-600 mb-8">Check back soon for our latest content!</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-yellow-800 mb-2">Setup Required</h3>
              <p className="text-yellow-700 text-sm mb-4">
                To see blog posts, you need to:
              </p>
              <ol className="list-decimal list-inside text-yellow-700 text-sm space-y-1">
                <li>Add your NOTION_DATABASE_ID to .env.local</li>
                <li>Share your database with your integration</li>
                <li>Set Status to "Published" for your posts</li>
                <li>Create some blog posts in Notion</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post: any) => {
              const title = post.title
              const description = post.excerpt
              const coverImage = post.image
              const category = post.category
              const tags = post.tags
              const author = post.author
              const publishedDate = post.date
              const status = post.status

              return (
                <Link href={`/blog-simple/${post.id}`} key={post.id}>
                  <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow bg-white">
                    {coverImage && (
                      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                        <Media
                          src={coverImage}
                          alt={title}
                          className="w-full h-full"
                          fit="cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      {category && (
                        <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                          {category}
                        </span>
                      )}
                      {status && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {status}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">
                      {title}
                    </h2>
                    <p className="text-gray-600 mb-3 line-clamp-3">
                      {description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <time>{format(new Date(publishedDate), 'MMM dd, yyyy')}</time>
                        {author && (
                          <span>by {author}</span>
                        )}
                      </div>
                      {tags.length > 0 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {tags[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
} 