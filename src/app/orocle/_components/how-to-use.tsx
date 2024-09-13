'use client'

import { useRef, useState, useEffect } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/lib/utils'
import { laptopImg } from '@/images/orand'
import { bigBanner } from '@/images/orocle'
import Image from 'next/image'
import Link from 'next/link'
import { RAMenPaSTA_URL } from '@/configs/navigation'

export default function HowToUse() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()
  const stepRef = useRef<Array<HTMLDivElement | null>>([])

  const [activeIndex, setActiveIndex] = useState(0)

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top-=100',
      onEnter: playVideo,
      onLeave: pauseVideo,
      onEnterBack: playVideo,
    })
  })

  const onPlay = () => {
    const step2Time = 14
    const step3Time = 36
    const step4Time = 45

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      if (!videoRef.current) return
      if (stepRef.current[0] && stepRef.current[1] && stepRef.current[2]) {
        const currentTime = videoRef.current.currentTime

        const calPercent = (curTime: number, timeLength: number) => {
          const percent = (curTime / timeLength) * 100
          return percent.toFixed(2) + '%'
        }

        if (currentTime <= step2Time) {
          if (activeIndex !== 0) setActiveIndex(0)
          stepRef.current[0].style.setProperty(
            '--percent',
            calPercent(currentTime, step2Time),
          )
        }
        if (currentTime > step2Time && currentTime <= step3Time) {
          if (activeIndex !== 1) setActiveIndex(1)
          stepRef.current[1].style.setProperty(
            '--percent',
            calPercent(currentTime - step2Time, step3Time - step2Time),
          )
        }
        if (currentTime > step3Time && currentTime <= step4Time) {
          if (activeIndex !== 2) setActiveIndex(2)
          stepRef.current[2].style.setProperty(
            '--percent',
            calPercent(currentTime - step3Time, step4Time - step3Time),
          )
        }
      }
    }, 100)
  }

  useEffect(() => {
    if (activeIndex === 0) {
      stepRef.current[1]?.style.setProperty('--percent', '0%')
      stepRef.current[2]?.style.setProperty('--percent', '0%')
    }
    if (activeIndex === 1) {
      stepRef.current[0]?.style.setProperty('--percent', '100%')
      stepRef.current[2]?.style.setProperty('--percent', '0%')
    }
    if (activeIndex === 2) {
      stepRef.current[0]?.style.setProperty('--percent', '100%')
      stepRef.current[1]?.style.setProperty('--percent', '100%')
    }
    if (activeIndex === 3) {
      stepRef.current[0]?.style.setProperty('--percent', '100%')
      stepRef.current[1]?.style.setProperty('--percent', '100%')
      stepRef.current[2]?.style.setProperty('--percent', '100%')
    }
  }, [activeIndex])

  return (
    <section ref={containerRef} className='py-10 lining-nums lg:py-30'>
      <div className='flex flex-col gap-6 px-2 lg:gap-10 lg:px-6'>
        <div className='mx-auto max-w-[928px]'>
          <h2 className='text-center text-23 font-semibold text-neutral-800 md:text-35'>
            Orocle Dashboard: A User’s Guide
          </h2>
          <p className='mt-6 text-center text-14 text-neutral-600 md:text-18'>
            Sit dictum convallis amet sit consequat pharetra dictum sit. Fusce
            congue leo quis nam nunc non.
          </p>
        </div>
        {/* laptop img */}
        <div className='relative mx-auto max-h-[480px] max-w-[900px]'>
          <Image
            loading='lazy'
            src={laptopImg.default.src}
            alt='laptop'
            className='h-auto w-full'
            width={0}
            height={0}
            sizes='100%'
          />
        </div>
        {/* video */}

        {/* step section */}
        <div className='mx-auto flex w-full max-w-[920px] justify-between gap-2'>
          {steps.map((step, index) => (
            <div
              data-active={index <= activeIndex}
              key={step}
              ref={(el) => {
                stepRef.current[index] = el
              }}
              style={{ '--percent': '0%' } as React.CSSProperties}
              className={cn(
                'group relative flex w-full cursor-pointer flex-col items-center gap-2 not-last:pb-10 lg:not-last:pb-0',
                '[&_hr]:not-last:w-[65%] md:[&_hr]:not-last:w-[75%]',
              )}
              onClick={() => {
                setActiveIndex(index)
                if (videoRef.current) {
                  videoRef.current.currentTime = [0, 14, 36, 45][index]
                }
              }}
            >
              <hr
                className={cn(
                  'absolute border-none',
                  'left-1/2 top-3 ml-4 h-[2px] md:ml-6 lg:top-6 lg:ml-8',
                  'bg-[linear-gradient(to_right,#FD4A35_var(--percent),#E4E4E7_0%)]',
                  index < activeIndex && 'opacity-50',
                )}
              />

              <span
                className={cn(
                  'relative flex flex-shrink-0 items-center justify-center',
                  'size-6 rounded-full border border-neutral-400 bg-white text-16 font-medium lg:size-12 lg:text-23',
                  'duration-300 group-data-[active=true]:border-red-500 group-data-[active=true]:bg-red-500 group-data-[active=true]:text-white',
                  index < activeIndex &&
                    'group-data-[active=true]:border-red-100 group-data-[active=true]:bg-red-100',
                )}
              >
                {index + 1}
              </span>
              <p
                className={cn(
                  'text-center text-14 text-neutral-600 group-data-[active=true]:text-red-500 md:text-16',
                  index < activeIndex &&
                    'group-data-[active=true]:text-red-100',
                )}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  'Create subscription',
  'Top up',
  'Manage subscription',
  'Create new application',
]
