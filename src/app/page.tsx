import Image from 'next/image'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Menu } from '@/components/Menu'
import { Instagram } from '@/components/Instagram'
import { Footer } from '@/components/Footer'
import ClickSpark from '@/components/ClickSpark'

export default function Home() {
  console.log('🏠 Home page is being rendered')
  return (
    <ClickSpark
      sparkColor='#0d9488'
      sparkSize={15}
      sparkRadius={25}
      sparkCount={12}
      duration={600}
    >
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Menu />
        <Instagram />
        <Footer />
      </main>
    </ClickSpark>
  )
} 