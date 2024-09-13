'use client'

import { useRef, useState, useEffect } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/lib/utils'
import Image from 'next/image'

const VIDEO_URL = 'https://orochi-storage.sgp1.cdn.digitaloceanspaces.com/video/orand-dashboard.mp4'

export default function HowToWork() {
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
    <section
      ref={containerRef}
      className='container grid gap-10 py-28 lg:gap-20 lg:py-32'
    >
      <div className='mx-auto max-w-[928px]'>
        <h2 className='text-center text-28 font-semibold md:text-35 lg:text-55'>
          How does Orand work?
        </h2>
        <p className='mt-6 text-center text-14 text-neutral-700 md:text-18'>
          Orand was built based on Elliptic Curve Verifiable Random Function
          (ECVRF). It is deterministic, verifiable and secured based on
          assumptions from elliptic curves.
        </p>
      </div>

      <div className='relative container-fluid'>
        <Image
          loading='lazy'
          src='/images/orand/laptop.webp'
          alt='laptop'
          className='h-auto w-full'
          width={0}
          height={0}
          sizes='100%'
        />

        <video
          ref={videoRef}
          muted
          src={VIDEO_URL}
          className='absolute left-[12.2%] top-[7.5%] h-[78%] w-[76.5%] bg-black'
          onPlay={onPlay}
          onEnded={() => {
            intervalRef.current && clearInterval(intervalRef.current)
            setActiveIndex(3)
          }}
        />
      </div>

      <div className='flex w-full flex-col justify-between gap-2 container-fluid lg:flex-row'>
        {steps.map((step, index) => (
          <div
            data-active={index <= activeIndex ? true : false}
            key={index}
            ref={(el) => {stepRef.current[index] = el}}
            style={{ '--percent': '0%' } as React.CSSProperties}
            className={cn(
              'group relative flex cursor-pointer items-center gap-2 not-last:pb-10 lg:w-50 lg:flex-col lg:not-last:pb-0',
              'data-[progress="mobile"]:[&_hr]:not-last:h-[calc(50%-12px)] data-[progress="desktop"]:[&_hr]:not-last:w-[116%]',
            )}
            onClick={() => {
              setActiveIndex(index)
              if (videoRef.current) {
                videoRef.current.currentTime = [0, 14, 36, 45][index]
              }
            }}
          >
            <hr
              data-progress='desktop'
              className={cn(
                'absolute hidden border-none lg:block',
                'left-[calc(50%+32px)] top-6 h-[2px]',
                'bg-[linear-gradient(to_right,#FD4A35_var(--percent),#E4E4E7_0%)]',
              )}
            />
            <hr
              data-progress='mobile'
              className={cn(
                'absolute border-none lg:hidden',
                'bottom-0 left-5.75 w-[2px]',
                'bg-[linear-gradient(to_bottom,#FD4A35_var(--percent),#E4E4E7_0%)]',
              )}
            />

            <span
              className={cn(
                'relative flex flex-shrink-0 items-center justify-center',
                'size-12 rounded-full border border-red-500 bg-white text-23 font-medium',
                'duration-300 group-data-[active=true]:bg-red-500 group-data-[active=true]:text-white',
              )}
            >
              {index + 1}
            </span>
            <p className="text-18 text-neutral-700 lg:text-center">{step}</p>
          </div>
        ))}
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
