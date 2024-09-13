'use client'

import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/button'

import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

export default function ClientSpotlight() {
  return (
    <section className="container pb-32 md:pb-44">
      <div className="container-fluid">
        <h2 className="text-28 font-semibold md:text-35 lg:text-55">
          Testimonials
        </h2>
        <p className="mt-6 max-w-[704px] text-14 text-neutral-700 md:text-18">
          How Orand Revolutionizes Trustworthy Randomness
        </p>

        <Slides />
      </div>
    </section>
  )
}

function Slides() {
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlide = slides.length
  const [direction, setDirection] = useState<'prev' | 'next'>('next')

  const handleSlide = (direction: 'prev' | 'next') => {
    setDirection(direction)
    if (direction === 'prev') {
      setActiveIndex((prev) => (prev === 0 ? 0 : prev - 1))
    } else {
      setActiveIndex((prev) =>
        prev === totalSlide - 1 ? totalSlide - 1 : prev + 1,
      )
    }
  }

  return (
    <div className="relative mt-14 lg:mt-20">
      <AnimatePresence mode="popLayout" custom={direction}>
        {slides.map((slide, index) =>
          index === activeIndex ? (
            <motion.div
              custom={direction}
              variants={slideVariant}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6 }}
              className="grid gap-2 lg:h-[500px] lg:grid-cols-[1fr_300px]"
              key={index}
            >
              <div className="relative overflow-hidden rounded-24 p-8 lg:px-14 lg:py-10">
                <Image
                  loading="lazy"
                  src="/images/orand/bg-spotlight.webp"
                  alt="spotlight background"
                  className="absolute inset-0 size-full object-cover"
                  width={0}
                  height={0}
                  sizes='100%'
                />

                <p className="relative text-18 font-medium lg:text-28">
                  {slide.content}
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-24 bg-blue-100 p-8 pb-28 lg:items-start lg:gap-6 lg:p-10">
                <div className="size-20 overflow-hidden rounded-full lg:size-32">
                  <Image
                    loading="lazy"
                    className="size-full object-cover"
                    src={slide.avt}
                    alt="spotlight-avatar"
                    width={0}
                    height={0}
                    sizes='100%'
                  />
                </div>
                <p className="text-23 font-medium">{slide.name}</p>
                <p className="text-18 font-medium">{slide.desc}</p>
              </div>
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>

      {slides.length > 1 && (
        <div className="absolute bottom-10 right-1/2 flex translate-x-1/2 gap-2 lg:right-10 lg:translate-x-0">
          <Button
            aria-label="Previous slide"
            intent="white"
            iconOnly
            disabled={activeIndex === 0}
            icon={<ArrowLeft size={16} className="text-red-500" />}
            className="size-12 rounded-lg"
            onClick={() => handleSlide('prev')}
          />
          <Button
            aria-label="Next slide"
            intent="white"
            iconOnly
            disabled={activeIndex === totalSlide - 1}
            icon={<ArrowRight size={16} className="text-red-500" />}
            className="size-12 rounded-lg"
            onClick={() => handleSlide('next')}
          />
        </div>
      )}
    </div>
  )
}

const slideVariant = {
  center: { x: 0, opacity: 1, zIndex: 1 },
  enter: (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      return { x: 100, opacity: 0 }
    }
    return { x: -100, opacity: 0 }
  },
  exit: (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      return { x: -100, opacity: 0, zIndex: 0 }
    }
    return { x: 100, opacity: 0, zIndex: 0 }
  },
}

const slides = [
  {
    content: `Orochi has been with us from the start, providing crucial support and expertise to build our gaming ecosystem. Working with their skilled team has been a privilege, and together, we're creating top-notch gaming infrastructure for Ancient8. Proud to have Orochi as a key partner!`,
    name: 'Zane',
    desc: 'Core contributor of Ancient8 ',
    avt: '/images/orand/spotlight-avt-1.webp',
  },
  {
    content: `The Orochi Network team have been really great to collaborate and partner with. We appreciate that they operate in good faith and we are thankful that they deployed their data feeds onto Zircuit! We highly recommend working with the Orochi team!`,
    name: 'Josh',
    desc: 'Ecosystem Director of Zircuit',
    avt: '/images/orand/spotlight-avt-2.webp',
  },
]
