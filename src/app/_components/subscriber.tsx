'use client'

import ConnectedForm from '@/components/connected-form'
import { cn } from '@/lib/utils'
import { FC } from 'react'

type SubscriberProps = {
  className?: string
}

const Subscriber: FC<SubscriberProps> = ({ className }) => {
  return (
    <section
      className='mx-auto max-w-[1440px] px-2 py-10 md:px-6 md:py-20 lg:px-20'
      id='subscriber'
    >
      <div
        className={cn(
          'grid justify-items-center gap-4 rounded-24 bg-blue-100 px-6 py-10 md:gap-10 md:py-20 lg:rounded-40',
          className,
        )}
      >
        <h2 className='max-w-[1088px] text-center text-18 font-semibold text-neutral-800 md:text-23 lg:text-35'>
          Stay up to date with the latest news,
          <br /> announcements, and articles.
        </h2>

        <ConnectedForm />
      </div>
    </section>
  )
}

export default Subscriber
