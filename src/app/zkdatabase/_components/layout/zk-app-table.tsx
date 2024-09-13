'use client'
import * as Tabs from '@radix-ui/react-tabs'
import { FC } from 'react'
import { cn } from '@/lib/utils'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { zkTabsProps } from '../zkdatabase-app'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type ZKAppTableProps = {
  onTabChange: (tabId: string) => void
  data: zkTabsProps[]
  selectedTab: string
}

const ZKAppTable: FC<ZKAppTableProps> = ({
  onTabChange,
  data,
  selectedTab,
}) => {
  return (
    <div className='h-fit w-full lg:mb-auto lg:ml-10 lg:h-full lg:min-h-[50vh] 4k:min-h-0 lg:w-1/2'>
      <h4 className='mb-6 text-center text-23 font-semibold text-neutral-800 lg:mb-10 lg:text-start lg:text-35'>
        zkDatabase Application
      </h4>
      <div className='mb-6 md:hidden'>
        <Select
          value={selectedTab}
          onValueChange={(value) => onTabChange(value)}
        >
          <SelectTrigger className='text-xl flex w-full justify-between rounded-2xl border border-neutral-400 bg-white p-4 text-left outline-none'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className='rounded-2xl border border-neutral-400 bg-white'>
            {data.map((tab) => (
              <SelectItem
                value={tab.id}
                key={tab.id}
                className={cn(
                  'my-1 rounded-xl py-4',
                  selectedTab === tab.id ? 'bg-blue-300' : 'hover:bg-blue-100',
                )}
              >
                {tab.tab}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Tabs.Root
        defaultValue={data[0].id}
        onValueChange={onTabChange}
        value={selectedTab}
      >
        <Tabs.List className='mb-6 hidden md:flex'>
          <div className='flex w-full justify-between overflow-y-hidden overflow-x-scroll border-b border-neutral-200 pb-2 md:overflow-hidden'>
            {data.map((tab, index) => (
              <div
                key={tab.id}
                className='flex items-center sm:gap-2 md:gap-12 lg:gap-5 xl:gap-10 2xl:gap-12'
              >
                <Tabs.Trigger className='text-neutral-600' value={tab.id}>
                  <div
                    className={cn(
                      'min-w-20 text-sm font-semibold sm:min-w-0',
                      tab.id === selectedTab ? 'active-tabs' : 'tabs-hover',
                    )}
                  >
                    {tab.tab}
                  </div>
                </Tabs.Trigger>
                <ArrowRight
                  size={20}
                  className={cn(
                    'text-neutral-400',
                    index === data.length - 1 && 'hidden',
                  )}
                />
              </div>
            ))}
          </div>
        </Tabs.List>
        {data.map((tab) => (
          <Tabs.Content key={tab.id} value={tab.id}>
            <div className='flex flex-col gap-6'>
              <p className='text-16 font-semibold text-neutral-800'>
                {tab.title}
              </p>
              {tab.contents.map((content) => (
                <div key={content.title} className='flex'>
                  <li />
                  <div>
                    <span className='font-semibold text-neutral-800'>
                      {content.title}
                    </span>
                    <span className='font-normal text-neutral-600 leading-6'>
                      {content.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
      <Button
        intent='outline-brand'
        icon={<ArrowRight size={20} />}
        className='md:text-xl mt-6 w-full justify-center px-8 text-sm font-medium md:w-auto'
        onClick={() => {
          toast({
            message: 'Coming soon! Subscribe us to get update!',
            variant: 'comingSoon',
          })
        }}
      >
        GET STARTED
      </Button>
    </div>
  )
}

export default ZKAppTable
