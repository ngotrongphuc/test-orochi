import { cn } from '@/lib/utils'
import { LinkBreak } from '@phosphor-icons/react'
import { Check } from '@phosphor-icons/react/dist/ssr'
import { type FC, type ReactNode } from 'react'
type ChipProps = {
  isActive: boolean
  icon: ReactNode
  className?: string
}
export const Chip: FC<ChipProps> = ({ isActive, icon, className }) => {
  return (
    <div
      className={cn(
        'flex flex-row items-center justify-between rounded-full border border-transparent bg-white px-2 py-1',
        isActive && 'bg-blue-200',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-start rounded-full bg-white p-1',
          className,
        )}
      >
        {icon}
      </div>
      {isActive ? (
        <Check size={16} className="text-blue-500" />
      ) : (
        <LinkBreak size={16} className="text-red-500" />
      )}
    </div>
  )
}
