'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export function Contact() {
  const cupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cupRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center md:text-left">
            <h2 className="contact-heading font-serif text-2xl font-bold text-gray-900 mb-6">
              FIND US
            </h2>
            <address className="not-italic text-gray-600 space-y-2">
              <p>123 Main St</p>
              <p>Panajachel, Guatemala</p>
              <p className="mt-4">
                <a
                  href="tel:+50255555555"
                  className="hover:text-teal transition-colors"
                >
                  (502) 555-5555
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@hiddencoffeegt.com"
                  className="hover:text-teal transition-colors"
                >
                  hello@hiddencoffeegt.com
                </a>
              </p>
            </address>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              ref={cupRef}
              className="w-48 h-48 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-teal"
                fill="currentColor"
              >
                <path d="M30,20 L70,20 L75,30 L80,80 L20,80 L25,30 Z" />
                <path
                  d="M35,85 L65,85 L65,90 C65,92.5 62.5,95 60,95 L40,95 C37.5,95 35,92.5 35,90 Z"
                  fill="currentColor"
                  opacity="0.5"
                />
                <path
                  d="M40,20 L40,10 C40,5 45,0 50,0 C55,0 60,5 60,10 L60,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M30,40 C30,35 35,30 40,30 L60,30 C65,30 70,35 70,40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </motion.div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="contact-heading font-serif text-2xl font-bold text-gray-900 mb-6">
              OUR HOURS
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>Monday: CLOSED</p>
              <p>Tuesday - Friday: 11 AM – 10 PM</p>
              <p>Saturday - Sunday: 12 PM – 7 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 