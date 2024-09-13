'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import React, { FC } from 'react'
import IconCircle from './layout/partner-icon-circle'
import {
  bigBanner,
  customIcon1,
  customIcon2,
  customIcon3,
  customIcon4,
} from '@/images/orocle'
import Image from 'next/image'
import Link from 'next/link'
import { RAMenPaSTA_URL } from '@/configs/navigation'

const Partners = () => {
  return (
    <section className='mx-auto max-w-[1440px] overflow-x-hidden overflow-y-hidden px-2 py-10 lg:h-auto md:px-6 lg:py-20'>
      <div className='flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-10 lg:px-6 xl:gap-20 xl:px-20 mb-10 lg:mb-20'>
        <div className='flex w-full flex-col lg:w-1/2'>
          <h4 className='w-full text-23 font-semibold text-neutral-800 lg:w-fit lg:text-35'>
            Accelerate Your Business
          </h4>
          <div className='flex w-full flex-col py-4 lg:py-10'>
            <RowContent data={rowData} />
          </div>
          <Button
            intent='outline-brand'
            className='w-fit px-10'
            icon={<ArrowRight size={16} />}
          >
            get started
          </Button>
        </div>
        <div className='mt-10 h-50 w-full md:h-80 lg:mt-0 lg:h-90 lg:w-1/2'>
          <IconCircle />
        </div>
      </div>
      <Link
        href={RAMenPaSTA_URL}
        className='flex h-full w-full justify-center pt-10 lg:pt-20'
        target='_blank'
      >
        <Image
          alt='big-banner'
          src={bigBanner.default.src}
          width={5068}
          height={1690}
          className='h-full w-full max-w-[1168px] bg-no-repeat object-contain'
        />
      </Link>
    </section>
  )
}

const rowData = [
  {
    title: 'Decentralized & Trustworthy',
    description:
      'No single entity controls the flow of information, fostering trust and transparency.',
    icon: customIcon1.default.src,
  },
  {
    title: 'Gather Diverse Data',
    description:
      'The possibilities are endless, empowering DApps with real-time, relevant data.',
    icon: customIcon2.default.src,
  },
  {
    title: 'Highly Scalable & Efficient',
    description:
      'Efficiently handles high data volumes, ensuring smooth DApp performance with complex integrations.',
    icon: customIcon3.default.src,
  },
  {
    title: 'Chain Agnostic',
    description:
      'Integrate seamlessly with various blockchain platforms, offering flexibility and wider reach for your DApp.',
    icon: customIcon4.default.src,
  },
]

type RowContentProps = {
  data: {
    title: string
    description: string
    icon: string
  }[]
}

const RowContent: FC<RowContentProps> = ({ data }) => (
  <>
    {data.map((content, index) => (
      <div
        key={content.title}
        className={cn(
          'mb-6 flex flex-col border-neutral-200 pb-5 lg:grid lg:grid-cols-[0.5fr,0.6fr] xl:grid-cols-[0.35fr,0.65fr]',
          index !== data.length - 1 ? 'border-b' : '',
        )}
      >
        <div className='mb-4 mr-10 flex items-center justify-between gap-4 lg:mb-0'>
          <Image alt='custom-icon' src={content.icon} width={24} height={24} />
          <p className='w-full text-wrap text-18 font-semibold text-neutral-800 lg:text-16'>
            {content.title}
          </p>
        </div>
        <span className='w-full text-16 font-light text-neutral-600'>
          {content.description}
        </span>
      </div>
    ))}
  </>
)

export default Partners
