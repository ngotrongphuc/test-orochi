'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { AppleLogo, ArrowRight, GooglePlayLogo } from '@phosphor-icons/react'

export default function ALittleForCTA() {
  return (
    <section className="mx-auto max-w-[1440px] px-2 pt-20 md:px-6 md:pt-[192px]">
      <div
        className={cn(
          'overflow-hidden rounded-3xl border border-red-500 pt-10 md:rounded-[40px]',
          'md:grid md:grid-cols-[auto,minmax(0,1fr)] md:gap-8 md:overflow-visible md:py-20 md:pl-[152px]',
        )}
      >
        <div className="grid gap-6 px-6 md:max-w-[456px] md:gap-10 md:px-0">
          <h2 className="text-2xl font-semibold text-neutral-800 md:text-5xl">
            Build Smarter
            <br />
            with Orochi
          </h2>

          <p className="text-neutral-700 md:text-md">
            Explore your ideal plan and start
            <br />
            building smarter today
          </p>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-0 sm:space-x-2">
            <Button
              asLink
              href="#subscriber"
              intent="outline-brand"
              className="text-center sm:text-left"
            >
              TALK TO US
            </Button>
            <Button
              asLink
              href="/"
              icon={<ArrowRight size={16} />}
              className="justify-between sm:justify-normal"
            >
              GET STARTED
            </Button>
          </div>

          <div className="flex items-center space-x-4 text-sm text-neutral-600">
            <span>Available on</span>
            <AppleLogo size={20} weight="fill" />
            <GooglePlayLogo size={20} weight="fill" />
          </div>
        </div>

        <div className="relative h-full">
          <Image
            src="/images/phone-app.png"
            width={753}
            height={501}
            alt="phone-app"
            className="aspect-[753/501] w-full md:absolute md:-bottom-20 md:right-0 md:rounded-br-[40px]"
          />
        </div>
      </div>
    </section>
  )
}
