'use client'
import { useIDContext } from '@/app/contribute-to-earn/provider/session-provider'
import type { TLoginMethodsStatus } from '@/lib/graphql/type'
import { cn } from '@/lib/utils'
import { getImageUrl } from '@/utils'
import { Check, LinkBreak } from '@phosphor-icons/react'
import Image from 'next/image'
import { type FC } from 'react'

type SocialAccountProps = {
  connectAccountStatus: TLoginMethodsStatus
}
export const SocialAccount: FC<SocialAccountProps> = ({
  connectAccountStatus,
}) => {
  const { myProfile } = useIDContext()
  return (
    <div className='container flex w-full h-fit flex-col gap-10 rounded-3xl border border-transparent bg-blue-100 p-6 lg:p-10'>
      <div className='grid grid-cols-1 gap-2'>
        <label className='font-medium'>Linked Email</label>
        <p
          className={cn(
            'cursor-default break-all rounded-xl bg-white p-2 text-md text-black md:p-6 md:text-md lg:text-base',
            myProfile?.email && 'lowercase',
          )}
        >
          {myProfile?.email || 'Your account is not link to any email'}
        </p>
      </div>
      <div className='grid grid-cols-1 gap-2'>
        <h6 className='font-medium'>Linked Social Accounts</h6>
        <div className='grid grid-cols-1 gap-3'>
          {connectAccountStatus.socialConnections?.map((item) => {
            if (!['twitter', 'cryptoWallet'].includes(item.socialProvider))
              return (
                <div
                  className='flex flex-row items-center justify-between rounded-2xl border border-transparent bg-white p-4'
                  key={item.socialProvider}
                >
                  <div className='flex flex-row items-center gap-2'>
                    <Image
                      src={getImageUrl(item.socialProvider) || ''}
                      alt='icon'
                      width={24}
                      height={24}
                    />
                    <h6 className='capitalize'>{item.socialProvider}</h6>
                  </div>
                  {item ? (
                    <Check size={24} className='text-red-500' />
                  ) : (
                    <LinkBreak size={24} className='text-red-500' />
                  )}
                </div>
              )
          })}
        </div>
      </div>
    </div>
  )
}
