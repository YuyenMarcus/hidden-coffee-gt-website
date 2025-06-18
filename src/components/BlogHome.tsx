'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Media } from './Media'

export function BlogHome() {
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        if (response.ok) {
          const posts = await response.json()
          setBlogPosts(posts)
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="section-heading">Blog & News</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto px-4">
            Discover our latest coffee adventures, brewing tips, and behind-the-scenes content
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
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
            {blogPosts.map((post, index) => (
              <article
                key={post.id || index}
                className="blog-item bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Media
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full"
                    fit="cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-teal text-white text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <time className="text-sm text-gray-500">{post.date}</time>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mt-2 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">{post.excerpt}</p>
                  <Link
                    href={`/blog-simple/${post.id}/`}
                    className="inline-flex items-center text-teal hover:text-teal-dark font-medium"
                  >
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
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
} 