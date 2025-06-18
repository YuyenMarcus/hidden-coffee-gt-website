'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'

export function Vibes() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.vibes-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.vibes-text',
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="py-24 bg-gray-50"
    >
      <div className="container">
        <motion.div
          style={{ opacity, y }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="section-label">THE VIBES</span>
          <p className="vibes-text text-xl md:text-2xl text-gray-600 leading-relaxed">
            Unmatched vibes, great coffee, and a vibrant space that's all about community and creativity.
            Come experience the perfect blend of comfort and energy at Hidden Coffee GT.
          </p>
        </motion.div>
      </div>
    </section>
  )
} 