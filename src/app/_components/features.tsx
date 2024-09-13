'use client'

import { useRef, useState } from 'react'

import * as Tabs from '@radix-ui/react-tabs'
import { motion, AnimatePresence } from 'framer-motion'
import scrollIntoView from 'scroll-into-view-if-needed'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

const items = [
  {
    title: 'Orocle',
    subtitle: 'A Blockchain-Agnostic Solution',
    description:
      'Orochi\'s oracle empowers Web 3 applications with diverse, real-time data, decentralized trust, scalability, and compatibility with various blockchain networks.',
    backgroundImage: 'feat-orocle-bg.webp',
    href: 'https://docs.orochi.network/orochi-network/orocle-v2.html',
  },
  {
    title: 'Orand',
    subtitle: 'Your Trustless Source of Randomness',
    description:
      'Orand was built based on Elliptic Curve Verifiable Random Function (ECVRF). It is deterministic, verifiable and secured based on assumptions from elliptic curves.',
    backgroundImage: 'feat-orand-bg.webp',
    href: 'https://docs.orochi.network/orochi-network/orand-v3.html',
  },
  {
    title: 'Orosign',
    subtitle: 'The Leading Provider of Self-custody Mobile Wallet',
    description:
      'Orosign offers distinctive multisig feature, give you greater control of your digital assets and identity. With MPC, an extra layer of security is added, delivering unparalleled protection for your valuable assets.',
    backgroundImage: 'feat-orosign-bg.webp',
    href: '',
  },
  {
    title: 'zkDatabase',
    subtitle: 'The First Provable Database for Web3',
    description:
      'zkDatabase is a distributed off-chain database with ZK prover available for any smart contract platforms, dApps and zkApps.',
    backgroundImage: 'feat-zkdatabase-bg.webp',
    href: 'https://docs.orochi.network/zkdatabase/chapter.html',
  },
  {
    title: 'zkMemory',
    subtitle: 'A generic module that proves the memory consistency',
    description:
      'zkMemory is a memory prover module wrote purely in Rust that provides utilities to generalized the memory and power any zkVMs.',
    backgroundImage: 'feat-zkmemory-bg.webp',
    href: 'https://github.com/orochi-network/orochimaru/tree/main/zkmemory',
  },
]

const DURATION = 0.4

const variants = {
  default: { y: 0, x: 0, opacity: 1, rotate: 0, scale: 1 },
  enter: (direction: 'left' | 'right') => {
    if (direction === 'right') {
      return { y: 40, opacity: 0, scale: 0.96 }
    }
    return { y: 50, x: -300, opacity: 0, rotate: -8 }
  },
  exit: (direction: 'left' | 'right') => {
    if (direction === 'right') {
      return { y: 50, x: -300, opacity: 0, rotate: -8 }
    }
    return { y: 40, opacity: 0, scale: 0.96 }
  },
}

const overlayVariants = [
  {
    enter: { opacity: 1, y: 80, scale: 0.92 },
    exit: { opacity: 0, y: 120, scale: 0.88 },
  },
  {
    enter: { y: 40, scale: 0.96, backgroundColor: 'hsla(207,73%,93%,1)' },
    exit: { y: 80, scale: 0.92, backgroundColor: 'hsla(210,75%,97%,1)' },
  },
  {
    enter: { opacity: 0, y: 0, scale: 1 },
    exit: { opacity: 1, y: 40, scale: 0.96 },
  },
]

export default function Features() {
  const [tabActive, setTabActive] = useState(items[0].title)
  const [indexTabs, setIndexTabs] = useState([-1, 0]) // [prev, current]
  const listRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<Array<HTMLButtonElement | null>>([])

  const direction = indexTabs[0] > indexTabs[1] ? 'left' : 'right'

  const handleValueChange = (value: string) => {
    const newIndex = items.findIndex((item) => item.title === value)
    const triggerItemRef = triggerRef.current[newIndex]

    setIndexTabs([
      items.findIndex((item) => item.title === tabActive),
      newIndex,
    ])
    setTabActive(value)

    if (!listRef.current || !triggerItemRef) return

    scrollIntoView(triggerItemRef, {
      scrollMode: 'if-needed',
      behavior: 'smooth',
      block: 'end',
      inline: 'end',
      boundary: listRef.current,
    })
  }

  return (
    <section className='mx-auto max-w-[1136px] px-6 py-32 lg:py-48'>
      <h2 className='mb-4 text-center text-2xl font-semibold lg:mb-8 lg:text-5xl'>
        Unpacked Usability
      </h2>

      <Tabs.Root
        value={tabActive}
        onValueChange={handleValueChange}
        className='grid-rows-[auto, minmax(0,1fr)] grid gap-8 lg:gap-14'
      >
        <Tabs.List
          ref={listRef}
          className={cn(
            'hidden-scrollbar max-w-full overflow-x-scroll',
            'mx-auto flex rounded-full border border-neutral-200 bg-white p-3 shadow lg:space-x-6 lg:p-4',
          )}
        >
          {items.map((item, index) => (
            <Tabs.Trigger
              ref={(el) => {
                triggerRef.current[index] = el;
              }}
              key={item.title}
              value={item.title}
              className={cn(
                'relative px-4 py-2 text-sm lg:text-md',
                'whitespace-nowrap rounded-full transition-colors duration-300 data-[state=active]:text-white',
              )}
            >
              {tabActive === item.title && (
                <motion.div
                  layoutId='feature-active-pill'
                  style={{ borderRadius: 9999 }}
                  transition={{ duration: 0.3 }}
                  className='absolute inset-0 rounded-full bg-red-500'
                />
              )}
              <span className='relative'>{item.title}</span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div className='relative w-full lg:aspect-video'>
          <Overlay tabActive={tabActive} direction={direction} />

          <AnimatePresence mode='popLayout' custom={direction}>
            <motion.div
              key={tabActive}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='default'
              exit='exit'
              transition={{ duration: DURATION }}
              className='relative w-full'
            >
              {items.map((item) => (
                <Tabs.Content
                  key={item.title}
                  value={item.title}
                  asChild
                  forceMount
                  style={{
                    zIndex: tabActive === item.title ? 1 : 'none',
                    opacity: tabActive === item.title ? 1 : 0,
                  }}
                >
                  <div className='group absolute left-0 top-0 w-full first-of-type:relative lg:inset-0 lg:aspect-video lg:rounded-[40px]'>
                    <motion.img
                      loading='lazy'
                      alt='orocle background'
                      src={`/images/${item.backgroundImage}`}
                      width={327}
                      height={184}
                      className='aspect-video w-full rounded-3xl object-cover lg:h-full lg:rounded-[40px]'
                    />

                    <div
                      className={cn(
                        'pointer-events-none relative mt-4 bg-blue-100 lg:mt-0',
                        'grid w-full content-start gap-4 rounded-3xl p-6 lg:max-w-[451px] lg:gap-6',
                        'transition-all duration-300',
                        'lg:absolute lg:bottom-3 lg:left-3 lg:top-3',
                        'lg:-translate-x-[calc(100%+12px)] lg:bg-white/80 lg:p-10 lg:opacity-0 lg:backdrop-blur-xl lg:group-hover:translate-x-0 lg:group-hover:opacity-100',
                        'group-hover:pointer-events-auto',
                      )}
                    >
                      <div>
                        <p className='text-lg font-semibold lg:text-3xl'>
                          {item.title}
                        </p>
                        <p className='mt-2 font-semibold text-neutral-700 lg:text-md'>
                          {item.subtitle}
                        </p>
                      </div>
                      <p className='text-neutral-700 lg:text-md'>
                        {item.description}
                      </p>
                      {item.href && (
                        <Button
                          className='justify-center sm:w-max'
                          icon={<ArrowRight />}
                          asLink
                          href={item.href}
                          target='_blank'
                        >
                          Learn more
                          <span className='sr-only'>{item.title}</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </Tabs.Content>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs.Root>
    </section>
  )
}

function Overlay({
  tabActive,
  direction,
}: {
  tabActive: string
  direction: 'left' | 'right'
}) {
  return (
    <>
      <motion.div
        key={tabActive + 'overlay1'}
        initial={
          direction === 'right'
            ? overlayVariants[0].exit
            : overlayVariants[0].enter
        }
        animate={
          direction === 'right'
            ? overlayVariants[0].enter
            : overlayVariants[0].exit
        }
        transition={{ duration: DURATION }}
        className='absolute left-0 top-0 hidden aspect-video w-full translate-y-20 scale-[0.92] rounded-[40px] bg-blue-100 lg:block'
      />
      <motion.div
        key={tabActive + 'overlay2'}
        initial={
          direction === 'right'
            ? overlayVariants[1].exit
            : overlayVariants[1].enter
        }
        animate={
          direction === 'right'
            ? overlayVariants[1].enter
            : overlayVariants[1].exit
        }
        transition={{ duration: DURATION }}
        className='absolute left-0 top-0 hidden aspect-video w-full translate-y-10 scale-[0.96] rounded-[40px] bg-blue-200 lg:block'
      />
      <motion.div
        key={tabActive + 'overlay3'}
        initial={
          direction === 'right'
            ? overlayVariants[2].exit
            : overlayVariants[2].enter
        }
        animate={
          direction === 'right'
            ? overlayVariants[2].enter
            : overlayVariants[2].exit
        }
        transition={{ duration: DURATION }}
        className='absolute left-0 top-0 hidden aspect-video w-full rounded-[40px] bg-blue-200 lg:block'
      />
    </>
  )
}
