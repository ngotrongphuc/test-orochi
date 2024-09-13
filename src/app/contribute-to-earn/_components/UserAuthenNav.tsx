import { shortenString } from '@/utils'
import React, { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { Check } from '@phosphor-icons/react'
import { useIDContext } from '../provider/session-provider'

type UserAuthenNavProps = {
  id: string
  avatarUrl?: string
}

const UserAuthenNav: FC<UserAuthenNavProps> = ({ id, avatarUrl }) => {
  const { myProfile } = useIDContext()
  return (
    <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 justify-center">
      <Link href={`/contribute-to-earn/account/${id}`}>
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{id}</AvatarFallback>
        </Avatar>
      </Link>
      <Link href={`/contribute-to-earn/account/${id}`} className='hidden lg:block'>{shortenString(id)}</Link>
      {myProfile?.verified && (
        <div className='w-fit rounded-full p-1 bg-blue-500'>
          <Check size={10} color='#fff'/>
        </div>
      )}
    </div>
  )
}

export default UserAuthenNav
