import { cn } from '@/lib/utils'
import React from 'react'
import { AccountConnectStatus } from './_components/AccountConnectStatus'
import { AccountHeader } from './_components/AccountHeader'
import { MenuAccount } from './_components/MenuAccount'

export default function Layout({
  children,
  params: { slug },
}: Readonly<{
  children: React.ReactNode
  params: { slug: string }
}>) {
  return (
    <div className='container flex flex-col gap-10 pb-32 pt-20 lg:px-32'>
      <AccountHeader slug={slug} />
      <div className='lg:hidden'>
        <AccountConnectStatus />
      </div>
      <div
        className={cn(
          'flex max-h-full max-w-full flex-col gap-6 lg:gap-20',
          'lg:max-h-full lg:max-w-full lg:flex-row',
        )}
      >
        <MenuAccount slug={slug} />
        {children}
      </div>
    </div>
  )
}
