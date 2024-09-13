import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import React, { FC } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type Icon = {
  id: string
  title: string
  image: any //Use any to avoid conflicts with @svgr/webpack plugin or babel-plugin-inline-react-svg plugin.
}

const ItemCard: FC<
  Icon & {
    onItemClick?: (id: string) => void
    isActive: boolean
    className?: string
    size?: number
    explorerUrl?: string
  }
> = ({
  id,
  title,
  image,
  isActive,
  onItemClick,
  className,
  size,
  explorerUrl,
}) => {
  const openExplorerUrl = () => {
    window.open(explorerUrl, '_blank')
  }
  return (
    <HoverCard>
      <HoverCardTrigger
        className={cn(
          'flex h-fit w-full items-center justify-center rounded-2xl px-6 py-3',
          'cursor-pointer bg-white hover:bg-blue-200',
        )}
        onClick={() => (isActive ? onItemClick?.(id) : openExplorerUrl())}
      >
        <div className={cn('flex items-center gap-2', className)}>
          <Image src={image} alt={id} width={size} height={size} />
          <p>{title}</p>
        </div>
      </HoverCardTrigger>
      {!isActive && (
        <HoverCardContent className='rounded-xl bg-white text-center text-base font-medium'>
          You need to <br /> install <span className='font-bold'>{title} </span>
          first
        </HoverCardContent>
      )}
    </HoverCard>
  )
}

export default ItemCard
