import React, { FC } from 'react'
import { Quest } from '../lib/types'
import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { TTaskWithStatusResponse } from '@/lib/graphql/type'

type CampaignItemProps = {
  data: TTaskWithStatusResponse
}

const CampaignItem: FC<CampaignItemProps> = ({ data }) => {
  return (
    <div className='flex gap-4 rounded-3xl border-[1px] border-neutral-200 p-6'>
      <div className='flex flex-1 flex-col gap-y-2'>
        <div className='flex items-center gap-x-1'>
          <div className='flex items-center gap-x-2 rounded-lg border-[1px] border-neutral-200 px-2 py-1 text-sm'>
            {data.uuid && (
              <Image
                alt='partner-name'
                src={data.uuid}
                width={20}
                height={20}
              />
            )}
            {data.name}
          </div>
          <div className='rounded-lg bg-neutral-300 px-2 py-1 text-sm'>
            {data.reward}
          </div>
        </div>
        <div className='text-start font-semibold'>{data.name}</div>
        <div className='text-neutral-600'>{data.taskDescription}</div>
        <div className='flex w-fit rounded-lg border-[1px] bg-red-500 px-2 py-1.5 text-sm font-semibold text-white'>
          Get
          <ArrowRight size={16} className='ml-1' />
        </div>
      </div>
      <div className='flex items-end'>
        {data.uuid && (
          <Image
            alt='campaign image'
            src={data.name}
            width={112}
            height={112}
            className='h-[112px] w-[112px] rounded-lg object-cover'
          />
        )}
      </div>
    </div>
  )
}

export default CampaignItem
