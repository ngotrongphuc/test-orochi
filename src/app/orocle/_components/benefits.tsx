import { Button } from '@/components/ui/button'
import {
  customIcon5,
  customIcon6,
  customIcon7,
  customIcon8,
  customIcon9,
} from '@/images/orocle'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import React, { FC } from 'react'

const Benefits = () => {
  return (
    <section className='mx-2 my-6 rounded-2xl bg-blue-100 md:mx-6 lg:h-auto lg:rounded-40 lg:p-6'>
      <div className='mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-6 overflow-x-hidden py-10 lg:gap-10 lg:px-10 lg:py-20'>
        <div className='flex flex-col gap-4 lg:gap-6'>
          <h4 className='text-center text-23 font-semibold text-neutral-800 lg:text-35'>
            The potential applications are vast
          </h4>
          <p className='text-center text-16 font-normal text-neutral-600 lg:text-18'>
            Gateway to a truly decentralized and data-driven future for Web3{' '}
            <br />
            Unlocking the power of real-world data
          </p>
        </div>
        <CardContents data={benefitsData} />
        <Button
          intent='primary'
          icon={<ArrowRight size={16} />}
          className='mt-4 w-fit lg:mt-0'
        >
          get started
        </Button>
      </div>
    </section>
  )
}

export default Benefits

const benefitsData = [
  [
    {
      icon: customIcon5.default.src,
      title: 'Decentralized finance (DeFi)',
      description:
        'Integrate real-world market data for dynamic pricing and risk management in DeFi protocols.',
    },
    {
      icon: customIcon6.default.src,
      title: 'Prediction markets',
      description:
        'Enable accurate and trustworthy predictions based on real-time events and data.',
    },
    {
      icon: customIcon7.default.src,
      title: 'Supply chain management',
      description:
        'Track goods movement and environmental conditions transparently across complex supply chains.',
    },
  ],
  [
    {
      icon: customIcon8.default.src,
      title: 'Gaming & Entertainment',
      description:
        'Create immersive experiences that react to real-world events and user behavior.',
    },
    {
      icon: customIcon9.default.src,
      title: 'More than just a data feed !',
      description:
        'It empowers developers to build DApps that are not only innovative but also robust, secure, and truly impactful.',
    },
  ],
]

type CardItem = {
  icon: string
  title: string
  description: string
}

type CardContentsProps = {
  data: Array<CardItem[]>
}

const CardContents: FC<CardContentsProps> = ({ data }) => {
  return (
    <div className='flex flex-col gap-4 lg:gap-6'>
      <div className='flex flex-col gap-4 lg:flex-row lg:gap-6'>
        {data[0].map((content) => (
          <div
            key={content.title}
            className='mx-2 flex h-full flex-col gap-6 rounded-2xl bg-white px-4 py-6 lg:mx-0 lg:min-h-75 lg:rounded-24 lg:p-10 xl:min-h-66'
          >
            <Image
              alt='custom-icon'
              src={content.icon}
              width={32}
              height={32}
            />
            <div className='flex h-full w-full flex-col gap-2'>
              <h6 className='text-18 font-semibold text-neutral-800 lg:text-16'>
                {content.title}
              </h6>
              <p className='text-16 font-normal text-neutral-600'>
                {content.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-4 px-2 lg:flex-row lg:gap-6 lg:px-0'>
        {data[1].map((content) => (
          <div
            key={content.title}
            className='flex h-full w-full flex-col gap-6 rounded-2xl bg-white px-4 py-6 lg:mx-0 lg:min-h-60 lg:rounded-24 lg:p-10 xl:min-h-54'
          >
            <Image
              alt='custom-icon'
              src={content.icon}
              width={32}
              height={32}
            />
            <div className='flex h-full w-full flex-col gap-2'>
              <h6 className='text-18 font-semibold text-neutral-800 lg:text-16'>
                {content.title}
              </h6>
              <p className='text-16 font-normal text-neutral-600'>
                {content.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
