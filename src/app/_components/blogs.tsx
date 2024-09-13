'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

import * as Tabs from '@radix-ui/react-tabs'
import { motion, AnimatePresence } from 'framer-motion'
import scrollIntoView from 'scroll-into-view-if-needed'

import { Button } from '@/components/ui/button'

import { useCursorStore } from '@/stores/use-cursor-store'

import { cn } from '@/lib/utils'

import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export default function Blogs() {
  return (
    <section className='mx-auto max-w-[1136px] px-6 py-32 lg:py-48'>
      <h2 className='mb-8 text-center text-2xl font-semibold md:text-3xl lg:mb-14 lg:text-5xl'>
        Venturing Depths
      </h2>

      <BlogTabs />
    </section>
  )
}

function BlogTabs() {
  const items = [
    'Blog',
    ['Scientific Papers', 'https://eprint.iacr.org/2024/336'],
    ['Technical Documents', 'https://docs.orochi.network/'],
    ['Open Source', 'https://github.com/orochi-network'],
    ['Grants', 'https://linktr.ee/orochi.network'],
  ]

  const [tabActive, setTabActive] = useState<string>(items[0] as string)

  const listRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<Array<HTMLButtonElement | null>>([])

  const handleValueChange = (value: string) => {
    setTabActive(value)
    const index = items.indexOf(value)
    const triggerItemRef = triggerRef.current[index]

    if (!triggerItemRef) return

    scrollIntoView(triggerItemRef, {
      scrollMode: 'if-needed',
      behavior: 'smooth',
      block: 'end',
      inline: 'end',
      boundary: listRef.current,
    })
  }

  return (
    <Tabs.Root
      value={tabActive}
      onValueChange={handleValueChange}
      className='grid grid-rows-[auto,minmax(0,1fr)] gap-8 lg:gap-14'
    >
      <Tabs.List
        ref={listRef}
        className={cn(
          'hidden-scrollbar max-w-full overflow-x-scroll',
          'mx-auto flex rounded-full border border-neutral-200 bg-white p-3 shadow lg:space-x-6 lg:p-4',
        )}
      >
        {items.map((item, index) =>
          typeof item !== 'string' ? (
            <a
              role='tab'
              key={item[0]}
              href={item[1]}
              target='_blank'
              className={cn(
                'relative px-4 py-2 text-sm lg:text-md',
                'whitespace-nowrap rounded-full transition-colors duration-300 data-[state=active]:text-white',
              )}
            >
              {item[0]}
            </a>
          ) : (
            <Tabs.Trigger
              ref={(el) => { triggerRef.current[index] = el }}
              key={item}
              value={item}
              className={cn(
                'relative px-4 py-2 text-sm lg:text-md',
                'whitespace-nowrap rounded-full transition-colors duration-300 data-[state=active]:text-white',
              )}
            >
              {tabActive === item && (
                <motion.div
                  layoutId='active-pill'
                  style={{ borderRadius: 9999 }}
                  transition={{ duration: 0.3 }}
                  className='absolute inset-0 rounded-full bg-red-500'
                />
              )}
              <span className='relative'>{item}</span>
            </Tabs.Trigger>
          ),
        )}
      </Tabs.List>

      <AnimatePresence>
        {items.map((item) =>
          typeof item !== 'string' ? null : (
            <Tabs.Content key={item} value={item} asChild>
              <div>
                <BlogDetail />

                <Button
                  asLink
                  intent='outline-black'
                  icon={<ArrowRight />}
                  className='mx-auto mt-8 w-fit lg:mt-14'
                  href='https://orochi.network/blog'
                  target='_blank'
                >
                  Read our blog
                </Button>
              </div>
            </Tabs.Content>
          ),
        )}
      </AnimatePresence>
    </Tabs.Root>
  )
}

const variants = {
  initial: { opacity: 0, y: 20 },
  enter: (i: number) => {
    return {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
      },
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
}

const blogs = [
  {
    image: 'blog1.webp',
    href: 'https://orochi.network/blog/introducing-orand-your-trustless-source-of-randomness',
    title: 'Introducing Orand: Your Trustless Source of Randomness',
    tags: ['Orand', 'Product', 'VRF'],
  },
  {
    image: 'blog2.webp',
    href: 'https://orochi.network/blog/zkDatabase-Transforming-Data-Storage-for-Web3-Applications',
    title: 'zkDatabase: Transforming Data Storage for Web3 Applications',
    tags: [
      'zkDatabase',
      'Products',
      'ZKP',
      'DataStorage',
      'DistributedStorage',
    ],
  },
  {
    image: 'blog3.webp',
    href: 'https://orochi.network/blog/plonk-a-breakthrough-in-efficient-zk-SNARK-Technology',
    title: 'PLONK: A Breakthrough in Efficient ZK-SNARK Technology',
    tags: ['PLONK', 'ZKP', 'Cryptography', 'Privacy', 'Security'],
  },
  {
    image: 'blog4.webp',
    href: "https://orochi.network/blog/%20Data-Availability-Ensuring-Data-is-Available-in-Web3's-Systems",
    title: 'Data Availability: Ensuring Data is Available in Web3\'s Systems',
    tags: [
      'DataAvailability',
      'EtheriumRollups',
      'Sharding',
      'Celestia',
      'EigenDA',
    ],
  },
  {
    image: 'blog5.webp',
    href: 'https://orochi.network/blog/Exploring-Privacy-Solutions-in-Blockchains-ZKPs-FHE-MPC',
    title: 'Exploring Privacy Solutions in Blockchains: ZKPs, FHE, MPC',
    tags: ['ZKP', 'FHE', 'MPC', 'Privacy', 'HomomorphicEncryption', 'Security'],
  },
  {
    image: 'blog6.webp',
    href: 'https://orochi.network/blog/verifiable-random-function',
    title: 'Verifiable Random Function (VRF) & Applications in Blockchain',
    tags: ['VRF', 'RandomNumberGeneration', 'Cryptography', 'Security'],
  },
]

function BlogDetail() {
  const { setIsHover } = useCursorStore()
  const itemsRef = useRef<Array<HTMLAnchorElement | null>>([])

  useEffect(() => {
    if (itemsRef.current.length === 0) return

    itemsRef.current.forEach((item) => {
      item?.addEventListener('mouseenter', () => setIsHover(true))
      item?.addEventListener('mouseleave', () => setIsHover(false))
    })
  }, [setIsHover])

  return (
    <div className='home-blog-grid'>
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.image}
          custom={index}
          variants={variants}
          initial='initial'
          animate='enter'
          exit='exit'
          className='group relative overflow-hidden rounded-2xl lg:rounded-[40px]'
        >
          <a
            ref={(el) => { itemsRef.current[index] = el }}
            href={blog.href}
            target='_blank'
            className='transition-[filter] after:absolute after:inset-0 after:bg-[#C6E2F7B2] after:opacity-0 after:duration-300 hover:after:opacity-100'
          >
            <Image
              className='-z-10 h-auto w-full rounded-2xl object-cover group-hover:blur-md lg:rounded-3xl'
              src={`/images/blogs/${blog.image}`}
              alt='blog image'
              width={0}
              height={0}
              unoptimized
            />

            <div className='z-10 transition-opacity group-hover:opacity-100 lg:absolute lg:inset-0 lg:grid lg:place-items-center lg:opacity-0'>
              <div
                className={cn(
                  'pt-3 lg:p-4 lg:text-center',
                  index === 0 && 'lg:p-10',
                )}
              >
                <p
                  className={cn(
                    'text-lg font-semibold',
                    index === 0 && 'lg:text-3xl',
                  )}
                >
                  {blog.title}
                </p>

                <p
                  className={cn(
                    'mt-2 flex flex-wrap items-center gap-x-6 text-sm text-red-500 lg:mx-auto lg:w-full lg:justify-center lg:text-base',
                    index === 0 && 'lg:text-lg',
                  )}
                >
                  {blog.tags.map((tag) => (
                    <span key={tag} className='block py-1.5'>
                      #{tag}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </a>
        </motion.div>
      ))}
    </div>
  )
}
