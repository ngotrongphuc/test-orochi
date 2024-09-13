import Link from 'next/link'
import Image from 'next/image'

import { NAVIGATION_ITEMS } from '@/configs/navigation'

import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

import { Button } from '../ui/button'
import DesktopLinks from './desktop-links'
import { MobileNavLinks } from './mobile-links'
import MobileNavToggler from './mobile-nav-toggler'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useMobileNavStore } from '@/stores/use-mobile-nav-store'

export const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdFwMaifPRrQ1q_c2dCm39F3HLk9ZSOkX_pLswNuF62jKeMug/viewform'

export const AppHeader = () => {
  const openState = useMobileNavStore()
  return (
    <header
      className={cn(
        'sticky top-0 z-header mx-auto flex max-w-[1440px] justify-between lg:block',
        !openState.openMobile && 'px-6 pt-8 delay-1000',
      )}
    >
      <div className='z-10 flex w-full items-center justify-between gap-2 rounded-3xl bg-white/90 p-2 backdrop-blur-3xl transition-colors'>
        <Link
          href='/'
          aria-label='Orochi Network Home Page'
          className='grid place-items-center rounded-3xl px-4'
        >
          <Image alt='app-logo' src='/logo.webp' width={115} height={36} />
        </Link>

        <nav className='hidden lg:block'>
          <DesktopLinks links={NAVIGATION_ITEMS} />
        </nav>

        <Button
          asLink
          icon={<ArrowRight size={16} />}
          href='https://dashboard.orochi.network/'
          target='_blank'
          className='hidden rounded-3xl py-[18px] xl:flex'
        >
          Get Started
        </Button>
        <MobileNavToggler
          navToggle={() => openState.setOpenMobile(!openState.openMobile)}
          open={openState.openMobile}
        >
          <div className='grid h-full grid-rows-[minmax(0,1fr),auto] px-6 pb-14 pt-[109px]'>
            <nav className='hidden-scrollbar grid'>
              <div>
                <MobileNavLinks links={NAVIGATION_ITEMS} />
              </div>
              <Button
                className='mt-2 h-fit w-full justify-center'
                asLink
                href={GOOGLE_FORM_URL}
                target='_blank'
                icon={<ArrowRight size={16} />}
              >
                Get Started
              </Button>
            </nav>
          </div>
        </MobileNavToggler>
      </div>
    </header>
  )
}
