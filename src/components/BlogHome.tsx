import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/notion'
import { format } from 'date-fns'
import { unstable_cache } from 'next/cache'

// Cache the blog posts with a tag for revalidation
const getCachedBlogPosts = unstable_cache(
  async () => {
    return await getAllBlogPosts()
  },
  ['blog-posts-home'],
  {
    tags: ['blog-posts'],
    revalidate: 60
  }
)

export async function BlogHome() {
  const posts = await getCachedBlogPosts()

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="section-heading">Blog & News</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto px-4">
            Discover our latest coffee adventures, brewing tips, and behind-the-scenes content
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">No blog posts available</h3>
            <p className="text-gray-600 mb-8 px-4">Check back soon for our latest content!</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 md:p-6 max-w-2xl mx-auto mx-4">
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
          <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.slice(0, 3).map((post) => (
              <article
                key={post.id}
                className="blog-item bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No image</span>
                      </div>
                    )}
                    {post.videoUrl && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Video
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <time className="text-sm text-gray-500">
                        {format(new Date(post.publishedDate), 'MMM dd, yyyy')}
                      </time>
                      {post.tags.length > 0 && (
                        <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                          {post.tags[0]}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mt-2 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center text-teal-600 font-medium">
                      Read More
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
        
        {posts.length > 3 && (
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-teal text-white font-medium rounded-lg hover:bg-teal-dark transition-colors"
            >
              View All Posts
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
} 