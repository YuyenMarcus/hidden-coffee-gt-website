'use client'

import { useState } from 'react'
import { Media } from './Media'
import { isVideo } from '@/lib/notion-simple'

interface MediaGalleryProps {
  images: string[]
  title?: string
  className?: string
}

export function MediaGallery({ images, title, className = '' }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) return null

  const selectedMedia = images[selectedIndex]

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Media Display */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
        <Media
          src={selectedMedia}
          alt={title || `Media ${selectedIndex + 1}`}
          className="w-full h-full"
        />
        
        {/* Navigation arrows for multiple items */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
              aria-label="Previous media"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
              aria-label="Next media"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 relative aspect-video w-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? 'border-teal-500 ring-2 ring-teal-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Media
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full"
              />
              {/* Video indicator */}
              {isVideo(image) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Media counter */}
      {images.length > 1 && (
        <div className="text-center text-sm text-gray-500">
          {selectedIndex + 1} of {images.length}
        </div>
      )}
    </div>
  )
} 