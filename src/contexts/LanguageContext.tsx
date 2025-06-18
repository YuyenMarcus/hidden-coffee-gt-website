'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import enTranslations from '@/locales/en.json'
import esTranslations from '@/locales/es.json'

type Translations = typeof enTranslations

interface LanguageContextType {
  language: string
  translations: Translations
  setLanguage: (lang: string) => void
}

const translations = {
  en: enTranslations,
  es: esTranslations,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [language, setLanguageState] = useState('en')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Get language from localStorage or default to 'en'
    const storedLang = localStorage.getItem('language') || 'en'
    setLanguageState(storedLang)
  }, [])

  const setLanguage = (lang: string) => {
    if (!isClient) return // Don't update if we're not on the client side
    
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    
    // Use a more reliable way to update the URL without a full page refresh
    const url = new URL(window.location.href)
    url.searchParams.set('lang', lang)
    window.history.pushState({}, '', url.toString())
  }

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        translations: translations[language as keyof typeof translations],
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 