'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Media } from './Media'
import { getDatabase } from '@/lib/notion-simple'

export function Blog() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { translations } = useLanguage()
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  console.log('📝 Blog component is being rendered')

  const fetchBlogPosts = async () => {
    try {
      console.log('📝 Fetching blog posts...')
      setLoading(true)
      
      // Try API first, fallback to direct Notion fetch
      let notionPosts = []
      
      try {
        const response = await fetch('/api/blog')
        if (response.ok) {
          notionPosts = await response.json()
          console.log('📝 API response received:', notionPosts)
        } else {
          throw new Error('API not available')
        }
      } catch (apiError) {
        console.log('📝 API not available, trying direct Notion fetch...')
        // Fallback to direct Notion fetch for static export
        try {
          notionPosts = await getDatabase()
          console.log('📝 Direct Notion response received:', notionPosts)
        } catch (directError) {
          console.error('❌ Both API and direct fetch failed:', directError)
          notionPosts = []
        }
      }
      
      if (notionPosts && notionPosts.length > 0) {
        console.log('📝 Setting', notionPosts.length, 'posts')
        setBlogPosts(notionPosts)
        setLastUpdated(new Date())
      } else {
        console.log('📝 No posts found')
        setBlogPosts([])
      }
    } catch (error) {
      console.error('❌ Error fetching blog posts:', error)
      setBlogPosts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogPosts()
    
    // Set up auto-refresh every 5 minutes (300,000 ms)
    const interval = setInterval(() => {
      console.log('📝 Auto-refreshing blog posts...')
      fetchBlogPosts()
    }, 5 * 60 * 1000) // 5 minutes
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Temporarily disable GSAP animations for debugging
    /*
    const ctx = gsap.context(() => {
      gsap.from('.blog-item', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.blog-grid',
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      })
    }, containerRef)

    return () => ctx.revert()
    */
  }, [])

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="section-heading">{translations.blog.title}</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto px-4">
            {translations.blog.description}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={fetchBlogPosts}
              disabled={loading}
              className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Posts
                </>
              )}
            </button>
            {lastUpdated && (
              <span className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
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
                    {translations.menu.readMore}
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