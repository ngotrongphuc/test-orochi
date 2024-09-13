'use client'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { FC } from 'react'
import { useToast } from '@/components/ui/use-toast'
import {
  gradientGlass,
  rectangle,
  rectangle1,
  rectangle2,
  rectangle3,
  rectangle4,
  rectangle5,
  rectangle6,
  rectangle7,
  rectangle8,
  rectangle9,
  tradeStorageBg,
} from '@/images/zkdatabase'
import { OROCHI_DASHBOARD } from '@/configs/navigation'

const OROCHI_DOCS_URL = 'https://docs.orochi.network/zkdatabase/chapter.html'

enum EBoxTitle {
  Privacy = 'Privacy Preserving Data',
  AaS = 'zkDatabase AaS',
  Prover = 'ZKP Prover',
  Provable = 'Provable Data',
}

const TradeStorage = () => {
  return (
    <section className='bg-gradient-to-b from-blue-100 to-white pb-10 lg:pb-20'>
      <div className='coverer flex items-center justify-center'>
        <div className='absolute hidden backdrop-blur-3xl lg:block'>
          <Image
            alt='trade-storage-bg'
            src={tradeStorageBg.default.src}
            width={800}
            height={800}
            className='object-contain backdrop-blur-3xl'
          />
        </div>
        <div className='relative mx-auto max-w-[1248px] px-2 py-10 xl:p-20'>
          <div
            data-anim='trade-storage'
            className='absolute bottom-0 left-1/2 top-0 w-full -translate-x-1/2 rounded-40'
          />
          <h2 className='relative text-center text-23 font-semibold text-neutral-800 md:text-35 lg:text-35'>
            Database Revolution
          </h2>

          <div className='relative mt-8 grid gap-2 lg:mt-14'>
            <div className='hidden lg:block'>
              {BoxDataList.map((data, i) => (
                <Box key={data[i].title} data={data} />
              ))}
            </div>
            <div className='lg:hidden'>
              {BoxDataList.map((data, i) => (
                <Box key={data[i].title} data={data} isMobile />
              ))}
            </div>

            <div className='hidden lg:block'>
              <BoxSpecial />
            </div>
            <div className='lg:hidden'>
              <BoxSpecial isMobile />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type BoxProps = {
  data: {
    title: string
    description: string
    src: string
    mobileSrc: string
  }[]
  isMobile?: boolean
}

const Box: FC<BoxProps> = ({ data, isMobile }) => {
  return (
    <div className='group grid gap-4 lg:grid-cols-2 xl:h-[378px] xl:grid-cols-[1fr_400px] xl:even:grid-cols-[400px_1fr]'>
      <div
        className={cn(
          'overflow-hidden rounded-24 xl:rounded-[32px]',
          'my-2 border border-neutral-200 bg-white/70 backdrop-blur-2xl lg:border-white xl:grid',
          data[0].title === EBoxTitle.Provable
            ? 'xl:grid-cols-2'
            : 'xl:grid-cols-[380px_1fr]',
        )}
      >
        {/* img mobile */}
        <div className='h-50 rounded-24 md:h-70 lg:hidden'>
          <Image
            alt='retangle'
            src={data[0].mobileSrc}
            width={1000}
            height={1000}
            className='h-full w-full object-cover'
          />
        </div>
        {/* reverse img */}
        {data[0].title === EBoxTitle.Provable && (
          <div className='hidden h-50 rounded-24 md:h-70 lg:block lg:h-full'>
            <Image
              alt='retangle'
              src={data[0].src}
              width={1000}
              height={1000}
              className='h-full w-full object-fill'
            />
          </div>
        )}
        {/* description */}
        <div className='flex flex-col justify-center p-6'>
          <h3
            className={cn(
              'text-18 font-semibold lg:text-28',
              data[0].title === EBoxTitle.Privacy && 'mr-25',
            )}
          >
            {data[0].title}
          </h3>
          <span className='mt-4 block text-14 text-neutral-600 lg:text-16'>
            {data[0].description}
          </span>
        </div>
        {data[0].title === EBoxTitle.Privacy && (
          <div className='hidden h-50 rounded-24 md:h-70 lg:block xl:h-full'>
            <Image
              alt='retangle'
              src={data[0].src}
              width={1000}
              height={1000}
              className='h-full w-full object-cover'
            />
          </div>
        )}
      </div>

      <div
        className={cn(
          'overflow-hidden rounded-24 xl:rounded-[32px]',
          'mb-5 mt-2 grid lg:mb-2 xl:grid-rows-[auto_minmax(0,1fr)]',
          'border border-neutral-200 bg-white/70 backdrop-blur-2xl lg:border-white group-even:lg:col-start-1 group-even:lg:row-start-1',
        )}
      >
        <div className='row-start-1 h-50 rounded-24 md:h-70 xl:h-full'>
          <Image
            alt='rectangle'
            src={isMobile ? data[1].mobileSrc : data[1].src}
            width={1000}
            height={1000}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='p-6 xl:row-start-2'>
          <h3 className='text-18 font-semibold lg:text-28'>{data[1].title}</h3>
          <span className='mt-4 block text-14 text-neutral-600 lg:text-16'>
            {data[1].description}
          </span>
        </div>
      </div>
    </div>
  )
}

type BoxSpecialProps = {
  isMobile?: boolean
}

const BoxSpecial: FC<BoxSpecialProps> = ({ isMobile }) => {
  const { toast } = useToast()
  return (
    <div className='group grid gap-8 lg:grid-cols-[1fr_300px] lg:gap-4 xl:h-[378px]'>
      <div
        className={cn(
          'overflow-hidden rounded-24 xl:rounded-[32px]',
          'border border-neutral-200 bg-white/70 backdrop-blur-2xl lg:border-white xl:grid xl:grid-cols-[400px_1fr]',
        )}
      >
        <div className='h-50 rounded-24 md:h-70 xl:h-full'>
          <Image
            alt='retangle'
            src={isMobile ? rectangle9.default.src : rectangle4.default.src}
            width={1000}
            height={1000}
            className='h-full w-full object-cover'
          />
        </div>

        <div className='my-auto p-6'>
          <h3 className='text-18 font-semibold lg:text-28'>
            Proof-System & <br /> Run-Time Agnostic
          </h3>
          <span className='mt-4 block text-14 text-neutral-600 lg:text-16'>
            zkDatabase is built in a proof-system agnostic and blockchain
            agnostic manner, making it to be the first zkMDAL that supported
            ZK-data-rollups natively.
          </span>
        </div>
      </div>

      <div
        className={cn(
          'overflow-hidden rounded-24 p-6 xl:rounded-[32px] xl:p-10',
          'grid grid-rows-[minmax(0,1fr)_auto] gap-6 border border-blue-400 bg-blue-tint-10 backdrop-blur-2xl',
        )}
      >
        <div className='mx-auto w-fit'>
          <Image
            alt='gradient-glass'
            src={gradientGlass.default.src}
            width={100}
            height={100}
          />
        </div>
        <p className='text-center text-14 text-neutral-600 lg:text-16'>
          Get to know zkDatabase inside and out.
        </p>
        <div className='grid gap-2'>
          <Button
            asLink
            href={OROCHI_DOCS_URL}
            icon={<ArrowRight size={16} />}
            className='w-full justify-center py-4'
            target='_blank'
            rel='noopener noreferrer'
          >
            EXPLORE ZKDATABASE
          </Button>
          <Button
            intent='white'
            className='flex w-full justify-center py-4 uppercase'
            target='_blank'
            asLink
            href={OROCHI_DASHBOARD}
          >
            start building
          </Button>
        </div>
      </div>
    </div>
  )
}

const BoxDataList = [
  [
    {
      title: 'Privacy Preserving Data',
      description:
        'zkDatabse serves privacy preserving data in provable manner, establishing the verifiable private computation (e.g: ZK Machine Learning, ZK ID, etc).',
      src: rectangle.default.src,
      mobileSrc: rectangle5.default.src,
    },
    {
      title: 'zkDatabase AaS',
      description:
        'zkDatabase is the only database allows handling data and proving process on a  distributed cloud service.',
      src: rectangle1.default.src,
      mobileSrc: rectangle6.default.src,
    },
  ],
  [
    {
      title: 'Provable Data',
      description:
        'zkDatabase with the potential to provide provable data and will replace current data feeding concepts in the future. We provide data for any applications on any blockchains.',
      src: rectangle2.default.src,
      mobileSrc: rectangle7.default.src,
    },
    {
      title: 'ZKP Prover',
      description:
        'zkDatabase is the first database with ZKP prover that allowed us to prove the data correctness.',
      src: rectangle3.default.src,
      mobileSrc: rectangle8.default.src,
    },
  ],
]

export default TradeStorage
