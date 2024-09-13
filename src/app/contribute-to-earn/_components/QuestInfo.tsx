'use client'
import { DotsThree, Users } from '@phosphor-icons/react/dist/ssr'
import TagStatus from './ui/TagStatus'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useWindowDimensions from '@/hooks/use-window-dimensions'
import { getMaxCountAvatar } from '../lib/utils'
import Image from 'next/image'
import { xoroCoin } from '@/images/contribute-to-earn/icons'
import { FC, useEffect, useState } from 'react'
import { queryListParticipatedUserForCampaign } from '@/lib/graphql/queries'
import { TListParticipatedUserForCampaignResponse } from '@/lib/graphql/type'
import { accountImage } from '@/images/contribute-to-earn'
import {
  dummyAvt,
  dummyAvt1,
  dummyAvt2,
  dummyAvt3,
  dummyAvt4,
  dummyAvtAutumn,
  dummyAvtAutumn1,
  dummyAvtAutumn2,
  dummyAvtAutumn3,
  dummyAvtSao,
  dummyAvt5,
  dummyAvt6,
  dummyAvt7,
  dummyAvt8,
  dummyGalaxy,
} from '@/images/contribute-to-earn/table'

type QuestInfoProps = {
  balance: number
  campaignUuid: string
  totalEarning: string
}

const DUMMY_AVT_URL = [
  dummyGalaxy.default.src,
  dummyAvt2.default.src,
  dummyAvtAutumn3.default.src,
  dummyAvtAutumn.default.src,
  dummyAvt5.default.src,
  dummyAvtAutumn1.default.src,
  dummyAvtSao.default.src,
  dummyAvt6.default.src,
  dummyAvt.default.src,
  dummyAvtAutumn2.default.src,
  dummyAvt1.default.src,
  dummyAvt7.default.src,
  dummyAvt3.default.src,
  dummyAvt8.default.src,
  dummyAvt4.default.src,
]

const QuestInfo: FC<QuestInfoProps> = ({
  balance,
  campaignUuid,
  totalEarning,
}) => {
  const { width } = useWindowDimensions()
  const maxCountAvatar = getMaxCountAvatar(width)
  const [participants, setParticipants] =
    useState<TListParticipatedUserForCampaignResponse>()

  const [avtUrls, setAvtUrls] = useState<string[]>(DUMMY_AVT_URL)

  const getListParticipatedUserForCampaign = async () => {
    const result = await queryListParticipatedUserForCampaign({ campaignUuid })
    setParticipants(result)
  }

  useEffect(() => {
    const adjustAvatars = () => {
      if (participants?.records) {
        const newAvtUrls = participants.records
          .slice(0, maxCountAvatar + 1)
          .map((user) => user.profilePictureUrl || accountImage.default.src)

        if (newAvtUrls.length < maxCountAvatar) {
          const extraAvts = DUMMY_AVT_URL.slice(
            0,
            maxCountAvatar - newAvtUrls.length,
          )
          setAvtUrls([...newAvtUrls, ...extraAvts])
        } else {
          setAvtUrls(newAvtUrls)
        }
      }
    }

    adjustAvatars()
  }, [participants, maxCountAvatar])

  useEffect(() => {
    campaignUuid && getListParticipatedUserForCampaign()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignUuid])

  return (
    <div className='flex flex-col gap-2 border-b border-white pb-6 md:border-0 lg:gap-4'>
      <div className='min-w-fit rounded-3xl border-[1px] border-white p-6 xs:min-w-[320px] sm:min-w-[380px] md:min-w-[460px]'>
        <div className='flex items-center justify-between border-b-[1px] border-white pb-4'>
          <p className='mr-2 text-16 font-semibold text-neutral-800'>
            Total Earning
          </p>
          <div className='flex items-center gap-2'>
            <div className='h-5 w-5'>
              <Image
                src={xoroCoin.default.src}
                width={60}
                height={60}
                alt='logo-x-oro'
                className='h-full w-full object-contain'
              />
            </div>
            <p className='text-red-gradient text-md font-semibold'>
              {/* Fake data for marketing campaign */}
              {totalEarning ? (parseFloat(totalEarning) + 214060).toLocaleString() : '0'}
            </p>
          </div>
        </div>
        <div className='flex items-center pt-4'>
          <p className='mr-2 text-16 font-semibold text-neutral-800'>
            Participants
          </p>
          <TagStatus
            text={
              participants && participants.total
                ? (
                    parseInt(participants.total.toString() || '0') + 1248
                  ).toLocaleString()
                : '0'
            } // Fake data for marketing campaign
            icon={<Users size={16} />}
            className='bg-black/10 text-14 font-medium text-neutral-800'
          />
        </div>
        <div className='mt-4 flex pr-30'>
          {avtUrls.map((url, index) => {
            return (
              <div key={index} className='-mr-4 md:-mr-3'>
                {index < maxCountAvatar && (
                  <Avatar className='border-[1px] border-white bg-neutral-200'>
                    <AvatarImage src={url || accountImage.default.src} />
                    <AvatarFallback>{url}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            )
          })}
          <Avatar className='border-[1px] border-white bg-neutral-200'>
            <div className='flex size-full items-center justify-center bg-white'>
              <DotsThree size={16} />
            </div>
          </Avatar>
        </div>
      </div>
      <div className='min-w-fit rounded-3xl border-[1px] border-white p-6  xs:min-w-[320px] sm:min-w-[380px] md:min-w-[460px]'>
        <div className='flex items-center justify-between'>
          <p className='mr-2 text-16 font-semibold text-neutral-800'>
            Your Balance
          </p>
          <div className='flex items-center justify-center gap-2'>
            <div className='h-5 w-5'>
              <Image
                src={xoroCoin.default.src}
                width={60}
                height={60}
                alt='logo-x-oro'
                className='h-full w-full object-contain'
              />
            </div>
            <div className='text-red-gradient flex text-md font-semibold'>
              {balance}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestInfo
