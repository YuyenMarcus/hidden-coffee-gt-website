export default function ForceDeployPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">
          🚀 FORCE DEPLOY TEST
        </h1>
        <p className="text-2xl mb-8">
          If you can see this page, Vercel auto-deploy is working!
        </p>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
          <p className="text-lg">
            ✅ Deployment successful at {new Date().toLocaleString()}
          </p>
          <p className="text-sm mt-2">
            This page was created to test Vercel auto-deployment
          </p>
        </div>
      </div>
    </div>
  )
} 