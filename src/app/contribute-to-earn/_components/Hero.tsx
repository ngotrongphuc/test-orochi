'use client'
import { Pattern } from '@/app/_components/banner'
import { useModal } from '@/app/context/modal-context'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { ESocialData } from './QuestDetails'
import { heroBackground } from '@/images/contribute-to-earn'
import React, { useEffect } from 'react'
import { useIDContext } from '../provider/session-provider'
import { EModalId } from '../lib/types'
import Image from 'next/image'
import { DiscordLogo } from '@phosphor-icons/react/dist/ssr'
import { queryIsThisUserOnWaitlist } from '@/lib/graphql/queries'
import Link from 'next/link'

export const Hero = () => {
  const { myProfile } = useIDContext()
  const { openModal } = useModal()

  const ANNOUNCEMENT_URL =
    'https://orochi.network/blog/Orochi-Network-Contribute-to-Earn-Season1-Official-Launch'

  const openWalletModal = () => {
    openModal(EModalId.ModalWalletLogin)
  }

  const checkWaitList = async () => {
    const result = await queryIsThisUserOnWaitlist()
    if (myProfile) {
      if (myProfile.verified && !result) {
        openModal(EModalId.ModalSuccessful)
      }
      if (myProfile.username && !myProfile.verified) {
        openModal(EModalId.ModalConnectAccount)
      }
      if (!myProfile.username) {
        openModal(EModalId.ModalCreateUsername)
      }
    }
  }

  useEffect(() => {
    if (myProfile) {
      checkWaitList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myProfile])

  return (
    <section className='mx-auto max-w-[1440px] overflow-x-hidden px-2 pt-4 lg:h-auto lg:px-6'>
      <div className='relative overflow-hidden rounded-3xl '>
        <div className='h-90 w-full lg:h-40'>
          <Pattern />
          <Pattern reverse />
        </div>
        <Image
          alt='hero-background'
          src={heroBackground.default.src}
          className='absolute inset-0 -z-10 size-full rounded-3xl object-cover object-[51%] lg:object-center'
          width={0}
          height={0}
          sizes='100%'
          unoptimized
        />
        <div className='flex flex-col items-center justify-center gap-10 bg-gradient-to-b from-transparent to-black/70 px-6 pb-6 pt-4 lg:px-30 lg:pb-20 lg:pt-30'>
          <div className='flex flex-col justify-center gap-4 lg:gap-6'>
            <h1 className='text-wrap px-1 text-center text-2xl font-semibold text-white lg:px-0 lg:pt-20 lg:text-[55px]'>
              Contribute to Earn
            </h1>
            <p className='mx-auto max-w-[888px] text-wrap px-4 text-center text-16 text-tint-white-70 md:p-0 lg:text-md'>
              Welcome to Orochi Network - The World First Zero Knowledge Modular
              Data Availability Layer.
              <br />
              Something Big Awaits: Retroactive Rewards
            </p>
          </div>
          <div className='flex w-full flex-col items-center gap-4 px-6 lg:gap-6'>
            <div className='grid grid-cols-1 gap-4 lg:flex lg:flex-row lg:gap-6'>
              <Button
                intent='white'
                className='w-full justify-center lg:w-65 lg:px-6 lg:py-3'
                onClick={openWalletModal}
                icon={<ArrowRight size={16} />}
              >
                CONNECT WALLET
              </Button>
              <Button
                className='flex w-full justify-center lg:w-65 lg:py-3'
                icon={<ArrowRight size={16} />}
                asLink
                href={ESocialData.DiscordLink}
                target='_blank'
              >
                <div className='flex gap-2'>
                  <DiscordLogo size={16} fill='white' />
                  Join discord
                </div>
              </Button>
              <Button
                asLink
                target='_blank'
                href={ANNOUNCEMENT_URL}
                intent='outline-brand'
                className='px-4 py-3 text-center text-white lg:hidden lg:w-fit lg:px-6 lg:py-3 '
                icon={<ArrowUpRight size={16} />}
              >
                Read announcement
              </Button>
            </div>
            <div className='hidden grid-cols-1 lg:grid'>
              <Link href={ANNOUNCEMENT_URL} target='_blank'>
                <Button
                  intent='outline-brand'
                  className='px-4 py-3 text-center text-white lg:w-fit lg:px-6 lg:py-3 '
                  icon={<ArrowUpRight size={16} />}
                >
                  Read announcement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
