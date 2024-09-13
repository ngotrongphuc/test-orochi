'use client'

import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { Play, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

const VIDEO_URL = 'https://orochi-storage.sgp1.cdn.digitaloceanspaces.com/video/product-orand-video.mp4'

export default function Hero() {
  return (
    <section id="hero" data-anim="hero" className="container pb-6 pt-4">
      <div className="relative overflow-hidden rounded-24 bg-hero-radiant px-6 pt-20">
        <div className="flex flex-col items-center">
          <h1 className="text-44 font-medium text-neutral-800 md:text-69">
            Orand
          </h1>
          <p className="mt-5 text-center text-28 text-neutral-700 md:text-44">
            Your Trustless Source of Randomness
          </p>

          <div className="mt-14 flex flex-wrap gap-4">
            <Button
              asLink
              href="https://docs.orochi.network/orochi-network/orand-v2.html"
              intent="white"
              target="_blank"
              className="flex w-full justify-center md:w-auto"
            >
              GET YOUR TESTNET
            </Button>
            <Button
              asLink
              href="https://dashboard.orochi.network/home"
              icon={<ArrowRight size={16} />}
              target="_blank"
              className="w-full justify-center md:w-auto"
            >
              START BUILDING
            </Button>
          </div>
        </div>

        <PhotoView />
        <Pattern />
        <DicePosition />
      </div>
    </section>
  )
}

function PhotoView() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const onPlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  return (
    <div
      className={cn(
        'mg:h-[397px] relative mx-auto mt-14 h-50 max-w-[1024px] overflow-hidden rounded-t-24 bg-border sm:h-[280px]',
      )}
    >
      <video
        ref={videoRef}
        src={VIDEO_URL}
        className="relative"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {!isPlaying ? (
        <div className="absolute inset-0 flex size-full items-center justify-center bg-overlay">
          <Button
            aria-label="Play video"
            intent="white"
            iconOnly
            icon={<Play size={16} className="text-neutral-800" weight="fill" />}
            className="size-14"
            onClick={onPlay}
          />
        </div>
      ) : null}
    </div>
  )
}

function Pattern() {
  return (
    <>
      <Image
        loading="lazy"
        className="absolute left-0 top-0 h-20 w-auto"
        src="/images/pattern/banner-left.png"
        alt="banner-left"
        width={0}
        height={0}
        sizes='100%'
      />
      <Image
        loading="lazy"
        className="absolute bottom-0 right-0 hidden h-20 w-auto rotate-180 2xl:block"
        src="/images/pattern/banner-left.png"
        alt="banner-left"
        width={0}
        height={0}
        sizes='100%'
      />

      <Image
        loading="lazy"
        className="absolute right-0 top-0 h-20 w-auto -scale-x-100"
        src="/images/pattern/banner-left.png"
        alt="banner-left"
        width={0}
        height={0}
        sizes='100%'
      />
      <Image
        loading="lazy"
        className="absolute bottom-0 left-0 hidden h-20 w-auto rotate-180 -scale-x-100 2xl:block"
        src="/images/pattern/banner-left.png"
        alt="banner-left"
        width={0}
        height={0}
        sizes='100%'
      />
    </>
  )
}

function DicePosition() {
  return (
    <>
      <div id="dice1Rect" className="sr-only absolute left-20 top-[380px]" />
      <div id="dice2Rect" className="sr-only absolute bottom-0 left-[310px]" />
      <div
        id="dice3Rect"
        className="sr-only absolute right-[282px] top-[95px]"
      />
      <div
        id="dice4Rect"
        className="sr-only absolute bottom-[100px] right-[268px]"
      />
    </>
  )
}
