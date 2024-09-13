import { Button } from '@/components/ui/button'
import React, { FC } from 'react'
import {
  ArrowRight,
  ArrowsClockwise,
  Check,
} from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'
import * as Tooltip from '@radix-ui/react-tooltip'

type TButtonGetProps = {
  onClick: () => void
  clicked: boolean
  animation: boolean
  countdown: number
  isDone: boolean
}

const ButtonGet: FC<TButtonGetProps> = ({
  onClick,
  clicked,
  animation,
  countdown,
  isDone,
}) => {
  if (isDone) {
    return <Check size={16} className='text-red-500' />
  }
  return (
    <div>
      {countdown === 0 ? (
        <Tooltip.Root open={clicked ? undefined : false}>
          <Tooltip.Trigger asChild>
            <div>
              <Button
                intent={clicked ? 'outline-brand' : 'ghost-brand'}
                className={cn(
                  'normal-case [&_.btn-l]:hover:mr-1',
                  clicked && 'rounded-lg px-4',
                  animation && 'rotate-[360deg] transition-transform',
                )}
                icon={
                  clicked ? (
                    <ArrowsClockwise size={16} />
                  ) : (
                    <ArrowRight size={16} />
                  )
                }
                onClick={onClick}
                iconOnly={clicked}
              >
                Get
              </Button>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className='max-w-[260px] rounded-2xl border-[1px] border-blue-300 bg-tint-white-70 p-4 text-center text-neutral-800 shadow-lg backdrop-blur-2xl'
              sideOffset={8}
            >
              Refresh status
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      ) : (
        <div className='text-sm text-neutral-500'>{countdown}</div>
      )}
    </div>
  )
}

export default ButtonGet
