import { getDatabase } from '@/lib/notion-simple'

export default async function DebugPage() {
  const posts = await getDatabase()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug: Notion Database</h1>
        
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Database Response</h2>
          <p className="mb-4">Number of posts found: <strong>{posts.length}</strong></p>
          
          {posts.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">No posts found</h3>
              <p className="text-yellow-700 text-sm">
                This could mean:
              </p>
              <ul className="list-disc list-inside text-yellow-700 text-sm mt-2 space-y-1">
                <li>No posts with Status = "Published"</li>
                <li>Database not shared with integration</li>
                <li>Property names don't match</li>
                <li>No posts in database</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post: any, index: number) => (
                <div key={post.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Post {index + 1}</h3>
                  <div className="text-sm space-y-1">
                    <p><strong>ID:</strong> {post.id}</p>
                    <p><strong>Properties:</strong></p>
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                      {JSON.stringify(post.properties, null, 2)}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          <div className="space-y-2 text-sm">
            <p><strong>NOTION_TOKEN:</strong> {process.env.NOTION_TOKEN ? '✅ Set' : '❌ Missing'}</p>
            <p><strong>NOTION_DATABASE_ID:</strong> {process.env.NOTION_DATABASE_ID ? '✅ Set' : '❌ Missing'}</p>
            <p><strong>Database ID:</strong> {process.env.NOTION_DATABASE_ID}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 