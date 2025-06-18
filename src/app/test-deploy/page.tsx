export default function TestDeployPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 Vercel Auto-Deploy Test
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          If you can see this page, Vercel auto-deploy is working!
        </p>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          ✅ Deployment successful at {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  )
} 