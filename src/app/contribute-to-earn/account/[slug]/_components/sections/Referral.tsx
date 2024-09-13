'use client'
import { AccountTable } from '@/app/contribute-to-earn/_components/AccountTable'
import { referralCodeToUrl } from '@/app/contribute-to-earn/lib/utils'
import { useIDContext } from '@/app/contribute-to-earn/provider/session-provider'
import { Button } from '@/components/ui/button'
import { mutateCreateReferralCode } from '@/lib/graphql/mutations'
import { queryListSuccessfulReferrals } from '@/lib/graphql/queries'
import { TGetSuccessfulReferralsResponse } from '@/lib/graphql/type'
import { cn } from '@/lib/utils'
import { Check } from '@phosphor-icons/react/dist/ssr'
import React, { useEffect, useState } from 'react'

export const Referral = () => {
  const [inviteLink, setInviteLink] = useState<string>('')
  const [listFriends, setListFriends] = useState<
    TGetSuccessfulReferralsResponse | undefined
  >(undefined)
  const [copied, setCopied] = useState<boolean>(false)
  const { myProfile } = useIDContext()

  const handleCopyLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink)
      setCopied(true)
    }
  }

  const getListFriends = async () => {
    const result = await queryListSuccessfulReferrals()
    if (!result) {
      throw new Error('Fail to get list friends')
    }
    setListFriends(result)
  }

  const getReferralLink = async () => {
    const result = await mutateCreateReferralCode()
    if (!result) {
      throw new Error('Fail to get referral link')
    }
    setInviteLink(referralCodeToUrl(result))
  }
  useEffect(() => {
    if (myProfile?.username) {
      getListFriends()
    }
    if (myProfile?.verified) {
      getReferralLink()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myProfile])

  return (
    <div className='container flex h-fit w-full flex-col gap-10 overflow-x-scroll rounded-3xl border border-transparent bg-blue-100 p-6 md:overflow-auto lg:p-10'>
      <div className='flex flex-col gap-2'>
        <label className='font-medium'>Your Referral Link</label>
        <div className='flex w-full flex-col items-center gap-4 md:flex-row'>
          <p
            className={cn(
              'flex w-full cursor-default flex-col justify-between rounded-xl bg-white p-4 text-14 text-neutral-600 md:flex-row md:items-center md:text-md',
              inviteLink && 'lowercase text-sm text-neutral-600 md:text-md',
            )}
          >
            {inviteLink ||
              'You have to verify account to get your referral link'}
            {inviteLink && (
              <div className='flex justify-end md:w-1/4 mt-2 md:mt-0'>
                <Button
                  intent={'primary'}
                  className='p-2 md:px-4 text-[10px] text-white rounded-lg md:text-sm'
                  onClick={handleCopyLink}
                >
                  copy link
                </Button>
              </div>
            )}
          </p>
        </div>
        {copied && (
          <div className='flex items-center justify-center gap-2 transition-opacity lg:justify-start'>
            <Check size={24} fill='#009231' />
            <p className='text-sm text-[#009231] md:text-base'>Copied</p>
          </div>
        )}
      </div>
      <div>
        <div className='flex flex-row justify-between'>
          <p className='font-medium'>
            {'Referral Success: '}
            <strong className='font-medium text-red-500'>
              {listFriends?.total.toString()}
            </strong>
          </p>
          {/* TODO: fow now we don't have api for this yet */}
          {/* <p className='min-w-[100px]'>
            {'Rank: '}
            <strong className='font-medium text-red-500'>
              {listFriends?.total.toString()}
            </strong>
          </p> */}
        </div>
        <AccountTable result={listFriends} />
      </div>
    </div>
  )
}
