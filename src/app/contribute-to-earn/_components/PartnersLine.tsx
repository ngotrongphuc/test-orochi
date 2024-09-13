'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRef, useEffect } from 'react'

type TLogoPartner = {
  name: string
  width?: number
  height?: number
}

const logoPartners: TLogoPartner[] = [
  { name: 'logo-ancient8.png', width: 140 },
  { name: 'logo-codatta.png', width: 175 },
  { name: 'logo-kima.png', width: 85 },
  { name: 'logo-kroma.png', width: 160 },
  { name: 'logo-kult-games.png', width: 100 },
  { name: 'logo-layer-bank.png', width: 190 },
  { name: 'logo-light-link.png', width: 195 },
  { name: 'logo-saakuru.png', width: 130 },
  { name: 'logo-u2u.png', width: 180 },
  { name: 'logo-backpack.png', width: 170 },
  { name: 'logo-bybit.png', width: 80 },
  { name: 'logo-bitget.png', width: 110 },
  { name: 'logo-xlayer.png', width: 120 },
  { name: 'logo-layer-edge.png', width: 179 },
  { name: 'logo-zircuit.png', width: 147.5 },
  { name: 'logo-zone-nine.png', width: 105 },
]

export const PartnersLine = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const lists = container.querySelectorAll('ul')

    lists.forEach((list) => {
      const rect = list.getBoundingClientRect(),
        scrollContainer = list.closest('div')
      if (!scrollContainer) {
        return
      }

      if (rect.width < window.innerWidth) {
        scrollContainer.style.justifyContent = 'center'
        scrollContainer.style.width = '100%'
      } else {
        const clonedList = list.cloneNode(true) as HTMLUListElement
        list.append(...Array.from(clonedList.children))

        list.classList.add('animate-return-horizontal-scroll')
        list.style.willChange = 'transform'
      }
    })
  }, [])

  return (
    <section className='overflow-x-hidden py-20'>
      <div ref={containerRef}>
        <div className='relative right-0 inline-flex flex-nowrap'>
          <ul className='flex h-8 flex-shrink-0 items-center gap-15 [&>li]:mx-5 lg:[&>li]:mx-10'>
            {logoPartners.map((logo) => (
              <li key={logo.name} className='flex items-center'>
                <Image
                  loading='lazy'
                  alt={logo.name}
                  src={`/images/contribute-to-earn/partners/${logo.name}`}
                  width={logo.width || 170}
                  height={logo.height || 40}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
