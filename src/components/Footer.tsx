'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export function Footer() {
  const { translations } = useLanguage()

  return (
    <footer className="bg-gray-50 py-12 md:py-16">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          {/* Hours */}
          <div className="text-center">
            <h3 className="font-serif text-lg font-bold text-gray-900 mb-3 md:mb-4">
              {translations.footer.hours}
            </h3>
            <div className="space-y-1 md:space-y-2 text-gray-600">
              <p>8:30 am - 8:00 pm</p>
              <p>{translations.hero.daily}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h3 className="font-serif text-lg font-bold text-gray-900 mb-3 md:mb-4">
              {translations.footer.contact}
            </h3>
            <div className="space-y-1 md:space-y-2 text-gray-600">
              <p>
                <a
                  href="mailto:hiddencoffeeGT@nuvio.cloud"
                  className="hover:text-teal transition-colors break-all"
                >
                  hiddencoffeeGT@nuvio.cloud
                </a>
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="text-center">
            <h3 className="font-serif text-lg font-bold text-gray-900 mb-3 md:mb-4">
              {translations.footer.location}
            </h3>
            <div className="space-y-1 md:space-y-2 text-gray-600">
              <p>Calle Monterrey</p>
              <p>Panajachel, Guatemala</p>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>
            {translations.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  )
} 