'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { useLanguage } from '@/contexts/LanguageContext'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { translations } = useLanguage()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-heading', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      })

      gsap.from('.hero-tagline', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power4.out',
      })

      gsap.from('.hero-image-wrapper', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.6,
        ease: 'power4.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-32 md:pt-48 pb-20 overflow-hidden"
    >
      <div className="container max-w-[1600px] relative z-10 px-4">
        <motion.div
          style={{ y, opacity }}
          className="max-w-3xl mx-auto text-center mb-8 md:mb-16"
        >
          <h1 className="hero-heading font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6">
            Hidden Coffee GT
          </h1>
          <p className="hero-tagline text-lg sm:text-xl md:text-2xl text-gray-600 px-4">
            {translations.hero.tagline}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 lg:gap-24 mb-8 md:mb-16">
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, y: 100, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Image
              src="/images/hero/hero-1.jpg"
              alt="Coffee shop interior"
              width={475}
              height={712}
              className="hero-image w-full h-[300px] sm:h-[400px] md:h-[475px] object-cover"
              priority
            />
          </motion.div>
          <motion.div 
            className="hero-image-wrapper-right"
            initial={{ opacity: 0, y: 100, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Image
              src="/images/hero/hero-2.jpg"
              alt="Barista preparing coffee"
              width={475}
              height={712}
              className="hero-image w-full h-[300px] sm:h-[400px] md:h-[475px] object-cover"
              priority
            />
          </motion.div>
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, y: 100, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Image
              src="/images/hero/hero-3.jpg"
              alt="Coffee and pastries"
              width={475}
              height={712}
              className="hero-image w-full h-[300px] sm:h-[400px] md:h-[475px] object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Scroll Down Arrow */}
        <div className="absolute -bottom-20 left-0 right-0 z-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-gray-600 mb-2">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-6 h-6 text-teal"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Logo and Info */}
        <div className="mt-8 md:mt-[12rem]">
          <div className="container max-w-[1600px]">
            <div className="flex flex-col md:flex-row justify-between items-center px-4 space-y-6 md:space-y-0">
              {/* Location */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center order-2 md:order-1"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {translations.hero.findUs}
                </h3>
                <p className="text-gray-600">
                  Calle Monterrey
                  <br />
                  Panajachel, Guatemala
                </p>
              </motion.div>

              <Image
                src="/logo.svg"
                alt="Hidden Coffee GT Logo"
                width={600}
                height={160}
                className="w-auto h-24 sm:h-32 md:h-40 lg:h-64 order-1 md:order-2"
                priority
              />

              {/* Hours */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center order-3"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {translations.hero.hours}
                </h3>
                <p className="text-gray-600">
                  8:30 AM - 8:00 PM
                  <br />
                  {translations.hero.daily}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 