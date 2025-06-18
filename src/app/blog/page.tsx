import { getAllBlogPosts } from '@/lib/notion'
import { BlogPost } from '@/types/blog'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { unstable_cache } from 'next/cache'

// Add ISR support - regenerate every 60 seconds
export const revalidate = 60

// Cache the blog posts with a tag for revalidation
const getCachedBlogPosts = unstable_cache(
  async () => {
    return await getAllBlogPosts()
  },
  ['blog-posts'],
  {
    tags: ['blog-posts'],
    revalidate: 60
  }
)

export default async function BlogPage() {
  const posts = await getCachedBlogPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Vlog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our latest coffee adventures, brewing tips, and behind-the-scenes content
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No posts yet</h2>
            <p className="text-gray-600">Check back soon for our latest content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
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
                  <div className="p-6">
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
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center text-teal-600 font-medium">
                      Read more
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
      </div>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'Blog & Vlog - Hidden Coffee GT',
    description: 'Discover our latest coffee adventures, brewing tips, and behind-the-scenes content',
  }
} 