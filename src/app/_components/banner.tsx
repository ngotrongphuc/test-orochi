'use client'

import Image from 'next/image'

import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

import { Button } from '../../components/ui/button'
import { useToast } from '../../components/ui/use-toast'
import { TypingText } from '../../components/typing-text'
import { dragon } from '@/images'
import { GOOGLE_FORM_URL } from '@/components/layouts/app-header'

export default function Banner() {
  const { toast } = useToast()

  return (
    <section className='mx-auto max-w-[1440px] overflow-x-hidden px-2 pt-4 sm:min-h-[700px] lg:h-auto lg:px-6'>
      <div className='relative overflow-hidden rounded-3xl'>
        <div className='h-20 w-full lg:absolute'>
          <Pattern />
          <Pattern reverse />
        </div>

        <Image
          alt='gradient-bg'
          src='/images/gradient-bg.webp'
          className='absolute inset-0 -z-10 size-full rounded-3xl object-cover object-[35%]'
          width={0}
          height={0}
          sizes='100%'
        />

        <div className='mx-auto grid max-w-[669px] gap-4 p-6 text-center text-white sm:gap-6 lg:relative lg:z-30 lg:mx-0 lg:gap-10 lg:pb-[200px] lg:pl-20 lg:pt-40 lg:text-left'>
          <h1 className='px-2 text-2xl font-semibold sm:text-4xl lg:px-0 lg:pt-20 lg:text-left lg:text-6xl'>
            Secured Scaling
            <br />
            <TypingText className='after:text-red-500' />
          </h1>

          <p className='px-2 font-medium sm:text-md lg:block lg:max-w-[552px] lg:text-lg'>
            The World First Zero-Knowledge Modular Data Availability Layer
          </p>

          <div className='grid grid-cols-2 justify-center gap-2 sm:grid-cols-[repeat(2,180px)] lg:justify-start'>
            <Button
              asLink
              href={GOOGLE_FORM_URL}
              intent='white'
              className='text-center'
              target='_blank'
            >
              Talk to us
            </Button>
            <Button
              icon={<ArrowRight size={16} />}
              className='justify-center p-0'
              onClick={() => {
                toast({
                  message: 'Coming soon! Subscribe us to get update!',
                  variant: 'comingSoon',
                })
              }}
            >
              Build with us
            </Button>
          </div>
        </div>

        <div className='relative -z-10 -mt-16 ml-10 aspect-square w-full sm:ml-auto sm:max-w-[500px] lg:absolute lg:bottom-0 lg:right-0 lg:z-20 lg:m-0 lg:aspect-auto lg:w-[51.7%] lg:max-w-[720px]'>
          <Image
            alt='dragon-img'
            src={dragon.default.src}
            width={720}
            height={758}
            className='absolute -bottom-14 right-0 rounded-br-3xl lg:static'
          />
        </div>
      </div>
    </section>
  )
}

export function Pattern({ reverse }: { reverse?: boolean }) {
  return (
    <div
      className='relative z-10 float-left h-20 w-[120px] lg:absolute lg:top-0 lg:h-40 lg:w-[240px]'
      style={
        reverse
          ? { transform: 'scaleX(-1)', float: 'right', right: 0 }
          : undefined
      }
    >
      <div className='clip-sm absolute left-10 top-0 h-10 w-10 bg-white lg:clip-lg lg:left-20 lg:h-20 lg:w-20' />
      <div className='absolute left-0 top-0 aspect-square w-10 rounded-br-xl bg-white lg:-left-0.5 lg:-top-0.5 lg:w-[83px] lg:rounded-br-3xl'></div>
      <div className='clip-sm absolute left-0 top-10 h-20 w-20 bg-white lg:clip-lg lg:top-20' />

      <div className='absolute left-10 top-10 h-10 w-10 rounded-xl bg-white lg:left-20 lg:top-20 lg:h-20 lg:w-20 lg:rounded-3xl'></div>

      <div className='clip-sm absolute left-[120px] top-0 h-10 w-10 bg-white lg:clip-lg lg:left-[240px] lg:h-20 lg:w-20' />
      <div className='absolute left-20 top-0 aspect-square w-10 rounded-b-xl bg-white lg:left-[159px] lg:w-[82px] lg:rounded-b-3xl'></div>
      <div className='clip-sm absolute left-10 top-0 h-10 w-10 -scale-x-100 bg-white lg:clip-lg lg:left-20 lg:h-20 lg:w-20' />
    </div>
  )
}

function RollText() {
  const topics = [
    'Blockchain',
    'dApp',
    'Data',
    'Custody',
    'Computation',
    'Everything',
    'Blockchain',
  ]

  return (
    <div className='overflow-hidden'>
      <div className='animation-roll relative'>
        <p className='text-transparent'>S</p>

        {topics.map((topic, i) => (
          <p
            key={i}
            className='absolute left-0 top-0'
            style={{ top: `${100 * i}%` }}
          >
            {topic.split('').map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </p>
        ))}
      </div>
    </div>
  )
}
