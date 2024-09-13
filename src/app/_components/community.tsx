'use client'

import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import Github from '@/components/icons/github'
import { Button } from '@/components/ui/button'
import Twitter from '@/components/icons/twitter'
import Discord from '@/components/icons/discord'
import Telegram from '@/components/icons/telegram'

import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import {
  dummiesPlonky2,
  protocolBuild,
  zkCircom,
  zkWorkshop2,
  zkpDay,
  zkpModularSubstrate,
  zkpSoftLaunch,
} from '@/images'
import { DEFAULT_FILL_SVG } from '@/components/layouts/app-footer'

export default function Community() {
  const communityLink = [
    {
      label: 'Twitter / X',
      href: 'https://x.com/OrochiNetwork',
      icon: <Twitter width={16} height={16} />,
    },
    {
      label: 'Discord',
      href: 'https://discord.com/invite/sTU4TUh8H3',
      icon: <Discord width={16} height={16} />,
    },
    {
      label: 'Github',
      href: 'https://github.com/orochi-network',
      icon: <Github width={16} height={16} />,
    },
    {
      label: 'Telegram',
      href: 'https://t.me/OrochiNetwork',
      icon: <Telegram width={16} height={16} fill={DEFAULT_FILL_SVG} />,
    },
  ]

  return (
    <section className='mx-auto max-w-[1136px] gap-10 px-6 pt-32 md:grid md:pt-48 lg:grid-cols-[minmax(0,260px),auto]'>
      <div className='grid gap-4 self-start text-center lg:gap-6 lg:pt-12 lg:text-left'>
        <h2 className='text-2xl font-semibold md:text-3xl lg:text-5xl'>
          Scale Together
        </h2>
        <p className='mx-auto text-neutral-700 md:max-w-[560px] lg:text-md'>
          We offer plenty of excitement for all enthusiasts. Come join and grow
          with us through every activity!
        </p>
        <ul className='flex flex-wrap justify-center gap-x-6 gap-y-[0.625rem] lg:grid lg:grid-cols-2'>
          {communityLink.map((link) => (
            <li key={link.label}>
              <Button
                asLink
                href={link.href}
                target='_blank'
                intent='ghost-black'
                icon={link.icon}
                reverseIcon
              >
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <CommunitySlide />
    </section>
  )
}

const slideData = [
  {
    image: zkpSoftLaunch.default.src,
    title: 'ZKP Labs Vietnam Soft Launch',
    date: '2022-11-17',
    tags: ['ZKP', 'Tech', 'Web3'],
    description:
      'The event focused on discussing the future of ZKP (Zero-Knowledge Proof) technology and exploring the significance of fostering a vibrant ZKP community in Vietnam.',
  },
  {
    image: zkpDay.default.src,
    title: 'ZKP Day 2022',
    date: '2022-11-27',
    tags: ['ZKP', 'Tech', 'Web3'],
    description:
      'An engaging event offering direct interaction with speakers, featuring discussions on leveraging ZKP for business empowerment, followed by networking and refreshments to enhance web3 journey.',
  },
  {
    image: dummiesPlonky2.default.src,
    title: 'Plonky2 for Dummies',
    date: '2023-02-23',
    tags: ['ZKP', 'Tech', 'Web3'],
    description:
      'In this workshop, Vu Vo - former Ethereum Foundation engineer has given attendees more details on Plonky2 and how it will be applied into the real world.',
  },
  {
    image: protocolBuild.default.src,
    title: 'Build With Mina Protocol',
    href: 'https://orochi.network/blog/monthly-report-updates-june-2023',
    date: '2023-06-15',
    tags: ['Mina', 'zkSmartContract', 'SnarkyJs'],
    description:
      'Throughout the event, we navigated through the intricacies of zero-knowledge proofs and demonstrated how SnarkyJS empowers developers to create robust solutions in the blockchain ecosystem.',
  },
  {
    image: zkCircom.default.src,
    title: 'ZK Programming With Circom',
    href: 'https://zkplabs.network/blog/Zero-Knowledge-Proofs-with-Circom-A-domain-specific-language-purpose',
    date: '2023-06-15',
    tags: ['ZKP', 'Circom', 'Programming'],
    description:
      'Attendees delved into the disparities between web2 and web3 startup landscapes, explored perspectives on zkVM, and received guidance on programming zk with Circom.',
  },
  {
    image: zkpModularSubstrate.default.src,
    title: 'ZKP Modular for Substrate',
    href: 'https://x.com/ZKPLabs/status/1750758321227985313?s=20',
    date: '2024-01-25',
    tags: ['ZKP', 'Circom', 'Programming'],
    description:
      'An insightful meetup where we delved into the dynamic intersection of Substrate and Zero Knowledge Proof (ZKP) technology, hosted collaboratively by ZKP Labs and Polkadot.',
  },
  {
    image: zkWorkshop2.default.src,
    title: 'Aleo HCMC zkWorkshop 2',
    href: 'https://x.com/ZKPLabs/status/1751852740593307670?s=20',
    date: '2024-01-23',
    tags: ['Aleo', 'ZKP', 'zkDatabase'],
    description:
      'Organized by Aleo with ZKP Labs as a co-host, the Aleo HCMC zkWorkshop 2 offered in-depth exploration of the Aleo ecosystem, including Leo Language tutorials and exclusive zkDatabase insights from Chiro, a core contributor at ZKP Labs.',
  },
]

const slideVariants = {
  center: { x: 0, y: 0, rotate: 0, opacity: 1 },
  enter: (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      return { rotate: 4.25, opacity: 0 }
    }
    return { x: 'calc(-100% - 60px)', y: '10%', rotate: -8, opacity: 0 }
  },
  exit: (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      return { x: 'calc(-100% - 60px)', y: '10%', rotate: -8, opacity: 0 }
    }
    return { rotate: 4.25, opacity: 0 }
  },
}

const contentVariant = {
  center: { x: 0, opacity: 1 },
  enter: (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      return { x: 100, opacity: 0 }
    }
    return { x: -100, opacity: 0 }
  },
  exit: (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      return { x: -100, opacity: 0 }
    }
    return { x: 100, opacity: 0 }
  },
}

function CommunitySlide() {
  const totalSlide = slideData.length

  const [slideActive, setSlideActive] = useState(0)
  const [direction, setDirection] = useState<'prev' | 'next'>('next')

  const handleSlide = (direction: 'prev' | 'next') => {
    setDirection(direction)
    if (direction === 'prev') {
      setSlideActive((prev) => (prev === 0 ? 0 : prev - 1))
    } else {
      setSlideActive((prev) =>
        prev === totalSlide - 1 ? totalSlide - 1 : prev + 1,
      )
    }
  }

  function displayDate(value: string) {
    const date = new Date(value)
    return date.toString().split(' ').splice(1, 3).join(' ')
  }

  return (
    <div className='grid gap-2 md:grid md:grid-cols-[327px,auto] md:gap-10 lg:grid-cols-[auto,minmax(0,260px)]'>
      <div className='overflow-hidden p-6 md:p-8'>
        <div className='relative aspect-[4/5] w-full'>
          <Overlay slideActive={slideActive} direction={direction} />

          <AnimatePresence mode='popLayout' custom={direction}>
            <motion.img
              key={slideActive}
              custom={direction}
              variants={slideVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{ duration: 0.6 }}
              src={slideData[slideActive].image}
              alt='slide-img'
              loading='lazy'
              className='absolute h-full w-full rounded-3xl object-cover md:rounded-[40px]'
            />
          </AnimatePresence>
        </div>
      </div>

      <div className='grid gap-4 px-6 md:px-0 md:pt-12'>
        <AnimatePresence mode='popLayout' custom={direction}>
          {slideData.map(
            (slide, index) =>
              slideActive === index && (
                <motion.div
                  variants={contentVariant}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  custom={direction}
                  transition={{ duration: 0.6 }}
                  className='grid gap-4'
                  key={index}
                >
                  <div className='grid gap-1'>
                    <p className='text-md font-semibold md:text-2xl'>
                      {slide.title}
                    </p>
                    <p className='text-sm text-neutral-600 md:text-base'>
                      {displayDate(slide.date)}
                    </p>
                  </div>

                  <ul className='flex flex-wrap items-center space-x-2 text-[0.75rem] leading-[0.875rem] text-neutral-700 md:gap-2 md:space-x-0 md:text-sm'>
                    {slide.tags.map((tag) => (
                      <li
                        key={tag}
                        className='rounded-full bg-blue-100 px-3 py-1'
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <p className='line-clamp-6 h-[102px] text-sm text-neutral-700 md:h-auto md:text-base'>
                    {slide.description}
                  </p>

                  {slide.href && (
                    <Button
                      asLink
                      intent='ghost-brand'
                      icon={<ArrowRight />}
                      className='w-max justify-start'
                      href={slide.href}
                    >
                      Learn More
                    </Button>
                  )}
                </motion.div>
              ),
          )}
        </AnimatePresence>

        <div className='mt-auto flex justify-between space-x-2 md:justify-normal md:pb-6 md:pt-10'>
          <Button
            aria-label='prev-btn'
            iconOnly
            intent='outline-black'
            icon={<ArrowLeft />}
            className='grid h-10 w-10 grid-cols-1 place-items-center rounded-2xl p-0 disabled:cursor-not-allowed'
            onClick={() => handleSlide('prev')}
            disabled={slideActive === 0}
          />
          <Button
            aria-label='next-btn'
            iconOnly
            intent='outline-black'
            icon={<ArrowRight />}
            className='grid h-10 w-10 grid-cols-1 place-items-center rounded-2xl p-0 disabled:cursor-not-allowed'
            onClick={() => handleSlide('next')}
            disabled={slideActive === totalSlide - 1}
          />
        </div>
      </div>
    </div>
  )
}

const OVERLAY_DURATION = 0.4

const overlayVariants = [
  { enter: { rotate: 7.86, opacity: 1 }, exit: { rotate: 11.25, opacity: 0 } },
  {
    enter: { rotate: 4.25, backgroundColor: 'hsla(206,75%,87%,1)' },
    exit: { rotate: 7.86, backgroundColor: 'hsla(207,73%,93%,1)' },
  },
  {
    enter: { rotate: 0, opacity: 0 },
    exit: { rotate: 4.25, opacity: 1 },
  },
]
function Overlay({
  slideActive,
  direction,
}: {
  slideActive: string | number
  direction: 'prev' | 'next'
}) {
  return (
    <>
      <motion.div
        key={slideActive + 'overlaySlide1'}
        initial={
          direction === 'next'
            ? overlayVariants[0].exit
            : overlayVariants[0].enter
        }
        animate={
          direction === 'next'
            ? overlayVariants[0].enter
            : overlayVariants[0].exit
        }
        transition={{ duration: OVERLAY_DURATION }}
        className='absolute inset-0 rotate-[7.86deg] rounded-3xl bg-blue-200 md:rounded-[40px]'
      />
      <motion.div
        key={slideActive + 'overlaySlide2'}
        initial={
          direction === 'next'
            ? overlayVariants[1].exit
            : overlayVariants[1].enter
        }
        animate={
          direction === 'next'
            ? overlayVariants[1].enter
            : overlayVariants[1].exit
        }
        transition={{ duration: OVERLAY_DURATION }}
        className='absolute inset-0 rotate-[4.25deg] rounded-3xl bg-blue-300 md:rounded-[40px]'
      />
      <motion.div
        key={slideActive + 'overlaySlide3'}
        initial={
          direction === 'next'
            ? overlayVariants[2].exit
            : overlayVariants[2].enter
        }
        animate={
          direction === 'next'
            ? overlayVariants[2].enter
            : overlayVariants[2].exit
        }
        transition={{ duration: 0.6 }}
        className='absolute inset-0 rounded-3xl bg-blue-300 md:rounded-[40px]'
      />
    </>
  )
}
