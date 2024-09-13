/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, SignOut } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type FC } from 'react'
import { AccountConnectStatus } from './AccountConnectStatus'
import { signOut } from 'next-auth/react'
import type { TLoginMethodsStatus } from '@/lib/graphql/type'

const menuList = [
  {
    title: 'PROFILE SETTING',
    path: '',
  },
  {
    title: 'REFERRAL',
    path: 'referral',
  },
  {
    title: 'CRYPTO WALLETS',
    path: 'crypto-wallets',
  },
  {
    title: 'SOCIAL ACCOUNTS',
    path: 'social-accounts',
  },
  {
    title: 'ACCOUNT CONNECT STATUS',
    path: 'account_connect_status',
  },
  {
    title: 'LOG OUT',
    path: 'logout',
  },
]
type MenuAccountProps = {
  slug: string
}
export const MenuAccount: FC<MenuAccountProps> = ({ slug }) => {
  const PATH = `/contribute-to-earn/account/${slug}/`
  const [selected, setSelected] = useState('')
  const currentPath = usePathname()
  useEffect(() => {
    //set path to mark which path are enable
    const path = currentPath.substring(PATH.length)
    setSelected(path)
  }, [currentPath])
  return (
    <div className='hidden-scrollbar flex w-full flex-row gap-8 overflow-auto lg:min-h-[893px] lg:w-[160px] lg:flex-col lg:overflow-visible'>
      {menuList.map(({ title, path }) => {
        if (path === 'account_connect_status') {
          return (
            <div className='hidden lg:block' key={title}>
              <AccountConnectStatus />
            </div>
          )
        }
        if (path === 'logout') {
          return (
            <div className='flex w-full' key={title}>
              <Button
                className='hidden w-full justify-start text-nowrap text-sm lg:flex'
                intent='ghost-black'
                icon={<SignOut size={14} />}
                onClick={() => signOut()}
              >
                LOG OUT
              </Button>
              {/** mobile view */}
              <Link
                href=''
                className={cn('text-nowrap lg:hidden')}
                onClick={() => signOut()}
              >
                LOG OUT
              </Link>
            </div>
          )
        }
        return (
          <div key={title}>
            <Button
              intent='ghost-black'
              asLink={true}
              href={`${PATH}${path}`}
              replace={true}
              className={cn(
                'hidden justify-start text-nowrap border-transparent hover:border-transparent lg:flex',
                selected === path && 'text-red-500',
              )}
              icon={
                <ArrowRight
                  size={16}
                  className={cn(selected !== path && 'text-transparent')}
                />
              }
            >
              {title}
            </Button>
            {/** mobile view */}
            <Link
              href={`${PATH}${path}`}
              replace={true}
              className={cn(
                'text-nowrap lg:hidden',
                selected === path && 'text-red-500',
              )}
            >
              {title}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
