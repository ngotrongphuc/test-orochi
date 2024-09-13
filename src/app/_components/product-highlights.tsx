'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/lib/utils'

export default function ProductHighlights() {
  const container = useRef<HTMLDivElement>(null)
  const scrollContainer = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: true,
          start: 'top+=220 top',
          end: '+=300%',
        },
      })

      tl.to(() => {}, { duration: 1 })
        .to(scrollContainer.current, {
          x: () =>
            -(
              scrollContainer.current!.scrollWidth -
              scrollContainer.current!.clientWidth
            ),
          duration: 2,
        })
        .to(() => {}, { duration: 1 })
    })

    mm.add('(max-width: 767px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          start: 'top+=280 top',
          end: 'bottom bottom-=1000',
        },
      })
      scrollContainer.current
        ?.querySelectorAll('[data-card]:not(:first-child)')
        .forEach((card, index) => {
          tl.from(
            card,
            {
              y: 100,
              opacity: 0,
            },
            index,
          )
        })
    })
  })
  return (
    <div className='w-full'>
      <section
        ref={container}
        className='px-10 pt-48 md:overflow-x-hidden lg:px-2'
      >
        <h2 className='text-center text-2xl font-semibold md:text-3xl lg:text-5xl'>
          Data Availability Layer of Web3
        </h2>

        <p className='mx-auto mt-4 max-w-[688px] px-4 text-center text-neutral-700 md:mt-6 md:p-0 md:text-md'>
          Orochi Network solves the limits of Computation, Data Correctness and
          Data Availability
        </p>

        <div
          ref={scrollContainer}
          className='relative mt-10 flex flex-col items-center md:h-auto md:flex-row md:space-x-2'
        >
          {cardData.map((data, index) => (
            <Card key={data.title} order={index}>
              <p className='text-md font-bold md:text-lg'>{data.title}</p>
              <p className='mt-3 text-base font-normal text-neutral-700 group-hover:text-white md:text-md lg:text-lg'>
                {data.description}
              </p>
            </Card>
          ))}
          <div className='h-[325px] md:hidden' />
        </div>
      </section>
    </div>
  )
}

function Card({
  className,
  order = 0,
  children,
}: {
  className?: string
  order?: number
  children?: React.ReactNode
}) {

  return (
    <Link
      href='#'
      data-card
      className={cn(
        'group h-[392px] w-[319px] flex-shrink-0 rounded-3xl transition-[width] md:static md:p-2 md:hover:w-[500px]',
        'md:h-[32.5rem] md:w-[25rem]',
        'lg:h-[37.5rem] lg:w-[31.25rem]',
        order !== 0 && 'absolute',
        className,
      )}
      style={{
        top: order * 65,
      }}
    >
      <div className='relative h-full w-full rounded-3xl border border-white p-6 md:p-10'>
        <Image
          width={482}
          height={291}
          alt='card-light'
          src={`/images/product-highlight/card-light-${order}.png`}
          className='absolute inset-0 rounded-3xl opacity-100 transition-opacity duration-300 group-hover:opacity-0'
        />

        <Image
          width={482}
          height={291}
          alt='card-dark'
          src={`/images/product-highlight/card-dark-${order}.png`}
          className='absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        />

        <div
          className='absolute left-0 top-0 h-1/2 w-full rounded-3xl opacity-50 transition-opacity duration-300 group-hover:opacity-0'
          style={{
            background:
              'linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 56%)',
          }}
        />

        <div className='relative text-md font-semibold group-hover:text-white md:text-2xl'>
          {children}
        </div>
      </div>
    </Link>
  )
}

const cardData = [
  {
    title: 'High performance',
    description:
      'Easily handle high performance applications by data availability layer and distributed source of trustless randomness for all type of Web3 applications.',
  },
  {
    title: 'Secured',
    description:
      'Employ MPC and ZKP for topmost security of the data and digital assets. No data breaches and third-party involvement.',
  },
  {
    title: 'Cost-effective',
    description:
      'Cost-effective for an exceptional performance. With our focus on efficiency and effectiveness, you can trust that every dollar spent delivers tangible results.',
  },
  {
    title: 'User-friendly',
    description:
      'Functional simple UX/UI. All products were built with \'user experience first\' in mind. Seamlessly integrating with the operating system. Easily adaptable for any users.',
  },
  {
    title: 'Decentrialized and Verifiable',
    description:
      'Orochi Network utilizes cryptography to guarantee decentralization and verifiable in trustless manner.',
  },
]
