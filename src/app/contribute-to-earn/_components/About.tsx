'use client'

import { GOOGLE_FORM_URL } from '@/components/layouts/app-header'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'

export default function About() {
  return (
    <section className='mx-auto max-w-[1440px] p-2 md:p-6' id='subscriber'>
      <div className='grid justify-items-center gap-8 rounded-3xl bg-blue-100 px-10 py-16 md:gap-10 md:py-20'>
        <h2 className='max-w-[1088px] px-2 text-center text-2xl font-medium text-neutral-800 lg:text-3xl'>
          About Orochi Network
        </h2>
        <p className='mx-auto max-w-[688px] text-wrap px-2 text-center text-base text-neutral-700 md:p-0 md:text-md'>
          Orochi Network is The World First Zero Knowledge Modular DA Layer.
        </p>

        {/* <form className='grid w-full max-w-[600px] justify-items-center gap-8 md:gap-10'>
          <input
            type='text'
            placeholder='Enter your email here'
            className={cn(
              'h-[70px] w-full rounded-3xl bg-white md:h-[76px]',
              'text-center text-md text-neutral-800 placeholder:text-neutral-500',
              'border border-white outline-none transition-colors hocus:border-red-500',
            )}
          />
          <Button icon={<ArrowRight size={16} />}>Subscribe</Button>
        </form> */}

        {/* <ConnectedForm /> */}
        <div className='flex w-full flex-col justify-center gap-3 md:flex-row lg:pl-10'>
          <Link
            href={GOOGLE_FORM_URL}
            target='_blank'
          >
            <Button
              intent='white'
              className='w-full justify-center md:w-fit md:px-14 md:py-3'
            >
              TALK TO US
            </Button>
          </Link>
          <Link href='/' target='_blank'>
            <Button
              className='justify-center w-full md:w-fit lg:px-6 lg:py-3'
              icon={<ArrowRight size={16} />}
            >
              EXPLORE MORE
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
