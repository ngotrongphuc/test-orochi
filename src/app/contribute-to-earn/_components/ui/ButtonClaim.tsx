import { ErrorToast, SuccessToast } from '@/components/toast/CustomToast'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { mutateClaimCompletedTask } from '@/lib/graphql/mutations'
import { cn } from '@/lib/utils'
import * as Tooltip from '@radix-ui/react-tooltip'
import React, { FC, useState } from 'react'

type ButtonClaimProps = {
  taskUuid: string
  completed: boolean
  isClaimed: boolean
  getQuestData: () => void
  getUserReward: () => void
}

const TOAST_CLAIM_SUCCESS = 3000
const OPEN_TOOLTIP_TIMEOUT = 3000

const ButtonClaim: FC<ButtonClaimProps> = ({
  taskUuid,
  completed,
  isClaimed,
  getQuestData,
  getUserReward,
}) => {
  const [openTooltip, setOpenTooltip] = useState(false)

  const handleClaim = async () => {
    if (completed) {
      const claim = await mutateClaimCompletedTask({ taskUuid })
      if (!claim) {
        toast({
          message: `Oops! You did not pass this task. You should try it again to claim points.`,
          duration: TOAST_CLAIM_SUCCESS,
          position: 'middle',
          variant: 'error',
        })
      }
      getQuestData()
      toast({
        message: `You successfully received +${parseFloat(claim.reward.toString())} XORO!`,
        duration: TOAST_CLAIM_SUCCESS,
        variant: 'success',
        position: 'middle',
      })
      getUserReward()
    } else {
      setOpenTooltip(true)
      setTimeout(() => {
        setOpenTooltip(false)
      }, OPEN_TOOLTIP_TIMEOUT)
    }
  }

  return (
    <Tooltip.Root delayDuration={0} open={openTooltip}>
      <Tooltip.Trigger asChild>
        <div>
          <Button
            intent={completed ? 'primary' : 'outline-brand'}
            className={cn(
              'rounded-lg px-2 py-1.5 normal-case text-black',
              completed && 'text-white',
            )}
            onClick={handleClaim}
            disabled={isClaimed}
          >
            {isClaimed ? 'Claimed' : 'Claim'}
          </Button>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className='max-w-[260px] rounded-2xl border-[1px] border-red-300 bg-red-50 p-4 text-center text-neutral-800 shadow-lg'
          sideOffset={8}
        >
          You need to complete the task before receiving the reward
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}

export default ButtonClaim
