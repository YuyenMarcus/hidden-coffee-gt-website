'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

const instagramPosts = [
  {
    image: '/images/instagram/post-1.jpg',
    link: 'https://instagram.com/p/1',
  },
  {
    image: '/images/instagram/post-2.jpg',
    link: 'https://instagram.com/p/2',
  },
  {
    image: '/images/instagram/post-3.jpg',
    link: 'https://instagram.com/p/3',
  },
  {
    image: '/images/instagram/post-4.jpg',
    link: 'https://instagram.com/p/4',
  },
  {
    image: '/images/instagram/post-5.jpg',
    link: 'https://instagram.com/p/5',
  },
  {
    image: '/images/instagram/post-6.jpg',
    link: 'https://instagram.com/p/6',
  },
]

export function Instagram() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { translations } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.instagram-item', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.instagram-grid',
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container max-w-[1800px] px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="section-heading">{translations.instagram.title}</h2>
          <a
            href="https://instagram.com/hidden_coffee_gt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 bg-teal/10 text-teal hover:bg-teal/20 transition-colors text-lg font-medium rounded-full"
          >
            @hidden_coffee_gt
          </a>
        </div>

        <div className="instagram-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-item relative aspect-square overflow-hidden rounded-lg group"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={post.image}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
} 