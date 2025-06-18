'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

const menuItems = [
  {
    category: 'hot',
    items: [
      {
        name: 'Espresso',
        description: 'espresso_desc',
        price: 2.50,
        image: '/images/menu/espresso.jpg',
      },
      {
        name: 'Cappuccino',
        description: 'cappuccino_desc',
        price: 3.75,
        image: '/images/menu/cappuccino.jpg',
      },
      {
        name: 'Latte',
        description: 'latte_desc',
        price: 4.00,
        image: '/images/menu/latte.jpg',
      },
      {
        name: 'Mocha',
        description: 'mocha_desc',
        price: 4.50,
        image: '/images/menu/mocha.jpg',
      },
    ],
  },
  {
    category: 'cold',
    items: [
      {
        name: 'Iced Americano',
        description: 'iced_americano_desc',
        price: 3.00,
        image: '/images/menu/iced-americano.jpg',
      },
      {
        name: 'Cold Brew',
        description: 'cold_brew_desc',
        price: 3.00,
        image: '/images/menu/cold-brew.jpg',
      },
    ],
  },
]

export function Menu() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { translations } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.menu-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.menu-section',
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none none',
          markers: false,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden" ref={containerRef}>
      <div className="container max-w-[1600px] px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="section-heading">{translations.menu.title}</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto px-4">
            {translations.menu.description}
          </p>
        </div>

        <div className="menu-section space-y-12 md:space-y-16 relative">
          {menuItems.map((category) => (
            <div key={category.category} className="menu-category relative">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
                {translations.menu[category.category as keyof typeof translations.menu]}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto relative">
                {category.items.map((item) => (
                  <motion.div
                    key={item.name}
                    className="menu-item bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 relative"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="relative w-full md:w-40 h-48 md:h-40 rounded-2xl overflow-hidden mx-auto md:mx-0 border-2 border-teal flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4 md:p-6 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg md:text-xl font-semibold text-gray-900">
                            {item.name}
                          </h4>
                          <span className="text-teal font-medium text-lg">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-gray-600 flex-1 text-sm md:text-base">
                          {translations.menu[item.description as keyof typeof translations.menu]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 