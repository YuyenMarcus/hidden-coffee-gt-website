import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  
  if (!url) {
    return NextResponse.json({ error: 'Missing image URL' }, { status: 400 })
  }

  try {
    // Fetch the image from Notion
    const imageRes = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Notion-Image-Proxy/1.0)'
      }
    })
    
    if (!imageRes.ok) {
      console.error('Failed to fetch image from Notion:', url, imageRes.status)
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 })
    }

    // Get the image data
    const arrayBuffer = await imageRes.arrayBuffer()
    const contentType = imageRes.headers.get('content-type') || 'image/jpeg'
    
    // Cache the image for 1 hour
    const response = new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Access-Control-Allow-Origin': '*'
      }
    })

    return response
  } catch (error) {
    console.error('Error proxying Notion image:', error)
    return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 })
  }
} 