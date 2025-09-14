'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2 md:py-4' : 'bg-transparent py-4 md:py-6'
    }`}>
      <div className="container flex items-center justify-between px-4">
        <Link href="/" className="relative z-50">
          <Image
            src="/logo.svg"
            alt="Hidden Coffee GT"
            width={300}
            height={80}
            className="h-12 md:h-20 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="relative z-50 px-4 py-2 rounded-full border-2 border-teal text-teal hover:bg-teal hover:text-white transition-colors duration-300 font-medium"
            aria-label="Toggle language"
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden relative z-50 p-2 rounded-lg border-2 border-teal text-teal hover:bg-teal hover:text-white transition-colors duration-300"
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:hidden">
            <div className="container px-4 py-4 space-y-4">
              <button
                onClick={() => {
                  toggleLanguage()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full px-4 py-3 rounded-lg border-2 border-teal text-teal hover:bg-teal hover:text-white transition-colors duration-300 font-medium"
              >
                {language === 'en' ? 'Español' : 'English'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 