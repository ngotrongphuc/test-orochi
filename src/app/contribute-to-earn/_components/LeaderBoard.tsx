'use client'
import { useEffect } from 'react'
import { RankingTable } from './layout/RankingTable'
import { useLeaderBoardStore } from '@/stores'

export const LeaderBoard = () => {
  const {
    totalVerifiedUsers,
    globallyTotalReferralCount,
    getTotalVerifiedUsers,
    getGloballyTotalReferralCount,
    getUserReferralLeaderboard,
  } = useLeaderBoardStore()

  useEffect(() => {
    getTotalVerifiedUsers()
    getGloballyTotalReferralCount()
    getUserReferralLeaderboard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='mx-auto max-w-[1440px] px-2 py-32 lg:px-6'>
      <div className='flex flex-col gap-8 rounded-40 border border-blue-tint-10 bg-gradient-to-b from-blue-200 via-blue-100 to-white px-6 py-16 lg:gap-10 lg:px-20 lg:py-20'>
        <h3 className='text-center text-2xl font-medium lg:text-3xl'>
          Referrals Ranking
        </h3>
        <div className='mx-auto flex flex-col justify-center gap-2 md:flex-row lg:flex'>
          <div className='flex flex-row items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-white px-19 py-2'>
            <h6 className='text-center text-base font-normal'>Users</h6>
            <p className='text-center text-md font-semibold text-red-500'>
              {totalVerifiedUsers}
            </p>
          </div>
          <div className='flex flex-row items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-white px-6 py-2'>
            <h6 className='text-center text-base font-normal'>
              Successful referrals
            </h6>
            <p className='text-center text-md font-semibold text-red-500'>
              {globallyTotalReferralCount}
            </p>
          </div>
        </div>
        <div>
          <RankingTable />
        </div>
      </div>
    </div>
  )
}
