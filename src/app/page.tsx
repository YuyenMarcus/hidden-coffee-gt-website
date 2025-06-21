import Image from 'next/image'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { BlogHome } from '@/components/BlogHome'
import { Menu } from '@/components/Menu'
import { Instagram } from '@/components/Instagram'
import { Footer } from '@/components/Footer'
import ClickSpark from '@/components/ClickSpark'

export default function Home() {
  console.log('🏠 Home page is being rendered')
  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Menu />
        <Instagram />
        <BlogHome />
        <Footer />
      </main>
    </ClickSpark>
  )
} 