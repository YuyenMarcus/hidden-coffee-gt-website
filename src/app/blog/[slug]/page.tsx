import { getBlogPostBySlug, getAllSlugs } from '@/lib/notion'
import { BlogPost } from '@/types/blog'
import Image from 'next/image'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'

// Add ISR support - regenerate every 60 seconds
export const revalidate = 60

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Extract video ID from YouTube or Vimeo URL
  const getVideoEmbedUrl = (url: string) => {
    if (!url) return null

    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }

    return null
  }

  const videoEmbedUrl = getVideoEmbedUrl(post.videoUrl)

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <a
                href="/blog"
                className="text-teal-600 hover:text-teal-700 font-medium flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Blog
              </a>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <div className="flex items-center justify-between mb-8">
              <time className="text-lg text-gray-600">
                {format(new Date(post.publishedDate), 'MMMM dd, yyyy')}
              </time>
              {post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="text-xl text-gray-600 leading-relaxed">
              {post.description}
            </p>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Video */}
        {videoEmbedUrl && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={videoEmbedUrl}
                title={post.title}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        )}

        {/* Content */}
        {post.content && (
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <a
              href="/blog"
              className="text-teal-600 hover:text-teal-700 font-medium flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </a>
            <div className="text-sm text-gray-500">
              Published on {format(new Date(post.publishedDate), 'MMMM dd, yyyy')}
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found - Hidden Coffee GT',
    }
  }

  return {
    title: `${post.title} - Hidden Coffee GT`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
} 