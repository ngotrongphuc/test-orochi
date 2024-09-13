import { cn } from '@/lib/utils'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'
import * as Accordion from '@radix-ui/react-accordion'
import React, { FC, useEffect, useState } from 'react'
import { EModalId, EPartnerName, Quest } from '../lib/types'
import QuestIcon from './ui/QuestIcon'
import ButtonClaim from './ui/ButtonClaim'
import { TTaskWithStatusResponse } from '@/lib/graphql/type'
import ButtonGet from './ui/ButtonGet'
import { mutateCompleteTask } from '@/lib/graphql/mutations'
import { useSession } from 'next-auth/react'
import { useModal } from '@/app/context/modal-context'
import TaskStep from './ui/TaskStep'
import { toast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { getPartnerLogoSrc } from '../lib/utils'

type QuestItemProps = {
  data: TTaskWithStatusResponse
  onItemClick: (id: string) => void
  getQuestData: () => void
  getUserReward: () => void
}

enum ESpecialTask {
  ConnectWallet = 'Link external account to Orochi Network.',
  IsVerified = 'Verify Orochi Network account',
}

const QuestItem: FC<QuestItemProps> = ({
  data,
  onItemClick,
  getQuestData,
  getUserReward,
}) => {
  const [clicked, setClicked] = useState<boolean>(false)
  const [animation, setAnimation] = useState<boolean>(false)
  const [completed, setCompleted] = useState<boolean>(data.isDone)
  const [countdown, setCountdown] = useState<number>(0)
  const { status } = useSession()
  const { openModal } = useModal()

  const COUNT_DOWN = 5 // second
  const TIME_OUT_COUNT_DOWN = 1000 // milisecond
  const TIME_OUT_ANIMATION = 100
  const TOAST_CLAIM = 3000

  const handleCompleteTask = async () => {
    setTimeout(async () => {
      const result = await mutateCompleteTask({ taskUuid: data.uuid })
      if (!result.isDone) {
        toast({
          message: `Oops! You did not pass this task. You should try it again to claim points.`,
          duration: TOAST_CLAIM,
          position: 'middle',
          variant: 'error',
        })
        return
      }
      setCompleted(result.isDone)
    }, COUNT_DOWN * 1000)
  }

  useEffect(() => {
    const handleCountdown = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1)
      }
    }, TIME_OUT_COUNT_DOWN)

    return () => clearInterval(handleCountdown)
  }, [countdown])

  const handleGet = async () => {
    if (status === 'authenticated') {
      setClicked(true)
      if (clicked) {
        // trigger animation by setting state to true then false
        setAnimation(true)
        setTimeout(() => {
          setAnimation(false)
        }, TIME_OUT_ANIMATION)
        // wait for animation end before show count down
        setTimeout(async () => {
          setCountdown(COUNT_DOWN)
          setClicked(false)
          await handleCompleteTask()
        }, TIME_OUT_COUNT_DOWN)
      } else {
        if (data.name === ESpecialTask.ConnectWallet) {
          openModal(EModalId.ModalWalletConnect)
        } else if (data.name === ESpecialTask.IsVerified) {
          openModal(EModalId.ModalConnectAccount)
        } else {
          const url = data.taskParameter.url
          url && window.open(url, '_blank')
        }
      }
    } else {
      openModal(EModalId.ModalLogin)
    }
  }

  return (
    <AccordionItem
      className={cn(
        'gap-4 rounded-3xl border-[1px] border-neutral-200 p-6 hover:border-red-500 data-[state=open]:border-red-500',
        data.isClaimed && 'border-none opacity-50',
      )}
      value={data.uuid}
    >
      <AccordionTrigger
        icon={data.taskParameter.logo}
        partnerName={data.taskParameter.partnerName}
        taskName={data.name}
        taskUuid={data.uuid}
        reward={data.reward}
        onItemClick={() => onItemClick(data.uuid)}
        onClickGet={handleGet}
        clicked={clicked}
        animation={animation}
        completed={completed}
        countdown={countdown}
        isDone={completed}
        isClaimed={data.isClaimed}
        getQuestData={getQuestData}
        getUserReward={getUserReward}
      >
        {data.name}
      </AccordionTrigger>
      <AccordionContent>
        {data.taskDescription}
        {data.taskGuide.steps.map((step, index) => (
          <p key={index}>
            <TaskStep
              step={step}
              referralCode={data.taskParameter.referralCode}
            />
          </p>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof Accordion.Item>,
  React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item className={cn(className)} {...props} ref={forwardedRef}>
    {children}
  </Accordion.Item>
))
AccordionItem.displayName = Accordion.Item.displayName

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Accordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger> & {
    icon?: string
    partnerName?: EPartnerName
    reward: string
    onItemClick: () => void
    onClickGet: () => void
    taskUuid: string
    taskName: string
    clicked: boolean
    animation: boolean
    completed: boolean
    countdown: number
    isDone: boolean
    isClaimed: boolean
    getQuestData: () => void
    getUserReward: () => void
  }
>(
  (
    {
      children,
      className,
      icon,
      partnerName,
      reward,
      onItemClick,
      onClickGet,
      getQuestData,
      getUserReward,
      taskUuid,
      taskName,
      clicked,
      animation,
      completed,
      countdown,
      isDone,
      isClaimed,
      ...props
    },
    forwardedRef,
  ) => {
    return (
      <Accordion.Header className='flex'>
        <Accordion.Trigger
          className={cn(
            'group flex w-full items-center justify-between',
            className,
          )}
          {...props}
          ref={forwardedRef}
          onClick={onClickGet}
        >
          <div className='flex items-center gap-x-2'>
            <CaretRight
              size={16}
              className='mr-2 flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-90'
              onClick={(e) => {
                onItemClick()
                e.stopPropagation()
              }}
            />
            <div className='group-data-[state=open]:text-red-500'>
              <QuestIcon icon={icon} />
            </div>
            {partnerName && (
              <Image
                src={getPartnerLogoSrc(partnerName)}
                alt={partnerName}
                width={24}
                height={24}
              />
            )}
            <div className='rounded-lg bg-black/10 px-2 py-1 text-sm font-medium'>
              {parseFloat(reward)} XORO
            </div>
            <div className='text-start text-16 font-semibold text-neutral-800 group-data-[state=open]:text-red-500'>
              {children}
            </div>
          </div>
        </Accordion.Trigger>
        <div className='flex items-center'>
          <ButtonClaim
            taskUuid={taskUuid}
            completed={isDone}
            isClaimed={isClaimed}
            getQuestData={getQuestData}
            getUserReward={getUserReward}
          />
          <div className={cn('flex items-center', isClaimed && 'hidden')}>
            <div className='mx-4 text-neutral-300'>|</div>
            <ButtonGet
              onClick={onClickGet}
              clicked={clicked}
              animation={animation}
              countdown={countdown}
              isDone={isDone}
            />
          </div>
        </div>
      </Accordion.Header>
    )
  },
)
AccordionTrigger.displayName = Accordion.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof Accordion.Content>,
  React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={cn('pl-8 pt-4 text-16 text-neutral-600', className)}
    {...props}
    ref={forwardedRef}
  >
    <p>{children}</p>
  </Accordion.Content>
))
AccordionContent.displayName = Accordion.Content.displayName

export default QuestItem
