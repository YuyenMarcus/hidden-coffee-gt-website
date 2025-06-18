import { NextResponse } from 'next/server'
import { getDatabase, getTitle, getRichText, getDate, getMultiSelect, getStatus, getPeople, getFiles, getSelect } from '@/lib/notion-simple'

export async function GET() {
  try {
    console.log('🔍 API: Starting blog posts fetch...')
    const notionPosts = await getDatabase()
    console.log('🔍 API: Notion posts received:', notionPosts.length)
    
    if (notionPosts && notionPosts.length > 0) {
      console.log('🔍 API: Processing', notionPosts.length, 'posts from Notion')
      const formattedPosts = notionPosts.map((post: any) => {
        const properties = post.properties
        console.log('🔍 API: Processing post:', getTitle(properties.Title))
        
        // Get the text content from the Text property
        const textContent = getRichText(properties.Text) || ''
        
        // Create excerpt from text content (first 150 characters)
        const excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '')
        
        // Get images from the files property
        const images = getFiles(properties.images)
        const firstImageFromFiles = images.length > 0 ? images[0] : null
        
        const formattedPost = {
          id: post.id,
          title: getTitle(properties.Title),
          excerpt: excerpt || 'No content available',
          content: textContent, // Full text content
          date: getDate(properties.PublishedDate),
          image: firstImageFromFiles || '/images/blog/workshop.jpg',
          images: images, // All media files
          category: getSelect(properties.Category) || 'General',
          author: getPeople(properties.Author).join(', ') || 'Unknown',
          tags: getMultiSelect(properties.Tags),
          status: getStatus(properties.Status),
        }
        
        console.log('🔍 API: Formatted post:', formattedPost.title)
        return formattedPost
      })
      
      console.log('🔍 API: Returning', formattedPosts.length, 'formatted posts')
      return NextResponse.json(formattedPosts)
    } else {
      console.log('🔍 API: No posts found in Notion')
      return NextResponse.json([])
    }
  } catch (error: any) {
    console.error('❌ API: Error fetching blog posts:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
} 