import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/notion-simple'

export async function GET() {
  try {
    console.log('🧪 Testing Notion connection...')
    
    const posts = await getDatabase()
    
    console.log('✅ Notion connection successful')
    console.log('📊 Found posts:', posts.length)
    
    if (posts.length > 0) {
      const firstPost = posts[0] as any
      console.log('📝 First post title:', firstPost.properties?.Title?.title?.[0]?.plain_text || 'No title')
    }
    
    return NextResponse.json({
      success: true,
      message: 'Notion connection successful',
      postCount: posts.length,
      posts: posts.map((post: any) => ({
        id: post.id,
        title: post.properties?.Title?.title?.[0]?.plain_text || 'No title',
        status: post.properties?.Status?.status?.name || 'No status',
        publishedDate: post.properties?.PublishedDate?.date?.start || 'No date'
      })),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Notion connection failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 