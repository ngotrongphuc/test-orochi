'use client'
import React, { FC, useEffect, useRef, useState } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/lib/utils'
import Image from 'next/image'

type VideoPlayerProps = {
  stepsData: {
    title: string
    description: string
  }[]
  video: string
  videoSteps: number[]
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
  stepsData,
  video,
  videoSteps,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()
  const stepRef = useRef<Array<HTMLDivElement | null>>([])

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const onRestart = () => {
    setActiveIndex(0)
    stepRef.current.forEach((step) => {
      if (step) {
        step.style.setProperty('--percent', '0%')
      }
    })
  }

  const onEnd = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    onRestart()
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
    const step2Time = videoSteps[1]
    const step3Time = videoSteps[2]
    const step4Time = videoSteps[3]

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      if (!videoRef.current) {
        return
      }
      if (stepRef.current[0] && stepRef.current[1] && stepRef.current[2]) {
        const currentTime = videoRef.current.currentTime

        const calPercent = (curTime: number, timeLength: number) => {
          const percent = (curTime / timeLength) * 100
          return percent.toFixed(2) + '%'
        }

        if (currentTime <= step2Time) {
          if (activeIndex !== 0) {
            setActiveIndex(0)
          }
          stepRef.current[0].style.setProperty(
            '--percent',
            calPercent(currentTime, step2Time),
          )
        }
        if (currentTime > step2Time && currentTime <= step3Time) {
          if (activeIndex !== 1) {
            setActiveIndex(1)
          }
          stepRef.current[1].style.setProperty(
            '--percent',
            calPercent(currentTime - step2Time, step3Time - step2Time),
          )
        }
        if (currentTime > step3Time && currentTime <= step4Time) {
          if (activeIndex !== 2) {
            setActiveIndex(2)
          }
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
      onPlay()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  return (
    <div
      // className="container grid max-w-[1389px] gap-10 rounded-2xl border border-blue-200 bg-blue-200 py-28 lg:gap-20 lg:py-32"
      ref={containerRef}
    >
      <div className='relative mt-4 flex justify-center container-fluid'>
        <video
          ref={videoRef}
          muted
          autoPlay
          playsInline
          src={video}
          className='top-[4%] h-[93%] w-full rounded-2xl border bg-black md:left-5 lg:w-[97%]'
          onPlay={onPlay}
          onEnded={() => onEnd()}
        />
      </div>
      {/* video step */}
      <div className='mt-10 flex w-full flex-col justify-between gap-2 container-fluid md:flex-row'>
        {stepsData.map((step, index) => (
          <div
            data-active={index <= activeIndex ? true : false}
            key={index}
            ref={(el) => {
              stepRef.current[index] = el
            }}
            style={{ '--percent': '0%' } as React.CSSProperties}
            className={cn(
              'group relative flex cursor-pointer items-center gap-2 not-last:pb-10 md:w-35 md:flex-col md:not-last:pb-0 lg:w-58',
              'data-[progress="mobile"]:[&_hr]:not-last:h-[calc(50%-12px)]',
              'data-[progress="desktop"]:[&_hr]:not-last:w-[95%] lg:data-[progress="desktop"]:[&_hr]:not-last:w-[80%] xl:data-[progress="desktop"]:[&_hr]:not-last:w-[95%]',
            )}
            onClick={() => {
              setActiveIndex(index)
              if (videoRef.current) {
                videoRef.current.currentTime = videoSteps[index]
              }
            }}
          >
            <hr
              data-progress='desktop'
              className={cn(
                'absolute hidden border-none md:block',
                'left-[calc(50%+32px)] top-6 h-[2px]',
                'bg-[linear-gradient(to_right,#FD4A35_var(--percent),#E4E4E7_0%)]',
              )}
            />
            <hr
              data-progress='mobile'
              className={cn(
                'absolute border-none md:hidden',
                'bottom-0 left-5.75 w-[2px]',
                'bg-[linear-gradient(to_bottom,#FD4A35_var(--percent),#E4E4E7_0%)]',
              )}
            />

            <span
              className={cn(
                'relative flex flex-shrink-0 items-center justify-center',
                'size-12 rounded-full border border-[#E4E4E7] bg-white text-23 font-medium',
                'duration-300 group-data-[active=true]:bg-red-500 group-data-[active=true]:text-white',
              )}
            >
              {index + 1}
            </span>
            <div
              className={cn(
                'flex flex-col justify-start md:gap-2',
                index === 0 && 'mt-6 md:mt-0',
              )}
            >
              <p
                className={cn(
                  'text-14 font-semibold leading-6 text-neutral-600 group-data-[active=true]:text-red-500 md:text-center md:text-16',
                  index < activeIndex &&
                    'group-data-[active=true]:text-red-100',
                )}
              >
                {step.title}
              </p>
              <p className='text-16 leading-6 text-neutral-600 md:text-center'>
                {step.description
                  .split('\n')
                  .map((line: string, index: number) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
