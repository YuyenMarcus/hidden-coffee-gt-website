import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Hidden Coffee GT | Panajachel, Guatemala',
  description: 'The place where bold coffee meets good vibes. Visit us in Panajachel, Guatemala for an unforgettable coffee experience.',
  keywords: 'coffee shop, Panajachel, Guatemala, Hidden Coffee GT, specialty coffee, cafe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
} 