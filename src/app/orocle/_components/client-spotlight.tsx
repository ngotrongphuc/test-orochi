'use client'
import { Button } from '@/components/ui/button'
import {
  clientCardBg,
  clientSpotlightAvt,
  clientSpotlightAvt2,
} from '@/images/orocle'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'

const ClientSpotlight = () => {
  return (
    <section className='mx-auto max-w-[1440px] overflow-x-hidden px-2 py-10 lg:h-auto md:px-6 lg:py-20'>
      <div className='flex flex-col gap-6 lg:mx-13 lg:gap-10'>
        <div className='flex flex-col gap-4 px-2 lg:gap-6 lg:px-0'>
          <h4 className='text-23 font-semibold text-neutral-800 lg:text-35'>
            Client Spotlight
          </h4>
          <span className='text-16 font-normal text-neutral-600 lg:text-18'>
            Experience The Best Decentralized Oracle Service
          </span>
        </div>
        <Slides />
      </div>
    </section>
  )
}

export default ClientSpotlight

const Slides = () => {
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
    <div>
      <AnimatePresence mode='popLayout' custom={direction}>
        {slides.map(
          (slide, index) =>
            index === activeIndex && (
              <motion.div
                custom={direction}
                variants={slideVariant}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{ duration: 0.6 }}
                className='flex w-full flex-col gap-4 lg:flex-row'
                key={slide.name}
              >
                <div
                  style={{
                    backgroundImage: `url(${clientCardBg.default.src})`,
                  }}
                  className='min-h-75 rounded-24 border border-blue-100 lg:h-100 lg:w-full lg:rounded-40'
                >
                  <div className='h-full w-full bg-gradient-to-b from-white via-tint-white-70 to-transparent p-6 lg:p-16'>
                    <p className='text-16 font-normal text-neutral-800 lg:text-18'>
                      {slide.content}
                    </p>
                  </div>
                </div>

                <div className='flex flex-col items-center gap-6 rounded-24 bg-blue-100 p-4 lg:rounded-40 lg:p-10'>
                  <div className='size-20 overflow-hidden rounded-full lg:size-32'>
                    <Image
                      loading='lazy'
                      className='size-full object-cover'
                      src={slide.avt}
                      alt='client-avt'
                    width={0}
                    height={0}
                    sizes='100%'
                    />
                  </div>
                  <div className='flex flex-col items-center justify-center gap-2'>
                    <p className='text-18 font-semibold text-neutral-800 lg:text-23'>
                      {slide.name}
                    </p>
                    <p className='text-center text-14 font-normal text-neutral-600 lg:text-18'>
                      {slide.desc}
                    </p>
                  </div>
                  {slides.length > 1 && (
                    <div className='mt-auto flex items-center justify-center gap-2'>
                      <Button
                        aria-label='Previous slide'
                        intent='white'
                        iconOnly
                        disabled={activeIndex === 0}
                        icon={<ArrowLeft size={16} className='text-red-500' />}
                        className='size-12 rounded-lg'
                        onClick={() => handleSlide('prev')}
                      />
                      <Button
                        aria-label='Next slide'
                        intent='white'
                        iconOnly
                        disabled={activeIndex === totalSlide - 1}
                        icon={<ArrowRight size={16} className='text-red-500' />}
                        className='size-12 rounded-lg'
                        onClick={() => handleSlide('next')}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ),
        )}
      </AnimatePresence>
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
    content:
      '“Orochi has been with us from the start, providing crucial support and expertise to build our gaming ecosystem. Working with their skilled team has been a privilege, and together, we\'re creating top-notch gaming infrastructure for Ancient8. Proud to have Orochi as a key partner!”',
    name: 'Zane',
    desc: 'Core contributor of Ancient8',
    avt: clientSpotlightAvt.default.src,
  },
  {
    content:
      '"The Orochi Network team have been really great to collaborate and partner with. We appreciate that they operate in good faith and we are thankful that they deployed their data feeds onto Zircuit! We highly recommend working with the Orochi team!"',
    name: 'Josh',
    desc: 'Ecosystem Director of Zircuit',
    avt: clientSpotlightAvt2.default.src,
  },
]
