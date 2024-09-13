'use client'
import QuestDetails from './QuestDetails'
import QuestInfo from './QuestInfo'
import QuestBanner from './QuestBanner'
import QuestTable from './QuestTable'
import { questBackground } from '@/images/contribute-to-earn'
import { useEffect, useState } from 'react'
import { TListCampaignResponse } from '@/lib/graphql/type'
import { queryListActiveCampaign, queryUserReward } from '@/lib/graphql/queries'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { RAMenPaSTA_URL } from '@/configs/navigation'
import { bigBanner } from '@/images/orocle'
import { cn } from '@/lib/utils'

const Quest = () => {
  const [campaignData, setCampaignData] = useState<TListCampaignResponse[]>([])
  const [balance, setBalance] = useState<number>(0)
  const { status } = useSession()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const getCampaignData = async () => {
    const result = await queryListActiveCampaign()
    if (!result) {
      throw new Error('Fail to get campaign data')
    }
    setCampaignData(result)
  }

  const getUserReward = async () => {
    const reward = await queryUserReward()
    if (!reward) {
      throw new Error('Fail to get list xoro balance')
    }
    setBalance(parseFloat(reward.amount.toString()))
  }

  useEffect(() => {
    getCampaignData()
    if (status === 'authenticated') {
      getUserReward()
    }
  }, [status])

  return (
    <section className='justify-centerlining-nums flex flex-col'>
      <div className='relative'>
        <div className='flex items-center justify-center'>
          <Image
            alt='quest-background'
            src={questBackground.default.src}
            width={1464}
            height={2274}
            className={cn(
              'min-h-[2000px] object-fill md:min-h-[1850px] lg:min-h-[1700px]',
              isExpanded &&
                'min-h-[2400px] object-fill md:min-h-[2250px] lg:min-h-[2100px]',
            )}
          />
        </div>
        <div className='absolute inset-0 mx-auto max-w-[1440px] px-2 py-32 lg:px-6'>
          <div className='bg-white/10'>
            <QuestBanner />
            <div className='rounded-b-3xl border-[1px] border-t-0 border-white bg-white/30 px-4 py-6 lg:p-10'>
              {/* Introduction */}
              <div className='flex flex-wrap border-white pb-10 md:border-b lg:flex-nowrap'>
                <div className='z-10 basis-full pr-3'>
                  <QuestDetails
                    data={campaignData}
                    setIsExpanded={setIsExpanded}
                  />
                </div>
                <div className='mx-auto mt-10 lg:mx-0 lg:mt-0'>
                  <QuestInfo
                    balance={balance}
                    campaignUuid={campaignData[0]?.uuid}
                    totalEarning={campaignData[0]?.campaignTotalEarning}
                  />
                </div>
              </div>
              {/* Quest Table */}
              <div className='mt-10'>
                <QuestTable data={campaignData} getUserReward={getUserReward} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link
        href={RAMenPaSTA_URL}
        className='flex h-full w-full justify-center pb-10 lg:pb-20'
        target='_blank'
      >
        <Image
          alt='big-banner'
          src={bigBanner.default.src}
          width={5068}
          height={1690}
          className='h-full w-full max-w-[1168px] bg-no-repeat object-contain'
        />
      </Link>
      {/* <div
        style={{ backgroundImage: `url(${questNewsletter.default.src})` }}
        className='h-60 w-full px-6 py-8 xs:py-10 lg:px-10'
      >
        <div className='mx-auto flex h-full max-w-[1440px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0'>
          <div>
            <h4 className='mb-4 text-23 font-semibold text-white lg:text-35'>
              Lorem ipsum dolor sit amet
            </h4>
            <p className='text-16 font-light text-tint-white-70'>
              Orochi Network is the operating system for Web3 powered by
              Cryptography.
            </p>
          </div>
          <Button
            intent='white'
            className='w-fit'
            icon={<ArrowRight size={16} />}
          >
            learn more
          </Button>
        </div>
      </div> */}
    </section>
  )
}

export default Quest
