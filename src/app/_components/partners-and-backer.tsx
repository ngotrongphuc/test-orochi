'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'

const logoListTop = [
  'arbitrum.webp',
  'etherium.webp',
  'fantom.svg',
  'XLayer_Logo_Black.png',
  'unicorn-ultra.webp',
  'ancient8.webp',
  'base.png',
  'bnb-chain.png',
  'kroma-signature.png',
  'layer-edge.png',
]

const logoListBottom = [
  'certik.svg',
  'Sei_Logotype_Red.png',
  'full-polygon-logo.webp',
  'mina2.svg',
  'manta-network.jpg',
  'monad.png',
  'moonbeam.png',
  'optimism.png',
  'saakuru_logo.svg',
  'zircuit.png',
  'zk-link.jpg',
  'zkfair_logo_red_black.png',
  'zulu-brand.png',
]

export default function PartnersAndBackers() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const lists = container.querySelectorAll('ul')

    lists.forEach((list, index) => {
      const rect = list.getBoundingClientRect(),
        scrollContainer = list.closest('div')
      if (!scrollContainer) return

      if (rect.width < window.innerWidth) {
        scrollContainer.style.justifyContent = 'center'
        scrollContainer.style.width = '100%'
      } else {
        const clonedList = list.cloneNode(true) as HTMLUListElement
        list.append(...Array.from(clonedList.children))
        list.classList.add(
          (index === 0 ? '-' : '') + 'animate-infinite-horizontal-scroll',
        )
        list.style.willChange = 'transform'
      }
    })
  }, [])

  return (
    <section className='pt-32 lg:pt-48'>
      <div className='grid gap-4 px-6 text-center lg:gap-6'>
        <h2 className='text-2xl font-semibold md:text-3xl lg:text-5xl'>
          Build With The Best
        </h2>
        <p className='mx-auto max-w-[33ch] text-neutral-700 md:max-w-[736px] lg:text-md'>
          Orochi Network proudly build with Industry Leaders
        </p>
      </div>

      <div
        ref={containerRef}
        className='w-full space-y-10 overflow-hidden pt-10 lg:space-y-20 lg:pt-20'
      >
        <div className='relative right-0 inline-flex flex-nowrap'>
          <ul className='flex h-8 flex-shrink-0 items-center lg:h-16 [&>li]:mx-5 lg:[&>li]:mx-10'>
            {logoListTop.map((logo, index) => (
              <li key={`${logo}-${index}`} className='h-full flex items-center'>
                <Image
                  loading='lazy'
                  alt={logo}
                  src={`/images/partners/${logo}`}
                  width={120}
                  height={30}
                  className='object-cover'
                />
              </li>
            ))}
          </ul>
        </div>

        <div className='relative right-0 inline-flex flex-nowrap'>
          <ul className='flex h-8 flex-shrink-0 items-center lg:h-16 [&>li]:mx-5 lg:[&>li]:mx-10'>
            {logoListBottom.map((logo, index) => (
              <li key={`${logo}-${index}`} className='h-full flex items-center'>
                <Image
                  loading='lazy'
                  alt={logo}
                  src={`/images/partners/${logo}`}
                  width={120}
                  height={30}
                  className='object-cover'
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
