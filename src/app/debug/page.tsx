'use client'

import { useEffect, useState } from 'react'

export default function DebugPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const runTests = async () => {
      try {
        console.log('🧪 Running Notion connection tests...')
        
        // Test 1: Basic API endpoint
        const testResponse = await fetch('/api/test-notion')
        const testData = await testResponse.json()
        
        setTestResult({
          timestamp: new Date().toISOString(),
          testResponse: testData,
          success: testData.success
        })
      } catch (error) {
        setTestResult({
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error',
          success: false
        })
      } finally {
        setLoading(false)
      }
    }

    runTests()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🔍 Debug Page</h1>
        
        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal"></div>
            <p className="mt-4">Running tests...</p>
            </div>
          ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Notion Connection Test</h2>
            
            {testResult?.success ? (
            <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-green-800 font-semibold">✅ Connection Successful</h3>
                  <p className="text-green-700">Found {testResult.testResponse.postCount} posts</p>
                </div>
                
                {testResult.testResponse.posts && testResult.testResponse.posts.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">📝 Posts Found:</h3>
                    <div className="space-y-2">
                      {testResult.testResponse.posts.map((post: any, index: number) => (
                        <div key={index} className="bg-gray-50 p-3 rounded">
                          <p><strong>Title:</strong> {post.title}</p>
                          <p><strong>Status:</strong> {post.status}</p>
                          <p><strong>Date:</strong> {post.publishedDate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-red-800 font-semibold">❌ Connection Failed</h3>
                <p className="text-red-700">{testResult?.error || 'Unknown error'}</p>
                
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">🔧 Troubleshooting Steps:</h4>
                  <ol className="list-decimal list-inside text-yellow-700 space-y-1 text-sm">
                    <li>Check Vercel environment variables (NOTION_TOKEN, NOTION_DATABASE_ID)</li>
                    <li>Verify Notion integration has access to your database</li>
                    <li>Make sure posts have "Published" status</li>
                    <li>Check that your database has the correct properties</li>
                  </ol>
                </div>
            </div>
          )}
            
            <div className="mt-6 text-sm text-gray-500">
              <p><strong>Test Time:</strong> {testResult?.timestamp}</p>
        </div>
          </div>
        )}
      </div>
    </div>
  )
} 