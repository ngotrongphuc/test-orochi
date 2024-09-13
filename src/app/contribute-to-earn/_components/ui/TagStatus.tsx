import { cn } from '@/lib/utils'
import { FC } from 'react'

type TagStatusProps = {
  text?: string
  icon?: React.ReactNode
  className?: string
}

const TagStatus: FC<TagStatusProps> = ({ text, icon, className }) => {
  return (
    <div
      className={cn('flex w-fit items-center rounded-lg px-2 py-1', className)}
    >
      {icon}
      <p className={cn(icon && 'ml-1')}>{text}</p>
    </div>
  )
}

export default TagStatus
