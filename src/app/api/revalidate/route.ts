import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verify the request is from Notion (you can add more security later)
    const notionSignature = request.headers.get('x-notion-signature')
    
    console.log('🔄 Revalidation webhook triggered:', body)
    
    // Revalidate the blog pages
    revalidatePath('/blog-simple')
    revalidateTag('blog-posts')
    
    // Also revalidate individual blog post pages
    if (body.page && body.page.id) {
      revalidatePath(`/blog-simple/${body.page.id}`)
    }
    
    console.log('✅ Pages revalidated successfully')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Pages revalidated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Revalidation error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
}

// Also allow GET requests for manual revalidation
export async function GET() {
  try {
    console.log('🔄 Manual revalidation triggered')
    
    // Revalidate all blog-related paths and tags
    revalidatePath('/blog-simple')
    revalidatePath('/admin')
    revalidateTag('blog-posts')
    
    // Force revalidation of all dynamic routes
    revalidatePath('/blog-simple/[id]')
    
    console.log('✅ Manual revalidation completed')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Manual revalidation completed',
      timestamp: new Date().toISOString(),
      revalidatedPaths: ['/blog-simple', '/admin'],
      revalidatedTags: ['blog-posts']
    })
  } catch (error) {
    console.error('❌ Manual revalidation error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
} 