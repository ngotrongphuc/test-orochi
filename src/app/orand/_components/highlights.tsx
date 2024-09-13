'use client'

import { useState, useEffect } from 'react'

import { motion, useSpring, useMotionValue } from 'framer-motion'

import { cn } from '@/lib/utils'
import Image from 'next/image'

type HighlightData = (typeof highlightData)[number]

export default function Highlights() {
  const [dataActive, setDataActive] = useState<HighlightData | null>(null)

  return (
    <section id="highlight" className="container relative">
      <div className="overflow-auto rounded-40 bg-blue-100 px-4 py-10 lg:py-20">
        <div className="mx-auto max-w-[928px]">
          <h2 className="text-center text-28 font-semibold md:text-35 lg:text-55">
            The Next Generation of Cryptographic Randomness
          </h2>
          <p className="mt-6 text-center text-14 text-neutral-700 md:text-18">
            Orand guarantee peak performance across all blockchains
          </p>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-6 container-fluid touch:hidden">
          {highlightData.map((item, index) => (
            <HighlightItem
              key={index}
              data={item}
              setDataActive={setDataActive}
            />
          ))}
        </div>

        <div className="mt-14 hidden gap-6 touch:grid md:grid-cols-2 lg:grid-cols-3">
          {highlightData.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              content={item.content}
              icon={item.icon}
            />
          ))}
        </div>
      </div>

      <ContentFollow data={dataActive} />
      <CursorFollow isHover={Boolean(dataActive)} />
    </section>
  )
}

function HighlightItem({
  data,
  setDataActive,
}: {
  data: HighlightData
  setDataActive: (data: HighlightData | null) => void
}) {
  return (
    <div
      className="rounded-full border border-blue-tint-50 bg-hero-radiant p-10"
      onMouseEnter={() => setDataActive(data)}
      onMouseLeave={() => setDataActive(null)}
    >
      <p className="select-none text-center text-23 font-medium">
        {data.title}
      </p>
    </div>
  )
}

function Card({
  title,
  content,
  icon,
}: {
  title: string
  content: string
  icon: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 overflow-hidden rounded-24',
        'px-6 pb-25 pt-6 touch:pb-6 lg:px-8',
        'border border-blue-tint-50 bg-white',
      )}
    >
      <Image
        loading="lazy"
        src={`/images/orand/highlights/${icon}`}
        alt="highlight icon"
        className="size-22 object-cover lg:size-32"
        width={0}
        height={0}
        sizes='100%'
      />
      <h3 className="text-23 font-semibold lg:text-35">{title}</h3>
      <p className="text-14 text-neutral-600 lg:text-18">{content}</p>
    </div>
  )
}

function ContentFollow({ data }: { data: HighlightData | null }) {
  const [prevData, setPrevData] = useState<HighlightData>(highlightData[0])

  const isHover = Boolean(data)

  const mouse = {
    x: useMotionValue(-400),
    y: useMotionValue(-400),
  }

  const cardSize = 400
  const smoothOptions = { damping: 30, stiffness: 300, mass: 0.1 }

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  }

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    mouse.x.set(clientX - cardSize / 2)
    mouse.y.set(clientY - cardSize / 2)
  }

  useEffect(() => {
    const highlight = document.getElementById('highlight')
    if (!highlight) return

    highlight.addEventListener('mousemove', manageMouseMove)

    return () => {
      highlight.removeEventListener('mousemove', manageMouseMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data) {
      setPrevData(data)
    }
  }, [data])

  return (
    <motion.div
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
      transition={{ duration: 0.3 }}
      animate={{
        opacity: isHover ? 1 : 0,
        scale: isHover ? 1 : 0,
      }}
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-cursor w-100 touch:hidden',
      )}
    >
      <Card
        title={prevData.title}
        content={prevData.content}
        icon={prevData.icon}
      />
    </motion.div>
  )
}

function CursorFollow({ isHover }: { isHover: boolean }) {
  const [isInSection, setIsInSection] = useState(false)

  const mouse = {
    x: useMotionValue(-128),
    y: useMotionValue(-128),
  }

  const cardSize = 128
  const smoothOptions = { damping: 30, stiffness: 300, mass: 0.1 }

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  }

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    mouse.x.set(clientX - cardSize / 2)
    mouse.y.set(clientY - cardSize / 2)
  }

  useEffect(() => {
    const highlight = document.getElementById('highlight')
    if (!highlight) return

    highlight.addEventListener('mousemove', manageMouseMove)
    highlight.addEventListener('mouseenter', () => setIsInSection(true))
    highlight.addEventListener('mouseleave', () => setIsInSection(false))

    return () => {
      highlight.removeEventListener('mousemove', manageMouseMove)
      highlight.removeEventListener('mouseenter', () => setIsInSection(false))
      highlight.removeEventListener('mouseleave', () => setIsInSection(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
      transition={{ duration: 0.3 }}
      animate={{
        opacity: !isHover && isInSection ? 1 : 0,
        scale: !isHover && isInSection ? 1 : 0,
      }}
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-cursor w-32 overflow-hidden rounded-full border border-blue-tint-20 bg-white touch:hidden',
      )}
    >
      <p className="flex aspect-square items-center justify-center px-4 text-center text-14 font-medium">
        Hover on a feature to learn more
      </p>
    </motion.div>
  )
}

const highlightData = [
  {
    icon: 'unpredictability.png',
    title: 'Unpredictability',
    content:
      'Empower your apps and products to reach full potential with our commitment to fairness and a positive user experience',
  },
  {
    icon: 'built-to-adapt.png',
    title: 'Built to Adapt',
    content:
      'Seamlessly adapt and optimize based on your usage, offering flexible functionality tailored to your needs',
  },
  {
    icon: 'economical.png',
    title: 'Economical',
    content:
      'Boosting app capacity, cutting costs, ensuring worry-free development and optimization for your projects',
  },
  {
    icon: 'secure-verifiable.png',
    title: 'Secure & Verifiable',
    content: `Your users are fully secure while they enjoy the app's utilities to the fullest extent possible`,
  },
  {
    icon: 'tamper-proof.png',
    title: 'Tamper-Proof',
    content:
      'Deliver unparalleled on-chain gaming, ensuring fairness and preventing gacha manipulation',
  },
  {
    icon: 'batching.png',
    title: 'Batching',
    content:
      'Batch up to 100 randomness entries per epoch, reducing costs significantly without compromising efficiency',
  },
  {
    icon: 'high-throughput.png',
    title: 'High throughput',
    content:
      'Drastically enhance finality times for optimal on-chain gaming performance, ensuring seamless experiences',
  },
  {
    icon: 'multi-chain.png',
    title: 'Multi-chain',
    content:
      'Easily adaptable to users, enabling scalable dApps in any environment for seamless integration and optimization',
  },
]
