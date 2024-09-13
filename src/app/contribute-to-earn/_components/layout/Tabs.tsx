import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import type { FC, ReactNode } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

type TabProps = {
  label: string
  children: ReactNode
  isComingSoon?: boolean
}

type Tabs = {
  children?: ReactNode
}

export const Tab: FC<TabProps> = ({ children }) => {
  return <>{children}</>
}

type TTabIndex = 0 | 1 | 2

const TOOLTIP_DURATION = 900

export const Tabs: FC<Tabs> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TTabIndex>(0)
  const [tooltipOpened, setTooltipOpened] = useState<boolean>(false)

  const onClickComingSoonTab = () => {
    setTooltipOpened(true)
    setTimeout(() => {
      setTooltipOpened(false)
    }, TOOLTIP_DURATION)
  }
  const changeTab = (index: number) => {
    setActiveTab(index as typeof activeTab)
  }

  return (
    <div className='flex flex-col md:grid'>
      <div className='m-auto mx-2 flex h-fit max-w-[512px] rounded-full border border-transparent bg-white px-2 py-2 sm:gap-4 sm:px-4 md:mx-auto md:h-15'>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return child.props.isComingSoon ? (
              <Tooltip.Root delayDuration={0} open={tooltipOpened}>
                <Tooltip.Trigger asChild>
                  <button
                    className={cn(
                      'm-auto rounded-full border border-transparent px-4 py-2 text-sm md:text-14',
                      activeTab === index
                        ? 'bg-[#fd4a34] text-white'
                        : 'bg-gray-100 text-gray-600',
                    )}
                    onClick={onClickComingSoonTab}
                  >
                    {child.props.label}
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className='max-w-[320px] rounded-3xl bg-white p-4 text-center text-neutral-800 shadow-[0px_4px_32px_0px_rgba(98,176,234,0.16)]'
                    sideOffset={8}
                    side='bottom'
                  >
                    <Tooltip.Arrow className='fill-white text-white' />
                    <p className='leading-6'>
                      Coming soon in
                      <br />
                      <span className='font-semibold'>
                        September 19, 2024 - 10AM UTC!
                      </span>
                    </p>
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            ) : (
              <button
                className={cn(
                  'm-auto rounded-full border border-transparent px-4 py-2 text-sm md:text-14',
                  activeTab === index
                    ? 'bg-[#fd4a34] text-white'
                    : 'bg-gray-100 text-gray-600',
                )}
                onClick={() => changeTab(index)}
              >
                {child.props.label}
              </button>
            )
          }
          return null
        })}
      </div>
      <div className='p-4'>
        {React.Children.map(children, (child, index) => {
          return activeTab === index ? child : null
        })}
      </div>
    </div>
  )
}
