import { Client } from '@notionhq/client'

const notion = new Client({ 
  auth: process.env.NOTION_TOKEN 
})

export async function getDatabase() {
  try {
    console.log('🔍 getDatabase: Starting database query...')
    console.log('🔍 getDatabase: Database ID:', process.env.NOTION_DATABASE_ID)
    console.log('🔍 getDatabase: Token exists:', !!process.env.NOTION_TOKEN)
    
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      sorts: [
        {
          property: 'PublishedDate',
          direction: 'descending',
        },
      ],
    })

    console.log('🔍 getDatabase: Response received, results count:', response.results.length)
    
    // Check if first result is a page and has properties
    const firstResult = response.results[0]
    if (firstResult && 'properties' in firstResult) {
      console.log('🔍 getDatabase: First result properties:', Object.keys(firstResult.properties))
    } else {
      console.log('🔍 getDatabase: First result is not a page or has no properties')
    }
    
    return response.results
  } catch (error: any) {
    console.error('❌ getDatabase: Error fetching database:', error)
    console.error('❌ getDatabase: Error details:', {
      message: error?.message,
      code: error?.code,
      status: error?.status
    })
    return []
  }
}

export async function getPage(id: string) {
  try {
    const response = await notion.pages.retrieve({ page_id: id })
    return response
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

export async function getPageContent(pageId: string) {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    })
    return response.results
  } catch (error) {
    console.error('Error fetching page content:', error)
    return []
  }
}

// Helper function to safely get property value
function getPropertyValue(property: any, type: string): any {
  if (!property || property.type !== type) return null
  return property[type]
}

// Helper function to get title from property
export function getTitle(property: any): string {
  const titleArray = getPropertyValue(property, 'title')
  return titleArray?.[0]?.plain_text || 'Untitled'
}

// Helper function to get rich text from property
export function getRichText(property: any): string {
  const richTextArray = getPropertyValue(property, 'rich_text')
  if (!richTextArray || richTextArray.length === 0) return ''
  
  // Concatenate all text elements
  return richTextArray.map((text: any) => text.plain_text).join('')
}

// Helper function to get URL from property
export function getUrl(property: any): string {
  return getPropertyValue(property, 'url') || ''
}

// Helper function to get date from property
export function getDate(property: any): string {
  const dateObj = getPropertyValue(property, 'date')
  return dateObj?.start || new Date().toISOString()
}

// Helper function to get multi-select from property
export function getMultiSelect(property: any): string[] {
  const multiSelectArray = getPropertyValue(property, 'multi_select')
  return multiSelectArray?.map((item: any) => item.name) || []
}

// Helper function to get select from property
export function getSelect(property: any): string {
  const selectObj = getPropertyValue(property, 'select')
  return selectObj?.name || ''
}

// Helper function to get status from property
export function getStatus(property: any): string {
  const statusObj = getPropertyValue(property, 'status')
  return statusObj?.name || ''
}

// Helper function to get checkbox from property
export function getCheckbox(property: any): boolean {
  return getPropertyValue(property, 'checkbox') || false
}

// Helper function to get people from property
export function getPeople(property: any): string[] {
  const peopleArray = getPropertyValue(property, 'people')
  return peopleArray?.map((person: any) => person.name) || []
}

// Helper function to get files from property
export function getFiles(property: any): string[] {
  const filesArray = getPropertyValue(property, 'files')
  return filesArray?.map((file: any) => file.external?.url || file.file?.url).filter(Boolean) || []
}

// Helper function to detect if a file is a video
export function isVideo(url: string): boolean {
  const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.webm', '.mkv', '.m4v']
  const videoDomains = ['youtube.com', 'youtu.be', 'vimeo.com', 'dailymotion.com', 'cloudinary.com']
  
  const lowerUrl = url.toLowerCase()
  
  // Check for video file extensions
  if (videoExtensions.some(ext => lowerUrl.includes(ext))) {
    return true
  }
  
  // Check for video hosting domains
  if (videoDomains.some(domain => lowerUrl.includes(domain))) {
    return true
  }
  
  // Check for Google Drive video links (but these are unreliable for embedding)
  if (lowerUrl.includes('drive.google.com') && lowerUrl.includes('/file/')) {
    console.warn('⚠️ Google Drive links may not work properly for video embedding. Consider using YouTube or Vimeo instead.')
    return true
  }
  
  return false
}

// Helper function to get YouTube video ID from URL
export function getYouTubeVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

// Helper function to get Vimeo video ID from URL
export function getVimeoVideoId(url: string): string | null {
  const regex = /(?:vimeo\.com\/)(\d+)/
  const match = url.match(regex)
  return match ? match[1] : null
} 