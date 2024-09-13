'use client'

import {
  CaretDown,
  CaretUp,
  DiscordLogo,
  GithubLogo,
  ShareFat,
  TelegramLogo,
  XLogo,
} from '@phosphor-icons/react/dist/ssr'
import TagStatus from './ui/TagStatus'
import { FC, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { TListCampaignResponse } from '@/lib/graphql/type'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

type TQuestDetailsProps = {
  data: TListCampaignResponse[]
  setIsExpanded: (status: boolean) => void
}

export enum ESocialData {
  XLink = 'https://x.com/OrochiNetwork',
  DiscordLink = 'https://discord.com/invite/sTU4TUh8H3',
  GithubLink = 'https://github.com/orochi-network',
  TelegramLink = 'https://t.me/OrochiNetwork',
  ShareLink = 'https://orochi.network/blog/Orochi-Network-Contribute-to-Earn-Season1-Official-Launch',
}

const QuestDetails: FC<TQuestDetailsProps> = ({ data, setIsExpanded }) => {
  const [descriptionExpanded, setDescriptionExpanded] = useState<boolean>(false)
  const [descriptionTruncated, setDescriptionTruncated] =
    useState<boolean>(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const campaignDescription = data[0]?.campaignDescription

  useEffect(() => {
    if (descriptionRef.current) {
      setDescriptionTruncated(
        descriptionRef.current?.scrollHeight >
          descriptionRef.current?.clientHeight,
      )
    }
  }, [descriptionRef, campaignDescription])

  const toggleExpandDescription = () => {
    setDescriptionExpanded(!descriptionExpanded)
    setIsExpanded(!descriptionExpanded)
  }

  return (
    <div>
      <div className='flex flex-wrap items-center gap-2'>
        <TagStatus text='Opening' className='bg-green-500 text-white' />
        <h3 className='text-lg font-semibold text-neutral-800'>
          {data[0]?.name}
        </h3>
      </div>
      <div className='flex flex-wrap items-center py-2'>
        <div className='flex items-center py-2'>
          <p className='text-sm font-normal text-neutral-600'>
            {`Starts at ${dayjs(data[0]?.campaignStartTime).utc().format('MMMM D, YYYY - hA')} UTC`}
          </p>
          <p className='mx-4 text-neutral-500'>|</p>
        </div>
        <div className='flex flex-wrap items-center'>
          <Button
            intent='ghost-black'
            className='gap-0 px-1'
            icon={<XLogo size={16} />}
            reverseIcon
            asLink
            target='_blank'
            href={ESocialData.XLink}
          />
          <p className='mx-4 text-neutral-500'>|</p>
          <Button
            intent='ghost-black'
            className='gap-0 px-1'
            icon={<GithubLogo size={16} />}
            reverseIcon
            asLink
            target='_blank'
            href={ESocialData.GithubLink}
          />
          <p className='mx-4 text-neutral-500'>|</p>
          <Button
            intent='ghost-black'
            className='gap-0 px-1'
            icon={<TelegramLogo size={16} />}
            reverseIcon
            asLink
            target='_blank'
            href={ESocialData.TelegramLink}
          />
          <p className='mx-4 text-neutral-500'>|</p>
          <Button
            intent='ghost-black'
            className='gap-0 px-1'
            icon={<DiscordLogo size={16} />}
            reverseIcon
            asLink
            target='_blank'
            href={ESocialData.DiscordLink}
          />
          <p className='mx-4 text-neutral-500'>|</p>
          <Button
            asLink
            href={ESocialData.ShareLink}
            target='_blank'
            intent='ghost-black'
            icon={<ShareFat size={16} />}
            reverseIcon
          >
            Share
          </Button>
        </div>
      </div>
      <div
        className={cn(
          'text-wrap text-16 font-light leading-6 text-neutral-600',
          descriptionExpanded
            ? 'line-clamp-none'
            : 'line-clamp-3 md:line-clamp-4 lg:line-clamp-5 xl:line-clamp-6',
        )}
        ref={descriptionRef}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify?.sanitize?.(campaignDescription || '', {
              ADD_ATTR: ['target'],
            }),
          }}
        />
      </div>
      {descriptionTruncated && (
        <Button
          className='mt-4'
          intent='ghost-black'
          icon={
            descriptionExpanded ? (
              <CaretUp size={16} />
            ) : (
              <CaretDown size={16} />
            )
          }
          onClick={toggleExpandDescription}
        >
          {descriptionExpanded ? 'COLLAPSE' : 'EXPAND'}
        </Button>
      )}
    </div>
  )
}

export default QuestDetails
