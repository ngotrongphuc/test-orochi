'use client'
import { useEffect, useState, type FC } from 'react'
import { Button } from '../button'
import { Modal } from './modal'
import { useModal } from '@/app/context/modal-context'
import Twitter from '@/components/icons/twitter'
import Confetti from 'react-confetti'
import { Check } from '@phosphor-icons/react'
import {
  mutateCreateReferralCode,
  mutateJoinWaitlist,
} from '@/lib/graphql/mutations'
import { queryIsThisUserOnWaitlist } from '@/lib/graphql/queries'
import { EModalId } from '@/app/contribute-to-earn/lib/types'
import { referralCodeToUrl } from '@/app/contribute-to-earn/lib/utils'
import { DiscordLogo, Heart } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

const DEEP_LINK = {
  xlink: 'https://x.com/intent/follow?screen_name=OrochiNetwork',
  discordLink: 'https://discord.com/invite/sTU4TUh8H3',
}

const DISCORD_STYLE = 'border border-[#5865F2] text-[#5865F2]'
const DISCORD_COLOR = '#5865F2'

type SuccessfulModalProps = {
  visible?: boolean
  onClose: () => void
}

export const SuccessfulModal: FC<SuccessfulModalProps> = ({
  visible,
  onClose,
}) => {
  const [windowDimension, setDimension] = useState<{
    width: number
    height: number
  }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  const { closeModal } = useModal()
  const [inviteLink, setInviteLink] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)
  const [isJoinWaitList, setIsJoinWaitLst] = useState<boolean>(false)

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }

  const handleCopyLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink)
      setCopied(true)
    }
  }

  const handleCloseModal = () => {
    closeModal(EModalId.ModalSuccessful)
    setCopied(false)
  }

  const handleJoinWaitList = async () => {
    if (!isJoinWaitList) {
      const joinToWaitList = await mutateJoinWaitlist()
      setIsJoinWaitLst(joinToWaitList || false)
    }
  }

  const checkWaiting = async () => {
    const check = await queryIsThisUserOnWaitlist()
    setIsJoinWaitLst(check)
  }

  const createNewReferralLink = async () => {
    const newReferralCode = await mutateCreateReferralCode()
    if (!newReferralCode) {
      throw new Error('Fail to create new referral link')
    }
    setInviteLink(referralCodeToUrl(newReferralCode))
  }

  useEffect(() => {
    if (visible) {
      createNewReferralLink()
      checkWaiting()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', detectSize)
      return () => {
        window.removeEventListener('resize', detectSize)
      }
    }
  }, [windowDimension])

  return (
    <>
      <Modal visible={visible} onClose={handleCloseModal} className='xl:w-2/3'>
        <Confetti
          width={windowDimension.width - (windowDimension.width * 40) / 100}
          height={windowDimension.height}
          numberOfPieces={windowDimension.width / 20}
          gravity={windowDimension.width / 10000}
          opacity={1}
          className='h-full w-full'
        />
        <div className='flex flex-col'>
          <h4 className='pb-6 text-lg font-medium md:pb-8 lg:text-3xl'>
            Registration successful!
          </h4>
          <div className='flex flex-col'>
            <p className='pb-6 text-neutral-600 md:pb-8 md:text-md'>
              Registration successful! Join our waitlist for a chance to win
              prizes.
            </p>
            <p className='text-neutral-600 md:text-md'>
              Optional: Follow us on X & Discord for event updates and more
              activities.
            </p>
            <div className='flex flex-col justify-start gap-2 pb-8 pt-4 lg:flex-row'>
              {isJoinWaitList ? (
                <Button
                  intent={'transparent'}
                  className='flex cursor-default items-center justify-center gap-4 rounded-2xl px-10 shadow-none'
                >
                  <Check size={20} />
                  Joined To waitlist
                </Button>
              ) : (
                <Button
                  intent={'primary'}
                  onClick={handleJoinWaitList}
                  className='flex items-center justify-center gap-4 rounded-2xl px-10 py-4 text-sm'
                >
                  Join To waitlist
                  <Heart size={20} fill='white' />
                </Button>
              )}
              <div className='flex flex-1 gap-2'>
                <Button
                  intent='transparent'
                  className='flex flex-1 items-center justify-center gap-2 text-nowrap rounded-2xl border border-black px-8 text-sm text-black'
                  asLink
                  href={DEEP_LINK.xlink}
                  target='_blank'
                >
                  <Twitter fill='black' className='mb-1 h-5 w-5' />
                  Follow us
                </Button>
                <Button
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 text-nowrap rounded-2xl px-8 text-sm',
                    DISCORD_STYLE,
                  )}
                  asLink
                  href={DEEP_LINK.discordLink}
                  target='_blank'
                  intent='transparent'
                >
                  <DiscordLogo fill={DISCORD_COLOR} className='mb-1 h-5 w-5' />
                  Join Discord
                </Button>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4 border-t border-white pt-8 md:pt-12'>
            <p className='text-[#6d6767] md:text-md'>
              Tell your friends about us to claim even more rewards! <br />
              Get your referral link below. You can access it later in your
              account page.
            </p>
            <p className='cursor-default break-all rounded-xl bg-white p-4 text-sm font-medium text-black md:px-6 md:py-4 md:text-md'>
              {inviteLink}
            </p>
            <div className='flex items-center gap-6 md:gap-12'>
              <Button
                intent={'white'}
                className='px-10 py-4 text-sm md:px-20 md:text-base lg:w-fit'
                onClick={handleCopyLink}
              >
                copy link
              </Button>
              {copied && (
                <div className='flex items-center justify-center gap-2 transition-opacity'>
                  <Check size={24} fill='#009231' />
                  <p className='text-sm text-[#009231] md:text-base'>Copied</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
