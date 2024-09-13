'use client'

import { useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import CustomEase from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Intro() {
  const diceRef = useRef<Array<HTMLImageElement | null>>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  const calRangeX = (diceStart: Element | null, diceEnd: Element | null) => {
    if (!diceStart || !diceEnd) return 0
    return (
      (diceEnd.getBoundingClientRect().left -
        diceStart.getBoundingClientRect().left) *
      -1
    )
  }

  const calRangeY = (dice: Element | null, container: Element | null) => {
    if (!container || !dice) return 0
    return (
      container.getBoundingClientRect().top -
      dice.getBoundingClientRect().top +
      56
    )
  }

  const getRangeDice = () => {
    const dice1El = document.getElementById('dice1Rect')
    const dice2El = document.getElementById('dice2Rect')
    const dice3El = document.getElementById('dice3Rect')
    const dice4El = document.getElementById('dice4Rect')

    const dice1 = {
      x: 0,
      y: calRangeY(dice1El, containerRef.current),
    }
    const dice2 = {
      x: calRangeX(dice2El, diceRef.current[1]),
      y: calRangeY(dice2El, containerRef.current),
    }
    const dice3 = {
      x: calRangeX(dice3El, diceRef.current[2]),
      y: calRangeY(dice3El, containerRef.current),
    }
    const dice4 = {
      x: calRangeX(dice4El, diceRef.current[3]),
      y: calRangeY(dice4El, containerRef.current),
    }

    return [dice1, dice2, dice3, dice4]
  }

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(CustomEase)
    const mm = gsap.matchMedia()
    CustomEase.create('diceEase', '.66,-0.3,.47,1.3')

    const [dice1, dice2, dice3, dice4] = getRangeDice()

    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top+=400',
          endTrigger: '#intro',
          end: 'top+=360',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        diceRef.current[0],
        { y: `-${dice1.y}`, rotate: -112, scale: 1.35 },
        { y: -56, rotate: 0, scale: 1, duration: 2, ease: 'diceEase' },
        0,
      )
      tl.fromTo(
        diceRef.current[1],
        { x: dice2.x, y: `-${dice2.y}`, rotate: 152.3, scale: 0.69 },
        { x: 0, y: -56, rotate: 0, scale: 1, duration: 2, ease: 'diceEase' },
        0,
      )
      tl.fromTo(
        diceRef.current[2],
        { x: dice3.x, y: `-${dice3.y}`, rotate: 107.07 },
        { x: 0, y: -56, rotate: 0, duration: 2, ease: 'diceEase' },
        0,
      )
      tl.fromTo(
        diceRef.current[3],
        { x: dice4.x, y: `-${dice4.y}`, scale: 0.92, rotate: 169.65 },
        { x: 0, y: -56, rotate: 0, scale: 1, duration: 2, ease: 'diceEase' },
        0,
      )
    })

    mm.add('(max-width: 1023px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: diceRef.current, start: 'top-=400' },
      })
      tl.from(diceRef.current, {
        y: 0,
        opacity: 0,
        duration: 1,
        ease: 'diceEase',
      })
    })
  })

  return (
    <section id='intro' className='container py-32 lg:pt-44'>
      <h2 className='text-center text-28 font-semibold md:text-35 lg:text-69'>
        Build with Confidence
      </h2>
      <p className='mt-6 text-center text-23 md:text-28 lg:text-35'>
        Unlock a New Level of Fairness for Your Smart Contract
      </p>

      <div
        ref={containerRef}
        className={cn(
          'mt-22 container-fluid',
          'grid gap-4 md:grid-cols-2 lg:grid-cols-4',
        )}
      >
        {topData.map((data, i) => (
          <IntroCardWithDice key={i} title={data.title} content={data.content}>
            <Image
              ref={(el) => {diceRef.current[i] = el}}
              loading='lazy'
              src={`/images/orand/dice${i + 1}.png`}
              alt='dice'
              className='pointer-events-none absolute left-0 top-0 size-32 -translate-y-14 object-contain'
              width={0}
              height={0}
              sizes='100%'
            />
          </IntroCardWithDice>
        ))}

        {bottomData.map((data, i) => (
          <IntroCard key={i} title={data.title} content={data.content} />
        ))}
      </div>
    </section>
  )
}

function IntroCardWithDice({
  title,
  content,
  children,
}: {
  title: string
  content: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-24 border border-blue-tint-50 bg-white px-6 pb-8 pt-24',
        'relative grid grid-rows-[54px_auto] gap-6',
      )}
    >
      {children}
      <h3 className='line-clamp-2 text-23 font-semibold'>{title}</h3>
      <p className='text-18 text-neutral-600'>{content}</p>
    </div>
  )
}

function IntroCard({ title, content }: { title: string; content: string }) {
  return (
    <div
      className={cn(
        'rounded-24 border border-blue-tint-50 bg-white px-6 py-8',
        'grid grid-rows-[54px_auto] gap-6',
      )}
    >
      <h3 className='line-clamp-2 text-23 font-semibold'>{title}</h3>
      <p className='text-18 text-neutral-600'>{content}</p>
    </div>
  )
}

const topData = [
  {
    title: 'Security',
    content: 'ECVRF technology guarantees unmanipulable randomness',
  },
  {
    title: 'Blazing-Fast Performance',
    content: 'Enjoy top-tier throughput on any blockchain, EVM or non-EVM',
  },
  {
    title: 'Verifiable',
    content: `Provides cryptographic proofs to ensure the random output's integrity and correctness`,
  },
  {
    title: 'Tailored Solutions',
    content:
      'Offer flexibility in proof submission, generating valid ECVRF proof for you to submit at your discretion',
  },
]
const bottomData = [
  {
    title: 'Flexible Submission',
    content: 'Choose between Self-Submission or Delegated',
  },
  {
    title: 'Batching Power',
    content:
      'Reduce costs significantly by batching randomness within an epoch',
  },
  {
    title: 'Cost-Effective Options',
    content: 'Our flexible plans let you optimize costs based on your needs',
  },
  {
    title: 'Dedicated Support',
    content: 'Our team is here 24/7 to ensure your success',
  },
]
