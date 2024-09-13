'use client'
import { orochiLogo } from '@/images'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const largeRoundedPartner = [
  'large-partner.png',
  'large-partner-1.png',
  'large-partner-2.png',
  'large-partner-3.png',
  'large-partner-4.png',
  'large-web3-icon.png',
  'large-web3-icon-1.png',
  'large-partner-5.png',
  'large-partner-6.png',
  'large-partner-7.png',
  'large-web3-icon-2.png',
  'large-web3-icon-3.png',
  'large-web3-icon-4.png',
  'large-web3-icon-5.png',
  'large-web3-icon-6.png',
  'large-web3-icon-7.png',
]

const smallRoundedPartner = [
  'small-partner.png',
  'small-web3-icon.png',
  'small-partner-1.png',
  'small-web3-icon-1.png',
  'small-partner-2.png',
  'small-web3-icon-2.png',
  'small-partner-3.png',
  'small-web3-icon-3.png',
]

const IconCircle: React.FC = () => {
  const [size, setSize] = useState({
    smallRadius: 110,
    largeRadius: 220,
    imageSize: 60,
  })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSize({
          smallRadius: 110,
          largeRadius: 220,
          imageSize: 60,
        })
      } else if (window.innerWidth >= 768) {
        setSize({
          smallRadius: 90,
          largeRadius: 165,
          imageSize: 50,
        })
      } else {
        setSize({
          smallRadius: 55,
          largeRadius: 110,
          imageSize: 40,
        })
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Set initial values
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div className='relative flex h-full w-full items-center justify-center'>
      <div className='absolute flex h-12 w-12 items-center justify-center md:h-20 md:w-20 lg:h-25 lg:w-25'>
        <Image
          alt='orochi-logo'
          src={orochiLogo.default.src}
          width={100}
          height={100}
          className='h-full w-full object-fill'
        />
      </div>
      <div className='animate-spin-slow-revert absolute flex h-full w-full items-center justify-center'>
        {smallRoundedPartner.map((icon, index) => {
          const angle = (index / smallRoundedPartner.length) * 2 * Math.PI
          const x = Math.cos(angle) * size.smallRadius
          const y = Math.sin(angle) * size.smallRadius
          return (
            <div
              key={icon}
              className='absolute'
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <Image
                alt={icon}
                src={`/images/orocle/partner/${icon}`}
                width={size.imageSize}
                height={size.imageSize}
                className={cn(
                  'object-fill',
                  index % 2 === 1
                    ? 'icon-animate-pulse'
                    : 'icon-animate-pulse-revert',
                )}
              />
            </div>
          )
        })}
      </div>
      <div className='animate-spin-slow flex h-full w-full items-center justify-center'>
        {largeRoundedPartner.map((icon, index) => {
          const angle = (index / largeRoundedPartner.length) * 2 * Math.PI
          const x = Math.cos(angle) * size.largeRadius
          const y = Math.sin(angle) * size.largeRadius
          return (
            <div
              key={icon}
              className='absolute'
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <Image
                alt={icon}
                src={`/images/orocle/partner/${icon}`}
                width={size.imageSize}
                height={size.imageSize}
                className={cn(
                  'object-fill',
                  index % 2 === 1
                    ? 'icon-animate-pulse'
                    : 'icon-animate-pulse-revert',
                )}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default IconCircle
