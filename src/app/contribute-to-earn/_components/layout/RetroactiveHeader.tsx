'use client'

import Image from 'next/image'
import Link from 'next/link'

import { NAVIGATION_ITEMS, RETROACTIVE_ITEMS } from '@/configs/navigation'

import DesktopLinks from '@/components/layouts/desktop-links'
import { MobileNavLinks } from '@/components/layouts/mobile-links'
import MobileNavToggler from '@/components/layouts/mobile-nav-toggler'
import { Button } from '@/components/ui/button'
import { LoginOptionModal } from '@/components/ui/modal'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { signOut, useSession } from 'next-auth/react'
import UserAuthenNav from '../UserAuthenNav'
import { useModal } from '@/app/context/modal-context'
import { useIDContext } from '../../provider/session-provider'
import { useEffect, useState } from 'react'
import { EModalId } from '../../lib/types'
import { accountImage } from '@/images/contribute-to-earn'

const TIME_OPEN_MODAL = 1000

export default function RetroactiveHeader() {
  const [open, setOpen] = useState<boolean>(false)
  // const { visible, toggle, onClose } = useModal()
  const { modalStates, openModal, closeModal } = useModal()
  const { data } = useSession()
  const { myProfile } = useIDContext()
  const toggle = () => {
    setOpen(false)
    setTimeout(() => openModal(EModalId.ModalLogin), TIME_OPEN_MODAL)
  }

  const openNavToggle = () => {
    setOpen(!open)
    return open
  }

  useEffect(() => {
    if (open) {
      openModal(EModalId.ModalNav)
    } else {
      closeModal(EModalId.ModalNav)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <header className='sticky top-0 z-header mx-auto flex max-w-[1440px] justify-between px-6 pt-8 lg:block '>
      <div className='z-10 flex w-full items-center justify-between gap-2 rounded-3xl bg-tint-white-70 p-2 backdrop-blur-[50px] transition-colors'>
        <Link
          href='/'
          aria-label='Orochi Network Home Page'
          className='grid place-items-center rounded-3xl px-4'
        >
          <Image alt='orochi logo' src='/logo.webp' width={115} height={36} />
        </Link>

        <nav className='hidden lg:block'>
          <DesktopLinks links={NAVIGATION_ITEMS} />
        </nav>
        <div className='flex gap-2'>
          {myProfile && myProfile.username ? (
            <UserAuthenNav
              id={`${myProfile.username}`}
              avatarUrl={`${myProfile.profilePictureUrl || accountImage.default.src}`}
            />
          ) : (
            <div className='flex flex-row items-center justify-center gap-4 pr-2'>
              <Button
                icon={<ArrowRight size={16} />}
                className='hidden h-10 rounded-2xl xl:flex'
                onClick={toggle}
              >
                LOG IN
              </Button>
            </div>
          )}
          <MobileNavToggler open={open} navToggle={openNavToggle}>
            <div className='grid h-full grid-rows-[minmax(0,1fr),auto] px-6 pb-14 pt-[109px]'>
              <nav className='hidden-scrollbar grid'>
                <MobileNavLinks links={NAVIGATION_ITEMS} />
                {!myProfile && (
                  <div className='flex w-full flex-row items-center justify-center gap-4 pr-2'>
                    <Button
                      icon={<ArrowRight size={16} />}
                      className='mt-5 flex h-10 w-full justify-center rounded-2xl md:w-1/2'
                      onClick={toggle}
                    >
                      LOG IN
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </MobileNavToggler>
        </div>
      </div>

      <LoginOptionModal
        visible={modalStates[EModalId.ModalLogin]}
        onClose={() => closeModal(EModalId.ModalLogin)}
      />
    </header>
  )
}
