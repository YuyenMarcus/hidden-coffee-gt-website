import Image from 'next/image'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { BlogHome } from '@/components/BlogHome'
import { Menu } from '@/components/Menu'
import { Instagram } from '@/components/Instagram'
import { Footer } from '@/components/Footer'

export default function Home() {
  console.log('🏠 Home page is being rendered')
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BlogHome />
      <Menu />
      <Instagram />
      <Footer />
    </main>
  )
} 