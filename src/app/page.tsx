import Image from 'next/image'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Blog } from '@/components/Blog'
import { Menu } from '@/components/Menu'
import { Instagram } from '@/components/Instagram'
import { Footer } from '@/components/Footer'

export default async function Home() {
  console.log('🏠 Home page is being rendered')
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Blog />
      <Menu />
      <Instagram />
      <Footer />
    </main>
  )
} 