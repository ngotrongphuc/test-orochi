'use client'
import * as Tabs from '@radix-ui/react-tabs'
import { FC, useEffect, useState } from 'react'
import QuestItem from './QuestItem'
import * as Accordion from '@radix-ui/react-accordion'
import { cn } from '@/lib/utils'
import QuestTableDropdown from './QuestTableDropdown'
import { ArrowsOutCardinal } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { tabBorderLeft, tabBorderRight } from '@/images/contribute-to-earn/table'
import {
  TListCampaignResponse,
  TQuest,
  TTaskWithStatusResponse,
} from '@/lib/graphql/type'
import { queryAllTaskWithStatus } from '@/lib/graphql/queries'
import { toast } from '@/components/ui/use-toast'
import * as Tooltip from '@radix-ui/react-tooltip'

type TQuestTableProps = {
  data: TListCampaignResponse[]
  getUserReward: () => void
}

type TQuestData = TQuest & {
  tasks?: TTaskWithStatusResponse[]
}

type TCampaignData = TListCampaignResponse & {
  quests: TQuestData[]
}

const QuestTable: FC<TQuestTableProps> = ({ data, getUserReward }) => {
  const [campaignData, setCampaignData] = useState<TCampaignData[]>([])
  const questData: TQuestData[] = campaignData[0]?.quests || []
  const [selectedTab, setSelectedTab] = useState<string>('')
  const isFirstTab = questData[0]?.uuid === selectedTab
  const isLastTab = questData[questData.length - 1]?.uuid === selectedTab
  const [hoveringTab, setHoveringTab] = useState<string | null>(null)
  const isFirstTabHovering = questData[0]?.uuid === hoveringTab
  const isLastTabHovering =
    questData[questData.length - 1]?.uuid === hoveringTab
  const [openedItems, setOpenedItems] = useState<string[]>([])
  const [openedTooltip, setOpenedTooltip] = useState<string>('')

  const TOOLTIP_DURATION = 3000

  useEffect(() => {
    setSelectedTab(data[0]?.defaultSelectedQuest?.quest?.uuid || '')
    const mappedData = data.map((campaign) => ({
      ...campaign,
      quests: campaign.quests.map((quest) =>
        quest.uuid === campaign.defaultSelectedQuest?.quest?.uuid
          ? { ...quest, tasks: campaign?.defaultSelectedQuest?.tasks || [] }
          : quest,
      ),
    }))
    setCampaignData(mappedData)
  }, [data])

  const handleChangeTab = async (
    tabId: string,
    isDropdown: boolean = false,
  ) => {
    // for now Defi Quest and Special Campaign are pending
    const PENDING_QUESTS = ['Defi Quest', 'Special Campaign']
    const selectedQuest = campaignData[0].quests.filter(
      (quest) => quest.uuid === tabId,
    )[0]
    if (PENDING_QUESTS.includes(selectedQuest.name || '')) {
      if (isDropdown) {
        toast({
          message: 'Coming soon! Subscribe us to get update!',
          variant: 'comingSoon',
        })
      } else {
        setOpenedTooltip(tabId)
        setTimeout(() => {
          setOpenedTooltip('')
        }, TOOLTIP_DURATION)
      }
      return
    }
    setSelectedTab(tabId)
    const result = await queryAllTaskWithStatus({ questUuid: tabId })
    const mappedResult = campaignData.map((campaign) => ({
      ...campaign,
      quests: campaign.quests.map((quest) =>
        quest.uuid === tabId ? { ...quest, tasks: result } : quest,
      ),
    }))
    setCampaignData(mappedResult)
  }

  const handleOpenItem = (newItem: string) => {
    setOpenedItems((prevItems) => {
      const itemSet = new Set(prevItems)

      if (itemSet.has(newItem)) {
        itemSet.delete(newItem)
      } else {
        itemSet.add(newItem)
      }

      return Array.from(itemSet)
    })
  }

  const getQuestData = () => {
    handleChangeTab(selectedTab)
  }

  return (
    <div>
      <div className='md:hidden'>
        <QuestTableDropdown
          onValueChange={(value) => handleChangeTab(value, true)}
          items={questData}
          value={selectedTab}
        />
        <div className='flex items-center justify-center py-8 text-sm text-neutral-800'>
          <ArrowsOutCardinal size={16} className='mr-2' />
          Drag horizontal & vertical for more detail
        </div>
      </div>
      <div className='overflow-x-auto'>
        <Tabs.Root onValueChange={handleChangeTab} value={selectedTab}>
          <Tabs.List className='hidden md:flex'>
            {questData.length > 0 && (
              <div
                className={cn(
                  'absolute mt-8.25 flex',
                  questData[1]?.uuid === selectedTab &&
                    'left-[24.25%] lg:left-1/4 lg:ml-3.25',
                  questData[2]?.uuid === selectedTab && 'right-1/2',
                  isLastTab && 'right-1/4 mr-3 lg:mr-8',
                  isFirstTab && 'hidden',
                )}
              >
                <Image
                  src={tabBorderLeft.default.src}
                  alt='border-left'
                  width={20}
                  height={20}
                  className='mt-auto'
                />
              </div>
            )}
            {questData.map((tab: TQuestData) => (
              <Tabs.Trigger
                key={tab.uuid}
                className='group flex-1 rounded-t-3xl text-neutral-600 hover:bg-white/50 hover:text-black disabled:bg-transparent disabled:text-neutral-600/30 data-[state=active]:bg-red-500 data-[state=active]:text-red-500'
                value={tab.uuid}
                onMouseEnter={() => setHoveringTab(tab.uuid)}
                onMouseLeave={() => setHoveringTab(null)}
              >
                <Tooltip.Root
                  delayDuration={0}
                  open={openedTooltip === tab.uuid}
                >
                  <Tooltip.Trigger asChild>
                    <div className='mt-1 flex h-full items-center justify-center rounded-t-3xl p-4 text-sm font-semibold group-data-[state=active]:bg-white'>
                      {tab.name}
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className='max-w-[260px] rounded-3xl bg-white p-4 text-center text-neutral-800 shadow-lg'
                      sideOffset={8}
                    >
                      Coming soon! Subscribe us to get more updates!
                      <Tooltip.Arrow className='fill-white text-white' />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tabs.Trigger>
            ))}
            {questData.length > 0 && (
              <div
                className={cn(
                  'absolute mt-8.25 flex',
                  questData[1]?.uuid === selectedTab && 'left-1/2',
                  questData[2]?.uuid === selectedTab &&
                    'right-[24.3%] lg:right-1/4 lg:mr-3.25',
                  isFirstTab && 'left-1/4 ml-3 lg:ml-8',
                  isLastTab && 'hidden',
                )}
              >
                <Image
                  src={tabBorderRight.default.src}
                  alt='border-right'
                  width={20}
                  height={20}
                  className='mt-auto'
                />
              </div>
            )}
          </Tabs.List>
          {questData.map((tab: TQuestData) => (
            <Tabs.Content
              key={tab.uuid}
              className={cn(
                'min-w-[768px] grow rounded-3xl bg-white py-4',
                (isFirstTab || isFirstTabHovering) && 'md:rounded-tl-none',
                (isLastTab || isLastTabHovering) && 'md:rounded-tr-none',
              )}
              value={tab.uuid}
            >
              <div className='h-[600px] overflow-y-auto px-2 py-2 lg:px-10 lg:py-6'>
                {tab.uuid === 'special_campaign' ? (
                  <div className='grid gap-4 lg:grid-cols-2'>
                    {/* TODO: wait for data of campaign quest from BE */}
                    {/* {(tab?.tasks || []).map((data, index) => (
                      <CampaignItem key={index} data={data} />
                    ))} */}
                  </div>
                ) : (
                  <Accordion.Root
                    className='flex flex-col gap-y-4'
                    type='multiple'
                    value={openedItems}
                  >
                    {tab.tasks?.map((data) => (
                      <QuestItem
                        key={data.uuid}
                        data={data}
                        onItemClick={handleOpenItem}
                        getQuestData={getQuestData}
                        getUserReward={getUserReward}
                      />
                    ))}
                  </Accordion.Root>
                )}
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </div>
  )
}

export default QuestTable
