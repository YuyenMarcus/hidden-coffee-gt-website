import { getDatabase, getPage, getTitle, getRichText, getDate, getMultiSelect, getPeople, getFiles, getSelect } from '@/lib/notion-simple'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Media } from '@/components/Media'
import { MediaGallery } from '@/components/MediaGallery'

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default async function BlogPostSimplePage({ params }: BlogPostPageProps) {
  let page
  let pageObject
  let properties

  try {
    page = await getPage(params.id)
    
    if (!page || page.object !== 'page') {
      notFound()
    }

    pageObject = page as PageObjectResponse
    properties = pageObject.properties as Record<string, any>
  } catch (error) {
    console.error('Error fetching page:', error)
    notFound()
  }

  const title = getTitle(properties.Title)
  const description = getRichText(properties.Description)
  const textContent = getRichText(properties.Text) || ''
  const images = getFiles(properties.images)
  const coverImage = images.length > 0 ? images[0] : null
  const publishedDate = getDate(properties.PublishedDate)
  const tags = getMultiSelect(properties.Tags)
  const author = getPeople(properties.Author).join(', ')

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
            <h1 className="text-2xl font-bold text-gray-900">Blog/News</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link
              href="/blog-simple/"
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
              Back to Blog/News
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center justify-between mb-8">
            <time className="text-lg text-gray-600">
              {format(new Date(publishedDate), 'MMMM dd, yyyy')}
            </time>
            {tags.length > 0 && (
              <div className="flex gap-2">
                {tags.map((tag: string) => (
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

          {/* Author */}
          {author && (
            <div className="mb-6">
              <p className="text-gray-600">
                <span className="font-medium">By:</span> {author}
              </p>
            </div>
          )}

          {/* Cover Media - Show gallery if multiple, single if one */}
          {images.length > 0 && (
            <div className="mb-8">
              {images.length === 1 ? (
                <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden">
                  <Media
                    src={images[0]}
                    alt={title}
                    className="w-full h-full"
                    fit="contain"
                  />
                </div>
              ) : (
                <MediaGallery
                  images={images}
                  title={title}
                  className="mb-8"
                />
              )}
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="mb-8">
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                {description}
              </p>
            </div>
          )}

          {/* Full Blog Content */}
          {textContent && (
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {textContent}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Link
                href="/blog-simple/"
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
                Back to Blog/News
              </Link>
              <div className="text-sm text-gray-500">
                Published on {format(new Date(publishedDate), 'MMMM dd, yyyy')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 