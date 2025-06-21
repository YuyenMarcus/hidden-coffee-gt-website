'use client'

import Image from 'next/image'
import { isVideo, getYouTubeVideoId, getVimeoVideoId } from '@/lib/notion-simple'

interface MediaProps {
  src: string
  alt?: string
  className?: string
  width?: number
  height?: number
  fit?: 'cover' | 'contain'
}

// Helper function to get Google Drive direct download link
function getGoogleDriveDirectLink(url: string): string {
  // Convert Google Drive sharing link to direct download
  const fileId = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1]
  if (fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`
  }
  return url
}

export function Media({ src, alt = '', className = '', width, height, fit = 'contain' }: MediaProps) {
  if (!src) return null

  // Check if it's a video
  if (isVideo(src)) {
    // YouTube video
    const youtubeId = getYouTubeVideoId(src)
    if (youtubeId) {
      return (
        <div className={`relative ${className}`}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={alt || 'YouTube video'}
            className="w-full h-full rounded-lg"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )
    }

    // Vimeo video
    const vimeoId = getVimeoVideoId(src)
    if (vimeoId) {
      return (
        <div className={`relative ${className}`}>
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}`}
            title={alt || 'Vimeo video'}
            className="w-full h-full rounded-lg"
            allowFullScreen
          />
        </div>
      )
    }

    // Google Drive video (unreliable, show warning)
    if (src.includes('drive.google.com')) {
      // Try to extract file ID and create embed URL
      const fileId = src.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1]
      
      if (fileId) {
        // Create Google Drive embed URL
        const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`
        
        return (
          <div className={`relative ${className}`}>
            <iframe
              src={embedUrl}
              title={alt || 'Google Drive video'}
              className="w-full h-full rounded-lg"
              allowFullScreen
              allow="autoplay"
            />
          </div>
        )
      } else {
        // Fallback to warning if we can't extract file ID
        return (
          <div className={`relative ${className}`}>
            <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
              <div className="text-center p-4">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-sm text-gray-600 mb-2">Invalid Google Drive URL</p>
                <p className="text-xs text-gray-500 mb-3">Make sure the URL contains the file ID</p>
                <a 
                  href={src} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open Video
                </a>
              </div>
            </div>
          </div>
        )
      }
    }

    // Direct video file
    return (
      <div className={`relative ${className}`}>
        <video
          controls
          className="w-full h-full rounded-lg object-cover"
          poster=""
        >
          <source src={src} type="video/mp4" />
          <source src={src} type="video/webm" />
          <source src={src} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  // Image
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill={!width || !height}
        width={width}
        height={height}
        className={`object-${fit} rounded-lg`}
        unoptimized={src.startsWith('whathttp')}
      />
    </div>
  )
} 