import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  coverImage: string
  videoUrl: string
  publishedDate: string
  tags: string[]
  content: string
}

// Helper type to safely access Notion properties
export type NotionProperty = {
  type: string
  [key: string]: any
}

// Helper function to safely get property value
export function getPropertyValue(property: NotionProperty, type: string): any {
  if (property.type !== type) return null
  return property[type]
}

// Helper function to get title from Notion property
export function getTitle(property: NotionProperty): string {
  const titleArray = getPropertyValue(property, 'title')
  return titleArray?.[0]?.plain_text || ''
}

// Helper function to get rich text from Notion property
export function getRichText(property: NotionProperty): string {
  const richTextArray = getPropertyValue(property, 'rich_text')
  return richTextArray?.[0]?.plain_text || ''
}

// Helper function to get URL from Notion property
export function getUrl(property: NotionProperty): string {
  return getPropertyValue(property, 'url') || ''
}

// Helper function to get date from Notion property
export function getDate(property: NotionProperty): string {
  const dateObj = getPropertyValue(property, 'date')
  return dateObj?.start || new Date().toISOString()
}

// Helper function to get multi-select from Notion property
export function getMultiSelect(property: NotionProperty): string[] {
  const multiSelectArray = getPropertyValue(property, 'multi_select')
  return multiSelectArray?.map((item: any) => item.name) || []
}

export interface NotionPage {
  id: string
  properties: {
    Title: {
      title: Array<{
        plain_text: string
      }>
    }
    Description: {
      rich_text: Array<{
        plain_text: string
      }>
    }
    CoverImage: {
      url: string
    }
    VideoURL: {
      url: string
    }
    PublishedDate: {
      date: {
        start: string
      }
    }
    Tags: {
      multi_select: Array<{
        name: string
      }>
    }
    Slug: {
      rich_text: Array<{
        plain_text: string
      }>
    }
  }
  content?: any[]
}

export interface NotionDatabaseResponse {
  results: NotionPage[]
  has_more: boolean
  next_cursor?: string
} 