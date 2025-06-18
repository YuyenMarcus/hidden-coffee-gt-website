'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [isRevalidating, setIsRevalidating] = useState(false)
  const [message, setMessage] = useState('')

  const handleRevalidate = async () => {
    setIsRevalidating(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/revalidate', {
        method: 'GET',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage('✅ Blog content revalidated successfully! New posts should appear within 60 seconds.')
      } else {
        setMessage(`❌ Error: ${data.error || 'Failed to revalidate'}`)
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsRevalidating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog Admin</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Manual Revalidation</h2>
              <p className="text-blue-700 text-sm mb-4">
                Click the button below to manually refresh your blog content from Notion. 
                This will fetch the latest posts and update your website.
              </p>
              
              <button
                onClick={handleRevalidate}
                disabled={isRevalidating}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {isRevalidating ? '🔄 Revalidating...' : '🔄 Refresh Blog Content'}
              </button>
            </div>

            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('✅') 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {message}
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-yellow-900 mb-2">How It Works</h2>
              <ul className="text-yellow-800 text-sm space-y-2">
                <li>• Your blog uses Incremental Static Regeneration (ISR)</li>
                <li>• Pages automatically refresh every 60 seconds</li>
                <li>• Manual revalidation forces an immediate update</li>
                <li>• New posts from Notion will appear automatically</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Links</h2>
              <div className="space-y-2">
                <a 
                  href="/blog-simple" 
                  className="block text-blue-600 hover:text-blue-800 transition-colors"
                >
                  → View Blog & News Page
                </a>
                <a 
                  href="/api/revalidate" 
                  className="block text-blue-600 hover:text-blue-800 transition-colors"
                >
                  → Direct Revalidation API
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 