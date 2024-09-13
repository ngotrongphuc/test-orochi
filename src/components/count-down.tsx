'use client'

import { useState, useEffect } from 'react'

import { cn } from '@/lib/utils'

import ConnectedForm from './connected-form'
import { SocialLink } from './layouts/app-footer'

export default function CountDown() {
  return (
    <div className="mx-auto p-6 md:max-w-[1440px]">
      <BlockEdge />
      <div className="rounded-3xl bg-blue-100 ">
        <div className="mx-auto grid max-w-[500px] justify-center gap-8 px-6 py-9 md:max-w-none md:gap-10 md:p-10">
          <h2 className="text-center text-lg font-semibold capitalize md:text-4xl">
            Get ready for something that will change the game!
          </h2>

          <Clock />

          <p className="mx-auto max-w-[816px] text-center font-medium text-neutral-700 md:text-lg">
            Exciting things are happening behind the scenes. Stay connected!
          </p>

          <ConnectedForm />

          <div className="mx-auto flex flex-col items-center space-y-3 md:flex-row md:space-x-6 md:space-y-0">
            <span className="text-md text-neutral-600">Follow us</span>
            <SocialLink />
          </div>
        </div>
      </div>
      <BlockEdge reverse />
    </div>
  )
}

const DUE_DATE = new Date(2024, 2, 19)
const endDate = DUE_DATE.toISOString()
const defaultRemaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
}

function Clock() {
  const [remaining, setRemaining] = useState(defaultRemaining)

  useEffect(() => {
    const handleCountDown = () => {
      const MILLISECOND_PER_SECOND = 1000
      const MILLISECOND_PER_MINUTE = MILLISECOND_PER_SECOND * 60
      const MILLISECOND_PER_HOUR = MILLISECOND_PER_MINUTE * 60
      const MILLISECOND_PER_DAY = MILLISECOND_PER_HOUR * 24
      const remainMils = endDate
        ? new Date(endDate).getTime() - new Date().getTime()
        : 0
      if (remainMils <= 0) return setRemaining(defaultRemaining)
      const days = Math.floor(remainMils / MILLISECOND_PER_DAY)
      const hours = Math.floor(
        (remainMils % MILLISECOND_PER_DAY) / MILLISECOND_PER_HOUR,
      )
      const minutes = Math.floor(
        (remainMils % MILLISECOND_PER_HOUR) / MILLISECOND_PER_MINUTE,
      )
      const seconds = Math.floor(
        (remainMils % MILLISECOND_PER_MINUTE) / MILLISECOND_PER_SECOND,
      )
      setRemaining({ days, hours, minutes, seconds })
    }
    handleCountDown()
    const intervalId = setInterval(handleCountDown, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-[repeat(4,64px)] justify-center gap-2 md:grid-cols-[repeat(4,128px)] md:gap-10">
        {/* aspect-square + place-items-center not working in safari :( */}
        {/* <div className="grid aspect-square place-items-center rounded-xl bg-blue-200 text-3xl font-semibold md:rounded-3xl md:text-6xl">
          {remaining.days.toString().padStart(2, '0')}
        </div>
        <div className="grid aspect-square place-items-center rounded-xl bg-blue-200 text-3xl font-semibold md:rounded-3xl md:text-6xl">
          {remaining.hours.toString().padStart(2, '0')}
        </div>
        <div className="grid aspect-square place-items-center rounded-xl bg-blue-200 text-3xl font-semibold md:rounded-3xl md:text-6xl">
          {remaining.minutes.toString().padStart(2, '0')}
        </div>
        <div className="grid aspect-square place-items-center rounded-xl bg-blue-200 text-3xl font-semibold md:rounded-3xl md:text-6xl">
          {remaining.seconds.toString().padStart(2, '0')}
        </div> */}
        <div className="grid h-16 place-items-center rounded-xl bg-blue-200 text-3xl font-semibold md:h-32 md:rounded-3xl md:text-6xl">
          {remaining.days.toString().padStart(2, '0')}
        </div>
        <div className="grid h-16 place-items-center rounded-xl bg-blue-200 text-3xl font-semibold md:h-32 md:rounded-3xl md:text-6xl">
          {remaining.hours.toString().padStart(2, '0')}
        </div>
        <div className="grid h-16 place-items-center rounded-xl bg-blue-200 text-3xl font-semibold md:h-32 md:rounded-3xl md:text-6xl">
          {remaining.minutes.toString().padStart(2, '0')}
        </div>
        <div className="grid h-16 place-items-center rounded-xl bg-blue-200 text-3xl font-semibold md:h-32 md:rounded-3xl md:text-6xl">
          {remaining.seconds.toString().padStart(2, '0')}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(4,64px)] justify-center justify-items-center gap-2 md:grid-cols-[repeat(4,128px)] md:gap-10">
        <span className="text-sm text-neutral-600 md:text-md">Days</span>
        <span className="text-sm text-neutral-600 md:text-md">Hours</span>
        <span className="text-sm text-neutral-600 md:text-md">Minutes</span>
        <span className="text-sm text-neutral-600 md:text-md">Seconds</span>
      </div>
    </div>
  )
}

function BlockEdge({ reverse }: { reverse?: boolean }) {
  return (
    <div
      className={cn(
        'grid h-32 max-h-[40px] grid-cols-[40px,1fr,40px] md:max-h-[80px] md:grid-cols-[80px,1fr,80px]',
        reverse && 'rotate-180',
      )}
    >
      <div className="relative aspect-square rounded-br-xl bg-white before:absolute before:inset-0 before:-z-10 before:bg-blue-100 md:rounded-br-3xl" />
      <div className="rounded-tl-xl rounded-tr-xl bg-blue-100 md:rounded-tl-3xl md:rounded-tr-3xl"></div>
      <div className="relative aspect-square rounded-bl-xl bg-white before:absolute before:inset-0 before:-z-10 before:bg-blue-100 md:rounded-bl-3xl" />
    </div>
  )
}
